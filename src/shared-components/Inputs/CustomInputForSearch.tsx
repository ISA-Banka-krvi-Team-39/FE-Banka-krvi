import classNames from "classnames";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

interface CustomInputSearchProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nameToSet: String;
  type: string;
  disabled?: boolean;
  value?: string;
  className?: string;
  regex?:string;
  notValidText?:string;
}

const CustomInputSearch: React.FC<CustomInputSearchProps> = (props) => {
    const [input,setInput]= useState("");
    let isValid = true;
    if(props.regex != undefined){
      var regex = new RegExp(props.regex);
      isValid = regex.test(input);
    }
    const validInput = isValid ? "border-emerald-800 text-emerald-200" : "border-red-800 text-red-400";
    const validText = isValid ? "text-emerald-600" : "text-red-700";
    const hidden = isValid ? "invisible" : "";
    return (
        <div className="my-5 w-[700px]">
          <div className="w-[100px] inline-flex justify-end">
          <span className={classNames("text-xl mr-4 min-w-max",validText)}>{props.nameToSet}:</span>
          </div>
          <input
          value = {props.value}
          disabled={props.disabled}
          type={props.type}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange(event);
            setInput(event.target.value);
          }}
          className={classNames('text-xl bg-gray-800 border-b-2 pb-1 placeholder-emerald-500',props.className,validInput)}
          ></input>
          <br/>
          <div className={classNames("text-red-700 w-full text-lg my-2 text-right pr-7",hidden)}>{props.notValidText}</div>
        </div>
      );
}

export default CustomInputSearch;