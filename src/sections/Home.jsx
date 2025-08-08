import ScrollNav from '../components/ui/ScrollNav'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import profileImage from '../assets/profile.jpeg'
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

const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
}

const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
}

const floatingVariants = {
    float: {
        y: [-10, 10],
        transition: {
            y: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }
        }
    }
}

export default function Home({ setMenuOpen }) {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const [showNav, setShowNav] = useState(false);

    const handleExploreClick = () => {
        setShowNav(true);
        // Scroll down a bit to ensure the nav stays visible
        window.scrollTo({
            top: 200,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <ScrollNav forceShow={showNav} />
            <motion.section
                className="home section"
                id="home"
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <div className="container home__container">
                    <div className="home__content">
                        <motion.div className="home__text" variants={containerVariants}>
                            <motion.h1 className="home__title" variants={textVariants}>
                                Hi, I'm <span className="accent">Uditha Landekumbura</span>
                            </motion.h1>

                            <motion.h2 className="home__subtitle" variants={textVariants}>
                                <span className="typing-text">Full Stack Developer</span>
                            </motion.h2>

                            <motion.p className="home__description" variants={textVariants}>
                                I build exceptional digital experiences with modern technologies.
                            </motion.p>

                            <motion.div className="home__buttons" variants={textVariants}>
                                <button className="btn" onClick={handleExploreClick}>
                                    Explore My Work
                                </button>
                                <a href="/contact" className="btn btn--outline">
                                    Contact Me
                                </a>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="home__image-wrapper"
                            variants={imageVariants}
                            animate="float"
                        // variants={floatingVariants}
                        >
                            <div className="home__image-container">
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="home__image"
                                />
                                <div className="home__image-border"></div>
                                <div className="home__image-overlay"></div>
                            </div>
                        </motion.div>
                    </div>

                    {/* <motion.div
                        className="home__scroll-hint"
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
                        <span>Scroll Down</span>
                        <div className="scroll-line"></div>
                    </motion.div> */}
                </div>
            </motion.section>
        </>
    )
}