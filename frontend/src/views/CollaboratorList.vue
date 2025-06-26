<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h6">Colaboradores</span>
        <v-btn color="primary" class="text-white" @click="isCreateDialogOpen = true">
            + Novo Colaborador
        </v-btn>
        <v-btn color="error" @click="logout" size="small">
            <v-icon start>mdi-logout</v-icon>
                Sair
        </v-btn>
        </v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loading"
        loading-text="Carregando colaboradores..."
        class="elevation-1"
      >
        <template #item.active="{ item }">
          <v-chip :color="item.active ? 'green' : 'red'" dark>
            {{ item.active ? 'Ativo' : 'Inativo' }}
          </v-chip>
        </template>

        <template #item.actions="{ item }">
          <v-btn
           v-if="item.active"
           size="35"
           icon 
           @click="editUser(item)" 
           class="me-2"
           >
            <v-icon size="18">mdi-pencil</v-icon>
          </v-btn>
          <v-btn size="35" icon color="orange" @click="openDeactivateDialog(item)">
            <v-icon size="18">mdi-account-off</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Diálogo de desativação -->
    <v-dialog v-model="dialog" max-width="400">
        <v-card>
            <v-card-title class="text-h6">Confirmar desativação</v-card-title>
            <v-card-text>
                Tem certeza que deseja desativar o usuário
                <strong>{{ selectedUser?.name }}</strong>?
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn text @click="dialog = false">Cancelar</v-btn>
                <v-btn color="orange" text @click="confirmDeactivate">Desativar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <EditUserModal
      :user="selectedUser"
      v-model:isOpen="isEditDialogOpen"
      @updated="fetchUsers"
    />
  </v-container>

  <CreateUserModal
    v-model:isOpen="isCreateDialogOpen"
    @created="fetchUsers"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import EditUserModal from '@/components/userModal/EditUserModal.vue'
import CreateUserModal from '@/components/userModal/CreateUserModal.vue'
import { useRouter } from 'vue-router'

interface User {
  id: number
  name: string
  email: string
  role: { name: string }
  active: boolean
}

const users = ref<User[]>([])
const loading = ref(true)

const dialog = ref(false)
const selectedUser = ref<User | null>(null)

const isEditDialogOpen = ref(false)

const isCreateDialogOpen = ref(false)

const headers = [
  { title: 'Nome', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Cargo', key: 'role.name' },
  { title: 'Status', key: 'active' },
  { title: 'Ações', key: 'actions', sortable: false }
]

const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await axios.get('http://localhost:3000/api/admin/users/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    users.value = response.data
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
  } finally {
    loading.value = false
  }
}

const editUser = (user: User) => {
  selectedUser.value = user
  isEditDialogOpen.value = true
}

const openDeactivateDialog = (user: User) => {
  selectedUser.value = user
  dialog.value = true
}

const confirmDeactivate = async () => {
  if (!selectedUser.value) return

  try {
    await axios.put(`http://localhost:3000/api/admin/users/${selectedUser.value.id}`, {
      ...selectedUser.value,
      active: false
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    fetchUsers()
  } catch (error) {
    console.error('Erro ao desativar usuário:', error)
  } finally {
    dialog.value = false
    selectedUser.value = null
  }
}

const router = useRouter()

const logout = () => {
  localStorage.clear()
  router.push('/login')
}

onMounted(() => {
  fetchUsers()
})
</script>
