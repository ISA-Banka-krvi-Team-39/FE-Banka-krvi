import { useState } from 'react'
import CustomInput from './Inputs/CustomInput';
import {CreateCenterDTO} from './model/center/CreateCenterDTO'
import React, { ReactNode } from "react";
import AssignButton from './AssignButton';
import { WorkingStaff } from './model/shared/WorkingStaff';
import { MedicalStaff } from './model/shared/MedicalStaff';
import { useRouter } from 'next/router'

interface props {
    admins: WorkingStaff[];
   
}

const CenterRegisterForm: React.FC<props> = (props) => {

    const [name,setName] = useState('');
    const [country,setCountry] = useState('');
    const [city,setCity] = useState('');
    const [streetName,setStreetName] = useState('');
    const [streetNumber,setStreetNumber] = useState('');
    const [description,setDescription] = useState('');
    const availableAdmins: WorkingStaff[] = props.admins
    let medicalStaff: MedicalStaff[] = []
    const router = useRouter()
    
    
    function registerCenter(){
      
      
        const center:CreateCenterDTO = {
            address:{city:city,country:country,streetName:streetName,streetNumber:streetNumber},
            name:name, description:description, avgGrade:0,workingMedicalStaff:medicalStaff
        }

        fetch('http://localhost:8081/api/center',{
            method:'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(center)
        }).then(res=>{
            console.log(res)
            
        }).catch(err=>console.log(err))

        router.push('/centers')
    }

    function assignAdmins(assignedAdmin:WorkingStaff){
        medicalStaff.push(new MedicalStaff(assignedAdmin));
        console.log(medicalStaff)
        
    }

    function undoAdmin(assignedAdmin:WorkingStaff){
      medicalStaff.forEach((ms,index) => {
        if(ms.person.personId === assignedAdmin.personId){
          medicalStaff.splice(index,1)
        }
        
      });
      console.log(medicalStaff)
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

      <label className='text-4xl text-emerald-600'>Available administrators:</label>
      {availableAdmins.map((admin,index)=>(
        
          <div className="bg-emerald-800 px-2 py-1 border-b-2 border-black flex flex-col rounded-[15px] text-2xl text-emerald-200" key={index}>       
            <p>{admin.name} {admin.surname}</p>
            <AssignButton value="Assign"  handleAssign={()=>assignAdmins(admin)} handleUndo={()=>undoAdmin(admin)}></AssignButton>
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