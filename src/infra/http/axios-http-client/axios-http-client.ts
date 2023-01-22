import axios, { AxiosResponse } from 'axios'
import i18n from 'i18next'
import { HttpRequest, HttpResponse, IHttpClient } from '@/data/contracts/http'

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
      axiosResponse = error.response ? error.response : i18n.t('infra.http.server-error')
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
