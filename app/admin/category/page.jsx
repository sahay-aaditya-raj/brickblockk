"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { withSwal } from 'react-sweetalert2';
import Loading from "@/components/Admin/Loading";

function Category({ swal }) {
    const [category, setCategory] = useState("");
    const { data: session, status } = useSession();
    const [catData, setCatData] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getCat() {
        setLoading(true);
        const res = await fetch('/api/category', {
            method: 'GET'
        });
        if (res.status !== 200) {
            swal.fire("Something Went Wrong", "Refreshing Site", "warning");
        }
        const data = await res.json();
        setCatData(data.data);
        console.log(data.data)
        setLoading(false);
    }

    useEffect(() => {
        getCat();
    }, []);

    async function UploadCategory() {
        setLoading(true);
        if (!category) {
            swal.fire("Category is Empty", "", "warning");
            setLoading(false);
            return;
        }
        const res = await fetch('/api/category', {
            method: 'POST',
            body: JSON.stringify({ category }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': session.user.id
            }
        });
        const data = await res.json();
        if (res.status === 200) {
            swal.fire("Added Successfully", "", "success");
            setCategory("");
            getCat();
        } else {
            swal.fire(`${data.message}`,"","warning")
        }
        setLoading(false);
    }
    async function deleteButton(categoryId){
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
                    setLoading(true)
                    const res = await fetch('/api/category', {
                        method: 'DELETE',
                        body: JSON.stringify({ categoryId }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': session.user.id
                        }
                    });
                    if (res.status === 200) {
                        swal.fire("Deleted Successfully", "", "success");
                        getCat();
                    } else {
                        swal.fire(`${data.message}`,"","warning")
                    }
                    setLoading(false);}
                deleteEntry()
            }
          });
    }

    return (<>
        <div className="flex flex-col">
            <div className="flex flex-row w-full lg:w-1/2 gap-x-6 mb-4">
                <input
                    placeholder='New Category'
                    type="text"
                    value={category}
                    onChange={(e) => { setCategory(e.target.value); }}
                    className={
                        'bg-gray-300 border-b-gray-500 border-b-[1px] text-[16px] p-1 rounded-sm focus:border-b-gray-800 focus:border-b-[3px] flex-grow'
                    } />
                <button
                    className={'bg-primary hover:bg-primaryHover text-white rounded-md px-2'}
                    onClick={UploadCategory}
                >
                    Add New Category
                </button>
            </div>
            <div className='flex flex-col flex-nowrap'>
                <div className={'w-full flex flex-row flex-nowrap px-2 p-1 bg-slate-300 rounded-t-md'}>
                    <div>
                        Name
                    </div>
                </div>
                {catData && catData.map((product, index) => (
                        <div className={'w-min-full flex flex-row flex-nowrap px-2 p-1 hover:bg-neutral-300 border-b-[1px] border-gray-400 hover:border-b-2 hover:border-gray-500'} key={index}>
                            <div className={'flex-grow capitalize'}>
                                {product.name}
                            </div>
                            <button onClick={()=>deleteButton(product._id,)} className={'bg-primary hover:bg-primaryHover px-2 text-white rounded-md mx-2'}>Delete</button>
                        </div>
                    ))}
                    <div className={'w-min-full flex flex-row flex-nowrap px-2 p-1 bg-slate-300 rounded-b-md h-2'}></div>
            </div>
        </div>
        {loading && <Loading />}
        </>
    );
}

export default withSwal(({ swal }, ref) => (
    <Category swal={swal} />
));
