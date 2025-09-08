import { useEffect, useMemo, useState } from "react";
import { listVehicles, createVehicle, updateVehicle, deleteVehicle } from '../services/vehicles'


export function useVehicles() {
    const [items, setItems] = useState([])
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [q, setQ] = useState('')
    const [page, setPage] = useState(1)
    const pageSize = 10
    const offset = (page - 1) * pageSize

    async function fetch() {
        try {
            setLoading(true)
            setError(null)
            const data = await listVehicles({ q, limit: pageSize, offset })
            setItems(data.results || [])
            setCount(data.count || 0)
        } catch (e) {
            setError(e)
        } finally {
            setLoading(false)
        }
    }

    async function create(payload) {
        await createVehicle(payload)
        await fetch()
    }

    async function update(id, payload) {
        await updateVehicle(id, payload)
        await fetch()
    }

    async function remove(id) {
        await deleteVehicle(id)
        await fetch()
    }

    useEffect(() => {
        fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [q, page])

    const totalPages = useMemo(() => Math.max(1, Math.ceil(count / pageSize)), [count])

    return {
        items, count, loading, error,
        q, setQ, page, setPage, totalPages, pageSize,
        fetch, create, update, remove,
    }
}