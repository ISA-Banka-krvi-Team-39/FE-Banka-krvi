import Head from 'next/head'
import Image from 'next/image'
import {  useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'
import CustomInput from '../../shared-components/Inputs/CustomInput'
import { User } from '../../shared-components/model/user/User'
import axios from 'axios'
import { PersonGender } from '../../shared-components/model/user/PersonGender'
import { PatientUser } from '../../shared-components/model/PatientUser/PatientUser'
import { setTokenSourceMapRange } from 'typescript'


var user: PatientUser;
var userName : string;

export default  function MyProfile() {

  const [repeatpassword,setRepeatPassword] = useState('');
  const [password,setPassword] = useState('');

  function setProfile() {
    setPassword(user.password);
    setRepeatPassword(user.password);
  }


  useEffect(() => {
    axios.get("http://localhost:8080/api/person/1")
      .then(res => {
      user = res.data;
      userName = user.name;
      //setProfile();
    })
    .catch(err => console.log(err));
  }, []);
  function doSomething() {
    axios.put("http://localhost:8080/api/person/landing/1", user)
      .then(res => {

    })
    .catch(err => console.log(err));
    setPassword("");
    setRepeatPassword("");
  }

  return (
    <div className=" w-full bg-gray-800 px-6 mt-20 justify-center inline-flex">
      <div className=" bg-gray-800 justify-center">

        <CustomInput 
          value = {password}
          type='password'
          onChange={(event) => {
            user.password = event.target.value;
            setPassword(event.target.value);
          }}
          nameToSet='New password'
        ></CustomInput>
        <CustomInput 
          value = {repeatpassword}
          type='password'
          onChange={(event) => {
            setRepeatPassword(event.target.value);
          }}
          nameToSet='Repeat password'
        ></CustomInput>
        <div className='w-full inline-flex justify-center mt-5 mb-28'>
        <button onClick={doSomething} className="bg-emerald-900 rounded-[32px] px-8 py-4 text-emerald-200 font-medium text-2xl">
          Confirm changes 
        </button>
        </div>
      </div>
      <div id="patient" className='h-[750px] w-[600px] rounded-2xl py-5 px-5 border-4 border-black bg-emerald-800 text-slate-300 text-3xl break-words overflow-hidden'>
        <p>Pozdrav {userName}, Vi ste administrator, nalog vam je kreiran automatski, molimo izaberite svoj password</p>
      </div>
    </div>
)
}
