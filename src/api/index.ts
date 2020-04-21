import axios from 'axios'

const host = 'http://120.26.77.52:8080'

interface RequestParams {
  method: 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH' | 'link' | 'LINK' | 'unlink' | 'UNLINK' | undefined;
  url: string;
  data: any;
}

export const request = ({ method, url, data }: RequestParams) => {
  return new Promise((resolve, reject) => {
    axios({ method, url: `${host}${url}`, data }).then((res) => { resolve(res) }).catch((err) => { reject(err) })
  })
}
