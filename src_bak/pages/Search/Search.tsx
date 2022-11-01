import React from 'react';
import { useState, useEffect,useMemo } from 'react';
import TextField from '@mui/material/TextField';
import './Search.css'
import { SearchProp } from '../../Interfaces';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Alert from '@mui/material/Alert';

const Search = ({accessToken}:SearchProp) => {

    const [picList, setPicList] = useState([]);
    const [picListShowSize, setPicListShowSize] = useState(25);
    let timeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000);

    const search = (query:string) => {
    
        const cancelToken = axios.CancelToken.source();

        const queryCase = query.toLowerCase();
        
        const url = `https://dog.ceo/api/breed/${queryCase}/images`;
        
        
        axios.get(url, {})
            .then((response) => {
                setPicList(() => response.data.message);
            })
            .catch((error) => {
                if(error.code == "ERR_BAD_REQUEST" && picList.length>0){
                    setPicList(() => []);
                }
                if(axios.isCancel(error)){
                    console.error(error.message);
                }
            })  
    
            return () => {
                cancelToken.cancel();
            }

        //For Reddit API
        /* 
        const url = "https://www.reddit.com/r/aww.json";
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            auth: {
                username: redditInfo.clientID,
                password: redditInfo.secretID,
            },
            cancelToken: cancelToken.token
        };
    
        const authData = {
            grant_type: "password",
            username: redditInfo.userName,
            password: redditInfo.userPassword,
        };
        
        const params = new URLSearchParams(authData);

        const config = {
            headers: { Authorization: `Bearer ${accessToken}` },
            cancelToken: cancelToken.token
        };
    
        axios.get(url, {})
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                if(axios.isCancel(error)){
                    console.error(error.message);
                }
            })
    
            return () => {
                cancelToken.cancel();
            } */
    }

    //It trigger the function after 1s of no interation
    const delayedSearch = (e:any) => {
        if(timeout){
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            const insertedValue: string = e.target.value
            search(insertedValue);
        }, 1000);
    }

    //Force search using the enter key
    const instantSearch = (e:any) => {
        if(e.keyCode == 13){
            const insertedValue: string = e.target.value
            search(insertedValue);
        }
    }

    const gallery = picList.slice(0, picListShowSize).map((element, index) => {
        return (
            <Card sx={{ maxWidth: 250 }} key={index}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="200"
                        image={element}
                        alt={element}
                        className="searchCard"
                    />
                </CardActionArea>
            </Card>
        );
    });

    return (
        <div>
            {/* {accessToken ? */}
                <>
                    <div className="searchArea">
                        <TextField 
                            id="outlined-basic" 
                            label="Query search" 
                            variant="filled" 
                            className='textField'
                            onChange={delayedSearch}
                            onKeyDown={instantSearch}
                            InputProps={{ disableUnderline: true }}
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
                </>
            {/* :
            <div className="searchArea">
                <p>Acess token not found.</p>
            </div>
        }  */}
        </div>
    )
}

export default Search;