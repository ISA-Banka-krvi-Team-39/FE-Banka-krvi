import axios, { AxiosRequestConfig } from 'axios';
import {  useState, useEffect} from 'react'
import AssignButton from '../../shared-components/AssignButton';
import CustomInput from '../../shared-components/Inputs/CustomInput'
import { WorkingStaff } from '../../shared-components/model/shared/WorkingStaff';
import { MedicalStaff } from '../../shared-components/model/shared/MedicalStaff';
import { CreateCenterDTO } from '../../shared-components/model/center/CreateCenterDTO';
import { UserInfo } from '../../shared-components/model/shared/UserInfo';
import { getDataFromToken } from '../../shared-components/navbar/getToken';
import { TermForPatient } from '../../shared-components/model/center/TermForPatient';

const fetcher = (url: string) => fetch(url,{mode: 'no-cors'}).then((res) => res.json());
interface props {
  admins: WorkingStaff[];
  scheduledAdmins: WorkingStaff[];
 
}
var collectedCenter : CreateCenterDTO;
var filtered: TermForPatient;
var pers : string;
var htmvar : string;
pers = "";
htmvar = "";

const MyCenter: React.FC<props> = (props: props) => {

  const [name,setName] = useState('');
  const [centerId,setCenterId] = useState('');
  const [description,setDescription] = useState('');
  const [avgGrade,setAvgGrade] = useState('');
  const [country,setCountry] = useState('');
  const [city,setCity] = useState('');
  const [streetName,setStreetName] = useState('');
  const [streetNumber,setStreetNumber] = useState('');
  const availableAdmins: WorkingStaff[] = props.admins
  const scheduledAdmins: WorkingStaff[] = props.scheduledAdmins
  const [terms,setTerms] = useState([] as TermForPatient[]);
  let medicalStaff: MedicalStaff[] = []

  function doSomething(id:number) { 
    const token = localStorage.getItem("auth");
    const tokenNotNull = token != null ? token : "";
    const config = {
        headers:{
        'Access-Control-Allow-Origin' : '*',
        'Authorization': `Bearer ${token}`
        }
    }
    var userInfo:UserInfo = getDataFromToken(tokenNotNull);
    if(userInfo.roles.toString().split('"')[1] !== "ROLE_ADMIN")window.location.href = '/';
    axios.get("http://localhost:8081/api/center/" + id,config)
    .then(res => {

      collectedCenter = res.data;
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
  function getTerms() { 
    const token = localStorage.getItem("auth");
    const tokenNotNull = token != null ? token : "";
    const config = {
        headers:{
        'Access-Control-Allow-Origin' : '*',
        'Authorization': `Bearer ${token}`
        }
    }
    var userInfo:UserInfo = getDataFromToken(tokenNotNull);
  axios.get("http://localhost:8081/api/term/admin",config)
    .then(res => {
     filtered = res.data;
     setTerms(res.data);

    }).catch(err => console.log(err))
  }

  function cancelTerm(id : number) { 
    const token = localStorage.getItem("auth");
    const tokenNotNull = token != null ? token : "";
    const config = {
        headers:{
        'Access-Control-Allow-Origin' : '*',
        'Authorization': `Bearer ${token}`
        }
    }
    var userInfo:UserInfo = getDataFromToken(tokenNotNull);
  axios.get("http://localhost:8081/api/term/cancel/" + id,config)
    .then(res => {
      window.location.reload();
    }).catch(err => console.log(err))
  }


  function assignAdmins(assignedAdmin:WorkingStaff){
    medicalStaff.push(new MedicalStaff(assignedAdmin));
    if(medicalStaff.length != 0)
    collectedCenter.workingMedicalStaff = medicalStaff;
    
}

function undoAdmin(assignedAdmin:WorkingStaff){
  medicalStaff.forEach((ms,index) => {
    if(ms.person.personId === assignedAdmin.personId){
      medicalStaff.splice(index,1)
    }
    
  });
}
  useEffect(()=>{
    const token = localStorage.getItem("auth");
    const tokenNotNull = token != null ? token : "";
    const config = {
        headers:{
        'Access-Control-Allow-Origin' : '*',
        'Authorization': `Bearer ${token}`
        }
    }
    var userInfo:UserInfo = getDataFromToken(tokenNotNull);
    if(userInfo.roles.toString().split('"')[1] !== "ROLE_ADMIN")window.location.href = '/';
    axios.put("http://localhost:8081/api/center/find/" + userInfo.id,1,config)
    .then(res => {
        setCenterId('' + res.data);
        doSomething(res.data);

    }).catch(err => console.log(err))
   
   getTerms();
    
    }, [])
  function updateCenter() { 
    const token = localStorage.getItem("auth");
    const tokenNotNull = token != null ? token : "";
    const config = {
        headers:{
        'Access-Control-Allow-Origin' : '*',
        'Authorization': `Bearer ${token}`
        }
    }
    var userInfo:UserInfo = getDataFromToken(tokenNotNull);

    axios.put("http://localhost:8081/api/center/" + centerId,collectedCenter,config)
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
      window.location.reload();

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
        <label style={{ display: ((availableAdmins.length !=0) ? 'block' : 'none')}} className='text-4xl text-emerald-600'>Available administrators:</label>
      {availableAdmins.map((admin,index)=>(
        
          <div className="bg-emerald-800 px-2 py-1 border-b-2 border-black flex flex-col rounded-[15px] text-2xl text-emerald-200" key={index}>       
            <p>{admin.name} {admin.surname}</p>
            <AssignButton value="Assign"  handleAssign={()=>assignAdmins(admin)} handleUndo={()=>undoAdmin(admin)}></AssignButton>

          </div>
        
      ))}
      <br></br>
      <label style={{ display: ((scheduledAdmins.length !=0) ? 'block' : 'none')}} className='text-4xl text-emerald-600'>Working administrators:</label>
      {scheduledAdmins.map((admin,index)=>(
        
        <div className="bg-emerald-800 px-2 py-1 border-b-2 border-black flex flex-col rounded-[15px] text-2xl text-emerald-200" key={index}>       
          <p>{admin.name} {admin.surname}</p>
          <AssignButton value="Resign"  handleAssign={()=>assignAdmins(admin)} handleUndo={()=>undoAdmin(admin)}></AssignButton>
        </div>
    ))}
      <br></br>
    <br></br>
    <label style={{ display: ((terms.length !=0) ? 'block' : 'none')}}  className='text-4xl text-emerald-600'>Terms:</label>
      {terms.map((admin,index)=>(
        
        <div className="bg-emerald-800 px-2 py-1 border-b-2 border-black flex flex-col rounded-[15px] text-2xl text-emerald-200" key={index}>       
         <p>{"Duration:" + admin.durationInMinutes} {" Date:" + admin.dateTime}{" State:" +admin.state}</p>
         <button onClick={() =>cancelTerm(admin.termId)}  className="duration-150 rounded-[48px] pt-1 pb-2 font-bold px-12  hover:scale-105 text-md text-emerald-200 bg-emerald-900 hover:text-emerald-900 hover:bg-emerald-200">
                Cancel
            </button>
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