import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../assets/Components/Header/Header';
import Home from '../assets/Components/Home/Home';

const Main = () => {
    return (
        <div className='w-11/12 mx-auto'>
            {/* <h1>This is a very nice</h1> */}
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;