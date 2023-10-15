import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React, {SetStateAction, useEffect, useState} from "react";
import colorConfigs from "../../configs/colorConfigs";
import { RouteType } from "../../routes/config";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SideBarItem from "./SideBarItem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type Props = {
    item: RouteType;
    setIsSideBarOpen: React.Dispatch<SetStateAction<boolean>>;
};

const SideBarItemCollapse = ({ item, setIsSideBarOpen } : Props) => {
    const [open, setOpen] = useState(false);
    const { appState } = useSelector((state: RootState) => state.appState);

    useEffect(() => {
        if (appState.includes(item.state)) {
            setOpen(true);
        }
    }, [appState, item]);

    return (
        item.sidebarProps ? (
            <>
                <ListItemButton
                    onClick={() => setOpen(!open)}
                    sx={{
                        "&: hover": {
                            color: colorConfigs.sideBar.color,
                            backgroundColor: colorConfigs.sideBar.hoverBg
                        },
                        paddingY: "10px",
                        paddingX: "24px",
                    }}
                >
                    <ListItemIcon sx={{
                        color: colorConfigs.sideBar.color
                    }}>
                        {item.sidebarProps.icon && item.sidebarProps.icon}
                    </ListItemIcon>
                    <ListItemText
                        disableTypography
                        primary={
                            <Typography variant="h6">
                                {item.sidebarProps.displayText}
                            </Typography>
                        }
                    />
                    {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
                </ListItemButton>
                <Collapse in={open} timeout="auto">
                    <List>
                        {item.child?.map((route, index) => (
                            route.sidebarProps ? (
                                route.child ? (
                                    <SideBarItemCollapse item={route} key={index} setIsSideBarOpen={setIsSideBarOpen}/>
                                ) : (
                                    <SideBarItem item={route} key={index} setIsSideBarOpen={setIsSideBarOpen}/>
                                )
                            ) : null
                        ))}
                    </List>
                </Collapse>
            </>
        ) : null
    );
};

export default SideBarItemCollapse;