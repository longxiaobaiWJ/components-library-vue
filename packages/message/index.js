import Message from './src/message.vue'

Message.install = Vue => {
	Vue.component(Message.name, Message)
}

export default Message