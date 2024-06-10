import { Key, Car } from "phosphor-react-native";
import { TouchableOpacityProps } from "react-native";
import { Container,IconBox, TextHighlight } from "./stayles";
import { useTheme } from "styled-components";
import { Message } from "../HomeHeader/styles";

type Props =  TouchableOpacityProps &{
    licensePlate?:  string | null;
}

export function CarStatus({licensePlate = null, ...rest}: Props){
    const theme = useTheme();
    
    const Icon = licensePlate ? Key : Car;
    const message = licensePlate ? `Veículo ${licensePlate} em uso. ` : `Nenhum veículo em uso. `
    const Status = licensePlate ? 'chegada' : 'saída';
    return(
        <Container {...rest}>
            <IconBox>
                <Icon
                    size={32}
                    color={theme.COLORS.BRAND_LIGHT}
                />
            </IconBox>

            <Message>
                {message}

                <TextHighlight>
                    Clique aqui para registrar a {Status}
                </TextHighlight>
            </Message>
        </Container>
    );
}