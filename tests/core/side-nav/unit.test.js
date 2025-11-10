import { shallowMount } from "@vue/test-utils"

import SideNav from "@/components/core/side-nav"
import { selectedLocation } from "./mock"

const mocks = {
  $store: { state: { modules: { utility: { storeUtility: { toggling_menu: false } } } } },
  $route: { path: "" },
  $utility: {
    getSpotMembershipType: () => "",
    getSelectedSpot: () => ({}),
    getCookie: () => ""
  },
  $fire: { analytics: { logEvent() { } } },
  $router: { push() { } }
}
let wrapper
let mocksFn = {}

describe("unit.side-nav.vue", () => {
  beforeEach(async () => {
    mocksFn = {}
    mocks.$utility.getSelectedSpot = mocksFn['$utility.getSelectedSpot'] = jest.fn().mockReturnValueOnce(selectedLocation)
    mocksFn['processSetUpMenu'] = jest.spyOn(SideNav.methods, "processSetUpMenu").mockImplementation()
    wrapper = shallowMount(SideNav, { mocks })
    await wrapper.vm.$nextTick()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it("watch togglingMenu, should call processCountMenuWidth and resizeMenu", async () => {
    wrapper.vm.processCountMenuWidth = mocksFn['processCountMenuWidth'] = jest.fn()
    wrapper.vm.resizeMenu = mocksFn['resizeMenu'] = jest.fn()

    wrapper.vm.$store.state.modules.utility.storeUtility.toggling_menu = true
    await wrapper.vm.$nextTick()

    expect(mocksFn['processCountMenuWidth'].mock.calls).toEqual([[]])
    expect(mocksFn['resizeMenu'].mock.calls).toEqual([[]])
  })

  describe("togglingMenu", () => {
    it.each([
      { case: "given a $store.state.modules.utility.storeUtility.toggling_menu undefined, should return false", store: undefined, value: false },
      { case: "given a $store.state.modules.utility.storeUtility.toggling_menu false, should return false", store: false, value: false },
      { case: "given a $store.state.modules.utility.storeUtility.toggling_menu true, should return true", store: true, value: true },
    ])("$case", async ({ store, value }) => {
      
      wrapper.vm.processCountMenuWidth = jest.fn()
      wrapper.vm.resizeMenu = jest.fn()

      wrapper.vm.$store.state.modules.utility.storeUtility.toggling_menu = store
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.togglingMenu).toBe(value)
    })
  })

  describe("computed parents", () => { })

  test("mounted lifecycle", () => {
    expect(wrapper.vm.selected_spot).toEqual(selectedLocation)
    expect(mocksFn['processSetUpMenu'].mock.calls).toEqual([[]])
  })

  test.todo("once resizeMenu called, should set value of menu_width")

  describe("formatUserType", () => { })

  describe("isShowMenu", () => { })

  describe("processSetUpMenu", () => { })

  test.todo("once processRedirectMenu called, should redirect to given link")

  test.todo("processCountMenuWidth")

  describe("processFillingToggle", () => { })

  test.todo("once processUnFillingToggle called, should set menu_width with value of size")

  describe("processCheckActiveMenu", () => { })
})