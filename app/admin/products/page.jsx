"use client"

import Link from "next/link"

export default function Product(){
    return(
        <>
            <Link href={'/admin/products/new-product'}>Add New Product</Link>
        </>
    )
}