import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Lottie from 'lottie-react';
import confettiAnimation from '../assets/confetti.json';
import correctSound from '../assets/sounds/correct.mp3';
import wrongSound from '../assets/sounds/wrong.mp3';

const QuizContainer = styled(motion.div)`
  background: linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%) !important;
  border-radius: 25px !important;
  padding: 3rem !important;
  max-width: 900px !important;
  width: 95% !important;
  color: white !important;
  position: relative !important;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4) !important;
  overflow: hidden !important;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #4834d4, #686de0, #4834d4);
    background-size: 200% 100%;
    animation: gradient 5s linear infinite;
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);

  .score {
    background: rgba(72, 52, 212, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-weight: 500;
    color: #686de0;
  }

  .question-number {
    color: #686de0;
    font-weight: 500;
  }
`;

const QuizProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-bottom: 2.5rem;
  overflow: hidden;
  position: relative;

  div {
    height: 100%;
    background: linear-gradient(90deg, #4834d4, #686de0);
    width: ${props => (props.progress)}%;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(72, 52, 212, 0.5);
  }
`;

const QuestionText = styled.h2`
  font-size: 1.3rem;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.4;
  font-weight: 500;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const OptionButton = styled(motion.button)`
  width: 100% !important;
  padding: 1.2rem 1.8rem !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 2px solid ${props => props.selected ? '#4834d4' : 'rgba(255, 255, 255, 0.1)'} !important;
  border-radius: 15px !important;
  color: white !important;
  text-align: left !important;
  font-size: 1rem !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  position: relative !important;
  overflow: hidden !important;
  backdrop-filter: blur(5px) !important;
  display: flex !important;
  align-items: center !important;
  gap: 1rem !important;

  &::before {
    content: '${props => String.fromCharCode(65 + props.index)}';
    min-width: 35px;
    height: 35px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 0.9rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2) !important;
  }

  &.correct {
    background: linear-gradient(135deg, #2ecc71, #27ae60) !important;
    border-color: #2ecc71 !important;
    pointer-events: none !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 5px 15px rgba(46, 204, 113, 0.3) !important;
  }

  &.wrong {
    background: linear-gradient(135deg, #e74c3c, #c0392b) !important;
    border-color: #e74c3c !important;
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both !important;
    transform: translate3d(0, 0, 0) !important;
    box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3) !important;
  }

  @keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
  }
`;

const ResultOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ResultCard = styled(motion.div)`
  background: linear-gradient(135deg, #2d2d2d, #1a1a1a);
  padding: 3.5rem;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(90deg, #4834d4, #686de0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.4rem;
    margin-bottom: 2.5rem;
    color: #fff;
  }
`;

const CloseButton = styled(motion.button)`
  background: linear-gradient(90deg, #4834d4, #686de0);
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(72, 52, 212, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(72, 52, 212, 0.4);
  }
`;

const ConfettiOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
`;

const ErrorMessage = styled(motion.p)`
  color: #e74c3c;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
`;

const quizQuestions = [
  {
    id: 1,
    question: "What major event occurs during prophase in mitosis?",
    options: [
      "Chromosomes line up at the metaphase plate",
      "Chromatin condenses into visible chromosomes",
      "The cytoplasm divides into two daughter cells",
      "The sister chromatids separate"
    ],
    correct: 1
  },
  {
    id: 2,
    question: "During metaphase, what ensures proper chromosome alignment?",
    options: [
      "The nuclear membrane reforms",
      "The centrioles disappear",
      "Spindle fibers attach to the kinetochores",
      "DNA replication occurs"
    ],
    correct: 2
  },
  {
    id: 3,
    question: "What happens to the sister chromatids during anaphase?",
    options: [
      "They separate and move to opposite poles",
      "They condense into chromatin",
      "They exchange genetic material",
      "They duplicate again"
    ],
    correct: 0
  },
  {
    id: 4,
    question: "Which of the following occurs in telophase?",
    options: [
      "Chromosomes condense again",
      "The nuclear envelope reforms",
      "The chromosomes replicate",
      "Spindle fibers attach to the kinetochores"
    ],
    correct: 1
  },
  {
    id: 5,
    question: "What event in prophase I increases genetic variation?",
    options: [
      "Sister chromatids separate",
      "Homologous chromosomes undergo crossing over",
      "Spindle fibers pull chromosomes to opposite poles",
      "The nuclear membrane reforms"
    ],
    correct: 1
  },
  {
    id: 6,
    question: "How do chromosomes align during metaphase I?",
    options: [
      "Single file along the equator",
      "In homologous pairs along the equator",
      "Randomly throughout the nucleus",
      "In two separate groups at opposite poles"
    ],
    correct: 1
  },
  {
    id: 7,
    question: "What happens to homologous chromosomes in anaphase I?",
    options: [
      "They separate and move to opposite poles",
      "They duplicate and form chromatids",
      "They exchange genetic material",
      "They remain in the center of the cell"
    ],
    correct: 0
  },
  {
    id: 8,
    question: "What is the chromosome number in the daughter cells after meiosis I?",
    options: [
      "Diploid (2n)",
      "Haploid (n)",
      "Tetraploid (4n)",
      "Unchanged from the parent cell"
    ],
    correct: 1
  },
  {
    id: 9,
    question: "What is a major difference between prophase I and prophase II?",
    options: [
      "Crossing over occurs in prophase II but not in prophase I",
      "Homologous chromosomes pair up in prophase II",
      "No crossing over occurs in prophase II",
      "DNA replication occurs again in prophase II"
    ],
    correct: 2
  },
  {
    id: 10,
    question: "How do chromosomes align during metaphase II?",
    options: [
      "In homologous pairs along the equator",
      "Single file along the equator",
      "Randomly throughout the cell",
      "At opposite poles"
    ],
    correct: 1
  },
  {
    id: 11,
    question: "What separates during anaphase II?",
    options: [
      "Homologous chromosomes",
      "Sister chromatids",
      "Entire nuclei",
      "Centrioles"
    ],
    correct: 1
  },
  {
    id: 12,
    question: "What is the final product of mitosis?",
    options: [
      "Two identical daughter cells",
      "Four genetically unique haploid cells",
      "One large diploid cell",
      "A single cell with double chromosomes"
    ],
    correct: 0
  },
  {
    id: 13,
    question: "What is the final product of meiosis II?",
    options: [
      "Two identical daughter cells",
      "Four genetically unique haploid cells",
      "One large diploid cell",
      "A single cell with double the chromosomes"
    ],
    correct: 1
  },
  {
    id: 14,
    question: "Name the event wherein the paternal and maternal chromosomes change their material with each other in cell division",
    options: [
      "Crossing over",
      "Synapsis",
      "Dyad forming",
      "Bivalent forming"
    ],
    correct: 0
  }
];

const Quiz = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showError, setShowError] = useState(false);

  // Create audio elements
  const correctAudio = new Audio(correctSound);
  const wrongAudio = new Audio(wrongSound);

  const handleAnswer = (index) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
      setShowConfetti(true);
      correctAudio.play();
      setTimeout(() => {
        setShowConfetti(false);
        if (currentQuestion < quizQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setIsAnswered(false);
        } else {
          setShowResult(true);
        }
      }, 2000);
    } else {
      wrongAudio.play();
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setSelectedAnswer(null);
        setIsAnswered(false);
      }, 1000);
    }
  };

  return (
    <QuizContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {showConfetti && (
        <ConfettiOverlay>
          <Lottie
            animationData={confettiAnimation}
            loop={false}
            autoplay
            style={{ width: '100%', height: '100%' }}
          />
        </ConfettiOverlay>
      )}
      
      <QuestionHeader>
        <span className="question-number">Question {currentQuestion + 1}/{quizQuestions.length}</span>
        <span className="score">Score: {score}</span>
      </QuestionHeader>

      <QuizProgressBar progress={(currentQuestion / quizQuestions.length) * 100}>
        <div />
      </QuizProgressBar>

      <QuestionText>
        {quizQuestions[currentQuestion].question}
      </QuestionText>

      <OptionsList>
        {quizQuestions[currentQuestion].options.map((option, index) => (
          <OptionButton
            key={index}
            index={index}
            selected={selectedAnswer === index}
            onClick={() => handleAnswer(index)}
            className={
              isAnswered && index === selectedAnswer
                ? index === quizQuestions[currentQuestion].correct
                  ? 'correct'
                  : 'wrong'
                : ''
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isAnswered}
          >
            {option}
          </OptionButton>
        ))}
      </OptionsList>

      <AnimatePresence>
        {showError && (
          <ErrorMessage
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            Try again! Choose the correct answer to proceed.
          </ErrorMessage>
        )}
      </AnimatePresence>

      {showResult && (
        <ResultOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ResultCard
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <h2>Quiz Complete!</h2>
            <p>Your score: {score}/{quizQuestions.length}</p>
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </CloseButton>
          </ResultCard>
        </ResultOverlay>
      )}
    </QuizContainer>
  );
};

export default Quiz; 