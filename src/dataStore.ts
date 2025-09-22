import { Exporter, Lease, Client, LeaseTemplate, Build } from './types';

// Mutable data store
let mockExportersData: Exporter[] = [
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-09-06T05:57:37Z",
            "generation": 1,
            "labels": {
                "board": "nxp-imx8qxp-mek",
                "cpu": "4",
                "device": "nxp-imx8qxp-mek-eballetbo-01",
                "emmc": "false",
                "location": "eballetbo-desk",
                "ram": "3",
                "sd": "true"
            },
            "name": "nxp-imx8qxp-mek-eballetbo-01",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "68375707",
            "uid": "e4dabfbd-8e86-43fb-9437-31c0297de294"
        },
        "spec": {
            "username": "rh:eballetbo"
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-06T05:57:37Z",
                    "message": "Never seen",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "False",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-06T05:57:37Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Unregister",
                    "status": "False",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "nxp-imx8qxp-mek-eballetbo-01-exporter"
            },
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-09-01T14:44:26Z",
            "generation": 1,
            "labels": {
                "board": "nxp-s32g-vnp-rdb3",
                "cpu": "8",
                "device": "nxp-s32g-vnp-rdb3-eballetbo-01",
                "emmc": "false",
                "location": "eballetbo-desk",
                "ram": "32",
                "sd": "true"
            },
            "name": "nxp-s32g-vnp-rdb3-eballetbo-01",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833624",
            "uid": "42286f93-315b-402a-92c6-8e07ddd5c10c"
        },
        "spec": {
            "username": "rh:eballetbo"
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-10T13:29:07Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T07:33:29Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "nxp-s32g-vnp-rdb3-eballetbo-01-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "c25f239a-5a0f-465f-bf12-912f9461c056"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_power.client.PowerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "c25f239a-5a0f-465f-bf12-912f9461c056",
                    "uuid": "32b43ab3-307f-40f0-9b8c-5e9c7cb92753"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "c25f239a-5a0f-465f-bf12-912f9461c056",
                    "uuid": "c6d8fde5-d000-4b8a-98f2-de27f83d84de"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.StorageMuxFlasherClient",
                        "jumpstarter.dev/name": "sdcard"
                    },
                    "parent_uuid": "c25f239a-5a0f-465f-bf12-912f9461c056",
                    "uuid": "07f3ec9e-5364-4962-9b24-f18fd450bb3f"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "c25f239a-5a0f-465f-bf12-912f9461c056",
                    "uuid": "2a5777b1-5965-4e08-949c-7290ae136e23"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_power.client.PowerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "2a5777b1-5965-4e08-949c-7290ae136e23",
                    "uuid": "32b43ab3-307f-40f0-9b8c-5e9c7cb92753"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "2a5777b1-5965-4e08-949c-7290ae136e23",
                    "uuid": "c6d8fde5-d000-4b8a-98f2-de27f83d84de"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:08Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-05T10:21:11Z",
            "generation": 1,
            "labels": {
                "board-type": "qc8775",
                "cpu": "8",
                "device": "qti-snapdragon-ride4-sa8775p-03",
                "emmc": "false",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "qti-snapdragon-ride4-sa8775p-03",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833653",
            "uid": "cb061594-aff1-413f-bb42-f262c40caa8f"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T16:04:03Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T08:15:50Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "qti-snapdragon-ride4-sa8775p-03-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "3f915a2a-0c92-451e-98a1-69cb06549a51"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_ridesx.client.RideSXClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "3f915a2a-0c92-451e-98a1-69cb06549a51",
                    "uuid": "f7d3f239-219e-42ab-9b02-b8af25317ee1"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "f7d3f239-219e-42ab-9b02-b8af25317ee1",
                    "uuid": "8f07bfdc-0804-417f-90bb-b9ca0ee89d1a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "f7d3f239-219e-42ab-9b02-b8af25317ee1",
                    "uuid": "1069e3ce-eb3c-4f5e-ac57-4eda24f32798"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_ridesx.client.RideSXPowerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "3f915a2a-0c92-451e-98a1-69cb06549a51",
                    "uuid": "086fe1fc-6bd4-4c32-a3fc-cad480b65de3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "086fe1fc-6bd4-4c32-a3fc-cad480b65de3",
                    "uuid": "81a2059a-49fb-4087-9ff2-87c9cfb4a32b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power-external"
                    },
                    "parent_uuid": "3f915a2a-0c92-451e-98a1-69cb06549a51",
                    "uuid": "04333e63-ed1b-42c6-a250-a74c27124fc0"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "3f915a2a-0c92-451e-98a1-69cb06549a51",
                    "uuid": "f5f1049f-2c11-45a5-bf73-cbc6282910c4"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "acm"
                    },
                    "parent_uuid": "3f915a2a-0c92-451e-98a1-69cb06549a51",
                    "uuid": "1d3a9fae-cf07-4b9c-99a3-cddb6b2e04bc"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "3f915a2a-0c92-451e-98a1-69cb06549a51",
                    "uuid": "3805a053-3e59-4880-8156-fba27b4eb51d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_shell.client.ShellClient",
                        "jumpstarter.dev/name": "fw-maintenance"
                    },
                    "parent_uuid": "3f915a2a-0c92-451e-98a1-69cb06549a51",
                    "uuid": "88fd850c-5e42-4027-ab83-c2493d95b407"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:10Z",
            "leaseRef": {
                "name": "01990c47-87ef-701e-abf1-f2db333f7ef7"
            }
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-25T10:35:49Z",
            "generation": 1,
            "labels": {
                "board-type": "qc8775",
                "cpu": "8",
                "device": "qti-snapdragon-ride4-sa8775p-10",
                "emmc": "false",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "qti-snapdragon-ride4-sa8775p-10",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833560",
            "uid": "231d85a6-76e6-47b5-96cf-5ed5280ae280"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T16:03:14Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T00:50:34Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "qti-snapdragon-ride4-sa8775p-10-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "81fcfc70-1614-40a4-8d52-1c1d0f23c499"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_ridesx.client.RideSXClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "81fcfc70-1614-40a4-8d52-1c1d0f23c499",
                    "uuid": "73632901-677b-4eba-a02c-4090f7d2baa2"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "73632901-677b-4eba-a02c-4090f7d2baa2",
                    "uuid": "d8432b3e-bcfb-462f-b852-26ab28f14d5a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "73632901-677b-4eba-a02c-4090f7d2baa2",
                    "uuid": "f4895ce9-f178-49a3-9fc7-588cae28cade"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_ridesx.client.RideSXPowerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "81fcfc70-1614-40a4-8d52-1c1d0f23c499",
                    "uuid": "62638576-cf0d-4b49-9cfc-dbe7461875ca"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "62638576-cf0d-4b49-9cfc-dbe7461875ca",
                    "uuid": "a2b28bf8-90a8-43c2-8d19-c223a3517c38"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power-external"
                    },
                    "parent_uuid": "81fcfc70-1614-40a4-8d52-1c1d0f23c499",
                    "uuid": "6531ebf5-cab8-4f59-ac37-b3bcbd09c064"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "81fcfc70-1614-40a4-8d52-1c1d0f23c499",
                    "uuid": "3bfd5042-0e8a-409e-84af-db02096ed191"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "acm"
                    },
                    "parent_uuid": "81fcfc70-1614-40a4-8d52-1c1d0f23c499",
                    "uuid": "ecf27244-3f1a-4d42-b59b-145d6922cf4f"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "81fcfc70-1614-40a4-8d52-1c1d0f23c499",
                    "uuid": "3b308d5f-6600-446f-b981-e23858f6c653"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_shell.client.ShellClient",
                        "jumpstarter.dev/name": "fw-maintenance"
                    },
                    "parent_uuid": "81fcfc70-1614-40a4-8d52-1c1d0f23c499",
                    "uuid": "06323d53-eeea-41e4-b1ad-4d9722dcfb28"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:04Z",
            "leaseRef": {
                "name": "019934a9-a61b-7436-9450-f164c8acfd17"
            }
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-09-05T13:26:23Z",
            "generation": 1,
            "labels": {
                "board-type": "qc8775",
                "cpu": "8",
                "device": "qti-snapdragon-ride4-sa8775p-23",
                "emmc": "false",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "qti-snapdragon-ride4-sa8775p-23",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833706",
            "uid": "3c470807-1f03-4468-9344-a5eaee41062d"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T14:16:58Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T07:39:13Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "qti-snapdragon-ride4-sa8775p-23-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "ee68cec7-308f-422e-adb9-c4536d6e0965"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_ridesx.client.RideSXClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "ee68cec7-308f-422e-adb9-c4536d6e0965",
                    "uuid": "a200ce93-77ea-4c1d-9d76-d7109a64a8f5"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "a200ce93-77ea-4c1d-9d76-d7109a64a8f5",
                    "uuid": "fe7f777f-1236-483b-b2cc-1eec6c00859b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "a200ce93-77ea-4c1d-9d76-d7109a64a8f5",
                    "uuid": "a7493714-6f83-48ed-8924-ef9fe289925f"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_ridesx.client.RideSXPowerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "ee68cec7-308f-422e-adb9-c4536d6e0965",
                    "uuid": "2208a574-e478-4852-8b5d-85229ac37f5a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "2208a574-e478-4852-8b5d-85229ac37f5a",
                    "uuid": "84662f10-6fa5-44a5-90ab-0b6304149834"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power-external"
                    },
                    "parent_uuid": "ee68cec7-308f-422e-adb9-c4536d6e0965",
                    "uuid": "a1bac880-ec51-4b60-8fc6-2e79788aefdd"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "ee68cec7-308f-422e-adb9-c4536d6e0965",
                    "uuid": "e027f37a-a644-4558-8ecb-d698e1493432"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "acm"
                    },
                    "parent_uuid": "ee68cec7-308f-422e-adb9-c4536d6e0965",
                    "uuid": "903f9554-7f95-42d7-baed-656063f969bf"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "ee68cec7-308f-422e-adb9-c4536d6e0965",
                    "uuid": "38085362-bb01-4f08-b43e-c6953c9f7084"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_shell.client.ShellClient",
                        "jumpstarter.dev/name": "fw-maintenance"
                    },
                    "parent_uuid": "ee68cec7-308f-422e-adb9-c4536d6e0965",
                    "uuid": "e37208c9-5823-43e2-8fc8-45ee1df8ee88"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:14Z",
            "leaseRef": {
                "name": "01991a0f-a8b7-7085-b864-59025390bcc0"
            }
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-08T09:24:05Z",
            "generation": 1,
            "labels": {
                "board-type": "qc8775",
                "cpu": "8",
                "device": "qti-snapdragon-ride4-sa8775p-jligon-01",
                "enabled": "true",
                "location": "jligon-desk",
                "ram": "32",
                "revision": "v3",
                "ssd": "true"
            },
            "name": "qti-snapdragon-ride4-sa8775p-jligon-01",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833559",
            "uid": "caa8bfcd-39b3-41af-b071-a70c9c7d1563"
        },
        "spec": {
            "username": "rh:jligon"
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T12:41:35Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T01:56:48Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "qti-snapdragon-ride4-sa8775p-jligon-01-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "0982b45c-992e-4eeb-a623-e366139cf6fe"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_ridesx.client.RideSXClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "0982b45c-992e-4eeb-a623-e366139cf6fe",
                    "uuid": "892fe844-2e9d-4059-b326-64718445318d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "892fe844-2e9d-4059-b326-64718445318d",
                    "uuid": "ad6672de-5cad-4967-a71b-1459baeff99a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "892fe844-2e9d-4059-b326-64718445318d",
                    "uuid": "35c6ddba-6566-47c5-9d74-d56bb4dfa70a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_ridesx.client.RideSXPowerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "0982b45c-992e-4eeb-a623-e366139cf6fe",
                    "uuid": "d1fe64d3-a600-4f69-aad0-01e89e84e0c3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "d1fe64d3-a600-4f69-aad0-01e89e84e0c3",
                    "uuid": "5b039917-4706-4e2a-a6a6-de86efe22459"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "0982b45c-992e-4eeb-a623-e366139cf6fe",
                    "uuid": "374d0286-ee9d-4f41-ae1b-9bebb6dd0dbc"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "0982b45c-992e-4eeb-a623-e366139cf6fe",
                    "uuid": "cbbcf601-f24c-4913-aab4-5306b6b832a5"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:04Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "renesas-rcar-s4-01.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-20T21:38:51Z",
            "generation": 1,
            "labels": {
                "board-type": "renesas-rcar-s4",
                "cpu": "8",
                "device": "renesas-rcar-s4-01",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "4",
                "sd": "false"
            },
            "name": "renesas-rcar-s4-01",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833661",
            "uid": "60825399-4e59-4f82-9c9c-551a17aad4a2"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T16:49:33Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T01:29:33Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "renesas-rcar-s4-01-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "5b55763b-8606-4fc1-86c5-0ca6cdf2baf7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "5b55763b-8606-4fc1-86c5-0ca6cdf2baf7",
                    "uuid": "0d59ef55-3621-4bf6-8753-bd2e10b6ad86"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "0d59ef55-3621-4bf6-8753-bd2e10b6ad86",
                    "uuid": "5e65c794-2f0a-4867-9d2b-309d4420ea58"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "0d59ef55-3621-4bf6-8753-bd2e10b6ad86",
                    "uuid": "7689d436-a0e5-4f27-8bc8-80e0db5dfb68"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "0d59ef55-3621-4bf6-8753-bd2e10b6ad86",
                    "uuid": "2dcb4221-0dda-48c7-a35b-3d8ef4f13e93"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "2dcb4221-0dda-48c7-a35b-3d8ef4f13e93",
                    "uuid": "da97f899-1409-40cf-b793-fe99727c50f0"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "0d59ef55-3621-4bf6-8753-bd2e10b6ad86",
                    "uuid": "3fec88c9-bf8d-41e0-a127-65d3d6228f4c"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "3fec88c9-bf8d-41e0-a127-65d3d6228f4c",
                    "uuid": "e4a12f75-7ce5-4f5e-a2ad-0009bdf94630"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "0d59ef55-3621-4bf6-8753-bd2e10b6ad86",
                    "uuid": "e37a1fa2-66c1-4007-a572-b015d499884b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "e37a1fa2-66c1-4007-a572-b015d499884b",
                    "uuid": "7689d436-a0e5-4f27-8bc8-80e0db5dfb68"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "e37a1fa2-66c1-4007-a572-b015d499884b",
                    "uuid": "5e65c794-2f0a-4867-9d2b-309d4420ea58"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "5b55763b-8606-4fc1-86c5-0ca6cdf2baf7",
                    "uuid": "5e65c794-2f0a-4867-9d2b-309d4420ea58"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "5b55763b-8606-4fc1-86c5-0ca6cdf2baf7",
                    "uuid": "7689d436-a0e5-4f27-8bc8-80e0db5dfb68"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "5b55763b-8606-4fc1-86c5-0ca6cdf2baf7",
                    "uuid": "1107c9b8-6f85-4857-8260-29cb31652025"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:11Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "renesas-rcar-s4-02.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-20T21:38:47Z",
            "generation": 1,
            "labels": {
                "board-type": "renesas-rcar-s4",
                "cpu": "8",
                "device": "renesas-rcar-s4-02",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "4",
                "sd": "false"
            },
            "name": "renesas-rcar-s4-02",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833606",
            "uid": "460b8ec1-f79d-433c-8142-a3c31f8f383c"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T16:06:29Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T07:25:50Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "renesas-rcar-s4-02-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "82ca1f16-f4a3-42eb-8799-117b052a9e53"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "82ca1f16-f4a3-42eb-8799-117b052a9e53",
                    "uuid": "2873d2b7-2f09-49dc-9f10-ec7afe97ec7d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "2873d2b7-2f09-49dc-9f10-ec7afe97ec7d",
                    "uuid": "f7d72e12-fb09-4233-a2ba-8b66be85d2ae"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "2873d2b7-2f09-49dc-9f10-ec7afe97ec7d",
                    "uuid": "973e29ff-8a89-4391-aecc-23ee291c6840"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "2873d2b7-2f09-49dc-9f10-ec7afe97ec7d",
                    "uuid": "c3a76378-3b58-43cd-84cc-3de3e753f015"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "c3a76378-3b58-43cd-84cc-3de3e753f015",
                    "uuid": "e29e9af6-80a5-4b57-8ed2-37e45e7b59dd"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "2873d2b7-2f09-49dc-9f10-ec7afe97ec7d",
                    "uuid": "d2cc2724-7736-4e1d-92d8-d2954f84f875"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "d2cc2724-7736-4e1d-92d8-d2954f84f875",
                    "uuid": "e0b079d7-a4ae-4d3b-85e8-5b5d797a483b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "2873d2b7-2f09-49dc-9f10-ec7afe97ec7d",
                    "uuid": "80fca966-b457-4a97-a65b-5eebd74780e7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "80fca966-b457-4a97-a65b-5eebd74780e7",
                    "uuid": "973e29ff-8a89-4391-aecc-23ee291c6840"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "80fca966-b457-4a97-a65b-5eebd74780e7",
                    "uuid": "f7d72e12-fb09-4233-a2ba-8b66be85d2ae"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "82ca1f16-f4a3-42eb-8799-117b052a9e53",
                    "uuid": "f7d72e12-fb09-4233-a2ba-8b66be85d2ae"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "82ca1f16-f4a3-42eb-8799-117b052a9e53",
                    "uuid": "973e29ff-8a89-4391-aecc-23ee291c6840"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "82ca1f16-f4a3-42eb-8799-117b052a9e53",
                    "uuid": "736c49b6-1fa8-422a-8f03-27b56dd95e0a"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:07Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "renesas-rcar-s4-04.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-01T08:35:46Z",
            "generation": 1,
            "labels": {
                "board-type": "renesas-rcar-s4",
                "cpu": "8",
                "device": "renesas-rcar-s4-04",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "4",
                "sd": "false"
            },
            "name": "renesas-rcar-s4-04",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833575",
            "uid": "28b7054f-9b20-47d3-b136-d4600e3bb837"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T15:37:10Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T07:20:12Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "renesas-rcar-s4-04-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "14ac2911-5966-4e29-af30-c56fe361e2ec"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "14ac2911-5966-4e29-af30-c56fe361e2ec",
                    "uuid": "7b21c089-01e0-474d-8948-9dc78c1a19f8"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "7b21c089-01e0-474d-8948-9dc78c1a19f8",
                    "uuid": "4eb1145d-037a-4dec-8fdf-5c2102a474e5"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "7b21c089-01e0-474d-8948-9dc78c1a19f8",
                    "uuid": "2caa4fae-0650-4210-880f-99e976d481b3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "7b21c089-01e0-474d-8948-9dc78c1a19f8",
                    "uuid": "c4685504-9542-4c80-a9ce-aceb480feb75"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "c4685504-9542-4c80-a9ce-aceb480feb75",
                    "uuid": "434f3dcc-9268-4a48-9840-c7a9b09bfec9"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "7b21c089-01e0-474d-8948-9dc78c1a19f8",
                    "uuid": "23cefc02-545a-4b8f-ba98-1f0e90ad6efd"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "23cefc02-545a-4b8f-ba98-1f0e90ad6efd",
                    "uuid": "faa9ce85-b241-4896-a156-e904e0620081"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "7b21c089-01e0-474d-8948-9dc78c1a19f8",
                    "uuid": "d87c8ecd-4390-4e71-8fe1-5876a0e928b8"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "d87c8ecd-4390-4e71-8fe1-5876a0e928b8",
                    "uuid": "2caa4fae-0650-4210-880f-99e976d481b3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "d87c8ecd-4390-4e71-8fe1-5876a0e928b8",
                    "uuid": "4eb1145d-037a-4dec-8fdf-5c2102a474e5"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "14ac2911-5966-4e29-af30-c56fe361e2ec",
                    "uuid": "4eb1145d-037a-4dec-8fdf-5c2102a474e5"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "14ac2911-5966-4e29-af30-c56fe361e2ec",
                    "uuid": "2caa4fae-0650-4210-880f-99e976d481b3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "14ac2911-5966-4e29-af30-c56fe361e2ec",
                    "uuid": "b8d57a66-40e2-45c4-86d5-599858bdb21f"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:05Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "renesas-rcar-s4-05.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-01T16:22:15Z",
            "generation": 1,
            "labels": {
                "board-type": "renesas-rcar-s4",
                "cpu": "8",
                "device": "renesas-rcar-s4-05",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "4",
                "sd": "false"
            },
            "name": "renesas-rcar-s4-05",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833681",
            "uid": "cc51e5fc-ddae-4019-984b-9911b98f84d8"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T14:13:41Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T06:39:59Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "renesas-rcar-s4-05-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "18d20a5b-c0a2-4631-ae50-dbe096324c88"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "18d20a5b-c0a2-4631-ae50-dbe096324c88",
                    "uuid": "a35f8284-5259-4df1-b055-f32db480057c"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "a35f8284-5259-4df1-b055-f32db480057c",
                    "uuid": "33244a28-e404-45bc-b2d8-11690303f775"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "a35f8284-5259-4df1-b055-f32db480057c",
                    "uuid": "8417350a-4495-4bb0-83e1-46aa056fe652"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "a35f8284-5259-4df1-b055-f32db480057c",
                    "uuid": "089e3dcf-8747-4441-b3d0-aa2f3f2c7a71"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "089e3dcf-8747-4441-b3d0-aa2f3f2c7a71",
                    "uuid": "a314e314-b99a-4537-8b1e-e7a3beff8637"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "a35f8284-5259-4df1-b055-f32db480057c",
                    "uuid": "9e747683-6383-4541-a776-990faf0ee3df"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "9e747683-6383-4541-a776-990faf0ee3df",
                    "uuid": "6a0a3e24-92c2-4708-b468-99fa4672f1f7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "a35f8284-5259-4df1-b055-f32db480057c",
                    "uuid": "ece70667-cfba-4e56-accf-e148e48ec84b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "ece70667-cfba-4e56-accf-e148e48ec84b",
                    "uuid": "8417350a-4495-4bb0-83e1-46aa056fe652"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "ece70667-cfba-4e56-accf-e148e48ec84b",
                    "uuid": "33244a28-e404-45bc-b2d8-11690303f775"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "18d20a5b-c0a2-4631-ae50-dbe096324c88",
                    "uuid": "33244a28-e404-45bc-b2d8-11690303f775"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "18d20a5b-c0a2-4631-ae50-dbe096324c88",
                    "uuid": "8417350a-4495-4bb0-83e1-46aa056fe652"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "18d20a5b-c0a2-4631-ae50-dbe096324c88",
                    "uuid": "0c1e3ac6-489c-4b3f-a2de-bc238d199d9f"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:11Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "renesas-rcar-s4-06.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T15:05:22Z",
            "generation": 1,
            "labels": {
                "board-type": "renesas-rcar-s4",
                "cpu": "8",
                "device": "renesas-rcar-s4-06",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "4",
                "sd": "false"
            },
            "name": "renesas-rcar-s4-06",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833580",
            "uid": "faa464c4-e691-44de-addf-73b27a0ea7f9"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T16:26:08Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T03:46:21Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "renesas-rcar-s4-06-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "e2f4e2c8-7ae2-4bda-9e1e-c5e3b9cce1c0"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "e2f4e2c8-7ae2-4bda-9e1e-c5e3b9cce1c0",
                    "uuid": "cc53fcf1-de1f-4ba2-bf76-73c661758d29"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "cc53fcf1-de1f-4ba2-bf76-73c661758d29",
                    "uuid": "b63224d8-5dbc-4f15-888e-6ba89a09b989"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "cc53fcf1-de1f-4ba2-bf76-73c661758d29",
                    "uuid": "7a474b7c-b34d-4abd-8907-1db2221b351d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "cc53fcf1-de1f-4ba2-bf76-73c661758d29",
                    "uuid": "eecaa304-339f-4989-88d6-8bc31c23f231"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "eecaa304-339f-4989-88d6-8bc31c23f231",
                    "uuid": "e256c85c-8902-4536-8cda-6a3e821df5af"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "cc53fcf1-de1f-4ba2-bf76-73c661758d29",
                    "uuid": "8560ecbd-3b2b-4dcf-a695-51a9dff665a2"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "8560ecbd-3b2b-4dcf-a695-51a9dff665a2",
                    "uuid": "29c20ed0-2edb-42d4-90a8-6bddae4c9dff"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "cc53fcf1-de1f-4ba2-bf76-73c661758d29",
                    "uuid": "e4f56768-9540-42ca-a7ad-a43b91e7f153"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "e4f56768-9540-42ca-a7ad-a43b91e7f153",
                    "uuid": "7a474b7c-b34d-4abd-8907-1db2221b351d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "e4f56768-9540-42ca-a7ad-a43b91e7f153",
                    "uuid": "b63224d8-5dbc-4f15-888e-6ba89a09b989"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "e2f4e2c8-7ae2-4bda-9e1e-c5e3b9cce1c0",
                    "uuid": "b63224d8-5dbc-4f15-888e-6ba89a09b989"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "e2f4e2c8-7ae2-4bda-9e1e-c5e3b9cce1c0",
                    "uuid": "7a474b7c-b34d-4abd-8907-1db2221b351d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "e2f4e2c8-7ae2-4bda-9e1e-c5e3b9cce1c0",
                    "uuid": "6de775ba-9b2e-413e-a107-b7a57fe2f178"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:05Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "renesas-rcar-s4-07.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-20T21:38:46Z",
            "generation": 1,
            "labels": {
                "board-type": "renesas-rcar-s4",
                "cpu": "8",
                "device": "renesas-rcar-s4-07",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "4",
                "sd": "false"
            },
            "name": "renesas-rcar-s4-07",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833564",
            "uid": "8665db30-b27b-41b1-bb48-54ab03c24e95"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T16:27:06Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T06:15:03Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "renesas-rcar-s4-07-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "07885d85-1786-46f0-be81-968984635312"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "07885d85-1786-46f0-be81-968984635312",
                    "uuid": "14d3cbb1-63dc-4be3-91a8-72a6c3023fb6"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "14d3cbb1-63dc-4be3-91a8-72a6c3023fb6",
                    "uuid": "a32d1696-d4ef-4e02-8552-5ed4b006ee55"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "14d3cbb1-63dc-4be3-91a8-72a6c3023fb6",
                    "uuid": "e1eab0ca-29d5-4739-bda8-7408a9be0524"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "14d3cbb1-63dc-4be3-91a8-72a6c3023fb6",
                    "uuid": "2fe0dbd0-fd3d-4a15-b861-448cd062eb70"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "2fe0dbd0-fd3d-4a15-b861-448cd062eb70",
                    "uuid": "f9ce45a8-ed90-4061-a1e6-ff7ccc35d8ed"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "14d3cbb1-63dc-4be3-91a8-72a6c3023fb6",
                    "uuid": "ff3c445f-a8a7-4ad3-a530-9c19ca05ba13"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "ff3c445f-a8a7-4ad3-a530-9c19ca05ba13",
                    "uuid": "e9f24c97-2cfa-497f-aeff-b3b61ce39c64"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "14d3cbb1-63dc-4be3-91a8-72a6c3023fb6",
                    "uuid": "f166600e-f31a-4a31-a65b-be3161b314f6"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "f166600e-f31a-4a31-a65b-be3161b314f6",
                    "uuid": "e1eab0ca-29d5-4739-bda8-7408a9be0524"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "f166600e-f31a-4a31-a65b-be3161b314f6",
                    "uuid": "a32d1696-d4ef-4e02-8552-5ed4b006ee55"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "07885d85-1786-46f0-be81-968984635312",
                    "uuid": "a32d1696-d4ef-4e02-8552-5ed4b006ee55"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "07885d85-1786-46f0-be81-968984635312",
                    "uuid": "e1eab0ca-29d5-4739-bda8-7408a9be0524"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "07885d85-1786-46f0-be81-968984635312",
                    "uuid": "a2db0a1a-9d98-4f2a-a510-b89f175c8b1e"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:04Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "renesas-rcar-s4-08.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-20T21:38:43Z",
            "generation": 1,
            "labels": {
                "board-type": "renesas-rcar-s4",
                "cpu": "8",
                "device": "renesas-rcar-s4-08",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "4",
                "sd": "false"
            },
            "name": "renesas-rcar-s4-08",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833659",
            "uid": "a1a59e94-463e-4db3-a885-096084e6dceb"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T16:12:26Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T05:17:08Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "renesas-rcar-s4-08-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "f57ad63d-3375-4445-a650-e8419ccd152e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "f57ad63d-3375-4445-a650-e8419ccd152e",
                    "uuid": "0a8a624c-814b-4695-8df8-f9333d81009c"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "0a8a624c-814b-4695-8df8-f9333d81009c",
                    "uuid": "37a55b80-e804-4712-b9d7-fe13a11a6320"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "0a8a624c-814b-4695-8df8-f9333d81009c",
                    "uuid": "6c30a63c-8b2d-49c2-8dca-5d934c010f94"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "0a8a624c-814b-4695-8df8-f9333d81009c",
                    "uuid": "8dee7af8-56b8-4d87-b891-ff5c7f53f6de"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "8dee7af8-56b8-4d87-b891-ff5c7f53f6de",
                    "uuid": "ee5ae063-c10c-4f11-92cf-960c942fcf53"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "0a8a624c-814b-4695-8df8-f9333d81009c",
                    "uuid": "49f41010-f7bb-48bc-8b13-eb557623edbf"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "49f41010-f7bb-48bc-8b13-eb557623edbf",
                    "uuid": "04b2984a-cbfb-437d-8b0d-b876d79a7336"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "0a8a624c-814b-4695-8df8-f9333d81009c",
                    "uuid": "4092e182-a565-4032-8bd0-372440128a44"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "4092e182-a565-4032-8bd0-372440128a44",
                    "uuid": "6c30a63c-8b2d-49c2-8dca-5d934c010f94"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "4092e182-a565-4032-8bd0-372440128a44",
                    "uuid": "37a55b80-e804-4712-b9d7-fe13a11a6320"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "f57ad63d-3375-4445-a650-e8419ccd152e",
                    "uuid": "37a55b80-e804-4712-b9d7-fe13a11a6320"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "f57ad63d-3375-4445-a650-e8419ccd152e",
                    "uuid": "6c30a63c-8b2d-49c2-8dca-5d934c010f94"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "f57ad63d-3375-4445-a650-e8419ccd152e",
                    "uuid": "a96be857-2aaf-411f-9182-06ea93c5ebf5"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:11Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "renesas-rcar-s4-09.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-20T21:38:47Z",
            "generation": 1,
            "labels": {
                "board-type": "renesas-rcar-s4",
                "cpu": "8",
                "device": "renesas-rcar-s4-09",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "4",
                "sd": "false"
            },
            "name": "renesas-rcar-s4-09",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833683",
            "uid": "e83bd168-59c5-41ed-872f-fb79e40ae20f"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T16:31:45Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T05:57:57Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "renesas-rcar-s4-09-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "c54ea76c-6756-43c6-86be-406a3f0ee212"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "c54ea76c-6756-43c6-86be-406a3f0ee212",
                    "uuid": "db9267e5-36da-4cf5-8522-d5a5e011fd5e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "db9267e5-36da-4cf5-8522-d5a5e011fd5e",
                    "uuid": "4f1970b3-a674-428c-9ec0-7ba6aa59469e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "db9267e5-36da-4cf5-8522-d5a5e011fd5e",
                    "uuid": "bc0adb76-a6d5-42d2-9cce-043b8d8cee78"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "db9267e5-36da-4cf5-8522-d5a5e011fd5e",
                    "uuid": "624988a8-2e7f-4ed5-9f23-7ec22f673e99"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "624988a8-2e7f-4ed5-9f23-7ec22f673e99",
                    "uuid": "bc98a25b-1209-427f-b8d1-3bf8408b765b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "db9267e5-36da-4cf5-8522-d5a5e011fd5e",
                    "uuid": "7314aae0-b147-4485-81c3-5af7fadc8148"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "7314aae0-b147-4485-81c3-5af7fadc8148",
                    "uuid": "a9b8c77e-9726-40fd-9cab-901f0a0f2603"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "db9267e5-36da-4cf5-8522-d5a5e011fd5e",
                    "uuid": "74ef4a33-9be2-456a-9a09-944fc608c19e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "74ef4a33-9be2-456a-9a09-944fc608c19e",
                    "uuid": "bc0adb76-a6d5-42d2-9cce-043b8d8cee78"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "74ef4a33-9be2-456a-9a09-944fc608c19e",
                    "uuid": "4f1970b3-a674-428c-9ec0-7ba6aa59469e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "c54ea76c-6756-43c6-86be-406a3f0ee212",
                    "uuid": "4f1970b3-a674-428c-9ec0-7ba6aa59469e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "c54ea76c-6756-43c6-86be-406a3f0ee212",
                    "uuid": "bc0adb76-a6d5-42d2-9cce-043b8d8cee78"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "c54ea76c-6756-43c6-86be-406a3f0ee212",
                    "uuid": "aaaa39a3-e5df-4fb4-a909-65a459211efb"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:12Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "renesas-rcar-s4-28.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-20T21:38:42Z",
            "generation": 1,
            "labels": {
                "board-type": "renesas-rcar-s4",
                "cpu": "8",
                "device": "renesas-rcar-s4-28",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "4",
                "sd": "false"
            },
            "name": "renesas-rcar-s4-28",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833684",
            "uid": "d39d7956-83d9-4e61-a366-0d3bb28833a4"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T14:31:11Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T06:48:55Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "renesas-rcar-s4-28-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "34c49a00-7d4f-4b95-a4f6-26de961044a0"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "34c49a00-7d4f-4b95-a4f6-26de961044a0",
                    "uuid": "ef48fda0-9186-41f5-85b1-9e0ca60a5d0e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "ef48fda0-9186-41f5-85b1-9e0ca60a5d0e",
                    "uuid": "4d8b8ba7-24e1-4507-af58-931ab7bf78bb"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "ef48fda0-9186-41f5-85b1-9e0ca60a5d0e",
                    "uuid": "7fe3e4de-a914-44fd-a756-90f6608e3477"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "ef48fda0-9186-41f5-85b1-9e0ca60a5d0e",
                    "uuid": "e6175994-d086-452f-ad75-b623b4ada53a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "e6175994-d086-452f-ad75-b623b4ada53a",
                    "uuid": "99df9504-4a7e-402f-bacc-2fc051dbdb07"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "ef48fda0-9186-41f5-85b1-9e0ca60a5d0e",
                    "uuid": "16a35682-d7aa-4fe4-99b6-cbc4a06a968e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "16a35682-d7aa-4fe4-99b6-cbc4a06a968e",
                    "uuid": "97a8feaf-cd97-4b22-8c0d-b4f09f05e4cb"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "ef48fda0-9186-41f5-85b1-9e0ca60a5d0e",
                    "uuid": "6a01f2e1-68f2-4234-8171-4d2cfcbcdce6"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "6a01f2e1-68f2-4234-8171-4d2cfcbcdce6",
                    "uuid": "7fe3e4de-a914-44fd-a756-90f6608e3477"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "6a01f2e1-68f2-4234-8171-4d2cfcbcdce6",
                    "uuid": "4d8b8ba7-24e1-4507-af58-931ab7bf78bb"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "34c49a00-7d4f-4b95-a4f6-26de961044a0",
                    "uuid": "4d8b8ba7-24e1-4507-af58-931ab7bf78bb"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "34c49a00-7d4f-4b95-a4f6-26de961044a0",
                    "uuid": "7fe3e4de-a914-44fd-a756-90f6608e3477"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "34c49a00-7d4f-4b95-a4f6-26de961044a0",
                    "uuid": "33bce902-6309-40b8-8bc3-190c5ca8a3de"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:12Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "renesas-rcar-s4-33.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-20T21:38:44Z",
            "generation": 1,
            "labels": {
                "board-type": "renesas-rcar-s4",
                "cpu": "8",
                "device": "renesas-rcar-s4-33",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "4",
                "sd": "false"
            },
            "name": "renesas-rcar-s4-33",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833703",
            "uid": "89e97a68-462e-43a2-9b5e-36542c4a3816"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T16:33:25Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T04:22:04Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "renesas-rcar-s4-33-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "8ab23130-f55a-4fa3-9f44-c8e85698cb6b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "8ab23130-f55a-4fa3-9f44-c8e85698cb6b",
                    "uuid": "77b9fe99-7126-473d-964b-9ce6a012ebd6"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "77b9fe99-7126-473d-964b-9ce6a012ebd6",
                    "uuid": "711f6419-6b2c-4f44-8b90-18a41605fb33"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "77b9fe99-7126-473d-964b-9ce6a012ebd6",
                    "uuid": "fc4b855f-406e-4f59-acc9-68c06cbade7d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "77b9fe99-7126-473d-964b-9ce6a012ebd6",
                    "uuid": "6095b6d4-34db-4859-8c5c-e91dcf084cf2"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "6095b6d4-34db-4859-8c5c-e91dcf084cf2",
                    "uuid": "d930d951-e233-480d-bfa8-84fc3bf9636a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "77b9fe99-7126-473d-964b-9ce6a012ebd6",
                    "uuid": "c541656c-62bc-455c-94ab-cb8ffca872aa"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "c541656c-62bc-455c-94ab-cb8ffca872aa",
                    "uuid": "60b05199-7c60-46b3-ba4b-db7ba5fcad49"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "77b9fe99-7126-473d-964b-9ce6a012ebd6",
                    "uuid": "7f6ed27a-8626-4f29-afa1-34afd01f8ae8"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "7f6ed27a-8626-4f29-afa1-34afd01f8ae8",
                    "uuid": "fc4b855f-406e-4f59-acc9-68c06cbade7d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "7f6ed27a-8626-4f29-afa1-34afd01f8ae8",
                    "uuid": "711f6419-6b2c-4f44-8b90-18a41605fb33"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "8ab23130-f55a-4fa3-9f44-c8e85698cb6b",
                    "uuid": "711f6419-6b2c-4f44-8b90-18a41605fb33"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_gpiod.client.DigitalOutputClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "8ab23130-f55a-4fa3-9f44-c8e85698cb6b",
                    "uuid": "fc4b855f-406e-4f59-acc9-68c06cbade7d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "8ab23130-f55a-4fa3-9f44-c8e85698cb6b",
                    "uuid": "a4c74537-4599-43e5-a7bf-c18bce733725"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:13Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-27T06:44:19Z",
            "generation": 1,
            "labels": {
                "board": "ti-am69",
                "cpu": "8",
                "device": "ti-jacinto-am69-eballetbo-01",
                "emmc": "true",
                "location": "eballetbo-desk",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-am69-eballetbo-01",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833638",
            "uid": "07cff8da-85ed-41a3-b98a-561882f1cea7"
        },
        "spec": {
            "username": "rh:eballetbo"
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-10T13:29:08Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T07:37:01Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-am69-eballetbo-01-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "6b9c4592-7e74-4b1c-adae-a499c2614cc7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_power.client.PowerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "6b9c4592-7e74-4b1c-adae-a499c2614cc7",
                    "uuid": "613c7e0a-7cff-4fb1-8860-7e8e93c931db"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "6b9c4592-7e74-4b1c-adae-a499c2614cc7",
                    "uuid": "2bc44437-2375-4034-8939-794a7c7fbcfc"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.StorageMuxFlasherClient",
                        "jumpstarter.dev/name": "sdcard"
                    },
                    "parent_uuid": "6b9c4592-7e74-4b1c-adae-a499c2614cc7",
                    "uuid": "782bd401-be9b-42ed-8446-e823bc2bc1ae"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "6b9c4592-7e74-4b1c-adae-a499c2614cc7",
                    "uuid": "9d62c184-984e-414d-8dfc-bc447b710c0a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_power.client.PowerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "9d62c184-984e-414d-8dfc-bc447b710c0a",
                    "uuid": "613c7e0a-7cff-4fb1-8860-7e8e93c931db"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "9d62c184-984e-414d-8dfc-bc447b710c0a",
                    "uuid": "2bc44437-2375-4034-8939-794a7c7fbcfc"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "9d62c184-984e-414d-8dfc-bc447b710c0a",
                    "uuid": "12e04368-fad5-434f-83b2-84c9b7800e63"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "12e04368-fad5-434f-83b2-84c9b7800e63",
                    "uuid": "d184ed17-216d-4831-bc51-6fbe9ea6524e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "9d62c184-984e-414d-8dfc-bc447b710c0a",
                    "uuid": "6e25f466-659a-4bfd-8f44-aafb7f82d345"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "6e25f466-659a-4bfd-8f44-aafb7f82d345",
                    "uuid": "16ccc26b-2732-494f-ba8c-c0617c708d2a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "9d62c184-984e-414d-8dfc-bc447b710c0a",
                    "uuid": "93dfa4b6-ddd7-4e85-87fb-f6d4dc0e7725"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_power.client.PowerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "93dfa4b6-ddd7-4e85-87fb-f6d4dc0e7725",
                    "uuid": "613c7e0a-7cff-4fb1-8860-7e8e93c931db"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "93dfa4b6-ddd7-4e85-87fb-f6d4dc0e7725",
                    "uuid": "2bc44437-2375-4034-8939-794a7c7fbcfc"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "6b9c4592-7e74-4b1c-adae-a499c2614cc7",
                    "uuid": "1731a40f-3493-4d20-97de-cb38be5d6c00"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_power.client.PowerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "1731a40f-3493-4d20-97de-cb38be5d6c00",
                    "uuid": "613c7e0a-7cff-4fb1-8860-7e8e93c931db"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "1731a40f-3493-4d20-97de-cb38be5d6c00",
                    "uuid": "2bc44437-2375-4034-8939-794a7c7fbcfc"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:09Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-01.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-20T21:38:49Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-01",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-01",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833621",
            "uid": "fbf5c463-9e8c-44b8-8f31-fa8f6ef1b654"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T17:12:06Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T08:46:07Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-01-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "3a98823f-5724-401f-9712-ec03a186ca8a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "3a98823f-5724-401f-9712-ec03a186ca8a",
                    "uuid": "7feec1a3-c686-4cfa-bbbd-735beaeda404"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "7feec1a3-c686-4cfa-bbbd-735beaeda404",
                    "uuid": "eb5474d0-9054-432b-add2-a9226e7b676d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "7feec1a3-c686-4cfa-bbbd-735beaeda404",
                    "uuid": "e20d5c63-4d5f-48e5-8d25-c1d4d81377ba"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "7feec1a3-c686-4cfa-bbbd-735beaeda404",
                    "uuid": "0bfeae45-50d9-4b70-866f-dcdec32317db"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "0bfeae45-50d9-4b70-866f-dcdec32317db",
                    "uuid": "a1531398-398e-4efd-b4af-67817d0793fe"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "7feec1a3-c686-4cfa-bbbd-735beaeda404",
                    "uuid": "f4f1f833-44a2-4cfe-92f1-2c12ef5a33a2"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "f4f1f833-44a2-4cfe-92f1-2c12ef5a33a2",
                    "uuid": "961cec0e-34b0-4154-a302-2637b07512cd"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "7feec1a3-c686-4cfa-bbbd-735beaeda404",
                    "uuid": "6c0cf2c0-ea1c-4ae0-be70-2f844e566dc3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "6c0cf2c0-ea1c-4ae0-be70-2f844e566dc3",
                    "uuid": "e20d5c63-4d5f-48e5-8d25-c1d4d81377ba"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "6c0cf2c0-ea1c-4ae0-be70-2f844e566dc3",
                    "uuid": "eb5474d0-9054-432b-add2-a9226e7b676d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "3a98823f-5724-401f-9712-ec03a186ca8a",
                    "uuid": "eb5474d0-9054-432b-add2-a9226e7b676d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "3a98823f-5724-401f-9712-ec03a186ca8a",
                    "uuid": "e20d5c63-4d5f-48e5-8d25-c1d4d81377ba"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "3a98823f-5724-401f-9712-ec03a186ca8a",
                    "uuid": "a842caa9-dbe6-44e7-badc-ec466cf9d1f1"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:07Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-02.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:53Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-02",
                "emmc": "true",
                "enabled": "false",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-02",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833607",
            "uid": "1b3f73f7-de17-46e5-b47a-7f0fad9d27e0"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-09T15:47:14Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T04:59:35Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-02-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "36222364-c3f3-4003-a977-e77464fcb4f2"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "36222364-c3f3-4003-a977-e77464fcb4f2",
                    "uuid": "e6e6432a-5745-4a3c-8235-9e790398d194"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "e6e6432a-5745-4a3c-8235-9e790398d194",
                    "uuid": "c4e10a9c-1d8b-44d9-ba64-75664114c5d7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "e6e6432a-5745-4a3c-8235-9e790398d194",
                    "uuid": "5b4beef6-fea9-43c7-a322-01e32318c032"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "e6e6432a-5745-4a3c-8235-9e790398d194",
                    "uuid": "e2480663-8e78-412b-9c26-f20241f97a0c"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "e2480663-8e78-412b-9c26-f20241f97a0c",
                    "uuid": "ab46733e-e042-40f1-851b-10d87204e6be"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "e6e6432a-5745-4a3c-8235-9e790398d194",
                    "uuid": "d1e8252c-d6af-4ce6-b1b3-c9260164472d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "d1e8252c-d6af-4ce6-b1b3-c9260164472d",
                    "uuid": "30d90811-4c2b-414a-bcf5-157414393496"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "e6e6432a-5745-4a3c-8235-9e790398d194",
                    "uuid": "c76d72e7-b3b7-4668-9603-527b44676895"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "c76d72e7-b3b7-4668-9603-527b44676895",
                    "uuid": "5b4beef6-fea9-43c7-a322-01e32318c032"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "c76d72e7-b3b7-4668-9603-527b44676895",
                    "uuid": "c4e10a9c-1d8b-44d9-ba64-75664114c5d7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "36222364-c3f3-4003-a977-e77464fcb4f2",
                    "uuid": "c4e10a9c-1d8b-44d9-ba64-75664114c5d7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "36222364-c3f3-4003-a977-e77464fcb4f2",
                    "uuid": "5b4beef6-fea9-43c7-a322-01e32318c032"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "36222364-c3f3-4003-a977-e77464fcb4f2",
                    "uuid": "620af9cf-b10c-4510-b835-b114105890e5"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:07Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-03.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:49Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-03",
                "emmc": "true",
                "enabled": "false",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-03",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833631",
            "uid": "f736584b-c059-407a-991d-3c5f08d15a81"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-06T08:14:24Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T02:49:12Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-03-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "d3a9a237-6753-4c72-a41b-0c815b8a532d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "d3a9a237-6753-4c72-a41b-0c815b8a532d",
                    "uuid": "58974811-f63d-4852-8ec6-570992f9dfec"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "58974811-f63d-4852-8ec6-570992f9dfec",
                    "uuid": "3c833149-f6b6-4928-a4ce-c74f7874c4d3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "58974811-f63d-4852-8ec6-570992f9dfec",
                    "uuid": "53e52d52-403a-4f9e-af04-150adef77dce"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "58974811-f63d-4852-8ec6-570992f9dfec",
                    "uuid": "8409e733-97b3-40ed-afe1-cb93daa4ffe3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "8409e733-97b3-40ed-afe1-cb93daa4ffe3",
                    "uuid": "cf9fa3c6-ece2-4f9a-9613-1d04ea699f14"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "58974811-f63d-4852-8ec6-570992f9dfec",
                    "uuid": "d1eca57b-f142-4cfc-a86e-30f8ad57079a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "d1eca57b-f142-4cfc-a86e-30f8ad57079a",
                    "uuid": "d86be321-8901-4cc7-a896-8dc4ab448ca3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "58974811-f63d-4852-8ec6-570992f9dfec",
                    "uuid": "2d11e8ca-04a0-49c9-96e3-4475b0ad72dd"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "2d11e8ca-04a0-49c9-96e3-4475b0ad72dd",
                    "uuid": "53e52d52-403a-4f9e-af04-150adef77dce"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "2d11e8ca-04a0-49c9-96e3-4475b0ad72dd",
                    "uuid": "3c833149-f6b6-4928-a4ce-c74f7874c4d3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "d3a9a237-6753-4c72-a41b-0c815b8a532d",
                    "uuid": "3c833149-f6b6-4928-a4ce-c74f7874c4d3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "d3a9a237-6753-4c72-a41b-0c815b8a532d",
                    "uuid": "53e52d52-403a-4f9e-af04-150adef77dce"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "d3a9a237-6753-4c72-a41b-0c815b8a532d",
                    "uuid": "e71cac70-ebbd-40f3-a307-8f74ef5a7f20"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:08Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-04.auto.eng.bos2.dc.redhat.com",
                "dead": "bzlotnik working on iSCSI drivers manually",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-07-07T09:44:37Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-04",
                "emmc": "true",
                "enabled": "false",
                "iscsi": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-04",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833652",
            "uid": "07306406-b231-4ada-a98b-406a1388b67c"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-11T00:53:32Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T00:53:31Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-04-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "49371551-4bad-43f6-9e13-44ca8e416964"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "49371551-4bad-43f6-9e13-44ca8e416964",
                    "uuid": "29ad1a99-63d1-436c-9cef-16d38760e294"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "29ad1a99-63d1-436c-9cef-16d38760e294",
                    "uuid": "30fbd5d0-696c-4378-a98c-af65f9b8f422"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "29ad1a99-63d1-436c-9cef-16d38760e294",
                    "uuid": "cb674e54-9a13-45fd-9869-83d21a3fd2b9"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "29ad1a99-63d1-436c-9cef-16d38760e294",
                    "uuid": "f1d31b23-5ca8-44b7-b6bc-5244148a41a8"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "f1d31b23-5ca8-44b7-b6bc-5244148a41a8",
                    "uuid": "436d1e82-899f-4a1a-bcc7-ce01ec3c88b5"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "29ad1a99-63d1-436c-9cef-16d38760e294",
                    "uuid": "64b5888e-e2e6-4207-9933-de13e8cbfc60"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "64b5888e-e2e6-4207-9933-de13e8cbfc60",
                    "uuid": "542df774-f92b-4207-b1ac-06f20b6caa33"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "29ad1a99-63d1-436c-9cef-16d38760e294",
                    "uuid": "e408c2bd-2eb2-486f-92f7-eaf74f6f9b9b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "e408c2bd-2eb2-486f-92f7-eaf74f6f9b9b",
                    "uuid": "cb674e54-9a13-45fd-9869-83d21a3fd2b9"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "e408c2bd-2eb2-486f-92f7-eaf74f6f9b9b",
                    "uuid": "30fbd5d0-696c-4378-a98c-af65f9b8f422"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "49371551-4bad-43f6-9e13-44ca8e416964",
                    "uuid": "30fbd5d0-696c-4378-a98c-af65f9b8f422"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "49371551-4bad-43f6-9e13-44ca8e416964",
                    "uuid": "cb674e54-9a13-45fd-9869-83d21a3fd2b9"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "49371551-4bad-43f6-9e13-44ca8e416964",
                    "uuid": "a96f3999-e4ac-4f79-a2b9-c0bf57a010f3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_iscsi.client.ISCSIServerClient",
                        "jumpstarter.dev/name": "iscsi"
                    },
                    "parent_uuid": "49371551-4bad-43f6-9e13-44ca8e416964",
                    "uuid": "0200d1bd-9de5-4aea-98f1-06d99e8dd3dc"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "0200d1bd-9de5-4aea-98f1-06d99e8dd3dc",
                    "uuid": "e77badc6-c5e9-49d4-98b2-c3096a9b6498"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:10Z",
            "leaseRef": {
                "name": "0198bbdb-5825-785a-ae18-c55830627ce7"
            }
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-05.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:55Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-05",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-05",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833590",
            "uid": "ff8a79e6-b1c8-4e3e-a385-aa1ddac1765c"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-06T07:59:01Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T07:01:53Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-05-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "dbc906f9-5193-4f42-9227-99487b616270"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "dbc906f9-5193-4f42-9227-99487b616270",
                    "uuid": "67773cf8-6aa6-46c9-84f3-6030f722c060"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "67773cf8-6aa6-46c9-84f3-6030f722c060",
                    "uuid": "0a695193-bbd8-4c9b-b7f6-743996b853f7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "67773cf8-6aa6-46c9-84f3-6030f722c060",
                    "uuid": "c9b8db84-19a1-4742-b44b-34e8b6ea9880"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "67773cf8-6aa6-46c9-84f3-6030f722c060",
                    "uuid": "7ee3696d-3237-4523-8d4c-756274c29ca4"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "7ee3696d-3237-4523-8d4c-756274c29ca4",
                    "uuid": "549bb8fd-1715-44c2-aa8d-149f37b98f67"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "67773cf8-6aa6-46c9-84f3-6030f722c060",
                    "uuid": "ed8cf57c-0f0e-4950-8b7f-147ea1fbac6f"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "ed8cf57c-0f0e-4950-8b7f-147ea1fbac6f",
                    "uuid": "9ecd01c9-c28b-4075-86b7-74b5b776ccef"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "67773cf8-6aa6-46c9-84f3-6030f722c060",
                    "uuid": "2fceafd4-c9a5-48f1-a294-a8680b6ab9cf"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "2fceafd4-c9a5-48f1-a294-a8680b6ab9cf",
                    "uuid": "c9b8db84-19a1-4742-b44b-34e8b6ea9880"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "2fceafd4-c9a5-48f1-a294-a8680b6ab9cf",
                    "uuid": "0a695193-bbd8-4c9b-b7f6-743996b853f7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "dbc906f9-5193-4f42-9227-99487b616270",
                    "uuid": "0a695193-bbd8-4c9b-b7f6-743996b853f7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "dbc906f9-5193-4f42-9227-99487b616270",
                    "uuid": "c9b8db84-19a1-4742-b44b-34e8b6ea9880"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "dbc906f9-5193-4f42-9227-99487b616270",
                    "uuid": "cc0fb959-e37c-4bb0-a115-edd082d9ea51"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:06Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-06.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:53Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-06",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-06",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833574",
            "uid": "c7146485-bede-41e5-96ff-ce41e35d894c"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-06T08:38:25Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T07:30:45Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-06-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "d13a277d-8c0f-45b0-96b0-b93ecaf55f5e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "d13a277d-8c0f-45b0-96b0-b93ecaf55f5e",
                    "uuid": "9200fa7c-aa0e-4651-8c83-95de45cf5853"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "9200fa7c-aa0e-4651-8c83-95de45cf5853",
                    "uuid": "4322b5f5-1e05-4670-8412-3185176ebb7d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "9200fa7c-aa0e-4651-8c83-95de45cf5853",
                    "uuid": "8a3ad4e3-2c03-4c6c-b761-22012e43a3ad"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "9200fa7c-aa0e-4651-8c83-95de45cf5853",
                    "uuid": "65a74b01-5053-4a3f-8367-56614c191588"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "65a74b01-5053-4a3f-8367-56614c191588",
                    "uuid": "1b14680c-e181-4109-b324-9f56076ed42d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "9200fa7c-aa0e-4651-8c83-95de45cf5853",
                    "uuid": "dcc086d5-516d-4c24-85b3-99a70bc883d0"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "dcc086d5-516d-4c24-85b3-99a70bc883d0",
                    "uuid": "d076c9f9-61cf-42e2-a8a5-fd503195fd15"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "9200fa7c-aa0e-4651-8c83-95de45cf5853",
                    "uuid": "4898cdb8-999d-42be-af9e-a2874eff3d74"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "4898cdb8-999d-42be-af9e-a2874eff3d74",
                    "uuid": "8a3ad4e3-2c03-4c6c-b761-22012e43a3ad"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "4898cdb8-999d-42be-af9e-a2874eff3d74",
                    "uuid": "4322b5f5-1e05-4670-8412-3185176ebb7d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "d13a277d-8c0f-45b0-96b0-b93ecaf55f5e",
                    "uuid": "4322b5f5-1e05-4670-8412-3185176ebb7d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "d13a277d-8c0f-45b0-96b0-b93ecaf55f5e",
                    "uuid": "8a3ad4e3-2c03-4c6c-b761-22012e43a3ad"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "d13a277d-8c0f-45b0-96b0-b93ecaf55f5e",
                    "uuid": "e7abcfe9-1faa-4196-bc00-848778b8d31e"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:05Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-07.auto.eng.bos2.dc.redhat.com",
                "dead": "at jkangas",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T08:54:04Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-07",
                "emmc": "true",
                "enabled": "false",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-07",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "42081711",
            "uid": "91bf7b17-0ce1-4ebb-8b97-1c41ddb267ce"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-08-15T08:54:04Z",
                    "message": "Never seen",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "False",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-08-15T08:54:04Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Unregister",
                    "status": "False",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-07-exporter"
            },
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-08.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:51Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-08",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-08",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833608",
            "uid": "b5fe3a35-bf2e-442e-a392-c443bcae9590"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-06T08:50:52Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T06:39:47Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-08-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "190b7a56-2011-401c-82dc-8afdb9120c91"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "190b7a56-2011-401c-82dc-8afdb9120c91",
                    "uuid": "39ead84d-2927-42e5-b467-ee62543abaff"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "39ead84d-2927-42e5-b467-ee62543abaff",
                    "uuid": "369ff3a0-923b-482c-a7f4-f3764b6463f6"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "39ead84d-2927-42e5-b467-ee62543abaff",
                    "uuid": "fe10e545-865d-4d8d-9258-843257540c1a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "39ead84d-2927-42e5-b467-ee62543abaff",
                    "uuid": "24eb7615-0be6-4a3b-a47b-f2564c30605e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "24eb7615-0be6-4a3b-a47b-f2564c30605e",
                    "uuid": "e490d73c-bf9f-4f93-8fec-9e8f2b5d8ea2"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "39ead84d-2927-42e5-b467-ee62543abaff",
                    "uuid": "c0585fc7-b66c-4356-8204-54aa18686081"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "c0585fc7-b66c-4356-8204-54aa18686081",
                    "uuid": "5365c306-fb03-4efe-a51a-70e8e077820f"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "39ead84d-2927-42e5-b467-ee62543abaff",
                    "uuid": "c0f0603a-71c3-4dea-bc89-1b2fd9795921"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "c0f0603a-71c3-4dea-bc89-1b2fd9795921",
                    "uuid": "fe10e545-865d-4d8d-9258-843257540c1a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "c0f0603a-71c3-4dea-bc89-1b2fd9795921",
                    "uuid": "369ff3a0-923b-482c-a7f4-f3764b6463f6"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "190b7a56-2011-401c-82dc-8afdb9120c91",
                    "uuid": "369ff3a0-923b-482c-a7f4-f3764b6463f6"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "190b7a56-2011-401c-82dc-8afdb9120c91",
                    "uuid": "fe10e545-865d-4d8d-9258-843257540c1a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "190b7a56-2011-401c-82dc-8afdb9120c91",
                    "uuid": "37535d43-c818-413e-97bf-c1b6141cd276"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:07Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-09.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:53Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-09",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-09",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833687",
            "uid": "c393b478-3caf-4cd4-b9fd-b3e7c36f9817"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-06T06:38:45Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T02:49:30Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-09-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "b046d2f8-a391-42c5-9138-e4046d942a19"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "b046d2f8-a391-42c5-9138-e4046d942a19",
                    "uuid": "43cdf430-08ec-4eb1-b391-39286fb3e9e3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "43cdf430-08ec-4eb1-b391-39286fb3e9e3",
                    "uuid": "59fcdea2-9873-4b87-9c5a-2e3fa0c48a92"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "43cdf430-08ec-4eb1-b391-39286fb3e9e3",
                    "uuid": "57af0e7f-11d9-49d0-b1f1-4304a874918a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "43cdf430-08ec-4eb1-b391-39286fb3e9e3",
                    "uuid": "a4d08b6f-2256-4608-be42-e9a052c70bd0"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "a4d08b6f-2256-4608-be42-e9a052c70bd0",
                    "uuid": "99abf8da-05ab-40f8-b0db-1292ce013250"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "43cdf430-08ec-4eb1-b391-39286fb3e9e3",
                    "uuid": "f4abe70a-f003-4183-bf3a-997513507729"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "f4abe70a-f003-4183-bf3a-997513507729",
                    "uuid": "4fa24721-459b-4ea6-9914-b218d61920c4"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "43cdf430-08ec-4eb1-b391-39286fb3e9e3",
                    "uuid": "ce523b79-1df1-4366-b959-53b6df3e7be0"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "ce523b79-1df1-4366-b959-53b6df3e7be0",
                    "uuid": "57af0e7f-11d9-49d0-b1f1-4304a874918a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "ce523b79-1df1-4366-b959-53b6df3e7be0",
                    "uuid": "59fcdea2-9873-4b87-9c5a-2e3fa0c48a92"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "b046d2f8-a391-42c5-9138-e4046d942a19",
                    "uuid": "59fcdea2-9873-4b87-9c5a-2e3fa0c48a92"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "b046d2f8-a391-42c5-9138-e4046d942a19",
                    "uuid": "57af0e7f-11d9-49d0-b1f1-4304a874918a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "b046d2f8-a391-42c5-9138-e4046d942a19",
                    "uuid": "ca3e2965-6c5f-48d6-bd69-3d15af70d40e"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:12Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-11.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:50Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-11",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-11",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833689",
            "uid": "1ce620de-2371-4be6-8acd-8e32d160e2ff"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T13:50:39Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T08:14:52Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-11-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "cf9dc393-9254-46e8-a40e-7378c113494e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "cf9dc393-9254-46e8-a40e-7378c113494e",
                    "uuid": "8c3b02cf-3659-44b6-adda-a8d19decfd8b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "8c3b02cf-3659-44b6-adda-a8d19decfd8b",
                    "uuid": "25c899e5-1038-4c18-b0a8-ee5d51dc3f25"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "8c3b02cf-3659-44b6-adda-a8d19decfd8b",
                    "uuid": "e4b21c00-f52b-46c7-9610-3674dc5e39e7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "8c3b02cf-3659-44b6-adda-a8d19decfd8b",
                    "uuid": "ce9fec05-30b7-4542-884b-7e2f9c6eaae0"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "ce9fec05-30b7-4542-884b-7e2f9c6eaae0",
                    "uuid": "2d0892d9-0945-42c9-8ee6-10e39b049f18"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "8c3b02cf-3659-44b6-adda-a8d19decfd8b",
                    "uuid": "94c6f721-d6ee-4231-9b1e-4ad9b93cee39"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "94c6f721-d6ee-4231-9b1e-4ad9b93cee39",
                    "uuid": "6bd90af8-2b3a-4d53-a910-54861a2f70ac"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "8c3b02cf-3659-44b6-adda-a8d19decfd8b",
                    "uuid": "59498f14-8c01-4304-bd7c-63d4150b02c4"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "59498f14-8c01-4304-bd7c-63d4150b02c4",
                    "uuid": "e4b21c00-f52b-46c7-9610-3674dc5e39e7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "59498f14-8c01-4304-bd7c-63d4150b02c4",
                    "uuid": "25c899e5-1038-4c18-b0a8-ee5d51dc3f25"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "cf9dc393-9254-46e8-a40e-7378c113494e",
                    "uuid": "25c899e5-1038-4c18-b0a8-ee5d51dc3f25"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "cf9dc393-9254-46e8-a40e-7378c113494e",
                    "uuid": "e4b21c00-f52b-46c7-9610-3674dc5e39e7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "cf9dc393-9254-46e8-a40e-7378c113494e",
                    "uuid": "67e13f30-6e7b-4e19-ab2b-54524946dd49"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:12Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-12.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:54Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-12",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-12",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833611",
            "uid": "2845a6c2-5770-4b9a-a8f9-447d17a468f1"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T15:12:23Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T04:36:14Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-12-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "828547cb-0b63-45f1-a58c-54de7672ce30"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "828547cb-0b63-45f1-a58c-54de7672ce30",
                    "uuid": "6096d0db-b891-41fa-8d17-a9a017ecc224"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "6096d0db-b891-41fa-8d17-a9a017ecc224",
                    "uuid": "5c7334b9-02e0-4e1f-a308-e288386285a5"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "6096d0db-b891-41fa-8d17-a9a017ecc224",
                    "uuid": "4798a0c9-4c12-4d2b-b10c-a3b924b970f7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "6096d0db-b891-41fa-8d17-a9a017ecc224",
                    "uuid": "1b7969d6-e10d-40af-bab0-4d630ee32d63"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "1b7969d6-e10d-40af-bab0-4d630ee32d63",
                    "uuid": "4935dad5-d0c6-44c4-ac57-a5dea889b67d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "6096d0db-b891-41fa-8d17-a9a017ecc224",
                    "uuid": "8600ae85-7468-47b2-a996-29afab2e4569"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "8600ae85-7468-47b2-a996-29afab2e4569",
                    "uuid": "88e4e869-d511-41d9-87ca-107002153892"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "6096d0db-b891-41fa-8d17-a9a017ecc224",
                    "uuid": "1cfead29-97c2-4c61-94f1-b28169c4c21a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "1cfead29-97c2-4c61-94f1-b28169c4c21a",
                    "uuid": "4798a0c9-4c12-4d2b-b10c-a3b924b970f7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "1cfead29-97c2-4c61-94f1-b28169c4c21a",
                    "uuid": "5c7334b9-02e0-4e1f-a308-e288386285a5"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "828547cb-0b63-45f1-a58c-54de7672ce30",
                    "uuid": "5c7334b9-02e0-4e1f-a308-e288386285a5"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "828547cb-0b63-45f1-a58c-54de7672ce30",
                    "uuid": "4798a0c9-4c12-4d2b-b10c-a3b924b970f7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "828547cb-0b63-45f1-a58c-54de7672ce30",
                    "uuid": "b9213725-6f35-4df7-8a06-53856daa16a3"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:07Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-13.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-07-11T15:04:00Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-13",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-13",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833554",
            "uid": "e8f51bf4-9654-49f0-a877-63b1f45e6760"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T17:43:52Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T01:55:58Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-13-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "d507b2aa-bdde-42bf-bf42-feeb608cde67"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "d507b2aa-bdde-42bf-bf42-feeb608cde67",
                    "uuid": "c752e9f6-c292-4c8c-bc1b-3df5dbf2392d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "c752e9f6-c292-4c8c-bc1b-3df5dbf2392d",
                    "uuid": "01dbf079-8f60-43ee-a984-a851532de56d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "c752e9f6-c292-4c8c-bc1b-3df5dbf2392d",
                    "uuid": "b6f54c33-b3bc-4a6b-a1cd-eca0b8967b5c"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "c752e9f6-c292-4c8c-bc1b-3df5dbf2392d",
                    "uuid": "3c50bce5-5d71-46a0-ad7c-a6d154b9b808"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "3c50bce5-5d71-46a0-ad7c-a6d154b9b808",
                    "uuid": "406b11a6-030c-4394-a755-8ae7b70ecffd"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "c752e9f6-c292-4c8c-bc1b-3df5dbf2392d",
                    "uuid": "15dda4ef-ddc3-4602-84a7-7427ced85f1e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "15dda4ef-ddc3-4602-84a7-7427ced85f1e",
                    "uuid": "090d8015-69a3-4d51-a54c-af080328560b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "c752e9f6-c292-4c8c-bc1b-3df5dbf2392d",
                    "uuid": "c56958b7-e436-425c-a520-6c6c23a59a89"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "c56958b7-e436-425c-a520-6c6c23a59a89",
                    "uuid": "b6f54c33-b3bc-4a6b-a1cd-eca0b8967b5c"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "c56958b7-e436-425c-a520-6c6c23a59a89",
                    "uuid": "01dbf079-8f60-43ee-a984-a851532de56d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "d507b2aa-bdde-42bf-bf42-feeb608cde67",
                    "uuid": "01dbf079-8f60-43ee-a984-a851532de56d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "d507b2aa-bdde-42bf-bf42-feeb608cde67",
                    "uuid": "b6f54c33-b3bc-4a6b-a1cd-eca0b8967b5c"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "d507b2aa-bdde-42bf-bf42-feeb608cde67",
                    "uuid": "fbacb16c-99a8-4c2a-b713-4ecb036f9ca3"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:04Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-14.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-07-07T14:38:56Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-14",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-14",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833692",
            "uid": "32d6872d-175f-4e42-9824-9e0973aed9f8"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T15:09:25Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T07:04:59Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-14-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "0e31831a-2020-4545-92a3-028e9128269a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "0e31831a-2020-4545-92a3-028e9128269a",
                    "uuid": "f0a38576-1af2-4452-9470-835d93047402"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "f0a38576-1af2-4452-9470-835d93047402",
                    "uuid": "3980caca-709c-4397-8dc4-a1b258db75c3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "f0a38576-1af2-4452-9470-835d93047402",
                    "uuid": "fc6f7e64-74e0-4694-87a4-11b1df259d71"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "f0a38576-1af2-4452-9470-835d93047402",
                    "uuid": "b54916c6-1c04-46ec-be37-20bce6d40ea9"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "b54916c6-1c04-46ec-be37-20bce6d40ea9",
                    "uuid": "552a2347-9dce-4ca7-a475-b038b469ebea"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "f0a38576-1af2-4452-9470-835d93047402",
                    "uuid": "8513328c-273d-4fea-924c-7465011fbfc7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "8513328c-273d-4fea-924c-7465011fbfc7",
                    "uuid": "2a2a42fb-4f2d-455f-ae8d-67cd4f61332a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "f0a38576-1af2-4452-9470-835d93047402",
                    "uuid": "12ace5f5-d858-4695-9ecd-56c6ee42a45f"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "12ace5f5-d858-4695-9ecd-56c6ee42a45f",
                    "uuid": "fc6f7e64-74e0-4694-87a4-11b1df259d71"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "12ace5f5-d858-4695-9ecd-56c6ee42a45f",
                    "uuid": "3980caca-709c-4397-8dc4-a1b258db75c3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "0e31831a-2020-4545-92a3-028e9128269a",
                    "uuid": "3980caca-709c-4397-8dc4-a1b258db75c3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "0e31831a-2020-4545-92a3-028e9128269a",
                    "uuid": "fc6f7e64-74e0-4694-87a4-11b1df259d71"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "0e31831a-2020-4545-92a3-028e9128269a",
                    "uuid": "48089b5d-0fd1-4348-847d-08f24526dd3e"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:13Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-15.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-07-07T14:18:55Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-15",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-15",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833649",
            "uid": "74f72b5d-bb16-462d-af8c-c74290e19995"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T13:55:18Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T05:16:24Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-15-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "c7260141-31e1-4a50-b52c-08a0adad431b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "c7260141-31e1-4a50-b52c-08a0adad431b",
                    "uuid": "12b2bf4f-06f6-4714-a107-49d9e79f5cab"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "12b2bf4f-06f6-4714-a107-49d9e79f5cab",
                    "uuid": "b5e776b7-bf69-4d05-9cca-ad0a4b5f573b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "12b2bf4f-06f6-4714-a107-49d9e79f5cab",
                    "uuid": "1e13e864-9166-4ead-bd93-3a2e066cdc77"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "12b2bf4f-06f6-4714-a107-49d9e79f5cab",
                    "uuid": "e6206776-7cfb-43ea-8e60-f4c3c9ca3122"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "e6206776-7cfb-43ea-8e60-f4c3c9ca3122",
                    "uuid": "5a841154-d54e-4c4f-b599-b4f82e948558"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "12b2bf4f-06f6-4714-a107-49d9e79f5cab",
                    "uuid": "49587fa4-ecbc-4042-8e33-867a1b560d24"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "49587fa4-ecbc-4042-8e33-867a1b560d24",
                    "uuid": "7ffcb66c-d8e3-41d4-9e65-a9aae78d0d3b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "12b2bf4f-06f6-4714-a107-49d9e79f5cab",
                    "uuid": "7a354b0c-4165-4dc6-bf8b-8e61366ec2aa"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "7a354b0c-4165-4dc6-bf8b-8e61366ec2aa",
                    "uuid": "1e13e864-9166-4ead-bd93-3a2e066cdc77"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "7a354b0c-4165-4dc6-bf8b-8e61366ec2aa",
                    "uuid": "b5e776b7-bf69-4d05-9cca-ad0a4b5f573b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "c7260141-31e1-4a50-b52c-08a0adad431b",
                    "uuid": "b5e776b7-bf69-4d05-9cca-ad0a4b5f573b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "c7260141-31e1-4a50-b52c-08a0adad431b",
                    "uuid": "1e13e864-9166-4ead-bd93-3a2e066cdc77"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "c7260141-31e1-4a50-b52c-08a0adad431b",
                    "uuid": "027c91d5-0830-4db6-b083-78fbd9477c1d"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:10Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-16.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-07-04T14:38:06Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-16",
                "emmc": "true",
                "enabled": "false",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-16",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833632",
            "uid": "f98e4fbf-c4e7-42e2-9c10-8fb692963fc3"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T14:15:37Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T08:46:48Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-16-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "cf2d6121-52ef-48cb-9c92-eb28ffad4c19"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "cf2d6121-52ef-48cb-9c92-eb28ffad4c19",
                    "uuid": "1c455563-646c-472c-9931-3cb6f6b7776a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "1c455563-646c-472c-9931-3cb6f6b7776a",
                    "uuid": "7459d150-7476-4e7c-b670-c093763fd34c"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "1c455563-646c-472c-9931-3cb6f6b7776a",
                    "uuid": "73b28522-f781-4e6c-9915-655164640abf"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "1c455563-646c-472c-9931-3cb6f6b7776a",
                    "uuid": "ebbb9958-a6e5-4765-bfca-7cfab6a50c9d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "ebbb9958-a6e5-4765-bfca-7cfab6a50c9d",
                    "uuid": "b78e4f5b-c74a-47be-b025-6c72afa57981"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "1c455563-646c-472c-9931-3cb6f6b7776a",
                    "uuid": "5b7bc982-a45f-4b09-86e4-02d1eb820d4b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "5b7bc982-a45f-4b09-86e4-02d1eb820d4b",
                    "uuid": "e109f2d7-2b86-4bce-949e-9d5cd090710e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "1c455563-646c-472c-9931-3cb6f6b7776a",
                    "uuid": "009c05fa-f384-4c3b-8a91-974ab88c354e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "009c05fa-f384-4c3b-8a91-974ab88c354e",
                    "uuid": "73b28522-f781-4e6c-9915-655164640abf"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "009c05fa-f384-4c3b-8a91-974ab88c354e",
                    "uuid": "7459d150-7476-4e7c-b670-c093763fd34c"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "cf2d6121-52ef-48cb-9c92-eb28ffad4c19",
                    "uuid": "7459d150-7476-4e7c-b670-c093763fd34c"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "cf2d6121-52ef-48cb-9c92-eb28ffad4c19",
                    "uuid": "73b28522-f781-4e6c-9915-655164640abf"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "cf2d6121-52ef-48cb-9c92-eb28ffad4c19",
                    "uuid": "ac5b8c3e-9a42-4c8e-bf04-cf1c98f85bcc"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:08Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-17.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:51Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-17",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-17",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833556",
            "uid": "37275343-e322-41e9-9a5d-6581ba536f94"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-06T06:37:36Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T06:19:18Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-17-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "b8f280c6-2817-4076-87b3-51b7d403dbe2"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "b8f280c6-2817-4076-87b3-51b7d403dbe2",
                    "uuid": "9479e0bc-3185-4437-a4df-b7a96cc9cdb5"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "9479e0bc-3185-4437-a4df-b7a96cc9cdb5",
                    "uuid": "c2043779-aae6-472d-8195-dddece40d0b8"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "9479e0bc-3185-4437-a4df-b7a96cc9cdb5",
                    "uuid": "469146b2-3412-469e-ac78-a693a667ec41"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "9479e0bc-3185-4437-a4df-b7a96cc9cdb5",
                    "uuid": "9a6e55c0-84e9-4430-9614-57235265ed27"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "9a6e55c0-84e9-4430-9614-57235265ed27",
                    "uuid": "9d987e71-a739-413a-a87a-49684a7d0b7d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "9479e0bc-3185-4437-a4df-b7a96cc9cdb5",
                    "uuid": "39255582-8e02-4741-87bb-82348abd6af1"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "39255582-8e02-4741-87bb-82348abd6af1",
                    "uuid": "13b24de2-94ac-4bbc-9267-c9b29f832e2e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "9479e0bc-3185-4437-a4df-b7a96cc9cdb5",
                    "uuid": "fc093ed3-4cf0-40dc-9cd1-cf155724dbe4"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "fc093ed3-4cf0-40dc-9cd1-cf155724dbe4",
                    "uuid": "469146b2-3412-469e-ac78-a693a667ec41"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "fc093ed3-4cf0-40dc-9cd1-cf155724dbe4",
                    "uuid": "c2043779-aae6-472d-8195-dddece40d0b8"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "b8f280c6-2817-4076-87b3-51b7d403dbe2",
                    "uuid": "c2043779-aae6-472d-8195-dddece40d0b8"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "b8f280c6-2817-4076-87b3-51b7d403dbe2",
                    "uuid": "469146b2-3412-469e-ac78-a693a667ec41"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "b8f280c6-2817-4076-87b3-51b7d403dbe2",
                    "uuid": "86211e57-c077-4e53-aa4a-1a80c443db5e"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:04Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-18.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:51Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-18",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-18",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833697",
            "uid": "917650c5-048b-4977-8664-7b7563369e9a"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T07:46:41Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T07:45:39Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-18-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "d7f528a5-bee1-4a54-87bd-c5dde2a0e4a5"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "d7f528a5-bee1-4a54-87bd-c5dde2a0e4a5",
                    "uuid": "fa7ea2a2-6d44-4776-a0b7-2aa982cbdd13"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "fa7ea2a2-6d44-4776-a0b7-2aa982cbdd13",
                    "uuid": "5c30bd72-aa0b-445d-9d4e-c314a5f9f175"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "fa7ea2a2-6d44-4776-a0b7-2aa982cbdd13",
                    "uuid": "24cd072e-2e75-4670-9081-4028c26f6acd"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "fa7ea2a2-6d44-4776-a0b7-2aa982cbdd13",
                    "uuid": "37d82a37-ee69-402d-b4f3-d2e9276534d8"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "37d82a37-ee69-402d-b4f3-d2e9276534d8",
                    "uuid": "737a5716-1e28-4c97-8b20-6c774c95c0bf"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "fa7ea2a2-6d44-4776-a0b7-2aa982cbdd13",
                    "uuid": "c9526280-81b4-4a6c-8544-0fbfca1296be"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "c9526280-81b4-4a6c-8544-0fbfca1296be",
                    "uuid": "9c135b4a-dc91-45a8-9a31-59ced1c83dc3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "fa7ea2a2-6d44-4776-a0b7-2aa982cbdd13",
                    "uuid": "b38af4e4-3952-438b-bbf7-2f835b4fc62b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "b38af4e4-3952-438b-bbf7-2f835b4fc62b",
                    "uuid": "24cd072e-2e75-4670-9081-4028c26f6acd"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "b38af4e4-3952-438b-bbf7-2f835b4fc62b",
                    "uuid": "5c30bd72-aa0b-445d-9d4e-c314a5f9f175"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "d7f528a5-bee1-4a54-87bd-c5dde2a0e4a5",
                    "uuid": "5c30bd72-aa0b-445d-9d4e-c314a5f9f175"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "d7f528a5-bee1-4a54-87bd-c5dde2a0e4a5",
                    "uuid": "24cd072e-2e75-4670-9081-4028c26f6acd"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "d7f528a5-bee1-4a54-87bd-c5dde2a0e4a5",
                    "uuid": "983a97ab-31d0-4f33-90eb-b71cf6b63b8c"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:13Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-19.auto.eng.bos2.dc.redhat.com",
                "dead": "faulty eMMC",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:55Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-19",
                "emmc": "true",
                "enabled": "false",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-19",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "42081738",
            "uid": "da2aedca-6213-49bd-bec4-c33ca4eb6d8c"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-08-15T09:44:55Z",
                    "message": "Never seen",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "False",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-08-15T09:44:55Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Unregister",
                    "status": "False",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-19-exporter"
            },
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-20.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:52Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-20",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-20",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833558",
            "uid": "a0fb4eda-6953-42c2-a4e0-75aefb95feb8"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-06T08:49:49Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T06:06:20Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-20-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "989ab9aa-061f-4dd4-8cb3-29b0e8778ece"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "989ab9aa-061f-4dd4-8cb3-29b0e8778ece",
                    "uuid": "12c1742a-c057-41c9-862c-1922e31ccd9d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "12c1742a-c057-41c9-862c-1922e31ccd9d",
                    "uuid": "5c22ab2d-f011-4f78-8894-bbbc87847a4d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "12c1742a-c057-41c9-862c-1922e31ccd9d",
                    "uuid": "b5329c67-33d8-49b1-9393-99cd5b9e025d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "12c1742a-c057-41c9-862c-1922e31ccd9d",
                    "uuid": "e5069052-ab8f-408a-a38c-bd39c77100a0"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "e5069052-ab8f-408a-a38c-bd39c77100a0",
                    "uuid": "24ffa1df-7b92-491f-b510-83add84df85d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "12c1742a-c057-41c9-862c-1922e31ccd9d",
                    "uuid": "f9e01736-8d6c-4016-a339-da601005d2a5"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "f9e01736-8d6c-4016-a339-da601005d2a5",
                    "uuid": "4ca6baf1-b0e5-4d56-b8fa-fc32bc829eb5"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "12c1742a-c057-41c9-862c-1922e31ccd9d",
                    "uuid": "e117e1ce-fd92-435b-9f61-176864f30af3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "e117e1ce-fd92-435b-9f61-176864f30af3",
                    "uuid": "b5329c67-33d8-49b1-9393-99cd5b9e025d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "e117e1ce-fd92-435b-9f61-176864f30af3",
                    "uuid": "5c22ab2d-f011-4f78-8894-bbbc87847a4d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "989ab9aa-061f-4dd4-8cb3-29b0e8778ece",
                    "uuid": "5c22ab2d-f011-4f78-8894-bbbc87847a4d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "989ab9aa-061f-4dd4-8cb3-29b0e8778ece",
                    "uuid": "b5329c67-33d8-49b1-9393-99cd5b9e025d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "989ab9aa-061f-4dd4-8cb3-29b0e8778ece",
                    "uuid": "64cc8005-6e2f-4b65-ae91-7b959d974b7d"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:04Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-21.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:55Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-21",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-21",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833629",
            "uid": "c671b007-4ff7-4d45-9f4e-2d0181205ebe"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-08T13:44:31Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T01:33:26Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-21-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "9f9b2156-e4ee-44ad-af83-a9e109cedc92"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "9f9b2156-e4ee-44ad-af83-a9e109cedc92",
                    "uuid": "a3f32b4a-8416-4c66-b815-2f471e7d9369"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "a3f32b4a-8416-4c66-b815-2f471e7d9369",
                    "uuid": "2a16c1a9-9f9e-4574-8f96-d25f898cd3a1"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "a3f32b4a-8416-4c66-b815-2f471e7d9369",
                    "uuid": "2f9ca85b-985e-4016-a402-e78f60e2ed51"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "a3f32b4a-8416-4c66-b815-2f471e7d9369",
                    "uuid": "cb9858a9-d87e-455c-8955-d8bf287a77f7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "cb9858a9-d87e-455c-8955-d8bf287a77f7",
                    "uuid": "d846a2a7-c86d-4c5e-8a4d-3fc490bea394"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "a3f32b4a-8416-4c66-b815-2f471e7d9369",
                    "uuid": "76d4524a-f70b-41a9-8c85-945a20cb1520"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "76d4524a-f70b-41a9-8c85-945a20cb1520",
                    "uuid": "873f29d3-8633-4a68-8d33-56387844ed3a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "a3f32b4a-8416-4c66-b815-2f471e7d9369",
                    "uuid": "8e7bfa87-4a4d-45f5-9cf3-7ada7897e672"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "8e7bfa87-4a4d-45f5-9cf3-7ada7897e672",
                    "uuid": "2f9ca85b-985e-4016-a402-e78f60e2ed51"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "8e7bfa87-4a4d-45f5-9cf3-7ada7897e672",
                    "uuid": "2a16c1a9-9f9e-4574-8f96-d25f898cd3a1"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "9f9b2156-e4ee-44ad-af83-a9e109cedc92",
                    "uuid": "2a16c1a9-9f9e-4574-8f96-d25f898cd3a1"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "9f9b2156-e4ee-44ad-af83-a9e109cedc92",
                    "uuid": "2f9ca85b-985e-4016-a402-e78f60e2ed51"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "9f9b2156-e4ee-44ad-af83-a9e109cedc92",
                    "uuid": "c6b4fcfa-c70f-4805-b7c8-86bd6f7e111a"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:08Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-22.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:49Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-22",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-22",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833589",
            "uid": "e6125518-eec8-4f00-bac2-830c0602ba4a"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-06T08:23:01Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T00:25:48Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-22-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "f185abd1-edf0-4c47-ba99-1d7cee753bca"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "f185abd1-edf0-4c47-ba99-1d7cee753bca",
                    "uuid": "ce9a279f-0630-4a41-9861-0f561a99941d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "ce9a279f-0630-4a41-9861-0f561a99941d",
                    "uuid": "8428e8ca-4457-4443-8aed-376e986e2835"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "ce9a279f-0630-4a41-9861-0f561a99941d",
                    "uuid": "0bb82cfc-c0e7-487b-a5d6-36203c161862"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "ce9a279f-0630-4a41-9861-0f561a99941d",
                    "uuid": "ddc2162d-03d8-4acd-98bf-ae36f647c126"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "ddc2162d-03d8-4acd-98bf-ae36f647c126",
                    "uuid": "c8e49086-fade-4c72-8625-c03d3adcc5bf"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "ce9a279f-0630-4a41-9861-0f561a99941d",
                    "uuid": "8d3d2b09-098a-43ff-b1cd-fed9e927ae70"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "8d3d2b09-098a-43ff-b1cd-fed9e927ae70",
                    "uuid": "6f2781cd-597a-46d1-99d4-d0c514a47959"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "ce9a279f-0630-4a41-9861-0f561a99941d",
                    "uuid": "bbfdcefa-f2ab-4a53-bb78-d582bee93594"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "bbfdcefa-f2ab-4a53-bb78-d582bee93594",
                    "uuid": "0bb82cfc-c0e7-487b-a5d6-36203c161862"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "bbfdcefa-f2ab-4a53-bb78-d582bee93594",
                    "uuid": "8428e8ca-4457-4443-8aed-376e986e2835"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "f185abd1-edf0-4c47-ba99-1d7cee753bca",
                    "uuid": "8428e8ca-4457-4443-8aed-376e986e2835"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "f185abd1-edf0-4c47-ba99-1d7cee753bca",
                    "uuid": "0bb82cfc-c0e7-487b-a5d6-36203c161862"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "f185abd1-edf0-4c47-ba99-1d7cee753bca",
                    "uuid": "401cabaa-f58c-4ebc-a1b1-831df8db8e48"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:05Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-23.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:57Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-23",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-23",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833562",
            "uid": "ebd4ad35-76d1-4e64-a324-b9bba08cfd43"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-06T08:22:29Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T07:19:57Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-23-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "85653a6b-a18a-4fdc-a77a-1a88c75c8677"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "85653a6b-a18a-4fdc-a77a-1a88c75c8677",
                    "uuid": "4a4ae391-fe8e-49f7-bcfe-f82fb6014286"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "4a4ae391-fe8e-49f7-bcfe-f82fb6014286",
                    "uuid": "4805cc0a-ded1-47d2-a020-271f5ad0bd69"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "4a4ae391-fe8e-49f7-bcfe-f82fb6014286",
                    "uuid": "3b3c4eda-71c9-4c26-bcba-cfb7d8378e54"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "4a4ae391-fe8e-49f7-bcfe-f82fb6014286",
                    "uuid": "ee59c3fc-6710-4810-b40f-82b82b742c27"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "ee59c3fc-6710-4810-b40f-82b82b742c27",
                    "uuid": "153412dc-5657-4b19-964f-0fbae3cf664a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "4a4ae391-fe8e-49f7-bcfe-f82fb6014286",
                    "uuid": "3af27751-ab4a-4834-9c59-7e7ed8886a08"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "3af27751-ab4a-4834-9c59-7e7ed8886a08",
                    "uuid": "2ef6d8d0-443b-443c-9cc1-6f479ec09069"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "4a4ae391-fe8e-49f7-bcfe-f82fb6014286",
                    "uuid": "78d0ac66-fdd3-4572-bb09-4eb72681694b"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "78d0ac66-fdd3-4572-bb09-4eb72681694b",
                    "uuid": "3b3c4eda-71c9-4c26-bcba-cfb7d8378e54"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "78d0ac66-fdd3-4572-bb09-4eb72681694b",
                    "uuid": "4805cc0a-ded1-47d2-a020-271f5ad0bd69"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "85653a6b-a18a-4fdc-a77a-1a88c75c8677",
                    "uuid": "4805cc0a-ded1-47d2-a020-271f5ad0bd69"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "85653a6b-a18a-4fdc-a77a-1a88c75c8677",
                    "uuid": "3b3c4eda-71c9-4c26-bcba-cfb7d8378e54"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "85653a6b-a18a-4fdc-a77a-1a88c75c8677",
                    "uuid": "11d892b4-a140-4669-9c0e-ae1dd5f2079a"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:04Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-24.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:50Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-24",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-24",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833622",
            "uid": "42539cd4-7b0f-49da-8cda-847294956906"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-06T06:02:59Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T08:28:17Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-24-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "5823ef61-2c4b-47f6-a099-4f4c4f4d7691"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "5823ef61-2c4b-47f6-a099-4f4c4f4d7691",
                    "uuid": "fe776a07-9a5c-4d92-a0f1-b4e832b1b0a0"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "fe776a07-9a5c-4d92-a0f1-b4e832b1b0a0",
                    "uuid": "47322e71-ff7e-4eed-9993-6195188ef7d5"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "fe776a07-9a5c-4d92-a0f1-b4e832b1b0a0",
                    "uuid": "d6ecaa2b-0296-43e3-8ca9-89d8e13e22e6"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "fe776a07-9a5c-4d92-a0f1-b4e832b1b0a0",
                    "uuid": "d1bf4010-0d6b-464a-8073-c956108d802a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "d1bf4010-0d6b-464a-8073-c956108d802a",
                    "uuid": "51b8ce94-d1cd-4df9-a77c-76ee193327c3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "fe776a07-9a5c-4d92-a0f1-b4e832b1b0a0",
                    "uuid": "1f7f99b7-4b50-4c0d-99a5-59ba87fef3ae"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "1f7f99b7-4b50-4c0d-99a5-59ba87fef3ae",
                    "uuid": "9b986274-c462-444b-921b-186b3f3cefba"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "fe776a07-9a5c-4d92-a0f1-b4e832b1b0a0",
                    "uuid": "8cdf8834-06bf-43ea-8da1-74ac10af1f94"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "8cdf8834-06bf-43ea-8da1-74ac10af1f94",
                    "uuid": "d6ecaa2b-0296-43e3-8ca9-89d8e13e22e6"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "8cdf8834-06bf-43ea-8da1-74ac10af1f94",
                    "uuid": "47322e71-ff7e-4eed-9993-6195188ef7d5"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "5823ef61-2c4b-47f6-a099-4f4c4f4d7691",
                    "uuid": "47322e71-ff7e-4eed-9993-6195188ef7d5"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "5823ef61-2c4b-47f6-a099-4f4c4f4d7691",
                    "uuid": "d6ecaa2b-0296-43e3-8ca9-89d8e13e22e6"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "5823ef61-2c4b-47f6-a099-4f4c4f4d7691",
                    "uuid": "36e742ac-f034-4e2d-9c48-27757d730892"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:07Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-25.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:52Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-25",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-25",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833623",
            "uid": "8e72e7b6-c2d3-49ec-bec5-86c33f63c878"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-06T06:04:48Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T00:02:25Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-25-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "8912b244-aad4-49bd-95d5-c72f312cbb27"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "8912b244-aad4-49bd-95d5-c72f312cbb27",
                    "uuid": "d905688a-bfaf-4d61-b62c-16334fadbd73"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "d905688a-bfaf-4d61-b62c-16334fadbd73",
                    "uuid": "b425b49d-9ea8-465f-b538-f6de003af026"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "d905688a-bfaf-4d61-b62c-16334fadbd73",
                    "uuid": "534296c2-a4c2-44ed-ab75-08c31ca31b6f"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "d905688a-bfaf-4d61-b62c-16334fadbd73",
                    "uuid": "fbc1c057-e436-4328-a976-b00b43a24706"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "fbc1c057-e436-4328-a976-b00b43a24706",
                    "uuid": "838ca840-e1cf-411e-af5f-9361d56f85a1"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "d905688a-bfaf-4d61-b62c-16334fadbd73",
                    "uuid": "3acc3023-9f5d-4303-a63b-df128f6bed54"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "3acc3023-9f5d-4303-a63b-df128f6bed54",
                    "uuid": "d4206e08-2911-4182-af61-4b22177bf85a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "d905688a-bfaf-4d61-b62c-16334fadbd73",
                    "uuid": "5be5943a-0e88-4e9b-adda-377673083068"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "5be5943a-0e88-4e9b-adda-377673083068",
                    "uuid": "534296c2-a4c2-44ed-ab75-08c31ca31b6f"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "5be5943a-0e88-4e9b-adda-377673083068",
                    "uuid": "b425b49d-9ea8-465f-b538-f6de003af026"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "8912b244-aad4-49bd-95d5-c72f312cbb27",
                    "uuid": "b425b49d-9ea8-465f-b538-f6de003af026"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "8912b244-aad4-49bd-95d5-c72f312cbb27",
                    "uuid": "534296c2-a4c2-44ed-ab75-08c31ca31b6f"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "8912b244-aad4-49bd-95d5-c72f312cbb27",
                    "uuid": "3f8d31bb-3077-4e6e-9233-aa4c3aefa4bc"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:08Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "beaker-instance": "ti-jacinto-j784s4xevm-26.auto.eng.bos2.dc.redhat.com",
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-08-15T09:44:54Z",
            "generation": 1,
            "labels": {
                "board-type": "j784s4evm",
                "cpu": "8",
                "device": "ti-jacinto-j784s4xevm-26",
                "emmc": "true",
                "enabled": "true",
                "location": "bos2",
                "ram": "32",
                "sd": "true"
            },
            "name": "ti-jacinto-j784s4xevm-26",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833633",
            "uid": "c8bd71c2-40aa-4a35-b620-eed8a556c1b7"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-06T08:32:39Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T07:40:33Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-j784s4xevm-26-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "c52872d3-cc3e-48fd-865d-bcc1402b2bdd"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "c52872d3-cc3e-48fd-865d-bcc1402b2bdd",
                    "uuid": "b9363656-b832-4511-9644-57891ff776b3"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "b9363656-b832-4511-9644-57891ff776b3",
                    "uuid": "076a10b5-d6fe-4a49-8e7b-3c15656d62f6"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "b9363656-b832-4511-9644-57891ff776b3",
                    "uuid": "f198827d-c572-4b58-b337-ecc2b0b60d80"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "b9363656-b832-4511-9644-57891ff776b3",
                    "uuid": "cf1db2e6-f6c5-4cd0-b763-bf3f80c27c7c"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "cf1db2e6-f6c5-4cd0-b763-bf3f80c27c7c",
                    "uuid": "27912d20-abdb-4905-8089-c053ffb64123"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "b9363656-b832-4511-9644-57891ff776b3",
                    "uuid": "e997afb9-a287-4bcd-8163-b25eaa30ae00"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "e997afb9-a287-4bcd-8163-b25eaa30ae00",
                    "uuid": "4506266c-1e6a-4d48-bd0e-7ad0b40d2a27"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "b9363656-b832-4511-9644-57891ff776b3",
                    "uuid": "9012cbc4-c4bb-41b0-975a-9e3bbd845aec"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "9012cbc4-c4bb-41b0-975a-9e3bbd845aec",
                    "uuid": "f198827d-c572-4b58-b337-ecc2b0b60d80"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "9012cbc4-c4bb-41b0-975a-9e3bbd845aec",
                    "uuid": "076a10b5-d6fe-4a49-8e7b-3c15656d62f6"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "c52872d3-cc3e-48fd-865d-bcc1402b2bdd",
                    "uuid": "076a10b5-d6fe-4a49-8e7b-3c15656d62f6"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "c52872d3-cc3e-48fd-865d-bcc1402b2bdd",
                    "uuid": "f198827d-c572-4b58-b337-ecc2b0b60d80"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "c52872d3-cc3e-48fd-865d-bcc1402b2bdd",
                    "uuid": "a8cd800d-c565-4382-a551-2246b81e4d02"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:09Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-07-02T14:33:26Z",
            "generation": 1,
            "labels": {
                "board-type": "ti-am69",
                "cpu": "8",
                "device": "ti-jacinto-sk-am69-01",
                "emmc": "true",
                "enabled": "true",
                "location": "brno-minilab1",
                "ram": "32",
                "sd": "false"
            },
            "name": "ti-jacinto-sk-am69-01",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833651",
            "uid": "9298c5e0-f357-4d33-9eeb-ef8b47058d0f"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-08-29T09:07:45Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T08:58:20Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-sk-am69-01-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "788185da-2ace-4258-807d-7e109cb9900e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "788185da-2ace-4258-807d-7e109cb9900e",
                    "uuid": "7c7a88b6-9823-4879-85bd-d1a54dc9b70e"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "7c7a88b6-9823-4879-85bd-d1a54dc9b70e",
                    "uuid": "2e27a101-cfaa-42de-a310-4623c23f228d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "7c7a88b6-9823-4879-85bd-d1a54dc9b70e",
                    "uuid": "6d0dd0f0-d11c-4a68-986e-51bf67b941f9"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "7c7a88b6-9823-4879-85bd-d1a54dc9b70e",
                    "uuid": "8502d354-6709-4132-a03c-cd5020de6c6f"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "8502d354-6709-4132-a03c-cd5020de6c6f",
                    "uuid": "bc1ad3c7-2515-4929-88d7-dc5af2c8c430"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "7c7a88b6-9823-4879-85bd-d1a54dc9b70e",
                    "uuid": "7873d41f-917a-4607-9b84-d9688c327a25"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "7873d41f-917a-4607-9b84-d9688c327a25",
                    "uuid": "a1acea68-0920-4db3-9097-6c22b1373d76"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "7c7a88b6-9823-4879-85bd-d1a54dc9b70e",
                    "uuid": "ec3211dc-48fd-48b7-8b67-2bb1b28905f7"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "ec3211dc-48fd-48b7-8b67-2bb1b28905f7",
                    "uuid": "6d0dd0f0-d11c-4a68-986e-51bf67b941f9"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "ec3211dc-48fd-48b7-8b67-2bb1b28905f7",
                    "uuid": "2e27a101-cfaa-42de-a310-4623c23f228d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "788185da-2ace-4258-807d-7e109cb9900e",
                    "uuid": "2e27a101-cfaa-42de-a310-4623c23f228d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "788185da-2ace-4258-807d-7e109cb9900e",
                    "uuid": "6d0dd0f0-d11c-4a68-986e-51bf67b941f9"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "788185da-2ace-4258-807d-7e109cb9900e",
                    "uuid": "bc27d633-811b-4b09-8e75-7e3693f94eef"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:10Z"
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Exporter",
        "metadata": {
            "annotations": {
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-07-07T09:43:09Z",
            "generation": 1,
            "labels": {
                "board-type": "ti-am69",
                "cpu": "8",
                "device": "ti-jacinto-sk-am69-02",
                "emmc": "true",
                "enabled": "true",
                "location": "brno-minilab1",
                "ram": "32",
                "sd": "false"
            },
            "name": "ti-jacinto-sk-am69-02",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74833637",
            "uid": "2bf88c3e-b6b4-42e8-81bf-cb34dc18b436"
        },
        "spec": {
            "username": ""
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-08-29T05:15:17Z",
                    "message": "Lase seen less than 1 minute ago",
                    "observedGeneration": 1,
                    "reason": "Seen",
                    "status": "True",
                    "type": "Online"
                },
                {
                    "lastTransitionTime": "2025-09-11T08:09:28Z",
                    "message": "",
                    "observedGeneration": 1,
                    "reason": "Register",
                    "status": "True",
                    "type": "Registered"
                }
            ],
            "credential": {
                "name": "ti-jacinto-sk-am69-02-exporter"
            },
            "devices": [
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_composite.client.CompositeClient"
                    },
                    "uuid": "e47da79e-ddbe-49d3-95f5-174bd433b6b2"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_flashers.client.BaseFlasherClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "e47da79e-ddbe-49d3-95f5-174bd433b6b2",
                    "uuid": "0c53c4e6-0b1b-4391-8500-a2ea61756354"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "0c53c4e6-0b1b-4391-8500-a2ea61756354",
                    "uuid": "6888b655-a0e3-49a0-b656-0c4b16eed32d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "0c53c4e6-0b1b-4391-8500-a2ea61756354",
                    "uuid": "dd28f99d-ef2b-4c63-aa96-b3f56e11246f"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_tftp.client.TftpServerClient",
                        "jumpstarter.dev/name": "tftp"
                    },
                    "parent_uuid": "0c53c4e6-0b1b-4391-8500-a2ea61756354",
                    "uuid": "1cbc4b88-1751-4537-acbd-3fed63944287"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "1cbc4b88-1751-4537-acbd-3fed63944287",
                    "uuid": "caa4cff3-4536-4b97-8774-7bc3a9c33c9c"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_http.client.HttpServerClient",
                        "jumpstarter.dev/name": "http"
                    },
                    "parent_uuid": "0c53c4e6-0b1b-4391-8500-a2ea61756354",
                    "uuid": "af07dab8-9ddc-4ecb-9880-dc9b7e047d1d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_opendal.client.OpendalClient",
                        "jumpstarter.dev/name": "storage"
                    },
                    "parent_uuid": "af07dab8-9ddc-4ecb-9880-dc9b7e047d1d",
                    "uuid": "666dd7ac-50bb-43fb-96a3-bf667145a601"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_uboot.client.UbootConsoleClient",
                        "jumpstarter.dev/name": "uboot"
                    },
                    "parent_uuid": "0c53c4e6-0b1b-4391-8500-a2ea61756354",
                    "uuid": "b417e0bc-4e7e-44e9-ac47-85b38b014c5a"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "b417e0bc-4e7e-44e9-ac47-85b38b014c5a",
                    "uuid": "dd28f99d-ef2b-4c63-aa96-b3f56e11246f"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "b417e0bc-4e7e-44e9-ac47-85b38b014c5a",
                    "uuid": "6888b655-a0e3-49a0-b656-0c4b16eed32d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_pyserial.client.PySerialClient",
                        "jumpstarter.dev/name": "serial"
                    },
                    "parent_uuid": "e47da79e-ddbe-49d3-95f5-174bd433b6b2",
                    "uuid": "6888b655-a0e3-49a0-b656-0c4b16eed32d"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_snmp.client.SNMPServerClient",
                        "jumpstarter.dev/name": "power"
                    },
                    "parent_uuid": "e47da79e-ddbe-49d3-95f5-174bd433b6b2",
                    "uuid": "dd28f99d-ef2b-4c63-aa96-b3f56e11246f"
                },
                {
                    "labels": {
                        "jumpstarter.dev/client": "jumpstarter_driver_network.client.NetworkClient",
                        "jumpstarter.dev/name": "ssh"
                    },
                    "parent_uuid": "e47da79e-ddbe-49d3-95f5-174bd433b6b2",
                    "uuid": "a848f8db-56e7-41f2-ad3b-d3711af9f25e"
                }
            ],
            "endpoint": "grpc.jumpstarter-lab.apps.rosa.auto-devcluster.bzdx.p3.openshiftapps.com:443",
            "lastSeen": "2025-09-11T09:10:09Z"
        }
    }
];

let mockLeasesData: Lease[] =  [
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Lease",
        "metadata": {
            "creationTimestamp": "2025-08-18T06:26:11Z",
            "generation": 3,
            "name": "0198bbdb-5825-785a-ae18-c55830627ce7",
            "namespace": "jumpstarter-lab",
            "ownerReferences": [
                {
                    "apiVersion": "jumpstarter.dev/v1alpha1",
                    "blockOwnerDeletion": true,
                    "controller": true,
                    "kind": "Exporter",
                    "name": "ti-jacinto-j784s4xevm-04",
                    "uid": "07306406-b231-4ada-a98b-406a1388b67c"
                }
            ],
            "resourceVersion": "64930160",
            "uid": "b300b5ab-fdad-466d-8397-3966b55e5c48"
        },
        "spec": {
            "clientRef": {
                "name": "bzlotnik"
            },
            "duration": "720h0m0s",
            "selector": {
                "matchLabels": {
                    "device": "ti-jacinto-j784s4xevm-04"
                }
            }
        },
        "status": {
            "beginTime": "2025-08-18T06:26:11Z",
            "conditions": [
                {
                    "lastTransitionTime": "2025-08-18T06:26:11Z",
                    "message": "An exporter has been acquired for the client",
                    "observedGeneration": 1,
                    "reason": "Ready",
                    "status": "True",
                    "type": "Ready"
                }
            ],
            "ended": false,
            "exporterRef": {
                "name": "ti-jacinto-j784s4xevm-04"
            }
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Lease",
        "metadata": {
            "creationTimestamp": "2025-09-02T21:13:58Z",
            "generation": 4,
            "name": "01990c47-87ef-701e-abf1-f2db333f7ef7",
            "namespace": "jumpstarter-lab",
            "ownerReferences": [
                {
                    "apiVersion": "jumpstarter.dev/v1alpha1",
                    "blockOwnerDeletion": true,
                    "controller": true,
                    "kind": "Exporter",
                    "name": "qti-snapdragon-ride4-sa8775p-03",
                    "uid": "cb061594-aff1-413f-bb42-f262c40caa8f"
                }
            ],
            "resourceVersion": "67541231",
            "uid": "0a14abfb-a658-4df3-a2bd-d4c0ebe57a6e"
        },
        "spec": {
            "clientRef": {
                "name": "sberg"
            },
            "duration": "240h0m0s",
            "selector": {
                "matchLabels": {
                    "board-type": "qc8775",
                    "enabled": "true"
                }
            }
        },
        "status": {
            "beginTime": "2025-09-02T21:13:58Z",
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-02T21:13:58Z",
                    "message": "An exporter has been acquired for the client",
                    "observedGeneration": 1,
                    "reason": "Ready",
                    "status": "True",
                    "type": "Ready"
                }
            ],
            "ended": false,
            "exporterRef": {
                "name": "qti-snapdragon-ride4-sa8775p-03"
            }
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Lease",
        "metadata": {
            "creationTimestamp": "2025-09-05T13:27:37Z",
            "generation": 1,
            "name": "01991a0f-a8b7-7085-b864-59025390bcc0",
            "namespace": "jumpstarter-lab",
            "ownerReferences": [
                {
                    "apiVersion": "jumpstarter.dev/v1alpha1",
                    "blockOwnerDeletion": true,
                    "controller": true,
                    "kind": "Exporter",
                    "name": "qti-snapdragon-ride4-sa8775p-23",
                    "uid": "3c470807-1f03-4468-9344-a5eaee41062d"
                }
            ],
            "resourceVersion": "67502207",
            "uid": "93a9a688-b2b2-4476-88b4-328ebbfdf2c6"
        },
        "spec": {
            "clientRef": {
                "name": "mskrivan"
            },
            "duration": "720h0m0s",
            "selector": {
                "matchLabels": {
                    "device": "qti-snapdragon-ride4-sa8775p-23"
                }
            }
        },
        "status": {
            "beginTime": "2025-09-05T13:27:37Z",
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-05T13:27:37Z",
                    "message": "An exporter has been acquired for the client",
                    "observedGeneration": 1,
                    "reason": "Ready",
                    "status": "True",
                    "type": "Ready"
                }
            ],
            "ended": false,
            "exporterRef": {
                "name": "qti-snapdragon-ride4-sa8775p-23"
            }
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Lease",
        "metadata": {
            "creationTimestamp": "2025-09-10T17:25:57Z",
            "generation": 1,
            "name": "019934a9-a61b-7436-9450-f164c8acfd17",
            "namespace": "jumpstarter-lab",
            "ownerReferences": [
                {
                    "apiVersion": "jumpstarter.dev/v1alpha1",
                    "blockOwnerDeletion": true,
                    "controller": true,
                    "kind": "Exporter",
                    "name": "qti-snapdragon-ride4-sa8775p-10",
                    "uid": "231d85a6-76e6-47b5-96cf-5ed5280ae280"
                }
            ],
            "resourceVersion": "74007664",
            "uid": "65884fec-61b3-4001-b3e4-b60564191313"
        },
        "spec": {
            "clientRef": {
                "name": "sbertram"
            },
            "duration": "24h0m0s",
            "selector": {
                "matchLabels": {
                    "device": "qti-snapdragon-ride4-sa8775p-10"
                }
            }
        },
        "status": {
            "beginTime": "2025-09-10T17:25:57Z",
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-10T17:25:57Z",
                    "message": "An exporter has been acquired for the client",
                    "observedGeneration": 1,
                    "reason": "Ready",
                    "status": "True",
                    "type": "Ready"
                }
            ],
            "ended": false,
            "exporterRef": {
                "name": "qti-snapdragon-ride4-sa8775p-10"
            }
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Lease",
        "metadata": {
            "creationTimestamp": "2025-09-10T15:37:52Z",
            "generation": 2,
            "labels": {
                "jumpstarter.dev/lease-ended": "true"
            },
            "name": "01993446-b0bb-773d-8d87-e603e93c72b1",
            "namespace": "jumpstarter-lab",
            "ownerReferences": [
                {
                    "apiVersion": "jumpstarter.dev/v1alpha1",
                    "blockOwnerDeletion": true,
                    "controller": true,
                    "kind": "Exporter",
                    "name": "renesas-rcar-s4-01",
                    "uid": "60825399-4e59-4f82-9c9c-551a17aad4a2"
                }
            ],
            "resourceVersion": "74101503",
            "uid": "9ca96a0e-741b-4002-81ad-ddb464990d34"
        },
        "spec": {
            "clientRef": {
                "name": "gjacob"
            },
            "duration": "30m0s",
            "release": true,
            "selector": {
                "matchLabels": {
                    "board-type": "renesas-rcar-s4",
                    "enabled": "true"
                }
            }
        },
        "status": {
            "beginTime": "2025-09-10T15:37:52Z",
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-10T16:07:52Z",
                    "message": "The lease has expired",
                    "observedGeneration": 1,
                    "reason": "Expired",
                    "status": "False",
                    "type": "Ready"
                }
            ],
            "endTime": "2025-09-10T16:07:52Z",
            "ended": true,
            "exporterRef": {
                "name": "renesas-rcar-s4-01"
            }
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Lease",
        "metadata": {
            "creationTimestamp": "2025-09-10T16:26:15Z",
            "generation": 2,
            "labels": {
                "jumpstarter.dev/lease-ended": "true"
            },
            "name": "01993473-0019-709d-988b-48b166f61570",
            "namespace": "jumpstarter-lab",
            "ownerReferences": [
                {
                    "apiVersion": "jumpstarter.dev/v1alpha1",
                    "blockOwnerDeletion": true,
                    "controller": true,
                    "kind": "Exporter",
                    "name": "ti-jacinto-j784s4xevm-09",
                    "uid": "c393b478-3caf-4cd4-b9fd-b3e7c36f9817"
                }
            ],
            "resourceVersion": "74007165",
            "uid": "8db65060-a474-496b-84a3-c3e3d5248970"
        },
        "spec": {
            "clientRef": {
                "name": "sbertram"
            },
            "duration": "1m0s",
            "selector": {
                "matchLabels": {
                    "device": "ti-jacinto-j784s4xevm-09"
                }
            }
        },
        "status": {
            "beginTime": "2025-09-10T16:26:15Z",
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-10T17:25:22Z",
                    "message": "The lease has expired",
                    "observedGeneration": 2,
                    "reason": "Expired",
                    "status": "False",
                    "type": "Ready"
                }
            ],
            "endTime": "2025-09-10T17:25:22Z",
            "ended": true,
            "exporterRef": {
                "name": "ti-jacinto-j784s4xevm-09"
            }
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Lease",
        "metadata": {
            "creationTimestamp": "2025-09-11T08:34:22Z",
            "generation": 2,
            "labels": {
                "jumpstarter.dev/lease-ended": "true"
            },
            "name": "019937e9-53c4-73c6-9c03-6e1666bcb6cd",
            "namespace": "jumpstarter-lab",
            "resourceVersion": "74802984",
            "uid": "c648b322-aea5-4b3a-b29f-8944cd71548e"
        },
        "spec": {
            "clientRef": {
                "name": "majopela"
            },
            "duration": "1h0m0s",
            "release": true,
            "selector": {
                "matchLabels": {
                    "device": "qti-snapdragon-ride4-sa8775p-03"
                }
            }
        },
        "status": {
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-11T08:34:22Z",
                    "message": "There are 1 approved exporters, but all of them are already leased",
                    "observedGeneration": 2,
                    "reason": "NotAvailable",
                    "status": "True",
                    "type": "Pending"
                },
                {
                    "lastTransitionTime": "2025-09-11T08:35:08Z",
                    "message": "The lease was marked for release",
                    "observedGeneration": 2,
                    "reason": "Released",
                    "status": "False",
                    "type": "Ready"
                }
            ],
            "endTime": "2025-09-11T08:35:08Z",
            "ended": true
        }
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "Lease",
        "metadata": {
            "creationTimestamp": "2025-09-11T08:36:04Z",
            "generation": 1,
            "labels": {
                "jumpstarter.dev/lease-ended": "true"
            },
            "name": "019937ea-e157-725a-bfc3-15543f675a4e",
            "namespace": "jumpstarter-lab",
            "ownerReferences": [
                {
                    "apiVersion": "jumpstarter.dev/v1alpha1",
                    "blockOwnerDeletion": true,
                    "controller": true,
                    "kind": "Exporter",
                    "name": "ti-jacinto-j784s4xevm-01",
                    "uid": "fbf5c463-9e8c-44b8-8f31-fa8f6ef1b654"
                }
            ],
            "resourceVersion": "74812402",
            "uid": "be35bbc7-5650-407c-988d-d7a3f1a4e908"
        },
        "spec": {
            "clientRef": {
                "name": "majopela"
            },
            "duration": "10m0s",
            "selector": {
                "matchLabels": {
                    "board-type": "j784s4evm"
                }
            }
        },
        "status": {
            "beginTime": "2025-09-11T08:36:04Z",
            "conditions": [
                {
                    "lastTransitionTime": "2025-09-11T08:46:04Z",
                    "message": "The lease has expired",
                    "observedGeneration": 1,
                    "reason": "Expired",
                    "status": "False",
                    "type": "Ready"
                }
            ],
            "endTime": "2025-09-11T08:46:04Z",
            "ended": true,
            "exporterRef": {
                "name": "ti-jacinto-j784s4xevm-01"
            }
        }
    }
];

// Mock clients data - derived from actual lease data
let mockClientsData: Client[] = [
    {
        apiVersion: "jumpstarter.dev/v1alpha1",
        kind: "Client",
        metadata: {
            name: "bzlotnik",
            namespace: "jumpstarter-lab",
            labels: {
                "environment": "production",
                "team": "platform"
            },
            annotations: {
                "managed-by": "jumpstarter-lab-config"
            },
            creationTimestamp: "2025-08-18T06:26:11Z",
            generation: 1,
            resourceVersion: "64930160",
            uid: "bzlotnik-client-uid"
        },
        spec: {
            username: "bzlotnik"
        },
        status: {
            credential: {
                name: "bzlotnik-credential"
            },
            endpoint: "grpc.jumpstarter-lab.apps.mycluster.com:443"
        }
    },
    {
        apiVersion: "jumpstarter.dev/v1alpha1",
        kind: "Client",
        metadata: {
            name: "sberg",
            namespace: "jumpstarter-lab",
            labels: {
                "environment": "production",
                "team": "platform"
            },
            annotations: {
                "managed-by": "jumpstarter-lab-config"
            },
            creationTimestamp: "2025-09-02T21:13:58Z",
            generation: 1,
            resourceVersion: "67541231",
            uid: "sberg-client-uid"
        },
        spec: {
            username: "sberg"
        },
        status: {
            credential: {
                name: "sberg-credential"
            },
            endpoint: "grpc.jumpstarter-lab.apps.mycluster.com:443"
        }
    },
    {
        apiVersion: "jumpstarter.dev/v1alpha1",
        kind: "Client",
        metadata: {
            name: "mskrivan",
            namespace: "jumpstarter-lab",
            labels: {
                "environment": "production",
                "team": "platform"
            },
            annotations: {
                "managed-by": "jumpstarter-lab-config"
            },
            creationTimestamp: "2025-09-05T13:27:37Z",
            generation: 1,
            resourceVersion: "67502207",
            uid: "mskrivan-client-uid"
        },
        spec: {
            username: "mskrivan"
        },
        status: {
            credential: {
                name: "mskrivan-credential"
            },
            endpoint: "grpc.jumpstarter-lab.apps.mycluster.com:443"
        }
    },
    {
        apiVersion: "jumpstarter.dev/v1alpha1",
        kind: "Client",
        metadata: {
            name: "sbertram",
            namespace: "jumpstarter-lab",
            labels: {
                "environment": "production",
                "team": "platform"
            },
            annotations: {
                "managed-by": "jumpstarter-lab-config"
            },
            creationTimestamp: "2025-09-10T17:25:57Z",
            generation: 1,
            resourceVersion: "74007664",
            uid: "sbertram-client-uid"
        },
        spec: {
            username: "sbertram"
        },
        status: {
            credential: {
                name: "sbertram-credential"
            },
            endpoint: "grpc.jumpstarter-lab.apps.mycluster.com:443"
        }
    },
    {
        apiVersion: "jumpstarter.dev/v1alpha1",
        kind: "Client",
        metadata: {
            name: "gjacob",
            namespace: "jumpstarter-lab",
            labels: {
                "environment": "production",
                "team": "platform"
            },
            annotations: {
                "managed-by": "jumpstarter-lab-config"
            },
            creationTimestamp: "2025-09-10T15:37:52Z",
            generation: 1,
            resourceVersion: "74101503",
            uid: "gjacob-client-uid"
        },
        spec: {
            username: "gjacob"
        },
        status: {
            endpoint: "grpc.jumpstarter-lab.apps.mycluster.com:443"
        }
    },
    {
        apiVersion: "jumpstarter.dev/v1alpha1",
        kind: "Client",
        metadata: {
            name: "majopela",
            namespace: "jumpstarter-lab",
            labels: {
                "environment": "production",
                "team": "platform"
            },
            annotations: {
                "managed-by": "jumpstarter-lab-config"
            },
            creationTimestamp: "2025-09-11T08:34:22Z",
            generation: 1,
            resourceVersion: "74802984",
            uid: "majopela-client-uid"
        },
        spec: {
            username: "majopela"
        },
        status: {
            credential: {
                name: "majopela-credential"
            },
            endpoint: "grpc.jumpstarter-lab.apps.mycluster.com:443"
        }
    }
];

// Data management functions
export const getExporters = (): Exporter[] => [...mockExportersData];
export const getLeases = (): Lease[] => [...mockLeasesData];
export const getClients = (): Client[] => [...mockClientsData];

export const addLease = (lease: Lease): void => {
  mockLeasesData = [lease, ...mockLeasesData];
};

export const updateLease = (updatedLease: Lease): void => {
  const index = mockLeasesData.findIndex(l => l.metadata.name === updatedLease.metadata.name);
  if (index !== -1) {
    mockLeasesData[index] = updatedLease;
  }
};

export const deleteLease = (leaseId: string): void => {
  mockLeasesData = mockLeasesData.filter(l => l.metadata.name !== leaseId);
};

export const addExporter = (exporter: Exporter): void => {
  mockExportersData = [exporter, ...mockExportersData];
};

export const updateExporter = (updatedExporter: Exporter): void => {
  const index = mockExportersData.findIndex(e => e.metadata.name === updatedExporter.metadata.name);
  if (index !== -1) {
    mockExportersData[index] = updatedExporter;
  }
};

export const deleteExporter = (exporterName: string): void => {
  mockExportersData = mockExportersData.filter(e => e.metadata.name !== exporterName);
};

export const addClient = (client: Client): void => {
  mockClientsData = [client, ...mockClientsData];
};

export const updateClient = (updatedClient: Client): void => {
  const index = mockClientsData.findIndex(c => c.metadata.name === updatedClient.metadata.name);
  if (index !== -1) {
    mockClientsData[index] = updatedClient;
  }
};

export const deleteClient = (clientName: string): void => {
  mockClientsData = mockClientsData.filter(c => c.metadata.name !== clientName);
};

// Mock LeaseTemplates data
let mockLeaseTemplatesData: LeaseTemplate[] = [
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "LeaseTemplate",
        "metadata": {
            "name": "nxp-imx8qxp-mek",
            "namespace": "jumpstarter-lab",
            "labels": {
                "board": "nxp-imx8qxp-mek",
                "vendor": "nxp",
                "category": "embedded",
                "aib-platform": "imx8qxp_mek"
            },
            "annotations": {
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-09-01T00:00:00Z",
            "generation": 1,
            "resourceVersion": "1",
            "uid": "exporter-type-nxp-imx8qxp-mek"
        },
        "spec": {
            "description": "NXP i.MX8QXP MEK (Multimedia Evaluation Kit) - High-performance embedded development board with ARM Cortex-A53 and Cortex-M4F cores",
            "exporterSelector": {
                "board": "nxp-imx8qxp-mek"
            },
            "base64Image": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQIAOAA4AAD//gAFTUVL/9sAQwAUDg8SDw0UEhASFxUUGB4yIR4cHB49LC4kMklATEtHQEZFUFpzYlBVbVZFRmSIZW13e4GCgU5gjZeMfZZzfoF8/9sAQwEVFxceGh47ISE7fFNGU3x8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8/8IAEQgAgACAAwERAAIRAQMRAf/EABoAAAIDAQEAAAAAAAAAAAAAAAIDAQQABQb/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/9oADAMBAAIQAxAAAAG4VrFwtTjUEMoIgdZYIBJW+cu5UAqYIwsMhYRwdhKFkx2Jrn2JQMbHWZoLIlIkLN1k1JERZ2ZrnIiaCGbyor5oUQI2LNiVdYcsXPXmufFfN1aypqBm41CFFyw6wMbU7Odc3OlJG8wJxqvY2oFhRY1DsgXYcvczebjovWDsWUlXB1gYKn2Olr7xBJ6DGuVpEBEVUlUGHGNqMssZ1W3mUdm9vOuZqV7GSiAJlHUyOlCyKPNDUJMd7GudSIOlSzYmUd5MdmiSBKZCTqdnN51lam5oGpdkEWW86RZEsBxNRZ2c3nVWQwZTIoLGxqUWM2CVqjLOxFOWpZNTmhYZIFJ1Dh2bhYVHL0ynFSrkPloWW5ckVzN5mUJbNgw+VhdqqQTEyqstmBKlHFYsVMWgw6IxjGMYxjGMYrCy6f/EACQQAAEEAQQDAQEBAQAAAAAAAAECAAMRIRIxMxAyE0EiIxQw/9oACAEBAAEFAlyEH3rap117ltM67VOq/cppnWAZl371sTraJFKKpVJV7yxKotBtEx/qyPzli2XnrLyw7Ly/11Hxy8jPiBfRYw/t9UH9y8unHxy8v1TAerQVr1kPU9RaVkq3dMPDB/UfHL53b0hm6X1Vunu0eQPWQ7YyqPjn8nXSy/vYYw9Yerq3Fxyp/p9VTLk8nqeplNNO/wA3V3FxzH+2GkkgteVdEsAyKKdJvA8hu416Cg2iXlxTvKtq6q2Py1WXs9RBdF04uOTlPiNw1bdJID3dNIIBSA1JDBag4uKQXLdHNWA92U4KKSlBUEokQ1eXizkCnYeS4uOfzYXh/S6tp/L9xI3K46SuIhKtGhocPFIP0VUwgqfqU1JVrKVVpLopG7D+btOWmPU8ocXHIf0QHFs5ebQ9DlSTGD3uxhoiKh/nU4xSFoJPpBaQQ6a0FUvR2ijoyx2FhRUEHUtNuIUlOpjb/rLFrKYFAv8A/8QAIBEAAgIABgMAAAAAAAAAAAAAAREAMBBAIDFQAhJBUf/aAAgBAwEBPwHguut0AOH4KziA4TPGEW+pti+FOkGs4O8CK8UPIKKpTbNDMf/EAB8RAAICAgMAAwAAAAAAAAAAAAERABAwIDFAIQJRYf/aAAgBAgEBPwHqKlSiwnndQW9OIPfaOAwWSoPsx/kHyhycmcmjEsjgCHYGpDwCKhSxixCY3kcKNE4FFqsDpxwR4HOdDQsdEwWOp//EACcQAAIABQMDBQEBAAAAAAAAAAABERACITEgMkGRUWESIjChcQOB/9oACAEBAAY/Aqr4M/RnobqjL/03M3VGeo/dUbqjJn6N30ZNwmOeEYO5hS2o2qVonLlcp/ByvLmPxZKRisQnHRBud5oqIUmUd9EdC8l7KaKvL0XV9UdNJ4UrPRecB6aSqVzwR0QL6kVfBFZIuWNFIxyem07inSOMo6W1wcQIVbpRnYpHL06faZIkckSHaTvwUjcnA4IO7MGDEsEeBl5oqRzNG5m5kEYn2LEaaoI3CQ/aKJVEQnCxhmH0MPoXpF6UKNLgbbfhal9JP1Q+eKrdIo/0dpf/xAAnEAEAAgICAQQBBQEBAAAAAAABABEhMUFRYaFxkRCB4fCxwdHxMP/aAAgBAQABPyHB0NNR4pMOY3wn/KgNr2RoaccE/wCbNotvCeUXBHg+KEoyxyRcY1FUyxH7RxBlw61Ga2kQpP3UbQ2TewvmL+nlmwe0NUge6X+nh5ojlhPKTy+GF/ZBaGJW+J7iDePeUluXj7jviPP4Soe04q4CtxQI2rMpXE1sr3jgb+JgDiKtOJVqu3cEoWnpIwwTKAtRjVj3mgNxy6icKJGW4wyh3NQD4i4b3BWYg8t7icj4lEellksf5iKHZ6x0JJxuC2qHZLtSkJei4jVitpjbxLLb/FwG+XCIgjgfea5eCAD+J6WYB4Jo6UzF1DVmGX0A9iUAtj9U34hmB5cSjY2cxKVUxPznooz5FrHNu9QHk7xP6R+ieWGEIsM0ypY2TPwQxZ3KKE5hl+jOp6CAWF5hZjClEtuApRqcQyQKwZlcJfniPVtClMMtpv7rhS7lw7nRIbOCc4NwsghikcQXSFdMA5U9W4qpAK6ngZbpnooRv7lOqW0SZuMeBqcR3Ly9yjErzdS5uvyQx35lZar8wAgrMW6qKuIaDxCpsXEcp4nD081LHmJpWIRpKh55g43ygLr2WDIt9moDuuemY2TUwf7Hg9Z0tZnpoD8kQwJFzaOYZTcPBZWqYrk/MCOjn4jtJHSbe2JZyNkyINbJoxsbjBjMZanoJ45ASUy7UlbdwAJyTSP4nHffUzl/yVAMrJsMGX2VTGzk4L3EO3VFauMLGV05x9fWI5tyriGl9Kj9peK2bNMy3LcndYjY8y7cFKalup7m3E1Cwu51LM4xKpTbuoAy3DaKvUpWGn+4MEjaTP6EzBkjYQr3B5I2Q7uiDHhqhMlF6YHNTiqTPM/MsV1P5n/2QkB1zENQrrv6/9oADAMBAAIAAwAAABCBxTDLk2DuNvsf2VwN/FKewbxzm+QPyBz88v09iewIlO0sWVMZ+M33E+mbxWv3hN5XEmc/YG+eoIwICcv99XsXJ28ft4so+bPUZ/wFtiTQzJu6FjQS4k2bxFyACSSSSQT/xAAfEQADAAMAAwEBAQAAAAAAAAABABEQITFBIHFRYUD/2gAIAQMBAT8QSUHIwck7RtOBg9wP1rUFpSWtxt27RpCcFop9LiPxMO2MqRDGIfL4CQAwDMxUm4CG0dxZ/Eh0ONDqUbR68e4HdtH6+cc+2n6xSjTfsY1uKhEgJPEmlMwPcJyE9xp0j2BGYPfUYJaWtPMIxiHyh8pQWpQUbSkLoliQUcfLX+4mCECooSglrC7QkVjxEHMQ18sSHTQnZRxnliMBBqQxmJCil6+EVldNRg9yeIwOYr8ZmIwWtbgcDqX5/j//xAAeEQADAAMBAQEBAQAAAAAAAAABABEhMRBBIFFAYf/aAAgBAgEBPxBA/UifI6BipwjI4eDXDnDBxKWECMMOg42USIic4CUcHAhD7wis5R9aGGtAQBFbyGJOxclOnTlaeRAiAUkjNp1wQUoAPZyEAmHB+kqBIOHWGG6fOHCPxAzHQ1wAcFzYP1nAYw8iUkCcZcQglqfn/WaSYO6SgYTQioqRn5zSE6fO4CCI0kzfTrgAhIMDAwHBY9aG8LYEviEhhQgSCU44F6nyQctqCE7QcMofZyoKDlIDgGNaQIALI1ETtBjU51OVfEIKc740GoLliMBO38JKcGUhEA0VoLY2hMGHWX1MmOyWCpHQYPShTjh2+MDk7bNdqeD1hYwp12YnSBCL7/H/AP/EACcQAQADAAIBAgYDAQEAAAAAAAERACExQVFxYYHBkaHhsfAQ0fEw/9oACAEBAAE/ECsQYjwH1pgQVOIVac7hLj/Q5imDjDksNgzjPl8X/va4XGHIYUWRrwm9WI6erGPuzMtjVglx5i8GkHjh62WYjs8MqAXhBB59vaqSIVQ5s0iCdc0vIEPtnN1AcyQHigYOPs2YJQ6k+9YlUJIH93Q7vBokI6yAFjTIPA2i+F4xQAzHGCyJ8VF1HiUmeiuoZBBykfOvHlw5ev3pKBlnUc0wWYOKJ9U/VUD26y5fLgR72UzEymJihICNcN9O7KQQnI9UJJM+zTil6vaqCHXU79ykE42SCxlwnSJaIBE9VEkTII8ccfanJomHD+7AkVdWMmiC8HuaZylfHOUBueWd2IMPUL+PnUkPD4fWmD6oExyJWjNRAM560QK+i2RiXRWU5G0ZAJFJZ/Gy0CNTMFh3KeJrhhPkk6/n0sjYM6TNLRiYSW+x48cWDiEwqxDt/PFCywDez/n8bh6EJh8aRCjVVA9HavJhlrPGNAInzBUiMhOUgVhwe9UKyFy+tVIt+9QTCsCef41ekj0By+uFDJFnm3ZsoC6YPnRAwmcea4Zcvggn9U4YJKJGdB+/iVQhgY2ywo8Jn3KZhBmX4rkFUyaKDPtWdwSzerE+b2UAEuHr/aKJDTDNr4YWdJ+dZuKfD82K6j0z537DU8oNW9tGgAWJ2D8XGaeyhxRBMr0jq446oAnaLGUe0lkAHZU2Jx5s+Bp1YuASYB3Gk/qjIklzdZhz/QUAV8B/S9CJ37FYoBzGPtUlsAQ96NNddc5QpnAY/nikgEcoAk7mlA0NFOLxgDKoAd1dEpnOGnC5Qnc+16A0zPFlOPDx6P8AQRiEYwly+ITHi64CTY3p+VgWwCGUl3frFVCzYspAB3JquhgguFKgPHi6jn3j5bQ8IHmHecbLc8Mu82NASOpqgiFhiakZb4KNx9Kn4b+onc+AcOGNIQgSYkhtwTdMDaSGp72Z2jMHE78L2ejusRCOUoGFwx1ZsgSQw+1RcizOrUTjTBE8VMKpTHhPzvkRqmJ/CgE0cw0DA+FZDki0Rm4WeMKtnJI5e+/Wo8C/DlQQyWKHNED9A5482dCGfNYlkbriaWgRhO7/AMvHGAfmPVqyiWkxOlMliJhCmU0QytBk6xMp8H5qu27Esf8AKBJkFJ47stmWmqyvKIEppRPIQkWEHmcbQIykPFj3bL6ZSmh5haQjFEwJmsVpHIY3tvrxUEIWUMYngYyvVSrIqx3tCKQTiDevrQHADxN4jEjsPe/WgTLEDwLlPt/RsxiDscvH8+FavQyB6/OjJ6DK0M7S8/iyJCMbNZoKSQvX5UwUZOZ+YqpEwVwEG0QjK6TSTInLLEUR4chHfTYoddnaXOtahBzPJOfWw/h47uuZp9kcP+VKqQw58Ww+axk/ViXIFIYBzx7Xncqmxlick+lhIhnRzE8UjYmZZnzZqAHw+9y9AWWJDmuUQaetmRBDIrg+LNEwfvZzHswRmViuwiHDUCOFqgQiZw1kks0/Fsx5xBMZCNiIAcdHPNnRKn3kWAezHUY+Vin1A7Ns/kbP5Ch5pDl/lNIjnczzSmZ6lmVr0RiS+diyvwZqMO+a4cpBAvxSorirBtTPI/rTSiEj/R/qLB4sHgvH/iOjIjj6tsizSD8Lt4v/2Q==",
            "documentation": "https://www.nxp.com/design/design-center/development-boards-and-designs/i-mx-evaluation-and-development-boards/i-mx-8quadxplus-multisensory-enablement-kit-mek:MCIMX8QXP-CPU",
            "flashCommand": "j storage flash {image}",
        },
        "status": {}
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "LeaseTemplate",
        "metadata": {
            "name": "nxp-s32g-vnp-rdb3",
            "namespace": "jumpstarter-lab",
            "labels": {
                "board": "nxp-s32g-vnp-rdb3",
                "vendor": "nxp",
                "category": "automotive",
                "aib-platform": "s32g_vnp_rdb3"
            },
            "annotations": {
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-09-01T00:00:00Z",
            "generation": 1,
            "resourceVersion": "1",
            "uid": "exporter-type-nxp-s32g-vnp-rdb3"
        },
        "spec": {
            "description": "NXP S32G-VNP-RDB3 - Automotive networking processor reference design board for vehicle networking applications",
            "exporterSelector": {
                "board": "nxp-s32g-vnp-rdb3"
            },
            "base64Image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
            "documentation": "https://www.nxp.com/products/processors-and-microcontrollers/arm-processors/s32g-processors/s32g274a-vehicle-network-processor:S32G274A",
            "flashCommand": "j storage flash {image}",
        },
        "status": {}
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "LeaseTemplate",
        "metadata": {
            "name": "ti-am69",
            "namespace": "jumpstarter-lab",
            "labels": {
                "board": "ti-am69",
                "vendor": "ti",
                "category": "embedded",
                "aib-platform": "tda4vm_sk"
            },
            "annotations": {
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-09-01T00:00:00Z",
            "generation": 1,
            "resourceVersion": "1",
            "uid": "exporter-type-ti-am69"
        },
        "spec": {
            "description": "Texas Instruments AM69 - High-performance Arm-based processor for edge AI and industrial applications",
            "exporterSelector": {
                "board": "ti-am69"
            },
            "base64Image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
            "documentation": "https://www.ti.com/product/AM69",
            "flashCommand": "j storage flash {image}",
        },
        "status": {}
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "LeaseTemplate",
        "metadata": {
            "name": "qc8775",
            "namespace": "jumpstarter-lab",
            "labels": {
                "board-type": "qc8775",
                "vendor": "qualcomm",
                "category": "embedded",
                "aib-platform": "ridesx4"
            },
            "annotations": {
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-09-01T00:00:00Z",
            "generation": 1,
            "resourceVersion": "1",
            "uid": "exporter-type-qc8775"
        },
        "spec": {
            "description": "Qualcomm QC8775 - High-performance embedded processor for IoT and edge computing applications",
            "exporterSelector": {
                "board-type": "qc8775"
            },
            "base64Image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
            "documentation": "https://www.qualcomm.com/products/application-processors/embedded-processors",
            "flashCommand": "j storage flash {image}",
        },
        "status": {}
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "LeaseTemplate",
        "metadata": {
            "name": "renesas-rcar-s4",
            "namespace": "jumpstarter-lab",
            "labels": {
                "board-type": "renesas-rcar-s4",
                "vendor": "renesas",
                "category": "automotive",
                "aib-platform": "rpi4"
            },
            "annotations": {
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-09-01T00:00:00Z",
            "generation": 1,
            "resourceVersion": "1",
            "uid": "exporter-type-renesas-rcar-s4"
        },
        "spec": {
            "description": "Renesas R-Car S4 - Automotive system-on-chip for next-generation vehicle computing platforms",
            "exporterSelector": {
                "board-type": "renesas-rcar-s4"
            },
            "base64Image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
            "documentation": "https://www.renesas.com/us/en/products/automotive-products/automotive-system-chips-socs/r-car-s4",
            "flashCommand": "dd if={image} of=/dev/mmcblk0 bs=1M status=progress"
        },
        "status": {}
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "LeaseTemplate",
        "metadata": {
            "name": "j784s4evm",
            "namespace": "jumpstarter-lab",
            "labels": {
                "board-type": "j784s4evm",
                "vendor": "ti",
                "category": "embedded",
                "aib-platform": "beagleplay"
            },
            "annotations": {
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-09-01T00:00:00Z",
            "generation": 1,
            "resourceVersion": "1",
            "uid": "exporter-type-j784s4evm"
        },
        "spec": {
            "description": "Texas Instruments J784S4EVM - Evaluation module for J784S4 SoC with quad Arm Cortex-A72 cores and dual Cortex-R5F cores",
            "exporterSelector": {
                "board-type": "j784s4evm"
            },
            "base64Image": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQIAOAA4AAD/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wgARCACoAMgDAREAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAMBAgQF/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/9oADAMBAAIQAxAAAAH0wAAAAAACigaAAAAAAAAAAMlJzrEdxoAAAAAAAAowRpAQSGpK7SQsAAAAAoGCEhSMspNrUsVmDvXoNgAAojNlEJGRpEDaYakTURW6lyyovQdhYAIyjhSs2Ors2mlspNEK6lswmlKSlzZ2nUADzUoiKW0nCFqS6gUYWdm5aFXKsnXmPRJADgTlIltNHQmiiyM5V9KopYiRMGy5c2SLCk53LYPMSjmBonNolusxyWiMs6kmiK3cR3NrCSHcdKjzy0gkktkIi4VcVXCRrRMdBuAsswmgujrJlsgk4K2dBymwlrk5ojNGiatRouhhBhdG09BdLR5aDaUuTSUtkckS3XQaMpa0UYNpa6k0dV1KDkjlss6DnKBIRxlOq2EoyUWUTR0LJUhCky2DJ5EZroTSFwkizHMdi85zpcSkx0LqrBGeMekdYBwnAdKWlLYjpt5pFshPE1aAABRzHQaAIDziVBks3ElvQSFgAAAAAAA40gklXmOhe+gAAAAAAAABgGjyDrO0AAAAAAAAAHIQp6CiwAAAAAAAAADhOU9csAAAAAAAAFAAFFgAAAAAAAAH/8QAJRAAAgIBAwQDAQEBAAAAAAAAAQIAEQMSECExIEETQCIEMDJQ/9oACAEBAAEFAvgXc8/FJqXwcqg6mYj4ZdRPYI+QzmiupMTUi/3uZMhWe1q1MZ4lLC0aXA8Xp33cELAT3LPaIcmqfaAbcwC4Vqa+AOCBKn2iGu4NxrEyPEhUiKolc1W4Aqp4lbdJq5trszG/dcM10Fa5xt52d9JrI0JdIrWL28iUCSgnRl6buKL3KM0zpB03f/N1FYEZStIplypW3ksasRGrsD6g0vbTOgnWXGi1b1cFmDbm4eRpGgmopMxtucB1EaZplCOlQHsMbfHeowHeoes8jiI4bfKOOk8ggo3B7CJp2Bog33k0aLTTpg6bZBRXpD06bA7GNFRjBhhUL2XK5iqTFuU5iLpG2ccLsv2UiCVsYAYoYCzfm5yRLiDn13AgG2oGDnciwbU8mY/rCbIUUOIouaBL0kG5kE42GN2gwCBQOx/8A1PzghN86zz2XRZwFyG599KYmpcKiVX8DgWwKG+YFkTHqfZhBNBaeiyuNV+EaTJ1nrMDifnfV8VhYUcR0KP+dNI+Jly6W99N8f8AQkUF3/5n/8QAHxEAAgECBwAAAAAAAAAAAAAAEQBAASEQIDBBYHBx/9oACAEDAQE/AeY0QiNZKUviYQynCsnaTWMWyYp0z35//8QAFBEBAAAAAAAAAAAAAAAAAAAAkP/aAAgBAgEBPwEDf//EACMQAAAGAgICAwEAAAAAAAAAABEBIQAgEDAxAkAiUUFQEmH/2gAIAQEABj8C+q/XHqbgI0PQQhkGZTsGApEGFBjRpPdrBLCW6BhIKA8Aes+qAVZmORQxByfiaSGtq0awQ2tpnKhiNqxxrJGR5tNWkFsa9QGlwrBTfuvVocAYQ/she2nFqjV6gchKQvyNiTIuL8jxhBGY/FpRATEzeukPwd6ZkZdgwZn1S4sk8ewXImQr9b//xAAkEAEAAgIBBAIDAQEAAAAAAAABABEhMUFhURBxQCCBkTChsf/aAAgBAQABPyH4ANGXp8YNolvObXBca4zFZ15+HsYeKdxU5G50AmGSLkV/WyXMoKFhltqLiDLDle4dWIbRYCVmNN7lzQVArJEOH8BC4rmjCNlFsx5u+0R0EIowUZrY9JfpPyJmKWNXWBlmnsRhFHrDoI768wbPqTeI83HULBEt5F7jrbiXL7RvB3o4qi5m24q1DpF30mSMvdL3KTBBrqKbmpyqzEG3MsTT6ry8ygCQrtmgaJmrMKGvDy8VbUsTlgbBO1DMmRXa5m90Sg6mYPqHaFjzBmamuUd7X9Luowkt21KG4JrFYfKQNk4gFdHrASf9mkIwAVD9Ja6Ia3uJkjYIflFJcg2X5UL2gvJLcSnmEVRmvFuFQyzDhO5HkEOkybYSszgS4xpJfqhbfgM2/Rcu0LIw7pwvnPFUuJlKQ5pQGLFGe5z2lY8BTFplrBR2mHOIlY/2c3cqklRes0JRcQgrdpjOYZ8W9KCOssOV4lIU0M3HHMtipfMv43KG4FdPILOmViMTiO5zForwFkG9PmSypbXHckFq5oE4gX4uYgeIjhRXKCbJ5ujrMKherK55lhhMmC5yik55b88D7l2wIWQin8RtckeJtZPcN5imtyoajYFaQYb23MABuJmwKgBotS3W5ZW10E4a/cwR55W4gWNnknXMbM8QsyzbyTMVApxCV3hvcSO/WY7+4AsiYFXzMHOb2hnH7oNlHN3NMPobE7SvVP45mY6XH0b2bl16Q9zruMrGIIx4eFXllIpztluR4O4DQr+CbZOkABo+lM3lSvQzErEOssqBRW/U4R7xH61AKNPhFSwMLWCC5So9bWJcEs5+KOaAYeM8Ae0dAq+/xaYLvcVzj5CLtEt4/IfiAGivif/aAAwDAQACAAMAAAAQAAAAAAAEkAAAAAAAAAAEIkAAAAAAAAEFLQEAAAAAAEhtp1IgAAEkklsInqYEAAAlapFNmb6eoAABIsgxjBbCgMAEqbogNuA4cg0As5ALCSlrLpMYAnBOPJkFeloAsDEtBt3ymZhJlYBBEsjQIgAJqQA0NBBWsgpi0HAAQlNFAB/6gEwAEQMDDEUAAAggACMs8EAAAAAAAArSQAAAAAAAAAAkQAAAAAAAAAAnkAAAAAAAAAAAUAAAAAAAAAkkEkkkkkkkkkn/xAAiEQADAAICAgIDAQAAAAAAAAABABEQITEgQFFBYTBQcWD/2gAIAQMBAT8Q/UA3x614fjw7guigJ8CpQU406Q+Gn+kg8t/EEi8JESjSWJ08tRpWYkPTHp3yvsgXhII57BmKUlvtrcTCDB00P0aUgdoLWj11+epGYjISHjMqAxH76FuK1jGaQUjfSEi4CATpKaHUdCOv9QcjNI2HblJDgNSBh6W4GS84uD1uEOLnhLGNjsjoccPLxilJQnaKnPOahIrOpZgekhGCMCpxGZDMnrWtbioFYEa7T80wUYPiUYJ8UvLKz9gP8N//xAAfEQACAQQCAwAAAAAAAAAAAAARAQAQMCBAMUEhUWD/2gAIAQIBAT8Q+XJ2nDDccI5iZjz7qKmyIFzYGAotR1NO8F6wdDDeVTktXi8aC26qw4rgwcXnQOCyFswwQWu7Y024aDSXhw0S9waoMA2X8N//xAAmEAEAAgIDAQABBAMBAQAAAAABEQAhMUFRYXEQIECBkaGxwTDR/9oACAEBAAE/EP8A3cEtnomOrH+H9sBNIggczXGESPKWtAB0sbKQNO/2SgStIUscGaok47a6NHEUWlg6roCPGAxY6YC85uNyJzREkZP/AEQ20CSZsxIkUFCu9WLVk6f/AIVsFJ4REUrjc7ixJeQYkOU1dNhghppi53TP+6oGfxpHADjr9bqgUxNARMpu/wBci5p8sTGIoDgD0/7SMNS53XGZcFcirJy1EJCYkKtoB2tKEoJjysIQ7GxyZZhFaILZksFMQ8jXEZSzm92PSyf4uaqowWB+WKYj9JJMQxmmYk8qcimcxNhjGEpwtCFy2Vjmr2oTD40EAF5ihwUts6rgDHFQqBgpjh/lYMEuYkrHk/TNWkQGmCmckTmZrQMxZ7rfKghxWatcvLOJGgm6vEaXn9ONWOlQwMzmgkzL8smCmwzZ8gJMtmMp4jFGGbBjwxGObDSCkFYJbHELkcUCxjmXB/FHyjT9sWnOT2lSInDnVcbqa7oyz3V7DK/ug8rI+XO/1MNlhNidRYQyHL+hFARyTYAMpxVOD6bMzWP4K9MR8rROzX4RHO6hEiXkBlWUgsy+1AxnZAiwqkOIJj7TRkAotmEgeXdXYD7NBUJHVDEwxn5WJGJy9WBCcdf9q8uZ3HNUpcajeKADT+V1SeHM9RWgkJVphHws+iNmy4O2yPHhqaBIS0ArIzK5sg4VYwskVgAHLsU/IgzeEzHLVD0YbFKQczZGElKFFPrV7ExEOws4HbiJrBLJwl/VVPkLIUnPuKBEQOpc/liBnIuymKV5zRVhxNWmeXdnBE4mxYhO7heEdXYRRqzkoQ9cWCZYxDFk0yNmAR9r2GjQE2aVTJXlLAQd0j4NrYAllyNEG+RxTOQQrR5ITYATOj2rJMJy0TPE55qBJr8YoZwflf8AMytkpBeiqIyY/wDlEMkLFlBGu6JFYAFzzSBEP91szChmCtDAD4pSZUuSRDcBgZ5KheUUYaLICd6ju5TTBjLZMFz1XkQf7KiMfZovlnKaixjDMfgGWki4swYfl5/WCpndUAYeY1Z3CcTR0SahBjkakkBh3V0hsskx5Zyyp/22aIBLzWT7VEn2ups4sQET8rHqMyurGWB2QsoYmBWKMqSmYNUzDXRzcDMyZ7/MJyGqAIYa5MEnHyrmz2P8Vg6pWxnPtYczYc0ScoerHRk48pgGHRXwQPdWnVk6oKlMFwDSSO6oiKHy44nSHdit3E1VwtOU4uUQd1KOFnlQDAAV5ADyOKJEmk/OsQRTWZMtAiEf5soJU3Shw8KnUNxnPytGRONVVMU4jMVaEpNrNzhgXgBUEA8Cw3qop5qYyI23/ABjFHCjLq57FgNflHkK4f4pA8SzKD6rleQjo/QGB61BBGVUquU8dXEH+CzAUc8UISSd3WZGflHQCkCbo5hORzdPQwcZucaUjMpYdzdtKgvg/WkkOrD6SyhxSxgID9Cl3Mcc01i5CM2TsEwRYMy+V846RcfahtGOOnlZhIkJxNVKZjDjFCijSc0A0B+xATZPtGcsae6GkMSzcUzAdy2HHnAcftYoZjJQYD7UkhrhO2ESJWTqIcv2uT8hXR5RolgZIZ8oyCc/t0LTGpWBAT4Uwfs58bPjZ8bPjVkhV0L8EWfGz42fGz42fGz42fGz42fGz42fGz42fGz42fGz42fGz42fG//Z",
            "documentation": "https://www.ti.com/tool/J784S4EVM",
            "flashCommand": "dd if={image} of=/dev/mmcblk0 bs=1M status=progress"
        },
        "status": {}
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "LeaseTemplate",
        "metadata": {
            "name": "qemu-generic",
            "namespace": "jumpstarter-lab",
            "labels": {
                "board-type": "qemu",
                "vendor": "generic",
                "category": "simulation",
                "aib-platform": "qemu"
            },
            "annotations": {
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-09-01T00:00:00Z",
            "generation": 1,
            "resourceVersion": "1",
            "uid": "exporter-type-qemu-generic"
        },
        "spec": {
            "description": "QEMU Generic - Virtual machine for testing and development of automotive images",
            "exporterSelector": {
                "board-type": "qemu"
            },
            "base64Image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
            "documentation": "https://www.qemu.org/",
            "flashCommand": "qemu-img convert -f qcow2 {image} -O raw /dev/sda"
        },
        "status": {}
    },
    {
        "apiVersion": "jumpstarter.dev/v1alpha1",
        "kind": "LeaseTemplate",
        "metadata": {
            "name": "rpi4-model-b",
            "namespace": "jumpstarter-lab",
            "labels": {
                "board-type": "rpi4",
                "vendor": "raspberry-pi",
                "category": "embedded",
                "aib-platform": "rpi4"
            },
            "annotations": {
                "managed-by": "jumpstarter-lab-config"
            },
            "creationTimestamp": "2025-09-01T00:00:00Z",
            "generation": 1,
            "resourceVersion": "1",
            "uid": "exporter-type-rpi4-model-b"
        },
        "spec": {
            "description": "Raspberry Pi 4 Model B - Popular single-board computer for IoT and embedded development",
            "exporterSelector": {
                "board-type": "rpi4"
            },
            "base64Image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
            "documentation": "https://www.raspberrypi.org/products/raspberry-pi-4-model-b/",
            "flashCommand": "dd if={image} of=/dev/mmcblk0 bs=1M status=progress"
        },
        "status": {}
    }
];

// LeaseTemplates data access functions
export const getLeaseTemplates = (): LeaseTemplate[] => {
    return mockLeaseTemplatesData;
};

export const getLeaseTemplate = (name: string): LeaseTemplate | undefined => {
    return mockLeaseTemplatesData.find(lt => lt.metadata.name === name);
};

export const getLeaseTemplateCount = (leaseTemplateName: string): number => {
    const leaseTemplate = getLeaseTemplate(leaseTemplateName);
    if (!leaseTemplate) return 0;
    
    const selector = leaseTemplate.spec.exporterSelector;
    return mockExportersData.filter(exporter => {
        return Object.entries(selector).every(([key, value]) => 
            exporter.metadata.labels[key] === value
        );
    }).length;
};

export const getLeaseTemplatesWithCounts = (): Array<LeaseTemplate & { count: number }> => {
    return mockLeaseTemplatesData.map(lt => ({
        ...lt,
        count: getLeaseTemplateCount(lt.metadata.name)
    }));
};

export const getLeaseTemplatesByLabels = (labels: Record<string, string>): LeaseTemplate[] => {
    return mockLeaseTemplatesData.filter(template => {
        return Object.entries(labels).every(([key, value]) => 
            template.metadata.labels[key] === value
        );
    });
};

export const getCompatibleLeaseTemplates = (aibPlatform: string): LeaseTemplate[] => {
    return getLeaseTemplatesByLabels({ 'aib-platform': aibPlatform });
};

// Build mock data based on automotive-image-builder targets
let mockBuildsData: Build[] = [
  {
    apiVersion: "aib.dev/v1alpha1",
    kind: "Build",
    metadata: {
      name: "build-autosd9-qemu-001",
      namespace: "jumpstarter-lab",
      labels: {
        "app": "automotive-image-builder",
        "distro": "autosd9",
        "target": "qemu",
        "architecture": "arm64"
      },
      annotations: {
        "description": "AutoSD 9 QEMU build for testing"
      },
      resourceVersion: "12345",
      generation: 1,
      creationTimestamp: "2025-01-15T10:30:00Z",
      uid: "build-001-uid"
    },
    spec: {
      description: "AutoSD 9 QEMU build for testing automotive applications",
      baseImage: "quay.io/centos-sig-automotive/automotive-image-builder:1.0.0",
      targetArchitecture: "arm64",
      buildSteps: [
        {
          name: "prepare-environment",
          command: "setup-build-env",
          args: ["--distro", "autosd9", "--arch", "arm64"]
        },
        {
          name: "install-packages",
          command: "install-rpms",
          args: ["--packages", "automotive-core", "qemu-guest-agent"]
        },
        {
          name: "configure-system",
          command: "configure-systemd",
          args: ["--enable", "qemu-guest-agent"]
        }
      ],
      environment: {
        "BUILD_TYPE": "automotive",
        "TARGET_PLATFORM": "qemu",
        "DISTRO_VERSION": "autosd9"
      },
      outputFormat: "qcow2",
      registry: {
        url: "quay.io/jumpstarter-lab",
        namespace: "builds"
      }
    },
    status: {
      phase: "succeeded",
      startTime: "2025-01-15T10:30:15Z",
      completionTime: "2025-01-15T11:45:30Z",
      conditions: [
        {
          type: "BuildStarted",
          status: "True",
          lastTransitionTime: "2025-01-15T10:30:15Z",
          reason: "BuildInitiated",
          message: "Build process started successfully"
        },
        {
          type: "BuildCompleted",
          status: "True",
          lastTransitionTime: "2025-01-15T11:45:30Z",
          reason: "BuildSucceeded",
          message: "Build completed successfully"
        }
      ],
      buildLogs: "Build started...\nInstalling packages...\nConfiguring system...\nBuild completed successfully",
      imageUrl: "quay.io/jumpstarter-lab/builds/build-autosd9-qemu-001:latest"
    }
  },
  {
    apiVersion: "aib.dev/v1alpha1",
    kind: "Build",
    metadata: {
      name: "build-rhivos1-ridesx4-002",
      namespace: "jumpstarter-lab",
      labels: {
        "app": "automotive-image-builder",
        "distro": "rhivos1",
        "target": "ridesx4",
        "architecture": "arm64"
      },
      annotations: {
        "description": "RHIVOS 1 RIDESX4 build for automotive development"
      },
      resourceVersion: "12346",
      generation: 1,
      creationTimestamp: "2025-01-15T14:20:00Z",
      uid: "build-002-uid"
    },
    spec: {
      description: "RHIVOS 1 build for QC RIDESX4 automotive development board",
      baseImage: "quay.io/centos-sig-automotive/automotive-image-builder:1.0.0",
      targetArchitecture: "arm64",
      buildSteps: [
        {
          name: "prepare-environment",
          command: "setup-build-env",
          args: ["--distro", "rhivos1", "--arch", "arm64"]
        },
        {
          name: "install-automotive-packages",
          command: "install-rpms",
          args: ["--packages", "automotive-core", "stmmac-mac-generator"]
        },
        {
          name: "configure-aboot",
          command: "configure-aboot",
          args: ["--enable", "aboot", "--dtb", "qcom/sa8775p-ride.dtb"]
        }
      ],
      environment: {
        "BUILD_TYPE": "automotive",
        "TARGET_PLATFORM": "ridesx4",
        "DISTRO_VERSION": "rhivos1",
        "ABOOT_ENABLED": "true"
      },
      outputFormat: "aboot",
      registry: {
        url: "quay.io/jumpstarter-lab",
        namespace: "builds"
      }
    },
    status: {
      phase: "succeeded",
      startTime: "2025-01-15T14:20:10Z",
      completionTime: "2025-01-15T15:45:30Z",
      conditions: [
        {
          type: "BuildSucceeded",
          status: "True",
          lastTransitionTime: "2025-01-15T15:45:30Z",
          reason: "BuildCompleted",
          message: "Build completed successfully"
        }
      ],
      buildLogs: "Build started...\nInstalling automotive packages...\nConfiguring aboot...\nBuild completed successfully",
      imageUrl: "quay.io/jumpstarter-lab/builds/build-rhivos1-ridesx4-002:latest"
    }
  },
  {
    apiVersion: "aib.dev/v1alpha1",
    kind: "Build",
    metadata: {
      name: "build-f40-s32g-003",
      namespace: "jumpstarter-lab",
      labels: {
        "app": "automotive-image-builder",
        "distro": "f40",
        "target": "s32g_vnp_rdb3",
        "architecture": "arm64"
      },
      annotations: {
        "description": "Fedora 40 S32G build for vehicle networking"
      },
      resourceVersion: "12347",
      generation: 1,
      creationTimestamp: "2025-01-15T16:00:00Z",
      uid: "build-003-uid"
    },
    spec: {
      description: "Fedora 40 build for NXP S32G3 Vehicle Networking Reference Design Board",
      baseImage: "quay.io/centos-sig-automotive/automotive-image-builder:1.0.0",
      targetArchitecture: "arm64",
      buildSteps: [
        {
          name: "prepare-environment",
          command: "setup-build-env",
          args: ["--distro", "f40", "--arch", "arm64"]
        },
        {
          name: "install-networking-packages",
          command: "install-rpms",
          args: ["--packages", "automotive-core", "networking-tools"]
        },
        {
          name: "configure-grub2-sbl",
          command: "configure-grub2-sbl",
          args: ["--console", "ttyLF0,115200"]
        }
      ],
      environment: {
        "BUILD_TYPE": "automotive",
        "TARGET_PLATFORM": "s32g_vnp_rdb3",
        "DISTRO_VERSION": "f40"
      },
      outputFormat: "ext4"
    },
    status: {
      phase: "succeeded",
      startTime: "2025-01-15T16:00:05Z",
      completionTime: "2025-01-15T17:30:20Z",
      conditions: [
        {
          type: "BuildSucceeded",
          status: "True",
          lastTransitionTime: "2025-01-15T17:30:20Z",
          reason: "BuildCompleted",
          message: "Build completed successfully"
        }
      ],
      buildLogs: "Build started...\nInstalling networking packages...\nConfiguring networking...\nBuild completed successfully",
      imageUrl: "quay.io/jumpstarter-lab/builds/build-f40-s32g-003:latest"
    }
  },
  {
    apiVersion: "aib.dev/v1alpha1",
    kind: "Build",
    metadata: {
      name: "build-f41-imx8qxp-004",
      namespace: "jumpstarter-lab",
      labels: {
        "app": "automotive-image-builder",
        "distro": "f41",
        "target": "imx8qxp_mek",
        "architecture": "arm64"
      },
      annotations: {
        "description": "Fedora 41 i.MX 8QXP MEK build"
      },
      resourceVersion: "12348",
      generation: 1,
      creationTimestamp: "2025-01-15T18:00:00Z",
      uid: "build-004-uid"
    },
    spec: {
      description: "Fedora 41 build for Multisensory Enablement Kit i.MX 8QuadXPlus MEK CPU Board",
      baseImage: "quay.io/centos-sig-automotive/automotive-image-builder:1.0.0",
      targetArchitecture: "arm64",
      buildSteps: [
        {
          name: "prepare-environment",
          command: "setup-build-env",
          args: ["--distro", "f41", "--arch", "arm64"]
        },
        {
          name: "install-board-support",
          command: "install-rpms",
          args: ["--packages", "automotive-core", "nxp-board-support"]
        },
        {
          name: "configure-grub2-sbl",
          command: "configure-grub2-sbl",
          args: ["--console", "ttyLP0,115200", "--earlycon"]
        }
      ],
      environment: {
        "BUILD_TYPE": "automotive",
        "TARGET_PLATFORM": "imx8qxp_mek",
        "DISTRO_VERSION": "f41"
      },
      outputFormat: "ext4"
    },
    status: {
      phase: "succeeded",
      startTime: "2025-01-15T18:00:10Z",
      completionTime: "2025-01-15T19:30:45Z",
      conditions: [
        {
          type: "BuildStarted",
          status: "True",
          lastTransitionTime: "2025-01-15T18:00:10Z",
          reason: "BuildInitiated",
          message: "Build process started successfully"
        },
        {
          type: "BuildCompleted",
          status: "True",
          lastTransitionTime: "2025-01-15T19:30:45Z",
          reason: "BuildSucceeded",
          message: "Build completed successfully"
        }
      ],
      buildLogs: "Build started...\nInstalling board support packages...\nConfiguring grub2-sbl...\nBuild completed successfully",
      imageUrl: "quay.io/jumpstarter-lab/builds/build-f41-imx8qxp-004:latest"
    }
  },
  {
    apiVersion: "aib.dev/v1alpha1",
    kind: "Build",
    metadata: {
      name: "build-eln-rpi4-005",
      namespace: "jumpstarter-lab",
      labels: {
        "app": "automotive-image-builder",
        "distro": "eln",
        "target": "rpi4",
        "architecture": "arm64"
      },
      annotations: {
        "description": "Fedora ELN Raspberry Pi 4 build"
      },
      resourceVersion: "12349",
      generation: 1,
      creationTimestamp: "2025-01-15T20:00:00Z",
      uid: "build-005-uid"
    },
    spec: {
      description: "Fedora ELN build for Raspberry Pi 4",
      baseImage: "quay.io/centos-sig-automotive/automotive-image-builder:1.0.0",
      targetArchitecture: "arm64",
      buildSteps: [
        {
          name: "prepare-environment",
          command: "setup-build-env",
          args: ["--distro", "eln", "--arch", "arm64"]
        },
        {
          name: "install-rpi-packages",
          command: "install-rpms",
          args: ["--packages", "pi4-firmware-blob", "pi_resize"]
        },
        {
          name: "configure-grub2",
          command: "configure-grub2",
          args: ["--partition-label", "dos"]
        }
      ],
      environment: {
        "BUILD_TYPE": "automotive",
        "TARGET_PLATFORM": "rpi4",
        "DISTRO_VERSION": "eln"
      },
      outputFormat: "ext4"
    },
    status: {
      phase: "succeeded",
      startTime: "2025-01-15T20:00:10Z",
      completionTime: "2025-01-15T21:15:30Z",
      conditions: [
        {
          type: "BuildSucceeded",
          status: "True",
          lastTransitionTime: "2025-01-15T21:15:30Z",
          reason: "BuildCompleted",
          message: "Build completed successfully"
        }
      ],
      buildLogs: "Build started...\nInstalling RPI packages...\nConfiguring grub2...\nBuild completed successfully",
      imageUrl: "quay.io/jumpstarter-lab/builds/build-eln-rpi4-005:latest"
    }
  },
  {
    apiVersion: "aib.dev/v1alpha1",
    kind: "Build",
    metadata: {
      name: "build-autosd9-beagleplay-006",
      namespace: "jumpstarter-lab",
      labels: {
        "app": "automotive-image-builder",
        "distro": "autosd9",
        "target": "beagleplay",
        "architecture": "arm64"
      },
      annotations: {
        "description": "AutoSD 9 BeaglePlay build for embedded development"
      },
      resourceVersion: "12350",
      generation: 1,
      creationTimestamp: "2025-01-16T08:00:00Z",
      uid: "build-006-uid"
    },
    spec: {
      description: "AutoSD 9 build for BeaglePlay embedded development board",
      baseImage: "quay.io/centos-sig-automotive/automotive-image-builder:1.0.0",
      targetArchitecture: "arm64",
      buildSteps: [
        {
          name: "prepare-environment",
          command: "setup-build-env",
          args: ["--distro", "autosd9", "--arch", "arm64"]
        },
        {
          name: "install-embedded-packages",
          command: "install-rpms",
          args: ["--packages", "automotive-core", "embedded-tools"]
        }
      ],
      environment: {
        "BUILD_TYPE": "automotive",
        "TARGET_PLATFORM": "beagleplay",
        "DISTRO_VERSION": "autosd9"
      },
      outputFormat: "ext4"
    },
    status: {
      phase: "running",
      startTime: "2025-01-16T08:00:10Z",
      conditions: [
        {
          type: "BuildStarted",
          status: "True",
          lastTransitionTime: "2025-01-16T08:00:10Z",
          reason: "BuildInitiated",
          message: "Build process started successfully"
        }
      ],
      buildLogs: "Build started...\nInstalling embedded packages...\nConfiguring system...",
      errorMessage: undefined
    }
  },
  {
    apiVersion: "aib.dev/v1alpha1",
    kind: "Build",
    metadata: {
      name: "build-f41-tda4vm-007",
      namespace: "jumpstarter-lab",
      labels: {
        "app": "automotive-image-builder",
        "distro": "f41",
        "target": "tda4vm_sk",
        "architecture": "arm64"
      },
      annotations: {
        "description": "Fedora 41 TDA4VM build for automotive AI"
      },
      resourceVersion: "12351",
      generation: 1,
      creationTimestamp: "2025-01-16T10:30:00Z",
      uid: "build-007-uid"
    },
    spec: {
      description: "Fedora 41 build for TI TDA4VM Starter Kit for automotive AI applications",
      baseImage: "quay.io/centos-sig-automotive/automotive-image-builder:1.0.0",
      targetArchitecture: "arm64",
      buildSteps: [
        {
          name: "prepare-environment",
          command: "setup-build-env",
          args: ["--distro", "f41", "--arch", "arm64"]
        },
        {
          name: "install-ai-packages",
          command: "install-rpms",
          args: ["--packages", "automotive-core", "ai-toolkit", "tda4vm-drivers"]
        }
      ],
      environment: {
        "BUILD_TYPE": "automotive",
        "TARGET_PLATFORM": "tda4vm_sk",
        "DISTRO_VERSION": "f41"
      },
      outputFormat: "ext4"
    },
    status: {
      phase: "failed",
      startTime: "2025-01-16T10:30:05Z",
      completionTime: "2025-01-16T10:45:20Z",
      conditions: [
        {
          type: "BuildStarted",
          status: "True",
          lastTransitionTime: "2025-01-16T10:30:05Z",
          reason: "BuildInitiated",
          message: "Build process started successfully"
        },
        {
          type: "BuildCompleted",
          status: "False",
          lastTransitionTime: "2025-01-16T10:45:20Z",
          reason: "BuildFailed",
          message: "Build failed due to missing AI toolkit dependencies"
        }
      ],
      buildLogs: "Build started...\nInstalling AI packages...\nError: Package ai-toolkit not found in repository\nBuild failed",
      errorMessage: "Package ai-toolkit not found in repository"
    }
  },
  {
    apiVersion: "aib.dev/v1alpha1",
    kind: "Build",
    metadata: {
      name: "build-eln-rpi4-008",
      namespace: "jumpstarter-lab",
      labels: {
        "app": "automotive-image-builder",
        "distro": "eln",
        "target": "rpi4",
        "architecture": "arm64"
      },
      annotations: {
        "description": "Fedora ELN Raspberry Pi 4 build for IoT applications"
      },
      resourceVersion: "12352",
      generation: 1,
      creationTimestamp: "2025-01-16T12:00:00Z",
      uid: "build-008-uid"
    },
    spec: {
      description: "Fedora ELN build for Raspberry Pi 4 IoT applications",
      baseImage: "quay.io/centos-sig-automotive/automotive-image-builder:1.0.0",
      targetArchitecture: "arm64",
      buildSteps: [
        {
          name: "prepare-environment",
          command: "setup-build-env",
          args: ["--distro", "eln", "--arch", "arm64"]
        },
        {
          name: "install-iot-packages",
          command: "install-rpms",
          args: ["--packages", "automotive-core", "iot-tools", "gpio-utils"]
        }
      ],
      environment: {
        "BUILD_TYPE": "automotive",
        "TARGET_PLATFORM": "rpi4",
        "DISTRO_VERSION": "eln"
      },
      outputFormat: "ext4"
    },
    status: {
      phase: "pending",
      conditions: [
        {
          type: "BuildCreated",
          status: "True",
          lastTransitionTime: "2025-01-16T12:00:00Z",
          reason: "BuildQueued",
          message: "Build queued for processing"
        }
      ],
      buildLogs: "Build queued for processing...",
      errorMessage: undefined
    }
  },
  {
    apiVersion: "aib.dev/v1alpha1",
    kind: "Build",
    metadata: {
      name: "build-rhivos1-qemu-009",
      namespace: "jumpstarter-lab",
      labels: {
        "app": "automotive-image-builder",
        "distro": "rhivos1",
        "target": "qemu",
        "architecture": "x86_64"
      },
      annotations: {
        "description": "RHIVOS 1 QEMU build for x86_64 testing"
      },
      resourceVersion: "12353",
      generation: 1,
      creationTimestamp: "2025-01-16T14:15:00Z",
      uid: "build-009-uid"
    },
    spec: {
      description: "RHIVOS 1 build for QEMU x86_64 testing environment",
      baseImage: "quay.io/centos-sig-automotive/automotive-image-builder:1.0.0",
      targetArchitecture: "x86_64",
      buildSteps: [
        {
          name: "prepare-environment",
          command: "setup-build-env",
          args: ["--distro", "rhivos1", "--arch", "x86_64"]
        },
        {
          name: "install-testing-packages",
          command: "install-rpms",
          args: ["--packages", "automotive-core", "testing-tools"]
        }
      ],
      environment: {
        "BUILD_TYPE": "automotive",
        "TARGET_PLATFORM": "qemu",
        "DISTRO_VERSION": "rhivos1"
      },
      outputFormat: "qcow2"
    },
    status: {
      phase: "succeeded",
      startTime: "2025-01-16T14:15:10Z",
      completionTime: "2025-01-16T15:30:45Z",
      conditions: [
        {
          type: "BuildSucceeded",
          status: "True",
          lastTransitionTime: "2025-01-16T15:30:45Z",
          reason: "BuildCompleted",
          message: "Build completed successfully"
        }
      ],
      buildLogs: "Build started...\nInstalling testing packages...\nConfiguring system...\nBuild completed successfully",
      imageUrl: "quay.io/jumpstarter-lab/builds/build-rhivos1-qemu-009:latest"
    }
  }
];

// Build data management functions
export const getBuilds = (): Build[] => [...mockBuildsData];

export const addBuild = (build: Build): void => {
  mockBuildsData.push(build);
};

export const updateBuild = (buildName: string, updates: Partial<Build>): void => {
  const index = mockBuildsData.findIndex(b => b.metadata.name === buildName);
  if (index !== -1) {
    mockBuildsData[index] = { ...mockBuildsData[index], ...updates };
  }
};

export const deleteBuild = (buildName: string): void => {
  mockBuildsData = mockBuildsData.filter(b => b.metadata.name !== buildName);
};

// Backward compatibility exports
export const mockExporters = mockExportersData;
export const mockLeases = mockLeasesData;
export const mockClients = mockClientsData;
export const mockBuilds = mockBuildsData;