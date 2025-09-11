import { parseDeviceTree, getTreeSummary, getDevicesByClientType, getDevicePath } from '../utils/deviceTree';
import { Exporter } from '../types';

/**
 * Example usage of the device tree utilities
 */
export function demonstrateDeviceTreeUsage(exporter: Exporter) {
  if (!exporter.status.devices || exporter.status.devices.length === 0) {
    console.log('No devices available for this exporter');
    return;
  }

  // Parse the devices into a tree structure
  const deviceTree = parseDeviceTree(exporter.status.devices);
  
  console.log('=== Device Tree Analysis ===');
  console.log('Exporter:', exporter.metadata.name);
  
  // Get tree summary
  const summary = getTreeSummary(deviceTree);
  console.log('\nTree Summary:', summary);
  
  // Find all power devices
  const powerDevices = getDevicesByClientType(deviceTree, 'jumpstarter_driver_power.client.PowerClient');
  console.log('\nPower Devices:', powerDevices.map(d => ({
    uuid: d.uuid,
    name: d.deviceName,
    level: d.level
  })));
  
  // Find all serial devices
  const serialDevices = getDevicesByClientType(deviceTree, 'jumpstarter_driver_pyserial.client.PySerialClient');
  console.log('\nSerial Devices:', serialDevices.map(d => ({
    uuid: d.uuid,
    name: d.deviceName,
    level: d.level
  })));
  
  // Get path to a specific device (if any exist)
  if (serialDevices.length > 0) {
    const firstSerialDevice = serialDevices[0];
    const path = getDevicePath(deviceTree, firstSerialDevice.uuid);
    console.log('\nPath to first serial device:', path.map(d => ({
      uuid: d.uuid,
      name: d.deviceName,
      clientType: d.clientType?.split('.').pop()
    })));
  }
  
  // Print tree structure
  console.log('\nTree Structure:');
  printTree(deviceTree.root, 0);
}

function printTree(node: any, indent: number) {
  if (!node) return;
  
  const spaces = '  '.repeat(indent);
  const clientType = node.clientType?.split('.').pop() || 'Unknown';
  const deviceName = node.deviceName || 'Unnamed';
  console.log(`${spaces}├─ ${deviceName} (${clientType}) [${node.uuid}]`);
  
  node.children.forEach((child: any) => printTree(child, indent + 1));
}

/**
 * Example of how to use the device tree in a React component
 */
export function createDeviceTreeData(exporter: Exporter) {
  if (!exporter.status.devices || exporter.status.devices.length === 0) {
    return null;
  }

  const deviceTree = parseDeviceTree(exporter.status.devices);
  
  // Convert to a format suitable for visualization libraries
  return {
    name: exporter.metadata.name,
    children: deviceTree.root ? [convertNodeToVizFormat(deviceTree.root)] : [],
    summary: getTreeSummary(deviceTree)
  };
}

function convertNodeToVizFormat(node: any): any {
  return {
    id: node.uuid,
    name: node.deviceName || 'Unnamed',
    type: node.clientType?.split('.').pop() || 'Unknown',
    level: node.level,
    labels: node.labels,
    children: node.children.map(convertNodeToVizFormat)
  };
}
