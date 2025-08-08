import BackToHome from '../components/ui/BackToHome'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './About.scss'

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

export default function About() {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    })

    const skills = [
        'JavaScript', 'TypeScript', 'React', 'Node.js',
        'Three.js', 'GraphQL', 'CSS/Sass', 'Git',
        'Docker', 'AWS', 'Python', 'SQL'
    ]

    return (
        <motion.section
            className="about section"
            id="about"
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <BackToHome />
            <div className="container">
                <motion.h2 className="section__title" variants={itemVariants}>
                    About Me
                </motion.h2>

                <motion.div className="about__content" variants={itemVariants}>
                    <div className="about__text">
                        <p>
                            I'm a passionate Full Stack Developer with 5+ years of experience building
                            web applications. I specialize in creating modern, performant, and
                            user-friendly interfaces with React and Three.js.
                        </p>
                        <p>
                            My approach combines technical expertise with an eye for design,
                            resulting in digital products that are both functional and beautiful.
                        </p>
                        <p>
                            When I'm not coding, you can find me exploring new technologies,
                            contributing to open source, or hiking in the mountains.
                        </p>
                    </div>

                    <div className="about__skills">
                        <h3 className="about__skills-title">Skills & Technologies</h3>
                        <ul className="skills__list">
                            {skills.map((skill, index) => (
                                <motion.li
                                    key={index}
                                    className="skill__item"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                >
                                    {skill}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    )
}