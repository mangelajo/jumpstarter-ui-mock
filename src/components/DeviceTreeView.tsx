import React from 'react';
import { 
  Card, 
  CardTitle, 
  CardBody, 
  List, 
  ListItem, 
  Button, 
  Badge,
  Text,
  TextVariants,
  Divider
} from '@patternfly/react-core';
import { 
  parseDeviceTree, 
  getTreeSummary,
  DeviceNode, 
  DeviceTree 
} from '../utils/deviceTree';
import { Exporter } from '../types';

interface DeviceTreeViewProps {
  exporter: Exporter;
  onDeviceSelect?: (device: DeviceNode) => void;
}

export const DeviceTreeView: React.FC<DeviceTreeViewProps> = ({ 
  exporter, 
  onDeviceSelect 
}) => {
  const deviceTree = React.useMemo(() => {
    if (!exporter.status.devices || exporter.status.devices.length === 0) {
      return null;
    }
    return parseDeviceTree(exporter.status.devices);
  }, [exporter.status.devices]);

  const renderDeviceNode = React.useCallback((node: DeviceNode, level: number = 0) => {
    const clientType = node.clientType?.split('.').pop() || 'Unknown';
    const deviceName = node.deviceName || 'Unnamed';
    const indent = '  '.repeat(level);

    // Skip rendering unnamed root nodes (level 0 with no device name)
    if (level === 0 && !node.deviceName) {
      return (
        <React.Fragment key={node.uuid}>
          {node.children.map(child => renderDeviceNode(child, level))}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment key={node.uuid}>
        <ListItem>
          <div 
            style={{ marginLeft: `${level * 20}px` }}
            title={`UUID: ${node.originalUuid}`}
          >
            <Button
              variant="link"
              onClick={() => onDeviceSelect?.(node)}
              style={{ 
                textAlign: 'left', 
                padding: '4px 0',
                fontSize: '14px',
                fontWeight: level === 0 ? 'bold' : 'normal'
              }}
            >
              <Text component={TextVariants.p}>
                {indent}├─ {deviceName} <Badge 
                  isRead 
                  title={node.clientType || 'Unknown client type'}
                >
                  {clientType}
                </Badge>
              </Text>
            </Button>
          </div>
        </ListItem>
        {node.children.map(child => renderDeviceNode(child, level + 1))}
      </React.Fragment>
    );
  }, [onDeviceSelect]);

  if (!deviceTree) {
    return (
      <Card>
        <CardTitle>Device Tree</CardTitle>
        <CardBody>
          <Text component={TextVariants.p} style={{ textAlign: 'center', color: '#666' }}>
            No devices available
          </Text>
        </CardBody>
      </Card>
    );
  }

  const summary = React.useMemo(() => {
    return getTreeSummary(deviceTree);
  }, [deviceTree]);

  return (
    <Card>
      <CardTitle>Device Tree</CardTitle>
      <CardBody>
        <div style={{ marginBottom: '1rem' }}>
          <Text component={TextVariants.small}>
            <strong>Total:</strong> {summary.totalDevices} devices | 
            <strong> Depth:</strong> {summary.maxLevel + 1} levels | 
            <strong> Root devices:</strong> {summary.rootDevices} | 
            <strong> Leaf devices:</strong> {summary.leafDevices}
          </Text>
        </div>
        <Divider style={{ margin: '1rem 0' }} />
        <List isPlain>
          {deviceTree.root ? renderDeviceNode(deviceTree.root) : null}
        </List>
      </CardBody>
    </Card>
  );
};

export default DeviceTreeView;
