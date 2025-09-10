import React from 'react';
import {
  PageSection,
  PageSectionVariants,
  Title,
  Text,
  TextContent,
  TextVariants
} from '@patternfly/react-core';

const ClientsPage: React.FC = () => {
  return (
    <PageSection variant={PageSectionVariants.light}>
      <div style={{ marginBottom: '1rem' }}>
        <Title headingLevel="h1" size="2xl">Clients</Title>
        <TextContent>
          <Text component={TextVariants.p}>
            Manage client connections and configurations.
          </Text>
        </TextContent>
      </div>
      
      <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed #ccc', borderRadius: '4px' }}>
        <Text component={TextVariants.p} style={{ color: 'var(--pf-global--Color--300)' }}>
          Clients content will be implemented here.
        </Text>
      </div>
    </PageSection>
  );
};

export default ClientsPage;
