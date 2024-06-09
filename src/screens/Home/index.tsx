import { Container } from './styles'

import { HomeHeader } from '../../components/HomeHeader'
import { useNavigation } from '@react-navigation/native'

export function Home() {
  
  return (
    <Container>
      <HomeHeader />
    </Container>
  )
}
