import { useMemo, useState } from "react";
import { ThemeContext, type Theme } from "../hooks/useThemeContext";
import { createTheme, CssBaseline, ThemeProvider as MaterialThemeProvider } from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

const lightTheme = {
	primary: {
		main: '#1976d2',
		light: '#42a5f5',
		dark: '#1565c0',
	},
	secondary: {
		main: '#00bcd4',
		light: '#4dd0e1',
		dark: '#0097a7',
	},
};

const darkTheme = {
	primary: {
		main: '#90caf9',
		light: '#e3f2fd',
		dark: '#42a5f5',
	},
	secondary: {
		main: '#80deea',
		light: '#e0f7fa',
		dark: '#26c6da',
	},
};
export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>('dark');

	const colorTheme = useMemo(() => createTheme({
		palette: {
			mode: theme,
			primary: theme === 'dark' ? darkTheme.primary : lightTheme.primary,
			secondary: theme === 'dark' ? darkTheme.secondary : lightTheme.secondary,
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

