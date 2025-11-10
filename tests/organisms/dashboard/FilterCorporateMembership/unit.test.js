import { shallowMount, createLocalVue } from "@vue/test-utils";
import page from "@/components/organisms/dashboard/FilterCorporateMembership";
import BootstrapVue from "bootstrap-vue";
import Vuelidate from "vuelidate";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuelidate);

let wrapper;
const mocks = {
  $utility: {
    formatOptionsSelect: () => ({}),
    setErrorContextSentry: () => ({}),
  },
  $sentry: {
    captureMessage() {},
  },
};

let mocksFn = {};

describe("unit.FilterCorporateMembership", () => {
  beforeEach(() => {
    wrapper = shallowMount(page, { localVue, mocks });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("test watcher is searching, should set value helper is loading based on is searching", async () => {
    wrapper.setProps({
      is_searching: "mocked!",
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.helper.is_loading).toEqual("mocked!");
  });

  test("test function passErrorToParent, should emit error based on function arguments", async () => {
    wrapper.vm.passErrorToParent("mocked");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("error")).toBeDefined();
    expect(wrapper.emitted("error")[0][0]).toEqual("mocked");
  });

  test("test function passUpdateToParent, should emit error based on function arguments", async () => {
    wrapper.vm.form = "mocked";
    wrapper.vm.passUpdateToParent();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("updated")).toBeDefined();
    expect(wrapper.emitted("updated")[0][0]).toEqual("mocked");
  });

  test("test function processClearFilter, should set reset form from initialize value", async () => {
    const expected_payload = wrapper.vm.form;
    wrapper.vm.form = {
      name: "mocked",
      status: ["Y"],
      is_submitted: false,
    };
    wrapper.vm.processClearFilter();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.form).toEqual(expected_payload);
  });

  test("test function processSubmitForm with passed validation should call function passUpdateToParent", async () => {
    wrapper.vm.form.name = "mocked";
    mocksFn["$v.form.$touch"] = jest.spyOn(wrapper.vm.$v.form, "$touch");
    wrapper.vm.passUpdateToParent = mocksFn["passUpdateToParent"] = jest.fn();
    mocksFn["$v.form.$invalid"] = jest
      .spyOn(wrapper.vm.$v.form, "$invalid", "get")
      .mockReturnValueOnce(false);
    wrapper.vm.processSubmitForm();
    await wrapper.vm.$nextTick();
    expect(mocksFn["passUpdateToParent"]).toHaveBeenCalled();
    expect(wrapper.vm.form.is_submitted).toBeTruthy();
  });

  test("test function processSubmitForm with not passed validation should call function passUpdateToParent", async () => {
    mocksFn["$v.form.$touch"] = jest.spyOn(wrapper.vm.$v.form, "$touch");
    wrapper.vm.passUpdateToParent = mocksFn["passUpdateToParent"] = jest.fn();
    mocksFn["$v.form.$invalid"] = jest
      .spyOn(wrapper.vm.$v.form, "$invalid", "get")
      .mockReturnValueOnce(true);
    wrapper.vm.processSubmitForm();
    await wrapper.vm.$nextTick();
    expect(mocksFn["passUpdateToParent"]).not.toHaveBeenCalled();
    expect(wrapper.vm.form.is_submitted).toBeTruthy();
  });
});
