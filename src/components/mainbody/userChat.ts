
import { ref } from 'vue';
import { type message } from '../../type';

const chatsession = ref<message[]>([
{ role: "system", content: "You are a friendly assistant" },
])

export { chatsession };