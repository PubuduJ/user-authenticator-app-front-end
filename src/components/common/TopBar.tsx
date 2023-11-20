import {AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

type Props = {
    handleDrawerOpen: () => void
}

const TopBar = ({ handleDrawerOpen } : Props) => {
    const [placeHolder, setPlaceHolder] = useState("");
    const navigate = useNavigate();

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
                        <Avatar>

                        </Avatar>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;