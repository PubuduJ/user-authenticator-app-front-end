import * as React from 'react';
import {Breadcrumbs, Button, Grid, InputAdornment, Link, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export type User = {
    id: number | null;
    img: string;
    email: string;
    firstName: string;
    lastName: string;
    mobile: string;
    roleIds: number[];
}

const UserManagement = () => {
    const [selectedUser, setSelectedUser] = useState<User>({id: null, img: "", email: "", firstName: "", lastName: "", mobile: "", roleIds: []})
    const [openNewUser, setOpenNewUser] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

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
                        <Button onClick={() => {
                            setSelectedUser({
                                id: null,
                                img: "",
                                email: "",
                                firstName: "",
                                lastName: "",
                                mobile: "",
                                roleIds: [],
                            })
                            setOpenNewUser(true)
                        }} sx={{ height: "50px" }} variant="contained">New User</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} mt={4} mb={5} >

                </Grid>
            </Grid>
        </>
    )
};

export default UserManagement;