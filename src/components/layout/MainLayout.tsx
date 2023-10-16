import { Outlet } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import sizeConfigs from "../../configs/sizeConfigs";
import SideBar from "../common/SideBar";
import TopBar from "../common/TopBar";
import { useCallback, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import Link from '@mui/material/Link';
import {setBooleanValue} from "../../redux/features/booleanValueSlice";

const MainLayout = () => {
    const dispatch = useDispatch();
    const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
    const isMobile = useMediaQuery({ query: `(max-width: 600px)` });

    const handleDrawerOpen = useCallback(() => {
        setIsSideBarOpen(!isSideBarOpen);
        dispatch(setBooleanValue(!isSideBarOpen))
    }, [isSideBarOpen]);

    const handleDrawerToggle = useCallback((status: boolean) => {
        setIsSideBarOpen(status);
    }, []);

    return (
        <>
            <TopBar handleDrawerOpen={handleDrawerOpen} />
            <Box sx={{ display: "flex", backgroundColor: "#E5E9F1" }}>
                <Box
                    component="nav"
                    sx={{
                        width: isSideBarOpen && !isMobile ? sizeConfigs.sideBar.width : 0,
                    }}
                >
                    <SideBar
                        isSideBarOpen={isSideBarOpen}
                        handleDrawerToggle={handleDrawerToggle}
                        setIsSideBarOpen={setIsSideBarOpen}
                    />
                </Box>
                <Box
                    component="main"
                    marginTop={"64px"}
                    minHeight={"calc(100vh - 64px)"}
                    flexGrow={1}
                    width={"100px"}
                    bgcolor={"#E5E9F1"}
                    position={"relative"}
                >
                    <Box
                        width={(window.innerWidth > 600) ? "915px" : "750px"}
                        height={"100%"}
                        right={0}
                        position={"absolute"}
                        sx={{
                            backgroundImage: 'url(/Logo-Big-A.svg)',
                            backgroundRepeat: "no-repeat"
                        }}
                    ></Box>
                    <Box
                        position={"relative"}
                    >
                        <Outlet />
                    </Box>
                </Box>
            </Box>
            <Box
                pt={1} pb={1}
                bgcolor={"#E5E9F1"}
                component={"footer"}
                textAlign={"center"}
                position={"fixed"}
                bottom={0}
                sx={{
                    left: isSideBarOpen && !isMobile ? sizeConfigs.sideBar.width : 0,
                    width: isSideBarOpen && !isMobile ? `calc(100% - ${sizeConfigs.sideBar.width})` : "100%",
                }}
            >
                <Typography fontWeight={"bold"} variant={"body2"}>© {new Date().getFullYear()} <Link href="https://www.linkedin.com/in/pubudujanith/">PubuduJ.</Link> All Rights Reserved.</Typography>
            </Box>
        </>
    );
};

export default MainLayout;