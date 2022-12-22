import {  useState, useEffect} from 'react'
import CustomInput from '../../shared-components/Inputs/CustomInput'
import axios from 'axios'
import { PersonGender } from '../../shared-components/model/user/PersonGender'
import { Term } from '../../shared-components/model/center/Term'
import { Center } from '../../shared-components/model/center/center'
import { UserInfo } from '../../shared-components/model/shared/UserInfo'
import { getDataFromToken } from '../../shared-components/navbar/getToken'


var term : Term;
var center : Center;
export default  function MyProfile() {

  const [dateTime,setDateTime] = useState('');
  const [duration,setDuration] = useState('');

 function findCenter()
 {
    axios.get("http://localhost:8080/api/center/1")
      .then(res => {
      center = res.data;
      }).catch(err => console.log(err));
 }
 function findTerm()
 {
  axios.get("http://localhost:8080/api/term/1")
      .then(res => {
      term = res.data;

  }).catch(err => console.log(err));
}



  useEffect(() => {
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
    findTerm();
    findCenter();
    })


  function doSomething() {
    axios.post("http://localhost:8080/api/term", term)
      .then(res => {
    })
    .catch(err => console.log(err));
  }

  return (
    <div className=" w-full bg-gray-800 px-6 mt-20 justify-center inline-flex">
      <div className=" bg-gray-800 justify-center">
        <CustomInput
          value = {dateTime}
          type='text'
          onChange={(event) => {
            term.dateTime = event.target.value;
            setDateTime(event.target.value);
          }}
          nameToSet='DateTime'
        ></CustomInput>

        <CustomInput 
          value = {duration}
          type='text'
          onChange={(event) => {
            term.durationInMinutes = event.target.value;
            setDuration(event.target.value);
          }}
          nameToSet='Duration'
        ></CustomInput>
        <div className='w-full inline-flex justify-center mt-5 mb-28'>
        <button onClick={doSomething} className="bg-emerald-900 rounded-[32px] px-8 py-4 text-emerald-200 font-medium text-2xl">
          Confirm changes 
        </button>
        </div>
      </div>
      <div id="patient" className='h-[750px] w-[600px] rounded-2xl py-5 px-5 border-4 border-black bg-emerald-800 text-slate-300 text-3xl break-words overflow-hidden'>
        <p>Ovde mozete odobriti nove termine!</p>
      </div>
    </div>
)
}
