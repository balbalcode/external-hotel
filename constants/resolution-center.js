function FINDER_TYPE(index) {
  let list = [
    { text: "Log Finder", value: "true" },
    { text: "Log Transaksi", value: "false" },
  ];
  return isFinite(index) ? list[index] : list;
}

function SEARCH_TYPE(index) {
  let list = [
    { text: "Cari Invoice", value: "id" },
    { text: "Cari Nomor Truk", value: "truck_number" },
    { text: "Cari ID Transaksi", value: "license" },
    { text: "Cari Key Transaksi", value: "key" },
  ];
  return isFinite(index) ? list[index] : list;
}

function TRANSACTION_STATUS(index) {
  const list = [
    { value: "D", text: "Datang" },
    { value: "P", text: "Parkir" },
    { value: "M", text: "Permintaan Ambil" },
    { value: "A", text: "Sudah Bayar" },
    { value: "K", text: "Keluar" },
    { value: "X", text: "Bermasalah" },
  ];
  return isFinite(index) ? list[index] : list;
}

function LOG_STATUS(code) {
  const status = {
    D: "Masuk",
    M: "Checkout",
    P: "Metode Pembayaran",
    U: "Ubah Metode Pembayaran",
    A: "Bayar",
    K: "Transaksi Selesai",
    X: "Transaksi Finder Bermasalah",
    F: "Tutup Paksa",
    I: "Ubah Plat dan/atau Jenis Kendaraan",
    IK: "Ubah Jenis Kendaraan",
    IM: "Ubah Plat Manless",
    C: "Klaim Tiket",
    S: "Send",
    LB: "Bayar Saat Masuk",
    DELETED: "Dihapus",
    OVERNIGHT: "Inap",
  };
  return status.hasOwnProperty(code) ? status[code] : code ?? "-";
}

function REASON_TYPE(index) {
  let list = [
    { text: "Sistem Bermasalah", value: "SB" },
    { text: "Tiket Ganda", value: "TG" },
    { text: "Member", value: "M" },
    { text: "Ormas", value: "O" },
    { text: "Polisi/TNI", value: "PT" },
    { text: "Direksi/BM", value: "DB" },
    { text: "Perawatan Lokasi", value: "PL" },
    { text: "Lainnya", value: "X" },
  ];
  return isFinite(index) ? list[index] : list;
}

function REASON_MAP() {
  let map = {};
  const list = REASON_TYPE();
  list.forEach((type) => {
    map[type.value] = type.text;
  });
  return map;
}

function IMAGE_PARTS(index) {
  const list = [
    { value: "image_url", text: "Pintu Masuk" },
    { value: "image_out_url", text: "Pintu Keluar" },
  ];
  return isFinite(index) ? list[index] : list;
}

export default {
  FINDER_TYPE,
  SEARCH_TYPE,
  TRANSACTION_STATUS,
  LOG_STATUS,
  REASON_TYPE,
  REASON_MAP,
  IMAGE_PARTS,
};
