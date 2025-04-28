import axios from "axios";

const BASE_URL = "https://ticketing.koajay.com/api/v2";
// const V3_BASE_URL = "https://ticketing.koajay.com/api/v3";

const post = (url: string, data: any, headers: object) => {
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });

    return axios(BASE_URL+url, {
         method: 'POST',
         headers: {
           'Content-Type': '"application/json"',
           ...headers,
         },
         data: formData
       });
}

const get = (url: string, headers: object) => {
    
    return axios(BASE_URL+url, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...headers,
        },
    });
}

const deleteRequest = (url: string, headers: object) => {
    return axios(BASE_URL+url, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...headers,
        },
    });
}

const put = (url: string, data: any, headers: object) => {
    return axios(BASE_URL+url, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...headers,
        },
        data: data
    });
}

const login = (data: any) => {
    return axios(BASE_URL+'/login', {
        method: 'POST',
        headers: {
            'Content-Type': '"application/json"',
            'Accept': 'application/json'
        },
        data: JSON.stringify(data)
    });
}

const logout = (token: string) => {
    return axios(BASE_URL+'/logout', {
        headers: {
            'Content-Type': '"application/json"',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+token
        }
    });
}

const postWithFile = (url: string, data: any, headers: object) => {
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
     formData.append(key, data[key]);
    });
    
    return axios(BASE_URL+url, {
         method: 'POST',
         headers: {
           'Content-Type': '"multipart/form-data"',
           'Accept': 'application/json',
           ...headers,
         },
         data: formData
       });
   }

   export { post, postWithFile, get, deleteRequest, put, login, logout };