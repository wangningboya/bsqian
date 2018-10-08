import { request, config } from 'utils'

const { api } = config
const { userLogin } = api

export async function login (params) {
    return request({
      url: userLogin,
      method: 'get',
      data: params,
    })
  }