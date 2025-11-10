import user_constant from "@/constants/user";

let roles = user_constant.type();
const all_roles = roles.map((role) => role.value);

let menuItems = ["/dashboard", "/payment", "/profile", "/logout"];

const pageAttributes = {
  "/dashboard": {
    id: "parent-menu-detailCompany",
    label: "Detail Perusahaan",
    icon: "bx bx-buildings",
    link: "/dashboard",
  },
  "/payment": {
    id: "parent-menu-paymentHistory",
    label: "Riwayat Pembayaran",
    icon: "bx bx-dollar-circle",
    link: "/payment",
  },
  "/profile": {
    id: "parent-menu-profile",
    label: "Profil",
    icon: "bx bx-face ",
    link: "/profile",
    reverse_menu_order: 2,
  },
  "/logout": {
    id: "parent-menu-logout",
    label: "Keluar",
    icon: "bx bx-exit",
    link: "/logout",
    reverse_menu_order: 1,
  },
};

function setItem(items, parents) {
  return items.map((item, index) => {
    let attribute;
    if (typeof item == "string" && pageAttributes[item]) {
      if (!pageAttributes[item].parents)
        pageAttributes[item].parents = [...parents];
      else pageAttributes[item].parents.push(...parents);
      attribute = { ...pageAttributes[item] };
    } else if (item.subItems && item.subItems.length) {
      parents.push(item.id);
      attribute = { ...item, subItems: setItem(item.subItems, parents) };
    } else attribute = item;

    if (index == items.length - 1) parents.pop();
    return attribute;
  });
}

menuItems = setItem(menuItems, []);

export { menuItems };

export function getPageAttribute(route) {
  const key = route.replace(/\/$/g, "");
  return pageAttributes[key] ?? {};
}

export function reloadMenu(route) {
  const key = route.replace(/\/$/g, "");
  const target = menuBridge[key];

  if (target) window.location.href = target;
  else window.location.reload();
}
