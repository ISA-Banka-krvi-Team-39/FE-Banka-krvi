import axios, { AxiosResponse } from 'axios';
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import CustomInput from '../shared-components/Inputs/CustomInput';
import { User } from '../shared-components/model/user/User';
import styles from '../styles/Home.module.css'


export default function Home() {

  const [name,setName] = useState('');
  const [surname,setSurname] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [uuid,setUuid] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [school,setSchool] = useState('');
  const [country,setCountry] = useState('');
  const [city,setCity] = useState('');
  const [streetName,setStreetName] = useState('');
  const [streetNumber,setStreetNumber] = useState('');
  const [gender,setGender] = useState('');

  function doSomething() {
    var user: User = {address:{city:city,country:country,streetName:streetName,streetNumber:Number(streetNumber)},
    name:name,surname:surname,school:school,email:email,password:password,uuid:uuid,phoneNumber:phoneNumber,
    personGender:Number(gender),personType: 0
    };
    axios.post("http://localhost:8080/api/user", user)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err))
  }
  return (
      <div className=" w-full bg-gray-800 px-6 mt-20 justify-center inline-flex">
        <div className=" bg-gray-800 justify-center">
          <CustomInput
            type='text'
            onChange={(event) => {
              setName(event.target.value);
            }}
            nameToSet='Name'
          ></CustomInput>

          <CustomInput 
            type='text'
            onChange={(event) => {
              setSurname(event.target.value);
            }}
            nameToSet='Surname'
          ></CustomInput>

          <CustomInput 
            type='text'
            onChange={(event) => {
              setUuid(event.target.value);
            }}
            nameToSet='Uuid'
          ></CustomInput>

          <CustomInput
            type='text'
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
            nameToSet='PhoneNumber'
          ></CustomInput>

          
          <CustomInput 
            type='text'
            onChange={(event) => {
              setCity(event.target.value);
            }}
            nameToSet='City'
          ></CustomInput>

          <CustomInput
            type='text'
            onChange={(event) => {
              setCountry(event.target.value);
            }}
            nameToSet='Country'
          ></CustomInput>
          <CustomInput 
            type='text'
            onChange={(event) => {
              setStreetName(event.target.value);
            }}
            nameToSet='Street Name'
          ></CustomInput>
          <CustomInput 
            type='number'
            onChange={(event) => {
              setStreetNumber(event.target.value);
            }}
            nameToSet='Street Number'
          ></CustomInput>

          <CustomInput 
            type='text'
            onChange={(event) => {
              setSchool(event.target.value);
            }}
            nameToSet='School'
          ></CustomInput>

          <CustomInput 
            type='text'
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            nameToSet='Email'
          ></CustomInput>

          <CustomInput 
            type='password'
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            nameToSet='Password'
          ></CustomInput>
          <div className="my-5 w-[700px]">
            <div className="w-48 inline-flex justify-end">
            <span className="text text-4xl mr-4 min-w-max">Gender:</span>
            </div>
            <select 
            id="gender" 
            name="gender" 
            className="text-emerald-200 text-4xl w-[416px] bg-gray-800 border-2 pb-1 border-emerald-800"
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
          <button onClick={doSomething} className="bg-emerald-900 rounded-[32px] px-8 py-4 text-emerald-200 font-medium text-2xl">
            Register
          </button>
          </div>
        </div>
      </div>
  )
}
