<template>
  <div :class="[
    $style.wrap,
    size && $style[`wrap_size-${size.toLowerCase()}`],
    spacing && $style[`wrap_spacing-${spacing.toLowerCase()}`],
  ]">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseTextBlock',

  props: {
    text: {
      type: String,
      required: true
    },
    spacing: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'Normal'
    }
  }
})
</script>

<style lang="scss" module>
.wrap {
  &_size {
    &-medium {
      font-size: 20px;
    }
  }

  &_spacing {
    &-none {
      letter-spacing: 0.5px;
    }

    &-normal {
      letter-spacing: 1px;
    }
  }
}
</style>
