import { GetStaticProps, NextPage } from 'next';
import { PersonDTO } from '../shared-components/model/shared/Person';
import UserList from '../shared-components/UserList';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';

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
    axios.get("http://localhost:8080/api/person/all",config).then(res => {
    
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