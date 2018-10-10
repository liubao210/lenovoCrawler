<template>
  <div id="container">
    <transition name="el-zoom-in-top"><!--渐变效果-->
      <div id="tabControlSelect" v-show='isActive'><!--绑定样式，激活与未激活-->
        <el-tabs tab-position=left type='border-card' style="height:200px;">
          <el-tab-pane
            v-for='(splitter, index) in splitterLables'
            :key='splitter.splitterKey'
            :label='splitter.splitterNames'>  <!--display splitter list-->
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange(index)">
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="checkedBrand"
              @change="handleCheckedBrandChange(index)">
              <el-checkbox
                v-for="brand in splitter.brandNames"
                :key='splitter.brandKey'
                :label="brand">
                {{ brand }}
              </el-checkbox><!--display brand list-->
            </el-checkbox-group>
          </el-tab-pane>
        </el-tabs>
      </div>
    </transition>
  </div>
</template>
<script>
  import EVENTBUS from '@/eventBus'
  //const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data(){
      return {
        checkAll: false,
        isIndeterminate: true,
        checkedBrand: [],
        isActive : false,
        tabPosition: 'left',
        testData: [],
        splitterLables: [
          {
            splitterNames:'Desktop',
            splitterKey: 1001,
            brandKey: 1101,
            brandNames: [
              'ThinKPad',
              'Yoga',
              'IdeaPad',
            ],
          },
          {
            splitterNames: 'WorkStation',
            splitterKey: 1002,
            brandKey: 1102,
            brandNames: [
              'ThinkStation',
              'ThinkServer',
            ],
          },
        ],
      };
    },
    created() {
      this.activateTabSelect()
      this.activeGetSplitter()
    },
    methods: {
      activateTabSelect() {
        EVENTBUS.$on('activatingTabSelect', siteValue => {
          (isNaN(parseInt(siteValue)))?this.isActive = false :this.isActive = true;
        })
      },
      activeGetSplitter() {
        EVENTBUS.$on('activeGetSplitter', siteValue => {
          this.getSplitter(siteValue)
        });
        // alert("activeGetSplitter")
        // console.log(reg)
      },
      handleCheckAllChange(index) {
        this.checkedBrand = this.checkAll ? this.splitterLables[index].brandNames : [];//判断是否全选，若全选则...
        this.checkAll != this.checkAll;//更改全选布尔值状态，
        this.isIndeterminate != this.isIndeterminate;//是否全选的样式控制
      },
      handleCheckedBrandChange(index) {
        console.log(index)//value是已经check的brand组成的数组
        let checkedCount = this.checkedBrand.length;
        this.checkAll = checkedCount === this.splitterLables[index].brandNames.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.splitterLables[index].brandNames.length;
      },
      getSplitter(reg) {
        var that =this;
        var url = '/GetSpliterAndBrandBySite';
        this.$axios({
          methods: 'get',
          url: url,
          params: {
            region: reg,
            cc: "ae",
            lc: "en",
          }
        }).then(function (response) {
          console.log(response.data);
          console.log(response.data.spliter_arr);
          that.testData = response.data;
          console.log(that.testData.spliter_arr);
        }).catch(error=>{
          console.log(error);
        })
      },
    },
  };
</script>

<style scoped>
  #container {
  }
  #tabControlSelect {
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
    background-color: #EBEEF5;
    border-radius: 10px;
  }
</style>
