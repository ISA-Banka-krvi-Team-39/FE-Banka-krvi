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

interface props{
    patient:PatientDto[];
}

export default function ScheduleExisting() {
    const [terms,setTerms] = useState([] as Term[]);
    const [patients,setPatients] = useState([] as PatientDto[]);
    const router = useRouter();
    const [searchText,setSearchText] = useState('');
    

    
    useEffect(()=>{
      if(localStorage.getItem('wasLogged')==='false'){
        router.push('/stranica/SystemAdminLanding')
      }
        let event:any[] = [];
        var token = localStorage.getItem("auth")
        const config = {
            headers:{
            'Access-Control-Allow-Origin' : '*',
            'Authorization': `Bearer ${token}`
            }
        }
        axios.get("http://localhost:8081/api/term/all/done",config).then(res => {
            setTerms(res.data);
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        }); 
    },[])
    const search = (users:PatientDto[]) => {
        return users.filter(
          (u) => u.name.toLowerCase().includes(searchText) || u.surname.toLowerCase().includes(searchText) || (u.name + ' ' + u.surname).toLowerCase().includes(searchText))
      }
        
        
      const filtered = search(patients);
    function sortByName()
    {
        console.log("usao u sort");
        const termes = terms;
        const sortedData =  terms.slice(0).sort((a,b) => 
        {
         return a.bloodDonor.name > b.bloodDonor.name ? -1 : 1
        })
        console.log(sortedData);
            
        setTerms(sortedData);
      
    }
    function sortBySurname()
    {
        console.log("usao u sort");
        const termes = terms;
        const sortedData =  terms.slice(0).sort((a,b) => 
        {
         return a.bloodDonor.surname > b.bloodDonor.surname ? -1 : 1
        })
        console.log(sortedData);
            
        setTerms(sortedData);
    }
    function sortByDate()
    {
        console.log("usao u sort");
        const termes = terms;
        const sortedData =  terms.slice(0).sort((a,b) => 
        {
         return a.dateTime > b.dateTime ? 1 : -1
        })
        console.log(sortedData);
            
        setTerms(sortedData);
    }
    function getDateFromString(str:string)
    {
        var retStr = "";
        for(let i = 0 ; i < str.length;i++ )
        {
                retStr += str.charAt(i);
                if(i == 3 || i == 5 || i == 7)retStr += " ";
        }
        console.log(retStr);
    }
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
      <h1 className="text-5xl text-center mb-12 text font-bold">Patients</h1>
      <button onClick={sortByName} className="duration-150 rounded-[48px] pt-1 pb-2 font-bold px-3  hover:scale-105 text-md text-emerald-200 bg-emerald-900 hover:text-emerald-900 hover:bg-emerald-200">
                Sort by name
            </button>
            <button onClick={sortBySurname}  className="duration-150 rounded-[48px] pt-1 pb-2 font-bold px-3  hover:scale-105 text-md text-emerald-200 bg-emerald-900 hover:text-emerald-900 hover:bg-emerald-200">
                Sort by surname
            </button>
            <button onClick={sortByDate}  className="duration-150 rounded-[48px] pt-1 pb-2 font-bold px-3  hover:scale-105 text-md text-emerald-200 bg-emerald-900 hover:text-emerald-900 hover:bg-emerald-200">
                Sort by date
            </button>
      {
      terms.map((term, index) =>{
        return<div key={index} className="text my-6 text-2xl flex border-b-2 pb-6 border-emerald-700 justify-between">
            
            <ul>

            Term {" "}{index + 1}:{term.bloodDonor.name} {term.bloodDonor.surname} {term.dateTime.toString().split(",")[0] + " " + term.dateTime.toString().split(",")[1] + " " + term.dateTime.toString().split(",")[2]   }
            </ul>
          {/* <span>
            <span className="font-bold mr-2">Term {" "}{index + 1}:</span>
            <span> {" "}{term.bloodDonor.name}</span>
            <span> {" "}{term.bloodDonor.surname}</span>
            <span> {" "}{term.dateTime}</span>
            </span> */}
           
        </div>
      })}
    <ToastContainer theme="dark" />
    </Container>
  )
}
