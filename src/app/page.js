"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const quizData = [
  {
    question: "What sound does a cat make?",
    options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
    correctAnswer: 1,
  },
  {
    question: "What would you probably find in your fridge?",
    options: ["Shoes", "Ice Cream", "Books"],
    correctAnswer: 1,
  },
  {
    question: "What color are bananas?",
    options: ["Blue", "Yellow", "Red"],
    correctAnswer: 1,
  },
  {
    question: "How many stars are in the sky?",
    options: ["Two", "Infinite", "One Hundred"],
    correctAnswer: 1,
  },
];

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [hoveredOption, setHoveredOption] = useState(null);

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setAnswers([...answers, selectedAnswer]);
      setSelectedAnswer(null);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const newAnswers = [...answers];
      const previousAnswer = newAnswers.pop();
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(previousAnswer);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      const finalAnswers = [...answers, selectedAnswer];
      setAnswers(finalAnswers);
      setShowResults(true);
    }
  };

  const handleStartAgain = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResults(false);
    setAnimatedScore(0);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100;
  };

  const getMotivationalQuote = (score) => {
    if (score === 100) return "Perfect Score!";
    if (score >= 75) return "Well Done!";
    if (score >= 50) return "Good Job!";
    return "Keep Learning!";
  };

  useEffect(() => {
    if (showResults) {
      const finalScore = calculateScore();
      let currentScore = 0;
      const increment = finalScore / 50;
      const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= finalScore) {
          setAnimatedScore(finalScore);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(currentScore));
        }
      }, 20);
      return () => clearInterval(timer);
    }
  }, [showResults]);

  if (showResults) {
    const score = calculateScore();
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
        style={{
          background: "#FFFFFF",
        }}
      >
        <div
          className="rounded-3xl sm:rounded-[40px] p-8 sm:p-12 md:p-16 text-center w-full max-w-2xl"
          style={{
            backgroundColor: "#FFFFFF",
          }}
        >
          <p
            className="text-sm sm:text-base mb-6 sm:mb-8"
            style={{
              fontFamily: "Manrope, sans-serif",
              color: "#15313D",
            }}
          >
            {getMotivationalQuote(score)}
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 px-4"
            style={{
              fontFamily: "DM Serif Display, serif",
              fontStyle: "italic",
              background: "linear-gradient(to right, #15313D, #3CABDA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Your Final score is
          </h2>
          <div
            className="mb-6 sm:mb-8"
            style={{
              fontFamily: "DM Serif Display, serif",
              fontStyle: "italic",
              fontSize: "clamp(80px, 15vw, 140px)",
              fontWeight: "bold",
              background: "linear-gradient(to right, #15313D, #3CABDA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: "1",
            }}
          >
            {Math.floor(animatedScore)}
            <span style={{ fontSize: "clamp(40px, 7vw, 70px)" }}>%</span>
          </div>
          <button
            onClick={handleStartAgain}
            className="px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-medium transition-all"
            style={{
              fontFamily: "Inter, sans-serif",
              background: "linear-gradient(to right, #C6E9F7, #E5F8FF)",
              color: "#15313D",
              border: "1px solid rgba(150, 229, 255, 0.3)",
            }}
          >
            Start Again
          </button>
        </div>
        <footer className="absolute bottom-2 sm:bottom-4 left-0 right-0 text-center px-4">
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              color: "#15313D",
              opacity: 0.7,
            }}
          >
            Preethi MS - RA2211031010056
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative"
      style={{
        background:
          "linear-gradient(107.96deg, #BECFEE 0%, #71C6E2 50%, #D9F4FA 75%, #BECFEE 100%)",
      }}
    >
      <div
        className="rounded-3xl sm:rounded-[40px] md:rounded-[50px] p-4 sm:p-8 md:p-12 max-w-7xl w-full relative"
        style={{
          background:
            "linear-gradient(112.86deg, rgba(255, 255, 255, 0.4) -6.68%, rgba(255, 255, 255, 0.12) 45.63%, rgba(255, 255, 255, 0.4) 103.45%)",
          border: "0.72px solid #FFFFFF",
          backdropFilter: "blur(200px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {currentQuestion === 0 && (
          <div className="hidden lg:block absolute left-40 top-3/4 -translate-y-1/4 -translate-x-16 z-10">
            <div className="relative">
              <div
                className="bg-white rounded-3xl px-6 py-4 shadow-lg relative"
                style={{
                  border: "3px solid #71C6E2",
                }}
              >
                <div
                  className="absolute -bottom-5 left-3/4 -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: "20px solid transparent",
                    borderRight: "20px solid transparent",
                    borderTop: "20px solid #71C6E2",
                  }}
                >
                  <div
                    className="absolute -top-5.25 left-1/2 -translate-x-1/2 w-0 h-0"
                    style={{
                      borderLeft: "17px solid transparent",
                      borderRight: "17px solid transparent",
                      borderTop: "17px solid white",
                    }}
                  ></div>
                </div>
                <p
                  style={{
                    fontFamily: "Caveat Brush, cursive",
                    fontWeight: "400",
                    fontSize: "32.73px",
                    lineHeight: "19.64px",
                    letterSpacing: "-0.82px",
                    textAlign: "center",
                    color: "#15313D",
                    padding: "8px 0",
                  }}
                >
                  Best of Luck !
                </p>
              </div>
              <div className="mt-4 flex justify-center">
                <img
                  src="/bestofluck.gif"
                  alt="Paw"
                  className="w-28 h-28 object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextElementSibling.style.display = "block";
                  }}
                />
                <div style={{ display: "none" }} className="w-32 h-32">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <ellipse
                      cx="50"
                      cy="70"
                      rx="25"
                      ry="30"
                      fill="#ffc0cb"
                      opacity="0.6"
                    />
                    <circle cx="35" cy="45" r="12" fill="#ffb6c1" />
                    <circle cx="65" cy="45" r="12" fill="#ffb6c1" />
                    <circle cx="50" cy="35" r="12" fill="#ffb6c1" />
                    <ellipse cx="40" cy="55" rx="6" ry="8" fill="#ffb6c1" />
                    <ellipse cx="60" cy="55" rx="6" ry="8" fill="#ffb6c1" />
                    <ellipse cx="50" cy="65" rx="8" ry="10" fill="#ff69b4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className="rounded-3xl sm:rounded-[40px] p-6 sm:p-8 md:p-12"
          style={{
            backgroundColor: "#F4FDFF",
          }}
        >
          <div className="text-center mb-6 sm:mb-8 md:mb-10 w-full max-w-4xl mx-auto px-2">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-3"
              style={{
                fontFamily: "DM Serif Display, serif",
                fontStyle: "italic",
                background: "linear-gradient(to right, #15313D, #3CABDA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Test Your Knowledge
            </h1>
            <p
              className="text-sm sm:text-base md:text-lg"
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "#15313D",
              }}
            >
              Answer all questions to see your results
            </p>
          </div>

          <div className="mb-6 sm:mb-8 w-full max-w-4xl mx-auto px-2">
            <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10">
              {quizData.map((_, index) => (
                <div
                  key={index}
                  className="h-1.5 flex-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      index <= currentQuestion ? "#15313D" : "transparent",
                    border:
                      index > currentQuestion
                        ? "1px solid rgba(21, 49, 61, 0.2)"
                        : "none",
                  }}
                />
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 w-full max-w-4xl mx-auto"
            style={{
              background: "linear-gradient(to right, #C6E9F7, #E5F8FF)",
              border: "1px solid #96E5FF",
            }}
          >
            <h2
              className="text-base sm:text-lg md:text-xl text-center"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: "600",
                color: "#15313D",
              }}
            >
              {currentQuestion + 1}. {quizData[currentQuestion].question}
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 w-full max-w-4xl mx-auto">
            {quizData[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                onMouseEnter={() => setHoveredOption(index)}
                onMouseLeave={() => setHoveredOption(null)}
                className="w-full p-4 sm:p-5 rounded-xl text-center"
                transition={{ duration: 0.3, ease: "easeOut" }}
                animate={{
                  scale:
                    selectedAnswer === index || hoveredOption === index
                      ? 1.02
                      : 1,
                  opacity:
                    selectedAnswer === index || hoveredOption === index
                      ? 1
                      : 0.85,
                }}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  background:
                    selectedAnswer === index || hoveredOption === index
                      ? "linear-gradient(to right, #C6E9F7, #E5F8FF)"
                      : "linear-gradient(89.72deg, rgba(198,233,247,0.1) 0.09%, rgba(229,248,255,0.1) 99.91%)",
                  color: "#15313D",
                  border:
                    selectedAnswer === index || hoveredOption === index
                      ? "1px solid #96E5FF"
                      : "1px solid rgba(150,229,255,0.5)",
                }}
              >
                {option}
              </motion.button>
            ))}
          </div>

          <div className="flex justify-end gap-2 sm:gap-3 items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="p-2.5 sm:p-3 rounded-xl transition-all"
              style={{
                background:
                  currentQuestion === 0
                    ? "#E5E7EB"
                    : "linear-gradient(to right, #C6E9F7, #E5F8FF)",
                border:
                  currentQuestion === 0
                    ? "none"
                    : "1px solid rgba(150, 229, 255, 0.5)",
                color: currentQuestion === 0 ? "#9CA3AF" : "#15313D",
                cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
              }}
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {currentQuestion < quizData.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="p-2.5 sm:p-3 rounded-xl transition-all"
                style={{
                  background:
                    selectedAnswer === null
                      ? "#E5E7EB"
                      : "linear-gradient(to right, #C6E9F7, #E5F8FF)",
                  border:
                    selectedAnswer === null
                      ? "none"
                      : "1px solid rgba(150, 229, 255, 0.5)",
                  color: selectedAnswer === null ? "#9CA3AF" : "#15313D",
                  cursor: selectedAnswer === null ? "not-allowed" : "pointer",
                }}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all text-sm sm:text-base"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "500",
                  background:
                    selectedAnswer === null
                      ? "#E5E7EB"
                      : "linear-gradient(to right, #C6E9F7, #E5F8FF)",
                  border:
                    selectedAnswer === null
                      ? "none"
                      : "1px solid rgba(150, 229, 255, 0.5)",
                  color: selectedAnswer === null ? "#9CA3AF" : "#15313D",
                  cursor: selectedAnswer === null ? "not-allowed" : "pointer",
                }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Caveat+Brush&display=swap");
      `}</style>

      <footer className="absolute bottom-2 sm:bottom-4 left-0 right-0 text-center px-4">
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(11px, 2vw, 14px)",
            color: "#15313D",
            opacity: 0.7,
          }}
        >
          Preethi MS - RA2211031010056
        </p>
      </footer>
    </div>
  );
}
