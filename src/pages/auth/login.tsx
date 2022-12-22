/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import BloodDonation from '../../public/bloodDonation.jpg'
import CustomInput from "../../shared-components/Inputs/CustomInput";
import { LoginUser } from "../../shared-components/model/user/LoginUser";
import { getDataFromToken } from "../../shared-components/navbar/getToken";

export default function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        let isActivationSuccess = localStorage.getItem("activationSuccess");
        if(isActivationSuccess == "true"){
            toast.success('Accout successfuly activated!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        localStorage.removeItem('activationSuccess');
    });
   
    
    async function Login(){
        const config = {
            headers:{
            'Access-Control-Allow-Origin' : '*',
            }
        }
        await axios.post("http://localhost:8080/api/auth/login", new LoginUser(email,password),config).then(res => {
            localStorage.setItem("auth", res.data.accessToken);
            localStorage.setItem("login", "true");
            var roles = getDataFromToken(res.data.accessToken).roles

          
            console.log(getDataFromToken(res.data.accessToken));
            console.log(roles);
            localStorage.setItem("role",roles.toString());
            router.push('/');
            window.location.href = '/';
            ;}).catch(err => {
                toast.error('Password or email not valid!', {
                    position: toast.POSITION.TOP_RIGHT
                });
        });
    }
    
    return (
        <div className=" w-full bg-gray-800 justify-center flex">
            <div className='overflow-hidden flex w-5/12'>
                <img src={BloodDonation.src} alt="blood" className=' h-full my-auto cursor-pointer'/>
            </div>
            <div className="mx-auto flex flex-col justify-center bg-gray-800 mb-36 px-auto">
            <h1 className='text-center text-emerald-200 text-6xl mb-16 mt-16 font-bold'>Login</h1>
            <div className="mr-24">
                <CustomInput 
                type='text'
                className='w-[430px]'
                onChange={(event) => {
                setEmail(event.target.value);
                }}
                nameToSet='Email'
                ></CustomInput>
                <CustomInput 
                type='password'
                className='w-[430px]'
                onChange={(event) => {
                setPassword(event.target.value);
                }}
                nameToSet='Password'
                ></CustomInput>
            </div>
            <div className='w-full inline-flex justify-center mt-5 mb-28'>
                <button onClick={Login} className="duration-150 rounded-[48px] pt-4 pb-5 font-bold px-24  hover:scale-105 text-2xl text-emerald-200 bg-emerald-900 hover:text-emerald-900 hover:bg-emerald-200">
                    Login
                </button>
            </div>
          </div>
          <ToastContainer theme="dark" />
        </div>
    )
}