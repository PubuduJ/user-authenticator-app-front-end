import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {RouteType} from "./config";
import UserManagement from "../pages/user/UserManagement";
import RoleManagement from "../pages/user/RoleManagement";
import UserPageLayout from "../pages/user/UserPageLayout";
import Profile from "../pages/home/Profile";

const appRoutes: RouteType[] = [
    {
        index: true,
        element: <Profile/>,
        state: "profile",
        sidebarProps: {
            displayText: "Profile",
            icon: <AccountBoxIcon/>
        }
    },
    {
        path: "/profile",
        element: <Profile/>,
        state: "dashboard",
        sidebarProps: {
            displayText: "Profile",
            icon: <AccountBoxIcon/>
        }
    },
    {
        path: "/user",
        element: <UserPageLayout/>,
        state: "user",
        sidebarProps: {
            displayText: "User",
            icon: <PeopleAltIcon/>
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