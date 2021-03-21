import React from 'react';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import OptionCard from '../OptionCard/OptionCard';
import './Home.css'


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
        <div style={{overflow:'hidden'}} className='home-container'>
           
           <Row className='d-flex justify-content-center option-container'>
                {
                    options.map(option => <OptionCard option={option} key={option.id} ></OptionCard>)
                }
            </Row>

        </div>
    );
};

export default Home;