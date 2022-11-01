import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import { SearchInputProp } from "./Interface";
import './SearchInput.css'


const SearchInput = ({ label, request, selectHandler, selectValue}:SearchInputProp) => {

    //To set the timeout
    let timeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 500);

    //It trigger the function after 1s of no interation
    const delayedSearch = (e:any) => {
        if(timeout){
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            const insertedValue: string = e.target.value
            request(insertedValue);
        }, 1000);
    }

    //Force search using the enter key
    const instantSearch = (e:any) => {
        if(e.keyCode === 13){
            if(timeout){
                clearTimeout(timeout);
            }
            const insertedValue: string = e.target.value
            request(insertedValue);
        }
    }

    return (
        <>
            <TextField 
                id="searchanimals" 
                label={label} 
                variant="filled" 
                className="search-input"
                onChange={delayedSearch}
                onKeyDown={instantSearch}
                InputProps={{ disableUnderline: true }}
            />
            <FormControl className="search-input-select">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectValue}
                    onChange={selectHandler}
                >
                    <MenuItem value={"dogs"}>Dogs</MenuItem>
                    <MenuItem value={"cats"}>Cats</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default SearchInput;