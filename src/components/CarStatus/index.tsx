import { Key, Car } from "phosphor-react-native";
import { TouchableOpacityProps } from "react-native";
import { Container, IconBox, Message,  TextHighlight } from "./styles";
import { useTheme } from "styled-components";
import React from "react";


type Props =  TouchableOpacityProps &{
    licensePlate?:  string | null;
}

export function CarStatus({licensePlate = null, ...rest}: Props){
    const theme = useTheme();
    
    const Icon = licensePlate ? Car : Key;
    const message = licensePlate ? `Veículo ${licensePlate} em uso. ` : `Nenhum veículo em uso. `
    const Status = licensePlate ? 'chegada' : 'saída';
    return(
        <Container {...rest}>
            <IconBox>
                <Icon
                    size={52}
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