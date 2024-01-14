import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBarElement } from './components/Navbar/Interface';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import About from './pages/About/About';
import './App.css';

function App() {

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
  
  return (
    <div className='site-body'>
      <BrowserRouter basename="/photoScraper">
        <Navbar navBarElements={menuOptions}/>
        <main className="site-main-body">
          <div>
            <Routes>
              <Route 
                  path="/" 
                  element={
                    <Home/>
                  }
              />
              <Route 
                  path="/search" 
                  element={
                    <Search/>
                  }
              />
              <Route 
                  path="/about" 
                  element={
                    <About/>
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
