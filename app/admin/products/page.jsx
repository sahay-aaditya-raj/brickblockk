/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Link from "next/link"
import React,{ useState, useEffect } from "react"
import Loading from "@/components/Admin/Loading"
import { withSwal } from 'react-sweetalert2';
import { useSession } from "next-auth/react";

function Product({swal}){
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const { data: session, status } = useSession();
    async function getAll(){
        setLoading(true)
        const res = await fetch("/api/products",{
            method: "GET",
        })
        const data = await res.json()
        if(res.status === 200){
            setProducts(data.data)
            setLoading(false)
        } else {
            setLoading(false)
            sweetAlert(data.message)
        }
    }
    useEffect(()=>{
        getAll()
    },[])

    function sweetAlert(message){
        swal.fire({
            title: 'Oops! Something went wrong',
            text: `${message}`,
            confirmButtonText: "Close !",
            confirmButtonColor:"red",
            didOpen: () => {
            },
            didClose: () => {
            },
        }).then(result => {
            // when confirmed and promise resolved...
        }).catch(error => {
            // when promise rejected...
        });
    }
    function deleteButton(id,name){
        swal.fire({
            text:`Are you Sure want to Delete ${name} ?`,
            confirmButtonText:`Yes`,
            confirmButtonColor:`#cc1111`,
            showCancelButton:true,
            cancelButtonText:`No`,
            cancelButtonColor:`#01bb15`,
            allowEscapeKey:true,
        }).then((result) => {
            if (result.isConfirmed) {
                async function deleteEntry(){
                    const res = await fetch(`/api/products`,{
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': session.user.id
                        },
                        body:JSON.stringify({ id })
                    })
                    if (res.status === 200){
                        swal.fire({
                            title:"Deleted Successfully !",
                            timer: 5000,
                            icon:'success'
                        })
                        getAll()
                    }
                }
                deleteEntry()
            }
          });
    }
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
                                <Link href={`/admin/products/${product._id}`} className={'bg-primary hover:bg-primaryHover px-4 text-white rounded-md mx-2'}>Edit</Link>
                                <button onClick={()=>deleteButton(product._id, product.name)} className={'bg-primary hover:bg-primaryHover px-2 text-white rounded-md mx-2'}>Delete</button>
                            </div>
                        </div>
                    ))}
                    <div className={'w-min-full flex flex-row flex-nowrap px-2 p-1 bg-slate-300 rounded-b-md h-2'}></div>
            </div>
            {loading && <Loading/>}
        </div>
    )
}

export default withSwal(({swal}, ref)=>(
    <Product swal={swal} />
))