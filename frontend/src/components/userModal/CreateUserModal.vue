<template>
  <v-dialog
    :model-value="isOpen"
    @update:model-value="onDialogToggle"
    max-width="500px"
  >
    <v-card>
      <v-card-title class="text-h6">Cadastrar Novo Colaborador</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleCreate" ref="formRef">
          <v-text-field v-model="name" label="Nome" required />
          <v-text-field v-model="email" label="Email" type="email" required />
          <v-text-field
            v-model="password"
            label="Senha"
            type="password"
            required
            :rules="[rules.required, rules.min]"
          />
          <v-select
            v-model="roleId"
            :items="roles"
            item-title="name"
            item-value="id"
            label="Cargo"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="closeDialog">Cancelar</v-btn>
        <v-btn color="primary" @click="handleCreate">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import axios from 'axios'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits(['update:isOpen', 'created'])

const name = ref('')
const email = ref('')
const password = ref('')
const roleId = ref<number | null>(null)
const active = ref(true)
const roles = ref<{ id: number; name: string }[]>([])

const formRef = ref()

const rules = {
  required: (v: string) => !!v || 'Campo obrigatório',
  min: (v: string) => v.length >= 6 || 'Senha deve ter no mínimo 6 caracteres'
}

const fetchRoles = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/roles/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    roles.value = data
  } catch (err) {
    console.error('Erro ao buscar cargos:', err)
  }
}

const handleCreate = async () => {
  const form = formRef.value as any
  if (!(await form?.validate?.())) return

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
    closeDialog()
  } catch (err) {
    console.error('Erro ao criar usuário:', err)
  }
}

const resetForm = () => {
  name.value = ''
  email.value = ''
  password.value = ''
  roleId.value = null
  active.value = true
  formRef.value?.resetValidation?.()
}

const closeDialog = () => {
  emit('update:isOpen', false)
  resetForm()
}

const onDialogToggle = (val: boolean) => {
  emit('update:isOpen', val)
  if (!val) resetForm()
  if (val) fetchRoles()
}

watch(() => props.isOpen, (val) => {
  if (val) fetchRoles()
})
</script>
