import { mount, createLocalVue } from "@vue/test-utils";
import Vuelidate from 'vuelidate'
import BootstrapVue from "bootstrap-vue"
import FormResetPassword from "@/components/organisms/auth/FormResetPassword";
import { query_reset_password } from "./mock";

const localVue = createLocalVue()

localVue.use(BootstrapVue)
localVue.use(Vuelidate)


let wrapper

jest.setTimeout(30000);

describe("ui.FormResetPassword.vue", () => {
    describe("with filled id query and token  condition", () => {
        var mockFn = {}
        beforeEach(() => {
            mockFn['processToLogin'] = jest.spyOn(FormResetPassword.methods, "processCheckToken").mockImplementation()
            wrapper = mount(FormResetPassword, {
                localVue,
                mocks: {
                    $route: {
                        query: {
                            token: query_reset_password.token,
                            id: query_reset_password.id,
                            email: query_reset_password.email
                        }
                    },
                    $router: { push() { } },
                    $utility: { getAssetUrl: () => "" },
                },
                stubs: ["router-link"]
            })
        })

        test("[UI TEST] render FormResetPassword form's fields properly", () => {
            expect(wrapper.vm.form.email).toEqual(query_reset_password.email)
            expect(wrapper.vm.form.id).toEqual(query_reset_password.id)
            expect(wrapper.vm.form.token).toEqual(query_reset_password.token)
            expect(wrapper.find('#input-txt_email').exists()).toBe(true)
            expect(wrapper.find('#input-txt_password').exists()).toBe(true)
            expect(wrapper.find('#input-txt_re_password').exists()).toBe(true)
            expect(wrapper.find('#btn-submit_reset').exists()).toBe(true)
            expect(wrapper.find('#btn-cancel_reset').exists()).toBe(true)
        })

        test("[UI TEST] render FormResetPassword then submit blank", async () => {
            wrapper.vm.form.is_submitted = true
            wrapper.find('#input-txt_password').setValue('')
            wrapper.find('#input-txt_re_password').setValue('')
            await wrapper.vm.$v.form.$touch()
            await wrapper.vm.$v.form.$touch()
            await wrapper.vm.$nextTick()
            await wrapper.vm.$nextTick()
            await wrapper.vm.$nextTick()
            console.log(wrapper.html())
            expect(wrapper.find("#error-label-error-list-txt_password-0").html()).toContain("Kata sandi tidak boleh kosong")
            expect(wrapper.find("#error-label-error-list-txt_re_password-0").html()).toContain("Konfirmasi Kata sandi tidak boleh kosong")
        })

        test("[UI TEST] render FormResetPassword then submit 4 character", async () => {
            wrapper.vm.form.is_submitted = true
            wrapper.find('#input-txt_password').setValue('1234')
            wrapper.find('#input-txt_re_password').setValue('1234')
            await wrapper.vm.$v.form.$touch()
            await wrapper.vm.$v.form.$touch()
            await wrapper.vm.$nextTick()
            expect(wrapper.find("#error-label-error-list-txt_re_password-1").html()).toContain("Konfirmasi kata sandi harus berisi minimal 8 karakter")
            expect(wrapper.find("#error-label-error-list-txt_password-1").html()).toContain("Kata sandi harus berisi minimal 8 karakter")
        })

        test("[UI TEST] render FormResetPassword then dissimilar password and re password", async () => {
            wrapper.vm.form.is_submitted = true
            wrapper.find('#input-txt_password').setValue('12345678')
            wrapper.find('#input-txt_re_password').setValue('123456789')
            await wrapper.vm.$v.form.$touch()
            await wrapper.vm.$v.form.$touch()
            await wrapper.vm.$nextTick()
            expect(wrapper.find("#error-label-error-list-txt_re_password-2").html()).toContain("Kata sandi konfirmasi tidak sama")
        })


        test("[UI TEST] click button cancel reset", () => {
            wrapper.find('#btn-cancel_reset').trigger('click')
            expect(mockFn['processToLogin']).toHaveBeenCalled()
        })
    })

    describe("with blank token query and id condition", () => {
        beforeEach(() => {
            wrapper = mount(FormResetPassword, {
                localVue,
                mocks: {
                    $route: {
                        query: {}
                    },
                    $utility: { getAssetUrl: () => "" },
                },
                $router: { push() { } },
                stubs: ["router-link"]
            })
        })

        test("[UI TEST] click button cancel reset", () => {
            expect(wrapper.html()).toContain("Kami gagal memuat halaman ini, mohon buka kembali laman dari email anda")
        })
    })

})
