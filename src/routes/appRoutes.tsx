import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {RouteType} from "./config";
import UserManagement from "../pages/user/UserManagement";
import RoleManagement from "../pages/user/RoleManagement";
import UserPageLayout from "../pages/user/UserPageLayout";
import Profile from "../pages/profile/Profile";

const appRoutes: RouteType[] = [
    {
        index: true,
        element: <Profile/>,
        state: "profile",
        sidebarProps: {
            displayText: "Profile",
            icon: <AccountBoxIcon/>,
            permission: "profile_"
        }
    },
    {
        path: "/profile",
        element: <Profile/>,
        state: "dashboard",
        sidebarProps: {
            displayText: "Profile",
            icon: <AccountBoxIcon/>,
            permission: "profile_"
        }
    },
    {
        path: "/user",
        element: <UserPageLayout/>,
        state: "user",
        sidebarProps: {
            displayText: "User",
            icon: <PeopleAltIcon/>,
            permission: "user_"
        },
        child: [
            {
                path: "/user/user-management",
                element: <UserManagement/>,
                state: "user.user-management",
                sidebarProps: {
                    displayText: "User Management",
                    permission: "user_userManagement_"
                },
            },
            {
                path: "/user/role-management",
                element: <RoleManagement/>,
                state: "user.role-management",
                sidebarProps: {
                    displayText: "Role Management",
                    permission: "user_roleManagement_"
                }
            }
        ]
    },
]

export default appRoutes;