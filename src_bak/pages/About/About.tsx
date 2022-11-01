import Typography from '@mui/material/Typography';
import './About.css'

const about = () => {
    return (
        <div>
            <div className='aboutArea'>
                <Typography variant="h5">
                    João Luís Amaral
                </Typography>
                <Typography variant="h6">
                    joaoamaral1989@hotmail.com
                </Typography>
                <Typography variant="h6">
                    https://github.com/tmnd
                </Typography>
                <p>
                    I really enjoyed this exercice. Ideas about how it can be improved do not stop.
                    Thanks for your time.
                </p>
            </div>
        </div>
    )
}

export default about;