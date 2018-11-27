<style>
  @import './assets/css/base.css'
</style>
<template>
  <div id="app">
    <el-container>
      <el-header id="cms_header">
        <el-row>
          <el-col :span="5">
            <img class="logo" src="./assets/img/logo.png"/>
          </el-col>

          <el-col :span="15" class="menu">
            <cms-menu></cms-menu>
          </el-col>

          <el-col :span="4">
            <div class="settings">
              <el-dropdown trigger="click" class='international' @command="handleSetLanguage">
                <div>
                  <span class="el-dropdown-link">
                  {{language}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="cn">中文</el-dropdown-item>
                  <el-dropdown-item command="en">English</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <i class="el-icon-more-outline" @click="dialogVisible=true"></i>
              <i class="el-icon-remove-outline" @click="handleMiniWin"></i>
              <i class="el-icon-circle-close" @click="handleCloseWin"></i>
            </div>
          </el-col>
        </el-row>
      </el-header>

      <el-main id="mainbox">
      <transition name="el-zoom-in-bottom">
        <router-view></router-view>
      </transition>
      </el-main>

      <el-footer id="cms_footer" height="2rem">
        <cms-foot></cms-foot>
      </el-footer>

    </el-container>

    <el-dialog :visible.sync="dialogVisible" width="50%" :before-close="handleSettingClose" icon="el-icon-circle-close">
      <template slot="title">
        <i class="header-icon el-icon-info"></i> {{ $t('common.setting') }}
      </template> 
      <cms-setting></cms-setting>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="dialogVisible = true">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NavMenu from '~/components/Menu'
import Footer from '~/components/Footer'
import Setting from '~/components/Setting'
export default {
  data() {
    return {
      language: '',
      dialogVisible: false
    }
  },
  components: {
    'cms-menu': NavMenu,
    'cms-foot': Footer,
    'cms-setting': Setting
  },
  mounted () {
    const _lang = localStorage.lang || 'cn'
    this.getLanguage(_lang)
  },
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 2000,
        position: 'bottom-right'
      })
    },
    handleSetLanguage (lang) {
      this.$i18n.locale = lang
      localStorage.setItem('lang', lang)
      this.getLanguage(lang)
    },
    getLanguage (val) {
      if (val === 'cn') {
        this.language = '中文'
      }
      if (val === 'en') {
        this.language = 'English'
      }
    },
    handleSettingClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleMiniWin(done) {
      this.$notify({
        title: '窗口最小化了!',
        type: 'success',
        duration: 800,
        position: 'bottom-right'
      });
    },
    handleCloseWin(done) {
      this.$notify({
        title: '窗口关闭了!',
        type: 'success',
        duration: 800,
        position: 'bottom-right'
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
}
</style>
