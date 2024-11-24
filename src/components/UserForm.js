// src/components/UserForm.js
import { useState } from 'react';

// Update UserForm with dark mode styles
const UserForm = ({ user, onSubmit, onCancel, roles }) => {
  const [formData, setFormData] = useState(user || {
      name: '',
      email: '',
      role: 'viewer',
      status: 'active'
  });

  const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
      setFormData({ name: '', email: '', role: 'viewer', status: 'active' });
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-200">Name</label>
              <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
              />
          </div>
          <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-200">Email</label>
              <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
              />
          </div>
          <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-200">Role</label>
              <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                  {roles.map(role => (
                      <option key={role.id} value={role.name}>{role.name}</option>
                  ))}
              </select>
          </div>
          <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-200">Status</label>
              <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
              </select>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
              <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 dark:text-white"
              >
                  Cancel
              </button>
              <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                  {user ? 'Update' : 'Add'} User
              </button>
          </div>
      </form>
  );
};

export default UserForm;