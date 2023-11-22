import * as React from "react";
import {Avatar, Box, Breadcrumbs, Grid, Typography} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {useState} from "react";
import colorConfigs from "../../configs/colorConfigs";

const Profile = () => {
    let time  = new Date().toLocaleTimeString();
    const [currentTime,setCurrentTime] = useState(time)
    const UpdateTime = () => {
        time =  new Date().toLocaleTimeString();
        setCurrentTime(time);
    }
    setInterval(UpdateTime);

    return (
        <>
            <Grid pl={3} pr={3} pt={"15px"} spacing={2} container>
                <Grid item xs={12} mb={-1}>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="medium"/>}
                    >
                        <Link
                            underline="hover"
                            color="inherit"
                            href="#"
                            variant='h6'
                        >
                            App
                        </Link>
                        <Link
                            underline="hover"
                            href="#"
                            fontWeight="bold"
                            variant='h6'
                        >
                            Profile
                        </Link>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        p={1}
                        borderRadius={2}
                        bgcolor={colorConfigs.secondBg}
                    >
                        <Typography variant={"h4"}>Good Morning Pubudu Janith</Typography>
                        <Typography variant={"h6"}>Welcome to the User Authenticator Application</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Box
                        height={700}
                        borderRadius={2}
                        bgcolor={colorConfigs.secondBg}
                    >
                        <Box pt={5} display={"flex"} justifyContent={"center"}>
                            <Avatar
                                sx={{
                                    border: "5px solid black",
                                    width: 250,
                                    height: 250
                                }}
                            >
                            </Avatar>
                        </Box>
                        <Typography pt={5} variant={"h6"} textAlign={"center"}>Name: </Typography>
                        <Typography variant={"h6"} textAlign={"center"}>Email: </Typography>
                        <Typography variant={"h6"} textAlign={"center"}>Mobile: </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Box
                        pl={1}
                        pr={1}
                        height={700}
                        borderRadius={2}
                        bgcolor={colorConfigs.secondBg}
                    >
                        <Typography pt={2} variant={"h6"} textAlign={"left"}>You logged in to the system as: </Typography>
                        <Typography variant={"h6"} textAlign={"center"}>Super Admin</Typography>
                        <Typography variant={"h6"} textAlign={"left"}>You have permissions to: </Typography>
                        <Typography variant={"h6"} textAlign={"center"}>Create User</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Box
                        height={450}
                        borderRadius={2}
                    >
                        <Box
                            bgcolor={colorConfigs.secondBg}
                            borderRadius={2}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar />
                            </LocalizationProvider>
                        </Box>
                        <Box
                            mt={1}
                            bgcolor={colorConfigs.secondBg}
                            height={60}
                            pt={1}
                            borderRadius={2}
                        >
                            <Typography textAlign={"center"} variant={"h4"}>{currentTime}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Profile;