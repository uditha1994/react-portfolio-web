import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiBriefcase, FiMail } from 'react-icons/fi';
import './ScrollNav.scss';

export default function ScrollNav({ forceShow = false }) {
    const [isVisible, setIsVisible] = useState(forceShow);

    useEffect(() => {
        if (forceShow) {
            setIsVisible(true);
            return;
        }

        const handleScroll = () => {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            setIsVisible(scrollPosition > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [forceShow]);

    const navItems = [
        { path: '/', icon: <FiHome />, label: 'Home' },
        { path: '/about', icon: <FiUser />, label: 'About' },
        { path: '/work', icon: <FiBriefcase />, label: 'Work' },
        { path: '/contact', icon: <FiMail />, label: 'Contact' }
    ];

    return (
        <motion.nav
            className={`scroll-nav ${isVisible ? 'visible' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ type: 'spring', damping: 25 }}
        >
            <div className="scroll-nav__container">
                {navItems.map((item, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Link to={item.path} className="scroll-nav__link">
                            {item.icon}
                            <span className="scroll-nav__label">{item.label}</span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.nav>
    );
}