import { FC } from "react";
import { TextInputMaskProps } from "react-native-text-input-mask";

import { InputContainer } from "./styles";

export interface InputProps extends TextInputMaskProps {
  name: string;
}

export const Input: FC<InputProps> = ({ name: _name, ...props }) => {
  return <InputContainer {...props} />;
};
