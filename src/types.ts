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

export interface LeaseTemplate {
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
    description: string;
    exporterSelector: Record<string, string>;
    base64Image: string;
    documentation: string;
  };
  status: {};
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
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    namespace: string;
    labels?: Record<string, string>;
    annotations?: Record<string, string>;
    resourceVersion?: string;
    generation?: number;
    creationTimestamp?: string;
    uid?: string;
  };
  spec: {
    username: string;
  };
  status: {
    credential?: {
      name: string;
    };
    endpoint?: string;
  };
}

// Build API types based on internal/buildapi structure
export interface BuildRequest {
  name: string;
  manifest: string;
  manifestFileName?: string;
  distro?: string;
  target?: string;
  architecture?: string;
  exportFormat?: string;
  mode?: string;
  automotiveImageBuilder?: string;
  storageClass?: string;
  runtimeClassName?: string;
  customDefs?: string[];
  aibExtraArgs?: string[];
  aibOverrideArgs?: string[];
  serveArtifact?: boolean;
  exposeRoute?: boolean;
  compression?: string;
  registryCredentials?: RegistryCredentials;
}

export interface RegistryCredentials {
  enabled: boolean;
  authType: 'username-password' | 'token' | 'docker-config';
  registryUrl: string;
  username: string;
  password: string;
  token: string;
  dockerConfig: string;
}

export interface BuildResponse {
  name: string;
  phase: string;
  message: string;
  requestedBy?: string;
  artifactURL?: string;
  artifactFileName?: string;
  startTime?: string;
  completionTime?: string;
}

export interface BuildListItem {
  name: string;
  phase: string;
  message: string;
  requestedBy?: string;
  createdAt: string;
  startTime?: string;
  completionTime?: string;
}

export interface BuildTemplateResponse extends BuildRequest {
  sourceFiles?: string[];
}

// Legacy Build interface for backward compatibility with existing UI
export interface Build {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    namespace: string;
    labels?: Record<string, string>;
    annotations?: Record<string, string>;
    resourceVersion?: string;
    generation?: number;
    creationTimestamp?: string;
    uid?: string;
  };
  spec: {
    description: string;
    baseImage: string;
    targetArchitecture: string;
    buildSteps: Array<{
      name: string;
      command: string;
      args: string[];
    }>;
    environment: Record<string, string>;
    outputFormat: 'docker' | 'oci' | 'tar' | 'qcow2' | 'ext4' | 'image' | 'container' | 'aboot' | 'aboot.simg' | 'bootc' | 'bootc-archive' | 'ostree-commit' | 'rpmlist' | 'simg' | 'rootfs';
    registry?: {
      url: string;
      namespace: string;
    };
  };
  status: {
    phase: 'pending' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'building' | 'completed';
    startTime?: string;
    completionTime?: string;
    conditions?: Array<{
      type: string;
      status: 'True' | 'False' | 'Unknown';
      lastTransitionTime: string;
      reason: string;
      message: string;
      observedGeneration?: number;
    }>;
    buildLogs?: string;
    imageUrl?: string;
    errorMessage?: string;
  };
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
export type ActiveItem = 'exporters' | 'lease-templates' | 'leases' | 'clients' | 'aib-builds' | 'create-build' | 'shell';

// Exporter details page types
export type ExporterDetailsTab = 'details' | 'documentation' | 'metrics' | 'yaml' | 'events';

// Lease details page types
export type LeaseDetailsTab = 'details' | 'yaml' | 'events' | 'shell' | 'documentation';

// Event handler types
export type DropdownSelectHandler = (event: React.SyntheticEvent, value: string) => void;
export type SearchChangeHandler = (event: React.SyntheticEvent, value: string) => void;
