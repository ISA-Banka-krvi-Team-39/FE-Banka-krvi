import Head from 'next/head'
import Image from 'next/image'
import {  useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'
import CustomInput from '../../shared-components/Inputs/CustomInput'
import { User } from '../../shared-components/model/user/User'
import axios from 'axios'
import { PersonGender } from '../../shared-components/model/user/PersonGender'
import { PatientUser } from '../../shared-components/model/PatientUser/PatientUser'
import { getDataFromToken } from '../../shared-components/navbar/getToken'
import { toast, ToastContainer } from 'react-toastify'
import { UserInfo } from '../../shared-components/model/shared/UserInfo'


var user: PatientUser;

export default  function MyProfile() {

  const [name,setName] = useState('');
  const [surname,setSurname] = useState('');
  const [password,setPassword] = useState('');
  const [uid,setUid] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [school,setSchool] = useState('');
  const [country,setCountry] = useState('');
  const [city,setCity] = useState('');
  const [streetName,setStreetName] = useState('');
  const [streetNumber,setStreetNumber] = useState('');
  const [email,setEmail] = useState('');
  const [role,setRole] = useState('');
  const [points,setPoints] = useState('');
  const [gender,setGender] = useState('');

  function setProfile() {
    setName(user.name);
    setSurname(user.surname);
    setPassword(user.password);
    setUid(user.uid);
    setPhoneNumber(user.phoneNumber);
    setSchool(user.school);
    setCountry(user.address.country);
    setCity(user.address.city);
    setStreetName(user.address.streetName);
    setStreetNumber(user.address.streetNumber);
    setEmail(user.email);
    setRole(user.personType.toString());
    setPoints(user.points.toString());
     if(user.personGender.toString() == "MALE") setGender('0');
     else if(user.personGender.toString() == "FEMALE") setGender('1');
     else setGender('2');
  }

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
    axios.get("http://localhost:8080/api/person/"+ userInfo.id,config)
      .then(res => {
      user = res.data;
      setProfile();
    })
    .catch(err => console.log(err));
  }, []);

  if (user == undefined) {
    return <div className="App">Loading...</div>;
  }

  function doSomething() {
    var token = localStorage.getItem("auth")
    const tokenNotNull = token != null ? token : "";
    const config = {
        headers:{
        'Access-Control-Allow-Origin' : '*',
        'Authorization': `Bearer ${token}`
        }
    }
    var userInfo:UserInfo = getDataFromToken(tokenNotNull);
    axios.put("http://localhost:8080/api/person/"+ userInfo.id, user, config)
      .then(res => {
        toast.success('Your information has been updated!', {
            position: toast.POSITION.TOP_RIGHT
        });
    })
    .catch(err => console.log(err));
  }

  return (
    <div className=" w-full bg-gray-800 px-6 mt-20 justify-center inline-flex">
      <div className=" bg-gray-800 justify-center">
        <CustomInput
          value = {name}
          type='text'
          onChange={(event) => {
            user.name = event.target.value;
            setName(event.target.value);
          }}
          nameToSet='Name'
        ></CustomInput>

        <CustomInput 
          value = {surname}
          type='text'
          onChange={(event) => {
            user.surname = event.target.value;
            setSurname(event.target.value);
          }}
          nameToSet='Surname'
        ></CustomInput>

        <CustomInput 
          value = {uid}
          type='number'
          onChange={(event) => {
            user.uid = event.target.value;
            setUid(event.target.value);
          }}
          nameToSet='Uid'
        ></CustomInput>

        <CustomInput 
          value = {phoneNumber}
          type='number'
          onChange={(event) => {
            user.phoneNumber = event.target.value;
            setPhoneNumber(event.target.value);
          }}
          nameToSet='PhoneNumber'
        ></CustomInput>

        <CustomInput 
          value = {city}
          type='text'
          onChange={(event) => {
            user.address.city = event.target.value;
            setCity(event.target.value);
          }}
          nameToSet='City'
        ></CustomInput>

        <CustomInput 
          value = {country}
          type='text'
          onChange={(event) => {
            user.address.country = event.target.value;
            setCountry(event.target.value);
          }}
          nameToSet='Country'
        ></CustomInput>
        <CustomInput 
          value = {streetName}
          type='text'
          onChange={(event) => {
            user.address.streetName = event.target.value;
            setStreetName(event.target.value);
          }}
          nameToSet='Street Name'
        ></CustomInput>
        <CustomInput 
          value = {streetNumber}
          type='number'
          onChange={(event) => {
            user.address.streetNumber = event.target.value;
            setStreetNumber(event.target.value);
          }}
          nameToSet='Street Number'
        ></CustomInput>

        <CustomInput 
          value = {school}
          type='text'
          onChange={(event) => {
            user.school = event.target.value;
            setSchool(event.target.value);
          }}
          nameToSet='School'
        ></CustomInput>

        <CustomInput
          value = {email}
          disabled
          type='text'
          onChange={(event) => {
            user.email = event.target.value;
            setEmail(event.target.value);
          }}
          nameToSet='Email'
        ></CustomInput>

        <CustomInput 
          value = {password}
          type='password'
          onChange={(event) => {
            user.password = event.target.value;
            setPassword(event.target.value);
          }}
          nameToSet='Password'
        ></CustomInput>
        <div className="my-5 w-[700px]">
            <div className="w-48 inline-flex justify-end">
            <span className="text text-4xl mr-4 min-w-max">Gender:</span>
            </div>
            <select
            value={Number(gender)}
            id="gender" 
            name="gender" 
            className="text-emerald-200 text-4xl w-[416px] bg-gray-800 border-2 pb-1 border-emerald-800"
            onChange={(e) => {
              if(Number(e.target.value) == 0) user.personGender = PersonGender.MALE;
              else if(Number(e.target.value) == 1) user.personGender = PersonGender.FEMALE;
              else user.personGender = PersonGender.ALIEN;
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
          Confirm changes 
        </button>
        </div>
      </div>
      <div id="patient" className='h-[750px] w-[600px] rounded-2xl py-5 px-5 border-4 border-black bg-emerald-800 text-slate-300 text-3xl break-words overflow-hidden'>
        <p>Vi ste {role} i imate {points} poena, mozete da dobijete cak do 20l krvi :)</p>
      </div>
      <ToastContainer theme="dark" />
    </div>
)
}
