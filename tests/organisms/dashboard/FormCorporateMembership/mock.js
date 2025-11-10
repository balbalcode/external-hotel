const props_edit = {
  additional_data: { dob: "2024-03-08", phone_number: "0838732162" },
  card: {
    card_id: "0838732162",
    end: 1711904340000,
    license_plate: "B4412KDN",
    membership_id: "a5e0b7ea-xxx",
    paid_date: "",
    payment_method: "",
    product_detail: {
      id: "1b2f4a8e-xxx",
      name: "Company Product",
    },
    product_id: "1b2f4a8e-xxx",
    reference: "",
    rf_id: "0838732162",
    second_license_plate: "",
    start: 1709226000000,
  },
  card_id: "0838732162",
  company_id: "68e7004b-xxx",
  corporate_id: "60376185-xxx",
  created_at: "2024-03-08 09:12:20",
  current_holder: "",
  deleted_at: "",
  email: "iam@balbalcode.cloud",
  employee_phone: "",
  expired_card: {},
  id: "aec274ec-xxx",
  identification_number: "",
  mgmt_user_delete: {},
  mgmt_user_detail: {
    email: "iqbal@soulparking.co.id",
    id: "7d60974d-xxx",
    name: "Ikbal maulana",
    phone: "085894525693",
    profile_picture: "hi.there.com/mgmt/user/4d46e749-xxx.png",
    profile_picture_path: "mgmt/user/4d46e749-xxx.png",
    type: "S",
    username: "iqbal@soulparking.co.id",
  },
  mgmt_user_id: "7d60974d-xxx",
  motorcycle: [],
  name: "Ikbal maulana",
  officer_detail: {},
  officer_id: "7d60974d-xxx",
  owner_id: "",
  rf_id: "0838732162",
  spot_id: "61c22d4f-xxx",
  status: true,
};

const product_option = [
  {
    id: "1b2f4a8e-xxx",
    name: "Company Product",
  },
  {
    id: "bce101311-xxx",
    name: "member mt 1 minggu - Rp 4.000",
  },
  {
    id: "1836cb0e-xxx",
    name: "membership direct 1 minggu - Rp 10.000",
  },
];

const filled_form_card = {
  name: "Ikbal maulana",
  email: "iam@balbalcode.cloud",
  dob: "2024-03-08 09:12:20",
  product: {
    value: "1b2f4a8e-xxx",
    text: "member mt 1 minggu - Rp 4.000",
  },
  corporate: {
    value: "bc71c9dc-xxx",
    text: "pasar seni",
  },
  phone_number: "0838732162",
  vehicle: ["B4412KDN"],
  card: {
    rf_id: "0838732162",
    card_id: "0838732162",
  },
};

const payload_card = {
  product_id: "1b2f4a8e-xxx",
  rf_id: "0838732162",
  card_id: "0838732162",
  license_plate: "B4412KDN",
  second_license_plate: "",
  start: "2024-03-08 09:12:20",
  reference: "",
  payment_method: "",
  paid_date: "",
};

const payload_form_card = {
  identification_number: "",
  company_id: "bc71c9dc-xxx",
  corporate_id: "bc71c9dc-xxx",
  status: true,
  name: "Ikbal maulana",
  email: "iam@balbalcode.cloud",
  additional_data: [
    {
      key: "dob",
      value: "2024-03-08 09:12:20",
    },
    {
      key: "phone_number",
      value: "0838732162",
    },
  ],
  vehicle: ["B4412KDN"],
  card: {
    rf_id: "0838732162",
    card_id: "0838732162",
  },
  motorcycle: [],
};

const filled_form_vehicle = {
  name: "Ikbal maulana",
  email: "iam@balbalcode.cloud",
  dob: "2024-03-08 09:12:20",
  product: {
    value: "1b2f4a8e-xxx",
    text: "member mt 1 minggu - Rp 4.000",
  },
  corporate: {
    value: "bc71c9dc-xxx",
    text: "pasar seni",
  },
  phone_number: "0838732162",
  vehicle: ["B4412KDN"],
  card: {
    rf_id: "",
    card_id: "",
  },
};

const payload_vehicle = {
  product_id: "1b2f4a8e-xxx",
  license_plate: "B4412KDN",
  start: "2024-03-08 09:12:20",
  reference: "",
  payment_method: "",
  paid_date: "",
};

const payload_create_card = {
  name: "Ikbal maulana",
  identification_number: "",
  email: "iam@balbalcode.cloud",
  company_id: "bc71c9dc-xxx",
  corporate_id: "bc71c9dc-xxx",
  status: true,
  additional_data: [
    { key: "dob", value: "2024-03-08 09:12:20" },
    { key: "phone_number", value: "0838732162" },
  ],
  card: { rf_id: "0838732162", card_id: "0838732162" },
  motorcycle: [],
};

export {
  filled_form_card,
  filled_form_vehicle,
  payload_form_card,
  product_option,
  payload_card,
  payload_vehicle,
  props_edit,
  payload_create_card
};
