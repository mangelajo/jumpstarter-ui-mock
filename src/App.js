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
import ShellPage from './ShellPage';
import './App.css';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('exporters');

  useEffect(() => {
    console.log('activeItem changed to:', activeItem);
  }, [activeItem]);

  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const onSelect = (event, itemId) => {
    console.log('Navigation clicked:', event, 'itemId:', itemId); // Debug log
    
    // If itemId is provided, use it directly
    if (itemId) {
      console.log('Setting activeItem to:', itemId); // Debug log
      setActiveItem(itemId);
      return;
    }
    
    // Otherwise, try to extract from the event
    const target = event.target;
    const navItem = target.closest('[data-item-id]');
    const extractedItemId = navItem?.getAttribute('data-item-id');
    
    console.log('Extracted itemId:', extractedItemId); // Debug log
    if (extractedItemId) {
      setActiveItem(extractedItemId);
    }
  };

  const onUserDropdownToggle = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const onHelpDropdownToggle = () => {
    setIsHelpDropdownOpen(!isHelpDropdownOpen);
  };

  const handleNavClick = (itemId) => {
    console.log('Nav item clicked:', itemId);
    setActiveItem(itemId);
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
        <NavItem 
          itemId="shell" 
          isActive={activeItem === 'shell'} 
          onClick={() => handleNavClick('shell')}
        >
          Shell
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
              <Button variant={ButtonVariant.plain}>Project: openshift-builds</Button>
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

  const getPageContent = () => {
    console.log('Current activeItem:', activeItem); // Debug log
    switch (activeItem) {
      case 'exporters':
        return <ExportersPage />;
      case 'leases':
        return <LeasesPage />;
      case 'clients':
        return <ClientsPage />;
      case 'shell':
        return <ShellPage />;
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
}

export default App;