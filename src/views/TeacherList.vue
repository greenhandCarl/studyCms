<template>
  <div class='teacherList'>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="years"
        label="教师年限">
      </el-table-column>
      <el-table-column
        prop="profession"
        label="专业">
      </el-table-column>
      <el-table-column
        prop="expert"
        label="擅长科目">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="onForbidden(scope.row)" type="text" size="small">{{scope.row.disable === 0 ? '禁用' : '启动'}}</el-button>
          <el-button @click='goUpdateTeacher(scope.row)' type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class='pagination-box'>
      <el-pagination
        @current-change="onPageChange"
        background
        layout="prev, pager, next"
        :page-size='pageSize'
        :total="maxTotal">
      </el-pagination>
    </div>
    <div class='btn-box'>
      <el-button type='primary' @click='goAddTeacher'>添加老师</el-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import { request } from '@/api/index'

@Component
export default class TeacherList extends Vue {
  data = {}
  tableData = []
  currentPage = 1
  pageSize = 10
  totalPage = 1
  maxTotal = 0

  mounted () {
    this.initTeacherList()
  }

  async initTeacherList () {
    const res = await request({ method: 'get', url: `/teacher/teachers?currentPage=${this.currentPage}&pageSize=${this.pageSize}`, data: {} }) as { data: any }
    const data = res.data
    data.data.dataList.forEach((item: any) => { item.gender === 0 ? item.gender = '男' : item.gender = '女' })
    this.tableData = data.data.dataList
    this.totalPage = data.data.totalPage
    this.maxTotal = this.totalPage * this.pageSize
  }

  onPageChange (val: number) {
    this.currentPage = val
    this.initTeacherList()
  }

  async onForbidden (row: any) {
    const str = row.disable === 0 ? 'disable' : 'enable'
    await request({ method: 'put', url: `/teacher/${row.id}/${str}`, data: {} })
    this.initTeacherList()
  }

  goAddTeacher () {
    this.$router.push('/addTeacher')
  }

  goUpdateTeacher (row: any) {
    this.$store.commit('setTeacher', { row })
    this.$router.push(`/updateTeacher?teacherId=${row.id}`)
  }
}
</script>

<style lang="scss" scoped>
.teacherList {
  padding: 20px;
  .btn-box {
    padding: 20px;
  }
  .pagination-box {
    padding: 20px;
  }
}
</style>
