import React, { useState } from 'react';
import {
  PageSection,
  PageSectionVariants,
  Title,
  Card,
  CardBody,
  Form,
  FormGroup,
  TextInput,
  TextArea,
  Button,
  Alert,
  Grid,
  GridItem,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  Stack,
  StackItem,
  ExpandableSection,
  Switch,
  ActionGroup,
  Text,
  TextContent,
  TextVariants,
  Checkbox,
  Radio,
  NumberInput,
  FileUpload,
  Split,
  SplitItem,
  Flex,
  FlexItem,
  Badge,
  Popover
} from '@patternfly/react-core';
import { ArrowLeftIcon, PlusCircleIcon, TrashIcon, InfoCircleIcon } from '@patternfly/react-icons';
import { Build } from './types';
import { addBuild } from './dataStore';

interface CreateBuildPageProps {
  onBack: () => void;
  onCreateBuild: (build: Build) => void;
}

interface TextFile {
  id: string;
  name: string;
  content: string;
}

interface UploadedFile {
  id: string;
  name: string;
  file: File;
}

interface RegistryCredentials {
  enabled: boolean;
  authType: 'username-password' | 'token' | 'docker-config';
  registryUrl: string;
  username: string;
  password: string;
  token: string;
  dockerConfig: string;
}

interface BuildFormData {
  name: string;
  manifest: string;
  manifestFileName: string;
  distro: string;
  target: string;
  architecture: string;
  exportFormat: string;
  mode: string;
  automotiveImageBuilder: string;
  aibExtraArgs: string;
  aibOverrideArgs: string;
  serveArtifact: boolean;
  compression?: string;
  registryCredentials: RegistryCredentials;
}

const PopoverLabel: React.FC<{ label: string; popoverContent: string; isRequired?: boolean }> = ({ label, popoverContent, isRequired }) => (
  <span>
    {label}
    {isRequired && <span style={{ color: "var(--pf-v5-global--danger-color--100)" }}> *</span>}
    <Popover
      aria-label={`${label} information`}
      bodyContent={popoverContent}
    >
      <button
        type="button"
        aria-label={`More info for ${label}`}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--pf-v5-global--Color--200)',
          marginLeft: '4px',
          cursor: 'pointer',
          fontSize: '0.875rem'
        }}
      >
        <InfoCircleIcon />
      </button>
    </Popover>
  </span>
);

const CreateBuildPage: React.FC<CreateBuildPageProps> = ({ onBack, onCreateBuild }) => {
  const [formData, setFormData] = useState<BuildFormData>({
    name: '',
    manifest: '',
    manifestFileName: 'manifest.aib.yml',
    distro: '',
    target: '',
    architecture: '',
    exportFormat: '',
    mode: '',
    automotiveImageBuilder: 'quay.io/centos-sig-automotive/automotive-image-builder:1.0.0',
    aibExtraArgs: '',
    aibOverrideArgs: '',
    serveArtifact: false,
    compression: 'gzip',
    registryCredentials: {
      enabled: false,
      authType: 'username-password',
      registryUrl: '',
      username: '',
      password: '',
      token: '',
      dockerConfig: ''
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);
  const [isDistroOpen, setIsDistroOpen] = useState(false);
  const [isTargetOpen, setIsTargetOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isOutputFormatOpen, setIsOutputFormatOpen] = useState(false);
  const [isModeOpen, setIsModeOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [useWizard, setUseWizard] = useState(false);
  const [textFiles, setTextFiles] = useState<TextFile[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const DISTRO_OPTIONS = [
    { value: 'autosd', label: 'autosd - Alias of \'autosd9\'' },
    { value: 'autosd10', label: 'autosd10 - AutoSD 9 - based on nightly autosd compose' },
    { value: 'autosd10-latest-sig', label: 'autosd10-latest-sig - AutoSD 10 - latest cs10 and autosd repos, plus the automotive sig community packages' },
    { value: 'autosd10-sig', label: 'autosd10-sig - AutoSD 9 - based on nightly autosd compose, plus the automotive sig community packages' },
    { value: 'autosd9', label: 'autosd9 - AutoSD 9 - based on nightly autosd compose' },
    { value: 'autosd9-latest-sig', label: 'autosd9-latest-sig - AutoSD 9 - latest cs9 and autosd repos, plus the automotive sig community packages' },
    { value: 'autosd9-sig', label: 'autosd9-sig - AutoSD 9 - based on nightly autosd compose, plus the automotive sig community packages' },
    { value: 'cs9', label: 'cs9 - Alias of \'autosd9-latest-sig\'' },
    { value: 'eln', label: 'eln - Fedora ELN' },
    { value: 'f40', label: 'f40 - Fedora 40' },
    { value: 'f41', label: 'f41 - Fedora 41' },
    { value: 'rhivos', label: 'rhivos - Alias of \'rhivos1\'' },
    { value: 'rhivos1', label: 'rhivos1 - RHIVOS 1' }
  ];

  const TARGET_OPTIONS = [
    // Virtualization targets
    { value: 'qemu', label: 'QEMU - General virtualized images' },
    { value: 'pc', label: 'PC - Standard PC hardware' },
    { value: 'aws', label: 'AWS - Amazon Web Services' },
    { value: 'azure', label: 'Azure - Microsoft Azure' },
    
    // Raspberry Pi targets
    { value: 'rpi4', label: 'Raspberry Pi 4' },
    
    // Qualcomm targets
    { value: 'ridesx4', label: 'RIDESX4 - QC RIDESX4 board' },
    { value: 'ridesx4_r3', label: 'RIDESX4 R3 - QC RIDESX4 board Rev 3' },
    { value: 'ridesx4_scmi', label: 'RIDESX4 SCMI - QC RIDESX4 with SCMI firmware' },
    
    // NXP targets
    { value: 's32g_vnp_rdb3', label: 'S32G VNP RDB3 - NXP S32G3 Vehicle Networking Reference Design Board' },
    { value: 'imx8qxp_mek', label: 'i.MX 8QXP MEK - Multisensory Enablement Kit i.MX 8QuadXPlus MEK CPU Board' },
    { value: 'ccimx93dvk', label: 'CCIMX93DVK - NXP i.MX 93 Development Kit' },
    
    // Texas Instruments targets
    { value: 'tda4vm_sk', label: 'TDA4VM SK - TI SK-TDA4VM Evaluation Board' },
    { value: 'am62sk', label: 'AM62SK - TI SK-AM62 Evaluation Board' },
    { value: 'am69sk', label: 'AM69SK - TI SK-AM69 Evaluation Board' },
    { value: 'j784s4evm', label: 'J784S4EVM - TI J784S4XEVM Evaluation Board' },
    
    // Renesas targets
    { value: 'rcar_s4', label: 'RCAR S4 - Renesas R-Car S4' },
    { value: 'rcar_s4_can', label: 'RCAR S4 CAN - Renesas R-Car S4 with CAN bus enablement' },
    
    // Other targets
    { value: 'beagleplay', label: 'BeaglePlay - TI BeaglePlay Board' },
    { value: 'qdrive3', label: 'QDrive3 - QDrive3 target' },
    { value: 'acrn', label: 'ACRN - ACRN hypervisor' },
    
    // Android Boot targets
    { value: 'abootqemu', label: 'AbootQEMU - QEMU with Android boot partition' },
    { value: 'abootqemukvm', label: 'AbootQEMUKVM - QEMU with Android boot and KVM' }
  ];

  const BUILD_MODE_OPTIONS = [
    { value: 'image', label: 'image' },
    { value: 'package', label: 'package' }
  ];

  const ARCHITECTURE_OPTIONS = [
    { value: 'arm64', label: 'arm64 (aarch64)' },
    { value: 'amd64', label: 'amd64 (x86_64)' }
  ];

  const OUTPUT_FORMAT_OPTIONS = [
    { value: 'qcow2', label: 'qcow2 - Disk image in qcow2 format' },
    { value: 'ext4', label: 'ext4 - Ext4 filesystem image without partitions' },
    { value: 'ext4.simg', label: 'ext4.simg - Ext4 filesystem partition in simg format' },
    { value: 'tar', label: 'tar - Tar archive with files from rootfs' },
    { value: 'container', label: 'container - Container image' },
    { value: 'image', label: 'image - Raw disk image' },
    { value: 'aboot', label: 'aboot - Aboot image' },
    { value: 'aboot.simg', label: 'aboot.simg - Aboot image in simg format' },
    { value: 'bootc', label: 'bootc - Bootc image in local store' },
    { value: 'bootc-archive', label: 'bootc-archive - Bootc OCI image archive' },
    { value: 'ostree-commit', label: 'ostree-commit - OSTree repo containing a commit' },
    { value: 'rpmlist', label: 'rpmlist - List of rpms that are in the image' },
    { value: 'simg', label: 'simg - Partitioned image in simg format' },
    { value: 'rootfs', label: 'rootfs - Directory with image rootfs files' }
  ];

  const handleInputChange = (field: keyof BuildFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegistryCredentialsChange = (field: keyof RegistryCredentials, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      registryCredentials: {
        ...prev.registryCredentials,
        [field]: value
      }
    }));
  };

  const addTextFile = () => {
    const newFile: TextFile = {
      id: Date.now().toString(),
      name: '',
      content: ''
    };
    setTextFiles(prev => [...prev, newFile]);
  };

  const updateTextFile = (id: string, field: 'name' | 'content', value: string) => {
    setTextFiles(prev => prev.map(file => 
      file.id === id ? { ...file, [field]: value } : file
    ));
  };

  const removeTextFile = (id: string) => {
    setTextFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleFileUpload = (file: File) => {
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: file.name,
      file: file
    };
    setUploadedFiles(prev => [...prev, newFile]);
  };

  const removeUploadedFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setAlert(null);

    try {
      // Create a basic manifest if using wizard mode
      let manifest = formData.manifest;
      if (useWizard) {
        manifest = `version: '2'
mpp-vars:
  use_autoinit: true
  static_ip_iface: "enp0s2"
  static_ip_modules:
    - "virtio_net"
  consoles:
    mpp-if: arch == 'aarch64'
    then: "ttyAMA0 tty0"
    else: "ttyS0 tty0"
  dracut_drivers:
    mpp-join:
      - mpp-eval: dracut_drivers
      - - "nvme"
        - "nvme_common"
        - "nvme_core"
        - "virtio_blk"
        - "virtio_mmio"
        - "sd_mod"
        - "ahci"
  kernel_opts:
    mpp-join:
      - mpp-eval: kernel_opts
      - - mpp-if: is_autoinit_supported and use_autoinit
          then: rd.modules-load=nvme,virtio_mmio`;
      }

      // Create build object
      const newBuild: Build = {
        apiVersion: "aib.dev/v1alpha1",
        kind: "Build",
        metadata: {
          name: formData.name,
          namespace: "jumpstarter-lab",
          labels: {
            "app": "automotive-image-builder",
            "distro": formData.distro,
            "target": formData.target,
            "architecture": formData.architecture
          },
          annotations: {
            "description": `Build for ${formData.target} on ${formData.distro}`
          },
          resourceVersion: Date.now().toString(),
          generation: 1,
          creationTimestamp: new Date().toISOString(),
          uid: `build-${Date.now()}-uid`
        },
        spec: {
          description: `Build for ${formData.target} on ${formData.distro}`,
          baseImage: formData.automotiveImageBuilder,
          targetArchitecture: formData.architecture,
          buildSteps: [
            {
              name: "prepare-environment",
              command: "setup-build-env",
              args: ["--distro", formData.distro, "--arch", formData.architecture]
            },
            {
              name: "build-image",
              command: "build-image",
              args: ["--target", formData.target, "--format", formData.exportFormat]
            }
          ],
          environment: {
            "BUILD_TYPE": "automotive",
            "TARGET_PLATFORM": formData.target,
            "DISTRO_VERSION": formData.distro,
            "EXPORT_FORMAT": formData.exportFormat
          },
          outputFormat: formData.exportFormat as any,
          registry: formData.registryCredentials.enabled ? {
            url: formData.registryCredentials.registryUrl,
            namespace: "builds"
          } : undefined
        },
        status: {
          phase: "pending",
          conditions: [
            {
              type: "BuildCreated",
              status: "True",
              lastTransitionTime: new Date().toISOString(),
              reason: "BuildQueued",
              message: "Build queued for processing"
            }
          ],
          buildLogs: "Build queued for processing...",
          errorMessage: undefined
        }
      };

      addBuild(newBuild);
      onCreateBuild(newBuild);
      setAlert({ type: 'success', message: 'Build created successfully!' });
      
      // Reset form
      setFormData({
        name: '',
        manifest: '',
        manifestFileName: 'manifest.aib.yml',
        distro: '',
        target: '',
        architecture: '',
        exportFormat: '',
        mode: '',
        automotiveImageBuilder: 'quay.io/centos-sig-automotive/automotive-image-builder:1.0.0',
        aibExtraArgs: '',
        aibOverrideArgs: '',
        serveArtifact: false,
        compression: 'gzip',
        registryCredentials: {
          enabled: false,
          authType: 'username-password',
          registryUrl: '',
          username: '',
          password: '',
          token: '',
          dockerConfig: ''
        }
      });
      setTextFiles([]);
      setUploadedFiles([]);
    } catch (error) {
      setAlert({ type: 'danger', message: 'Failed to create build. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Stack hasGutter>
        <StackItem>
          <Card>
            <CardBody>
              <Stack hasGutter>
                <StackItem>
                  <Flex alignItems={{ default: "alignItemsCenter" }}>
                    <FlexItem>
                      <Button
                        variant="plain"
                        onClick={onBack}
                        icon={<ArrowLeftIcon />}
                        style={{ marginRight: '8px' }}
                      >
                        Back to Builds
                      </Button>
                    </FlexItem>
                    <FlexItem>
                      <Title headingLevel="h1" size="2xl">
                        Create New Build
                      </Title>
                    </FlexItem>
                  </Flex>
                </StackItem>
                <StackItem>
                  <TextContent>
                    <Text component={TextVariants.p}>
                      Create a new automotive image build with custom configuration and target platform.
                    </Text>
                  </TextContent>
                </StackItem>
              </Stack>
            </CardBody>
          </Card>
        </StackItem>

        {alert && (
          <StackItem>
            <Alert
              variant={alert.type}
              title={alert.message}
              isInline
            />
          </StackItem>
        )}

        <StackItem>
          <Form onSubmit={handleSubmit}>
            <Stack hasGutter>
              {/* Basic Configuration */}
              <StackItem>
                <Card>
                  <CardBody>
                    <Stack hasGutter>
                      <StackItem>
                        <Title headingLevel="h2" size="lg">
                          Basic Configuration
                        </Title>
                      </StackItem>
                      <StackItem>
                        <Grid hasGutter>
                          <GridItem span={6}>
                            <FormGroup
                              label={<PopoverLabel label="Build Name" popoverContent="A unique identifier for your build" isRequired />}
                              fieldId="name"
                            >
                              <TextInput
                                id="name"
                                value={formData.name}
                                onChange={(_event, value) => handleInputChange("name", value)}
                                placeholder="Enter a unique name for this build"
                                isRequired
                              />
                            </FormGroup>
                          </GridItem>
                          <GridItem span={6}>
                            <FormGroup
                              label={<PopoverLabel label="Manifest File Name" popoverContent="Name of the manifest file" />}
                              fieldId="manifestFileName"
                            >
                              <TextInput
                                id="manifestFileName"
                                value={formData.manifestFileName}
                                onChange={(_event, value) => handleInputChange("manifestFileName", value)}
                                placeholder="manifest.aib.yml"
                              />
                            </FormGroup>
                          </GridItem>
                          <GridItem span={12}>
                            <FormGroup
                              label={<PopoverLabel label="Manifest Content" popoverContent="YAML configuration that defines your build requirements" isRequired />}
                              fieldId="manifest"
                            >
                              <Stack hasGutter>
                                <StackItem>
                                  <Flex alignItems={{ default: "alignItemsCenter" }}>
                                    <FlexItem>
                                      <Switch
                                        id="wizard-toggle"
                                        label={useWizard ? "Wizard" : "YAML"}
                                        isChecked={useWizard}
                                        onChange={(_event, checked) => setUseWizard(checked as boolean)}
                                      />
                                    </FlexItem>
                                  </Flex>
                                </StackItem>
                                {!useWizard && (
                                  <StackItem>
                                    <TextArea
                                      id="manifest"
                                      value={formData.manifest}
                                      onChange={(_event, value) => handleInputChange("manifest", value)}
                                      placeholder="Enter your YAML manifest content here..."
                                      rows={12}
                                      isRequired
                                    />
                                  </StackItem>
                                )}
                              </Stack>
                            </FormGroup>
                          </GridItem>
                        </Grid>
                      </StackItem>
                    </Stack>
                  </CardBody>
                </Card>
              </StackItem>

              {/* Build Parameters */}
              <StackItem>
                <Card>
                  <CardBody>
                    <Stack hasGutter>
                      <StackItem>
                        <Title headingLevel="h2" size="lg">
                          Build Parameters
                        </Title>
                      </StackItem>
                      <StackItem>
                        <Grid hasGutter>
                          <GridItem span={6}>
                            <FormGroup
                              label={<PopoverLabel label="Distribution" popoverContent="Base distribution for the build" isRequired />}
                              fieldId="distro"
                            >
                              <Dropdown
                                isOpen={isDistroOpen}
                                onOpenChange={setIsDistroOpen}
                                toggle={(toggleRef) => (
                                  <MenuToggle
                                    ref={toggleRef}
                                    onClick={() => setIsDistroOpen(!isDistroOpen)}
                                    isExpanded={isDistroOpen}
                                    style={{ width: '100%' }}
                                  >
                                    {formData.distro || 'Select a distribution...'}
                                  </MenuToggle>
                                )}
                              >
                                <DropdownList>
                                  {DISTRO_OPTIONS.map((option) => (
                                    <DropdownItem
                                      key={option.value}
                                      onClick={() => {
                                        handleInputChange("distro", option.value);
                                        setIsDistroOpen(false);
                                      }}
                                    >
                                      {option.label}
                                    </DropdownItem>
                                  ))}
                                </DropdownList>
                              </Dropdown>
                            </FormGroup>
                          </GridItem>
                          <GridItem span={6}>
                            <FormGroup
                              label={<PopoverLabel label="Target Platform" popoverContent="Target hardware platform" isRequired />}
                              fieldId="target"
                            >
                              <Dropdown
                                isOpen={isTargetOpen}
                                onOpenChange={setIsTargetOpen}
                                toggle={(toggleRef) => (
                                  <MenuToggle
                                    ref={toggleRef}
                                    onClick={() => setIsTargetOpen(!isTargetOpen)}
                                    isExpanded={isTargetOpen}
                                    style={{ width: '100%' }}
                                  >
                                    {formData.target || 'Select a target platform...'}
                                  </MenuToggle>
                                )}
                              >
                                <DropdownList>
                                  {TARGET_OPTIONS.map((option) => (
                                    <DropdownItem
                                      key={option.value}
                                      onClick={() => {
                                        handleInputChange("target", option.value);
                                        setIsTargetOpen(false);
                                      }}
                                    >
                                      {option.label}
                                    </DropdownItem>
                                  ))}
                                </DropdownList>
                              </Dropdown>
                            </FormGroup>
                          </GridItem>
                          <GridItem span={6}>
                            <FormGroup
                              label={<PopoverLabel label="Architecture" popoverContent="CPU architecture" isRequired />}
                              fieldId="architecture"
                            >
                              <Dropdown
                                isOpen={isArchitectureOpen}
                                onOpenChange={setIsArchitectureOpen}
                                toggle={(toggleRef) => (
                                  <MenuToggle
                                    ref={toggleRef}
                                    onClick={() => setIsArchitectureOpen(!isArchitectureOpen)}
                                    isExpanded={isArchitectureOpen}
                                    style={{ width: '100%' }}
                                  >
                                    {formData.architecture || 'Select an architecture...'}
                                  </MenuToggle>
                                )}
                              >
                                <DropdownList>
                                  {ARCHITECTURE_OPTIONS.map((option) => (
                                    <DropdownItem
                                      key={option.value}
                                      onClick={() => {
                                        handleInputChange("architecture", option.value);
                                        setIsArchitectureOpen(false);
                                      }}
                                    >
                                      {option.label}
                                    </DropdownItem>
                                  ))}
                                </DropdownList>
                              </Dropdown>
                            </FormGroup>
                          </GridItem>
                          <GridItem span={6}>
                            <FormGroup
                              label={<PopoverLabel label="Export Format" popoverContent="Output format for the build" />}
                              fieldId="exportFormat"
                            >
                              <Dropdown
                                isOpen={isOutputFormatOpen}
                                onOpenChange={setIsOutputFormatOpen}
                                toggle={(toggleRef) => (
                                  <MenuToggle
                                    ref={toggleRef}
                                    onClick={() => setIsOutputFormatOpen(!isOutputFormatOpen)}
                                    isExpanded={isOutputFormatOpen}
                                    style={{ width: '100%' }}
                                  >
                                    {formData.exportFormat || 'Select an export format...'}
                                  </MenuToggle>
                                )}
                              >
                                <DropdownList>
                                  {OUTPUT_FORMAT_OPTIONS.map((option) => (
                                    <DropdownItem
                                      key={option.value}
                                      onClick={() => {
                                        handleInputChange("exportFormat", option.value);
                                        setIsOutputFormatOpen(false);
                                      }}
                                    >
                                      {option.label}
                                    </DropdownItem>
                                  ))}
                                </DropdownList>
                              </Dropdown>
                            </FormGroup>
                          </GridItem>
                          <GridItem span={6}>
                            <FormGroup
                              label={<PopoverLabel label="Build Mode" popoverContent="Build mode (image, package)" />}
                              fieldId="mode"
                            >
                              <Dropdown
                                isOpen={isModeOpen}
                                onOpenChange={setIsModeOpen}
                                toggle={(toggleRef) => (
                                  <MenuToggle
                                    ref={toggleRef}
                                    onClick={() => setIsModeOpen(!isModeOpen)}
                                    isExpanded={isModeOpen}
                                    style={{ width: '100%' }}
                                  >
                                    {formData.mode || 'Select a build mode...'}
                                  </MenuToggle>
                                )}
                              >
                                <DropdownList>
                                  {BUILD_MODE_OPTIONS.map((option) => (
                                    <DropdownItem
                                      key={option.value}
                                      onClick={() => {
                                        handleInputChange("mode", option.value);
                                        setIsModeOpen(false);
                                      }}
                                    >
                                      {option.label}
                                    </DropdownItem>
                                  ))}
                                </DropdownList>
                              </Dropdown>
                            </FormGroup>
                          </GridItem>
                          <GridItem span={6}>
                            <FormGroup
                              label={<PopoverLabel label="Automotive Image Builder" popoverContent="Container image used for building" />}
                              fieldId="automotiveImageBuilder"
                            >
                              <TextInput
                                id="automotiveImageBuilder"
                                value={formData.automotiveImageBuilder}
                                onChange={(_event, value) => handleInputChange("automotiveImageBuilder", value)}
                                placeholder="quay.io/centos-sig-automotive/automotive-image-builder:1.0.0"
                              />
                            </FormGroup>
                          </GridItem>
                        </Grid>
                      </StackItem>
                    </Stack>
                  </CardBody>
                </Card>
              </StackItem>

              {/* Advanced Options */}
              <StackItem>
                <Card>
                  <CardBody>
                    <Stack hasGutter>
                      <StackItem>
                        <ExpandableSection
                          toggleText="Advanced Build Options"
                          isExpanded={isAdvancedOpen}
                          onToggle={(_event, expanded) => setIsAdvancedOpen(expanded as boolean)}
                        >
                          <Grid hasGutter style={{ paddingTop: "16px" }}>
                            <GridItem span={6}>
                              <FormGroup
                                label={<PopoverLabel label="AIB Extra Arguments" popoverContent="Additional arguments for automotive-image-builder" />}
                                fieldId="aibExtraArgs"
                              >
                                <TextInput
                                  id="aibExtraArgs"
                                  value={formData.aibExtraArgs}
                                  onChange={(_event, value) => handleInputChange("aibExtraArgs", value)}
                                  placeholder="--fusa, --define"
                                />
                              </FormGroup>
                            </GridItem>
                            <GridItem span={6}>
                              <FormGroup
                                label={<PopoverLabel label="AIB Override Arguments" popoverContent="Complete override of AIB arguments" />}
                                fieldId="aibOverrideArgs"
                              >
                                <TextInput
                                  id="aibOverrideArgs"
                                  value={formData.aibOverrideArgs}
                                  onChange={(_event, value) => handleInputChange("aibOverrideArgs", value)}
                                  placeholder="Complete override of AIB arguments"
                                />
                              </FormGroup>
                            </GridItem>
                            <GridItem span={6}>
                              <FormGroup
                                label={<PopoverLabel label="Compression" popoverContent="Compression algorithm for artifacts" />}
                                fieldId="compression"
                              >
                                <TextInput
                                  id="compression"
                                  value={formData.compression || ""}
                                  onChange={(_event, value) => handleInputChange("compression", value)}
                                  placeholder="lz4 or gzip"
                                />
                              </FormGroup>
                            </GridItem>
                            <GridItem span={6}>
                              <FormGroup fieldId="serveArtifact">
                                <Checkbox
                                  id="serveArtifact"
                                  label="Serve Artifact"
                                  isChecked={formData.serveArtifact}
                                  onChange={(_event, checked) => handleInputChange("serveArtifact", checked)}
                                />
                              </FormGroup>
                            </GridItem>
                            <GridItem span={12}>
                              <FormGroup
                                label={<PopoverLabel label="Private Registry Authentication" popoverContent="Configure authentication for private container registries" />}
                                fieldId="registryCredentials"
                              >
                                <Checkbox
                                  id="enable-registry-auth"
                                  label="Enable private registry authentication"
                                  isChecked={formData.registryCredentials.enabled}
                                  onChange={(_event, checked) => handleRegistryCredentialsChange("enabled", checked)}
                                />
                                {formData.registryCredentials.enabled && (
                                  <div style={{ marginTop: "16px", padding: "16px", border: "1px solid var(--pf-v5-global--BorderColor--100)", borderRadius: "4px" }}>
                                    <Stack hasGutter>
                                      <StackItem>
                                        <FormGroup label="Authentication Type" fieldId="authType">
                                          <div>
                                            <Radio
                                              id="auth-username-password"
                                              name="authType"
                                              label="Username & Password"
                                              isChecked={formData.registryCredentials.authType === "username-password"}
                                              onChange={() => handleRegistryCredentialsChange("authType", "username-password")}
                                            />
                                            <Radio
                                              id="auth-token"
                                              name="authType"
                                              label="Token"
                                              isChecked={formData.registryCredentials.authType === "token"}
                                              onChange={() => handleRegistryCredentialsChange("authType", "token")}
                                            />
                                            <Radio
                                              id="auth-docker-config"
                                              name="authType"
                                              label="Docker Config JSON"
                                              isChecked={formData.registryCredentials.authType === "docker-config"}
                                              onChange={() => handleRegistryCredentialsChange("authType", "docker-config")}
                                            />
                                          </div>
                                        </FormGroup>
                                      </StackItem>
                                      {formData.registryCredentials.authType !== "docker-config" && (
                                        <StackItem>
                                          <FormGroup label="Registry URL" fieldId="registryUrl" isRequired>
                                            <TextInput
                                              id="registryUrl"
                                              value={formData.registryCredentials.registryUrl}
                                              onChange={(_event, value) => handleRegistryCredentialsChange("registryUrl", value)}
                                              placeholder="quay.io/my-org"
                                              isRequired
                                            />
                                          </FormGroup>
                                        </StackItem>
                                      )}
                                      {formData.registryCredentials.authType === "username-password" && (
                                        <>
                                          <StackItem>
                                            <Grid hasGutter>
                                              <GridItem span={6}>
                                                <FormGroup label="Username" fieldId="username" isRequired>
                                                  <TextInput
                                                    id="username"
                                                    value={formData.registryCredentials.username}
                                                    onChange={(_event, value) => handleRegistryCredentialsChange("username", value)}
                                                    placeholder="myusername"
                                                    isRequired
                                                  />
                                                </FormGroup>
                                              </GridItem>
                                              <GridItem span={6}>
                                                <FormGroup label="Password" fieldId="password" isRequired>
                                                  <TextInput
                                                    id="password"
                                                    type="password"
                                                    value={formData.registryCredentials.password}
                                                    onChange={(_event, value) => handleRegistryCredentialsChange("password", value)}
                                                    placeholder="••••••••"
                                                    isRequired
                                                  />
                                                </FormGroup>
                                              </GridItem>
                                            </Grid>
                                          </StackItem>
                                        </>
                                      )}
                                      {formData.registryCredentials.authType === "token" && (
                                        <StackItem>
                                          <FormGroup label="Token" fieldId="token" isRequired>
                                            <TextInput
                                              id="token"
                                              type="password"
                                              value={formData.registryCredentials.token}
                                              onChange={(_event, value) => handleRegistryCredentialsChange("token", value)}
                                              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                                              isRequired
                                            />
                                          </FormGroup>
                                        </StackItem>
                                      )}
                                      {formData.registryCredentials.authType === "docker-config" && (
                                        <StackItem>
                                          <FormGroup
                                            label="Docker Config JSON"
                                            fieldId="dockerConfig"
                                            isRequired
                                          >
                                            <TextArea
                                              id="dockerConfig"
                                              value={formData.registryCredentials.dockerConfig}
                                              onChange={(_event, value) => handleRegistryCredentialsChange("dockerConfig", value)}
                                              placeholder='{"auths":{"registry.example.com":{"auth":"dXNlcm5hbWU6cGFzc3dvcmQ="}}}'
                                              rows={6}
                                              isRequired
                                            />
                                            <div style={{ fontSize: "0.875rem", color: "var(--pf-v5-global--Color--200)", marginTop: "4px" }}>
                                              Paste the contents of your ~/.docker/config.json file
                                            </div>
                                          </FormGroup>
                                        </StackItem>
                                      )}
                                    </Stack>
                                  </div>
                                )}
                              </FormGroup>
                            </GridItem>
                          </Grid>
                        </ExpandableSection>
                      </StackItem>
                    </Stack>
                  </CardBody>
                </Card>
              </StackItem>

              {/* Files Section */}
              <StackItem>
                <Card>
                  <CardBody>
                    <Stack hasGutter>
                      <StackItem>
                        <Split hasGutter>
                          <SplitItem>
                            <Title headingLevel="h2" size="lg">
                              Files
                            </Title>
                          </SplitItem>
                          <SplitItem isFilled />
                          <SplitItem>
                            <Flex spaceItems={{ default: "spaceItemsSm" }}>
                              {textFiles.length > 0 && (
                                <FlexItem>
                                  <Badge isRead>
                                    {textFiles.length} text file{textFiles.length !== 1 ? 's' : ''}
                                  </Badge>
                                </FlexItem>
                              )}
                              {uploadedFiles.length > 0 && (
                                <FlexItem>
                                  <Badge isRead>
                                    {uploadedFiles.length} uploaded file{uploadedFiles.length !== 1 ? 's' : ''}
                                  </Badge>
                                </FlexItem>
                              )}
                            </Flex>
                          </SplitItem>
                        </Split>
                      </StackItem>
                      <StackItem>
                        <p style={{ color: "var(--pf-v5-global--Color--200)", margin: 0 }}>
                          Upload files to include in your build, or create text files directly in the interface.
                        </p>
                      </StackItem>
                      <StackItem>
                        <Card isPlain>
                          <CardBody>
                            <Stack hasGutter>
                              <StackItem>
                                <Title headingLevel="h3" size="md">
                                  Upload Files
                                </Title>
                              </StackItem>
                              <StackItem>
                                <FileUpload
                                  id="file-upload"
                                  type="dataURL"
                                  value=""
                                  filename=""
                                  filenamePlaceholder="Drag and drop files here or click to browse"
                                  onFileInputChange={(_event, file) => {
                                    if (file) {
                                      handleFileUpload(file);
                                    }
                                  }}
                                  browseButtonText="Browse files"
                                  clearButtonText="Clear"
                                />
                              </StackItem>
                            </Stack>
                          </CardBody>
                        </Card>
                      </StackItem>
                      <StackItem>
                        <Split hasGutter>
                          <SplitItem>
                            <p style={{ color: "var(--pf-v5-global--Color--200)", margin: 0, fontSize: "0.875rem" }}>
                              Or create text files directly in the interface:
                            </p>
                          </SplitItem>
                          <SplitItem isFilled />
                          <SplitItem>
                            <Button
                              variant="link"
                              size="sm"
                              onClick={addTextFile}
                              icon={<PlusCircleIcon />}
                            >
                              Add Text File
                            </Button>
                          </SplitItem>
                        </Split>
                      </StackItem>

                      {textFiles.length > 0 && (
                        <StackItem>
                          <Stack hasGutter>
                            <StackItem>
                              <Title headingLevel="h3" size="md">
                                Text Files
                              </Title>
                            </StackItem>
                            <StackItem>
                              <Stack hasGutter>
                                {textFiles.map((file) => (
                                  <StackItem key={file.id}>
                                    <Card>
                                      <CardBody>
                                        <Stack hasGutter>
                                          <StackItem>
                                            <Split hasGutter>
                                              <SplitItem isFilled>
                                                <FormGroup label="File Name" fieldId={`filename-${file.id}`}>
                                                  <TextInput
                                                    id={`filename-${file.id}`}
                                                    value={file.name}
                                                    onChange={(_event, value) => updateTextFile(file.id, "name", value)}
                                                    placeholder="Enter file name"
                                                  />
                                                </FormGroup>
                                              </SplitItem>
                                              <SplitItem>
                                                <Button
                                                  variant="danger"
                                                  size="sm"
                                                  onClick={() => removeTextFile(file.id)}
                                                  icon={<TrashIcon />}
                                                  style={{ marginTop: "24px" }}
                                                >
                                                  Remove
                                                </Button>
                                              </SplitItem>
                                            </Split>
                                          </StackItem>
                                          <StackItem>
                                            <FormGroup label="File Content" fieldId={`content-${file.id}`}>
                                              <TextArea
                                                id={`content-${file.id}`}
                                                value={file.content}
                                                onChange={(_event, value) => updateTextFile(file.id, "content", value)}
                                                placeholder="Enter file content"
                                                rows={8}
                                              />
                                            </FormGroup>
                                          </StackItem>
                                        </Stack>
                                      </CardBody>
                                    </Card>
                                  </StackItem>
                                ))}
                              </Stack>
                            </StackItem>
                          </Stack>
                        </StackItem>
                      )}

                      {uploadedFiles.length > 0 && (
                        <StackItem>
                          <Stack hasGutter>
                            <StackItem>
                              <Title headingLevel="h3" size="md">
                                Uploaded Files
                              </Title>
                            </StackItem>
                            <StackItem>
                              <Stack hasGutter>
                                {uploadedFiles.map((file) => (
                                  <StackItem key={file.id}>
                                    <Card isPlain>
                                      <CardBody>
                                        <Split hasGutter>
                                          <SplitItem isFilled>
                                            <Flex direction={{ default: "column" }}>
                                              <FlexItem>
                                                <strong>{file.name}</strong>
                                              </FlexItem>
                                              <FlexItem>
                                                <small>
                                                  Size: {(file.file.size / 1024).toFixed(1)} KB
                                                </small>
                                              </FlexItem>
                                            </Flex>
                                          </SplitItem>
                                          <SplitItem>
                                            <Button
                                              variant="plain"
                                              size="sm"
                                              onClick={() => removeUploadedFile(file.id)}
                                              icon={<TrashIcon />}
                                              aria-label="Remove file"
                                            />
                                          </SplitItem>
                                        </Split>
                                      </CardBody>
                                    </Card>
                                  </StackItem>
                                ))}
                              </Stack>
                            </StackItem>
                          </Stack>
                        </StackItem>
                      )}
                    </Stack>
                  </CardBody>
                </Card>
              </StackItem>

              {/* Submit Section */}
              <StackItem>
                <Card>
                  <CardBody>
                    <Split hasGutter>
                      <SplitItem>
                        <Button
                          variant="primary"
                          type="submit"
                          size="lg"
                          isLoading={isSubmitting}
                          isDisabled={!formData.name || !formData.manifest || !formData.architecture}
                        >
                          {isSubmitting ? "Creating Build..." : "Create Build"}
                        </Button>
                      </SplitItem>
                      <SplitItem>
                        <Button variant="link" onClick={onBack}>
                          Cancel
                        </Button>
                      </SplitItem>
                      <SplitItem isFilled />
                      {(!formData.name || (!formData.manifest && formData.name) || (!formData.architecture && formData.name && formData.manifest)) && (
                        <SplitItem>
                          <Alert
                            variant="warning"
                            title={
                              !formData.name 
                                ? "Build name required"
                                : !formData.manifest && formData.name
                                  ? "Manifest content required"
                                  : "Architecture required"
                            }
                            isInline
                            isPlain
                          />
                        </SplitItem>
                      )}
                    </Split>
                  </CardBody>
                </Card>
              </StackItem>
            </Stack>
          </Form>
        </StackItem>
      </Stack>
    </PageSection>
  );
};

export default CreateBuildPage;