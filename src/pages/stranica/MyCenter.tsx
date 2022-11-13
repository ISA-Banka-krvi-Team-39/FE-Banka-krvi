import axios from 'axios';
import {  useState, useEffect} from 'react'
import CustomInput from '../../shared-components/Inputs/CustomInput'
import { Center } from '../../shared-components/model/center/center';
import { PersonDTO } from "../../shared-components/model/shared/Person";

const fetcher = (url: string) => fetch(url,{mode: 'no-cors'}).then((res) => res.json());

var collectedCenter : Center;
var pers : string;
var htmvar : string;
pers = "";
htmvar = "";

export default function Home() {

  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [avgGrade,setAvgGrade] = useState('');
  const [country,setCountry] = useState('');
  const [city,setCity] = useState('');
  const [streetName,setStreetName] = useState('');
  const [streetNumber,setStreetNumber] = useState('');
  const [persons,setPersons] = useState('');

  function doSomething() { 
    axios.get("http://localhost:8080/api/center/1")
    .then(res => {

      collectedCenter = res.data;
      //console.log(collectedCenter);
      setName(collectedCenter.name);
      setDescription(collectedCenter.description);
      setAvgGrade(collectedCenter.avgGrade);
      setCountry(collectedCenter.address.country);
      setCity(collectedCenter.address.city);
      setStreetName(collectedCenter.address.streetName);
      setStreetNumber(collectedCenter.address.streetNumber + "");
      
      collectedCenter.workingMedicalStaff.forEach((el)=>{
        if(!pers.includes(el.name))
        pers = pers + " " + el.name + " " + el.surname;
        
    })
      
    })
    .catch(err => console.log(err))
    
  }
  useEffect(()=>{

   doSomething();
    
    }, [])
  function updateCenter() { 
    axios.put("http://localhost:8080/api/center/1",collectedCenter)
    .then(res => {
      collectedCenter.name = name;
      collectedCenter.description = description;
      collectedCenter.avgGrade = avgGrade;
      collectedCenter.address.city = city;
      collectedCenter.address.country = country;
      collectedCenter.address.streetName = streetName;
      var convertedToNumber: number = +streetNumber;
      collectedCenter.address.streetNumber = streetNumber;

    }).catch(err => console.log(err))
  }
    
  

  
  

  return (
    <div className=" w-full bg-gray-800 px-6 mt-20 justify-center inline-flex">
      <div className=" bg-gray-800 justify-center">
        <CustomInput
          value = {name}
          type='text'
          onChange={(event) => {
            collectedCenter.name = event.target.value;
            setName(event.target.value);
          }}
          nameToSet='Name'
        ></CustomInput>

        <CustomInput 
          value = {description}
          type='text'
          onChange={(event) => {
            collectedCenter.description = event.target.value;
            setDescription(event.target.value);
          }}
          nameToSet='Description'
        ></CustomInput>

        <CustomInput 
          value = {avgGrade}
          type='number'
          onChange={(event) => {
            collectedCenter.avgGrade = event.target.value;
            setAvgGrade(event.target.value);
          }}
          nameToSet='avgGrade'
        ></CustomInput>

        <CustomInput 
          value = {city}
          type='text'
          onChange={(event) => {
            collectedCenter.address.city = event.target.value;
            setCity(event.target.value);
          }}
          nameToSet='City'
        ></CustomInput>

        <CustomInput 
          value = {country}
          type='text'
          onChange={(event) => {
            collectedCenter.address.country = event.target.value;
            setCountry(event.target.value);
          }}
          nameToSet='Country'
        ></CustomInput>
        <CustomInput 
          value = {streetName}
          type='text'
          onChange={(event) => {
            collectedCenter.address.streetName = event.target.value;
            setStreetName(event.target.value);
          }}
          nameToSet='Street Name'
        ></CustomInput>
        <CustomInput 
          value = {streetNumber}
          type='number'
          onChange={(event) => {
            var convertedToNumber: number = +event.target.value;
            collectedCenter.address.streetNumber = event.target.value  ;
            setStreetNumber(event.target.value);
          }}
          nameToSet='Street Number'
        ></CustomInput>
        
        <div  className='w-full inline-flex justify-center mt-5 mb-28'>
        <button onClick={updateCenter} className="bg-emerald-900 rounded-[32px] px-8 py-4 text-emerald-200 font-medium text-2xl">
          Confirm changes 
        </button>
        </div>
      </div>
      <div className='h-[750px] w-[600px] rounded-2xl py-5 px-5 border-4 border-black bg-emerald-800 text-slate-300 text-3xl break-words overflow-hidden'>
        
        <p id='proba'>{pers}</p>
      </div>
    </div>
)
}
