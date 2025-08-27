import { Container, styled, type Theme } from '@mui/material';

const PageContainer = styled(Container)(({ theme } : {theme: Theme}) => ({
	padding: '20px !important',
	maxWidth: '100% !important',
	height: '100%',
	backgroundColor: theme.palette.container?.backgroundColor,
	transition: theme.transitions.create(['background-color'], {
		duration: theme.transitions.duration.standard,
	}),
}));

export default PageContainer;
