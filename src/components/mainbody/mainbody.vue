<template>
  <div
    class="content flex flex-col grow h-full min-w-96 w-3/4 border m-3 rounded-lg border-slate-100 shadow-lg text-gray-400 p-3 overflow-hidden"
  >
    <n-card
      content-style=" justify-content: center; align-items: center; display: flex; "
    >
      标题
    </n-card>
    <div class="chatView h-full overflow-hidden" style="">
      <n-scrollbar ref="myScrollbar" id="scrollbar">
        <div
          v-if="chatsession.length === 0"
          class="flex justify-center items-center mt-32"
        >
          <n-empty description="还没有聊天内容哦~">
            <template #extra> </template>
          </n-empty>
        </div>
        <div v-for="item in chatsession" :key="item.length">
          <component
            :is="item.role === 'user' ? userCard : item.role === 'assistant' ? messageCard : null"
            :message="item.content"
          ></component>
        </div>
      </n-scrollbar>
    </div>
    <div class="sendbar">
      <n-divider style="margin: 0" />
      <div class="flex flex-row p-2">
        <n-input
          clearable
          @keypress.enter="handleKeyDown"
          @focus="scrollToBottom"
          v-model:value="sendtext"
          type="textarea"
          placeholder="输入提示词"
          :autosize="{
            minRows: 1,
            maxRows: 8,
          }"
          class="w-full"
        />
        <n-button
          class="ml-2"
          @click="send"
          type="primary"
          :disabled="sendtext.length === 0"
          >发送
          <n-icon class="ml-2">
            <Send />
          </n-icon>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Send } from "@vicons/ionicons5";
import messageCard from "./messageCard.vue";
import userCard from "./userCard.vue";
import { chatsession } from "./userChat.ts";
import { onMounted, ref } from "vue";
import { get_chart_data } from "../../common/useAi.ts";
const myScrollbar = ref(null);
const sendtext = ref("");

function scrollToBottom() {
  myScrollbar.value.scrollTo({ behavior: "smooth", top: 999999999999999999 });
}

const getChatSessionData = () => {
  const dataArray = chatsession.value.map(item => {
    // 如果content是ref，使用.value获取它的值，并转换为string
    // 如果content不是ref，直接返回它
    const content = typeof item.content === 'object' && item.content?.value !== undefined
      ? item.content.value
      : item.content;

    return {
      ...item,
      content: String(content), // 确保content是string
    };
  });

  return dataArray;
};

async function send() {
  
  const local_res = ref('')
  // console.log(parseFloat(myScrollbar.value.scrollbarInstRef.yBarSizePx.match(/[\d.]+/g)[0]))
  chatsession.value.push(
    {
      role: "user",
      content: sendtext.value,
    },
    {
      role: "assistant",
      content: local_res,
    }
  );

  get_chart_data(getChatSessionData().slice(0,-1),local_res);
  sendtext.value = "";
  
  // 异步延时1s

  setTimeout(() => {
    scrollToBottom();
  }, 0.1);
}

const handleKeyDown = (event) => {
  // 检查是否按下Enter键，且Shift键未被按下
  if (event.key === "Enter" && !event.shiftKey) {
    send(); // 触发按钮点击事件
    event.preventDefault(); // 阻止默认行为，如表单提交
  }
};
</script>

<style scoped></style>
