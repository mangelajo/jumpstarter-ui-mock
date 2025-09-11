import React, { useState, useMemo } from 'react';
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
  ArrowLeftIcon,
  EllipsisVIcon,
  PencilAltIcon,
  TrashIcon,
  PlayIcon,
  StopIcon,
  EditIcon,
  TagIcon,
  FileAltIcon
} from '@patternfly/react-icons';
import { Exporter, ExporterDetailsTab } from './types';
import PatternFlyTreeView from './components/PatternFlyTreeView';

interface ExporterDetailsPageProps {
  exporter: Exporter;
  onBack: () => void;
}

const ExporterDetailsPage: React.FC<ExporterDetailsPageProps> = ({ exporter, onBack }) => {
  const [activeTab, setActiveTab] = useState<ExporterDetailsTab>('details');
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState<boolean>(false);

  const handleTabClick = (event: React.MouseEvent, eventKey: string | number): void => {
    const tabs: ExporterDetailsTab[] = ['details', 'documentation', 'metrics', 'yaml', 'events'];
    const tabIndex = typeof eventKey === 'number' ? eventKey : tabs.indexOf(eventKey as ExporterDetailsTab);
    if (tabIndex >= 0 && tabIndex < tabs.length) {
      setActiveTab(tabs[tabIndex]);
    }
  };

  const handleActionsToggle = (): void => {
    setIsActionsDropdownOpen(!isActionsDropdownOpen);
  };

  const handleActionSelect = (action: string): void => {
    console.log(`Action selected: ${action}`);
    setIsActionsDropdownOpen(false);
  };

  const getExporterStatus = (exporter: Exporter): 'Available' | 'Leased' | 'Maintenance' | 'Error' => {
    // Check if exporter has a lease
    if (exporter.status.leaseRef?.name) {
      return 'Leased';
    }
    
    // Check conditions for status
    const readyCondition = exporter.status.conditions?.find(c => c.type === 'Ready');
    if (readyCondition?.status === 'False') {
      if (readyCondition.reason === 'MaintenanceMode') {
        return 'Maintenance';
      }
      return 'Error';
    }
    
    return 'Available';
  };

  const getStatusBadgeVariant = (exporter: Exporter): 'success' | 'info' | 'warning' | 'danger' => {
    const status = getExporterStatus(exporter);
    switch (status) {
      case 'Available':
        return 'success';
      case 'Leased':
        return 'info';
      case 'Maintenance':
        return 'warning';
      case 'Error':
        return 'danger';
      default:
        return 'success';
    }
  };

  const renderDetailsTab = (): React.ReactElement => (
    <Grid hasGutter>
      <GridItem span={6}>
        <Card>
          <CardTitle>Exporter Information</CardTitle>
          <CardBody>
            <DescriptionList isHorizontal>
              <DescriptionListGroup>
                <DescriptionListTerm>Name</DescriptionListTerm>
                <DescriptionListDescription>{exporter.metadata.name}</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Namespace</DescriptionListTerm>
                <DescriptionListDescription>{exporter.metadata.namespace}</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Status</DescriptionListTerm>
                <DescriptionListDescription>
                  <Badge isRead={getExporterStatus(exporter) === 'Available'}>
                    {getExporterStatus(exporter)}
                  </Badge>
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Lease</DescriptionListTerm>
                <DescriptionListDescription>
                  {exporter.status.leaseRef?.name || 'Not leased'}
                </DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem span={6}>
        <Card>
          <CardTitle>Labels</CardTitle>
          <CardBody>
            {Object.keys(exporter.metadata.labels || {}).length > 0 ? (
              <LabelGroup>
                {Object.entries(exporter.metadata.labels || {}).map(([key, value]) => (
                  <Label key={`${key}-${value}`} color="blue">
                    {key}={value}
                  </Label>
                ))}
              </LabelGroup>
            ) : (
              <Text component={TextVariants.p}>No labels</Text>
            )}
          </CardBody>
        </Card>
      </GridItem>
      <GridItem span={12}>
        <PatternFlyTreeView 
          exporter={exporter}
          onDeviceSelect={(device) => {
            console.log('Device selected:', device);
          }}
        />
      </GridItem>
    </Grid>
  );

  const renderDocumentationTab = (): React.ReactElement => {
    const deviceName = exporter.metadata.name;
    const boardType = exporter.metadata.labels?.['board-type'] || 'unknown';
    
    return (
      <Card>
        <CardTitle>Documentation</CardTitle>
        <CardBody>
          <TextContent>
            <Text component={TextVariants.h3}>Install CLI</Text>
            <Text component={TextVariants.p}>
              Install the Jumpstarter CLI tool:
            </Text>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
              margin: '0.5rem 0'
            }}>
              curl -fsSL https://raw.githubusercontent.com/jumpstarter-dev/jumpstarter/main/install.sh | bash -s -- -s release-0.7
            </pre>

            <Text component={TextVariants.h3}>Login</Text>
            <Text component={TextVariants.p}>
              If you haven't logged in yet, use this command:
            </Text>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
              margin: '0.5rem 0'
            }}>
              jmp login login.jumpstarter-lab.apps.your.cluster.com
            </pre>

            <Text component={TextVariants.h3}>Getting a Shell</Text>
            <Text component={TextVariants.p}>
              To get a shell into this specific device:
            </Text>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
              margin: '0.5rem 0'
            }}>
              jmp shell -l device={deviceName}
            </pre>
            
            <Text component={TextVariants.p}>
              To get a shell into a free device of this type (not necessarily this one):
            </Text>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
              margin: '0.5rem 0'
            }}>
              jmp shell -l board-type={boardType}
            </pre>

            <Text component={TextVariants.h3}>Creating Leases</Text>
            <Text component={TextVariants.p}>
              To create a more permanent lease:
            </Text>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
              margin: '0.5rem 0'
            }}>
              jmp create lease -l device={deviceName} --duration 1d
            </pre>
            
            <Text component={TextVariants.p}>
              Remember to delete your lease once you're done:
            </Text>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
              margin: '0.5rem 0'
            }}>
              jmp delete leases "lease-id"
            </pre>

            <Text component={TextVariants.h3}>Inside the Shell</Text>
            <Text component={TextVariants.p}>
              Once inside a shell (you'll see the <code>⚡remote ➤</code> prompt), you can:
            </Text>
            
            <Text component={TextVariants.h4}>Flash firmware:</Text>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
              margin: '0.5rem 0'
            }}>
              j storage flash https://location/my-image.img
            </pre>

            <Text component={TextVariants.h4}>Control power:</Text>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
              margin: '0.5rem 0'
            }}>
              j power on
            </pre>

            <Text component={TextVariants.h4}>Access serial console:</Text>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
              margin: '0.5rem 0'
            }}>
              j serial start-console
            </pre>

            <Text component={TextVariants.h4}>Redirect SSH to localhost:2222:</Text>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
              margin: '0.5rem 0'
            }}>
              j ssh forward-tcp 2222
            </pre>
          </TextContent>
        </CardBody>
      </Card>
    );
  };

  const renderMetricsTab = (): React.ReactElement => (
    <Card>
      <CardTitle>Metrics</CardTitle>
      <CardBody>
        <Text component={TextVariants.p}>
          Metrics data would be displayed here. This could include performance metrics,
          resource usage, and other monitoring data for the exporter.
        </Text>
      </CardBody>
    </Card>
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
{`apiVersion: v1
kind: Exporter
metadata:
  name: ${exporter.metadata.name}
  namespace: ${exporter.metadata.namespace}
  labels:
${Object.entries(exporter.metadata.labels || {}).map(([key, value]) => `    ${key}: ${value}`).join('\n')}
spec:
  username: ${exporter.spec.username}
status:
  endpoint: ${exporter.status.endpoint || 'null'}
  lastSeen: ${exporter.status.lastSeen || 'null'}
  leaseRef: ${exporter.status.leaseRef?.name || 'null'}`}
        </pre>
      </CardBody>
    </Card>
  );

  const renderEventsTab = (): React.ReactElement => (
    <Card>
      <CardTitle>Events</CardTitle>
      <CardBody>
        <Text component={TextVariants.p}>
          Event history would be displayed here. This could include creation events,
          status changes, lease assignments, and other relevant events.
        </Text>
      </CardBody>
    </Card>
  );


  const renderTabContent = (): React.ReactElement => {
    switch (activeTab) {
      case 'details':
        return renderDetailsTab();
      case 'documentation':
        return renderDocumentationTab();
      case 'metrics':
        return renderMetricsTab();
      case 'yaml':
        return renderYamlTab();
      case 'events':
        return renderEventsTab();
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
              <ArrowLeftIcon /> Exporters
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>{exporter.metadata.name}</BreadcrumbItem>
        </Breadcrumb>
        
        <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
          <FlexItem>
            <TextContent>
              <Text component={TextVariants.h1}>
                {exporter.metadata.name}
                <Badge isRead={getExporterStatus(exporter) === 'Available'} style={{ marginLeft: '1rem' }}>
                  {getExporterStatus(exporter)}
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
                        key="lease"
                        icon={<PlayIcon />}
                        onClick={() => handleActionSelect('lease')}
                      >
                        Lease
                      </DropdownItem>
                      <DropdownItem
                        key="release"
                        icon={<StopIcon />}
                        onClick={() => handleActionSelect('release')}
                      >
                        Release
                      </DropdownItem>
                      <DropdownItem
                        key="edit"
                        icon={<EditIcon />}
                        onClick={() => handleActionSelect('edit')}
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        key="edit-labels"
                        icon={<TagIcon />}
                        onClick={() => handleActionSelect('edit-labels')}
                      >
                        Edit Labels
                      </DropdownItem>
                      <DropdownItem
                        key="edit-annotations"
                        icon={<FileAltIcon />}
                        onClick={() => handleActionSelect('edit-annotations')}
                      >
                        Edit Annotations
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
          <Tab eventKey="documentation" title={<TabTitleText>Documentation</TabTitleText>} />
          <Tab eventKey="metrics" title={<TabTitleText>Metrics</TabTitleText>} />
          <Tab eventKey="yaml" title={<TabTitleText>YAML</TabTitleText>} />
          <Tab eventKey="events" title={<TabTitleText>Events</TabTitleText>} />
        </Tabs>
        
        <Divider style={{ margin: '1rem 0' }} />
        
        {renderTabContent()}
      </PageSection>
    </Page>
  );
};

export default ExporterDetailsPage;
