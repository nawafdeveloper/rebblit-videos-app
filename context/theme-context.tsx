import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextType = {
    theme: ColorSchemeName;
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
};

type Props = { children: ReactNode };

export const ThemeProvider = ({ children }: Props) => {
    const [mode, setMode] = useState<ThemeMode>('system');
    const [theme, setTheme] = useState<ColorSchemeName>(Appearance.getColorScheme());

    useEffect(() => {
        const listener = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
            if (mode === 'system') setTheme(colorScheme);
        };
        const subscription = Appearance.addChangeListener(listener);

        return () => subscription.remove();
    }, [mode]);

    useEffect(() => {
        if (mode === 'light' || mode === 'dark') {
            setTheme(mode);
        } else if (mode === 'system') {
            setTheme(Appearance.getColorScheme());
        }
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ theme, mode, setMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
