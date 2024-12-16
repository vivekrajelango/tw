import { clientDetailsById, matterSearch } from '@/store/actions';
import { ClientSearchResults } from '@/types/Schema';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoaderComponent from './common/Loader';
import { useRouter } from 'next/navigation';
import Table from './common/Table';
import { ClientAPIData, SearchClientColumns } from '@/constants/constants';


interface ClientSearchProps {
    clientId: string,
    name: string,
    code: string,
    inception: string,
    matterCount: number
}

const DataTable = ({ resultData }: any) => {
    const dispatch = useDispatch();
    const route = useRouter();

    const [data, setData] = useState(resultData);
    const [isLoading, setLoading] = useState(false);
    // const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<{
        key: keyof ClientSearchProps;
        direction: 'asc' | 'desc';
    } | null>(null);

    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / entriesPerPage);

    const handleSort = (key: keyof ClientSearchProps) => {
        setSortConfig({
            key,
            direction: sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
        });

        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) return sortConfig?.direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return sortConfig?.direction === 'asc' ? 1 : -1;
            return 0;
        });
        
        setData(sortedData);
    };

    const currentPageData = data.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

    const handlePageChange = (page: number) => {
    setCurrentPage(page);
};

    const handleEntriesPerPageChange = (value: string) => {
        setEntriesPerPage(parseInt(value, 10));
        setCurrentPage(1);
    };

    const clientDetails= async(clientItems:any)=>{
        setLoading(true);
        await dispatch(clientDetailsById(clientItems.clientId));
        await dispatch(matterSearch(clientItems.clientId, ClientAPIData.CLIENT_ORDER_BY, ClientAPIData.SEARCH_ORDER, ClientAPIData.INDEX, ClientAPIData.OFF_SET))
        route.push('/details');
        setLoading(false);
    }

    useEffect(()=>{
        if(isLoading) setLoading(isLoading);
        if(resultData) setData(resultData);
    },[isLoading,resultData])

    return (
        <section className="p-5 bg-gray-100 rounded-lg border border-gray-200 shadow-md ">
            <div className="flex justify-between items-center mb-4">
                <h1 className='text-pink-500 text-xl'>Client Results</h1>
                <div className='flex flex-row gap-3'>
                    <div className="flex items-center gap-2 text-pink-500">
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

            <div className="overflow-x-auto">
                <Table 
                    data={currentPageData}
                    columns={SearchClientColumns}
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                    onRowClick={clientDetails}
                    handlePageChange={handlePageChange}
                    fullData={resultData}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </div>

            <LoaderComponent isLoading={isLoading}/>
        </section>
    );
};

export default DataTable;