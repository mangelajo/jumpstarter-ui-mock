import React, { useState, useMemo } from 'react';
import {
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
  FlexItem,
  Title
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
  CheckCircleIcon,
  ExclamationTriangleIcon,
  TimesCircleIcon,
  ClockIcon,
  ExternalLinkAltIcon
} from '@patternfly/react-icons';
import { Client, Lease, LeaseDetailsTab } from './types';
import { getLeases } from './dataStore';

interface ClientDetailsPageProps {
  client: Client;
  onBack: () => void;
  onLeaseSelect?: (lease: Lease) => void;
}

const ClientDetailsPage: React.FC<ClientDetailsPageProps> = ({ 
  client, 
  onBack, 
  onLeaseSelect 
}) => {
  const [activeTab, setActiveTab] = useState<LeaseDetailsTab>('details');
  const [isActionDropdownOpen, setIsActionDropdownOpen] = useState(false);

  // Get all leases for this client
  const clientLeases = useMemo(() => {
    const allLeases = getLeases();
    return allLeases.filter(lease => 
      lease.spec.clientRef.name === client.metadata.name
    );
  }, [client.metadata.name]);

  const getStatusBadge = (hasCredential: boolean, hasEndpoint: boolean) => {
    if (hasCredential && hasEndpoint) {
      return <Badge isRead color="green">Active</Badge>;
    } else if (hasEndpoint) {
      return <Badge isRead color="blue">Connected</Badge>;
    } else {
      return <Badge isRead color="orange">Inactive</Badge>;
    }
  };

  const getLeaseStatusBadge = (lease: Lease) => {
    if (lease.status.ended) {
      return <Badge isRead color="red">Ended</Badge>;
    } else if (lease.status.beginTime && !lease.status.endTime) {
      return <Badge isRead color="green">Active</Badge>;
    } else {
      return <Badge isRead color="blue">Pending</Badge>;
    }
  };

  const getLeaseStatusIcon = (lease: Lease) => {
    if (lease.status.ended) {
      return <TimesCircleIcon style={{ color: '#6a6e73' }} />;
    } else if (lease.status.beginTime && !lease.status.endTime) {
      return <CheckCircleIcon style={{ color: '#52c41a' }} />;
    } else {
      return <ClockIcon style={{ color: '#faad14' }} />;
    }
  };

  const formatDuration = (duration: string) => {
    // Convert duration like "720h0m0s" to readable format
    const hours = parseInt(duration.replace(/h.*/, ''));
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return `${days}d ${remainingHours}h`;
    }
    return `${hours}h`;
  };

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return 'Not available';
    return new Date(timestamp).toLocaleString();
  };

  const shortenLeaseId = (leaseId: string) => {
    // Take the last 8 characters of the lease ID
    return `...${leaseId.slice(-8)}`;
  };

  const actionItems = [
    {
      key: 'edit',
      label: 'Edit Client',
      onClick: () => console.log('Edit client')
    },
    {
      key: 'delete',
      label: 'Delete Client',
      onClick: () => console.log('Delete client')
    }
  ];

  const DetailsTab = () => (
    <Grid hasGutter>
      <GridItem span={12}>
        <Card>
          <CardTitle>Client Information</CardTitle>
          <CardBody>
            <DescriptionList isHorizontal>
              <DescriptionListGroup>
                <DescriptionListTerm>Name</DescriptionListTerm>
                <DescriptionListDescription>{client.metadata.name}</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Username</DescriptionListTerm>
                <DescriptionListDescription>{client.spec.username}</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Status</DescriptionListTerm>
                <DescriptionListDescription>
                  {getStatusBadge(!!client.status.credential, !!client.status.endpoint)}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Endpoint</DescriptionListTerm>
                <DescriptionListDescription>
                  {client.status.endpoint || 'Not available'}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Credential</DescriptionListTerm>
                <DescriptionListDescription>
                  {client.status.credential?.name || 'Not available'}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Created</DescriptionListTerm>
                <DescriptionListDescription>
                  {formatTimestamp(client.metadata.creationTimestamp)}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Namespace</DescriptionListTerm>
                <DescriptionListDescription>{client.metadata.namespace}</DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem span={12}>
        <Card>
          <CardTitle>Labels</CardTitle>
          <CardBody>
            <LabelGroup>
              {Object.entries(client.metadata.labels || {}).map(([key, value]) => (
                <Label key={key} color="blue">
                  {key}: {value}
                </Label>
              ))}
            </LabelGroup>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem span={12}>
        <Card>
          <CardTitle>Annotations</CardTitle>
          <CardBody>
            <DescriptionList isHorizontal>
              {Object.entries(client.metadata.annotations || {}).map(([key, value]) => (
                <DescriptionListGroup key={key}>
                  <DescriptionListTerm>{key}</DescriptionListTerm>
                  <DescriptionListDescription>{value}</DescriptionListDescription>
                </DescriptionListGroup>
              ))}
            </DescriptionList>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );

  const LeasesTab = () => (
    <Card>
      <CardTitle>Lease History</CardTitle>
      <CardBody>
        <TextContent>
          <Text component={TextVariants.p}>
            This client has {clientLeases.length} lease{clientLeases.length !== 1 ? 's' : ''} in the system.
          </Text>
        </TextContent>
        
        {clientLeases.length > 0 ? (
          <Table>
            <Thead>
              <Tr>
                <Th>Lease ID</Th>
                <Th>Status</Th>
                <Th>Duration</Th>
                <Th>Exporter</Th>
                <Th>Created</Th>
                <Th>Started</Th>
                <Th>Ended</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {clientLeases.map(lease => (
                <Tr key={lease.metadata.name}>
                  <Td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {getLeaseStatusIcon(lease)}
                      <Button
                        variant={ButtonVariant.link}
                        onClick={() => onLeaseSelect?.(lease)}
                        style={{ 
                          fontWeight: 'bold', 
                          padding: 0,
                          textAlign: 'left'
                        }}
                      >
                        {shortenLeaseId(lease.metadata.name)}
                      </Button>
                    </div>
                  </Td>
                  <Td>{getLeaseStatusBadge(lease)}</Td>
                  <Td>{formatDuration(lease.spec.duration)}</Td>
                  <Td>
                    {lease.status.exporterRef?.name ? (
                      <Button
                        variant={ButtonVariant.link}
                        onClick={() => onLeaseSelect?.(lease)}
                        icon={<ExternalLinkAltIcon />}
                        iconPosition="right"
                      >
                        {lease.status.exporterRef.name}
                      </Button>
                    ) : (
                      'Not assigned'
                    )}
                  </Td>
                  <Td>{formatTimestamp(lease.metadata.creationTimestamp)}</Td>
                  <Td>{formatTimestamp(lease.status.beginTime)}</Td>
                  <Td>{formatTimestamp(lease.status.endTime)}</Td>
                  <Td>
                    <Button
                      variant={ButtonVariant.link}
                      onClick={() => onLeaseSelect?.(lease)}
                    >
                      View Details
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <TextContent>
            <Text component={TextVariants.p} style={{ fontStyle: 'italic', color: '#666' }}>
              No leases found for this client.
            </Text>
          </TextContent>
        )}
      </CardBody>
    </Card>
  );

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Breadcrumb>
        <BreadcrumbItem onClick={onBack}>
          Clients
        </BreadcrumbItem>
        <BreadcrumbItem isActive>
          {client.metadata.name}
        </BreadcrumbItem>
      </Breadcrumb>

      <div style={{ marginBottom: '1rem' }}>
        <Flex>
          <FlexItem>
            <Button
              variant={ButtonVariant.plain}
              onClick={onBack}
              icon={<ArrowLeftIcon />}
              style={{ marginRight: '1rem' }}
            >
              Back to Clients
            </Button>
          </FlexItem>
          <FlexItem grow={{ default: 'grow' }}>
            <Title headingLevel="h1" size="2xl">
              {client.metadata.name}
            </Title>
          </FlexItem>
          <FlexItem>
            <Dropdown
              isOpen={isActionDropdownOpen}
              onOpenChange={setIsActionDropdownOpen}
              onSelect={() => setIsActionDropdownOpen(false)}
              toggle={(toggleRef) => (
                <MenuToggle
                  ref={toggleRef}
                  variant="plain"
                  onClick={() => setIsActionDropdownOpen(!isActionDropdownOpen)}
                  isExpanded={isActionDropdownOpen}
                  icon={<EllipsisVIcon />}
                />
              )}
            >
              <DropdownList>
                {actionItems.map(item => (
                  <DropdownItem key={item.key} onClick={item.onClick}>
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownList>
            </Dropdown>
          </FlexItem>
        </Flex>
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={(_, tabIndex) => setActiveTab(tabIndex as LeaseDetailsTab)}
      >
        <Tab eventKey="details" title={<TabTitleText>Details</TabTitleText>}>
          <DetailsTab />
        </Tab>
        <Tab eventKey="leases" title={<TabTitleText>Leases</TabTitleText>}>
          <LeasesTab />
        </Tab>
      </Tabs>
    </PageSection>
  );
};

export default ClientDetailsPage;
