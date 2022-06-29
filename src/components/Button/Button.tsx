import React, { FC } from "react";
import "./Button.css";

export interface ButtonProps {
  label: string;
  onClick: () => any;
}

const Button: FC<ButtonProps> = (props) => {
  return <button onClick={props.onClick}>{props.label}</button>;
};

export default Button;
