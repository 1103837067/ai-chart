import { Ref } from "vue";
import { type message } from "../type";
import { type MessageApi } from 'naive-ui'
async function get_chart_data(msg:message[] ,res:Ref<string>,nMessage:MessageApi) {

  try {
    const response = await fetch("https://genapi.exuils.com" , {
        mode: 'cors',
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: msg ,pass: localStorage.getItem("pass") }),
    });


    if (!response.ok) {
        // get response data
     
        nMessage.error(`${await response.text()},或密码错误`);
        
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.body; // 正确地读取响应体作为文本

    if (data) {
      // 流式化打印
      const reader = data.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        
        const result = decoder.decode(value,{stream:true});
        const regex = /data: \{"response":"(.*?)","p":"/;

        const match = result.match(regex);
        if (match) {
          //   赋值
          res.value += match[1];
        }
        if (done) break;

        
      }
    }
  } catch (error) {
    
    console.error("get_chart_data Error:", error);
  }
}




export { get_chart_data };
