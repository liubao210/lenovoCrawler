<template lang="html">
  <div id="footHolder">
    <p>Any bugs?</p>
    <el-popover
      placement="top-start"
      title="Lenovo ITcode"
      width="200"
      trigger="hover"
      content="aaaaaaa"
    >
    <el-button
      id="popOverButton"
      slot="reference"
      type='warning'
      >Contact us</el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  #footHolder {
    color: #606266;
    background-color: #DCDFE6;
    border-radius: 10px;
    height: 30px;
    text-align: center;
    line-height: 0.03;
    box-shadow: 3px 3px 5px grey;
  }
  p {
    display: inline-block;
  }
  #popOverButton {
    padding: 1px 1px;
  }
</style>
