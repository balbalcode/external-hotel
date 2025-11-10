import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuelidate from 'vuelidate'
import BootstrapVue from "bootstrap-vue"
import FormProfileUser from "@/components/organisms/profile/FormProfileUser";
import { data_get, form_after_update, form_before_update, payload_get, payload_update, user_cookie_after, user_cookie_before } from "./mock";
import { expect } from "@jest/globals";

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
    setErrorContextSentry() { },
    setCookie() { },
    mergeBaseAssetUrl: () => ""
  },
}

let wrapper
let mocksFn = {}

describe("unit.FormProfileUser.vue", () => {
  beforeEach(() => {
    mocksFn = {}
    mocksFn['processGetData'] = jest.spyOn(FormProfileUser.methods, 'processGetData').mockImplementation()
    wrapper = shallowMount(FormProfileUser, { localVue, mocks })
    process.env = {
      BASE_ASSET_URL: "API.XXX.YYY",
      ASSET_URL: "ASSETS.XXX.YYY",
      PRIMARY_COLOR: "#FFFFFF"
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  test("test mounted lifecycle, should call processGetData", () => {
    expect(mocksFn['processGetData'].mock.calls).toEqual([[]])
  })

  describe('test validations', () => {
    describe("form.email", () => {
      it.each([
        {
          case: "given empty, $v.form.email.required=false, $v.form.email.email=true and $v.form.email.$error=true",
          email: "", validation: { required: false, email: true, $error: true }
        },
        {
          case: "given filled with invalid email format, $v.form.email.required=true, $v.form.email.email=false and $v.form.email.$error=true",
          email: "Alexander", validation: { required: true, email: false, $error: true }
        },
        {
          case: "given filled with valid email format, $v.form.email.required=true, $v.form.email.email=true and $v.form.email.$error=false",
          email: "alexander@hahahihi.com", validation: { required: true, email: true, $error: false }
        }
      ])('$case', ({ email, validation }) => {
        wrapper.vm.form.email = email
        wrapper.vm.$v.form.email.$touch()

        expect(wrapper.vm.$v.form.email.required).toBe(validation.required)
        expect(wrapper.vm.$v.form.email.email).toBe(validation.email)
        expect(wrapper.vm.$v.form.email.$error).toBe(validation.$error)
      })
    })

    describe("form.name", () => {
      it.each([
        {
          case: "given empty, $v.form.name.required=false and $v.form.name.$error=true",
          name: "", required: false, $error: true
        },
        {
          case: "given filled, $v.form.name.required=true and $v.form.name.$error=false",
          name: "Alexander", required: true, $error: false
        }
      ])('$case', ({ name, required, $error }) => {
        wrapper.vm.form.name = name
        wrapper.vm.$v.form.name.$touch()

        expect(wrapper.vm.$v.form.name.required).toBe(required)
        expect(wrapper.vm.$v.form.name.$error).toBe($error)
      })
    })

    describe("form.phone", () => {
      it.each([
        {
          case: "given empty, $v.form.phone.required=false and $v.form.phone.$error=true",
          phone: "", required: false, $error: true
        },
        {
          case: "given filled, $v.form.phone.required=true and $v.form.phone.$error=false",
          phone: "081234567890", required: true, $error: false
        }
      ])('$case', ({ phone, required, $error }) => {
        wrapper.vm.form.phone = phone
        wrapper.vm.$v.form.phone.$touch()

        expect(wrapper.vm.$v.form.phone.required).toBe(required)
        expect(wrapper.vm.$v.form.phone.$error).toBe($error)
      })
    })
  })

  test("once passErrorToParent called, should emit error", () => {
    const error = { message: "Terjadi Kesalahan" }
    wrapper.vm.passErrorToParent(error)

    expect(wrapper.emitted("error")).toEqual([[{ state: true, message: error }]])
  })

  test("once setPayloadGet called, should return proper payload for getting data", () => {
    wrapper.vm.$utility.getUserId = mocksFn['$utility.getUserId'] = jest.fn().mockReturnValueOnce(payload_get.id)
    let result = wrapper.vm.setPayloadGet()
    expect(result).toEqual(payload_get)
    expect(mocksFn['$utility.getUserId'].mock.calls).toEqual([[]])
  })

  test("once setPayloadUpdate called, should return proper payload for updating data", async () => {
    wrapper.vm.form = { ...form_after_update }
    await wrapper.vm.$nextTick()

    let result = wrapper.vm.setPayloadUpdate()
    expect(result).toEqual(payload_update)
  })

  test("once formatFormData called, should set form", () => {
    wrapper.vm.formatFormData(data_get)

    expect(wrapper.vm.form).toEqual(form_before_update)
  })

  it("test toggleButtonSubmit, should toggle submit & loading button visibility", () => {
    wrapper.vm.toggleButtonSubmit()
    expect(wrapper.vm.helper.is_loading).toBeTruthy()

    wrapper.vm.toggleButtonSubmit()
    expect(wrapper.vm.helper.is_loading).toBeFalsy()
  })

  describe("test function processSubmitForm", () => {
    it.each([
      {
        case: "given invalid form, shouldn't call processUpdateData", invalid: true,
        fnMocked: { processUpdateData: { calls: [] } }
      }, {
        case: "given valid form, should call processUpdateData", invalid: false,
        fnMocked: { processUpdateData: { calls: [[]] } }
      }
    ])('$case', async ({ invalid, fnMocked }) => {
      wrapper.vm.toggleButtonSubmit = mocksFn['toggleButtonSubmit'] = jest.fn()
      wrapper.vm.processUpdateData = mocksFn['processUpdateData'] = jest.fn()
      mocksFn['$v.form.$touch'] = jest.spyOn(wrapper.vm.$v.form, '$touch').mockImplementation()
      jest.spyOn(wrapper.vm.$v.form, '$invalid', 'get').mockReturnValueOnce(invalid)

      await wrapper.vm.processSubmitForm()

      expect(mocksFn['toggleButtonSubmit'].mock.calls).toEqual([[], []])
      expect(mocksFn['$v.form.$touch'].mock.calls).toEqual([[]])
      expect(mocksFn['processUpdateData'].mock.calls).toEqual(fnMocked['processUpdateData'].calls)
    })
  })

  test("once processGetData called, should call setPayloadGet, getProfile and formatFormData", async () => {
    wrapper.vm.setPayloadGet = mocksFn['setPayloadGet'] = jest.fn().mockReturnValueOnce(payload_get)
    wrapper.vm.getProfile = mocksFn['getProfile'] = jest.fn().mockReturnValueOnce(data_get)
    wrapper.vm.formatFormData = mocksFn['formatFormData'] = jest.fn()

    // restore processGetData
    mocksFn['processGetData'].mockRestore()
    wrapper.vm.processGetData = FormProfileUser.methods.processGetData

    await wrapper.vm.processGetData()

    expect(mocksFn['setPayloadGet'].mock.calls).toEqual([[]])
    expect(mocksFn['getProfile'].mock.calls).toEqual([[payload_get]])
    expect(mocksFn['formatFormData'].mock.calls).toEqual([[data_get]])
  })

  it("test processUpdateCookie, should update cookie 'user'", async () => {
    wrapper.vm.$utility.getUserLoggedIn = mocksFn['$utility.getUserLoggedIn'] = jest.fn()
      .mockReturnValueOnce(user_cookie_before)
    wrapper.vm.$utility.setCookie = mocksFn['$utility.setCookie'] = jest.fn()

    wrapper.vm.form = { ...form_after_update }
    wrapper.vm.$nextTick()

    wrapper.vm.processUpdateCookie()

    expect(mocksFn['$utility.getUserLoggedIn'].mock.calls).toEqual([[]])
    expect(mocksFn['$utility.setCookie'].mock.calls).toEqual([["user", user_cookie_after]])
  })

  it("once processUpdateData called, should call setPayloadUpdate, updateProfile and processUpdateCookie", async () => {
    wrapper.vm.setPayloadUpdate = mocksFn['setPayloadUpdate'] = jest.fn().mockReturnValueOnce(payload_update)
    wrapper.vm.updateProfile = mocksFn['updateProfile'] = jest.fn()
    wrapper.vm.processUpdateCookie = mocksFn['processUpdateCookie'] = jest.fn()

    await wrapper.vm.processUpdateData()

    expect(mocksFn['setPayloadUpdate'].mock.calls).toEqual([[]])
    expect(mocksFn['updateProfile'].mock.calls).toEqual([[payload_update]])
    expect(mocksFn['processUpdateCookie'].mock.calls).toEqual([[]])
  })
})
