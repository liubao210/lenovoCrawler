<template>
  <div id="tabControlSelect">
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane
        v-for='(splitter, index) in splitterLables'
        :label='splitter.splitterName'>
        用户管理
      </el-tab-pane>
      <el-tab-pane label="配置  管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tabPosition: 'left',
        splitterLables: [
          {
            splitterName:'Desktop',

          },

        ],
      };
    }
  };
</script>

<style scoped>
  #tabControlSelect {
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
    background-color: #EBEEF5;
    padding: 5px;
    border-radius: 10px;
  }
  .el-tabs__content {
  }
</style>
