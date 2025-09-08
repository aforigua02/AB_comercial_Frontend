import sprite from "../assets/_sprite.svg";

export default function VehicleTable({ items, loading, onEdit, onDelete }) {
    return (
        <div className="overflow-hidden  bg-white shadow-sm">
            <table className="table-auto w-full text-sm   border-collapse">
                <thead className="bg-Rojo2 text-white">
                    <tr className="w-full gap-3">
                        <th className="px-3 py-2 text-center font-semibold w-1/6 border-r-8 border-white">Marca</th>
                        <th className="px-3 py-2 text-center font-semibold w-1/6 border-r-8 border-white">Sucursal</th>
                        <th className="px-3 py-2 text-center font-semibold w-2/6">Aspirante</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-Rojo2 text-gray-400">
                {loading ? (
                    <tr><td colSpan={4} className="px-2 py-4 text-center text-slate-500">Cargando...</td></tr>
                ) : items.length === 0 ? (
                    <tr><td colSpan={4} className="px-2 py- text-center text-slate-500">Sin registros</td></tr>
                ) : (
                    items.map((v) => (
                    <tr key={v.id} className="odd:bg-white even:bg-slate-50 border-b border-Rojo2">
                        <td className="px-3 py-2 text-center">{v.brand}</td>
                        <td className="px-3 py-2 text-center">{v.arrival_location}</td>
                        <td className="px-3 py-2 text-center">
                            <div className="flex justify-between">
                                <span>{v.applicant}</span>
                                <div className="flex gap-3">
                                    <button onClick={() => onEdit(v)} >
                                    <svg width="28" height="28" className="cursor-pointer">
                                        <use xlinkHref={`${sprite}#Icon_editar1`} />
                                    </svg>
                                    </button>
                                    <button onClick={() => onDelete(v)} >
                                        <svg width="28" height="28" className="cursor-pointer">
                                            <use xlinkHref={`${sprite}#Icon_eliminar1`} />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
