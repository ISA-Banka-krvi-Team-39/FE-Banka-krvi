
import MyCenter from '../pages/stranica/MyCenter';
import { GetStaticProps, NextPage } from 'next';
import { WorkingStaff } from '../shared-components/model/shared/WorkingStaff';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { UserInfo } from '../shared-components/model/shared/UserInfo';
import { getDataFromToken } from '../shared-components/navbar/getToken';


const MyCenterAdmins = () => {
  const [admins,setAdmins] = useState<WorkingStaff[]>([]);
  const [scheduledAdmins,setScheduledAdmins] = useState<WorkingStaff[]>([]);
  const router = useRouter();
    useEffect(()=>{
      if(localStorage.getItem('wasLogged')==='false'){
        router.push('/stranica/SystemAdminLanding')
      }
      var token = localStorage.getItem("auth")
      const tokenNotNull = token != null ? token : "";
      const config = {
      headers:{
      'Access-Control-Allow-Origin' : '*',
      'Authorization': `Bearer ${token}`
      }
      }
    
  
    }, [])

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
    axios.put("http://localhost:8081/api/center/find/" + userInfo.id,1,config)
    .then(res => {
      findAdmins(res.data);
      findAvail(res.data);
    }).catch(err => console.log(err))
     
    
      }, [])
   
  return (
      <MyCenter admins={admins} scheduledAdmins={scheduledAdmins}/>   
  );
  function findAdmins(id : number)
  {
    var token = localStorage.getItem("auth")
    const tokenNotNull = token != null ? token : "";
    const config = {
        headers:{
        'Access-Control-Allow-Origin' : '*',
        'Authorization': `Bearer ${token}`
        }
    }
    var userInfo:UserInfo = getDataFromToken(tokenNotNull);
    axios.get("http://localhost:8081/api/person/scheduledAdmins/" + id,config).then(res => {
    
    setScheduledAdmins(res.data)
  
    }).catch(err => {
      console.log(err)
    });
  }
  function findAvail(id:number)
  {
    var token = localStorage.getItem("auth")
    const tokenNotNull = token != null ? token : "";
    const config = {
        headers:{
        'Access-Control-Allow-Origin' : '*',
        'Authorization': `Bearer ${token}`
        }
    }
    var userInfo:UserInfo = getDataFromToken(tokenNotNull);
    axios.get("http://localhost:8081/api/person/admins/" + id,config).then(res => {
  
    setAdmins(res.data);
    console.log(admins.length);
  
    }).catch(err => {
      console.log(err)
    });
  }
}
 

export default MyCenterAdmins ;