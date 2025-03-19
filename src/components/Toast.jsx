import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #e74c3c;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 2000;
`;

const Toast = ({ message, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <ToastContainer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          {message}
        </ToastContainer>
      )}
    </AnimatePresence>
  );
};

export default Toast; 