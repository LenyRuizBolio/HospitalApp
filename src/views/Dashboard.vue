<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-10">
        <h2 class="text-4xl font-light text-slate-800">Dashboard - Gestión de Doctores</h2>
        <div class="flex space-x-6">
          <button @click="createBackup" 
                  class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            Guardar Backup
          </button>
          <button @click="openRestoreModal" 
                  class="bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            Restaurar Backup
          </button>
          <button @click="logout" 
                  class="bg-slate-700 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            Cerrar Sesión
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Formulario -->
        <div class="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
          <h3 class="text-2xl font-light text-slate-800 mb-6">Agregar Doctor</h3>
          <form @submit.prevent="addDoctor" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-slate-600 mb-2">Nombre</label>
              <input v-model="newDoctor.name" 
                     class="w-full px-4 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all duration-300 bg-slate-50" 
                     placeholder="Nombre del doctor" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-600 mb-2">Licencia</label>
              <input v-model="newDoctor.license" 
                     class="w-full px-4 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all duration-300 bg-slate-50" 
                     placeholder="Número de licencia" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-600 mb-2">Especialidad</label>
              <input v-model="newDoctor.specialty" 
                     class="w-full px-4 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all duration-300 bg-slate-50" 
                     placeholder="Especialidad médica" required />
            </div>
            <button type="submit" 
                    class="w-full bg-slate-700 hover:bg-slate-800 text-white font-medium py-4 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              Agregar
            </button>
          </form>
        </div>
        <!-- Tabla -->
        <div class="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-light text-slate-800">Lista de Doctores</h3>
            <div class="flex space-x-4">
              <button @click="deleteAllDoctors" 
                      class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                Eliminar Todos
              </button>
              <button @click="fetchDoctors" 
                      class="bg-slate-600 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                Refrescar
              </button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full table-auto">
              <thead>
                <tr class="bg-slate-100">
                  <th class="px-6 py-4 text-left text-sm font-medium text-slate-700 rounded-tl-2xl">Nombre</th>
                  <th class="px-6 py-4 text-left text-sm font-medium text-slate-700">Licencia</th>
                  <th class="px-6 py-4 text-left text-sm font-medium text-slate-700">Especialidad</th>
                  <th class="px-6 py-4 text-left text-sm font-medium text-slate-700 rounded-tr-2xl">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="doctor in doctors" :key="doctor.id" class="border-b border-slate-200 hover:bg-slate-50">
                  <td class="px-6 py-4 text-sm text-slate-800">{{ doctor.name }}</td>
                  <td class="px-6 py-4 text-sm text-slate-800">{{ doctor.license }}</td>
                  <td class="px-6 py-4 text-sm text-slate-800">{{ doctor.specialty }}</td>
                  <td class="px-6 py-4 text-sm">
                    <button @click="editDoctor(doctor)" 
                            class="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-xl mr-3 transition-all duration-300">
                      Editar
                    </button>
                    <button @click="deleteDoctor(doctor.id)" 
                            class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl transition-all duration-300">
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
      <div class="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md border border-slate-200">
        <h3 class="text-2xl font-light text-slate-800 mb-6">Editar Doctor</h3>
        <form @submit.prevent="updateDoctor" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-slate-600 mb-2">Nombre</label>
            <input v-model="editingDoctor.name" 
                   class="w-full px-4 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all duration-300 bg-slate-50" 
                   required />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-600 mb-2">Licencia</label>
            <input v-model="editingDoctor.license" 
                   class="w-full px-4 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all duration-300 bg-slate-50" 
                   required />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-600 mb-2">Especialidad</label>
            <input v-model="editingDoctor.specialty" 
                   class="w-full px-4 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all duration-300 bg-slate-50" 
                   required />
          </div>
          <div class="flex space-x-4">
            <button type="submit" 
                    class="flex-1 bg-slate-700 hover:bg-slate-800 text-white font-medium py-4 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              Actualizar
            </button>
            <button type="button" @click="cancelEdit" 
                    class="flex-1 bg-slate-500 hover:bg-slate-600 text-white font-medium py-4 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- Modal para restaurar backup -->
    <div v-if="showRestoreModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md border border-slate-200">
        <h3 class="text-2xl font-light text-slate-800 mb-6">Restaurar Copia de Seguridad</h3>
        <div v-if="backups.length === 0" class="text-center text-slate-500">
          No hay copias de seguridad disponibles.
        </div>
        <div v-else class="space-y-3">
          <div v-for="backup in backups" :key="backup.id" class="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
            <span class="text-sm text-slate-800">{{ backup.name }}</span>
            <div class="flex space-x-3">
              <button @click="restoreBackup(backup)" 
                      class="bg-slate-700 hover:bg-slate-800 text-white py-2 px-4 rounded-xl text-sm transition-all duration-300">
                Restaurar
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button @click="showRestoreModal = false" 
                  class="bg-slate-500 hover:bg-slate-600 text-white font-medium py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
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

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>

<style scoped>
/* Estilos adicionales para el modal y otros elementos si es necesario */
</style>