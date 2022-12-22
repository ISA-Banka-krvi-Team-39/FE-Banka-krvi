import React, { ReactEventHandler } from "react";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import YearView, { DateCallback } from 'react-calendar';
import DatePicker from "react-datepicker";
import {Term} from "../shared-components/model/center/Term"
import "react-datepicker/dist/react-datepicker.css";

import { UserInfo } from "../shared-components/model/shared/UserInfo";
import { getDataFromToken } from "../shared-components/navbar/getToken";


const localizer = momentLocalizer(moment);

const TermCalendar = () => {
    let terms:Term[] = [];
    const[events,setEvents] = useState<any[]>([]);
    const router = useRouter();
    
    useEffect(()=>{
        if(localStorage.getItem('wasLogged')==='false'){
            router.push('/stranica/SystemAdminLanding')
        }
        let event:any[] = [];
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
        axios.get("http://localhost:8080/api/term/all",config).then(res => {
        terms = res.data
        console.log(terms)
        terms.forEach(function (term){
            let name:string = ""
            let surname:string = ""
            if(term.bloodDonor.name!==null){
            name = term.bloodDonor.name;
            }
            if(term.bloodDonor.surname!==null){
            surname = term.bloodDonor.surname;
            }
            let fullname = name + ' ' + surname;
            const ev = {title:fullname,start:new Date(Number(term.dateTime[0]),Number(term.dateTime[1])-1,Number(term.dateTime[2]),Number(term.dateTime[3]),Number(term.dateTime[4])),
                                         end:new Date(Number(term.dateTime[0]),Number(term.dateTime[1])-1,Number(term.dateTime[2]),Number(term.dateTime[3]),Number(term.dateTime[4])+Number(term.durationInMinutes))
                                         ,personId: term.bloodDonor.personId
                                         ,termId: term.termId
                                        }
            event.push(ev); 
            
        })
        setEvents(event)
        
        }).catch(err => {
            console.log(err)
        });
        
    }, [])
    
    function handleSelected(event:any){
        localStorage.setItem('personId',event.personId)
        localStorage.setItem('termId',event.termId)
        router.push('/personDescription')
    }
    
    const [dat, setDate] = useState(new Date());
    const [showYearly,setShowYearly] = useState(true);
    const onChange = (date:Date) => {
        
        setDate(date)
        let month:number = date.getMonth()
        
        setShowYearly(false)
       
      };
    function selectYearly(){
        setShowYearly(true)
    }

    return (
        <div>
            {showYearly &&(
        <div className="ml-[32rem] mt-[5rem] mb-[5rem] self-center">
        <YearView defaultView="year" onClickMonth={onChange}  value={dat} />
        </div>
            )}
        <div className="self-center">
        {!showYearly &&<button className="ml-[72%] w-[4.7%] h-[3.4%] absolute mt-[0.05em] rounded-l-sm active:bg-slate-600 hover:bg-slate-400 border text-emerald-200" onClick={selectYearly}>Year</button>}
        {!showYearly &&<Calendar  localizer={localizer} startAccessor="start"
            endAccessor="end" events={events}   defaultView={"month"} date={dat} onNavigate={dat=>setDate(dat)} onSelectEvent={handleSelected} style={{ height: 500, margin: "50px" }} />
            }
        
        </div>
        </div>
    );
}
 
export default TermCalendar;