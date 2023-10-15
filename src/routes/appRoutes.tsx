import HomeIcon from '@mui/icons-material/Home';
import Person3Icon from '@mui/icons-material/Person3';
import {RouteType} from "./config";
import UserManagement from "../pages/user/UserManagement";
import RoleManagement from "../pages/user/RoleManagement";
import UserPageLayout from "../pages/user/UserPageLayout";
import Home from "../pages/home/Home";

const appRoutes: RouteType[] = [
    {
        index: true,
        element: <Home/>,
        state: "home",
        sidebarProps: {
            displayText: "Home",
            icon: <HomeIcon/>
        }
    },
    {
        path: "/dashboard",
        element: <Home/>,
        state: "dashboard",
        sidebarProps: {
            displayText: "Home",
            icon: <HomeIcon/>
        }
    },
    {
        path: "/user",
        element: <UserPageLayout/>,
        state: "user",
        sidebarProps: {
            displayText: "User",
            icon: <Person3Icon/>
        },
        child: [
            {
                path: "/user/user-management",
                element: <UserManagement/>,
                state: "user.user-management",
                sidebarProps: {
                    displayText: "User Management",
                },
            },
            {
                path: "/user/role-management",
                element: <RoleManagement/>,
                state: "user.role-management",
                sidebarProps: {
                    displayText: "Role Management",
                }
            }
        ]
    },
]

export default appRoutes;