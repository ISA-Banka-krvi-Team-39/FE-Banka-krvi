import { GetStaticProps, NextPage } from 'next';
import { PersonDTO } from '../shared-components/model/shared/Person';
import UserList from '../shared-components/UserList';

const Users:React.FC<{users:PersonDTO[]}> = ({users}) => {
    return (
        
        <UserList users = {users} />
    
    );
}


export const getStaticProps:GetStaticProps =async () => {

    const res = await fetch("http://localhost:8080/api/person/all");
    const users:PersonDTO[] = await res.json()

  
    return {
      props:{
        users:users
      },
    };
  };


export default Users;