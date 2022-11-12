import { useState } from 'react'
import CustomInput from '../shared-components/Inputs/CustomInput';
import axios, { AxiosResponse } from 'axios';
import {Center} from '../shared-components/model/center/Center'
import {PersonDTO} from '../shared-components/model/shared/Person'
import React, { ReactNode } from "react";
import Button from '../shared-components/Button';

interface props {
    admins: PersonDTO[];
   
}

const CenterRegisterForm: React.FC<props> = (props) => {

    const [name,setName] = useState('');
    const [country,setCountry] = useState('');
    const [city,setCity] = useState('');
    const [streetName,setStreetName] = useState('');
    const [streetNumber,setStreetNumber] = useState('');
    const [description,setDescription] = useState('');
    const [showModal, setShowModal] = useState(false);
    const availableAdmins: PersonDTO[] = props.admins
   
    let medicalStaff: PersonDTO[] = []
    
    
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

    function assignAdmins(assignedAdmin:PersonDTO){
        medicalStaff.push(assignedAdmin);
        console.log(medicalStaff)
      
        
    }

    function closeModal(){
        
        setShowModal(false);
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

      
      
              {availableAdmins.map((admin,index)=>(
                <div className="bg-emerald-800 px-2 py-1 border-b-2 border-black flex flex-col" key={index}>
                    
                    <p>{admin.name} {admin.surname}</p>
                    <Button value="Assign" className="bg-emerald-700" handleAssign={()=>assignAdmins(admin)}></Button>
                </div>
            ))}
              
      
      <div className='w-full inline-flex justify-center mt-5 mb-28'>
      <button onClick={registerCenter} className="bg-emerald-900 rounded-[32px] px-8 py-4 text-emerald-200 font-medium text-2xl">
        Register center
      </button>
      </div>
    </div>
  </div> );
}
 
export default CenterRegisterForm ;