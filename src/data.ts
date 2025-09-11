import { Exporter, Lease } from './types';

export const mockExporters: Exporter[] = [
  {
    apiVersion: "jumpstarter.dev/v1alpha1",
    kind: "Exporter",
    metadata: {
      name: "nxp-imx8qxp-me-eballetbo-01",
      namespace: "jumpstarter-lab",
      generation: 1,
      creationTimestamp: "2024-01-15T08:00:00Z",
      uid: "exporter-uid-1"
    },
    spec: {
      username: "jumpstarter"
    },
    status: {
      endpoint: "ssh://192.168.1.100:22",
      lastSeen: "2024-01-15T14:30:00Z",
      devices: [
        {
          uuid: "device-uuid-1",
          labels: {
            board: "nxp-imx8qxp-me",
            emmc: "false",
            location: "eballetbo-desk",
            cpu: "4",
            sd: "true",
            device: "nxp-imx8qxp-me-eballetbo-01",
            ram: "3"
          }
        }
      ],
      conditions: [
        {
          type: "Ready",
          status: "True",
          lastTransitionTime: "2024-01-15T08:00:00Z",
          reason: "ExporterOnline",
          message: "Exporter is online and ready"
        }
      ]
    }
  },
  {
    apiVersion: "jumpstarter.dev/v1alpha1",
    kind: "Exporter",
    metadata: {
      name: "nxp-s32g-vnp-rdb3-eballetbo-01",
      namespace: "jumpstarter-lab",
      generation: 1,
      creationTimestamp: "2024-01-15T08:15:00Z",
      uid: "exporter-uid-2"
    },
    spec: {
      username: "jumpstarter"
    },
    status: {
      endpoint: "ssh://192.168.1.101:22",
      lastSeen: "2024-01-15T14:25:00Z",
      devices: [
        {
          uuid: "device-uuid-2",
          labels: {
            board: "nxp-s32g-vnp-rdb3",
            emmc: "false",
            location: "eballetbo-desk",
            device: "nxp-s32g-vnp-rdb3-eballetbo-01",
            sd: "true",
            cpu: "8",
            ram: "32"
          }
        }
      ],
      conditions: [
        {
          type: "Ready",
          status: "True",
          lastTransitionTime: "2024-01-15T08:15:00Z",
          reason: "ExporterOnline",
          message: "Exporter is online and ready"
        }
      ]
    }
  },
  {
    apiVersion: "jumpstarter.dev/v1alpha1",
    kind: "Exporter",
    metadata: {
      name: "qti-snapdragon-ride4-sa8775p-03",
      namespace: "jumpstarter-lab",
      generation: 1,
      creationTimestamp: "2024-01-15T08:30:00Z",
      uid: "exporter-uid-3"
    },
    spec: {
      username: "jumpstarter"
    },
    status: {
      endpoint: "ssh://192.168.1.102:22",
      lastSeen: "2024-01-15T14:20:00Z",
      leaseRef: {
        name: "0198bbdb-5825-785a-ae18-c55830627ce7"
      },
      devices: [
        {
          uuid: "device-uuid-3",
          labels: {
            emmc: "false",
            "board-type": "qc8775",
            location: "bos2",
            cpu: "8",
            device: "qti-snapdragon-ride4-sa8775p-03",
            enabled: "true",
            sd: "true",
            ram: "32"
          }
        }
      ],
      conditions: [
        {
          type: "Ready",
          status: "True",
          lastTransitionTime: "2024-01-15T08:30:00Z",
          reason: "ExporterOnline",
          message: "Exporter is online and ready"
        },
        {
          type: "Leased",
          status: "True",
          lastTransitionTime: "2024-01-15T10:30:00Z",
          reason: "LeaseAcquired",
          message: "Exporter is currently leased"
        }
      ]
    }
  },
  {
    apiVersion: "jumpstarter.dev/v1alpha1",
    kind: "Exporter",
    metadata: {
      name: "qti-snapdragon-ride4-sa8775p-10",
      namespace: "jumpstarter-lab",
      generation: 1,
      creationTimestamp: "2024-01-15T08:45:00Z",
      uid: "exporter-uid-4"
    },
    spec: {
      username: "jumpstarter"
    },
    status: {
      endpoint: "ssh://192.168.1.103:22",
      lastSeen: "2024-01-15T14:15:00Z",
      devices: [
        {
          uuid: "device-uuid-4",
          labels: {
            emmc: "false",
            "board-type": "qc8775",
            location: "bos2",
            cpu: "8",
            device: "qti-snapdragon-ride4-sa8775p-10",
            enabled: "true",
            sd: "true",
            ram: "32"
          }
        }
      ],
      conditions: [
        {
          type: "Ready",
          status: "True",
          lastTransitionTime: "2024-01-15T08:45:00Z",
          reason: "ExporterOnline",
          message: "Exporter is online and ready"
        }
      ]
    }
  },
  {
    apiVersion: "jumpstarter.dev/v1alpha1",
    kind: "Exporter",
    metadata: {
      name: "renesas-rcar-s4-01",
      namespace: "jumpstarter-lab",
      generation: 1,
      creationTimestamp: "2024-01-15T09:00:00Z",
      uid: "exporter-uid-5"
    },
    spec: {
      username: "jumpstarter"
    },
    status: {
      endpoint: "ssh://192.168.1.104:22",
      lastSeen: "2024-01-15T14:10:00Z",
      devices: [
        {
          uuid: "device-uuid-5",
          labels: {
            emmc: "true",
            "board-type": "renesas-rcar-s4",
            location: "bos2",
            cpu: "8",
            device: "renesas-rcar-s4-01",
            enabled: "true",
            sd: "false",
            ram: "4"
          }
        }
      ],
      conditions: [
        {
          type: "Ready",
          status: "True",
          lastTransitionTime: "2024-01-15T09:00:00Z",
          reason: "ExporterOnline",
          message: "Exporter is online and ready"
        }
      ]
    }
  },
  {
    apiVersion: "jumpstarter.dev/v1alpha1",
    kind: "Exporter",
    metadata: {
      name: "ti-jacinto-j784s4xevm-01",
      namespace: "jumpstarter-lab",
      generation: 1,
      creationTimestamp: "2024-01-15T09:15:00Z",
      uid: "exporter-uid-6"
    },
    spec: {
      username: "jumpstarter"
    },
    status: {
      endpoint: "ssh://192.168.1.105:22",
      lastSeen: "2024-01-15T12:00:00Z",
      devices: [
        {
          uuid: "device-uuid-6",
          labels: {
            emmc: "true",
            location: "bos2",
            "board-type": "j784s4evm",
            cpu: "8",
            device: "ti-jacinto-j784s4xevm-01",
            enabled: "true",
            sd: "true",
            ram: "32"
          }
        }
      ],
      conditions: [
        {
          type: "Ready",
          status: "False",
          lastTransitionTime: "2024-01-15T12:00:00Z",
          reason: "MaintenanceMode",
          message: "Exporter is in maintenance mode"
        }
      ]
    }
  }
];

export const mockLeases: Lease[] = [
  {
    apiVersion: "jumpstarter.dev/v1alpha1",
    kind: "Lease",
    metadata: {
      name: "0198bbdb-5825-785a-ae18-c55830627ce7",
      namespace: "jumpstarter-lab",
      creationTimestamp: "2024-01-15T10:30:00Z",
      generation: 1,
      uid: "0198bbdb-5825-785a-ae18-c55830627ce7"
    },
    spec: {
      clientRef: { name: "user-123" },
      duration: "PT2H30M",
      selector: {
        matchLabels: {
          board: "qti-snapdragon-ride4-sa8775p",
          location: "bos2"
        }
      }
    },
    status: {
      ended: false,
      beginTime: "2024-01-15T10:30:00Z",
      exporterRef: { name: "qti-snapdragon-ride4-sa8775p-03" },
      priority: 1,
      spotAccess: false,
      conditions: [
        {
          type: "Ready",
          status: "True",
          lastTransitionTime: "2024-01-15T10:30:00Z",
          reason: "LeaseAcquired",
          message: "Lease successfully acquired"
        }
      ]
    }
  },
  {
    apiVersion: "jumpstarter.dev/v1alpha1",
    kind: "Lease",
    metadata: {
      name: "0198bbdb-5825-785a-ae18-c55830627ce8",
      namespace: "jumpstarter-lab",
      creationTimestamp: "2024-01-15T14:15:00Z",
      generation: 1,
      uid: "0198bbdb-5825-785a-ae18-c55830627ce8"
    },
    spec: {
      clientRef: { name: "user-456" },
      duration: "PT1H45M",
      selector: {
        matchLabels: {
          board: "nxp-imx8qxp-me",
          location: "eballetbo-desk"
        }
      }
    },
    status: {
      ended: false,
      priority: 2,
      spotAccess: true,
      conditions: [
        {
          type: "Pending",
          status: "True",
          lastTransitionTime: "2024-01-15T14:15:00Z",
          reason: "WaitingForExporter",
          message: "Waiting for available exporter"
        }
      ]
    }
  },
  {
    apiVersion: "jumpstarter.dev/v1alpha1",
    kind: "Lease",
    metadata: {
      name: "0198bbdb-5825-785a-ae18-c55830627ce9",
      namespace: "jumpstarter-lab",
      creationTimestamp: "2024-01-15T09:00:00Z",
      generation: 1,
      uid: "0198bbdb-5825-785a-ae18-c55830627ce9"
    },
    spec: {
      clientRef: { name: "user-789" },
      duration: "PT3H15M",
      selector: {
        matchLabels: {
          board: "renesas-rcar-s4",
          location: "bos2"
        }
      }
    },
    status: {
      ended: false,
      beginTime: "2024-01-15T09:00:00Z",
      exporterRef: { name: "renesas-rcar-s4-01" },
      priority: 1,
      spotAccess: false,
      conditions: [
        {
          type: "Ready",
          status: "True",
          lastTransitionTime: "2024-01-15T09:00:00Z",
          reason: "LeaseAcquired",
          message: "Lease successfully acquired"
        }
      ]
    }
  }
];
