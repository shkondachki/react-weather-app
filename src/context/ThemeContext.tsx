import {createContext, ReactNode, useEffect, useState} from "react";

type Theme = 'light' | 'dark';

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
};

const defaultContext: ThemeContextProps = {
    theme: 'light',
    toggleTheme: () => {}
}

export const ThemeContext  = createContext<ThemeContextProps>(defaultContext);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ( {children} ) => {
    const [theme, setTheme] = useState<Theme>( () => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        return savedTheme || 'light';
    })

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme)
    }, [theme] )

    const toggleTheme = () => {
        setTheme( prev => (prev === 'light' ? 'dark' : 'light') )
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}

