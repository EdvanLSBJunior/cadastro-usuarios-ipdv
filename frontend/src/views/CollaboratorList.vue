<template>
  <v-container>
    <v-row class="justify-space-between align-center mb-4">
      <v-col cols="auto">
        <v-icon size="36" color="primary">mdi-account-group</v-icon>
        <span class="text-h5 font-weight-medium ml-2">Colaboradores</span>
      </v-col>
    </v-row>

    <v-card class="elevation-2">
      <v-data-table
        :headers="headers"
        :items="collaborators"
        :items-per-page="5"
        class="elevation-1"
        no-data-text="Nenhum colaborador encontrado"
      >
        <template #item.status="{ item }">
          <v-chip :color="item.status === 'Ativo' ? 'green' : 'red'" dark>
            {{ item.status }}
          </v-chip>
        </template>

        <template #item.actions="{ item }">
          <v-icon class="mr-2" small @click="edit(item)">mdi-pencil</v-icon>
          <v-icon small color="red" @click="remove(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-btn
      icon
      color="primary"
      class="ma-4"
      style="position: fixed; bottom: 24px; right: 24px"
      @click="create"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const headers = [
  { text: 'Nome', value: 'name' },
  { text: 'E-mail', value: 'email' },
  { text: 'Cargo', value: 'role' },
  { text: 'Status', value: 'status' },
  { text: 'Ações', value: 'actions', sortable: false },
]

const collaborators = ref([
  { id: 1, name: 'João Silva', email: 'joao@email.com', role: 'Desenvolvedor', status: 'Ativo' },
  { id: 2, name: 'Maria Souza', email: 'maria@email.com', role: 'Designer', status: 'Inativo' },
])

function create() {
  console.log('Criar novo colaborador')
}

function edit(item: any) {
  console.log('Editar', item)
}

function remove(item: any) {
  console.log('Remover', item)
}
</script>
