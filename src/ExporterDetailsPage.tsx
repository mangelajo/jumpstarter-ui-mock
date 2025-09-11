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

interface ExporterDetailsPageProps {
  exporter: Exporter;
  onBack: () => void;
}

const ExporterDetailsPage: React.FC<ExporterDetailsPageProps> = ({ exporter, onBack }) => {
  const [activeTab, setActiveTab] = useState<ExporterDetailsTab>('details');
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState<boolean>(false);

  const handleTabClick = (event: React.MouseEvent, eventKey: string | number): void => {
    const tabs: ExporterDetailsTab[] = ['details', 'metrics', 'yaml', 'events'];
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

  const getStatusBadgeVariant = (status: Exporter['status']): 'success' | 'info' | 'warning' | 'danger' => {
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
        return 'info';
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
                <DescriptionListDescription>{exporter.name}</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Namespace</DescriptionListTerm>
                <DescriptionListDescription>{exporter.namespace}</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Status</DescriptionListTerm>
                <DescriptionListDescription>
                  <Badge isRead={exporter.status === 'Available'}>
                    {exporter.status}
                  </Badge>
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Lease</DescriptionListTerm>
                <DescriptionListDescription>
                  {exporter.lease || 'Not leased'}
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
            {Object.keys(exporter.labels).length > 0 ? (
              <LabelGroup>
                {Object.entries(exporter.labels).map(([key, value]) => (
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
    </Grid>
  );

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
  name: ${exporter.name}
  namespace: ${exporter.namespace}
  labels:
${Object.entries(exporter.labels).map(([key, value]) => `    ${key}: ${value}`).join('\n')}
spec:
  status: ${exporter.status}
  lease: ${exporter.lease || 'null'}`}
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
          <BreadcrumbItem isActive>{exporter.name}</BreadcrumbItem>
        </Breadcrumb>
        
        <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
          <FlexItem>
            <TextContent>
              <Text component={TextVariants.h1}>
                {exporter.name}
                <Badge isRead={exporter.status === 'Available'} style={{ marginLeft: '1rem' }}>
                  {exporter.status}
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
