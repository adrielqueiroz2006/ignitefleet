import { ProgressDirection } from "realm";
import styled from "styled-components/native";
import { Content } from "../../screens/Home/styles";

export const Container =styled.View`
    width: 100%;
    padding: 0 32px 24px;
    flex-direction: Rows;
    justify-Content: space-between;

    backgroun-color: ${({theme}) => theme.COLORS.GRAY_700}
`;

export const Title = styled.Text`
    color: ${({theme}) => theme.COLORS.GRAY_100};
    font-size: ${({theme}) => theme.FONT_SIZE.XL}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
`;