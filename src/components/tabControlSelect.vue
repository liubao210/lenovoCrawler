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
              @change="handleCheckedBrandChange">
              <el-checkbox
                v-for="brand in splitter.brandNames"
                :key='splitter.splitterKey'
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
    data() {
      return {
        checkAll: true,
        checkedBrand: [],
        isIndeterminate: false,
        isActive : false,
        tabPosition: 'left',
        splitterLables: [
          {
            splitterNames:'Desktop',
            splitterKey: 1001,
            brandNames: [
              'ThinKPad',
              'Yoga',
              'IdeaPad',
            ],
          },
          {
            splitterNames: 'WorkStation',
            splitterKey: 1002,
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
    },
    methods: {
      activateTabSelect() {
        EVENTBUS.$on('activatingTabSelect', siteValue => {
          (isNaN(parseInt(siteValue)))?this.isActive = false :this.isActive = true;
        })
      },
      handleCheckAllChange(index) {
        this.checkedBrand = this.checkAll ? this.splitterLables[index].brandNames : [];
        this.isIndeterminate = false;
        this.checkAll = false;
        console.log(index)
      },
      handleCheckedBrandChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
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
