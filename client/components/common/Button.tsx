import React from 'react';
import styled from 'styled-components/native';
import Text from './Text';
import theme from '../../constants/theme';

interface Props {
  variant?: 'primary' | 'secondary';
  onPress?: any;
}

const getBg = (props: any) => {
  if (props.variant === 'secondary') return props.theme.grey.light1;
  return props.theme.primary.base;
};

const getColor = (props: any) => {
  if (props.variant === 'secondary') return theme.grey.dark3;
  return '#fff';
};

const ButtonBase = styled.TouchableOpacity<Props>`
  padding: 12px;
  border-radius: 4px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-color: ${getBg};
  flex-direction: row;
`;

const Button: React.FC<Props> = ({ children, ...rest }) => (
  <ButtonBase {...rest}>
    <Text color={getColor(rest)} weight={500}>
      {children}
    </Text>
  </ButtonBase>
);

Button.defaultProps = {
  variant: 'primary',
};

export default Button;
