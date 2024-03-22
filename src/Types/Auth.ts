export type TLoginValues = {
    email: string,
    password: string
}

export type TAuthUserResponse = {
    token: string,
    user: {
        id?: number,
        username: string,
        fname: string,
        lname: string,
        photo: string,
        email: string,
        phone: string
    },
    agentInfo: {
        station?: {
            id: number,
            name: string,
            description: string,
            rates: []
        };
    }
}

export type TUser = {
    username: string,
    fname: string,
    lname: string,
    photo: string,
    email: string,
    phone: string
}