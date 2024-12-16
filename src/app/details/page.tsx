"use client"
import LoaderComponent from '@/components/common/Loader';
import dayjs from 'dayjs';
import { ModalPopUp } from '@/components/common/Modal';
import Table from '@/components/common/Table';
import MatterDetails from '@/components/DetailsPage';
import { ClientDetailsColumns, DateFormats, MatterSearchColumns } from '@/constants/constants';
import { matterDetailsById } from '@/store/actions';
import { AppState } from '@/store/reducers';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

interface ClientDetailsProps {
    title: string,
    firstName: string,
    lastName: string,
    preferredName: string,
    email: string,
    phone: any
}

interface MatterDetailProps {
    clientId: string,
    matterId: string,
    matterName: string,
    matterCode: string,
    matterDate: string
}

const DetailsPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const clientResults = useSelector((state: AppState) => state.user.clientDetailsResults);
    const matterResults = useSelector((state: AppState) => state.user.matterSearchResults);
    const matterDesc = useSelector((state: AppState) => state.user.matterDetailsResults);

    const [clientDetails, setClientDetails] = useState(clientResults);
    const [matterDetails, setMatterDetails] = useState(matterResults);
    const [isLoading, setLoading] = useState(false);
    const [isOpen, setOpen] = useState(false);

    const [sortConfig, setSortConfig] = useState<{
        key: keyof ClientDetailsProps;
        direction: 'asc' | 'desc';
    } | null>(null);
    const [sortMatterConfig, setMatterConfig] = useState<{
        key: keyof MatterDetailProps;
        direction: 'asc' | 'desc';
    } | null>(null);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const clientTotalPages = Math.ceil(clientDetails?.people?.length / entriesPerPage);
    const matterTotalPages = Math.ceil(matterDetails?.length / entriesPerPage);

    const matterPageData = matterDetails?.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

    const handleSort = (key: keyof ClientDetailsProps) => {
        setSortConfig({
            key,
            direction: sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
        });

        const people = [...clientDetails?.people].sort((a, b) => {
            if (a[key] < b[key]) return sortConfig?.direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return sortConfig?.direction === 'asc' ? 1 : -1;
            return 0;
        });
        setClientDetails({ ...clientDetails, people });
    };

    const handleMatterSort = (key: keyof MatterDetailProps) => {
        setMatterConfig({
            key,
            direction: sortMatterConfig?.key === key && sortMatterConfig.direction === 'asc' ? 'desc' : 'asc'
        });

        const sortedData = [...matterDetails].sort((a, b) => {
            if (a[key] < b[key]) return sortConfig?.direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return sortConfig?.direction === 'asc' ? 1 : -1;
            return 0;
        });
        setMatterDetails(sortedData);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleEntriesPerPageChange = (value: string) => {
        setEntriesPerPage(parseInt(value, 10));
        setCurrentPage(1);
    };

    const handleMatterById= async(matterItems:any)=>{
        setLoading(true);
        dispatch(matterDetailsById(matterItems.matterId));
        setLoading(false);
        setOpen(!isOpen);
    };

    useEffect(() => {
        if (clientResults === null) router.push('/');
        if (clientDetails) setClientDetails(clientDetails);
    }), [clientResults, clientDetails];

    return (
        <section className="bg-white">
            <div className="m-2 md:my-8 mx-4 md:p-4 h-[100vh] md:w-[80%] md:mx-auto">
                <div className="flex flex-row justify-between text-center mb-6">
                    <h2 className="text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">Client Details</h2>
                    <button onClick={() => router.back()} className="flex flex-row gap-1 text-black hover:bg-gray-200 border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3">
                        <ArrowLeft size={20} /> Go back
                    </button>
                </div>


                <div className="flex flex-col md:flex-row gap-4">
                    <article className="p-3 md:p-6 bg-white rounded-lg border border-gray-200 shadow-md w-full md:w-[40%]">
                        <h2 className="text-gray-600 mb-2">Client Name:
                            <span className="font-light text-gray-500 ml-2">{clientDetails?.name}</span>
                        </h2>
                        <h2 className="text-gray-600 mb-2">Client Description:
                            <span className="font-light text-gray-500 ml-2">{clientDetails?.description}</span>
                        </h2>
                        <h2 className="text-gray-600 mb-2">Client Description:
                            <span className="font-light text-gray-500 ml-2">{dayjs(clientDetails?.inceptionDate).format(DateFormats.DATE_WITH_SLASH)}</span>
                        </h2>
                        <h3 className="text-gray-600 mb-1">Address: </h3>
                        <p className="font-light text-gray-500 ">{clientDetails?.address?.addressLine1}</p>
                        <p className="font-light text-gray-500 ">{clientDetails?.address?.addressLine2}</p>
                        <p className="font-light text-gray-500 ">{clientDetails?.address?.city}</p>
                        <p className="font-light text-gray-500 ">{clientDetails?.address?.county} {clientDetails?.address?.postcode}</p>
                    </article>

                    <article className="p-3 bg-white rounded-lg border border-gray-200 shadow-md md:w-[60%] overflow-x-auto">
                        <Table
                            data={clientDetails?.people || []}
                            columns={ClientDetailsColumns}
                            sortConfig={sortConfig}
                            handleSort={handleSort}
                            onRowClick={() => null}
                            handlePageChange={handlePageChange}
                            fullData={clientResults}
                            currentPage={currentPage}
                            totalPages={clientTotalPages}
                            footer={false}
                        />
                    </article>
                </div>

                <div className='py-8'>
                    <article className="p-5 bg-white rounded-lg border border-gray-200 shadow-md overflow-x-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className='text-gray-600'>Matters</h1>
                            <div className='flex flex-row gap-3 text-gray-600'>
                                <div className="flex items-center gap-2">
                                    <span>entries per page</span>
                                    <select
                                        value={entriesPerPage}
                                        onChange={(e) => handleEntriesPerPageChange(e.target.value)}
                                        className="px-2 py-1 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <Table
                            data={matterPageData || []}
                            columns={MatterSearchColumns}
                            sortConfig={sortMatterConfig}
                            handleSort={handleMatterSort}
                            onRowClick={handleMatterById}
                            handlePageChange={handlePageChange}
                            fullData={matterResults}
                            currentPage={currentPage}
                            totalPages={matterTotalPages}
                            footer={true}
                        />
                    </article>
                </div>
            </div>
            <LoaderComponent isLoading={isLoading}/>
            <ModalPopUp open={isOpen} handleModalClose={()=>setOpen(!isOpen)}>
                <MatterDetails data={matterDesc}/>
            </ModalPopUp>
        </section>
    )
}

export default DetailsPage;
