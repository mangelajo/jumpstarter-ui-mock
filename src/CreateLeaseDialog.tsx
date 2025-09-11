import React, { useState } from 'react';
import {
  Modal,
  ModalVariant,
  Button,
  ButtonVariant,
  Form,
  FormGroup,
  TextInput,
  TextArea,
  FormHelperText,
  HelperText,
  HelperTextItem,
  ValidatedOptions
} from '@patternfly/react-core';
import { Lease } from './types';

interface CreateLeaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateLease: (lease: Omit<Lease, 'metadata'>) => void;
}

const CreateLeaseDialog: React.FC<CreateLeaseDialogProps> = ({
  isOpen,
  onClose,
  onCreateLease
}) => {
  const [labelSelector, setLabelSelector] = useState<string>('');
  const [duration, setDuration] = useState<string>('1h');
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [labelSelectorError, setLabelSelectorError] = useState<string>('');
  const [durationError, setDurationError] = useState<string>('');

  const validateLabelSelector = (value: string): string => {
    if (!value.trim()) {
      return 'Label selector is required';
    }
    // Basic validation for label selector format (key=value,key2=value2)
    const labelPattern = /^[a-zA-Z0-9]([a-zA-Z0-9\-_.]*[a-zA-Z0-9])?=[a-zA-Z0-9]([a-zA-Z0-9\-_.]*[a-zA-Z0-9])?(,[a-zA-Z0-9]([a-zA-Z0-9\-_.]*[a-zA-Z0-9])?=[a-zA-Z0-9]([a-zA-Z0-9\-_.]*[a-zA-Z0-9])?)*$/;
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
    const durationPattern = /^(\d+h)?(\d+m)?(\d+s)?$/;
    if (!durationPattern.test(value.trim())) {
      return 'Invalid duration format. Use format like 1h, 30m, 2h30m';
    }
    return '';
  };

  const handleLabelSelectorChange = (value: string): void => {
    setLabelSelector(value);
    if (isValidating) {
      setLabelSelectorError(validateLabelSelector(value));
    }
  };

  const handleDurationChange = (value: string): void => {
    setDuration(value);
    if (isValidating) {
      setDurationError(validateDuration(value));
    }
  };

  const validateForm = (): boolean => {
    setIsValidating(true);
    const labelError = validateLabelSelector(labelSelector);
    const durationError = validateDuration(duration);
    
    setLabelSelectorError(labelError);
    setDurationError(durationError);
    
    return !labelError && !durationError;
  };

  const handleCreate = (): void => {
    if (!validateForm()) {
      return;
    }

    // Parse label selector into matchLabels format
    const matchLabels: Record<string, string> = {};
    labelSelector.split(',').forEach(pair => {
      const [key, value] = pair.trim().split('=');
      if (key && value) {
        matchLabels[key.trim()] = value.trim();
      }
    });

    // Generate a new lease ID
    const leaseId = `lease-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const newLease: Omit<Lease, 'metadata'> = {
      apiVersion: 'jumpstarter.io/v1alpha1',
      kind: 'Lease',
      spec: {
        clientRef: {
          name: 'default-client' // Default client for now
        },
        duration: duration,
        selector: {
          matchLabels: matchLabels
        }
      },
      status: {
        beginTime: new Date().toISOString(),
        ended: false,
        // No exporterRef yet - will be assigned when lease becomes active
      }
    };

    onCreateLease(newLease);
    handleClose();
  };

  const handleClose = (): void => {
    setLabelSelector('');
    setDuration('1h');
    setLabelSelectorError('');
    setDurationError('');
    setIsValidating(false);
    onClose();
  };

  const isFormValid = !labelSelectorError && !durationError && labelSelector.trim() && duration.trim();

  return (
    <Modal
      variant={ModalVariant.medium}
      title="Create New Lease"
      isOpen={isOpen}
      onClose={handleClose}
      actions={[
        <Button
          key="create"
          variant={ButtonVariant.primary}
          onClick={handleCreate}
          isDisabled={!isFormValid}
        >
          Create Lease
        </Button>,
        <Button
          key="cancel"
          variant={ButtonVariant.link}
          onClick={handleClose}
        >
          Cancel
        </Button>
      ]}
    >
      <Form>
        <FormGroup
          label="Label Selector"
          isRequired
          fieldId="label-selector"
        >
          <TextArea
            id="label-selector"
            value={labelSelector}
            onChange={(_event, value) => handleLabelSelectorChange(value)}
            placeholder="board-type=qc8775,enabled=true"
            validated={labelSelectorError ? ValidatedOptions.error : ValidatedOptions.default}
            rows={3}
          />
          <FormHelperText>
            <HelperText>
              <HelperTextItem>
                Enter label selector in key=value format (e.g., board-type=qc8775,enabled=true)
              </HelperTextItem>
            </HelperText>
          </FormHelperText>
          {labelSelectorError && (
            <FormHelperText>
              <HelperText>
                <HelperTextItem variant="error">{labelSelectorError}</HelperTextItem>
              </HelperText>
            </FormHelperText>
          )}
        </FormGroup>

        <FormGroup
          label="Duration"
          isRequired
          fieldId="duration"
        >
          <TextInput
            id="duration"
            value={duration}
            onChange={(_event, value) => handleDurationChange(value)}
            placeholder="1h"
            validated={durationError ? ValidatedOptions.error : ValidatedOptions.default}
          />
          <FormHelperText>
            <HelperText>
              <HelperTextItem>
                Enter lease duration (e.g., 1h, 30m, 2h30m)
              </HelperTextItem>
            </HelperText>
          </FormHelperText>
          {durationError && (
            <FormHelperText>
              <HelperText>
                <HelperTextItem variant="error">{durationError}</HelperTextItem>
              </HelperText>
            </FormHelperText>
          )}
        </FormGroup>
      </Form>
    </Modal>
  );
};

export default CreateLeaseDialog;
