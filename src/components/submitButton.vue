<template lang="html">
  <div id="submitButton">
    <el-button
      type="primary"
      icon="el-icon-search"
      circle
      :disabled=isSubmitButtonDisabled
      @click='submit'>
    </el-button>
  </div>
</template>

<script>
  import EVENTBUS from '@/eventBus.js'
  export default{
    data (){
      return{
        isSubmitButtonDisabled: true,
        siteValue: null,
      }
    },
    mounted() {
      this.activateSubmitButton()
    },
    methods: {
      activateSubmitButton() {
        EVENTBUS.$on('activatingSubmitButton', siteValue => {
          (isNaN(parseInt(siteValue)))?this.isSubmitButtonDisabled = true: this.isSubmitButtonDisabled = false
        });//激活subminButton的可选择状态
        EVENTBUS.$off('activatingSubmitButton', siteValue);//注销EVENTBUS监听
      },
    },
  }
</script>

<style scoped>
  #submitButton {
    margin:auto;
    text-align:center;
    margin-bottom: 10px;
  }
</style>
