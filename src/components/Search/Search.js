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


    return (
        <div>
                 <form >
                    <input type="text" name='from' placeholder="Pick From"/>
                    <br/>
                    <input type="text" name='to' placeholder="Pic To" />
                    <br/>
                    
                </form>
                <button onClick={()=> setResult(true)}>Search</button>

                {result && <SearchResult target = {target} ></SearchResult>}
        
            

               
            
            
            
        </div>
    );
};

export default Search;