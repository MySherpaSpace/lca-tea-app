export const isProductionMode = true;
export const allowServerComm = isProductionMode? true : false;
export const homeAddress = isProductionMode? "/lca-tea-app" : "/"
export const programmaticTabNav = isProductionMode? true : false;

export const serverDetails = {
  host: isProductionMode? "http://localhost:6003/": "https://544eed30-a61d-4d2b-8bdf-439399371fdf.mock.pstmn.io/",
}

export const getNavURL = (address) => {
  if(isProductionMode){
    return "/lca-tea-app"+address
  }

  return address
}

export const tabHomePages = {
  basicInfo: "basic-info/aspen-info-streams-inlet",
  tea: "tea/capex-unit-design",
  lca: "lca/input-project-information",
  summary: "summary/tea-capex",
  sensitivityAnalysis: "sensitivity-analysis/parameter-uncertainty-input"
}

export const httpPaths = {
  login:           serverDetails["host"]+"user_login",
  signUp:          serverDetails["host"]+"user_signup",
  resetPw:         serverDetails["host"]+"forget_password",
  editPw:          serverDetails["host"]+"edit_password",
  editEmail:       serverDetails["host"]+"edit_email",  

  getProjects:     serverDetails["host"]+"project_record",
  createProject:   serverDetails["host"]+"create_project",
  editProject:     serverDetails["host"]+"edit_project",
  deleteProject:   serverDetails["host"]+"delete_project",
  
  inOutletStream:  serverDetails["host"]+"inoutlet_stream",
  streamClass:     serverDetails["host"]+"stream_class",
  blockInfo:       serverDetails["host"]+"block_info",
  basicAssumption: serverDetails["host"]+"basic_assumption",

  capexCalculate:  serverDetails['host']+"capex_calculate",
  opexCost:        serverDetails["host"]+"opex_cost",

  getLcaLciDB:     serverDetails["host"]+"call_process",
  lcaResult:       serverDetails["host"]+"lca_result",

  cashFlow:        serverDetails["host"]+"cash_flow", //POST
  economicIndex:   serverDetails["host"]+"economic_index", //POST
  sensAnalysis:    serverDetails["host"]+"sensitivity_analysis", //POST
}