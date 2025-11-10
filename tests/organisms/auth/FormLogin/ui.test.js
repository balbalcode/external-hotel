import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import Vuelidate from 'vuelidate'

import FormLogin from "@/components/organisms/auth/FormLogin";

const localVue = createLocalVue()
localVue.use(Vuelidate)

const mocks = {
  $utility: {
    setCookie() { },
    setErrorContextSentry() { },
    getCookie: () => "",
    getAssetUrl: () => "",
  },
  $sentry: {
    captureMessage() { }
  },
  $fire: { analytics: { setUserProperties() { } } },
  $router: { push() { } },
  $route: { query: {} }
}
const stubs = {
  'router-link': RouterLinkStub
}
let wrapper
let mocksFn = {}

describe("ui.FormLogin.vue", () => {
  beforeEach(() => {
    wrapper = shallowMount(FormLogin, { localVue, mocks, stubs: ['router-link'] })
  })
  test("[UI TEST] render FormLogin form's fields properly", async () => {
    expect(wrapper.find('#input-txt_email').exists()).toBe(true)
    expect(wrapper.find('#input-txt_password').exists()).toBe(true)
    expect(wrapper.find('#link-to_forgot').exists()).toBe(true)
    expect(wrapper.find('#btn-submit_login').exists()).toBe(true)
  })

  describe('test notification_message', () => {
    it.each([
      {
        case: "given helper.notification.type danger, should have class bg-danger",
        className: "bg-danger", type: "danger", message: "Info user gagal dimuat"
      }, {
        case: "given helper.notification.type success, should have class bg-success",
        className: "bg-success", type: "success", message: "Berhasil Masuk"
      }
    ])('$case', async ({ className, type, message }) => {
      wrapper.vm.helper.notification.type = type
      wrapper.vm.helper.notification.message = message

      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()

      const notification = wrapper.find("#notification_message")
      expect(notification.text()).toContain(message)
      expect(notification.classes(className)).toBe(true)
    })
  })
})
