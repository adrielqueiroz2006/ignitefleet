import { Container, Content } from './styles'

import { HomeHeader } from '../../components/HomeHeader'
import { useNavigation } from '@react-navigation/native'
import { CarStatus } from '../../components/CarStatus'
import React from 'react';

export function Home() {
  
  const {navigate} = useNavigation();

  function handleRegisterMovement(){
    navigate('departure')
  }


  return (
    <Container>
      <HomeHeader />


      <Content>
        <CarStatus onPress={handleRegisterMovement}/>
      </Content>
    </Container>
  )
}
