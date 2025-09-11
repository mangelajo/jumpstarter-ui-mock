import { 
  parseDeviceTree, 
  getTreeSummary, 
  getDevicesByClientType, 
  getDevicePath, 
  getDevicesAtLevel,
  getLeafDevices,
  findDeviceByUuid,
  flattenTree
} from '../deviceTree';
import { getExporters } from '../../dataStore';

describe('DeviceTree Utilities', () => {
  let mockExporters: any[];
  
  beforeAll(() => {
    // Get mock data from our data store
    mockExporters = getExporters();
  });

  describe('parseDeviceTree', () => {
    it('should parse devices array into tree structure', () => {
      const exporter = mockExporters[0]; // Use first exporter
      if (!exporter.status.devices || exporter.status.devices.length === 0) {
        console.log('Skipping test - no devices in first exporter');
        return;
      }

      const deviceTree = parseDeviceTree(exporter.status.devices);
      
      expect(deviceTree).toBeDefined();
      expect(deviceTree.root).toBeDefined();
      expect(deviceTree.nodes).toBeInstanceOf(Map);
      expect(deviceTree.maxLevel).toBeGreaterThanOrEqual(0);
    });

    it('should identify root devices correctly', () => {
      const exporter = mockExporters.find(e => e.status.devices && e.status.devices.length > 0);
      if (!exporter) {
        console.log('Skipping test - no exporters with devices found');
        return;
      }

      const deviceTree = parseDeviceTree(exporter.status.devices);
      const rootDevices = getDevicesAtLevel(deviceTree, 0);
      
      expect(rootDevices.length).toBeGreaterThan(0);
      rootDevices.forEach(device => {
        expect(device.parentUuid).toBeUndefined();
        expect(device.level).toBe(0);
      });
    });

    it('should establish parent-child relationships correctly', () => {
      const exporter = mockExporters.find(e => e.status.devices && e.status.devices.length > 1);
      if (!exporter) {
        console.log('Skipping test - no exporters with multiple devices found');
        return;
      }

      const deviceTree = parseDeviceTree(exporter.status.devices);
      
      // Check that all devices with parent_uuid have their parent in the tree
      deviceTree.nodes.forEach(device => {
        if (device.parentUuid) {
          const parent = deviceTree.nodes.get(device.parentUuid);
          expect(parent).toBeDefined();
          expect(parent?.children).toContain(device);
        }
      });
    });

    it('should calculate levels correctly', () => {
      const exporter = mockExporters.find(e => e.status.devices && e.status.devices.length > 2);
      if (!exporter) {
        console.log('Skipping test - no exporters with multiple devices found');
        return;
      }

      const deviceTree = parseDeviceTree(exporter.status.devices);
      
      // All devices should have a level >= 0
      deviceTree.nodes.forEach(device => {
        expect(device.level).toBeGreaterThanOrEqual(0);
      });

      // Children should have level = parent.level + 1
      deviceTree.nodes.forEach(device => {
        device.children.forEach(child => {
          expect(child.level).toBe(device.level + 1);
        });
      });
    });
  });

  describe('getTreeSummary', () => {
    it('should provide accurate tree statistics', () => {
      const exporter = mockExporters.find(e => e.status.devices && e.status.devices.length > 0);
      if (!exporter) {
        console.log('Skipping test - no exporters with devices found');
        return;
      }

      const deviceTree = parseDeviceTree(exporter.status.devices);
      const summary = getTreeSummary(deviceTree);
      
      expect(summary.totalDevices).toBe(exporter.status.devices.length);
      expect(summary.maxLevel).toBeGreaterThanOrEqual(0);
      expect(summary.rootDevices).toBeGreaterThan(0);
      expect(summary.leafDevices).toBeGreaterThan(0);
      expect(summary.clientTypes.length).toBeGreaterThan(0);
      
      // Verify counts add up
      expect(summary.rootDevices + summary.leafDevices).toBeLessThanOrEqual(summary.totalDevices);
    });
  });

  describe('getDevicesByClientType', () => {
    it('should filter devices by client type', () => {
      const exporter = mockExporters.find(e => e.status.devices && e.status.devices.length > 0);
      if (!exporter) {
        console.log('Skipping test - no exporters with devices found');
        return;
      }

      const deviceTree = parseDeviceTree(exporter.status.devices);
      const summary = getTreeSummary(deviceTree);
      
      // Test filtering by each client type found
      summary.clientTypes.forEach(clientType => {
        const devices = getDevicesByClientType(deviceTree, clientType);
        expect(devices.length).toBeGreaterThan(0);
        devices.forEach(device => {
          expect(device.clientType).toBe(clientType);
        });
      });
    });

    it('should return empty array for non-existent client type', () => {
      const exporter = mockExporters.find(e => e.status.devices && e.status.devices.length > 0);
      if (!exporter) {
        console.log('Skipping test - no exporters with devices found');
        return;
      }

      const deviceTree = parseDeviceTree(exporter.status.devices);
      const devices = getDevicesByClientType(deviceTree, 'non-existent-client-type');
      
      expect(devices).toEqual([]);
    });
  });

  describe('getDevicePath', () => {
    it('should return correct path from root to device', () => {
      const exporter = mockExporters.find(e => e.status.devices && e.status.devices.length > 2);
      if (!exporter) {
        console.log('Skipping test - no exporters with multiple devices found');
        return;
      }

      const deviceTree = parseDeviceTree(exporter.status.devices);
      const leafDevices = getLeafDevices(deviceTree);
      
      if (leafDevices.length > 0) {
        const leafDevice = leafDevices[0];
        const path = getDevicePath(deviceTree, leafDevice.uuid);
        
        expect(path.length).toBeGreaterThan(0);
        expect(path[0].level).toBe(0); // First should be root
        expect(path[path.length - 1].uuid).toBe(leafDevice.uuid); // Last should be target
        expect(path[path.length - 1].level).toBe(leafDevice.level); // Level should match
        
        // Verify path is continuous
        for (let i = 1; i < path.length; i++) {
          expect(path[i].parentUuid).toBe(path[i - 1].uuid);
        }
      }
    });

    it('should return empty path for non-existent device', () => {
      const exporter = mockExporters.find(e => e.status.devices && e.status.devices.length > 0);
      if (!exporter) {
        console.log('Skipping test - no exporters with devices found');
        return;
      }

      const deviceTree = parseDeviceTree(exporter.status.devices);
      const path = getDevicePath(deviceTree, 'non-existent-uuid');
      
      expect(path).toEqual([]);
    });
  });

  describe('getDevicesAtLevel', () => {
    it('should return devices at specific levels', () => {
      const exporter = mockExporters.find(e => e.status.devices && e.status.devices.length > 2);
      if (!exporter) {
        console.log('Skipping test - no exporters with multiple devices found');
        return;
      }

      const deviceTree = parseDeviceTree(exporter.status.devices);
      
      // Test each level
      for (let level = 0; level <= deviceTree.maxLevel; level++) {
        const devicesAtLevel = getDevicesAtLevel(deviceTree, level);
        devicesAtLevel.forEach(device => {
          expect(device.level).toBe(level);
        });
      }
    });
  });

  describe('getLeafDevices', () => {
    it('should return only devices with no children', () => {
      const exporter = mockExporters.find(e => e.status.devices && e.status.devices.length > 1);
      if (!exporter) {
        console.log('Skipping test - no exporters with multiple devices found');
        return;
      }

      const deviceTree = parseDeviceTree(exporter.status.devices);
      const leafDevices = getLeafDevices(deviceTree);
      
      expect(leafDevices.length).toBeGreaterThan(0);
      leafDevices.forEach(device => {
        expect(device.children.length).toBe(0);
      });
    });
  });

  describe('findDeviceByUuid', () => {
    it('should find devices by UUID', () => {
      const exporter = mockExporters.find(e => e.status.devices && e.status.devices.length > 0);
      if (!exporter) {
        console.log('Skipping test - no exporters with devices found');
        return;
      }

      const deviceTree = parseDeviceTree(exporter.status.devices);
      const firstDevice = exporter.status.devices[0];
      
      const foundDevice = findDeviceByUuid(deviceTree, firstDevice.uuid);
      expect(foundDevice).toBeDefined();
      expect(foundDevice?.originalUuid).toBe(firstDevice.uuid);
    });

    it('should return undefined for non-existent UUID', () => {
      const exporter = mockExporters.find(e => e.status.devices && e.status.devices.length > 0);
      if (!exporter) {
        console.log('Skipping test - no exporters with devices found');
        return;
      }

      const deviceTree = parseDeviceTree(exporter.status.devices);
      const foundDevice = findDeviceByUuid(deviceTree, 'non-existent-uuid');
      
      expect(foundDevice).toBeUndefined();
    });
  });

  describe('flattenTree', () => {
    it('should return all devices in a flat array', () => {
      const exporter = mockExporters.find(e => e.status.devices && e.status.devices.length > 0);
      if (!exporter) {
        console.log('Skipping test - no exporters with devices found');
        return;
      }

      const deviceTree = parseDeviceTree(exporter.status.devices);
      const flattened = flattenTree(deviceTree);
      
      expect(flattened.length).toBe(exporter.status.devices.length);
      expect(flattened.length).toBe(deviceTree.nodes.size);
    });
  });

  describe('Real Data Integration', () => {
    it('should work with all exporters in mock data', () => {
      const exportersWithDevices = mockExporters.filter(e => e.status.devices && e.status.devices.length > 0);
      
      expect(exportersWithDevices.length).toBeGreaterThan(0);
      
      exportersWithDevices.forEach(exporter => {
        const deviceTree = parseDeviceTree(exporter.status.devices);
        const summary = getTreeSummary(deviceTree);
        
        // Basic validation
        expect(deviceTree.root).toBeDefined();
        expect(summary.totalDevices).toBe(exporter.status.devices.length);
        expect(summary.clientTypes.length).toBeGreaterThan(0);
        
        // Log some interesting stats for verification
        console.log(`Exporter ${exporter.metadata.name}:`);
        console.log(`  - Total devices: ${summary.totalDevices}`);
        console.log(`  - Max level: ${summary.maxLevel}`);
        console.log(`  - Client types: ${summary.clientTypes.join(', ')}`);
        console.log(`  - Root devices: ${summary.rootDevices}`);
        console.log(`  - Leaf devices: ${summary.leafDevices}`);
      });
    });

    it('should handle complex device hierarchies', () => {
      const exporter = mockExporters.find(e => 
        e.status.devices && 
        e.status.devices.length > 5 && 
        e.status.devices.some(d => d.parent_uuid)
      );
      
      if (!exporter) {
        console.log('Skipping test - no exporters with complex hierarchies found');
        return;
      }

      const deviceTree = parseDeviceTree(exporter.status.devices);
      const summary = getTreeSummary(deviceTree);
      
      console.log(`Complex hierarchy test for ${exporter.metadata.name}:`);
      console.log(`  - Total devices: ${summary.totalDevices}`);
      console.log(`  - Max depth: ${summary.maxLevel + 1}`);
      
      // Verify we can traverse the entire tree
      const allDevices = flattenTree(deviceTree);
      expect(allDevices.length).toBe(exporter.status.devices.length);
      
      // Verify all parent-child relationships are correct
      allDevices.forEach(device => {
        if (device.parentUuid) {
          // parentUuid now contains the internal unique key, so find by that
          const parent = deviceTree.nodes.get(device.parentUuid);
          expect(parent).toBeDefined();
          expect(parent?.children).toContain(device);
        }
      });
    });
  });
});
