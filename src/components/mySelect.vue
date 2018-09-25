<template>
  <div id="mySelect">
    <h1>联想爬虫</h1>
    <div>
      <table>
        <tr>
          <th>Site</th>
          <!--<th>Splitter</th>
          <th>Brand</th>-->
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
          <!--<td><el-select
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
            </el-select></td>-->
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
            label: "Algeria (DZ)",
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
            label: "Angola (AO)",
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
          {
            url: '',
            value: 2,
            label: 'Australia (AU)',
            children: [],
          },
          {
            url: '',
            value: 3,
            label: 'Belarus (BY)',
            children: [],
          },
          {
            url: '',
            value: 4,
            label: 'Bulgaria (BG)',
            children: [],
          },
          {
            url: '',
            value: 5,
            label: 'Croatia (HR)',
            children: [],
          },
          {
            url: '',
            value: 6,
            label: 'Czech Republic (CZ)',
            children: [],
          },
          {
            url: '',
            value: 7,
            label: 'Egypt (EG)',
            children: [],
          },
          {
            url: '',
            value: 7,
            label: 'Germany (DE)',
            children: [],
          },
          {
            url: '',
            value: 8,
            label: 'Ghana (GH)',
            children: [],
          },
          {
            url: '',
            value: 9,
            label: 'Greece (GR)',
            children: [],
          },
          {
            url: '',
            value: 10,
            label: 'Hong Kong (HK)',
            children: [],
          },
          {
            url: '',
            value: 11,
            label: 'Hong Kong(EN) (HK)',
            children: [],
          },
          {
            url: '',
            value: 12,
            label: 'Hungary (HU)',
            children: [],
          },
          {
            url: '',
            value: 13,
            label: 'Indonesia (ID)',
            children: [],
          },
          {
            url: '',
            value: 14,
            label: 'Greece (GR)',
            children: [],
          },
          {
            url: '',
            value: 15,
            label: 'Japan (JP)',
            children: [],
          },
          {
            url: '',
            value: 16,
            label: 'Jordan (JO)',
            children: [],
          },
          {
            url: '',
            value: 17,
            label: 'Kazakhstan (KZ)',
            children: [],
          },
          {
            url: '',
            value: 18,
            label: 'Kenya (KE)',
            children: [],
          },
          {
            url: '',
            value: 19,
            label: 'Korea (KR)',
            children: [],
          },
          {
            url: '',
            value: 20,
            label: 'KSA (SA)',
            children: [],
          },
          {
            url: '',
            value: 21,
            label: 'Lebanon (LB)',
            children: [],
          },
          {
            url: '',
            value: 22,
            label: 'Macedonia (MK)',
            children: [],
          },
          {
            url: '',
            value: 23,
            label: 'Malaysia (MY)',
            children: [],
          },
          {
            url: '',
            value: 24,
            label: 'Moldova (MD)',
            children: [],
          },
          {
            url: '',
            value: 25,
            label: 'Morocco (MA)',
            children: [],
          },
          {
            url: '',
            value: 26,
            label: 'New Zealand (NZ)',
            children: [],
          },
          {
            url: '',
            value: 27,
            label: 'Nigeria (NG)',
            children: [],
          },
          {
            url: '',
            value: 29,
            label: 'Pakistan (PK)',
            children: [],
          },
          {
            url: '',
            value: 30,
            label: 'Philippines (PH)',
            children: [],
          },
          {
            url: '',
            value: 31,
            label: 'Poland (PL))',
            children: [],
          },
          {
            url: '',
            value: 32,
            label: 'Romania (RO)',
            children: [],
          },
          {
            url: '',
            value: 33,
            label: 'Russia (RU)',
            children: [],
          },
          {
            url: '',
            value: 34,
            label: 'South Africa (ZA)',
            children: [],
          },
          {
            url: '',
            value: 35,
            label: 'Taiwan (TW)',
            children: [],
          },
          {
            url: '',
            value: 36,
            label: 'Tanzania (TZ)',
            children: [],
          },
          {
            url: '',
            value: 37,
            label: 'Thailand (TH)',
            children: [],
          },
          {
            url: '',
            value: 38,
            label: 'Tunisia (TN)',
            children: [],
          },
          {
            url: '',
            value: 39,
            label: 'Turkey (TR)',
            children: [],
          },
          {
            url: '',
            value: 40,
            label: 'UAE (AE)',
            children: [],
          },
          {
            url: '',
            value: 41,
            label: 'Ukrain (UA)',
            children: [],
          },
          {
            url: '',
            value: 42,
            label: 'Viet Nam (VN)',
            children: [],
          },],
          props: {
            value: 'value',
            label: 'label',
            children: 'children'
          },
        }
      },
    /*watch: {
      siteValue: function(){
        (isNaN(parseInt(this.siteValue)))?this.placeholderSplitterStatus='请先选择Site' :this.placeholderSplitterStatus='请选择';
        (isNaN(parseInt(this.splitterValue)))?this.placeholderBrandStatus='请先选择Splitter' :this.placeholderBrandStatus='请选择';
      },
      splitterValue: function(){
        (isNaN(parseInt(this.splitterValue)))?this.placeholderBrandStatus='请先选择Splitter' :this.placeholderBrandStatus='请选择';
      }
    },*/
    methods: {
      /*handleChange(value) {
         console.log(value);
      },
      handleItemChange(val) {
        console.log('active item:', val);
        this.siteList[0].children[0].children = [
          {
            value: "thinkpad.com",
            label: "thinkpad",
          },
        ]
      }*/
      changeSite(val){
        /*(isNaN(parseInt(this.siteValue)))?this.isSplitterDisabled = true :this.isSplitterDisabled = false;//更改级联选择可选择状态
        this.splitterList = this.siteList[val].children;//给splitter赋值，有接口后通过后台爬虫获得*/
        EVENTBUS.$emit('activatingSubmitButton',this.siteValue)//EVENTBUS传递参数，激活submitButton为可选择状态
        EVENTBUS.$emit('activatingTabSelect', this.siteValue)//EVENTBUS传递参数，激活tabControlSelect为可选择状态

      },
      /*changeSplitter(val){
        (isNaN(parseInt(this.splitterValue)))?this.isBrandDisabled = true :this.isBrandDisabled = false;
        this.brandList = this.splitter[val].children;//给brand赋值，有接口后通过后台爬虫获得
      },*/
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
