import React from "react";
import "./Card.scss";

interface CardProps {
    children: React.ReactNode;
}

export const Card = (props: CardProps) => {
  return (
  <div className="card">{props.children}</div>
  );
};
