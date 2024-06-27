"use client"


function NewInput({placeholder, value, onChange, type, name, id}){
    return(
        <div className={'flex flex-col'}>
            <label htmlFor={`${name}`} className={'text-[20px]'}>Product Name</label>
            <input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            id={id}
            type={type}
            name={name}
            className={
                'bg-gray-300 border-b-gray-500 border-b-[1px] text-[16px] p-1 rounded-sm focus:border-b-gray-800 focus:border-b-[3px]'
              }/>
        </div>
    )
}

export default function NewProduct(){
    return(
        <div className={'flex flex-col md:w-1/2'}>
            <NewInput placeholder={'Product Name'} type={'text'} name={'product'} id={'product'}/>
        </div>
    )
}