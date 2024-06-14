"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function SideNav() {
  console.log(useRouter())
  const inactive = "px-3 py-1 pr-6 "
  const active = inactive+ "bg-white text-black rounded-l-lg"
  
  return (
    <aside className="p-6 px-4 text-white text-lg pr-0">
      <Link href="/admin">
        <div className={'mb-2 w-full text-center pr-6'}>BrickBlockk Admin</div>
      </Link>
      <nav className={'flex flex-col gap-2 text-center'}>
        <Link href="/admin" >Dashboard</Link>
        <Link href="/admin/products">Products</Link>
        <Link href="/admin/orders" >Orders</Link>
        <Link href="/admin/settings">Settings</Link>
      </nav>
    </aside>
  );
}
