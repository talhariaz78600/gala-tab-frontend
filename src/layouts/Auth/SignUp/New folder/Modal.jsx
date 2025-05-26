'use client';


export default function Modal({open, setOpen}) {

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-start">
             
              <div className="ml-4 text-left">
                <h3 className="text-lg font-semibold text-gray-900">Reset Password</h3>
                <p className="mt-2 text-sm text-gray-500">
               A Reset Link was sent to your Email. Check Your Mail for Setting New Password.
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
            </div>
          </div>
        </div>
      )}
    </>
  );
}
