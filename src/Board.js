import Box from "./Box";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

function Board() {
  const [boxes, setboxes] = useState(Array(9).fill(""));
  const [curSign, setcurSign] = useState("X");
  const [winner, setWinner] = useState("");
  const [iSMatchDraw, setISMatchDraw] = useState(false);

  const checkForWinner = () => {
    const winnerPos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winnerPos.length; i++) {
      let [pos1, pos2, pos3] = winnerPos[i];
      if (
        boxes[pos1] !== "" &&
        boxes[pos1] === boxes[pos2] &&
        boxes[pos2] === boxes[pos3]
      ) {
        setWinner(boxes[pos1]);
        break;
      }
    }
  };

  const addSign = (idx) => {
    //if box isfilled no need to anything
    if (boxes[idx] !== "" || winner !== "") {
      return;
    }

    //update box value
    const newboxes = boxes.slice();
    newboxes[idx] = curSign;
    setboxes(newboxes);

    //update the sign
    setcurSign(curSign === "O" ? "X" : "O");
  };

  const checkForDraw = () => {
    const allChecked = boxes.filter((box) => box === "").length === 0;
    if (winner === "" && allChecked) {
      setISMatchDraw(true);
    }
  };

  useEffect(() => {
    checkForWinner();
    checkForDraw();
  }, [boxes]);

  const restartGame = () => {
    setboxes(Array(9).fill(""));
    setcurSign("");
    setWinner("");
    setISMatchDraw(false);
  };
  return (
    <>
      {winner !== "" && <Confetti />}
      {winner !== "" && <h1>Winner is {winner}!!</h1>}
      {iSMatchDraw && <h1>Match Draw!!</h1>}
      <div className="board">
        {boxes.map((boxValue, idx) => (
          <Box sign={boxValue} addSign={() => addSign(idx)} />
        ))}
      </div>
      <button onClick={restartGame}>Restart</button>
    </>
  );
}

export default Board;
