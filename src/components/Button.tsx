import { Button, ButtonProps } from "react-native";

interface IButtonProps extends ButtonProps {
  children: string;
}

export function ButtonCostumer({ children }: IButtonProps) {
  return <Button title={children} />;
}
