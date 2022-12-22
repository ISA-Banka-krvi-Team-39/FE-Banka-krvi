/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Container from "../../shared-components/container/Container";
import { Term } from "../../shared-components/model/center/Term";
import { PatientDto } from "../../shared-components/model/PatientUser/PatientDto";
import { PatientUser } from "../../shared-components/model/PatientUser/PatientUser";
import { UserInfo } from "../../shared-components/model/shared/UserInfo";
import { getDataFromToken } from "../../shared-components/navbar/getToken";

export default function ScheduleExisting() {
    const [terms,setTerms] = useState([] as Term[]);
    const [patients,setPatients] = useState([] as PatientDto[]);
    const router = useRouter();
    useEffect(()=>{
        let event:any[] = [];
        var token = localStorage.getItem("auth")
        const config = {
            headers:{
            'Access-Control-Allow-Origin' : '*',
            'Authorization': `Bearer ${token}`
            }
        }
        axios.get("http://localhost:8080/api/patient/terms",config).then(res => {
            setPatients(res.data);
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        }); 
    },[])
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
      <h1 className="text-5xl text-center mb-12 text font-bold">Possible terms</h1>
      {patients.map((term, index) =>{
        return <div key={index} className="text my-6 text-2xl flex border-b-2 pb-6 border-emerald-700 justify-between">
          <span>
            <span className="font-bold mr-2">Term {" "}{index + 1}:</span>
            <span> {" "}{term.name}</span>
            <span> {" "}{term.surname}</span>
            </span>
            <button onClick={() =>schedule(term)} className="duration-150 rounded-[48px] pt-1 pb-2 font-bold px-12  hover:scale-105 text-md text-emerald-200 bg-emerald-900 hover:text-emerald-900 hover:bg-emerald-200">
                schedule
            </button>
        </div>
      })}
    <ToastContainer theme="dark" />
    </Container>
  )
}
