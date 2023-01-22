import { useRouter } from "next/router";
import matchPath from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
    const router = useRouter();
    const { code } = router.query;
    useEffect(() => {
        console.log(code)
    });
    if(code == undefined)
        return;
    
    const config = {
        headers:{
        'Access-Control-Allow-Origin' : '*',
        }
    }
    axios.put(`http://localhost:8081/api/user/activate/${code}` ,config).then(res => {
        localStorage.setItem("activationSuccess", "true");
        toast.error('Activation success! You can now login', {
            position: toast.POSITION.TOP_RIGHT
        });
        router.push('/auth/login')
    ;}).catch(err => {
        localStorage.setItem("activationFalied", "true");
        router.push('/')
    });
    return (<>
    <ToastContainer theme="dark" />
    </>)
}
