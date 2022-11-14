/* eslint-disable @next/next/no-img-element */
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react'
import { CenterWithoutPersons } from '../shared-components/model/center/CenterWithoutPersons';
import Pagination from '../shared-components/paging/Pagination/Pagination';
import Sort from '../public/sort.png'
import CustomInput from '../shared-components/Inputs/CustomInput';
import CustomInputSearch from '../shared-components/Inputs/CustomInputForSearch';

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
      <div className="w-full bg-gray-800 px-6 mt-20 justify-center mb-16 my-auto h-[800px] inline-flex">
        <div className='w-[450px] mr-3 '>
        <div className=' flex justify-center'>
            <label className='text-5xl text-emerald-800 '>Search:</label>
        </div>
        <br/>
        <div className='inline-flex justify-start'>
            <CustomInputSearch
          type='text'
          onChange={(event) => {
            setSearchName(event.target.value);
          }}
          nameToSet='Name'
        ></CustomInputSearch>
        </div >  
        <div className='inline-flex justify-start'>
            <CustomInputSearch
          type='text'
          onChange={(event) => {
            setSearchCity(event.target.value);
          }}
          nameToSet='City'
        ></CustomInputSearch>
        </div>  
        <br/>
        <div className='text-5xl text-emerald-800 flex justify-center'>
            <label>Filter by grade:</label>
        </div>
        <br/>
        <div className='text-5xl text-emerald-800 flex content-evenly justify-center'>
        <select className='bg-emerald-700 text-emerald-100' name="grade1" id="grade1" onChange={(e) => {setgradeFilterFrom(Number(e.target.value));}}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <label className='w-[30px]'></label>
        <label>to</label>
        <label className='w-[30px]'></label>
        <select className='bg-emerald-700 text-emerald-100' name="grade2" id="grade2" onChange={(e) => {setgradeFilterTo(Number(e.target.value));}}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5" selected>5</option>
        </select>
        </div>
        <br/>
        <br/>
        <div className='flex justify-center'>
        <button onClick={ ()=> { setCurrentPage(1); 
            getCenters(1,sortedBy,sortDirection);} } 
            className='w-[200px] h-[70px] justify-center text-5xl bg-emerald-400 text-emerald-900 hover:bg-emerald-200 rounded-xl ring-gray-500 ring-2'>Apply
            </button>
        </div>
        </div>
        <div className=" bg-gray-800 justify-center w-[1200px] mx-auto ">
            <div className='border-2 rounded-t-md border-emerald-800 flex'>
                <div className='w-[150px] flex justify-center'>
                    <p className='text px-4 text-3xl text-center py-2 font-bold'>Name</p>
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
                <div className='w-[665px] flex justify-center'>
                    <p className='text px-4 text-3xl text-center py-2 font-bold'>Description</p>
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
                    <p className='text px-4 text-3xl text-center py-2 font-bold'>Grade</p>
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
                    <p className='text px-4 text-3xl text-center py-2 font-bold'>Address</p>
                </div>
            </div>
            <div className='h-[600px]'>
            {centers.map((center, index) => {
                return (
                <div key={index} className="flex py-4 border-b-2 border-x-2 border-emerald-800">
                    <p className='text px-4 text-xl w-[150px] text-center h-[28px] my-auto'>{(center).name}</p>
                    <p className='text px-4 text-xl w-[665px] text-center h-[28px] my-auto'>{center.description}</p>
                    <p className='text px-4 text-xl w-[150px] text-center h-[28px] my-auto'>{center.avgGrade}</p>
                    <p className='text px-4 text-xl w-[230px] text-center my-auto'>
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


