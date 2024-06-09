// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "../../css/ResultScreen/ResultScreen.scss";
import PopupData from "./PopupDataList.json";
import ResultList from "./ResultList.json";
import headerImg from "../../IMG/ResultScreen/header.jpg";
import homeIcon from "../../IMG/ResultScreen/homeIcon.png";

const ResultScreen = () => {
  const { result } = useParams();
  const data = ResultList.find((item) => item.path === result);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPopup, setSelectedPopup] = useState(null);
  const movePage = useNavigate();

  if (!data) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  const mainPicture = data.picture;
  const perfumes = data.perfume.map((perfume) => ({
    ...perfume,
    image: perfume.image,
  }));
  const keywords = data.keyword;

  const subPicture = data.subPicture;
  // eslint-disable-next-line no-unused-vars
  const ratio = data.perfume.map((perfume) => ({
    ...perfume,
    image: perfume.image,
  }));

  const openModal = (popup) => {
    setSelectedPopup(popup);
    setModalIsOpen(true);
    document.body.classList.add("body-no-scroll");
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPopup(null);
    document.body.classList.remove("body-no-scroll");
  };

  // useEffect 사용하여 컴포넌트 언마운트 시 스크롤 방지 해제
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, []);

  const goToHome = () => {
    movePage("/");
  };

  return (
    <div className="result-screen">
      <header>
        <img src={headerImg} alt="Header" className="header-img" />
      </header>
      <main>
        <div className="header-content">
          <img
            src={mainPicture}
            alt={`${data.path} Picture`}
            className="main-picture"
          />
          <div className="keywords">
            {keywords.map((keyword, index) => (
              <h1 key={index} className="keyword">
                # {keyword.content}
              </h1>
            ))}
          </div>
        </div>
        <div className="perfumes">
          {perfumes.map((perfume, index) => (
            <div key={index} className="perfume">
              <img src={perfume.image} alt={`${perfume.title} Image`} />
              <h1>{perfume.title}</h1>
              <p>{perfume.detail}</p>
            </div>
          ))}
        </div>
        <img
            src={subPicture}
            alt={`${data.path} subPicture`}
            className="ratio"
          />

        <div className="button-container">
          {PopupData.map((popup, index) => (
            <button
              key={index}
              onClick={() => openModal(popup)}
              className="popup-button"
            >
              <img
                src={`/IMG/popup/${popup.id}`}
                alt={`${popup.title} Button`}
                className="popup-button-image"
              />
              <span className="popup-button-text">{popup.title}</span>{" "}
            </button>
          ))}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="popup-modal"
          overlayClassName="popup-overlay"
        >
          <div className="popup-content-container">
            {selectedPopup && (
              <div className="popup-content">
                <h1 className="popup-title">{selectedPopup.title}</h1>
                <div className="popup-grid">
                  {selectedPopup.data.map((item, idx) => (
                    <div key={idx} className="popup-item">
                      <img
                        src={`/IMG/popup/${item.image}`}
                        className="popup-item-image"
                        alt={`${item.content}`}
                      />
                      <p className="item-content">{item.content}</p>
                    </div>
                  ))}
                </div>
                <button onClick={closeModal} className="close-button">
                  닫기
                </button>
              </div>
            )}
          </div>
        </Modal>
      </main>
      <footer>
        <img src={headerImg} alt="Footer" className="footer-img" />
        <button onClick={goToHome} className="home-button">
          <img src={homeIcon} alt="Home" className="home-icon" />
        </button>
      </footer>

      
    </div>
  );
};

export default ResultScreen;
