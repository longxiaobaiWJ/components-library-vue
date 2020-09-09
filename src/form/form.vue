<template>
  <form class="lg-form">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'LgForm',
  provide() {
    return {
      elForm: this
    };
  },
  props: {
    model: Object,
    rules: Object,
  },
  data () {
    return {
      fields: []
    }
  },
  methods: {
    validate (callback) {
      const tasks = this.fields
        .filter(field => field.prop)
        .map(field => field.validate())
      Promise.all(tasks)
        .then(_ => callback(true))
        .catch(_ => callback(false))
    }
  },
  created () {
    this.$on('el.form.addField', (field) => {
      this.fields.push(field)
    })
  },
}
</script>

<style>

</style>