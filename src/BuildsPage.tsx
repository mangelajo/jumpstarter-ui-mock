import React, { useState, useEffect } from 'react';
import {
  PageSection,
  PageSectionVariants,
  Title,
  Card,
  CardBody,
  Button,
  Label,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  Spinner,
  Alert,
  Modal,
  ModalVariant,
  CodeBlock,
  CodeBlockCode,
  Tabs,
  Tab,
  TabTitleText,
  Bullseye,
  Flex,
  FlexItem,
  ActionGroup,
  Text,
  TextContent,
  TextVariants,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  MenuToggleElement
} from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { CubesIcon, DownloadIcon, EyeIcon, RedoIcon, PlusIcon, EllipsisVIcon, TrashIcon, CopyIcon, BoltIcon } from '@patternfly/react-icons';
import { Build, LeaseTemplate } from './types';
import { getBuilds, getLeaseTemplates, getCompatibleLeaseTemplates } from './dataStore';

interface BuildsPageProps {
  onCreateBuild: () => void;
  refreshTrigger?: number;
}

const BuildsPage: React.FC<BuildsPageProps> = ({ onCreateBuild, refreshTrigger = 0 }) => {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [leaseTemplates, setLeaseTemplates] = useState<LeaseTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBuild, setSelectedBuild] = useState<Build | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | number>(0);
  const [actionMenuOpen, setActionMenuOpen] = useState<{ [key: string]: boolean }>({});
  const [isFlashDialogOpen, setIsFlashDialogOpen] = useState(false);
  const [selectedLeaseTemplate, setSelectedLeaseTemplate] = useState<LeaseTemplate | null>(null);

  useEffect(() => {
    fetchBuilds();
  }, [refreshTrigger]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-dropdown]')) {
        setActionMenuOpen({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchBuilds = () => {
    try {
      setLoading(true);
      setError(null);
      const buildsData = getBuilds();
      const leaseTemplatesData = getLeaseTemplates();
      setBuilds(buildsData);
      setLeaseTemplates(leaseTemplatesData);
    } catch (err) {
      setError(`Error fetching builds: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const getPhaseColor = (phase: string): 'green' | 'red' | 'blue' | 'grey' => {
    switch (phase.toLowerCase()) {
      case 'succeeded':
      case 'completed':
        return 'green';  // Green
      case 'failed':
        return 'red';    // Red
      case 'running':
      case 'building':
        return 'blue';   // Blue
      case 'pending':
        return 'blue';   // Blue
      default:
        return 'grey';
    }
  };

  const formatDuration = (startTime?: string, completionTime?: string): string => {
    if (!startTime) return '-';
    
    const start = new Date(startTime).getTime();
    const end = completionTime ? new Date(completionTime).getTime() : Date.now();
    
    if (!isFinite(start) || !isFinite(end) || end < start) return '-';
    
    const totalSeconds = Math.floor((end - start) / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
  };

  const openBuildModal = (build: Build) => {
    setSelectedBuild(build);
    setIsModalOpen(true);
    setActiveTab(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBuild(null);
    setActiveTab(0);
  };

  const downloadArtifact = (build: Build) => {
    if (build.status.imageUrl) {
      window.open(build.status.imageUrl, '_blank');
    } else {
      setError('No artifact available for download');
    }
  };

  const toggleActionMenu = (buildName: string, isOpen?: boolean) => {
    setActionMenuOpen(prev => ({
      ...prev,
      [buildName]: isOpen !== undefined ? isOpen : !prev[buildName]
    }));
  };

  const handleActionSelect = (build: Build, action: string) => {
    toggleActionMenu(build.metadata.name, false);
    
    switch (action) {
      case 'view':
        openBuildModal(build);
        break;
      case 'download':
        if (build.status.phase === 'succeeded' && build.status.imageUrl) {
          downloadArtifact(build);
        }
        break;
      case 'copy':
        copyBuildName(build);
        break;
      case 'delete':
        deleteBuild(build);
        break;
      case 'restart':
        restartBuild(build);
        break;
      default:
        break;
    }
  };

  const copyBuildName = (build: Build) => {
    navigator.clipboard.writeText(build.metadata.name);
    console.log(`Copied build name: ${build.metadata.name}`);
  };

  const deleteBuild = (build: Build) => {
    if (window.confirm(`Are you sure you want to delete build "${build.metadata.name}"?`)) {
      console.log(`Deleting build: ${build.metadata.name}`);
      setBuilds(prev => prev.filter(b => b.metadata.name !== build.metadata.name));
    }
  };

  const restartBuild = (build: Build) => {
    if (window.confirm(`Are you sure you want to restart build "${build.metadata.name}"?`)) {
      console.log(`Restarting build: ${build.metadata.name}`);
      setBuilds(prev => prev.map(b => 
        b.metadata.name === build.metadata.name 
          ? { ...b, status: { ...b.status, phase: 'pending' as const } }
          : b
      ));
    }
  };

  const getCompatibleLeaseTemplatesForBuild = (build: Build): LeaseTemplate[] => {
    const buildTarget = build.metadata.labels?.target;
    if (!buildTarget) return [];
    
    return getCompatibleLeaseTemplates(buildTarget);
  };

  const openFlashDialog = (build: Build, leaseTemplate: LeaseTemplate) => {
    setSelectedBuild(build);
    setSelectedLeaseTemplate(leaseTemplate);
    setIsFlashDialogOpen(true);
  };

  const closeFlashDialog = () => {
    setIsFlashDialogOpen(false);
    setSelectedBuild(null);
    setSelectedLeaseTemplate(null);
  };

  const generateFlashCommands = (build: Build, leaseTemplate: LeaseTemplate) => {
    const imageUrl = build.status.imageUrl || 'https://example.com/build-artifact.img';
    const buildTarget = build.metadata.labels?.target;
    const aibPlatform = leaseTemplate.metadata.labels?.['aib-platform'];
    
    // Get the flash command from the lease template and replace {image} with the actual image URL
    const templateFlashCommand = leaseTemplate.spec.flashCommand || 'j storage flash {image}';
    const actualFlashCommand = templateFlashCommand.replace('{image}', imageUrl);
    
    const commands = [
      {
        title: 'Get Shell Access',
        command: `jmp shell -l ${aibPlatform}`,
        description: 'Get shell access to the target board using the aib-platform label'
      },
      {
        title: 'Flash Command',
        command: actualFlashCommand,
        description: `Execute the flash command for ${leaseTemplate.metadata.name}`
      }
    ];
    return commands;
  };

  if (loading && builds.length === 0) {
    return (
      <PageSection>
        <Bullseye>
          <Spinner size="xl" />
        </Bullseye>
      </PageSection>
    );
  }

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} style={{ marginBottom: '24px' }}>
        <FlexItem>
          <Title headingLevel="h1" size="2xl">
            AIB Builds
          </Title>
        </FlexItem>
        <FlexItem>
          <Button variant="primary" onClick={onCreateBuild} icon={<PlusIcon />}>
            Create Build
          </Button>
          <Button
            variant="secondary"
            onClick={fetchBuilds}
            style={{ marginLeft: '8px' }}
            icon={<RedoIcon />}
          >
            Refresh
          </Button>
        </FlexItem>
      </Flex>

      {error && (
        <Alert variant="danger" title={error} style={{ marginBottom: '24px' }} isInline />
      )}

      <Card>
        <CardBody>
          {builds.length === 0 ? (
            <EmptyState>
              <EmptyStateActions>
                <CubesIcon />
              </EmptyStateActions>
              <Title headingLevel="h4" size="lg">
                No builds found
              </Title>
              <EmptyStateBody>
                Create your first AIB build to get started.
              </EmptyStateBody>
              <EmptyStateActions>
                <Button variant="primary" onClick={onCreateBuild}>
                  Create Build
                </Button>
              </EmptyStateActions>
            </EmptyState>
          ) : (
            <Table aria-label="Builds table">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Description</Th>
                  <Th>Distro</Th>
                  <Th>Target</Th>
                  <Th>Architecture</Th>
                  <Th>Status</Th>
                  <Th>Created</Th>
                  <Th>Duration</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {builds.map((build) => (
                  <Tr key={build.metadata.name}>
                    <Td>{build.metadata.name}</Td>
                    <Td>{build.spec.description}</Td>
                    <Td>{build.metadata.labels?.distro || '-'}</Td>
                    <Td>{build.metadata.labels?.target || '-'}</Td>
                    <Td>{build.spec.targetArchitecture}</Td>
                    <Td>
                      <Label color={getPhaseColor(build.status.phase)}>
                        {build.status.phase}
                      </Label>
                    </Td>
                    <Td>{new Date(build.metadata.creationTimestamp || '').toLocaleString()}</Td>
                    <Td>
                      {formatDuration(build.status.startTime, build.status.completionTime)}
                    </Td>
                    <Td>
                      <div style={{ position: 'relative', display: 'inline-block' }} data-dropdown>
                        <Button
                          variant="plain"
                          onClick={() => toggleActionMenu(build.metadata.name)}
                          aria-label="Build actions"
                          style={{ padding: '4px' }}
                        >
                          <EllipsisVIcon />
                        </Button>
                        {actionMenuOpen[build.metadata.name] && (
                          <div
                            style={{
                              position: 'absolute',
                              right: 0,
                              top: '100%',
                              zIndex: 1000,
                              backgroundColor: 'white',
                              border: '1px solid #ccc',
                              borderRadius: '4px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                              minWidth: '200px',
                              marginTop: '4px'
                            }}
                          >
                            <div
                              style={{
                                padding: '8px 0',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                paddingLeft: '12px',
                                paddingRight: '12px'
                              }}
                              onClick={() => handleActionSelect(build, 'view')}
                            >
                              <EyeIcon style={{ marginRight: '8px' }} />
                              View Details
                            </div>
                            {build.status.phase === 'succeeded' && build.status.imageUrl && (
                              <div
                                style={{
                                  padding: '8px 0',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                  paddingRight: '12px'
                                }}
                                onClick={() => handleActionSelect(build, 'download')}
                              >
                                <DownloadIcon style={{ marginRight: '8px' }} />
                                Download Artifact
                              </div>
                            )}
                            {build.status.phase === 'succeeded' && build.status.imageUrl && getCompatibleLeaseTemplatesForBuild(build).length > 0 && (
                              <>
                                {getCompatibleLeaseTemplatesForBuild(build).map((template) => (
                                  <div
                                    key={`flash-${template.metadata.name}`}
                                    style={{
                                      padding: '8px 0',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      paddingLeft: '12px',
                                      paddingRight: '12px'
                                    }}
                                    onClick={() => openFlashDialog(build, template)}
                                  >
                                    <BoltIcon style={{ marginRight: '8px' }} />
                                    Flash to {template.metadata.name}
                                  </div>
                                ))}
                              </>
                            )}
                            <div
                              style={{
                                padding: '8px 0',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                paddingLeft: '12px',
                                paddingRight: '12px'
                              }}
                              onClick={() => handleActionSelect(build, 'copy')}
                            >
                              <CopyIcon style={{ marginRight: '8px' }} />
                              Copy Name
                            </div>
                            {build.status.phase === 'failed' && (
                              <div
                                style={{
                                  padding: '8px 0',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '12px',
                                  paddingRight: '12px'
                                }}
                                onClick={() => handleActionSelect(build, 'restart')}
                              >
                                <RedoIcon style={{ marginRight: '8px' }} />
                                Restart Build
                              </div>
                            )}
                            <div
                              style={{
                                padding: '8px 0',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                paddingLeft: '12px',
                                paddingRight: '12px',
                                color: '#c9190b'
                              }}
                              onClick={() => handleActionSelect(build, 'delete')}
                            >
                              <TrashIcon style={{ marginRight: '8px' }} />
                              Delete Build
                            </div>
                          </div>
                        )}
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </CardBody>
      </Card>

      <Modal
        variant={ModalVariant.large}
        title={`Build: ${selectedBuild?.metadata.name}`}
        isOpen={isModalOpen}
        onClose={closeModal}
        actions={[
          <Button key="close" variant="primary" onClick={closeModal}>
            Close
          </Button>
        ]}
      >
        <Tabs activeKey={activeTab} onSelect={(_event, tabIndex) => setActiveTab(tabIndex)}>
          <Tab eventKey={0} title={<TabTitleText>Details</TabTitleText>}>
            {selectedBuild && (
              <div style={{ padding: '16px 0' }}>
                <TextContent>
                  <Text component={TextVariants.h3}>Build Information</Text>
                  <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px' }}>
                    <dt><strong>Name:</strong></dt>
                    <dd>{selectedBuild.metadata.name}</dd>
                    <dt><strong>Description:</strong></dt>
                    <dd>{selectedBuild.spec.description}</dd>
                    <dt><strong>Status:</strong></dt>
                    <dd>
                      <Label color={getPhaseColor(selectedBuild.status.phase)}>
                        {selectedBuild.status.phase}
                      </Label>
                    </dd>
                    <dt><strong>Distro:</strong></dt>
                    <dd>{selectedBuild.metadata.labels?.distro || '-'}</dd>
                    <dt><strong>Target:</strong></dt>
                    <dd>{selectedBuild.metadata.labels?.target || '-'}</dd>
                    <dt><strong>Architecture:</strong></dt>
                    <dd>{selectedBuild.spec.targetArchitecture}</dd>
                    <dt><strong>Output Format:</strong></dt>
                    <dd>{selectedBuild.spec.outputFormat}</dd>
                    <dt><strong>Base Image:</strong></dt>
                    <dd>{selectedBuild.spec.baseImage}</dd>
                    {selectedBuild.status.startTime && (
                      <>
                        <dt><strong>Started:</strong></dt>
                        <dd>{new Date(selectedBuild.status.startTime).toLocaleString()}</dd>
                      </>
                    )}
                    {selectedBuild.status.completionTime && (
                      <>
                        <dt><strong>Completed:</strong></dt>
                        <dd>{new Date(selectedBuild.status.completionTime).toLocaleString()}</dd>
                        <dt><strong>Duration:</strong></dt>
                        <dd>{formatDuration(selectedBuild.status.startTime, selectedBuild.status.completionTime)}</dd>
                      </>
                    )}
                    {selectedBuild.status.imageUrl && (
                      <>
                        <dt><strong>Image URL:</strong></dt>
                        <dd>{selectedBuild.status.imageUrl}</dd>
                      </>
                    )}
                    {selectedBuild.status.errorMessage && (
                      <>
                        <dt><strong>Error:</strong></dt>
                        <dd style={{ color: 'var(--pf-v5-global--danger-color--100)' }}>
                          {selectedBuild.status.errorMessage}
                        </dd>
                      </>
                    )}
                  </dl>

                  <Text component={TextVariants.h3} style={{ marginTop: '24px' }}>Build Steps</Text>
                  <Table aria-label="Build steps table">
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Command</Th>
                        <Th>Arguments</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {selectedBuild.spec.buildSteps.map((step, index) => (
                        <Tr key={index}>
                          <Td>{step.name}</Td>
                          <Td>{step.command}</Td>
                          <Td>{step.args.join(' ')}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>

                  {selectedBuild.status.phase === 'succeeded' && selectedBuild.status.imageUrl && (
                    <div style={{ marginTop: '24px' }}>
                      <ActionGroup>
                        <Button
                          variant="secondary"
                          onClick={() => downloadArtifact(selectedBuild)}
                          icon={<DownloadIcon />}
                        >
                          Download Artifact
                        </Button>
                      </ActionGroup>
                    </div>
                  )}
                </TextContent>
              </div>
            )}
          </Tab>
          <Tab eventKey={1} title={<TabTitleText>Logs</TabTitleText>}>
            <div style={{ padding: '16px 0' }}>
              <CodeBlock>
                <CodeBlockCode>
                  {selectedBuild?.status.buildLogs || 'No logs available'}
                </CodeBlockCode>
              </CodeBlock>
            </div>
          </Tab>
        </Tabs>
      </Modal>

      {/* Flash Dialog */}
      <Modal
        variant={ModalVariant.medium}
        title={`Flash Build to ${selectedLeaseTemplate?.metadata.name}`}
        isOpen={isFlashDialogOpen}
        onClose={closeFlashDialog}
        actions={[
          <Button key="close" variant="primary" onClick={closeFlashDialog}>
            Close
          </Button>
        ]}
      >
        {selectedBuild && selectedLeaseTemplate && (
          <div style={{ padding: '16px 0' }}>
            <TextContent>
              <Text component={TextVariants.h3}>
                Flash Details
              </Text>
              <Text component={TextVariants.p}>
                This will flash the build <strong>{selectedBuild.metadata.name}</strong> to the 
                lease template <strong>{selectedLeaseTemplate.metadata.name}</strong>.
              </Text>
              
              <div style={{ marginTop: '24px' }}>
                <Text component={TextVariants.h4}>
                  Build Information
                </Text>
                <ul>
                  <li><strong>Build Name:</strong> {selectedBuild.metadata.name}</li>
                  <li><strong>Target:</strong> {selectedBuild.metadata.labels?.target}</li>
                  <li><strong>Architecture:</strong> {selectedBuild.spec.targetArchitecture}</li>
                  <li><strong>Image URL:</strong> {selectedBuild.status.imageUrl || 'Not available'}</li>
                </ul>
              </div>

              <div style={{ marginTop: '24px' }}>
                <Text component={TextVariants.h4}>
                  Lease Template Information
                </Text>
                <ul>
                  <li><strong>Template Name:</strong> {selectedLeaseTemplate.metadata.name}</li>
                  <li><strong>Vendor:</strong> {selectedLeaseTemplate.metadata.labels?.vendor}</li>
                  <li><strong>Category:</strong> {selectedLeaseTemplate.metadata.labels?.category}</li>
                  <li><strong>Platform:</strong> {selectedLeaseTemplate.metadata.labels?.['aib-platform']}</li>
                </ul>
              </div>

              <div style={{ marginTop: '24px' }}>
                <Text component={TextVariants.h4}>
                  Flash Commands
                </Text>
                <Text component={TextVariants.p}>
                  Use one of the following commands to flash the image:
                </Text>
                
                {generateFlashCommands(selectedBuild, selectedLeaseTemplate).map((cmd, index) => (
                  <div key={index} style={{ marginBottom: '16px' }}>
                    <Text component={TextVariants.h5}>
                      {cmd.title}
                    </Text>
                    <Text component={TextVariants.p}>
                      {cmd.description}
                    </Text>
                    <CodeBlock>
                      <CodeBlockCode>
                        {cmd.command}
                      </CodeBlockCode>
                    </CodeBlock>
                  </div>
                ))}
              </div>

              <Alert variant="info" isInline title="Flash Instructions" style={{ marginTop: '24px' }}>
                <Text component={TextVariants.p}>
                  <strong>Note:</strong> Make sure the target device is connected and accessible 
                  before running the flash commands. The actual flashing process will depend on 
                  your specific hardware setup and the jumpstarter CLI configuration.
                </Text>
              </Alert>
            </TextContent>
          </div>
        )}
      </Modal>
    </PageSection>
  );
};

export default BuildsPage;
