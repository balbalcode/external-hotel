import { shallowMount, createLocalVue } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";
import NavBar from "@/components/core/nav-bar";
import { selectedTimezone } from "./mock";
import * as menuCore from "@/components/core/menu";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const stubs = ["router-link"];

const mocks = {
  getPrice() {},
  $utility: {
    getUserId: () => ({}),
    getSpotId: () => ({}),
    getCookie: () => ({}),
    findConstantData: () => ({}),
    getSelectedSpot: () => ({}),
    getUserLoggedIn: () => ({}),
  },
  $parent: {
    toggleMenu: () => ({}),
  },
  $route: { path: "/page" },
  $router: { push() {} },
  $sentry: {
    captureMessage() {},
  },
  $store: {
    commit: () => ({}),
    dispatch: () => ({}),
  },
};

let wrapper;

describe("unit.NavBar.vue", () => {
  let mocksFn = {};

  beforeEach(async () => {
    mocks.$store.commit = mocksFn["$store.commit"] = jest.fn();
    mocks.$utility.getCookie = mocksFn["$utility.getCookie"] = jest.fn();
    mocks.$utility.findConstantData = mocksFn["$utility.findConstantData"] =
      jest.fn().mockReturnValue({});
    mocksFn["processSetupCookie"] = jest
      .spyOn(NavBar.methods, "processSetupCookie")
      .mockImplementation();
    mocksFn["processCheckScreenWidth"] = jest
      .spyOn(NavBar.methods, "processCheckScreenWidth")
      .mockImplementation();
    wrapper = shallowMount(NavBar, { localVue, stubs, mocks });
    await wrapper.vm.$nextTick();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("test created lifecycle, should call processSetupCookie & processCheckScreenWidth", () => {
    expect(mocksFn["processSetupCookie"].mock.calls).toEqual([[]]);
    expect(mocksFn["processCheckScreenWidth"].mock.calls).toEqual([[]]);
    expect(mocksFn["$utility.getCookie"].mock.calls).toEqual([["oldMenu"]]);
  });

  describe("computed", () => {
    describe("hide_spot_options", () => {
      it.each([
        {
          case: "given a invalid page, should return false",
          page: "/x",
          value: false,
        },
        {
          case: "given a pageAttribute.hide_spot_options undefined, should return false",
          page: "/dashboard/raspi",
          value: false,
        },
        {
          case: "given a pageAttribute.hide_spot_options true, should return true",
          page: "/settlement/monthly/",
          value: true,
        },
      ])("$case", async ({ page, value }) => {
        wrapper.vm.$route.path = page;

        expect(wrapper.vm.hide_spot_options).toBe(value);
      });
    });

    it("timezone_info, should return timezone info object constant", () => {
      wrapper.vm.$store.state.modules.utility.storeUtility.selected_timezone =
        "Asia/Jakarta";
      wrapper.vm.$utility.findConstantData = mocksFn[
        "$utility.findConstantData"
      ] = jest.fn().mockReturnValue(selectedTimezone);

      expect(wrapper.vm.timezone_info).toEqual(selectedTimezone);
    });

    describe("togglingMenu", () => {
      it.each([
        {
          case: "given a $store.state.modules.utility.storeUtility.toggling_menu undefined, should return false",
          store: undefined,
          value: false,
        },
        {
          case: "given a $store.state.modules.utility.storeUtility.toggling_menu false, should return false",
          store: false,
          value: false,
        },
        {
          case: "given a $store.state.modules.utility.storeUtility.toggling_menu true, should return true",
          store: true,
          value: true,
        },
      ])("$case", async ({ store, value }) => {
        wrapper.vm.$store.state.modules.utility.storeUtility.toggling_menu =
          store;

        expect(wrapper.vm.togglingMenu).toBe(value);
      });
    });
  });

  describe("methods", () => {
    describe("toggleMenu", () => {
      it("given body has no class 'vertical-collpsed sidebar-enable' and togglingMenu is false, once toggleMenu called should add 'vertical-collpsed sidebar-enable' to body class", async () => {
        // test preset
        document.body.classList.remove("vertical-collpsed");
        document.body.classList.remove("sidebar-enable");

        wrapper.vm.$store.dispatch = mocksFn["$store.dispatch"] = jest.fn();
        jest.spyOn(wrapper.vm, "togglingMenu", "get").mockReturnValue(false);
        await wrapper.vm.$nextTick();

        // run test
        wrapper.vm.toggleMenu();
        await wrapper.vm.$nextTick();

        expect(mocksFn["$store.dispatch"].mock.calls).toEqual([
          ["modules/utility/storeUtility/togglingMenu", true],
        ]);
        expect(document.body.classList.contains("vertical-collpsed")).toBe(
          true
        );
        expect(document.body.classList.contains("sidebar-enable")).toBe(true);
      });

      it("given body has class 'vertical-collpsed sidebar-enable' and togglingMenu is true, once toggleMenu called should remove 'vertical-collpsed sidebar-enable' from body class", async () => {
        // test preset
        document.body.classList.add("vertical-collpsed");
        document.body.classList.add("sidebar-enable");

        wrapper.vm.$store.dispatch = mocksFn["$store.dispatch"] = jest.fn();
        jest.spyOn(wrapper.vm, "togglingMenu", "get").mockReturnValue(true);
        await wrapper.vm.$nextTick();

        // run test
        wrapper.vm.toggleMenu();
        await wrapper.vm.$nextTick();

        expect(mocksFn["$store.dispatch"].mock.calls).toEqual([
          ["modules/utility/storeUtility/togglingMenu", false],
        ]);
        expect(document.body.classList.contains("vertical-collpsed")).toBe(
          false
        );
        expect(document.body.classList.contains("sidebar-enable")).toBe(false);
      });
    });

    describe("toggleVersion", () => {
      it.each([
        {
          case: "given oldMenu true should unset cookie 'oldMenu' and set oldMenu value to false",
          oldMenu: true,
          fnMocked: {
            "$utility.unsetCookie": { calls: [["oldMenu"]] },
            "$utility.setCookie": { calls: [] },
          },
        },
        {
          case: "given oldMenu false should set cookie 'oldMenu' and set oldMenu value to true",
          oldMenu: false,
          fnMocked: {
            "$utility.unsetCookie": { calls: [] },
            "$utility.setCookie": { calls: [["oldMenu", "true"]] },
          },
        },
      ])("$case", async ({ fnMocked, oldMenu }) => {
        mocksFn["reloadMenu"] = jest
          .spyOn(menuCore, "reloadMenu")
          .mockImplementation();
        wrapper.vm.$utility.unsetCookie = mocksFn["$utility.unsetCookie"] =
          jest.fn();
        wrapper.vm.$utility.setCookie = mocksFn["$utility.setCookie"] =
          jest.fn();

        wrapper.vm.$route.path = "/page";
        wrapper.vm.oldMenu = oldMenu;
        await wrapper.vm.$nextTick();

        wrapper.vm.toggleVersion();
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.oldMenu).toBe(!oldMenu);
        expect(mocksFn["$utility.unsetCookie"].mock.calls).toEqual(
          fnMocked["$utility.unsetCookie"].calls
        );
        expect(mocksFn["$utility.setCookie"].mock.calls).toEqual(
          fnMocked["$utility.setCookie"].calls
        );
        expect(mocksFn["reloadMenu"].mock.calls).toEqual([["/page"]]);
      });
    });

    it("once toggleTimezoneInfo called, should toggle value of h", async () => {
      wrapper.vm.toggleTimezoneInfo();
      expect(wrapper.vm.helper.show_timezone_info).toBe(true);

      wrapper.vm.toggleTimezoneInfo();
      expect(wrapper.vm.helper.show_timezone_info).toBe(false);
    });

    it("once processSetupCookie called, should call $utility.getSelectedSpot and ", () => {
      wrapper.vm.$utility.getSelectedSpot = mocksFn[
        "$utility.getSelectedSpot"
      ] = jest.fn();
      wrapper.vm.$utility.getUserLoggedIn = mocksFn[
        "$utility.getUserLoggedIn"
      ] = jest.fn();

      wrapper.vm.processSetupCookie();

      expect(mocksFn["$utility.getSelectedSpot"].mock.calls).toEqual([[]]);
      expect(mocksFn["$utility.getUserLoggedIn"].mock.calls).toEqual([[]]);
    });
    it.todo("processCheckScreenWidth");
  });
});
