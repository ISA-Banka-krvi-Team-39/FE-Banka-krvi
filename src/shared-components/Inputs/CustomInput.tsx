import classNames from "classnames";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

interface CustomInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nameToSet: String
  type: string
  disabled?: boolean
  value?: string
  className?: string
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
  return (
    <div className="my-5 w-[700px]">
      <div className="w-48 inline-flex justify-end">
      <span className="text text-4xl mr-4 min-w-max">{props.nameToSet}:</span>
      </div>
      <input
      value = {props.value}
      disabled={props.disabled}
      type={props.type}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event);
      }}
      className={classNames('text-emerald-200 text-4xl bg-gray-800 border-b-2 pb-1 border-emerald-800 placeholder-emerald-500',props.className)}
      ></input>
    </div>
  );
};

export default CustomInput;
