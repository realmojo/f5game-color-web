import React, { useRef, useLayoutEffect, useState } from "react";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import {
  stages,
  boardWidth,
  totalSpan,
  getRandomNumber,
  easyColor,
  mediumColor,
  hardColor,
  crazyColor,
} from "../assets/stage";

const gutter = 8;
const timerTime = 15;

export const Board = () => {
  const navigate = useNavigate();
  const tileRef = useRef();
  let refTimer = useRef(timerTime);

  const [timer, setTimer] = useState(timerTime);
  const [height, setHeight] = useState(0);
  const [marginTop, setMarginTop] = useState(0);
  const [tileColorRandomNumber, setTileColorRandomNumber] = useState(
    getRandomNumber(9)
  );

  const [stage, setStage] = useState(stages[0]);

  const doNextStage = () => {
    if (stage.level === 60) {
      navigate("/result", { state: { level: stage.level } });
    } else {
      setTimer(timerTime);
      refTimer.current = timerTime;
      setStage(stages[stage.level]);
      setTileColorRandomNumber(getRandomNumber(9));
    }
  };

  const doClick = (i) => {
    if (refTimer.current <= 0) {
      navigate("/result", { state: { level: stage.level } });
    } else if (i === stage.answerKey) {
      doNextStage();
    } else {
      setTimer((refTimer.current -= 2));
    }
  };

  const drawTile = (stage, tileRef, height, marginTop) => {
    const t = [];
    let tileColor = [];
    if (stage.name === "easy") {
      tileColor = easyColor[tileColorRandomNumber];
    } else if (stage.name === "medium") {
      tileColor = mediumColor[tileColorRandomNumber];
    } else if (stage.name === "hard") {
      tileColor = hardColor[tileColorRandomNumber];
    } else if (stage.name === "crazy") {
      tileColor = crazyColor[tileColorRandomNumber];
    }
    for (let i = 0; i < stage.tileNumber * stage.tileNumber; i++) {
      t.push(
        <Col
          key={i}
          className="tile"
          ref={tileRef}
          span={totalSpan / stage.tileNumber}
          onClick={() => doClick(i)}
        >
          <div
            className="tile-inner"
            style={{
              marginTop: `${marginTop}px`,
              height: `${height}px`,
              backgroundColor:
                stage.answerKey === i
                  ? tileColor.answerColor
                  : tileColor.normalColor,
            }}
          ></div>
        </Col>
      );
    }
    return t;
  };

  useLayoutEffect(() => {
    const tileWidth = tileRef.current.offsetWidth - gutter;
    setHeight(tileWidth);

    const marginTop = boardWidth - tileWidth * stage.tileNumber;
    setMarginTop(marginTop / (stage.tileNumber - 1));

    const interval = setInterval(() => {
      if (refTimer.current <= 0) {
        navigate("/result", { state: { level: stage.level } });
        clearInterval(interval);
      } else {
        setTimer((refTimer.current -= 1));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [stage, navigate]);
  // life 목숨 3개

  //
  return (
    <div className="flex justify-center flex-col">
      <h1 className="text-3xl text-center pt-16">Level {stage.level}</h1>
      <div className="text-2xl text-center text-orange-300 pt-4">{timer}</div>
      <div
        className="board-wrap text-center pt-4 text-center"
        style={{
          minWidth: boardWidth,
          minHeight: boardWidth,
          margin: "0 auto",
        }}
      >
        <Row gutter={gutter}>{drawTile(stage, tileRef, height, marginTop)}</Row>
      </div>
    </div>
  );
};
