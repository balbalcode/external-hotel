import {mount, createLocalVue} from "@vue/test-utils";
import Vuelidate from 'vuelidate'
import BootstrapVue from "bootstrap-vue"
import FormForgotPassword from "@/components/organisms/auth/FormForgotPassword";

const localVue = createLocalVue()

localVue.use(BootstrapVue)
localVue.use(Vuelidate)


let wrapper

jest.setTimeout(30000);

describe("ui.FormForgotPassword.vue", () => {
    var mockFn = {}
    beforeEach(() => {
        mockFn['processToLogin'] = jest.spyOn(FormForgotPassword.methods, "processToLogin").mockImplementation()
        wrapper = mount(FormForgotPassword, {
            localVue,
            mocks: {
                $route: {query: null},
                $utility: {getCookie: () => false},
            },
            stubs: ["router-link"]
        })
    })

    test("[UI TEST] render FormForgotPassword form's fields properly", () => {
        expect(wrapper.find('#input-txt_email').exists()).toBe(true)
        expect(wrapper.find('#btn-submit_forgot').exists()).toBe(true)
        expect(wrapper.find('#btn-cancel_forgot').exists()).toBe(true)
    })

    test("[UI TEST] render FormForgotPassword with error alert", async () => {
        wrapper.vm.helper.notification.type = "error"
        wrapper.vm.helper.notification.message = "error!"
        await wrapper.vm.$nextTick()
        expect(wrapper.find('#error-alert_forgot').classes()).toContain("bg-danger")
        expect(wrapper.find('#error-alert_forgot').exists()).toBe(true)
        expect(wrapper.find('#error-alert_forgot').html()).toContain("error!")
    })

    test("[UI TEST] render FormForgotPassword with success ", async () => {
        wrapper.vm.helper.notification.type = "success"
        wrapper.vm.helper.notification.message = "success!"
        await wrapper.vm.$nextTick()
        expect(wrapper.find('#success-alert_forgot').classes()).toContain("bg-success")
        expect(wrapper.find('#success-alert_forgot').exists()).toBe(true)
        expect(wrapper.find('#success-alert_forgot').html()).toContain("success!")
    })

    test("[UI TEST] render then submit blank email", async () => {
        wrapper.find('#input-txt_email').setValue('')
        wrapper.vm.$v.form.email.$touch()
        wrapper.vm.form.is_submitted = true
        await wrapper.vm.$nextTick()
        expect(wrapper.find('#input-txt_email').classes()).toEqual(expect.arrayContaining(["form-control", "is-invalid"]));
    })

    test("[UI TEST] render then submit wrong email", async () => {
        wrapper.find('#input-txt_email').setValue('johndoe')
        wrapper.vm.$v.form.email.$touch()
        wrapper.vm.form.is_submitted = true
        await wrapper.vm.$nextTick()
        expect(wrapper.find('#input-txt_email').classes()).toEqual(expect.arrayContaining(["form-control", "is-invalid"]));
    })

    test("[UI TEST] render then submit correct email", async () => {
        wrapper.find('#input-txt_email').setValue('john@doe.com')
        wrapper.vm.$v.form.email.$touch()
        wrapper.vm.form.is_submitted = true
        await wrapper.vm.$nextTick()
        expect(wrapper.find('#input-txt_email').classes()).toEqual(expect.arrayContaining(["form-control"]));
    })

    test("[UI TEST] click button cancel forgot", () => {
        wrapper.find('#btn-cancel_forgot').trigger('click')
        expect(mockFn['processToLogin']).toHaveBeenCalled()
    })
})
