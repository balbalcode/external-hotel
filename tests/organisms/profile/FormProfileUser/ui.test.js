import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuelidate from 'vuelidate'
import BootstrapVue from "bootstrap-vue"
import FormProfileUser from "@/components/organisms/profile/FormProfileUser";

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Vuelidate)

const mocks = {
  $route: { path: "/page" },
  $utility: {
    getUserId: () => "",
    getUserLoggedIn: () => ({}),
    removeLetter: () => "",
    removeSpace: () => "",
    removeSymbols: () => "",
    removeNumber: () => "",
    convertToNumber: () => "",
    convertToRupiah: () => "",
    setUpperCaseLetter: () => "",
    mergeBaseAssetUrl: () => "",
    setErrorContextSentry() { },
    setCookie() { }
  },
}

let wrapper
let mocksFn = {}

describe("ui.FormProfileUser.vue", () => {
  beforeEach(() => {
    mocksFn = {}
    mocksFn['processGetData'] = jest.spyOn(FormProfileUser.methods, 'processGetData').mockImplementation()
    wrapper = shallowMount(FormProfileUser, { localVue, mocks })
  })

  // Somehow, input-image-group can't be rendered
  test("render FormProfileUser form's fields properly", () => {
    const fieldName = wrapper.findComponent({ ref: "form-profile__name" })
    expect(fieldName.exists()).toBeTruthy()

    const fieldEmail = wrapper.findComponent({ ref: "form-profile__email" })
    expect(fieldEmail.exists()).toBeTruthy()

    const fieldPhone = wrapper.findComponent({ ref: "form-profile__phone" })
    expect(fieldPhone.exists()).toBeTruthy()

    const fieldPicture = wrapper.findComponent({ ref: "form-profile__picture" })
    expect(fieldPicture.exists()).toBeTruthy()
  })

  test("render and get profile, then cancel edit profile", async () => {
    let mock = {
      id: "mock-id",
      email: "mock-email",
      name: "mock-name",
      username: "mock-username",
      profile_picture: "mock-profile_picture_path",
      phone: "mock-phone",
      is_disabled: false
    }
    await jest.spyOn(wrapper.vm, "processGetData").mockResolvedValue()
    wrapper.vm.formatFormData(mock)
    wrapper.find('#input-form-profile__name').setValue('test-update-name')
    wrapper.find('#form-profile__btn-cancel').trigger('click')
    wrapper.vm.formatFormData(mock)
    const expected_result = {
      email: "mock-email",
      name: "mock-name",
      phone: "mock-phone",
      profile_picture: "mock-profile_picture_path",
    }
    expect(wrapper.vm.form.email).toEqual(expected_result.email)
    expect(wrapper.vm.form.name).toEqual(expected_result.name)
    expect(wrapper.vm.form.phone).toEqual(expected_result.phone)
  })

  test("trigger click on form-profile__btn-cancel, should call processGetData", async () => {
    wrapper.vm.processGetData = mocksFn['processGetData'] = jest.fn()

    const btn = wrapper.findComponent({ ref: "form-profile__btn-cancel" })
    await btn.trigger("click")

    expect(mocksFn['processGetData'].mock.calls).toEqual([[]])
  })

  test("trigger click on form-profile__btn-submit, should call processSubmitForm", async () => {
    wrapper.vm.processSubmitForm = mocksFn['processSubmitForm'] = jest.fn()

    wrapper.vm.helper.is_loading = false
    await wrapper.vm.$nextTick()

    const btn = wrapper.findComponent({ ref: "form-profile__btn-submit" })
    await btn.trigger("click")

    expect(mocksFn['processSubmitForm'].mock.calls).toEqual([[]])
  })
})
