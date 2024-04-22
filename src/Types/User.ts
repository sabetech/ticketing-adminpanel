export type User = {
    id: number
    fname: string,
    lname: string,
    photo: string,
    email: string,
    password?: string,
    roles?: Role[],
    deleted_at: string
}

export type UserRequest = {
    username: string,
    fname: string,
    lname: string,
    photo: string,
    email: string,
    password: string,
    role_id: number,
    stationId: number,
    user_image: Array<File>
}

export type Role ={
    id?: number
    name: string
}