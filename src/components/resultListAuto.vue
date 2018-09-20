<template>
  <div id="resultList">
    <el-table
      :data="tableData"
      >
      <el-table-column
        prop="date"
        label="爬取日期（自动）"
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
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click="handleClick(scope.row)" type="success" size="small">预览</el-button>
            <el-button type="primary" size="small">下载</el-button>
          </el-button-group>
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
          name: 'Austrilia',
          province: 'Laptop',
          city: 'ThinkPad',
          address: 'IdeaPad x AlienWare',
          zip: 23333333,
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
