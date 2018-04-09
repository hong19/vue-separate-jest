import { shallow } from 'vue-test-utils'
import Separate from './resources/Separate'

test('processes separate vue component', () => {
  const wrapper = shallow(Separate)
  expect(wrapper.is('div')).toBe(true)
  expect(wrapper.classes()[0]).toBe('text-center')
})
