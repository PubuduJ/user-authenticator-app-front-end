import * as React from "react";
import {Avatar, Box, Breadcrumbs, Grid, Typography} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {useEffect, useState} from "react";
import colorConfigs from "../../configs/colorConfigs";
import {getLoggedUserDetails} from "../../api/auth/getLoggedUserDetails";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import jwt_decode from "jwt-decode";
import Toast, {ToastData} from "../../components/common/Toast";

export type UserDetails = {
    email: string;
    firstName: string;
    img: string;
    lastName: string;
    mobile: string;
    permissionNames: string[];
    roleNames: string[];
}

const Profile = () => {
    const authState = useSelector((state: RootState) => state.authState);
    const [loggedUser, setLoggedUser] = useState<UserDetails>({email: "", img: "", firstName: "", lastName: "", mobile: "", permissionNames: [], roleNames: []});
    const [toastConfig, setToastConfig] = useState<ToastData>({open: false, message: "", type: "success"});
    let time  = new Date().toLocaleTimeString();
    const [currentTime,setCurrentTime] = useState(time)
    const updateTime = () => {
        time =  new Date().toLocaleTimeString();
        setCurrentTime(time);
    }
    setInterval(() => {
        updateTime();
    }, 1000);

    const handleToastOnclose = (state: boolean) => setToastConfig((prevState: ToastData) => {return {...prevState, "open": state}});

    const getLoggedUser = async () => {
        try {
            let email = "";
            if (authState.token) {
                const decodedToken = Object(jwt_decode(authState.token));
                email = decodedToken.email;
            }
            const response = await getLoggedUserDetails(email);
            setLoggedUser(response.data);
        } catch (err: any) {
            if (err instanceof Error) {
                if (err.message !== "") setToastConfig({open: true, message: err.message, type: "error"});
                else setToastConfig({open: true, message: "Fail to load logged user details", type: "error"})
            } else setToastConfig({open: true, message: "Fail to load logged user details", type: "error"})
        }
    }

    const filterPermissions = (value: string): string => {
        if (value.includes("user_userManagement_")) {
            return value.replace("user_userManagement_", "User ");
        }
        else if (value.includes("user_roleManagement_")) {
            return  value.replace("user_roleManagement_", "Role ");
        }
        return value;
    }

    useEffect(() => {
        getLoggedUser().then(r => {});
    }, [])

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
                        <Typography variant={"h4"}>Good Morning {loggedUser.firstName}</Typography>
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
                                src={loggedUser.img}
                            >
                            </Avatar>
                        </Box>
                        <Typography pt={5} variant={"h6"} textAlign={"center"}>Name: {loggedUser.firstName} {loggedUser.lastName}</Typography>
                        <Typography variant={"h6"} textAlign={"center"}>Email: {loggedUser.email}</Typography>
                        <Typography variant={"h6"} textAlign={"center"}>Mobile: {loggedUser.mobile}</Typography>
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
                        <Typography variant={"h6"} textAlign={"center"}>{loggedUser.roleNames.join(", ")}</Typography>
                        <Typography variant={"h6"} textAlign={"left"}>You have permissions to: </Typography>
                        {
                            loggedUser.permissionNames.map((value, index) => {
                                return <Typography pl={5} key={index} variant={"h6"} textAlign={"left"}>{filterPermissions(value)}</Typography>
                            })
                        }
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
            <Toast
                data={toastConfig}
                action={{
                    onClose: handleToastOnclose
                }}
            />
        </>
    )
}

export default Profile;