import { redirect } from "next/navigation";

// Middleware autentifikatsiya holatiga qarab bu yerga yetib kelishdan oldin
// allaqachon /login yoki foydalanuvchi roliga mos sahifaga yo'naltiradi.
export default function RootPage() {
  redirect("/login");
}
