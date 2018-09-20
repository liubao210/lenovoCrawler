<template>
  <div id="mySelect">
    <h1>联想爬虫</h1>
    <div>
      <table>
        <tr>
          <th>Site</th>
          <th>Splitter</th>
          <th>Brand</th>
        </tr>
        <tr>
          <td><el-select
            v-model="siteValue"
            @change=changeSite
            placeholder="请选择">
            <el-option
              v-for="item in siteList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select></td>
          <td><el-select
            v-model="splitterValue"
            @change='changeSplitter'
            clearable
            :disabled=isSplitterDisabled
            :placeholder=placeholderSplitterStatus>
            <el-option
              v-for="item in splitterList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select></td>
          <td><el-select
              v-model="brandValue"
              clearable
              :disabled=isBrandDisabled
              :placeholder=placeholderBrandStatus>
              <el-option
                v-for="item in brandlist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import EVENTBUS from '@/eventBus.js'
  export default {
    name: "mySelect",
    data() {
      return {
        placeholderSplitterStatus:'请先选择Site',
        placeholderBrandStatus:'请先选择Site',
        isSplitterDisabled: true,
        isBrandDisabled: true,
        siteValue: null,
        splitterValue:null,
        brandValue:null,
        selectedOptions: [],
        index1:'',
        index2:'',
        index3:'',
        splitterList:[],//有接口后通过后台的爬虫获得
        brandlist:[],//根据splitterList，通过后台爬虫获得
        siteList: [
          {
            url: "japan.com",
            value: 0,
            label: "Japan",
            children: [
              {
                url: "jp.laptop.com",
                value:0,
                label: "laptop",
                children: []
              },
              {
                url: "jp.deskyop.com",
                value:1,
                label: "desktop",
                children: []
              }
            ]
          },
          {
            url: "korea.com",
            value: 1,
            label: "korea",
            children: [
              {
                url: "ko.laptop.com",
                value:0,
                label: "laptop",
                children: []
              },
              {
                url: "ko.desktop.com",
                value:1,
                label: "desktop",
                children: []
              }
            ]
          },
        ],
          props: {
            value: 'value',
            label: 'label',
            children: 'children'
          },
        }
      },
    watch: {
      siteValue: function(){
        (isNaN(parseInt(this.siteValue)))?this.placeholderSplitterStatus='请先选择Site' :this.placeholderSplitterStatus='请选择';
        (isNaN(parseInt(this.splitterValue)))?this.placeholderBrandStatus='请先选择Splitter' :this.placeholderBrandStatus='请选择';
      },
      splitterValue: function(){
        (isNaN(parseInt(this.splitterValue)))?this.placeholderBrandStatus='请先选择Splitter' :this.placeholderBrandStatus='请选择';
      }
    },
    methods: {
      handleChange(value) {
        // console.log(value);
      },
      /*handleItemChange(val) {
        console.log('active item:', val);
        this.siteList[0].children[0].children = [
          {
            value: "thinkpad.com",
            label: "thinkpad",
          },
        ]
      }*/
      changeSite(val){
        (isNaN(parseInt(this.siteValue)))?this.isSplitterDisabled = true :this.isSplitterDisabled = false;//更改级联选择可选择状态
        this.splitterList = this.siteList[val].children;//给splitter赋值，有接口后通过后台爬虫获得
        EVENTBUS.$emit('activatingSubmitButton',this.siteValue)//EVENTBUS传递参数，激活submitButton为可选择状态
      },
      changeSplitter(val){
        (isNaN(parseInt(this.splitterValue)))?this.isBrandDisabled = true :this.isBrandDisabled = false;
        this.brandList = this.splitter[val].children;//给brand赋值，有接口后通过后台爬虫获得
      },
    }
  }
</script>

<style scoped>
  table {
    margin: auto;
  }
  h1 {
    font-size: 35px;
    color: #1fc8db;
  }
  th {
    font-weight: normal;
    font-size: 10px;
    color: #909399;
  }
  #mySelect {
    text-align: center;
    margin-bottom: 5px;
  }
</style>
