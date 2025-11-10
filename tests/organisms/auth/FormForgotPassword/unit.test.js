import { mount, createLocalVue } from "@vue/test-utils";
import { login } from "@/tests/mocks/auth"
import Vuelidate from 'vuelidate'
import BootstrapVue from "bootstrap-vue"
import FormForgotPassword from "@/components/organisms/auth/FormForgotPassword";

let wrapper
const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Vuelidate)

describe("unit.FormForgotPassword.vue", () => {
  beforeEach(() => {
    wrapper = mount(FormForgotPassword, { localVue })
  })

  test("[UNIT] setPayloadForgot returns proper payload", () => {
    wrapper.vm.form.email = login.email
    expect(wrapper.vm.setPayloadForgot()).toEqual({ email: login.email })
  })

  test("[UNIT] toggleLoadingButton turns over button.submit_button.is_showed and button.loading_button.is_showed", () => {
    wrapper.vm.toggleLoadingButton()
    expect(wrapper.vm.button.submit_button.is_showed).toBeFalsy()
    expect(wrapper.vm.button.loading_button.is_showed).toBeTruthy()

    wrapper.vm.toggleLoadingButton()
    expect(wrapper.vm.button.submit_button.is_showed).toBeTruthy()
    expect(wrapper.vm.button.loading_button.is_showed).toBeFalsy()
  })

  test("[UNIT] processForgotNotification changes helper.notification properly", () => {
    const success_notif = { type: "success", message: "Berhasil" }
    wrapper.vm.processForgotNotification(success_notif.type, success_notif.message)
    expect(wrapper.vm.helper.notification).toEqual(success_notif)

    const failed_notif = { type: "danger", message: "Gagal" }
    wrapper.vm.processForgotNotification(failed_notif.type, failed_notif.message)
    expect(wrapper.vm.helper.notification).toEqual(failed_notif)
  })

  test("[UNIT] processToLogin redirect to login page", () => {
    let mocksFn = { routerPush: jest.fn() }
    wrapper.vm.$router = { push: mocksFn.routerPush }

    wrapper.vm.processToLogin()
    expect(mocksFn.routerPush).toHaveBeenCalled()
    expect(mocksFn.routerPush.mock.lastCall).toEqual(['/login'])
  })
})

describe("unit.FormForgotPassword.vue", () => {
  let mocksFn = {}
  beforeEach(() => {
    mocksFn['processResetPassword'] = jest.fn()
    mocksFn['toggleLoadingButton'] = jest.fn()
    wrapper = mount(FormForgotPassword, { localVue })
    wrapper.vm.processResetPassword = mocksFn['processResetPassword']
    wrapper.vm.toggleLoadingButton = mocksFn['toggleLoadingButton']
  })

  test("[UNIT] processSubmitForm with empty data", async () => {
    await wrapper.vm.processSubmitForm()

    expect(wrapper.vm.form.is_submitted).toBeTruthy()
    expect(mocksFn['processResetPassword']).not.toHaveBeenCalled();
    expect(mocksFn['toggleLoadingButton'].mock.calls.length).toEqual(2);
  })

  test("[UNIT] processSubmitForm with valid data", async () => {
    wrapper.vm.form.email = login.email
    await wrapper.vm.processSubmitForm()

    expect(wrapper.vm.form.is_submitted).toBeTruthy()
    expect(mocksFn['processResetPassword']).toHaveBeenCalled();
    expect(mocksFn['toggleLoadingButton'].mock.calls.length).toEqual(2);
  })
})

describe("unit.FormForgotPassword.vue", () => {
  let mocksFn = {}
  beforeEach(() => {
    mocksFn['setPayloadForgot'] = jest.fn().mockReturnValue({ email: login.email })
    mocksFn['processForgotNotification'] = jest.fn()
    mocksFn['processRejectReset'] = jest.fn()
    wrapper = mount(FormForgotPassword, { localVue })
    wrapper.vm.setPayloadForgot = mocksFn['setPayloadForgot']
    wrapper.vm.processForgotNotification = mocksFn['processForgotNotification']
    wrapper.vm.processRejectReset = mocksFn['processRejectReset']
  })

  test("[UNIT] processResetPassword with success response", async () => {
    wrapper.vm.forgot = jest.fn().mockReturnValue({ message: "Sukses" })

    await wrapper.vm.processResetPassword()
    expect(mocksFn['processForgotNotification']).toHaveBeenCalled()
    expect(mocksFn['processForgotNotification'].mock.lastCall).toEqual(['success', 'Sukses'])
    expect(mocksFn['processRejectReset']).not.toHaveBeenCalled()
  })

  test("[UNIT] processResetPassword with error response", async () => {
    let error = new Error("Gagal")
    error.status = 400
    wrapper.vm.forgot = jest.fn().mockRejectedValueOnce(error)

    await wrapper.vm.processResetPassword()
    expect(mocksFn['processForgotNotification']).not.toHaveBeenCalled()
    expect(mocksFn['processRejectReset']).toHaveBeenCalled()
    expect(mocksFn['processRejectReset'].mock.lastCall).toEqual([error])
  })
})

describe("unit.FormForgotPassword.vue", () => {
  let mocksFn = {}
  beforeEach(() => {
    mocksFn['processForgotNotification'] = jest.fn()
    wrapper = mount(FormForgotPassword, { localVue })
    wrapper.vm.processForgotNotification = mocksFn['processForgotNotification']
  })

  test("[UNIT] processRejectReset with error from response", () => {
    const response = { status: 400, data: { data: { message: "Gagal" } } }
    wrapper.vm.processRejectReset(response)
    expect(mocksFn['processForgotNotification']).toHaveBeenCalled()
    expect(mocksFn['processForgotNotification'].mock.lastCall).toEqual(['error', response.data.message])
  })

  test("[UNIT] processRejectReset with error without status", () => {
    const response = { data: { data: { message: "Gagal" } } }
    wrapper.vm.processRejectReset(response)
    expect(mocksFn['processForgotNotification']).toHaveBeenCalled()
    expect(mocksFn['processForgotNotification'].mock.lastCall).toEqual(['error', "Gagal terhubung ke server"])
  })

  test("[UNIT] processRejectReset with undefined error", () => {
    wrapper.vm.processRejectReset()
    expect(mocksFn['processForgotNotification']).toHaveBeenCalled()
    expect(mocksFn['processForgotNotification'].mock.lastCall).toEqual(['error', "Gagal terhubung ke server"])
  })
})
