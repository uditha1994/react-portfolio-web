import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Home.scss'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
}

export default function Home({ setMenuOpen }) {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    })

    return (
        <motion.section
            className="home section"
            id="home"
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <div className="container">
                <motion.h1 className="home__title" variants={itemVariants}>
                    Hello, I'm <span className="accent">Uditha Landekumbura</span>
                </motion.h1>

                <motion.p className="home__subtitle" variants={itemVariants}>
                    I build exceptional digital experiences with modern technologies.
                </motion.p>

                <motion.div className="home__buttons" variants={itemVariants}>
                    <button className="btn" onClick={() => setMenuOpen(true)}>
                        Explore My Work
                    </button>
                    <a href="#contact" className="btn btn--outline">
                        Contact Me
                    </a>
                </motion.div>
            </div>
        </motion.section>
    )
}