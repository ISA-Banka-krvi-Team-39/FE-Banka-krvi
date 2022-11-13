
import MyCenter from '../pages/stranica/MyCenter';
import { GetStaticProps, NextPage } from 'next';
import { WorkingStaff } from '../shared-components/model/shared/WorkingStaff';


const MyCenterAdmins:React.FC<{admins:WorkingStaff[],scheduledAdmins:WorkingStaff[]}> = ({admins ,scheduledAdmins}) => {

    return (
      <MyCenter admins={admins} scheduledAdmins={scheduledAdmins}/>   
    );
}
 
export const getStaticProps:GetStaticProps =async () => {
  const res = await fetch("http://localhost:8080/api/person/admins");
  const admins:WorkingStaff[] = await res.json();

  const ress = await fetch("http://localhost:8080/api/person/scheduledAdmins");
  const scheduledAdmins:WorkingStaff[] = await ress.json()

  return {
    props:{
      admins:admins,
      scheduledAdmins : scheduledAdmins
    },
  };
};

export default MyCenterAdmins ;