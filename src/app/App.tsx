import { BrowserRouter } from 'react-router-dom';
import ThemeContextProvider from '../core/context/ThemeContextProvider';
import AppRouter from './routes/Router';

function App() {
	return (
		<ThemeContextProvider>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</ThemeContextProvider>
	)
}

export default App
