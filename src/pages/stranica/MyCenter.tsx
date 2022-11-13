import axios from 'axios';
import {  useState, useEffect} from 'react'
import AssignButton from '../../shared-components/AssignButton';
import CustomInput from '../../shared-components/Inputs/CustomInput'
import { Center } from '../../shared-components/model/center/center';
import { WorkingStaff } from '../../shared-components/model/shared/WorkingStaff';
import { MedicalStaff } from '../../shared-components/model/shared/MedicalStaff';
import { UpdateCenterDTO } from '../../shared-components/model/center/UpdateCenterDTO';
import { CreateCenterDTO } from '../../shared-components/model/center/CreateCenterDTO';

const fetcher = (url: string) => fetch(url,{mode: 'no-cors'}).then((res) => res.json());
interface props {
  admins: WorkingStaff[];
  scheduledAdmins: WorkingStaff[];
 
}
var collectedCenter : CreateCenterDTO;
var pers : string;
var htmvar : string;
pers = "";
htmvar = "";

const MyCenter: React.FC<props> = (props: props) => {

  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [avgGrade,setAvgGrade] = useState('');
  const [country,setCountry] = useState('');
  const [city,setCity] = useState('');
  const [streetName,setStreetName] = useState('');
  const [streetNumber,setStreetNumber] = useState('');
  const [persons,setPersons] = useState('');
  const availableAdmins: WorkingStaff[] = props.admins
  const scheduledAdmins: WorkingStaff[] = props.scheduledAdmins
  let medicalStaff: MedicalStaff[] = []
  let scheduledMedicalStaff: MedicalStaff[] = []
  console.log(availableAdmins);
  console.log(scheduledAdmins);
  function doSomething() { 
    axios.get("http://localhost:8080/api/center/1")
    .then(res => {

      collectedCenter = res.data;
      //console.log(collectedCenter);
      setName(collectedCenter.name);
      setDescription(collectedCenter.description);
      setAvgGrade(collectedCenter.avgGrade + "");
      setCountry(collectedCenter.address.country);
      setCity(collectedCenter.address.city);
      setStreetName(collectedCenter.address.streetName);
      setStreetNumber(collectedCenter.address.streetNumber + "");
      
      
    })
    .catch(err => console.log(err))
    
  }
  function assignAdmins(assignedAdmin:WorkingStaff){
    medicalStaff.push(new MedicalStaff(assignedAdmin));
    console.log(medicalStaff);
    collectedCenter.workingMedicalStaff = medicalStaff;
    
}

function undoAdmin(assignedAdmin:WorkingStaff){
  medicalStaff.forEach((ms,index) => {
    if(ms.person.personId === assignedAdmin.personId){
      medicalStaff.splice(index,1)
    }
    
  });
  console.log(medicalStaff)
}
function assignnAdmins(assignedAdmin:WorkingStaff){
  medicalStaff.forEach((ms,index) => {
    if(ms.person.personId === assignedAdmin.personId){
      medicalStaff.splice(index,1)
    }
    
  });
  
}

function undooAdmin(assignedAdmin:WorkingStaff){
  medicalStaff.push(new MedicalStaff(assignedAdmin));
    console.log(medicalStaff);
    collectedCenter.workingMedicalStaff = medicalStaff;
}
  useEffect(()=>{

   doSomething();
    
    }, [])
  function updateCenter() { 
    axios.put("http://localhost:8080/api/center/1",collectedCenter)
    .then(res => {
      collectedCenter.name = name;
      collectedCenter.description = description;
      var convertedToNumber: number = +avgGrade;
      collectedCenter.avgGrade = convertedToNumber;
      collectedCenter.address.city = city;
      collectedCenter.address.country = country;
      collectedCenter.address.streetName = streetName;
      var convertedToNumber: number = +streetNumber;
      collectedCenter.address.streetNumber = streetNumber;
      collectedCenter.workingMedicalStaff = medicalStaff;

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
            collectedCenter.avgGrade = Number(event.target.value);
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
            collectedCenter.address.streetNumber = event.target.value;
            setStreetNumber(event.target.value);
          }}
          nameToSet='Street Number'
        ></CustomInput>
        <label className='text-4xl text-emerald-600'>Available administrators:</label>
      {availableAdmins.map((admin,index)=>(
        
          <div className="bg-emerald-800 px-2 py-1 border-b-2 border-black flex flex-col rounded-[15px] text-2xl text-emerald-200" key={index}>       
            <p>{admin.name} {admin.surname}</p>
            <AssignButton value="Assign"  handleAssign={()=>assignAdmins(admin)} handleUndo={()=>undoAdmin(admin)}></AssignButton>

          </div>
        
      ))}
      <br></br>
      <label className='text-4xl text-emerald-600'>Working administrators:</label>
      {scheduledAdmins.map((admin,index)=>(
        
        <div className="bg-emerald-800 px-2 py-1 border-b-2 border-black flex flex-col rounded-[15px] text-2xl text-emerald-200" key={index}>       
          <p>{admin.name} {admin.surname}</p>
          <AssignButton value="Resign"  handleAssign={()=>assignAdmins(admin)} handleUndo={()=>undoAdmin(admin)}></AssignButton>

        </div>
      
    ))}
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
export default MyCenter;