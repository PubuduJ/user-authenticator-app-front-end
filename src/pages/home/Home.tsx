import {Grid, Typography} from "@mui/material";

const Home = () => {
    return (
        <>
            <Grid pl={3} pr={3} pt={"15px"} container>
                <Grid item>
                    <Typography variant={"h6"}>Home Page</Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default Home;