<template>
  <p v-if="loading">Loading...</p>
  <template v-else>
    <p v-if="error">{{ error }}</p>
    <AdaptiveCard
      v-else
      :template="employeeCardTemplate"
      :employee="employeeData"
    />
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdaptiveCard from './components/AdaptiveCard/index.vue'

import request from '@/utils/request'

export default defineComponent({
  name: 'App',
  components: {
    AdaptiveCard
  },

  data: () => ({
    employeeCardTemplate: null,
    employeeData: null,
    loading: true,
    error: ''
  }),

  async mounted () {
    this.loading = true

    try {
      this.employeeCardTemplate = await request('./templates/EmployeeCard.json')
      this.employeeData = await request('./data/Employee.json')
    } catch (error) {
      this.error = String(error)
    } finally {
      this.loading = false
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px;
}
</style>
