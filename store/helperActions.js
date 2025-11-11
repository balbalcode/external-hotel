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
]);
export const s3Methods = mapActions("modules/utility/storeS3", [
  "getPreSignedPostUrl",
  "uploadDataToS3",
]);
export const subscriptionMethods = mapActions(
  "modules/corporate/storeCorporateSubscription",
  ["getCorporateDetail"]
);

export const productMethods = mapActions("modules/product/storeProduct", [
  "getMembershipProduct",
]);
