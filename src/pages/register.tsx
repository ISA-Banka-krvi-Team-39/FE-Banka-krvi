import axios, { AxiosResponse } from 'axios';
import classNames from 'classnames';
import Head from 'next/head'
import Image from 'next/image'
import { config } from 'process';
import { useEffect, useState } from 'react'
import CustomInput from '../shared-components/Inputs/CustomInput';
import { User } from '../shared-components/model/user/User';
import styles from '../styles/Home.module.css'


export default function Register() {
  var valid = false;
  const [name,setName] = useState('');
  const [surname,setSurname] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [email,setEmail] = useState('');
  const [uuid,setUuid] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [school,setSchool] = useState('');
  const [country,setCountry] = useState('');
  const [city,setCity] = useState('');
  const [streetName,setStreetName] = useState('');
  const [streetNumber,setStreetNumber] = useState('');
  const [gender,setGender] = useState('');
  const [bloodType,setBloodType] = useState('');
  const [formValid,setFormValid] = useState(false);

  function Register() {
    if(password !== confirmPassword){
      alert("password and confirma password must be same!");
      return;
    }
    var user: User = {address:{city:city,country:country,streetName:streetName,streetNumber:streetNumber},
    name:name,surname:surname,school:school,email:email,password:password,uuid:uuid,phoneNumber:phoneNumber,
    personGender:Number(gender),personType: 0,bloodType:Number(bloodType)
    };
    const config = {
      headers:{
      'Access-Control-Allow-Origin' : '*',
      }
    }
    axios.post("http://localhost:8080/api/user", user,config).then(res => {console.log(res);})
    .catch(err => {console.log(err)
      alert(err.toString());
    })
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
    setFormValid(regexNames.test(name) && regexNames.test(surname) && regexPassword.test(password) 
                && regexPhoneNumber.test(phoneNumber) && /^[A-Z][A-Za-z( )]+$/.test(city) && regexNames.test(country)
                && regexStreetName.test(streetName) && /^[A-Z][A-Za-z( )]+$/.test(school) && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
                && /^\d{5}$/.test(uuid) && regexStreetNumber.test(streetNumber));
  }
  var validButton = formValid ? "text-emerald-200 bg-emerald-900": "text-gray-800 bg-gray-400 cursor-default";

  return (
      <div className=" w-full bg-gray-800 px-6 mt-20 justify-center inline-flex">
        <div className=" bg-gray-800 justify-center">
          <CustomInput
            type='text'
            regex='^[A-Z][a-z]+$'
            notValidText='Name is not valid'
            onChange={(event) => {
              setName(event.target.value);
            }}
            nameToSet='Name'
          ></CustomInput>

          <CustomInput 
            type='text'
            regex='^[A-Z][a-z]+$'
            notValidText='Surname is not valid'
            onChange={(event) => {
              setSurname(event.target.value);
            }}
            nameToSet='Surname'
          ></CustomInput>

          <CustomInput 
            type='text'
            regex='^\d{5}$'
            notValidText='Uuid is not valid must be exactly 5 numbers'
            onChange={(event) => {
              setUuid(event.target.value);
            }}
            nameToSet='Uuid'
          ></CustomInput>

          <CustomInput
            type='text'
            regex='^[+]*[0-9-]+$'
            notValidText='Phone number is not valid'
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
            nameToSet='Phone Number'
          ></CustomInput>

          <CustomInput 
            type='text'
            regex='^[A-Z][A-Za-z( )]+$'
            notValidText='City name is not valid'
            onChange={(event) => {
              setCity(event.target.value);
            }}
            nameToSet='City'
          ></CustomInput>

          <CustomInput
            type='text'
            regex='^[A-Z][a-z]+$'
            notValidText='Country name is not valid'
            onChange={(event) => {
              setCountry(event.target.value);
            }}
            nameToSet='Country'
          ></CustomInput>
          <CustomInput 
            type='text'
            regex='^[A-Z][A-Za-z( )]+$'
            notValidText='Street name is not valid'
            onChange={(event) => {
              setStreetName(event.target.value);
            }}
            nameToSet='Street Name'
          ></CustomInput>
          <CustomInput 
            type='text'
            regex='^[1-9]+[a-b]{0,1}$'
            notValidText='Street number is not valid'
            onChange={(event) => {
              setStreetNumber(event.target.value);
            }}
            nameToSet='Street Number'
          ></CustomInput>

          <CustomInput 
            type='text'
            regex='^[A-Z][A-Za-z( )]+$'
            notValidText='School name is not valid'
            onChange={(event) => {
              setSchool(event.target.value);
            }}
            nameToSet='School'
          ></CustomInput>

          <CustomInput 
            type='text'
            regex='^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'
            notValidText='Email is not valid'
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            nameToSet='Email'
          ></CustomInput>

          <CustomInput 
            type='password'
            notValidText='Password is not valid'
            regex='^[A-Za-z0-9]{5}[A-Za-z0-9]+$'
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            nameToSet='Password'
          ></CustomInput>
                    <CustomInput 
            type='password'
            notValidText='Confirm password is not valid'
            regex='^[A-Za-z0-9]{5}[A-Za-z0-9]+$'
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            nameToSet='Confirm Password'
          ></CustomInput>
          <div className="mt-5 mb-14 w-[700px]">
            <div className="w-[256px] inline-flex justify-end">
            <span className="text text-4xl mr-4 min-w-max">Gender:</span>
            </div>
            <select 
            id="gender" 
            name="gender" 
            className="text-emerald-200 text-4xl w-[415px] bg-gray-800 border-2 pb-1 border-emerald-800"
            onChange={(e) => {
              setGender(e.target.value);
            }}
            >
              <option value="0">Male</option>
              <option value="1">Female</option>
              <option value="2">Alien</option>
            </select>
          </div>
          <div className="mt-5 mb-12 w-[700px]">
            <div className="w-[256px] inline-flex justify-end">
            <span className="text text-4xl mr-4 min-w-max">Blood Type:</span>
            </div>
            <select 
            id="bloodType" 
            name="bloodType" 
            className="text-emerald-200 text-4xl w-[415px] bg-gray-800 border-2 pb-1 border-emerald-800"
            onChange={(e) => {
              setBloodType(e.target.value);
            }}
            >
              <option value="0">A+</option>
              <option value="1">B+</option>
              <option value="2">O+</option>
              <option value="3">AB+</option>
              <option value="4">A-</option>
              <option value="5">B-</option>
              <option value="6">O-</option>
              <option value="7">AB-</option>
            </select>
          </div>
          <div className='w-full inline-flex justify-center mt-5 mb-28'>
          <button onClick={Register} disabled={!formValid} className={classNames("rounded-[48px] px-12 py-6 font-medium text-4xl",validButton)}>
            Register
          </button>
          </div>
        </div>
      </div>
  )
}
