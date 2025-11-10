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

export const packageMethods = mapActions(
  "modules/package/storeCorporatePackage",
  ["getCorporatePackage"]
);
export const productMethods = mapActions(
  "modules/package/storeCorporateProduct",
  ["getCorporateProduct"]
);

export const driverMethods = mapActions("modules/driver/storeCorporateDriver", [
  "getCorporateDriver",
  "getCorporateDriverDetail",
  "createCorporateDriver",
  "updateCorporateDriver",
  "deleteCorporateDriver",
]);

export const subscriptionMethods = mapActions(
  "modules/corporate/storeCorporateSubscription",
  ["getCorporateDetail"]
);

export const transactionMethods = mapActions(
  "modules/transaction/storeCorporateTransaction",
  [
    "getCorporateTransaction",
    "getCorporateTransactionDetail",
    "createCorporateTransaction",
    "chargeCorporateTransaction",
  ]
);

export const qrMethods = mapActions("modules/qr/storeCorporateQR", [
  "createQRParking",
  "createQRService",
]);
