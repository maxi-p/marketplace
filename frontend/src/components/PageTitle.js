import React from 'react';

const PageTitle = props =>
{
    return(
        <div className='pageTitle'>
        <img src="openMarketLogo.png" className="logo"/>
        <h1 id="title">{props.title}</h1> 
        </div>
      
    );
};

export default PageTitle;