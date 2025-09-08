// src/components/VehicleForm.jsx
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import sprite from '../assets/_sprite.svg'


const schema = z.object({
    brand: z.string().min(1, 'Requerido'),
    arrival_location: z.string().min(1, 'Requerido'),
    applicant: z.string().min(1, 'Requerido'),
})


function Field({ iconId, register, name, placeholder, error, disabled, active }) {
    return (
        <div className="grid grid-cols-[40px_1fr] items-center gap-3">
        <div className="flex items-center justify-center">
            <svg
            className={[
                'h-7 w-7 transition-colors',
                active ? 'text-pink-600/90' : 'text-slate-300',
            ].join(' ')}
            >
            <use xlinkHref={`${sprite}#${iconId}`} />
            </svg>
        </div>

        <div className="relative">
            <input
            {...register(name)}
            placeholder={placeholder}
            disabled={disabled}
            className={[
                'w-full rounded-2xl border px-5 py-3 text-slate-800 placeholder-slate-400',
                'shadow-[0_6px_20px_rgba(16,24,40,0.06)] outline-none transition-all',
                error ? 'border-pink-400 ring-2 ring-pink-300' : 'border-slate-300/80',
                disabled ? 'bg-slate-50 text-slate-400 placeholder-slate-300' : '',
                !disabled ? 'focus:ring-2 focus:ring-pink-500/60 focus:border-pink-500/60' : '',
            ].join(' ')}
            />
            {error && <p className="mt-1 text-xs text-pink-600">{error.message}</p>}
        </div>
        </div>
    )
}

/*componente principal*/
export default function VehicleForm({ onSubmit, defaultValues, onCancel }) {
    const {
        register,
        handleSubmit,
        reset,
        setFocus,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { brand: '', arrival_location: '', applicant: '', ...defaultValues },
    })


    const isEditing = useMemo(() => Boolean(defaultValues?.id), [defaultValues])


    const [isCreateActive, setIsCreateActive] = useState(isEditing)


    useEffect(() => {
        reset({ brand: '', arrival_location: '', applicant: '', ...defaultValues })
        setIsCreateActive(Boolean(defaultValues?.id))
    }, [defaultValues, reset])


    const active = isEditing || isCreateActive
    const inputsDisabled = !active

    const activateCreate = () => {
        if (!active) {
        setIsCreateActive(true)
        reset({ brand: '', arrival_location: '', applicant: '' })

        setTimeout(() => setFocus('brand'), 0)
        }
    }

    const cancelAll = () => {
        setIsCreateActive(false)
        reset({ brand: '', arrival_location: '', applicant: '', ...defaultValues })
        onCancel?.()
    }

    return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        className={[
            'relative rounded-2xl border border-gray-200/70 bg-white',
            'p-6 md:p-7',
            'shadow-[0_14px_30px_rgba(16,24,40,0.08)]',
        ].join(' ')}
        >
        <button
            type="button"
            onClick={activateCreate}
            aria-pressed={isCreateActive}
            title="Nuevo"
            className="absolute left-5 top-4"
        >
            <svg
            className={[
                'h-7 w-7 transition-colors',
                active ? 'text-cyan-500' : 'text-slate-300',
            ].join(' ')}
            >
            <use xlinkHref={`${sprite}#Icon_crear`} />
            </svg>
        </button>

        <div className="mt-4 space-y-4">
            <Field
            iconId="Icon_car"
            register={register}
            name="brand"
            placeholder="Mazda"
            error={errors.brand}
            disabled={inputsDisabled}
            active={active}
            />
            <Field
            iconId="Icon_location"
            register={register}
            name="arrival_location"
            placeholder="Chapinero"
            error={errors.arrival_location}
            disabled={inputsDisabled}
            active={active}
            />
            <Field
            iconId="Icon_user"
            register={register}
            name="applicant"
            placeholder="David Sandoval"
            error={errors.applicant}
            disabled={inputsDisabled}
            active={active}
            />
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
            {isEditing && (
            <>
                <button
                type="button"
                onClick={cancelAll}
                aria-label="Cancelar edición"
                className={[
                    'inline-flex h-10 w-10 items-center justify-center rounded-full',
                    'bg-pink-600 text-white shadow hover:scale-[1.03] active:scale-95',
                    'transition-transform',
                ].join(' ')}
                >
                <svg className="h-6 w-6">
                    <use xlinkHref={`${sprite}#Icon_cancelar`} />
                </svg>
                </button>

                <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Guardar cambios"
                className={[
                    'inline-flex h-10 w-10 items-center justify-center rounded-full',
                    'bg-cyan-500 text-white shadow hover:scale-[1.03] active:scale-95',
                    'transition-transform disabled:opacity-60',
                ].join(' ')}
                >
                <svg className="h-6 w-6">
                    <use xlinkHref={`${sprite}#Icon_confirmar`} />
                </svg>
                </button>
            </>
            )}

            {!isEditing && isCreateActive && (
            <>
                <button
                type="button"
                onClick={cancelAll}
                className={[
                    'rounded-2xl border-2 border-pink-600 px-6 py-2 text-pink-600',
                    'shadow-sm hover:bg-pink-50 transition-colors',
                ].join(' ')}
                >
                Cancelar
                </button>

                <button
                type="submit"
                disabled={isSubmitting}
                className={[
                    'rounded-2xl border-2 border-cyan-500 px-6 py-2 text-cyan-600',
                    'shadow-sm hover:bg-cyan-50 transition-colors disabled:opacity-60',
                ].join(' ')}
                >
                Crear
                </button>
            </>
            )}
        </div>
        </form>
    )
}
