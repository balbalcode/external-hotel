<template>
  <div class="bg-white rounded-lg shadow p-3 mt-3">
    <div class="d-flex justify-content-between mb-3">
      <div>
        <h5 class="font-weight-bold align-self-center font-size-16 mb-3">
          Kendaraan Tamu Hari Ini
        </h5>
      </div>
      <div class="">
        <active-button
          text="Buat Transaksi"
          additional_class=""
          @click="$router.push('/transaction/create')"
        />
      </div>
    </div>
    <div class="table-responsive rounded-top table-freeze mb-0">
      <table
        class="table table-striped table-borderless mb-0 custom-tbl"
        id="adminitrationTable"
      >
        <thead class="thead-freeze bg-gray-70">
          <tr class="border-bottom-table">
            <th class="text-dark">Nomor Kamar</th>
            <th class="text-dark">Plat Nomor 1</th>
            <th class="text-dark">Plat Nomor 2</th>
            <th class="text-dark">Nomor Kartu</th>
            <th class="text-dark">Nama</th>
            <th class="text-dark">Produk</th>
            <th class="text-dark">Tanggal Masuk</th>
            <th class="text-dark">Tanggal Keluar</th>
            <th class="text-dark">Pembuat</th>
            <th class="text-dark text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>B-101</td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1">
                B0001SPN
              </span>
            </td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1">
                B0001SPN
              </span>
            </td>
            <td>RFID HERE</td>
            <td>Agus Firmansyah</td>
            <td>Tamu Inap Hotel 1 Hari</td>
            <td>27 Februari 2026 14:00</td>
            <td>28 Februari 2026 16:00</td>
            <td>Admin Bekasi</td>
            <td class="text-center">
              <dropdown-button
                text=""
                size="sm"
                variant="gray"
                type="outline"
                additional_class="p-0"
                caret="font-size-20 bx bx-dots-vertical-rounded"
                :has_custom_action="true"
              >
                <active-button
                  icon="ic-user-01"
                  icon_size="16"
                  text="Perpanjang"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0"
                  align="rtl"
                />
                <active-button
                  icon="ic-clock-fast-forward"
                  icon_size="16"
                  text="Hentikan"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
                <active-button
                  icon="ic-dataflow-03"
                  icon_size="16"
                  text="Cetak Kartu Baru"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
              </dropdown-button>
            </td>
          </tr>
          <tr>
            <td>B-102</td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1">
                B0002SPN
              </span>
            </td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1">
                B0003SPN
              </span>
            </td>
            <td>RFID HERE</td>
            <td>Siti Nurhaliza</td>
            <td>Tamu Inap Hotel 2 Hari</td>
            <td>27 Februari 2026 15:00</td>
            <td>29 Februari 2026 12:00</td>
            <td>Admin Jakarta</td>
            <td class="text-center">
              <dropdown-button
                text=""
                size="sm"
                variant="gray"
                type="outline"
                additional_class="p-0"
                caret="font-size-20 bx bx-dots-vertical-rounded"
                :has_custom_action="true"
              >
                <active-button
                  icon="ic-user-01"
                  icon_size="16"
                  text="Perpanjang"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0"
                  align="rtl"
                />
                <active-button
                  icon="ic-clock-fast-forward"
                  icon_size="16"
                  text="Hentikan"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
                <active-button
                  icon="ic-dataflow-03"
                  icon_size="16"
                  text="Cetak Kartu Baru"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
              </dropdown-button>
            </td>
          </tr>
          <tr>
            <td>B-103</td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1">
                D1234ABC
              </span>
            </td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1"> - </span>
            </td>
            <td>RFID HERE</td>
            <td>Budi Santoso</td>
            <td>Tamu Inap Hotel 3 Hari</td>
            <td>26 Februari 2026 16:30</td>
            <td>01 Maret 2026 10:00</td>
            <td>Admin Surabaya</td>
            <td class="text-center">
              <dropdown-button
                text=""
                size="sm"
                variant="gray"
                type="outline"
                additional_class="p-0"
                caret="font-size-20 bx bx-dots-vertical-rounded"
                :has_custom_action="true"
              >
                <active-button
                  icon="ic-user-01"
                  icon_size="16"
                  text="Perpanjang"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0"
                  align="rtl"
                />
                <active-button
                  icon="ic-clock-fast-forward"
                  icon_size="16"
                  text="Hentikan"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
                <active-button
                  icon="ic-dataflow-03"
                  icon_size="16"
                  text="Cetak Kartu Baru"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
              </dropdown-button>
            </td>
          </tr>
          <tr>
            <td>A-201</td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1">
                F5678DEF
              </span>
            </td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1">
                F9876GHI
              </span>
            </td>
            <td>RFID HERE</td>
            <td>Maya Kartika</td>
            <td>Tamu Inap Hotel 1 Hari</td>
            <td>27 Februari 2026 13:00</td>
            <td>28 Februari 2026 11:00</td>
            <td>Admin Bandung</td>
            <td class="text-center">
              <dropdown-button
                text=""
                size="sm"
                variant="gray"
                type="outline"
                additional_class="p-0"
                caret="font-size-20 bx bx-dots-vertical-rounded"
                :has_custom_action="true"
              >
                <active-button
                  icon="ic-user-01"
                  icon_size="16"
                  text="Perpanjang"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0"
                  align="rtl"
                />
                <active-button
                  icon="ic-clock-fast-forward"
                  icon_size="16"
                  text="Hentikan"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
                <active-button
                  icon="ic-dataflow-03"
                  icon_size="16"
                  text="Cetak Kartu Baru"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
              </dropdown-button>
            </td>
          </tr>
          <tr>
            <td>C-305</td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1">
                H1122JKL
              </span>
            </td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1"> - </span>
            </td>
            <td>RFID HERE</td>
            <td>Dedi Kurniawan</td>
            <td>Tamu Inap Hotel 4 Hari</td>
            <td>25 Februari 2026 14:00</td>
            <td>01 Maret 2026 12:00</td>
            <td>Admin Medan</td>
            <td class="text-center">
              <dropdown-button
                text=""
                size="sm"
                variant="gray"
                type="outline"
                additional_class="p-0"
                caret="font-size-20 bx bx-dots-vertical-rounded"
                :has_custom_action="true"
              >
                <active-button
                  icon="ic-user-01"
                  icon_size="16"
                  text="Perpanjang"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0"
                  align="rtl"
                />
                <active-button
                  icon="ic-clock-fast-forward"
                  icon_size="16"
                  text="Hentikan"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
                <active-button
                  icon="ic-dataflow-03"
                  icon_size="16"
                  text="Cetak Kartu Baru"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
              </dropdown-button>
            </td>
          </tr>
          <tr>
            <td>A-105</td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1">
                L3344MNO
              </span>
            </td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1">
                L5566PQR
              </span>
            </td>
            <td>RFID HERE</td>
            <td>Rina Marlina</td>
            <td>Tamu Inap Hotel 2 Hari</td>
            <td>26 Februari 2026 15:30</td>
            <td>28 Februari 2026 14:00</td>
            <td>Admin Semarang</td>
            <td class="text-center">
              <dropdown-button
                text=""
                size="sm"
                variant="gray"
                type="outline"
                additional_class="p-0"
                caret="font-size-20 bx bx-dots-vertical-rounded"
                :has_custom_action="true"
              >
                <active-button
                  icon="ic-user-01"
                  icon_size="16"
                  text="Perpanjang"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0"
                  align="rtl"
                />
                <active-button
                  icon="ic-clock-fast-forward"
                  icon_size="16"
                  text="Hentikan"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
                <active-button
                  icon="ic-dataflow-03"
                  icon_size="16"
                  text="Cetak Kartu Baru"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
              </dropdown-button>
            </td>
          </tr>
          <tr>
            <td>B-204</td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1">
                N7788STU
              </span>
            </td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1"> - </span>
            </td>
            <td>RFID HERE</td>
            <td>Teguh Prasetyo</td>
            <td>Tamu Inap Hotel 1 Hari</td>
            <td>27 Februari 2026 16:00</td>
            <td>28 Februari 2026 15:00</td>
            <td>Admin Yogyakarta</td>
            <td class="text-center">
              <dropdown-button
                text=""
                size="sm"
                variant="gray"
                type="outline"
                additional_class="p-0"
                caret="font-size-20 bx bx-dots-vertical-rounded"
                :has_custom_action="true"
              >
                <active-button
                  icon="ic-user-01"
                  icon_size="16"
                  text="Perpanjang"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0"
                  align="rtl"
                />
                <active-button
                  icon="ic-clock-fast-forward"
                  icon_size="16"
                  text="Hentikan"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
                <active-button
                  icon="ic-dataflow-03"
                  icon_size="16"
                  text="Cetak Kartu Baru"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
              </dropdown-button>
            </td>
          </tr>
          <tr>
            <td>C-108</td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1">
                P9900VWX
              </span>
            </td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1">
                P1122YZA
              </span>
            </td>
            <td>RFID HERE</td>
            <td>Indah Permata</td>
            <td>Tamu Inap Hotel 5 Hari</td>
            <td>24 Februari 2026 13:30</td>
            <td>01 Maret 2026 11:30</td>
            <td>Admin Malang</td>
            <td class="text-center">
              <dropdown-button
                text=""
                size="sm"
                variant="gray"
                type="outline"
                additional_class="p-0"
                caret="font-size-20 bx bx-dots-vertical-rounded"
                :has_custom_action="true"
              >
                <active-button
                  icon="ic-user-01"
                  icon_size="16"
                  text="Perpanjang"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0"
                  align="rtl"
                />
                <active-button
                  icon="ic-clock-fast-forward"
                  icon_size="16"
                  text="Hentikan"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
                <active-button
                  icon="ic-dataflow-03"
                  icon_size="16"
                  text="Cetak Kartu Baru"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
              </dropdown-button>
            </td>
          </tr>
          <tr>
            <td>A-302</td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1">
                R3344BCD
              </span>
            </td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1"> - </span>
            </td>
            <td>RFID HERE</td>
            <td>Wahyu Hidayat</td>
            <td>Tamu Inap Hotel 2 Hari</td>
            <td>26 Februari 2026 17:00</td>
            <td>28 Februari 2026 13:00</td>
            <td>Admin Solo</td>
            <td class="text-center">
              <dropdown-button
                text=""
                size="sm"
                variant="gray"
                type="outline"
                additional_class="p-0"
                caret="font-size-20 bx bx-dots-vertical-rounded"
                :has_custom_action="true"
              >
                <active-button
                  icon="ic-user-01"
                  icon_size="16"
                  text="Perpanjang"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0"
                  align="rtl"
                />
                <active-button
                  icon="ic-clock-fast-forward"
                  icon_size="16"
                  text="Hentikan"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
                <active-button
                  icon="ic-dataflow-03"
                  icon_size="16"
                  text="Cetak Kartu Baru"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
              </dropdown-button>
            </td>
          </tr>
          <tr>
            <td>B-306</td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1">
                T5566EFG
              </span>
            </td>
            <td>
              <span class="border border-gray-70 rounded px-2 py-1">
                T7788HIJ
              </span>
            </td>
            <td>RFID HERE</td>
            <td>Lestari Putri</td>
            <td>Tamu Inap Hotel 3 Hari</td>
            <td>25 Februari 2026 12:00</td>
            <td>28 Februari 2026 10:00</td>
            <td>Admin Denpasar</td>
            <td class="text-center">
              <dropdown-button
                text=""
                size="sm"
                variant="gray"
                type="outline"
                additional_class="p-0"
                caret="font-size-20 bx bx-dots-vertical-rounded"
                :has_custom_action="true"
              >
                <active-button
                  icon="ic-user-01"
                  icon_size="16"
                  text="Perpanjang"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0"
                  align="rtl"
                />
                <active-button
                  icon="ic-clock-fast-forward"
                  icon_size="16"
                  text="Hentikan"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
                <active-button
                  icon="ic-dataflow-03"
                  icon_size="16"
                  text="Cetak Kartu Baru"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
              </dropdown-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    DropdownButton: () => import("@utilities/atoms/button/DropdownButton"),
  },
};
</script>

<style></style>
