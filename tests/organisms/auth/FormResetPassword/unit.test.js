import { shallowMount, createLocalVue } from "@vue/test-utils";
import { query_reset_password, form_reset_password, payload_check_token, payload_reset } from "./mock"
import Vuelidate from 'vuelidate'
import BootstrapVue from "bootstrap-vue"
import FormResetPassword from "@/components/organisms/auth/FormResetPassword";

let wrapper
const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Vuelidate)

const mocks = {
  $route: { query: {} },
  $router: {
    push: () => { }
  },
  $utility: {
    getAssetUrl: () => "",
  }
}

let mocksFn = {}

describe("unit.FormResetPassword.vue", () => {
  beforeEach(async  () => {
    mocksFn["processExistingToken"] = jest.spyOn(FormResetPassword.methods, "processExistingToken").mockImplementation()
    wrapper = shallowMount(FormResetPassword, { localVue, mocks })
    await wrapper.vm.$nextTick()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it("test mount lifecycle, should call processExistingToken", () => {
    expect(mocksFn['processExistingToken']).toHaveBeenCalled()
  })

  it("once setPayloadCheckToken called, should return proper payload to check token", () => {
    wrapper.vm.form.token = query_reset_password.token
    wrapper.vm.form.email = query_reset_password.email
    wrapper.vm.form.id = query_reset_password.id

    const actual_payload = wrapper.vm.setPayloadCheckToken()
    expect(actual_payload).toEqual(payload_check_token)
  })

  it("once setPayloadReset called, should return proper payload to reset password", () => {
    wrapper.vm.form.password = form_reset_password.password
    wrapper.vm.form.token = form_reset_password.token
    wrapper.vm.form.email = form_reset_password.email
    wrapper.vm.form.id = form_reset_password.id

    const actual_payload = wrapper.vm.setPayloadReset()
    expect(actual_payload).toEqual(payload_reset)
  })

  it("once toggleLoadingButton called, should toggle value of button.submit_button.is_showed and button.loading_button.is_showed", () => {
    wrapper.vm.toggleLoadingButton()

    expect(wrapper.vm.button.submit_button.is_showed).toBe(false)
    expect(wrapper.vm.button.loading_button.is_showed).toBe(true)

    wrapper.vm.toggleLoadingButton()

    expect(wrapper.vm.button.submit_button.is_showed).toBe(true)
    expect(wrapper.vm.button.loading_button.is_showed).toBe(false)
  })

  it("test processExistingToken with query, should set form and call processCheckToken", async () => {
    wrapper.vm.processCheckToken = mocksFn['processCheckToken'] = jest.fn()

    // restore processExistingToken before testing
    mocksFn['processExistingToken'].mockRestore()
    wrapper.vm.processExistingToken = FormResetPassword.methods.processExistingToken

    wrapper.vm.$route.query = query_reset_password
    await wrapper.vm.$nextTick()

    wrapper.vm.processExistingToken()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.form.token).toEqual(query_reset_password.token)
    expect(wrapper.vm.form.id).toEqual(query_reset_password.id)
    expect(wrapper.vm.form.email).toEqual(query_reset_password.email)
    expect(mocksFn['processCheckToken']).toHaveBeenCalled()
  })

  it("test processExistingToken without query, should set helper.error_token", async () => {
    // restore processExistingToken before testing
    mocksFn['processExistingToken'].mockRestore()
    wrapper.vm.processExistingToken = FormResetPassword.methods.processExistingToken

    wrapper.vm.$route.query = {}
    await wrapper.vm.$nextTick()

    wrapper.vm.processExistingToken()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.helper.error_token.status).toEqual(true)
    expect(wrapper.vm.helper.error_token.message).toMatch("Kami gagal memuat halaman ini, mohon buka kembali laman dari email anda")
  })

  it("once processCheckToken called, should call setPayloadCheckToken and checkToken", async () => {
    wrapper.vm.toggleLoadingButton = mocksFn['toggleLoadingButton'] = jest.fn()
    wrapper.vm.setPayloadCheckToken = mocksFn['setPayloadCheckToken'] =
      jest.fn().mockReturnValueOnce(payload_check_token)
    wrapper.vm.checkToken = mocksFn['checkToken'] = jest.fn()

    await wrapper.vm.processCheckToken()

    expect(mocksFn['toggleLoadingButton'].mock.calls).toEqual([[], []])
    expect(mocksFn['setPayloadCheckToken'].mock.calls).toEqual([[]])
    expect(mocksFn['checkToken'].mock.calls).toEqual([[payload_check_token]])
    expect(wrapper.vm.helper.error_token.status).toEqual(false)
    expect(wrapper.vm.helper.error_token.message).toEqual("")
  })

  describe('test processSubmitForm', () => {
    it.each([
      {
        case: "given invalid form, shouldn't call processResetPassword", invalid: true,
        fnMocked: { processResetPassword: { calls: [] } }
      }, {
        case: "given invalid form, should call processResetPassword", invalid: false,
        fnMocked: { processResetPassword: { calls: [[]] } }
      }
    ])('$case', async ({ invalid, fnMocked }) => {
      wrapper.vm.toggleLoadingButton = mocksFn['toggleLoadingButton'] = jest.fn()
      wrapper.vm.processResetPassword = mocksFn['processResetPassword'] = jest.fn()
      mocksFn['$v.form.$touch'] = jest.spyOn(wrapper.vm.$v.form, '$touch').mockImplementation()
      jest.spyOn(wrapper.vm.$v.form, '$invalid', 'get').mockReturnValueOnce(invalid)

      await wrapper.vm.processSubmitForm()

      expect(wrapper.vm.form.is_submitted).toBe(true)
      expect(mocksFn['toggleLoadingButton'].mock.calls).toEqual([[], []])
      expect(mocksFn['processResetPassword'].mock.calls).toEqual(fnMocked['processResetPassword'].calls)
      expect(mocksFn['$v.form.$touch'].mock.calls).toEqual([[]])
    })
  })

  it("once processResetPassword called, should call setPayloadReset, reset and processForgotNotification", async () => {
    wrapper.vm.setPayloadReset = mocksFn['setPayloadReset'] = jest.fn().mockReturnValueOnce(payload_reset)
    wrapper.vm.reset = mocksFn['reset'] = jest.fn()
    wrapper.vm.processForgotNotification = mocksFn['processForgotNotification'] = jest.fn()

    await wrapper.vm.processResetPassword()

    expect(mocksFn['setPayloadReset'].mock.calls).toEqual([[]])
    expect(mocksFn['reset'].mock.calls).toEqual([[payload_reset]])
    expect(mocksFn['processForgotNotification'].mock.calls)
      .toEqual([["success", "Perubahan password berhasil, silahkan login untuk melanjutkan"]])
  })

  it("once processForgotNotification called, should set helper.notification", () => {
    wrapper.vm.processForgotNotification("error", "Terjadi Kesalahan")

    expect(wrapper.vm.helper.notification.type).toEqual("error")
    expect(wrapper.vm.helper.notification.message).toEqual("Terjadi Kesalahan")
  })

  it("once processToLogin called, should call $router.push('/login')", () => {
    wrapper.vm.$router.push = mocksFn['$router.push'] = jest.fn()
    wrapper.vm.processToLogin()
    expect(mocksFn['$router.push'].mock.calls).toEqual([['/login']])
  })
})
