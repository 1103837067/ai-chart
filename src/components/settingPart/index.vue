<template>
  <n-modal :show="canshow">
    <n-card

      class=" flex"
      style="width: 600px"
      size="huge"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
    <div class=" flex flex-row">
        <n-input 
      type="password" 
      show-password-on="click"
      placeholder="请输入密码" 
      :on-input="savepass"
      v-model:value="passinputvalue"
      @keypress.enter="closeModel"
      />
      <n-button 
      class=" ml-3"
       type="primary"
      @click="closeModel"
      :disabled="passinputvalue ? false  : true"
      >
        完成
      </n-button>
    </div>
      
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const passinputvalue = localStorage.getItem("pass") ? ref(localStorage.getItem("pass")) : ref("")
const canshow = passinputvalue.value ? ref(false) : ref(true)

console.log(passinputvalue.value)

const openSetting
 = () => {
  canshow.value = true
}

const closeModel = () => {
    if (passinputvalue.value) {
      canshow.value = false
    } else {
      canshow.value = true
    }
}

const savepass
 = () => {
  console.log(passinputvalue.value)
  localStorage.setItem("pass", passinputvalue.value as string)
}



// 暴露ref method
defineExpose({
  openSetting
})

</script>

<style scoped>
</style>
  
  