import Dice from "./Dice";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function TenzieBoard() {
  const [rolls, setRolls] = useState([]);
  const [isGameEnded, setIsGameEnded] = useState(false);

  function initialiseGame() {
    let newRollArr = [];
    for (let i = 0; i < 10; i++) {
      newRollArr.push({
        id: i,
        isClicked: false,
        value: Math.ceil(Math.random() * 3),
      });
    }
    setRolls(newRollArr);
    setIsGameEnded(false);
  }

  function handleRoll() {
    isGameEnded ? initialiseGame() : generateRolls();
  }

  function generateRolls() {
    setRolls((prevRolls) => {
      return prevRolls.map((roll) => {
        if (roll.isClicked) {
          return { ...roll };
        } else {
          return {
            ...roll,
            value: Math.ceil(Math.random() * 3),
          };
        }
      });
    });
  }

  function handleChoice(id) {
    setRolls((prevRolls) =>
      prevRolls.map((roll) =>
        roll.id === id ? { ...roll, isClicked: !roll.isClicked } : { ...roll }
      )
    );
    checkWinCondition();
  }

  function checkWinCondition() {
    let winCondition = 0;
    for (let i = 0; i < 10; i++) {
      if (rolls[0].value === rolls[i].value) {
        winCondition += 1;
      }
    }
    console.log(winCondition);
    if (winCondition === 10) {
      setIsGameEnded(true);
    }
  }

  const diceHtml = rolls.map((roll) => {
    return (
      <Dice
        value={roll.value}
        key={roll.id}
        isClicked={roll.isClicked}
        handleChoice={() => handleChoice(roll.id)}
      />
    );
  });
  useEffect(() => {
    initialiseGame();
  }, []);

  return (
    <>
      {isGameEnded && <Confetti width={window.innerWidth} />}
      <div className="board">
        <div className="content">
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls
          </p>
          <div className="dice-container">{diceHtml}</div>
          <button className="roll-btn" onClick={handleRoll}>
            {isGameEnded ? "Restart" : "Roll"}
          </button>
        </div>
      </div>
    </>
  );
}
