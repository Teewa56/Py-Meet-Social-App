import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

// Create ThemeContext
const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
    // Initialize theme state based on local storage or default to 'light'
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme ? savedTheme : 'light';
        }
        return 'light';
    });

    // Update the theme in the document body and local storage whenever the theme state changes
    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Toggle theme between 'light' and 'dark'
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ThemeContext, ThemeProvider };