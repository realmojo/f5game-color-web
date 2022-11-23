import React, { useEffect } from "react";
import { message } from "antd";

const success = () => {
  message.success("URL이 복사되었습니다.");
};
export const Share = () => {
  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        `https://color.f5game.co.kr`
      )}&t=다른 색상을 찾아보세요`,
      "_blank",
      "width=600, height: 400"
    );
  };
  const copy = () => {
    success();
    var textarea = document.createElement("textarea");
    textarea.value = `https://color.f5game.co.kr`;

    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999); // 추가

    document.execCommand("copy");
    document.body.removeChild(textarea);
  };
  const createKakaoButton = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init("30aba172e086dc999f2c872ca9f10f76");
      }
      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "F5 Games - 색맹 테스트, 색상 사색자 테스트",
          description:
            "색상이 비슷하지만 다른 하나를 찾아보세요. 당신이 사색자일수도 있습니다. 총 60단계 까지 있습니다.",
          imageUrl: "https://f5game.s3.ap-northeast-2.amazonaws.com/color.png",
          link: {
            mobileWebUrl: "https://color.f5game.co.kr",
            webUrl: "https://color.f5game.co.kr",
          },
        },
        buttons: [
          {
            title: "플레이 하기",
            link: {
              mobileWebUrl: "https://color.f5game.co.kr",
              webUrl: "https://color.f5game.co.kr",
            },
          },
        ],
      });
    }
  };
  useEffect(() => {
    createKakaoButton();
  }, []);
  return (
    <>
      <div className="flex justify-center px-4 pt-4 pb-4">
        <div
          className="twitter-share-button inline"
          style={{ cursor: "pointer" }}
        >
          <a
            href={`https://twitter.com/intent/tweet?text=다른 색상 찾기 테스트?&url=https://color.f5game.co.kr&hashtags=#색상#찾기}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://f5game.s3.ap-northeast-2.amazonaws.com/twitter.png"
              alt="twitter-share-icon"
              style={{ width: 90 }}
            />
          </a>
        </div>
        <div
          className="facebook-share-button pt-1 inline"
          onClick={() => shareFacebook()}
          style={{ cursor: "pointer" }}
        >
          <img
            src="https://f5game.s3.ap-northeast-2.amazonaws.com/facebook.png"
            alt="facebook-share-icon"
            style={{ width: 80 }}
          />
        </div>
        <div
          className="kakao-share-button inline"
          style={{ cursor: "pointer" }}
        >
          <button id="kakao-link-btn">
            <img
              src="https://f5game.s3.ap-northeast-2.amazonaws.com/kakao.png"
              alt="kakao-share-icon"
              style={{ width: 90 }}
            />
          </button>
        </div>

        <div
          className="link-share-button inline pt-2"
          onClick={() => copy()}
          style={{ cursor: "pointer" }}
        >
          <img
            src="https://f5game.s3.ap-northeast-2.amazonaws.com/link.png"
            alt="link-share-icon"
            style={{ width: 70 }}
          />
        </div>
      </div>
    </>
  );
};
