import { shallowMount } from "@vue/test-utils";
import LocationList from "@/components/core/LocationList";
import {
  spot_list,
  selected_spot,
  formatted_spot,
  search_spot,
  user,
} from "./mock";

const mocks = {
  getPrice() { },
  $utility: {
    getUserId: () => "user-mocked-id",
    getSpotId: () => "spot-mocked-id",
    getCookie: () => "cookie-mocked",
    getSelectedSpot: () => "spot-selected-mocked-id",
    getUserLoggedIn: () => "user-logged-mocked-info",
  },
  $fire: {
    analytics: {
      setUserProperties() {}
    }
  },
};

let wrapper;
let mocksFn = {};

describe("unit.LocationList.vue", () => {
  beforeEach(async () => {
    localStorage.setItem("spots", JSON.stringify(spot_list));
    mocksFn = {}
    mocksFn["processSetupCookie"] = jest.spyOn(LocationList.methods, "processSetupCookie").mockImplementation();
    mocksFn["processFillLocationOption"] = jest.spyOn(LocationList.methods, "processFillLocationOption").mockImplementation();
    wrapper = shallowMount(LocationList, { mocks });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test("test shallowMounted lifecycle, should call function processSetupCookie and processFillLocationOption", async () => {
    expect(mocksFn["processSetupCookie"]).toHaveBeenCalled();
    expect(mocksFn["processFillLocationOption"]).toHaveBeenCalled();
  });

  test("test function processSetupCookie should call function getSelectedSpot and set return to helper selected, set spots value based on localstorage spot and set user based on return utility.getUserLoggedIn", async () => {
    localStorage.setItem("spots", JSON.stringify(spot_list));
    wrapper.vm.$utility.getSelectedSpot = mocksFn["getSelectedSpot"] = jest
      .fn()
      .mockReturnValue("mocked-getSelectedSpot");
    wrapper.vm.$utility.getUserLoggedIn = mocksFn["getUserLoggedIn"] = jest
      .fn()
      .mockReturnValue("mocked-getUserLoggedIn");

    mocksFn['processSetupCookie'].mockRestore()
    wrapper.vm.processSetupCookie = LocationList.methods.processSetupCookie

    wrapper.vm.processSetupCookie();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.spots).toEqual(spot_list);
    expect(wrapper.vm.helper.selected).toEqual("mocked-getSelectedSpot");
    expect(wrapper.vm.user).toEqual("mocked-getUserLoggedIn");
    expect(mocksFn["getSelectedSpot"]).toHaveBeenCalled();
    expect(mocksFn["getUserLoggedIn"]).toHaveBeenCalled();
  });

  describe("test function processChangeSpot", () => {
    it.each([
      {
        case: "given current selected spot is not same with new selected, should call functions setCookie, processCheckSelectedSpot and getUserLoggedIn",
        previousValue: "mocked", newValue: { value: "mockeds", type: "S" }, fnMocked: {
          setCookie: { calls: [["selected_spots", { "value": "mockeds", type: "S" }], ["user", user]] },
          getUserLoggedIn: { calls: [[]] },
          processCheckSelectedSpot: { calls: [["mockeds"]] },
        }
      }, {
        case: "given current selected spot is same with new selected, shouldn't call functions  setCookie, processCheckSelectedSpot and getUserLoggedIn",
        previousValue: formatted_spot[0].spots[0].value, newValue: formatted_spot[0].spots[0], fnMocked: {
          setCookie: { calls: [] },
          getUserLoggedIn: { calls: [] },
          processCheckSelectedSpot: { calls: [] },
        }
      },
    ])('$case', async ({ previousValue, newValue, fnMocked }) => {
      wrapper.vm.$utility.setCookie = mocksFn["setCookie"] = jest.fn();
      wrapper.vm.$utility.getUserLoggedIn = mocksFn["getUserLoggedIn"] = jest.fn().mockReturnValueOnce(user);
      wrapper.vm.processCheckSelectedSpot = mocksFn["processCheckSelectedSpot"] = jest.fn();

      wrapper.vm.helper.selected.value = previousValue;
      await wrapper.vm.$nextTick();
      wrapper.vm.processChangeSpot(newValue);
      await wrapper.vm.$nextTick();

      expect(mocksFn["setCookie"].mock.calls).toEqual(fnMocked['setCookie'].calls);
      expect(mocksFn["getUserLoggedIn"].mock.calls).toEqual(fnMocked['getUserLoggedIn'].calls);
      expect(mocksFn["processCheckSelectedSpot"].mock.calls).toEqual(fnMocked['processCheckSelectedSpot'].calls);
    })
  })

  describe("test function processCheckSelectedSpot", () => {
    it.each([
      {
        case: "given cluster type location selected, the system should redirect to shettle ipl. the function getCookie, getUserId and getSpotDetail should call.",
        spot_type: "CLUSTER", fnMocked: { getCookie: { calls: [["token"]] }, getUserId: { calls: [[]] }, 'window.location.reload': { calls: [] } }
      }, {
        case: "given non cluster type location selected, the system shouldnt redirect to shettle ipl but reload. the function getCookie, getUserId and getSpotDetail should not call.",
        spot_type: "MANLESS", fnMocked: { getCookie: { calls: [] }, getUserId: { calls: [] }, 'window.location.reload': { calls: [[]] } }
      },
    ])('$case', async ({ spot_type, fnMocked }) => {
      const original = window.location;
      mocksFn['window.location.reload'] = jest.fn().mockImplementation()
      Object.defineProperty(window, 'location', {
        configurable: true,
        value: { reload: jest.fn() },
      });
      window.location.reload = mocksFn['window.location.reload']

      wrapper.vm.getSpotDetail = mocksFn["getSpotDetail"] = jest.fn().mockReturnValue({ type: spot_type });
      wrapper.vm.$utility.getCookie = mocksFn["getCookie"] = jest.fn().mockReturnValue("mocked!");
      wrapper.vm.$utility.getUserId = mocksFn["getUserId"] = jest.fn().mockReturnValue("mocked!");

      await wrapper.vm.processCheckSelectedSpot();

      expect(mocksFn["getSpotDetail"]).toHaveBeenCalled();
      expect(mocksFn["getCookie"].mock.calls).toEqual(fnMocked['getCookie'].calls);
      expect(mocksFn["getUserId"].mock.calls).toEqual(fnMocked['getUserId'].calls);
      expect(mocksFn["window.location.reload"].mock.calls).toEqual(fnMocked['window.location.reload'].calls);
      Object.defineProperty(window, 'location', { configurable: true, value: original });
    })
  })

  test("test function processFillLocationOption, should call function processFillingSpot and set options", async () => {
    wrapper.vm.processFillingSpot = mocksFn["processFillingSpot"] = jest.fn()
      .mockReturnValueOnce(formatted_spot[0].spots)
      .mockReturnValueOnce(formatted_spot[1].spots)
      .mockReturnValueOnce(formatted_spot[2].spots)
      .mockReturnValueOnce([])
      .mockReturnValueOnce([])

    mocksFn['processFillLocationOption'].mockRestore()
    wrapper.vm.processFillLocationOption = LocationList.methods.processFillLocationOption

    wrapper.vm.processFillLocationOption();

    expect(mocksFn["processFillingSpot"]).toHaveBeenCalledTimes(5);
    expect(wrapper.vm.options.length).toEqual(3);
    expect(wrapper.vm.options[0].pane).toEqual(true);
    expect(wrapper.vm.options[1].pane).toEqual(false);
    expect(wrapper.vm.options[2].pane).toEqual(false);
  });

  test("test function processFillingSpot, should filling spots value with formatted data", async () => {
    wrapper.vm.spots = spot_list;
    await wrapper.vm.$nextTick();
    let ACTUAL_VALUE = wrapper.vm.processFillingSpot({ value: "CONVENTIONAL" });
    await wrapper.vm.$nextTick();
    expect(ACTUAL_VALUE).toEqual(formatted_spot[0].spots);
  });

  test("test function processResetSearch, should reset options which has condition all value of show are true", async () => {
    wrapper.vm.options = formatted_spot;
    await wrapper.vm.$nextTick();
    wrapper.vm.processResetSearch();
    await wrapper.vm.$nextTick();
    wrapper.vm.options = formatted_spot;
  });

  test("test function processSearchData with value helper finder is blank, should call function processResetSearch", async () => {
    wrapper.vm.processResetSearch = mocksFn["processResetSearch"] = jest.fn();
    wrapper.vm.procesResetPane = mocksFn["procesResetPane"] = jest.fn();

    wrapper.vm.helper.finder = "";
    await wrapper.vm.$nextTick();
    wrapper.vm.processSearchData();
    await wrapper.vm.$nextTick();

    expect(mocksFn["processResetSearch"]).toHaveBeenCalled();
    expect(mocksFn["procesResetPane"]).toHaveBeenCalled();
  });

  test("test function processSearchData with value helper finder is not blank, shouldnt call function processResetSearch and set show object at the spot all categories to false except conventional spot in index 1", async () => {
    wrapper.vm.processResetSearch = mocksFn["processResetSearch"] = jest.fn();

    wrapper.vm.options = formatted_spot;
    await wrapper.vm.$nextTick();
    wrapper.vm.helper.finder = "t-2";
    await wrapper.vm.$nextTick();

    wrapper.vm.processSearchData();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(mocksFn["processResetSearch"]).not.toHaveBeenCalled();
    expect(wrapper.vm.options).toEqual(search_spot);
  });

  test("test function openPane, should set value helper pane to true and set width finder-location__pane equal to finder location width", async () => {
    await wrapper.vm.openPane();
    expect(wrapper.vm.helper.pane).toBe(true);
  });

  test("test function closePane with active id is finder-location, should set value helper pane still true", async () => {
    wrapper.vm.helper.pane = true;
    await wrapper.vm.$nextTick();
    document.body.innerHTML = `<input id="finder-location" type="text" />`;
    document.activeElement.id = "finder-location";
    wrapper.vm.closePane();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.helper.pane).toEqual(true);
  });

  test("test function closePane with active id isnt finder-location, should set value helper pane to false", async () => {
    document.body.innerHTML = `<input id="finder-location" type="text" />`;
    document.activeElement.id = "";
    wrapper.vm.closePane();
    expect(wrapper.vm.helper.pane).toEqual(false);
  });

  test("test function toggleStatePaneGroup, should set pane option in index to opposite value (index 0 true to false)", async () => {
    wrapper.vm.options = formatted_spot;
    await wrapper.vm.$nextTick();
    wrapper.vm.toggleStatePaneGroup(0);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.options[0].pane).toEqual(false);
  });

  test("test function toggleStatePaneGroup, should set pane option in index to opposite value (index 1 false to true)", async () => {
    wrapper.vm.options = formatted_spot;
    wrapper.vm.options[1].pane = false;
    await wrapper.vm.$nextTick();
    wrapper.vm.toggleStatePaneGroup(1);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.options[1].pane).toEqual(true);
  });
});
