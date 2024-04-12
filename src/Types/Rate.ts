import { Station } from "./Station"

export type Rate = {
    id?: number
    amount: number
    is_postpaid: boolean
    rate_type: string
    title: string
    station: Station
}
