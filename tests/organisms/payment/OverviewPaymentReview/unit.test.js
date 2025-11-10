import { shallowMount, createLocalVue } from "@vue/test-utils";
import page from "@/components/organisms/payment/OverviewPaymentReview";
import BootstrapVue from "bootstrap-vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

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

describe("unit.OverviewPaymentReview", () => {
  beforeEach(() => {
    wrapper = shallowMount(page, { localVue, mocks });
  });

  test("test watcher motorcycle_bill, should call function processCountTotal", async () => {
    wrapper.setProps({
      motorcycle_bill: "mocked",
    });
    wrapper.vm.processCountTotal = mocksFn["processCountTotal"] = jest.fn();
    expect(mocksFn["processCountTotal"]).toHaveBeenCalled();
  });
  test("test watcher motorcycle_sum, should call function processCountTotal", async () => {
    wrapper.setProps({
      motorcycle_sum: "mocked",
    });
    wrapper.vm.processCountTotal = mocksFn["processCountTotal"] = jest.fn();
    expect(mocksFn["processCountTotal"]).toHaveBeenCalled();
  });
  test("test watcher car_bill, should call function processCountTotal", async () => {
    wrapper.setProps({
      car_bill: "mocked",
    });
    wrapper.vm.processCountTotal = mocksFn["processCountTotal"] = jest.fn();
    expect(mocksFn["processCountTotal"]).toHaveBeenCalled();
  });
  test("test watcher car_sum, should call function processCountTotal", async () => {
    wrapper.setProps({
      car_sum: "mocked",
    });
    wrapper.vm.processCountTotal = mocksFn["processCountTotal"] = jest.fn();
    expect(mocksFn["processCountTotal"]).toHaveBeenCalled();
  });
});
