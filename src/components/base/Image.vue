<template>
  <div :class="[$style.wrap, $style[`wrap_${componentStyle.toLowerCase()}`]]">
    <img :src="url" :alt="altText" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseImage',

  props: {
    url: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'Normal'
    },
    componentStyle: {
      type: String,
      default: 'Image'
    }
  }
})
</script>

<style lang="scss" module>
.wrap {
  overflow: hidden;

  &_image {
    border-radius: 5px;
  }

  &_person {
    border-radius: 50%;
  }
}
</style>
