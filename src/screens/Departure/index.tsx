import React from 'react';
import { useRef, useState } from 'react';
import {
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import {useUser} from '@realm/react';
import { useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { LicensePlateInput } from '../../components/LicensePLateInput'
import { TextAreaInput } from '../../components/TextAreaInput';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header/Index';
import { Container, Content, Spacing } from './style';
import { HandFist } from 'phosphor-react-native';

import { licensePlateValidate } from '../../utils/licensePlateValidate';


export function Departure() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const {goBack} = useNavigation();
  const realm = useRealm();
  const user = useUser();

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    try {
    if (!licensePlateValidate(licensePlate)) {
      licensePlateRef.current?.focus();
      return Alert.alert(
        'Placa inválida',
        'A placa é inválida. Por favor, informe a placa correta do veículo.'
      );
    }
    if(description.trim().length === 0){
      return Alert.alert('Finalidade', 'Por favor, informe a finalidade da utilização do veículo.');
    }

    setIsRegistering(true);

    realm.write(()=>{
      realm.create('Historic', Historic.generate({
        user_id: user!.id,
        license_plate: licensePlate.toUpperCase(),
        description
      }))
    });

    Alert.alert('Saída', 'Saída do veículo registrada com sucesso!')
    goBack();

  }catch(error){
    console.log(error);
    Alert.alert('Erro', 'Não foi possível registrar a saída do veículo');
    setIsRegistering(false);
  }
}

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <Content>
            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
              onChangeText={setLicensePlate}
            />
            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
              onChangeText={setLicensePlate}
            />
            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
              onChangeText={setLicensePlate}
            />
            <Spacing />
            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              blurOnSubmit
              onChangeText={setDescription}
            />
            <Spacing />
            <Button 
            title="Registrar saída" 
            onPress={handleDepartureRegister}
            isLoading = {isRegistering}/>
          </Content>
        </ScrollView>
        </KeyboardAwareScrollView>
    </Container>
  );
}
