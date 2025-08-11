import { motion, type Variants } from 'framer-motion';
import Star01 from '../../assets/loading/star01.svg';
import Star02 from '../../assets/loading/star02.svg';
import Star03 from '../../assets/loading/star03.svg';
import Star04 from '../../assets/loading/star04.svg';
import Star05 from '../../assets/loading/star05.svg';
import Star06 from '../../assets/loading/star06.svg';

const stars = [
  { src: Star01, x: 0, y: 550, w: 24, h: 24 },
  { src: Star02, x: 157, y: 504, w: 32, h: 32 },
  { src: Star03, x: 71, y: 339, w: 44, h: 44 },
  { src: Star04, x: 241, y: 282, w: 32, h: 32 },
  { src: Star05, x: 242, y: 100, w: 40, h: 40 },
  { src: Star06, x: 344.86, y: 156, w: 85, h: 85 },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const starVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

const LoadingAnimation = () => {
  return (
    <motion.div
      className="relative w-[430px] h-[614px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stars.map((star, index) => (
        <motion.img
          key={index}
          src={star.src}
          alt={`Star ${index + 1}`}
          className="absolute"
          style={{
            left: star.x,
            top: star.y,
            width: star.w,
            height: star.h,
          }}
          variants={starVariants}
        />
      ))}
    </motion.div>
  );
};

export default LoadingAnimation;