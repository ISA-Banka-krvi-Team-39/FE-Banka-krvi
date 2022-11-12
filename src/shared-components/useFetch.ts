import { useState, useEffect } from 'react';


const useFetch = (url: string) => {

    const [data,setData] = useState(null);
    useEffect(()=>{

      fetch(url).then(res => {
        
            if(!res.ok){
                throw Error('could not fetch');
            }
           return res.json();
        }).then(
            data=>{
              setData(data);
            }
        )
        
    },[url]);
    
    return data;
}

export default useFetch;