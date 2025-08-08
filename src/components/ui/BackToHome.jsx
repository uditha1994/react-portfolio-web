import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import './BackToHome.scss'

export default function BackToHome() {
    return (
        <motion.div
            className="back-to-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <Link to="/" className="back-to-home__link">
                <FiHome className="back-to-home__icon" />
                <span className="back-to-home__text">Home</span>
            </Link>
        </motion.div>
    )
}