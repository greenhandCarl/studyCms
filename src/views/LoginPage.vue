<template>
  <div class='login-container'>
    <div class='login-box'>
      <div class='title'>教师资源综合管理中心</div>
      <el-form label-position="left" class='form-box' :model="form" ref="form" label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button class='login-btn' type="primary" @click="onSubmit">登录</el-button>
      </el-form>
    </div>
    <el-dialog
      title="提示"
      width="20%"
      :visible.sync="dialogVisible"
    >
      <span>用户名或密码错误</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import { login } from '@/api/request.ts'

@Component
export default class Login extends Vue {
  form = {
    userName: '',
    password: ''
  }

  dialogVisible = false

  async onSubmit () {
    try {
      const loginRes = await login(this.form) as any // eslint-disable-line
      if (loginRes.data.data) {
        localStorage.setItem('token', loginRes.data.data.token)
        this.$router.push('/teacherList')
      } else {
        this.dialogVisible = true
      }
    } catch (err) {
      console.log('login err', err)
    }
    console.log('onSubmit')
  }
}
</script>

<style lang='scss' scoped>
$titleColor: #00a7ff;
$labalColor: #666;

.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  .login-box {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      text-align: center;
      font-size: 26px;
      color: $titleColor;
    }
    .form-box {
      display: flex;
      align-items: center;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      ::v-deep .el-form-item__label {
        color: $labalColor;
      }
      .login-btn {
        width: 100%;
        border-radius: 20px;
      }
    }
  }
}
</style>
