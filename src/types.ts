export interface Exporter {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    namespace: string;
    labels: Record<string, string>;
    annotations: Record<string, string>;
    resourceVersion?: string;
    generation?: number;
    creationTimestamp?: string;
    uid?: string;
  };
  spec: {
    username: string;
  };
  status: {
    conditions?: Array<{
      type: string;
      status: 'True' | 'False' | 'Unknown';
      lastTransitionTime: string;
      reason: string;
      message: string;
      observedGeneration?: number;
    }>;
    credential?: {
      name: string;
    };
    devices?: Array<{
      uuid: string;
      parent_uuid?: string;
      labels: Record<string, string>;
    }>;
    endpoint?: string;
    lastSeen?: string;
    leaseRef?: {
      name: string;
    };
  };
}

export interface Lease {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    namespace: string;
    labels?: Record<string, string>;
    annotations?: Record<string, string>;
    generation?: number;
    creationTimestamp?: string;
    uid?: string;
    ownerReferences?: Array<{
      apiVersion: string;
      blockOwnerDeletion: boolean;
      controller: boolean;
      kind: string;
      name: string;
      uid: string;
    }>;
    resourceVersion?: string;
  };
  spec: {
    clientRef: {
      name: string;
    };
    duration: string;
    release?: boolean;
    selector: {
      matchLabels?: Record<string, string>;
      matchExpressions?: Array<{
        key: string;
        operator: 'In' | 'NotIn' | 'Exists' | 'DoesNotExist';
        values?: string[];
      }>;
    };
  };
  status: {
    beginTime?: string;
    endTime?: string;
    ended: boolean;
    exporterRef?: {
      name: string;
    };
    priority?: number;
    spotAccess?: boolean;
    conditions?: Array<{
      type: string;
      status: 'True' | 'False' | 'Unknown';
      lastTransitionTime: string;
      reason: string;
      message: string;
      observedGeneration?: number;
    }>;
  };
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
export type ExporterDetailsTab = 'details' | 'documentation' | 'metrics' | 'yaml' | 'events';

// Lease details page types
export type LeaseDetailsTab = 'details' | 'yaml' | 'events' | 'shell';

// Event handler types
export type DropdownSelectHandler = (event: React.SyntheticEvent, value: string) => void;
export type SearchChangeHandler = (event: React.SyntheticEvent, value: string) => void;
