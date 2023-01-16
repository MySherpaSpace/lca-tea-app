const generateYearOptions = (startYear=1980, endYear = 2020) => {
  const arr = [];

  for (let i = endYear; i >= startYear; i--) {
    arr.push(i)
  }

  return arr;
};

const BlockSpecInsideDiameterRange = [3,24];
const BlockSpecLengthOfShellRange = [27, 170];
const BlockSpecWeightOfShellRange = [0, null];
const BlockSpecWeightOfShellHeadRange = [0, null];
const BlockSpecPowerOfAgitatorRange = [0, null];

export const BlockDesignModelNames = ["Seider", "Sinnott"];
const BlockDesignEquipmentTypes = ["Horizontal", "Vertical"];
const BlockDesignEquipment1Types = [[null, "304 ss"],[null]];
const BlockDesignMaterialTypes = [ 
  "Carbon Steel", 
  "Low-alloy steel", 
  "Stainless steel 316", 
  "Carpenter 20CB-3", 
  "Nickel-200", 
  "Monel-400", 
  "Inconel-600", 
  "Incoloy-825", 
  "Titanium"
];
const BlockDesignTargetYears = generateYearOptions(1980, 2020);

const NonReqBlockDesignTargetYears = [null, ...generateYearOptions(1980, 2020)];
const BlockPlatformDesignMaterialType = [null, "Carbon Steel"];
const ColumnPackingTrayTypes = [null, "Column Packing", "Tray"];
//column packing array[0], tray array[1]
const ColumnPackingTrayEquipTypes = [
  [null],
  [ 
    null, 
    "304 ss Raschig rings", 
    "ceramic intalox saddles", 
    "304 ss Pall rings", 
    "PVC structured packing", 
    "304 ss structured packing, 350 m2/m3" 
  ], 
  [
    null, 
    "Sieve", 
    "Valve", 
    "Bubble Cap"
  ]
];
const ColumnPackingTrayMaterialTypes = [ 
  [null],
  [
    null, 
    "Carbon steel",
    "Aluminum and bronze",
    "Cast steel",
    "304 stainless steel",
    "316 stainless steel",
    "321 stainless steel",
    "Hastelloy C",
    "Monel",
    "Nickel and Inconel" 
  ] 
]

const InstantAgitatorEquipmentTypes = [
  null, 
  "Propeller for open tank",
  'Propeller for closed vessel',
  "Turbine for open tank",
  "Turbine for closed vessel  "
]
const InstantAgitatorMaterialTypes = [
  [null],
  [
    null, 
    "Carbon steel",
    "Copper",
    "Stainless steel",
    "Nickel",
    "Monel",
    "Titanium clad",
    "Titanium"
  ]
]
const InstantAutoclaveEquipmentTypes = [
  null, 
  "steel",
  "stainless steel",
  "glass lined"
]
const InstantAutoclaveMaterialTypes = [
  [null],
  [null, "Carbon steel"],
  [null, "Stainless steel"],
  [null, "Glass-lined steel"]
]

const CompressorDesignEquipmentTypes = [
  [
    "rotary twin-screw, steam turbine",
    "rotary twin-screw, gas turbine",
    "rotary twin-screw, steam turbine",
    "rotary twin-screw, electric motor (preferred)",
    "centrifugal, gas turbine",
    "centrifugal, steam turbine",
    "centrifugal, electric motor (preferred)",
    "reciprocating, gas turbine",
    "reciprocating, steam turbine",
    "reciprocating, electric motor (preferred)",
  ],
  [
    "reciprocating",
    "centrifugal"
  ]
]

const CompressorDesignMaterialTypes = [
  [
    "Cast iron",
    "Carbon steel",
    "Stainless steel",
    "Nickel alloy"
  ],
  [
    "Carbon steel",
    "Aluminum and bronze",
    "Cast steel",
    "304 stainless steel",
    "316 stainless steel",
    "321 stainless steel",
    "Hastelloy C",
    "Monel",
    "Nickel and Inconel"
  ]
]

const PumpDesignEquipmentTypes = [
  [
    "centrifugal, 1 stage, 3600 rpm, VSC",
    "centrifugal, 1 stage, 1800 rpm, VSC",
    "centrifugal, 1 stage, 3600 rpm, HSC",
    "centrifugal, 1 stage, 1800 rpm, HSC",
    "centrifugal, 2 stage, 3600 rpm, HSC",
    "centrifugal, 2+ stage, 1800 rpm, HSC",
    "external gear",
    "reciprocating plunger",
  ],
  [
    "single stage centrifugal",
    "explosion proof",
    "condensing steam turbine"
  ]
]

const PumpDesignMaterialTypes = [
  [
    "Cast iron",
    "Ductile iron",
    "Cast steel",
    'Bronze',
    "Stainless steel",
    "Hastelloy C",
    "Monel",
    "Nickel",
    'Titanium'
  ],
  [
    "Ductile iron",
    "Ni-Al-Bronze",
    "Carbon steel",
    "Stainless steel"  
  ],
  [
    "Carbon steel",
    "Aluminum and bronze",
    "Cast steel",
    "304 stainless steel",
    "316 stainless steel",
    "321 stainless steel",
    "Hastelloy C",
    "Monel",
    "Nickel and Inconel"   
  ]
]

export const PumpDesign1ModelNames = [
  [
    null,
    "Seider",
    "Sinnott"
  ]
]

const PumpDesign1EquipmentTypes = [
  [
    null,
    "rotary twin-screw, steam turbine",
    "rotary twin-screw, gas turbine",
    "rotary twin-screw, steam turbine",
    "rotary twin-screw, electric motor (preferred)",
    "centrifugal, gas turbine",
    "centrifugal, steam turbine",
    "centrifugal, electric motor (preferred)",
    'reciprocating, gas turbine',
    "reciprocating, steam turbine",
    'reciprocating, electric motor (preferred)'
  ],
  [
    null,
    "reciprocating",
    "centrifugal"
  ],
  [null]
]

const PumpDesign1MaterialTypes = [
  [
    null,
    "Cast iron",
    "Carbon steel",
    "Stainless steel",
    "Nickel alloy"
  ],
  [
    null,
    "Carbon steel",
    "Aluminum and bronze",
    "Cast steel",
    "304 stainless steel",
    "316 stainless steel",
    "321 stainless steel",
    "Hastelloy C",
    "Monel",
    "Nickel and Inconel"
  ]
]

const ExchangerDesignEquipmentTypes = [
  [
    "air-cooled fin-fan",
    "compact plate and frame",
    "compact spiral plate",
    "compact spiral tube"
  ],
  [
    "floating head shell and tube",
    "double pipe",
    "thermosiphon reboiler",
    "U-tube kettle reboiler",
    "U-tube shell and tube",
    "plate and frame"
  ]
]

const ExchangerDesignMaterialTypes = [
  [
    "Carbon steel",
    "Copper",
    "Stainless steel",
    "Nickel",
    "Monel",
    "Titanium clad",
    "Titanium"
  ],
  [
    "Carbon steel",
    "Aluminum and bronze",
    "Cast steel",
    "304 stainless steel",
    "316 stainless steel",
    "321 stainless steel",
    "Hastelloy C",
    "Monel",
    "Nickel and Inconel"
  ]
]


export const CapexUnitDesignAssignInitInputVal = (colObj, columnSubtitle, dataOfInt, index, extraData) => {
  if(colObj.type === "input,number"){
    return colObj.range? colObj.range[0] : 0
  }else if(colObj.type === "input"){
    return ""
  }

  if(columnSubtitle == null){
    return dataOfInt.block_name
  }else if(columnSubtitle.toLowerCase().includes("operating temp")){
    return dataOfInt.B_TEMP[index+1]
  }else if(columnSubtitle.toLowerCase().includes("operating press")){
    return dataOfInt.B_PRES[index+1]
  }else if(columnSubtitle.toLowerCase().includes("number of trays")){
    return extraData[0]
  }else if(columnSubtitle.toLowerCase().includes("network required")){
    return extraData[0]
  }else if(columnSubtitle.toLowerCase().includes("flow rate")){
    return extraData[0]
  }else if(columnSubtitle.toLowerCase().includes("pump head")){
    return extraData[1]
  }else if(columnSubtitle.toLowerCase().includes("pump brake")){
    return extraData[2]
  }else if(columnSubtitle.toLowerCase().includes("actual exchanger area")){
    return extraData[0]
  }else if(columnSubtitle.toLowerCase().includes("outlet hot stream")){
    return extraData[1]
  }

  return "need to check"
}

export const GetCapexUnitDesignDropdownColVal = (opt) => {
  if(opt){
    let indexOfInt = 0

    if(Array.isArray(opt[0])){
      return opt[0][indexOfInt]
    }

    return opt[indexOfInt]
  }
  return []
}

export const CapexUnitDesignTableColumnHeaders = {
  "COLUMN": [
    {
      columnTitle: "Column",
      subColumns: [
        { head: null, type: "display"}
      ]
    },
    {
      columnTitle: "Column Data",
      subColumns: [
        { head: "Operating Temperature (°C)", type: "display" },
        { head: "Operating Pressure (bar)", type: "display" },
        { head: "Number of Trays", type: "display" },
      ]
    },
    {
      columnTitle: "Column Specification",
      subColumns: [
        { head: "Inside Diameter (m)", type: "input,number", range: BlockSpecInsideDiameterRange, isMandatory: true }, //range can be vars, so, not here
        { head: "Length of Shell (m)", type: "input,number", range: BlockSpecLengthOfShellRange, isMandatory: true }, //range can be vars, so, not here
        { head: "Weight of Shell (kg)", type: "input,number", range: BlockSpecWeightOfShellRange, isMandatory: true }, //range can be vars, so, not here
        { head: "Weigth of Shell Head (kg)", type: "input,number", range: BlockSpecWeightOfShellHeadRange, isMandatory: true }, //range can be vars, so, not here
      ]
    },
    {
      columnTitle: "Column Design",
      subColumns: [
        { head: "Model Name", type: "dropdown", options: BlockDesignModelNames, isMandatory: true }, //options can be vars, so not here
        { head: "Equipment Type", type: "dropdown", options: BlockDesignEquipmentTypes, isMandatory: true }, //options can be vars, so not here
        { head: "Equipment Type 1", type: "dropdown", options: BlockDesignEquipment1Types }, //options can be vars, so not here
        { head: "Material Type", type: "dropdown", options: BlockDesignMaterialTypes, isMandatory: true }, //options can be vars, so not here
        { head: "Target Year", type: "dropdown", options:  BlockDesignTargetYears, isMandatory: true }, //options can be vars, so not here
      ]
    },
    {
      columnTitle: "Platform Design",
      subColumns: [
        { head: "Material Type", type: "dropdown", options: BlockPlatformDesignMaterialType }, //options can be vars, so not here
      ]
    },
    {
      columnTitle: "Packing/Tray Design",
      subColumns: [
        { head: "Type", type: "dropdown", options: ColumnPackingTrayTypes }, //options can be vars, so not here
        { head: "Equipment Type", type: "dropdown", options: ColumnPackingTrayEquipTypes }, //options can be vars, so not here
        { head: "Material Type", type: "dropdown", options: ColumnPackingTrayMaterialTypes }, //options can be vars, so not here
      ]
    }
  ],
  "INSTANTANEOUS": [
    {
      columnTitle: "Instantaneous",
      subColumns: [
        { head: null, type: "display"}
      ]
    },
    {
      columnTitle: "Instantaneous Specification",
      subColumns: [
        { head: "Inside Diameter (m)", type: "input,number", range: BlockSpecInsideDiameterRange, isMandatory: true }, //range can be vars, so, not here
        { head: "Length of Shell (m)", type: "input,number", range: BlockSpecLengthOfShellRange, isMandatory: true }, //range can be vars, so, not here
        { head: "Weight of Shell (kg)", type: "input,number", range: BlockSpecWeightOfShellRange, isMandatory: true }, //range can be vars, so, not here
        { head: "Weigth of Shell Head (kg)", type: "input,number", range: BlockSpecWeightOfShellHeadRange, isMandatory: true }, //range can be vars, so, not here
        { head: "Power of Agitator (kW)", type: "input,number", range: BlockSpecPowerOfAgitatorRange, isMandatory: true }, //range can be vars, so, not here
      ]
    },
    {
      columnTitle: "Instantaneous Design",
      subColumns: [
        { head: "Model Name", type: "dropdown", options: BlockDesignModelNames, isMandatory: true }, //options can be vars, so not here
        { head: "Equipment Type", type: "dropdown", options: BlockDesignEquipmentTypes, isMandatory: true }, //options can be vars, so not here
        { head: "Equipment Type 1", type: "dropdown", options: BlockDesignEquipment1Types }, //options can be vars, so not here
        { head: "Material Type", type: "dropdown", options: BlockDesignMaterialTypes, isMandatory: true }, //options can be vars, so not here
        { head: "Target Year", type: "dropdown", options: BlockDesignTargetYears, isMandatory: true }, //options can be vars, so not here
      ]
    },
    {
      columnTitle: "Platform Design",
      subColumns: [
        { head: "Material Type", type: "dropdown", options: BlockPlatformDesignMaterialType }, //options can be vars, so not here
      ]
    },
    {
      columnTitle: "Agitator Design",
      subColumns: [
        { head: "Equipment Type", type: "dropdown", options: InstantAgitatorEquipmentTypes }, //options can be vars, so not here
        { head: "Material Type", type: "dropdown", options: InstantAgitatorMaterialTypes }, //options can be vars, so not here
      ]
    },
    {
      columnTitle: "Autoclave Design",
      subColumns: [
        { head: "Equipment Type", type: "dropdown", options: InstantAutoclaveEquipmentTypes }, //options can be vars, so not here
        { head: "Material Type", type: "dropdown", options: InstantAutoclaveMaterialTypes }, //options can be vars, so not here
      ]
    },
  ],
  "COMPRESSOR": [
    {
      columnTitle: "Compressor",
      subColumns: [
        { head: null, type: "display"}
      ]
    },
    {
      columnTitle: "Compressor Data",
      subColumns: [
        { head: "Network Required (kW)", type: "display" }, //range can be vars, so, not here
      ]
    },
    {
      columnTitle: "Compressor Design",
      subColumns: [
        { head: "Model Name", type: "dropdown", options: BlockDesignModelNames, isMandatory: true }, //options can be vars, so not here
        { head: "Equipment Type", type: "dropdown", options: CompressorDesignEquipmentTypes, isMandatory: true }, //options can be vars, so not here
        { head: "Material Type", type: "dropdown", options: CompressorDesignMaterialTypes, isMandatory: true }, //options can be vars, so not here
        { head: "Target Year", type: "dropdown", options: BlockDesignTargetYears, isMandatory: true }, //options can be vars, so not here
      ]
    },
  ],
  "PUMP": [
    {
      columnTitle: "Pump",
      subColumns: [
        { head: null, type: "display"}
      ]
    },
    {
      columnTitle: "Pump Data",
      subColumns: [
        { head: "Flow Rate (Q)", type: "display" }, //range can be vars, so, not here
        { head: "Pump Head (H)", type: "display" }, //range can be vars, so, not here
      ]
    },
    {
      columnTitle: "Motor Data",
      subColumns: [
        { head: "Pump Brake Horsepower (kw)", type: "display" }, //range can be vars, so, not here
      ]
    },
    {
      columnTitle: "Pump Design",
      subColumns: [
        { head: "Model Name", type: "dropdown", options: BlockDesignModelNames, isMandatory: true }, //options can be vars, so not here
        { head: "Equipment Type", type: "dropdown", options: PumpDesignEquipmentTypes, isMandatory: true }, //options can be vars, so not here
        { head: "Material Type", type: "dropdown", options: PumpDesignMaterialTypes, isMandatory: true }, //options can be vars, so not here
        { head: "Target Year", type: "dropdown", options: BlockDesignTargetYears, isMandatory: true }, //options can be vars, so not here
      ]
    },
    {
      columnTitle: "Design 1",
      subColumns: [
        { head: "Model Name", type: "dropdown", options: PumpDesign1ModelNames }, //options can be vars, so not here
        { head: "Equipment Type", type: "dropdown", options: PumpDesign1EquipmentTypes }, //options can be vars, so not here
        { head: "Material Type", type: "dropdown", options: PumpDesign1MaterialTypes }, //options can be vars, so not here
        { head: "Target Year", type: "dropdown", options: NonReqBlockDesignTargetYears }, //options can be vars, so not here
      ]
    },
  ],
  "EXCHANGER": [
    {
      columnTitle: "Exchanger",
      subColumns: [
        { head: null, type: "display"}
      ]
    },
    {
      columnTitle: "Exchanger",
      subColumns: [
        { head: "Actual Exchanger Area (sqm)", type: "display"},
        { head: "Outlet Hot Stream Pressure (bar)", type: "display"}
      ]
    },
    {
      columnTitle: "Exchanger Design",
      subColumns: [
        { head: "Model Name", type: "dropdown", options: BlockDesignModelNames, isMandatory: true }, //options can be vars, so not here
        { head: "Equipment Type", type: "dropdown", options: ExchangerDesignEquipmentTypes, isMandatory: true }, //options can be vars, so not here
        { head: "Material Type", type: "dropdown", options: ExchangerDesignMaterialTypes, isMandatory: true }, //options can be vars, so not here
        { head: "Target Year", type: "dropdown", options: BlockDesignTargetYears, isMandatory: true }, //options can be vars, so not here
      ]
    }
  ],
}


export const CapexUnitDesignSaveConfig = [
  //NOTE: target year is in string, numbers in arrays are numbers, null values should be send as ""
  {
    project_id: null
  },
  {
    "unit_design":{
      "COLUMN": [
        {
          "_id": null,
          "Inside_Diameter": [ "meter", null ],
          "Shell_Length": [ "meter", null ],
          "Weight_Shell": [ "kg", null ],
          "Weight_Shell_Heads": [ "kg", null ],
          "Design": {
            "Type": "Pressure Vessel",
            "Model_Name": null,
            "Equip_Type": null,
            "Equip_Type_1": null,
            "Material_Type": null,
            "Target_yr": null
          },
          "Design_1": {
            "Material_Type": null
          },
          "Design_2": {
            "Type": null,
            "Equip_Type": null,
            "Material_Type": null
          }
        }
      ],
      "INSTANTANEOUS": [
        {   
          "_id": null,
          "Design": {
            "Type": "Pressure Vessel",
            "Model_Name": null,
            "Equip_Type": null,
            "Equip_Type_1": "304 ss",
            "Material_Type": "316 stainless steel",
            "Target_yr": "2020"
          },
          "Design_1": {
            "Material_Type": null,
          },
          "Design_2": {
            "Equip_Type": "Propeller for closed vessel",
            "Material_Type": null,
          },
          "Design_3": {
            "Equip_Type":  null,
            "Material_Type":  null,
          },
          "Inside_Diameter": [ "meter", null ],
          "Shell_Length": [ "meter", null ],
          "Weight_Shell": [ "kg", null ],
          "Weight_Shell_Heads": [ "kg", null ],
          "Agitator_Power": [ "kW", null ],
        }
      ],
      "COMPRESSOR": [
        {   
          "_id": null,
          "Design": {
            "Type": "COMPRESSOR",
            "Model_Name": null,
            "Equip_Type": null,
            "Material_Type": null,
            "Target_yr": null
          }
        }
      ],
      "PUMP": [
        {   
          "_id": null,
          "Design": {
            "Type": "PUMP",
            "Model_Name": null,
            "Equip_Type": null,
            "Material_Type": null,
            "Target_yr": null
          },
          "Design_1": {
            "Type": "COMPRESSOR",
            "Model_Name": null,
            "Equip_Type": null,
            "Material_Type": null,
            "Target_yr": null
          }
        }
      ],
      "EXCHANGER": [
        {   
          "_id": null,
          "Design": {
              "Type": "EXCHANGER",
              "Model_Name": null,
              "Equip_Type": null,
              "Material_Type": null,
              "Target_yr": null
          }
        }
      ],
    }
  },
  {
    percentage_method: {
      "ec_i": null,
      "piping": null,
      "manual_valves" : null,
      "insulation_painting": null,
      "site_improvement": null,
      "service_facilities": null,
      "steelwork": null,
      "generalfacilities_capital": null,
      "engineeringhomeoffice_fees": null,
      "projectcontingency_cost": null,
      "processcontingency_cost": null,
      "royalty_fees": null
    }
  }
]