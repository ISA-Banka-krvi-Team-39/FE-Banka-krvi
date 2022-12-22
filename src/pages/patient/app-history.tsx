/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Container from "../../shared-components/container/Container";
import { Term } from "../../shared-components/model/center/Term";
import { PatientDto } from "../../shared-components/model/PatientUser/PatientDto";
import { PatDto } from "../../shared-components/model/PatientUser/PatDto";
import { PatientUser } from "../../shared-components/model/PatientUser/PatientUser";
import { UserInfo } from "../../shared-components/model/shared/UserInfo";
import { getDataFromToken } from "../../shared-components/navbar/getToken";

interface props{
    patient:PatientDto[];
}

export default function ScheduleExisting() {
    const [terms,setTerms] = useState([] as Term[]);
    const [patients,setPatients] = useState([] as PatDto[]);
    const router = useRouter();
    const [searchText,setSearchText] = useState('');
    

    
    useEffect(()=>{
        let event:any[] = [];
        const token = localStorage.getItem("auth");
        const tokenNotNull = token != null ? token : "";
        const config = {
            headers:{
            'Access-Control-Allow-Origin' : '*',
            'Authorization': `Bearer ${token}`
            }
        }
        var userInfo:UserInfo = getDataFromToken(tokenNotNull);
        axios.get("http://localhost:8080/api/appointment/patient/" + userInfo.id,config).then(res => {
            setPatients(res.data);
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        }); 
    },[])
    const search = (users:PatDto[]) => {
        return users.filter(
          (u) => u.name.toLowerCase().includes(searchText) || u.surname.toLowerCase().includes(searchText) || (u.name + ' ' + u.surname).toLowerCase().includes(searchText))
      }
        
        
      const filtered = search(patients);
    function schedule(term:PatientDto)
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
        localStorage.setItem("personId",''+term.personId);
        localStorage.setItem("termId",''+term.termId);
        router.push('/personDescription');
    }
    
  return (
    <Container className="mt-12 mb-32">
      <h1 className="text-5xl text-center mb-12 text font-bold">Terms</h1>
      {patients.map((term, index) =>{
        return<div key={index} className="text my-6 text-2xl flex border-b-2 pb-6 border-emerald-700 justify-between">
            
          <span>
            <span className="font-bold mr-2">Term {" "}{index + 1}:</span>
            <span> {" "}{term.name}</span>
            <span> {" "}{term.surname}</span>
            <span> {" "}{term.date}</span>
            </span>
        </div>
      })}
    <ToastContainer theme="dark" />
    </Container>
  )
}
