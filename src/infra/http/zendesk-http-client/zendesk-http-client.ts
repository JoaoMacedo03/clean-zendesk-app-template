import ZAFClient from 'zendesk_app_framework_sdk'
import i18n from 'i18next'
import { HttpRequest, HttpResponse, IHttpClient } from '@/data/contracts/http'

export class ZendeskHttpClient implements IHttpClient {
    private readonly client: any
    private readonly defaultHeader: object

    constructor () {
        this.client = ZAFClient.init()
        this.defaultHeader = { 'Content-Type': 'application/json' }
    }

    async request (data: HttpRequest): Promise<HttpResponse> {
        let zendeskResponse: any

        try {
            data.headers = data.headers ? { ...this.defaultHeader, ...data.headers } : this.defaultHeader

            if (data.headers['Content-Type'].includes('json')) {
                data.body = JSON.stringify(data)
            }

            zendeskResponse = await this.client.request({
              url: data.url,
              data: data.body,
              headers: data.headers,
              type: data.method,
              httpCompleteResponse: true
            })
        } catch (error) {
            zendeskResponse = error.response ? error.response : i18n.t('infra.http.server-error')
        }

        return {
            statusCode: zendeskResponse.status,
            body: zendeskResponse.responseJSON
        }
    }
}
