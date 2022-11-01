import { Typography } from "@mui/material";
import './Home.css'

const Home = () => {
    return (
        <div>
            <div className='homeArea'>
                <Typography variant="h6">
                    This project aims to create a search service to find pictures of multiple animals by selecting the breed and the source for the search.
                </Typography>
            </div>
        </div>
    )
}

export default Home;