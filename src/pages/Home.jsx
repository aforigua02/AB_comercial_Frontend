import { useState } from 'react'
import Hero from '../components/Hero'
import VehicleForm from '../components/vehicleForm'
import VehicleTable from '../components/VehicleTable'
import { useVehicles } from '../hooks/useVehicles'

export default function Home() {
    const { items, loading, q, setQ, page, setPage, totalPages, create, update, remove } = useVehicles()
    const [editing, setEditing] = useState(null)

    async function handleCreate(values) {
        await create(values)
    }

    async function handleUpdate(values) {
        await update(editing.id, values)
        setEditing(null)
    }

    async function handleDelete(v) {
        if (confirm(`¿Eliminar ${v.brand} - ${v.arrival_location}?`)) {
        await remove(v.id)
        }
    }

    return (
        <>
        <Hero />
        <section id="vehicles" className="mx-auto max-w-6xl px-4 py-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-2xl font-semibold text-slate-800">Vehicles</h2>
            <input
                type="search"
                value={q}
                onChange={(e) => (setQ(e.target.value), setPage(1))}
                placeholder="Buscar por marca, sucursal o aspirante…"
                className="w-full md:w-80 rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500"
            />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3  gap-15">
                <div className="md:col-span-1">
                    <VehicleForm
                    defaultValues={editing || undefined}
                    onSubmit={editing ? handleUpdate : handleCreate}
                    onCancel={editing ? () => setEditing(null) : undefined}
                    />
                </div>

                <div className="md:col-span-2 space-y-8">
                    <VehicleTable
                    items={items}
                    loading={loading}
                    onEdit={(v) => setEditing(v)}
                    onDelete={handleDelete}
                    />

                    <div className="flex items-center justify-between text-sm">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="rounded-md border px-3 py-2 hover:bg-slate-50"
                    >
                        Anterior
                    </button>
                    <div>Página {page} de {totalPages}</div>
                        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            className="rounded-md border px-3 py-2 hover:bg-slate-50">
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

