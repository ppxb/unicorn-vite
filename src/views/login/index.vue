<script lang='ts' setup>
  import type { FormItemInstance } from 'element-plus'
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const loading = ref(false)
  const ruleFormRef = ref<FormItemInstance>()

  const ruleForm = reactive({
    mobile: '181',
    password: '123465'
  })
</script>

<template>
  <div class='select-none'>
    <div class='flex justify-center items-center w-screen h-screen'>
      <div class='w-[360px]'>
        <h2 class='text-center text-8'>unicorn</h2>
        <el-form ref='ruleFormRef' :model='ruleForm' size='large'>
          <el-form-item :rules="[
                  {
                    required: true,
                    message: '请输入账号',
                    trigger: 'blur'
                  }
                ]">
            <el-input clearable v-model='ruleForm.mobile' placeholder='手机号码' />
          </el-form-item>
          <el-form-item>
            <el-input clearable show-password v-model='ruleForm.password' placeholder='密码' />
          </el-form-item>
          <el-button class='w-full' type='primary' :loading='loading'>
            登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
