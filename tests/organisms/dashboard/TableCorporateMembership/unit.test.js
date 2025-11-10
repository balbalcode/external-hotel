import { shallowMount, createLocalVue } from "@vue/test-utils";
import page from "@/components/organisms/dashboard/TableCorporateMembership";
import BootstrapVue from "bootstrap-vue";
import { result_api } from "./mock";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

let wrapper;
const mocks = {
  $utility: {
    findConstantData: () => ({}),
    fireToast: () => ({}),
    getAssetUrl: () => "",
    setErrorContextSentry: () => "",
  },
  $sentry: {
    captureMessage() {},
  },
};

let mocksFn = {};

describe("ui.TableCorporateMembership", () => {
  beforeEach(async () => {
    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: `corporate='{"id":"60376185-xxx","name":"pasar seni","npwp":"1212.1021-1.2123.1","spot_id":"61c22d4f-xxx","spot_name":"archies sudirman"}'`,
    });
    mocksFn = {};
    wrapper = shallowMount(page, { localVue, mocks });
    await wrapper.vm.$nextTick();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("test watcher is_searching with value true, should call function passUpdatePagination", async () => {
    wrapper.vm.passUpdatePagination = mocksFn["passUpdatePagination"] =
      jest.fn();
    wrapper.setProps({
      is_searching: true,
    });
    await wrapper.vm.$nextTick();
    expect(mocksFn["passUpdatePagination"]).toHaveBeenCalled();
  });
  test("test watcher is_searching with value false, shouldnt call function passUpdatePagination", async () => {
    wrapper.vm.passUpdatePagination = mocksFn["passUpdatePagination"] =
      jest.fn();
    wrapper.setProps({
      is_searching: false,
    });
    await wrapper.vm.$nextTick();
    expect(mocksFn["passUpdatePagination"]).not.toHaveBeenCalled();
  });

  test("test function passErrorToParent, should emit error based on function arguments and state true", async () => {
    wrapper.vm.passErrorToParent("mocked");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("error")).toBeDefined();
    expect(wrapper.emitted("error")[0][0]).toEqual({
      state: true,
      message: "mocked",
    });
  });

  test("test function passEditToParent, should emit error based on function arguments and state true", async () => {
    wrapper.vm.passEditToParent("mocked");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("edit")).toBeDefined();
    expect(wrapper.emitted("edit")[0][0]).toEqual("mocked");
  });

  test("test function passCancelToParent, should emit error based on function arguments and state true", async () => {
    wrapper.vm.modal.modal_delete = true;
    wrapper.vm.modal.modal_activate = true;
    await wrapper.vm.$nextTick();
    wrapper.vm.passCancelToParent("mocked");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("cancel")).toBeDefined();
    expect(wrapper.vm.modal.modal_delete).toEqual(false);
    expect(wrapper.vm.modal.modal_activate).toEqual(false);
  });

  test("test function passDeleteToParent, should emit delete and has argument based on function arguments", async () => {
    wrapper.vm.passDeleteToParent("mocked");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("delete")).toBeDefined();
    expect(wrapper.emitted("delete")[0][0]).toEqual("mocked");
  });

  test("test function passActivateToParent, should emit aactivate and has argument based on function arguments", async () => {
    wrapper.vm.passActivateToParent("mocked");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("activate")).toBeDefined();
    expect(wrapper.emitted("activate")[0][0]).toEqual("mocked");
  });

  test("test function toggleModalDelete, should set value moda.modal_delete to opposite value", async () => {
    wrapper.vm.modal.modal_delete = true;
    await wrapper.vm.$nextTick();
    wrapper.vm.toggleModalDelete();
    expect(wrapper.vm.modal.modal_delete).toEqual(false);
  });

  test("test function passUpdatePagination, should set value pagination.current_page based on function arguments and calls function processGetData", async () => {
    wrapper.vm.processGetData = mocksFn["processGetData"] = jest.fn();
    wrapper.vm.passUpdatePagination("mocked");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.pagination.current_page).toEqual("mocked");
    expect(mocksFn["processGetData"]).toHaveBeenCalled();
  });

  test("test function setPayloadGet with has filter name, should return payload corporate, blank pagination and pagination", async () => {
    const expected_payload = {
      corporate_id: "60376185-xxx",
      filter: [{ key: "name", value: "mocked-name!" }],
      pagination: {
        page: 1,
        per_page: 10,
      },
    };
    wrapper.setProps({
      filter: {
        name: "mocked-name!",
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.pagination.current_page = expected_payload.pagination.page;
    wrapper.vm.pagination.per_page = expected_payload.pagination.per_page;
    const actual_payload = wrapper.vm.setPayloadGet();
    await wrapper.vm.$nextTick();
    expect(actual_payload).toEqual(expected_payload);
  });

  test("test function setPayloadGet with has filter status, should return payload corporate, blank pagination and pagination", async () => {
    const expected_payload = {
      corporate_id: "60376185-xxx",
      filter: [{ key: "activate_status", value: "Y" }],
      pagination: {
        page: 1,
        per_page: 10,
      },
    };
    wrapper.setProps({
      corporate: {
        value: expected_payload.corporate_id,
      },
      filter: {
        status: ["Y"],
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.pagination.current_page = expected_payload.pagination.page;
    wrapper.vm.pagination.per_page = expected_payload.pagination.per_page;
    const actual_payload = wrapper.vm.setPayloadGet();
    await wrapper.vm.$nextTick();
    expect(actual_payload).toEqual(expected_payload);
  });

  test("test function setPayloadGet with hasnt filter name, should return payload corporate, blank pagination and pagination", async () => {
    const expected_payload = {
      corporate_id: "60376185-xxx",
      filter: [],
      pagination: {
        page: 1,
        per_page: 10,
      },
    };
    wrapper.setProps({
      corporate: {
        value: expected_payload.corporate_id,
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.pagination.current_page = expected_payload.pagination.page;
    wrapper.vm.pagination.per_page = expected_payload.pagination.per_page;
    const actual_payload = wrapper.vm.setPayloadGet();
    await wrapper.vm.$nextTick();
    expect(actual_payload).toEqual(expected_payload);
  });

  test("test function setPayloadActivate, should return value id based on props selected", async () => {
    const expected_payload = {
      id: "mocked-selected-id",
      activate_status: true,
    };
    wrapper.setProps({
      selected: {
        id: expected_payload.id,
        status: !expected_payload.activate_status,
      },
    });
    await wrapper.vm.$nextTick();
    const actual_payload = wrapper.vm.setPayloadActivate();
    expect(actual_payload).toEqual(expected_payload);
  });

  test("test function setPayloadDelete, should return value id based on props selected", async () => {
    const expected_payload = {
      id: "mocked-selected-id",
      corporate_id: "60376185-xxx",
    };
    wrapper.setProps({
      selected: {
        id: expected_payload.id,
      },
      corporate: {
        value: expected_payload.corporate_id,
      },
    });
    await wrapper.vm.$nextTick();
    const actual_payload = wrapper.vm.setPayloadDelete();
    expect(actual_payload).toEqual(expected_payload);
  });

  test("test function toggleModalActivate, should set modal.modal_activate to opposite value", async () => {
    wrapper.vm.modal.modal_activate = true;
    wrapper.vm.toggleModalActivate();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.modal.modal_activate).toEqual(false);
  });
  test("test function toggleModalDelete, should set modal.modal_delete to opposite value", async () => {
    wrapper.vm.modal.modal_delete = true;
    wrapper.vm.toggleModalDelete();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.modal.modal_delete).toEqual(false);
  });

  test("test function processGetData with normal condition, should call function setPayloadGet and getCorporateMembership alse set value data and pagination total data based on api result then emitted ready", async () => {
    wrapper = {};
    wrapper = shallowMount(page, { localVue, mocks });
    wrapper.vm.setPayloadGet = mocksFn["setPayloadGet"] = jest.fn();
    wrapper.vm.getCorporateMembership = mocksFn["getCorporateMembership"] = jest
      .fn()
      .mockResolvedValue(result_api);
    wrapper.vm.passErrorToParent = mocksFn["passErrorToParent"] = jest.fn();
    wrapper.vm.$utility.setErrorContextSentry = mocksFn[
      "setErrorContextSentry"
    ] = jest.fn();
    wrapper.vm.$sentry.captureMessage = mocksFn["captureMessage"] = jest.fn();
    wrapper.vm.processGetData();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(mocksFn["setPayloadGet"]).toHaveBeenCalled();
    expect(mocksFn["getCorporateMembership"]).toHaveBeenCalled();
    expect(mocksFn["passErrorToParent"]).not.toHaveBeenCalled();
    expect(mocksFn["setErrorContextSentry"]).not.toHaveBeenCalled();
    expect(mocksFn["captureMessage"]).not.toHaveBeenCalled();
    expect(wrapper.emitted("ready")).toBeDefined();
    expect(wrapper.vm.data).toEqual(result_api.values);
    expect(wrapper.vm.pagination.total_data).toEqual(result_api.total_values);
    expect(wrapper.vm.helper.is_loading).toEqual(false);
  });

  test("test function processGetData with bad condition, should call function passErrorToParent, setErrorContextSentry and captureMessage", async () => {
    wrapper = {};
    wrapper = shallowMount(page, { localVue, mocks });
    wrapper.vm.setPayloadGet = mocksFn["setPayloadGet"] = new Error();
    wrapper.vm.getCorporateMembership = mocksFn["getCorporateMembership"] =
      new Error();
    wrapper.vm.passErrorToParent = mocksFn["passErrorToParent"] = jest.fn();
    wrapper.vm.$utility.setErrorContextSentry = mocksFn[
      "setErrorContextSentry"
    ] = jest.fn();
    wrapper.vm.$sentry.captureMessage = mocksFn["captureMessage"] = jest.fn();
    wrapper.vm.processGetData();
    await wrapper.vm.$nextTick();
    expect(mocksFn["passErrorToParent"]).toHaveBeenCalled();
    expect(mocksFn["setErrorContextSentry"]).toHaveBeenCalled();
    expect(mocksFn["captureMessage"]).toHaveBeenCalled();
    expect(wrapper.emitted("ready")).toBeDefined();
    expect(wrapper.vm.helper.is_loading).toEqual(false);
    expect(wrapper.vm.data).toEqual([]);
    expect(wrapper.vm.helper.is_error).toEqual(true);
    expect(wrapper.vm.pagination.total_data).toEqual(0);
  });

  test("test function processDeleteData with normal condition, should call function processGetData setPayloadDelete and deleteCorporateMembership", async () => {
    wrapper.vm.processGetData = mocksFn["processGetData"] = jest.fn();
    wrapper.vm.setPayloadDelete = mocksFn["setPayloadDelete"] = jest.fn();
    wrapper.vm.deleteCorporateMembership = mocksFn[
      "deleteCorporateMembership"
    ] = jest.fn();
    wrapper.vm.passErrorToParent = mocksFn["passErrorToParent"] = jest.fn();
    wrapper.vm.$utility.setErrorContextSentry = mocksFn[
      "setErrorContextSentry"
    ] = jest.fn();
    wrapper.vm.$sentry.captureMessage = mocksFn["captureMessage"] = jest.fn();
    wrapper.vm.toggleModalDelete = mocksFn["toggleModalDelete"] = jest.fn();
    wrapper.vm.processDeleteData();
    await wrapper.vm.$nextTick();
    expect(mocksFn["processGetData"]).toHaveBeenCalled();
    expect(mocksFn["setPayloadDelete"]).toHaveBeenCalled();
    expect(mocksFn["deleteCorporateMembership"]).toHaveBeenCalled();
    expect(mocksFn["toggleModalDelete"]).toHaveBeenCalled();
    expect(mocksFn["passErrorToParent"]).not.toHaveBeenCalled();
    expect(mocksFn["setErrorContextSentry"]).not.toHaveBeenCalled();
    expect(mocksFn["captureMessage"]).not.toHaveBeenCalled();
    expect(wrapper.vm.helper.is_loading).toEqual(false);
  });

  test("test function processDeleteData with bad condition, should call function passErrorToParent, setErrorContextSentry and captureMessage", async () => {
    wrapper.vm.processGetData = mocksFn["processGetData"] = new Error();
    wrapper.vm.setPayloadDelete = mocksFn["setPayloadDelete"] = new Error();
    wrapper.vm.deleteCorporateMembership = mocksFn[
      "deleteCorporateMembership"
    ] = new Error();
    wrapper.vm.passErrorToParent = mocksFn["passErrorToParent"] = jest.fn();
    wrapper.vm.$utility.setErrorContextSentry = mocksFn[
      "setErrorContextSentry"
    ] = jest.fn();
    wrapper.vm.$sentry.captureMessage = mocksFn["captureMessage"] = jest.fn();
    wrapper.vm.processDeleteData();
    await wrapper.vm.$nextTick();
    expect(mocksFn["passErrorToParent"]).toHaveBeenCalled();
    expect(mocksFn["setErrorContextSentry"]).toHaveBeenCalled();
    expect(mocksFn["captureMessage"]).toHaveBeenCalled();
    expect(wrapper.vm.modal.modal_delete).toEqual(false);
    expect(wrapper.vm.helper.is_loading).toEqual(false);
  });

  test("test function processActivateData with normal condition, should call function processGetData setPayloadActivate and activateCorporateMembership", async () => {
    wrapper.vm.processGetData = mocksFn["processGetData"] = jest.fn();
    wrapper.vm.toggleModalActivate = mocksFn["toggleModalActivate"] = jest.fn();
    wrapper.vm.setPayloadActivate = mocksFn["setPayloadActivate"] = jest.fn();
    wrapper.vm.activateCorporateMembership = mocksFn[
      "activateCorporateMembership"
    ] = jest.fn();
    wrapper.vm.passErrorToParent = mocksFn["passErrorToParent"] = jest.fn();
    wrapper.vm.$utility.setErrorContextSentry = mocksFn[
      "setErrorContextSentry"
    ] = jest.fn();
    wrapper.vm.$sentry.captureMessage = mocksFn["captureMessage"] = jest.fn();
    wrapper.vm.processActivateData();
    await wrapper.vm.$nextTick();
    expect(mocksFn["processGetData"]).toHaveBeenCalled();
    expect(mocksFn["setPayloadActivate"]).toHaveBeenCalled();
    expect(mocksFn["activateCorporateMembership"]).toHaveBeenCalled();
    expect(mocksFn["toggleModalActivate"]).toHaveBeenCalled();
    expect(mocksFn["passErrorToParent"]).not.toHaveBeenCalled();
    expect(mocksFn["setErrorContextSentry"]).not.toHaveBeenCalled();
    expect(mocksFn["captureMessage"]).not.toHaveBeenCalled();
    expect(wrapper.vm.helper.is_loading).toEqual(false);
  });

  test("test function processActivateData with bad condition, should call function passErrorToParent, setErrorContextSentry and captureMessage", async () => {
    wrapper.vm.processGetData = mocksFn["processGetData"] = new Error();
    wrapper.vm.setPayloadActivate = mocksFn["setPayloadActivate"] = new Error();
    wrapper.vm.activateCorporateMembership = mocksFn[
      "activateCorporateMembership"
    ] = new Error();
    wrapper.vm.passErrorToParent = mocksFn["passErrorToParent"] = jest.fn();
    wrapper.vm.$utility.setErrorContextSentry = mocksFn[
      "setErrorContextSentry"
    ] = jest.fn();
    wrapper.vm.$sentry.captureMessage = mocksFn["captureMessage"] = jest.fn();
    wrapper.vm.processActivateData();
    await wrapper.vm.$nextTick();
    expect(mocksFn["passErrorToParent"]).toHaveBeenCalled();
    expect(mocksFn["setErrorContextSentry"]).toHaveBeenCalled();
    expect(mocksFn["captureMessage"]).toHaveBeenCalled();
    expect(wrapper.vm.modal.modal_delete).toEqual(false);
    expect(wrapper.vm.helper.is_loading).toEqual(false);
  });
});
