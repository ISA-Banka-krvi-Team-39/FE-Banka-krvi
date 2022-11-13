
import CenterRegisterForm from '../shared-components/centerRegisterForm';
import { GetStaticProps, NextPage } from 'next';
import { WorkingStaff } from '../shared-components/model/shared/WorkingStaff';


const CenterRegister:React.FC<{admins:WorkingStaff[]}> = ({admins}) => {

    return (
      <CenterRegisterForm admins = {admins}/>   
    );
}
 
export const getStaticProps:GetStaticProps =async () => {
  const res = await fetch("http://localhost:8080/api/person/admins");
  const admins:WorkingStaff[] = await res.json()

  return {
    props:{
      admins:admins
    },
  };
};

export default CenterRegister ;