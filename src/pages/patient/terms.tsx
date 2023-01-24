/* eslint-disable @next/next/no-img-element */
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
import Sort from '../../public/sort.png'

export default function Terms() {
    const [terms,setTerms] = useState([] as TermForPatient[]);
    const [showTerms,setShowTerms] = useState([] as TermForPatient[]);
    const [sortedBy,setSortedBy] = useState('');
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
        axios.get("http://localhost:8081/api/term/all/"+ userInfo.id,config).then(res => {
            setTerms(res.data);
            setShowTerms(res.data);
        }).catch(err => {
            console.log(err)
        }); 
    },[])
    useEffect(() => {
        console.log("usao!")
        sortAfterFiltering()
    },[showTerms])
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
    function cancel(term:TermForPatient)
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
        axios.put("http://localhost:8081/api/term/cancel/"+ term.termId +"/"+userInfo.id,null, config)
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
    function sortAscDate()
    {
        const sortedAscDate = showTerms.sort(
            (objA, objB) =>
            new Date(Number(objA.dateTime[0]),Number(objA.dateTime[1])-1,Number(objA.dateTime[2]),Number(objA.dateTime[3]),Number(objA.dateTime[4])).getTime()
             - new Date(Number(objB.dateTime[0]),Number(objB.dateTime[1])-1,Number(objB.dateTime[2]),Number(objB.dateTime[3]),Number(objB.dateTime[4])).getTime(),
          ); 
          setShowTerms(sortedAscDate);
    }
    function sortDescDate()
    {
        const sortedDescDate = showTerms.sort(
            (objA, objB) =>
            new Date(Number(objB.dateTime[0]),Number(objB.dateTime[1])-1,Number(objB.dateTime[2]),Number(objB.dateTime[3]),Number(objB.dateTime[4])).getTime()
             - new Date(Number(objA.dateTime[0]),Number(objA.dateTime[1])-1,Number(objA.dateTime[2]),Number(objA.dateTime[3]),Number(objA.dateTime[4])).getTime(),
          ); 
          setShowTerms(sortedDescDate);
    }
    function sortAscDuration()
    {
        const sortedAscDuration = showTerms.sort(
            (objA, objB) =>
            objA.durationInMinutes <= objB.durationInMinutes ? -1: 1
          ); 
          setShowTerms(sortedAscDuration);
    }
    function sortDescDuration()
    {
        const sortedDescDuration = showTerms.sort(
            (objA, objB) =>
            objA.durationInMinutes <= objB.durationInMinutes ? 1: -1
          ); 
          setShowTerms(sortedDescDuration);
    }
    function filterTerms(filterType:string) {
        console.log("usao!")
        if(filterType === "All")
            setShowTerms(terms);
        else if(filterType === "Done"){
            var tempTerms = [] as TermForPatient[];
            terms.forEach(term => {
                if(term.state.toString() == 'DONE'){
                    tempTerms.push(term);
                }
            });
            setShowTerms(tempTerms);
        }
        else{
            var tempTerms = [] as TermForPatient[];
            terms.forEach(term => {
                if(term.state.toString() == 'PENDING')
                    tempTerms.push(term);
            });
            setShowTerms(tempTerms);
        }
    }
    function sortAfterFiltering(){
        if(sortedBy == "DESCDATE") sortDescDate()
        else if(sortedBy == "ASCDATE") sortAscDate()
        else if(sortedBy == "DESCDURATION") sortDescDuration();
        else if(sortedBy == "ASCDURATION") sortAscDuration();
    }
    
  return (
    <Container className="mt-12 mb-32">
        <div className="flex justify-center mb-16">
            <div className="w-2/5 flex justify-center">
                <h1 className="my-auto text text-2xl">Show:</h1>
                <div className="mx-4 flex">
                    <input type="radio" onChange={()=>filterTerms("All")} className="mx-1"  id="html" name="fav_language" value="all"/>
                    <label className="my-auto text">All</label><br/>
                </div>
                <div className="mx-4 flex">
                    <input type="radio" onChange={()=>filterTerms("Done")} className="mx-1"  id="html" name="fav_language" value="Done"/>
                    <label className="my-auto text">Done</label><br/>
                </div>                
                <div className="mx-4 flex">
                    <input type="radio" onChange={()=>filterTerms("Pending")} className="mx-1"  id="html" name="fav_language" value="Pending"/>
                    <label className="my-auto text">Pending</label><br/>
                </div>
            </div>
            <h1 className="text-5xl w-1/5 text-center my-auto text font-bold">My terms</h1>
            <div className="flex ml-16 w-2/5">
                <h1 className="my-auto text text-2xl">Sort by:</h1>  
                <div className="mx-8">
                    <span className="text text-lg">Date</span>
                    <img src={Sort.src} alt="sort" className='w-6 h-6 mt-2 mx-auto my-auto cursor-pointer' onClick={() =>{
                        if(sortedBy === "DESCDATE"){
                            sortAscDate();
                            setSortedBy("ASCDATE");
                        }else{
                            sortDescDate();
                            setSortedBy("DESCDATE");
                        }
                    }}/>
                </div>
                <div className="mx-8">
                    <span className="text text-lg">Duration</span>
                    <img src={Sort.src} alt="sort" className='w-6 h-6 mt-2 mx-auto my-auto cursor-pointer' onClick={() =>{
                        if(sortedBy === "DESCDURATION"){
                            sortAscDuration();
                            setSortedBy("ASCDURATION");
                        }else{
                            sortDescDuration();
                            setSortedBy("DESCDURATION");
                        }
                    }}/>
                </div>
            </div>
        </div>
        {showTerms.map((term, index) =>{
            return <div key={index} className="text my-6 text-2xl flex border-b-2 pb-6 border-emerald-700 justify-between">
            <span>
                <span className="font-bold mr-2">Term {" "}{index + 1}:</span>
                <span> {" "}{term.center.name}</span>
                <span> {" "}{getDateTimeStart(term.dateTime)}</span>
                <span> {" "}{getDateTimeEnd(term.dateTime,term.durationInMinutes)}</span>
                <span> {" "}duration: {term.durationInMinutes} minutes</span>
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
