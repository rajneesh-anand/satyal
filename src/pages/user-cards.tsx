import React, { useState, useEffect } from 'react';
import Layout from '@components/layout/index';
import Container from '@components/ui/container';
import Loader from '@components/ui/loader/loader';

type UserDetails = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
};

function Users() {
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/test/test-users`
      );
      const data = await res.json();
      //   console.log(data.user);
      setUsers(data.user);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const openModalOnClick = (user: UserDetails) => {
    setEdit(true);
    setSelectedUser(user);
  };

  const closeModal = () => {
    setEdit(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedUser);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/test/update-user/${selectedUser.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedUser),
        }
      );

      if (res.ok) {
        // Update the user details in the local state
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === selectedUser.id ? selectedUser : user))
        );
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }

    closeModal();
  };

  return (
    <Container>
      <h1 className="text-3xl font-bold text-center p-4 m-4 text-teal-500 hover:text-teal-600">
        The User details are presented as cards below
      </h1>

      {loading ? (
        <Loader />
      ) : (
        users.length > 0 && (
          <div className="grid grid-cols-4 gap-4">
            {users.map((user, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col justify-center items-center"
              >
                <h2 className="text-xl font-semibold mb-2 text-center">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600 mb-4 text-center">Email: {user.email}</p>
                <p className="text-gray-600 mb-4 text-center">Address: {user.address}</p>
                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded"
                    onClick={() => openModalOnClick(user)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {edit && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Overlay */}
          <div className="fixed inset-0 bg-slate-300 opacity-60 backdrop-filter backdrop-blur-sm"></div>

          {/* Modal Window */}
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-bold mb-4 text-center">Edit User Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={selectedUser.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={selectedUser.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={selectedUser.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={selectedUser.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

Users.Layout = Layout;

export default Users;
