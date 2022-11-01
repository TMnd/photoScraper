import React, { useEffect, useState } from 'react';
import './App.css';
import { NavBarElement, RedditInfo } from './Interfaces';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import About from './pages/About/About';
import axios from 'axios';

function App() {

  const [accessToken, setAccessToken] = useState();

  // Base configurations. It should be on a presistance store for the initialization of the app.
  const menuOptions: Array<NavBarElement>= [
    {
      name: "Home",
      url: "/"
    },
    {
      name: "Search",
      url: "/search"
    },
    {
      name: "About",
      url: "/about"
    }
  ]
  
  // FOR REDDIT API
  // Insert your configurations here. Should be on a env file or in a secure presistance storage.
  /* const redditInfo: RedditInfo = {
    userName: "TMind",
    userPassword: "2023Benfica",
    clientID: "OVPpCH4JlXJh1Z_cNAwY1A",
    secretID: "SuIQ5926gZ41avBPRt09RDn7ta0VuA",
  }

  useEffect(() => {

    console.log("APP Main compoenent rendered");

    const cancelToken = axios.CancelToken.source();
    
    const url = "https://www.reddit.com/api/v1/access_token";

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

    axios.post(url, params, config)
        .then((response) => {
            const access_token = response.data.access_token;
            setAccessToken(() => access_token);
        })
        .catch((error) => {
            if(axios.isCancel(error)){
                console.error(error.message);
            }
        })

        return () => {
            cancelToken.cancel();
        }
            
    },[]); */

  return (
    <div className='site-body'>
      <BrowserRouter>
        <Navbar navBarElements={menuOptions}/>
        <main className="site-main-body">
          <div>
            <Routes>
              <Route 
                  path="/" 
                  element={
                    <Home></Home>
                  }
              />
              <Route 
                  path="/search" 
                  element={
                    <Search
                      accessToken={accessToken}  
                    ></Search>
                  }
              />
              <Route 
                  path="/about" 
                  element={
                    <About></About>
                  }
              />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App;
