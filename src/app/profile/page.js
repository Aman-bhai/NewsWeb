'use client';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";
import PopUp from "../components/PopUp";

export default function ProfilePage() {
  const { status } = useSession();
  const [user, setUser] = useState(null);
  const [profileFetched, setProfileFetched] = useState(false);
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile').then(response => {
        response.json().then(data => {
          setUser(data);
          setUserName(data.name || '');
          setImage(data.image || '');
          setPhone(data.phone || '');
          setStreetAddress(data.streetAddress || '');
          setPostalCode(data.postalCode || '');
          setCity(data.city || '');
          setCountry(data.country || '');
          setProfileFetched(true);
        });
      });
    }
  }, [status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile saved!',
      error: 'Error saving profile',
    });
  }


  function handleAddressChange(propName, value) {
    switch (propName) {
      case 'phone':
        setPhone(value);
        break;
      case 'streetAddress':
        setStreetAddress(value);
        break;
      case 'postalCode':
        setPostalCode(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'country':
        setCountry(value);
        break;
      default:
        break;
    }
  }


  function handleSave(ev) {
    ev.preventDefault();
    handleProfileInfoUpdate(ev, {
      name: userName,
      image,
      phone,
      streetAddress,
      postalCode,
      city,
      country,
    });
  }


  if (status === 'loading') {
    return <PopUp title="Loading..." text="Fetching profile data. Please wait." link="#" linkText="Okay" />;
  }

  if (status === 'unauthenticated') {
    return <PopUp title="Login Required" text="You need to log in to access this page." link="/login" linkText="Login" />;
  }

  return (
    <section className="min-h-screen mx-auto p-4 bg-gray-100">
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mx-auto w-fit my-8">User's Profile</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSave}>
          <div className="flex items-center mb-4">
            <div className="w-1/2 pr-2 flex flex-col">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  First and last name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="First and last name"
                  value={userName}
                  onChange={ev => setUserName(ev.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  disabled={true}
                  value={user?.email || ''}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="w-1/2 pl-2 flex justify-center">
              {image ? (
                <Image
                  className="rounded-full w-28 h-28 mb-4"
                  src={image}
                  width={120}
                  height={120}
                  alt="User Avatar"
                />
              ) : (
                <div className="bg-gray-200 rounded-full w-28 h-28 flex items-center justify-center mb-4">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm0-14a6 6 0 100 12 6 6 0 000-12zm0 9a3 3 0 110-6 3 3 0 010 6z"></path>
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              placeholder="Phone number"
              value={phone || ''}
              onChange={ev => handleAddressChange('phone', ev.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Street address</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Street address"
              value={streetAddress || ''}
              onChange={ev => handleAddressChange('streetAddress', ev.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Postal code</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Postal code"
                value={postalCode || ''}
                onChange={ev => handleAddressChange('postalCode', ev.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="City"
                value={city || ''}
                onChange={ev => handleAddressChange('city', ev.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Country"
              value={country || ''}
              onChange={ev => handleAddressChange('country', ev.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}