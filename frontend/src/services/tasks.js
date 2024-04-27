import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/tasks';

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
      }

     const response = await axios.post(baseUrl,newObject, config)  
     return response.data
}

const getAll = async () => {

    const config = {
        headers: { Authorization: token },
      }

    const response = await axios.get(baseUrl,config)
    return response.data
}

const updateTask = async (id,newObject) => {
    const config = {
        headers: { Authorization: token },
      }

      const response = await axios.put(`${baseUrl}/${id}`, newObject,config)
      return response.data
}

export default {getAll, setToken, create, updateTask}
