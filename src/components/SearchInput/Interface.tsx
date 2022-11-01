import { SelectChangeEvent } from "@mui/material";

export interface SearchInputProp {
    label: string, 
    request(input: string): any,
    selectHandler(event: SelectChangeEvent): any,
    selectValue:string,
}