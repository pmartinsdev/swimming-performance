import { FC } from "react";
import { MaskedTextInputProps, MaskedTextInput } from "react-native-mask-text";

import { InputContainerStyle } from "./styles";

export interface InputProps extends MaskedTextInputProps {
  name: string;
}

export const Input: FC<InputProps> = ({ name: _name, ...props }) => {
  return (
    <MaskedTextInput {...props} style={InputContainerStyle} testID="input" />
  );
};
