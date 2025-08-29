import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	styled,
} from "@mui/material";
import type { ReactElement } from "react";

interface Column {
	id: string;
	label: string;
	minWidth?: number;
	align?: 'right' | 'left' | 'center';
	format?: (value: unknown) => ReactElement | string | number;
}

interface Data {
	[key: string]: unknown;
}

interface SimpleTableProps {
	columns: Column[];
	rows: Data[];
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
	backgroundColor: theme.palette.container?.backgroundColor,
	transition: theme.transitions.create(['background-color'], {
		duration: theme.transitions.duration.standard,
	}),
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
	'& .MuiTableCell-root': {
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.common.white,
		fontWeight: 'bold',
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&.MuiTableRow-root:hover': {
		backgroundColor: `${theme.palette.secondary.light} !important`,
	},
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default function SimpleTable({ columns, rows }: SimpleTableProps) {
	return (
		<StyledTableContainer component={Paper} elevation={3}>
			<Table stickyHeader aria-label="simple table">
				<StyledTableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCell
								key={column.id}
								align={column.align}
								style={{ minWidth: column.minWidth }}
							>
								{column.label}
							</TableCell>
						))}
					</TableRow>
				</StyledTableHead>
				<TableBody>
					{rows.map((row, index) => (
						<StyledTableRow hover key={index}>
							{columns.map((column) => (
								<StyledTableCell key={column.id} align={column.align}>
									{column.format ? column.format(row[column.id]) : row[column.id]}
								</StyledTableCell>
							))}
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</StyledTableContainer>
	);
}