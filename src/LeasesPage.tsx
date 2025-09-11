import React, { useState, useMemo, useEffect } from 'react';
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
  TimesCircleIcon,
  ClockIcon
} from '@patternfly/react-icons';
import { Lease, ActionItem, TableColumn, SortDirection } from './types';
import CreateLeasePage from './CreateLeasePage';
import { getLeases } from './dataStore';

interface LeasesPageProps {
  onLeaseSelect: (lease: Lease) => void;
  onCreateLease: () => void;
  refreshTrigger?: number; // Add refresh trigger prop
}


const LeasesPage: React.FC<LeasesPageProps> = ({ onLeaseSelect, onCreateLease, refreshTrigger }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [leases, setLeases] = useState<Lease[]>(getLeases());

  // Refresh leases when component mounts or when refreshTrigger changes
  useEffect(() => {
    setLeases(getLeases());
  }, [refreshTrigger]);

  const getStatusIcon = (lease: Lease) => {
    if (lease.status.ended) {
      return <TimesCircleIcon style={{ color: '#6a6e73' }} />;
    }
    if (lease.status.exporterRef) {
      return <CheckCircleIcon style={{ color: '#52c41a' }} />;
    }
    return <ClockIcon style={{ color: '#faad14' }} />;
  };

  const getStatusText = (lease: Lease): string => {
    if (lease.status.ended) {
      return 'Ended';
    }
    if (lease.status.exporterRef) {
      return 'Active';
    }
    return 'Pending';
  };

  const formatDuration = (duration: string): string => {
    // Handle both ISO 8601 format (PT...H...M...S) and simple format (720h0m0s)
    let hours = 0, minutes = 0, seconds = 0;
    
    // Try ISO 8601 format first
    const isoMatch = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (isoMatch) {
      hours = parseInt(isoMatch[1] || '0');
      minutes = parseInt(isoMatch[2] || '0');
      seconds = parseInt(isoMatch[3] || '0');
    } else {
      // Try simple format (720h0m0s)
      const simpleMatch = duration.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
      if (simpleMatch) {
        hours = parseInt(simpleMatch[1] || '0');
        minutes = parseInt(simpleMatch[2] || '0');
        seconds = parseInt(simpleMatch[3] || '0');
      } else {
        return duration; // Return original if no pattern matches
      }
    }
    
    const parts = [];
    
    // Convert hours to days if >= 24 hours
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      parts.push(`${days}d`);
      if (remainingHours > 0) parts.push(`${remainingHours}h`);
    } else if (hours > 0) {
      parts.push(`${hours}h`);
    }
    
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0) parts.push(`${seconds}s`);
    
    return parts.join(' ') || '0s';
  };

  const formatDateTime = (dateTime?: string): string => {
    if (!dateTime) return 'N/A';
    return new Date(dateTime).toLocaleString();
  };

  const columns: TableColumn[] = [
    { key: 'name', title: 'Lease ID', sortable: true },
    { key: 'exporter', title: 'Exporter', sortable: true },
    { key: 'client', title: 'Client', sortable: true },
    { key: 'status', title: 'Status', sortable: true },
    { key: 'duration', title: 'Duration', sortable: true },
    { key: 'beginTime', title: 'Begin Time', sortable: true },
    { key: 'actions', title: 'Actions', sortable: false }
  ];

  const filteredLeases = useMemo(() => {
    return leases.filter(lease => {
      const matchesSearch = 
        lease.metadata.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        lease.spec.clientRef.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        (lease.status.exporterRef?.name || '').toLowerCase().includes(searchValue.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || getStatusText(lease) === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [leases, searchValue, statusFilter]);

  const sortedLeases = useMemo(() => {
    return [...filteredLeases].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case 'name':
          aValue = a.metadata.name;
          bValue = b.metadata.name;
          break;
        case 'exporter':
          aValue = a.status.exporterRef?.name || '';
          bValue = b.status.exporterRef?.name || '';
          break;
        case 'client':
          aValue = a.spec.clientRef.name;
          bValue = b.spec.clientRef.name;
          break;
        case 'status':
          aValue = getStatusText(a);
          bValue = getStatusText(b);
          break;
        case 'duration':
          aValue = a.spec.duration;
          bValue = b.spec.duration;
          break;
        case 'beginTime':
          aValue = a.status.beginTime || '';
          bValue = b.status.beginTime || '';
          break;
        default:
          return 0;
      }

      if (aValue === undefined || bValue === undefined) return 0;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === 'asc' 
        ? (aValue < bValue ? -1 : aValue > bValue ? 1 : 0)
        : (aValue > bValue ? -1 : aValue < bValue ? 1 : 0);
    });
  }, [filteredLeases, sortBy, sortDirection]);

  const handleSort = (columnKey: string): void => {
    if (columnKey === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnKey);
      setSortDirection('asc');
    }
  };

  const handleSearchChange = (event: React.SyntheticEvent, value: string): void => {
    setSearchValue(value);
  };

  const handleStatusFilterToggle = (): void => {
    setIsStatusDropdownOpen(!isStatusDropdownOpen);
  };

  const handleStatusFilterSelect = (event?: React.MouseEvent<Element, MouseEvent>, value?: string | number): void => {
    if (value) {
      setStatusFilter(value as string);
      setIsStatusDropdownOpen(false);
    }
  };

  const actionItems: ActionItem[] = [
    {
      key: 'shell',
      label: 'Jumpstarter Shell',
      onClick: () => console.log('Open shell for lease')
    },
    {
      key: 'release',
      label: 'Release',
      onClick: () => console.log('Release lease')
    },
    {
      key: 'extend',
      label: 'Extend',
      onClick: () => console.log('Extend lease')
    }
  ];

  const handleCreateLease = (leaseData: Omit<Lease, 'metadata'>) => {
    const newLease: Lease = {
      ...leaseData,
      metadata: {
        name: `lease-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        namespace: 'jumpstarter-lab',
        generation: 1,
        creationTimestamp: new Date().toISOString(),
        uid: `lease-uid-${Date.now()}`
      }
    };
    
    setLeases(prevLeases => [newLease, ...prevLeases]);
    console.log('Created new lease:', newLease);
  };


  return (
    <PageSection variant={PageSectionVariants.light}>
      <div style={{ marginBottom: '1rem' }}>
        <Title headingLevel="h1" size="2xl">Leases</Title>
        <TextContent>
          <Text component={TextVariants.p}>
            Manage and monitor lease assignments for your Jumpstarter resources.
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
                onSelect={handleStatusFilterSelect}
                toggle={(toggleRef) => (
                  <MenuToggle
                    ref={toggleRef}
                    onClick={handleStatusFilterToggle}
                    isExpanded={isStatusDropdownOpen}
                    icon={<FilterIcon />}
                  >
                    Status: {statusFilter}
                  </MenuToggle>
                )}
              >
                <DropdownList>
                  <DropdownItem value="All">All</DropdownItem>
                  <DropdownItem value="Active">Active</DropdownItem>
                  <DropdownItem value="Pending">Pending</DropdownItem>
                  <DropdownItem value="Ended">Ended</DropdownItem>
                </DropdownList>
              </Dropdown>
            </ToolbarFilter>
            <ToolbarItem>
              <SearchInput
                placeholder="Search by lease ID, exporter, or client..."
                value={searchValue}
                onChange={handleSearchChange}
                onClear={() => setSearchValue('')}
              />
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarItem>
              <Button 
                variant={ButtonVariant.primary} 
                icon={<PlusIcon />}
                onClick={onCreateLease}
              >
                Create Lease
              </Button>
            </ToolbarItem>
          </ToolbarGroup>
        </ToolbarContent>
      </Toolbar>

      <Table>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th
                key={column.key}
                sort={{
                  sortBy: { index: columns.findIndex(c => c.key === column.key), direction: sortDirection },
                  onSort: () => handleSort(column.key),
                  columnIndex: columns.findIndex(c => c.key === column.key)
                }}
                style={{ minWidth: column.key === 'actions' ? '80px' : undefined }}
              >
                {column.title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {sortedLeases.map((lease, index) => (
            <Tr key={lease.metadata.name}>
              <Td dataLabel="Lease ID">
                <Button 
                  variant={ButtonVariant.link} 
                  onClick={() => onLeaseSelect(lease)}
                  style={{ fontWeight: 'bold', padding: 0, textAlign: 'left' }}
                >
                  ...{lease.metadata.name.slice(-8)}
                </Button>
              </Td>
              <Td dataLabel="Exporter">
                {lease.status.exporterRef ? (
                  <Text component={TextVariants.a} href="#" style={{ fontWeight: 'bold' }}>
                    {lease.status.exporterRef.name}
                  </Text>
                ) : (
                  <Text component={TextVariants.p} style={{ color: 'var(--pf-global--Color--300)' }}>
                    Not assigned
                  </Text>
                )}
              </Td>
              <Td dataLabel="Client">
                {lease.spec.clientRef.name}
              </Td>
              <Td dataLabel="Status">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {getStatusIcon(lease)}
                  <Badge isRead={getStatusText(lease) === 'Active'}>
                    {getStatusText(lease)}
                  </Badge>
                </div>
              </Td>
              <Td dataLabel="Duration">
                {formatDuration(lease.spec.duration)}
              </Td>
              <Td dataLabel="Begin Time">
                {formatDateTime(lease.status.beginTime)}
              </Td>
              <Td isActionCell>
                <Dropdown
                  isOpen={openDropdownId === lease.metadata.name}
                  onOpenChange={(isOpen) => setOpenDropdownId(isOpen ? lease.metadata.name : null)}
                  onSelect={() => setOpenDropdownId(null)}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      variant="plain"
                      onClick={() => setOpenDropdownId(openDropdownId === lease.metadata.name ? null : lease.metadata.name)}
                      isExpanded={openDropdownId === lease.metadata.name}
                    >
                      <EllipsisVIcon />
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                    {actionItems.map((item) => (
                      <DropdownItem
                        key={item.key}
                        onClick={() => {
                          item.onClick();
                          setOpenDropdownId(null);
                        }}
                      >
                        {item.label}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                </Dropdown>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

    </PageSection>
  );
};

export default LeasesPage;