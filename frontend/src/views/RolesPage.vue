<template>
  <v-container>
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
          <v-btn size="32" icon color="red" @click="openDeleteDialog(item)"><v-icon size="18">mdi-delete</v-icon></v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Modal de criar/editar cargo -->
    <RoleModal
      v-model:isOpen="isRoleModalOpen"
      :role="selectedRole"
      @updated="fetchRoles"
    />

    <!-- Confirmação de exclusão -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirmar exclusão</v-card-title>
        <v-card-text>Deseja realmente excluir o cargo <strong>{{ selectedRole?.name }}</strong>?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="red" text @click="confirmDelete">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import RoleModal from '@/components/RoleModal.vue'

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

const openDeleteDialog = (role: Role) => {
  selectedRole.value = role
  deleteDialog.value = true
}

const confirmDelete = async () => {
  if (!selectedRole.value) return
  try {
    await axios.delete(`http://localhost:3000/api/roles/${selectedRole.value.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    fetchRoles()
  } catch (error) {
    console.error('Erro ao excluir cargo:', error)
  } finally {
    deleteDialog.value = false
    selectedRole.value = null
  }
}

onMounted(() => {
  fetchRoles()
})
</script>