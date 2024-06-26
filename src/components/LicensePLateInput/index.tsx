import { TextInput, TextInputProps } from "react-native";

import { useTheme } from "styled-components/native";

import { Container, Input, Label } from "./style";
import { forwardRef } from "react";
import React from "react";

type Props = TextInputProps & {
    label: string;
}

const LicensePlateInput = forwardRef<TextInput, Props> (({label, ...rest}, ref ) => {
    const { COLORS } = useTheme();
    return (
        <Container>
            <Label>
                {label}
            </Label>

            <Input
            ref={ref}
                maxLength={7}
                autoCapitalize="characters"
                placeholderTextColor={COLORS.GRAY_400}
                {...rest}
            />       
        </Container>
    );
})

export { LicensePlateInput };