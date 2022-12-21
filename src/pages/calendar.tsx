
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import {Term} from "../shared-components/model/center/Term"
import "react-datepicker/dist/react-datepicker.css";

const localizer = momentLocalizer(moment);

const TermCalendar = () => {
    let terms:Term[] = [];
    const[events,setEvents] = useState<any[]>([]);
    
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
        axios.get("http://localhost:8080/api/term/all",config).then(res => {
        
        terms = res.data
        console.log(terms)
        for(let i = 0;i<terms.length;i++){
            let name:string = terms[i].bloodDonors[0].name
            let surname:string = terms[i].bloodDonors[0].surname
            
            const ev = {title:name+' '+surname,start:new Date(Number(terms[i].dateTime[0]),Number(terms[i].dateTime[1])-1,Number(terms[i].dateTime[2]),Number(terms[i].dateTime[3]),Number(terms[i].dateTime[4])),
                                         end:new Date(Number(terms[i].dateTime[0]),Number(terms[i].dateTime[1])-1,Number(terms[i].dateTime[2]),Number(terms[i].dateTime[3]),Number(terms[i].dateTime[4])+Number(terms[i].durationInMinutes))
                                         ,personId:terms[i].bloodDonors[0].personId
                                         ,termId: terms[i].termId
                                        }
            event.push(ev); 
        
        }
        
        setEvents(event);
        
        }).catch(err => {
            console.log(err)
        });
        
    }, [])
    
    function handleSelected(event:any){
        localStorage.setItem('personId',event.personId)
        localStorage.setItem('termId',event.termId)
    }

    return (
        <Calendar className="text-emerald-200" localizer={localizer} startAccessor="start"
        endAccessor="end" events={events} onSelectEvent={handleSelected} style={{ height: 500, margin: "50px" }} />
    );
}
 
export default TermCalendar;