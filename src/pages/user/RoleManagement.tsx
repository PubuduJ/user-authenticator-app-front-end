import {Breadcrumbs, Grid, Typography} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import * as React from "react";

const RoleManagement = () => {
    return (
        <>
            <Grid pl={3} pr={3} pt={4} container rowSpacing={2}>
                <Grid item xs={12}>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="medium"/>}
                    >
                        <Link
                            underline="hover"
                            color="inherit"
                            href="#"
                            variant='h6'
                        >
                            User
                        </Link>
                        <Link
                            underline="hover"
                            href="#"
                            fontWeight="bold"
                            variant='h6'
                        >
                            Role Management
                        </Link>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"h6"}>ROLE MANAGEMENT</Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default RoleManagement;