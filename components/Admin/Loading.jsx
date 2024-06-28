import loading from './loading.png'
import Image from 'next/image'
export default function Loading(){
    return(
        <div className={'absolute bg-green-500 bottom-2 left-2 p-2 text-[20px] rounded-md flex flex-row place-items-center'}>
            <Image src={loading} alt="" className={'animate-spin w-5 h-5'}/>
        </div>
    )
}