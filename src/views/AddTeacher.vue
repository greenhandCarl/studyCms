<template>
  <div class="home">
    <div class='form-container'>
      <el-form ref="form" :model="form" label-width="200px">
        <el-form-item label="老师名字">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="科目">
          <el-checkbox-group v-model="subjectList">
            <el-checkbox label="subject001" name="type">语文</el-checkbox>
            <el-checkbox label="subject002" name="type">数学</el-checkbox>
            <el-checkbox label="subject003" name="type">英语</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="form.avatar"></el-input>
        </el-form-item>
        <el-form-item label="视频介绍">
          <el-input v-model="form.video"></el-input>
        </el-form-item>
        <el-form-item label="文字介绍">
          <el-input v-model="form.introduct"></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="form.education"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="form.college"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="form.profession"></el-input>
        </el-form-item>
        <el-form-item label="擅长科目">
          <el-input v-model="form.expert"></el-input>
        </el-form-item>
        <el-form-item label="年限">
          <el-input v-model="form.years" type='number'></el-input>
        </el-form-item>
        <el-form-item label="是否是教师">
          <el-radio-group v-model="form.isTeacher">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否支持视频教学">
          <el-radio-group v-model="form.liveTeachingStatus">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button type="default" @click="onBack">返回教师列表</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { request } from '@/api/index'

@Component
export default class AddTeacher extends Vue {
  form = {}
  subjectList = []

  async onSubmit () {
    const data = { subjectList: this.subjectList, teacher: this.form }
    console.log('this.form', this.form)
    const res = await request({ method: 'post', url: '/subject_teacher', data }) as { data: any }
    if (res.data && res.data.code === 0 && res.data.msg === '成功') {
      this.$message('提交成功')
      this.form = {}
      this.subjectList = []
    }
  }

  onBack () {
    this.$router.push('/')
  }
}
</script>

<style lang='scss' scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  .form-container {
    width: 50%;
  }
}
</style>
