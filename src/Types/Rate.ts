import { Station } from "./Station"

export type Rate = {
    id?: number
    amount: number
    is_postpaid: boolean
    rate_type: string
    title: string
    station: Station | string,
    rate_image: any

}

export type PayOnCreditRequest = {
    station_id: number,
    client_id: number,
    amount: number,
    dateRange: {from: string, to: string}
}
