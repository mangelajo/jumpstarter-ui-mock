import React, { useState } from 'react';
import {
  Modal,
  ModalVariant,
  Button,
  Text,
  TextContent,
  TextVariants,
  Alert,
  AlertVariant,
  Stack,
  StackItem,
  Checkbox
} from '@patternfly/react-core';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ isOpen, onClose }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.FormEvent<HTMLInputElement>, checked: boolean): void => {
    setIsChecked(checked);
  };

  return (
    <Modal
      variant={ModalVariant.medium}
      title=""
      isOpen={isOpen}
      onClose={onClose}
      showClose={false}
      hasNoBodyWrapper
      aria-describedby="warning-modal-description"
      aria-labelledby="warning-modal-title"
    >
      <div style={{ padding: '2rem' }}>
        <Stack hasGutter>
          <StackItem>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <ExclamationTriangleIcon 
                style={{ 
                  marginBottom: '1rem',
                  color: 'var(--pf-v5-global--warning-color--100)',
                  fontSize: '3rem'
                }}
              />
              <TextContent>
                <Text 
                  component={TextVariants.h1} 
                  style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold',
                    color: 'var(--pf-v5-global--warning-color--100)',
                    marginBottom: '0.5rem'
                  }}
                >
                  WARNING
                </Text>
              </TextContent>
            </div>
          </StackItem>
          
          <StackItem>
            <Alert
              variant={AlertVariant.warning}
              isInline
              title=""
              style={{ marginBottom: '1.5rem' }}
            >
              <TextContent>
                <Text 
                  component={TextVariants.p}
                  style={{ 
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    margin: 0
                  }}
                >
                  This is a <strong>mockup</strong> of a UI using the same technologies used at Red Hat (React + PatternFly), 
                  but it's <strong>not a product or even a prototype</strong>. There is no API backend connection, 
                  and it's all simulated in JavaScript. UI will need dedicated staff and planning if we want to 
                  include it as part of the product.
                </Text>
              </TextContent>
            </Alert>
          </StackItem>
          
          <StackItem>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <Checkbox
                id="understand-checkbox"
                label="I Understand this is just a mockup"
                isChecked={isChecked}
                onChange={handleCheckboxChange}
                style={{ 
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              />
            </div>
          </StackItem>
          
          <StackItem>
            <div style={{ textAlign: 'center' }}>
              <Button
                variant="primary"
                onClick={onClose}
                size="lg"
                isDisabled={!isChecked}
                style={{ 
                  minWidth: '120px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                Continue
              </Button>
            </div>
          </StackItem>
        </Stack>
      </div>
    </Modal>
  );
};

export default WarningModal;
