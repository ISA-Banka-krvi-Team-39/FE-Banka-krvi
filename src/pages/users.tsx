import { GetStaticProps, NextPage } from 'next';
import { PersonDTO } from '../shared-components/model/shared/Person';
import UserList from '../shared-components/UserList';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { getDataFromToken } from '../shared-components/navbar/getToken';
import { UserInfo } from '../shared-components/model/shared/UserInfo';

const Users = () => {
  const [users,setUsers] = useState<PersonDTO[]>([]);
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
    var userInfo:UserInfo = getDataFromToken(tokenNotNull);
    if(userInfo.roles.toString().split('"')[1] !== "ROLE_ADMIN")window.location.href = '/';
    axios.get("http://localhost:8081/api/person/all",config).then(res => {
    
      setUsers(res.data)
    
    }).catch(err => {
        console.log(err)
    });
    
  }, []) 
  
  return (

        <UserList users = {users} />

    );
}




export default Users;