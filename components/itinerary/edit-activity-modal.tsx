'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button, Input, Textarea } from '@heroui/react'
import { IconDeviceFloppy, IconX, IconClock, IconLink } from '@tabler/icons-react'
import { toast } from 'sonner'
import { Activity, ActivityInsert } from '@/types/itinerary'
import { updateActivity } from '@/services/itinerary'
import { ActivitySearchSelect } from '@/components/ui/activity-search-select'

interface EditActivityModalProps {
  activity: Activity
  onActivityUpdated: (updatedActivity: Activity) => void
  onClose: () => void
}

const activityTypes = [
  { key: 'Transporte', label: 'Transporte', icon: '🚗' },
  { key: 'Visita', label: 'Visita', icon: '🏛️' },
  { key: 'Gastronomía', label: 'Gastronomía', icon: '🍽️' },
  { key: 'Cultura', label: 'Cultura', icon: '🎨' },
  { key: 'Aventura', label: 'Aventura', icon: '🏔️' },
  { key: 'Relajación', label: 'Relajación', icon: '🧘' },
]

export function EditActivityModal({ activity, onActivityUpdated, onClose }: EditActivityModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    activity_type: '',
    transfer_time: '',
    activity_description: '',
    activity_link: ''
  })

  // Inicializar el formulario con los datos de la actividad
  useEffect(() => {
    setFormData({
      activity_type: activity.activity_type || '',
      transfer_time: activity.transfer_time || '',
      activity_description: activity.activity_description || '',
      activity_link: activity.activity_link || ''
    })
  }, [activity])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSelectChange = useCallback((selectedKey: string) => {
    handleInputChange('activity_type', selectedKey)
  }, [])

  const validateUrl = (url: string) => {
    if (!url) return true // URL es opcional
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.activity_type) {
      toast.error('Debes seleccionar un tipo de actividad')
      return
    }

    if (!formData.activity_description.trim()) {
      toast.error('La descripción es obligatoria')
      return
    }

    if (formData.activity_link && !validateUrl(formData.activity_link)) {
      toast.error('El enlace no tiene un formato válido')
      return
    }

    setIsLoading(true)

    try {
      console.log('Updating activity:', activity.id_activity)
      
      const updateData: Partial<Omit<ActivityInsert, 'id_activity' | 'created_at' | 'order'>> = {
        activity_type: formData.activity_type,
        transfer_time: formData.transfer_time.trim() || '',
        activity_description: formData.activity_description.trim(),
        activity_link: formData.activity_link.trim() || '',
      }

      console.log('Activity data to update:', updateData)
      const updatedActivity = await updateActivity(activity.id_activity, updateData)
      console.log('Activity updated successfully:', updatedActivity)
      
      onActivityUpdated(updatedActivity)
      toast.success('Actividad actualizada correctamente')
      onClose()
    } catch (error: any) {
      console.error('Error updating activity:', error)
      toast.error(error.message || 'Error al actualizar la actividad')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6" style={{ position: 'relative' }}>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Editar Actividad
        </h3>
        <p className="text-sm text-default-500">
          Modifica la información de esta actividad
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tipo de actividad */}
        <div>
          <ActivitySearchSelect
            options={activityTypes}
            value={formData.activity_type}
            onSelectionChange={handleSelectChange}
            label="Tipo de actividad"
            placeholder="Buscar tipo de actividad..."
            isRequired
          />
        </div>

        {/* Descripción */}
        <div>
          <Textarea
            label="Descripción de la actividad"
            placeholder="Ej: Tour guiado por la Plaza Mayor con explicaciones históricas"
            value={formData.activity_description}
            onValueChange={(value) => handleInputChange('activity_description', value)}
            isRequired
            minRows={2}
            maxRows={4}
          />
        </div>

        {/* Tiempo de traslado */}
        <div>
          <Input
            label="Tiempo de traslado"
            placeholder="Ej: 30 min, 1 hora, 2h 15min"
            value={formData.transfer_time}
            onValueChange={(value) => handleInputChange('transfer_time', value)}
            startContent={<IconClock size={16} className="text-default-400" />}
          />
          <p className="text-small text-default-500 mt-1">
            Opcional - Tiempo estimado para llegar a esta actividad
          </p>
        </div>

        {/* Link */}
        <div>
          <Input
            label="Enlace de información"
            placeholder="Ej: https://ejemplo.com/informacion"
            value={formData.activity_link}
            onValueChange={(value) => handleInputChange('activity_link', value)}
            startContent={<IconLink size={16} className="text-default-400" />}
            type="url"
          />
          <p className="text-small text-default-500 mt-1">
            Opcional - Enlace con más información sobre la actividad
          </p>
        </div>

        {/* Botones */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="light"
            onPress={onClose}
            className="flex-1"
            startContent={<IconX size={16} />}
            isDisabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            className="flex-1"
            startContent={!isLoading && <IconDeviceFloppy size={16} />}
          >
            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>
    </div>
  )
}
