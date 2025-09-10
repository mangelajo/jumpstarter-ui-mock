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
  TextVariants,
  DropdownToggle
} from '@patternfly/react-core';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ActionsColumn,
  IAction
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

// Mock data based on the provided JSON
const mockLeases = [
  {
    name: "0198bbdb-5825-785a-ae18-c55830627ce7",
    selector: "device=ti-jacinto-j784s4xevm-04",
    duration: 2592000.0,
    client: "bzlotnik",
    exporter: "ti-jacinto-j784s4xevm-04",
    status: "Ready",
    effectiveBeginTime: "2025-08-18T08:26:11+02:00",
    conditions: [{
      type: "Ready",
      status: "True",
      reason: "Ready",
      message: "An exporter has been acquired for the client"
    }]
  },
  {
    name: "01990c47-87ef-701e-abf1-f2db333f7ef7",
    selector: "board-type=qc8775,enabled=true",
    duration: 864000.0,
    client: "sberg",
    exporter: "qti-snapdragon-ride4-sa8775p-03",
    status: "Ready",
    effectiveBeginTime: "2025-09-02T23:13:58+02:00",
    conditions: [{
      type: "Ready",
      status: "True",
      reason: "Ready",
      message: "An exporter has been acquired for the client"
    }]
  },
  {
    name: "01991a0f-a8b7-7085-b864-59025390bcc0",
    selector: "device=qti-snapdragon-ride4-sa8775p-23",
    duration: 2592000.0,
    client: "mskrivan",
    exporter: "qti-snapdragon-ride4-sa8775p-23",
    status: "Ready",
    effectiveBeginTime: "2025-09-05T15:27:37+02:00",
    conditions: [{
      type: "Ready",
      status: "True",
      reason: "Ready",
      message: "An exporter has been acquired for the client"
    }]
  },
  {
    name: "019933b0-6b46-709f-b7f9-88563497975f",
    selector: "device=ti-jacinto-j784s4xevm-04",
    duration: 1800.0,
    client: "bzlotnik",
    exporter: "",
    status: "Pending",
    effectiveBeginTime: "1970-01-01T02:00:00+02:00",
    conditions: [{
      type: "Pending",
      status: "True",
      reason: "NotAvailable",
      message: "There are 1 approved exporters, but all of them are already leased"
    }]
  }
];

const LeasesPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const statusOptions = ['All', 'Ready', 'Pending', 'Failed'];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Ready':
        return <CheckCircleIcon style={{ color: 'var(--pf-global--success-color--100)' }} />;
      case 'Pending':
        return <ClockIcon style={{ color: 'var(--pf-global--warning-color--100)' }} />;
      case 'Failed':
        return <ExclamationTriangleIcon style={{ color: 'var(--pf-global--danger-color--100)' }} />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Ready':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Failed':
        return 'danger';
      default:
        return 'default';
    }
  };

  const formatDuration = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (dateTimeString === "1970-01-01T02:00:00+02:00") {
      return "Not started";
    }
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };

  const shortenUUID = (uuid) => {
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
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [filteredLeases, sortBy, sortDirection]);

  const onSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return null;
    return <SortAmountDownIcon style={{ transform: sortDirection === 'desc' ? 'rotate(180deg)' : 'none' }} />;
  };

  const renderSelector = (selector) => {
    const pairs = selector.split(',').slice(0, 3); // Show first 3 selector pairs
    const remainingCount = selector.split(',').length - 3;
    
    return (
      <LabelGroup>
        {pairs.map((pair, index) => (
          <Label key={index} color="blue">
            {pair.trim()}
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

  const actionItems = (row) => [
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

  const columns = [
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
            View and manage lease information for your resources.
          </Text>
        </TextContent>
      </div>

      <Toolbar>
        <ToolbarContent>
          <ToolbarGroup variant={ToolbarGroupVariant.filterGroup}>
            <ToolbarFilter
              chips={statusFilter !== 'All' ? [statusFilter] : []}
              deleteChip={() => setStatusFilter('All')}
              categoryName="Status"
            >
              <Dropdown
                isOpen={isStatusDropdownOpen}
                onOpenChange={setIsStatusDropdownOpen}
                onSelect={(event, value) => {
                  setStatusFilter(value);
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
          <ToolbarGroup variant={ToolbarGroupVariant.searchGroup}>
            <ToolbarItem>
              <SearchInput
                placeholder="Search by lease ID, exporter, or client..."
                value={searchValue}
                onChange={(event, value) => setSearchValue(value)}
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
                  <Badge variant={getStatusBadgeVariant(lease.status)}>
                    {lease.status}
                  </Badge>
                </div>
              </Td>
              <Td dataLabel="Client">
                <Badge variant="info">{lease.client}</Badge>
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
