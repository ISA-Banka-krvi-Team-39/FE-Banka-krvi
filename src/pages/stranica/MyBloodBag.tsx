import axios from "axios";
import { useEffect, useState } from "react";
import { BloodBag } from "../../shared-components/model/center/BloodBag";
import { UserInfo } from "../../shared-components/model/shared/UserInfo";
import { getDataFromToken } from "../../shared-components/navbar/getToken";

var bloodBagList : [BloodBag];
export default  function MyProfile() {

  const [bloodbag,setBloodBag] = useState<BloodBag[]>([]);
  useEffect(()=>{
    const token = localStorage.getItem("auth");
    const tokenNotNull = token != null ? token : "";
    const config = {
        headers:{
        'Access-Control-Allow-Origin' : '*',
        'Authorization': `Bearer ${token}`
        }
    }
    var userInfo:UserInfo = getDataFromToken(tokenNotNull);
    if(userInfo.roles.toString().split('"')[1] !== "ROLE_ADMIN")window.location.href = '/';

    axios.get("http://localhost:8081/api/bloodbag/list")
    .then(res => {
      bloodBagList = res.data;
      setBloodBag(res.data);
      console.log("list size: " + bloodBagList.length);
      console.log(bloodBagList);
    })
    .catch(err => {
      console.log(err)
    }
      )
     
     }, [])
  return (
    <div className=" w-full bg-gray-800 px-6 mt-20 justify-center inline-flex">
      <div className=" bg-gray-800 justify-center">
      </div>
      <div className='h-[750px] w-[600px] rounded-2xl py-5 px-5 border-4 border-black bg-emerald-800 text-slate-300 text-3xl break-words overflow-hidden'>
      {bloodbag.map((bag, index) => {
                return (
                
                <div key={index} className="flex py-4 border-b-2 border-x-2 border-emerald-800">
                    <p className='text px-4 text-xl w-[150px] text-center h-[28px] my-auto'>{bag.amount} kesa</p>
                    <p className='text px-4 text-xl w-[665px] text-center h-[28px] my-auto'>{bag.bloodType}</p>
                
                </div>
            )})}
      </div>
    </div>
)}