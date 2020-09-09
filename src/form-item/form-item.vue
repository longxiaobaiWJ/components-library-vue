<template>
  <div class="lg-form-item">
    <label class="el-form-item__label" v-if="label" for="">{{label}}</label>
    <div class="lg-form-context">
      <slot></slot>
      <div class="errors-wrapper" v-if="errors">{{errors}}</div>
    </div>
  </div>
</template>

<script>
import schema from 'async-validator'

export default {
  name: 'LgFormItem',
  props: {
    label: {
      type: String
    },
    prop: {
      type: String,
      default: ''
    }
  },
  provide () {
    return {
      FromItem: this
    }
  },
  inject: ['elForm'],
  data() {
    return {
      errors: ''
    }
  },
  mounted() {
    /**
     * this.$on('validate', this.validate)
     * => "Error: Async Validation Error"
     */
    this.$on('validate', () => {
       this.validate()
    })

    if (this.prop && this.elForm) {
      this.elForm.$emit('el.form.addField', this)
    }
  },
  methods: {
    validate () {
      if (!this.prop) return
      const { model, rules } = this.elForm
      const descriptor = { [this.prop]: rules[this.prop] }
      const value = { [this.prop]: model[this.prop] }

      const validator = new schema(descriptor)
      return validator.validate(value, (errors) => {
        this.errors = errors ? errors[0].message : ''
        return errors
      })
    }
  },
}
</script>

<style scoped>
.lg-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.el-form-item__label{
  margin-right: 10px;
  min-width: 50px;
}

.lg-form-context{
  position: relative;
}

.errors-wrapper{
  position: absolute;
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
}
</style>