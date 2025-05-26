import React from 'react'
import { Link } from 'react-router';
import editIcon from "../../assets/img/edit-icon.png";

const VendorClient = () => {
    const columns = [
        { Header: "Guest Name" },
        { Header: "Address" },
        { Header: "City" },
        { Header: "Phone Number" },
        { Header: "Actions" },
    ];

    const CountryData = [
        {
            guestName: 'John',
            adress: "Adress here",
            city: "Sialkot",
            phoneNumber: "+123456789",
        },
        {
            guestName: 'John',
            adress: "Adress here",
            city: "Sialkot",
            phoneNumber: "+123456789",
        },
        {
            guestName: 'John',
            adress: "Adress here",
            city: "Sialkot",
            phoneNumber: "+123456789",
        },
        {
            guestName: 'John',
            adress: "Adress here",
            city: "Sialkot",
            phoneNumber: "+123456789",
        },
    ];
    return (
        <div>
            <div className='bg-[#F7F7F7] rounded-lg'>
                <h4 className='text-2xl font-semibold p-3 border-b'>Vendors</h4>
                <div className='p-3'>
                    <div className="overflow-x-auto">
                        <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0 ">
                            <thead>
                                <tr>
                                    {columns.map((col) => (
                                        <th
                                            className="bg-black text-white text-left px-4 py-5 text-lg first:rounded-s-[10px] last:rounded-e-[10px]"
                                            key={col.accessor}
                                        >
                                            {col.Header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="font-medium">
                                {CountryData.map((row, index) => (
                                    <tr key={row.index} id={`row-${index + 1}`}>
                                        <td className="p-4 bg-white rounded-s-[10px]">{row.guestName}</td>
                                        <td className="p-4 bg-white rounded-s-[10px]">{row.adress}</td>
                                        <td className="p-4 bg-white rounded-s-[10px]">{row.city}</td>
                                        <td className="p-4 bg-white rounded-s-[10px]">{row.phoneNumber}</td>
                                        <td className="p-4 bg-white rounded-e-[10px]">
                                            <div className="flex items-center gap-2">
                                                <Link to="/user-dashboard/vendor-profile" className='bg-black text-white py-2 px-5 rounded-lg sm:text-lg'>
                                                    View Detail
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorClient