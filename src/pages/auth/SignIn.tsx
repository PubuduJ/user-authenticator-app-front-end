import Box from "@mui/material/Box";
import {Button, Checkbox, FormControlLabel, Grid, TextField, Typography} from "@mui/material";
import Link from "@mui/material/Link";
import Toast, {ToastData} from "../../components/common/Toast";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

type ErrorMsgType = {
    emailError: string;
    passwordError: string;
}

const SignIn = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [error, setError] = useState<ErrorMsgType>({emailError: " ", passwordError: " "});
    const [toastConfig, setToastConfig] = useState<ToastData>({ open: false, message: "", type: "success" });
    const navigate = useNavigate();

    const handleSubmit = () => {

    }
    const loginRememberMe = () => {}
    const handleToastOnclose = (state: boolean) => {setToastConfig((prevState: ToastData) => { return { ...prevState, "open": state } })}

    // Mobile screen auto-responsive code logic.
    const [renderComponent, setRenderComponent] = useState("");
    const [height, setHeight] = useState(window.innerHeight);
    useEffect(() => {
        const rememberMePreference = localStorage.getItem('rememberMe');
        if (rememberMePreference) {
            setRememberMe(JSON.parse(rememberMePreference));
        }

        if (JSON.parse(rememberMePreference ?? "false")) {
            const storedUsername = JSON.parse(localStorage.getItem('rememberedUsername') ?? "");
            const storedPassword = JSON.parse(localStorage.getItem('rememberedPassword') ?? "");
            setUsername(storedUsername || '');
            setPassword(storedPassword || '');
        }

        const handleOrientationChange = () => {
            if (window.matchMedia("(orientation: portrait)").matches) {
                setRenderComponent("Mobile View");
                if (height <= 1100) setHeight(window.innerHeight);
                else setHeight(height);
            } else {
                setRenderComponent("Desktop View");
                setHeight(window.innerHeight);
            }
        };

        // Listen for orientation change event
        window.addEventListener("resize", handleOrientationChange);
        // Set initial text based on the current orientation
        handleOrientationChange();
        // Clean up event listener on unmount
        return () => {window.removeEventListener("resize", handleOrientationChange);};
    }, []);

    return (
        <>
            <Box
                sx={{background: 'linear-gradient(to bottom, #B5C6E7 20%, #FFFFFF 100%)'}}
                position={"relative"}
                width={"100vw"}
                height={(window.innerHeight <= 530) ? "500px" : height}
            >
                <Box
                    width={(window.innerWidth > 600) ? "470px" : "auto"}
                    bottom={0}
                    right={0}
                    position={"absolute"}
                    padding={4}>
                    <Typography variant='h4' align='center'>Welcome</Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={username}
                            onChange={(event) => {
                                const value = event.target.value;
                                if (value.trim() === "") {
                                    setError((prevState) => {
                                        return { ...prevState, "emailError": "Email is required" }
                                    });
                                } else {
                                    setError((prevState) => {
                                        return { ...prevState, "emailError": " "}
                                    })
                                }
                                setUsername(value);
                            }}
                            error={(error.emailError !== " ")}
                            helperText={error.emailError}
                            autoFocus
                        />
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => {
                                const value = event.target.value;
                                if (value.trim() === "") {
                                    setError((prevState: ErrorMsgType) => {
                                        return { ...prevState, "passwordError": "Password is required" }
                                    });
                                } else {
                                    setError((prevState: ErrorMsgType) => {
                                        return { ...prevState, "passwordError": " " }
                                    });
                                }
                                setPassword(value);
                            }}
                            error={(error.passwordError !== " ")}
                            helperText={error.passwordError}
                            autoComplete="current-password"
                        />
                        <Grid container>
                            <Grid item xs>
                                <FormControlLabel
                                    control={<Checkbox color="primary" checked={rememberMe} onChange={loginRememberMe} />}
                                    slotProps={{ typography: { variant: 'subtitle1' } }}
                                    label="Remember me"
                                />
                            </Grid>
                            <Grid item paddingY={1}>
                                <Link href="#" variant="subtitle1" onClick={() => {
                                    navigate("/forgot-password")
                                }}>
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 3 }}
                        >
                            Sign In
                        </Button>
                        <Typography align={"center"} fontWeight={"bold"} variant={"subtitle1"}>© {new Date().getFullYear()} <Link href="https://www.linkedin.com/in/pubudujanith/">PubuduJ.</Link> All Rights Reserved.</Typography>
                        <Toast
                            data={toastConfig}
                            action={{
                                onClose: handleToastOnclose
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default SignIn;