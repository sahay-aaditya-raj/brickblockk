"use client"
import { useState } from "react"
import closepng from "./close.png"
import Image from "next/image"
import { useSession } from "next-auth/react";
import Loading from "@/components/Admin/Loading";

function NewInput({ placeholder, value, onChange, type, name, id }) {
    return (
        <div className={'flex flex-col my-2'}>
            <span htmlFor={`${id}`} className={'text-[20px]'}>{placeholder}</span>
            <input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                id={id}
                type={type}
                name={name}
                className={
                    'bg-gray-300 border-b-gray-500 border-b-[1px] text-[16px] p-1 rounded-sm focus:border-b-gray-800 focus:border-b-[3px]'
                } />
        </div>
    )
}

export default function NewProduct() {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [err, setErr] = useState('')
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false)

    async function handleForm(e) {
        e.preventDefault()
        if (!name) { setErr('Name must be Provided !'); return }
        if (!desc) { setErr('Description must be Provided !'); return }
        if (!price) { setErr('Price must be Provided !'); return }
        if (Number.isNaN(parseFloat(price))) { setErr('Price must be a number !'); return }
        setLoading(true)
        const res = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify({ name, price, desc }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': session.user.id
            }
        })
        const data = await res.json()
        setLoading(false)
        if(res.status == 201){
            alert("Added Successfully !")
            setDesc(''); setName(''); setPrice('');
        } else {
            alert(`Not Added, ${data.message}`)
        }
    }
    return (
        <form className={'flex flex-col lg:w-1/2'} onSubmit={handleForm}>
            <h2 className={'text-[25px] mb-2'}>Add Item</h2>
            <NewInput placeholder={'Product Name'} type={'text'} name={'product'} id={'product'}
                value={name}
                onChange={(e) => setName(e.target.value)} />
            <NewInput placeholder={'Price (INR)'} type={'text'} name={'price'} id={'price'}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <div className={'flex flex-col my-2'}>
                <label htmlFor={`description`} className={'text-[20px]'}>Product Description</label>
                <textarea
                    placeholder="Product Description"
                    id='desc'
                    name={'desc'}
                    className={
                        'bg-gray-300 border-b-gray-500 border-b-[1px] text-[16px] p-1 rounded-sm focus:border-b-gray-800 focus:border-b-[3px]'}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
            </div>
            {err &&
                <div className="bg-red-500 p-2 rounded-md flex justify-between">
                    <div>{err}</div>
                    <button
                        onClick={() => {
                            if (err == 'Price must be a number !') setPrice('')
                            else setErr('')
                        }}
                        className={'transition-all duration-500 hover:rotate-[30deg]'}>
                        <Image src={closepng} alt={'close'} />
                    </button>
                </div>
            }
            <button className={'bg-primary rounded-md my-2 p-2 text-white text-[15px] shadow-lg hover:bg-primaryHover'} value="Submit" type="Submit">Add Product</button>
            {loading && <Loading/>}
        </form>
    )
}
