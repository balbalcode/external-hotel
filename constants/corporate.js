function cut_off_transaction_date(index) {
  let list = [
    { value: "1", text: "Setiap tanggal 1" },
    { value: "3", text: "Setiap tanggal 3" },
    { value: "5", text: "Setiap tanggal 5" },
    { value: "10", text: "Setiap tanggal 10" },
    { value: "10", text: "Setiap tanggal 15" },
  ];
  return isFinite(index) ? list[index] : list;
}

function cut_off_period(index) {
  let list = [
    { value: "1", text: "Setiap bulan" },
    { value: "3", text: "Setiap 3 bulan" },
    { value: "5", text: "Setiap 5 bulan" },
    { value: "10", text: "Setiap 10 bulan" },
    { value: "12", text: "Setiap 1 tahun" },
    { value: "24", text: "Setiap 2 tahun" },
    { value: "36", text: "Setiap 3 tahun" },
  ];
  return isFinite(index) ? list[index] : list;
}

function corporate_type(index) {
  let list = [
    { value: "HOTEL", text: "Hotel" },
    { value: "HOSPITAL", text: "Rumah Sakit" },
    { value: "DOCKYARD", text: "Pergudangan" },
    { value: "COMPANY", text: "Perusahaan" },
  ];
  return isFinite(index) ? list[index] : list;
}

function VEHICLE_SIZE(index) {
  let list = [
    { value: "20 FEET STANDARD", text: "Kontainer 20 Kaki" },
    { value: "40 FEET STANDARD", text: "Kontainer 40 Kaki" },
    { value: "45 FEET HIGH CUBE", text: "Kontainer 45 Kaki" },
    { value: "40 FEET OPEN SIDE", text: "Kontainer 40 Pembuka Tiap Sisi" },
  ];
  return isFinite(index) ? list[index] : list;
}

function VEHICLE_TYPE(index) {
  let list = [
    { value: "GP", text: "Box Umum" },
    { value: "OPEN_TOP", text: "Model Buka Atas" },
    { value: "ISO_TANK", text: "Model Tanki" },
    { value: "FLAT_RACK", text: "Model Rak Datar" },
  ];
  return isFinite(index) ? list[index] : list;
}

function VENTILATOR_COUNT(index) {
  let list = [
    { value: "0", text: "Tidak ada ventilator" },
    { value: "2", text: "2 ventilator" },
    { value: "4", text: "4 ventilator" },
  ];
  return isFinite(index) ? list[index] : list;
}

function PRODUCT_TYPE(index) {
  let list = [{ value: "CONTAINER", text: "Kontainer" }];
  return isFinite(index) ? list[index] : list;
}

function CONTAINER_COLOR(index) {
  let list = [
    { value: "Putih", text: "Putih" },
    { value: "Hitam", text: "Hitam" },
    { value: "Merah", text: "Merah" },
    { value: "Biru", text: "Biru" },
    { value: "Hijau", text: "Hijau" },
    { value: "Kuning", text: "Kuning" },
    { value: "Abu-abu", text: "Abu-abu" },
    { value: "Perak", text: "Perak" },
    { value: "Cokelat", text: "Cokelat" },
    { value: "Oranye", text: "Oranye" },
  ];
  return isFinite(index) ? list[index] : list;
}

function CONTAINER_FILL(index) {
  let list = [
    { value: "FILL", text: "Kontainer Dengan Muatan" },
    { value: "BLANK", text: "Kontainer Tanpa Muatan" },
  ];
  return isFinite(index) ? list[index] : list;
}

export default {
  cut_off_transaction_date,
  cut_off_period,
  corporate_type,
  VEHICLE_SIZE,
  VEHICLE_TYPE,
  VENTILATOR_COUNT,
  PRODUCT_TYPE,
  CONTAINER_COLOR,
  CONTAINER_FILL,
};
