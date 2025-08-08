import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import './Menu.scss'

const menuVariants = {
    open: {
        x: 0,
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        x: '100%',
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
}

const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
}

export default function Menu({ menuOpen, setMenuOpen }) {
    return (
        <motion.div
            className="menu"
            initial={false}
            animate={menuOpen ? "open" : "closed"}
            variants={menuVariants}
        >
            <motion.div className="menu__items">
                {['Home', 'About', 'Work', 'Contact'].map((item) => (
                    <motion.div
                        key={item}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <NavLink
                            to={`/${item.toLowerCase()}`}
                            className="menu__item"
                            onClick={() => setMenuOpen(false)}
                        >
                            {item}
                        </NavLink>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}