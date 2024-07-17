"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation'


export default function SideNav() {
  const pathname = usePathname()
  const inactive = "px-3 py-1 pr-6 bg-primary "
  const active = inactive+ "bg-white text-black rounded-l-lg"
  return (
    <aside className="p-6 px-4 text-white text-lg pr-0 bg-primary">
      <Link href="/admin">
        <div className={'mb-2 w-full text-center pr-6'}>BrickBlockk Admin</div>
      </Link>
      <nav className={'flex flex-col gap-2'}>
        <Link href="/admin" className={pathname==="/admin"?active:inactive}>Dashboard</Link>
        <Link href="/admin/products" className={pathname.includes("/admin/products")?active:inactive}>Products</Link>
        <Link href="/admin/category" className={pathname.includes("/admin/category")?active:inactive}>Categories</Link>
        <Link href="/admin/orders" className={pathname.includes("/admin/orders")?active:inactive}>Orders</Link>
        <Link href="/admin/settings" className={pathname.includes("/admin/settings")?active:inactive}>Settings</Link>
      </nav>
    </aside>
  );
}
