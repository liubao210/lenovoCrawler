<template>
  <el-tabs
    v-model="activeName2"
    type="border-card"
    @tab-click="handleClick"
    lazy=true>
      <el-tab-pane
        label="手动任务"
        name="first">
        <resultList></resultList>
      </el-tab-pane>
      <el-tab-pane
        label="自动任务"
        name="second">
        <resultListAuto></resultListAuto>
      </el-tab-pane>
  </el-tabs>
</template>
<script>
  import resultList from '@/components/resultList'
  import resultListAuto from '@/components/resultListAuto'
  export default {
    components: {
      resultList,
      resultListAuto,
    },
    data() {
      return {
        activeName2: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style >
  .el-tabs {
    border-radius: 10px;
  }
</style>
