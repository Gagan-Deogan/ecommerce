import { useLocation } from "react-router-dom"

export const useQuery = () =>{
    const query = new URLSearchParams(useLocation().search);

    const queryParser = (queryString)=>{
        try{
            return JSON.parse(queryString) ;
        }catch(err){
            return null;
        }
    }

    const queryEncoder = (query) =>{
        try{
            return JSON.stringify(query);
        }catch(err){
            return null;
        }
    }

    return { query, queryParser, queryEncoder }

}