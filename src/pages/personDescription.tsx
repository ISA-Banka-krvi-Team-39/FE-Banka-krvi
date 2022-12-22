import axios, { AxiosResponse } from 'axios';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react'
import CustomInput from '../shared-components/Inputs/CustomInput';

import { UserInfo } from '../shared-components/model/shared/UserInfo';
import { AppointmentDTO } from '../shared-components/model/user/AppointmentDTO';
import { Info } from '../shared-components/model/user/Info';
import { PersonDescription } from '../shared-components/model/user/PersonDescription';
import { getDataFromToken } from '../shared-components/navbar/getToken';

export default function MakeInfo() {

  const [antibiotics,setAntibiotics] = useState(false);
  const [infections,setInfections] = useState(false);
  const [kilograms,setKilograms] = useState('');
  const [month_period,setMonth_Period] = useState(false);
  const [pressure,setPressure] = useState(false);
  const [sick,setSick] = useState(false);
  const [tatoo,setTatoo] = useState(false);
  const [tooth,setTooth] = useState(false);
  var ps : PersonDescription = {antibiotics:antibiotics,infections:infections,kilograms:kilograms,month_period:month_period,
    pressure:pressure,sick:sick,tatoo:tatoo,tooth:tooth
};

    var description: PersonDescription = {antibiotics:antibiotics,infections:infections,kilograms:kilograms,month_period:month_period,
        pressure:pressure,sick:sick,tatoo:tatoo,tooth:tooth
    };
    var appointmentDto: AppointmentDTO = {appointmentId:-1,termId:1,personId:1,started:true};
        function descr() {
            var token = localStorage.getItem("auth")
            const tokenNotNull = token != null ? token : "";
            const config = {
                headers:{
                'Access-Control-Allow-Origin' : '*',
                'Authorization': `Bearer ${token}`
                }
            }
            appointmentDto.personId = Number(localStorage.getItem("personId"));
            appointmentDto.termId = Number(localStorage.getItem("termId"));
            console.log(appointmentDto.personId + " " + appointmentDto.termId);      
            axios.post("http://localhost:8080/api/appointment/cancel", appointmentDto, config)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err)
                    alert(err.toString());
                });

        }
       
       


        function cret() {
            var token = localStorage.getItem("auth")
            const tokenNotNull = token != null ? token : "";
            const config = {
                headers:{
                'Access-Control-Allow-Origin' : '*',
                'Authorization': `Bearer ${token}`
                }
            }
            appointmentDto.personId = Number(localStorage.getItem("personId"));
            appointmentDto.termId = Number(localStorage.getItem("termId"));
            console.log(appointmentDto.personId + " " + appointmentDto.termId);
            axios.post("http://localhost:8080/api/appointment/create", appointmentDto, config)
                .then(res => {
                    localStorage.setItem('AppointmentId', res.data.appointmentId);
                    if (localStorage.getItem('AppointmentId') == null)
                        localStorage.setItem('AppointmentId', '1');
                })
                .catch(err => {
                    console.log(err);
                    alert(err.toString());

                });

        }
        
        function penal() {
            var token = localStorage.getItem("auth")
            const tokenNotNull = token != null ? token : "";
            const config = {
                headers:{
                'Access-Control-Allow-Origin' : '*',
                'Authorization': `Bearer ${token}`
                }
            }
            appointmentDto.personId = Number(localStorage.getItem("personId"));
            appointmentDto.termId = Number(localStorage.getItem("termId"));
            console.log(appointmentDto.personId + " " + appointmentDto.termId);
            axios.post("http://localhost:8080/api/appointment/penal", appointmentDto, config)
                .then(res => {
                    localStorage.setItem('AppointmentId', res.data.appointmentId);
                    if (localStorage.getItem('AppointmentId') == null)
                        localStorage.setItem('AppointmentId', '1');
                })
                .catch(err => {
                    console.log(err);
                    alert(err.toString());

                });

        }
        useEffect(() => {
            var token = localStorage.getItem("auth")
            appointmentDto.personId = Number(localStorage.getItem("personId"));
            appointmentDto.termId = Number(localStorage.getItem("termId"));
            const tokenNotNull = token != null ? token : "";
            const config = {
                headers:{
                'Access-Control-Allow-Origin' : '*',
                'Authorization': `Bearer ${token}`
                }
            }
            axios.get("http://localhost:8080/api/appointment/description/" + appointmentDto.personId, config)
            .then(res => {
                setAntibiotics(res.data.antibiotics);
                setInfections(res.data.infections);
                setSick(res.data.sick);
                setKilograms(res.data.kilograms);
                setTatoo(res.data.tatoo);
                setTooth(res.data.tooth);
                setMonth_Period(res.data.month_period);
                setPressure(res.data.pressure);
                ps.antibiotics = res.data.antibiotics;
                ps.infections = res.data.infections;
                ps.kilograms = res.data.kilograms;
                ps.month_period = res.data.month_period;
                ps.pressure = res.data.month_period;
                ps.sick = res.data.sick;
                ps.tatoo = res.data.tatoo;
                ps.tooth = res.data.tooth;
            })
            .catch(err => {
                //console.log(err);
                //alert(err.toString());
            });
        });

        



        return (
            <div className=" w-full bg-gray-800 px-6 mt-20 justify-center inline-flex">
                <div className=" bg-gray-800 justify-center">

                    <CustomInput
                        checked={ps.antibiotics}
                        type='checkbox'
                        onChange={(event) => {
                            setAntibiotics(ps.antibiotics);
                        } }
                        nameToSet='Antibiotics'
                    ></CustomInput>

                    {/* <CustomInput
              type='text'
              onChange={(event) => {
                  setBloodType(event.target.value);
              }}
              nameToSet='BloodType'
            ></CustomInput> */}

                    <CustomInput
                        checked={ps.infections}
                        type='checkbox'
                        onChange={(event) => {
                            setInfections(ps.infections);
                        } }
                        nameToSet='Infections'
                    ></CustomInput>

                    <CustomInput
                        checked={ps.month_period}
                        type='checkbox'
                        onChange={(event) => {
                        } }
                        nameToSet='Month_Period'
                    ></CustomInput>

                    <CustomInput
                        checked={ps.pressure}
                        type='checkbox'
                        onChange={(event) => {
                        } }
                        nameToSet='Pressure'
                    ></CustomInput>
                    <CustomInput
                        checked={ps.tatoo}
                        type='checkbox'
                        onChange={(event) => {
                        } }
                        nameToSet='Tatoo'
                    ></CustomInput>
                    <CustomInput
                        checked={ps.tooth}
                        type='checkbox'
                        onChange={(event) => {
                        } }
                        nameToSet='Tooth'
                    ></CustomInput>
                    <CustomInput
                        value={ps.kilograms}
                        type='text'
                        onChange={(event) => {
                            setKilograms(ps.kilograms);
                        } }
                        nameToSet='Kilograms'
                    ></CustomInput>

                    <div className='w-full inline-flex justify-center mt-5 mb-28'>
                        <button onClick={cret} className="mx-4 duration-150 rounded-[48px] pt-4 pb-5 font-bold px-12  hover:scale-105 text-2xl text-emerald-200 bg-emerald-900 hover:text-emerald-900 hover:bg-emerald-200">
                            <Link href="/informations">Continue</Link>
                        </button>
                        <button onClick={descr} className="mx-4 duration-150 rounded-[48px] pt-4 pb-5 font-bold px-12  hover:scale-105 text-2xl text-emerald-200 bg-emerald-900 hover:text-emerald-900 hover:bg-emerald-200">
                            <Link href="/">Forbid</Link>
                        </button>
                        <button onClick={penal} className="mx-4 duration-150 rounded-[48px] pt-4 pb-5 font-bold px-12  hover:scale-105 text-2xl text-emerald-200 bg-emerald-900 hover:text-emerald-900 hover:bg-emerald-200">
                            <Link href="/">Penal</Link>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
