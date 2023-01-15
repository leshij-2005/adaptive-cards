<template>
  <div :class="$style.wrap">
    <component
      v-for="(cmp, key) in childrenComponents"
      v-bind="cmp"
      :key="key"
      :is="cmp.type"
      :values="linearEmployeeData"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import isObject from '@/utils/isObject'

import TextBlock from '@/components/base/TextBlock.vue'
import ColumnSet from './ColumnSet/index.vue'
import FactSet from './FactSet.vue'

interface Peer {
  name: string,
  title: string
}

interface Employee {
  name: string,
  photo: string,
  manager: {
    name: string,
    title: string
  },
  peers: Peer[]
}

interface Template {
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
      // eslint-disable-next-line
      return this.template.body.reduce((acc: any, node: any, idx: number) => {
        const key = `${node.type}_${idx}`

        const { style: componentStyle, ...params } = node

        acc[key] = {
          componentStyle,
          ...params
        }

        return acc
      }, {})
    }
  }
})
</script>

<style lang="scss" module>
.wrap {
  width: 400px;

  padding: 16px;

  border: 4px solid lightblue;
}
</style>
