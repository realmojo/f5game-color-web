import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Spin, Button } from "antd";
import { Share } from "./Share";
import "./Result.css";
import { AdsenseResult } from "./adsense/result";
import { AdsenseResult2 } from "./adsense/result2";

const resultInfo = [
  {
    status: "초보적인 미적감각",
    message: "혹시 색맹은 아니시죠?",
    percent: "100%",
  },
  {
    status: "일반수준의 미적감각",
    message: "그래도 기본은 하시네요!",
    percent: "60%",
  },
  {
    status: "훌륭한 미적감각",
    message: "훌륭한 색상을 구분할 수 있네요!",
    percent: "40%",
  },
  {
    status: "미대전공생",
    message: "미대전공생 정도의 수준이시군요!",
    percent: "20%",
  },
  {
    status: "빈센트 반고흐",
    message: "미술과 관련된 직업을 갖고 계신계 분명합니다!",
    percent: "5%",
  },
  {
    status: "신의 경지",
    message: "여기까지 색상을 구분하는 것만해도 상위 1%입니다!",
    percent: "1%",
  },
  {
    status: "사색자",
    message:
      "당신은 보통사람의 100배이상 색상을 구분할 수 있는 시력을 가지고 있습니다.",
    percent: "0.1%",
  },
];

export const Result = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isResult, setIsResult] = useState(false);
  const [r, setR] = useState(resultInfo[0]);
  const { level } = location.state;
  useEffect(() => {
    if (level >= 1 && level < 10) {
      setR(resultInfo[0]);
    } else if (level >= 11 && level <= 20) {
      setR(resultInfo[1]);
    } else if (level >= 21 && level <= 30) {
      setR(resultInfo[2]);
    } else if (level >= 31 && level <= 40) {
      setR(resultInfo[3]);
    } else if (level >= 41 && level <= 50) {
      setR(resultInfo[4]);
    } else if (level >= 51 && level < 60) {
      setR(resultInfo[5]);
    } else if (level >= 60) {
      setR(resultInfo[6]);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [level]);
  return (
    <div className="flex justify-center flex-col">
      {!isResult ? (
        <>
          <h1 className="text-3xl text-center pt-16">
            결과를 기다리고 있습니다.
          </h1>
          {isLoading ? (
            <div className="text-center pt-4 mb-2">
              <Spin size="large" />
            </div>
          ) : (
            ""
          )}
          <AdsenseResult />
          {isLoading ? (
            ""
          ) : (
            <div className="text-center">
              <Button
                className="mt-2 mb-2"
                style={{ width: 336 }}
                type="primary"
                size="large"
                onClick={() => setIsResult(true)}
              >
                확인하기
              </Button>
            </div>
          )}
        </>
      ) : (
        <>
          <h1 className="text-3xl text-bold text-center  pt-16">
            <strong>상위 {r.percent}</strong>
          </h1>
          <div className="text-center text-xl pt-4 mb-2">
            <strong>{level}단계</strong>까지 오셨네요. {r.message}
          </div>

          <AdsenseResult2 />
          <div className="text-center mb-2">
            캡쳐해서 친구들에게 자랑해보세요.
          </div>
          <Share />
          <div className="text-center pb-4">
            <Button
              className="mt-2 mb-2"
              style={{ width: 336 }}
              type="primary"
              size="large"
            >
              <a href="https://mbti.f5game.co.kr">MBTI 검사 테스트</a>
            </Button>
            <Button
              className="mt-2 mb-2"
              style={{ width: 336 }}
              type="primary"
              size="large"
            >
              <a href="https://color-age.f5game.co.kr">정신연령 테스트</a>
            </Button>
            <Button
              className="mt-2 mb-2"
              style={{ width: 336 }}
              type="primary"
              size="large"
            >
              <a href="https://animal.f5game.co.kr">영적동물 테스트</a>
            </Button>
            <Button
              className="mt-2 mb-2"
              style={{ width: 336 }}
              type="primary"
              size="large"
            >
              <a href="https://play.google.com/store/apps/details?id=com.f5game.mbti">
                MBTI 블라인드
              </a>
            </Button>
            <Button
              className="mt-2"
              style={{ width: 336 }}
              type="primary"
              size="large"
            >
              <a href="https://play.google.com/store/apps/details?id=com.f5game.today">
                오늘의 운세
              </a>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
