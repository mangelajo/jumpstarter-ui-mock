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
import { getExporterTypesWithCounts } from './dataStore';
import { ExporterType } from './types';

interface ExporterTypeWithCount extends ExporterType {
  count: number;
}

interface ExporterTypesPageProps {
  onNavigateToExporters?: (filter: Record<string, string>) => void;
}

const ExporterTypesPage: React.FC<ExporterTypesPageProps> = ({ onNavigateToExporters }) => {
  const [searchValue, setSearchValue] = useState('');

  const exporterTypesWithCounts = getExporterTypesWithCounts();

  // Filter exporter types based on search
  const filteredExporterTypes = useMemo(() => {
    return exporterTypesWithCounts.filter(et => {
      const matchesSearch = searchValue === '' || 
        et.metadata.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        et.spec.description.toLowerCase().includes(searchValue.toLowerCase());

      return matchesSearch;
    });
  }, [exporterTypesWithCounts, searchValue]);

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

  const handleViewExporters = (exporterType: ExporterTypeWithCount) => {
    if (onNavigateToExporters) {
      onNavigateToExporters(exporterType.spec.exporterSelector);
    } else {
      console.log('Navigate to exporters with filter:', exporterType.spec.exporterSelector);
    }
  };


  return (
    <Page>
      <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h1" size="2xl">
          Exporter Types
        </Title>
        <TextContent>
          <Text component={TextVariants.p}>
            Manage and view different types of hardware exporters available in the lab.
          </Text>
        </TextContent>
      </PageSection>

      <PageSection>
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem>
              <SearchInput
                placeholder="Search exporter types..."
                value={searchValue}
                onChange={handleSearchChange}
                onClear={() => setSearchValue('')}
              />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>

        <Grid hasGutter>
          {filteredExporterTypes.map((exporterType) => (
            <GridItem key={exporterType.metadata.name} span={12} md={6} lg={4}>
              <Card>
                <CardHeader>
                  <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
                    <FlexItem>
                      <CardTitle>
                        <Text component={TextVariants.h3}>
                          {exporterType.metadata.name}
                        </Text>
                      </CardTitle>
                    </FlexItem>
                    <FlexItem>
                      <Badge isRead color={getCategoryBadgeColor(exporterType.metadata.labels.category)}>
                        {exporterType.metadata.labels.category}
                      </Badge>
                    </FlexItem>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Stack hasGutter>
                    <StackItem>
                      <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsSm' }}>
                        <img
                          src={exporterType.spec.base64Image}
                          alt={exporterType.metadata.name}
                          style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                        />
                        <FlexItem>
                          <Badge isRead color={getVendorBadgeColor(exporterType.metadata.labels.vendor)}>
                            {exporterType.metadata.labels.vendor}
                          </Badge>
                        </FlexItem>
                      </Flex>
                    </StackItem>
                    
                    <StackItem>
                      <Text component={TextVariants.p}>
                        {exporterType.spec.description}
                      </Text>
                    </StackItem>

                    <Divider />

                    <StackItem>
                      <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
                        <FlexItem>
                          <Text component={TextVariants.small}>
                            <strong>{exporterType.count}</strong> exporter{exporterType.count !== 1 ? 's' : ''} available
                          </Text>
                        </FlexItem>
                        <FlexItem>
                          <Button
                            variant={ButtonVariant.primary}
                            onClick={() => handleViewExporters(exporterType)}
                            isDisabled={exporterType.count === 0}
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
                        href={exporterType.spec.documentation}
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

        {filteredExporterTypes.length === 0 && (
          <Card>
            <CardBody>
              <TextContent>
                <Text component={TextVariants.p}>
                  No exporter types found matching your criteria.
                </Text>
              </TextContent>
            </CardBody>
          </Card>
        )}
      </PageSection>
    </Page>
  );
};

export default ExporterTypesPage;
