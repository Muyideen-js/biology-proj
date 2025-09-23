 import { useState, useRef } from 'react';
import styled from '@emotion/styled';
import ReactPlayer from 'react-player';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import chromosome from '../assets/chromosome.jpg';
import nucleus from '../assets/nucleus.webp';
import centriole from '../assets/centriole.jpg';
import cytoplasm from '../assets/cytoplasm.jpg';
import spindleFibers from '../assets/SpindleFibers.jpg';  
import homologousHeterologous from '../assets/homologousHeterologous.jpg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import chromosomeVideo from '../assets/vid/Chromosome.mp4';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import mitosisImg from '../assets/mitosis.jpg';
import meiosisImg from '../assets/meiosis.jpg';
import mitosisVideo from '../assets/vid/Mitosis.mp4';
import meiosisVideo from '../assets/vid/Meiosis.mp4';
import Toast from './Toast';
import { AnimatePresence } from 'framer-motion';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { motion } from 'framer-motion';
import Prophase from "../assets/prophase.jpeg"
import Metaphase from "../assets/metaphase.jpeg"
import Anaphase from "../assets/Anaphase.jpeg"
import Telophase from "../assets/Telophase.jpeg"
import Chromosome from "../assets/Chromosome.jpeg"
import Centromere from "../assets/Centromere.jpeg"
import mandm from "../assets/m&m.jpeg"
import Quiz from './Quiz';


const ControlButton = styled.button`
  background: transparent;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    font-size: 1.25rem;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const ProgressBar = styled.div`
  flex-grow: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
`;

const FullscreenButton = styled(ControlButton)`
  width: 35px;
  height: 35px;
  background: transparent;
  color: #4834d4;

  &:hover {
    background: rgba(72, 52, 212, 0.1);
  }

  svg {
    font-size: 1.5rem;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const TopicContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const TopicCard = styled.div`
  width: 100%;
  max-width: 350px;
  background: transparent;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 0.75rem;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  h3 {
    color: #ffffff;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    font-size: 0.85rem;
    color: #a0a0a0;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    
    img {
      height: 180px;
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: #2d2d2d;
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  position: relative;
  overflow-y: auto;
  margin: 1rem;

  h2 {
    color: #ffffff;
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
    padding-right: 40px;
  }

  p {
    color: #b3b3b3;
    line-height: 1.6;
    margin: 1rem 0;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  padding-top: 56.25%;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  overflow: hidden;
  background: #1a1a1a;

  &:hover .controls-overlay {
    opacity: 1;
  }
`;

const ControlsOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
`;

const Progress = styled.div`
  height: 100%;
  background: #4834d4;
  border-radius: 2px;
  width: ${props => props.progress}%;
  transition: width 0.2s ease;
`;

const StyledReactPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;

const VideoControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled(ControlButton)`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 35px;
  height: 35px;
  background: #e74c3c;
  z-index: 2000;

  &:hover {
    background: #c0392b;
  }

  svg {
    font-size: 1.25rem;
  }
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #4834d4;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  h1 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  p {
    font-size: 0.9rem;
    color: #a0a0a0;
    max-width: 600px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

const NextButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #4834d4;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(72, 52, 212, 0.3);

  &:hover {
    background: #686de0;
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.25rem;
  }
`;

const QuizButton = styled(motion.button)`
  width: 100% !important;
  padding: 1.2rem 1.8rem !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 2px solid ${props => props.selected ? '#4834d4' : 'rgba(255, 255, 255, 0.1)'} !important;
  border-radius: 15px !important;
  color: white !important;
  text-align: left !important;
  font-size: 1.1rem !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  position: relative !important;
  overflow: hidden !important;
  backdrop-filter: blur(5px) !important;
  margin-bottom: 1rem !important;

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
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both !important;
    transform: translate3d(0, 0, 0) !important;
  }
`;

const QuizModal = styled(Modal)`
  background: #2d2d2d;
  padding: 2.5rem;
  border-radius: 15px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
`;

const QuizNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const NavButton = styled.button`
  background: #4834d4;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    background: #686de0;
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

const VolumeSlider = styled.input`
  width: 60px;
  height: 3px;
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const mainTopics = [
  {
    id: 0,
    name: "Objectives of the lesson",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop",
    type: "intro",
    description: "Introduction to the project and learning objectives"
  },
  {
    id: 1,
    name: "Definition of cell division",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
    type: "definition",
    description: "Understand what cell division is and why it matters"
  },
  {
    id: 2,
    name: "Types of cell division",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop",
    type: "concept",
    description: "Explore mitosis and meiosis as key division types"
  },
  {
    id: 3,
    name: "Describe the stages of mitosis",
    image: mitosisImg,
    type: "simulation",
    description: "Walk through prophase to telophase in mitosis",
    videos: [
      {
        name: "Mitosis",
        videoUrl: mitosisVideo
      }
    ]
  },
  {
    id: 4,
    name: "Illustrate meiosis I and meiosis II",
    image: meiosisImg,
    type: "simulation",
    description: "Visualize stages across meiosis I and II",
    videos: [
      {
        name: "Meiosis",
        videoUrl: meiosisVideo
      }
    ]
  },
  {
    id: 5,
    name: "Quizzes",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=800&auto=format&fit=crop",
    type: "quiz",
    description: "Test your knowledge with interactive quizzes"
  }
];

const definitionCards = [
  {
    id: 1,
    name: "Chromosomes",
    image: chromosome,
    videoUrl: chromosomeVideo,
    videoDuration: 20,
    description: "Learn about the structure and function of chromosomes and DNA in cell division."
  },
  {
    id: 2,
    name: "Nucleus",
    image: nucleus,
    videoUrl: "https://www.youtube.com/watch?v=EPBSsGqTC8I",
    description: "Understand the process of nuclear division and its importance in cell reproduction."
  },
  {
    id: 3,
    name: "Centriole",
    image: centriole,
    videoUrl: "https://www.youtube.com/watch?v=boX31ln-Ez0",
    description: "Explore the role of centrioles and spindle fibers in cell division."
  },
  {
    id: 4,
    name: "Cytoplasm",
    image: cytoplasm,
    videoUrl: "https://youtu.be/Sx5lxk0iXyE",
    description: "Discover how the cytoplasm divides during cell division."
  },
  {
    id: 5,
    name: "Spindle Fibers",
    image: spindleFibers,
    videoUrl: "https://youtu.be/F0dp7A4IKyY",
    description: "Learn about the formation and function of the mitotic spindle."
  },
  {
    id: 6,
    name: "Homologous and Heterologous",
    image: homologousHeterologous,
    videoUrl: "https://youtu.be/4n80Mgoqr4I",
    description: "Compare and contrast homologous and heterologous chromosomes."
  },
];

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(280px, 350px));
  gap: 1.5rem;
  padding: 1rem;
  max-width: 800px;
  margin: auto;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0.5rem;
  }
`;

const DefinitionGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
  max-width: 1400px;
  margin: 0 auto;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
`;

const definitionContent = [
  {
    id: 1,
    name: "Prophase",
    image: Prophase,
    description: "In prophase, chromatin condenses into chromosomes, the nuclear envelope begins to break down, spindle fibers form, and centrioles move to opposite poles."
  },
  {
    id: 2,
    name: "Metaphase",
    image: Metaphase,
    description: "In metaphase, chromosomes align at the cell's equatorial plate, and spindle fibers attach to their centromeres, preparing for separation."
  },
  {
    id: 3,
    name: "Anaphase",
    image: Anaphase,
    description: "In anaphase, sister chromatids are pulled apart by spindle fibers and move toward opposite poles of the cell."
  },
  {
    id: 4,
    name: "Telophase",
    image: Telophase,
    description: "In telophase, chromosomes reach opposite poles, the nuclear envelope reforms around each set of chromosomes, and the cell prepares to divide into two daughters cell"
  },
  {
    id: 5,
    name: "Chromosome",
    image: Chromosome,
    description: "A chromosome is a thread-like structure made of DNA and proteins that carries genetic information, controlling inheritance and cell functions."
  },
  {
    id: 6,
    name: "Centromere",
    image: Centromere,
    description: "The centromere is the region of a chromosome that links sister chromatids and facilitates their attachment to spindle fibers"
  },
  {
    id: 7,
    name: "Meiosis and Mitosis",
    image: mandm,
    description: `Prophase I - Chromosomes condense, homologous chromosomes pair up, and crossing over occurs.
    Metaphase I - Homologous chromosome pairs align at the cell's equator, attached to spindle fibers.
    Anaphase I - Homologous chromosomes are pulled apart to opposite poles of the cell
    Telophase I - Chromosomes reach the poles, and the cell divides into two haploid daughter cells.
    Prophase II - Spindle fibers reform, and chromosomes condense again in both haploid cells.
    Metaphase II - Chromosomes align individually at the equator of each cell.
    Anaphase II - Sister chromatids are separated and pulled to opposite poles.
    Telophase II - Chromatids reach the poles, nuclear membranes form, and cells divide, resulting in four genetically unique haploid cells`
  }
];

const DefinitionList = styled.div`
  color: white;
  padding: 2rem;

  h2 {
    margin-bottom: 2rem;
    text-align: center; 
    color: #4834d4;
  }

  .definition-item {
    margin-bottom: 2.5rem;
    
    img {
      width: 100%;
      height: 300px;
      object-fit: contain;
      border-radius: 8px;
      margin-bottom: 1rem;
      background: rgba(0, 0, 0, 0.2);
    }

    h3 {
      color: #4834d4;
      margin-bottom: 0.5rem;
    }

    p {
      line-height: 1.6;
    }
  }
`;

const QuizContainer = styled(motion.div)`
  background: linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%) !important;
  border-radius: 25px !important;
  padding: 3rem !important;
  max-width: 900px !important;
  width: 95% !important;
  color: white !important;
  position: relative !important;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4) !important;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const OptionButton = styled(motion.button)`
  width: 100% !important;
  padding: 1.5rem 2rem !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 2px solid ${props => props.selected ? '#4834d4' : 'rgba(255, 255, 255, 0.1)'} !important;
  border-radius: 15px !important;
  color: white !important;
  text-align: left !important;
  font-size: 1.1rem !important;
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

const QuestionText = styled.h2`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 2rem;
  line-height: 1.4;
  font-weight: 500;
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

const RetryButton = styled(motion.button)`
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

const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }

  svg {
    width: 60px;
    height: 60px;
    color: white;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }
`;

const BiologyTopic = () => {  
  const [showConcepts, setShowConcepts] = useState(false);
  const [showDefinitions, setShowDefinitions] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isAnswered, setIsAnswered] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);

  const playerRef = useRef(null);
  const videoContainerRef = useRef(null);

  // Add these states for multiple videos
  const [videoStates, setVideoStates] = useState(
    Array(2).fill({ isPlaying: false, progress: 0, played: 0 })
  );
  const videoRefs = useRef([]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state) => {
    setProgress(state.played * 100);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 0.5 : 0);
  };

  const handleSeekForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    }
  };

  const handleSeekBackward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    }
  };

  const handleProgressBarClick = (index, e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    const percentage = x / width;
    handleVideoSeek(index, percentage);
  };

  const toggleFullscreen = (videoWrapper) => {
    if (!document.fullscreenElement) {
      videoWrapper.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleVideoPlay = (index) => {
    setVideoStates(prev => prev.map((state, i) => 
      i === index ? { ...state, isPlaying: !state.isPlaying } : state
    ));
  };

  const handleVideoProgress = (index, state) => {
    setVideoStates(prev => prev.map((vs, i) => 
      i === index ? { ...vs, progress: state.played, played: state.played } : vs
    ));
  };

  const handleVideoSeek = (index, value) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].seekTo(value, 'fraction');
      setVideoStates(prev => prev.map((state, i) => 
        i === index ? { ...state, progress: value, played: value } : state
      ));
    }
  };

  const handleQuizAnswer = (index) => {
    if (isAnswered[currentQuestion]) return; // Prevent multiple answers

    if (index === quizQuestions[currentQuestion].correct) {
      setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: 'correct' });
      setIsAnswered({ ...isAnswered, [currentQuestion]: true });
    } else {
      setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: 'wrong' });
      setToastMessage("That's incorrect. Try again!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleCardClick = (topic) => {
    switch(topic.type) {
      case 'intro':
        setShowIntro(true);
        break;
      case 'concept':
        setShowConcepts(true);
        break;
      case 'definition':
        setShowDefinitions(true);
        break;
      case 'simulation':
        setSelectedTopic(topic);
        break;
      case 'quiz':
        setShowQuiz(true);
        break;
      default:
        break;
    }
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  return (
    <Container>
      <Header>
        <h1>Cell Division in Biology</h1>
        <p>Learn about cell division fundamentals: Definition of cell division, types of cell division, describe the stages of mitosis, illustrate the stages of meiosis 1 and meiosis 2, and test your knowledge with quizzes.</p>
      </Header>

      {!showConcepts ? (
        // Main Topics Grid
        <MainGrid>
          {mainTopics.map((topic) => (
            <TopicCard 
              key={topic.id} 
              onClick={() => handleCardClick(topic)}
            >
              <img src={topic.image} alt={topic.name} />
              <h3>{topic.name}</h3>
              <p>{topic.description}</p>
            </TopicCard>
          ))}
        </MainGrid>
      ) : (
        // Concepts Grid
        <DefinitionGrid
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CloseButton onClick={() => setShowConcepts(false)}>
            <CloseRoundedIcon />
          </CloseButton>
          {definitionCards.map((card) => (
            <TopicCard  
              key={card.id} 
              onClick={() => setSelectedTopic(card)}
            >
              <img src={card.image} alt={card.name} />
              <h3>{card.name}</h3>
              <p>{card.description}</p>
            </TopicCard>
          ))}
        </DefinitionGrid>
      )}

      {/* Definitions Modal */}
      {showDefinitions && (
        <Modal isOpen={showDefinitions} onClose={() => setShowDefinitions(false)}>
          <ModalContent>
            <CloseButton onClick={() => setShowDefinitions(false)}>
              <CloseRoundedIcon />
            </CloseButton>
            <DefinitionList>
              <h2>Cell Division Definitions</h2>
              {definitionContent.map((item) => (
                <div key={item.id} className="definition-item">
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </DefinitionList>
          </ModalContent>
        </Modal>
      )}

      {/* Introduction Modal */}
      {showIntro && (
        <Modal isOpen={showIntro} onClose={() => setShowIntro(false)}>
          <ModalContent>
            <CloseButton onClick={() => setShowIntro(false)}>
              <CloseRoundedIcon />
            </CloseButton>
            <h2>Objectives of the lesson</h2>
            <p>This interactive package introduces cell division in biology. Explore key concepts, definitions, and visual simulations to deepen understanding, then reinforce learning with quizzes.</p>
            <ul style={{ color: '#fff', lineHeight: 1.6, marginLeft: '1rem' }}>
              <li>Definition of cell division</li>
              <li>Types of cell division</li>
              <li>Describe the stages of mitosis</li>
              <li>Illustrate the stages of meiosis I and meiosis II</li>
              <li>Quizzes</li>
            </ul>
          </ModalContent>
        </Modal>
      )}

      {/* Video Modal */}
      {selectedTopic && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => {
              setSelectedTopic(null);
              setVideoStates(Array(2).fill({ isPlaying: false, progress: 0, played: 0 }));
            }}>
              <CloseRoundedIcon />
            </CloseButton>
            <h2>{selectedTopic.name}</h2>
            {selectedTopic.videos ? (
              // Multiple videos
              selectedTopic.videos.map((video, index) => (
                <div key={index} style={{ marginBottom: '2rem' }}>
                  <h3 style={{ margin: '1rem 0' }}>{video.name}</h3>
                  <VideoContainer>
                    {isLoading && <LoadingSpinner />}
                    <StyledReactPlayer
                      ref={el => videoRefs.current[index] = el}
                      url={video.videoUrl}
                      width="100%"
                      height="100%"
                      playing={videoStates[index].isPlaying}
                      volume={volume}
                      muted={isMuted}
                      onReady={() => setIsLoading(false)}
                      onProgress={(state) => handleVideoProgress(index, state)}
                      progressInterval={100}
                      controls={false}
                    />
                    {!videoStates[index].isPlaying && (
                      <PlayOverlay onClick={() => handleVideoPlay(index)}>
                        <PlayArrowRoundedIcon />
                      </PlayOverlay>
                    )}
                    <ControlsOverlay 
                      className="controls-overlay"
                      style={{ opacity: videoStates[index].isPlaying ? 1 : 0 }}
                    >
                      <ProgressBar 
                        onClick={(e) => handleProgressBarClick(index, e)}
                      >
                        <Progress progress={videoStates[index].progress} />
                      </ProgressBar>
                      <VideoControls>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <ControlButton onClick={() => handleVideoSeek(index, Math.max(0, videoStates[index].progress - 0.1))}>
                            <FastRewindRoundedIcon />
                          </ControlButton>
                          <ControlButton onClick={() => handleVideoPlay(index)}>
                            {videoStates[index].isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
                          </ControlButton>
                          <ControlButton onClick={() => handleVideoSeek(index, Math.min(1, videoStates[index].progress + 0.1))}>
                            <FastForwardRoundedIcon />
                          </ControlButton>
                        </div>
                        <RightControls>
                          <VolumeControl>
                            <ControlButton onClick={toggleMute}>
                              {isMuted || volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
                            </ControlButton>
                            <VolumeSlider
                              type="range"
                              min={0}
                              max={1}
                              step={0.1}
                              value={volume}
                              onChange={handleVolumeChange}
                            />
                          </VolumeControl>
                          <ControlButton onClick={() => toggleFullscreen(videoRefs.current[index].wrapper)}>
                            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                          </ControlButton>
                        </RightControls>
                      </VideoControls>
                    </ControlsOverlay>
                  </VideoContainer>
                </div>
              ))
            ) : (
              // Single video
              <VideoContainer>
                {isLoading && <LoadingSpinner />}
                <StyledReactPlayer
                  ref={playerRef}
                  url={selectedTopic.videoUrl}
                  width="100%"
                  height="100%"
                  playing={playing}
                  volume={volume}
                  muted={isMuted}
                  onReady={() => {
                    setIsLoading(false);
                    setPlaying(true);
                  }}
                  onProgress={handleProgress}
                  progressInterval={100}
                  controls={false}
                />
                <ControlsOverlay className="controls-overlay">
                  <ProgressBar onClick={handleProgressBarClick}>
                    <Progress progress={progress} />
                  </ProgressBar>
                  <VideoControls>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <ControlButton onClick={handleSeekBackward}>
                        <FastRewindRoundedIcon />
                      </ControlButton>
                      <ControlButton onClick={handlePlayPause}>
                        {playing ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
                      </ControlButton>
                      <ControlButton onClick={handleSeekForward}>
                        <FastForwardRoundedIcon />
                      </ControlButton>
                    </div>
                    <RightControls>
                      <VolumeControl>
                        <ControlButton onClick={toggleMute}>
                          {isMuted || volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
                        </ControlButton>
                        <VolumeSlider
                          type="range"
                          min={0}
                          max={1}
                          step={0.1}
                          value={volume}
                          onChange={handleVolumeChange}
                        />
                      </VolumeControl>
                      <ControlButton onClick={() => toggleFullscreen(playerRef.current.wrapper)}>
                        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                      </ControlButton>
                    </RightControls>
                  </VideoControls>
                </ControlsOverlay>
              </VideoContainer>
            )}
            <p>{selectedTopic.description}</p>
          </ModalContent>
        </Modal>
      )}

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <Modal>
            <Quiz onClose={handleCloseQuiz} />
          </Modal>
        )}
      </AnimatePresence>
      <Toast message={toastMessage} isVisible={showToast} />
    </Container>
  );
};

export default BiologyTopic; 