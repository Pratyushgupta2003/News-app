import React from 'react'
import './App.css';
import Navbar from './component/Navbar';
import News from './component/News';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


const App= ()=> {
    let pagesize = 10;
    const [progress, setProgress] = useState(0);
    
     let api=process.env.REACT_APP_NEWS_API;
  
    return (
      <>
    <BrowserRouter>
    <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
    <Navbar/>
      <Routes>
        <Route path="/" element={ <News setprogress={setProgress} api={api} key="s"/> }/>
        <Route exact path="/sports" element={  <News setprogress={setProgress} api={api}key="sports" pageSize= {pagesize} category="sports" country="in"/>} />
        <Route exact path="/technology" element={<News setprogress={setProgress} api={api}key="technology"pageSize={pagesize} category="technology" country="in"/>} />
        <Route exact path="/science" element={<News setprogress={setProgress} api={api}key="science" pageSize={pagesize} category="science" country="in"/>} />
        <Route exact path="/health" element={<News setprogress={setProgress} api={api}key="health" pageSize={pagesize} category="health" country="in"/>} />
          <Route exact path="/general" element={<News setprogress={setProgress} api={api}key="general"  pageSize={pagesize} category="general" country="in"/>} />
          <Route exact path="/entertainment" element={<News setprogress={setProgress} api={api}key="entertainment"  pageSize={pagesize} category="entertainment" country="in"/>} />
        
        
      </Routes>
    </BrowserRouter>
    
      
  </>
    )
  }

  export default App