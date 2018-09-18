<template>
  <div id="mySelect">
    <h1>Web Crawler</h1>
    <div class="select">
      <el-select v-model="siteValue" @change="changeSite" placeholder="请选择Site">
        <el-option
          v-for="item in siteList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="splitterValue" clearable :disabled=isSplitterDisabled :placeholder=placeholderStatus>
        <el-option
          v-for="item in splitterList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="brandValue" clearable :disabled=isBrandDisabled :placeholder=placeholderStatus>
        <el-option
          v-for="item in brandlist"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
  export default {
    name: "myselect",
    data() {
      return {
        placeholderStatus:'请选择Site!',
        isSplitterDisabled: true,
        isBrandDisabled: true,
        selectedOptions: [],
        siteValue: null,
        index1:'',
        splitterValue:'',
        index2:'',
        brandValue:'',
        index3:'',
        splitterList:[],
        brandlist:[],
        siteList: [
          {
            url: "japan.com",
            value: 0,
            label: "japan",
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
          }
        ],
        props: {
          value: 'value',
          label: 'label',
          children: 'children'
        },
        serieslist: [],
        subserieslist: []
      }
      },
      watch: {
        siteValue: function(){
        (this.siteValue === null)?this.placeholderStatus='请选择Site!' :this.placeholderStatus='请选择'
        }
      },
      computed: {
        placeholderStatusSplitter: siteValue => {
          return  (this.siteValue)?'请选择Spliter': '请选择Site!'
        }
      },
      methods: {
      handleChange(value) {
        // console.log(value);
      },
      handleItemChange(val) {
        console.log('active item:', val);
        // console.log(this.siteList[0]);
        this.siteList[0].children[0].children = [
          {
            value: "thinkpad.com",
            label: "thinkpad",
          },
        ]
      },
      changeSite(val){
        this.isSplitterDisabled = false;
        this.isBrandDisabled = false;
        this.splitterList = this.siteList[val].children
        this.brandList = this.siteList[val].children
      },
    }
  }
</script>

<style scoped>
  #mySelect {
    text-align: center;
    margin-bottom: 5px;
    }

</style>
