<template>
  <div id="resultList">
    <el-table
      :data="tableData"
      border>
      <el-table-column
        fixed
        prop="date"
        label="爬取日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Site"
        width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="Splitter"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="Brand"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="Series"
        width="200">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="Sub-series"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope" style="text-align:center">
          <el-button @click="handleClick(scope.row)" type="text" size="small">预览</el-button>
          <el-button type="text" size="small">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: 'Japan',
          province: 'Laptop',
          city: 'ThinkPad',
          address: 'ThinkPad x AlienWare',
          zip: 23333333,
        },]
      }
    }
  }
</script>

<style scoped>
  #resultList {
    margin: auto;
    width: 80%;
    }
</style>
