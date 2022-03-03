import VeeValidate from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
import Vue from 'vue'
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zhCN.messages,
    // 修改内置规则的message 让密码与确认密码相同
    is: (field) => `${field}必须与密码相同`
  },
  attributes: {
    // 给校验的field属性名映射中文名称
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password2: '确认密码',
    agree: '协议'
  }
})

// 自定义校验规则
VeeValidate.Validator.extend('agree', {
  validate: value => {
    return value
  },
  getMessage: field => field + '协议是必须同意'
})
