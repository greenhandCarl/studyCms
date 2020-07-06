import axios from 'axios'

// const host = 'http://120.26.77.52:8080'
const host = 'https://www.shankkeya.net/api'

interface RequestParams {
  method: 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH' | 'link' | 'LINK' | 'unlink' | 'UNLINK' | undefined;
  url: string;
  data: any; // eslint-disable-line
}
export const request = ({ method, url, data }: RequestParams) => {
  console.log("localStorage.getItem('token')", localStorage.getItem('token'))
  return new Promise((resolve, reject) => {
    axios({ method, url: `${host}${url}`, headers: { Authorization: localStorage.getItem('token') || '' }, data }).then((res) => { resolve(res) }).catch((err) => { reject(err) })
  })
}
