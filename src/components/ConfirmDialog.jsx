// src/components/ConfirmDialog.jsx
export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white rounded-xl shadow-xl p-6 w-96">
            <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
            <p className="mt-2 text-slate-600">{message}</p>

            <div className="mt-6 flex justify-end gap-3">
            <button
                onClick={onCancel}
                className="px-4 py-2 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
            >
                Cancelar
            </button>
            <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700 transition"
            >
                Eliminar
            </button>
            </div>
        </div>
        </div>
    );
}
