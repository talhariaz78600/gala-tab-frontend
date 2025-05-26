import React from 'react';

const NotificationSetting = () => {
  const dummyData = [
    {
      notification_type: 'New Venue Application',
      mobile_app: true,
      email: true,
      sms: false,
    },
    {
      notification_type: 'Venue Approval Required',
      mobile_app: false,
      email: true,
      sms: true,
    },
    {
      notification_type: 'Venue Profile Update',
      mobile_app: true,
      email: false,
      sms: true,
    },
    {
      notification_type: 'Venue Feedback Received',
      mobile_app: true,
      email: true,
      sms: false,
    },
    {
      notification_type: 'Venue Cancellation Alert',
      mobile_app: false,
      email: true,
      sms: false,
    },
    {
      notification_type: 'Customer Support Tickets',
      mobile_app: false,
      email: true,
      sms: false,
    },
  ];

  return (
    <div>
      <form action="">
        <div className='overflow-x-auto'>
        <div className='min-w-[1000px]'>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-start p-3 bg-black text-white rounded-l-md">Notification Type</th>
                <th className="p-3 bg-black text-white">Mobile App</th>
                <th className="p-3 bg-black text-white">Email</th>
                <th className="p-3 bg-black text-white rounded-r-md">SMS</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((item, index) => (
                <tr key={index}>
                  <td className="border-b p-3">{item.notification_type}</td>
                  <td className="text-center border-b p-3">
                    <input type="checkbox" className="accent-black w-5 h-5" defaultChecked={item.mobile_app === true} />
                  </td>
                  <td className="text-center border-b p-3">
                    <input type="checkbox" className="accent-black w-5 h-5" defaultChecked={item.email === true}/>
                  </td>
                  <td className="text-center border-b p-3">
                    <input type="checkbox" className="accent-black w-5 h-5" defaultChecked={item.sms === true}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        <div className='flex sm:flex-row flex-col items-center gap-3 mt-9'>
          <div>
            <button className='bg-[#E7E7E7] w-full border-separate py-2 rounded-3xl px-12'>Cancel</button>
          </div>
          <div>
            <button className='bg-black w-full text-white py-2 rounded-3xl px-12'>Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NotificationSetting;
