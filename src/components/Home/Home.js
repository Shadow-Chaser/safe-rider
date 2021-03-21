import React from 'react';
import { useEffect, useState } from 'react';
import OptionCard from '../OptionCard/OptionCard';


const Home = () => {

    const [options, setOptions] = useState([]);


    useEffect(()=>{
    fetch(`https://api.mocki.io/v1/f55e8be6`)
    .then(response => response.json())
    .then(data => {
        setOptions(data);
    })
    .catch(error=>error)

    },[])

    return (
        <div style={{overflow:'hidden'}}>
           

            <div className="d-flex  row ">   
            <div className="col-md-8 col-sm-12 d-flex flex-wrap">
                {
                options.map(option => <OptionCard option={option} key={option.id} ></OptionCard>)
                }
            </div>
            </div>
        </div>
    );
};

export default Home;