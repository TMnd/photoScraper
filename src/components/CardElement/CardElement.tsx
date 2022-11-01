import { useState } from 'react';
import { Dialog, DialogTitle } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';
import { CardProp, SimpleDialogProps } from './Interface';
import './CardElement.css';

function SimpleDialog({title, image, onClose, selectedValue, open}: SimpleDialogProps) {
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <div className="model-title">
            <div>
                <DialogTitle>{title}</DialogTitle>
            </div>
            <div 
                className="model-close-icon"
                onClick={handleClose}
            >  
                <CloseIcon />
            </div>
        </div>
        <CardMedia
            component="img"
            height="500"
            image={image}
            alt={image}
        />
      </Dialog>
    );
}

const CardElement = ({image, alt, styleClass, maxWidth, query}:CardProp) => {
    
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(image);

    const handleClickOpen = () => {
        setOpen(true);
    };    

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <>
            <Card 
                sx={{ maxWidth: {maxWidth} }}
                onClick={handleClickOpen}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="400"
                        image={image}
                        alt={alt}
                        className={styleClass}
                    />
                </CardActionArea>
            </Card>
            <SimpleDialog
                title={query}
                image={image}
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </>
    )
}

export default CardElement;