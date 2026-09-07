import type { AppRole } from "./types";

export const ROLE_LABELS: Record<AppRole, string> = {
  admin: "Super-admin",
  marketing_head: "Marketing bo'lim boshlig'i",
  smm: "SMM mutaxassisi",
  copywriter: "Copywriter",
  videographer: "Mobilograf",
  it: "IT bo'lim xodimi",
};

export const ROLE_HOME: Record<AppRole, string> = {
  admin: "/admin",
  marketing_head: "/marketing-boshligi",
  smm: "/smm",
  copywriter: "/copywriter",
  videographer: "/mobilograf",
  it: "/it",
};

export interface NavItem {
  href: string;
  label: string;
}

export const ROLE_NAV: Record<AppRole, NavItem[]> = {
  admin: [
    { href: "/admin", label: "Bosh sahifa" },
    { href: "/admin/xodimlar", label: "Xodimlar" },
  ],
  marketing_head: [
    { href: "/marketing-boshligi", label: "Umumiy ko'rinish" },
    { href: "/marketing-boshligi/jamoa", label: "Jamoa" },
    { href: "/marketing-boshligi/kampaniyalar", label: "Kampaniyalar" },
    { href: "/marketing-boshligi/hisobotlar", label: "Hisobotlar" },
  ],
  smm: [
    { href: "/smm", label: "Statistika" },
    { href: "/smm/kontent-reja", label: "Kontent-reja" },
    { href: "/smm/postlar", label: "Postlar" },
  ],
  copywriter: [
    { href: "/copywriter", label: "Topshiriqlar" },
    { href: "/copywriter/matnlar", label: "Matnlar arxivi" },
  ],
  videographer: [
    { href: "/mobilograf", label: "Video-reja" },
    { href: "/mobilograf/videolar", label: "Videolar" },
  ],
  it: [
    { href: "/it", label: "Texnik holat" },
    { href: "/it/integratsiyalar", label: "Integratsiyalar" },
  ],
};
