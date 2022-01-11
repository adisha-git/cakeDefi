import React from "react";
import "./Button.scss";

interface ButtonProps {
  btnText: string;
//   onClick: () => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <div className='btnComponent'>
      {props.btnText}
    </div>
  );
};
