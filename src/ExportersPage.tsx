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
  TimesCircleIcon
} from '@patternfly/react-icons';
import { Exporter, ActionItem, TableColumn, SortDirection } from './types';
import { getExporters } from './dataStore';

interface ExportersPageProps {
  onExporterSelect: (exporter: Exporter) => void;
  onLeaseSelect: (leaseId: string) => void;
}


const ExportersPage: React.FC<ExportersPageProps> = ({ onExporterSelect, onLeaseSelect }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const statusOptions: string[] = ['All', 'Available', 'Leased', 'Maintenance', 'Error'];

  const getExporterStatus = (exporter: Exporter): 'Available' | 'Leased' | 'Maintenance' | 'Error' => {
    // Check if exporter has a lease
    if (exporter.status.leaseRef?.name) {
      return 'Leased';
    }
    
    // Check conditions for status
    const readyCondition = exporter.status.conditions?.find(c => c.type === 'Ready');
    if (readyCondition?.status === 'False') {
      if (readyCondition.reason === 'MaintenanceMode') {
        return 'Maintenance';
      }
      return 'Error';
    }
    
    return 'Available';
  };

  const getStatusIcon = (exporter: Exporter): React.ReactElement | null => {
    const status = getExporterStatus(exporter);
    switch (status) {
      case 'Available':
        return <CheckCircleIcon style={{ color: 'var(--pf-global--success-color--100)' }} />;
      case 'Leased':
        return <CheckCircleIcon style={{ color: 'var(--pf-global--info-color--100)' }} />;
      case 'Maintenance':
        return <ExclamationTriangleIcon style={{ color: 'var(--pf-global--warning-color--100)' }} />;
      case 'Error':
        return <TimesCircleIcon style={{ color: 'var(--pf-global--danger-color--100)' }} />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (exporter: Exporter): 'success' | 'info' | 'warning' | 'danger' | 'default' => {
    const status = getExporterStatus(exporter);
    switch (status) {
      case 'Available':
        return 'success';
      case 'Leased':
        return 'info';
      case 'Maintenance':
        return 'warning';
      case 'Error':
        return 'danger';
      default:
        return 'default';
    }
  };

  const filteredExporters = useMemo(() => {
    return getExporters().filter(exporter => {
      const matchesSearch = 
        exporter.metadata.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        exporter.metadata.namespace.toLowerCase().includes(searchValue.toLowerCase()) ||
        (exporter.status.leaseRef?.name || '').toLowerCase().includes(searchValue.toLowerCase());
      
      const exporterStatus = getExporterStatus(exporter);
      const matchesStatus = statusFilter === 'All' || exporterStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchValue, statusFilter]);

  const sortedExporters = useMemo(() => {
    return [...filteredExporters].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case 'name':
          aValue = a.metadata.name;
          bValue = b.metadata.name;
          break;
        case 'status':
          aValue = getExporterStatus(a);
          bValue = getExporterStatus(b);
          break;
        case 'lease':
          aValue = a.status.leaseRef?.name || 'None';
          bValue = b.status.leaseRef?.name || 'None';
          break;
        default:
          aValue = a.metadata.name;
          bValue = b.metadata.name;
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [filteredExporters, sortBy, sortDirection]);

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

  const renderLabels = (labels: Record<string, string>): React.ReactElement => {
    const labelEntries = Object.entries(labels).slice(0, 3); // Show first 3 labels
    const remainingCount = Object.keys(labels).length - 3;
    
    return (
      <LabelGroup>
        {labelEntries.map(([key, value]) => (
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

  const actionItems = (row: Exporter): ActionItem[] => [
    { 
      key: 'lease', 
      label: 'Lease',
      onClick: () => console.log(`Lease action for ${row.metadata.name}`)
    },
    { 
      key: 'release', 
      label: 'Release',
      onClick: () => console.log(`Release action for ${row.metadata.name}`)
    },
    { 
      key: 'edit', 
      label: 'Edit',
      onClick: () => console.log(`Edit action for ${row.metadata.name}`)
    },
    { 
      key: 'delete', 
      label: 'Delete', 
      onClick: () => console.log(`Delete action for ${row.metadata.name}`)
    }
  ];

  const columns: TableColumn[] = [
    {
      key: 'name',
      title: 'Name',
      sortable: true
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true
    },
    {
      key: 'lease',
      title: 'Lease',
      sortable: true
    },
    {
      key: 'labels',
      title: 'Labels',
      sortable: false
    }
  ];

  return (
    <PageSection variant={PageSectionVariants.light}>
      <div style={{ marginBottom: '1rem' }}>
        <Title headingLevel="h1" size="2xl">Exporters</Title>
        <TextContent>
          <Text component={TextVariants.p}>
            Manage and configure exporters for your OpenShift cluster.
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
                placeholder="Search by name..."
                value={searchValue}
                onChange={(event, value) => setSearchValue(value as string)}
                onClear={() => setSearchValue('')}
              />
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarItem>
            <Button variant={ButtonVariant.primary}>
              <PlusIcon /> Create Exporter
            </Button>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      <Table aria-label="Exporters table">
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
          {sortedExporters.map((exporter, index) => (
            <Tr key={exporter.metadata.name}>
              <Td dataLabel="Name">
                <Button 
                  variant={ButtonVariant.link} 
                  onClick={() => onExporterSelect(exporter)}
                  style={{ fontWeight: 'bold', padding: 0, textAlign: 'left' }}
                >
                  {exporter.metadata.name}
                </Button>
              </Td>
              <Td dataLabel="Status">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {getStatusIcon(exporter)}
                  <Badge isRead={getExporterStatus(exporter) === 'Available'}>
                    {getExporterStatus(exporter)}
                  </Badge>
                </div>
              </Td>
              <Td dataLabel="Lease">
                {exporter.status.leaseRef?.name ? (
                  <Button 
                    variant={ButtonVariant.link} 
                    onClick={() => onLeaseSelect(exporter.status.leaseRef!.name)}
                    style={{ 
                      color: 'var(--pf-global--Color--300)', 
                      padding: 0, 
                      textAlign: 'left',
                      fontSize: 'var(--pf-global--FontSize--sm)'
                    }}
                  >
                    {exporter.status.leaseRef.name}
                  </Button>
                ) : (
                  <Badge>None</Badge>
                )}
              </Td>
              <Td dataLabel="Labels">
                {renderLabels(exporter.status.devices?.[0]?.labels || {})}
              </Td>
              <Td isActionCell>
                <Dropdown
                  isOpen={openDropdownId === exporter.metadata.name}
                  onOpenChange={(isOpen) => setOpenDropdownId(isOpen ? exporter.metadata.name : null)}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      variant="plain"
                      onClick={() => setOpenDropdownId(openDropdownId === exporter.metadata.name ? null : exporter.metadata.name)}
                      isExpanded={openDropdownId === exporter.metadata.name}
                    >
                      <EllipsisVIcon />
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                    {actionItems(exporter).map((action) => (
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

      {sortedExporters.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Text component={TextVariants.p} style={{ color: 'var(--pf-global--Color--300)' }}>
            No exporters found matching your criteria.
          </Text>
        </div>
      )}
    </PageSection>
  );
};

export default ExportersPage;
