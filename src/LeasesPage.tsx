import React, { useState, useMemo } from 'react';
import {
  PageSection,
  PageSectionVariants,
  Title,
  Button,
  ButtonVariant,
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
  PlusIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@patternfly/react-icons';
import { Lease, ActionItem, TableColumn, SortDirection } from './types';

// Mock data based on the provided JSON
const mockLeases: Lease[] = [
  {
    name: "0198bbdb-5825-785a-ae18-c55830627ce7",
    status: "Ready",
    client: "user-123",
    exporter: "qti-snapdragon-ride4-sa8775p-03",
    duration: "2h30m",
    effectiveBeginTime: "2024-01-15T10:30:00Z",
    selector: {
      board: "qti-snapdragon-ride4-sa8775p",
      location: "bos2"
    }
  },
  {
    name: "0198bbdb-5825-785a-ae18-c55830627ce8",
    status: "Pending",
    client: "user-456",
    exporter: "nxp-imx8qxp-mek-eballetbo-01",
    duration: "1h45m",
    effectiveBeginTime: "2024-01-15T14:15:00Z",
    selector: {
      board: "nxp-imx8qxp-mek",
      location: "eballetbo-desk"
    }
  },
  {
    name: "0198bbdb-5825-785a-ae18-c55830627ce9",
    status: "Ready",
    client: "user-789",
    duration: "3h15m",
    effectiveBeginTime: "2024-01-15T09:00:00Z",
    selector: {
      board: "renesas-rcar-s4",
      location: "bos2"
    }
  },
  {
    name: "0198bbdb-5825-785a-ae18-c55830627cea",
    status: "Error",
    client: "user-101",
    exporter: "ti-jacinto-j784s4xevm-01",
    duration: "0h5m",
    effectiveBeginTime: "2024-01-15T16:45:00Z",
    selector: {
      board: "j784s4evm",
      location: "bos2"
    }
  }
];

const LeasesPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const statusOptions: string[] = ['All', 'Ready', 'Pending', 'Error'];

  const getStatusIcon = (status: Lease['status']): React.ReactElement | null => {
    switch (status) {
      case 'Ready':
        return <CheckCircleIcon style={{ color: 'var(--pf-global--success-color--100)' }} />;
      case 'Pending':
        return <ClockIcon style={{ color: 'var(--pf-global--warning-color--100)' }} />;
      case 'Error':
        return <ExclamationTriangleIcon style={{ color: 'var(--pf-global--danger-color--100)' }} />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (status: Lease['status']): 'success' | 'warning' | 'danger' | 'default' => {
    switch (status) {
      case 'Ready':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Error':
        return 'danger';
      default:
        return 'default';
    }
  };

  const formatDuration = (duration: string): string => {
    return duration;
  };

  const formatDateTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  const shortenUUID = (uuid: string): string => {
    return uuid.substring(uuid.length - 8);
  };

  const filteredLeases = useMemo(() => {
    return mockLeases.filter(lease => {
      const matchesSearch = lease.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                           lease.client.toLowerCase().includes(searchValue.toLowerCase()) ||
                           (lease.exporter && lease.exporter.toLowerCase().includes(searchValue.toLowerCase()));
      const matchesStatus = statusFilter === 'All' || lease.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchValue, statusFilter]);

  const sortedLeases = useMemo(() => {
    return [...filteredLeases].sort((a, b) => {
      const aValue = a[sortBy as keyof Lease];
      const bValue = b[sortBy as keyof Lease];
      
      // Handle undefined values
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [filteredLeases, sortBy, sortDirection]);

  const onSort = (column: string): void => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (column: string): React.ReactElement | null => {
    if (sortBy !== column) return null;
    return <SortAmountDownIcon style={{ transform: sortDirection === 'desc' ? 'rotate(180deg)' : 'none' }} />;
  };

  const renderSelector = (selector: Record<string, string>): React.ReactElement => {
    const selectorEntries = Object.entries(selector).slice(0, 2); // Show first 2 selector entries
    const remainingCount = Object.keys(selector).length - 2;
    
    return (
      <LabelGroup>
        {selectorEntries.map(([key, value]) => (
          <Label key={key} color="blue">
            {key}={value}
          </Label>
        ))}
        {remainingCount > 0 && (
          <Label color="grey">
            +{remainingCount} more
          </Label>
        )}
      </LabelGroup>
    );
  };

  const actionItems = (row: Lease): ActionItem[] => [
    {
      key: 'release',
      label: 'Release',
      onClick: () => console.log(`Release action for ${row.name}`)
    },
    {
      key: 'extend',
      label: 'Extend',
      onClick: () => console.log(`Extend action for ${row.name}`)
    }
  ];

  const columns: TableColumn[] = [
    {
      key: 'name',
      title: 'Lease ID',
      sortable: true
    },
    {
      key: 'exporter',
      title: 'Exporter',
      sortable: true
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true
    },
    {
      key: 'client',
      title: 'Client',
      sortable: true
    },
    {
      key: 'duration',
      title: 'Duration',
      sortable: true
    },
    {
      key: 'effectiveBeginTime',
      title: 'Effective Begin Time',
      sortable: true
    },
    {
      key: 'selector',
      title: 'Selector',
      sortable: false
    }
  ];

  return (
    <PageSection variant={PageSectionVariants.light}>
      <div style={{ marginBottom: '1rem' }}>
        <Title headingLevel="h1" size="2xl">Leases</Title>
        <TextContent>
          <Text component={TextVariants.p}>
            Manage and monitor active leases for your exporters.
          </Text>
        </TextContent>
      </div>

      <Toolbar>
        <ToolbarContent>
          <ToolbarGroup variant="filter-group">
            <ToolbarFilter
              chips={statusFilter !== 'All' ? [statusFilter] : []}
              deleteChip={() => setStatusFilter('All')}
              categoryName="Status"
            >
              <Dropdown
                isOpen={isStatusDropdownOpen}
                onOpenChange={setIsStatusDropdownOpen}
                onSelect={(event, value) => {
                  setStatusFilter(value as string);
                  setIsStatusDropdownOpen(false);
                }}
                toggle={(toggleRef) => (
                  <MenuToggle
                    ref={toggleRef}
                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                    isExpanded={isStatusDropdownOpen}
                    icon={<FilterIcon />}
                  >
                    Status
                  </MenuToggle>
                )}
              >
                <DropdownList>
                  {statusOptions.map(option => (
                    <DropdownItem key={option} value={option}>
                      {option}
                    </DropdownItem>
                  ))}
                </DropdownList>
              </Dropdown>
            </ToolbarFilter>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarItem>
              <SearchInput
                placeholder="Search by lease ID, exporter, or client..."
                value={searchValue}
                onChange={(event, value) => setSearchValue(value as string)}
                onClear={() => setSearchValue('')}
              />
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarItem>
            <Button variant={ButtonVariant.primary}>
              <PlusIcon /> Create Lease
            </Button>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      <Table aria-label="Leases table">
        <Thead>
          <Tr>
            {columns.map(column => (
              <Th
                key={column.key}
                sort={column.sortable ? {
                  sortBy: { index: columns.findIndex(c => c.key === column.key), direction: sortDirection },
                  onSort: () => onSort(column.key),
                  columnIndex: columns.findIndex(c => c.key === column.key)
                } : undefined}
              >
                {column.title}
                {column.sortable && getSortIcon(column.key)}
              </Th>
            ))}
            <Th style={{ minWidth: '80px' }}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedLeases.map((lease, index) => (
            <Tr key={lease.name}>
              <Td dataLabel="Lease ID">
                <Text 
                  component={TextVariants.a} 
                  href="#" 
                  style={{ fontWeight: 'bold' }}
                  title={lease.name}
                >
                  ...{shortenUUID(lease.name)}
                </Text>
              </Td>
              <Td dataLabel="Exporter">
                {lease.exporter ? (
                  <Text component={TextVariants.a} href="#" style={{ fontWeight: 'bold' }}>
                    {lease.exporter}
                  </Text>
                ) : (
                  <Text component={TextVariants.small} style={{ color: 'var(--pf-global--Color--300)' }}>
                    Not assigned
                  </Text>
                )}
              </Td>
              <Td dataLabel="Status">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {getStatusIcon(lease.status)}
                  <Badge isRead={lease.status === 'Ready'}>
                    {lease.status}
                  </Badge>
                </div>
              </Td>
              <Td dataLabel="Client">
                <Text component={TextVariants.a} href="#" style={{ fontWeight: 'bold' }}>
                  {lease.client}
                </Text>
              </Td>
              <Td dataLabel="Duration">
                <Text component={TextVariants.small}>
                  {formatDuration(lease.duration)}
                </Text>
              </Td>
              <Td dataLabel="Effective Begin Time">
                <Text component={TextVariants.small}>
                  {formatDateTime(lease.effectiveBeginTime)}
                </Text>
              </Td>
              <Td dataLabel="Selector">
                {renderSelector(lease.selector)}
              </Td>
              <Td isActionCell>
                <Dropdown
                  isOpen={openDropdownId === lease.name}
                  onOpenChange={(isOpen) => setOpenDropdownId(isOpen ? lease.name : null)}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      variant="plain"
                      onClick={() => setOpenDropdownId(openDropdownId === lease.name ? null : lease.name)}
                      isExpanded={openDropdownId === lease.name}
                    >
                      <EllipsisVIcon />
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                    {actionItems(lease).map((action) => (
                      <DropdownItem
                        key={action.key}
                        onClick={() => {
                          action.onClick();
                          setOpenDropdownId(null);
                        }}
                      >
                        {action.label}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                </Dropdown>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {sortedLeases.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Text component={TextVariants.p} style={{ color: 'var(--pf-global--Color--300)' }}>
            No leases found matching your criteria.
          </Text>
        </div>
      )}
    </PageSection>
  );
};

export default LeasesPage;
