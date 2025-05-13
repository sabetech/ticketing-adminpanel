import { Station } from "./Station"

export type Rate = {
    id?: number
    amount: number
    is_postpaid: boolean
    rate_type: string
    title: string
    station?: Station | string,
    icon?: any
    pivot? : any
}

export type PayOnCreditRequest = {
    station_id: number,
    client_id: number,
    amount: number,
    dateRange: string,
    discount?: number,
    tax?: number
}

export type PostpaidPayment = {
    id: number,
    customer: Rate,
    amount_paid: number,
    date: string,
    discount: number,
    witholding_tax: number,
    start_date: string,
    end_date: string,
}
