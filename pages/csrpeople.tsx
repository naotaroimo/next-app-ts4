import axios from "axios";
import useSWR from "swr";

const CsrPeople =()=>{
   const {data,error} = useSWR(
           'http://localhost:3000/api/people',
           (url:string)=> axios(url).then(res => res.data)
       );
   
       console.log(data);

   return(
       <div>
           <h1>Client Side Rendering</h1>
           {JSON.stringify(data,null,4)}
       </div>
   );
}

export default CsrPeople