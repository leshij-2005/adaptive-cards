<template>
  <div :class="$style.wrap">
    <Column
      v-for="item in items"
      :key="item.key"
      :width="item.width"
      :items="item.items"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Column from './Column.vue'

export default defineComponent({
  name: 'AdaptiveCardColumnSet',

  components: {
    Column
  },

  props: {
    componentStyle: {
      type: String,
      default: 'accent'
    },
    bleed: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    values: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    items () {
      // eslint-disable-next-line
      return this.columns.map((column: any, idx) => ({
        key: `${Date.now()}_${idx}`,
        ...column
      }))
    }
  }
})
</script>

<style lang="scss" module>
.wrap {
  display: flex;

  margin-right: -16px;
}
</style>
