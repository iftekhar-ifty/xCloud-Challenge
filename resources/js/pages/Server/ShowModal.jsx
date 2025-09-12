function ShowModal({showData}){
    return(
        <>
            <div className="mt-2">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" readOnly value={showData.name} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ip_address</label>
                        <input type="text" readOnly value={showData.ip_address} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Provider</label>
                        <input type="text" readOnly value={showData.provider} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">RAM</label>
                        <input type="text" readOnly value={showData.ram_mb} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">CPU cores</label>
                        <input type="text" readOnly value={showData.cpu_cores} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Storage</label>
                        <input type="text" readOnly value={showData.storage_gb} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <input type="text" readOnly value={showData.status} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowModal;
