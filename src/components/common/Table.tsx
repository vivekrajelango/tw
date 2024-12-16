import React from 'react';
import dayjs from 'dayjs';
import { DateFormats } from '@/constants/constants';

interface TableColumn {
    label: string;
    dataKey: string;
    sortFunction?: (a: any, b: any) => number; // Optional sorting function
}

interface TableProps {
    data: any[];
    fullData?: any[];
    columns: TableColumn[];
    sortConfig?: { key: string; direction: 'asc' | 'desc' } | null;
    handleSort?: any;
    onRowClick?: (item: any) => void;
    handlePageChange?: any;
    currentPage?:any;
    totalPages?:any;
    footer?:boolean;
}

const Table: React.FC<TableProps> = ({ data,fullData, columns, sortConfig, handleSort, onRowClick, handlePageChange, currentPage, totalPages,footer=true }) => {
    
    return (
        <>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-200">
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                                onClick={() => handleSort?.(column.dataKey)}
                            >
                                {column.label}
                                {sortConfig?.key === column.dataKey && (
                                    <span className="ml-1">
                                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => onRowClick?.(item)}
                        >
                            {columns.map((column) => (
                                <td key={column.dataKey} className="px-6 py-4 text-sm text-gray-600">
                                    {/* {item[column.dataKey]} */}
                                    {column.dataKey==="inception" || column.dataKey==="matterDate" ? dayjs(item[column.dataKey]).format(DateFormats.DATE_WITH_SLASH) : item[column.dataKey]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {footer && 
            <div className="mt-4 flex justify-between items-center text-gray-500">
                <div className="text-sm text-gray-500">
                    Showing {data.length} of {fullData?.length} entries
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded hover:bg-gray-50"
                    >
                        ←
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-gray-200' : 'hover:bg-gray-50'}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded hover:bg-gray-50"
                    >
                        →
                    </button>
                </div>
            </div>
            }
        </>
    );
};

export default Table;