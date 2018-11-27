<template>
<el-row style="width:100%;position:absolute;bottom:0;">
  <el-col :span="24">
    <el-row>
      <el-col :span="24">
      <el-tabs type="border-card" class="keyset-tab">
        <el-tab-pane v-for="itempanel in keyset">

          <span slot="label">
          <i :class="itempanel.icon"></i> {{ $t('keyset')[itempanel.lang] }}
          </span>

          <div v-for="itemline in itempanel.keys">
            <el-button v-for="itemkey in itemline.linekeys" round class="key-btn" :class="itemkey.Class" :icon="itemkey.Icon">
              <span v-if="!itemkey.Icon">{{ itemkey.Name }}</span>
            </el-button>
          </div>

        </el-tab-pane>
      </el-tabs>
      </el-col>
    </el-row>
    <el-row>
      <div class="keyset-foot">
        <el-form :inline="true" size="mini">
          <el-form-item label="">
            <el-radio-group v-model="system">
              <el-radio-button label="Win">
                <i class="el-icon-date"></i>
              </el-radio-button>
              <el-radio-button label="Mac">
                <i class="el-icon-setting"></i>
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="组合功能">
            <el-select v-model="combkeysel" placeholder="请选择">
              <el-option
                v-for="item in combkeys.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="+">
            <el-input v-model="curkey" placeholder="请点选按键" disabled style="width:8rem"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button>设置<i class="el-icon-download el-icon--right"></i></el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
  </el-col>
</el-row>
</template>

<style>
.keyset-foot{
  background-color: rgba(1,1,1,.5);
  padding: .4vw 2vw;
}
.keyset-foot .el-form-item {
  margin-bottom: .2vw;
}
{
  background-color: rgba(1,1,1,.5);
  padding: .4vw 2vw;
}
.el-tabs__content {
  padding: 1.5vw;
  height: 17vw;
}
.el-tabs--border-card .el-tabs__content {
  padding: 1vw;
}
.el-button--mini.is-round {
  padding: .6vw .8vw;
}
.key-btn.el-button--danger {
    color: #f00;
    border-color: #f00;
}
.key-btn{
  width: 3.5vw;
  padding: .6vw 1vw;
}
.key-btn.l125{
  width: 4.375vw;
}
.key-btn.l150{
  width: 5.5vw;
}
.key-btn.l175{
  width: 6.625vw;
}
.key-btn.l200{
  width: 7.5vw;
}
.key-btn.l225{
  width: 8.375vw;
}
.key-btn.l250{
  width: 4vw;
}
.key-btn.l275{
  width: 10.625vw;
}
.key-btn.l300{
  width: 11.5vw;
}
.key-btn.l625{
  width: 26.125vw;
}
.key-btn.hide{
  visibility:hidden;
}
.key-btn.noedit{
  width: 8.375vw;
  cursor: not-allowed;
  color: #888;
}
.keyset-tab .el-button {
  margin-left: .5vw;
  margin-bottom: .4vw;
}
.keyset-tab .el-button.pad150 {
  margin-left: 2.5vw;
}
</style>

<script>
import keysetdata from '~/config/keyset.js'
import combinekeydata from '~/config/combkeys.js'
export default {
  data () {
    return {
      keyset: keysetdata,
      scale: 0.8,
      system: 'Win',
      sizeForm: '',
      curkey: 'A',
      combkeys: combinekeydata,
      combkeysel: combinekeydata.selected
    }
  },
  computed: {
    showkeymap: function(){
      let scale = this.scale;
      let showkeymapdata = [];
      for(let i=0;i<this.keymap.length;i++){
        let tempkeydata = JSON.parse(JSON.stringify(this.keymap[i]));
        tempkeydata.Position.Top = this.keymap[i].Position.Top * scale;
        tempkeydata.Position.Left = this.keymap[i].Position.Left * scale;
        tempkeydata.Position.Width = this.keymap[i].Position.Width * scale;
        tempkeydata.Position.Height = this.keymap[i].Position.Height * scale;
        showkeymapdata.push(tempkeydata);
      }
      return showkeymapdata;
    }
  },
  methods: {
    
  }
}
</script>