"use client"
import Layout from "@/components/Admin/Layout"

function NewInput({placeholder, value, onChange, type}){
    return(
        <input placeholder={placeholder} value={value} onChange={onChange} type={type}/>
    )
}

export default function NewProduct(){
    return(
        <Layout>
            <h1>Add New Product</h1>
            <NewInput type={'text'} placeholder={'name'}/>
        </Layout>
    )
}