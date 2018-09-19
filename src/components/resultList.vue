<template>
  <div id="resultList">
    <el-table
      :data="tableData"
      >
      <el-table-column
        prop="date"
        label="爬取日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="site"
        label="Site"
        width="120">
      </el-table-column>
      <el-table-column
        prop="splitter"
        label="Splitter"
        width="120">
      </el-table-column>
      <el-table-column
        prop="brand"
        label="Brand"
        width="120">
      </el-table-column>
      <el-table-column
        prop="series"
        label="Series"
        width="200">
      </el-table-column>
      <el-table-column
        prop="subseries"
        label="Sub-series"
        width="200">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope" style="text-align:center">
          <el-button @click="handleClick(scope.row)" type="success" size="small">预览</el-button>
          <el-button type="primary" size="small">下载</el-button>
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
          site: 'Japan',
          splitter: 'Laptop',
          brand: 'ThinkPad',
          series: 'ThinkPad x AlienWare',
          subseries: 23333333,
        },]
      }
    }
  }
</script>

<style scoped>
  #resultList {
    margin: auto;
    width: 90%;
    }
</style>
