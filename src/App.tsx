import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import {routes} from "./routes";
import SignIn from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import {useDispatch} from "react-redux";
import {setCredentials} from "./redux/features/authStateSlice";
import jwt_decode from "jwt-decode";

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        // if token is existed, take it to auth state and re-render the app.tsx.
        const jwtToken = localStorage.getItem("jwtToken");
        if (jwtToken) {
            try {
                // Decode the token to extract the payload
                const decodedToken = Object(jwt_decode(jwtToken));
                const currentTime = Date.now() / 1000;
                const userPermissions = decodedToken.scopes.permissions;
                // Check if the token has expired
                if (decodedToken.exp < currentTime) {
                    localStorage.removeItem("jwtToken");
                } else {
                    dispatch(setCredentials({ user: decodedToken.email, token: jwtToken, permissions: userPermissions }))
                    setAuthenticated(true);
                }
                setLoading(false);
            } catch (error) {
                // Token is invalid or corrupted, clear it from localStorage
                localStorage.removeItem("jwtToken");
                setLoading(false);
            }
        } else {
            setAuthenticated(false);
            setLoading(false);
        }
    }, [authenticated]);

    return (
        <BrowserRouter>
            {loading ?
                <></>
                :
                <Routes>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path={"/"} element={<MainLayout/>}>{routes}</Route>
                </Routes>
            }
        </BrowserRouter>
      );
}

export default App;
