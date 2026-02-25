<template>
  <div class="p-2" ref="formGuest">
    <div class="d-flex">
      <div class="mt-1">
        <i
          class="ic-check-verified-02 font-size-20 text-info rounded-circle"
          style="
            background-color: #a6cdfe;
            border: 6px solid #cfe4ff;
            padding: 6px;
          "
        >
        </i>
      </div>
      <div class="ml-2">
        <h5 class="font-weight-bold my-0">Buat Parkir Gratis</h5>
        <p class="my-0 font-size-12 text-secondary">
          Isi informasi pengunjung untuk membuat parkir gratis
        </p>
      </div>
    </div>
    <form-benefit-transaction
      :data="form.stepOne"
      @submit="processStepOne"
      v-if="helper.currentStep === 1"
    />
    <form-benefit-information
      :data="form.stepTwo"
      @submit="processStepTwo"
      v-if="helper.currentStep === 2"
    />
    <form-benefit-process
      v-if="helper.currentStep === 3"
      :step-one="form.stepOne"
      :step-two="form.stepTwo"
      @finish="
        () => {
          this.$emit('saved');
        }
      "
    />
  </div>
</template>

<script>
export default {
  components: {
    FormBenefitTransaction: () =>
      import("@/components/organisms/benefit/FormBenefitTransaction"),
    FormBenefitInformation: () =>
      import("@/components/organisms/benefit/FormBenefitInformation"),
    FormBenefitProcess: () =>
      import("@/components/organisms/benefit/FormBenefitProcess"),
  },
  data: () => {
    return {
      form: {
        stepOne: {
          data: {
            selectedTransaction: {
              amount: 0,
              basement: false,
              card_id: "d4e2830b-c722-4680-ae25-9005606d431e",
              cashback: 0,
              cashier_id: null,
              created_at: "2026-01-27 08:02:50",
              daily_membership_price: 0,
              discount: 0,
              emoney_card_id: null,
              grace_period: false,
              hs: "",
              id: "c444b0db-c5f6-4f95-a99b-45ad0d845c21",
              image_list: {
                image_out_url: [
                  "https://spn-gate.s3-ap-southeast-1.amazonaws.com/captured/346c60cd-831a-44bb-9d8a-2a786d08cb84/20260127/c444b0db-c5f6-4f95-a99b-45ad0d845c21_out.jpg",
                ],
                image_url: [
                  "https://spn-gate.s3-ap-southeast-1.amazonaws.com/captured/346c60cd-831a-44bb-9d8a-2a786d08cb84/20260127/c444b0db-c5f6-4f95-a99b-45ad0d845c21.jpg",
                ],
              },
              image_out_url:
                "https://spn-gate.s3-ap-southeast-1.amazonaws.com/captured/346c60cd-831a-44bb-9d8a-2a786d08cb84/20260127/c444b0db-c5f6-4f95-a99b-45ad0d845c21_out.jpg",
              image_path:
                "captured/346c60cd-831a-44bb-9d8a-2a786d08cb84/20260127",
              image_proof_url: "",
              image_url:
                "https://spn-gate.s3-ap-southeast-1.amazonaws.com/captured/346c60cd-831a-44bb-9d8a-2a786d08cb84/20260127/c444b0db-c5f6-4f95-a99b-45ad0d845c21.jpg",
              is_available_checkout: true,
              is_manless: true,
              is_membership: false,
              is_new_user: false,
              is_offline: false,
              is_request_check_out: false,
              main_transaction: {},
              master_product_id: null,
              membership_id: "f5f5af3e-3d0f-4129-ac33-de817097d517",
              notes: "",
              overnight_price: 0,
              paid_at: "2026-01-27 08:05:55",
              paid_token: "e28ed1d2dba44524a6c56c8b92821372",
              parking_price: 0,
              payment_gateway: "",
              payment_gateway_id: "",
              payment_gateway_status: "",
              payment_method: "MEMBERSHIP",
              point: 0,
              pos_in: "gtin-gstda-1",
              pos_out: "gtout-gstda-1",
              prediction: {
                lpr_in: {
                  brand_name: "",
                  date: "",
                  details: {
                    license_color: {
                      confidence: 0,
                      value: "",
                    },
                    vehicle: {
                      confidence: 0,
                      value: "",
                    },
                    vehicle_attribute: {
                      confidence: 0,
                      value: "",
                    },
                    vehicle_brand: {
                      confidence: 0,
                      value: {
                        brand: "",
                        model: "",
                        name: "",
                        type: "",
                      },
                    },
                    vehicle_color: {
                      confidence: 0,
                      value: "",
                    },
                  },
                  license_color: "",
                  license_plate: "",
                  processed_time: 0.129525,
                  vehicle: "",
                  vehicle_attribute: "",
                  vehicle_brand: "",
                  vehicle_color: "",
                },
                lpr_out: {
                  brand_name: "YAMAHA Aerox",
                  date: "1228",
                  details: {
                    license_color: {
                      confidence: 0.61427,
                      value: "white",
                    },
                    vehicle: {
                      confidence: 0.92161,
                      value: "motorcycle",
                    },
                    vehicle_attribute: {
                      confidence: 0,
                      value: "",
                    },
                    vehicle_brand: {
                      confidence: 0.95376,
                      value: {
                        brand: "YAMAHA",
                        model: "Aerox",
                        name: "YAMAHA Aerox",
                        type: "MOTORCYCLE",
                      },
                    },
                    vehicle_color: {
                      confidence: 0.93658,
                      value: "red",
                    },
                  },
                  license_color: "white",
                  license_plate: "B4843KLH",
                  processed_time: 1.111216,
                  vehicle: "motorcycle",
                  vehicle_attribute: "",
                  vehicle_brand: "YAMAHA",
                  vehicle_color: "red",
                },
              },
              price: 0,
              price_lock: 0,
              process_time: 0,
              reasons: "",
              ref_detail: {
                type: "FINDER",
                values: {
                  created_at: "2026-01-27 08:02:56",
                  id: "acbbe44c-ac1b-4e5f-8274-8bb40038062e",
                  is_check_out: false,
                  location: {
                    code: "1A1",
                    name: "Modul 1\n Rak A\n Lantai 1",
                  },
                  location_detail: {
                    created_at: "2025-06-01 08:56:45",
                    floor: 1,
                    id: "60e72aaa-5d5f-43ef-95ba-7a1a18284a98",
                    label: "A",
                    module: "1",
                    stock: 10,
                    tower_id: "045582fc-a8e2-4a29-9e9f-4610c924b448",
                    updated_at: "2025-06-01 08:56:45",
                  },
                  location_id: "60e72aaa-5d5f-43ef-95ba-7a1a18284a98",
                  motorcycle_detail: {
                    created_at: "2021-11-18 04:23:58",
                    id: "157c8677-07f4-46ef-8eeb-652fcc161113",
                    license_plate: "B4843KLH",
                    updated_at: "2021-11-18 04:23:58",
                    verification_status: "0",
                  },
                  motorcycle_id: "157c8677-07f4-46ef-8eeb-652fcc161113",
                  officer_name: "",
                  prediction_hours: 0,
                  time_in: 1769500976022,
                  time_out: 1769501158994,
                  total_hours: 1,
                  transaction: null,
                  updated_at: "2026-01-27 08:05:59",
                  vehicle_code: "MT1",
                  vehicle_type: 0,
                },
              },
              ref_id: "acbbe44c-ac1b-4e5f-8274-8bb40038062e",
              ref_type: "FINDER",
              rf_id: "2434743986",
              search_key: "C444B0",
              services: [],
              source: "",
              spot_detail: {
                accepted_payment_methods: [
                  "CASH",
                  "VA_MANDIRI",
                  "VA_BCA",
                  "PAYMENT_BRIZZI",
                ],
                additional_information: {
                  company_category: "SPN",
                  dds_configuration: {
                    KL: 0,
                    MB: 30,
                    MT: 30,
                  },
                  late_limit: {
                    format: "number",
                    isMultiple: false,
                    isSpan: true,
                    label: "Toleransi Keterlambatan",
                    name: "late_limit",
                    type: "MINUTES",
                    unit: "menit",
                    value: "15",
                  },
                  membership_type: {
                    label: "Tipe Membership",
                    type: "STRING",
                    value: "CARD",
                  },
                  official_name: "Gedung Simpang Temu Dukuh Atas",
                  offline_ip_port: {
                    format: "ip-format",
                    isMultiple: false,
                    isSpan: true,
                    label: "Alamat IP & Port",
                    name: "offline_ip_port",
                    placeholder: "Contoh: 127.0.0.1:8000",
                    type: "STRING",
                    unit: "Detail",
                    value: "192.168.63.32:5000",
                  },
                  total_officer: 0,
                },
                address:
                  " Jl. Juana No.37, RT.2/RW.6, Dukuh Atas, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310",
                alias: "Gedung Simpang Temu Dukuh Atas",
                auto_finish: false,
                cashback: false,
                city: "Jakarta Pusat",
                code: "Gedung Simpang Temu Dukuh Atas",
                company_category: "SPN",
                company_detail: {
                  address:
                    " Jl. Juana No.37, RT.2/RW.6, Dukuh Atas, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310",
                  code: false,
                  created_at: "2023-08-21 04:08:22",
                  id: "1c9fe050-fb29-467f-afcb-1660c8835f5b",
                  name: "Gedung Simpang Temu Dukuh Atas",
                  phone: "",
                  status: false,
                },
                company_id: "1c9fe050-fb29-467f-afcb-1660c8835f5b",
                description: "",
                distance: 0,
                email: "spn.gstdukuhatas@gmail.com",
                features: [
                  "CHANGE_VEHICLE_CODE",
                  "SHORT_FLOW_PRICE",
                  "USER_APP_CASUAL",
                ],
                floors: 2,
                frame_map:
                  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4706159743228!2d106.82385131565636!3d-6.20147753793292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5bb9777cc9b%3A0xe43270f810998793!2sGedung%20Simpang%20Temu%20Dukuh%20Atas!5e0!3m2!1sen!2sid!4v1692590756839!5m2!1sen!2sid",
                gate: false,
                gate_in: 0,
                gate_out: 0,
                id: "346c60cd-831a-44bb-9d8a-2a786d08cb84",
                image: "",
                image_path: "",
                latitude: "-6.2014775",
                limit_checkout: false,
                location_category: "CONVENTIONAL",
                longitude: "106.8238513",
                membership_config: [],
                name: "Gedung Simpang Temu Dukuh Atas",
                official_name: "Gedung Simpang Temu Dukuh Atas",
                pos: [],
                price_type: "LIMITED_PROGRESSIVE",
                prices: [],
                province: "Jakarta",
                request_checkout_limit: 0,
                restrictive_shift: "",
                show_on_app: true,
                status: "ACTIVE",
                stock: 0,
                timezone: "Asia/Jakarta",
                total_officer: 0,
                towers: {
                  x: {
                    list: ["A"],
                    name: "Rak",
                    value: 1,
                  },
                  y: {
                    list: ["1"],
                    name: "Lantai",
                    value: 1,
                  },
                  z: {
                    list: ["1"],
                    name: "Modul",
                    value: 1,
                  },
                },
                type: "CONVENTIONAL",
                valet_version: null,
                vehicle_codes: [],
              },
              spot_id: "346c60cd-831a-44bb-9d8a-2a786d08cb84",
              status: "K",
              time_in: 1769500970047,
              time_out: 1769501155219,
              total_amount: 0,
              total_hours: 0,
              transaction_data: {
                image: {
                  image_in_1: "c444b0db-c5f6-4f95-a99b-45ad0d845c21.jpg",
                  image_in_2: "",
                  image_out_1: "c444b0db-c5f6-4f95-a99b-45ad0d845c21_out.jpg",
                  image_out_2: "",
                  image_path_1:
                    "captured/346c60cd-831a-44bb-9d8a-2a786d08cb84/20260127",
                  image_path_2: "",
                  image_path_out_1:
                    "captured/346c60cd-831a-44bb-9d8a-2a786d08cb84/20260127",
                  image_path_out_2: "",
                },
                is_manless: true,
                is_new_user: false,
                is_request_check_out: false,
                prediction: {
                  lpr_in: {
                    brand_name: "",
                    date: "",
                    details: {
                      license_color: {
                        confidence: 0,
                        value: "",
                      },
                      vehicle: {
                        confidence: 0,
                        value: "",
                      },
                      vehicle_attribute: {
                        confidence: 0,
                        value: "",
                      },
                      vehicle_brand: {
                        confidence: 0,
                        value: {
                          brand: "",
                          model: "",
                          name: "",
                          type: "",
                        },
                      },
                      vehicle_color: {
                        confidence: 0,
                        value: "",
                      },
                    },
                    license_color: "",
                    license_plate: "",
                    processed_time: 0.129525,
                    vehicle: "",
                    vehicle_attribute: "",
                    vehicle_brand: "",
                    vehicle_color: "",
                  },
                  lpr_out: {
                    brand_name: "YAMAHA Aerox",
                    date: "1228",
                    details: {
                      license_color: {
                        confidence: 0.61427,
                        value: "white",
                      },
                      vehicle: {
                        confidence: 0.92161,
                        value: "motorcycle",
                      },
                      vehicle_attribute: {
                        confidence: 0,
                        value: "",
                      },
                      vehicle_brand: {
                        confidence: 0.95376,
                        value: {
                          brand: "YAMAHA",
                          model: "Aerox",
                          name: "YAMAHA Aerox",
                          type: "MOTORCYCLE",
                        },
                      },
                      vehicle_color: {
                        confidence: 0.93658,
                        value: "red",
                      },
                    },
                    license_color: "white",
                    license_plate: "B4843KLH",
                    processed_time: 1.111216,
                    vehicle: "motorcycle",
                    vehicle_attribute: "",
                    vehicle_brand: "YAMAHA",
                    vehicle_color: "red",
                  },
                },
                vehicle_code: "MT1",
              },
              transaction_detail: [
                {
                  amount: 0,
                  id: "c444b0db-c5f6-4f95-a99b-45ad0d845c21",
                  is_discount: false,
                  name: "Biaya Parkir",
                  parent: true,
                  price: 0,
                  reason: "",
                  ref_id: "",
                  ref_type: "FINDER",
                  status: "K",
                  type: "",
                },
              ],
              updated_at: "2026-01-27 08:05:52",
              user_id: "775ba7c1-1a18-422c-a4e4-adb5d93d187d",
              vehicle_code: "Motor",
            },
            transactionId: "c444b0db-c5f6-4f95-a99b-45ad0d845c21",
            isNewMembership: false,
            rfId: "",
            cardId: "",
            selectedMembership: {},
          },
        },
        stepTwo: {},
      },
      logger: {},
      helper: {
        currentStep: 2,
        isLoading: false,
      },
    };
  },
  methods: {
    processStepOne(data) {
      console.log(data)
      this.form.stepOne = data;
      this.helper.currentStep = 2;
    },

    processStepTwo(data) {
      this.form.stepTwo = data;
      this.helper.currentStep = 3;
      console.log(data)
    },

  },
};
</script>

<style></style>
