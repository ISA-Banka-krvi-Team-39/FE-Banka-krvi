import axios, { AxiosResponse, HttpStatusCode } from 'axios';
import classNames from 'classnames';
import Head from 'next/head'
import Image from 'next/image'
import { config } from 'process';
import { useEffect, useState } from 'react'
import CustomInput from '../../shared-components/Inputs/CustomInput';
import { User } from '../../shared-components/model/user/User';
import styles from '../styles/Home.module.css';
import DatePicker from 'react-datepicker';
import { CenterForTermDTO } from '../../shared-components/model/center/CenterForTermDTO';
import { MedicalStaffDTO } from '../../shared-components/model/center/MedicalStaffDTO';
import { CreateTermDTO } from '../../shared-components/model/center/CreateTermDTO';
import { getDataFromToken } from '../../shared-components/navbar/getToken';
import { UserInfo } from '../../shared-components/model/shared/UserInfo';
import { LocalDateTime } from 'js-joda';
import router from 'next/router';
import { toast, ToastContainer } from 'react-toastify';

export default function Register() {

  const [name,setName] = useState(LocalDateTime.now().toString().substring(0,19));
  const [duration,setDuration] = useState('');
  const [formValid,setFormValid] = useState(false);
  const [medicalStaffs,setMedicalStaffs] = useState([] as MedicalStaffDTO[]);
  const [selectedMS,setSelectedMS] = useState(-1);



  var createTermDTO : CreateTermDTO = new CreateTermDTO(0,0,0,LocalDateTime.now());
  
  useEffect(() => {
    validate();
    var token = localStorage.getItem("auth")
    const tokenNotNull = token != null ? token : "";
    var userInfo:UserInfo = getDataFromToken(tokenNotNull);
     axios.get("http://localhost:8081/api/person/medicalStaff" + "?adminId=" + userInfo.id )
       .then(res => {
        setMedicalStaffs(res.data);
        if(medicalStaffs != null)
          setSelectedMS(medicalStaffs[0].id);
     })
     .catch(err => console.log(err));
     
  },[name,duration]);

  function CreateTerm(){
    createTermDTO.dateTime = LocalDateTime.parse(name);
    createTermDTO.durationInMinutes = Number.parseInt(duration);
    var token = localStorage.getItem("auth")
    const tokenNotNull = token != null ? token : "";
    const config = {
        headers:{
        'Access-Control-Allow-Origin' : '*',
        'Authorization': `Bearer ${token}`
        }
    }
    var userInfo:UserInfo = getDataFromToken(tokenNotNull);
    createTermDTO.managerId = userInfo.id;
    createTermDTO.medicalStaffId = selectedMS;
    axios.post("http://localhost:8081/api/term/createTerm",createTermDTO,config)
       .then(res => {
        if(res.data == "200")
        toast.success("Success! Go to calendar and check it out!", {
          position: toast.POSITION.TOP_RIGHT
      });
      else
      toast.error("You cant schadule this term check calendar for free termins!", {
        position: toast.POSITION.TOP_RIGHT
      });
        
           
     })
     .catch(err => console.log(err));
  }
  function validate(){
    var regexNames = new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}$");
    var regexDuration = new RegExp("^.+$");
    setFormValid(regexDuration.test(duration) && regexNames.test(name));
  }
  var validButton = formValid ? "text-emerald-200 bg-emerald-900" : "text-gray-800 bg-gray-400 cursor-default";

  return (
      <div className=" w-full bg-gray-800 px-6 mt-20 justify-center inline-flex">
        <div className=" bg-gray-800 justify-center">
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
          <div className="my-5 w-[700px]">
            <div className="w-[256px] inline-flex justify-end">
            <span className="text text-4xl mr-4 min-w-max">Medical Staff:</span>
            </div>
            <select 
            id="center" 
            name="center" 
            className="text-emerald-200 text-4xl w-[415px] bg-gray-800 border-2 pb-1 border-emerald-800"
            onChange={(e) => {
              setSelectedMS(Number.parseInt(e.target.value));
            }}
            >
              {medicalStaffs.map((medStaff,index) => (
                <option key={index} value={medStaff.id}>{medStaff.name}</option>
                ))}
            </select>
          </div>
          <div className='w-full inline-flex justify-center mt-5 mb-28'>
          <button onClick={CreateTerm} disabled={!formValid} className={classNames(" rounded-[32px] px-8 py-4 font-medium text-2xl",validButton)}>
            Create Term
          </button>
          </div>
        </div>
        <ToastContainer theme="dark" />
      </div>
  )
}
