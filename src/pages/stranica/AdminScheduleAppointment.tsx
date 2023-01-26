import axios, { AxiosResponse, HttpStatusCode } from 'axios';
import classNames from 'classnames';
import { useEffect, useState } from 'react'
import CustomInput from '../../shared-components/Inputs/CustomInput';
import { MedicalStaffDTO } from '../../shared-components/model/center/MedicalStaffDTO';
import { CreateTermDTO } from '../../shared-components/model/center/CreateTermDTO';
import { getDataFromToken } from '../../shared-components/navbar/getToken';
import { UserInfo } from '../../shared-components/model/shared/UserInfo';
import { LocalDateTime } from 'js-joda';
import { toast, ToastContainer } from 'react-toastify';
import { Term } from '../../shared-components/model/center/Term';
import { PatieDto } from '../../shared-components/model/PatientUser/PatieDto';
import { TermForPatDto } from '../../shared-components/model/PatientUser/TermForPatDto';

var str;
export default function Register() {
 

  const [name,setName] = useState(LocalDateTime.now().toString().substring(0,19));
  const [lastTermDate,setLastTermDate] = useState('');
  const [termDate,setTermDate] = useState('');
  const [duration,setDuration] = useState('');
  const [formValid,setFormValid] = useState(false);
  const [medicalStaffs,setMedicalStaffs] = useState([] as MedicalStaffDTO[]);
  const [terms,setTerms] = useState([] as Term[]);
  const [lastTerm,setLastTerm] = useState('');
  const [patients,setPatients] = useState([] as PatieDto[]);
  const [selectedMS,setSelectedMS] = useState(-1);
  const [selectedP,setSelectedP] = useState(-1);



  var createTermDTO : CreateTermDTO = new CreateTermDTO(0,0,0,LocalDateTime.now());

  var termLast : Term;
  var scheduleTermForPat : TermForPatDto = new TermForPatDto(0,0);
  
  useEffect(() => {
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
     axios.get("http://localhost:8081/api/term/free",config)
       .then(res => {
        setTerms(res.data);
     })
     .catch(err => console.log(err));
     axios.get("http://localhost:8081/api/patient/all",config)
       .then(res => {
        setPatients(res.data);
     })
     .catch(err => console.log(err));
     validate();
  },[termDate,lastTermDate]);
  function getLastTerm(id : number)
  {
    var strr;
    var token = localStorage.getItem("auth")
    const tokenNotNull = token != null ? token : "";
    const config = {
        headers:{
        'Access-Control-Allow-Origin' : '*',
        'Authorization': `Bearer ${token}`
        }
    }
    var userInfo:UserInfo = getDataFromToken(tokenNotNull);
    axios.put("http://localhost:8081/api/term/findLast/" + id,id,config)
    .then(res => {
        console.log(res.data);
        strr = res.data;
        setLastTermDate(res.data + "");
  })
  .catch(err => console.log(err));
  axios.get("http://localhost:8081/api/term/date/" + selectedMS,config)
    .then(res => {
        str = res.data;
        setTermDate(res.data + "");

  })
  
  }
  function ScheduleTerm(){
    var token = localStorage.getItem("auth")
    const tokenNotNull = token != null ? token : "";
    const config = {
        headers:{
        'Access-Control-Allow-Origin' : '*',
        'Authorization': `Bearer ${token}`
        }
    }
    var userInfo:UserInfo = getDataFromToken(tokenNotNull);
    scheduleTermForPat.patientId = selectedP;
    scheduleTermForPat.termId = selectedMS;
    axios.put("http://localhost:8081/api/term/scheduleTerm",scheduleTermForPat,config)
       .then(res => {
        toast.success("Success! Go to calendar and check it out!", {
          position: toast.POSITION.TOP_RIGHT
      });
           
     })
     .catch(err => console.log(err));
  }
  var validButton = formValid ? "text-emerald-200 bg-emerald-900" : "text-gray-800 bg-gray-400 cursor-default";

  function validate(){
  var lastTermMonth = Number.parseInt(lastTermDate.split("-")[1]);
    var lastTermYear = Number.parseInt(lastTermDate.split("-")[0]);
    var termMonth = Number.parseInt(termDate.split("-")[1]);
    var termYear = Number.parseInt(termDate.split("-")[0]);
    var lastTermDay = Number.parseInt(lastTermDate.split("-")[2]);
    var termDay = Number.parseInt(termDate.split("-")[2]);

    var retVal = false;
    if(lastTermYear == termYear)
    {
        if(termMonth - lastTermMonth > 6)
        {
            setFormValid(true);
        }
        else
        setFormValid(false);
        if(termMonth - lastTermMonth == 6)
        {
            if(termDay - lastTermDay >= 0)
            {
                setFormValid(true);
            }
        }
        else
        setFormValid(false);
    }
    if(lastTermYear < termYear)
    {
        if(lastTermMonth <= 6)setFormValid(true);
        else{
            if(lastTermMonth > 6)
            {
                if(lastTermMonth - termMonth <= 3)
                {
                    setFormValid(true);
                }
                else setFormValid(false);
            }
        }

    }
    //setFormValid(regexDuration.test(duration) && regexNames.test(name));
  }

  return (
      <div className=" w-full bg-gray-800 px-6 mt-20 justify-center inline-flex">
        <div className=" bg-gray-800 justify-center">
          <div className="my-5 w-[700px]">
            <div className="w-[256px] inline-flex justify-end">
            <span className="text text-4xl mr-4 min-w-max">Term:</span>
            </div>
            <select 
            id="center" 
            name="center" 
            className="text-emerald-200 text-4xl w-[415px] bg-gray-800 border-2 pb-1 border-emerald-800"
            onChange={(e) => {
              setSelectedMS(Number.parseInt(e.target.value));


            }}
            >
              {terms.map((medStaff,index) => (
                <option key={index} value={medStaff.termId}>{medStaff.dateTime} {medStaff.durationInMinutes}</option>
                ))}
            </select>
          </div>
          <div className="my-5 w-[700px]">
            <div className="w-[256px] inline-flex justify-end">
            <span className="text text-4xl mr-4 min-w-max">Patient:</span>
            </div>
            <select 
            id="center" 
            name="center" 
            className="text-emerald-200 text-4xl w-[415px] bg-gray-800 border-2 pb-1 border-emerald-800"
            onChange={(e) => {
              setSelectedP(Number.parseInt(e.target.value));
              getLastTerm(Number.parseInt(e.target.value));
              
            }}
            >
              {patients.map((medStaff,index) => (
                <option key={index} value={medStaff.personId}>{medStaff.name} {medStaff.surname} </option>
                ))}
            </select>
          </div>
          <div className='w-full inline-flex justify-center mt-5 mb-28'>
          <button onClick={ScheduleTerm} disabled={!formValid} className={classNames(" rounded-[32px] px-8 py-4 font-medium text-2xl",validButton)}>
            Schedule Term
          </button>
          </div>
        </div>
        <ToastContainer theme="dark" />
      </div>
  )
}