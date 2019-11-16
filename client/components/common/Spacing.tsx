import styled from 'styled-components/native';

interface Props {
  vertical?: boolean;
  amount?: number;
}

const Spacing = styled.View<Props>`
  ${props => !props.vertical && `width: ${props.amount || 16};`}
  ${props => props.vertical && `height: ${props.amount || 16};`};
`;

export default Spacing;
