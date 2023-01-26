import axios, { AxiosResponse, HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react'
import { MedicalStaffDTO } from '../../shared-components/model/center/MedicalStaffDTO';
import { getDataFromToken } from '../../shared-components/navbar/getToken';
import { UserInfo } from '../../shared-components/model/shared/UserInfo';
import { LocalDateTime } from 'js-joda';
import { toast, ToastContainer } from 'react-toastify';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import CustomInput from '../../shared-components/Inputs/CustomInput';
import classNames from 'classnames';
import { DonatedBagsStatsDTO } from '../../shared-components/model/center/DonatedBagsStatsDTO';
import { TermsStatsDTO } from '../../shared-components/model/center/TermsStatsDTO';
import { WastedMaterialStatsDTO } from '../../shared-components/model/center/WastedMaterialStatsDTO';

export default function Register() {

  const [date,setDate] = useState(LocalDateTime.now().toString().substring(0,19));
  const [duration,setDuration] = useState('');
  const [formValid,setFormValid] = useState(false);
  const [avGrade,setavGrade] = useState(0);
  const [termStats,setTermStats] = useState(new TermsStatsDTO(0,0,0));
  const [wastedMaterialStats,setWastedMaterialStats] = useState( new WastedMaterialStatsDTO(0,0,0,0,0,0));
  const [donatedBags,setDonatedBags] = useState(new DonatedBagsStatsDTO(0,0,0));


  const labels = ['Month back from date', '3 Months back from date', 'Year back from date'];
  const MaterialLabels=['Usedin month','Used in 3 months','Used in a year'];

  const Termdata = {
    labels:labels,
    datasets: [
      {
        label: '',
        data: [termStats.termsInMonth,termStats.termsIn3Months,termStats.termsInYear],
        backgroundColor: 'rgba(140, 160, 132, 0.5)',
      }
    ]
  };

  const BloodBagdata = {
    labels:labels,
    datasets: [
      {
        label: '',
        data: [donatedBags.donatedBagsMonthly,donatedBags.donatedBags3Months,donatedBags.donatedBagsYearly],
        backgroundColor: 'rgba(130, 99, 244, 0.5)',
      }
    ]
  };

  const UsedMaterialdata = {
    labels:MaterialLabels,
    datasets: [
      {
        label: 'Used needles',
        data: [wastedMaterialStats.wastedNeedlesMonthly,wastedMaterialStats.wastedNeedles3Months,wastedMaterialStats.wastedNeedlesYearly],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Used bags',
        data: [wastedMaterialStats.wastedBagsMonthly,wastedMaterialStats.wastedBags3Months,wastedMaterialStats.wastedBagsYearly],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  };

  const Termoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Amount of done terms back from inserted date',
      },
    },
  };

  const BloodBagoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Amount of blood bags back from inserted date',
      },
    },
  };

  const UsedMaterialoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Amount of used material back from inserted date',
      },
    },
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  useEffect(() => {
    Apply();
    validate();
    var token = localStorage.getItem("auth")
    const tokenNotNull = token != null ? token : "";
    const config = {
      headers:{
      'Access-Control-Allow-Origin' : '*',
      'Authorization': `Bearer ${token}`
      }
    }
    var userInfo:UserInfo = getDataFromToken(tokenNotNull);
  axios.get("http://localhost:8081/api/center/avgGrade" + "?adminId=" +  userInfo.id,config)
       .then(res => {
        setavGrade(res.data);
     })
     .catch(err => console.log(err));
  },[date]);
     

  function Apply() {
    var token = localStorage.getItem("auth")
    const tokenNotNull = token != null ? token : "";
    const config = {
      headers:{
      'Access-Control-Allow-Origin' : '*',
      'Authorization': `Bearer ${token}`
      }
    }

    axios.get("http://localhost:8081/api/donatedBags/donatedBagsStats?localDateTime=" +  date,config)
       .then(res => {
        setDonatedBags(res.data);
     })
     .catch(err => console.log(err));

     axios.get("http://localhost:8081/api/term/termsStats/?localDateTime=" +  date,config)
       .then(res => {
        setTermStats(res.data);
     })
     .catch(err => console.log(err));

     axios.get("http://localhost:8081/api/wastedMaterial/wastedMaterialStats?localDateTime=" +  date,config)
       .then(res => {
        setWastedMaterialStats(res.data);

     })
     .catch(err => console.log(err));

  }

  function validate(){
    var regexNames = new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}$");
    var regexDuration = new RegExp("^.+$");
    setFormValid(regexNames.test(date));
  }
  var validButton = formValid ? "text-emerald-200 bg-emerald-900" : "text-gray-800 bg-gray-400 cursor-default";

  return (
    <div>
      <div className=" w-full bg-gray-800 px-6 mt-20 flex">
        
          <div className="flex-grow">
            <span className="text text-4xl mr-4 min-w-max">Center Average Grade: {avGrade}</span>
          </div>
          <div className='flex-grow'>
            <CustomInput
            value = {date}
            type='text'
            regex="^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$"
            notValidText='Date is not in valid format, format is YYYY-MM-DDThh:mm:qq'
            onChange={(event) => {
              setDate(event.target.value);
            }}
            nameToSet='Date and time'
          ></CustomInput>
          </div>
          <div className='flex-grow'>
          </div>
          </div >
          <div className='w-1/2 mx-auto mb-16'>
            <Bar options={Termoptions} data={Termdata} />
            <Bar options={BloodBagoptions} data={BloodBagdata} />
            <Bar options={UsedMaterialoptions} data={UsedMaterialdata} />
          </div>
        <ToastContainer theme="dark" />
      
      </div>
  )
}
