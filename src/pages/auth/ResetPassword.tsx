import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { ToastData } from "../../components/common/Toast";
import {Box, Button, CircularProgress, Grid, TextField, Typography} from "@mui/material";
import Link from "@mui/material/Link";

type ErrorMsgType = {
    temporaryPassword: string;
    newPassword: string;
    repeatNewPassword: string;
}

export type PasswordObject = {
    temporaryPassword: string;
    newPassword: string;
    repeatNewPassword: string;
}

const ResetPassword = () => {
    const [toastConfig, setToastConfig] = useState<ToastData>({ open: false, message: "", type: "success" });
    const [passwordObject, setPasswordObject] = React.useState<PasswordObject>({
        temporaryPassword: "", newPassword: "", repeatNewPassword: ""
    })
    const [error, setError] = useState<ErrorMsgType>({temporaryPassword: "", newPassword: "", repeatNewPassword: ""})
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {

    }

    // Mobile screen auto-responsive code logic.
    const [renderComponent, setRenderComponent] = useState("");
    useEffect(() => {
        const handleOrientationChange = () => {
            if (window.matchMedia("(orientation: portrait)").matches) {
                setRenderComponent("Mobile View");
            } else {
                setRenderComponent("Desktop View");
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
                height={(window.innerHeight <= 530) ? "700px" : (window.innerHeight <= 730) ? 730 : window.innerHeight}
            >
                <Box maxWidth={"470px"} bottom={0} right={0} position={"absolute"} padding={4}>
                    <Typography variant='h4' align='center'>Update Password</Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            id="temporaryPassword"
                            label="Temporary Password"
                            name="temporaryPassword"
                            autoComplete="temporaryPassword"
                            autoFocus
                            type='password'
                            error={(error.temporaryPassword !== "")}
                            helperText={error.temporaryPassword}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const { name, value } = event.target;
                                if (value.trim() === "") {
                                    setError((prevState: ErrorMsgType) => {
                                        return { ...prevState, "temporaryPassword": "Temporary Password is required" }
                                    });
                                } else {
                                    setError((prevState: ErrorMsgType) => {
                                        return { ...prevState, "temporaryPassword": "" }
                                    });
                                }

                                setPasswordObject((prevState) => {
                                    return { ...prevState, [name]: value }
                                })
                            }}
                        />
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            id="newPassword"
                            label="New Password"
                            name="newPassword"
                            autoComplete="newPassword"
                            type='password'
                            error={(error.newPassword !== "")}
                            helperText={error.newPassword}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const { name, value } = event.target;
                                if (value.trim() === "") {
                                    setError((prevState: ErrorMsgType) => {
                                        return { ...prevState, "newPassword": "Password is required" }
                                    });
                                } if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
                                    setError((prevState: ErrorMsgType) => {
                                        return { ...prevState, "newPassword": "Password should contain 8 characters including both numbers and letters, at least one capital and simple letter, and one special character" }
                                    });
                                } else {
                                    setError((prevState: ErrorMsgType) => {
                                        return { ...prevState, "newPassword": "" }
                                    });
                                }

                                setPasswordObject((prevState) => {
                                    return { ...prevState, [name]: value }
                                })

                                if (value && passwordObject.repeatNewPassword && passwordObject.repeatNewPassword.trim() != ""
                                    && value != passwordObject.repeatNewPassword) {
                                    setError((prevState: ErrorMsgType) => {
                                        return { ...prevState, "repeatNewPassword": "New password and Repeat new password should be equal" }
                                    });
                                }
                            }}
                        />
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            id="repeatNewPassword"
                            label="Repeat New Password"
                            name="repeatNewPassword"
                            autoComplete="repeatNewPassword"
                            type='password'
                            error={(error.repeatNewPassword !== "")}
                            helperText={error.repeatNewPassword}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const { name, value } = event.target;
                                if (value.trim() === "") {
                                    setError((prevState: ErrorMsgType) => {
                                        return { ...prevState, "repeatNewPassword": "Repeat New Password is required" }
                                    });
                                } else {
                                    setError((prevState: ErrorMsgType) => {
                                        return { ...prevState, "repeatNewPassword": "" }
                                    });
                                }

                                setPasswordObject((prevState) => {
                                    return { ...prevState, [name]: value }
                                })

                                if (passwordObject.newPassword && passwordObject.newPassword != value) {
                                    setError((prevState: ErrorMsgType) => {
                                        return { ...prevState, "repeatNewPassword": "New password and Repeat new password should be equal" }
                                    });
                                }
                            }}
                        />
                        <Box sx={{ position: 'relative' }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update Password
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
                        </Box>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="subtitle1" onClick={() => { navigate('/') }}>
                                    Skip
                                </Link>
                            </Grid>
                            <Grid item paddingY={1}>
                                <Link href="#" variant="subtitle1" onClick={() => { navigate('/sign-in') }}>
                                    Back
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography
                        align={"center"}
                        fontWeight={"bold"}
                        variant={"subtitle1"}
                    >
                        © {new Date().getFullYear()} <Link href="https://www.linkedin.com/in/pubudujanith/">PubuduJ.</Link> All Rights Reserved.
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default ResetPassword;