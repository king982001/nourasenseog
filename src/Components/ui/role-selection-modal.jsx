import React from 'react';

export function RoleSelectionModal({ isOpen, onClose, onSelect, mode = 'login', doctorAccount = null, patientAccount = null, doctorLoggedIn = false, patientLoggedIn = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl w-full max-w-md overflow-hidden shadow-xl transform transition-all">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {mode === 'login' ? 'Login to NouraSense' : 'Join NouraSense'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {mode === 'login' 
              ? 'Select your role to continue to your account' 
              : 'Choose your role to create your account'}
          </p>
        </div>

        {/* Logged In Accounts Section */}
        {(doctorLoggedIn || patientLoggedIn) && (
          <div className="px-6 py-4 border-b border-gray-200 dark:border-neutral-800">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Logged In Accounts
            </h3>
            
            {/* Doctor Account */}
            {doctorLoggedIn && doctorAccount && (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                <div className="flex items-center gap-3">
                  {doctorAccount?.registration?.selfie_image ? (
                    <img 
                      src={doctorAccount.registration.selfie_image} 
                      alt="Doctor Profile" 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary-blue font-medium">
                      {doctorAccount?.name ? doctorAccount.name.charAt(0) : "D"}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      Dr. {doctorAccount?.name || ''} {doctorAccount?.surname || ''}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {doctorAccount?.email || ''}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => onSelect('doctor-dashboard')}
                    className="flex-1 px-3 py-1.5 text-sm text-gray-800 dark:text-white bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded transition-colors"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => onSelect('doctor-logout')}
                    className="flex-1 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* Patient Account */}
            {patientLoggedIn && patientAccount && (
              <div className="p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                <div className="flex items-center gap-3">
                  {patientAccount?.profile_picture ? (
                    <img 
                      src={patientAccount.profile_picture} 
                      alt="Patient Profile" 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-primary-blue font-medium">
                      {patientAccount?.name ? patientAccount.name.charAt(0) : "P"}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {patientAccount?.name || ''} {patientAccount?.surname || ''}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {patientAccount?.email || ''}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => onSelect('parent-dashboard')}
                    className="flex-1 px-3 py-1.5 text-sm text-gray-800 dark:text-white bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded transition-colors"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => onSelect('parent-logout')}
                    className="flex-1 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Role Options */}
        <div className="p-6 space-y-4">
          {/* Show Doctor login option only if not logged in as doctor */}
          {!doctorLoggedIn && (
            <button
              onClick={() => onSelect('doctor')}
              className="w-full group relative flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Doctor</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">For healthcare professionals</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Show Parent login option only if not logged in as parent */}
          {!patientLoggedIn && (
            <button
              onClick={() => onSelect('parent')}
              className="w-full group relative flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Parent</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">For parents and guardians</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-neutral-800/50 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button 
                  onClick={() => onSelect('signup')}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button 
                  onClick={() => onSelect('login')}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
} 