import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
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
        
        terms.forEach(function (term){
            let name:string = term.bloodDonor.name;
            let surname:string = term.bloodDonor.surname;
            const ev = {title:name+' '+surname,start:new Date(Number(term.dateTime[0]),Number(term.dateTime[1])-1,Number(term.dateTime[2]),Number(term.dateTime[3]),Number(term.dateTime[4])),
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

    return (
        <Calendar className="text-emerald-200" localizer={localizer} startAccessor="start"
        endAccessor="end" events={events} onSelectEvent={handleSelected} style={{ height: 500, margin: "50px" }} />
    );
}
 
export default TermCalendar;