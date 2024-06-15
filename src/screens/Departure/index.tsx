import React from "react";
import { useRef, useState } from "react";
import { TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { LicensePlateInput } from "../../components/LicensePLateInput";
import { TextAreaInput } from "../../components/TextAreaInput";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header/Index";
import { Container, Content } from "../Home/styles";
import { HandFist } from "phosphor-react-native";

import { licensePlateValidate } from "../../utils/licensePlateValidate";


const KeyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {

    const [description, setDescription] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const descriptionRef = useRef<TextInput>(null);

    function handleDepartureRegister() {
        if(licensePlateValidate(licensePlate)){
            licensePlateRef.current?.focus();
            return Alert.alert('Placa inválida', 'A placa é inválida. Por favor, informe a placa correta do veículo.');
        }
    }

    
    return(
        <Container>
            <Header title="Saída"/>

            <KeyboardAvoidingView style={{flex: 1}} behavior={KeyboardAvoidingViewBehavior}>
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

                        <TextAreaInput
                            ref={descriptionRef}
                            label="Finalidade"  
                            placeholder="Vou utilizar o veículo para..."   
                            onSubmitEditing={handleDepartureRegister}     
                            returnKeyType="send"   
                            blurOnSubmit  
                            onChangeText={setDescription}
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