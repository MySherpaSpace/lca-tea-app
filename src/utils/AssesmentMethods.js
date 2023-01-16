const AssesmentMethods = [
  {
    method_name: "Aware",
    method_uuid: "d07113f5-5b74-3af3-84ae-9548cbceafd3",
    impact_categories: [
      {
        category: "Water use",
        unit: "m3",
        selected: false
      }
    ]
  },
  {
    method_name: "BEES+",
    method_uuid: "3905f4a1-6244-3748-b0b5-04e03262c5a8",
    impact_categories: [
      {
        category: "Acidification",
        unit: "H+ mmole eq",
        selected: true
      },
      {
        category: "Ecotoxicity",
        unit: "g 2,4-D eq",
        selected: false
      },
      {
        category: "Eutrophication",
        unit: "g N eq",
        selected: true
      },
      {
        category: "Global warming",
        unit: "g CO2 eq",
        selected: true
      },
      {
        category: "Habitat alteration",
        unit: "T&E count",
        selected: false
      },
      {
        category: "HH cancer",
        unit: "g C6H6 eq",
        selected: false
      },
      {
        category: "HH criteria air pollutants",
        unit: "microDALYs",
        selected: false
      },
      {
        category: "HH noncancer",
        unit: "g C7H7 eq",
        selected: false
      },
      {
        category: "Indoor air quality",
        unit: "g TVOC eq",
        selected: false
      },
      {
        category: "Natural resource depletion",
        unit: "MJ surplus",
        selected: true
      },
      {
        category: "Ozone depletion",
        unit: "g CFC-11 eq",
        selected: true
      },
      {
        category: "Smog",
        unit: "g NOx eq",
        selected: true
      },
      {
        category: "Water intake",
        unit: "liters",
        selected: false
      }
    ]
  },
  {
    method_name: "Berger et al 2014 (Water Scarcity)",
    method_uuid: "f1565e3e-245a-3d5a-9c02-8b792c3cafaa",
    impact_categories: [
      {
        category: "WDI",
        unit: "m3",
        selected: false
      }
    ]
  },
  {
    method_name: "Boulay et al 2011 (Human Health)",
    method_uuid: "3f290cab-a3ac-38af-b940-f31faf74cbe4",
    impact_categories: [
      {
        category: "HH, distribution",
        unit: "DALY",
        selected: true
      },
      {
        category: "HH, marginal",
        unit: "DALY",
        selected: true
      }
    ]
  },
  {
    method_name: "Boulay et al 2011 (Water Scarcity)",
    method_uuid: "3c7418c4-b970-39ea-9ecf-b351266877f6",
    impact_categories: [
      {
        category: "WSI",
        unit: "m3",
        selected: true
      }
    ]
  },
  {
    method_name: "CML-IA baseline",
    method_uuid: "effb055a-ad78-39bd-8dc0-341411db4ae7",
    impact_categories: [
      {
        category: "Abiotic depletion",
        unit: "kg Sb eq",
        selected: true
      },
      {
        category: "Abiotic depletion (fossil fuels)",
        unit: "MJ",
        selected: true
      },
      {
        category: "Acidification",
        unit: "kg SO2 eq",
        selected: true
      },
      {
        category: "Eutrophication",
        unit: "kg PO4--- eq",
        selected: true
      },
      {
        category: "Fresh water aquatic ecotox.",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Global warming (GWP100a)",
        unit: "kg CO2 eq",
        selected: true
      },
      {
        category: "Human toxicity",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Marine aquatic ecotoxicity",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Ozone layer depletion (ODP)",
        unit: "kg CFC-11 eq",
        selected: true
      },
      {
        category: "Photochemical oxidation",
        unit: "kg C2H4 eq",
        selected: true
      },
      {
        category: "Terrestrial ecotoxicity",
        unit: "kg 1,4-DB eq",
        selected: false
      }
    ]
  },
  {
    method_name: "CML-IA non-baseline",
    method_uuid: "46f19b82-ee92-3ff9-b909-d7cab2647b16",
    impact_categories: [
      {
        category: "Abiotic depletion (elem., econ. reserve)",
        unit: "kg Sb eq",
        selected: true
      },
      {
        category: "Abiotic depletion (elem., reserve base)",
        unit: "kg Sb eq",
        selected: true
      },
      {
        category: "Acidification (fate not incl.)",
        unit: "kg SO2 eq",
        selected: true
      },
      {
        category: "Eutrophication (incl. fate)",
        unit: "kg PO4--- eq",
        selected: true
      },
      {
        category: "Freshwater aquatic ecotox. 100a",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Freshwater aquatic ecotox. 20a",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Freshwater aquatic ecotox. 500a",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Freshwater sediment ecotox. 100a",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Freshwater sediment ecotox. 20a",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Freshwater sediment ecotox. 500a",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Freshwater sediment ecotox. infinite",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Fw. aq. ecot.  (PAH, Xylene & NMVOC av.)",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Global warming 100a (incl. NMVOC av.)",
        unit: "kg CO2 eq",
        selected: true
      },
      {
        category: "Global warming 20a",
        unit: "kg CO2 eq",
        selected: true
      },
      {
        category: "Global warming 500a",
        unit: "kg CO2 eq",
        selected: true
      },
      {
        category: "Human tox. (incl. PAH, Xylene & NMVOC av",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Human toxicity 100a",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Human toxicity 20a",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Human toxicity 500a",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Ionising radiation",
        unit: "DALYs",
        selected: false
      },
      {
        category: "Land competition",
        unit: "m2a",
        selected: false
      },
      {
        category: "Lower limit of net global warming",
        unit: "kg CO2 eq",
        selected: false
      },
      {
        category: "Malodorous air",
        unit: "m3 air",
        selected: false
      },
      {
        category: "Mar. aq. ecotox. (PAH, Xylene & NMVOC av",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Marine aquatic ecotox. 100a",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Marine aquatic ecotox. 20a",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Marine aquatic ecotox. 500a",
        unit: "kg 1,4-DB eq",
        selected: false
      },				
      {
        category: "Marine sediment ecotox. 100a",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Marine sediment ecotox. 20a",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Marine sediment ecotox. 500a",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Marine sediment ecotox. infinite",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Ozone layer depletion (incl. NMVOC av.)",
        unit: "kg CFC-11 eq",
        selected: true
      },
      {
        category: "Ozone layer depletion 10a",
        unit: "kg CFC-11 eq",
        selected: true
      },
      {
        category: "Ozone layer depletion 15a",
        unit: "kg CFC-11 eq",
        selected: true
      },
      {
        category: "Ozone layer depletion 20a",
        unit: "kg CFC-11 eq",
        selected: true
      },
      {
        category: "Ozone layer depletion 25a",
        unit: "kg CFC-11 eq",
        selected: true
      },
      {
        category: "Ozone layer depletion 30a",
        unit: "kg CFC-11 eq",
        selected: true
      },
      {
        category: "Ozone layer depletion 40a",
        unit: "kg CFC-11 eq",
        selected: true
      },
      {
        category: "Ozone layer depletion 5a",
        unit: "kg CFC-11 eq",
        selected: true
      },		
      {
        category: "Photochem. oxid. (incl. NMVOC av.)",
        unit: "kg C2H4 eq",
        selected: true
      },
      {
        category: "Photochem. oxid. (incl. NOx & NMVOC av.)",
        unit: "kg C2H4 eq",
        selected: true
      },
      {
        category: "Photochem. oxid. (MIR, very high NOx)",
        unit: "kg C2H4 eq",
        selected: true
      },
      {
        category: "Photochemical oxidation (EBIR, low NOx)",
        unit: "kg C2H4 eq",
        selected: true
      },
      {
        category: "Photochemical oxidation (low NOx)",
        unit: "kg C2H4 eq",
        selected: true
      },
      {
        category: "Photochemical oxidation (MOIR, high NOx)",
        unit: "kg C2H4 eq",
        selected: true
      },
      {
        category: "Terr. ecotox. (PAH, Xylene & NMVOC av.)",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Terrestrial ecotoxicity 100a",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Terrestrial ecotoxicity 20a",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Terrestrial ecotoxicity 500a",
        unit: "kg 1,4-DB eq",
        selected: false
      },
      {
        category: "Upper limit of net global warming",
        unit: "kg CO2 eq",
        selected: true
      }
    ]
  },
  {
    method_name: "Crustal Scarcity Indicator",
    method_uuid: "f79fcbc9-24b4-4bb7-beba-c839850fe37f",
    impact_categories: [
      {
        category: "Crustal scarcity indicator",
        unit: "kg Si eq",
        selected: false
      }
    ]
  },
  {
    method_name: "Cumulative Energy Demand",
    method_uuid: "be749018-2f47-3c25-819e-6e0c6fca1cb5",
    impact_categories: [
      {
        category: "Non renewable, fossil",
        unit: "MJ",
        selected: false
      },
      {
        category: "Non-renewable, biomass",
        unit: "MJ",
        selected: false
      },
      {
        category: "Non-renewable, nuclear",
        unit: "MJ",
        selected: false
      },
      {
        category: "Renewable, biomass",
        unit: "MJ",
        selected: false
      },
      {
        category: "Renewable, water",
        unit: "MJ",
        selected: false
      },
      {
        category: "Renewable, wind, solar, geothe",
        unit: "MJ",
        selected: false
      }
    ]
  },
  {
    method_name: "Cumulative Energy Demand (LHV)", 
    method_uuid: "2f77143f-7956-3d12-9cab-6d9fbfc2f970", 
    impact_categories:[
      {
        category: "Non renewable, fossil", 
        unit:"MJ", 
        selected: false
      },
      {
        category: "Non-renewable, biomass", 
        unit:"MJ", 
        selected: false
      },	
      {
        category: "Non-renewable, nuclear", 
        unit:"MJ", 
        selected: false
      },	
      {
        category: "Renewable, biomass", 
        unit:"MJ", 
        selected: false
      },	
      {
        category: "Renewable, water", 
        unit:"MJ", 
        selected: false
      },		
      {
        category: "Renewable, wind, solar, geothe", 
        unit:"MJ", 
        selected: false
      },		
    ]
  },
  {
    method_name: "Cumulative Exergy Demand", 
    method_uuid: "b0cea729-49fd-334b-ac83-e90fa2202437", 
    impact_categories: [
      {
        category: "Non renewable, fossil", 
        unit:"MJ", 
        selected: false
      },	
      {
        category: "Non renewable, metals", 
        unit:"MJ", 
        selected: false
      },		
      {
        category: "Non renewable, minerals", 
        unit:"MJ", 
        selected: false
      },		
      {
        category: "Non renewable, nuclear", 
        unit:"MJ", 
        selected: false
      },		
      {
        category: "Non renewable, primary", 
        unit:"MJ", 
        selected: false
      },		
      {
        category: "Renewable , biomass", 
        unit:"MJ", 
        selected: false
      },		
      {
        category: "Renewable, kinetic", 
        unit:"MJ", 
        selected: false
      },		
      {
        category: "Renewable, potential", 
        unit:"MJ", 
        selected: false
      },		
      {
        category: "Renewable, solar", 
        unit:"MJ", 
        selected: false
      },		
      {
        category: "Renewable, water", 
        unit:"MJ", 
        selected: false
      },		
    ]
  },
  {
    method_name: "Ecological Scarcity 2006 (Water Scarcity)", 
    method_uuid: "b28b29e5-efb8-3964-8c40-08ad5ce4858a", 
    impact_categories: [
      {
        category: "Natural resources (water only)", 
        unit:"UBP", 
        selected: false
      },		
    ]
  },
  {
    method_name: "Ecological Scarcity 2013", 
    method_uuid: "b06c6f15-21bc-4dad-a5a9-d399235a3b48", 
    impact_categories: [
      {
        category: "Carcinogenic substances into air", 
        unit:"UBP", 
        selected: false
      },	
      {
        category: "Energy resources", 
        unit:"UBP", 
        selected: true},	
      {
        category: "Global warming", 
        unit:"UBP", 
        selected: true},	
      {
        category: "Heavy metals into air", 
        unit:"UBP", 
        selected: false
      },		
      {
        category: "Heavy metals into soil", 
        unit:"UBP", 
        selected: false
      },		
      {
        category: "Heavy metals into water", 
        unit:"UBP", 
        selected: false
      },		
      {
        category: "Land use", 
        unit:"UBP", 
        selected: false
      },		
      {
        category: "Main air pollutants and PM", 
        unit:"UBP", 
        selected: false
      },		
      {
        category: "Mineral resources", 
        unit:"UBP", 
        selected: true},	
      {
        category: "Noise", 
        unit:"UBP", 
        selected: false
      },		
      {
        category: "Non radioactive waste to deposit", 
        unit:"UBP", 
        selected: false
      },		
      {
        category: "Ozone layer depletion", 
        unit:"UBP", 
        selected: true},	
      {
        category: "Pesticides into soil", 
        unit:"UBP", 
        selected: false
      },		
      {
        category: "POP into water", 
        unit:"UBP", 
        selected: false
      },		
      {
        category: "Radioactive substances into air", 
        unit:"UBP", 
        selected: false
      },		
      {
        category: "Radioactive substances into water", 
        unit:"UBP", 
        selected: false
      },		
      {
        category: "Radioactive waste to deposit", 
        unit:"UBP", 
        selected: false
      },		
      {
        category: "Water pollutants", 
        unit:"UBP", 
        selected: false
      },		
      {
        category: "Water resources", 
        unit:"UBP", 
        selected: false
      },		
    ]
  },
  {
    method_name: "Ecosystem Damage Potential", 
    method_uuid: "49beff5f-2ecb-3ce4-82f5-4003815edeaf", 
    impact_categories: [	
      {
        category: "linear, land occupation", 
        unit: "points", 
        selected: true 
      },	
      {
        category: "linear, land transformation", 
        unit: "points", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "EDIP 2003", 
    method_uuid: "ae266ddc-ff35-3a5b-be2e-5a2021226227", 
    impact_categories: [	
      {
        category: "Acidification", 
        unit: "m2", 
        selected: true 
      },	
      {
        category: "Aquatic eutrophication EP(N)", 
        unit: "kg N", 
        selected: true 
      },	
      {
        category: "Aquatic eutrophication EP(P)", 
        unit: "kg P", 
        selected: true 
      },	
      {
        category: "Bulk waste", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Ecotoxicity soil chronic", 
        unit: "m3", 
        selected: false 
      },	
      {
        category: "Ecotoxicity water acute", 
        unit: "m3", 
        selected: false 
      },	
      {
        category: "Ecotoxicity water chronic", 
        unit: "m3", 
        selected: false 
      },	
      {
        category: "Global warming 100a", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Hazardous waste", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Human toxicity air", 
        unit: "person", 
        selected: false 
      },	
      {
        category: "Human toxicity soil", 
        unit: "m3", 
        selected: false 
      },	
      {
        category: "Human toxicity water", 
        unit: "m3", 
        selected: false 
      },	
      {
        category: "Ozone depletion", 
        unit: "kg CFC11 eq", 
        selected: true 
      },	
      {
        category: "Ozone formation (Human)", 
        unit: "person.ppm.h", 
        selected: true 
      },	
      {
        category: "Ozone formation (Vegetation)", 
        unit: "m2.ppm.h", 
        selected: true 
      },	
      {
        category: "Radioactive waste", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Resources (all)", 
        unit: "PR2004", 
        selected: true 
      },	
      {
        category: "Slags/ashes", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Terrestrial eutrophication", 
        unit: "m2", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "EF 3.0 Method (adapted)", 
    method_uuid: "b4571628-4b7b-3e4f-81b1-9a8cca6cb3f8", 
    impact_categories: [	
      {
        category: "Acidification", 
        unit: "mol H+ eq", 
        selected: true 
      },	
      {
        category: "Climate change", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Climate change - Biogenic", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Climate change - Fossil", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Climate change - Land use and LU change", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Ecotoxicity, freshwater", 
        unit: "CTUe", 
        selected: false 
      },	
      {
        category: "Ecotoxicity, freshwater - inorganics", 
        unit: "CTUe", 
        selected: false 
      },	
      {
        category: "Ecotoxicity, freshwater - metals", 
        unit: "CTUe", 
        selected: false 
      },	
      {
        category: "Ecotoxicity, freshwater - organics", 
        unit: "CTUe", 
        selected: false 
      },	
      {
        category: "Eutrophication, freshwater", 
        unit: "kg P eq", 
        selected: true 
      },	
      {
        category: "Eutrophication, marine", 
        unit: "kg N eq", 
        selected: true 
      },	
      {
        category: "Eutrophication, terrestrial", 
        unit: "mol N eq", 
        selected: true 
      },	
      {
        category: "Human toxicity, cancer", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Human toxicity, cancer - inorganics", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Human toxicity, cancer - metals", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Human toxicity, cancer - organics", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Human toxicity, non-cancer", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Human toxicity, non-cancer - inorganics", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Human toxicity, non-cancer - metals", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Human toxicity, non-cancer - organics", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Ionising radiation", 
        unit: "kBq U-235 eq", 
        selected: false 
      },	
      {
        category: "Land use", 
        unit: "Pt", 
        selected: false 
      },	
      {
        category: "Ozone depletion", 
        unit: "kg CFC11 eq", 
        selected: true 
      },	
      {
        category: "Particulate matter", 
        unit: "disease inc.", 
        selected: false 
      },	
      {
        category: "Photochemical ozone formation", 
        unit: "kg NMVOC eq", 
        selected: true 
      },	
      {
        category: "Resource use, fossils", 
        unit: "MJ", 
        selected: true 
      },	
      {
        category: "Resource use, minerals and metals", 
        unit: "kg Sb eq", 
        selected: true 
      },	
      {
        category: "Water use", 
        unit: "m3 depriv.", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "EF Method (adapted)", 
    method_uuid: "b0f6a3ba-a0be-3bfe-ae43-4e23c241e4b6", 
    impact_categories: [	
      {
        category: "Acidification terrestrial and freshwater", 
        unit: "mol H+ eq", 
        selected: true 
      },	
      {
        category: "Cancer human health effects", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Climate change", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Climate change - biogenic", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Climate change - fossil", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Climate change - land use and transform.", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Ecotoxicity freshwater", 
        unit: "CTUe", 
        selected: false 
      },	
      {
        category: "Eutrophication freshwater", 
        unit: "kg P eq", 
        selected: true 
      },	
      {
        category: "Eutrophication marine", 
        unit: "kg N eq", 
        selected: true 
      },	
      {
        category: "Eutrophication terrestrial", 
        unit: "mol N eq", 
        selected: true 
      },	
      {
        category: "Ionising radiation, HH", 
        unit: "kBq U-235 eq", 
        selected: false 
      },	
      {
        category: "Land use", 
        unit: "Pt", 
        selected: false 
      },	
      {
        category: "Non-cancer human health effects", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Ozone depletion", 
        unit: "kg CFC11 eq", 
        selected: true 
      },	
      {
        category: "Photochemical ozone formation, HH", 
        unit: "kg NMVOC eq", 
        selected: true 
      },	
      {
        category: "Resource use, energy carriers", 
        unit: "MJ", 
        selected: true 
      },	
      {
        category: "Resource use, mineral and metals", 
        unit: "kg Sb eq", 
        selected: true 
      },	
      {
        category: "Respiratory inorganics", 
        unit: "disease inc.", 
        selected: false 
      },	
      {
        category: "Water scarcity", 
        unit: "m3 depriv.", 
        selected: false 
      },	
    ]
  },
  {
    method_name: "EN 15804 +A2 Method", 
    method_uuid: "a4fa1dc6-317b-30ad-b2eb-6744ff77dcf0", 
    impact_categories: [	
      {
        category: "Acidification", 
        unit: "mol H+ eq", 
        selected: true 
      },	
      {
        category: "Climate change", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Climate change - Biogenic", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Climate change - Fossil", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Climate change - Land use and LU change", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Ecotoxicity, freshwater", 
        unit: "CTUe", 
        selected: false 
      },	
      {
        category: "Ecotoxicity, freshwater - inorganics", 
        unit: "CTUe", 
        selected: false 
      },	
      {
        category: "Ecotoxicity, freshwater - metals", 
        unit: "CTUe", 
        selected: false 
      },	
      {
        category: "Ecotoxicity, freshwater - organics", 
        unit: "CTUe", 
        selected: false 
      },	
      {
        category: "Eutrophication, freshwater", 
        unit: "kg P eq", 
        selected: true 
      },	
      {
        category: "Eutrophication, marine", 
        unit: "kg N eq", 
        selected: true 
      },	
      {
        category: "Eutrophication, terrestrial", 
        unit: "mol N eq", 
        selected: true 
      },	
      {
        category: "Human toxicity, cancer", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Human toxicity, cancer - inorganics", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Human toxicity, cancer - metals", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Human toxicity, cancer - organics", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Human toxicity, non-cancer", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Human toxicity, non-cancer - inorganics", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Human toxicity, non-cancer - metals", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Human toxicity, non-cancer - organics", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Ionising radiation", 
        unit: "kBq U-235 eq", 
        selected: false 
      },	
      {
        category: "Land use", 
        unit: "Pt", 
        selected: false 
      },	
      {
        category: "Ozone depletion", 
        unit: "kg CFC11 eq", 
        selected: true 
      },	
      {
        category: "Particulate matter", 
        unit: "disease inc.", 
        selected: false 
      },	
      {
        category: "Photochemical ozone formation", 
        unit: "kg NMVOC eq", 
        selected: true 
      },	
      {
        category: "Resource use, fossils", 
        unit: "MJ", 
        selected: true 
      },	
      {
        category: "Resource use, minerals and metals", 
        unit: "kg Sb eq", 
        selected: true 
      },	
      {
        category: "Water use", 
        unit: "m3 depriv.", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "Environmental Footprint (Mid-point indicator)", 
    method_uuid: "7c122634-f88e-381e-be4b-a102078a0803", 
    impact_categories: [	
      {
        category: "Acidification", 
        unit: "mol H+ eq", 
        selected: true 
      },	
      {
        category: "Climate change", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Climate change-Biogenic", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Climate change-Fossil", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Climate change-Land use and land use change", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Ecotoxicity, freshwater", 
        unit: "CTUe", 
        selected: false 
      },	
      {
        category: "Eutrophication marine", 
        unit: "kg N eq", 
        selected: true 
      },	
      {
        category: "Eutrophication, freshwater", 
        unit: "kg P eq", 
        selected: true 
      },	
      {
        category: "Eutrophication, terrestrial ", 
        unit: "mol N eq", 
        selected: true 
      },	
      {
        category: "Human toxicity, cancer", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Human toxicity, non-cancer", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Ionising radiation, human health", 
        unit: "kBq U-235 eq", 
        selected: false 
      },	
      {
        category: "Land use", 
        unit: "Pt", 
        selected: false 
      },	
      {
        category: "Ozone depletion", 
        unit: "kg CFC11 eq", 
        selected: true 
      },	
      {
        category: "Particulate Matter", 
        unit: "disease inc.", 
        selected: false 
      },	
      {
        category: "Photochemical ozone formation - human health", 
        unit: "kg NMVOC eq", 
        selected: true 
      },	
      {
        category: "Resource use, fossils", 
        unit: "MJ", 
        selected: true 
      },	
      {
        category: "Resource use, minerals and metals", 
        unit: "kg Sb eq", 
        selected: true 
      },	
      {
        category: "Water use", 
        unit: "m3 depriv.", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "Environmental Prices", 
    method_uuid: "27407857-2131-3ba5-883a-8ef69088d36a", 
    impact_categories: [	
      {
        category: "Agricultural land occupation", 
        unit: "m2a", 
        selected: false 
      },	
      {
        category: "Climate change", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Fossil depletion", 
        unit: "kg oil eq", 
        selected: false 
      },	
      {
        category: "Freshwater ecotoxicity", 
        unit: "kg 1,4-DB eq", 
        selected: false 
      },	
      {
        category: "Freshwater eutrophication", 
        unit: "kg P eq", 
        selected: true 
      },	
      {
        category: "Human toxicity", 
        unit: "kg 1,4-DB eq", 
        selected: false 
      },	
      {
        category: "Ionising radiation", 
        unit: "kBq U235 eq", 
        selected: false 
      },	
      {
        category: "Marine ecotoxicity", 
        unit: "kg 1,4-DB eq", 
        selected: false 
      },	
      {
        category: "Marine eutrophication", 
        unit: "kg N eq", 
        selected: true 
      },	
      {
        category: "Metal depletion", 
        unit: "kg Fe eq", 
        selected: false 
      },	
      {
        category: "Natural land transformation", 
        unit: "m2", 
        selected: false 
      },	
      {
        category: "Ozone depletion", 
        unit: "kg CFC-11 eq", 
        selected: true 
      },	
      {
        category: "Particulate matter formation", 
        unit: "kg PM10 eq", 
        selected: false 
      },	
      {
        category: "Photochemical oxidant formation", 
        unit: "kg NMVOC", 
        selected: true 
      },	
      {
        category: "Terrestrial acidification", 
        unit: "kg SO2 eq", 
        selected: true 
      },	
      {
        category: "Terrestrial ecotoxicity", 
        unit: "kg 1,4-DB eq", 
        selected: false 
      },	
      {
        category: "Urban land occupation", 
        unit: "m2a", 
        selected: false 
      },	
      {
        category: "Water depletion", 
        unit: "m3", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "EPD (2018)", 
    method_uuid: "83812f2a-8272-3244-91a5-20ca745f0902", 
    impact_categories: [	
      {
        category: "Abiotic depletion, elements", 
        unit: "kg Sb eq", 
        selected: true 
      },	
      {
        category: "Abiotic depletion, fossil fuels", 
        unit: "MJ", 
        selected: true 
      },	
      {
        category: "Acidification (fate not incl.)", 
        unit: "kg SO2 eq", 
        selected: true 
      },	
      {
        category: "Eutrophication", 
        unit: "kg PO4--- eq", 
        selected: true 
      },	
      {
        category: "Global warming (GWP100a)", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Ozone layer depletion (ODP) (optional)", 
        unit: "kg CFC-11 eq", 
        selected: true 
      },	
      {
        category: "Photochemical oxidation", 
        unit: "kg NMVOC", 
        selected: true 
      },	
      {
        category: "Water scarcity", 
        unit: "m3 eq", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "EPS 2015d", 
    method_uuid: "89c872c4-f1f6-39c3-a49f-f50ded7b632f", 
    impact_categories: [	
      {
        category: "Asthma cases", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Cancer", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "COPD severe", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Crop growth capacity", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Depletion of abiotic resources", 
        unit: "kg", 
        selected: true 
      },	
      {
        category: "Diarrhea", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Drinking water", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Fish&meat production capacity", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Gravation of angina pectoris", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Housing availability", 
        unit: "m2", 
        selected: false 
      },	
      {
        category: "Intellectual disability: mild", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Irrigation water", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Low vision", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Malnutrition", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Osteoporosis", 
        unit: "case", 
        selected: false 
      },	
      {
        category: "Poisoning", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Production capacity for fruit&vegetables", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Renal dysfunction", 
        unit: "case", 
        selected: false 
      },	
      {
        category: "Separations", 
        unit: "case", 
        selected: false 
      },	
      {
        category: "Skin cancer", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Species extinction", 
        unit: "NEX", 
        selected: false 
      },	
      {
        category: "Wood growth capacity", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Working capacity", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "YOLL", 
        unit: "PersonYr", 
        selected: false 
      },	
    ]
  },
  {
    method_name: "EPS 2015dx", 
    method_uuid: "aa52ffdd-fd6a-3c50-a10d-dbcb1ba207b2", 
    impact_categories: [	
      {
        category: "Asthma cases", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Cancer", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "COPD severe", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Crop growth capacity", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Depletion of abiotic resources", 
        unit: "kg", 
        selected: true 
      },	
      {
        category: "Diarrhea", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Drinking water", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Fish&meat production capacity", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Gravation of angina pectoris", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Housing availability", 
        unit: "m2", 
        selected: false 
      },	
      {
        category: "Intellectual disability: mild", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Irrigation water", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Low vision", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Malnutrition", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Osteoporosis", 
        unit: "case", 
        selected: false 
      },	
      {
        category: "Poisoning", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Production capacity for fruit&vegetables", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Renal dysfunction", 
        unit: "case", 
        selected: false 
      },	
      {
        category: "Separations", 
        unit: "case", 
        selected: false 
      },	
      {
        category: "Skin cancer", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "Species extinction", 
        unit: "NEX", 
        selected: false 
      },	
      {
        category: "Wood growth capacity", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Working capacity", 
        unit: "PersonYr", 
        selected: false 
      },	
      {
        category: "YOLL", 
        unit: "PersonYr", 
        selected: false 
      },	
    ]
  },
  {
    method_name: "Hoekstra et al 2012 (Water Scarcity)", 
    method_uuid: "bfb6bd35-2943-3d22-bcfd-8bfacdddacd8", 
    impact_categories: [	
      {
        category: "WSI", 
        unit: "m3", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "ILCD 2011 Midpoint+", 
    method_uuid: "84b7e3f4-2898-3d5a-980a-faea0b995bdb", 
    impact_categories: [	
      {
        category: "Acidification", 
        unit: "molc H+ eq", 
        selected: true 
      },	
      {
        category: "Climate change", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Freshwater ecotoxicity", 
        unit: "CTUe", 
        selected: false 
      },	
      {
        category: "Freshwater eutrophication", 
        unit: "kg P eq", 
        selected: true 
      },	
      {
        category: "Human toxicity, cancer effects", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Human toxicity, non-cancer effects", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Ionizing radiation E (interim)", 
        unit: "CTUe", 
        selected: false 
      },	
      {
        category: "Ionizing radiation HH", 
        unit: "kBq U235 eq", 
        selected: false 
      },	
      {
        category: "Land use", 
        unit: "kg C deficit", 
        selected: false 
      },	
      {
        category: "Marine eutrophication", 
        unit: "kg N eq", 
        selected: true 
      },	
      {
        category: "Mineral, fossil & ren resource depletion", 
        unit: "kg Sb eq", 
        selected: true 
      },	
      {
        category: "Ozone depletion", 
        unit: "kg CFC-11 eq", 
        selected: true 
      },	
      {
        category: "Particulate matter", 
        unit: "kg PM2.5 eq", 
        selected: false 
      },	
      {
        category: "Photochemical ozone formation", 
        unit: "kg NMVOC eq", 
        selected: true 
      },	
      {
        category: "Terrestrial eutrophication", 
        unit: "molc N eq", 
        selected: true 
      },	
      {
        category: "Water resource depletion", 
        unit: "m3 water eq", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "IMPACT 2002+", 
    method_uuid: "6b0c5e8a-8e8a-3679-a591-41f944e83bfd", 
    impact_categories: [	
      {
        category: "Aquatic acidification", 
        unit: "kg SO2 eq", 
        selected: true 
      },	
      {
        category: "Aquatic ecotoxicity", 
        unit: "kg TEG water", 
        selected: false 
      },	
      {
        category: "Aquatic eutrophication", 
        unit: "kg PO4 P-lim", 
        selected: true 
      },	
      {
        category: "Carcinogens", 
        unit: "kg C2H3Cl eq", 
        selected: false 
      },	
      {
        category: "Global warming", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Ionizing radiation", 
        unit: "Bq C-14 eq", 
        selected: false 
      },	
      {
        category: "Land occupation", 
        unit: "m2org.arable", 
        selected: false 
      },	
      {
        category: "Mineral extraction", 
        unit: "MJ surplus", 
        selected: false 
      },	
      {
        category: "Non-carcinogens", 
        unit: "kg C2H3Cl eq", 
        selected: false 
      },	
      {
        category: "Non-renewable energy", 
        unit: "MJ primary", 
        selected: true 
      },	
      {
        category: "Ozone layer depletion", 
        unit: "kg CFC-11 eq", 
        selected: true 
      },	
      {
        category: "Respiratory inorganics", 
        unit: "kg PM2.5 eq", 
        selected: false 
      },	
      {
        category: "Respiratory organics", 
        unit: "kg C2H4 eq", 
        selected: false 
      },	
      {
        category: "Terrestrial acid/nutri", 
        unit: "kg SO2 eq", 
        selected: true 
      },	
      {
        category: "Terrestrial ecotoxicity", 
        unit: "kg TEG soil", 
        selected: false 
      },	
    ]
  },
  {
    method_name: "IPCC 2013 GWP 100a", 
    method_uuid: "787c02f1-d1f2-36d6-8e06-2307cc3ebebc", 
    impact_categories: [	
      {
        category: "IPCC GWP 100a", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "IPCC 2013 GWP 100a (incl. CO2 uptake)", 
    method_uuid: "357624c3-da2e-4519-b902-9dbbbd1a71f5", 
    impact_categories: [	
      {
        category: "Climate change - biogenic", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Climate change - CO2 uptake", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Climate change - fossil", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Climate change - land use and land transformation", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "IPCC 2013 GWP 20a", 
    method_uuid: "2d4fec29-3ff5-3499-8dcd-dc085c76c454", 
    impact_categories: [	
      {
        category: "IPCC GWP 20a", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "IPCC 2021 AR6", 
    method_uuid: "fb0bfc55-63f1-4c38-8167-25be95473fee", 
    impact_categories: [	
      {
        category: "IPCC 2021 AGTP 100", 
        unit: "pW m^-2 yr ", 
        selected: false 
      },	
      {
        category: "IPCC 2021 AGTP 50", 
        unit: "pW m^-2 yr ", 
        selected: false 
      },	
      {
        category: "IPCC 2021 AGWP 100", 
        unit: "pW m^-2 yr ", 
        selected: false 
      },	
      {
        category: "IPCC 2021 AGWP 20", 
        unit: "pW m^-2 yr ", 
        selected: false 
      },	
      {
        category: "IPCC 2021 AGWP 500", 
        unit: "pW m^-2 yr ", 
        selected: false 
      },	
      {
        category: "IPCC 2021 CGTP 100", 
        unit: "yr*kg CO2 eq", 
        selected: false 
      },	
      {
        category: "IPCC 2021 CGTP 50", 
        unit: "yr*kg CO2 eq", 
        selected: false 
      },	
      {
        category: "IPCC 2021 GTP 100", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "IPCC 2021 GTP 50", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "IPCC 2021 GWP 100", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "IPCC 2021 GWP 100 (according to UNFCCC/Kyoto Protocol)", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "IPCC 2021 GWP 20", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "IPCC 2021 GWP 500", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "Motoshita et al 2010 (Human Health)", 
    method_uuid: "00348e72-2710-3554-a7ee-a6b36d360701", 
    impact_categories: [	
      {
        category: "HH, agricultural water scarcity", 
        unit: "DALY", 
        selected: true 
      },	
      {
        category: "HH, domestic water scarcity", 
        unit: "DALY", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "Pfister et al 2009 (Eco-indicator 99)", 
    method_uuid: "e222b6d0-1232-386e-ac14-52bc4d18c571", 
    impact_categories: [	
      {
        category: "Ecosystem Quality", 
        unit: "PAF*m2yr", 
        selected: false 
      },	
      {
        category: "Human Health", 
        unit: "DALY", 
        selected: false 
      },	
      {
        category: "Resources", 
        unit: "MJ surplus", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "Pfister et al 2009 (Water Scarcity)", 
    method_uuid: "347b27b7-9c49-3424-b0ce-bada2fe8df95", 
    impact_categories: [	
      {
        category: "WSI", 
        unit: "m3", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "Pfister et al 2010 (ReCiPe)", 
    method_uuid: "4c93a729-bc72-3938-b608-cbd95d2318a5", 
    impact_categories: [	
      {
        category: "Ecosystem Quality", 
        unit: "species*year", 
        selected: false 
      },	
      {
        category: "Human Health", 
        unit: "DALY", 
        selected: false 
      },	
      {
        category: "Resources", 
        unit: "$ surplus", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "ReCiPe 2016 Endpoint (E)", 
    method_uuid: "3b7b6f24-9809-3b46-a0be-2f09892ab9eb", 
    impact_categories: [	
      {
        category: "Fine particulate matter formation", 
        unit: "DALY", 
        selected: false 
      },	
      {
        category: "Fossil resource scarcity", 
        unit: "USD2013", 
        selected: true 
      },	
      {
        category: "Freshwater ecotoxicity", 
        unit: "species.yr", 
        selected: false 
      },	
      {
        category: "Freshwater eutrophication", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Global warming, Freshwater ecosystems", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Global warming, Human health", 
        unit: "DALY", 
        selected: true 
      },	
      {
        category: "Global warming, Terrestrial ecosystems", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Human carcinogenic toxicity", 
        unit: "DALY", 
        selected: false 
      },	
      {
        category: "Human non-carcinogenic toxicity", 
        unit: "DALY", 
        selected: false 
      },	
      {
        category: "Ionizing radiation", 
        unit: "DALY", 
        selected: false 
      },	
      {
        category: "Land use", 
        unit: "species.yr", 
        selected: false 
      },	
      {
        category: "Marine ecotoxicity", 
        unit: "species.yr", 
        selected: false 
      },	
      {
        category: "Marine eutrophication", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Mineral resource scarcity", 
        unit: "USD2013", 
        selected: true 
      },	
      {
        category: "Ozone formation, Human health", 
        unit: "DALY", 
        selected: true 
      },	
      {
        category: "Ozone formation, Terrestrial ecosystems", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Stratospheric ozone depletion", 
        unit: "DALY", 
        selected: true 
      },	
      {
        category: "Terrestrial acidification", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Terrestrial ecotoxicity", 
        unit: "species.yr", 
        selected: false 
      },	
      {
        category: "Water consumption, Aquatic ecosystems", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Water consumption, Human health", 
        unit: "DALY", 
        selected: true 
      },	
      {
        category: "Water consumption, Terrestrial ecosystem", 
        unit: "species.yr", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "ReCiPe 2016 Endpoint (H)", 
    method_uuid: "692b670c-b4e9-3ded-b7b0-a84b00d39bdc", 
    impact_categories: [	
      {
        category: "Fine particulate matter formation", 
        unit: "DALY", 
        selected: false 
      },	
      {
        category: "Fossil resource scarcity", 
        unit: "USD2013", 
        selected: true 
      },	
      {
        category: "Freshwater ecotoxicity", 
        unit: "species.yr", 
        selected: false 
      },	
      {
        category: "Freshwater eutrophication", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Global warming, Freshwater ecosystems", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Global warming, Human health", 
        unit: "DALY", 
        selected: true 
      },	
      {
        category: "Global warming, Terrestrial ecosystems", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Human carcinogenic toxicity", 
        unit: "DALY", 
        selected: false 
      },	
      {
        category: "Human non-carcinogenic toxicity", 
        unit: "DALY", 
        selected: false 
      },	
      {
        category: "Ionizing radiation", 
        unit: "DALY", 
        selected: false 
      },	
      {
        category: "Land use", 
        unit: "species.yr", 
        selected: false 
      },	
      {
        category: "Marine ecotoxicity", 
        unit: "species.yr", 
        selected: false 
      },	
      {
        category: "Marine eutrophication", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Mineral resource scarcity", 
        unit: "USD2013", 
        selected: true 
      },	
      {
        category: "Ozone formation, Human health", 
        unit: "DALY", 
        selected: true 
      },	
      {
        category: "Ozone formation, Terrestrial ecosystems", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Stratospheric ozone depletion", 
        unit: "DALY", 
        selected: true 
      },	
      {
        category: "Terrestrial acidification", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Terrestrial ecotoxicity", 
        unit: "species.yr", 
        selected: false 
      },	
      {
        category: "Water consumption, Aquatic ecosystems", 
        unit: "species.yr", 
        selected: false 
      },	
      {
        category: "Water consumption, Human health", 
        unit: "DALY", 
        selected: false 
      },	
      {
        category: "Water consumption, Terrestrial ecosystem", 
        unit: "species.yr", 
        selected: false 
      },	
    ]
  },
  {
    method_name: "ReCiPe 2016 Endpoint (I)", 
    method_uuid: "183b58c6-44f8-353b-9c75-1cc3d8fe0274", 
    impact_categories: [	
      {
        category: "Fine particulate matter formation", 
        unit: "DALY", 
        selected: false 
      },	
      {
        category: "Fossil resource scarcity", 
        unit: "USD2013", 
        selected: true 
      },	
      {
        category: "Freshwater ecotoxicity", 
        unit: "species.yr", 
        selected: false 
      },	
      {
        category: "Freshwater eutrophication", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Global warming, Freshwater ecosystems", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Global warming, Human health", 
        unit: "DALY", 
        selected: true 
      },	
      {
        category: "Global warming, Terrestrial ecosystems", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Human carcinogenic toxicity", 
        unit: "DALY", 
        selected: false 
      },	
      {
        category: "Human non-carcinogenic toxicity", 
        unit: "DALY", 
        selected: false 
      },	
      {
        category: "Ionizing radiation", 
        unit: "DALY", 
        selected: false 
      },	
      {
        category: "Land use", 
        unit: "species.yr", 
        selected: false 
      },	
      {
        category: "Marine ecotoxicity", 
        unit: "species.yr", 
        selected: false 
      },	
      {
        category: "Marine eutrophication", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Mineral resource scarcity", 
        unit: "USD2013", 
        selected: true 
      },	
      {
        category: "Ozone formation, Human health", 
        unit: "DALY", 
        selected: true 
      },	
      {
        category: "Ozone formation, Terrestrial ecosystems", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Stratospheric ozone depletion", 
        unit: "DALY", 
        selected: true 
      },	
      {
        category: "Terrestrial acidification", 
        unit: "species.yr", 
        selected: true 
      },	
      {
        category: "Terrestrial ecotoxicity", 
        unit: "species.yr", 
        selected: false 
      },	
      {
        category: "Water consumption, Aquatic ecosystems", 
        unit: "species.yr", 
        selected: false 
      },	
      {
        category: "Water consumption, Human health", 
        unit: "DALY", 
        selected: false 
      },	
      {
        category: "Water consumption, Terrestrial ecosystem", 
        unit: "species.yr", 
        selected: false 
      },	
    ]
  },
  {
    method_name: "ReCiPe 2016 Midpoint (E)", 
    method_uuid: "47461eb7-ac98-3242-97e8-760434380369", 
    impact_categories: [	
      {
        category: "Fine particulate matter formation", 
        unit: "kg PM2.5 eq", 
        selected: false 
      },	
      {
        category: "Fossil resource scarcity", 
        unit: "kg oil eq", 
        selected: true 
      },	
      {
        category: "Freshwater ecotoxicity", 
        unit: "kg 1,4-DCB", 
        selected: false 
      },	
      {
        category: "Freshwater eutrophication", 
        unit: "kg P eq", 
        selected: true 
      },	
      {
        category: "Global warming", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Human carcinogenic toxicity", 
        unit: "kg 1,4-DCB", 
        selected: false 
      },	
      {
        category: "Human non-carcinogenic toxicity", 
        unit: "kg 1,4-DCB", 
        selected: false 
      },	
      {
        category: "Ionizing radiation", 
        unit: "kBq Co-60 eq", 
        selected: false 
      },	
      {
        category: "Land use", 
        unit: "m2a crop eq", 
        selected: false 
      },	
      {
        category: "Marine ecotoxicity", 
        unit: "kg 1,4-DCB", 
        selected: false 
      },	
      {
        category: "Marine eutrophication", 
        unit: "kg N eq", 
        selected: true 
      },	
      {
        category: "Mineral resource scarcity", 
        unit: "kg Cu eq", 
        selected: true 
      },	
      {
        category: "Ozone formation, Human health", 
        unit: "kg NOx eq", 
        selected: true 
      },	
      {
        category: "Ozone formation, Terrestrial ecosystems", 
        unit: "kg NOx eq", 
        selected: true 
      },	
      {
        category: "Stratospheric ozone depletion", 
        unit: "kg CFC11 eq", 
        selected: true 
      },	
      {
        category: "Terrestrial acidification", 
        unit: "kg SO2 eq", 
        selected: true 
      },	
      {
        category: "Terrestrial ecotoxicity", 
        unit: "kg 1,4-DCB", 
        selected: false 
      },	
      {
        category: "Water consumption", 
        unit: "m3", 
        selected: false 
      },	
    ]
  },
  {
    method_name: "ReCiPe 2016 Midpoint (H)", 
    method_uuid: "2e5cd15d-d539-3141-a950-56d75df9d579", 
    impact_categories: [	
      {
        category: "Fine particulate matter formation", 
        unit: "kg PM2.5 eq", 
        selected: false 
      },	
      {
        category: "Fossil resource scarcity", 
        unit: "kg oil eq", 
        selected: true 
      },	
      {
        category: "Freshwater ecotoxicity", 
        unit: "kg 1,4-DCB", 
        selected: false 
      },	
      {
        category: "Freshwater eutrophication", 
        unit: "kg P eq", 
        selected: true 
      },	
      {
        category: "Global warming", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Human carcinogenic toxicity", 
        unit: "kg 1,4-DCB", 
        selected: false 
      },	
      {
        category: "Human non-carcinogenic toxicity", 
        unit: "kg 1,4-DCB", 
        selected: false 
      },	
      {
        category: "Ionizing radiation", 
        unit: "kBq Co-60 eq", 
        selected: false 
      },	
      {
        category: "Land use", 
        unit: "m2a crop eq", 
        selected: false 
      },	
      {
        category: "Marine ecotoxicity", 
        unit: "kg 1,4-DCB", 
        selected: false 
      },	
      {
        category: "Marine eutrophication", 
        unit: "kg N eq", 
        selected: true 
      },	
      {
        category: "Mineral resource scarcity", 
        unit: "kg Cu eq", 
        selected: true 
      },	
      {
        category: "Ozone formation, Human health", 
        unit: "kg NOx eq", 
        selected: true 
      },	
      {
        category: "Ozone formation, Terrestrial ecosystems", 
        unit: "kg NOx eq", 
        selected: true 
      },	
      {
        category: "Stratospheric ozone depletion", 
        unit: "kg CFC11 eq", 
        selected: true 
      },	
      {
        category: "Terrestrial acidification", 
        unit: "kg SO2 eq", 
        selected: true 
      },	
      {
        category: "Terrestrial ecotoxicity", 
        unit: "kg 1,4-DCB", 
        selected: false 
      },	
      {
        category: "Water consumption", 
        unit: "m3", 
        selected: false 
      },	
    ]
  },
  {
    method_name: "ReCiPe 2016 Midpoint (I)", 
    method_uuid: "cdc94b11-9a31-3229-a2d4-5b78c2dc7e86", 
    impact_categories: [	
      {
        category: "Fine particulate matter formation", 
        unit: "kg PM2.5 eq", 
        selected: false 
      },	
      {
        category: "Fossil resource scarcity", 
        unit: "kg oil eq", 
        selected: true 
      },	
      {
        category: "Freshwater ecotoxicity", 
        unit: "kg 1,4-DCB", 
        selected: false 
      },	
      {
        category: "Freshwater eutrophication", 
        unit: "kg P eq", 
        selected: true 
      },	
      {
        category: "Global warming", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Human carcinogenic toxicity", 
        unit: "kg 1,4-DCB", 
        selected: false 
      },	
      {
        category: "Human non-carcinogenic toxicity", 
        unit: "kg 1,4-DCB", 
        selected: false 
      },	
      {
        category: "Ionizing radiation", 
        unit: "kBq Co-60 eq", 
        selected: false 
      },	
      {
        category: "Land use", 
        unit: "m2a crop eq", 
        selected: false 
      },	
      {
        category: "Marine ecotoxicity", 
        unit: "kg 1,4-DCB", 
        selected: false 
      },	
      {
        category: "Marine eutrophication", 
        unit: "kg N eq", 
        selected: true 
      },	
      {
        category: "Mineral resource scarcity", 
        unit: "kg Cu eq", 
        selected: true 
      },	
      {
        category: "Ozone formation, Human health", 
        unit: "kg NOx eq", 
        selected: true 
      },	
      {
        category: "Ozone formation, Terrestrial ecosystems", 
        unit: "kg NOx eq", 
        selected: true 
      },	
      {
        category: "Stratospheric ozone depletion", 
        unit: "kg CFC11 eq", 
        selected: true 
      },	
      {
        category: "Terrestrial acidification", 
        unit: "kg SO2 eq", 
        selected: true 
      },	
      {
        category: "Terrestrial ecotoxicity", 
        unit: "kg 1,4-DCB", 
        selected: false 
      },	
      {
        category: "Water consumption", 
        unit: "m3", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "Selected LCI results, additional", 
    method_uuid: "09e9337a-b9ee-3e88-aaaf-bbff90744119", 
    impact_categories: [	
      {
        category: "Actinides (air)", 
        unit: "kBq", 
        selected: false 
      },	
      {
        category: "Actinides (water)", 
        unit: "kBq", 
        selected: false 
      },	
      {
        category: "Aerosole", 
        unit: "kBq", 
        selected: false 
      },	
      {
        category: "Carbon monoxide", 
        unit: "kg", 
        selected: true 
      },	
      {
        category: "Carbon, biogenic, fixed", 
        unit: "kg", 
        selected: true 
      },	
      {
        category: "Dinitrogen monoxide", 
        unit: "kg", 
        selected: true 
      },	
      {
        category: "Freshwater", 
        unit: "m3", 
        selected: false 
      },	
      {
        category: "Heat, waste", 
        unit: "MJ", 
        selected: false 
      },	
      {
        category: "Lead", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Methane", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Noble gas", 
        unit: "kBq", 
        selected: false 
      },	
      {
        category: "Nuclides", 
        unit: "kBq", 
        selected: false 
      },	
      {
        category: "Oils, unspecified", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Particulates", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Particulates >10 um", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Particulates, >2.5 um and <10", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Radium", 
        unit: "kBq", 
        selected: false 
      },	
      {
        category: "Radon (+ radium)", 
        unit: "kBq", 
        selected: false 
      },	
      {
        category: "Tritium", 
        unit: "kBq", 
        selected: false 
      },	
      {
        category: "Water", 
        unit: "m3", 
        selected: false 
      },	
      {
        category: "Zinc", 
        unit: "kg", 
        selected: false 
      },	
    ]
  },
  {
    method_name: "Selected LCI results", 
    method_uuid: "3a748812-7a13-3d2a-b663-6b62f7878bf9", 
    impact_categories: [	
      {
        category: "BOD", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Cadmium", 
        unit: "kg", 
        selected: false 
      },	
      {
        category: "Carbon dioxide, fossil", 
        unit: "kg", 
        selected: true 
      },	
      {
        category: "Land occupation", 
        unit: "m2a", 
        selected: false 
      },	
      {
        category: "Nitrogen oxides", 
        unit: "kg", 
        selected: true 
      },	
      {
        category: "NMVOC", 
        unit: "kg", 
        selected: true 
      },	
      {
        category: "Particulates, <2.5 um", 
        unit: "kg", 
        selected: true 
      },	
      {
        category: "Sulphur dioxide", 
        unit: "kg", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "TRACI 2.1", 
    method_uuid: "d2c781ce-21b4-3218-8fca-78133f2c8d4d", 
    impact_categories: [	
      {
        category: "Acidification", 
        unit: "kg SO2 eq", 
        selected: true 
      },	
      {
        category: "Carcinogenics", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Ecotoxicity", 
        unit: "CTUe", 
        selected: false 
      },	
      {
        category: "Eutrophication", 
        unit: "kg N eq", 
        selected: true 
      },	
      {
        category: "Fossil fuel depletion", 
        unit: "MJ surplus", 
        selected: true 
      },	
      {
        category: "Global warming", 
        unit: "kg CO2 eq", 
        selected: true 
      },	
      {
        category: "Non carcinogenics", 
        unit: "CTUh", 
        selected: false 
      },	
      {
        category: "Ozone depletion", 
        unit: "kg CFC-11 eq", 
        selected: true 
      },	
      {
        category: "Respiratory effects", 
        unit: "kg PM2.5 eq", 
        selected: false 
      },	
      {
        category: "Smog", 
        unit: "kg O3 eq", 
        selected: false 
      },	
    ]
  },
  {
    method_name: "USEtox 2 (recommended + interim)", 
    method_uuid: "5eb764ea-3f85-33f2-b99c-fc8c5b832f99", 
    impact_categories: [	
      {
        category: "Freshwater ecotoxicity", 
        unit: "PAF.m3.day", 
        selected: true 
      },	
      {
        category: "Human toxicity, cancer", 
        unit: "cases", 
        selected: true 
      },	
      {
        category: "Human toxicity, non-cancer", 
        unit: "cases", 
        selected: true 
      },	
    ]
  },
  {
    method_name: "USEtox 2 (recommended only)", 
    method_uuid: "af11ef29-8b3a-37ba-acc5-a7d01a871386", 
    impact_categories: [	
      {
        category: "Freshwater ecotoxicity", 
        unit: "PAF.m3.day", 
        selected: true 
      },	
      {
        category: "Human toxicity, cancer", 
        unit: "cases", 
        selected: true 
      },	
      {
        category: "Human toxicity, non-cancer", 
        unit: "cases", 
        selected: true 
      },	
    ]
  }
]


export default AssesmentMethods;