import React, { useState, useMemo, useEffect } from 'react';
import {
  Page,
  PageSection,
  PageSectionVariants,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  Tab,
  TabTitleText,
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Label,
  LabelGroup,
  Badge,
  Button,
  ButtonVariant,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Text,
  TextContent,
  TextVariants,
  Divider,
  Grid,
  GridItem,
  Flex,
  FlexItem
} from '@patternfly/react-core';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@patternfly/react-table';
import {
  ArrowLeftIcon,
  EllipsisVIcon,
  PencilAltIcon,
  TrashIcon,
  PlayIcon,
  StopIcon,
  EditIcon,
  FileAltIcon,
  ClockIcon,
  UserIcon,
  ServerIcon
} from '@patternfly/react-icons';
import { Lease, LeaseDetailsTab } from './types';
import TerminalConsole from './TerminalConsole';

interface LeaseDetailsPageProps {
  lease: Lease;
  onBack: () => void;
  onExporterSelect: (exporterName: string) => void;
}

const LeaseDetailsPage: React.FC<LeaseDetailsPageProps> = ({ lease, onBack, onExporterSelect }) => {
  const [activeTab, setActiveTab] = useState<LeaseDetailsTab>('details');
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState<boolean>(false);

  // Check if lease is active (not ended, has exporter assigned)
  const isLeaseActive = !lease.status.ended && lease.status.exporterRef?.name;

  // If the lease is not active and we're on the shell tab, switch to details
  useEffect(() => {
    if (!isLeaseActive && activeTab === 'shell') {
      setActiveTab('details');
    }
  }, [isLeaseActive, activeTab]);

  const handleTabClick = (event: React.MouseEvent, eventKey: string | number): void => {
    const availableTabs: LeaseDetailsTab[] = isLeaseActive 
      ? ['details', 'yaml', 'events', 'shell'] 
      : ['details', 'yaml', 'events'];
    const tabIndex = typeof eventKey === 'number' ? eventKey : availableTabs.indexOf(eventKey as LeaseDetailsTab);
    if (tabIndex >= 0 && tabIndex < availableTabs.length) {
      setActiveTab(availableTabs[tabIndex]);
    }
  };

  const handleActionsToggle = (): void => {
    setIsActionsDropdownOpen(!isActionsDropdownOpen);
  };

  const handleActionSelect = (action: string): void => {
    console.log(`Action selected: ${action}`);
    setIsActionsDropdownOpen(false);
  };

  const getStatusBadgeVariant = (): 'success' | 'info' | 'warning' | 'danger' => {
    if (lease.status.ended) {
      return 'info';
    }
    if (lease.status.exporterRef) {
      return 'success';
    }
    return 'warning';
  };

  const getStatusText = (): string => {
    if (lease.status.ended) {
      return 'Ended';
    }
    if (lease.status.exporterRef) {
      return 'Active';
    }
    return 'Pending';
  };

  const formatDateTime = (dateTime?: string): string => {
    if (!dateTime) return 'N/A';
    return new Date(dateTime).toLocaleString();
  };

  const formatDuration = (duration: string): string => {
    // Convert ISO 8601 duration to human readable format
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return duration;
    
    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');
    
    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0) parts.push(`${seconds}s`);
    
    return parts.join(' ') || '0s';
  };

  const renderDetailsTab = (): React.ReactElement => (
    <Grid hasGutter>
      <GridItem span={6}>
        <Card>
          <CardTitle>Lease Information</CardTitle>
          <CardBody>
            <DescriptionList isHorizontal>
              <DescriptionListGroup>
                <DescriptionListTerm>Name</DescriptionListTerm>
                <DescriptionListDescription>{lease.metadata.name}</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Namespace</DescriptionListTerm>
                <DescriptionListDescription>{lease.metadata.namespace}</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Status</DescriptionListTerm>
                <DescriptionListDescription>
                  <Badge isRead={getStatusText() === 'Active'}>
                    {getStatusText()}
                  </Badge>
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Client</DescriptionListTerm>
                <DescriptionListDescription>
                  <Flex alignItems={{ default: 'alignItemsCenter' }}>
                    <UserIcon style={{ marginRight: '0.5rem' }} />
                    {lease.spec.clientRef.name}
                  </Flex>
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Exporter</DescriptionListTerm>
                <DescriptionListDescription>
                  {lease.status.exporterRef ? (
                    <Flex alignItems={{ default: 'alignItemsCenter' }}>
                      <ServerIcon style={{ marginRight: '0.5rem' }} />
                      <Button 
                        variant={ButtonVariant.link} 
                        onClick={() => onExporterSelect(lease.status.exporterRef!.name)}
                        style={{ 
                          padding: 0, 
                          textAlign: 'left',
                          fontWeight: 'normal'
                        }}
                      >
                        {lease.status.exporterRef.name}
                      </Button>
                    </Flex>
                  ) : (
                    'Not assigned'
                  )}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Duration</DescriptionListTerm>
                <DescriptionListDescription>
                  <Flex alignItems={{ default: 'alignItemsCenter' }}>
                    <ClockIcon style={{ marginRight: '0.5rem' }} />
                    {formatDuration(lease.spec.duration)}
                  </Flex>
                </DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem span={6}>
        <Card>
          <CardTitle>Timing Information</CardTitle>
          <CardBody>
            <DescriptionList isHorizontal>
              <DescriptionListGroup>
                <DescriptionListTerm>Created</DescriptionListTerm>
                <DescriptionListDescription>
                  {formatDateTime(lease.metadata.creationTimestamp)}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Begin Time</DescriptionListTerm>
                <DescriptionListDescription>
                  {formatDateTime(lease.status.beginTime)}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>End Time</DescriptionListTerm>
                <DescriptionListDescription>
                  {formatDateTime(lease.status.endTime)}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Priority</DescriptionListTerm>
                <DescriptionListDescription>
                  {lease.status.priority || 'N/A'}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Spot Access</DescriptionListTerm>
                <DescriptionListDescription>
                  {lease.status.spotAccess ? 'Yes' : 'No'}
                </DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem span={12}>
        <Card>
          <CardTitle>Selector</CardTitle>
          <CardBody>
            {lease.spec.selector.matchLabels && Object.keys(lease.spec.selector.matchLabels).length > 0 ? (
              <div>
                <Text component={TextVariants.h4} style={{ marginBottom: '1rem' }}>Match Labels</Text>
                <LabelGroup>
                  {Object.entries(lease.spec.selector.matchLabels).map(([key, value]) => (
                    <Label key={`${key}-${value}`} color="blue">
                      {key}={value}
                    </Label>
                  ))}
                </LabelGroup>
              </div>
            ) : null}
            {lease.spec.selector.matchExpressions && lease.spec.selector.matchExpressions.length > 0 ? (
              <div style={{ marginTop: '1rem' }}>
                <Text component={TextVariants.h4} style={{ marginBottom: '1rem' }}>Match Expressions</Text>
                <Table variant="compact">
                  <Thead>
                    <Tr>
                      <Th>Key</Th>
                      <Th>Operator</Th>
                      <Th>Values</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {lease.spec.selector.matchExpressions.map((expr, index) => (
                      <Tr key={index}>
                        <Td>{expr.key}</Td>
                        <Td>{expr.operator}</Td>
                        <Td>{expr.values ? expr.values.join(', ') : 'N/A'}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
            ) : null}
            {(!lease.spec.selector.matchLabels || Object.keys(lease.spec.selector.matchLabels).length === 0) &&
             (!lease.spec.selector.matchExpressions || lease.spec.selector.matchExpressions.length === 0) && (
              <Text component={TextVariants.p}>No selector criteria defined</Text>
            )}
          </CardBody>
        </Card>
      </GridItem>
      {lease.status.conditions && lease.status.conditions.length > 0 && (
        <GridItem span={12}>
          <Card>
            <CardTitle>Conditions</CardTitle>
            <CardBody>
              <Table variant="compact">
                <Thead>
                  <Tr>
                    <Th>Type</Th>
                    <Th>Status</Th>
                    <Th>Reason</Th>
                    <Th>Message</Th>
                    <Th>Last Transition</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {lease.status.conditions.map((condition, index) => (
                    <Tr key={index}>
                      <Td>{condition.type}</Td>
                      <Td>
                        <Badge isRead={condition.status === 'True'}>
                          {condition.status}
                        </Badge>
                      </Td>
                      <Td>{condition.reason}</Td>
                      <Td>{condition.message}</Td>
                      <Td>{formatDateTime(condition.lastTransitionTime)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </CardBody>
          </Card>
        </GridItem>
      )}
    </Grid>
  );

  const renderYamlTab = (): React.ReactElement => (
    <Card>
      <CardTitle>YAML Configuration</CardTitle>
      <CardBody>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '1rem', 
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '14px'
        }}>
{`apiVersion: ${lease.apiVersion}
kind: ${lease.kind}
metadata:
  name: ${lease.metadata.name}
  namespace: ${lease.metadata.namespace}
  ${lease.metadata.creationTimestamp ? `creationTimestamp: ${lease.metadata.creationTimestamp}` : ''}
  ${lease.metadata.generation ? `generation: ${lease.metadata.generation}` : ''}
  ${lease.metadata.uid ? `uid: ${lease.metadata.uid}` : ''}
spec:
  clientRef:
    name: ${lease.spec.clientRef.name}
  duration: ${lease.spec.duration}
  ${lease.spec.release !== undefined ? `release: ${lease.spec.release}` : ''}
  selector:
${lease.spec.selector.matchLabels ? `    matchLabels:
${Object.entries(lease.spec.selector.matchLabels).map(([key, value]) => `      ${key}: ${value}`).join('\n')}` : ''}
${lease.spec.selector.matchExpressions ? `    matchExpressions:
${lease.spec.selector.matchExpressions.map(expr => `    - key: ${expr.key}
      operator: ${expr.operator}
      ${expr.values ? `values: [${expr.values.map(v => `"${v}"`).join(', ')}]` : ''}`).join('\n')}` : ''}
status:
  ended: ${lease.status.ended}
  ${lease.status.beginTime ? `beginTime: ${lease.status.beginTime}` : ''}
  ${lease.status.endTime ? `endTime: ${lease.status.endTime}` : ''}
  ${lease.status.exporterRef ? `exporterRef:
    name: ${lease.status.exporterRef.name}` : ''}
  ${lease.status.priority !== undefined ? `priority: ${lease.status.priority}` : ''}
  ${lease.status.spotAccess !== undefined ? `spotAccess: ${lease.status.spotAccess}` : ''}
${lease.status.conditions ? `  conditions:
${lease.status.conditions.map(condition => `  - type: ${condition.type}
    status: ${condition.status}
    lastTransitionTime: ${condition.lastTransitionTime}
    reason: ${condition.reason}
    message: ${condition.message}
    ${condition.observedGeneration ? `observedGeneration: ${condition.observedGeneration}` : ''}`).join('\n')}` : ''}`}
        </pre>
      </CardBody>
    </Card>
  );

  const renderEventsTab = (): React.ReactElement => (
    <Card>
      <CardTitle>Events</CardTitle>
      <CardBody>
        <Text component={TextVariants.p}>
          Event history would be displayed here. This could include lease creation events,
          status changes, exporter assignments, and other relevant events.
        </Text>
      </CardBody>
    </Card>
  );

  const renderShellTab = (): React.ReactElement => (
    <Card style={{ height: '600px' }}>
      <CardTitle>Jumpstarter Shell - {lease.metadata.name}</CardTitle>
      <CardBody style={{ height: 'calc(100% - 60px)', padding: 0 }}>
        <TerminalConsole
          exporterName={lease.status.exporterRef?.name || 'No exporter assigned'}
          leaseId={lease.metadata.name}
          onConnect={() => console.log('Terminal connected')}
          onDisconnect={() => console.log('Terminal disconnected')}
          onData={(data) => console.log('Terminal data:', data)}
          onSend={(command) => console.log('Command sent:', command)}
        />
      </CardBody>
    </Card>
  );

  const renderTabContent = (): React.ReactElement => {
    switch (activeTab) {
      case 'details':
        return renderDetailsTab();
      case 'yaml':
        return renderYamlTab();
      case 'events':
        return renderEventsTab();
      case 'shell':
        return renderShellTab();
      default:
        return renderDetailsTab();
    }
  };

  return (
    <Page>
      <PageSection variant={PageSectionVariants.light}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Button variant={ButtonVariant.link} onClick={onBack}>
              <ArrowLeftIcon /> Leases
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>{lease.metadata.name}</BreadcrumbItem>
        </Breadcrumb>
        
        <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
          <FlexItem>
            <TextContent>
              <Text component={TextVariants.h1}>
                {lease.metadata.name}
                <Badge isRead={getStatusText() === 'Active'} style={{ marginLeft: '1rem' }}>
                  {getStatusText()}
                </Badge>
              </Text>
            </TextContent>
          </FlexItem>
          <FlexItem>
            <Toolbar>
              <ToolbarContent>
                <ToolbarItem>
                  <Dropdown
                    isOpen={isActionsDropdownOpen}
                    onOpenChange={setIsActionsDropdownOpen}
                    onSelect={() => setIsActionsDropdownOpen(false)}
                    toggle={(toggleRef) => (
                      <MenuToggle
                        ref={toggleRef}
                        variant="primary"
                        onClick={handleActionsToggle}
                        isExpanded={isActionsDropdownOpen}
                        icon={<EllipsisVIcon />}
                      >
                        Actions
                      </MenuToggle>
                    )}
                  >
                    <DropdownList>
                      <DropdownItem
                        key="shell"
                        icon={<PlayIcon />}
                        onClick={() => handleActionSelect('shell')}
                      >
                        Jumpstarter Shell
                      </DropdownItem>
                      <DropdownItem
                        key="release"
                        icon={<StopIcon />}
                        onClick={() => handleActionSelect('release')}
                      >
                        Release
                      </DropdownItem>
                      <DropdownItem
                        key="extend"
                        icon={<ClockIcon />}
                        onClick={() => handleActionSelect('extend')}
                      >
                        Extend
                      </DropdownItem>
                      <DropdownItem
                        key="edit"
                        icon={<EditIcon />}
                        onClick={() => handleActionSelect('edit')}
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        icon={<TrashIcon />}
                        onClick={() => handleActionSelect('delete')}
                      >
                        Delete
                      </DropdownItem>
                    </DropdownList>
                  </Dropdown>
                </ToolbarItem>
              </ToolbarContent>
            </Toolbar>
          </FlexItem>
        </Flex>
      </PageSection>

      <PageSection>
        <Tabs activeKey={activeTab} onSelect={handleTabClick}>
          <Tab eventKey="details" title={<TabTitleText>Details</TabTitleText>} />
          <Tab eventKey="yaml" title={<TabTitleText>YAML</TabTitleText>} />
          <Tab eventKey="events" title={<TabTitleText>Events</TabTitleText>} />
          {isLeaseActive ? (
            <Tab eventKey="shell" title={<TabTitleText>Jumpstarter Shell</TabTitleText>} />
          ) : null}
        </Tabs>
        
        <Divider style={{ margin: '1rem 0' }} />
        
        {renderTabContent()}
      </PageSection>
    </Page>
  );
};

export default LeaseDetailsPage;
