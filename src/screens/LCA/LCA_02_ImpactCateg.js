import "./LCA_02_ImpactCateg.css"
import React, { useEffect, useState } from 'react';

import AssesmentMethodsList from "../../utils/AssesmentMethods";

import AppTopMenu from '../../components/AppTopMenu';
import LCASideMenu from '../../components/LCASideMenu';

const ImpactCategPg = () => {

  const [selectedAssesment, setSelectedAssesment] = useState(AssesmentMethodsList[0])
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(()=>{
    let newVals = assignNewArr(selectedAssesment)
    setSelectedCategories(newVals)
  },[selectedAssesment])

  const assignNewArr = (list) => {
    let newArr = []
    list.impact_categories.forEach(obj => {
      newArr.push(obj.selected)
    })

    return newArr
  }

  const onOptClick = (opt) => {
    setSelectedAssesment(opt)

    // const newSelList = assignNewArr(opt)

    // setSelectedCategories(newSelList)
  }

  const handleOnChange = (position) => {
    const updatedCheckedState = selectedCategories.map((item, index) => index === position ? !item : item);

    setSelectedCategories(updatedCheckedState);

    //format -> [true,false,true,false,true,false,true,false,false,false,false,false,false]
    // console.log(JSON.stringify(updatedCheckedState));
  }

  const checkboxItems = selectedAssesment.impact_categories.map((opt, index) => (
    <li className="field" key={index}>
      <div className={`ui checkbox`}>
        <input type="checkbox" id={`custom-checkbox-${index}`} checked={selectedCategories[index]} onChange={()=>handleOnChange(index)}/>
        <label>{opt.category}</label>
      </div>
    </li>
  ));

  const listItems = AssesmentMethodsList.map((opt) =>
    <li className="item" key={opt.method_uui} onClick={()=>onOptClick(opt)}>
      {opt.method_name}
    </li>
  );

  const LineDropdown = ({title, top, selected}) => {
    return (
      <div className='row' style={{marginTop: top? 0:10}}>
        <div className="ui centered column grid">

          <div className="three wide column">
            <div className="ui large label" style={{width: 250}}>
              {title}
            </div>
          </div>

          <div className="six wide center aligned column">
            <div className={`ui fluid simple dropdown`}> 
                <div className="ui fluid selection dropdown">
                  <input name={selected.method_name}/>             
                  <div className="text">{selected.method_name}</div>
                  <i className="dropdown icon"></i>
                </div>
              <ul className={`menu`}>{listItems}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const LineCheckBox = ({title, top}) => {
    return (
      <div className='row' style={{marginTop: top? 0:10}}>
        <div className="ui centered column grid">

          <div className="three wide column">
            <div className="ui large label" style={{width: 250}}>
              {title}
            </div>
          </div>

          <div className="six wide left aligned column">
            <ul className={`ui form`}>
              <div className="grouped fields">
              {checkboxItems}
              </div>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppTopMenu selectedMode="lca" selectedPage="projectInformation"/>

      <div className="section-container">
        <div className="ui two column grid">
          <div className="ui three wide column">
            <LCASideMenu selectedPage="projectInformation"/>
          </div>          
          
          <div className="ui thirteen wide column">
            <LineDropdown title={"Assesment Method"} selected={selectedAssesment}/>
            <LineCheckBox title={"Impact Category"}/>
          </div>
        </div>
      </div>

    </div>
  );
}
 
export default ImpactCategPg;