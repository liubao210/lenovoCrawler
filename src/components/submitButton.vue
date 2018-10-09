<template lang="html">
  <div id="submitButton">
    <el-button
      type="primary"
      icon="el-icon-search"
      circle
      size='big'
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
    created() {
      this.activateSubmitButton()
    },
    methods: {
      activateSubmitButton() {
        EVENTBUS.$on('activatingSubmitButton', siteValue => {
          (isNaN(parseInt(siteValue)))?this.isSubmitButtonDisabled = true: this.isSubmitButtonDisabled = false;
        });//激活subminButton的可选择状态
        EVENTBUS.$off('activatingSubmitButton', siteValue);//注销EVENTBUS监听
      },
      submit() {
        var url = '/SubmitManualTask';
        this.$axios({
          methods: 'get',
          url: url,
          params: {
            cc: "ae",
            lc: "en",
            scope_json: '',
            task_type: '',
          }
        }).then(function (response) {
          console.log(response);
        }).catch(error=>{
          console.log(error);
        })
      }
    },
  }
</script>

<style scoped>
  #submitButton {
    margin:auto;
    text-align:center;
    margin-bottom: 40px;
  }
</style>
