import { useState } from 'react';

// Update RoleForm with dark mode styles
const RoleForm = ({ role, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(role || {
        name: '',
        permissions: []
    });

    const allPermissions = ['read', 'write', 'delete'];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', permissions: [] });
    };

    const togglePermission = (permission) => {
        const newPermissions = formData.permissions.includes(permission)
            ? formData.permissions.filter(p => p !== permission)
            : [...formData.permissions, permission];
        setFormData({ ...formData, permissions: newPermissions });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-200">Role Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-200">Permissions</label>
                <div className="space-y-2">
                    {allPermissions.map(permission => (
                        <label key={permission} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={formData.permissions.includes(permission)}
                                onChange={() => togglePermission(permission)}
                                className="form-checkbox dark:bg-gray-700 dark:border-gray-600"
                            />
                            <span className="capitalize dark:text-gray-200">{permission}</span>
                        </label>
                    ))}
                </div>
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
                    {role ? 'Update' : 'Add'} Role
                </button>
            </div>
        </form>
    );
};

export default RoleForm;