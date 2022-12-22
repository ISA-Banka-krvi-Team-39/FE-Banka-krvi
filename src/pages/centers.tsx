/* eslint-disable @next/next/no-img-element */
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react'
import { CenterWithoutPersons } from '../shared-components/model/center/CenterWithoutPersons';
import Pagination from '../shared-components/paging/Pagination/Pagination';
import Sort from '../public/sort.png'
import CustomInputSearch from '../shared-components/Inputs/CustomInputForSearch';
import { useRouter } from 'next/router';

export default function Centers() {
  const [currentPage,setCurrentPage] = useState(1);
  const [lastPage,setLastPage] = useState();
  const [sortBy,setSortBy] = useState('');
  const [sortDirection,setSortDirection] = useState('');
  const [sortedBy,setSortedBy] = useState('');
  const [centers,setCenters] = useState([CenterWithoutPersons]);
  const [searchName,setSearchName] = useState('');
  const [searchCity,setSearchCity] = useState('');
  const [gradeFilterFrom,setgradeFilterFrom] = useState(1);
  const [gradeFilterTo,setgradeFilterTo] = useState(5);
  const router = useRouter();
  if(localStorage.getItem('wasLogged')==='false'){
    router.push('/stranica/SystemAdminLanding')
  }
  

  function getCenters(page:number,sortBy:string,sortDirection:string) {
    const config = {
      headers:{
      'Access-Control-Allow-Origin' : '*',
      }
    }
    axios.get("http://localhost:8080/api/center/list/?page="+ (page-1).toString()+"&size=5&sort=" + sortBy + ","+ sortDirection + "&name=" + searchName + "&city=" + searchCity + "&gradeFilterFrom=" + gradeFilterFrom + "&gradeFilterTo=" + gradeFilterTo  ,config)
    .then(res => {
        setLastPage(res.data.totalPages);
        setCenters(res.data.content);
    })
    .catch(err => {
      console.log(err)
    }
      )
  }
  if(lastPage == undefined){
    getCenters(0,"","");
    return <div className="text text-4xl text-center my-80">Loading</div>
  }

  return (
      <div className="w-full bg-gray-800 px-6 mt-20 justify-center mb-16 my-auto flex">
        <div className='mr-3 w-[350px] justify-center mt-4'>
            <div className='flex justify-center'>
                <label className='text-5xl text-emerald-800 '>Search:</label>
            </div>
            <br/>
            <div>
                <CustomInputSearch
            type='text'
            onChange={(event) => {
                setSearchName(event.target.value);
            }}
            nameToSet='Name'
            ></CustomInputSearch>
            </div >  
            <div>
                <CustomInputSearch
            type='text'
            onChange={(event) => {
                setSearchCity(event.target.value);
            }}
            nameToSet='City'
            ></CustomInputSearch>
            </div>  
            <br/>
            <div className='text-2xl text-emerald-800 flex justify-center'>
                <label>Filter by grade:</label>
            </div>
            <br/>
            <div className='text-2xl text-emerald-800 flex content-evenly justify-center'>
                <select className='bg-emerald-700 rounded-md text-emerald-100' name="grade1" id="grade1" onChange={(e) => {setgradeFilterFrom(Number(e.target.value));}}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label className='mx-2'>to</label>
                <select className='bg-emerald-700 rounded-md text-emerald-100' name="grade2" id="grade2" onChange={(e) => {setgradeFilterTo(Number(e.target.value));}}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5" selected>5</option>
                </select>
            </div>
            <br/>
            <br/>
            <div className='mx-auto flex justify-center'>
                <button onClick={ ()=> { setCurrentPage(1); 
                    getCenters(1,sortedBy,sortDirection);} } 
                    className='text-2xl duration-150 pt-2 pb-3 px-4 bg-emerald-400 text-emerald-900 hover:bg-emerald-200 rounded-[4px] font-bold '>Apply
                </button>
            </div>
        </div>
        <div className=" justify-center mx-auto">
            <div className='border-2 rounded-t-md border-emerald-800 flex'>
                <div className='w-[150px] flex justify-center'>
                    <p className='text px-4 text-xl text-center py-2 font-bold'>Name</p>
                    <img src={Sort.src} alt="sort" className='w-6 h-6 my-auto cursor-pointer' onClick={() =>{
                        setCurrentPage(1);
                        if(sortedBy === "name"){
                            setSortBy("name");
                            setSortedBy("temp");
                            setSortDirection("DESC");
                            getCenters(1,"name","DESC");
                        }else{
                            setSortBy("name");
                            setSortedBy("name");
                            setSortDirection("ASC");
                            getCenters(1,"name","ASC");
                        }
                    }}/>
                </div>
                <div className='w-[500px] flex justify-center'>
                    <p className='text px-4 text-2xl text-center py-2 font-bold'>Description</p>
                    <img src={Sort.src} alt="sort" className='w-6 h-6 my-auto cursor-pointer' onClick={() =>{
                        setCurrentPage(1);
                        if(sortedBy === "description"){
                            setSortBy("description");
                            setSortedBy("temp");
                            setSortDirection("DESC");
                            getCenters(1,"description","DESC");
                        }else{
                            setSortBy("description");
                            setSortedBy("description");
                            setSortDirection("ASC");
                            getCenters(1,"description","ASC");
                        }
                    }}/>
                </div>
                <div className='w-[150px] flex justify-center'>
                    <p className='text px-4 text-2xl text-center py-2 font-bold'>Grade</p>
                    <img src={Sort.src} alt="sort" className='w-6 h-6 my-auto cursor-pointer' onClick={() =>{
                        setCurrentPage(1);
                        if(sortedBy === "avgGrade"){
                            setSortBy("avgGrade");
                            setSortedBy("temp");
                            setSortDirection("DESC");
                            getCenters(1,"avgGrade","DESC");
                        }else{
                            setSortBy("avgGrade");
                            setSortedBy("avgGrade");
                            setSortDirection("ASC");
                            getCenters(1,"avgGrade","ASC");
                        }
                    }}/>
                </div>
                <div className='w-[230px] flex justify-center'>
                    <p className='text px-4 text-2xl text-center py-2 font-bold'>Address</p>
                </div>
            </div>
            <div className='h-[550px]'>
            {centers.map((center, index) => {
                return (
                <div key={index} className="flex py-4 border-b-2 border-x-2 border-emerald-800">
                    <p className='text px-4 text-l w-[150px] text-center h-[28px] my-auto'>{(center).name}</p>
                    <p className='text px-4 text-l w-[500px] text-center h-[28px] my-auto'>{center.description}</p>
                    <p className='text px-4 text-l w-[150px] text-center h-[28px] my-auto'>{center.avgGrade}</p>
                    <p className='text px-4 text-l w-[230px] text-center my-auto'>
                        {center.address.country},<br/>{center.address.city},<br/>{center.address.streetName}{" "}{center.address.streetNumber}
                    </p>
                </div>
            )})}
            </div>
            <div className='justify-center mt-6'>
            <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            maxLength={5}
            setCurrentPage={setCurrentPage}
            getPage={getCenters}
            sortBy={sortBy}
            sortDirection={sortDirection}
            />
            </div>
        </div>
      </div>
  )
}


