import "./LCA_02_ImpactCateg.css"
import React, { useEffect, useState } from 'react';

import AssesmentMethodsList from "../../utils/AssesmentMethods";

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

  const Tab = () => <span>&nbsp;&nbsp;&nbsp;</span>

  return (
    <div className="ui centered container">
      <div className="ui form">
        <div className="inline fields">
          <label className="ui label">Assesment Method<Tab/></label>
          <div className="six wide field">
          <div className={`ui fluid simple dropdown`}> 
                <div className="ui fluid selection dropdown">
                  <input name={selectedAssesment.method_name}/>             
                  <div className="text">{selectedAssesment.method_name}</div>
                  <i className="dropdown icon"></i>
                </div>
              <ul className={`menu`}>{listItems}</ul>
            </div>
          </div>
        </div>
        <div className="inline field">
          <label className="ui label">Impact Categories<Tab/></label>
          <div className="six wide field">
            <ul className="ui form">
              <ul className="grouped fields">
              {checkboxItems}
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <LineDropdown title={"Assesment Method"} selected={selectedAssesment}/>
  //     <LineCheckBox title={"Impact Category"}/>
  //   </div>
  // );
}
 
export default ImpactCategPg;