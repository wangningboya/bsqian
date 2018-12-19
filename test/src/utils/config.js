

module.exports = {

  CORS: [],

  api: {
    userLogin2: `/wy/login/login`,
    logout2: `/wy/login/logout`,
    userQuery2: `/wy/user/userQuery`,
    userQuery3: `/wy/user/getUserAndMenu`,
    demandQuery2: `/wy/demand/getDemandList`,
    getDemand: `/wy/demand/getDemand`,
    projectQuery2:`wy/project/findProject`,
    accQuery2: `wy/user/getUserByRoleId?roleId=zz`,
    addDemand2: `wy/demand/addDemand`,
    updateDemand2: `wy/demand/updateDemand`,
    getDemandListByDevId: `wy/demand/getDemandListByDevId`,
    getDemandListByCreactName: `wy/demand/getDemandListByCreactName`,
    getDemandLog:`wy/demand/getDemandLogById`,
    addDemandLog:`wy/demand/addDemandLog`,
    getUsers:`wy/user/getUsers`,
    demand: `wy/demand`,
    getIssueList: `wy/issue/getIssueList`
  },
}
