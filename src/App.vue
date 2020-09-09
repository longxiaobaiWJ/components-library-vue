<template>
  <div>
    <h1>hello Vue</h1>
    <div>
      <lg-form ref="form" :model="form" :rules="rules" @submit.native.prevent>
        <lg-form-item label="用户名" prop="name">
          <lg-input maxlength="8" v-model="form.name"></lg-input>
        </lg-form-item>
        <lg-form-item label="密码" prop="password">
          <lg-input maxlength="8" v-model="form.password" type="password"></lg-input>
        </lg-form-item>
        <lg-form-item>
          <lg-button type="button" @click="handleClick">
            <span>测试按钮</span>
          </lg-button>
        </lg-form-item>
      </lg-form>
    </div>
  </div>
</template>

<script>
import LgForm from './form/form.vue'
import LgFormItem from './form-item/form-item.vue'
import LgInput from './input/input.vue'
import LgButton from './button/button.vue'

export default {
  name: 'App',
  components: {
    LgForm,
    LgFormItem,
    LgInput,
    LgButton
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请选择输入密码', trigger: 'change' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleClick () {
      this.$refs.form.validate((vals)=>{
        console.log(vals)
      })
    }
  },
}
</script>

<style>

</style>