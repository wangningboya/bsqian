import { api } from '../utils/config'
import request from '../utils/request'

// import {api, request} from 'utils'

const { indexQuery } = api

export async function query (params) {
    return request({
      url: indexQuery,
      method: 'get',
      data: params,
    })
  }

