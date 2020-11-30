import { GetServerSideProps } from "next";

interface Person{
   id:number;
   name:string;
   email:string;
}

//SsrPeopleコンポーネントがうけつけるpropsの型
interface PeopleProps {
   people:Person[]
}

const SsrPeople =({people}:PeopleProps)=>{
   return (
       <div>
           <h1>SSR rendering </h1>
           {JSON.stringify(people,null,4)}
       </div>
   );
}

export default SsrPeople

export const getServerSideProps:GetServerSideProps = async (ctx)=>{
//    const cookie = ctx.req?.headers.cookie;
   
   const res = await fetch('http://localhost:3000/api/people',
       {
           headers:{
               cookie:cookie!
           }
       }
   );
   const people = await res.json();
   return {props:{people}};
}