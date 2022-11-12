import classNames from "classnames"
import { isPropertySignature } from "typescript"


interface props{
    value:string
    className?: string
    handleAssign: (event: React.MouseEvent<HTMLButtonElement>)=>void
    
}


const Button:React.FC<props> = (props) => {
    let flag: boolean = false;
    function handleAssign(){
        props.handleAssign
        flag = true
    }

    const color = flag ? "bg-red-500" : 'bg-emerald-700'
    return ( <button onClick={props.handleAssign} className={classNames(color)}>
        {props.value}
    </button> );
}
 
export default Button;