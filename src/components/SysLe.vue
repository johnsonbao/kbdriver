<template>
  <el-row>
    <el-col :span="18">
      <div class="grid-content bg-purple">
        <el-button @click="startHacking" size="mini">Start</el-button>
        <el-tooltip placement="top" effect="light">
        <div slot="content">多行信息<br/>第二行信息<button>dddddd</button></div>
        <el-button @click="show3 = !show3" size="mini">Start</el-button>
        </el-tooltip>
        <el-radio-group v-model="radio10" size="mini">
          <el-radio :label="1">备选项1</el-radio>
          <el-radio :label="2">备选项2</el-radio>
        </el-radio-group>
        <el-checkbox v-model="checked">备选项</el-checkbox>
        <el-input placeholder="请输入内容" v-model="input1" class="input-with-select" size="mini">
          <el-select v-model="lefilter" slot="prepend" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
            <el-option label="简单灯效" value="1"></el-option>
            <el-option label="组合灯效" value="2"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>

      </div>
    </el-col>
    
    <el-col :span="6" style="padding-right:.5rem;">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="1">

          <template slot="title">
            &nbsp;&nbsp;&nbsp;
            <i class="header-icon el-icon-menu"></i> {{$t('le.le_setting_title')}}
          </template>
          <el-input placeholder="请输入内容" v-model="schfilter" class="input-with-select" size="mini">
            <el-select v-model="lefilter" slot="prepend" placeholder="选择">
              <el-option label="全部" value="0"></el-option>
              <el-option label="简单" value="1"></el-option>
              <el-option label="组合" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          </el-input>
          <el-table :data="filterlelist" :show-header="false" border v-loading="loading" height="400" size="mini" highlight-current-row @current-change="handleCurrentChange">
            <el-table-column>
              <template slot-scope="scope">
                <i class="el-icon-question"></i>
                <span style="margin-left: 10px">{{ scope.row.lename }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-button icon="el-icon-refresh" :loading="false">更新灯效</el-button>
          <el-button icon="el-icon-check" :loading="false">应用灯效</el-button>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>

<style>
.el-collapse-item__content {
  padding-bottom: .4rem;
}
.el-table{
  margin-bottom: .4rem; 
}
.el-input-group__prepend{
  width: 3rem;
}
</style>

<script>
  export default {
    data () {
      return {
        loading: true,
        schfilter: '',
        input1: '',
        lefilter: '',
        show3: true,
        checked: true,
        radio10: 2,
        activeName: '1',
        filterlelist: [],
        lelist: [{
            lename: '灯效名称1............'
          }, {
            lename: '灯效名称2............'
          }, {
            lename: '灯效名称3............'
          }, {
            lename: '灯效名称2............'
          }, {
            lename: '灯效名称3............'
          }, {
            lename: '灯效名称2............'
          }, {
            lename: '灯效名称3............'
          }, {
            lename: '灯效名称2............'
          }, {
            lename: '灯效名称3............'
          }, {
            lename: '灯效名称2............'
          }, {
            lename: '灯效名称3............'
          }, {
            lename: '灯效名称2............'
          }, {
            lename: '灯效名称3............'
          }, {
            lename: '灯效名称2............'
          }, {
            lename: '灯效名称3............'
          }, {
            lename: '灯效名称2............'
          }, {
            lename: '灯效名称3............'
          }
        ],
        macrolist: [{
            lename: '宏名称.....................1518'
          }, {
            lename: '宏名称.....................1518'
          }, {
            lename: '宏名称.....................1518'
        }]
      }
    },
    created:function(){ 
      this.filterlelist = this.lelist;
      var _this = this;
      setTimeout(function(){_this.loading = false;},800);
      
    },
    watch: {
      schfilter: function(val, oldVal){
        this.filterlelist = this.lelist.filter( item => (~item.lename.indexOf(val)));
      }
    },
    methods: {
      startHacking () {
        this.$notify({
          title: 'It works!',
          type: 'success',
          message: 'It\'s time for you to build something epic!',
          duration: 2000,
          position: 'bottom-right'
        })
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
  }
</script>