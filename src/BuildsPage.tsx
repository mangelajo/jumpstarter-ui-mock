import React, { useState, useEffect } from 'react';
import {
  PageSection,
  PageSectionVariants,
  Title,
  Card,
  CardBody,
  Button,
  Badge,
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
  TextVariants
} from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { CubesIcon, DownloadIcon, EyeIcon, RedoIcon, PlusIcon } from '@patternfly/react-icons';
import { Build } from './types';
import { getBuilds } from './dataStore';

interface BuildsPageProps {
  onCreateBuild: () => void;
  refreshTrigger?: number;
}

const BuildsPage: React.FC<BuildsPageProps> = ({ onCreateBuild, refreshTrigger = 0 }) => {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBuild, setSelectedBuild] = useState<Build | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | number>(0);

  useEffect(() => {
    fetchBuilds();
  }, [refreshTrigger]);

  const fetchBuilds = () => {
    try {
      setLoading(true);
      setError(null);
      const buildsData = getBuilds();
      setBuilds(buildsData);
    } catch (err) {
      setError(`Error fetching builds: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const getPhaseVariant = (phase: string): 'success' | 'info' | 'warning' | 'danger' | 'default' => {
    switch (phase.toLowerCase()) {
      case 'succeeded':
      case 'completed':
        return 'success';
      case 'failed':
        return 'danger';
      case 'running':
      case 'building':
        return 'info';
      case 'pending':
        return 'warning';
      default:
        return 'default';
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
                      <Badge color={getPhaseVariant(build.status.phase)}>
                        {build.status.phase}
                      </Badge>
                    </Td>
                    <Td>{new Date(build.metadata.creationTimestamp || '').toLocaleString()}</Td>
                    <Td>
                      {formatDuration(build.status.startTime, build.status.completionTime)}
                    </Td>
                    <Td>
                      <Button
                        variant="link"
                        onClick={() => openBuildModal(build)}
                        icon={<EyeIcon />}
                      >
                        Details
                      </Button>
                      {build.status.phase === 'succeeded' && build.status.imageUrl && (
                        <Button
                          variant="secondary"
                          onClick={() => downloadArtifact(build)}
                          icon={<DownloadIcon />}
                          style={{ marginLeft: '8px' }}
                        >
                          Download
                        </Button>
                      )}
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
                      <Badge color={getPhaseVariant(selectedBuild.status.phase)}>
                        {selectedBuild.status.phase}
                      </Badge>
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
    </PageSection>
  );
};

export default BuildsPage;
