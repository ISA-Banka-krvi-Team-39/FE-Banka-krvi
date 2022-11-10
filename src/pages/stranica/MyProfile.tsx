import Head from 'next/head'
import Image from 'next/image'
import {  useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'
import CustomInput from '../../shared-components/Inputs/CustomInput'
import { User } from '../../shared-components/model/user/User'

const fetcher = (url: string) => fetch(url,{mode: 'no-cors'}).then((res) => res.json());

export default function Home() {

  const [name,setName] = useState('Jovan');
  const [surname,setSurname] = useState('xd');
  const [password,setPassword] = useState('2');
  const [uuid,setUuid] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [school,setSchool] = useState('');
  const [country,setCountry] = useState('');
  const [city,setCity] = useState('');
  const [streetName,setStreetName] = useState('');
  const [streetNumber,setStreetNumber] = useState('');
  const [email,setEmail] = useState('jovan@gmail.com');
  const [role,setRole] = useState('role');
  const [points,setPoints] = useState('1200');

  function doSomething() {
    
  }

  return (
    <div className=" w-full bg-gray-800 px-6 mt-20 justify-center inline-flex">
      <div className=" bg-gray-800 justify-center">
        <CustomInput
          value = {name}
          type='text'
          onChange={(event) => {
            setName(event.target.value);
          }}
          nameToSet='Name'
        ></CustomInput>

        <CustomInput 
          value = {surname}
          type='text'
          onChange={(event) => {
            setSurname(event.target.value);
          }}
          nameToSet='Surname'
        ></CustomInput>

        <CustomInput 
          value = {uuid}
          type='number'
          onChange={(event) => {
            setUuid(event.target.value);
          }}
          nameToSet='Uuid'
        ></CustomInput>

        <CustomInput 
          value = {phoneNumber}
          type='number'
          onChange={(event) => {
            setPhoneNumber(event.target.value);
          }}
          nameToSet='PhoneNumber'
        ></CustomInput>

        <CustomInput 
          value = {city}
          type='text'
          onChange={(event) => {
            setCity(event.target.value);
          }}
          nameToSet='City'
        ></CustomInput>

        <CustomInput 
          value = {country}
          type='text'
          onChange={(event) => {
            setCountry(event.target.value);
          }}
          nameToSet='Country'
        ></CustomInput>
        <CustomInput 
          value = {streetName}
          type='text'
          onChange={(event) => {
            setStreetName(event.target.value);
          }}
          nameToSet='Street Name'
        ></CustomInput>
        <CustomInput 
          value = {streetName}
          type='number'
          onChange={(event) => {
            setStreetNumber(event.target.value);
          }}
          nameToSet='Street Number'
        ></CustomInput>

        <CustomInput 
          value = {school}
          type='text'
          onChange={(event) => {
            setSchool(event.target.value);
          }}
          nameToSet='School'
        ></CustomInput>

        <CustomInput
          value = {email}
          disabled
          type='text'
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          nameToSet='Email'
        ></CustomInput>

        <CustomInput 
          value = {password}
          type='password'
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          nameToSet='Password'
        ></CustomInput>
        <div className='w-full inline-flex justify-center mt-5 mb-28'>
        <button onClick={doSomething} className="bg-emerald-900 rounded-[32px] px-8 py-4 text-emerald-200 font-medium text-2xl">
          Confirm changes 
        </button>
        </div>
      </div>
      <div className='h-[750px] w-[600px] rounded-2xl py-5 px-5 border-4 border-black bg-emerald-800 text-slate-300 text-3xl break-words overflow-hidden'>
        Vi ste {role} i imate {points} poena, mozete da dobijete cak do 20l krvi :)
      </div>
    </div>
)
}
