import message from '../src/message.vue'
import { mount } from '@vue/test-utils'

describe('lg-message', () => {
	test('should-compare', () => {
		const wrapper = mount(message)
		expect(wrapper.html()).toContain('lg-message')
	})
})
