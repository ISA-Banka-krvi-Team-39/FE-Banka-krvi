
import CenterRegisterForm from '../shared-components/centerRegisterForm';
import { GetStaticProps, NextPage } from 'next';
import { WorkingStaff } from '../shared-components/model/shared/WorkingStaff';
import { useEffect, useState } from "react";
import axios from 'axios';
import { UserInfo } from '../shared-components/model/shared/UserInfo';
import { getDataFromToken } from '../shared-components/navbar/getToken';


const CenterRegister = () => {
  const [admins,setAdmins] = useState<WorkingStaff[]>([]);
    useEffect(()=>{
    
    var token = localStorage.getItem("auth")
    const tokenNotNull = token != null ? token : "";
    const config = {
    headers:{
    'Access-Control-Allow-Origin' : '*',
    'Authorization': `Bearer ${token}`
    }
    }
    var userInfo:UserInfo = getDataFromToken(tokenNotNull);
    if(userInfo.roles.toString().split('"')[1] !== "ROLE_ADMIN")window.location.href = '/';
    axios.get("http://localhost:8080/api/person/admins",config).then(res => {
    
      setAdmins(res.data)
    
    }).catch(err => {
        console.log(err)
    });
    
  }, []) 
    return (
      <CenterRegisterForm admins = {admins}/>   
    );
}
 


export default CenterRegister ;