import "./LCA_01_ProjectInfo.css"
import React, { forwardRef, useState } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
const ProjectInfoPg = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const CustomPickerButton = forwardRef(({ value, onClick }, ref) => (
    <button className="fluid ui primary basic button" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const onStartDatePress = (date) => setStartDate(date)

  const onEndDatePress = (date) => setEndDate(date)
  
  const Tab = () => <span>&nbsp;&nbsp;&nbsp;</span>

  return (
    <div className="ui centered container">
      <div className="ui form">
        <div className="inline fields">
          <label className="ui label">Quantitative Reference<Tab/></label>
          <div className="six wide field">
            <input type="text" placeholder=""/>
          </div>
        </div>
        <div className="inline fields">
          <label className="ui label">Period of Data Collection</label>
          <div className="six wide field">
            <DatePicker selected={startDate} onChange={onStartDatePress} customInput={<CustomPickerButton/>}/>
            <DatePicker selected={endDate} onChange={onEndDatePress} customInput={<CustomPickerButton/>}/>
          </div>
        </div>
        <div className="inline fields">
          <label className="ui label">Functional Unit<Tab/><Tab/><Tab/><Tab/><Tab/><Tab/><Tab/><span>&nbsp;</span></label>
          <div className="six wide field">
            <input type="text" placeholder=""/>
          </div>
        </div>
        <div className="inline fields">
          <label className="ui label">Description<Tab/><Tab/><Tab/><Tab/><Tab/><Tab/><Tab/><Tab/><Tab/><Tab/></label>
          <div className="six wide field">
            <input type="text" placeholder=""/>
          </div>
        </div>
        <div className="inline fields">
          <label className="ui label">Goal & Scope Definition<Tab/></label>
          <div className="six wide field">
            <input type="text" placeholder=""/>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default ProjectInfoPg;