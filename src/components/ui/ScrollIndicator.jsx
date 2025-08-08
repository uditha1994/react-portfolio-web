import { motion } from 'framer-motion'
import './ScrollIndicator.scss'

export default function ScrollIndicator() {
    return (
        <motion.div
            className="scroll-indicator"
            animate={{
                y: [0, 10, 0],
                opacity: [0.6, 1, 0.6]
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <span className="scroll-indicator__text">Scroll</span>
            <div className="scroll-indicator__line"></div>
        </motion.div>
    )
}