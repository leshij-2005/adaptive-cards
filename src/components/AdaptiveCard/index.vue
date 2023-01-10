<template>
  <component
    v-for="(cmp, key) in childrenComponents"
    v-bind="cmp"
    :key="key"
    :is="cmp.type"
    :value="linearEmployeeData"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import isObject from '@/utils/isObject'

import ColumnSet from './ColumnSet.vue'
import TextBlock from './TextBlock.vue'
import FactSet from './FactSet.vue'

type Peer = {
  name: string,
  title: string
}

type Employee = {
  name: string,
  photo: string,
  manager: {
    name: string,
    title: string
  },
  peers: Peer[]
}

type Template = {
  type: string,
  version: string,
  body: object[]
}

export default defineComponent({
  name: 'AdaptiveCard',

  components: {
    ColumnSet,
    TextBlock,
    FactSet
  },

  props: {
    template: {
      type: Object as PropType<Template>,
      default: () => null
    },
    employee: {
      type: Object as PropType<Employee>,
      default: () => null
    }
  },

  computed: {
    linearEmployeeData () {
      // eslint-disable-next-line
      const result: any = {}

      const getChildren = (tree = {}, prefix = ''): object => {
        const result = {}

        Object.keys(tree).forEach((k) => {
          const key = k as keyof object

          if (isObject(tree[key])) {
            Object.assign(result, getChildren(tree[key], key))
          } else {
            result[`${prefix}.${key}`] = tree[key]
          }
        })

        return result
      }

      Object.keys(this.employee).forEach((k) => {
        const key = k as keyof object
        const employeeKey = k as keyof Employee

        if (isObject(this.employee[employeeKey])) {
          Object.assign(result, getChildren(this.employee[employeeKey], employeeKey))
        } else {
          result[key] = this.employee[employeeKey]
        }
      })

      return result
    },

    childrenComponents () {
      const initial = {}

      // eslint-disable-next-line
      return this.template.body.reduce((acc: any, node: any, idx: number) => {
        const key = `${node.type}_${idx}`

        acc[key] = node

        return acc
      }, initial)
    }
  }
})
</script>
