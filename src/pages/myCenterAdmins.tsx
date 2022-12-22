
import MyCenter from '../pages/stranica/MyCenter';
import { GetStaticProps, NextPage } from 'next';
import { WorkingStaff } from '../shared-components/model/shared/WorkingStaff';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';


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
    axios.get("http://localhost:8080/api/person/admins",config).then(res => {
  
    setAdmins(res.data)
  
    }).catch(err => {
      console.log(err)
    });
  
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
      axios.get("http://localhost:8080/api/person/scheduledAdmins",config).then(res => {
    
      setScheduledAdmins(res.data)
    
      }).catch(err => {
        console.log(err)
      });
    
      }, [])
   
  return (
      <MyCenter admins={admins} scheduledAdmins={scheduledAdmins}/>   
  );
}
 

export default MyCenterAdmins ;