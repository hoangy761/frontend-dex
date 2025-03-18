import React, { useEffect, useState } from 'react';
import { getDeveloperProfile, updateDeveloperProfile } from '~/api/developer/auth.developer.api';
import { useWalletProvider } from '~/hooks/Wallet/useWalletProvider';

type DeveloperProfile = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name?: string;
  isActive: boolean;
};

const Profile = () => {
  const { selectedAccount, isLogin, signer } = useWalletProvider();
  const [profile, setProfile] = useState<DeveloperProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  const [inputName, setInputName] = useState<string>('');

  useEffect(() => {
    const fetchProfileData = async () => {
      if (isLogin) {
        try {
          setLoading(true);
          setError(null);
          const data = await getDeveloperProfile();
          setProfile(data);
        } catch (err) {
          setError(err.message || 'Failed to fetch profile data');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfileData();
  }, [isLogin]);

  const handleSubmit = async () => {
    if (!inputName || inputName.trim() === '') {
      setError('Name cannot be empty');
      return;
    }

    try {
      setLoading(true);
      setUpdateMessage(null);

      const updatedProfile = await updateDeveloperProfile({ name: inputName });
      setProfile(updatedProfile);
      setIsEditing(false);
      setUpdateMessage('Profile updated successfully');
    } catch (error) {
      setError(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!isLogin) {
    return <div className="text-center text-2xl font-bold">Please Login</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="text-center font-bold text-2xl mb-6">Profile</div>

      {updateMessage && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{updateMessage}</div>}

      <div className=" rounded-lg shadow p-6 bg-slate-50 w-full">
        <div className="mb-4 text-black">
          <span className="font-semibold ">Address:</span> {selectedAccount}
        </div>

        {profile && (
          <div className="text-black">
            <div className="mb-2">
              <span className="font-semibold ">Id:</span> {profile.id || 'Undefined'}
            </div>
            <div className="mb-2">
              <span className="font-semibold ">Name:</span>
              {isEditing ? (
                <input
                  className="rounded-lg ml-1 border-2 border-black"
                  value={inputName}
                  onChange={(e) => {
                    setInputName(e.target.value);
                    if (e.target.value.trim() !== '') {
                      setError(null);
                    }
                  }}
                />
              ) : (
                <>{profile.name || <span className="text-black/70">Name not set</span>}</>
              )}
            </div>
            <div className="mb-2">
              <span className="font-semibold ">Is Active:</span> {profile.isActive ? 'True' : 'False'}
            </div>
            {isEditing && (
              <button
                onClick={() => handleSubmit()}
                className="mr-4 mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Profile;
