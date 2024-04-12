export type User = {
    id: number
    fname: string,
    lname: string,
    photo: string,
    roles: Role[],
    deleted_at: string
}

export type Role ={
    id?: number
    name: string
}