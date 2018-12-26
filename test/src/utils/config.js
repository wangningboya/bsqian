

module.exports = {

  CORS: [],

  ISSUE_CLOSED: 'e50bb3cac0f64a83bd092187336478fd',
  ISSUE_EDIT: 'b6d4956054694d3b9db65eda368ebfbd',
  ISSUE_DELETE: '09d6aa3f18154fa89af09c5aa37f9941',
  ISSUE_TRANSFER: '4b486e286d0e4a098e55c51f54cf1204',
  PROJECT_EDIT: `154b6606a95947a19e803cffe6fbc5f5`,
  PROJECT_DELETE: `0b373aa290a54aa4bd4d6612e00bb16a`,

  api: {
    userLogin2: `/wy/login/login`,
    logout2: `/wy/login/logout`,
    userQuery2: `/wy/user/userQuery`,
    userQuery3: `/wy/user/getUserAndMenu`,
    demandQuery2: `/wy/demand/getDemandList`,
    getDemand: `/wy/demand/getDemand`,
    projectQuery2: `wy/project/findProject`,
    accQuery2: `wy/user/getUserByRoleId?roleId=zz`,
    addDemand2: `wy/demand/addDemand`,
    updateDemand2: `wy/demand/updateDemand`,
    getDemandListByDevId: `wy/demand/getDemandListByDevId`,
    getDemandListByCreactName: `wy/demand/getDemandListByCreactName`,
    getDemandLog: `wy/demand/getDemandLogById`,
    addDemandLog: `wy/demand/addDemandLog`,
    getUsers: `wy/user/getUsers`,
    demand: `wy/demand`,
    getIssueList: `wy/issue/getIssueList`,
    addIssue2: `wy/issue/addIssue`,
    getIssue: `wy/issue/getIssue`,
    getProject: `wy/project/getProjectList`,
    saveProject: `wy/project/saveProject`,
  },
}
