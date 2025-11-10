import { shallowMount, createLocalVue } from "@vue/test-utils";
import page from "@/components/organisms/dashboard/TableCorporateMembership";
import BootstrapVue from "bootstrap-vue";
import { result_api, result_api_motorcyle } from "./mock";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

let wrapper;
const mocks = {
  $utility: {
    formatDateMoment: () => "",
    convertToRupiah: () => ({}),
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
    wrapper.vm.data = result_api.values;
    await wrapper.vm.$nextTick();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("test rendering properly with member type is card", async () => {
    wrapper.vm.helper.membership_type = "CARD";
    wrapper.vm.data = result_api.values;
    wrapper.vm.pagination.total_data = result_api.total_values;
    wrapper.vm.helper.is_loading = false;
    wrapper.vm.helper.is_error = false;
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(
      wrapper.find(`[data-testid="table-membership__th-no"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__th-name"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__th-phone_number"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__th-dob"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__th-email"]`).exists()
    ).toEqual(true);
    expect(
      wrapper
        .find(`[data-testid="table-membership__th-license_plate_1"]`)
        .exists()
    ).toEqual(true);
    expect(
      wrapper
        .find(`[data-testid="table-membership__th-license_plate_2"]`)
        .exists()
    ).toEqual(true);
    expect(
      wrapper
        .find(`[data-testid="table-membership__th-license_plate_3"]`)
        .exists()
    ).toEqual(false);
    expect(
      wrapper.find(`[data-testid="table-membership__th-product"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__th-price"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__th-status"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__th-options"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__tr-0__td-no"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__tr-0__td-name"]`).exists()
    ).toEqual(true);
    expect(
      wrapper
        .find(`[data-testid="table-membership__tr-0__td-phone_number"]`)
        .exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__tr-0__td-dob"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__tr-0__td-email"]`).exists()
    ).toEqual(true);
    expect(
      wrapper
        .find(`[data-testid="table-membership__tr-0__td-license_plate_1"]`)
        .exists()
    ).toEqual(true);
    expect(
      wrapper
        .find(`[data-testid="table-membership__tr-0__td-license_plate_2"]`)
        .exists()
    ).toEqual(true);
    expect(
      wrapper
        .find(`[data-testid="table-membership__tr-0__td-license_plate_3"]`)
        .exists()
    ).toEqual(false);
    expect(
      wrapper
        .find(`[data-testid="table-membership__tr-0__td-product"]`)
        .exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__tr-0__td-price"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__tr-0__td-status"]`).exists()
    ).toEqual(true);
    expect(
      wrapper
        .find(`[data-testid="table-membership__tr-0__td-options"]`)
        .exists()
    ).toEqual(true);
  });

  test("test rendering properly with member type is license_plate", async () => {
    wrapper.vm.helper.membership_type = "LICENSE_PLATE";
    wrapper.vm.data = result_api_motorcyle.values;
    wrapper.vm.pagination.total_data = result_api_motorcyle.total_values;
    wrapper.vm.helper.is_loading = false;
    wrapper.vm.helper.is_error = false;
    await wrapper.vm.$nextTick();

    expect(
      wrapper.find(`[data-testid="table-membership__th-no"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__th-name"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__th-phone_number"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__th-dob"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__th-email"]`).exists()
    ).toEqual(true);
    expect(
      wrapper
        .find(`[data-testid="table-membership__th-license_plate_1"]`)
        .exists()
    ).toEqual(true);
    expect(
      wrapper
        .find(`[data-testid="table-membership__th-license_plate_2"]`)
        .exists()
    ).toEqual(true);
    expect(
      wrapper
        .find(`[data-testid="table-membership__th-license_plate_3"]`)
        .exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__th-product"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__th-price"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__th-status"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__th-options"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__tr-0__td-no"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__tr-0__td-name"]`).exists()
    ).toEqual(true);
    expect(
      wrapper
        .find(`[data-testid="table-membership__tr-0__td-phone_number"]`)
        .exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__tr-0__td-dob"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__tr-0__td-email"]`).exists()
    ).toEqual(true);
    expect(
      wrapper
        .find(`[data-testid="table-membership__tr-0__td-license_plate_1"]`)
        .exists()
    ).toEqual(true);
    expect(
      wrapper
        .find(`[data-testid="table-membership__tr-0__td-license_plate_2"]`)
        .exists()
    ).toEqual(true);
    expect(
      wrapper
        .find(`[data-testid="table-membership__tr-0__td-license_plate_3"]`)
        .exists()
    ).toEqual(true);
    expect(
      wrapper
        .find(`[data-testid="table-membership__tr-0__td-product"]`)
        .exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__tr-0__td-price"]`).exists()
    ).toEqual(true);
    expect(
      wrapper.find(`[data-testid="table-membership__tr-0__td-status"]`).exists()
    ).toEqual(true);
    expect(
      wrapper
        .find(`[data-testid="table-membership__tr-0__td-options"]`)
        .exists()
    ).toEqual(true);
  });
});
