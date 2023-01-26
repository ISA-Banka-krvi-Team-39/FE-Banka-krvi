import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomInputSearch from "../shared-components/Inputs/CustomInputForSearch";
import { UserInfo } from "../shared-components/model/shared/UserInfo";
import { getDataFromToken } from "../shared-components/navbar/getToken";

const FindTermForm = () => {
    
    const [termId,setTermId] = useState('');
    const [personId,setPersonId] = useState('');
    const router = useRouter();

    useEffect(()=>{
        var token = localStorage.getItem("auth")
        const tokenNotNull = token != null ? token : "";
        var userInfo:UserInfo = getDataFromToken(tokenNotNull);
        if(userInfo.roles.toString().split('"')[1] !== "ROLE_ADMIN")window.location.href = '/';
    },[])
    
    function findTermForm(){
        localStorage.setItem('personId',personId)
        localStorage.setItem('termId',termId)
        router.push('/personDescription')
    }

    return ( 
        <div className="px-12 flex flex-col pt-[286px] pb-[460px] ml-[750px]">
            <label className="pt-5 pb-2 text-lg text-emerald-700 ">Enter the term id:</label>
            <input onChange={(event)=>setTermId(event.target.value)} className="text-xl bg-gray-800 border-b-2 pb-1 w-[244px] text-emerald-200 border-emerald-800 placeholder-emerald-500" type='text'/>
            <label className="pt-5 pb-2 text-lg text-emerald-700">Enter the user id:</label>
            <input onChange={(event)=>setPersonId(event.target.value)} className="text-xl bg-gray-800 border-b-2 pb-1 w-[244px] text-emerald-200 border-emerald-800 placeholder-emerald-500" type='text'/>
            <div className="pt-12 pb-5">
            <button onClick={findTermForm} className="w-46 h-12 duration-150 rounded-[48px] pt-1 pb-2 font-bold text-lg  px-12  hover:scale-105 text-md text-emerald-200 bg-emerald-900 hover:text-emerald-900 hover:bg-emerald-200">Find term</button>
            </div>
        </div>
     );
}
 
export default FindTermForm;