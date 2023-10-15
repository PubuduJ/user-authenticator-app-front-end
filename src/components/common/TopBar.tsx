import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import MenuIcon from '@mui/icons-material/Menu';

type Props = {
    handleDrawerOpen: () => void
}

const TopBar = ({ handleDrawerOpen } : Props) => {
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
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
                <Typography pl={1} fontWeight={"bold"} variant={"h5"}>Authenticator App</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;