<template>
  <div class="lg-input">
    <input 
      :type="type"
      :value="value"
      v-bind="$attrs"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
      @input="handleInput">
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'LgInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  inject: {
    elForm: {
      default: ''
    },
    FromItem: {
      default: ''
    }
  },
  data() {
    return {
      isComposing: false
    }
  },
  methods: {
    handleInput (event) {
      if (this.isComposing) return
     
      this.$emit('input', event.target.value)
      this.$nextTick(() => {
        event.target.value = this.value ? String(this.value) : ''
      })

      if (this.FromItem) {
        this.FromItem.$emit('validate')
      }

    },
    handleCompositionStart () {
      this.isComposing = true
    },
    handleCompositionEnd (event) {
      if (this.isComposing) {
        this.isComposing = false
        this.handleInput(event)
      }
    }
  },
}
</script>

<style>

</style>