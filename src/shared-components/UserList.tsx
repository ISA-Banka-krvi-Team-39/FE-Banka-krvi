import { use, useState } from "react";
import { PersonDTO } from "./model/shared/Person";
import Pagination from '../shared-components/paging/Pagination/Pagination';
import Sort from '../public/sort.png'

interface props{
    users:PersonDTO[];
}

const UserList:React.FC<props> = (props) => {
    const users:PersonDTO[] = props.users;
    const [searchText,setSearchText] = useState('');
    
    

    const search = (users:PersonDTO[]) => {
      return users.filter(
        (u) => u.name.toLowerCase().includes(searchText) || u.surname.toLowerCase().includes(searchText) || (u.name + ' ' + u.surname).toLowerCase().includes(searchText))
    }
      
      
    const filtered = search(users);

    return (
    <div>
            <input className="border-2 mt-3 ml-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                onChange={(e)=>setSearchText(e.target.value)} type="search" name="search" placeholder="Search"></input>
            
            <div className="flex mt-1">
            <div className=" bg-gray-800 justify-center w-[150px] mx-auto">
            
                <div className='w-[25px] flex justify-center'>
                    <p className='text text-3xl text-center py-2 font-bold'>Name</p>
                
                </div>
            </div>
            <div className=" bg-gray-800 justify-center w-[160px] mx-auto">
            <div className='w-[125px] flex justify-center'>
                <p className='text px-4 text-3xl text-center py-2 font-bold'>Surname</p></div>
            </div>
            <div className=" bg-gray-800 justify-center w-[100px] mx-auto">
            <div className='w-[200px] flex justify-center'>
                <p className='text px-4 text-3xl text-center py-2 font-bold'>Phone number</p></div>
            </div>
            <div className=" bg-gray-800 justify-center w-[220px] mx-auto">
            <div className='w-[145px] flex justify-center'>
                <p className='text px-4 text-3xl text-center py-2 font-bold'>Address</p></div>
            </div>
            </div>
            
        
            
            
            <div className="w-full bg-gray-800 px-6 mt-18 justify-center mb-16 my-auto h-[800px]">
            {filtered.map((user,index)=>(
        
        <div className="flex px-2 py-1 border-2 border-x-2 border-emerald-800" key={index}>       
          <p className='text px-4 text-xl w-[150px] text-center h-[28px] my-auto'>{user.name}</p>
                    <p className='text px-4 text-xl w-[665px] text-center h-[28px] my-auto'>{user.surname}</p>
                    <p className='text px-4 text-xl w-[150px] text-center h-[28px] my-auto'>{user.phoneNumber}</p>
                    <p className='text px-4 text-xl w-[430px] text-center my-auto'>
                        {user.address.country},<br/>{user.address.city},<br/>{user.address.streetName}{" "}{user.address.streetNumber}
                    </p>
          
        </div>
        ))}
        </div>

    </div>
    );
}
 
export default UserList;
 

