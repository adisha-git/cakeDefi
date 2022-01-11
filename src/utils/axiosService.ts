import axios from "axios";

const fetchData = async({type, url, headers, payload}: any) => {
    try{
        let response;
        if(type === 'GET'){
             response = await axios(url, headers);
        }else if(type === 'POST'){
             response = await axios.post(url, payload, headers);
        }
        return response 
    }catch(error: any){
      throw new Error(error);
    }
};

export {
    fetchData
}