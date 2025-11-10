import {mount, createLocalVue} from "@vue/test-utils";
import Vuelidate from 'vuelidate'
import BootstrapVue from "bootstrap-vue"
import FormPasswordUser from "@/components/organisms/profile/FormPasswordUser";
import {profile_route} from "@/tests/mocks/routes"
import {password} from "@/tests/mocks/profile"

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Vuelidate)

const mocks =
    {
        $route: {...profile_route},
        $emit: () => jest.fn(),
        processUpdatePassword: () => jest.fn().mockResolvedValue("password updated!")
    }

let wrapper

jest.setTimeout(30000);

describe("unit.FormPasswordUser.vue", () => {
    beforeEach(() => {
        wrapper = mount(FormPasswordUser, {localVue, mocks})
    })

    test("[UNIT TEST] test function passRefreshStateParent", () => {
        let spying = jest.spyOn(wrapper.vm,  "$emit")
        wrapper.vm.passRefreshStateParent()
        expect(spying.mock.calls.length).toBe(1)
    })

    test("[UNIT TEST] test function setPayloadUpdate", () => {
        let expected_result = {
            old: password.old,
            new: password.new,
            opener: profile_route.path,
        }
        wrapper.vm.form.old_password = password.old
        wrapper.vm.form.new_password = password.new
        wrapper.vm.form.re_password = password.new
        let result = wrapper.vm.setPayloadUpdate()
        expect(result).toEqual(expected_result)
    })


    test("[UNIT TEST] test function toggleButtonSubmit", () => {
        wrapper.vm.toggleButtonSubmit()
        let expected_result = {
            state_submit_button: false,
            state_loading_button: true
        }
        expect(expected_result).toEqual({
            state_submit_button: wrapper.vm.button.submit_button.is_showed,
            state_loading_button: wrapper.vm.button.loading_button.is_showed
        })
    })

    test("[UNIT TEST] test function processSubmitForm with blank data", () => {
        let processUpdatePassword = jest.spyOn(wrapper.vm, "processUpdatePassword")
        let toggleButtonSubmit = jest.spyOn(wrapper.vm, "toggleButtonSubmit")
        processUpdatePassword.mockResolvedValue("updated!")
        wrapper.vm.processSubmitForm()
        expect(toggleButtonSubmit).toHaveBeenCalled()
        expect(processUpdatePassword.mock.calls.length).toBe(0)
    })

    test("[UNIT TEST] test function processSubmitForm with filled data", () => {
        wrapper.vm.form.old_password = password.old
        wrapper.vm.form.new_password = password.new
        wrapper.vm.form.re_password = password.new
        let processUpdatePassword = jest.spyOn(wrapper.vm, "processUpdatePassword")
        let toggleButtonSubmit = jest.spyOn(wrapper.vm, "toggleButtonSubmit")
        wrapper.vm.processSubmitForm()
        expect(toggleButtonSubmit).toHaveBeenCalled()
        expect(processUpdatePassword.mock.calls.length).toBe(1)
    })

})
