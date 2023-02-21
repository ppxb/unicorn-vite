<script lang="ts" setup>
  import type { FormInstance } from 'element-plus'
  import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const loading = ref(false)
  const ruleFormRef = ref<FormInstance>()

  const ruleForm = reactive({
    mobile: '181',
    password: '123465'
  })

  const handleLogin = async (formEl: FormInstance | undefined) => {
    console.log(123)
    loading.value = true
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
      } else {
        loading.value = false
        return fields
      }
    })
  }

  const onKeyPress = ({ code }: KeyboardEvent) => {
    if (['Enter', 'NumpadEnter'].includes(code)) handleLogin(ruleFormRef.value)
  }

  onMounted(() => window.document.addEventListener('keypress', onKeyPress))

  onBeforeUnmount(() =>
    window.document.removeEventListener('keypress', onKeyPress)
  )
</script>

<template>
  <div class="select-none">
    <div class="flex justify-center items-center w-screen h-screen">
      <div class="w-[360px]">
        <h2 class="text-center text-8">unicorn</h2>
        <el-form ref="ruleFormRef" :model="ruleForm" size="large">
          <el-form-item
            :rules="[
              {
                required: true,
                message: '请输入账号',
                trigger: 'blur'
              }
            ]"
          >
            <el-input
              v-model="ruleForm.mobile"
              clearable
              placeholder="手机号码"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="ruleForm.password"
              clearable
              placeholder="密码"
              show-password
            />
          </el-form-item>
          <el-button
            :loading="loading"
            class="w-full"
            type="primary"
            @click="handleLogin(ruleFormRef)"
          >
            登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
