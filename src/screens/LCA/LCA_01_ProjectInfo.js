import "./LCA_01_ProjectInfo.css"
import React, { forwardRef, useState } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
const ProjectInfoPg = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const LineInput = ({title, top}) => {
    return (
      <div className='row' style={{marginTop: top? 0:10}}>
        <div className="ui centered column grid">

          <div className="three wide column">
            <div className="ui large label" style={{width: 250}}>
              {title}
            </div>
          </div>

          <div className="six wide center aligned column">
            <div className='ui fluid input'>
              <input type="text" placeholder="" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const CustomPickerButton = forwardRef(({ value, onClick }, ref) => (
    <button className="fluid ui primary basic button" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const onStartDatePress = (date) => setStartDate(date)

  const onEndDatePress = (date) => setEndDate(date)

  const LineDateInput = ({title}) => {
    return (
      <div className='row' style={{marginTop:10}}>
        <div className="ui centered column grid">

          <div className="three wide column">
            <div className="ui large label" style={{width: 250}}>
              {title}
            </div>
          </div>

          <div className="three wide center aligned column">
            <DatePicker selected={startDate} onChange={onStartDatePress} customInput={<CustomPickerButton/>}/>
          </div>

          <div className="three wide center aligned column">
            <div className='ui fluid input'>
              <DatePicker selected={endDate} onChange={onEndDatePress} customInput={<CustomPickerButton/>}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const LineTwoInput = ({title, pH1 = "", pH2 = ""}) => {
    return (
      <div className='row' style={{marginTop:10}}>
        <div className="ui centered column grid">

          <div className="three wide column">
            <div className="ui large label" style={{width: 250}}>
              {title}
            </div>
          </div>

          <div className="three wide center aligned column">
            <div className='ui fluid input'>
              <input type="text" placeholder={pH1} />
            </div>
          </div>

          <div className="three wide center aligned column">
            <div className='ui fluid input'>
              <input type="text" placeholder={pH2} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <LineInput title="Quantitative Reference" top/>

      <LineDateInput title="Period of Data Collection" pH1="start" pH2="end"/>

      <LineTwoInput title="Functional Unit"/>

      <LineInput title="Description" />

      <LineInput title="Goal & Scope Definition" /> 
    </div>
  );
}
 
export default ProjectInfoPg;