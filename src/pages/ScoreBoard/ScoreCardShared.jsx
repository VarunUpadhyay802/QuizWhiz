import React, { useEffect, useState, useContext } from "react";
import "./Scoreboard.css";
import { AiOutlineHome, AiOutlineEye } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { BsShare } from "react-icons/bs";
import quizContext from "../../context/quizContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountUp from "react-countup";

const ScoreCardShared = (props) => {
  const context = useContext(quizContext);
  const { setNext, setScore, setAnswerList } = context;
  const navigate = useNavigate();
  const location = useLocation();

  const [totalQue, setTotalQue] = useState(0);
  const [correctQue, setCorrectQue] = useState(0);
  const [wrongQue, setWrongQue] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [attempted, setAttempted] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const total = queryParams.get("total");
    const correct = queryParams.get("correct");
    const wrong = queryParams.get("wrong");
    const perc = queryParams.get("percentage");

    if (total) setTotalQue(total);
    if (correct) setCorrectQue(correct);
    if (wrong) setWrongQue(wrong);
    if (perc) setPercentage(perc);

    // Calculate attempted percentage
    if (total && correct && wrong) {
      const attemptedPercentage = ((Number(correct) + Number(wrong)) / Number(total)) * 100;
      setAttempted(attemptedPercentage);
    }
  }, [location.search]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handlePlayAgain = () => {
    setNext(0);
    setScore({ rightAnswers: 0, wrongAnswers: 0 });
    setAnswerList([]);
  };

  const generateShareableLink = () => {
    const shareUrl = `${window.location.origin}/share?total=${totalQue}&correct=${correctQue}&wrong=${wrongQue}&percentage=${percentage.toFixed(
      2
    )}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success("Score URL copied to clipboard!");
    });
  };

  return (
    <>
      <div className="main">
        <ToastContainer />
        <div className="score" style={{marginTop:"4px" , display:"flex", flexDirection:"column"}}>
          <div>Your Score</div>
          <span style={{fontSize:"33.5px"}}>
            {Number(percentage).toFixed(2)} %
          </span>
        </div>
        <div className="point-table">
          <div className="semi-table">
            <div
              style={{ backgroundColor: "#A45EDA" }}
              className="circle"
            ></div>
            <div className="mx-2 ">
              <div style={{ color: "#A45EDA" }} className="point">
                {attempted.toFixed(2)}%
              </div>
              <div className="point-info">Attempted</div>
            </div>
          </div>
          <div className="semi-table">
            <div
              style={{ backgroundColor: "#A45EDA" }}
              className="circle"
            ></div>
            <div className="mx-2">
              <div style={{ color: "#A45EDA" }} className="point">
                {totalQue}
              </div>
              <div className="point-info">Total Questions</div>
            </div>
          </div>
          <div className="semi-table">
            <div
              style={{ backgroundColor: "rgb(6 143 86)" }}
              className="circle"
            ></div>
            <div className="mx-2">
              <div style={{ color: "rgb(6 143 86)" }} className="point">
                {correctQue}
              </div>
              <div className="point-info">Correct</div>
            </div>
          </div>
          <div className="semi-table">
            <div
              style={{ backgroundColor: "rgb(223 75 75)" }}
              className="circle"
            ></div>
            <div className="mx-2">
              <div style={{ color: "rgb(223 75 75)" }} className="point">
                {wrongQue}
              </div>
              <div className="point-info">Wrong</div>
            </div>
          </div>
          <div className="footer">
            <div className="text-center" onClick={handleGoHome}>
              <div style={{ backgroundColor: "#BE709F" }} className="home-btn">
                <AiOutlineHome />
              </div>
              <div className="footer-text">Home</div>
            </div>
            <div className="text-center" onClick={generateShareableLink}>
              <div style={{ backgroundColor: "#755ED3" }} className="home-btn">
                <BsShare />
              </div>
              <div className="footer-text">Share Score</div>
            </div>
            {/* <div className="text-center">
              <Link to="/review">
                <div
                  style={{ backgroundColor: "#BF8D6F" }}
                  className="home-btn"
                >
                  <AiOutlineEye />
                </div>
              </Link>
              <div className="footer-text">Review Answer</div>
            </div> */}
            <div className="text-center" onClick={handlePlayAgain}>
              <div style={{ backgroundColor: "#5492B3" }} className="home-btn">
                <BiReset />
              </div>
              <div className="footer-text">Play Again</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreCardShared;
