<template>
<el-row type="flex">
  <el-col :span="9" align="left">
    {{ $t('common.soft_version') }}: {{ appconf.version }} | 
    {{ $t('common.release_date') }}: {{ appconf.releaseDate }}
  </el-col>
  <el-col :span="6" align="center">
    {{ appconf.appName }}
  </el-col>
  <el-col :span="9" align="right">
    ©{{ appconf.copyright }} | 
    {{ $t('common.powered_by') }}:{{ appconf.poweredBy }}
  </el-col>
</el-row>
</template>

<style scoped>
  .el-row{
    padding-left: 1em;
    padding-right: 1em;
  }
</style>

<script>
  import appconf from '~/config/app'
  export default {
    data () {
      return {
        appconf: appconf
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>