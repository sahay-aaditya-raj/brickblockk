import Link from 'next/link'

export default async function NotFound() {
  return (
    <div className={'p-10 flex place-content-between'}>
        <div>
            <h1 className={'font-bold text-3xl'}>नहीं मिला भाई, सही से देख</h1>
            <h2 className={'font-semibold text-xl'}>गरबर ४०४</h2>
        </div>
        <div className={'text-right'}>
            <h1 className={'font-bold text-3xl'}>Not Found Brother, Check Again</h1>
            <h2 className={'font-semibold text-xl'}>Error 404</h2>
        </div>
    </div>
  )
}