import axios, { AxiosResponse } from 'axios';
import classNames from 'classnames';
import Head from 'next/head'
import Image from 'next/image'
import { config } from 'process';
import {useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CustomInput from '../../shared-components/Inputs/CustomInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from '../../shared-components/model/user/User';
import styles from '../styles/Home.module.css'


async function RegisterUser(user:User):Promise<Boolean> {
  let uidUnique:Boolean = true;
  var emailUnique:Boolean = true;
  var token = localStorage.getItem("auth")
  const tokenNotNull = token != null ? token : "";
  const config = {
    headers:{
      'Access-Control-Allow-Origin' : '*',
      'Authorization': `Bearer ${token}`
      }
  }
  await axios.get<Boolean>("http://localhost:8080/api/person/check-uid/"+user.uid,config).then(res => {
    uidUnique=res.data;
    if(!uidUnique)
    {
        toast.error('Uid not unique!', {
            position: toast.POSITION.TOP_RIGHT
        });
    }
  }).catch(err => {console.log(err)})

  await axios.get<Boolean>("http://localhost:8080/api/user/check-email/"+user.email,config).then(res => {
    emailUnique=res.data;
    if(!emailUnique)
    {
        toast.error('Email not unique!', {
            position: toast.POSITION.TOP_RIGHT
        });
    }
  }).catch(err => {console.log(err)})
  if(!emailUnique || !uidUnique)
    return false;
  axios.post("http://localhost:8080/api/auth/createSystemAdmin", user,config).then(res => {
    toast.success('You successfuly registered another system admin!', {
      position: toast.POSITION.TOP_RIGHT
      });
    ;}).catch(err => {
    toast.error('Oops! Something went wrong', {
      position: toast.POSITION.TOP_RIGHT
  });
  })
  return true;
}


export default function SystemAdminRegister() {

  const [name,setName] = useState('');
  const [surname,setSurname] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [email,setEmail] = useState('');
  const [uid,setUid] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [school,setSchool] = useState('');
  const [country,setCountry] = useState('');
  const [city,setCity] = useState('');
  const [streetName,setStreetName] = useState('');
  const [streetNumber,setStreetNumber] = useState('');
  const [gender,setGender] = useState('');
  const [formValid,setFormValid] = useState(false);
  
  const router = useRouter();
  if(localStorage.getItem('wasLogged')==='false'){
    router.push('/stranica/SystemAdminLanding')
  }

  async function Register(){
    
    var user: User = {address:{city:city,country:country,streetName:streetName,streetNumber:streetNumber},
    name:name,surname:surname,school:school,email:email,password:password,uid:uid,phoneNumber:phoneNumber,
    personGender:Number(gender),personType: 2
    };
    if(password !== confirmPassword){
      toast.error('Password and confirm password must be same!', {
        position: toast.POSITION.TOP_RIGHT
    });
      return;
    }
     if(await RegisterUser(user))
       router.push("/");
  }
  useEffect(()=>{
    validate();
  });
  function validate(){
    var regexNames = new RegExp("^[A-Z][a-z]+$");
    var regexStreetName = new RegExp("^[A-Z][A-Za-z( )]+$");
    var regexPhoneNumber = new RegExp("^[+]*[0-9-]+$");
    var regexStreetNumber = new RegExp("^[1-9]+[a-b]{0,1}$");
    var regexPassword = new RegExp("^[A-Za-z0-9]{5}[A-Za-z0-9]+$");
    setFormValid((regexNames.test(name) && regexNames.test(surname) && regexPassword.test(password) && regexPassword.test(confirmPassword)
    && regexPhoneNumber.test(phoneNumber) && /^[A-Z][A-Za-z( )]+$/.test(city) && regexNames.test(country)
    && regexStreetName.test(streetName) && /^[A-Z][A-Za-z0-9( )]+$/.test(school) && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    && /^\d{5}$/.test(uid) && regexStreetNumber.test(streetNumber)));
  }
  var validButton = formValid ? "duration-150 hover:scale-105 text-emerald-200 bg-emerald-900 hover:text-emerald-900 hover:bg-emerald-200": "text-gray-800 bg-gray-400 cursor-default";

  return (
      <div className=" w-full bg-gray-800 justify-center flex">
        
        <div className="mx-auto flex flex-col justify-center bg-gray-800 mt-20 px-auto">
            <h1 className='text-center text-emerald-200 text-6xl mb-16 font-bold'>Registration</h1>
          <CustomInput
            type='text'
            regex='^[A-Z][a-z]+$'
            notValidText='Name is not valid'
            className='w-[430px]'
            onChange={(event) => {
              setName(event.target.value);
            }}
            nameToSet='Name'
          ></CustomInput>

          <CustomInput 
            type='text'
            regex='^[A-Z][a-z]+$'
            notValidText='Surname is not valid'
            className='w-[430px]'
            onChange={(event) => {
              setSurname(event.target.value);
            }}
            nameToSet='Surname'
          ></CustomInput>

          <CustomInput 
            type='text'
            regex='^\d{5}$'
            notValidText='Uid is not valid must be exactly 5 numbers'
            className='w-[430px]'
            onChange={(event) => {
              setUid(event.target.value);
            }}
            nameToSet='Uid'
          ></CustomInput>

          <CustomInput
            type='text'
            regex='^[+]*[0-9-]+$'
            notValidText='Phone number is not valid'
            className='w-[430px]'
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
            nameToSet='Phone Number'
          ></CustomInput>

          <CustomInput 
            type='text'
            regex='^[A-Z][A-Za-z( )]+$'
            notValidText='City name is not valid'
            className='w-[430px]'
            onChange={(event) => {
              setCity(event.target.value);
            }}
            nameToSet='City'
          ></CustomInput>

          <CustomInput
            type='text'
            regex='^[A-Z][a-z]+$'
            notValidText='Country name is not valid'
            className='w-[430px]'
            onChange={(event) => {
              setCountry(event.target.value);
            }}
            nameToSet='Country'
          ></CustomInput>
          <CustomInput 
            type='text'
            regex='^[A-Z][A-Za-z( )]+$'
            notValidText='Street name is not valid'
            className='w-[430px]'
            onChange={(event) => {
              setStreetName(event.target.value);
            }}
            nameToSet='Street Name'
          ></CustomInput>
          <CustomInput 
            type='text'
            regex='^[1-9]+[a-b]{0,1}$'
            notValidText='Street number is not valid'
            className='w-[430px]'
            onChange={(event) => {
              setStreetNumber(event.target.value);
            }}
            nameToSet='Street Number'
          ></CustomInput>

          <CustomInput 
            type='text'
            regex='^[A-Z][A-Za-z( )]+$'
            notValidText='School name is not valid'
            className='w-[430px]'
            onChange={(event) => {
              setSchool(event.target.value);
            }}
            nameToSet='School'
          ></CustomInput>

          <CustomInput 
            type='text'
            regex='^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'
            notValidText='Email is not valid'
            className='w-[430px]'
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            nameToSet='Email'
          ></CustomInput>

          <CustomInput 
            type='password'
            regex='^[A-Za-z0-9]{5}[A-Za-z0-9]+$'
            notValidText='Password is not valid'
            className='w-[430px]'
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            nameToSet='Password'
          ></CustomInput>
                    <CustomInput 
            type='password'
            notValidText='Confirm password is not valid'
            regex='^[A-Za-z0-9]{5}[A-Za-z0-9]+$'
            className='w-[430px]'
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            nameToSet='Confirm Password'
          ></CustomInput>
          <div className="mt-5 mb-14 w-[700px]">
            <div className="w-[256px] inline-flex justify-end">
            <span className="text text-xl mr-4 min-w-max">Gender:</span>
            </div>
            <select 
            id="gender" 
            name="gender" 
            className="text-emerald-200 text-xl rounded-[6px] w-[432px] bg-gray-800 border-2 pb-1 border-emerald-800"
            onChange={(e) => {
              setGender(e.target.value);
            }}
            >
              <option value="0">Male</option>
              <option value="1">Female</option>
              <option value="2">Alien</option>
            </select>
          </div>
          
          <div className='w-full inline-flex justify-center mt-5 mb-28'>
          <button onClick={Register} disabled={!formValid} className={classNames("duration-150 rounded-[48px] pt-4 pb-5 font-bold px-6 text-2xl",validButton)}>
            Register
          </button>
          </div>
        </div>
        <ToastContainer theme="dark" />
      </div>
  )
}
