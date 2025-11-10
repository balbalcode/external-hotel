import {mount, createLocalVue} from "@vue/test-utils";
import Vuelidate from 'vuelidate'
import BootstrapVue from "bootstrap-vue"
import FormPasswordUser from "@/components/organisms/profile/FormPasswordUser";

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Vuelidate)

const mocks = {}

let wrapper

jest.setTimeout(30000);

describe("ui.FormPasswordUser.vue", () => {
    beforeEach(() => {
        wrapper = mount(FormPasswordUser, {localVue, mocks})
    })

    test("[UI TEST] render FormPasswordUser form's fields properly", () => {
        expect(wrapper.find('#input-txt_old_password').exists()).toBe(true)
        expect(wrapper.find('#input-txt_new_password').exists()).toBe(true)
        expect(wrapper.find('#input-txt_re_password').exists()).toBe(true)
        expect(wrapper.find('#btn-cancel_change').exists()).toBe(true)
        expect(wrapper.find('#btn-change_password').exists()).toBe(true)
    })


})
