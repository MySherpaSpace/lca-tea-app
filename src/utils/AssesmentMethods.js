const AssesmentMethods = [
  {
    method_name: "Aware",
    method_uui: "d07113f5-5b74-3af3-84ae-9548cbceafd3",
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
    method_uui: "3905f4a1-6244-3748-b0b5-04e03262c5a8",
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
    method_uui: "f1565e3e-245a-3d5a-9c02-8b792c3cafaa",
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
    method_uui: "3f290cab-a3ac-38af-b940-f31faf74cbe4",
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
    method_uui: "3c7418c4-b970-39ea-9ecf-b351266877f6",
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
    method_uui: "effb055a-ad78-39bd-8dc0-341411db4ae7",
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
]


export default AssesmentMethods;