<template>
  <v-container class="mt-16">
    <v-card class="pa-4">
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h6">Cargos</span>
        <v-btn color="primary" @click="openCreateDialog">Novo Cargo</v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="roles"
        :loading="loading"
        loading-text="Carregando cargos..."
        class="elevation-1"
      >
        <template #item.actions="{ item }">
          <v-btn size="32" icon @click="editRole(item)"><v-icon size="18">mdi-pencil</v-icon></v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Modal de criar/editar cargo -->
    <RoleModal
      v-model:isOpen="isRoleModalOpen"
      :role="selectedRole"
      @updated="fetchRoles"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import RoleModal from '@/components/roleModal/RoleModal.vue'

interface Role {
  id: number
  name: string
}

const roles = ref<Role[]>([])
const loading = ref(false)
const isRoleModalOpen = ref(false)
const selectedRole = ref<Role | null>(null)
const deleteDialog = ref(false)

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'name' },
  { title: 'Ações', key: 'actions', sortable: false }
]

const fetchRoles = async () => {
  loading.value = true
  try {
    const response = await axios.get('http://localhost:3000/api/roles/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    roles.value = response.data
  } catch (error) {
    console.error('Erro ao buscar cargos:', error)
  } finally {
    loading.value = false
  }
}

const openCreateDialog = () => {
  selectedRole.value = null
  isRoleModalOpen.value = true
}

const editRole = (role: Role) => {
  selectedRole.value = role
  isRoleModalOpen.value = true
}

onMounted(() => {
  fetchRoles()
})
</script>