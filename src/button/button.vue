<template>
  <button
    class="lg-button"
    :type="type"
    v-bind="$attrs"
    @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'LgButton',
  props: {
    type: {
      type: String,
      default: 'button'
    }
  },
  methods: {
    handleClick (event) {
      this.$emit('click', event)
    }
  },
}
</script>

<style>

</style>