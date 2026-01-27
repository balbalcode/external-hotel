import { mapActions } from "vuex";

export const utilityMethods = mapActions("modules/utility/storeUtility", [
  "setAlert",
  "removeAlert",
  "getCurrentVersionCode",
  "appendStackedDropdown",
  "popStackedDropdown",
  "setSingleDropdown",
  "clearSingleDropdown",
  "clearStackedDropdown",
  "setDefaultErrorAlert",
  "setDefaultSuccessAlert",
]);
export const s3Methods = mapActions("modules/utility/storeS3", [
  "getPreSignedPostUrl",
  "uploadDataToS3",
]);
export const subscriptionMethods = mapActions(
  "modules/corporate/storeCorporateSubscription",
  ["getCorporateDetail"],
);

export const productMethods = mapActions("modules/product/storeProduct", [
  "getMembershipProduct",
  "getMembershipDictionary",
]);

export const resolutionMethods = mapActions(
  "modules/resolution-center/storeResolutionCenter",
  ["getDataResolution", "updateDataResolution"],
);

export const eventMethods = mapActions("modules/event/storeEvent", [
  "getEvent",
  "getEventDetail",
  "createEvent",
  "increaseQuota",
  "updateEvent",
  "deleteEvent",
]);

export const guestMethods = mapActions("modules/guest/storeGuest", [
  "getGuest",
  "getGuestDetail",
  "createGuest",
  "readOcr",
  "updateGuest",
  "deleteGuest",
  "createMembership",
  "getMembership",
  "createEmployee",
  "changePeriodMember",
]);

export const ocrMethods = mapActions("modules/ocr/storeOcr", [
  "getFormatOCR",
  "readOCR",
]);

export const transactionMethods = mapActions(
  "modules/transaction/storeTransaction",
  ["authTransaction", "createTransaction", "getTransactionLog"],
);

export const configMethods = mapActions("modules/config/storeConfig", [
  "getConfig",
]);

export const hashMethods = mapActions("modules/hash/storeHash", [
  "getCryptoHash",
]);

export const spotsMethods = mapActions("modules/spot/storeSpot", [
  "getSpotDetail",
]);
