import React, { useState, useMemo } from 'react';
import {
  Page,
  PageSection,
  PageSectionVariants,
  Title,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Grid,
  GridItem,
  Text,
  TextContent,
  TextVariants,
  Badge,
  Button,
  ButtonVariant,
  SearchInput,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Flex,
  FlexItem,
  Divider,
  Stack,
  StackItem
} from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import { getLeaseTemplatesWithCounts } from './dataStore';
import { LeaseTemplate } from './types';

interface LeaseTemplateWithCount extends LeaseTemplate {
  count: number;
}

interface LeaseTemplatesPageProps {
  onNavigateToExporters?: (filter: Record<string, string>) => void;
}

const LeaseTemplatesPage: React.FC<LeaseTemplatesPageProps> = ({ onNavigateToExporters }) => {
  const [searchValue, setSearchValue] = useState('');

  const leaseTemplatesWithCounts = getLeaseTemplatesWithCounts();

  // Filter and sort lease templates based on search
  const filteredLeaseTemplates = useMemo(() => {
    return leaseTemplatesWithCounts
      .filter(lt => {
        const matchesSearch = searchValue === '' || 
          lt.metadata.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          lt.spec.description.toLowerCase().includes(searchValue.toLowerCase());

        return matchesSearch;
      })
      .sort((a, b) => a.metadata.name.localeCompare(b.metadata.name));
  }, [leaseTemplatesWithCounts, searchValue]);

  const handleSearchChange = (event: React.FormEvent<HTMLInputElement>, value: string) => {
    setSearchValue(value);
  };

  const getCategoryBadgeColor = (category: string): 'blue' | 'green' | 'purple' | 'grey' => {
    switch (category) {
      case 'embedded': return 'blue';
      case 'automotive': return 'green';
      case 'iot': return 'purple';
      default: return 'grey';
    }
  };

  const getVendorBadgeColor = (vendor: string): 'blue' | 'orange' | 'green' | 'purple' | 'grey' => {
    switch (vendor) {
      case 'nxp': return 'blue';
      case 'ti': return 'orange';
      case 'qualcomm': return 'green';
      case 'renesas': return 'purple';
      default: return 'grey';
    }
  };

  const handleViewExporters = (leaseTemplate: LeaseTemplateWithCount) => {
    if (onNavigateToExporters) {
      onNavigateToExporters(leaseTemplate.spec.exporterSelector);
    } else {
      console.log('Navigate to exporters with filter:', leaseTemplate.spec.exporterSelector);
    }
  };


  return (
    <Page>
      <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h1" size="2xl">
          Lease Templates
        </Title>
        <TextContent>
          <Text component={TextVariants.p}>
            Manage and view different types of hardware lease templates available in the lab.
          </Text>
        </TextContent>
      </PageSection>

      <PageSection>
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem>
              <SearchInput
                placeholder="Search lease templates..."
                value={searchValue}
                onChange={handleSearchChange}
                onClear={() => setSearchValue('')}
              />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>

        <Grid hasGutter>
          {filteredLeaseTemplates.map((leaseTemplate) => (
            <GridItem key={leaseTemplate.metadata.name} span={12} md={6} lg={4}>
              <Card>
                <CardHeader>
                  <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
                    <FlexItem>
                      <CardTitle>
                        <Text component={TextVariants.h3}>
                          {leaseTemplate.metadata.name}
                        </Text>
                      </CardTitle>
                    </FlexItem>
                    <FlexItem>
                      <Badge isRead color={getCategoryBadgeColor(leaseTemplate.metadata.labels.category)}>
                        {leaseTemplate.metadata.labels.category}
                      </Badge>
                    </FlexItem>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Stack hasGutter>
                    <StackItem>
                      <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsSm' }}>
                        <img
                          src={leaseTemplate.spec.base64Image}
                          alt={leaseTemplate.metadata.name}
                          style={{ width: '128px', height: 'auto', objectFit: 'contain' }}
                        />
                        <FlexItem>
                          <Badge isRead color={getVendorBadgeColor(leaseTemplate.metadata.labels.vendor)}>
                            {leaseTemplate.metadata.labels.vendor}
                          </Badge>
                        </FlexItem>
                      </Flex>
                    </StackItem>
                    
                    <StackItem>
                      <Text component={TextVariants.p}>
                        {leaseTemplate.spec.description}
                      </Text>
                    </StackItem>

                    <Divider />

                    <StackItem>
                      <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
                        <FlexItem>
                          <Text component={TextVariants.small}>
                            <strong>{leaseTemplate.count}</strong> exporter{leaseTemplate.count !== 1 ? 's' : ''} available
                          </Text>
                        </FlexItem>
                        <FlexItem>
                          <Button
                            variant={ButtonVariant.primary}
                            onClick={() => handleViewExporters(leaseTemplate)}
                            isDisabled={leaseTemplate.count === 0}
                          >
                            View Exporters
                          </Button>
                        </FlexItem>
                      </Flex>
                    </StackItem>

                    <StackItem>
                      <Button
                        variant={ButtonVariant.link}
                        isInline
                        icon={<ExternalLinkAltIcon />}
                        iconPosition="right"
                        component="a"
                        href={leaseTemplate.spec.documentation}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Documentation
                      </Button>
                    </StackItem>
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>

        {filteredLeaseTemplates.length === 0 && (
          <Card>
            <CardBody>
              <TextContent>
                <Text component={TextVariants.p}>
                  No lease templates found matching your criteria.
                </Text>
              </TextContent>
            </CardBody>
          </Card>
        )}
      </PageSection>
    </Page>
  );
};

export default LeaseTemplatesPage;
