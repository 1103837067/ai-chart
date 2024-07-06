<template>
    <div class="chartCol w-full h-auto p-3 box-border flex flex-row justify-end">
              
        <div style="min-width: 40px; box-sizing: border-box;">

        </div>

        <n-card class="chartCol-content mx-3 w-auto  shadow-md rounded-xl bg-green-500" content-style="padding:0">
            <v-md-preview :text="message"/>
        </n-card>

        <div>
            <n-avatar round size="large">
                <n-icon size="50" color="none">
                    <HappySharp class=""/>
                </n-icon>
            </n-avatar>
        </div>

      
    </div>
  
</template>

<script setup lang="ts">

import { HappySharp } from '@vicons/ionicons5'
defineProps(['message'])

</script>

<style scoped>
@keyframes fadeIn {
  from {
    scale: 0;
    opacity: 0;
    transform: translateX(-60px);
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
  
  