export const CORE_SERVICE_URI_PREFIX = 'http://localhost:8088/core-api'
export const CYCLONE_SERVICE_URI_PREFIX = 'http://localhost:8421/cyclone-api'

/**
 * https://www.rfc-editor.org/rfc/rfc9457.html
 */
export type ResponseRFC9457 = {
    type: string
    title: string
    status: number
    detail: string
    instance: string
}
