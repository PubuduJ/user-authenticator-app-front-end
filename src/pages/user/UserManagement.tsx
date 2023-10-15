import * as React from 'react';
import Box from "@mui/material/Box";
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from "@mui/material/Tooltip";
import {Breadcrumbs, Button, Grid, InputAdornment, LinearProgress, TextField, Typography} from "@mui/material";
import Link from "@mui/material/Link";
import DialogBox, {DialogBoxMode} from "../../components/common/DialogBox";
import colorConfigs from "../../configs/colorConfigs";
import Drawer from "@mui/material/Drawer";
import CreateEditViewUser, {UserMode} from "../../components/common/CreateEditViewUser";

type UserDataGridPageModel = {
    page: number,
    pageSize: number
}

export type User = {
    id: number | null;
    img: string;
    email: string;
    firstName: string;
    lastName: string;
    mobile: string;
    roleIds: number[];
}

const userArray: User[] = [
    {id: 1, img: "", firstName: "Pubudu", lastName: "Janith", email: "pubudujanith@gmail.com", mobile: "0771234567", roleIds: [1,2,3]},
    {id: 2, img: "", firstName: "Sahan", lastName: "Nuwan", email: "sahannuwan@gmail.com", mobile: "0711234567", roleIds: [1,2,3]},
    {id: 3, img: "", firstName: "Kasun", lastName: "Sampath", email: "kasunsampath@gmail.com", mobile: "0721234567", roleIds: [1,2,3]},
];

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>(userArray);
    const [selectedUser, setSelectedUser] = useState<User>({id: null, img: "", email: "", firstName: "", lastName: "", mobile: "", roleIds: []})
    const [openNewUser, setOpenNewUser] = useState<boolean>(false);
    const [openEditUser, setOpenEditUser] = useState<boolean>(false);
    const [openViewUser, setOpenViewUser] = useState<boolean>(false);
    const [openResetPasswordBox, setOpenResetPasswordBox] = useState<boolean>(false);
    const [openDeleteUserBox, setOpenDeleteUserBox] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [dataGridLoading, setDataGridLoading] = useState<boolean>(false);
    const [userDataGridPageModel, setUserDataGridPageModel] = useState<UserDataGridPageModel>({ page: 0, pageSize: 5 });

    const columns: GridColDef[] = [
        {
            field: 'firstName',
            headerName: 'First Name',
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
            field: 'lastName',
            headerName: 'Last name',
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
            field: 'mobile',
            headerName: 'Mobile',
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
            field: 'email',
            headerName: 'Email',
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
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            sortable: false,
            disableColumnMenu: true,
            flex: 1,
            minWidth: 200,
            renderHeader: (params) => {
                return <strong>{params.colDef.headerName}</strong>
            },
            renderCell: (params: any) => {
                return (
                    <>
                        <Tooltip title={'view user'}>
                            <IconButton onClick={() => {
                                setSelectedUser((prevState: User) => {
                                    return {
                                        ...prevState,
                                        "id": params.row.id,
                                        "img": params.row.img,
                                        "firstName": params.row.firstName,
                                        "lastName": params.row.lastName,
                                        "email": params.row.email,
                                        "designation": params.row.designation,
                                        "mobile": params.row.mobile,
                                        "roleIds": params.row.roleIds,
                                    }
                                })
                                setOpenViewUser(true)
                            }}>
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'edit user'}>
                            <IconButton onClick={() => {
                                setSelectedUser((prevState: User) => {
                                    return {
                                        ...prevState,
                                        "id": params.row.id,
                                        "img": params.row.img,
                                        "firstName": params.row.firstName,
                                        "lastName": params.row.lastName,
                                        "email": params.row.email,
                                        "designation": params.row.designation,
                                        "mobile": params.row.mobile,
                                        "roleIds": params.row.roleIds,
                                    }
                                })
                                setOpenEditUser(true)
                            }}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'reset password'}>
                            <IconButton onClick={() => {
                                setSelectedUser((prevState: User) => {
                                    return {
                                        ...prevState,
                                        "id": params.row.id,
                                        "img": params.row.img,
                                        "firstName": params.row.firstName,
                                        "lastName": params.row.lastName,
                                        "email": params.row.email,
                                        "designation": params.row.designation,
                                        "mobile": params.row.mobile,
                                        "roleIds": params.row.roleIds,
                                    }
                                })
                                setOpenResetPasswordBox(true)
                            }}>
                                <LockIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'delete user'}>
                            <IconButton
                                onClick={() => {
                                    setSelectedUser((prevState: User) => {
                                        return {
                                            ...prevState,
                                            "id": params.row.id,
                                            "img": params.row.img,
                                            "firstName": params.row.firstName,
                                            "lastName": params.row.lastName,
                                            "email": params.row.email,
                                            "designation": params.row.designation,
                                            "mobile": params.row.mobile,
                                            "roleIds": params.row.roleIds,
                                        }
                                    })
                                    setOpenDeleteUserBox(true)
                                }}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                );
            }
        },
    ];

    const handleUserDataGridPageUpdate = () => {
        const lastPage = Math.ceil(users.length / userDataGridPageModel.pageSize) - 1;
        if (users.length === 0) {
            return 0;
        } else if (userDataGridPageModel.page > lastPage) {
            return lastPage;
        } else {
            return userDataGridPageModel.page;
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
                            User Management
                        </Link>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"h6"}>USER MANAGEMENT</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box display={"flex"} gap={2} justifyContent={"space-between"} flexWrap={"wrap"}>
                        <TextField
                            label="Search"
                            variant="standard"
                            value={searchQuery}
                            onChange={(event) => {
                                const value = event.target.value;
                                // Remove characters \, {, }, [, ], |, ^, `, %, &, #, +
                                const filteredValue = value.replace(/[\\{}[\]|^`%&#+]/g, "");
                                setSearchQuery(filteredValue);
                            }}
                            InputProps={{endAdornment: <InputAdornment position={"end"}><SearchIcon /></InputAdornment>}}
                        />
                        <Button
                            onClick={() => {
                                setSelectedUser({id: null, img: "", email: "", firstName: "", lastName: "", mobile: "", roleIds: []})
                                setOpenNewUser(true)
                            }}
                            sx={{ height: "50px" }}
                            variant="contained"
                        >
                            Add New User
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} mt={4} mb={5} >
                    <Box padding={2} style={{ backgroundColor: colorConfigs.secondBg, borderRadius: 5 }}>
                        <Box bgcolor={colorConfigs.secondBg} sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                slots={{loadingOverlay: LinearProgress}}
                                loading={dataGridLoading}
                                columns={columns}
                                rows={users}
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
                                    page: handleUserDataGridPageUpdate(),
                                    pageSize: userDataGridPageModel.pageSize
                                }}
                                onPaginationModelChange={(model, details) => {
                                    setUserDataGridPageModel(model);
                                }}
                                style={{fontSize: 16}}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Drawer
                open={openNewUser}
                anchor={"right"}
                onClose={() => setOpenNewUser(false)}
                sx={{
                    zIndex: 10,
                }}
            >
                <Box
                    maxWidth={"800px"}
                    marginTop={"64px"}
                    height={"calc(100vh - 64px)"}
                    role={"presentation"}
                >
                    <CreateEditViewUser
                        user={selectedUser}
                        mode={UserMode.CREATE}
                        action={{
                            setIsDrawerOpen: setOpenNewUser,
                            onConfirm: () => {}
                        }}
                    />
                </Box>
            </Drawer>
            <Drawer
                open={openViewUser}
                anchor={"right"}
                onClose={() => setOpenViewUser(false)}
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
                    <CreateEditViewUser
                        user={selectedUser}
                        mode={UserMode.VIEW}
                        action={{
                            setIsDrawerOpen: setOpenViewUser,
                            onConfirm: () => {}
                        }}
                    />
                </Box>
            </Drawer>
            <Drawer
                open={openEditUser}
                anchor={"right"}
                onClose={() => setOpenEditUser(false)}
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
                    <CreateEditViewUser
                        user={selectedUser}
                        mode={UserMode.EDIT}
                        action={{
                            setIsDrawerOpen: setOpenEditUser,
                            onConfirm: () => {}
                        }}
                    />
                </Box>
            </Drawer>
            <DialogBox
                data={{
                    open: openDeleteUserBox,
                    dialogTitle: "Delete User",
                    dialogContext: "User email:",
                    txtId: "emailId",
                    txtLabel: "Email",
                    txtType: "email",
                    errorMessages: ["Email is required", "Enter valid email ID"],
                    id: selectedUser.id,
                    value: selectedUser.email,
                    actionBtnName: "Delete",
                }}
                mode={DialogBoxMode.DELETE_USER}
                action={{
                    onClose: setOpenDeleteUserBox,
                    onCancel: setOpenDeleteUserBox,
                    onConfirm: () => {}
                }}
            />
            <DialogBox
                data={{
                    open: openResetPasswordBox,
                    dialogTitle: "Reset Password",
                    dialogContext: "User email:",
                    txtId: "emailId",
                    txtLabel: "Email",
                    txtType: "email",
                    errorMessages: ["Email is required", "Enter valid email ID"],
                    id: selectedUser.id,
                    value: selectedUser.email,
                    actionBtnName: "Reset",
                }}
                mode={DialogBoxMode.RESET_PASS}
                action={{
                    onClose: setOpenResetPasswordBox,
                    onCancel: setOpenResetPasswordBox,
                    onConfirm: () => {}
                }}
            />
        </>
    )
};

export default UserManagement;