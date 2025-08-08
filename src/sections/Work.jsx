import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Work.scss'

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

const projects = [
    {
        title: "3D Portfolio",
        description: "A modern portfolio with Three.js animations and smooth transitions.",
        tags: ["React", "Three.js", "Framer Motion"],
        link: "#"
    },
    {
        title: "E-commerce Platform",
        description: "Full-stack e-commerce solution with payment integration.",
        tags: ["Node.js", "React", "MongoDB"],
        link: "#"
    },
    {
        title: "Data Visualization Dashboard",
        description: "Interactive dashboard for analyzing complex datasets.",
        tags: ["D3.js", "TypeScript", "Python"],
        link: "#"
    }
]

export default function Work() {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    })

    return (
        <motion.section
            className="work section"
            id="work"
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <div className="container">
                <motion.h2 className="section__title" variants={itemVariants}>
                    My Work
                </motion.h2>

                <motion.p className="section__subtitle" variants={itemVariants}>
                    A selection of my recent projects
                </motion.p>

                <motion.div className="projects__grid" variants={containerVariants}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="project__card"
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                            <div className="project__content">
                                <h3 className="project__title">{project.title}</h3>
                                <p className="project__description">{project.description}</p>
                                <div className="project__tags">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <a href={project.link} className="project__link">
                                View Project →
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    )
}