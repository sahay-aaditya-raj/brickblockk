"use client"
import Layout from "@/components/Admin/Layout"
import Link from "next/link"

export default function Product(){
    return(
        <Layout>
            <Link href={'/admin/products/new-product'}>Add New Product</Link>
        </Layout>
    )
}