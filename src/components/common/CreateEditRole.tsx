import React, {SetStateAction, useEffect, useState} from "react";
import {Role} from "./CreateEditViewUser";
import {RolePermission, UserRole} from "../../pages/user/RoleManagement";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Chip,
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import colorConfigs from "../../configs/colorConfigs";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {GridExpandMoreIcon} from "@mui/x-data-grid";

export enum RoleMode {
    CREATE = "Create",
    EDIT = "Edit",
    VIEW = "View"
}

export type RoleAction = {
    setIsDrawerOpen: React.Dispatch<SetStateAction<boolean>>;
    onCreateRole: (role: Role) => void;
    onUpdateRole: (role: Role) => void;
}

type Props = {
    role: UserRole;
    mode: RoleMode;
    action: RoleAction;
}

const CreateEditRole = ({role, mode, action}: Props) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [roleName, setRoleName] = useState<string>("");
    const [userUserManagement, setUserUserManagement] = useState<string[]>([]);
    const [userRoleManagement, setUserRoleManagement] = useState<string[]>([]);
    const [roleError, setRoleError] = useState<string>(" ");

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
    };

    const handleUserManagementChange = (event: SelectChangeEvent<typeof userUserManagement>) => {
        const value = event.target.value;
        setUserUserManagement(typeof value === 'string' ? value.split(',') : value);
    };

    const handleRoleManagementChange = (event: SelectChangeEvent<typeof userRoleManagement>) => {
        const value = event.target.value;
        setUserRoleManagement(typeof value === 'string' ? value.split(',') : value);
    };

    const handleCreateUpdateRole = () => {
        if (roleError !== " ") {
            // @ts-ignore
            document.getElementById("roleName").focus();
            return;
        }
        if (!roleName) {
            // @ts-ignore
            document.getElementById("roleName").focus();
            setRoleError("Role name is required")
            return
        }
        let userPermissions: RolePermission[] = [];

        userUserManagement.forEach(element => {
            userPermissions.push({permissionName: "user_userManagement_" + element});
        });

        userRoleManagement.forEach(element => {
            userPermissions.push({permissionName: "user_roleManagement_" + element});
        });

        let enabledPermissions: Role = {
            role: roleName,
            rolePermissions: userPermissions
        }

        if (mode === RoleMode.CREATE) action.onCreateRole(enabledPermissions);
        else if (mode === RoleMode.EDIT) {
            const updatePermissions = {id: role.id, role: roleName, rolePermissions: userPermissions}
            // @ts-ignore
            action.onUpdateRole(updatePermissions);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if (mode === RoleMode.CREATE) {
                // @ts-ignore
                document.getElementById("roleName").focus();
            }
        }, 500)
        if (mode === RoleMode.EDIT || mode === RoleMode.VIEW) {
            if (mode === RoleMode.VIEW) setExpanded("user");
            setRoleName(role.role);
            const array = [];
            const userUserManagementArray: string[] = [];
            const userRoleManagementArray: string[] = [];
            for (let i = 0; i < role.rolePermissions.length; i++) {
                array.push(role.rolePermissions[i].permissionName);
            }
            for (const element of array) {
                if (element.startsWith("user_userManagement_")) userUserManagementArray.push(element.replace("user_userManagement_", ""))
                else if (element.startsWith("user_roleManagement_")) userRoleManagementArray.push(element.replace("user_roleManagement_", ""))
            }
            setUserUserManagement(userUserManagementArray);
            setUserRoleManagement(userRoleManagementArray);
        }
    }, [])

    return (
        <>
            <Box
                position={"relative"}
                height={"100%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                style={{backgroundColor: colorConfigs.mainBg}}
            >
                <Box top={"8px"} right={"24px"} position={"absolute"}>
                    <IconButton onClick={() => {
                        action.setIsDrawerOpen(false)
                    }}><CloseIcon/></IconButton>
                </Box>
                <Grid
                    container
                    columnSpacing={6}
                    rowSpacing={3}
                    pl={4} pr={4} pt={2}
                    style={{backgroundColor: colorConfigs.mainBg}}
                >
                    <Grid item xs={12} pb={2}>
                        {mode === RoleMode.CREATE && <Typography variant={"h5"}>Create Role</Typography>}
                        {mode === RoleMode.EDIT && <Typography variant={"h5"}>Edit Role</Typography>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="roleName"
                            name="roleName"
                            label="Role name"
                            variant="standard"
                            InputProps={{
                                readOnly: (mode === RoleMode.VIEW),
                            }}
                            error={(roleError !== " ")}
                            helperText={roleError}
                            value={roleName}
                            onChange={(event) => {
                                const value = event.target.value;
                                if (value.trim() === "") {
                                    setRoleError("Role name is required");
                                } else if (!/^[A-Za-z][A-Za-z0-9- ]+$/.test(value)) {
                                    setRoleError("Enter valid role name");
                                } else {
                                    setRoleError(" ")
                                }
                                setRoleName(value);
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box width={"200px"}></Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box padding={2} display={"flex"} style={{
                            backgroundColor: colorConfigs.sideBar.activeBg,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5
                        }}>
                            <Typography width={160}>Feature</Typography>
                            <Typography>Permission</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} style={{paddingTop: 0}}>
                        <Accordion expanded={expanded === "user"} onChange={handleAccordionChange("user")}>
                            <AccordionSummary expandIcon={<GridExpandMoreIcon/>}>
                                <Typography>User</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box pb={2} display={"flex"} alignItems={"center"}>
                                    <Typography width={200}>User Management</Typography>
                                    <Select
                                        style={{width: "100%"}}
                                        variant={"standard"}
                                        multiple
                                        readOnly={mode === RoleMode.VIEW}
                                        value={userUserManagement}
                                        onChange={handleUserManagementChange}
                                        renderValue={(selected) => (
                                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
                                                {selected.map((value) => (
                                                    <Chip sx={{borderRadius: 1}} color={"primary"} key={value}
                                                          label={value}/>))}
                                            </Box>
                                        )}
                                    >
                                        <MenuItem key="View" value="View">View</MenuItem>
                                        <MenuItem key="Create" value="Create">Create</MenuItem>
                                        <MenuItem key="Edit" value="Edit">Edit</MenuItem>
                                        <MenuItem key="Delete" value="Delete">Delete</MenuItem>
                                        <MenuItem key="Reset Password" value="Reset Password">Reset Password</MenuItem>
                                    </Select>
                                </Box>
                                <Box pb={2} display={"flex"} alignItems={"center"}>
                                    <Typography width={200}>User Roles</Typography>
                                    <Select
                                        style={{width: "100%"}}
                                        variant={"standard"}
                                        multiple
                                        readOnly={mode === RoleMode.VIEW}
                                        value={userRoleManagement}
                                        onChange={handleRoleManagementChange}
                                        renderValue={(selected) => (
                                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
                                                {selected.map((value) => (
                                                    <Chip sx={{borderRadius: 1}} color={"primary"} key={value}
                                                          label={value}/>))}
                                            </Box>
                                        )}
                                    >
                                        <MenuItem key="View" value="View">View</MenuItem>
                                        <MenuItem key="Create" value="Create">Create</MenuItem>
                                        <MenuItem key="Edit" value="Edit">Edit</MenuItem>
                                        <MenuItem key="Delete" value="Delete">Delete</MenuItem>
                                    </Select>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
                <Box style={{backgroundColor: colorConfigs.mainBg}} pb={2} pt={2} pr={4} display={"flex"}
                     justifyContent={"flex-end"} gap={2}>
                    {mode === RoleMode.CREATE &&
                        <Button sx={{p: "10px 50px 10px 50px"}} variant="contained"
                                onClick={handleCreateUpdateRole}>Save</Button>
                    }
                    {mode === RoleMode.EDIT &&
                        <Button sx={{p: "10px 50px 10px 50px"}} variant="contained"
                                onClick={handleCreateUpdateRole}>Update</Button>
                    }
                </Box>
            </Box>
        </>
    )
}

export default CreateEditRole;