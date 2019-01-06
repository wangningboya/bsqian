import { api } from '../utils/config'
import request from '../utils/request'

const { getIssueList, addIssue2, getIssue, deleteIssueById, closeIssueById, accQuery2, projectQuery2, issueToDemand2 } = api

export async function issueQuery(params) {
  return request({
    url: getIssueList,
    method: 'get',
    data: params,
  })
}

export async function addIssue(params) {
  return request({
    url: addIssue2,
    method: 'get',
    data: params,
  })
}

export async function getIssueById(params) {
  return request({
    url: getIssue,
    method: 'get',
    data: params,
  })
}

export async function deleteIssue(params) {
  return request({
    url: deleteIssueById,
    method: 'get',
    data: params,
  })
}

export async function closeIssue(params) {
  return request({
    url: closeIssueById,
    method: 'get',
    data: params,
  })
}

export async function projectQuery(params) {
  return request({
    url: projectQuery2,
    method: 'get',
    data: params,
  })
}

export async function accQuery(params) {
  return request({
    url: accQuery2,
    method: 'get',
    data: params,
  })
}

export async function issueToDemand(params) {
  return request({
    url: issueToDemand2,
    method: 'get',
    data: params,
  })
}
