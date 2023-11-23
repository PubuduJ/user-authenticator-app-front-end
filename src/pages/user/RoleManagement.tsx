import {Breadcrumbs, Button, Grid, InputAdornment, LinearProgress, TextField, Typography} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import * as React from "react";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
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
import Toast, {ToastData} from "../../components/common/Toast";
import {Role} from "../../components/common/CreateEditViewUser";
import {createRole} from "../../api/role/createRole";
import {updateRole} from "../../api/role/updateRole";
import {getRolesByRoleName} from "../../api/role/getRolesByRoleName";
import {deleteRole} from "../../api/role/deleteRole";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import VisibilityIcon from "@mui/icons-material/Visibility";

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

const RoleManagement = () => {
    const authState = useSelector((state: RootState) => state.authState);
    const [roles, setRoles] = useState<UserRole[]>([]);
    const [selectedRole, setSelectedRole] = useState<UserRole>({
        id: null,
        role: "",
        userCount: 0,
        permissionCount: 0,
        rolePermissions: []
    });
    const [openNewRole, setOpenNewRole] = useState<boolean>(false);
    const [openEditRole, setOpenEditRole] = useState<boolean>(false);
    const [openViewRole, setOpenViewRole] = useState<boolean>(false);
    const [openDeleteRoleBox, setOpenDeleteRoleBox] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [dataGridLoading, setDataGridLoading] = useState<boolean>(false);
    const [roleDataGridPageModel, setRoleDataGridPageModel] = useState<RoleDataGridPageModel>({page: 0, pageSize: 5});
    const [toastConfig, setToastConfig] = useState<ToastData>({open: false, message: "", type: "success"});

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
                    <Box
                        width={"100%"}
                        height={"80%"}
                        borderRadius={1}
                        bgcolor={"#E5E9F1"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <>
                            {
                                authState.permissions?.includes("user_roleManagement_View") ?
                                    <Tooltip title={"view role"}>
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
                                            setOpenViewRole(true)
                                        }}>
                                            <VisibilityIcon/>
                                        </IconButton>
                                    </Tooltip> : <></>
                            }
                            {
                                authState.permissions?.includes("user_roleManagement_Edit") ?
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
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip> : <></>
                            }
                            {
                                authState.permissions?.includes("user_roleManagement_Edit") ?
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
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip> : <></>
                            }
                        </>
                    </Box>
                );
            }
        },
    ];

    const handleGetRolesByRoleName = async (query: string) => {
        try {
            setDataGridLoading(true);
            const response = await getRolesByRoleName(query);
            const incomingRoleArray = response.data;
            const requiredRoleArray: UserRole[] = [];
            for (let i = 0; i < incomingRoleArray.length; i++) {
                const tempObject: UserRole = {
                    id: incomingRoleArray[i].id,
                    role: incomingRoleArray[i].role,
                    userCount: incomingRoleArray[i].userCount,
                    permissionCount: incomingRoleArray[i].rolePermissions.length,
                    rolePermissions: incomingRoleArray[i].rolePermissions
                }
                requiredRoleArray.push(tempObject);
            }
            setRoles(requiredRoleArray);
            setDataGridLoading(false);
        } catch (err: any) {
            if (err instanceof Error) {
                if (err.message !== "") setToastConfig({open: true, message: err.message, type: "error"});
                else setToastConfig({open: true, message: "Invalid search parameters", type: "error"})
            } else setToastConfig({open: true, message: "Fail to search plans", type: "error"})
        }
    }

    const handleCreateRole = async (role: Role) => {
        try {
            await createRole(role);
            setToastConfig({open: true, message: "Role created successfully", type: "success"});
            await handleGetRolesByRoleName(searchQuery);
            setOpenNewRole(false);
        } catch (err: any) {
            if (err instanceof Error) {
                if (err.message === "A role is already exists with this role name") {
                    // @ts-ignore
                    document.getElementById("roleName").focus();
                }
                setToastConfig({open: true, message: err.message, type: "error"});
            } else {
                setToastConfig({open: true, message: "Something went wrong!", type: "error"});
            }
            setOpenNewRole(true);
        }
    }

    const handleUpdateRole = async (role: Role) => {
        try {
            await updateRole(role);
            setToastConfig({open: true, message: "Role updated successfully", type: "success"});
            await handleGetRolesByRoleName(searchQuery);
            setOpenEditRole(false);
        } catch (err: any) {
            if (err instanceof Error) {
                if (err.message === "A role is already exists with this role name") {
                    // @ts-ignore
                    document.getElementById("roleName").focus();
                }
                setToastConfig({open: true, message: err.message, type: "error"});
            } else {
                setToastConfig({open: true, message: "Something went wrong!", type: "error"});
            }
            setOpenEditRole(true);
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteRole(id);
            setToastConfig({open: true, message: "Role deleted successfully", type: "success"});
            await handleGetRolesByRoleName(searchQuery);
            setOpenDeleteRoleBox(false);
        } catch (err: any) {
            if (err instanceof Error) {
                console.log(err.message);
                if (err.message === "Internal server error") {
                    setToastConfig({
                        open: true,
                        message: "Cannot delete the role, Role has assigned to a user",
                        type: "error"
                    })
                    if (document.getElementById("roleId") !== null) {
                        // @ts-ignore
                        document.getElementById("roleId").focus();
                    }
                } else setToastConfig({open: true, message: err.message, type: "error"})
            } else setToastConfig({open: true, message: "Fail to delete the user role", type: "error"})
        }
    }

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

    useEffect(() => {
        setTimeout(() => {
            handleGetRolesByRoleName(searchQuery).then(r => {
            });
        }, 100)
    }, [searchQuery])

    const handleToastOnclose = (state: boolean) => setToastConfig((prevState: ToastData) => {
        return {...prevState, "open": state}
    });

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
                                endAdornment: <InputAdornment position={"end"}><SearchIcon/></InputAdornment>
                            }}
                        />
                        <Button
                            onClick={() => {
                                setSelectedRole({
                                    id: null,
                                    role: "",
                                    userCount: 0,
                                    permissionCount: 0,
                                    rolePermissions: []
                                });
                                setOpenNewRole(true);
                            }}
                            disabled={!authState.permissions?.includes("user_roleManagement_Create")}
                            sx={{height: "50px"}}
                            variant="contained"
                        >
                            Add New Role
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} mt={4} mb={5}>
                    <Box padding={2} style={{backgroundColor: colorConfigs.secondBg, borderRadius: 5}}>
                        <Box bgcolor={colorConfigs.secondBg} sx={{height: 570, width: '100%'}}>
                            <DataGrid
                                slots={{loadingOverlay: LinearProgress}}
                                loading={dataGridLoading}
                                rowHeight={90}
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
                    marginTop={"64px"}
                    height={"calc(100vh - 64px)"}
                    role={"presentation"}
                >
                    <CreateEditRole
                        role={selectedRole}
                        mode={RoleMode.CREATE}
                        action={{
                            setIsDrawerOpen: setOpenNewRole,
                            onCreateRole: handleCreateRole,
                            onUpdateRole: () => {
                            }
                        }}
                    />
                </Box>
            </Drawer>
            <Drawer
                open={openEditRole}
                anchor={"right"}
                onClose={() => setOpenEditRole(false)}
                sx={{
                    zIndex: 10
                }}
            >
                <Box
                    maxWidth={"800px"}
                    marginTop={"64px"}
                    height={"calc(100vh - 64px)"}
                    role={"presentation"}
                >
                    <CreateEditRole
                        role={selectedRole}
                        mode={RoleMode.EDIT}
                        action={{
                            setIsDrawerOpen: setOpenEditRole,
                            onCreateRole: () => {
                            },
                            onUpdateRole: handleUpdateRole
                        }}
                    />
                </Box>
            </Drawer>
            <Drawer
                open={openViewRole}
                anchor={"right"}
                onClose={() => setOpenViewRole(false)}
                sx={{
                    zIndex: 10
                }}
            >
                <Box
                    maxWidth={"800px"}
                    marginTop={"64px"}
                    height={"calc(100vh - 64px)"}
                    role={"presentation"}
                >
                    <CreateEditRole
                        role={selectedRole}
                        mode={RoleMode.VIEW}
                        action={{
                            setIsDrawerOpen: setOpenViewRole,
                            onCreateRole: () => {
                            },
                            onUpdateRole: () => {
                            }
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
                    onConfirm: handleDelete
                }}
            />
            <Toast
                data={toastConfig}
                action={{
                    onClose: handleToastOnclose
                }}
            />
        </>
    )
}

export default RoleManagement;