import axios, { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { useState } from 'react'
import CustomInput from '../shared-components/Inputs/CustomInput';
import { Info } from '../shared-components/model/user/Info';
import { InfoDTO } from '../shared-components/model/user/InfoDTO';


export default function MakeInfo() {

  const [note,setNote] = useState('');
  const [bakarSulfat,setBakarSulfat] = useState('');
  const [bloodType,setBloodType] = useState('');
  const [hemoglobin,setHemoglobin] = useState('');
  const [lungs,setLungs] = useState('');
  const [heart,setHeart] = useState('');
  const [bag,setBag] = useState('');
  const [accepted,setAccepted] = useState(false);
  const [reason,setReason] = useState('');
  const [startAt,setStartAt] = useState('');
  const [endAt,setEndAt] = useState('');
  const [appointmentId,setAppointmentId] = useState('');

    var info: InfoDTO = {note:note,bakarSulfat:bakarSulfat,bloodType:bloodType,hemoglobin:hemoglobin,
    lungs:lungs,heart:heart,bag:bag,accepted:accepted,reason:reason,startAt:startAt,endAt:endAt,appointmentId:appointmentId
    };
    const config = {
      headers:{
      'Access-Control-Allow-Origin' : '*',
      }
    }
    function informat()
    {
        var token = localStorage.getItem("auth")
        const tokenNotNull = token != null ? token : "";
        const config = {
            headers:{
            'Access-Control-Allow-Origin' : '*',
            'Authorization': `Bearer ${token}`
            }
        }
        var ajdi;
        var retA : string = "";
        ajdi = localStorage.getItem("AppointmentId");
        if(ajdi != null)
        {
            retA = ajdi;
        }
        else
            retA = '1';
        info.appointmentId = retA;
        axios.post("http://localhost:8080/api/appointment/info", info,config)
        .then(res => {
        console.log(res);
        })
        .catch(err => {
        console.log(err)
        alert(err.toString());
        });
    }
    
 

  return (
      <div className=" w-full bg-gray-800 px-6 mt-20 justify-center inline-flex">
        <div className=" bg-gray-800 justify-center">

          <CustomInput 
            type='text'
            onChange={(event) => {
                setBakarSulfat(event.target.value);
            }}
            nameToSet='BakafSulfat'
          ></CustomInput>

          {/* <CustomInput 
            type='text'
            onChange={(event) => {
                setBloodType(event.target.value);
            }}
            nameToSet='BloodType'
          ></CustomInput> */}

          <CustomInput
            type='text'
            onChange={(event) => {
                setHemoglobin(event.target.value);
            }}
            nameToSet='Hemoglobin'
          ></CustomInput>

          <CustomInput 
            type='text'
            onChange={(event) => {
                setLungs(event.target.value);
            }}
            nameToSet='Lungs'
          ></CustomInput>

          <CustomInput
            type='text'
            onChange={(event) => {
                setHeart(event.target.value);
            }}
            nameToSet='Heart'
          ></CustomInput>
          <CustomInput 
            type='text'
            onChange={(event) => {
                setBag(event.target.value);
            }}
            nameToSet='Bag'
          ></CustomInput>

          <CustomInput 
            type='text'
            onChange={(event) => {
                setStartAt(event.target.value);
            }}
            nameToSet='StartAt'
          ></CustomInput>

          <CustomInput 
            type='text'
            onChange={(event) => {
                setEndAt(event.target.value);
            }}
            nameToSet='EndAt'
          ></CustomInput>

         <CustomInput
            type='text'
            onChange={(event) => {
                setNote(event.target.value)
            }}
            nameToSet='Note'
          ></CustomInput>
          <CustomInput 
            type='checkbox'
            onChange={(event) => {
                setAccepted(true);
            }}
            nameToSet='Accepted'
          ></CustomInput>

            <CustomInput 
            type='text'
            onChange={(event) => {
                setReason(event.target.value);
            }}
            nameToSet='Reason'
          ></CustomInput>

          <div className="my-5 w-[700px]">
            <div className="w-[256px] inline-flex justify-end">
            <span className="text text-4xl mr-4 min-w-max">BloodType:</span>
            </div>
            <select 
            id="gender" 
            name="gender" 
            className="text-emerald-200 text-4xl w-[415px] bg-gray-800 border-2 pb-1 border-emerald-800"
            onChange={(e) => {
                setBloodType(e.target.value)
            }}
            >
            <option value="0"></option>
              <option value="APLUS">A+</option>
              <option value="BPLUS">B+</option>
              <option value="ONEG">O-</option>
            </select>
          </div>
          <div className='w-full inline-flex justify-center mt-5 mb-28'>
          <button onClick={informat} className="mx-4 duration-150 rounded-[48px] pt-4 pb-5 font-bold px-12  hover:scale-105 text-2xl text-emerald-200 bg-emerald-900 hover:text-emerald-900 hover:bg-emerald-200">
            <a href="/">Make info</a>
          </button>
          </div>
        </div>
      </div>
  )
}
