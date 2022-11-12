
import CenterRegisterForm from './centerRegisterForm';
import useFetch from '../shared-components/useFetch';
import { PersonDTO } from '../shared-components/model/shared/Person';


const CenterRegister = () => {

    const data = useFetch("http://localhost:8080/api/person/admins");
    
    return (
      <div>{data && <CenterRegisterForm admins = {data}/>}
      </div>
      
    );
}
 
export default CenterRegister ;