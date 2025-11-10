import { shallowMount, createLocalVue } from "@vue/test-utils";
import page from "@/components/organisms/dashboard/FormCorporateMembership";
import BootstrapVue from "bootstrap-vue";
import Vuelidate from "vuelidate";

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

describe("ui.FormCorporateMembership", () => {
  beforeEach(() => {
    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: `corporate='{"id":"60376185-xxx","name":"pasar seni","npwp":"1212.1021-1.2123.1","spot_id":"61c22d4f-xxx","spot_name":"archies sudirman"}'`,
    });
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
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("test rendering field when membership type is license_plate, should not render rf id and card id", async () => {
    wrapper.vm.corporate.membership_type = "LICENSE_PLATE";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(
      wrapper.find(`[data-testid="input-form-member__rf_id"]`).exists()
    ).toEqual(false);
    expect(
      wrapper.find(`[data-testid="input-form-member__card_id"]`).exists()
    ).toEqual(false);
  });

  test("test rendering field when membership type is card, should render rf id and card id", async () => {
    wrapper.vm.corporate.membership_type = "CARD";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(
      wrapper.find(`[data-testid="input-form-member__rf_id"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="input-form-member__card_id"]`).exists()
    ).toEqual(true);
  });

  test("test renderig button submit when submit status is true, should not rendering it but render loading button", async () => {
    wrapper.vm.button.submit_button.is_showed = false;
    wrapper.vm.button.loading_button.is_showed = true;
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(
      wrapper.find(`[data-testid="form-member__btn-submit"]`).exists()
    ).toEqual(false);
    expect(
      wrapper.find(`[data-testid="form-member__btn-loading"]`).exists()
    ).toEqual(true);
  });
  test("test renderig button submit when submit status is false, should rendering it but not render loading button", async () => {
    wrapper.vm.button.loading_button.is_showed = false;
    wrapper.vm.button.submit_button.is_showed = true;
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(
      wrapper.find(`[data-testid="form-member__btn-submit"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="form-member__btn-loading"]`).exists()
    ).toEqual(false);
  });

  describe("test rendering button add vehicle", () => {
    it.each([
      {
        case: "membership type is card, and has 1 vehicle, should render it",
        render: true,
        membership_type: "CARD",
        vehicle: [""],
      },
      {
        case: "membership type is card, and has 2 vehicle, shouldnt render it",
        render: false,
        membership_type: "CARD",
        vehicle: ["", ""],
      },
      {
        case: "membership type is license_plate, and has 1 vehicle, should render it",
        render: true,
        membership_type: "LICENSE_PLATE",
        vehicle: [""],
      },
      {
        case: "membership type is license_plate, and has 2 vehicle, should render it",
        render: true,
        membership_type: "LICENSE_PLATE",
        vehicle: ["", ""],
      },
      {
        case: "membership type is license_plate, and has 3 vehicle, shouldnt render it",
        render: false,
        membership_type: "LICENSE_PLATE",
        vehicle: ["", "", ""],
      },
    ])("$case", async (data) => {
      wrapper.vm.corporate.membership_type = data.membership_type;
      wrapper.vm.form.vehicle = data.vehicle;
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(
        wrapper.find(`[data-testid="form-member__btn-add_vehicle"]`).exists()
      ).toEqual(data.render);
    });
  });
});
