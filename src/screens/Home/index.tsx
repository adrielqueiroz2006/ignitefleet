import { Container, Content, Title, Label } from './styles';
import { HomeHeader } from '../../components/HomeHeader';
import { useQuery, useRealm } from '../../libs/realm';
import { useNavigation } from '@react-navigation/native';
import { CarStatus } from '../../components/CarStatus';
import React, { useEffect, useState } from 'react';
import { Historic } from '../../libs/realm/schemas/Historic';
import { Alert, FlatList } from 'react-native';
import { HistoricCard, HistoricCardProps } from '../../components/HistoricCard';
import dayjs from 'dayjs';
import { Realm, useUser } from '@realm/react';
import { getLastAsyncTimestamp, saveLastSyncTimestamp } from '../../libs/asyncStorage/syncStorage';
import Toast from 'react-native-toast-message';
import { TopMessage } from '../../components/TopMessage';
import { CloudArrowUp } from 'phosphor-react-native';

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>([]);
  const { navigate } = useNavigation();
  const [percentageToSync, setPercentageToSync] = useState<string | null>(null);


  const historic = useQuery(Historic);
  const realm = useRealm();

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate('arrival', { id: vehicleInUse._id.toString() });
    } else {
      navigate('departure');
    }
  }

  function fetchVehicleInUse() {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0];
      setVehicleInUse(vehicle);
    } catch (error) {
      Alert.alert('Veículo em uso', 'Não foi possível carregar o veículo em uso.');
      console.log(error);
    }
  }

  async function fetchHistoric() {
    try {
      const response = historic.filtered("status = 'arrival' SORT(created_at DESC)");
      
      const lastSync = await getLastAsyncTimestamp();
      
      const formattedHistoric = response.map((item) => ({
        id: item._id!.toString(),
        licensePlate: item.license_plate,
        isSync: lastSync > item.updated_at!.getTime(),
        created: dayjs(item.created_at).format('[Saída em] DD/MM/YYYY [às] HH:mm'),
      }));

      setVehicleHistoric(formattedHistoric);
    } catch (error) {
      console.log(error);
      Alert.alert('Histórico', 'Não foi possível carregar o histórico');
    }
  }

  function handleHistoricDetails(id: string) {
    navigate('arrival', { id });
  }

 async function progressNotification(transferred: number, transferable: number){
    const percentage = (transferred/transferable) * 100;

    if(percentage === 100){
      await saveLastSyncTimestamp();
      await fetchHistoric();
      setPercentageToSync(null)


      Toast.show({
        type: 'info', 
        text1: 'Todos os dados estão sincronizados.'
      })
    }

    if(percentage < 100){
      setPercentageToSync(`${percentage.toFixed(0)}% sincronizado.`);
    }


  }

  useEffect(() => {
    fetchVehicleInUse();
    realm.addListener('change', fetchVehicleInUse);
    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse);
      }
    };
  }, []);

  useEffect(() => {
    fetchHistoric();
  }, [historic]);

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) =>{
      const historicByUserQuery = realm.objects('Historic').filtered('user_id =  `${user|.id}`');
      mutableSubs.add(historicByUserQuery, { name: 'historic_by_user'});
    })
  }, [realm]);


  useEffect(() => {
    const syncSession = realm.syncSession;


    if(!syncSession){
      return;
    }

    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification

    );

    return () => syncSession.removeProgressNotification(progressNotification);
  })

  return (
    <Container>
    {
     percentageToSync && <TopMessage title={percentageToSync} icon={CloudArrowUp} />
    }

      <HomeHeader />
      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />
        <Title>
          Histórico
        </Title>
        <FlatList
          data={vehicleHistoric}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={(
            <Label>
              Nenhum registro de utilização.
            </Label>
          )}
        />
      </Content>
    </Container>
  );
}
