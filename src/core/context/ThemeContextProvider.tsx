import { useMemo, useState } from "react";
import { ThemeContext, type Theme } from "../hooks/useThemeContext";
import { createTheme, CssBaseline, ThemeProvider as MaterialThemeProvider } from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

const lightTheme = {
	primary: {
		main: '#0D47A1',
		light: '#5472d3',
		dark: '#002171',
	},
	secondary: {
		main: '#42a5f5',
		light: '#80d6ff',
		dark: '#0077c2',
	},
	container: {
		backgroundColor: '#eaf1f9ff',
	},
};

const darkTheme = {
	primary: {
		main: '#42a5f5',
		light: '#80d6ff',
		dark: '#0077c2',
	},
	secondary: {
		main: '#1E88E5',
		light: '#6ab7ff',
		dark: '#005cb2',
	},
	container: {
		backgroundColor: '#1a2027',
	}
};
export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>('dark');

	const colorTheme = useMemo(() => createTheme({
		palette: {
			mode: theme,
			primary: theme === 'dark' ? darkTheme.primary : lightTheme.primary,
			secondary: theme === 'dark' ? darkTheme.secondary : lightTheme.secondary,
			container: theme === 'dark' ? darkTheme.container : lightTheme.container,
		},
	}), [theme]);
	
	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			<MaterialThemeProvider theme={colorTheme}>
				<StyledThemeProvider theme={colorTheme}>
					<CssBaseline />
					{children}
				</StyledThemeProvider>
			</MaterialThemeProvider>
		</ThemeContext.Provider>
	);
}

