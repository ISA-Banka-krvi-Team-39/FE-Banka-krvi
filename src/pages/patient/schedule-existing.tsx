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

export default function ScheduleExisting() {
    const [terms,setTerms] = useState([] as Term[]);
    const [sortedBy,setSortedBy] = useState('');
    const router = useRouter();
    useEffect(()=>{
        var token = localStorage.getItem("auth")
        const config = {
            headers:{
            'Access-Control-Allow-Origin' : '*',
            'Authorization': `Bearer ${token}`
            }
        }
        axios.get("http://localhost:8080/api/term/all/free",config).then(res => {
            setTerms(res.data);
        }).catch(err => {
            console.log(err)
        }); 
    },[])
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
    function getDateTimeEnd(dateString:String,timeAdd:string)
    {
        const date:Date = new Date(Number(dateString[0]),Number(dateString[1])-1,Number(dateString[2]),Number(dateString[3]),Number(dateString[4])+Number(timeAdd))
        var hours = "";
        var minutes = "";
        if (date.getHours()   < 10) { hours = "0" + date.getHours();}
        else hours = date.getHours().toString();
        if (date.getMinutes() < 10) {minutes = "0" + date.getMinutes();}
        else minutes = date.getMinutes().toString();
        return "- " + hours +":" + minutes;
    }
    function schedule(term:Term)
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
        axios.put("http://localhost:8080/api/term/schedule/"+ userInfo.id, term, config)
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
    }
    function sortAsc()
    {
        console.log("Usao asc!")
        const sortedAsc = terms.sort(
            (objA, objB) =>
            new Date(Number(objA.dateTime[0]),Number(objA.dateTime[1])-1,Number(objA.dateTime[2]),Number(objA.dateTime[3]),Number(objA.dateTime[4])).getTime()
             - new Date(Number(objB.dateTime[0]),Number(objB.dateTime[1])-1,Number(objB.dateTime[2]),Number(objB.dateTime[3]),Number(objB.dateTime[4])).getTime(),
          ); 
          setTerms(sortedAsc);
    }
    function sortDesc()
    {
        console.log("Usao desc!")
        const sortedDesc = terms.sort(
            (objA, objB) =>
            new Date(Number(objB.dateTime[0]),Number(objB.dateTime[1])-1,Number(objB.dateTime[2]),Number(objB.dateTime[3]),Number(objB.dateTime[4])).getTime()
             - new Date(Number(objA.dateTime[0]),Number(objA.dateTime[1])-1,Number(objA.dateTime[2]),Number(objA.dateTime[3]),Number(objA.dateTime[4])).getTime(),
          ); 
          setTerms(sortedDesc);
    }
    
  return (
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
                <span> {" "}{term.center.name}</span>
                <span> {" "}{getDateTimeStart(term.dateTime)}</span>
                <span> {" "}{getDateTimeEnd(term.dateTime,term.durationInMinutes)}</span>
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
