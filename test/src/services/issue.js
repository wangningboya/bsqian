import { api } from '../utils/config'
import request from '../utils/request'

const { getIssueList } = api

export async function issueQuery(params) {
  return request({
    url: getIssueList,
    method: 'get',
    data: params,
  })
}


