<template>
  <v-dialog :model-value="isOpen" @update:model-value="val => emit('update:isOpen', val)" max-width="500px">
    <v-card>
      <v-card-title class="text-h6">Cadastrar Novo Colaborador</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleCreate">
          <v-text-field v-model="name" label="Nome" required />
          <v-text-field v-model="email" label="Email" required />
          <v-text-field v-model="password" label="Senha" type="password" required />
          <v-select
            v-model="roleId"
            :items="roles"
            item-title="name"
            item-value="id"
            label="Cargo"
            required
          />
          <v-switch v-model="active" label="Ativo" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="emit('update:isOpen', false)">Cancelar</v-btn>
        <v-btn color="primary" @click="handleCreate">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import axios from 'axios'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits(['update:isOpen', 'created'])

const name = ref('')
const email = ref('')
const password = ref('')
const roleId = ref<number | null>(null)
const active = ref(true)
const roles = ref<{ id: number; name: string }[]>([])

onMounted(async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/roles/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    roles.value = data
  } catch (err) {
    console.error('Erro ao buscar cargos:', err)
  }
})

const handleCreate = async () => {
  try {
    await axios.post(
      'http://localhost:3000/api/register/',
      {
        name: name.value,
        email: email.value,
        password: password.value,
        roleId: roleId.value,
        active: active.value
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    emit('created')
    emit('update:isOpen', false)
  } catch (err) {
    console.error('Erro ao criar usuário:', err)
  }
}
</script>
