import {Box, Button, CircularProgress, Grid, TextField, Typography} from "@mui/material";
import {Copyright} from "@mui/icons-material";
import Link from "@mui/material/Link";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ToastData} from "../../components/common/Toast";

type ErrorMsgType = {
    emailError: string;
}

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [toastConfig, setToastConfig] = useState<ToastData>({ open: false, message: "", type: "success" });
    const navigate = useNavigate();
    const [error, setError] = useState<ErrorMsgType>({emailError: ""});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email')
        });

        // try {
        //     const email = data.get('email')?.toString() ?? "";
        //
        //     if (email == "") {
        //
        //         setError((prevState: ErrorMsgType) => {
        //             return { ...prevState, "emailError": "Email is required" }
        //         });
        //
        //         return;
        //     }
        //
        //     if (error.emailError !== "") {
        //         // @ts-ignore
        //         document.getElementById("email").focus();
        //         return;
        //     }
        //
        //     const resetResponse = await forgotPassword(email)
        //
        //     if ((typeof resetResponse == "string" && resetResponse === "Success")
        //         || (typeof resetResponse === "object" && resetResponse.status == 200)) {
        //         setToastConfig({
        //             open: true,
        //             message: "Your password reset request was success. Please check your inbox",
        //             type: "success"
        //         });
        //
        //         setTimeout(() => {
        //             navigate("/signin");
        //         }, 2000);
        //
        //     } else {
        //         setToastConfig({
        //             open: true,
        //             message: resetResponse.message,
        //             type: "error"
        //         });
        //     }
        // } catch (error) {
        //     console.log('[Error]', error);
        //     if (error instanceof Error) {
        //         setToastConfig({
        //             open: true,
        //             message: error.message,
        //             type: "error"
        //         });
        //     }
        // } finally {
        //     setLoading(false);
        // }
    };

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
                sx={{background: 'linear-gradient(to bottom, #B5C6E7 20%, #FFFFFF 100%)'}}
                position={"relative"}
                width={"100vw"}
                // Change code
                height={(window.innerHeight <= 530) ? "520px" : height}
            >
                <Box
                    width={(window.innerWidth > 600) ? "470px" : "auto"}
                    bottom={0} right={0}
                    position={"absolute"}
                    padding={4}>
                    <Typography variant='h4' align='center'>Forgot Password?</Typography>
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
                            autoFocus
                            error={(error.emailError !== "")}
                            helperText={error.emailError}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const { name, value } = event.target;
                                if (value.trim() === "") {
                                    setError((prevState: ErrorMsgType) => {
                                        return { ...prevState, "emailError": "Email is required" }
                                    });
                                } if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
                                    setError((prevState: ErrorMsgType) => {
                                        return { ...prevState, "emailError": "Enter valid email ID" }
                                    });
                                } else {
                                    setError((prevState: ErrorMsgType) => {
                                        return { ...prevState, "emailError": "" }
                                    });
                                }
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2 }}
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
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2 }}
                            onClick={() => {
                                navigate("/sign-in")
                            }}
                        >
                            Back
                        </Button>
                        <Typography align={"center"} fontWeight={"bold"} variant={"subtitle1"}>© {new Date().getFullYear()} <Link href="https://www.linkedin.com/in/pubudujanith/">PubuduJ.</Link> All Rights Reserved.</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ForgotPassword;