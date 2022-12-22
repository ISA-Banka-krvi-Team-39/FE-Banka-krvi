import axios, { AxiosResponse } from 'axios';
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

export default function Register() {

  const [name,setName] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());


  var centers : CenterForTermDTO[] = [];
  var medicalStaff : MedicalStaffDTO[] = [];
  var createTermDTO : CreateTermDTO;
  var formValid : Boolean = false;
  
  useEffect(() => {
    axios.get("http://localhost:8080/api/center/list/")
      .then(res => {
      centers = res.data;
    })
    .catch(err => console.log(err));
    axios.get("http://localhost:8080/api/center/list/")
      .then(res => {
        medicalStaff = res.data;
    })
    .catch(err => console.log(err));
  }, []);


  function validate(){
    var regexNames = new RegExp("^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$");
    formValid = regexNames.test(name);
  }
  var validButton = formValid ? "text-emerald-200 bg-emerald-900" : "text-gray-800 bg-gray-400 cursor-default";

  return (
      <div className=" w-full bg-gray-800 px-6 mt-20 justify-center inline-flex">
        <div className=" bg-gray-800 justify-center">
          <CustomInput
            type='text'
            regex='^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$'
            notValidText='Date is not in valid format, format is YYYY-MM-DDThh:mm:qq'
            onChange={(event) => {
              setName(event.target.value);
              validate();
            }}
            nameToSet='Date and time'
          ></CustomInput>
          <div className="my-5 w-[700px]">
            <div className="w-[256px] inline-flex justify-end">
            <span className="text text-4xl mr-4 min-w-max">Center:</span>
            </div>
            <select 
            id="center" 
            name="center" 
            className="text-emerald-200 text-4xl w-[415px] bg-gray-800 border-2 pb-1 border-emerald-800"
            onChange={(e) => {
              //setGender(e.target.value);
            }}
            >
              <option value="0">Male</option>
              <option value="1">Female</option>
              <option value="2">Alien</option>
            </select>
          </div>
          <div className='w-full inline-flex justify-center mt-5 mb-28'>
          <button disabled={!formValid} className={classNames(" rounded-[32px] px-8 py-4 font-medium text-2xl",validButton)}>
            Register
          </button>
          </div>
        </div>
      </div>
  )
}
