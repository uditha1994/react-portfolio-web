import BackToHome from '../components/ui/BackToHome'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import './Contact.scss'

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

export default function Contact() {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    })

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        // Here you would typically send the data to your backend
        alert('Message sent successfully!')
    }

    return (
        <motion.section
            className="contact section"
            id="contact"
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <BackToHome />
            <div className="container">
                <motion.h2 className="section__title" variants={itemVariants}>
                    Get In Touch
                </motion.h2>

                <motion.p className="section__subtitle" variants={itemVariants}>
                    Have a project in mind or want to collaborate? Feel free to reach out!
                </motion.p>

                <motion.div className="contact__content" variants={itemVariants}>
                    <form onSubmit={handleSubmit(onSubmit)} className="contact__form">
                        <div className="form__group">
                            <input
                                type="text"
                                placeholder="Your Name"
                                {...register('name', { required: 'Name is required' })}
                                className={errors.name ? 'error' : ''}
                            />
                            {errors.name && <span className="error-message">{errors.name.message}</span>}
                        </div>

                        <div className="form__group">
                            <input
                                type="email"
                                placeholder="Your Email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="error-message">{errors.email.message}</span>}
                        </div>

                        <div className="form__group">
                            <textarea
                                placeholder="Your Message"
                                rows="5"
                                {...register('message', { required: 'Message is required' })}
                                className={errors.message ? 'error' : ''}
                            ></textarea>
                            {errors.message && <span className="error-message">{errors.message.message}</span>}
                        </div>

                        <button type="submit" className="btn">
                            Send Message
                        </button>
                    </form>

                    <div className="contact__info">
                        <h3 className="info__title">Contact Information</h3>
                        <p className="info__text">
                            You can also reach me directly via email or social media.
                        </p>

                        <ul className="info__list">
                            <li className="info__item">
                                <span className="info__icon">✉️</span>
                                <span>uditha@programmer.net</span>
                            </li>
                            <li className="info__item">
                                <span className="info__icon">📱</span>
                                <span>+94 78 660 3236 / +94 71 609 6434</span>
                            </li>
                            <li className="info__item">
                                <span className="info__icon">📍</span>
                                <span>Kandy, Sri Lanka</span>
                            </li>
                        </ul>

                        <div className="social__links">
                            {['GitHub', 'LinkedIn', 'Twitter'].map((social, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="social__link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    )
}