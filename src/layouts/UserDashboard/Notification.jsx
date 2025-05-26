import React from 'react'
import DoubleBell from "../../assets/img/double-bell.png"
import { GoDotFill } from 'react-icons/go'

const Notification = () => {
    const notifications = [
        {
          id: 1,
          title: "Booking Request Accepted",
          description: "New users profile link",
          date: "11/02/2023",
          timeAgo: "1 mins. ago",
          icon: DoubleBell, 
        },
        {
            id: 2,
            title: "Booking Request Accepted",
            description: "New users profile link",
            date: "11/02/2023",
            timeAgo: "1 mins. ago",
            icon: DoubleBell,
        },
        {
            id: 3,
            title: "Booking Request Accepted",
            description: "New users profile link",
            date: "11/02/2023",
            timeAgo: "1 mins. ago",
            icon: DoubleBell,
        },
        {
            id: 4,
            title: "Booking Request Accepted",
            description: "New users profile link",
            date: "11/02/2023",
            timeAgo: "1 mins. ago",
            icon: DoubleBell,
        },
      ];
      
    return (
        <div>
            <h4 className='font-semibold text-2xl'>All Notifications</h4>
            <p className='text-lg text-[#484848]'>Manage user accounts and permissions with detailed views and actions, including the ability to edit, suspend, and close user profiles.</p>
            <div className="rounded-xl bg-[#F7F7F7] p-3 mt-4">
                {notifications.map((notification) => (
                    <div key={notification.id} className='bg-[#F1F1F1] rounded-xl p-3 flex lg:flex-row flex-col justify-between mb-3 gap-4'>
                        <div className='flex items-center gap-2'>
                            <div>
                                <img src={notification.icon} alt="" className='bg-black p-3 rounded-full w-12 h-12 object-contain' />
                            </div>
                            <div>
                                <h6 className='font-semibold sm:text-xl'>{notification.title}</h6>
                                <p className='text-[#363434]'>{notification.description}</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-end gap-3'>
                            <p className='text-[#363434]'>{notification.date}</p>
                            <GoDotFill className='text-[#363434]' />
                            <p className='text-[#363434]'>{notification.timeAgo}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notification
