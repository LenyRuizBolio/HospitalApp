<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-semibold text-gray-800">Dashboard - Gestión de Doctores</h2>
        <div class="flex space-x-4">
          <button @click="createBackup" 
                  class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
            Guardar Backup
          </button>
          <button @click="openRestoreModal" 
                  class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
            Restaurar Backup
          </button>
          <button @click="logout" 
                  class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
            Cerrar Sesión
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Formulario -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Agregar Doctor</h3>
          <form @submit.prevent="addDoctor" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input v-model="newDoctor.name" 
                     class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                     placeholder="Nombre del doctor" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Licencia</label>
              <input v-model="newDoctor.license" 
                     class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                     placeholder="Número de licencia" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Especialidad</label>
              <input v-model="newDoctor.specialty" 
                     class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                     placeholder="Especialidad médica" required />
            </div>
            <button type="submit" 
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
              Agregar
            </button>
          </form>
        </div>
        <!-- Tabla -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold text-gray-800">Lista de Doctores</h3>
            <div class="flex space-x-2">
              <button @click="deleteAllDoctors" 
                      class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                Eliminar Todos
              </button>
              <button @click="fetchDoctors" 
                      class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                Refrescar
              </button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full table-auto">
              <thead>
                <tr class="bg-gray-100">
                  <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 rounded-tl-xl">Nombre</th>
                  <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Licencia</th>
                  <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Especialidad</th>
                  <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 rounded-tr-xl">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="doctor in doctors" :key="doctor.id" class="border-b border-gray-200 hover:bg-gray-50">
                  <td class="px-4 py-3 text-sm text-gray-800">{{ doctor.name }}</td>
                  <td class="px-4 py-3 text-sm text-gray-800">{{ doctor.license }}</td>
                  <td class="px-4 py-3 text-sm text-gray-800">{{ doctor.specialty }}</td>
                  <td class="px-4 py-3 text-sm">
                    <button @click="editDoctor(doctor)" 
                            class="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg mr-2 transition-all">
                      Editar
                    </button>
                    <button @click="deleteDoctor(doctor.id)" 
                            class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg transition-all">
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal para editar -->
    <div v-if="editingDoctor" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Editar Doctor</h3>
        <form @submit.prevent="updateDoctor" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input v-model="editingDoctor.name" 
                   class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                   required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Licencia</label>
            <input v-model="editingDoctor.license" 
                   class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                   required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Especialidad</label>
            <input v-model="editingDoctor.specialty" 
                   class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                   required />
          </div>
          <div class="flex space-x-4">
            <button type="submit" 
                    class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
              Actualizar
            </button>
            <button type="button" @click="cancelEdit" 
                    class="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- Modal para restaurar backup -->
    <div v-if="showRestoreModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Restaurar Copia de Seguridad</h3>
        <div v-if="backups.length === 0" class="text-center text-gray-600">
          No hay copias de seguridad disponibles.
        </div>
        <div v-else class="space-y-2">
          <div v-for="backup in backups" :key="backup.id" class="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
            <span class="text-sm text-gray-800">{{ backup.name }}</span>
            <div class="flex space-x-2">
              <button @click="restoreBackup(backup)" 
                      class="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-lg text-sm transition-all">
                Restaurar
              </button>
              <button @click="deleteBackup(backup.id)" 
                      class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg text-sm transition-all">
                Eliminar
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button @click="showRestoreModal = false" 
                  class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase.js'

const doctors = ref([])
const newDoctor = ref({ name: '', license: '', specialty: '' })
const editingDoctor = ref(null)
const backups = ref([])
const showRestoreModal = ref(false)
const router = useRouter()

onMounted(async () => {
  await fetchDoctors()
})

const fetchDoctors = async () => {
  console.log('Fetching doctors...')
  const { data, error } = await supabase.from('doctors').select('*')
  if (error) {
    console.error('Error fetching doctors:', error)
  } else {
    console.log('Doctors fetched:', data)
    doctors.value = data
  }
}

const addDoctor = async () => {
  console.log('Adding doctor:', newDoctor.value)
  const { error } = await supabase.from('doctors').insert([newDoctor.value])
  if (error) {
    console.error('Error adding doctor:', error)
    alert(error.message)
  } else {
    console.log('Doctor added successfully')
    newDoctor.value = { name: '', license: '', specialty: '' }
    await fetchDoctors()
  }
}

const editDoctor = (doctor) => {
  editingDoctor.value = { ...doctor }
}

const updateDoctor = async () => {
  const { error } = await supabase
    .from('doctors')
    .update(editingDoctor.value)
    .eq('id', editingDoctor.value.id)
  if (error) {
    alert(error.message)
  } else {
    editingDoctor.value = null
    await fetchDoctors()
  }
}

const cancelEdit = () => {
  editingDoctor.value = null
}

const deleteDoctor = async (id) => {
  const { error } = await supabase.from('doctors').delete().eq('id', id)
  if (error) {
    alert(error.message)
  } else {
    await fetchDoctors()
  }
}

const createBackup = async () => {
  const { data: doctorsData, error: fetchError } = await supabase.from('doctors').select('*')
  if (fetchError) {
    alert('Error al obtener doctores: ' + fetchError.message)
    return
  }
  const now = new Date()
  const name = now.toISOString().replace('T', ' ').substring(0, 19) // YYYY-MM-DD HH:MM:SS
  const { error } = await supabase.from('backups').insert([{ name, data: doctorsData }])
  if (error) {
    alert('Error al crear backup: ' + error.message)
  } else {
    alert('Copia de seguridad creada exitosamente')
  }
}

const fetchBackups = async () => {
  const { data, error } = await supabase.from('backups').select('*').order('created_at', { ascending: false })
  if (error) {
    console.error('Error fetching backups:', error)
  } else {
    backups.value = data
  }
}

const restoreBackup = async (backup) => {
  const confirmRestore = confirm(`¿Estás seguro de restaurar la copia de seguridad de ${backup.name}? Esto reemplazará todos los datos actuales.`)
  if (!confirmRestore) return

  // Borrar todos los doctores actuales
  const { error: deleteError } = await supabase.from('doctors').delete().neq('id', 0) // Borra todos
  if (deleteError) {
    alert('Error al borrar datos actuales: ' + deleteError.message)
    return
  }

  // Insertar los datos del backup
  const { error: insertError } = await supabase.from('doctors').insert(backup.data)
  if (insertError) {
    alert('Error al restaurar datos: ' + insertError.message)
  } else {
    alert('Copia de seguridad restaurada exitosamente')
    showRestoreModal.value = false
    await fetchDoctors()
  }
}

const openRestoreModal = async () => {
  await fetchBackups()
  showRestoreModal.value = true
}

const deleteAllDoctors = async () => {
  const confirmDelete = confirm('¿Estás seguro de eliminar TODOS los doctores? Esta acción no se puede deshacer.')
  if (!confirmDelete) return

  const { error } = await supabase.from('doctors').delete().neq('id', 0) // Borra todos
  if (error) {
    alert('Error al eliminar doctores: ' + error.message)
  } else {
    alert('Todos los doctores han sido eliminados')
    await fetchDoctors()
  }
}

const deleteBackup = async (id) => {
  const confirmDelete = confirm('¿Estás seguro de eliminar esta copia de seguridad?')
  if (!confirmDelete) return

  const { error } = await supabase.from('backups').delete().eq('id', id)
  if (error) {
    alert('Error al eliminar backup: ' + error.message)
  } else {
    alert('Copia de seguridad eliminada')
    await fetchBackups() // Refrescar la lista en el modal
  }
}

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>

<style scoped>
/* Estilos adicionales para el modal y otros elementos si es necesario */
</style>