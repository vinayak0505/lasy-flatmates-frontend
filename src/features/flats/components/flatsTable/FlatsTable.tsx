import { Box, Checkbox, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SimpleTable from "../../../../components/ui/SimpleTable";
import { useState } from "react";
import { formatCurrency } from "../../../../core/utils/currencyUtils";
import { type ReactElement } from "react";
import type { Flat, FlatsTableProps, FlatStatus, FlatSize, FlatLocation, FlatPreferences } from "./types";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import PetsIcon from '@mui/icons-material/Pets';
import WcIcon from '@mui/icons-material/Wc';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface TableRow extends Omit<Flat, 'costs'>, Record<string, unknown> {
  select: ReactElement;
  monthlyTotal: number;
  oneTimeTotal: number;
}

const renderLocationCell = (location: FlatLocation) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    {location.address}
    <IconButton
      size="small"
      onClick={() => window.open(location.googleMapsUrl, '_blank')}
    >
      <LocationOnIcon fontSize="small" />
    </IconButton>
  </Box>
);

const renderPreferencesCell = (preferences: FlatPreferences) => (
  <Box sx={{ display: 'flex', gap: 1 }}>
    <Tooltip title={`Food Type: ${preferences.foodType}`}>
      <RestaurantIcon color={preferences.foodType === 'Veg' ? 'success' : 'warning'} />
    </Tooltip>
    <Tooltip title={preferences.alcoholAllowed ? 'Alcohol Allowed' : 'No Alcohol'}>
      <LocalBarIcon color={preferences.alcoholAllowed ? 'primary' : 'disabled'} />
    </Tooltip>
    <Tooltip title={preferences.smokingAllowed ? 'Smoking Allowed' : 'No Smoking'}>
      <SmokingRoomsIcon color={preferences.smokingAllowed ? 'primary' : 'disabled'} />
    </Tooltip>
    <Tooltip title={preferences.hasPets ? 'Has Pets' : (preferences.petsAllowed ? 'Pets Allowed' : 'No Pets')}>
      <PetsIcon color={preferences.hasPets ? 'primary' : (preferences.petsAllowed ? 'action' : 'disabled')} />
    </Tooltip>
    {preferences.femaleOnly && (
      <Tooltip title="Female Only">
        <WcIcon color="secondary" />
      </Tooltip>
    )}
    {preferences.dedicatedBathroom && (
      <Tooltip title="Dedicated Bathroom">
        <BathtubIcon color="primary" />
      </Tooltip>
    )}
  </Box>
);

const columns = [
  { id: 'select', label: '', minWidth: 50, align: 'center' as const },
  { 
    id: 'images', 
    label: 'Image', 
    minWidth: 100, 
    align: 'center' as const,
    format: (images: unknown) => (
      <Box
        component="img"
        src={(images as string[])[0]}
        alt="Flat"
        sx={{
          width: 60,
          height: 60,
          objectFit: 'cover',
          borderRadius: 1
        }}
      />
    )
  },
  { id: 'size', label: 'Size', minWidth: 100, align: 'center' as const },
  { 
    id: 'location', 
    label: 'Location', 
    minWidth: 200,
    format: (location: unknown) => renderLocationCell(location as FlatLocation)
  },
  { 
    id: 'monthlyTotal', 
    label: 'Monthly Total', 
    minWidth: 130, 
    align: 'right' as const,
    format: (value: unknown) => formatCurrency(value as number)
  },
  { 
    id: 'oneTimeTotal', 
    label: 'One Time Payment', 
    minWidth: 150, 
    align: 'right' as const,
    format: (value: unknown) => formatCurrency(value as number)
  },
  { 
    id: 'preferences',
    label: 'Features',
    minWidth: 250,
    format: (preferences: unknown) => renderPreferencesCell(preferences as FlatPreferences)
  },
  { id: 'status', label: 'Status', minWidth: 120 },
  { id: 'availableFrom', label: 'Available From', minWidth: 130 },
];

// Demo data - Remove this when implementing real data
const mockData: Flat[] = [
  {
    id: '1',
    images: ['/dummy/image1.jpg'],
    size: '2BHK',
    location: {
      address: 'Downtown West, Near Mall',
      googleMapsUrl: 'https://maps.google.com/?q=Downtown+West'
    },
    costs: {
      monthlyRent: 25000,
      maintenanceCharges: 2000,
      brokerage: 25000,
      securityDeposit: 50000,
      otherOneTimeCharges: 5000
    },
    status: 'Available',
    availableFrom: '2025-09-01',
    preferences: {
      foodType: 'Both',
      alcoholAllowed: true,
      smokingAllowed: false,
      hasPets: false,
      petsAllowed: true,
      femaleOnly: false,
      dedicatedBathroom: true
    }
  },
  {
    id: '2',
    images: ['/dummy/image2.jpg'],
    size: '3BHK',
    location: {
      address: 'Waterfront, Sea View',
      googleMapsUrl: 'https://maps.google.com/?q=Waterfront'
    },
    costs: {
      monthlyRent: 35000,
      maintenanceCharges: 3000,
      brokerage: 35000,
      securityDeposit: 70000,
      otherOneTimeCharges: 7000
    },
    status: 'Available Soon',
    availableFrom: '2025-10-01',
    preferences: {
      foodType: 'Veg',
      alcoholAllowed: false,
      smokingAllowed: false,
      hasPets: false,
      petsAllowed: false,
      femaleOnly: true,
      dedicatedBathroom: true
    }
  },
  {
    id: '3',
    images: ['/dummy/image3.jpg'],
    size: '2BHK',
    location: {
      address: 'Central Park View',
      googleMapsUrl: 'https://maps.google.com/?q=Central+Park'
    },
    costs: {
      monthlyRent: 28000,
      maintenanceCharges: 2500,
      brokerage: 28000,
      securityDeposit: 56000,
      otherOneTimeCharges: 5000
    },
    status: 'Available',
    availableFrom: '2025-09-15',
    preferences: {
      foodType: 'Non-Veg',
      alcoholAllowed: true,
      smokingAllowed: true,
      hasPets: true,
      petsAllowed: true,
      femaleOnly: false,
      dedicatedBathroom: true
    }
  }
];

export default function FlatsTable({ 
  flats = mockData, 
  onSelectionChange,
  initialSelectedIds = []
}: FlatsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | FlatStatus>('all');
  const [sizeFilter, setSizeFilter] = useState<'all' | FlatSize>('all');
  const [maxMonthlyTotal, setMaxMonthlyTotal] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<'monthlyTotal' | 'oneTimeTotal' | ''>('');
  const [selectedFlats, setSelectedFlats] = useState<string[]>(initialSelectedIds);



  // Add checkbox data to rows
  const rows = flats.map((flat: Flat): TableRow => ({
    select: (
      <Checkbox
        checked={selectedFlats.includes(flat.id)}
        onChange={(event) => {
          const newSelected = event.target.checked 
            ? [...selectedFlats, flat.id]
            : selectedFlats.filter(id => id !== flat.id);
          
          setSelectedFlats(newSelected);
          onSelectionChange?.(newSelected);
        }}
      />
    ),
    ...flat,
    // Convert flat data for table display
    monthlyTotal: flat.costs.monthlyRent + flat.costs.maintenanceCharges,
    oneTimeTotal: flat.costs.brokerage + flat.costs.securityDeposit + flat.costs.otherOneTimeCharges
  }));

  // Filter and sort rows
  const filteredRows = rows.filter((row: TableRow) => {
    const searchableValues = [
      row.location.address,
      row.size,
      row.status,
      row.preferences.foodType,
      row.preferences.femaleOnly ? 'female only' : '',
      row.preferences.dedicatedBathroom ? 'dedicated bathroom' : ''
    ].join(' ').toLowerCase();
    
    const matchesSearch = searchableValues.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || row.status === statusFilter;
    const matchesSize = sizeFilter === 'all' || row.size === sizeFilter;
    const matchesMonthlyTotal = !maxMonthlyTotal || row.monthlyTotal <= maxMonthlyTotal;
    
    return matchesSearch && matchesStatus && matchesSize && matchesMonthlyTotal;
  });

  // Apply sorting
  if (sortBy) {
    filteredRows.sort((a: TableRow, b: TableRow) => {
      if (sortBy === 'monthlyTotal') {
        return a.monthlyTotal - b.monthlyTotal;
      }
      return a.oneTimeTotal - b.oneTimeTotal;
    });
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Filters */}
      <Box sx={{ 
        mb: 2, 
        display: 'flex', 
        gap: 2, 
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <TextField
          placeholder="Search flats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Size</InputLabel>
          <Select
            value={sizeFilter}
            label="Size"
            onChange={(e) => setSizeFilter(e.target.value as 'all' | FlatSize)}
          >
            <MenuItem value="all">All Sizes</MenuItem>
            <MenuItem value="1BHK">1 BHK</MenuItem>
            <MenuItem value="2BHK">2 BHK</MenuItem>
            <MenuItem value="3BHK">3 BHK</MenuItem>
            <MenuItem value="4BHK">4 BHK</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value as 'all' | FlatStatus)}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Available Soon">Available Soon</MenuItem>
            <MenuItem value="Rented">Rented</MenuItem>
            <MenuItem value="Maintenance">Maintenance</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="number"
          label="Max Monthly Total"
          value={maxMonthlyTotal}
          onChange={(e) => setMaxMonthlyTotal(e.target.value === '' ? '' : Number(e.target.value))}
          sx={{ width: 150 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value as 'monthlyTotal' | 'oneTimeTotal' | '')}
          >
            <MenuItem value="">No Sort</MenuItem>
            <MenuItem value="monthlyTotal">Monthly Total ↑</MenuItem>
            <MenuItem value="oneTimeTotal">One Time Total ↑</MenuItem>
          </Select>
        </FormControl>
        {selectedFlats.length > 0 && (
          <Box sx={{ ml: 'auto' }}>
            {selectedFlats.length} flat(s) selected
          </Box>
        )}
      </Box>

      {/* Table */}
      <SimpleTable 
        columns={columns} 
        rows={filteredRows}
      />
    </Box>
  );
}