import { BrowserRouter } from 'react-router-dom';
import ThemeContextProvider from '../core/context/ThemeContextProvider';
import AppRouter from './routes/Router';
import Header from '../components/layout/Header';

function App() {
	return (
		<ThemeContextProvider>
			<BrowserRouter>
				<Header />
				<AppRouter />
			</BrowserRouter>
		</ThemeContextProvider>
	)
}

export default App
