import { Typography } from "@mui/material";
import { TextAreaProps } from "./Interface";

const TextArea = ({variant, text}: TextAreaProps) => {

    return (
        <Typography variant={variant}>
             {text}
        </Typography>
    )
}

export default TextArea