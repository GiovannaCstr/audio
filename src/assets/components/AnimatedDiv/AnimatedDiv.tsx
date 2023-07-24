import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedDivProps {
    children: ReactNode;
}

const AnimatedDiv = ({children}: AnimatedDivProps) => {
  return (
    <motion.div
      initial={{ x: window.innerWidth }}
      animate={{ x: 0 }}
      exit={{ x: -window.innerWidth }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
    >
        {children}
    </motion.div>
  );
};

export default AnimatedDiv;