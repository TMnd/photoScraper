export interface CardProp {
    image: string,
    alt: string,
    styleClass: string,
    maxWidth: number,
    query: string
}

export interface SimpleDialogProps {
    image: string,
    title: string,
    open: boolean,
    selectedValue: string,
    onClose: (value: string) => void
}
