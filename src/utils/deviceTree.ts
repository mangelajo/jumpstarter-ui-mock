import { Exporter } from '../types';

export interface DeviceNode {
  uuid: string;
  originalUuid: string; // Keep track of original UUID
  parentUuid?: string;
  labels: Record<string, string>;
  children: DeviceNode[];
  level: number;
  clientType?: string;
  deviceName?: string;
}

export interface DeviceTree {
  root: DeviceNode | null;
  nodes: Map<string, DeviceNode>;
  maxLevel: number;
}

/**
 * Parses the devices array from an exporter's status into a hierarchical tree structure
 * @param devices - Array of device objects from exporter status
 * @returns DeviceTree object with root node and lookup map
 */
export function parseDeviceTree(devices: Array<{
  uuid: string;
  parent_uuid?: string;
  labels: Record<string, string>;
}>): DeviceTree {
  const nodes = new Map<string, DeviceNode>();
  let root: DeviceNode | null = null;
  let maxLevel = 0;

  // First pass: Create all nodes with unique keys
  devices.forEach((device, index) => {
    const clientType = device.labels['jumpstarter.dev/client'];
    const deviceName = device.labels['jumpstarter.dev/name'];
    
    // Use index as unique key to handle duplicate UUIDs
    const uniqueKey = `device-${index}`;
    
    const node: DeviceNode = {
      uuid: uniqueKey, // Use unique key internally
      originalUuid: device.uuid, // Keep original UUID
      parentUuid: device.parent_uuid, // Will be resolved in second pass
      labels: device.labels,
      children: [],
      level: 0, // Will be calculated in second pass
      clientType,
      deviceName
    };
    
    nodes.set(uniqueKey, node);
  });

  // Second pass: Resolve parent relationships using original UUIDs
  nodes.forEach(node => {
    if (node.parentUuid) {
      // Find parent by original UUID
      const parent = Array.from(nodes.values()).find(n => n.originalUuid === node.parentUuid);
      if (parent) {
        node.parentUuid = parent.uuid; // Update to use internal unique key
      }
    }
  });

  // Second pass: Build relationships and calculate levels
  nodes.forEach(node => {
    if (node.parentUuid) {
      const parent = nodes.get(node.parentUuid);
      if (parent) {
        parent.children.push(node);
        node.level = parent.level + 1;
        maxLevel = Math.max(maxLevel, node.level);
      }
    } else {
      // This is a root node
      if (!root) {
        root = node;
      }
    }
  });

  // Third pass: Ensure all nodes have correct levels (in case of orphaned nodes)
  const calculateLevels = (node: DeviceNode, level: number = 0) => {
    node.level = level;
    maxLevel = Math.max(maxLevel, level);
    node.children.forEach(child => calculateLevels(child, level + 1));
  };

  if (root) {
    calculateLevels(root);
  }

  return {
    root,
    nodes,
    maxLevel
  };
}

/**
 * Gets all devices at a specific level in the tree
 * @param tree - The device tree
 * @param level - The level to get devices from
 * @returns Array of device nodes at the specified level
 */
export function getDevicesAtLevel(tree: DeviceTree, level: number): DeviceNode[] {
  const result: DeviceNode[] = [];
  
  tree.nodes.forEach(node => {
    if (node.level === level) {
      result.push(node);
    }
  });
  
  return result;
}

/**
 * Gets all leaf nodes (devices with no children)
 * @param tree - The device tree
 * @returns Array of leaf device nodes
 */
export function getLeafDevices(tree: DeviceTree): DeviceNode[] {
  const result: DeviceNode[] = [];
  
  tree.nodes.forEach(node => {
    if (node.children.length === 0) {
      result.push(node);
    }
  });
  
  return result;
}

/**
 * Finds a device by UUID in the tree
 * @param tree - The device tree
 * @param uuid - The UUID to search for (original UUID)
 * @returns The device node or undefined if not found
 */
export function findDeviceByUuid(tree: DeviceTree, uuid: string): DeviceNode | undefined {
  return Array.from(tree.nodes.values()).find(node => node.originalUuid === uuid);
}

/**
 * Gets the path from root to a specific device
 * @param tree - The device tree
 * @param uuid - The UUID of the target device
 * @returns Array of device nodes representing the path from root to target
 */
export function getDevicePath(tree: DeviceTree, uuid: string): DeviceNode[] {
  const path: DeviceNode[] = [];
  const target = tree.nodes.get(uuid);
  
  if (!target) {
    return path;
  }
  
  // Build path by traversing up the tree
  let current: DeviceNode | undefined = target;
  while (current) {
    path.unshift(current);
    current = current.parentUuid ? tree.nodes.get(current.parentUuid) : undefined;
  }
  
  return path;
}

/**
 * Gets all devices of a specific client type
 * @param tree - The device tree
 * @param clientType - The client type to filter by
 * @returns Array of device nodes with the specified client type
 */
export function getDevicesByClientType(tree: DeviceTree, clientType: string): DeviceNode[] {
  const result: DeviceNode[] = [];
  
  tree.nodes.forEach(node => {
    if (node.clientType === clientType) {
      result.push(node);
    }
  });
  
  return result;
}

/**
 * Converts the tree to a flat array for easy iteration
 * @param tree - The device tree
 * @returns Array of all device nodes in the tree
 */
export function flattenTree(tree: DeviceTree): DeviceNode[] {
  return Array.from(tree.nodes.values());
}

/**
 * Gets a summary of the device tree structure
 * @param tree - The device tree
 * @returns Object with statistics about the tree
 */
export function getTreeSummary(tree: DeviceTree): {
  totalDevices: number;
  maxLevel: number;
  rootDevices: number;
  leafDevices: number;
  clientTypes: string[];
} {
  const clientTypes = new Set<string>();
  let rootDevices = 0;
  let leafDevices = 0;
  
  tree.nodes.forEach(node => {
    if (node.clientType) {
      clientTypes.add(node.clientType);
    }
    if (node.level === 0) {
      rootDevices++;
    }
    if (node.children.length === 0) {
      leafDevices++;
    }
  });
  
  return {
    totalDevices: tree.nodes.size,
    maxLevel: tree.maxLevel,
    rootDevices,
    leafDevices,
    clientTypes: Array.from(clientTypes)
  };
}
