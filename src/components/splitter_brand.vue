<template lang="html">
  <div>
    <transition name="el-fade-in-linear">
      <div
        class="loadingAnime"
        v-show='isLoading'
        >
        <p>...列表载入中...</p>
        <el-button
          type="danger"
          loading
          circle
          >
        </el-button>
      </div>
    </transition>
    <transition name="el-fade-in-linear"><!--出现时的渐变效果-->
      <div class="mainContainer"  v-show='isActive'>
        <div class="holder"><!--包裹浮动的div以便调整样式-->
          <div
            class="singleSpliter"
            v-for='(spliter, spliterIndex) in backUp'
            :key='spliterIndex'
            ><!--单个spliter-->
            <div>
              <el-button
                style="padding:3px 6px 3px 6px; margin:1px 0px 5px 0px; font-size:25px; border:2px solid #67c23a;"
                plain
                type='success'
                @click='changeSpliter(spliterIndex, $event)'
                ><!--包裹button以便生成BFC-->
                {{ spliter.spliter_id.toUpperCase() }}
              </el-button>
            </div>

            <div class="brandGroup">
              <el-button
                v-for='(brand, brandIndex) in spliter.brand_arr'
                :key='brandIndex'
                @click='changeBrand(spliterIndex, brandIndex, $event)'
                style="padding:3px 3px 3px 3px; margin:0px 0px 3px 3px; font-size:15px; border:2px solid #409EFF;"
                type='primary'
                plain
                ><!--单个brand-->
                {{ brand.brand_id }}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div id="submitButton">
      <el-button
        type="primary"
        icon="el-icon-search"
        circle
        size='big'
        :disabled="isSubmitButtonDisabled"
        @click='generateTask'>
      </el-button>
    </div>
  </div>
</template>

<script>
  import EVENTBUS from '@/eventBus'
  import Vue from 'vue'
  import Qs from 'qs'
  export default {
    data() {
      return {
        isLoading:false,//加载按钮是否显示
        isActive: false,//spliter与brand是否显示
        isSubmitButtonDisabled: true,//提交按钮是否禁用
        spliterNbrand: {},//提交任务时的表。以下简称提交表
        backUp: [],//不会根据按钮状态而改变的表，用来对照选择状态。以下简称固定表
        taskType: '',
        isReceived: false,//是否已经收取到response
      }
    },
    created() {
        this.activeGetSpliter()//获取spliter与brand的列表
        this.getTaskType();//获取任务类型
      },
    methods: {
      //锁对象
      deepLock(obj){
        Object.freeze(obj)
        Object.keys(obj).map((k, i) => {
            if(typeof obj[k] === 'object'){
                this.deepLock(obj[k])
            }
        })
        return obj
      },

      //生成只包含最基本信息的表
      generateBackUp(data, backUp) {
        backUp = [];
        this.spliterNbrand = JSON.parse(JSON.stringify(data));
        for(var m = 0; m < data.spliter_arr.length; m++){
          backUp.push({});
          backUp[m].spliter_id = data.spliter_arr[m].spliter_id;
          backUp[m].isSpliterSelected = true;
          backUp[m].brand_arr = [];
          for(var n = 0; n < data.spliter_arr[m].brand_arr.length; n++){
            backUp[m].brand_arr.push({});
            backUp[m].brand_arr[n].brand_id = data.spliter_arr[m].brand_arr[n].brand_id;
            backUp[m].brand_arr[n].isBrandSelected = true;
          }
        }
        return backUp;
      },

      //点击spliter按钮触发，更改此spliter下所有brand的选择状态
      changeSpliter(spliterIndex, $event){
        var checkedCounter = 0;//获取此spliter下已经选择的brand数量
        for(var i = 0; i < this.backUp[spliterIndex].brand_arr.length; i++){
          if(this.backUp[spliterIndex].brand_arr[i].isBrandSelected == true){
            checkedCounter = checkedCounter + 1;
          }
        }
        if(checkedCounter == this.backUp[spliterIndex].brand_arr.length){//当此spliter下的brand全部选择时,spliter反全选
          this.backUp[spliterIndex].isSpliterSelected = false;
          for(var l = 0; l < this.backUp[spliterIndex].brand_arr.length; l++){//全不选此spliter下的brand
            this.backUp[spliterIndex].brand_arr[l].isBrandSelected = false;
          }
        }
        else{//当此spliter下的brand并未全部选择时,全选此spliter下的brand
          this.backUp[spliterIndex].isSpliterSelected = true;
          for(var j = 0; j < this.backUp[spliterIndex].brand_arr.length; j++){
            this.backUp[spliterIndex].brand_arr[j].isBrandSelected = true;
          }
        }
        var brandDOM = $event.target.parentNode.parentNode.nextElementSibling.childNodes;
        //遍历选择状态来设置样式
        if(this.backUp[spliterIndex].isSpliterSelected){
          console.log('selected');
          $event.target.parentNode.style.borderColor = "#67c23a";
          $event.target.parentNode.style.borderStyle = 'solid';
          for(var k1 = 0; k1 < brandDOM.length; k1 ++){
            brandDOM[k1].style.borderColor = '#409EFF';
          }
        }
        else{
          console.log('not selected');
          $event.target.parentNode.style.borderColor = "white";
          for(var k2 = 0; k2 < brandDOM.length; k2 ++){
            brandDOM[k2].style.borderColor = 'white';
          }
        }
        console.log(this.backUp);
      },

      //更改此brand的选择状态
      changeBrand(spliterIndex, brandIndex, $event){
        if(!this.backUp[spliterIndex].isSpliterSelected){//若spliter下有任何被选择的brand,则此spliter的状态为true
          this.backUp[spliterIndex].isSpliterSelected = true
        }
        this.backUp[spliterIndex].brand_arr[brandIndex].isBrandSelected = !this.backUp[spliterIndex].brand_arr[brandIndex].isBrandSelected;//更改brand选择状态
        var spliterDOM = $event.target.parentNode.parentNode.previousElementSibling.childNodes[0];
        var selectedBrandSum = 0;
        if(this.backUp[spliterIndex].brand_arr[brandIndex].isBrandSelected){
          $event.target.parentNode.style.borderColor = '#409EFF';
          for(var i = 0; i < this.backUp[spliterIndex].brand_arr.length; i ++){
            if(this.backUp[spliterIndex].brand_arr[i].isBrandSelected){//遍历来获取当前spliter下所选择的brand数
              selectedBrandSum++;
            }
          }
          if(selectedBrandSum == this.backUp[spliterIndex].brand_arr.length){//若当前spliter下的brand全选
            spliterDOM.style.borderColor = '#67c23a';
            spliterDOM.style.borderStyle = 'solid';
          }
          else if(selectedBrandSum > 0 && selectedBrandSum != this.backUp[spliterIndex].brand_arr.length){//若当前spliter下的brand有部分选择
            spliterDOM.style.borderColor = '#67c23a';
            spliterDOM.style.borderStyle = 'dashed';
          }
        }
        else{//brand未选择
          $event.target.parentNode.style.borderColor = 'white';
          for(var j = 0; j < this.backUp[spliterIndex].brand_arr.length; j ++){
            if(this.backUp[spliterIndex].brand_arr[j].isBrandSelected){//遍历来获取当前spliter下所选择的brand数
              selectedBrandSum++;
            }
          }
          if(selectedBrandSum ==  0){//若当前spliter下所选择的brand为0
            spliterDOM.style.borderStyle = 'solid';
            spliterDOM.style.borderColor = 'white';
          }
          else if(selectedBrandSum > 0 && selectedBrandSum !== this.backUp[spliterIndex].brand_arr.length){//若当前spliter下的brand有部分选择
            spliterDOM.style.borderStyle = 'dashed';
          }
        }
        console.log(this.backUp);
      },

      //根据backup生成提交表，并提交到后端
      generateTask(){
        for(var o = 0; o < this.backUp.length; o++){
          if(this.backUp[o].isSpliterSelected){
            for(var p = 0; p < this.backUp[o].brand_arr.length; p++){
              if(!this.backUp[o].brand_arr[p].isBrandSelected){
                this.spliterNbrand.spliter_arr[o].brand_arr[p] = {};
              }
            }
          }
          else{
            this.spliterNbrand.spliter_arr[o] = {};
          }
        }
        console.log(this.spliterNbrand);
        this.submitTask();
        setTimeout(this.updateList, 1000)
      },

      //更新result list
      updateList(){
        EVENTBUS.$emit('updateList', 1)
      },

      //向后台提交请求
      submitTask(){
        var url = '/SubmitManualTask';
        var that = this;
        this.$axios.post("/SubmitManualTask",
          Qs.stringify({
            cc: that.spliterNbrand.cc,
            lc: that.spliterNbrand.lc,
            scope_json:JSON.stringify(that.spliterNbrand),
            task_type: that.taskType,
          }),
          {
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        ).then(response => {console.log(response)})
      },

      //激活函数
      activeGetSpliter() {
        EVENTBUS.$on('activeGetSpliter', reg => {
          this.isLoading = true;
          this.isActive = false;
          this.getSpliter(reg);
          EVENTBUS.$off('activeGetSpliter', reg);//注销EVENTBUS监听
        });
      },

      //向后端发送请求，以获取对应site下的spliter和brand
      getSpliter(reg) {
        var that = this;
        var url = '/GetSpliterAndBrandBySite';
        this.$axios({
          methods: 'get',
          url: url,
          params: reg,
        })
        .then(response => {
          that.backUp = that.generateBackUp(response.data, that.backUp);
          that.isLoading = false;
          that.isActive = true;
          that.isReceived = true;
          console.log(that.spliterNbrand);
        })
        .catch(error => {
        console.log(error);
        })
      },

      //获取任务类型
      getTaskType(){
        EVENTBUS.$on('changeTaskType', taskType => {
          this.taskType = taskType;
          if(this.isReceived){
            this.isSubmitButtonDisabled = false;
          }
        })
      },

    },
  }
</script>

<style scoped>
  .mainContainer {
    margin: 20px 0 20px 0;/*BFC margin 重叠导致实际效果比数值小，待解决*/
    background-color: rgb(245, 247, 250);
    text-align: center;
    border-radius: 10px;
    padding-top:8px;
    box-shadow: -3px 3px 5px grey;
  }
  .singleSpliter {
    float: left;
    width: 255px;
    border-left: 1px solid white;
    border-right: 1px solid white;
    margin: -1px 0 0 -1px;
    text-align: center;
  }
  .holder {
    overflow: hidden;/*清除浮动*/
    display: inline-block;/*为居中效果，消除div原本占一行的宽度*/
  }
  .brandGroup {
    text-align: center;
  }
  .loadingAnime {
    background-color: #f5f7fa;
    text-align: center;
    margin: 10px auto 10px auto;
    border-radius: 10px;
    padding-bottom: 10px;
  }
  .loadingAnime, p {
    color: #606266;
    font-size: 14px;
    width: 90%;
    margin: auto;
  }
  #submitButton {
    margin:auto;
    text-align:center;
    margin-bottom: 40px;
  }
</style>
