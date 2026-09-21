import * as React from "react";
import { useState } from "react";

import styles from "./button.module.scss";
const HEX_DIGITS = "0123456789abcdef";
const getRandomColor = (): string => {
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += HEX_DIGITS[Math.floor(Math.random() * HEX_DIGITS.length)];
  }
  return color;
};
const Button = (): JSX.Element => {
  const [color, setColor] = useState(getRandomColor());

  const handleClick = (): void => {
    setColor(getRandomColor());
  };
  return (
    <div
      className={styles.button}
      style={{ background: color }}
      onClick={handleClick}
    >
      Toggle Color
    </div>
  );
};

export default Button;
