<template>
  <div class="chartCol w-full h-auto p-3 box-border flex flex-row">
    <div>
      <n-avatar round size="large" class="">
        <n-icon class=" text-gray-800 " size="50">
          <LogoOctocat/>
        </n-icon>
      </n-avatar>
    </div>
    

    <n-card class="chartCol-content mx-3 w-auto  shadow-md rounded-xl" content-style="padding:0">
      <MdPreview :modelValue="message" style="border-radius: 10px;"/>
    </n-card>

    <div style="min-width: 40px; box-sizing: border-box;">

    </div>
  </div>

</template>

<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { LogoOctocat } from '@vicons/ionicons5'
 defineProps(['message'])

</script>

<style scoped>
@keyframes fadeIn {
  from {
    scale: 0;
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    scale: 1;
    opacity: 1;
    transform: translateX(0);
  }
}

.chartCol-content {
  animation: fadeIn 0.2s ease-out forwards;
}
</style>

