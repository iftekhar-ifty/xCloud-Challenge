import Filter from "@/pages/Filter.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useForm} from "@inertiajs/react";
import Modal from "@/pages/Modal.jsx";
import ShowModal from "@/pages/Server/ShowModal.jsx";
import EditModal from "@/pages/Server/EditModal.jsx";
import { router } from "@inertiajs/react"

function Home({servers}) {

    const [searchQuery, setSearchQuery] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isShowModalOpen, setIsShowModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedID, setSelectedID] = useState(null);

    const [filters, setFilters] = useState({
        provider: null,
        ram_mb: null,
        cpu_cores: null,
    });



    function getProviderClass(provider) {
        switch (provider) {
            case "AWS":
                return "bg-blue-100 text-blue-800";
            case "digitalocean":
                return "bg-green-100 text-green-800";
            case "vultr":
                return "bg-purple-100 text-purple-800";
            case "other":
                return "bg-orange-100 text-orange-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    }



    const {  delete:destroy, processing } = useForm({});
    const [showData,setShowData] = useState({
        name:'',
        provider:'',
        ip_address:'',
        ram_mb:'',
        storage_gb:'',
        status:'',
        cpu_cores:''
    });


    const {data:dataUpdate,setData:setDataUpdate,put, reset,errors} = useForm({
        name:'',
        provider:'',
        ip_address:'',
        ram_mb:'',
        storage_gb:'',
        status:'',
        cpu_cores:''
    })

    // START CRUD //////////////////////////////////////////////////////////

    // edit
    function openEditModel(server){
        setDataUpdate({
            name: server.name,
            ip_address: server.ip_address,
            provider: server.provider,
            ram_mb: server.ram_mb,
            cpu_cores: server.cpu_cores,
            storage_gb: server.storage_gb,
            status: server.status,
        });
        setSelectedID(server.id)
        setIsEditModalOpen(true);
    }

    // update
    function handleUpdate(){
        put(`/server/update/${selectedID}`,{
            onSuccess: () => {
                reset();
                setDataUpdate({
                    name: '',
                    ip_address: '',
                    provider: '',
                    ram_mb: '',
                    cpu_cores: '',
                    storage_gb: '',
                    status: '',
                });
                setIsEditModalOpen(false);
            }
        })
    }

    // show modal
    function openShowModel(server){
        setShowData({
            name: server.name,
            ip_address: server.ip_address,
            provider: server.provider,
            ram_mb: server.ram_mb,
            cpu_cores: server.cpu_cores,
            storage_gb: server.storage_gb,
            status: server.status,
        });
        setIsShowModalOpen(true);
    }

    // delete
    function handleDeleteData(){
        destroy(`server/delete/${selectedID}`);
        setIsDeleteModalOpen(false)
        setSelectedID(null)
    }

    function openDeleteModal(id){
        setIsDeleteModalOpen(true)
        setSelectedID(id)
    }

    // CRUD end /////////////////////////////////////////////////



    // START COMMON FUNCTION///////////////////////////////////////////////////
    function closeModal(modalType){
        if(modalType == 'show'){
            setIsShowModalOpen(false);
            setShowData({
                name:'',
                provider:'',
                ip_address:'',
                ram_mb:'',
                storage_gb:'',
                status:'',
                cpu_cores:''
            })
        }else if(modalType == 'edit'){
            setIsEditModalOpen(false)
        }

    }

    const updateQuery = (params = {}) => {

        const query = {
            search_value: params.search_value ?? searchQuery,
            perPage: params.perPage ?? perPage,
            filter_field: params.filter_field ?? Object.keys(filters),
            filter_value: params.filter_value ?? Object.values(filters),
            page: params.page ?? 1,
        }
        console.log(query)
        router.get("/", query, {
            preserveState: true,
            replace: true,
        })
    }


    // END COMMON FUNCTION///////////////////////////////////////////////////

    // START SEARCH & FILTER///////////////////////////////////////////////////

    const handleSearch = (value) => {
        setSearchQuery(value)
        updateQuery({ search_value: value,page: 1})

    }
    //  handle dropdown filters
    const handleFilterChange = (field, value) => {
        const newFilters = { ...filters, [field]: value }
        setFilters(newFilters)
        updateQuery({
            filter_field: Object.keys(newFilters),
            filter_value: Object.values(newFilters),
            page: 1
        })
    }

    function handlePerPage(value){
        updateQuery({ perPage: value, page: 1 })
    }

    // END SEARCH & FILTER ///////////////////////////////////////////////////////////////


    return (
        <>
            <div className="max-w-7xl mx-auto">
                {searchQuery}
                <Filter
                    setSearchQuery={handleSearch}
                    handleFilterChange={handleFilterChange}
                    setPerPage={handlePerPage}
                ></Filter>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <button className="flex items-center space-x-1 hover:text-gray-700">
                                        <span>Name</span>
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7"></path>
                                        </svg>
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <button className="flex items-center space-x-1 hover:text-gray-700">
                                        <span>Ip Address</span>
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7"></path>
                                        </svg>
                                    </button>
                                </th>

                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <button  className="flex items-center space-x-1 hover:text-gray-700">
                                        <span>Provider</span>
                                        <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7"></path>
                                        </svg>
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <button className="flex items-center space-x-1 hover:text-gray-700">
                                        <span>RAM</span>
                                        <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7"></path>
                                        </svg>
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <button  className="flex items-center space-x-1 hover:text-gray-700">
                                        <span>Storage</span>
                                        <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7"></path>
                                        </svg>
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <button  className="flex items-center space-x-1 hover:text-gray-700">
                                        <span>CPU Cores</span>
                                        <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7"></path>
                                        </svg>
                                    </button>
                                </th>

                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            { servers.data.map((server) => (
                                <tr key={server.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{server.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{server.ip_address}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProviderClass(server.provider)}`}>
                                        {server.provider}
                                                 </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ server.ram_mb }</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ server.storage_gb }</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ server.cpu_cores }</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <div className="flex space-x-2">
                                            <button type="button" onClick={() => openEditModel(server)} className="p-2  rounded-lg text-indigo-600 transition-colors">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                                </svg>
                                            </button>

                                            <button type="button" onClick={() => openShowModel(server)} className="p-2 rounded-lg text-green-600 transition-colors">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                </svg>
                                            </button>
                                            <button type="button" onClick={() => openDeleteModal(server.id)} className="p-2  rounded-lg text-red-600 transition-colors">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                            <tr>
                                <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <div className="flex gap-2 mt-4">
                                        {servers.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                onClick={() => {
                                                    if (link.url) {
                                                        const url = new URL(link.url)
                                                        const page = url.searchParams.get("page")
                                                        // preserve current perPage

                                                        updateQuery({
                                                            page: page,
                                                            search_value: searchQuery,
                                                            filter_field: Object.keys(filters),
                                                            filter_value: Object.values(filters),
                                                            perPage: perPage  })
                                                    }
                                                }}
                                                href={link.url || '#'}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className={`px-3 py-1 border rounded ${
                                                    link.active ? 'bg-gray-600 text-white' : 'bg-white'
                                                } ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
                                            />
                                        ))}
                                    </div>
                                </td>
                            </tr>

                            </tbody>
                        </table>

                    </div>

                </div>

                {/* edit Modal*/}
                <Modal
                    isOpen={isEditModalOpen}
                    title="Edit Server"
                    footer={
                        <>
                            <button onClick={() => handleUpdate()} className="px-4 py-2 text-white bg-gray-600 border rounded-md hover:bg-gray-600">
                                Update
                            </button>
                            <button onClick={() => closeModal('edit')} className="px-4 py-2 text-gray-600 bg-gray-50 border rounded-md hover:bg-gray-60">
                                Close
                            </button>
                        </>
                    }
                >
                    <EditModal setDataUpdate={setDataUpdate} errors={errors} formData={dataUpdate}></EditModal>
                </Modal>


                {/* show Modal*/}
                <Modal
                    isOpen={isShowModalOpen}
                    title="Show Server"
                    footer={
                        <>
                            <button onClick={() => closeModal('show')} className="px-4 py-2 text-white bg-gray-600 border rounded-md hover:bg-gray-600">
                                Close
                            </button>
                        </>
                    }
                >
                    <ShowModal showData={showData}></ShowModal>
                </Modal>

                {/* Delete Modal*/}
                <Modal
                    isOpen={isDeleteModalOpen}
                    title="Delete Server"
                    footer={
                        <>
                            <button disabled={processing} onClick={handleDeleteData} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-600">
                                {processing ? 'Loading...' : 'Delete' }
                            </button>
                            <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 bg-white border rounded-md hover:bg-gray-50">
                                Cancel
                            </button>
                        </>
                    }
                >
                    <div>
                        Are you sure you want to delete this? This action cannot be undone.
                    </div>
                </Modal>


            </div>
        </>
    )
}

export default Home
