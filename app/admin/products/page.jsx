"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import Loading from "@/components/Admin/Loading"

export default function Product(){
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    async function getAll(){
        const res = await fetch("/api/products",{
            method: "GET",
        })
        const data = await res.json()
        if(res.status === 200){
            setProducts(data.data)
            console.log(data.data)
            setLoading(false)
        } else {
            setLoading(false)
            alert(data.message)
        }
    }
    useEffect(()=>{
        getAll()
    },[])
    return(
        <div className={'w-full flex flex-col'}>
            <div className="mb-3 mt-3">
            <Link href={'/admin/products/new-product'}
                className={'bg-primary hover:bg-primaryHover p-2 text-white rounded-md'}
            >
                Add New Product
            </Link>
            </div>
            <div className='flex flex-col flex-nowrap'>
                <div className={'w-full flex flex-row flex-nowrap px-2 p-1 bg-slate-300 rounded-t-md'}>
                    <div className={'w-1/4'}>
                        Name
                    </div>
                    <div className={'w-1/4 md:w-1/6'}>
                        Price
                    </div>
                    <div className={'flex-grow'}>
                        <div className={'hidden md:inline'}>Description</div>
                    </div>
                </div>
                {products && products.map((product, index) => (
                        <div className={'w-min-full flex flex-row flex-nowrap px-2 p-1 hover:bg-neutral-300 border-b-[1px] border-gray-400 hover:border-b-2 hover:border-gray-500'} key={index}>
                            <div className={'w-1/4 capitalize'}>
                                {product.name}
                            </div>
                            <div className={'w-1/4 md:w-1/6'}>
                                {product.price}
                            </div>
                            <div className={'hidden md:w-1/4 md:inline truncate'} title={product.desc}>
                                {product.desc}
                            </div>
                            <div className={'flex flex-row justify-end flex-grow'}>
                                <Link href="#" className={'bg-primary hover:bg-primaryHover px-4 text-white rounded-md mx-2'}>Edit</Link>
                                <Link href="#" className={'bg-primary hover:bg-primaryHover px-2 text-white rounded-md mx-2'}>Delete</Link>
                            </div>
                        </div>
                    ))}
                    <div className={'w-min-full flex flex-row flex-nowrap px-2 p-1 bg-slate-300 rounded-b-md h-2'}></div>
            </div>
            {loading && <Loading/>}
        </div>
    )
}