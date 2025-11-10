import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import utilities from "~/plugins/utilities";
import Vuelidate from "vuelidate";

import FormLogin from "@/components/organisms/auth/FormLogin";
import {
  form_login,
  login_response,
  expect_spot_list,
  payload_login,
  user_cookie,
  user_prop_firebase,
} from "./mock";

const localVue = createLocalVue();
localVue.use(Vuelidate);

const mocks = {
  $utility: {
    setCookie() {},
    setErrorContextSentry() {},
    getCookie: utilities.getCookie,
    getAssetUrl: () => "",
  },
  $sentry: {
    captureMessage() {},
  },
  $fire: { analytics: { setUserProperties() {} } },
  $router: { push() {} },
  $route: { query: {} },
};
const stubs = {
  "router-link": RouterLinkStub,
};
let wrapper;
let mocksFn = {};

describe("unit.FormLogin.vue", () => {
  beforeEach(() => {
    mocksFn = {};
    mocksFn["checkErrorState"] = jest.spyOn(
      FormLogin.methods,
      "checkErrorState"
    );
    mocksFn["processCheckLoginInfo"] = jest.spyOn(
      FormLogin.methods,
      "processCheckLoginInfo"
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe("mounted", () => {
    beforeEach(() => {
      mocksFn["getCookie"] = jest.spyOn(mocks.$utility, "getCookie");
    });
    test("test with with value fallback url is blank, should set value helper.fallback_url 'dashboard' and call function checkErrorState and processCheckLoginInfo", async () => {
      wrapper = shallowMount(FormLogin, { localVue, mocks, stubs });
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.helper.fallback_url).toEqual("/dashboard");
      expect(mocksFn["getCookie"]).toHaveBeenCalled();
      expect(mocksFn["checkErrorState"]).toHaveBeenCalled();
      expect(mocksFn["processCheckLoginInfo"]).toHaveBeenCalled();
    });
    test("test with contains cookie value fallback url, should set value helper.fallback_url equal with cookie url and call function checkErrorState and processCheckLoginInfo", async () => {
      Object.defineProperty(window.document, "cookie", {
        writable: true,
        value: "fallback_url=profile",
      });
      jest.useFakeTimers();
      jest.advanceTimersByTime(3000);
      wrapper = shallowMount(FormLogin, { localVue, mocks, stubs });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.helper.fallback_url).toEqual("profile");
      expect(mocksFn["checkErrorState"]).toHaveBeenCalled();
      expect(mocksFn["getCookie"]).toHaveBeenCalled();
      expect(mocksFn["processCheckLoginInfo"]).toHaveBeenCalled();
      jest.useRealTimers();
    });
  });

  describe("methods", () => {
    beforeEach(() => {
      global.window = { innerWidth: 1000, location: {} };
      wrapper = shallowMount(FormLogin, { localVue, mocks, stubs });
    });

    test("once setPayloadLogin called, should return payload for login", async () => {
      wrapper.vm.form.email = form_login.email;
      wrapper.vm.form.password = form_login.password;
      await wrapper.vm.$nextTick();

      let result = wrapper.vm.setPayloadLogin();
      expect(result).toEqual(payload_login);
    });

    test("once setUserFirebase called with userInfo, should call $fire.analytics.setUserProperties", async () => {
      wrapper.vm.$fire.analytics.setUserProperties = mocksFn[
        "$fire.analytics.setUserProperties"
      ] = jest.fn();

      await wrapper.vm.setUserFirebase(user_cookie);

      expect(mocksFn["$fire.analytics.setUserProperties"].mock.calls).toEqual([
        [user_prop_firebase],
      ]);
    });

    test("once toggleLoadingButton called, should toggle helper.is_loading to true or false", () => {
      wrapper.vm.toggleLoadingButton();
      expect(wrapper.vm.helper.is_loading).toBeTruthy();

      wrapper.vm.toggleLoadingButton();
      expect(wrapper.vm.helper.is_loading).toBeFalsy();
    });

    describe("checkErrorState", () => {
      it.each([
        {
          case: "given $route.query.error 'user', should set message 'Info user gagal dimuat'",
          query_error: "user",
          message: "Info user gagal dimuat",
          fnMocked: {
            "$sentry.captureMessage": {
              calls: [["Undefined value at processSpotUser FormLogin"]],
            },
          },
        },
        {
          case: "given $route.query.error 'fault', should set message 'Terjadi kesalahan pada halaman yang anda akses, kami harus membuat anda login kembali'",
          query_error: "fault",
          message:
            "Terjadi kesalahan pada halaman yang anda akses, kami harus membuat anda login kembali",
          fnMocked: { "$sentry.captureMessage": { calls: [] } },
        },
        {
          case: "given $route.query.error 'token', should set message 'Sesi telah berakhir, mohon login kembali untuk melanjutkan'",
          query_error: "token",
          message: "Sesi telah berakhir, mohon login kembali untuk melanjutkan",
          fnMocked: { "$sentry.captureMessage": { calls: [] } },
        },
      ])("$case", ({ query_error, message, fnMocked }) => {
        wrapper.vm.$sentry.captureMessage = mocksFn["$sentry.captureMessage"] =
          jest.fn();
        wrapper.vm.$route.query.error = query_error;

        wrapper.vm.checkErrorState();

        expect(wrapper.vm.helper.notification.message).toMatch(message);
        expect(mocksFn["$sentry.captureMessage"].mock.calls).toEqual(
          fnMocked["$sentry.captureMessage"].calls
        );
      });
    });

    test("once processAccessToken called, should set cookie 'token'", () => {
      wrapper.vm.$utility.setCookie = mocksFn["$utility.setCookie"] = jest.fn();

      const token = "xxxx";
      wrapper.vm.processAccessToken(token);

      expect(mocksFn["$utility.setCookie"].mock.calls).toEqual([
        ["token", token],
      ]);
    });

    test("once processRefreshToken called, should set cookie 'token'", () => {
      wrapper.vm.$utility.setCookie = mocksFn["$utility.setCookie"] = jest.fn();

      const token = "qqqq";
      wrapper.vm.processRefreshToken(token);

      expect(mocksFn["$utility.setCookie"].mock.calls).toEqual([
        ["refresh_token", token],
      ]);
    });

    describe("processCheckLoginInfo", () => {
      test.each([
        {
          case: "given cookie 'token' found, should redirect to page /dashboard",
          fnMocked: {
            "$utility.getCookie": { returnValue: "zzzz" },
            "$router.push": { calls: [["/dashboard"]] },
          },
        },
        {
          case: "given cookie 'token' not found, shouldn't redirect to page /dashboard",
          fnMocked: { "$utility.getCookie": {}, "$router.push": { calls: [] } },
        },
      ])("$case", ({ fnMocked }) => {
        wrapper.vm.helper.fallback_url = "/dashboard";
        wrapper.vm.$utility.getCookie = mocksFn["$utility.getCookie"] = jest
          .fn()
          .mockReturnValue(fnMocked["$utility.getCookie"].returnValue);
        wrapper.vm.$router.push = mocksFn["$router.push"] = jest.fn();

        wrapper.vm.processCheckLoginInfo();

        expect(mocksFn["$router.push"].mock.calls).toEqual(
          fnMocked["$router.push"].calls
        );
      });
    });

    describe("processSubmitForm", () => {
      it.each([
        {
          case: "given invalid form, shouldn't call processLoginInfo",
          invalid: true,
          fnMocked: { processLoginInfo: { calls: [] } },
        },
        {
          case: "given valid form, should call processLoginInfo",
          invalid: false,
          fnMocked: { processLoginInfo: { calls: [[]] } },
        },
      ])("$case", async ({ invalid, fnMocked }) => {
        wrapper.vm.processLoginInfo = mocksFn["processLoginInfo"] = jest.fn();
        mocksFn["$v.form.$touch"] = jest
          .spyOn(wrapper.vm.$v.form, "$touch")
          .mockImplementation();
        jest
          .spyOn(wrapper.vm.$v.form, "$invalid", "get")
          .mockReturnValueOnce(invalid);

        await wrapper.vm.processSubmitForm();

        expect(mocksFn["$v.form.$touch"].mock.calls).toEqual([[]]);
        expect(mocksFn["processLoginInfo"].mock.calls).toEqual(
          fnMocked["processLoginInfo"].calls
        );
      });
    });

    describe("processUserInfo", () => {
      test.each([
        {
          case: "given valid user data, should set cookie 'user'",
          data: login_response.values,
          href: "",
          fnMocked: {
            "$utility.setCookie": { calls: [["user", user_cookie]] },
            setUserFirebase: { calls: [[user_cookie]] },
            "$utility.setErrorContextSentry": { callsLength: 0 },
            "$sentry.captureMessage": { callsLength: 0 },
          },
        },
        {
          case: "given invalid user data, should redirect to /login?error=user",
          data: { data: { spots: [] } },
          href: "/login?error=user",
          fnMocked: {
            "$utility.setCookie": { calls: [] },
            setUserFirebase: { calls: [] },
            "$utility.setErrorContextSentry": { callsLength: 1 },
            "$sentry.captureMessage": { callsLength: 1 },
          },
        },
      ])("$case", ({ data, href, fnMocked }) => {
        wrapper.vm.$utility.setCookie = mocksFn["$utility.setCookie"] =
          jest.fn();
        wrapper.vm.setUserFirebase = mocksFn["setUserFirebase"] = jest.fn();
        wrapper.vm.$utility.setErrorContextSentry = mocksFn[
          "$utility.setErrorContextSentry"
        ] = jest.fn();
        wrapper.vm.$sentry.captureMessage = mocksFn["$sentry.captureMessage"] =
          jest.fn();

        wrapper.vm.processUserInfo(data);

        expect(mocksFn["$utility.setCookie"].mock.calls).toEqual(
          fnMocked["$utility.setCookie"].calls
        );
        expect(mocksFn["setUserFirebase"].mock.calls).toEqual(
          fnMocked["setUserFirebase"].calls
        );
        expect(
          mocksFn["$utility.setErrorContextSentry"].mock.calls.length
        ).toEqual(fnMocked["$utility.setErrorContextSentry"].callsLength);
        expect(mocksFn["$sentry.captureMessage"].mock.calls.length).toEqual(
          fnMocked["$sentry.captureMessage"].callsLength
        );
      });
    });

    test("test function processSpotUser with correct response", async () => {
      wrapper.vm.processSpotUser(login_response.values);
      await wrapper.vm.$nextTick();
      const result_spot_list = JSON.parse(localStorage.getItem("spots"));
      expect(expect_spot_list).toEqual(result_spot_list);
    });

    test("test function processSelectingSpot", () => {
      const mock_spot = [
        { name: "mocked-1", location_type: "CLUSTER" },
        { name: "mocked-2", location_type: "CONVENTIONAL" },
      ];
      wrapper.vm.$utility.setCookie = mocksFn["setCookie"] = jest.fn();

      wrapper.vm.processSelectingSpot(mock_spot);

      const expected_payload = {
        name: "mocked-2",
        location_type: "CONVENTIONAL",
      };
      expect(mocksFn["setCookie"]).toHaveBeenCalled();
      expect(mocksFn["setCookie"].mock.calls[0][1]).toEqual(expected_payload);
    });

    test("test function processSelectingSpot", async () => {
      const mock_spot = [
        { name: "mocked-1", location_type: "CLUSTER" },
        { name: "mocked-2", location_type: "CONVENTIONAL" },
      ];
      wrapper.vm.$utility.setCookie = mocksFn["setCookie"] = jest.fn();
      wrapper.vm.processSelectingSpot(mock_spot);
      wrapper.vm.$nextTick();
      const expected_payload = {
        name: "mocked-2",
        location_type: "CONVENTIONAL",
      };
      expect(mocksFn["setCookie"]).toHaveBeenCalled();
      expect(mocksFn["setCookie"].mock.calls[0][1]).toEqual(expected_payload);
    });

    test("test function processLoginNotification", () => {
      const expect_result = { type: "error", message: "error passed!" };
      wrapper.vm.processLoginNotification(
        expect_result.type,
        expect_result.message
      );
      expect(expect_result).toEqual(wrapper.vm.helper.notification);
    });

    test("test function procesCountExpiredToken, should return d+7 for access token and d+29 for refresh token", async () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2023-02-01 00:00:00 GMT+7"));
      const expected_payload = [
        "exp",
        '{"access_token":1675810800000,"refresh_token":1677711600000}',
      ];
      wrapper.vm.$utility.setCookie = mocksFn["setCookie"] = jest.fn();
      wrapper.vm.procesCountExpiredToken();
      expect(mocksFn["setCookie"].mock.calls).toEqual([expected_payload]);
      jest.useRealTimers();
    });

    test("test function processLoginInfo", async () => {
      wrapper.vm.helper.fallback_url = "dashboard";
      wrapper.vm.toggleLoadingButton = mocksFn["toggleLoadingButton"] =
        jest.fn();
      wrapper.vm.setPayloadLogin = mocksFn["setPayloadLogin"] = jest.fn();
      wrapper.vm.login = mocksFn["processLogin"] = jest
        .fn()
        .mockReturnValue({ values: login_response });
      wrapper.vm.procesCountExpiredToken = mocksFn["procesCountExpiredToken"] =
        jest.fn();
      wrapper.vm.processAccessToken = mocksFn["processAccessToken"] = jest.fn();
      wrapper.vm.processRefreshToken = mocksFn["processRefreshToken"] =
        jest.fn();
      wrapper.vm.processUserInfo = mocksFn["processUserInfo"] = jest.fn();
      wrapper.vm.processCorporateInfo = mocksFn["processCorporateInfo"] =
        jest.fn();
      wrapper.vm.processLoginNotification = mocksFn[
        "processLoginNotification"
      ] = jest.fn();

      wrapper.vm.processLoginInfo(login_response);
      await wrapper.vm.$nextTick();

      expect(mocksFn["toggleLoadingButton"]).toHaveBeenCalled();
      expect(mocksFn["setPayloadLogin"]).toHaveBeenCalled();
      expect(mocksFn["processLogin"]).toHaveBeenCalled();
      expect(mocksFn["procesCountExpiredToken"]).toHaveBeenCalled();
      expect(mocksFn["processAccessToken"]).toHaveBeenCalled();
      expect(mocksFn["processRefreshToken"]).toHaveBeenCalled();
      expect(mocksFn["processUserInfo"]).toHaveBeenCalled();
      expect(mocksFn["processCorporateInfo"]).toHaveBeenCalled();
      expect(mocksFn["processLoginNotification"]).toHaveBeenCalled();
    });

    test("test function processRejectLogin with filled arguments data", () => {
      const expected_result = { data: { message: "error passed!" } };
      wrapper.vm.processRejectLogin(expected_result);
      expect(wrapper.vm.helper.notification.message).toEqual("error passed!");
    });
  });
});
