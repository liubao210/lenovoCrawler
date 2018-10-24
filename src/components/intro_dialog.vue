<template lang="html">
  <div class="introHolder">
    <el-button
      type="text"
      @click="centerDialogVisible = true"
      >
      <i class="el-icon-question"></i>如何使用
    </el-button>
    <el-dialog
      title="指南"
      :visible.sync="centerDialogVisible"
      width="40%"
      center
      show-close:false
      >
      <span>这是使用指南，待填写</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        centerDialogVisible: false,
      }
    },
  };
</script>

<style scoped>
  .introHolder {
    text-align: right;
    display: inline-block;
    margin-right: 0px;
    position: relative;
    left: 40%;

  }
</style>
