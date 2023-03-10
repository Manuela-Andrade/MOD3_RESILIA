import axios from "axios"

export class AxiosApi {

   static async Get(path) {
        return await axios.get(`https://https-escola-onrender-com.onrender.com${path}`)
    }
    static async Post(path, body) {
        return await axios.post(`https://https-escola-onrender-com.onrender.com${path}`,
        body)
    }
    static async Put(path, body) {
        return await axios.put(`https://https-escola-onrender-com.onrender.com${path}`,
        body)
    }
    static async Delete(path) {
        return await axios.delete(`https://https-escola-onrender-com.onrender.com${path}`)
    }
}