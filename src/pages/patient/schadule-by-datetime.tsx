/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Container from "../../shared-components/container/Container";
import { Term } from "../../shared-components/model/center/Term";
import { UserInfo } from "../../shared-components/model/shared/UserInfo";
import { getDataFromToken } from "../../shared-components/navbar/getToken";
import Sort from '../../public/sort.png'
import CustomInput from "../../shared-components/Inputs/CustomInput";
import { LocalDateTime } from "js-joda";
import classNames from "classnames";
import { TermByDate } from "../../shared-components/model/center/TermByDate";
import { TermForPatient } from "../../shared-components/model/center/TermForPatient";
import { CreateTermWithPatientDTO } from "../../shared-components/model/center/CreateTermWithPatientDTO";

export default function ScheduleByDateTime() {
    const [terms,setTerms] = useState([] as TermByDate[]);
    const [sortedBy,setSortedBy] = useState('');
    const router = useRouter();
    const [name,setName] = useState(LocalDateTime.now().toString().substring(0,19));
    const [formValid,setFormValid] = useState(false);
    const [duration,setDuration] = useState('');
    const [centerId,setCenterId] = useState('');

    var createTermDTO : CreateTermWithPatientDTO = new CreateTermWithPatientDTO(0,0,0,LocalDateTime.now(),0);

    useEffect(()=>{
        validate();
    },[name])

    function getDateTimeStart(dateString:String)
    {
         const date:Date = new Date(Number(dateString[0]),Number(dateString[1])-1,Number(dateString[2]),Number(dateString[3]),Number(dateString[4]))
         var hours = "";
         var minutes = "";
         if (date.getHours()   < 10) { hours = "0" + date.getHours();}
         else hours = date.getHours().toString();
         if (date.getMinutes() < 10) {minutes = "0" + date.getMinutes();}
         else minutes = date.getMinutes().toString();
         return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + hours +":" + minutes;
    }

    function SearchTerm(){
        var token = localStorage.getItem("auth")
        const config = {
            headers:{
            'Access-Control-Allow-Origin' : '*',
            'Authorization': `Bearer ${token}`
            }
        }
         axios.get("http://localhost:8081/api/center/listDateTime/?localDateTime=" + name + "&duration=" + duration,config).then(res => {
             setTerms(res.data);
         }).catch(err => {
             console.log(err)
         }); 
    }
    function schedule(id:number)
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
        axios.get("http://localhost:8081/api/patient/"+ userInfo.id+"/penals",config)
        .then(res => {
            
                if(res.data >= 3){
                    toast.error('You have 3 or more penals! You cant schedule!', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    return;
                }
                createTermDTO.dateTime = LocalDateTime.parse(name);
                createTermDTO.durationInMinutes = Number.parseInt(duration);
                createTermDTO.patientId = userInfo.id;
                createTermDTO.centerId = id;
                axios.post("http://localhost:8081/api/term/createTermWithPatient",createTermDTO, config)
                .then(res => {
                    toast.success('Your term is evidented!', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    router.push("/");
                })
                .catch(err => {
                    toast.error('Seems like you had blood donation in last 6 months or will donate in next 6 months or you didnt fill questionnaire, you cant schedule now!', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                });
        })
        .catch(err => console.log(err));
    }

    function validate(){
        var regexNames = new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}$");
        setFormValid(regexNames.test(name));
      }

    var validButton = formValid ? "text-emerald-200 bg-emerald-900" : "text-gray-800 bg-gray-400 cursor-default";
    function sortAsc()
    {
        const sortedAsc = terms.sort(
            (objA, objB) =>
            objA.avgGrade - objB.avgGrade); 
     
          setTerms(sortedAsc);
    }
    function sortDesc()
    {
        const sortedDesc = terms.sort(
            (objA, objB) => objB.avgGrade - objA.avgGrade
          ); 
          setTerms(sortedDesc);
    }
    
  return (
    <div>
        <div className=" bg-gray-800 mr-3 w-[350px] justify-center mt-4">
        <CustomInput
            value = {name}
            type='text'
            regex="^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$"
            notValidText='Date is not in valid format, format is YYYY-MM-DDThh:mm:qq'
            onChange={(event) => {
              setName(event.target.value);
            }}
            nameToSet='Date and time'
          ></CustomInput>
          <CustomInput
            value={duration}
            type='number'
            regex='^.+$'
            notValidText='Duration is in minutes insert only numbers!'
            onChange={(event) => {
              setDuration(event.target.value);
            }}
            nameToSet='Duration'
          ></CustomInput>
          <button onClick={SearchTerm} disabled={!formValid} className={classNames(" rounded-[32px] px-8 py-4 font-medium text-2xl",validButton)}>
            Search Centers
          </button>
        </div>
    <Container className="mt-12 mb-32">
        <div className="flex justify-center">
            <h1 className="text-5xl text-center mb-12 text font-bold">Possible terms</h1>
            <img src={Sort.src} alt="sort" className='w-6 mb-[52px] h-6 my-auto cursor-pointer' onClick={() =>{
                        if(sortedBy === "DESC"){
                            sortAsc();
                            setSortedBy("ASC");
                        }else{
                            sortDesc();
                            setSortedBy("DESC");
                        }
                    }}/>
        </div>
        {terms.map((term, index) =>{
            return <div key={index} className="text my-6 text-2xl flex border-b-2 pb-6 border-emerald-700 justify-between">
            <span>
                <span className="font-bold mr-2">Term {" "}{index + 1}:</span>
                <span> {" "}{term.name}</span>
                <span> {" "}{term.city}</span>
                <span> {" "}{term.avgGrade}</span>
                </span>
                <button onClick={() =>schedule(term.id)} className="duration-150 rounded-[48px] pt-1 pb-2 font-bold px-12  hover:scale-105 text-md text-emerald-200 bg-emerald-900 hover:text-emerald-900 hover:bg-emerald-200">
                    schedule
                </button>
            </div>
        })}
    <ToastContainer theme="dark" />
    </Container>
    </div>
  )
}
