import React, { useState } from 'react';
import {
  Page,
  PageSection,
  PageSectionVariants,
  Title,
  TitleSizes,
  Form,
  FormGroup,
  TextInput,
  TextArea,
  Button,
  ButtonVariant,
  FormHelperText,
  HelperText,
  HelperTextItem,
  ValidatedOptions,
  Alert,
  AlertVariant,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  FlexItem,
  TextContent,
  Text,
  TextVariants
} from '@patternfly/react-core';
import { ArrowLeftIcon } from '@patternfly/react-icons';
import { Lease } from './types';

interface CreateLeasePageProps {
  onBack: () => void;
  onCreateLease: (lease: Omit<Lease, 'metadata'>) => void;
}

const CreateLeasePage: React.FC<CreateLeasePageProps> = ({
  onBack,
  onCreateLease
}) => {
  const [labelSelector, setLabelSelector] = useState<string>('');
  const [duration, setDuration] = useState<string>('1h');
  const [labelSelectorError, setLabelSelectorError] = useState<string>('');
  const [durationError, setDurationError] = useState<string>('');

  const validateLabelSelector = (value: string): string => {
    if (!value.trim()) {
      return 'Label selector is required';
    }
    // Basic validation for label selector format (key=value,key2=value2)
    const labelPattern = /^[a-zA-Z0-9]([a-zA-Z0-9\-_.]*[a-zA-Z0-9])?=[a-zA-Z0-9]([a-zA-Z0-9\-_.]*[a-zA-Z0-9])?(,\s*[a-zA-Z0-9]([a-zA-Z0-9\-_.]*[a-zA-Z0-9])?=[a-zA-Z0-9]([a-zA-Z0-9\-_.]*[a-zA-Z0-9])?)*$/;
    if (!labelPattern.test(value.trim())) {
      return 'Invalid label selector format. Use key=value,key2=value2';
    }
    return '';
  };

  const validateDuration = (value: string): string => {
    if (!value.trim()) {
      return 'Duration is required';
    }
    // Basic validation for duration format (e.g., 1h, 30m, 2h30m)
    const durationPattern = /^(\d+[hms])+$/;
    if (!durationPattern.test(value.trim())) {
      return 'Invalid duration format. Use format like 1h, 30m, or 2h30m';
    }
    return '';
  };

  const handleLabelSelectorChange = (value: string): void => {
    setLabelSelector(value);
    setLabelSelectorError(validateLabelSelector(value));
  };

  const handleDurationChange = (value: string): void => {
    setDuration(value);
    setDurationError(validateDuration(value));
  };

  const handleCreate = (): void => {
    const labelError = validateLabelSelector(labelSelector);
    const durationError = validateDuration(duration);
    
    setLabelSelectorError(labelError);
    setDurationError(durationError);
    
    if (!labelError && !durationError) {
      // Parse label selector into matchLabels format
      const matchLabels: Record<string, string> = {};
      labelSelector.split(',').forEach(pair => {
        const [key, value] = pair.trim().split('=');
        if (key && value) {
          matchLabels[key.trim()] = value.trim();
        }
      });

      const newLease: Omit<Lease, 'metadata'> = {
        apiVersion: 'jumpstarter.dev/v1alpha1',
        kind: 'Lease',
        spec: {
          clientRef: { name: 'user-123' },
          duration: `PT${duration.toUpperCase()}`,
          selector: {
            matchLabels
          }
        },
        status: {
          ended: false,
          beginTime: new Date().toISOString(),
          priority: 1,
          spotAccess: false,
          conditions: [
            {
              type: 'Pending',
              status: 'True',
              lastTransitionTime: new Date().toISOString(),
              reason: 'WaitingForExporter',
              message: 'Waiting for available exporter matching selector'
            }
          ]
        }
      };

      onCreateLease(newLease);
      onBack();
    }
  };

  const isFormValid = !labelSelectorError && !durationError && labelSelector.trim() && duration.trim();

  return (
    <Page>
      <PageSection variant={PageSectionVariants.light}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Button variant={ButtonVariant.link} onClick={onBack}>
              <ArrowLeftIcon /> Leases
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Create Lease</BreadcrumbItem>
        </Breadcrumb>
        
        <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
          <FlexItem>
            <TextContent>
              <Title headingLevel="h1" size={TitleSizes['2xl']}>
                Create Lease
              </Title>
              <Text component={TextVariants.p} style={{ marginTop: 'var(--pf-global--spacer--xs)' }}>
                Create a new lease to reserve an exporter for a specific duration.
              </Text>
            </TextContent>
          </FlexItem>
        </Flex>
      </PageSection>

      <PageSection>
        <Grid hasGutter>
          <GridItem span={8}>
            <Card>
              <CardTitle>Lease Configuration</CardTitle>
              <CardBody>
                <Form>
                  <FormGroup
                    label="Label Selector"
                    isRequired
                    fieldId="label-selector"
                  >
                    <TextArea
                      id="label-selector"
                      value={labelSelector}
                      onChange={(_, value) => handleLabelSelectorChange(value)}
                      placeholder="board-type=qc8775,enabled=true"
                      rows={3}
                      validated={labelSelectorError ? ValidatedOptions.error : ValidatedOptions.default}
                    />
                    <FormHelperText>
                      <HelperText>
                        <HelperTextItem>
                          {labelSelectorError || 'Enter label selectors in key=value format, separated by commas'}
                        </HelperTextItem>
                      </HelperText>
                    </FormHelperText>
                  </FormGroup>

                  <FormGroup
                    label="Duration"
                    isRequired
                    fieldId="duration"
                  >
                    <TextInput
                      id="duration"
                      value={duration}
                      onChange={(_, value) => handleDurationChange(value)}
                      placeholder="1h"
                      validated={durationError ? ValidatedOptions.error : ValidatedOptions.default}
                    />
                    <FormHelperText>
                      <HelperText>
                        <HelperTextItem>
                          {durationError || 'Enter duration in format like 1h, 30m, or 2h30m'}
                        </HelperTextItem>
                      </HelperText>
                    </FormHelperText>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem span={4}>
            <Card>
              <CardTitle>Information</CardTitle>
              <CardBody>
                <Alert variant={AlertVariant.info} isInline title="Lease Creation">
                  <p>
                    A lease will be created to reserve an exporter that matches the specified label selector. 
                    The lease will remain active for the specified duration.
                  </p>
                  <p>
                    If no matching exporter is available, the lease will remain in a pending state until 
                    an appropriate exporter becomes available.
                  </p>
                </Alert>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </PageSection>

      <PageSection variant={PageSectionVariants.light}>
        <div style={{ 
          position: 'sticky', 
          bottom: 0, 
          backgroundColor: 'var(--pf-global--BackgroundColor--100)',
          padding: 'var(--pf-global--spacer--md) 0',
          borderTop: '1px solid var(--pf-global--BorderColor--100)',
          boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--pf-global--spacer--sm)' }}>
            <Button
              variant={ButtonVariant.secondary}
              onClick={onBack}
            >
              Cancel
            </Button>
            <Button
              variant={ButtonVariant.primary}
              onClick={handleCreate}
              isDisabled={!isFormValid}
            >
              Create Lease
            </Button>
          </div>
        </div>
      </PageSection>
    </Page>
  );
};

export default CreateLeasePage;
