import React from 'react';
import './SearchResult.css'

const SearchResult = (props) => {
    const {name, image} = props.target;

    return (
        <div>
            <h1>Mirpur 1 to Dhanmondhi</h1>
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