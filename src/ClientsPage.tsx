import React, { useState, useMemo } from 'react';
import {
  PageSection,
  PageSectionVariants,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarGroupVariant,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  SearchInput,
  Badge,
  Label,
  LabelGroup,
  Text,
  TextContent,
  TextVariants
} from '@patternfly/react-core';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@patternfly/react-table';
import {
  FilterIcon,
  SortAmountDownIcon,
  EllipsisVIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  TimesCircleIcon,
  ClockIcon
} from '@patternfly/react-icons';
import { Client, ActionItem, TableColumn, SortDirection } from './types';
import { getClients } from './dataStore';

interface ClientsPageProps {
  onClientSelect: (client: Client) => void;
  refreshTrigger?: number;
}

const ClientsPage: React.FC<ClientsPageProps> = ({ onClientSelect, refreshTrigger }) => {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{ sortBy: string; sortDirection: SortDirection }>({
    sortBy: 'name',
    sortDirection: 'asc'
  });
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isActionDropdownOpen, setIsActionDropdownOpen] = useState<string | null>(null);

  const clients = getClients();

  const getStatusBadge = (hasCredential: boolean, hasEndpoint: boolean) => {
    if (hasCredential && hasEndpoint) {
      return <Badge isRead color="green">Active</Badge>;
    } else if (hasEndpoint) {
      return <Badge isRead color="blue">Connected</Badge>;
    } else {
      return <Badge isRead color="orange">Inactive</Badge>;
    }
  };

  const getStatusIcon = (hasCredential: boolean, hasEndpoint: boolean) => {
    if (hasCredential && hasEndpoint) {
      return <CheckCircleIcon style={{ color: '#52c41a' }} />;
    } else if (hasEndpoint) {
      return <ClockIcon style={{ color: '#faad14' }} />;
    } else {
      return <TimesCircleIcon style={{ color: '#6a6e73' }} />;
    }
  };

  const filteredAndSortedClients = useMemo(() => {
    let filtered = clients.filter(client => {
      const matchesSearch = client.metadata.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                           client.spec.username.toLowerCase().includes(searchValue.toLowerCase());
      
      let matchesStatus = true;
      if (statusFilter !== 'all') {
        const hasCredential = !!client.status.credential;
        const hasEndpoint = !!client.status.endpoint;
        
        if (statusFilter === 'active') {
          matchesStatus = hasCredential && hasEndpoint;
        } else if (statusFilter === 'connected') {
          matchesStatus = hasEndpoint && !hasCredential;
        } else if (statusFilter === 'inactive') {
          matchesStatus = !hasEndpoint;
        }
      }
      
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      const aValue = a.metadata[sortConfig.sortBy as keyof typeof a.metadata] || '';
      const bValue = b.metadata[sortConfig.sortBy as keyof typeof b.metadata] || '';
      
      if (sortConfig.sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [clients, searchValue, statusFilter, sortConfig]);

  const handleSort = (column: string) => {
    setSortConfig(prev => ({
      sortBy: column,
      sortDirection: prev.sortBy === column && prev.sortDirection === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleClientClick = (client: Client) => {
    onClientSelect(client);
  };

  const handleActionToggle = (clientName: string) => {
    setIsActionDropdownOpen(isActionDropdownOpen === clientName ? null : clientName);
  };

  const actionItems: ActionItem[] = [
    {
      key: 'view',
      label: 'View Details',
      onClick: () => {}
    },
    {
      key: 'edit',
      label: 'Edit Client',
      onClick: () => {}
    },
    {
      key: 'delete',
      label: 'Delete Client',
      onClick: () => {}
    }
  ];

  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'username', title: 'Username', sortable: true },
    { key: 'status', title: 'Status', sortable: false },
    { key: 'endpoint', title: 'Endpoint', sortable: false },
    { key: 'created', title: 'Created', sortable: true },
    { key: 'actions', title: 'Actions', sortable: false }
  ];

  return (
    <PageSection variant={PageSectionVariants.light}>
      <div style={{ marginBottom: '1rem' }}>
        <Title headingLevel="h1" size="2xl">Clients</Title>
        <TextContent>
          <Text component={TextVariants.p}>
            Manage and monitor client connections to the Jumpstarter platform.
          </Text>
        </TextContent>
      </div>

      <Toolbar>
        <ToolbarContent>
          <ToolbarGroup variant={ToolbarGroupVariant['filter-group']}>
            <ToolbarFilter
              chips={searchValue ? [{ key: 'search', node: `Search: ${searchValue}` }] : []}
              deleteChip={() => setSearchValue('')}
              categoryName="Search"
            >
              <SearchInput
                value={searchValue}
                onChange={(_, value) => setSearchValue(value)}
                onClear={() => setSearchValue('')}
                placeholder="Search clients..."
              />
            </ToolbarFilter>
            <ToolbarFilter
              chips={statusFilter !== 'all' ? [{ key: 'status', node: `Status: ${statusFilter}` }] : []}
              deleteChip={() => setStatusFilter('all')}
              categoryName="Status"
            >
              <Dropdown
                isOpen={isStatusDropdownOpen}
                onOpenChange={setIsStatusDropdownOpen}
                onSelect={() => setIsStatusDropdownOpen(false)}
                toggle={(toggleRef) => (
                  <MenuToggle
                    ref={toggleRef}
                    variant="plain"
                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                    isExpanded={isStatusDropdownOpen}
                    icon={<FilterIcon />}
                  >
                    Status
                  </MenuToggle>
                )}
              >
                <DropdownList>
                  <DropdownItem onClick={() => setStatusFilter('all')}>All</DropdownItem>
                  <DropdownItem onClick={() => setStatusFilter('active')}>Active</DropdownItem>
                  <DropdownItem onClick={() => setStatusFilter('connected')}>Connected</DropdownItem>
                  <DropdownItem onClick={() => setStatusFilter('inactive')}>Inactive</DropdownItem>
                </DropdownList>
              </Dropdown>
            </ToolbarFilter>
          </ToolbarGroup>
          <ToolbarItem>
            <Text component={TextVariants.small}>
              {filteredAndSortedClients.length} of {clients.length} clients
            </Text>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      <Table>
        <Thead>
          <Tr>
            {columns.map(column => (
              <Th
                key={column.key}
                sort={column.sortable ? {
                  sortBy: { 
                    index: columns.findIndex(c => c.key === column.key), 
                    direction: sortConfig.sortDirection
                  },
                  onSort: () => handleSort(column.key),
                  columnIndex: columns.findIndex(c => c.key === column.key)
                } : undefined}
              >
                {column.title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {filteredAndSortedClients.map(client => {
            const hasCredential = !!client.status.credential;
            const hasEndpoint = !!client.status.endpoint;
            const createdDate = new Date(client.metadata.creationTimestamp || '').toLocaleDateString();
            
            return (
              <Tr key={client.metadata.name} isClickable onClick={() => handleClientClick(client)}>
                <Td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {getStatusIcon(hasCredential, hasEndpoint)}
                    <Text component={TextVariants.p} style={{ fontWeight: 'bold' }}>
                      {client.metadata.name}
                    </Text>
                  </div>
                </Td>
                <Td>{client.spec.username}</Td>
                <Td>{getStatusBadge(hasCredential, hasEndpoint)}</Td>
                <Td>
                  <Text component={TextVariants.small}>
                    {client.status.endpoint || 'Not available'}
                  </Text>
                </Td>
                <Td>{createdDate}</Td>
                <Td>
                  <Dropdown
                    isOpen={isActionDropdownOpen === client.metadata.name}
                    onOpenChange={() => setIsActionDropdownOpen(null)}
                    onSelect={() => setIsActionDropdownOpen(null)}
                    toggle={(toggleRef) => (
                      <MenuToggle
                        ref={toggleRef}
                        variant="plain"
                        onClick={() => handleActionToggle(client.metadata.name)}
                        isExpanded={isActionDropdownOpen === client.metadata.name}
                        icon={<EllipsisVIcon />}
                      />
                    )}
                  >
                    <DropdownList>
                      {actionItems.map(item => (
                        <DropdownItem key={item.key} onClick={item.onClick}>
                          {item.label}
                        </DropdownItem>
                      ))}
                    </DropdownList>
                  </Dropdown>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </PageSection>
  );
};

export default ClientsPage;