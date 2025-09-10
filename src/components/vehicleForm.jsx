import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


import IconVehiculo from '../assets/Icon_vehiculo.svg'
import IconVehiculo1 from '../assets/Icon_vehiculo1.svg'
import IconPunto from '../assets/Icon_puntoubicacion.svg'
import IconPunto1 from '../assets/Icon_puntoubicacion1.svg'
import IconPersona from '../assets/Icon_persona.svg'
import IconPersona1 from '../assets/Icon_persona1.svg'

import IconCrear from '../assets/Icon_crear.svg'
import IconConfirmar from '../assets/Icon_confirmar.svg'
import IconCancelar from '../assets/Icon_cancelar.svg'

const schema = z.object({
    brand: z.string().min(1, 'Requerido'),
    arrival_location: z.string().min(1, 'Requerido'),
    applicant: z.string().min(1, 'Requerido'),
})

function Field({ icon, iconActive, register, name, placeholder, error, disabled, active }) {
    const src = active ? iconActive : icon

return (
        <div className="grid grid-cols-[40px_1fr] items-center gap-3">
        <div className="flex items-center justify-center">
            <img src={src} alt="" className="h-7 w-7 select-none" draggable="false" />
        </div>

        <div className="relative">
            <input
            {...register(name)}
            placeholder={placeholder}
            disabled={disabled}
            className={[
                'w-full rounded-2xl border px-5 py-3 text-slate-800 placeholder-slate-400',
                'shadow-[0_6px_20px_rgba(16,24,40,0.06)]',
                'outline-none transition-all disabled:placeholder-slate-400/80',
                disabled ? 'bg-gray-100 cursor-not-allowed' : '',
                error ? 'border-pink-400 ring-2 ring-pink-300' : 'border-slate-300/80',
            ].join(' ')}
            />
            {error && <p className="mt-1 text-xs text-pink-600">{error.message}</p>}
        </div>
        </div>
    )
}

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

    const onSubmitInternal = async (values) => {
        await onSubmit(values)
        if (!isEditing) {
        setIsCreateActive(false)
        reset({ brand: '', arrival_location: '', applicant: '', ...defaultValues })
        }
    }

return (
    <form
        onSubmit={handleSubmit(onSubmitInternal)}
        className={[
        'relative rounded-2xl bg-white p-6 md:p-7 shadow-xl/20',
        active
            ? 'border-2 border-cyan-500 shadow-[0_0_0_4px_rgba(1,190,219,0.15)]'
            : 'border border-gray-400/40',
        ].join(' ')}
    >
        <button type="button" onClick={activateCreate} aria-pressed={isCreateActive} title="Nuevo" className="absolute left-5 top-4 cursor-pointer">
            <img src={IconCrear} alt="Crear" className="h-7 w-7 select-none" draggable="false" />
        </button>

        <div className="mt-4 space-y-4">
            <Field
            icon={IconVehiculo}
            iconActive={IconVehiculo1}
            register={register}
            name="brand"
            placeholder="Mazda"
            error={errors.brand}
            disabled={inputsDisabled}
            active={active}
            />
            <Field
                icon={IconPunto}
                iconActive={IconPunto1}
                register={register}
                name="arrival_location"
                placeholder="Chapinero"
                error={errors.arrival_location}
                disabled={inputsDisabled}
                active={active}
            />
            <Field
                icon={IconPersona}
                iconActive={IconPersona1}
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
                        'inline-flex  items-center justify-center rounded-full',
                        ' text-white shadow hover:scale-[1.03] active:scale-95',
                        'transition-transform cursor-pointer',
                    ].join(' ')}
                    >
                    <img src={IconCancelar} alt="Cancelar" className="w-8" />
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Guardar cambios"
                    className={['inline-flex  items-center justify-center rounded-full',' text-white shadow hover:scale-[1.03] active:scale-95', 'transition-transform disabled:opacity-60 cursor-pointer',
                    ].join(' ')}>
                    <img src={IconConfirmar} alt="Confirmar" className="w-8" />
                </button>
            </>
            )}

            {!isEditing && isCreateActive && (
                <>
                <button
                    type="button"
                    onClick={cancelAll}
                    className={['rounded-2xl border-2 border-pink-600 px-6 py-2','shadow-sm hover:bg-pink-50 transition-colors cursor-pointer',
                    ].join(' ')}>
                    Cancelar
                </button>

                <button type="submit" disabled={isSubmitting} className={['rounded-2xl border-2 border-cyan-500 px-6 py-2 text-cyan-600','shadow-sm hover:bg-cyan-50 transition-colors disabled:opacity-60 cursor-pointer' ,].join(' ')}>
                    Crear
                </button>
                </>
            )}
        </div>
    </form>
    )
}
