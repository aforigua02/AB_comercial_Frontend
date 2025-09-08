import {http} from '../lib/http'

export async function listVehicles({q = '' ,limit=10,offset=0} ={}){
    const params ={}
    if (q) params.q = q
    if (limit != null) params.limit = limit
    if (offset != null) params.offset = offset

    const { data } = await http.get('/vehicles/', { params })
    return data
}

export async function createVehicle(payload) {
    const { data } = await http.post('/vehicles/', payload)
    return data
}

export async function updateVehicle(id, payload) {
    const { data } = await http.put(`/vehicles/${id}/`, payload)
    return data
}

export async function deleteVehicle(id) {
    await http.delete(`/vehicles/${id}/`)
}