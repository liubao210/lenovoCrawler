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
/*import Vue from 'vue'
import resultList from '@/components/resultList'
export default {
  components: {
    resultList,
  },
  methods: {
    submit: function() {
      var resultListClass = Vue.extend(resultList);
      var instance = new resultListClass();
      instance.$mount();
      document.getElementById('resultHolder').appendChild(instance.$el)
    },
  },
}*/
</script>

<style scoped>
  #submitButton {
    margin:auto;
    text-align:center;
    margin-bottom: 10px;
  }
</style>
