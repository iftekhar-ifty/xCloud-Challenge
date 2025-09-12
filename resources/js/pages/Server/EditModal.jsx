function EditModal({setDataUpdate,errors,formData}){
    return(
        <>
            <div className="mt-2">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" value={formData.name} onChange={(e) => setDataUpdate('name', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
                        {errors.name && <span className="text-red-600">{errors.name}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ip_address</label>
                        <input type="text" value={formData.ip_address} onChange={(e) => setDataUpdate('ip_address', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
                        {errors.ip_address && <span className="text-red-600">{errors.ip_address}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Provider</label>
                        <select value={formData.provider} onChange={(e) => setDataUpdate('provider', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500">
                            <option value="AWS">AWS</option>
                            <option value="Google Cloud">Google Cloud</option>
                            <option value="Azure">Azure</option>
                            <option value="DigitalOcean">DigitalOcean</option>
                        </select>
                        {errors.provider && <span className="text-red-600">{errors.provider}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">RAM</label>
                        <input value={formData.ram_mb} onChange={(e) => setDataUpdate('ram_mb', e.target.value)} type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
                        {errors.ram_mb && <span className="text-red-600">{errors.ram_mb}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">CPU cores</label>
                        <input value={formData.cpu_cores} onChange={(e) => setDataUpdate('cpu_cores', e.target.value)} type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
                        {errors.cpu_cores && <span className="text-red-600">{errors.cpu_cores}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Storage</label>
                        <input type="text" value={formData.storage_gb} onChange={(e) => setDataUpdate('storage_gb', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
                        {errors.storage_gb && <span className="text-red-600">{errors.storage_gb}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select value={formData.status}  onChange={(e) => setDataUpdate('status', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                        {errors.status && <span className="text-red-600">{errors.status}</span>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditModal;
