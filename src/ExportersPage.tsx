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

interface ExportersPageProps {
  onExporterSelect: (exporter: Exporter) => void;
}

// Mock data based on the provided JSON
const mockExporters: Exporter[] = [
  {
    name: "nxp-imx8qxp-mek-eballetbo-01",
    namespace: "jumpstarter-lab",
    status: "Available",
    lease: "None",
    labels: {
      board: "nxp-imx8qxp-mek",
      emmc: "false",
      location: "eballetbo-desk",
      cpu: "4",
      sd: "true",
      device: "nxp-imx8qxp-mek-eballetbo-01",
      ram: "3"
    }
  },
  {
    name: "nxp-s32g-vnp-rdb3-eballetbo-01",
    namespace: "jumpstarter-lab",
    status: "Available",
    lease: "None",
    labels: {
      board: "nxp-s32g-vnp-rdb3",
      emmc: "false",
      location: "eballetbo-desk",
      device: "nxp-s32g-vnp-rdb3-eballetbo-01",
      sd: "true",
      cpu: "8",
      ram: "32"
    }
  },
  {
    name: "qti-snapdragon-ride4-sa8775p-03",
    namespace: "jumpstarter-lab",
    status: "Leased",
    lease: "user-123",
    labels: {
      emmc: "false",
      "board-type": "qc8775",
      location: "bos2",
      cpu: "8",
      device: "qti-snapdragon-ride4-sa8775p-03",
      enabled: "true",
      sd: "true",
      ram: "32"
    }
  },
  {
    name: "qti-snapdragon-ride4-sa8775p-10",
    namespace: "jumpstarter-lab",
    status: "Available",
    lease: "None",
    labels: {
      emmc: "false",
      "board-type": "qc8775",
      location: "bos2",
      cpu: "8",
      device: "qti-snapdragon-ride4-sa8775p-10",
      enabled: "true",
      sd: "true",
      ram: "32"
    }
  },
  {
    name: "renesas-rcar-s4-01",
    namespace: "jumpstarter-lab",
    status: "Available",
    lease: "None",
    labels: {
      emmc: "true",
      "board-type": "renesas-rcar-s4",
      location: "bos2",
      cpu: "8",
      device: "renesas-rcar-s4-01",
      enabled: "true",
      sd: "false",
      ram: "4"
    }
  },
  {
    name: "ti-jacinto-j784s4xevm-01",
    namespace: "jumpstarter-lab",
    status: "Maintenance",
    lease: "None",
    labels: {
      emmc: "true",
      location: "bos2",
      "board-type": "j784s4evm",
      cpu: "8",
      device: "ti-jacinto-j784s4xevm-01",
      enabled: "true",
      sd: "true",
      ram: "32"
    }
  }
];

const ExportersPage: React.FC<ExportersPageProps> = ({ onExporterSelect }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const statusOptions: string[] = ['All', 'Available', 'Leased', 'Maintenance', 'Error'];

  const getStatusIcon = (status: Exporter['status']): React.ReactElement | null => {
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

  const getStatusBadgeVariant = (status: Exporter['status']): 'success' | 'info' | 'warning' | 'danger' | 'default' => {
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
    return mockExporters.filter(exporter => {
      const matchesSearch = exporter.name.toLowerCase().includes(searchValue.toLowerCase());
      const matchesStatus = statusFilter === 'All' || exporter.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchValue, statusFilter]);

  const sortedExporters = useMemo(() => {
    return [...filteredExporters].sort((a, b) => {
      const aValue = a[sortBy as keyof Exporter];
      const bValue = b[sortBy as keyof Exporter];
      
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
      onClick: () => console.log(`Lease action for ${row.name}`)
    },
    { 
      key: 'shell', 
      label: 'Shell',
      onClick: () => console.log(`Shell action for ${row.name}`)
    },
    { 
      key: 'release', 
      label: 'Release',
      onClick: () => console.log(`Release action for ${row.name}`)
    },
    { 
      key: 'edit', 
      label: 'Edit',
      onClick: () => console.log(`Edit action for ${row.name}`)
    },
    { 
      key: 'delete', 
      label: 'Delete', 
      onClick: () => console.log(`Delete action for ${row.name}`)
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
            <Tr key={exporter.name}>
              <Td dataLabel="Name">
                <Button 
                  variant={ButtonVariant.link} 
                  onClick={() => onExporterSelect(exporter)}
                  style={{ fontWeight: 'bold', padding: 0, textAlign: 'left' }}
                >
                  {exporter.name}
                </Button>
              </Td>
              <Td dataLabel="Status">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {getStatusIcon(exporter.status)}
                  <Badge isRead={exporter.status === 'Available'}>
                    {exporter.status}
                  </Badge>
                </div>
              </Td>
              <Td dataLabel="Lease">
                {exporter.lease === 'None' ? (
                  <Text component={TextVariants.small} style={{ color: 'var(--pf-global--Color--300)' }}>
                    {exporter.lease}
                  </Text>
                ) : (
                  <Badge>{exporter.lease}</Badge>
                )}
              </Td>
              <Td dataLabel="Labels">
                {renderLabels(exporter.labels)}
              </Td>
              <Td isActionCell>
                <Dropdown
                  isOpen={openDropdownId === exporter.name}
                  onOpenChange={(isOpen) => setOpenDropdownId(isOpen ? exporter.name : null)}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      variant="plain"
                      onClick={() => setOpenDropdownId(openDropdownId === exporter.name ? null : exporter.name)}
                      isExpanded={openDropdownId === exporter.name}
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
