import { useRef } from "react";
import { TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { LicensePlateInput } from "../../components/LicensePLateInput";
import { TextAreaInput } from "../../components/TextAreaInput";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header/Index";

import { Container, Content } from "../Home/styles";
import { HandFist } from "phosphor-react-native";


const KeyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {

    const descriptionRef = useRef<TextInput>(null);

    function handleDepartureRegister() {
        console.log("OK!");
    }

    
    return(
        <Container>
            <Header title="Saída"/>

            <KeyboardAvoidingView style={{flex: 1}} behavior={KeyboardAvoidingViewBehavior}>
                <ScrollView>
                    <Content>
                        <LicensePlateInput
                            label="Placa do veículo" 
                            placeholder="BRA1234"
                            onSubmitEditing={() => descriptionRef.current?.focus()}
                            returnKeyType="next"
                        />

                        <TextAreaInput
                            ref={descriptionRef}
                            label="Finalidade"  
                            placeholder="Vou utilizar o veículo para..."   
                            onSubmitEditing={handleDepartureRegister}     
                            returnKeyType="send"   
                            blurOnSubmit  
                        />

                        <Button    
                            title="Registrar saída"  
                            onPress={handleDepartureRegister}  
                        /> 
                            
                    </Content>
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
}