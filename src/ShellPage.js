import React from 'react';
import {
  PageSection,
  PageSectionVariants,
  Title,
  Text,
  TextContent,
  TextVariants
} from '@patternfly/react-core';

const ShellPage = () => {
  return (
    <PageSection variant={PageSectionVariants.light}>
      <div style={{ marginBottom: '1rem' }}>
        <Title headingLevel="h1" size="2xl">Shell</Title>
        <TextContent>
          <Text component={TextVariants.p}>
            Access shell interface for your OpenShift cluster.
          </Text>
        </TextContent>
      </div>
      
      <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed #ccc', borderRadius: '4px' }}>
        <Text component={TextVariants.p} style={{ color: 'var(--pf-global--Color--300)' }}>
          Shell content will be implemented here.
        </Text>
      </div>
    </PageSection>
  );
};

export default ShellPage;
