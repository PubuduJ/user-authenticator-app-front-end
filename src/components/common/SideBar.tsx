import React, {SetStateAction, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import sizeConfigs from '../../configs/sizeConfigs';
import {useMediaQuery} from 'react-responsive';
import colorConfigs from '../../configs/colorConfigs';
import appRoutes from '../../routes/appRoutes';
import SideBarItemCollapse from './SideBarItemCollapse';
import SideBarItem from './SideBarItem';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {RouteType} from "../../routes/config";

type Props = {
    window?: () => Window;
    isSideBarOpen: boolean;
    handleDrawerToggle: (isOpen: boolean) => void;
    setIsSideBarOpen: React.Dispatch<SetStateAction<boolean>>;
}

const SideBar = ({window, isSideBarOpen, handleDrawerToggle, setIsSideBarOpen}: Props) => {
    const [open, setOpen] = useState(false);
    const authState = useSelector((state: RootState) => state.authState);
    const isMobile = useMediaQuery({query: `(max-width: 600px)`});

    const isPermitted = (routeType: RouteType): boolean => {
        let sideBarPermission = routeType.sidebarProps ? routeType.sidebarProps.permission : "";
        if (sideBarPermission && authState.permissions) {
            for (const permission of authState.permissions) {
                if (permission.startsWith(sideBarPermission)) {
                    return true;
                }
            }
        }
        return false;
    }

    useEffect(() => setOpen(isSideBarOpen), [isSideBarOpen]);

    const onDrawerToggle = () => {
        setOpen(false);
        handleDrawerToggle(false)
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{display: 'flex'}}>
            <Drawer
                container={container}
                variant="temporary"
                open={open && isMobile}
                onClose={onDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: {xs: 'block', sm: 'none'},
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: sizeConfigs.sideBar.width,
                        backgroundColor: colorConfigs.sideBar.bg
                    },
                }}
            >
                <List disablePadding style={{
                    paddingTop: 57,
                    fontVariant: 'h6',
                    color: colorConfigs.sideBar.inactiveFontColor,
                    backgroundColor: colorConfigs.sideBar.bg
                }}>
                    {appRoutes.map((route, index) => (
                        route.sidebarProps && isPermitted(route) ? (
                            route.child ? (
                                <SideBarItemCollapse item={route} key={index} setIsSideBarOpen={setIsSideBarOpen}/>
                            ) : (
                                <SideBarItem item={route} key={index} setIsSideBarOpen={setIsSideBarOpen}/>
                            )
                        ) : null
                    ))}
                </List>
            </Drawer>
            <Drawer
                sx={{
                    backgroundColor: "red",
                    width: sizeConfigs.sideBar.width,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: sizeConfigs.sideBar.width,
                        boxSizing: 'border-box',
                        backgroundColor: colorConfigs.sideBar.bg,
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open && !isMobile}
            >
                <List disablePadding style={{
                    paddingTop: 65,
                    fontVariant: 'h6',
                    color: colorConfigs.sideBar.inactiveFontColor,
                    backgroundColor: colorConfigs.sideBar.bg
                }}>
                    {appRoutes.map((route, index) => (
                        route.sidebarProps && isPermitted(route) ? (
                            route.child ? (
                                <SideBarItemCollapse item={route} key={index} setIsSideBarOpen={setIsSideBarOpen}/>
                            ) : (
                                <SideBarItem item={route} key={index} setIsSideBarOpen={setIsSideBarOpen}/>
                            )
                        ) : null
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}

export default SideBar;