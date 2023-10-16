import React, {SetStateAction, useState} from "react";
import {Role} from "./CreateEditViewUser";
import {UserRole} from "../../pages/user/RoleManagement";
import {Grid, SelectChangeEvent, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import colorConfigs from "../../configs/colorConfigs";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export enum RoleMode {
    CREATE = "Create",
    EDIT = "Edit"
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

const CreateEditRole = ({ role, mode, action } : Props) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [roleName, setRoleName] = useState<string>("");
    const [userUserManagement, setUserUserManagement] = useState<string[]>([]);
    const [userRoleManagement, setUserRoleManagement] = useState<string[]>([]);
    const [roleError, setRoleError] = useState<string>(" ");

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {setExpanded(isExpanded ? panel : false)};

    const handleUserManagementChange = (event: SelectChangeEvent<typeof userUserManagement>) => {
        const { target: { value }, } = event;
        setUserUserManagement(typeof value === 'string' ? value.split(',') : value);
    };

    const handleRoleManagementChange = (event: SelectChangeEvent<typeof userRoleManagement>) => {
        const { target: { value }, } = event;
        setUserRoleManagement(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <>
            <Box
                position={"relative"}
                height={"100%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                style={{ backgroundColor: colorConfigs.mainBg }}
            >
                <Box top={"8px"} right={"24px"} position={"absolute"}>
                    <IconButton onClick={() => {action.setIsDrawerOpen(false)}}><CloseIcon /></IconButton>
                </Box>
                <Grid
                    container
                    columnSpacing={6}
                    rowSpacing={3}
                    pl={4} pr={4} pt={2}
                    style={{ backgroundColor: colorConfigs.mainBg }}
                >
                    <Grid item xs={12} pb={2} >
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
                            error={(roleError !== " ")}
                            helperText={roleError}
                            value={roleName}
                            // onChange={e => setRoleName(e.target.value)}
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
                    <Grid item xs={12} flexDirection={"row"}>
                        <Box padding={2} display={"flex"} flexDirection={"row"} style={{ backgroundColor: "#C2E2E8" }}>
                            <Typography width={"25%"}>Feature</Typography>
                            <Typography>Permission</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default CreateEditRole;