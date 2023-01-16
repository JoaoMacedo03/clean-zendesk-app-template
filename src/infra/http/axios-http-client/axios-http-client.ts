import { HttpRequest, HttpResponse, IHttpClient } from '@/data/contracts/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements IHttpClient {
  async request (data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.request({
        url: data.url,
        data: data.body,
        headers: data.headers,
        method: data.method
      })
    } catch (error) {
      axiosResponse = error.response ? error.response : 'Erro interno servidor'
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
