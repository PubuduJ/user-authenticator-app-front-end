import React, {SetStateAction, useEffect, useState} from "react";
import {User} from "../../pages/user/UserManagement";
import Toast, {ToastData} from "./Toast";
import {Modal, UploadFile, UploadProps} from "antd";
import Upload, {RcFile} from "antd/es/upload";
import Box from "@mui/material/Box";
import colorConfigs from "../../configs/colorConfigs";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import {Autocomplete, Button, Grid, TextField, Typography} from "@mui/material";
import ImgCrop from "antd-img-crop";
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import "./CreateEditViewUser.css";
// @ts-ignore
import {ReactComponent as ProfileIcon} from '../../assets/svgs/Profile Icon.svg';
import {getAllRoles} from "../../api/role/getAllRoles";

export enum UserMode {
    CREATE = "Create",
    EDIT = "Edit",
    VIEW = "View"
}

export type UserAction = {
    setIsDrawerOpen: React.Dispatch<SetStateAction<boolean>>;
    onConfirm: (user: User) => void;
}

type Props = {
    user: User;
    mode: UserMode;
    action: UserAction;
}

type ErrorMsgType = {
    emailError: string;
    firstNameError: string;
    lastNameError: string;
    mobileError: string;
    roleError: string;
}

export type Role = {
    id?: number;
    role: string;
    rolePermissions: RolePermission[]
}

export type RolePermission = {
    id?: number;
    permissionName: string;
}

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const CreateEditViewUser = ({user, mode, action}: Props) => {
    const [newUser, setNewUser] = useState<User>({
        id: null,
        img: "",
        email: "",
        firstName: "",
        lastName: "",
        mobile: "",
        roleIds: []
    });
    const [error, setError] = useState<ErrorMsgType>({
        emailError: " ",
        firstNameError: " ",
        lastNameError: " ",
        mobileError: " ",
        roleError: " "
    });
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
    const [toastConfig, setToastConfig] = useState<ToastData>({open: false, message: "", type: "error"});

    // Image uploading related states.
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>("");
    const [previewTitle, setPreviewTitle] = useState<string>("");

    useEffect(() => {
        if (mode === UserMode.CREATE) {
            setTimeout(() => {
                // @ts-ignore
                document.getElementById("email").focus();
            }, 300)
        } else if (mode === UserMode.EDIT) {
            setTimeout(() => {
                if (user.img !== "" && user.id !== null) {
                    setFileList(
                        [{
                            uid: user.id.toString(),
                            name: user.firstName + " " + user.lastName,
                            status: 'done',
                            url: user.img,
                        }])
                }
                // @ts-ignore
                document.getElementById("firstName").focus();
                // Update user img not setting to newUser state error fix from below code.
                setNewUser((prevState) => {
                    return {...prevState, "img": user.img}
                })
            }, 300)
        } else if (mode === UserMode.VIEW) {
            if (user.img !== "" && user.id !== null) {
                setFileList(
                    [{
                        uid: user.id.toString(),
                        name: user.firstName + " " + user.lastName,
                        status: 'done',
                        url: user.img,
                    }])
            }
            setTimeout(() => {
                if (user.img !== "" && user.id !== null) {
                    const elements = document.getElementsByClassName("ant-btn") as HTMLCollectionOf<Element>;
                    if (elements[0] !== undefined) (elements[0] as HTMLElement).style.display = "none";
                } else {
                    const elements = document.getElementsByClassName("ant-upload-select") as HTMLCollectionOf<Element>;
                    if (elements[0] !== undefined) (elements[0] as HTMLElement).style.display = "none";
                }
            }, 500)
        }
    }, [])

    useEffect(() => {
        setNewUser({...user});
        getRoleArray().then(r => {
        })
        if (user.roleIds.length === 0) setSelectedRoles([]);
        else if (user.roleIds.length !== 0) {
            getSelectedRoleArray().then(r => {
            });
        }
    }, [user]);

    useEffect(() => {
        if (newUser.roleIds.length !== 0) {
            setError((prevState: ErrorMsgType) => {
                return {...prevState, "roleError": " "}
            })
        }
    }, [newUser]);

    const getRoleArray = async () => {
        try {
            const response = await getAllRoles();
            setRoles(response.data);
        } catch (err: any) {
            if (err instanceof Error) setToastConfig({open: true, message: err.message, type: "error"})
            else setToastConfig({open: true, message: "Fail to load the user roles", type: "error"})
        }
    }

    const getSelectedRoleArray = async () => {
        try {
            const response = await getAllRoles();
            setSelectedRoles(response.data.filter((roleObject: Role) => {
                return user.roleIds.indexOf(roleObject.id ?? 0) !== -1;
            }))
        } catch (err: any) {
            if (err instanceof Error) setToastConfig({open: true, message: err.message, type: "error"})
            else setToastConfig({open: true, message: "Fail to load the user roles", type: "error"})
        }
    }

    // Image uploading related functions.
    useEffect(() => {
        if (fileList.length === 0) {
            setNewUser((prevState: User) => {
                return {...prevState, "img": ""}
            })
        }
    }, [fileList])

    const beforeImageUpload = async (file: RcFile) => {
        const isJpgOrPngOrJpeg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        if (!isJpgOrPngOrJpeg) {
            setToastConfig({
                open: true,
                message: "You can only upload JPG/JPEG/PNG file!",
                type: "error"
            });
            return Upload.LIST_IGNORE;
        }
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
            setToastConfig({
                open: true,
                message: "Cropped image must be smaller than 1MB!",
                type: "error"
            });
            return Upload.LIST_IGNORE;
        }
        const base64String = await getBase64(file as RcFile);
        setNewUser((prevState: User) => {
            return {...prevState, "img": base64String}
        })
        return true;
    };
    const onImageContainerChange: UploadProps['onChange'] = async ({fileList: newFileList}) => {
        setFileList(newFileList);
    };
    const onImagePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) file.preview = await getBase64(file.originFileObj as RcFile);
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
    const handleClear = () => {
        setNewUser((prevState: User) => {
            return {
                ...prevState,
                "id": (mode === UserMode.EDIT) ? prevState.id : null,
                "email": (mode === UserMode.EDIT) ? prevState.email : "",
                "firstName": "",
                "lastName": "",
                "mobile": "",
                "roleIds": [],
                "password": ""
            }
        });
        setError((prevState: ErrorMsgType) => {
            return {
                ...prevState,
                "emailError": " ",
                "firstNameError": " ",
                "lastNameError": " ",
                "mobileError": " ",
                "roleError": " ",
            }
        })
        setSelectedRoles([]);
        setFileList([]);
    }
    const handleAction = () => {
        if (error.emailError !== " ") {
            // @ts-ignore
            document.getElementById("email").focus();
            return;
        }
        if (error.firstNameError !== " ") {
            // @ts-ignore
            document.getElementById("firstName").focus();
            return;
        }
        if (error.lastNameError !== " ") {
            // @ts-ignore
            document.getElementById("lastName").focus();
            return;
        }
        if (error.mobileError !== " ") {
            // @ts-ignore
            document.getElementById("mobile").focus();
            return;
        }
        if (error.roleError !== " ") {
            // @ts-ignore
            document.getElementById("roles-field").focus();
            return;
        }
        if (!newUser.email || !newUser.firstName || !newUser.lastName || !newUser.mobile || newUser.roleIds.length === 0) {
            if (newUser.roleIds.length === 0) {
                // @ts-ignore
                document.getElementById("roles-field").focus();
                setError((prevState: ErrorMsgType) => {
                    return {...prevState, "roleError": "Please select the user roles",}
                });
            }
            if (!newUser.mobile) {
                // @ts-ignore
                document.getElementById("mobile").focus();
                setError((prevState: ErrorMsgType) => {
                    return {...prevState, "mobileError": "Mobile number is required",}
                });
            }
            if (!newUser.lastName) {
                // @ts-ignore
                document.getElementById("lastName").focus();
                setError((prevState: ErrorMsgType) => {
                    return {...prevState, "lastNameError": "Last name is required",}
                });
            }
            if (!newUser.firstName) {
                // @ts-ignore
                document.getElementById("firstName").focus();
                setError((prevState: ErrorMsgType) => {
                    return {...prevState, "firstNameError": "First name is required",}
                });
            }
            if (!newUser.email) {
                // @ts-ignore
                document.getElementById("email").focus();
                setError((prevState: ErrorMsgType) => {
                    return {...prevState, "emailError": "Email is required",}
                });
            }
            return;
        }
        if (mode === UserMode.CREATE) {
            action.onConfirm(newUser);
        } else if (mode === UserMode.EDIT) {
            action.onConfirm(newUser);
        }
    }
    const handleToastOnclose = (state: boolean) => {
        setToastConfig((prevState: ToastData) => {
            return {...prevState, "open": state}
        })
    };

    return (
        <>
            <Box
                position={"relative"}
                height={(window.innerWidth < 600) ? "fit-content" : "100%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                style={{backgroundColor: colorConfigs.mainBg}}
            >
                <Box top={"8px"} right={"24px"} position={"absolute"}>
                    <IconButton onClick={() => {
                        action.setIsDrawerOpen(false)
                    }}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <Grid
                    container
                    columnSpacing={6}
                    rowSpacing={3}
                    style={{backgroundColor: colorConfigs.mainBg}}
                    pl={4} pr={4} pt={2}
                >
                    <Grid display={"flex"} flexWrap={"wrap"} alignContent={"space-between"} item xs={12} sm={6}>
                        <Typography variant={"h5"}>{mode.valueOf()} User</Typography>
                        <TextField
                            sx={{
                                marginTop: "20px"
                            }}
                            required
                            InputProps={{
                                readOnly: (mode === UserMode.VIEW || mode === UserMode.EDIT),
                            }}
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            variant="standard"
                            error={(error.emailError !== " ")}
                            value={newUser.email}
                            helperText={error.emailError}
                            onChange={(event) => {
                                const {name, value} = event.target;
                                if (value.trim() === "") {
                                    setError((prevState: ErrorMsgType) => {
                                        return {...prevState, "emailError": "Email is required"}
                                    });
                                } else if (!/^[a-zA-Z0-9.!$'*/=?_~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
                                    setError((prevState: ErrorMsgType) => {
                                        return {...prevState, "emailError": "Enter valid email ID"}
                                    });
                                } else (setError((prevState: ErrorMsgType) => {
                                    return {...prevState, "emailError": " "}
                                }));
                                setNewUser((prevState) => {
                                    return {...prevState, [name]: value}
                                })
                            }}
                        />
                    </Grid>
                    <Grid pb={"20px"} item xs={12} sm={6}>
                        <Box
                            display={"flex"}
                            justifyContent={(window.innerWidth < 600) ? "center" : "flex-start"}
                        >
                            <Box
                                className={"outer-box"}
                                sx={{
                                    width: "200px",
                                    height: "200px",
                                    border: "1px solid darkgray",
                                    borderRadius: "8px",
                                }}
                                position={"relative"}
                            >
                                <Box
                                    position={"absolute"}
                                    zIndex={0}
                                >
                                    <Box
                                        id={"image-box"}
                                        sx={{
                                            width: "200px",
                                            height: "200px",
                                            display: "flex",
                                            flexWrap: "wrap",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignContent: "space-evenly",
                                        }}
                                    >
                                        {
                                            (mode === UserMode.CREATE || mode === UserMode.EDIT) ?
                                                <>
                                                    {/*<UploadIcon/>*/}
                                                    <DriveFolderUploadOutlinedIcon
                                                        sx={{
                                                            fontSize: 90,
                                                            color: "#80A2CE"
                                                        }}
                                                    />
                                                    <Box
                                                        display={"flex"}
                                                        flexWrap={"wrap"}
                                                        justifyContent={"center"}
                                                    >
                                                        <Typography>Drag and Drop Here or</Typography>
                                                        <Typography>Upload Profile Image</Typography>
                                                    </Box>
                                                </> : (
                                                    <>
                                                        <ProfileIcon/>
                                                    </>
                                                )
                                        }
                                    </Box>
                                </Box>
                                <Box
                                    position={"absolute"}
                                    zIndex={1}
                                >
                                    <ImgCrop
                                        showGrid
                                        showReset
                                        zoomSlider
                                    >
                                        <Upload
                                            action=""
                                            listType="picture-card"
                                            accept=".jpeg,.png,.jpg"
                                            fileList={fileList}
                                            multiple={false}
                                            beforeUpload={beforeImageUpload}
                                            onChange={onImageContainerChange}
                                            onPreview={onImagePreview}
                                        >
                                            {
                                                (fileList.length < 1) &&
                                                " "
                                            }
                                        </Upload>
                                    </ImgCrop>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            InputProps={{
                                readOnly: (mode === UserMode.VIEW),
                            }}
                            id="firstName"
                            name="firstName"
                            label="First name"
                            fullWidth
                            variant="standard"
                            error={(error.firstNameError !== " ")}
                            value={newUser.firstName}
                            helperText={error.firstNameError}
                            onChange={(event) => {
                                const {name, value} = event.target;
                                if (value.trim() === "") {
                                    setError((prevState: ErrorMsgType) => {
                                        return {...prevState, "firstNameError": "First name is required"}
                                    });
                                } else if (!/^[A-Za-z][A-Za-z ]+$/.test(value)) {
                                    setError((prevState: ErrorMsgType) => {
                                        return {...prevState, "firstNameError": "Enter valid first name"}
                                    });
                                } else (setError((prevState: ErrorMsgType) => {
                                    return {...prevState, "firstNameError": " "}
                                }));
                                setNewUser((prevState: User) => {
                                    return {...prevState, [name]: value}
                                })
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            InputProps={{
                                readOnly: (mode === UserMode.VIEW),
                            }}
                            id="lastName"
                            name="lastName"
                            label="Last name"
                            fullWidth
                            variant="standard"
                            error={(error.lastNameError !== " ")}
                            value={newUser.lastName}
                            helperText={error.lastNameError}
                            onChange={(event) => {
                                const {name, value} = event.target;
                                if (value.trim() === "") {
                                    setError((prevState: ErrorMsgType) => {
                                        return {...prevState, "lastNameError": "Last name is required"}
                                    });
                                } else if (!/^[A-Za-z][A-Za-z ]+$/.test(value)) {
                                    setError((prevState: ErrorMsgType) => {
                                        return {...prevState, "lastNameError": "Enter valid last name"}
                                    });
                                } else (setError((prevState: ErrorMsgType) => {
                                    return {...prevState, "lastNameError": " "}
                                }));
                                setNewUser((prevState: User) => {
                                    return {...prevState, [name]: value}
                                })
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            InputProps={{
                                readOnly: (mode === UserMode.VIEW),
                            }}
                            id="mobile"
                            name="mobile"
                            label="Mobile"
                            fullWidth
                            variant="standard"
                            error={(error.mobileError !== " ")}
                            value={newUser.mobile}
                            helperText={error.mobileError}
                            onChange={(event) => {
                                const {name, value} = event.target;
                                if (value.trim() === "") {
                                    setError((prevState: ErrorMsgType) => {
                                        return {...prevState, "mobileError": "Mobile number is required"}
                                    });
                                } else if (!/^[+]?[0-9]+$/.test(value)) {
                                    setError((prevState: ErrorMsgType) => {
                                        return {...prevState, "mobileError": "Enter a valid mobile number"}
                                    });
                                } else (setError((prevState: ErrorMsgType) => {
                                    return {...prevState, "mobileError": " "}
                                }));
                                setNewUser((prevState: User) => {
                                    return {...prevState, [name]: value}
                                })
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {
                            (mode === UserMode.CREATE || mode === UserMode.EDIT) ?
                                <Autocomplete
                                    sx={{pt: 0.4}}
                                    multiple
                                    id="roles-field"
                                    size="small"
                                    autoHighlight
                                    options={roles}
                                    value={selectedRoles}
                                    getOptionLabel={(option) => option.role}
                                    isOptionEqualToValue={(option: Role, value: Role) => {
                                        return option.id === value.id;
                                    }}
                                    ChipProps={{
                                        color: "primary",
                                        deleteIcon: <CloseIcon/>,
                                        sx: {borderRadius: 1, fontSize: "14px"}
                                    }}
                                    onChange={(event, value) => {
                                        setSelectedRoles([...value]);
                                        let newRoles: number[] = [];
                                        for (let i = 0; i < value.length; i++) {
                                            newRoles.push(value[i].id ?? 0);
                                        }
                                        setNewUser((prevState: User) => {
                                            return {...prevState, "roleIds": newRoles}
                                        });
                                        if (value.length === 0) setError((prevState: ErrorMsgType) => {
                                            return {...prevState, "roleError": "Please select the user roles",}
                                        });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            name="roles"
                                            label="Roles *"
                                            placeholder="Search"
                                            error={(error.roleError !== " ")}
                                            helperText={error.roleError}
                                        />
                                    )}
                                /> :
                                <Autocomplete
                                    sx={{pt: 0.4}}
                                    multiple
                                    id="tags-standard"
                                    size="small"
                                    autoHighlight
                                    options={roles}
                                    value={selectedRoles}
                                    getOptionLabel={(option) => option.role}
                                    isOptionEqualToValue={(option: Role, value: Role) => {
                                        return option.id === value.id;
                                    }}
                                    open={false}
                                    readOnly={true}
                                    ChipProps={{
                                        color: "primary",
                                        deleteIcon: <></>,
                                        sx: {borderRadius: 1, fontSize: "14px"}
                                    }}
                                    popupIcon={<></>}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Roles *"
                                            helperText=" "
                                        />
                                    )}
                                    disableClearable
                                />
                        }
                    </Grid>
                </Grid>
                {
                    (mode === UserMode.CREATE || mode === UserMode.EDIT) &&
                    <Box style={{backgroundColor: colorConfigs.mainBg}} pb={2} pt={2} pr={4} display={"flex"}
                         justifyContent={"flex-end"} gap={2}>
                        <Button variant="outlined" sx={{backgroundColor: colorConfigs.secondBg}} onClick={handleClear}>Clear</Button>
                        {
                            (mode === UserMode.CREATE) &&
                            <Button sx={{p: "10px 50px 10px 50px"}} variant="contained" onClick={handleAction}>Create
                                User</Button>
                        }
                        {
                            (mode === UserMode.EDIT) &&
                            <Button sx={{p: "10px 50px 10px 50px"}} variant="contained" onClick={handleAction}>Update
                                User</Button>
                        }
                    </Box>
                }
            </Box>
            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewOpen(false)}
            >
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
            <Toast
                data={toastConfig}
                action={{
                    onClose: handleToastOnclose
                }}
            />
        </>
    )
}

export default CreateEditViewUser;