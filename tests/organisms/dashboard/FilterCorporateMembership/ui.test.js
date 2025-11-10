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
    getSpotId: () => "mocked-spot_id",
    formatOptionsSelect: () => ({}),
    setErrorContextSentry: () => ({}),
  },
  $sentry: {
    captureMessage() {},
  },
};

let mocksFn = {};

describe("ui.FilterCorporateMembership", () => {
  beforeEach(() => {
    wrapper = shallowMount(page, { localVue, mocks });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("test render form properly", async () => {
    expect(wrapper.find(`[data-testid="member-filter"]`).exists()).toEqual(
      true
    );
    expect(wrapper.find(`[data-testid="input-filter-name"]`).exists()).toEqual(
      true
    );
  });

  test("test rendering button when helper isloading true, should render btn_search and not rendering btn_loading", async () => {
    wrapper.vm.helper.is_loading = true;
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.find(`[data-testid="btn_search"]`).exists()).toEqual(false);
    expect(wrapper.find(`[data-testid="btn_loading"]`).exists()).toEqual(true);
  });
  test("test rendering button when helper isloading false, shouldnt render btn_search and rendering btn_loading", async () => {
    wrapper.vm.helper.is_loading = false;
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.find(`[data-testid="btn_search"]`).exists()).toEqual(true);
    expect(wrapper.find(`[data-testid="btn_loading"]`).exists()).toEqual(false);
  });
});
