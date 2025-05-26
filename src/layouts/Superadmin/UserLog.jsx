import React from 'react'
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Link } from "react-router";

const UserLog = () => {
    const columns = [
        { Header: "Name" },
        { Header: "Actions" },
    ];

    const listingData = [
        {
            name: "admin1",
        },
    ];
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0 ">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th
                                    className="bg-black text-white text-left px-4 py-5 text-lg first:rounded-s-[10px] last:rounded-e-[10px] font-medium"
                                    key={col.accessor}
                                >
                                    {col.Header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="font-medium">
                        {listingData.map((row) => (
                            <tr key={row.id}>
                                <td className="p-4 bg-white rounded-s-[10px]">
                                    {row.name}
                                </td>
                                <td className="p-4 bg-white rounded-e-[10px]">
                                    <div className="flex items-center gap-3">
                                        <Link to="/admin-dashboard/log-detail"><MdOutlineRemoveRedEye className='bg-[#f5f5f5] p-2 text-4xl rounded-lg'/> </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserLog