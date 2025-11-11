<template>
  <div>
    <div class="bg-white rounded-lg shadow p-3 mt-3">
      <div class="d-flex justify-content-between">
        <div>
          <input-date-group
            format="DD-MM-YYYY"
            type="date"
            is_range
            label="Tampilkan berdasarkan:"
          />
        </div>
        <div class="d-flex">
          <input-text-group
            label="Nama Event"
            placeholder="Nama Event"
            additional_class_label="invisible hidden"
          />
          <div class="ml-2 pt-lg-1">
            <active-button text="Cari" additional_class="mt-4 px-3" />
          </div>
        </div>
      </div>
      <div class="table-responsive rounded-top table-freeze mb-0">
        <table
          class="table table-striped table-borderless mb-0 custom-tbl"
          id="adminitrationTable"
        >
          <thead class="thead-freeze bg-gray-70">
            <tr class="border-bottom-table">
              <th class="text-dark">No</th>
              <th class="text-dark">Event</th>
              <th class="text-dark">Tanggal</th>
              <th class="text-dark">Produk</th>
              <th class="text-dark">Kuota Motor</th>
              <th class="text-dark">Kuota Mobil</th>
              <th class="text-dark">Pembuat</th>
              <th class="text-dark text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Event Test 1</td>
              <td>01 Juni 2024 - 30 Juni 2024</td>
              <td>SPN Reguler</td>
              <td>50 Motor</td>
              <td>30 Mobil</td>
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
                    icon="ic-file-06"
                    icon_size="16"
                    text="Daftar Tamu"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0"
                  />
                  <active-button
                    icon="ic-users-plus"
                    icon_size="16"
                    text="Tambah Kuota"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0"
                  />
                  <active-button
                    icon="ic-trash-02"
                    icon_size="16"
                    text="Hapus Event"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  />
                </dropdown-button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Event Test 2</td>
              <td>15 Juli 2024 - 31 Juli 2024</td>
              <td>SPN Premium</td>
              <td>40 Motor</td>
              <td>25 Mobil</td>
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
                    icon="ic-file-06"
                    icon_size="16"
                    text="Daftar Tamu"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0"
                  />
                  <active-button
                    icon="ic-users-plus"
                    icon_size="16"
                    text="Tambah Kuota"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0"
                  />
                  <active-button
                    icon="ic-trash-02"
                    icon_size="16"
                    text="Hapus Event"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  />
                </dropdown-button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Event Test 3</td>
              <td>10 Agustus 2024 - 25 Agustus 2024</td>
              <td>SPN Executive</td>
              <td>35 Motor</td>
              <td>20 Mobil</td>
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
                    icon="ic-file-06"
                    icon_size="16"
                    text="Daftar Tamu"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0"
                  />
                  <active-button
                    icon="ic-users-plus"
                    icon_size="16"
                    text="Tambah Kuota"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0"
                  />
                  <active-button
                    icon="ic-trash-02"
                    icon_size="16"
                    text="Hapus Event"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  />
                </dropdown-button>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Event Test 4</td>
              <td>05 September 2024 - 20 September 2024</td>
              <td>SPN Reguler</td>
              <td>60 Motor</td>
              <td>35 Mobil</td>
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
                    icon="ic-file-06"
                    icon_size="16"
                    text="Daftar Tamu"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0"
                  />
                  <active-button
                    icon="ic-users-plus"
                    icon_size="16"
                    text="Tambah Kuota"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0"
                  />
                  <active-button
                    icon="ic-trash-02"
                    icon_size="16"
                    text="Hapus Event"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  />
                </dropdown-button>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Event Test 5</td>
              <td>12 Oktober 2024 - 28 Oktober 2024</td>
              <td>SPN Premium</td>
              <td>45 Motor</td>
              <td>28 Mobil</td>
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
                    icon="ic-file-06"
                    icon_size="16"
                    text="Daftar Tamu"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0"
                  />
                  <active-button
                    icon="ic-users-plus"
                    icon_size="16"
                    text="Tambah Kuota"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0"
                  />
                  <active-button
                    icon="ic-trash-02"
                    icon_size="16"
                    text="Hapus Event"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  />
                </dropdown-button>
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>Event Test 6</td>
              <td>20 November 2024 - 05 Desember 2024</td>
              <td>SPN Executive</td>
              <td>55 Motor</td>
              <td>32 Mobil</td>
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
                    icon="ic-file-06"
                    icon_size="16"
                    text="Daftar Tamu"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0"
                  />
                  <active-button
                    icon="ic-users-plus"
                    icon_size="16"
                    text="Tambah Kuota"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0"
                  />
                  <active-button
                    icon="ic-trash-02"
                    icon_size="16"
                    text="Hapus Event"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  />
                </dropdown-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    InputDateGroup: () =>
      import("@utilities/molecules/input-group/InputDateGroup"),
    InputTextGroup: () =>
      import("@utilities/molecules/input-group/InputTextGroup"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    DropdownButton: () => import("@utilities/atoms/button/DropdownButton"),
  },
};
</script>

<style></style>
