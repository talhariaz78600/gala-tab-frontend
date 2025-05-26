import VenueReportsTable from '../../components/adminDashboard/VenueReportsTable'
import BasicSelect from '../../components/VendorDashboard/BasicSelect'
import React from 'react'

const ReportAnalytics = () => {
    return (
        <div>
            <div className="bg-[#F7F7F7] min-h-[calc(100dvh-130px)] p-5 rounded-[20px] flex flex-col justify-between">
                <div className="">
                    <div className="flex items-center flex-wrap justify-between p-5 border-b">
                        <p className="text-[28px] leading-normal font-semibold">
                            Venue Reports
                        </p>
                        <div className="flex items-center flex-wrap-reverse gap-4 justify-end ms-auto">
                            <BasicSelect />
                        </div>
                    </div>
                    <div className="p-5">
                        <VenueReportsTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportAnalytics