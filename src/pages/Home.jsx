import { useState } from 'react'
import Hero from '../components/Hero'
import VehicleForm from '../components/vehicleForm'
import VehicleTable from '../components/VehicleTable'
import ConfirmDialog from '../components/ConfirmDialog'
import { useVehicles } from '../hooks/useVehicles'
import { toast } from 'react-hot-toast'


export default function Home() {
    const { items, loading, q, setQ, page, setPage, totalPages, create, update, remove } = useVehicles()
    const [editing, setEditing] = useState(null)
    const [confirmData, setConfirmData] = useState(null)

    async function handleCreate(values) {
        await create(values)
        toast.success('Vehículo creado correctamente 🚗')
    }

    async function handleUpdate(values) {
        await update(editing.id, values)
        setEditing(null)
        toast.success('Vehículo actualizado ✅')
    }

    function handleDelete(v) {
        setConfirmData(v) // abre el modal
    }

    async function confirmDelete() {
        if (confirmData) {
        await remove(confirmData.id)
        toast.error("Vehículo eliminado 🗑️")
        setConfirmData(null)
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
                    <ConfirmDialog
                    open={!!confirmData}
                    title="Confirmar eliminación"
                    message={`¿Eliminar ${confirmData?.brand} - ${confirmData?.arrival_location}?`}
                    onConfirm={confirmDelete}
                    onCancel={() => setConfirmData(null)}
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

