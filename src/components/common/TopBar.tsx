import {AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import MenuIcon from '@mui/icons-material/Menu';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import jwt_decode from "jwt-decode";
import {getLoggedUserDetails} from "../../api/auth/getLoggedUserDetails";
import Toast, {ToastData} from "./Toast";
import * as React from "react";

type Props = {
    handleDrawerOpen: () => void
}

const TopBar = ({ handleDrawerOpen } : Props) => {
    const authState = useSelector((state: RootState) => state.authState);
    const [imgUrl, setImgUrl] = useState<string>("");
    const [toastConfig, setToastConfig] = useState<ToastData>({ open: false, message: "", type: "success" });
    const [placeHolder, setPlaceHolder] = useState("");
    const navigate = useNavigate();

    const getLoggedUserLogo = async () => {
        try {
            let email = "";
            if (authState.token) {
                const decodedToken = Object(jwt_decode(authState.token));
                email = decodedToken.email;
            }
            const response = await getLoggedUserDetails(email);
            setImgUrl(response.data.img);
        } catch (err: any) {
            if (err instanceof Error) {
                if (err.message !== "") setToastConfig({ open: true, message: err.message, type: "error" });
                else setToastConfig({ open: true, message: "Fail to load logged user details", type: "error" })
            } else setToastConfig({ open: true, message: "Fail to load logged user details", type: "error" })
        }
    }

    useEffect(() => {
        getLoggedUserLogo().then(r => {});
    }, [])

    const handleToastOnclose = (state: boolean) => setToastConfig((prevState: ToastData) => { return { ...prevState, "open": state } });

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 1,
                    backgroundColor: colorConfigs.topBar.bg,
                    color: colorConfigs.topBar.color,
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginRight: -2
                    }}
                >
                    <Box
                        display={"flex"}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography pt={0.5} pl={1} fontWeight={"bold"} variant={"h5"}>Authenticator App</Typography>
                    </Box>
                    <Box>
                        <Button
                            onClick={() => {
                                localStorage.removeItem("jwtToken");
                                navigate("/sign-in");
                            }}
                            onMouseEnter={() => {
                                setPlaceHolder("Logout");
                            }}
                            onMouseLeave={() => {
                                setPlaceHolder("")
                            }}
                            title={placeHolder}
                        >
                            <Avatar
                                sx={{border: "2px solid white",}}
                                src={imgUrl}
                            >
                            </Avatar>
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toast
                data={toastConfig}
                action={{
                    onClose: handleToastOnclose
                }}
            />
        </>
    );
};

export default TopBar;