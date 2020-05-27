<template>
  <div class="home">
    <div class='form-container'>
      <el-form ref="form" :model="form" label-width="200px">
        <el-form-item label="老师名字">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="科目">
          <el-checkbox-group v-model="subjectList">
            <el-checkbox label="subject001" name="type">语文</el-checkbox>
            <el-checkbox label="subject002" name="type">数学</el-checkbox>
            <el-checkbox label="subject003" name="type">英语</el-checkbox>
            <el-checkbox label="subject004" name="type">政治</el-checkbox>
            <el-checkbox label="subject005" name="type">历史</el-checkbox>
            <el-checkbox label="subject006" name="type">地理</el-checkbox>
            <el-checkbox label="subject007" name="type">物理</el-checkbox>
            <el-checkbox label="subject008" name="type">化学</el-checkbox>
            <el-checkbox label="subject009" name="type">生物</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="upload"
            action=""
            :auto-upload='false'
            :on-change="onAvatarFileChange"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">（只能上传jpg/png文件）</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="视频介绍">
          <el-input v-model="form.video"></el-input>
        </el-form-item>
        <el-form-item label="文字介绍">
          <el-input v-model="form.introduce"></el-input>
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
        <el-form-item label="老师空闲时间">
          <div class='teacherFreeTimeList' v-for='time in freeTimeList' :key='time.id'>
            <el-row :gutter="5" class='row'>
              <el-col :span="6">
                <el-select v-model='time.weekDay' placeholder="请选择" >
                  <el-option
                    v-for="item in weeks"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6" class='startTime-box'>
                <el-time-select
                  placeholder="起始时间"
                  v-model="time.startTime"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }">
                </el-time-select>
              </el-col>
              <el-col :span="6" class='endTime-box'>
                <el-time-select
                  placeholder="结束时间"
                  v-model="time.endTime"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30',
                    minTime: time.startTime
                  }">
                </el-time-select>
              </el-col>
              <el-col :span="6">
                <span class='add-tree-btn' @click='addTreeTime'>添加</span>
                <span class='remove-tree-btn' @click='removeTreeTime(time.id)'>删除</span>
              </el-col>
            </el-row>
          </div>
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
import { v4 } from 'uuid'
import _ from 'lodash'
import axios from 'axios'

@Component
export default class AddTeacher extends Vue {
  form: any = {} // eslint-disable-line
  subjectList = []
  subjectItemList = []
  weeks = [
    { label: '星期一', value: '1' },
    { label: '星期二', value: '2' },
    { label: '星期三', value: '3' },
    { label: '星期四', value: '4' },
    { label: '星期五', value: '5' },
    { label: '星期六', value: '6' },
    { label: '星期日', value: '7' }
  ]

  freeTimeList = [
    { id: v4(), weekDay: '', startTime: '', endTime: '' }
  ]

  // 头像列表
  fileList: any = [] // eslint-disable-line

  weekDay = ''

  mounted () {
    this.initTeacher()
  }

  onAvatarFileChange (file: any, fileList: any) { // eslint-disable-line
    this.fileList = [file.raw]
    this.uploadAli(file.raw)
  }

  async uploadAli (file: any) { // eslint-disable-line
    console.log('file', file)
    const res = await request({ method: 'get', url: '/oss/sign', data: null }) as { data: any }
    console.log('res', res)
    const formData = new FormData()
    formData.append('name', file.name)
    formData.append('key', 'shangkeya/${filename}') // eslint-disable-line
    formData.append('policy', res.data.data.policy)
    formData.append('OSSAccessKeyId', res.data.data.accessid)
    formData.append('success_action_status', '200')
    formData.append('signature', res.data.data.signature)
    formData.append('file', file)

    await axios({ method: 'post', url: 'https://20200508sky.oss-cn-shenzhen.aliyuncs.com', data: formData })
    this.form.avatar = `https://20200508sky.oss-cn-shenzhen.aliyuncs.com/shangkeya/${file.name}`
  }

  async initTeacher () {
    const res = await request({ method: 'get', url: `/teacher/${this.$route.query.teacherId}`, data: {} }) as { data: any } // eslint-disable-line
    const currentTeacher = res.data.data
    currentTeacher.liveTeachingStatus = String(currentTeacher.liveTeachingStatus)
    currentTeacher.isTeacher = String(currentTeacher.isTeacher)
    const fileName = (currentTeacher.avatar && currentTeacher.avatar.split('/').slice(-1)[0]) || '暂无头像'
    this.fileList = [{ name: fileName }]
    this.form = currentTeacher
    // 性别
    this.form.gender = String(this.form.gender)
    // 科目
    this.subjectList = currentTeacher.subjectItemList.map((item: any) => item.subjectCode) // eslint-disable-line
    // 空闲时间
    this.freeTimeList = JSON.parse(currentTeacher.ext).map((item: any) => ({ ...item, id: v4(), weekDay: String(item.weekDay) })) // eslint-disable-line

    console.log('this.form', this.form)
  }

  async onSubmit () {
    const data = { subjectList: this.subjectList, teacher: this.form, teacherFreeTimeList: this.freeTimeList }
    console.log('data', data)
    const res = await request({ method: 'put', url: `/teacher/${this.$route.query.teacherId}`, data }) as { data: any } // eslint-disable-line
    if (res.data && res.data.code === 0 && res.data.msg === '成功') {
      this.$alert('修改成功', '修改老师', {
        confirmButtonText: '确定'
      })
    }
  }

  addTreeTime () {
    const emptyTime = { id: v4(), weekDay: '', startTime: '', endTime: '' }
    this.freeTimeList.push(emptyTime)
  }

  removeTreeTime (id: string) {
    if (this.freeTimeList.length === 1) return
    this.freeTimeList = this.freeTimeList.filter(item => item.id !== id)
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
    .upload {
      display: flex;
      justify-content: flex-start;
      .el-upload__tip {
        margin-top: 0;
        padding-left: 20px;
      }
    }
  }
  .teacherFreeTimeList {
    padding-bottom: 20px;
  }
  .row {
    display: flex;
    justify-content: space-around;
  }
  .endTime-box,
  .startTime-box {
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: auto;
    }
  }
  .add-tree-btn,
  .remove-tree-btn {
    padding: 5px;
    cursor: pointer;
  }
}
</style>
