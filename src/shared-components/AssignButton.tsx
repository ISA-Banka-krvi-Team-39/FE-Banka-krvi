
import { useState } from "react"


interface props{
    value:string
   
    handleAssign: (event: React.MouseEvent<HTMLButtonElement>)=>void
    handleUndo: (event: React.MouseEvent<HTMLButtonElement>)=>void
    
}


const Button:React.FC<props> = (props) => {
    const [isAssigned, setIsAssigned] = useState(false);
    function handleAssign(event: React.MouseEvent<HTMLButtonElement>){
        props.handleAssign(event);
        setIsAssigned(true);
    }

    function undoAssign(event: React.MouseEvent<HTMLButtonElement>){
        props.handleUndo(event);
        setIsAssigned(false);
    }

    return ( 
    <>
    <button onClick={handleAssign} className={`${isAssigned ? 'hidden':' bg-emerald-600 place-self-end rounded-lg px-2 py-2 hover:bg-slate-600'}`}>
        {props.value}
    </button> 
    <button onClick={undoAssign}  className={`${!isAssigned?'hidden':'bg-red-500 place-self-end rounded-lg px-2 py-2 hover:bg-slate-600'}`}>
    {props.value}
    </button> 
    </>
    );
}
 
export default Button;