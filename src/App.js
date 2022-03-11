import React, { useState } from "react";
import logo from "./assest/summitechLogo.png";
import "./App.css";
import { CalcBase } from "./components/Base/index";
import { Display } from "./components/Screen/index";
import { Box } from "./components/Button/container";
import { Button } from "./components/Button/button";

const btnValues = [
  ["C", "", "", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
const removeSpaces = (num) => num.toString().replace(/\s/g, " ");

const App = () => {

  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  // for reseting (C)
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: "",
      res: "",
    });
  };

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  // for the signs (+,-,*,/)
  const signClickHandler = (e) => {
    setCalc({
      ...calc,
      sign: e.target.innerHTML,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  // for solving
  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : Math.floor(a / b);

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? ""
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <a href="#">
          <img src={logo} className="App-logo" alt="logo" />
        </a>
      </header>
      <CalcBase>
        <Display value={calc.num ? calc.num : calc.res} />
        <Box>
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={
                  btn === "C"
                    ? resetClickHandler
                    : btn === "="
                    ? equalsClickHandler
                    : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                    ? signClickHandler
                    : numClickHandler
                }
              />
            );
          })}
        </Box>
      </CalcBase>
    </div>
  );
};

export default App;
