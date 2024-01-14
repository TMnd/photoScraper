import { useState, useRef, useEffect} from 'react';
import CardElement from '../../components/CardElement/CardElement';
import SearchInput from '../../components/SearchInput/SearchInput';
import { getCodeFromNameIfExists, normalizeResultFromDiffApis } from '../../helpers/ApiResultHelper';
import Alert from '@mui/material/Alert';
import { SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import { IDictionary, DataSource, AnimalData } from './Interface';
import './Search.css'
import Toast from '../../components/Toast/Toast';
import { ToastProps } from '../../components/Toast/Interface'


//This configuration should be better
const dataSource:IDictionary = {
    "dogs":{
        "baseUrl":"https://dog.ceo/api/breed",
        "imageEndpoint":"images",
        "helpEndPoint":"https://dog.ceo/api/breeds/list/all",
        "queryInfo":"Input the dog breed"   
    },
    "cats":{
        "baseUrl":"https://api.thecatapi.com",
        "imageEndpoint":"v1/images/search",
        "helpEndPoint":"https://api.thecatapi.com/v1/breeds",
        "queryInfo":"Input the cat breed"
    }
}

const Search = () => {
    let breedListInit: Array<AnimalData> = [];
    const breedList = useRef(breedListInit);
    const [picList, setPicList] = useState([]);
    let toastOptions: ToastProps = {
        open: false,
        messageText: '',
        severity: 'success'
    }
    const [openToast, setOpenToast] = useState(toastOptions);
    const [selectedDataSource, setSelectedDataSource] = useState("dogs");
    const picListShowSize = useRef(25);
    const querySearch = useRef("");

    const cancelToken = axios.CancelToken.source();

    useEffect(() => {
        const dataSourceData:DataSource = dataSource[selectedDataSource];

        axios.get(dataSourceData.helpEndPoint, {})
        .then((response) => {
           
            let data = response.data;
            
            breedList.current = [];

            const structure = normalizeResultFromDiffApis(data);

            for(let animal of structure){
                breedList.current.push(animal);
            }   

            setPicList(() => []);

            const searchInput = document?.getElementById("searchanimals") as HTMLInputElement;
            searchInput.value="";
             
        })
        .catch((error) => { 
            if(error.code === "ERR_BAD_REQUEST" && picList.length>0){
                setPicList(() => []);
            }
            if(axios.isCancel(error)){
                console.error(error.message);
            }
        })  

        return () => {
            cancelToken.cancel();
        }
// eslint-disable-next-line
    }, [selectedDataSource]);

    const search = (query:string) => {
        querySearch.current = query;

        let queryCase = query.toLowerCase();
        let url = "";

        if(queryCase) {

            queryCase = getCodeFromNameIfExists(breedList.current, queryCase);

            //It is necessary since this are two api with different structures.
            if(selectedDataSource === "dogs") {
                url = `${dataSource[selectedDataSource].baseUrl}/${queryCase}/${dataSource[selectedDataSource].imageEndpoint}`;
            } else {
                url = `${dataSource[selectedDataSource].baseUrl}/${dataSource[selectedDataSource].imageEndpoint}?limit=${picListShowSize.current}&breed_ids=${queryCase}`;
            }
            
            axios.get(url, {})
                .then((response) => {
                    
                    if(response.data.length === 0) {
                        setOpenToast({...openToast, open:true, messageText:'Search returned empty', severity:'warning'});
                    }else{
                        setOpenToast({...openToast, open:true, messageText:'Search successful', severity:'success'});
                    }

                    if(selectedDataSource === "dogs") {
                        setPicList(() => response.data.message);
                        return
                    }
                    setPicList(() => response.data);
                })
                .catch((error) => {

                    setOpenToast({...openToast, open:true, messageText:error.response.data.message, severity:'error'});

                    if(error.code === "ERR_BAD_REQUEST" && picList.length>0){
                        setPicList(() => []);
                    }
                    if(axios.isCancel(error)){
                        console.error(error.message);
                    }
                })  
        
                return () => {
                    cancelToken.cancel();
                }
        }
    }

    //It will slice the array by the value of picListShowSize.
    //This value could be on a select box in the page's body.
    const gallery = picList.slice(0, picListShowSize.current).map((element, index) => {
        const contextQuery = `${querySearch.current.toUpperCase()} - Picture number: ${index+1}`;
        const images = (element["url"]) ? (element["url"]) : element;
        
        return (
            <CardElement
                key={index}
                image={images}
                alt={element}
                styleClass={"searchCard"}
                maxWidth={350}
                query={contextQuery}
            />
        );
    });

    //To handle the selectBox selection
    const handleChange = (event: SelectChangeEvent) => {
        setSelectedDataSource(event.target.value as string);
    };

    const closeModal = () => {
        setOpenToast({...openToast, open:false});
    }
    
    return (
        <div>
            <Toast
                open={openToast.open}
                close={closeModal}
                messageText={openToast.messageText}
                severity={openToast.severity}
            />
            <div className="searchArea">
                <SearchInput
                    label={`${dataSource[selectedDataSource].queryInfo}`}
                    request={search}
                    selectHandler={handleChange}
                    selectValue={selectedDataSource}
                />
            </div>
            <div className='searchResulArea'>
            {picList.length>0 ?
                <div className='searchGallery'>
                    {gallery}
                </div>
                :
                <Alert severity="warning">The search returned empty</Alert>
            }
            </div>
        </div>
    )
}

export default Search;