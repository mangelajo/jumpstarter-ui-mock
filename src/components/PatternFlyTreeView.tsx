import React, { useState, useMemo, useEffect } from 'react';
import { 
  Card, 
  CardTitle, 
  CardBody, 
  Text,
  TextVariants,
  Divider
} from '@patternfly/react-core';
import {
  ServerIcon,
  CpuIcon,
  NetworkIcon,
  HddIcon,
  PlugIcon,
  TerminalIcon,
  CodeBranchIcon,
  WrenchIcon,
  AngleRightIcon,
  AngleDownIcon,
  MicrochipIcon,
  VirtualMachineIcon,
  BoltIcon,
  UsbIcon
} from '@patternfly/react-icons';
import { 
  parseDeviceTree, 
  getTreeSummary,
  DeviceNode, 
  DeviceTree 
} from '../utils/deviceTree';
import { Exporter } from '../types';

interface PatternFlyTreeViewProps {
  exporter: Exporter;
  onDeviceSelect?: (device: DeviceNode) => void;
}

export const PatternFlyTreeView: React.FC<PatternFlyTreeViewProps> = ({
  exporter,
  onDeviceSelect
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const getDeviceIcon = (deviceName: string, clientType: string) => {
    const type = clientType.toLowerCase();
    const name = deviceName.toLowerCase();
    
    // Filter icons based on driver name (client type) and device name
    if (type.includes('ridesxclient') || type.includes('opendalclient') || 
        type.includes('http') || type.includes('iscsi') || name.includes('flasher') ||
        type.includes('tftp') || type.includes('baseflasherclient')) {
      return <HddIcon />; // Storage
    } else if (type.includes('ridesxpowerclient') || type.includes('snmpserverclient') || 
               type.includes('energenie')) {
      return <PlugIcon />; // Power
    } else if (type.includes('pyserialclient') || type.includes('serial')) {
      return <UsbIcon />; // Serial (cable with connector)
    } else if (type.includes('networkclient') || type.includes('can')) {
      return <NetworkIcon />; // Network/Bus
    } else if (type.includes('shellclient')) {
      return <WrenchIcon />; // Shell/Tools
    } else if (type.includes('compositeclient') || type.includes('dutlink')) {
      return <CodeBranchIcon />; // Composite
    } else if (type.includes('snmp')) {
      return <ServerIcon />; // SNMP
    } else if (type.includes('probe-rs') || type.includes('uboot')) {
      return <MicrochipIcon />; // Microchip/Probe/CPU
    } else if (type.includes('qemu')) {
      return <VirtualMachineIcon />; // VM/Server
    } else if (type.includes('digitaloutput') || type.includes('digitalinput')) {
      return <BoltIcon />; // Digital I/O
    } else {
      return <CpuIcon />; // Default fallback
    }
  };

  const deviceTree = useMemo(() => {
    if (!exporter.status.devices || exporter.status.devices.length === 0) {
      return null;
    }
    return parseDeviceTree(exporter.status.devices);
  }, [exporter.status.devices]);

  // Expand root node by default
  useEffect(() => {
    if (deviceTree && deviceTree.root) {
      setExpandedNodes(new Set([deviceTree.root.uuid]));
    }
  }, [deviceTree]);

  const toggleExpanded = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const handleNodeClick = (node: DeviceNode) => {
    setSelectedNode(node.uuid);
    onDeviceSelect?.(node);
  };

  const renderTreeNode = (node: DeviceNode, level: number = 0): React.ReactElement => {
    const clientType = node.clientType?.split('.').pop() || 'Unknown';
    const deviceName = node.deviceName || 'Unnamed';
    const isExpanded = expandedNodes.has(node.uuid);
    const isSelected = selectedNode === node.uuid;
    const hasChildren = node.children.length > 0;

    // For unnamed root nodes (level 0 with no device name), use exporter name
    const displayName = (level === 0 && !node.deviceName) ? exporter.metadata.name : deviceName;
    const showBadge = !(level === 0 && !node.deviceName && clientType === 'CompositeClient');

    return (
      <li key={node.uuid} role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
        <div 
          className={`pf-v5-c-tree-view__node ${isSelected ? 'pf-m-selected' : ''}`}
          data-level={level}
        >
          <div className="pf-v5-c-tree-view__node-icon" style={{ marginRight: '0.5rem', color: 'var(--pf-v5-global--Color--200)' }}>
            {getDeviceIcon(displayName, clientType)}
          </div>
          
          {hasChildren && (
            <button
              className="pf-v5-c-tree-view__node-toggle"
              onClick={() => toggleExpanded(node.uuid)}
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              <span className={`pf-v5-c-tree-view__node-toggle-icon ${isExpanded ? 'pf-m-expanded' : ''}`}>
                {isExpanded ? <AngleDownIcon /> : <AngleRightIcon />}
              </span>
            </button>
          )}
          
          <div 
            className="pf-v5-c-tree-view__node-content"
            onClick={() => handleNodeClick(node)}
            style={{ cursor: 'pointer' }}
            title={`UUID: ${node.originalUuid}`}
          >
            <span className="pf-v5-c-tree-view__node-text">
              {displayName}
            </span>
            {showBadge && (
              <span 
                className="pf-v5-c-badge pf-m-read"
                title={node.clientType || 'Unknown client type'}
                style={{ marginLeft: '0.5rem' }}
              >
                {clientType}
              </span>
            )}
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <ul role="group" className="pf-v5-c-tree-view__list">
            {node.children.map(child => renderTreeNode(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

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

  const summary = getTreeSummary(deviceTree);

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
        
        <ul 
          className="pf-v5-c-tree-view__list" 
          role="tree"
          style={{ listStyle: 'none', padding: 0, margin: 0 }}
        >
          {deviceTree.root ? renderTreeNode(deviceTree.root) : null}
        </ul>
      </CardBody>
    </Card>
  );
};

export default PatternFlyTreeView;
