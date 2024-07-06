import { Ref } from "vue";
import { type message } from "../type";


async function get_chart_data(msg:message[] ,res:Ref<string>) {
  try {
    const response = await fetch("/api" , {
        
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            
        },
        body: JSON.stringify({ msg: msg ,pass: "1078955910" }),
    });

    console.log({ message: msg ,pass: "chart" });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.body; // 正确地读取响应体作为文本

    if (data) {
      // 流式化打印
      const reader = data.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const result = decoder.decode(value);
        const regex = /data: \{"response":"(.*?)","p":".*/;

        const match = result.match(regex);
        if (match) {
          //   赋值
            res.value += match[1];
        }

        
      }
    }
  } catch (error) {
      console.error("get_chart_data Error:", error);
  }
}




export { get_chart_data };
