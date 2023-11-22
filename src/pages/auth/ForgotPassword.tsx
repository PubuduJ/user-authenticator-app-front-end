import {Box, Button, CircularProgress, Grid, TextField, Typography} from "@mui/material";
import Link from "@mui/material/Link";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Toast, {ToastData} from "../../components/common/Toast";
import {forgotPassword} from "../../api/auth/forgotPassword";
import SecurityIcon from "@mui/icons-material/Security";

type ErrorMsgType = {
    emailError: string;
}

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [toastConfig, setToastConfig] = useState<ToastData>({open: false, message: "", type: "success"});
    const navigate = useNavigate();
    const [error, setError] = useState<ErrorMsgType>({emailError: ""});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const email = data.get("email")?.toString() ?? "";
            if (email == "") {
                setError((prevState: ErrorMsgType) => {
                    return {...prevState, "emailError": "Email is required"}
                });
                return;
            }
            if (error.emailError !== "") {
                // @ts-ignore
                document.getElementById("email").focus();
                return;
            }
            const response = await forgotPassword(email)
            const resetResponse = response.data;
            if (typeof resetResponse == "string" && resetResponse === "Success") {
                setToastConfig({
                    open: true,
                    message: "Your password reset request was success. Please check your inbox",
                    type: "success"
                });
                setTimeout(() => {
                    navigate("/sign-in");
                }, 2000);
            } else {
                setToastConfig({open: true, message: resetResponse.message, type: "error"});
            }
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                setToastConfig({open: true, message: error.message, type: "error"});
            }
        } finally {
            setLoading(false);
        }
    };

    const handleToastOnclose = (state: boolean) => {
        setToastConfig((prevState: ToastData) => {
            return {...prevState, "open": state}
        })
    }

    // Mobile screen auto-responsive code logic.
    const [renderComponent, setRenderComponent] = useState("");
    const [height, setHeight] = useState(window.innerHeight);
    useEffect(() => {
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
        return () => {
            window.removeEventListener("resize", handleOrientationChange);
        };
    }, []);

    return (
        <>
            <Box
                sx={{background: 'linear-gradient(to bottom, #4c6c8d 10%, #FFFFFF 75%)'}}
                position={"relative"}
                width={"100vw"}
                // Change code
                height={(window.innerHeight <= 530) ? "520px" : height}
            >
                {
                    (window.innerWidth <= 1200) ?
                        <Box
                            position={"absolute"}
                            top={10}
                            left={5}
                            width={100}
                            display={"flex"}
                        >
                            <Box pt={0.5} pr={1}>
                                <SecurityIcon
                                    sx={{
                                        fontSize: 130,
                                        color: "white"
                                    }}
                                />
                            </Box>
                            <Typography fontWeight={"bold"} color={"white"} variant={(window.innerWidth < 1200) ? "h2" : "h1"}>Auth App</Typography>
                        </Box>
                        :
                        <Box
                            position={"absolute"}
                            top={20}
                            left={50}
                            display={"flex"}
                        >
                            <Box pt={1.5} pr={1}>
                                <SecurityIcon
                                    sx={{
                                        fontSize: 80,
                                        color: "white"
                                    }}
                                />
                            </Box>
                            <Typography fontWeight={"bold"} color={"white"} variant={(window.innerWidth < 1200) ? "h2" : "h1"}>Auth App</Typography>
                        </Box>
                }
                <Box
                    width={(window.innerWidth > 600) ? "470px" : "auto"}
                    bottom={0} right={0}
                    position={"absolute"}
                    padding={4}>
                    <Typography variant='h4' align='center'>Forgot Password?</Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={(error.emailError !== "")}
                            helperText={error.emailError}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const {name, value} = event.target;
                                if (value.trim() === "") {
                                    setError((prevState: ErrorMsgType) => {
                                        return {...prevState, "emailError": "Email is required"}
                                    });
                                }
                                if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
                                    setError((prevState: ErrorMsgType) => {
                                        return {...prevState, "emailError": "Enter valid email ID"}
                                    });
                                } else {
                                    setError((prevState: ErrorMsgType) => {
                                        return {...prevState, "emailError": ""}
                                    });
                                }
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{mt: 3, mb: 2}}
                        >
                            Reset Password
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: "#005DFF",
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                        <Grid container>
                            <Grid item xs></Grid>
                            <Grid item paddingY={1}>
                                <Link href="#" variant="subtitle1" onClick={() => {
                                    navigate('/sign-in')
                                }}>
                                    Back
                                </Link>
                            </Grid>
                        </Grid>
                        <Typography
                            align={"center"}
                            fontWeight={"bold"}
                            variant={"subtitle1"}
                        >
                            © {new Date().getFullYear()} <Link
                            href="https://www.linkedin.com/in/pubudujanith/">PubuduJ.</Link> All Rights Reserved.
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Toast
                data={toastConfig}
                action={{onClose: handleToastOnclose}}
            />
        </>
    )
}

export default ForgotPassword;