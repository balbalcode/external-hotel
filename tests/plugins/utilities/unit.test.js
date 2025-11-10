import utilities from '@/plugins/utilities'
import jscookie from 'js-cookie';
import { product_list, option_product } from "./mock"

describe("Plugins:Utilities.js", () => {
    let mocksFn = {}

    beforeEach(() => {
        mocksFn = {}
        jest.resetModules()
        process.env = {
            BASE_ASSET_URL: "API.XXX.YYY",
            ASSET_URL: "ASSETS.XXX.YYY",
            PRIMARY_COLOR: "#FFFFFF"
        };
    });

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it("[UNIT] test function removeSymbols", () => {
        const string = "a.b.c.d"
        let converted_string = utilities.removeSymbols(string)
        expect(converted_string).toMatch("abcd")
    })

    it("[UNIT] test function removeLetter", () => {
        const string = "a3b2c1d"
        let converted_string = utilities.removeLetter(string)
        expect(converted_string).toMatch("321")
    })

    it("[UNIT] test function removeSpace", () => {
        const string = "a b c    d"
        let converted_string = utilities.removeSpace(string)
        expect(converted_string).toMatch("abcd")
    })

    it("[UNIT] test function mergeBaseAssetUrl, should merge base asset url with given path", () => {
        const path = "path1/path2/filename.png"
        const expected_value = "API.XXX.YYY/path1/path2/filename.png"
        const received_value = utilities.mergeBaseAssetUrl(path)
        expect(received_value).toMatch(expected_value)
    })

    it("[UNIT] test function mergeAssetUrl, should merge asset url with given path", () => {
        const path = "path1/path2/filename.jpeg"
        const expected_value = "ASSETS.XXX.YYY/path1/path2/filename.jpeg"
        const received_value = utilities.mergeAssetUrl(path)
        expect(received_value).toMatch(expected_value)
    })

    describe("[UNIT] test function convertToRupiah", () => {
        it.each([
            { given: "", expected: "0" },
            { given: undefined, expected: "0" },
            { given: 0, expected: "0" },
            { given: 1, expected: "1" },
            { given: 10, expected: "10" },
            { given: 100, expected: "100" },
            { given: 1000, expected: "1.000" },
            { given: 1234567, expected: "1.234.567" },
            { given: "1", expected: "1" },
            { given: "10", expected: "10" },
            { given: "100", expected: "100" },
            { given: "1000", expected: "1.000" },
            { given: "1234567", expected: "1.234.567" },
            { given: -1, expected: "-1" },
            { given: -10, expected: "-10" },
            { given: -100, expected: "-100" },
            { given: -1000, expected: "-1.000" },
            { given: -1234567, expected: "-1.234.567" },
            { given: "-1", expected: "-1" },
            { given: "-10", expected: "-10" },
            { given: "-100", expected: "-100" },
            { given: "-1000", expected: "-1.000" },
            { given: "-1234567", expected: "-1.234.567" }
        ])("given number=$given, should return $expected", ({ given, expected }) => {
            const receivedValue = utilities.convertToRupiah(given)

            expect(receivedValue).toMatch(expected)
        })
    })

    it("[UNIT] test function convertToNumber", () => {
        const string = "1.000"
        let converted_string = utilities.convertToNumber(string)
        expect(converted_string.toString()).toMatch("1000")
    })

    it("[UNIT] test function convertMonthToString", () => {
        const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember", "Bulan tidak terdefinisi"]
        let parsed_month = ""
        for (let index = 1; index < 14; index++) {
            if (index.toString().length < 2) {
                parsed_month = utilities.convertMonthToString(`0${index}`)
            } else {
                parsed_month = utilities.convertMonthToString(index)
            }
            expect(parsed_month).toMatch(month[index - 1])
        }
    })

    it("[UNIT] test function generateUUID", () => {
        let uuid = utilities.generateUUID()
        expect(36).toEqual(uuid.length)
    })

    it("[UNIT] test function generateFilePathPreSigned", () => {
        let spying_uuid = jest.spyOn(utilities, "generateUUID")
        spying_uuid.mockReturnValue("mocked")
        const file_path = utilities.generateFilePathPreSigned("/path/to/file")
        expect("/path/to/file/mocked.jpg").toEqual(file_path)
        jest.restoreAllMocks()
    })

    it("[UNIT] test function generateFilePathPreSigned with prefix", () => {
        let spying_uuid = jest.spyOn(utilities, "generateUUID")
        spying_uuid.mockReturnValue("mocked")
        const file_path = utilities.generateFilePathPreSigned("/path/to/file", 'csv', '0001_')
        expect("/path/to/file/0001_mocked.csv").toEqual(file_path)
        jest.restoreAllMocks()
    })

    it("[UNIT] test function fireToast", () => {
        window.$nuxt = { $store: { dispatch: jest.fn() } }
        let expected_payload = {
            title: "title",
            type: "type",
            content: "content",
            duration: "duration",
            opener: "opener"
        }
        const payload = utilities.fireToast(
            expected_payload.title,
            expected_payload.type,
            expected_payload.content,
            expected_payload.opener,
            expected_payload.duration,
        )
        expect(expected_payload).toEqual(payload)
    })

    it("[UNIT] test function formatListParameterPayload", () => {
        const bulk_array = [{ value: "text_1" }, { value: "text_2" }]
        const expected_payload = "text_1,text_2"
        const payload = utilities.formatListParameterPayload(bulk_array, "value")
        expect(expected_payload).toEqual(payload)
    })

    it("[UNIT] test function formatListParameterPayload  with blank parameter", () => {
        const expected_payload = ''
        const payload = utilities.formatListParameterPayload([])
        expect(expected_payload).toEqual(payload)
    })

    it("[UNIT] test function getSpotInfo", async () => {
        let spying_spot_id = jest.spyOn(utilities, "getSpotId")
        spying_spot_id.mockReturnValue("mocked")
        let expected_payload = {
            id: "mocked",
            location: "mocked"
        }
        window.$nuxt = { $store: { state: { modules: { spot: { storeSpot: { currentSpot: expected_payload } } } } } }
        const payload = await utilities.getSpotInfo()
        expect(expected_payload).toEqual(payload)
        jest.restoreAllMocks()
    })

    it("[UNIT] test function getSpotId", () => {
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: 'selected_spots={"value":"mocked", "location": "mocked"}',
        });
        const expected_payload = "mocked"
        const payload = utilities.getSpotId()
        expect(expected_payload).toEqual(payload)
    })

    it("[UNIT] test function getCompanyId", () => {
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: 'selected_spots={"company":"mocked", "location": "mocked"}',
        });
        const expected_payload = "mocked"
        const payload = utilities.getCompanyId()
        expect(expected_payload).toEqual(payload)
    })

    it("[UNIT] test function getSelectedSpot", () => {
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: 'selected_spots={"company":"mocked", "location": "mocked"}',
        });
        const expected_payload = {
            "company": "mocked",
            "location": "mocked"
        }
        const payload = utilities.getSelectedSpot()
        expect(expected_payload).toEqual(payload)
    })

    it("[UNIT] test function getUserId", () => {
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: 'user={"id":"mocked", "name": "mocked"}',
        });
        const expected_payload = "mocked"
        const payload = utilities.getUserId()
        expect(expected_payload).toEqual(payload)
    })

    it("[UNIT] test function getUserRole", () => {
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: 'user={"id":"mocked", "type": "mocked"}',
        });
        const expected_payload = "mocked"
        const payload = utilities.getUserRole()
        expect(expected_payload).toEqual(payload)
    })

    it("[UNIT] test function getUserLoggedIn", () => {
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: 'user={"id":"mocked", "name": "mocked"}',
        });
        const expected_payload = {
            "id": "mocked",
            "name": "mocked"
        }
        const payload = utilities.getUserLoggedIn()
        expect(expected_payload).toEqual(payload)
    })


    it("[UNIT] test function setCookie", () => {
        const getSpy = jest.spyOn(jscookie, 'set')
        utilities.setCookie("cookieName", "cookieValue")
        expect(getSpy).toHaveBeenCalled()
        jest.restoreAllMocks()
    })

    it("[UNIT] test function unsetCookie", () => {
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: 'user={"id":"mocked", "name": "mocked"}',
        });
        const getSpy = jest.spyOn(jscookie, 'remove')
        utilities.unsetCookie("user");
        expect(getSpy).toHaveBeenCalled()
        jest.restoreAllMocks()
    })

    it("[UNIT] test function unsetCookie", () => {
        const cookieValue = "mocked"
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: `user=${cookieValue}`,
        });
        const getSpy = jest.spyOn(jscookie, 'get')
        const payload = utilities.getCookie("user");
        expect(getSpy).toHaveBeenCalled()
        expect(cookieValue).toEqual(payload)
        jest.restoreAllMocks()
    })

    it("[UNIT] test function formatReportField", () => {
        const dataArgs = [
            { alias: "MK", name: "Motor kecil", values: 90 },
            { alias: "MB", name: "Motor besar", values: 18 }
        ]
        const payload = utilities.formatReportField("label", dataArgs)
        const expected_payload = { label_MK: 90, label_MB: 18 }
        expect(payload).toEqual(expected_payload)
    })

    it("[UNIT] test function formatReportField", () => {
        const dataArgs = [
            { alias: "MK", name: "Motor kecil", values: 90 },
            { alias: "MB", name: "Motor besar", values: 18 }
        ]
        const payload = utilities.formatReportField("label", dataArgs)
        const expected_payload = { label_MK: 90, label_MB: 18 }
        expect(payload).toEqual(expected_payload)
    })

    it("[UNIT] test function findConstantData", () => {
        const dataArgs = [
            { alias: "MK", name: "Motor kecil", values: 90 },
            { alias: "MB", name: "Motor besar", values: 18 }
        ]
        const payload = utilities.findConstantData("alias", dataArgs, "MB")
        const expected_payload = { alias: "MB", name: "Motor besar", values: 18 }
        expect(payload).toEqual(expected_payload)
    })

    it("[UNIT] test function listEmptyDataFormats", () => {
        const payload = utilities.listEmptyDataFormats()
        const expected_payload = ['0', 0, '', "", null, undefined]
        expect(payload).toEqual(expected_payload)
    })

    it("[UNIT] test function formatLocalTimezone", () => {
        jest.spyOn(utilities, 'getSpotTimezone').mockReturnValueOnce('Asia/Jakarta');
        jest.spyOn(utilities, 'formatLocalTimezone').mockReturnValueOnce("07-07-2022")
        const payload = utilities.formatLocalTimezone("1657186919208")
        const expected_payload = "07-07-2022"
        expect(payload).toEqual(expected_payload)
        jest.restoreAllMocks()
    })

    it("[UNIT] test function formatLocalTimezone with blank time arguments", () => {
        jest.spyOn(utilities, 'getSpotTimezone').mockReturnValueOnce('Asia/Jakarta');
        const payload = utilities.formatLocalTimezone()
        const expected_payload = "-"
        expect(payload).toEqual(expected_payload)
        jest.restoreAllMocks()
    })

    describe("test function dateUTCToLocal", () => {
        it.each([
            {
                case: "given empty date, should return -",
                date: "", result: '-',
                fnMocked: { formatLocalTimezone: { calls: [] } }
            },
            {
                case: "given date, should return value as returned by formatLocalTimezone",
                date: "2003-04-30 12:23:05", result: "30-04-2003",
                fnMocked: { formatLocalTimezone: { calls: [[1051705385000, "DD-MM-YYYY", ""]] } }
            },
            {
                case: "given date, format, timezone, should value as returned by formatLocalTimezone",
                date: "2003-04-30 12:23:05", format: "DD/MM/YYYY HH:mm:ss", timezone: "Asia/Jakarta", result: "30/04/2003 19:23:05",
                fnMocked: { formatLocalTimezone: { calls: [[1051705385000, "DD/MM/YYYY HH:mm:ss", "Asia/Jakarta"]] } }
            }
        ])('$case', ({ date, format, timezone, result, fnMocked }) => {
            mocksFn['formatLocalTimezone'] = jest.spyOn(utilities, 'formatLocalTimezone').mockReturnValueOnce(result)
            const received_result = utilities.dateUTCToLocal(date, format, timezone)

            expect(received_result).toMatch(result)
            expect(mocksFn['formatLocalTimezone'].mock.calls).toEqual(fnMocked['formatLocalTimezone'].calls)
        })
    })

    it("[UNIT] test function formatDateMoment", () => {
        const payload = utilities.formatDateMoment("2022-07-07", "DD-MM-YYYY")
        const expected_payload = "07-07-2022"
        expect(payload).toEqual(expected_payload)
    })

    it("[UNIT] test function formatDateMoment with blank time arguments", () => {
        const payload = utilities.formatDateMoment()
        const expected_payload = "-"
        expect(payload).toEqual(expected_payload)
    })

    it("[UNIT] test function setUpperCaseLetter", () => {
        const payload = utilities.setUpperCaseLetter("MoCkeD")
        const expected_payload = "MOCKED"
        expect(payload).toEqual(expected_payload)
    })

    it("[UNIT] test function setLowerCaseLetter", () => {
        const payload = utilities.setLowerCaseLetter("MoCkeD")
        const expected_payload = "mocked"
        expect(payload).toEqual(expected_payload)
    })

    it("[UNIT] test function momentAddDate", () => {
        const payload = utilities.momentAddDate("2022-07-07", "1", "days")
        const expected_payload = "08-07-2022"
        expect(payload).toEqual(expected_payload)
    })

    it("[UNIT] test function momentDateDiff", () => {
        const payload = utilities.momentDateDiff("2022-07-08", "2022-07-07", "days", "YYYY-MM-DD")
        const expected_payload = "1"
        expect(payload.toString()).toEqual(expected_payload)
    })

    it("[UNIT] test function getOptionProductMembership with filled vuex", async () => {
      mocksFn['window.$nuxt.$store.commit'] = jest.fn()
      window.$nuxt = {
        $store: {
          state: {
            modules: {
              product: {
                storeProduct: { PRODUCT_LIST: { values: product_list } },
              },
            },
          },
          commit: mocksFn['window.$nuxt.$store.commit']
        },
      };
      const result = await utilities.getOptionProductMembership();
      expect(result).toEqual(option_product);
    });
  
    it("[UNIT] test function getOptionProductMembership blank vuex", async () => {
      mocksFn['window.$nuxt.$store.dispatch'] = jest.fn().mockReturnValue({ values: product_list });
      mocksFn['window.$nuxt.$store.commit'] = jest.fn()
  
      window.$nuxt = {
        $store: {
          state: {
            modules: {
              product: { storeProduct: { PRODUCT_LIST: { values: [] } } },
            },
          },
          dispatch: mocksFn['window.$nuxt.$store.dispatch'],
          commit: mocksFn['window.$nuxt.$store.commit']
        },
      };
      jscookie.get = jest
        .fn()
        .mockReturnValue(JSON.stringify({ value: "spot_id" }));
  
      const result = await utilities.getOptionProductMembership();
      expect(result).toEqual(option_product);
    });

    describe("isProductAvailable", () => {
      test.each([
        { case: "given product null, should return false", product: null, available: false },
        { case: "given product undefined, should return false", product: undefined, available: false },
        { case: "given product.limit = 0, should return true", product: { limit: 0 }, available: true },
        {
          case: "given product.limit > 0 and product.availability = 0, should return false",
          product: { limit: 30, availability: 0 }, available: false
        },
        {
          case: "given product.limit > 0 and product.availability > 0, should return false",
          product: { limit: 30, availability: 20 }, available: true
        }
      ])("$case", async ({ product, available }) => {
        mocksFn['window.$nuxt.$store.dispatch'] = jest.fn().mockReturnValueOnce(product)

        window.$nuxt = {
          $store: {
            dispatch: mocksFn['window.$nuxt.$store.dispatch'],
          },
        };

        const receivedValue = await utilities.isProductAvailable("xxx")
        expect(receivedValue).toBe(available)
      })
    })
  
    it("test formatProductOption, should return object product option format", () => {
      let option = utilities.formatProductOption(product_list[0]);
      expect(option).toEqual(option_product[0]);
  
      option = utilities.formatProductOption(product_list[1]);
      expect(option).toEqual(option_product[1]);
  
      option = utilities.formatProductOption(product_list[2]);
      expect(option).toEqual(option_product[2]);
    });

    describe("test getMembershipStatus", () => {
        it.each([
            {
                case: "given start > today and end > today should return Belum Aktif",
                start: 1679245200000, end: 1681923600000, status: { text: "Belum Aktif", type: "dark" }
            },
            {
                case: "given start < today and end > today should return Aktif",
                start: 1674147600000, end: 1676134800000, status: { text: "Aktif", type: "success" }
            },
            {
                case: "given start < today and end < today should return Kadaluarsa",
                start: 1650387600000, end: 1652979600000, status: { text: "Kadaluarsa", type: "danger" }
            },
        ])('$case', async ({ start, end, status }) => {
            jest.useFakeTimers()
            jest.setSystemTime(new Date(2023, 0, 20, 19))

            const received_status = utilities.getMembershipStatus(start, end)
            expect(received_status).toEqual(status)

            jest.useRealTimers()
        })
    })

    it("test function convertLabelName", () => {
        const expected_payload = "Full Name"
        const payload = utilities.convertLabelName("full_name", "_")
        expect(payload).toEqual(expected_payload)
    })

    it("[UNIT] test function readCSVFile", () => {

    })

    it("[UNIT] test function formatOddEventClass for return odd", () => {
        const result = utilities.formatOddEventClass(10, 1, 1)
        expect(result).toEqual("odd")
    })

    it("[UNIT] test function formatOddEventClass for return even", () => {
        const result = utilities.formatOddEventClass(10, 1, 2)
        expect(result).toEqual("even")
    })

    it("[UNIT] test function checkNullableData with 0", () => {
        const result = utilities.checkNullableData(0)
        expect(result).toEqual(true)
    })

    it("[UNIT] test function checkNullableData with null", () => {
        const result = utilities.checkNullableData(null)
        expect(result).toEqual(true)
    })

    it("[UNIT] test function checkNullableData with ''", () => {
        const result = utilities.checkNullableData('')
        expect(result).toEqual(true)
    })


    it("[UNIT] test function encodeReportFilterUrl with blank array", () => {
        const result = utilities.encodeReportFilterUrl([])
        expect(result).toEqual('')
    })

    it("[UNIT] test function encodeReportFilterUrl with filled array", () => {
        let mocked = [{ value: "product_1" }, { value: "product_2" }]
        const expected_result = "product_1,product_2"
        const result = utilities.encodeReportFilterUrl(mocked)
        expect(result).toEqual(expected_result)
    })


    it("[UNIT] test function getRoleByType with blank type", () => {
        const result = utilities.getRoleByType("")
        expect(result).toEqual("Role tidak terdefinisi")
    })

    it("[UNIT] test function getRoleByType with filled type", () => {
        const mocked = jest.spyOn(utilities, "findConstantData").mockReturnValueOnce({ id: "mocked", text: "mocked" })
        const expected_result = "mocked"
        const result = utilities.getRoleByType(mocked)
        expect(result).toEqual(expected_result)
        jest.restoreAllMocks()
    })

    it("[UNIT] test function copyObject with blank object", () => {
        const result = utilities.copyObject("")
        expect(result).toEqual(undefined)
    })

    it("[UNIT] test function copyObject with filled object", () => {
        const mocked = { "id": "mocked", "text": "mocked" }
        const expected_result = { "id": "mocked", "text": "mocked" }
        const result = utilities.copyObject(mocked)
        expect(result).toEqual(expected_result)
    })

    it("[UNIT] test function getVehicle with saved VEHICLE_GROUP vuex", async () => {
        const vehicle_group = { mt: [], mb: [], kl: [{ name: "Truk", code: "KL1", id: "id123", alias: "TR" }] }
        window.$nuxt = { $store: { state: { modules: { vehicle: { storeVehicle: { VEHICLE_GROUP: vehicle_group } } } } } }

        const result = await utilities.getVehicle()
        expect(result).toEqual(vehicle_group)
    })

    it("[UNIT] test function getVehicle with blank VEHICLE_GROUP vuex", async () => {
        const spot_id = "id123"
        const vehicle_group = { mt: [], mb: [], kl: [{ name: "Truk", code: "KL1", id: "id123", alias: "TR" }] }

        mocksFn['getSpotId'] = jest.spyOn(utilities, "getSpotId").mockReturnValue(spot_id)
        mocksFn['window.$nuxt.$store.dispatch'] = jest.fn().mockReturnValue(vehicle_group)
        window.$nuxt = {
            $store: {
                state: { modules: { vehicle: { storeVehicle: { VEHICLE_GROUP: null } } } },
                dispatch: mocksFn['window.$nuxt.$store.dispatch']
            }
        }

        const result = await utilities.getVehicle()
        expect(mocksFn['getSpotId']).toHaveBeenCalled()
        expect(mocksFn['window.$nuxt.$store.dispatch'].mock.calls).toEqual([["modules/vehicle/storeVehicle/getVehicle", { spot_id }]])
        expect(result).toEqual(vehicle_group)
    })

    it("[UNIT] test function formatVehicleOptions", () => {
        let mocked_vehicle = { vehicle: [{ id: "vehicle-id", code: "vehicle-code", name: "vehicle-name" }] }
        const result = utilities.formatVehicleOptions(mocked_vehicle)
        expect(result).toEqual([
            { id: "vehicle-id", value: "vehicle-code", text: "vehicle-name" }
        ])
    })

    it("[UNIT] test function getFormattedVehicle with saved VEHICLE vuex", async () => {
        const vehicle = [{ text: "Truk", value: "KL1", id: "id123", alias: "TR" }]
        window.$nuxt = { $store: { state: { modules: { vehicle: { storeVehicle: { VEHICLE: vehicle } } } } } }

        const result = await utilities.getFormattedVehicle()
        expect(result).toEqual(vehicle)
    })

    it("[UNIT] test function getFormattedVehicle blank VEHICLE vuex", async () => {
        const vehicle_group = { mt: [], mb: [], kl: [{ name: "Truk", code: "KL1", id: "id123", alias: "TR" }] }
        const vehicle = [{ text: "Truk", value: "KL1", id: "id123", alias: "TR" }]

        mocksFn['getVehicle'] = jest.spyOn(utilities, "getVehicle").mockReturnValue(vehicle_group)
        mocksFn['formatVehicleOptions'] = jest.spyOn(utilities, "formatVehicleOptions").mockReturnValue(vehicle)
        mocksFn['window.$nuxt.$store.dispatch'] = jest.fn()
        window.$nuxt = {
            $store: {
                state: { modules: { vehicle: { storeVehicle: { VEHICLE: null } } } },
                dispatch: mocksFn['window.$nuxt.$store.dispatch']
            }
        }

        const result = await utilities.getFormattedVehicle()
        expect(mocksFn['getVehicle']).toHaveBeenCalled()
        expect(mocksFn['formatVehicleOptions'].mock.calls).toEqual([[vehicle_group]])
        expect(mocksFn['window.$nuxt.$store.dispatch'].mock.calls).toEqual([["modules/vehicle/storeVehicle/storeVehicle", vehicle]])
        expect(result).toEqual(vehicle)
    })

    it("[UNIT] test function getVehicleMap with saved VEHICLE_MAP vuex", async () => {
        const vehicle_map = { "MT1": "Motor", "MB1": "Mobil" }
        window.$nuxt = { $store: { state: { modules: { vehicle: { storeVehicle: { VEHICLE_MAP: vehicle_map } } } } } }
        const result = await utilities.getVehicleMap()
        expect(result).toEqual(vehicle_map)
    })

    it("[UNIT] test function getVehicleMap with blank VEHICLE_MAP vuex", async () => {
        const vehicle_vuex = [{ text: "Motor", value: "MT1" }, { text: "Mobil", value: "MB1" }]
        const vehicle_map = { "MT1": "Motor", "MB1": "Mobil" }
        mocksFn['window.$nuxt.$store.dispatch'] = jest.fn()
        mocksFn['getFormattedVehicle'] = jest.spyOn(utilities, 'getFormattedVehicle').mockReturnValue(vehicle_vuex)
        window.$nuxt = {
            $store: {
                state: { modules: { vehicle: { storeVehicle: { VEHICLE_MAP: null } } } },
                dispatch: mocksFn['window.$nuxt.$store.dispatch']
            }
        }

        const result = await utilities.getVehicleMap()
        expect(mocksFn['getFormattedVehicle']).toHaveBeenCalled()
        expect(mocksFn['window.$nuxt.$store.dispatch'].mock.calls).toEqual([["modules/vehicle/storeVehicle/mapVehicle", vehicle_map]])
        expect(result).toEqual(vehicle_map)
    })


    it("[UNIT] test function setErrorContextSentry with api response with filled data", () => {
        window.$nuxt = { $sentry: {
            captureMessage: jest.fn(),
            setContext: jest.fn()
        }}
        const mock_origin = "mocked"
        const mock_object = {
            response: {
                data: {
                    message: "mocked-message",
                },
                statusText: "mocked-statusText",
                status: "mocked-status",
            }
        }
        const expected_result = {
            message: "mocked-message",
            name: "mocked-statusText - mocked-status",
            origin: "mocked"
        }
        const result = utilities.setErrorContextSentry(mock_object, mock_origin)
        expect(result).toEqual(expected_result)
    })

    it("[UNIT] test function setErrorContextSentry with api response with blank data", () => {
        window.$nuxt = { $sentry: {
            captureMessage: jest.fn(),
            setContext: jest.fn()
        }}
        const mock_origin = "mocked"
        const mock_object = {
            response: {
                statusText: "mocked-statusText",
                status: "mocked-status",
            }
        }
        const expected_result = {
            message: "mocked-statusText - mocked-status",
            name: "mocked-statusText - mocked-status",
            origin: "mocked"
        }
        const result = utilities.setErrorContextSentry(mock_object, mock_origin)
        expect(result).toEqual(expected_result)
    })

    it("[UNIT] test function setErrorContextSentry without api response", () => {
        window.$nuxt = { $sentry: {
            captureMessage: jest.fn(),
            setContext: jest.fn()
        }}
        const mock_origin = "mocked"
        const mock_object = {
            message: "undefined",
            name: "mocked"
        }
        const expected_result = {
            message: "undefined",
            name: "mocked",
            origin: "mocked"
        }
        const result = utilities.setErrorContextSentry(mock_object, mock_origin)
        expect(result).toEqual(expected_result)
    })

    it("[UNIT] test function processEliminateArrayList", () => {
        const mock_source = [
            { text: "mocked_1", value: "value_1" },
            { text: "mocked_2", value: "value_2" },
            { text: "mocked_3", value: "value_3" }
        ]
        const mock_selected = ["value_2", "value_3"]
        const result = utilities.processEliminateArrayList(mock_source, mock_selected)
        expect(result).toEqual([{ text: "mocked_1", value: "value_1" }])
    })


    it("[UNIT] test function compareTwoString with wrong condition", () => {
        const result = utilities.compareTwoString("abc", "ab")
        expect(result).toEqual(false)
    })

    it("[UNIT] test function compareTwoString with true condition", () => {
        const result = utilities.compareTwoString("abc", "abc")
        expect(result).toEqual(true)
    })

    it("[UNIT] test function getSpotTimezone", () => {
        jest.spyOn(utilities, "getSelectedSpot").mockReturnValueOnce({ timezone: "mocked" })
        const result = utilities.getSpotTimezone()
        expect(result).toEqual("mocked")
        jest.restoreAllMocks()
    })

    it("[UNIT] test function generateChartColor", () => {
        jest.spyOn(utilities, "getPrimaryColor").mockReturnValueOnce("#FFFFFF")
        const result = utilities.generateChartColor(0)
        expect(result).toEqual("#FFFFFF")
        jest.restoreAllMocks()
    })

    test("[UNIT] test function formatOptionsSelect with arguments not array", () => {
        const actual_result = utilities.formatOptionsSelect("mocked")
        expect(actual_result).toEqual([])
    })

    test("[UNIT] test function formatOptionsSelect with arguments are array but using default arguments", () => {
        const expected_result = [
            { value:  "mocked-id-1", text: "mocked-name-1"},
            { value:  "mocked-id-2", text: "mocked-name-2"},
        ]
        const mocked = [
            { id:  "mocked-id-1", name: "mocked-name-1"},
            { id:  "mocked-id-2", name: "mocked-name-2"},
        ]
        const actual_result = utilities.formatOptionsSelect(mocked)
        expect(actual_result).toEqual(expected_result)
    })

    test("[UNIT] test function formatOptionsSelect with arguments are array but using default arguments", () => {
        const expected_result = [
            { value:  "mocked-id-1", text: "mocked-name-1"},
            { value:  "mocked-id-2", text: "mocked-name-2"},
        ]
        const mocked = [
            { spot_id:  "mocked-id-1", type: "mocked-name-1"},
            { spot_id:  "mocked-id-2", type: "mocked-name-2"},
        ]
        const actual_result = utilities.formatOptionsSelect(mocked, "spot_id", "type")
        expect(actual_result).toEqual(expected_result)
    })
})