export const form_login = {
  email: "john@doe.com",
  password: "secret123",
};

export const payload_login = {
  email: "john@doe.com",
  password: "secret123",
}

export const user_cookie = {
  email: "superadmin",
  id: "bf7eb571-daa4-4bf4-ad4c-60c5c56065ae",
  name: "Super Admin",
  type: "S",
  image: "image.png"
}

export const user_prop_firebase = {
  email: "superadmin",
  name: "Super Admin",
  role: "S"
}

export const login_response = {
  message: "User telah berhasil masuk",
  values: {
    access_token: "ey...",
    data: {
      email: "superadmin",
      id: "bf7eb571-daa4-4bf4-ad4c-60c5c56065ae",
      name: "Super Admin",
      phone: "",
      spots: [
        {
          spot_detail: {
            type: "CONVENTIONAL",
            address: "dfsdfssdf",
            city: "Jakarta",
            company_id: "0e6f2f24-b626-4e4d-b47d-e9a6eb83d025",
            code: "",
            description: "",
            distance: 0,
            email: "fddwqewqe",
            gate: "",
            id: "0e6f2f24-b626-4e4d-b47d-e9a6eb83d025",
            image: "",
            latitude: "123",
            longitude: "123",
            name: "3321wqeqew",
            province: "DKI Jakarta",
            location_category: "CONVENTIONAL",
            stock: 0,
            timezone: "",
          },
          type: "S",
          spot_id: "0e6f2f24-b626-4e4d-b47d-e9a6eb83d025",
        },
        {
          spot_detail: {
            type: "CONVENTIONAL",
            address: "333",
            city: "Kabupaten Kebumen",
            company_id: "0e6f2f24-b626-4e4d-b47d-e9a6eb83d025",
            code: "",
            description: "",
            distance: 0,
            email: "supermalang@gmail.com",
            gate: "",
            id: "0e6f2f24-b626-4e4d-b47d-e9a6eb83d025",
            image: "",
            latitude: "23",
            longitude: "333",
            name: "superrr",
            province: "Jawa Tengah",
            stock: 0,
            location_category: "CONVENTIONAL",
            timezone: "",
          },
          type: "S",
          spot_id: "0e6f2f24-b626-4e4d-b47d-e9a6eb83d025",
        },
        {
          spot_detail: {
            type: "CLUSTER",
            address: "213",
            city: "Jakarta Barat",
            company_id: "0e6f2f24-b626-4e4d-b47d-e9a6eb83d025",
            code: "",
            description: "",
            distance: 0,
            email: "Cobagandaria@gmail.com",
            gate: "",
            id: "0e6f2f24-b626-4e4d-b47d-e9a6eb83d025",
            image: "",
            latitude: "123",
            longitude: "213",
            name: "Coba gandaria",
            province: "Jakarta",
            stock: 0,
            location_category: "CONVENTIONAL",
            timezone: "",
          },
          type: "S",
          spot_id: "0e6f2f24-b626-4e4d-b47d-e9a6eb83d025",
        },
      ],
      username: "superadmin",
      profile_picture: "image.png",
    },
    refresh_token: "ey....",
  },
};

export const expect_spot_list = [
  {
    value: "0e6f2f24-b626-4e4d-b47d-e9a6eb83d025",
    company: "0e6f2f24-b626-4e4d-b47d-e9a6eb83d025",
    location_type: "CONVENTIONAL",
    text: "3321wqeqew",
    timezone: "",
    type: "S",
    location_category: "CONVENTIONAL",
  },
  {
    value: "0e6f2f24-b626-4e4d-b47d-e9a6eb83d025",
    company: "0e6f2f24-b626-4e4d-b47d-e9a6eb83d025",
    location_type: "CONVENTIONAL",
    text: "superrr",
    timezone: "",
    type: "S",
    location_category: "CONVENTIONAL",
  },
  {
    value: "0e6f2f24-b626-4e4d-b47d-e9a6eb83d025",
    company: "0e6f2f24-b626-4e4d-b47d-e9a6eb83d025",
    location_type: "CLUSTER",
    text: "Coba gandaria",
    timezone: "",
    type: "S",
    location_category: "CONVENTIONAL",
  },
];

export const query_reset_password = {
  token: "dm8192hr83hrnuir12e",
  id: "89hen91nr12j21eked1r3",
  email: "someone@something.com",
};

export const form_reset_password = {
  token: "dm8192hr83hrnuir12e",
  id: "89hen91nr12j21eked1r3",
  email: "someone@something.com",
  password: "someone@something.com",
  re_password: "someone@something.com",
};
