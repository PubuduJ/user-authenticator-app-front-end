import {AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import jwt_decode from "jwt-decode";

type Props = {
    handleDrawerOpen: () => void
}

const TopBar = ({ handleDrawerOpen } : Props) => {
    const authState = useSelector((state: RootState) => state.authState);
    const [placeHolder, setPlaceHolder] = useState("");
    const navigate = useNavigate();

    const getAvatarSrcUrl = () : string => {
        if (authState.token) {
            const decodedToken = Object(jwt_decode(authState.token));
            if (decodedToken.img || decodedToken.img !== "") return decodedToken.img;
            else return ""
        } else return ""
    }

    return (
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
                            src={getAvatarSrcUrl()}
                        >
                        </Avatar>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;