export const LCAInventoryAnalysisFuelTypes = [
  {value:"Domestic black coal",                  koreanName:"국내무연탄",          unit:"kg", CO2: 1.87E+00 , CO: 2.91E-03 , CH4: 1.94E-04 , NMVOC: 3.88E-04 , NOx: 5.82E-03 , N2O: 2.91E-05 },
  {value:"Imported black coal_for fuel",         koreanName:"연료용 수입무연탄",     unit:"kg", CO2: 1.98E+00 , CO: 3.08E-03 , CH4: 2.05E-04 , NMVOC: 4.10E-04 , NOx: 6.15E-03 , N2O: 3.08E-05 },
  {value:"Imported black coal_for raw material", koreanName:"원료용 수입무연탄",     unit:"kg", CO2: 2.38E+00 , CO: 3.70E-03 , CH4: 2.47E-04 , NMVOC: 4.94E-04 , NOx: 7.41E-03 , N2O: 3.71E-05 },
  {value:"bituminous coal_for fuel",             koreanName:"연료용 유연탄(역청탄)", unit:"kg", CO2: 2.20E+00 , CO: 3.55E-03 , CH4: 2.37E-04 , NMVOC: 4.74E-04 , NOx: 7.11E-03 , N2O: 3.55E-05 },
  {value:"bituminous coal_for raw material",     koreanName:"원료용 유연탄(역청탄)", unit:"kg", CO2: 2.60E+00 , CO: 4.20E-03 , CH4: 2.80E-04 , NMVOC: 5.60E-04 , NOx: 8.40E-03 , N2O: 4.20E-05 },
  {value:"coke",                                 koreanName:"코크스",             unit:"kg", CO2: 3.03E+00 , CO: 4.33E-03 , CH4: 2.89E-04 , NMVOC: 5.78E-04 , NOx: 8.67E-03 , N2O: 4.33E-05 },
  {value:"petroleum coke",                       koreanName:"석유코크스",          unit:"kg", CO2: 3.30E+00 , CO: 3.42E-04 , CH4: 1.03E-04 , NMVOC: 1.71E-04 , NOx: 6.84E-03 , N2O: 2.05E-05 },
  {value:"LPG",                                  koreanName:"액화석유가스(LPG)",    unit:"kg", CO2: 1.86E+00 , CO: 2.97E-04 , CH4: 8.92E-05 , NMVOC: 1.49E-04 , NOx: 5.95E-03 , N2O: 1.78E-05 },
  {value:"LNG",                                  koreanName:"액화천연가스(LNG)",    unit:"Nm3", CO2: 2.17E+00 , CO: 1.17E-03 , CH4: 3.89E-05 , NMVOC: 1.94E-04 , NOx: 5.84E-03 , N2O: 3.89E-06 },
  {value:"naphtha",                              koreanName:"나프타",             unit:"L", CO2: 2.17E+00 , CO: 2.99E-04 , CH4: 8.97E-05 , NMVOC: 1.50E-04 , NOx: 5.98E-03 , N2O: 1.79E-05 },
  {value:"jet fuel",                             koreanName:"항공유",             unit:"L", CO2: 0 , CO: 0 , CH4: 0 , NMVOC: 0 , NOx: 0 , N2O: 0 },
  {value:"kerosene",                             koreanName:"등유",               unit:"L", CO2: 2.43E+00 , CO: 3.42E-04 , CH4: 1.03E-04 , NMVOC: 1.71E-04 , NOx: 6.84E-03 , N2O: 2.05E-05 },
  {value:"gasoline",                             koreanName:"휘발유",             unit:"L", CO2: 2.09E+00 , CO: 3.04E-04 , CH4: 9.12E-05 , NMVOC: 1.52E-04 , NOx: 6.08E-03 , N2O: 1.82E-05 },
  {value:"diesel",                               koreanName:"경유",              unit:"L", CO2: 2.58E+00 , CO: 3.52E-04 , CH4: 1.06E-04 , NMVOC: 1.76E-04 , NOx: 7.04E-03 , N2O: 2.11E-05 },
  {value:"Fuel Oil_B-A type",                    koreanName:"B-A유",             unit:"L", CO2: 3.00E+00 , CO: 3.92E-04 , CH4: 1.18E-04 , NMVOC: 1.96E-04 , NOx: 7.84E-03 , N2O: 2.35E-05 },
  {value:"Fuel Oil_B-B type",                    koreanName:"B-B유",             unit:"L", CO2: 2.91E+00 , CO: 3.80E-04 , CH4: 1.14E-04 , NMVOC: 1.90E-04 , NOx: 7.60E-03 , N2O: 2.28E-05 },
  {value:"Fuel Oil_B-C type",                    koreanName:"B-C유",             unit:"L", CO2: 3.00E+00 , CO: 3.92E-04 , CH4: 1.18E-04 , NMVOC: 1.96E-04 , NOx: 7.84E-03 , N2O: 2.35E-05 },
  {value:"Asphalt",                              koreanName:"아스팔트",            unit:"kg", CO2: 3.13E+00 , CO: 0 , CH4: 0 , NMVOC: 0 , NOx: 0 , N2O: 0 },
  {value:"Lubricant",                            koreanName:"윤활유",              unit:"L", CO2: 2.71E+00 , CO: 0 , CH4: 0 , NMVOC: 0 , NOx: 0 , N2O: 0 },
]

export const LCAInventoryAnalysisUtilityTypes = [
	{
		value: "Electricity",
		utilityProcesses: [
			{value:"Electricity grid mix 1kV-60kV, consumption mix, to consumer, AC, technology mix, 1kV - 60kV", uuid: "f3a69b46-8e75-48ab-92ed-d4e272ac3044"}
		]
	},
	{
		value: "Heat and Steam",
		utilityProcesses: [
      {value:"Process Steam from biogas, production mix, at heat plant, technology mix regarding firing and flue gas cleaning, MJ, 90% efficiency", uuid: "aadf67e1-9e2b-4da3-96f9-786c63e10d10"},
      {value:"Process steam from biomass (solid) 90%, production mix, at heat plant, technology mix regarding firing and flue gas cleaning, MJ, 90% efficiency", uuid: "6f053940-bbe1-44e9-8a74-b8a2e5a6f91e"},
      {value:"Process steam from hard coal, production mix, at heat plant, technology mix regarding firing and flue gas cleaning, MJ, 90% efficiency", uuid: "e0704c47-dde7-43fd-b4cd-3d065a7525a5"},
      {value:"Process steam from natural gas, production mix, at heat plant, technology mix regarding firing and flue gas cleaning, MJ, 90% efficiency", uuid: "2e8bee44-f13b-4622-9af3-74954af8acea"},
      {value:"Thermal energy from LPG, production mix, at heat plant, technology mix regarding firing and flue gas cleaning, MJ, 100% efficiency", uuid: "ade98dea-0c74-4ebb-94ef-f9686eb0ddc5"},
      {value:"Thermal energy from biogas, production mix, at heat plant, technology mix regarding firing and flue gas cleaning, MJ, 100% efficiency", uuid: "0a223e9c-94c2-4acb-917c-4bb5c1fdc92b"},
      {value:"Thermal energy from hard coal, production mix, at heat plant, technology mix regarding firing and flue gas cleaning, MJ, 100% efficiency", uuid: "61cfc75a-391f-4512-a907-4f92114058c1"},
      {value:"Thermal energy from heavy fuel oil (HFO), production mix, at heat plant, technology mix regarding firing and flue gas cleaning, MJ, 100% efficiency", uuid: "602bba9c-3262-4555-a0a4-7b9f6bc50f82"},
      {value:"Thermal energy from light fuel oil (LFO), production mix, at heat plant, technology mix regarding firing and flue gas cleaning, MJ, 100% efficiency", uuid: "e7510ad9-4bfa-4113-94b0-426e5f430c98"},
      {value:"Thermal energy from lignite, production mix, at heat plant, technology mix regarding firing and flue gas cleaning, MJ, 100% efficiency", uuid: "b2e8b5a9-ac00-4d3a-a180-e52fe73e29fd"},
      {value:"Thermal energy from natural gas, production mix, at heat plant, technology mix regarding firing and flue gas cleaning, MJ, 100% efficiency", uuid: "81675341-f1af-44b0-81d3-d108caef5c28"},
		]
	},
	{
		value: "Water",
		utilityProcesses: [
      {value:"Tap water, at user, technology mix, per kg water", uuid: "212b8494-a769-4c2e-8d82-9a6ef61baad7"},
      {value:"Water, completely softened, at user, technology mix, per kg water", uuid: "5acdcd80-9e9a-46fb-8da7-791a13bfd831"},
      {value:"Water, decarbonised, at plant, technology mix, per kg water", uuid: "34889035-e928-4a75-a848-3ebc1f9acc70"},
      {value:"Water, ultrapure, at user, technology mix, per kg water", uuid: "27ca5013-4ec4-4847-a652-2890aa841d2b"},
		]
	},
	{
		value: "Crude oil based fuels",
		utilityProcesses: [
      {value:"Bitumen at refinery, production mix, at refinery, from crude oil, 38.7 MJ/kg net calorific value", uuid: "4f1bcde3-eee2-466b-a2e6-f7f8f3414f2b"},
      {value:"Diesel mix at refinery, production mix, at refinery, from crude oil, 10 ppm sulphur, 0.04 wt.% bio components", uuid: "22997ee3-1a6d-499b-b9db-9b5494bb18b8"},
      {value:"Gasoline mix (premium) at filling station (E5), consumption mix, at filling station, from crude oil and bio components, 5.33 wt.% bio components", uuid: "b6ea8017-44bf-4fde-8f4f-6aafb7788173"},
      {value:"Gasoline mix (premium) at refinery, production mix, at refinery, from crude oil, 10 ppm sulphur, 0.10 wt.% bio components", uuid: "d3691de9-db44-47da-a820-8cc294e535b5"},
      {value:"Heavy fuel oil at refinery, production mix, at refinery, from crude oil, 1 wt.% sulphur", uuid: "0cbe5ee6-6bc0-4fdd-b9e6-43cc301e55cf"},
      {value:"Kerosene at refinery, production mix, at refinery, from crude oil, 400 ppm sulphur", uuid: "6ba45ade-b765-4975-81bd-d0a68a75d75c"},
      {value:"Liquefied Petroleum Gas (LPG) (70% propane, 30% butane), production mix, at refinery, from crude oil, mix of 70% propane and 30% butane", uuid: "1d139af1-472a-4eab-9c52-715e6c43523d"},
      {value:"Lubricants at refinery, production mix, at refinery, from crude oil, 41.8 MJ/kg net calorific value", uuid: "b1b4d0ff-8e6d-424f-a183-b19b84e353f1"},
      {value:"Naphtha at refinery, production mix, at refinery, from crude oil, 44 MJ/kg net calorific value", uuid: "1cb7ee61-6aa6-4681-854b-3582d5e67614"},
      {value:"Sulphur (elemental) at refinery, production mix, at refinery, from crude oil, 2.07 g/cm3, 32 g/mol", uuid: "a3f9cc00-7810-4d08-aab6-7989c8f90ea1"},
		]
	},
]

export const LCAInventoryAnalysisTransportTypes = [
  {
    value: "Road",
    transportProcesses: [
      {value:"Articulated lorry transport, Euro 3, Total weight <7.5 t, cooled, consumption mix, to consumer, diesel driven, Euro 3, cooled cargo, up to 7,5t gross weight / 3t payload capacity", uuid:"3b268abd-7e34-44d3-bdad-62b22e401357"},
      {value:"Articulated lorry transport, Euro 3, Total weight <7.5 t, frozen, consumption mix, to consumer, diesel driven, Euro 3, frozen cargo, up to 7,5t gross weight / 3t payload capacity", uuid:"969729f2-7707-487f-a9d2-28a1292351f1"},
      {value:"Articulated lorry transport, Euro 5, Total weight 28-32 t, cooled, consumption mix, to consumer, diesel driven, Euro 5, cooled cargo, 28 - 32t gross weight / 21,4t payload capacity", uuid:"6006c4e5-2d64-4e53-9bd0-f2f200e8b22f"},
      {value:"Articulated lorry transport, Euro 5, Total weight 28-32 t, frozen, consumption mix, to consumer, diesel driven, Euro 5, frozen cargo, 28 - 32t gross weight / 21,4t payload capacity", uuid:"1c162876-97dd-41ae-b3f5-e57e582cda57"},
      {value:"Articulated lorry transport, Total weight 12-14 t, mix Euro 0-5, consumption mix, to consumer, diesel driven, Euro 0 - 5 mix, cargo, 12 - 14t gross weight / 9.3t payload capacity", uuid:"0cc18fc1-d0dc-44a4-bfca-40cacc8870a5"},
      {value:"Articulated lorry transport, Total weight 14-20 t, mix Euro 0-5, consumption mix, to consumer, diesel driven, Euro 0 - 5 mix, cargo, 14 - 20t gross weight / 11.4t payload capacity", uuid:"b4ae1399-444e-4e84-892d-ea7992896186"},
      {value:"Articulated lorry transport, Total weight 20-26 t, mix Euro 0-5, consumption mix, to consumer, diesel driven, Euro 0 - 5 mix, cargo, 20 - 26t gross weight / 17,3t payload capacity", uuid:"2a2b6056-87fe-4bc4-bcc6-c4c684b36a05"},
      {value:"Articulated lorry transport, Total weight 28-32 t, mix Euro 0-5, consumption mix, to consumer, diesel driven, Euro 0 - 5 mix, cargo, 28 - 32t gross weight / 22t payload capacity", uuid:"1d516c08-504e-4079-9a4e-c129abb7c053"},
      {value:"Articulated lorry transport, Total weight 7.5-12 t, mix Euro 0-5, consumption mix, to consumer, diesel driven, Euro 0 - 5 mix, cargo, 7,5 - 12t gross weight / 5t payload capacity", uuid:"4d2ad000-c406-4ba2-be0a-1039520f83ca"},
      {value:"Articulated lorry transport, Total weight <7.5 t, mix Euro 0-5, consumption mix, to consumer, diesel driven, Euro 0 - 5 mix, cargo, up to 7,5t gross weight / 3,3t payload capacity", uuid:"f26aea52-151e-4358-aa74-f33f887c3a1d"},
      {value:"Articulated lorry transport, Total weight >32 t, mix Euro 0-5, consumption mix, to consumer, diesel driven, Euro 0 - 5 mix, cargo, more than 32t gross weight / 24,7t payload capacity", uuid:"328984f2-4a54-419a-b88a-5426a75d0b27"},      
    ]
  },
  {
    value: "Rail",
    transportProcesses: [
      {value:"Freight train, diesel traction, consumption mix, to consumer, diesel driven, cargo, average train, gross tonne weight 1000t / 726t payload capacity", uuid:"f4476d2b-9dee-4edd-b6c1-9f04aa407b82"},
      {value:"Freight train, diesel traction, consumption mix, to consumer, diesel driven, cargo, average train, gross tonne weight 1000t / 726t payload capacity", uuid:"be03e1fe-387e-40dc-959f-3cb5caef7445"},
      {value:"Freight train, electricity traction, consumption mix, to consumer, electricity driven, cargo, average train, gross tonne weight 1000t / 726t payload capacity", uuid:"dbde67a3-af4f-4d60-9568-4e0ef6eaaf07"},
    ]
  },
  {
    value: "Air",
    transportProcesses: [
      {value:"Cargo plane, consumption mix, to consumer, technology mix, kerosene driven, cargo, 65 t payload", uuid:"1cc5d465-a12a-43da-aa86-a9c6383c78ac"},
    ]
  },
  {
    value: "Water",
    transportProcesses: [
      {value:"Barge, consumption mix, to consumer, technology mix, diesel driven, cargo, 1500 t payload capacity", uuid:"4cfacea0-cce4-4b4d-bd2b-223c8d4c90ae"},
      {value:"Transoceanic ship, bulk, consumption mix, to consumer, heavy fuel oil driven, cargo, 100.000- 200.000 dwt payload capacity, ocean going", uuid:"82b202c3-826c-4053-b49f-bc6ef737420a"}
    ]
  },
]