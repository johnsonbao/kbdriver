<template>
  <el-row>
    <el-col :span="24" style="padding:.5rem;">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="1">

          <template slot="title">
            &nbsp;&nbsp;&nbsp;
            <i class="header-icon el-icon-document"></i> {{$t('macro.macro_setting_title')}}
          </template>

          <el-input placeholder="请输入内容" v-model="schfilter" class="input-with-select" size="mini">
            <el-select v-model="macrofilter" slot="prepend" placeholder="选择">
              <el-option label="全部" value="0"></el-option>
              <el-option label="简单" value="1"></el-option>
              <el-option label="组合" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-table :data="filtermacrolist" :show-header="false" border v-loading="loading" :height="height" size="mini" highlight-current-row @current-change="handleCurrentChange">
            <el-table-column>
              <template slot-scope="scope">
                <i class="el-icon-question"></i>
                <span style="margin-left: 10px">{{ scope.row.Name }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-button icon="el-icon-refresh" :loading="false">更新宏</el-button>
          <el-button icon="el-icon-check" :loading="false">应用宏</el-button>
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
        macrofilter: '',
        activeName: '1',
        filtermacrolist: []
      }
    },
    props: ['height','macrolist'],
    created:function(){ 
      this.filtermacrolist = this.macrolist;
      var _this = this;
      setTimeout(function(){_this.loading = false;},500);
    },
    watch: {
      schfilter: function(val, oldVal){
        this.filtermacrolist = this.macrolist.filter( item => (~item.Name.indexOf(val)));
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