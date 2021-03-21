import React from 'react';
import './SearchResult.css'

const SearchResult = (props) => {
    const {name, image} = props.target;
    const {from, to} = props.route;

    return (
        <div style={{marginLeft:'50px'}}>
            <h1>From: {from} To: {to}</h1>
            <div className="ride-option">
                <img src={image} alt=""/>
                <p>{name}</p>
                <p>$88</p>
            </div>
            <div className="ride-option">
                <img src={image} alt=""/>
                <p>{name}</p>
                <p>$59</p>
            </div>
            <div className="ride-option">
                <img src={image} alt=""/>
                <p>{name}</p>
                <p>$28</p>
            </div>
            
            

        </div>
    );
};

export default SearchResult;