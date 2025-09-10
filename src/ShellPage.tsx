import React from 'react';
import {
  PageSection,
  PageSectionVariants,
  Title,
  Text,
  TextContent,
  TextVariants,
  Card,
  CardBody,
  CardTitle
} from '@patternfly/react-core';
import TerminalConsole from './TerminalConsole';

const ShellPage: React.FC = () => {
  return (
    <PageSection variant={PageSectionVariants.light}>
      <div style={{ marginBottom: '1rem' }}>
        <Title headingLevel="h1" size="2xl">Jumpstarter Shell</Title>
        <TextContent>
          <Text component={TextVariants.p}>
            Access shell interface for your OpenShift cluster and exporters.
          </Text>
        </TextContent>
      </div>
      
      <Card style={{ height: '600px' }}>
        <CardTitle>General Shell Access</CardTitle>
        <CardBody style={{ height: 'calc(100% - 60px)', padding: 0 }}>
          <TerminalConsole
            exporterName="general-shell"
            onConnect={() => console.log('General shell connected')}
            onDisconnect={() => console.log('General shell disconnected')}
            onData={(data) => console.log('Shell data:', data)}
            onSend={(command) => console.log('Command sent:', command)}
          />
        </CardBody>
      </Card>
    </PageSection>
  );
};

export default ShellPage;
