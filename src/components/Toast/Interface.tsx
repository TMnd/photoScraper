import { AlertColor } from "@mui/material";

export interface ToastProps {
    open: boolean,
    close?: any,
    messageText: string, 
    severity: AlertColor
}