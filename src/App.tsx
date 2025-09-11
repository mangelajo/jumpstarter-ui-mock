import React, { useState, useEffect } from 'react';
import {
  Page,
  PageSidebar,
  PageSidebarBody,
  PageToggleButton,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadMain,
  MastheadToggle,
  Nav,
  NavList,
  NavItem,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Button,
  ButtonVariant,
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
  TextVariants,
  Brand
} from '@patternfly/react-core';
import {
  RedhatIcon,
  BellIcon,
  PlusIcon,
  QuestionCircleIcon,
  ApplicationsIcon,
  BarsIcon
} from '@patternfly/react-icons';
import ExportersPage from './ExportersPage';
import LeasesPage from './LeasesPage';
import ClientsPage from './ClientsPage';
import ExporterDetailsPage from './ExporterDetailsPage';
import LeaseDetailsPage from './LeaseDetailsPage';
import { Exporter, Lease } from './types';
import { mockExporters, mockLeases } from './data';
import './App.css';

type ActiveItem = 'exporters' | 'leases' | 'clients' | 'exporter-details' | 'lease-details';

const App: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(true);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false);
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<ActiveItem>('exporters');
  const [selectedExporter, setSelectedExporter] = useState<Exporter | null>(null);
  const [selectedLease, setSelectedLease] = useState<Lease | null>(null);

  useEffect(() => {
    console.log('activeItem changed to:', activeItem);
  }, [activeItem]);

  const onNavToggle = (): void => {
    setIsNavOpen(!isNavOpen);
  };

  const onSelect = (event: React.SyntheticEvent, itemId?: string): void => {
    console.log('Navigation clicked:', event, 'itemId:', itemId); // Debug log
    
    // If itemId is provided, use it directly
    if (itemId) {
      console.log('Setting activeItem to:', itemId); // Debug log
      setActiveItem(itemId as ActiveItem);
      return;
    }
    
    // Otherwise, try to extract from the event
    const target = event.target as HTMLElement;
    const navItem = target.closest('[data-item-id]') as HTMLElement;
    const extractedItemId = navItem?.getAttribute('data-item-id');
    
    console.log('Extracted itemId:', extractedItemId); // Debug log
    if (extractedItemId) {
      setActiveItem(extractedItemId as ActiveItem);
    }
  };

  const onUserDropdownToggle = (): void => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const onHelpDropdownToggle = (): void => {
    setIsHelpDropdownOpen(!isHelpDropdownOpen);
  };

  const handleNavClick = (itemId: ActiveItem): void => {
    console.log('Nav item clicked:', itemId);
    setActiveItem(itemId);
  };

  const handleExporterSelect = (exporter: Exporter): void => {
    setSelectedExporter(exporter);
    setActiveItem('exporter-details');
  };

  const handleBackToExporters = (): void => {
    setActiveItem('exporters');
    setSelectedExporter(null);
  };

  const handleLeaseSelect = (lease: Lease): void => {
    setSelectedLease(lease);
    setActiveItem('lease-details');
  };

  const handleBackToLeases = (): void => {
    setActiveItem('leases');
    setSelectedLease(null);
  };

  const handleLeaseSelectFromExporter = (leaseId: string): void => {
    // Find the lease by ID
    const lease = mockLeases.find(l => l.metadata.name === leaseId);
    if (lease) {
      setSelectedLease(lease);
      setActiveItem('lease-details');
    }
  };

  const handleExporterSelectFromLease = (exporterName: string): void => {
    // Find the exporter by name
    const exporter = mockExporters.find(e => e.metadata.name === exporterName);
    if (exporter) {
      setSelectedExporter(exporter);
      setActiveItem('exporter-details');
    }
  };

  const PageNav = (
    <Nav id="main-nav" theme="dark">
      <NavList>
        <NavItem 
          itemId="exporters" 
          isActive={activeItem === 'exporters'} 
          onClick={() => handleNavClick('exporters')}
        >
          Exporters
        </NavItem>
        <NavItem 
          itemId="leases" 
          isActive={activeItem === 'leases'} 
          onClick={() => handleNavClick('leases')}
        >
          Leases
        </NavItem>
        <NavItem 
          itemId="clients" 
          isActive={activeItem === 'clients'} 
          onClick={() => handleNavClick('clients')}
        >
          Clients
        </NavItem>
      </NavList>
    </Nav>
  );

  const Header = (
    <Masthead id="main-masthead">
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton
            variant="plain"
            aria-label="Global navigation"
            isSidebarOpen={isNavOpen}
            onSidebarToggle={onNavToggle}
          >
            <BarsIcon />
          </PageToggleButton>
        </MastheadToggle>
        <MastheadBrand>
          <Brand src="/redhat-logo.svg" alt="Red Hat" heights={{ default: '30px' }} />
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <Toolbar isFullHeight isStatic>
          <ToolbarContent>
            <ToolbarItem>
              <Button variant={ButtonVariant.plain}>Project: jumpstarter-lab</Button>
            </ToolbarItem>
            <ToolbarItem>
              <Button variant={ButtonVariant.plain} aria-label="Applications">
                <ApplicationsIcon />
              </Button>
            </ToolbarItem>
            <ToolbarItem>
              <Button variant={ButtonVariant.plain} aria-label="Notifications">
                <BellIcon />
                <Badge isRead>6</Badge>
              </Button>
            </ToolbarItem>
            <ToolbarItem>
              <Button variant={ButtonVariant.plain} aria-label="Add">
                <PlusIcon />
              </Button>
            </ToolbarItem>
            <ToolbarItem>
              <Dropdown
                isOpen={isHelpDropdownOpen}
                onOpenChange={setIsHelpDropdownOpen}
                onSelect={() => setIsHelpDropdownOpen(false)}
                toggle={(toggleRef) => (
                  <MenuToggle
                    aria-label="Help menu"
                    ref={toggleRef}
                    variant="plain"
                    onClick={onHelpDropdownToggle}
                    isExpanded={isHelpDropdownOpen}
                  >
                    <QuestionCircleIcon />
                  </MenuToggle>
                )}
                popperProps={{ position: 'right' }}
              >
                <DropdownList>
                  <DropdownItem>Documentation</DropdownItem>
                  <DropdownItem>Support</DropdownItem>
                </DropdownList>
              </Dropdown>
            </ToolbarItem>
            <ToolbarItem>
              <Dropdown
                isOpen={isUserDropdownOpen}
                onOpenChange={setIsUserDropdownOpen}
                onSelect={() => setIsUserDropdownOpen(false)}
                toggle={(toggleRef) => (
                  <MenuToggle
                    ref={toggleRef}
                    icon={<Avatar alt="User" size="md" />}
                    onClick={onUserDropdownToggle}
                    isExpanded={isUserDropdownOpen}
                    variant="plainText"
                  >
                    User
                  </MenuToggle>
                )}
              >
                <DropdownList>
                  <DropdownItem>Profile</DropdownItem>
                  <DropdownItem>Settings</DropdownItem>
                  <DropdownItem>Logout</DropdownItem>
                </DropdownList>
              </Dropdown>
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </MastheadContent>
    </Masthead>
  );

  const Sidebar = (
    <PageSidebar theme="dark" isSidebarOpen={isNavOpen}>
      <PageSidebarBody>
        {PageNav}
      </PageSidebarBody>
    </PageSidebar>
  );

  const getPageContent = (): React.ReactElement => {
    console.log('Current activeItem:', activeItem); // Debug log
    switch (activeItem) {
      case 'exporters':
        return <ExportersPage onExporterSelect={handleExporterSelect} onLeaseSelect={handleLeaseSelectFromExporter} />;
      case 'leases':
        return <LeasesPage onLeaseSelect={handleLeaseSelect} />;
      case 'clients':
        return <ClientsPage />;
      case 'exporter-details':
        return selectedExporter ? (
          <ExporterDetailsPage 
            exporter={selectedExporter} 
            onBack={handleBackToExporters} 
          />
        ) : (
          <PageSection variant={PageSectionVariants.light}>
            <TextContent>
              <Text component={TextVariants.h1}>Exporter Not Found</Text>
              <Text component={TextVariants.p}>
                The selected exporter could not be found.
              </Text>
            </TextContent>
          </PageSection>
        );
      case 'lease-details':
        return selectedLease ? (
          <LeaseDetailsPage 
            lease={selectedLease} 
            onBack={handleBackToLeases}
            onExporterSelect={handleExporterSelectFromLease}
          />
        ) : (
          <PageSection variant={PageSectionVariants.light}>
            <TextContent>
              <Text component={TextVariants.h1}>Lease Not Found</Text>
              <Text component={TextVariants.p}>
                The selected lease could not be found.
              </Text>
            </TextContent>
          </PageSection>
        );
      default:
        return (
          <PageSection variant={PageSectionVariants.light}>
            <TextContent>
              <Text component={TextVariants.h1}>Welcome</Text>
              <Text component={TextVariants.p}>
                Select a section from the navigation menu to get started.
              </Text>
            </TextContent>
          </PageSection>
        );
    }
  };

  return (
    <Page
      header={Header}
      sidebar={Sidebar}
      isManagedSidebar
      mainContainerId="primary-app-container"
    >
      {getPageContent()}
    </Page>
  );
};

export default App;
