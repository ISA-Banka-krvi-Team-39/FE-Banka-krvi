/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Container from "../../shared-components/container/Container";
import { State } from "../../shared-components/model/center/State";
import { Term } from "../../shared-components/model/center/Term";
import { TermForPatient } from "../../shared-components/model/center/TermForPatient";
import { UserInfo } from "../../shared-components/model/shared/UserInfo";
import { getDataFromToken } from "../../shared-components/navbar/getToken";

export default function Terms() {
    const [terms,setTerms] = useState([] as TermForPatient[]);
    const router = useRouter();
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
        axios.get("http://localhost:8080/api/term/all/"+ userInfo.id,config).then(res => {
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
    function cancel(term:Term)
    {
        var token = localStorage.getItem("auth")
        const config = {
            headers:{
            'Access-Control-Allow-Origin' : '*',
            'Authorization': `Bearer ${token}`
            }
        }
        axios.put("http://localhost:8080/api/term/cancel/"+ term.termId,null, config)
        .then(res => {
            toast.success('Your term is evidented!', {
                position: toast.POSITION.TOP_RIGHT
            });
            router.push("/");
        })
        .catch(err => {
            toast.error('You cant cancel for tommorow!', {
                position: toast.POSITION.TOP_RIGHT
            });
        });
    }
    
  return (
    <Container className="mt-12 mb-32">
      <h1 className="text-5xl text-center mb-12 text font-bold">My terms</h1>
      {terms.map((term, index) =>{
        return <div key={index} className="text my-6 text-2xl flex border-b-2 pb-6 border-emerald-700 justify-between">
          <span>
            <span className="font-bold mr-2">Term {" "}{index + 1}:</span>
            <span> {" "}{term.center.name}</span>
            <span> {" "}{getDateTimeStart(term.dateTime)}</span>
            <span> {" "}{getDateTimeEnd(term.dateTime,term.durationInMinutes)}</span>
            </span>
            <button hidden={term.state.toString() == "DONE"} onClick={() =>{cancel(term)}} className="duration-150 rounded-[48px] pt-1 pb-2 font-bold px-12  hover:scale-105 text-md text-emerald-200 bg-emerald-900 hover:text-emerald-900 hover:bg-emerald-200">
                Cancel
            </button>
        </div>
      })}
    <ToastContainer theme="dark" />
    </Container>
  )
}
