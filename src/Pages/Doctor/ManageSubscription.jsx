import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useGetEmailsInSubscription, useInviteEmailToSubscription } from 'src/Hooks/DoctorHooks';

const ManageSubscription = () => {
  const { data: Emails, isLoading, isError } = useGetEmailsInSubscription();
  const [showPopup, setShowPopup] = useState(false);
  const { mutate: inviteEmail } = useInviteEmailToSubscription();
  const subscriptionId = JSON.parse(localStorage.getItem('DoctorAccount'))?.subscriptionId;
  const [email, setEmail] = useState('');

  const handleInvite = async () => {
    const toastId = toast.loading('Sending invite...');
    await inviteEmail({subscriptionId, email}, {
      onSuccess: () => {
        toast.success('Invite sent successfully', { id: toastId });
      },
      onError: (error) => {
        console.error(error);
        toast.error('Error sending invite', { id: toastId });
      },
    });
    setEmail('');
    setShowPopup(false);
  };

  if (!subscriptionId) {
    return (
      <div className="p-6 font-sans min-h-screen mx-auto">
        <h1 className="text-3xl font-bold text-primary-blue mb-4">Manage Subscription</h1>
        <p className="text-gray-700">You do not have a subscription.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 font-sans min-h-screen mx-auto">
        <h1 className="text-3xl font-bold text-primary-blue mb-4">Manage Subscription</h1>
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 font-sans min-h-screen mx-auto">
        <h1 className="text-3xl font-bold text-primary-blue mb-4">Manage Subscription</h1>
        <p className="text-red-500">Error loading emails.</p>
      </div>
    );
  }

  return (
    <div className="p-6 font-sans min-h-screen mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary-blue mb-4 sm:mb-0">Manage Subscription</h1>
        <button
          onClick={() => setShowPopup(true)}
          className="px-5 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-800 transition duration-200"
        >
          Invite Member
        </button>
      </div>

      {/* Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Invite Member</h2>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={handleInvite}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
              >
                Send Invite
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subscribed Emails</h2>
        {Emails?.emails?.length === 0 ? (
          <p className="text-gray-500">No members yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
            {Emails?.emails.map((email, index) => (
              <li
                key={index}
                className="px-4 py-3 bg-white text-gray-800 hover:bg-gray-50 transition"
              >
                {email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageSubscription;
