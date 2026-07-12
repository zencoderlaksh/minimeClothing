import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/react';
import { Download, Users } from 'lucide-react';

const ManageUsers = () => {
  const { getToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch('/api/v1/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('An error occurred while fetching users.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (users.length === 0) return;

    // Define CSV headers
    const headers = ['Name', 'Email', 'Phone', 'Role', 'Joined Date'];

    // Map users to CSV rows
    const rows = users.map(user => [
      `"${user.name || ''}"`,
      `"${user.email || ''}"`,
      `"${user.phone || ''}"`,
      `"${user.role || 'user'}"`,
      `"${new Date(user.createdAt).toLocaleDateString()}"`
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create a Blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'registered_users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[color:var(--gold-deep,#b8960c)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-serif-display text-[color:var(--ink,#1a1612)] tracking-wide">
            Registered Users
          </h2>
          <p className="text-[color:var(--ink-light,#4a4036)] mt-1">
            Total users: {users.length}
          </p>
        </div>
        
        <button
          onClick={handleExportCSV}
          disabled={users.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-[color:var(--ink,#1a1612)] text-white rounded hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[color:var(--ink-light,#4a4036)] text-sm">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Phone</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-[color:var(--ink,#1a1612)]">
                      {user.name}
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4 text-gray-600">{user.phone || '-'}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-[color:var(--gold-deep,#b8960c)]/10 text-[color:var(--gold-deep,#b8960c)]'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    <Users className="mx-auto h-8 w-8 text-gray-400 mb-3" />
                    <p>No users registered yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
