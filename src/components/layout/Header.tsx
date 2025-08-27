import { AppBar, Box, IconButton, Toolbar, Typography, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useThemeContext from '../../core/hooks/useThemeContext';

export default function Header() {
	const { theme, setTheme } = useThemeContext();
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" enableColorOnDark>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Lazy Flatmates
					</Typography>
					<Tooltip title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
						<IconButton
							size="large"
							onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
							color="inherit"
							sx={{ mr: 2 }}
						>
							{theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
					</Tooltip>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						color="inherit"
					>
						<AccountCircle />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
}