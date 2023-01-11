<template>
  <div :class="[$style.wrap, $style[`wrap_${width}`]]">
    <component
      v-for="child in children"
      :key="child.key"
      :is="child.component"
      v-bind="child.props"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AdaptiveCardColumnSetColumn',

  props: {
    width: {
      type: String,
      default: 'auto'
    },
    items: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    children () {
      // eslint-disable-next-line
      return this.items.map((item: any, idx) => {
        const { type, style: componentStyle, ...props } = item

        return {
          key: `${Date.now()}_${idx}`,
          component: `Base${type}`,
          props: {
            componentStyle: componentStyle || null,
            ...props
          }
        }
      })
    }
  }
})
</script>

<style lang="scss" module>
.wrap {
  padding-left: 16px;

  &_auto {
    width: auto;
    flex-shrink: 0;
  }

  &_stretch {
    width: 100%;
  }
}
</style>
