import { shallowMount, createLocalVue } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";
import LocationList from "@/components/core/LocationList";
import {
  spot_list,
  selected_spot,
  formatted_spot,
  search_formatted_spot,
} from "./mock";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const mocks = {
  getPrice() {},
  $utility: {
    getUserId: () => "user-mocked-id",
    getSpotId: () => "spot-mocked-id",
    getCookie: () => "cookie-mocked",
    getSelectedSpot: () => "spot-selected-mocked-id",
    getUserLoggedIn: () => "user-logged-mocked-info",
  },
  $route: {
    path: "/page",
  },
};

let wrapper;

describe("unit.LocationList.vue", () => {
  let mocksFn = {};

  beforeEach(async () => {
    localStorage.setItem("spots", JSON.stringify(spot_list));
    wrapper = await shallowMount(LocationList, { localVue, mocks });
    wrapper.vm.spots = spot_list;
    wrapper.vm.helper.selected = selected_spot;
    wrapper.vm.helper.pane = true;
    await wrapper.vm.$nextTick();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test("test click pane option-group, should call function toggleStatePaneGroup", async () => {
    wrapper.vm.toggleStatePaneGroup = mocksFn["toggleStatePaneGroup"] =
      jest.fn();
    await wrapper.vm.$nextTick();
    wrapper
      .find('[data-testid="option-group__CONVENTIONAL__wrapper"]')
      .trigger("click");
    await wrapper.vm.$nextTick();
    expect(mocksFn["toggleStatePaneGroup"]).toHaveBeenCalled();
  });
  test("test click opton-list , should call function processChangeSpot", async () => {
    wrapper.vm.processChangeSpot = mocksFn["processChangeSpot"] = jest.fn();
    await wrapper.vm.$nextTick();
    wrapper
      .find('[data-testid="option-list__CONVENTIONAL-value-1__wrapper"]')
      .trigger("click");
    await wrapper.vm.$nextTick();
    expect(mocksFn["processChangeSpot"]).toHaveBeenCalled();
  });
  test("test set false one of option group, shouldnt rendered", async () => {
    await wrapper.vm.$nextTick();
  });
  test("test rendering helper pane, should rendered if status true", async () => {
    wrapper.vm.helper.pane = true;
    await wrapper.vm.$nextTick();
    expect(
      wrapper.find('[data-testid="finder-location__pane"]').exists()
    ).toEqual(true);
  });
  test("test rendering helper pane, shouldnt rendered if status false", async () => {
    wrapper.vm.helper.pane = false;
    await wrapper.vm.$nextTick();
    expect(
      wrapper.find('[data-testid="finder-location__pane"]').exists()
    ).toEqual(false);
  });
});
