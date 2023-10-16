import {Breadcrumbs, Button, Grid, InputAdornment, LinearProgress, TextField, Typography} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import * as React from "react";
import Box from "@mui/material/Box";
import {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import colorConfigs from "../../configs/colorConfigs";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import DialogBox, {DialogBoxMode} from "../../components/common/DialogBox";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateEditRole, {RoleMode} from "../../components/common/CreateEditRole";
import Drawer from "@mui/material/Drawer";

type RoleDataGridPageModel = {
    page: number,
    pageSize: number
}

export type UserRole = {
    id: number | null,
    role: string,
    userCount: number,
    permissionCount: number,
    rolePermissions: RolePermission[];
}

export type RolePermission = {
    id?: number;
    permissionName: string;
}

const roleArray: UserRole[] = [
    { id: 1, role: "Admin-User-View", userCount: 3, permissionCount: 1, rolePermissions: [] },
    { id: 2, role: "Admin-User-View-Edit", userCount: 10, permissionCount: 3, rolePermissions: [] },
    { id: 3, role: "Admin-User-View-Edit-Delete", userCount: 7, permissionCount: 5, rolePermissions: [] },
    { id: 4, role: "Admin-Roles", userCount: 2, permissionCount: 7, rolePermissions: [] },
    { id: 5, role: "Manager-Roles", userCount: 5, permissionCount: 4, rolePermissions: [] },
    { id: 6, role: "Sales-Roles", userCount: 4, permissionCount: 2, rolePermissions: [] },
    { id: 7, role: "Service-Roles", userCount: 6, permissionCount: 6, rolePermissions: [] }
];

const RoleManagement = () => {
    const [roles, setRoles] = useState<UserRole[]>(roleArray);
    const [selectedRole, setSelectedRole] = useState<UserRole>({id: null, role: "", userCount: 0, permissionCount: 0, rolePermissions: []});
    const [openNewRole, setOpenNewRole] = useState<boolean>(false);
    const [openEditRole, setOpenEditRole] = useState<boolean>(false);
    const [openDeleteRoleBox, setOpenDeleteRoleBox] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [dataGridLoading, setDataGridLoading] = useState<boolean>(false);
    const [roleDataGridPageModel, setRoleDataGridPageModel] = useState<RoleDataGridPageModel>({ page: 0, pageSize: 5 });

    const columns: GridColDef[] = [
        {
            field: 'role',
            headerName: 'Role Name',
            type: 'string',
            flex: 1,
            minWidth: 200,
            renderHeader: (params) => {
                return <strong>{params.colDef.headerName}</strong>
            },
            sortable: true,
            disableColumnMenu: true
        },
        {
            field: 'userCount',
            headerName: 'User Count',
            type: 'number',
            flex: 1,
            minWidth: 100,
            renderHeader: (params) => {
                return <strong>{params.colDef.headerName}</strong>
            },
            sortable: true,
            disableColumnMenu: true,
            headerAlign: "left",
            align: "left"
        },
        {
            field: 'permissionCount',
            headerName: 'Permission Count',
            type: 'number',
            flex: 1,
            minWidth: 130,
            renderHeader: (params) => {
                return <strong>{params.colDef.headerName}</strong>
            },
            sortable: true,
            disableColumnMenu: true,
            headerAlign: "left",
            align: "left"
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            sortable: false,
            disableColumnMenu: true,
            flex: 1,
            minWidth: 150,
            renderHeader: (params) => {
                return <strong>{params.colDef.headerName}</strong>
            },
            renderCell: (params: any) => {
                return (
                    <>
                        <Tooltip title={'edit role'}>
                            <IconButton onClick={() => {
                                setSelectedRole((prevState) => {
                                    return {
                                        ...prevState,
                                        "id": params.row.id,
                                        "role": params.row.role,
                                        "userCount": params.row.userCount,
                                        "permissionCount": params.row.permissionCount,
                                        "rolePermissions": params.row.rolePermissions
                                    }
                                })
                                setOpenEditRole(true)
                            }}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'delete role'}>
                            <IconButton onClick={() => {
                                setSelectedRole((prevState) => {
                                    return {
                                        ...prevState,
                                        "id": params.row.id,
                                        "role": params.row.role,
                                        "userCount": params.row.userCount,
                                        "permissionCount": params.row.permissionCount,
                                        "rolePermissions": params.row.rolePermissions
                                    }
                                })
                                setOpenDeleteRoleBox(true)
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                );
            }
        },
    ];

    const handleRoleDataGridPageUpdate = () => {
        const lastPage = Math.ceil(roles.length / roleDataGridPageModel.pageSize) - 1;
        if (roles.length === 0) {
            return 0;
        } else if (roleDataGridPageModel.page > lastPage) {
            return lastPage;
        } else {
            return roleDataGridPageModel.page;
        }
    }

    return (
        <>
            <Grid pl={3} pr={3} pt={4} container rowSpacing={2}>
                <Grid item xs={12}>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="medium"/>}
                    >
                        <Link
                            underline="hover"
                            color="inherit"
                            href="#"
                            variant='h6'
                        >
                            User
                        </Link>
                        <Link
                            underline="hover"
                            href="#"
                            fontWeight="bold"
                            variant='h6'
                        >
                            Role Management
                        </Link>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"h6"}>ROLE MANAGEMENT</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box display={"flex"} gap={2} justifyContent={"space-between"} flexWrap={"wrap"}>
                        <TextField
                            label="Search By Role Name"
                            variant="standard"
                            value={searchQuery}
                            onChange={(event) => {
                                const value = event.target.value;
                                // Remove characters \, {, }, [, ], |, ^, `, %, &, #, +, _
                                const filteredValue = value.replace(/[\\{}[\]|^`%&#_+]/g, "");
                                setSearchQuery(filteredValue);
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position={"end"}><SearchIcon /></InputAdornment>
                            }}
                        />
                        <Button
                            onClick={() => {
                                setSelectedRole({id: null, role: "", userCount: 0, permissionCount: 0, rolePermissions: []});
                                setOpenNewRole(true);
                            }}
                            sx={{ height: "50px" }}
                            variant="contained"
                        >
                            Add New Role
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} mt={4} mb={5}>
                    <Box padding={2} style={{ backgroundColor: colorConfigs.secondBg, borderRadius: 5 }}>
                        <Box bgcolor={colorConfigs.secondBg} sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                slots={{loadingOverlay: LinearProgress}}
                                loading={dataGridLoading}
                                columns={columns}
                                rows={roles}
                                initialState={{
                                    columns: {
                                        columnVisibilityModel: {
                                            lastName: (window.innerWidth >= 600),
                                            designation: (window.innerWidth >= 600)
                                        }
                                    },
                                    pagination: {
                                        paginationModel: {
                                            page: 0,
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5, 10, 15]}
                                disableRowSelectionOnClick
                                paginationModel={{
                                    page: handleRoleDataGridPageUpdate(),
                                    pageSize: roleDataGridPageModel.pageSize
                                }}
                                onPaginationModelChange={(model, details) => {
                                    setRoleDataGridPageModel(model);
                                }}
                                style={{fontSize: 16}}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Drawer
                open={openNewRole}
                anchor={"right"}
                onClose={() => setOpenNewRole(false)}
                sx={{
                    zIndex: 10
                }}
            >
                <Box
                    maxWidth={"800px"}
                    // width={"800px"}
                    marginTop={"64px"}
                    height={"calc(100vh - 64px)"}
                    role={"presentation"}
                >
                    <CreateEditRole
                        role={selectedRole}
                        mode={RoleMode.CREATE}
                        action={{
                            setIsDrawerOpen: setOpenNewRole,
                            onCreateRole: () => {},
                            onUpdateRole: () => {}
                        }}
                    />
                </Box>
            </Drawer>
            <DialogBox
                data={{
                    open: openDeleteRoleBox,
                    dialogTitle: "Delete Role",
                    dialogContext: "Role name:",
                    txtId: "roleId",
                    txtLabel: "Role",
                    txtType: "text",
                    errorMessages: ["Role name is required", "Enter valid role name"],
                    id: selectedRole.id,
                    value: selectedRole.role,
                    actionBtnName: "Delete"
                }}
                mode={DialogBoxMode.DELETE_ROLE}
                action={{
                    onClose: setOpenDeleteRoleBox,
                    onCancel: setOpenDeleteRoleBox,
                    onConfirm: () => {}
                }}
            />
        </>
    )
}

export default RoleManagement;