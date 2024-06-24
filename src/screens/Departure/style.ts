import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Content = styled.View`
  flex: 1;
  padding: 32px;
  margin-top: 16px;
`;


export const Spacing = styled.View`
  margin-bottom: 16px;
`;
