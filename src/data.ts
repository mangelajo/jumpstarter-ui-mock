import { Exporter, Lease } from './types';

export const mockExporters: Exporter[] = [
  {
    name: "nxp-imx8qxp-me-eballetbo-01",
    namespace: "jumpstarter-lab",
    status: "Available",
    lease: "None",
    labels: {
      board: "nxp-imx8qxp-me",
      emmc: "false",
      location: "eballetbo-desk",
      cpu: "4",
      sd: "true",
      device: "nxp-imx8qxp-me-eballetbo-01",
      ram: "3"
    }
  },
  {
    name: "nxp-s32g-vnp-rdb3-eballetbo-01",
    namespace: "jumpstarter-lab",
    status: "Available",
    lease: "None",
    labels: {
      board: "nxp-s32g-vnp-rdb3",
      emmc: "false",
      location: "eballetbo-desk",
      device: "nxp-s32g-vnp-rdb3-eballetbo-01",
      sd: "true",
      cpu: "8",
      ram: "32"
    }
  },
  {
    name: "qti-snapdragon-ride4-sa8775p-03",
    namespace: "jumpstarter-lab",
    status: "Leased",
    lease: "user-123",
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
  },
  {
    name: "qti-snapdragon-ride4-sa8775p-10",
    namespace: "jumpstarter-lab",
    status: "Available",
    lease: "None",
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
  },
  {
    name: "renesas-rcar-s4-01",
    namespace: "jumpstarter-lab",
    status: "Available",
    lease: "None",
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
  },
  {
    name: "ti-jacinto-j784s4xevm-01",
    namespace: "jumpstarter-lab",
    status: "Maintenance",
    lease: "None",
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
