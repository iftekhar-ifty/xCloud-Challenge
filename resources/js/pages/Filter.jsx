import {useState, useEffect} from "react";
import {useForm, usePage} from "@inertiajs/react";
import Modal from "@/pages/Modal.jsx";

function Filter({setsearchQuery, setProviderData,handleFilterChange,resetAllFilter}){
    const [isOpen, setIsOpen] = useState(false);
    const {data,setData,post,errors,processing} = useForm({
        name:'',
        provider:'',
        ip_address:'',
        ram_mb:'',
        storage_gb:'',
        status:'',
        cpu_cores:''
    })

    function handleStoreData(e){
        e.preventDefault();
        post('server/store',{
            onSuccess: () => {
                setData({
                    name:'',
                    provider:'',
                    ip_address:'',
                    ram_mb:'',
                    storage_gb:'',
                    status:'',
                    cpu_cores:''
                })
                setIsOpen(false);
            }
        })

    }

    const {flash} = usePage().props
    const [showSuccess, setShowSuccess] = useState(true);
    const [showError, setShowError] = useState(true);


    return(
        <>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Server Management</h1>
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex-1 min-w-64">
                        <div className="relative">
                            <input
                                onChange={(e) => setsearchQuery(e.target.value)}
                                type="text"
                                placeholder="Search servers..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"></path>
                            </svg>
                        </div>
                    </div>

                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"></path>
                        </svg>
                    </button>
                    <select  onChange={(e) => handleFilterChange("provider", e.target.value)} id="select" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">All Providers</option>
                        <option value="aws">AWS</option>
                        <option value="digitalocean">Digital Ocean</option>
                        <option value="vultr">Vultr's</option>
                        <option value="other">other</option>
                    </select>
                    <select
                        onChange={(e) => handleFilterChange("cpu_cores", e.target.value)}
                        id="select1" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">All Core</option>
                        <option value="6">6</option>
                        <option value="10">10</option>
                        <option value="12">12</option>
                        <option value="20">20</option>
                        <option value="34">34 </option>
                    </select>
                    <select  onChange={(e) => handleFilterChange("ram_mb", e.target.value)} id="select2" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">All Ram</option>
                        <option value="512">512</option>
                        <option value="1024">1024</option>
                        <option value="2048">2048</option>
                        <option value="other">other</option>
                    </select>
                    <button onClick={resetAllFilter} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                        <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
                        </svg>
                    </button>
                    <button   onClick={() => setIsOpen(true)} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                        Add New Server
                    </button>
                </div>
                {isOpen &&  (
                    <div className="fixed inset-0 z-50 overflow-y-auto" >
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" >Server Create</h3>
                                            <div className="mt-2">
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                                        <input type="text" onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
                                                        {errors.name && <span className="text-red-600">{errors.name}</span>}
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">ip_address</label>
                                                        <input type="text" onChange={(e) => setData('ip_address', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
                                                        {errors.ip_address && <span className="text-red-600">{errors.ip_address}</span>}
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Provider</label>
                                                        <select onChange={(e) => setData('provider', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500">
                                                            <option value="AWS">AWS</option>
                                                            <option value="Google Cloud">Google Cloud</option>
                                                            <option value="Azure">Azure</option>
                                                            <option value="DigitalOcean">DigitalOcean</option>
                                                        </select>
                                                        {errors.provider && <span className="text-red-600">{errors.provider}</span>}
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">RAM</label>
                                                        <input onChange={(e) => setData('ram_mb', e.target.value)} type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
                                                        {errors.ram_mb && <span className="text-red-600">{errors.ram_mb}</span>}
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">CPU cores</label>
                                                        <input onChange={(e) => setData('cpu_cores', e.target.value)} type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
                                                        {errors.cpu_cores && <span className="text-red-600">{errors.cpu_cores}</span>}
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Storage</label>
                                                        <input type="text" onChange={(e) => setData('storage_gb', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
                                                        {errors.storage_gb && <span className="text-red-600">{errors.storage_gb}</span>}
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Status</label>
                                                        <select onChange={(e) => setData('status', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500">
                                                            <option value="active">Active</option>
                                                            <option value="inactive">Inactive</option>
                                                            <option value="maintenance">Maintenance</option>
                                                        </select>
                                                        {errors.status && <span className="text-red-600">{errors.status}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">

                                    <button onClick={handleStoreData} disabled={processing}  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">

                                        {
                                            processing ? 'Loading...' : 'Save Changes'
                                        }

                                    </button>



                                    <button onClick={() => setIsOpen(false)}  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        <span>Close</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <div>
                {flash.success &&  showSuccess && (
                    <div className="flex items-center justify-between bg-green-500 text-white p-2 rounded mb-4">
                        <span> {flash.success}</span>
                        <button  onClick={() => setShowSuccess(false)} className="ml-4 font-bold text-white hover:text-gray-200">
                            ×
                        </button>

                    </div>
                )}

                {flash.error && showError && (
                    <div className="flex items-center justify-between bg-red-500 text-white p-2 rounded mb-4">
                        <span>{flash.error}</span>
                        <button  onClick={() => setShowError(false)} className="ml-4 font-bold text-white hover:text-gray-200">
                            ×
                        </button>
                    </div>
                )}
            </div>



        </>
    )
}
export default Filter
