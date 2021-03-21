import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import SearchResult from '../SearchResult/SearchResult';

const Search = () => {
    const {id} = useParams()
    const transportId = parseInt(id);

    const [transports, setTransports] = useState([]);


    useEffect(()=>{
        fetch(`https://api.mocki.io/v1/f55e8be6`)
        .then(res=>res.json())
        .then(data=>setTransports(data))
    }, [])

    

    const target = transports.find(transport => transportId === transport.id) || {};
    const [result, setResult] = useState(false);

    const [route, setRoute] = useState({
        from:'',
        to:''
    })

    const handleBlur =(e)=>{
        const newRoute = {...route};
        newRoute[e.target.name] = e.target.value;
        setRoute(newRoute);
    }
    console.log(route);
    return (
        <div>
                 <form >
                    <input type="text" name='from' onBlur={handleBlur} placeholder="Pick From"/>
                    <br/>
                    <input type="text" name='to' onBlur={handleBlur} placeholder="Pic To" />
                    <br/>
                    
                </form>
                <button onClick={()=> setResult(true)}>Search</button>

                {result && <SearchResult target = {target} route={route}></SearchResult>}
        
            

               
            
            
            
        </div>
    );
};

export default Search;