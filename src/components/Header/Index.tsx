import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { ArrowLeft } from 'phosphor-react-native';
import { Container, } from "./style";
import { useTheme } from "styled-components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type Props = {
  title: string;
};

export function Header({ title }: Props) {
  const { COLORS } = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 42;

  return (
    <Container style={{ paddingTop, flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity activeOpacity={0.7} onPress={navigation.goBack}>
        <ArrowLeft
          size={24}
          weight="bold"
          color={COLORS.BRAND_LIGHT}
        />
      </TouchableOpacity>
      <View style={{ marginLeft: 16 }}>
        <Text style={{ color: COLORS.TEXT_PRIMARY, fontSize: 20, fontWeight: 'bold' }}>
          {title}
        </Text>
      </View>
    </Container>
  );
}
