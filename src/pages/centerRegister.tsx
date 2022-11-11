import { useState } from 'react'
import CustomInput from '../shared-components/Inputs/CustomInput';
import axios, { AxiosResponse } from 'axios';
import {Center} from '../shared-components/model/center/Center'

const CenterRegister = () => {

    const [name,setName] = useState('');
    const [country,setCountry] = useState('');
    const [city,setCity] = useState('');
    const [streetName,setStreetName] = useState('');
    const [streetNumber,setStreetNumber] = useState('');
    const [description,setDescription] = useState('');

    function registerCenter(){
        const center:Center = {
            address:{city:city,country:country,streetName:streetName,streetNumber:Number(streetNumber)},
            name:name, description:description, avg_grade: 0
        }
        axios.post("http://localhost:8080/api/center", center)
        .then(res => {
      console.log(res);
        })
        .catch(err => console.log(err))

    }

    


    return ( <div className=" w-full bg-gray-800 px-6 mt-20 justify-center inline-flex">
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
            setDescription(event.target.value);
        }}
        nameToSet='Description'
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
          
        }}
        >
          <option value="0">Male</option>
          <option value="1">Female</option>
          <option value="2">Alien</option>
        </select>
      </div>
      <div className='w-full inline-flex justify-center mt-5 mb-28'>
      <button onClick={registerCenter} className="bg-emerald-900 rounded-[32px] px-8 py-4 text-emerald-200 font-medium text-2xl">
        Register
      </button>
      </div>
    </div>
  </div> );
}
 
export default CenterRegister ;