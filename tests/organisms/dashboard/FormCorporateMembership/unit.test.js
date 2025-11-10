import { shallowMount, createLocalVue } from "@vue/test-utils";
import page from "@/components/organisms/dashboard/FormCorporateMembership";
import BootstrapVue from "bootstrap-vue";
import Vuelidate from "vuelidate";
import {
  filled_form_card,
  filled_form_vehicle,
  payload_form_card,
  product_option,
  payload_card,
  payload_vehicle,
  props_edit,
  payload_create_card,
} from "./mock";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuelidate);

let wrapper;
const mocks = {
  $utility: {
    removeLetter: () => ({}),
    removeSymbols: () => ({}),
    setUpperCaseLetter: () => ({}),
    removeSpace: () => ({}),
    formatDateMoment: () => "2024-03-08 09:12:20",
    fireToast: () => ({}),
    setErrorContextSentry: () => ({}),
    findConstantData: () => ({}),
    formatOptionsSelect: () => ({}),
  },
  $sentry: {
    captureMessage() {},
  },
};

let mocksFn = {};

describe("unit.FormCorporateMembership", () => {
  beforeEach(() => {
    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: `corporate='{"id":"60376185-xxx","name":"pasar seni","npwp":"1212.1021-1.2123.1","spot_id":"61c22d4f-xxx","spot_name":"archies sudirman"}'`,
    });
    wrapper = shallowMount(page, {
      localVue,
      mocks,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("test mounted lifecycle should call function processGetProduct, toggleFormData and processCheckCorporate", () => {
    mocksFn["processGetProduct"] = jest
      .spyOn(page.methods, "processGetProduct")
      .mockImplementation();
    mocksFn["toggleFormData"] = jest
      .spyOn(page.methods, "toggleFormData")
      .mockImplementation();
    mocksFn["processCheckCorporate"] = jest
      .spyOn(page.methods, "processCheckCorporate")
      .mockImplementation();
    wrapper = shallowMount(page, { localVue, mocks });
    mocksFn["processGetProduct"].mockRestore();
    mocksFn["toggleFormData"].mockRestore();
    mocksFn["processCheckCorporate"].mockRestore();
    mocksFn = {};
  });

  test("test function passErrorToParent, should emit error based on function arguments", async () => {
    mocksFn["processGetProduct"] = jest
      .spyOn(page.methods, "processGetProduct")
      .mockImplementation();
    mocksFn["toggleFormData"] = jest
      .spyOn(page.methods, "toggleFormData")
      .mockImplementation();
    mocksFn["processCheckCorporate"] = jest
      .spyOn(page.methods, "processCheckCorporate")
      .mockImplementation();
    wrapper = shallowMount(page, { localVue, mocks });
    wrapper.vm.passErrorToParent("mocked");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("error")).toBeDefined();
    expect(wrapper.emitted("error")[0][0]).toEqual({
      state: true,
      message: "mocked",
    });
    mocksFn["processGetProduct"].mockRestore();
    mocksFn["toggleFormData"].mockRestore();
    mocksFn["processCheckCorporate"].mockRestore();
    mocksFn = {};
  });

  test("test function passCancelToParent, should emmit cancel", async () => {
    wrapper.vm.passCancelToParent();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("cancel")).toBeDefined();
  });

  test("test function passSavedToParent, should emmit saved", async () => {
    wrapper.vm.passSavedToParent();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("saved")).toBeDefined();
  });

  test("test setPayloadCreate, return payload below and call function formatDateMoment, and setPayloadMotorcycle", async () => {
    wrapper.vm.form = {
      ...filled_form_card,
      is_submitted: false,
    };
    await wrapper.vm.$nextTick();
    wrapper.vm.$utility.formatDateMoment = mocksFn["formatDateMoment"] = jest
      .fn()
      .mockReturnValue(payload_form_card.additional_data[0].value);
    wrapper.vm.setPayloadCard = mocksFn["setPayloadCard"] = jest
      .fn()
      .mockReturnValue(payload_form_card.card);
    wrapper.vm.setPayloadMotorcycle = mocksFn["setPayloadMotorcycle"] = jest
      .fn()
      .mockReturnValue(payload_form_card.motorcycle);
    const actual_payload = wrapper.vm.setPayloadCreate();
    await wrapper.vm.$nextTick();
    expect(payload_create_card).toEqual(actual_payload);
    expect(mocksFn["formatDateMoment"]).toHaveBeenCalled();
    expect(mocksFn["setPayloadCard"]).toHaveBeenCalled();
    expect(mocksFn["setPayloadMotorcycle"]).toHaveBeenCalled();
  });

  test("test setPayloadUpdate, return payload below and call function formatDateMoment, and setPayloadMotorcycle", async () => {
    wrapper.setProps({
      data: {
        id: "mocked-id",
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.form = {
      ...filled_form_card,
      is_submitted: false,
    };
    const expected_payload = {
      id: "mocked-id",
      ...payload_create_card,
    };
    wrapper.vm.$utility.formatDateMoment = mocksFn["formatDateMoment"] = jest
      .fn()
      .mockReturnValue(payload_form_card.additional_data[0].value);
    wrapper.vm.setPayloadCard = mocksFn["setPayloadCard"] = jest
      .fn()
      .mockReturnValue(payload_form_card.card);
    wrapper.vm.setPayloadMotorcycle = mocksFn["setPayloadMotorcycle"] = jest
      .fn()
      .mockReturnValue(payload_form_card.motorcycle);
    const actual_payload = wrapper.vm.setPayloadUpdate();
    await wrapper.vm.$nextTick();
    expect(expected_payload).toEqual(actual_payload);
    expect(mocksFn["formatDateMoment"]).toHaveBeenCalled();
    expect(mocksFn["setPayloadCard"]).toHaveBeenCalled();
    expect(mocksFn["setPayloadMotorcycle"]).toHaveBeenCalled();
  });

  test("test setPayloadCard when membership type is card, should should return payload below", async () => {
    wrapper.vm.corporate.membership_type = "CARD";
    await wrapper.vm.$nextTick();
    wrapper.vm.$utility.formatDateMoment = mocksFn["formatDateMoment"] = jest
      .fn()
      .mockReturnValue("2024-03-08 09:12:20");
    wrapper.vm.form = filled_form_card;
    await wrapper.vm.$nextTick();
    const actual_payload = wrapper.vm.setPayloadCard();
    await wrapper.vm.$nextTick();
    expect(payload_card).toEqual(actual_payload);
  });

  test("test setPayloadCard when membership type is license_plate, return []", async () => {
    wrapper.vm.corporate.membership_type = "LICENSE_PLATE";
    const actual_payload = wrapper.vm.setPayloadCard();
    await wrapper.vm.$nextTick();
    expect(actual_payload).toEqual({});
  });

  test("test setPayloadMotorcycle when membership type is card, should return []", async () => {
    wrapper.vm.corporate.membership_type = "CARD";
    const actual_payload = wrapper.vm.setPayloadMotorcycle();
    await wrapper.vm.$nextTick();
    expect(actual_payload).toEqual([]);
  });

  test("test setPayloadMotorcycle when membership type is license_plate, should return payload below", async () => {
    wrapper.vm.corporate.membership_type = "LICENSE_PLATE";
    wrapper.vm.form = filled_form_vehicle;
    const actual_payload = wrapper.vm.setPayloadMotorcycle();
    await wrapper.vm.$nextTick();
    expect([payload_vehicle]).toEqual(actual_payload);
  });

  test("test function setPayloadGetOptionProduct, should return value below", async () => {
    const expected_payload = {
      spot_id: "61c22d4f-xxx",
      filter: [{ key: "type", value: "CORPORATE" }],
      pagination: [
        { key: "page", value: 1 },
        { key: "per_page", value: 20 },
      ],
    };
    wrapper.vm.helper.limit_options = expected_payload.pagination[1].value;
    const actual_payload = wrapper.vm.setPayloadGetOptionProduct(
      expected_payload.pagination[0].value
    );
    await wrapper.vm.$nextTick();
    expect(expected_payload).toEqual(actual_payload);
  });

  test("test function toggleButtonSubmit", async () => {
    wrapper.vm.toggleButtonSubmit();
    await wrapper.vm.$nextTick();
    let expected_result = {
      state_submit_button: false,
      state_loading_button: true,
    };
    expect(expected_result).toEqual({
      state_submit_button: wrapper.vm.button.submit_button.is_showed,
      state_loading_button: wrapper.vm.button.loading_button.is_showed,
    });
  });

  test("test function toggleFormData with normal condition and has props edit are true, should set value from based on props and not calling function fireToast, setErrorContextSentry and captureMessage", async () => {
    const splitted_form = {
      name: "Ikbal maulana",
      email: "iam@balbalcode.cloud",
      dob: new Date("2024-03-08"),
      phone_number: "0838732162",
      vehicle: [""],
      card: {
        rf_id: "",
        card_id: "",
      },
      is_submitted: false,
    };
    wrapper.setProps({
      data: props_edit,
      is_edit: true,
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.toggleFormMembership = mocksFn["toggleFormMembership"] =
      jest.fn();
    wrapper.vm.$utility.fireToast = mocksFn["fireToast"] = jest.fn();
    wrapper.vm.$utility.setErrorContextSentry = mocksFn[
      "setErrorContextSentry"
    ] = jest.fn();
    wrapper.vm.$sentry.captureMessage = mocksFn["captureMessage"] = jest.fn();
    wrapper.vm.toggleFormData();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.form).toEqual(splitted_form);
    expect(mocksFn["toggleFormMembership"]).toHaveBeenCalled();
    expect(mocksFn["fireToast"]).not.toHaveBeenCalled();
    expect(mocksFn["captureMessage"]).not.toHaveBeenCalled();
    expect(mocksFn["setErrorContextSentry"]).not.toHaveBeenCalled();
  });

  test("test function toggleFormData with normal condition and has props edit are false, shouldnt set value from based on props and not calling function fireToast, setErrorContextSentry and captureMessage", async () => {
    wrapper.setProps({
      data: props_edit,
      is_edit: false,
    });
    wrapper.vm.toggleFormMembership = mocksFn["toggleFormMembership"] =
      jest.fn();
    wrapper.vm.$utility.fireToast = mocksFn["fireToast"] = jest.fn();
    wrapper.vm.$utility.setErrorContextSentry = mocksFn[
      "setErrorContextSentry"
    ] = jest.fn();
    wrapper.vm.$sentry.captureMessage = mocksFn["captureMessage"] = jest.fn();
    wrapper.vm.toggleFormData();
    await wrapper.vm.$nextTick();
    expect(mocksFn["toggleFormMembership"]).not.toHaveBeenCalled();
    expect(mocksFn["fireToast"]).not.toHaveBeenCalled();
    expect(mocksFn["captureMessage"]).not.toHaveBeenCalled();
    expect(mocksFn["setErrorContextSentry"]).not.toHaveBeenCalled();
  });

  test("test function toggleFormData with bad condition and has props edit are true, shouldnt set value from based on props and calling function fireToast, setErrorContextSentry and captureMessage", async () => {
    wrapper.setProps({
      is_edit: true,
      data: { mocked: true },
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.toggleFormMembership = mocksFn["toggleFormMembership"] =
      new Error();
    wrapper.vm.$utility.fireToast = mocksFn["fireToast"] = jest.fn();
    wrapper.vm.$utility.setErrorContextSentry = mocksFn[
      "setErrorContextSentry"
    ] = jest.fn();
    wrapper.vm.$sentry.captureMessage = mocksFn["captureMessage"] = jest.fn();
    wrapper.vm.toggleFormData();
    await wrapper.vm.$nextTick();
    expect(mocksFn["fireToast"]).toHaveBeenCalled();
    expect(mocksFn["captureMessage"]).toHaveBeenCalled();
    expect(mocksFn["setErrorContextSentry"]).toHaveBeenCalled();
  });

  test("test function toggleFormData with bad condition and has props edit are false, shouldnt set value from based on props and calling function fireToast, setErrorContextSentry and captureMessage", async () => {
    wrapper.setProps({
      is_edit: false,
      data: { mocked: true },
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.toggleFormMembership = mocksFn["toggleFormMembership"] =
      new Error();
    wrapper.vm.$utility.setErrorContextSentry = mocksFn[
      "setErrorContextSentry"
    ] = jest.fn();
    wrapper.vm.$sentry.captureMessage = mocksFn["captureMessage"] = jest.fn();
    wrapper.vm.$utility.fireToast = mocksFn["fireToast"] = jest.fn();
    wrapper.vm.toggleFormData();
    await wrapper.vm.$nextTick();
    expect(mocksFn["captureMessage"]).not.toHaveBeenCalled();
    expect(mocksFn["setErrorContextSentry"]).not.toHaveBeenCalled();
    expect(mocksFn["fireToast"]).not.toHaveBeenCalled();
  });

  test("test function toggleFormMembership with membership type card and only has 1 vehicle, should set form vehicle to 1 data and product based on result findConstantData", async () => {
    wrapper.vm.corporate.membership_type = "CARD";
    const mocking_data = {
      rf_id: "mocked-rf_id",
      card_id: "mocked-card_id",
      product_id: "mocked-product_id",
      license_plate: "mocked-license_plate",
      second_license_plate: "",
    };
    wrapper.setProps({
      data: {
        card: mocking_data,
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.$utility.findConstantData = mocksFn["findConstantData"] = jest
      .fn()
      .mockReturnValue("mocked-product_id");
    wrapper.vm.toggleFormMembership();
    await wrapper.vm.$nextTick();
    expect(mocksFn["findConstantData"]).toHaveBeenCalled();
    expect(wrapper.vm.form.card.rf_id).toEqual(mocking_data.rf_id);
    expect(wrapper.vm.form.card.card_id).toEqual(mocking_data.card_id);
    expect(wrapper.vm.form.product).toEqual("mocked-product_id");
    expect(wrapper.vm.form.vehicle).toEqual([mocking_data.license_plate]);
  });
  test("test function toggleFormMembership with membership type card and has 2 vehicle, should set form vehicle to 2 data and product based on result findConstantData", async () => {
    wrapper.vm.corporate.membership_type = "CARD";
    const mocking_data = {
      rf_id: "mocked-rf_id",
      card_id: "mocked-card_id",
      product_id: "mocked-product_id",
      license_plate: "mocked-license_plate",
      second_license_plate: "mocked-second_license_plate",
    };
    wrapper.setProps({
      data: {
        card: mocking_data,
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.$utility.findConstantData = mocksFn["findConstantData"] = jest
      .fn()
      .mockReturnValue("mocked-product_id");
    wrapper.vm.toggleFormMembership();
    await wrapper.vm.$nextTick();
    expect(mocksFn["findConstantData"]).toHaveBeenCalled();
    expect(wrapper.vm.form.card.rf_id).toEqual(mocking_data.rf_id);
    expect(wrapper.vm.form.card.card_id).toEqual(mocking_data.card_id);
    expect(wrapper.vm.form.product).toEqual("mocked-product_id");
    expect(wrapper.vm.form.vehicle).toEqual([
      mocking_data.license_plate,
      mocking_data.second_license_plate,
    ]);
  });
  test("test function toggleFormMembership with membership type license_plate and only has 1 vehicle, should set form vehicle to 1 data and product based on result findConstantData", async () => {
    wrapper.vm.corporate.membership_type = "LICENSE_PLATE";
    const mocking_data = [
      {
        product_id: "mocked-product_id",
        license_plate: "B1SPN",
      },
    ];
    wrapper.setProps({
      data: {
        motorcycle: mocking_data,
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.$utility.findConstantData = mocksFn["findConstantData"] = jest
      .fn()
      .mockReturnValue("mocked-product_id");
    wrapper.vm.toggleFormMembership();
    await wrapper.vm.$nextTick();
    expect(mocksFn["findConstantData"]).toHaveBeenCalled();
    expect(wrapper.vm.form.product).toEqual("mocked-product_id");
    expect(wrapper.vm.form.vehicle).toEqual([mocking_data[0].license_plate]);
  });
  test("test function toggleFormMembership with membership type license_plate and has 2 vehicle, should set form vehicle to 2 data and product based on result findConstantData", async () => {
    wrapper.vm.corporate.membership_type = "LICENSE_PLATE";
    const mocking_data = [
      {
        product_id: "mocked-product_id",
        license_plate: "B1SPN",
      },
      {
        product_id: "mocked-product_id",
        license_plate: "B2SPN",
      },
    ];
    wrapper.setProps({
      data: {
        motorcycle: mocking_data,
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.$utility.findConstantData = mocksFn["findConstantData"] = jest
      .fn()
      .mockReturnValue("mocked-product_id");
    wrapper.vm.toggleFormMembership();
    await wrapper.vm.$nextTick();
    expect(mocksFn["findConstantData"]).toHaveBeenCalled();
    expect(wrapper.vm.form.product).toEqual("mocked-product_id");
    expect(wrapper.vm.form.vehicle).toEqual([
      mocking_data[0].license_plate,
      mocking_data[1].license_plate,
    ]);
  });
  test("test function toggleFormMembership with membership type license_plate and has 3 vehicle, should set form vehicle to 3 data and product based on result findConstantData", async () => {
    wrapper.vm.corporate.membership_type = "LICENSE_PLATE";
    const mocking_data = [
      {
        product_id: "mocked-product_id",
        license_plate: "B1SPN",
      },
      {
        product_id: "mocked-product_id",
        license_plate: "B2SPN",
      },
      {
        product_id: "mocked-product_id",
        license_plate: "B3SPN",
      },
    ];
    wrapper.setProps({
      data: {
        motorcycle: mocking_data,
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.$utility.findConstantData = mocksFn["findConstantData"] = jest
      .fn()
      .mockReturnValue("mocked-product_id");
    wrapper.vm.toggleFormMembership();
    await wrapper.vm.$nextTick();
    expect(mocksFn["findConstantData"]).toHaveBeenCalled();
    expect(wrapper.vm.form.product).toEqual("mocked-product_id");
    expect(wrapper.vm.form.vehicle).toEqual([
      mocking_data[0].license_plate,
      mocking_data[1].license_plate,
      mocking_data[2].license_plate,
    ]);
  });

  test("test function processCheckCorporate with hasnt corporate value, should set submit button disabled to true", async () => {
    wrapper.vm.corporate = {};
    await wrapper.vm.$nextTick();
    wrapper.vm.processCheckCorporate();
    await wrapper.vm.$nextTick();
    wrapper.vm.button.submit_button.is_disabled = true;
  });
  test("test function processCheckCorporate with has corporate value, should set submit button disabled to false", async () => {
    wrapper.vm.corporate = { value: "mocked-id", text: "mocked-text" };
    await wrapper.vm.$nextTick();
    wrapper.vm.processCheckCorporate();
    await wrapper.vm.$nextTick();
    wrapper.vm.button.submit_button.is_disabled = false;
  });

  test("test function processRemoveVehicle, should remove 1 array ", async () => {
    wrapper.vm.form.vehicle = ["B1SPN", "B2SPN"];
    wrapper.vm.processRemoveVehicle(1);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.form.vehicle).toEqual(["B1SPN"]);
  });

  test("test function processAddVehicle with membership card and vehicle has 1 plate, should push blank string to form vehicle and the vehicle has 2 object", async () => {
    const mocked_vehicle = ["vehicle-1"];
    wrapper.vm.corporate.membership_type = "CARD";
    await wrapper.vm.$nextTick();
    wrapper.vm.form.vehicle = mocked_vehicle;
    wrapper.vm.processAddVehicle();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.form.vehicle).toEqual(["vehicle-1", ""]);
  });
  test("test function processAddVehicle with membership card and vehicle has 2 plates, shouldnt push blank string to form vehicle and the vehicle still has 2 object", async () => {
    const mocked_vehicle = ["vehicle-1", "vehicle-2"];
    wrapper.vm.corporate.membership_type = "CARD";
    await wrapper.vm.$nextTick();
    wrapper.vm.form.vehicle = mocked_vehicle;
    wrapper.vm.processAddVehicle();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.form.vehicle).toEqual(["vehicle-1", "vehicle-2"]);
  });
  test("test function processAddVehicle with membership card and vehicle has 1 plate, should push blank string to form vehicle and the vehicle has 2 object", async () => {
    const mocked_vehicle = ["vehicle-1"];
    wrapper.vm.corporate.membership_type = "LICENSE_PLATE";
    await wrapper.vm.$nextTick();
    wrapper.vm.form.vehicle = mocked_vehicle;
    wrapper.vm.processAddVehicle();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.form.vehicle).toEqual(["vehicle-1", ""]);
  });
  test("test function processAddVehicle with membership card and vehicle has 2 plate, should push blank string to form vehicle and the vehicle has 3 object", async () => {
    const mocked_vehicle = ["vehicle-1", "vehicle-2"];
    wrapper.vm.corporate.membership_type = "LICENSE_PLATE";
    await wrapper.vm.$nextTick();
    wrapper.vm.form.vehicle = mocked_vehicle;
    wrapper.vm.processAddVehicle();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.form.vehicle).toEqual(["vehicle-1", "vehicle-2", ""]);
  });
  test("test function processAddVehicle with membership card and vehicle has 3 plate, shouldnt push blank string to form vehicle and the vehicle still has 3 object", async () => {
    const mocked_vehicle = ["vehicle-1", "vehicle-2", "vehicle-3"];
    wrapper.vm.corporate.membership_type = "LICENSE_PLATE";
    await wrapper.vm.$nextTick();
    wrapper.vm.form.vehicle = mocked_vehicle;
    wrapper.vm.processAddVehicle();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.form.vehicle).toEqual([
      "vehicle-1",
      "vehicle-2",
      "vehicle-3",
    ]);
  });
  test("test function processSubmitForm with no passed validation and the state is not edit, should not call function processUpdateData and processCreateData", async () => {
    wrapper.setProps({
      is_edit: false,
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.processUpdateData = mocksFn["processUpdateData"] = jest.fn();
    wrapper.vm.processCreateData = mocksFn["processCreateData"] = jest.fn();
    mocksFn["mocker"] = jest
      .spyOn(wrapper.vm.$v.form, "$invalid", "get")
      .mockImplementation()
      .mockReturnValue(true);
    wrapper.vm.processSubmitForm();
    await wrapper.vm.$nextTick();
    expect(mocksFn["processUpdateData"]).not.toHaveBeenCalled();
    expect(mocksFn["processCreateData"]).not.toHaveBeenCalled();
  });
  test("test function processSubmitForm with no passed validation and the state is edit, should not call function processUpdateData and processCreateData", async () => {
    wrapper.setProps({
      is_edit: true,
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.processUpdateData = mocksFn["processUpdateData"] = jest.fn();
    wrapper.vm.processCreateData = mocksFn["processCreateData"] = jest.fn();
    mocksFn["mocker"] = jest
      .spyOn(wrapper.vm.$v.form, "$invalid", "get")
      .mockImplementation()
      .mockReturnValue(true);
    wrapper.vm.processSubmitForm();
    await wrapper.vm.$nextTick();
    expect(mocksFn["processUpdateData"]).not.toHaveBeenCalled();
    expect(mocksFn["processCreateData"]).not.toHaveBeenCalled();
  });
  test("test function processSubmitForm with passed validation and the state is not edit, should not call function processUpdateData", async () => {
    wrapper.setProps({
      is_edit: false,
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.processUpdateData = mocksFn["processUpdateData"] = jest.fn();
    wrapper.vm.processCreateData = mocksFn["processCreateData"] = jest.fn();
    mocksFn["mocker"] = jest
      .spyOn(wrapper.vm.$v.form, "$invalid", "get")
      .mockImplementation()
      .mockReturnValue(false);
    wrapper.vm.processSubmitForm();
    await wrapper.vm.$nextTick();
    expect(mocksFn["processUpdateData"]).not.toHaveBeenCalled();
    expect(mocksFn["processCreateData"]).toHaveBeenCalled();
  });
  test("test function processSubmitForm with passed validation and the state is edit, should not call function processCreateData", async () => {
    wrapper.setProps({
      is_edit: true,
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.toggleButtonSubmit = mocksFn["toggleButtonSubmit"] = jest.fn();
    wrapper.vm.processUpdateData = mocksFn["processUpdateData"] = jest.fn();
    wrapper.vm.processCreateData = mocksFn["processCreateData"] = jest.fn();
    mocksFn["mocker"] = jest
      .spyOn(wrapper.vm.$v.form, "$invalid", "get")
      .mockImplementation()
      .mockReturnValue(false);
    wrapper.vm.processSubmitForm();
    await wrapper.vm.$nextTick();
    expect(mocksFn["processUpdateData"]).toHaveBeenCalled();
    expect(mocksFn["processCreateData"]).not.toHaveBeenCalled();
  });

  describe("processPopulateOption", () => {
    it.each([
      {
        case: "current page is not last page, should call function callback_function",
        arguments: {
          current_page: 1,
          total_values: 28,
          component: "product",
        },
        expect: {
          callback_function: 1,
          component: true,
        },
      },
      {
        case: "current page is last page, shouldnt call function callback_function and set helper.loading.product to false",
        arguments: {
          current_page: 2,
          total_values: 28,
          component: "product",
        },
        expect: {
          callback_function: 0,
          component: false,
        },
      },
    ])("$case", async (data) => {
      let callback_function = jest.fn();
      wrapper.vm.processPopulateOption(
        data.arguments.current_page,
        data.arguments.total_values,
        data.arguments.component,
        callback_function
      );
      await wrapper.vm.$nextTick();
      expect(callback_function).toHaveBeenCalledTimes(
        data.expect.callback_function
      );
      expect(wrapper.vm.helper.loading.product).toEqual(data.expect.component);
    });
  });
  test("test function processGetProduct with normal condition should call function setPayloadGetOptionProduct getMembershipProduct formatOptionsSelect but not calling function setErrorContextSentry and captureMessage ", async () => {
    wrapper = {};

    wrapper = shallowMount(page, { localVue, mocks });
    wrapper.vm.setPayloadGetOptionProduct = mocksFn[
      "setPayloadGetOptionProduct"
    ] = jest.fn();
    wrapper.vm.getMembershipProduct = mocksFn["getMembershipProduct"] = jest
      .fn()
      .mockReturnValue({
        data: ["mocked"],
      });
    wrapper.vm.$utility.formatOptionsSelect = mocksFn["formatOptionsSelect"] =
      jest.fn();
    wrapper.vm.processPopulateOption = mocksFn["processPopulateOption"] =
      jest.fn();
    wrapper.vm.$utility.setErrorContextSentry = mocksFn[
      "setErrorContextSentry"
    ] = jest.fn();
    wrapper.vm.$sentry.captureMessage = mocksFn["captureMessage"] = jest.fn();
    wrapper.vm.processGetProduct();
    await wrapper.vm.$nextTick();
    expect(mocksFn["setPayloadGetOptionProduct"]).toHaveBeenCalled();
    expect(mocksFn["getMembershipProduct"]).toHaveBeenCalled();
    expect(mocksFn["formatOptionsSelect"]).toHaveBeenCalled();
    expect(mocksFn["setErrorContextSentry"]).not.toHaveBeenCalled();
    expect(mocksFn["captureMessage"]).not.toHaveBeenCalled();
  });

  test("test function processGetProduct with negative condition shouldnt call function setPayloadGetOptionProduct getMembershipProduct formatOptionsSelect not calling function setErrorContextSentry and captureMessage ", async () => {
    wrapper = {};

    wrapper = shallowMount(page, { localVue, mocks });
    wrapper.vm.setPayloadGetOptionProduct = mocksFn[
      "setPayloadGetOptionProduct"
    ] = new Error();
    wrapper.vm.getMembershipProduct = mocksFn["getMembershipProduct"] =
      new Error();
    wrapper.vm.$utility.formatOptionsSelect = mocksFn["formatOptionsSelect"] =
      new Error();
    wrapper.vm.processPopulateOption = mocksFn["processPopulateOption"] =
      new Error();
    wrapper.vm.$utility.setErrorContextSentry = mocksFn[
      "setErrorContextSentry"
    ] = jest.fn();
    wrapper.vm.$sentry.captureMessage = mocksFn["captureMessage"] = jest.fn();
    wrapper.vm.processGetProduct();
    await wrapper.vm.$nextTick();
    expect(mocksFn["setErrorContextSentry"]).toHaveBeenCalled();
    expect(mocksFn["captureMessage"]).toHaveBeenCalled();
  });

  test("test function processCreateData with normal condition, should call function setPayloadUpdate, updateCorporateMembership and passSavedToParent but not calling function setErrorContextSentry and captureMessage", async () => {
    wrapper.vm.setPayloadCreate = mocksFn["setPayloadCreate"] = jest.fn();
    wrapper.vm.createCorporateMembership = mocksFn[
      "createCorporateMembership"
    ] = jest.fn();
    wrapper.vm.passSavedToParent = mocksFn["passSavedToParent"] = jest.fn();
    wrapper.vm.$utility.setErrorContextSentry = mocksFn[
      "setErrorContextSentry"
    ] = jest.fn();
    wrapper.vm.$sentry.captureMessage = mocksFn["captureMessage"] = jest.fn();
    wrapper.vm.passErrorToParent = mocksFn["passErrorToParent"] = jest.fn();

    wrapper.vm.processCreateData();
    await wrapper.vm.$nextTick();

    expect(mocksFn["setPayloadCreate"]).toHaveBeenCalled();
    expect(mocksFn["createCorporateMembership"]).toHaveBeenCalled();
    expect(mocksFn["passSavedToParent"]).toHaveBeenCalled();
    expect(mocksFn["setErrorContextSentry"]).not.toHaveBeenCalled();
    expect(mocksFn["captureMessage"]).not.toHaveBeenCalled();
    expect(mocksFn["passErrorToParent"]).not.toHaveBeenCalled();
  });

  test("test function processCreateData with negative condition, should call function setErrorContextSentry and captureMessage", async () => {
    wrapper.vm.setPayloadCreate = mocksFn["setPayloadCreate"] = new Error();
    wrapper.vm.passErrorToParent = mocksFn["passErrorToParent"] = jest.fn();
    wrapper.vm.createCorporateMembership = mocksFn[
      "createCorporateMembership"
    ] = jest.fn();
    wrapper.vm.passSavedToParent = mocksFn["passSavedToParent"] = new Error();
    wrapper.vm.$utility.setErrorContextSentry = mocksFn[
      "setErrorContextSentry"
    ] = jest.fn();
    wrapper.vm.$sentry.captureMessage = mocksFn["captureMessage"] = jest.fn();
    wrapper.vm.passErrorToParent = mocksFn["passErrorToParent"] = jest.fn();

    wrapper.vm.processCreateData();
    await wrapper.vm.$nextTick();

    expect(mocksFn["setErrorContextSentry"]).toHaveBeenCalled();
    expect(mocksFn["captureMessage"]).toHaveBeenCalled();
    expect(mocksFn["passErrorToParent"]).toHaveBeenCalled();
  });

  test("test function processUpdateData with normal condition, should call function setPayloadUpdate, updateCorporateMembership and passSavedToParent but not calling function setErrorContextSentry and captureMessage", async () => {
    wrapper.vm.setPayloadUpdate = mocksFn["setPayloadUpdate"] = jest.fn();
    wrapper.vm.updateCorporateMembership = mocksFn[
      "updateCorporateMembership"
    ] = jest.fn();
    wrapper.vm.passSavedToParent = mocksFn["passSavedToParent"] = jest.fn();
    wrapper.vm.$utility.setErrorContextSentry = mocksFn[
      "setErrorContextSentry"
    ] = jest.fn();
    wrapper.vm.$sentry.captureMessage = mocksFn["captureMessage"] = jest.fn();
    wrapper.vm.passErrorToParent = mocksFn["passErrorToParent"] = jest.fn();

    wrapper.vm.processUpdateData();
    await wrapper.vm.$nextTick();

    expect(mocksFn["setPayloadUpdate"]).toHaveBeenCalled();
    expect(mocksFn["updateCorporateMembership"]).toHaveBeenCalled();
    expect(mocksFn["passSavedToParent"]).toHaveBeenCalled();
    expect(mocksFn["setErrorContextSentry"]).not.toHaveBeenCalled();
    expect(mocksFn["captureMessage"]).not.toHaveBeenCalled();
    expect(mocksFn["passErrorToParent"]).not.toHaveBeenCalled();
  });

  test("test function processUpdateData with negative condition, should call function setErrorContextSentry and captureMessage", async () => {
    wrapper.vm.setPayloadUpdate = mocksFn["setPayloadUpdate"] = new Error();
    wrapper.vm.passErrorToParent = mocksFn["passErrorToParent"] = jest.fn();
    wrapper.vm.updateCorporateMembership = mocksFn[
      "updateCorporateMembership"
    ] = jest.fn();
    wrapper.vm.passSavedToParent = mocksFn["passSavedToParent"] = new Error();
    wrapper.vm.$utility.setErrorContextSentry = mocksFn[
      "setErrorContextSentry"
    ] = jest.fn();
    wrapper.vm.$sentry.captureMessage = mocksFn["captureMessage"] = jest.fn();
    wrapper.vm.passErrorToParent = mocksFn["passErrorToParent"] = jest.fn();

    wrapper.vm.processUpdateData();
    await wrapper.vm.$nextTick();

    expect(mocksFn["setErrorContextSentry"]).toHaveBeenCalled();
    expect(mocksFn["captureMessage"]).toHaveBeenCalled();
    expect(mocksFn["passErrorToParent"]).toHaveBeenCalled();
  });
});
