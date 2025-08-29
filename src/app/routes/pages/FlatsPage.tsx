import PageContainer from "../../../components/ui/PageContainer";
import FlatsTable from "../../../features/flats/components/flatsTable";
import { Box, Typography } from "@mui/material";

export default function FlatsPage() {
	const handleSelectionChange = (selectedIds: string[]) => {
		console.log('Selected flats:', selectedIds);
		// You can implement your selection handling logic here
		// For example: open a modal, update state, call an API, etc.
	};

	return (
		<PageContainer>
			<Box sx={{ mb: 3 }}>
				<Typography variant="h4" component="h1">
					Available Flats
				</Typography>
				<Typography variant="subtitle1" color="text.secondary">
					Browse and manage available flats
				</Typography>
			</Box>
			<FlatsTable onSelectionChange={handleSelectionChange} />
		</PageContainer>
	);
}