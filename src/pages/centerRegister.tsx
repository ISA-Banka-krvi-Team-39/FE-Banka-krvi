
import CenterRegisterForm from '../shared-components/centerRegisterForm';
import useFetch from '../shared-components/useFetch';
import { GetStaticProps, NextPage } from 'next';
import { WorkingStaff } from '../shared-components/model/shared/WorkingStaff';


const CenterRegister:NextPage<{admins:WorkingStaff[]}> = ({admins}) => {

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