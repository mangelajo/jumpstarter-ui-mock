export interface Exporter {
  name: string;
  namespace: string;
  status: 'Available' | 'Leased' | 'Maintenance' | 'Error';
  lease: string;
  labels: Record<string, string>;
}

export interface Lease {
  name: string;
  status: 'Ready' | 'Pending' | 'Error';
  client: string;
  exporter?: string;
  duration: string;
  effectiveBeginTime: string;
  selector: Record<string, string>;
}

export interface Client {
  name: string;
  status: string;
  // Add other client properties as needed
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  sortBy: string;
  sortDirection: SortDirection;
}

export interface ActionItem {
  key: string;
  label: string;
  onClick: () => void;
}

export interface TableColumn {
  key: string;
  title: string;
  sortable: boolean;
}

// Status badge variants for PatternFly
export type StatusBadgeVariant = 'success' | 'info' | 'warning' | 'danger' | 'default';

// Navigation types
export type ActiveItem = 'exporters' | 'leases' | 'clients' | 'shell';

// Exporter details page types
export type ExporterDetailsTab = 'details' | 'metrics' | 'yaml' | 'events' | 'shell';

// Event handler types
export type DropdownSelectHandler = (event: React.SyntheticEvent, value: string) => void;
export type SearchChangeHandler = (event: React.SyntheticEvent, value: string) => void;
