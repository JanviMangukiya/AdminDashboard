import { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, Users, Shield, X, Sun, Moon } from 'lucide-react';
import Header from '../components/Header';
import Modal from '../components/Modal';
import UserForm from '../components/UserForm';
import RoleForm from '../components/RoleForm';


const initialUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'editor', status: 'active' }
];

const initialRoles = [
    { id: 1, name: 'admin', permissions: ['read', 'write', 'delete'] },
    { id: 2, name: 'editor', permissions: ['read', 'write'] },
    { id: 3, name: 'viewer', permissions: ['read'] }
];

const Dashboard = () => {
    const [users, setUsers] = useState(initialUsers);
    const [roles, setRoles] = useState(initialRoles);
    const [activeTab, setActiveTab] = useState('users');
    const [editingUser, setEditingUser] = useState(null);
    const [editingRole, setEditingRole] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    // Theme handling
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        setEditingRole(null);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleEditRole = (role) => {
        setEditingRole(role);
        setIsModalOpen(true);
    };

    const addUser = (user) => {
        setUsers([...users, { ...user, id: users.length + 1 }]);
        handleModalClose();
    };

    const updateUser = (updatedUser) => {
        setUsers(users.map(user =>
            user.id === updatedUser.id ? updatedUser : user
        ));
        handleModalClose();
    };

    const deleteUser = (userId) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    const addRole = (role) => {
        setRoles([...roles, { ...role, id: roles.length + 1 }]);
        handleModalClose();
    };

    const updateRole = (updatedRole) => {
        setRoles(roles.map(role =>
            role.id === updatedRole.id ? updatedRole : role
        ));
        handleModalClose();
    };

    const deleteRole = (roleId) => {
        setRoles(roles.filter(role => role.id !== roleId));
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors">
            <Header isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />
            <main className="pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                    <div className="flex space-x-4 mb-6">
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'users'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            <Users size={20} />
                            <span>Users</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('roles')}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'roles'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            <Shield size={20} />
                            <span>Roles</span>
                        </button>
                    </div>


                    {activeTab === 'users' && (
                        <div className="space-y-6">
                            <div className="flex justify-end">
                                <button
                                    onClick={() => handleEditUser({})}
                                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    <Plus size={20} />
                                    <span>Add User</span>
                                </button>
                            </div>

                            


                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-700">
                                            <th className="px-6 py-3 text-left dark:text-gray-200">Name</th>
                                            <th className="px-6 py-3 text-left dark:text-gray-200">Email</th>
                                            <th className="px-6 py-3 text-left dark:text-gray-200">Role</th>
                                            <th className="px-6 py-3 text-left dark:text-gray-200">Status</th>
                                            <th className="px-6 py-3 text-left dark:text-gray-200">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="dark:text-gray-200">
                                        {users.map(user => (
                                            <tr key={user.id} className="border-t dark:border-gray-700">
                                                <td className="px-6 py-4">{user.name}</td>
                                                <td className="px-6 py-4">{user.email}</td>
                                                <td className="px-6 py-4">{user.role}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded text-sm ${user.status === 'active'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                        }`}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleEditUser(user)}
                                                            className="p-1 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            <Edit size={20} />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteUser(user.id)}
                                                            className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'roles' && (
                        <div className="space-y-6">
                            <div className="flex justify-end">
                                <button
                                    onClick={() => handleEditRole({})}
                                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    <Plus size={20} />
                                    <span>Add Role</span>
                                </button>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-700">
                                            <th className="px-6 py-3 text-left dark:text-gray-200">Role Name</th>
                                            <th className="px-6 py-3 text-left dark:text-gray-200">Permissions</th>
                                            <th className="px-6 py-3 text-left dark:text-gray-200">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="dark:text-gray-200">
                                        {roles.map(role => (
                                            <tr key={role.id} className="border-t dark:border-gray-700">
                                                <td className="px-6 py-4">{role.name}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        {role.permissions.map(permission => (
                                                            <span
                                                                key={permission}
                                                                className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-sm"
                                                            >
                                                                {permission}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleEditRole(role)}
                                                            className="p-1 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            <Edit size={20} />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteRole(role.id)}
                                                            className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    <Modal
                        isOpen={isModalOpen}
                        onClose={handleModalClose}
                        title={editingUser ? (editingUser.id ? 'Edit User' : 'Add User') :
                            editingRole ? (editingRole.id ? 'Edit Role' : 'Add Role') : ''}
                    >
                        {editingUser && (
                            <UserForm
                                user={editingUser.id ? editingUser : null}
                                roles={roles}
                                onSubmit={(userData) => {
                                    if (userData.id) {
                                        updateUser(userData);
                                    } else {
                                        addUser(userData);
                                    }
                                }}
                                onCancel={handleModalClose}
                            />
                        )}
                        {editingRole && (
                            <RoleForm
                                role={editingRole.id ? editingRole : null}
                                onSubmit={(roleData) => {
                                    if (roleData.id) {
                                        updateRole(roleData);
                                    } else {
                                        addRole(roleData);
                                    }
                                }}
                                onCancel={handleModalClose}
                            />
                        )}
                    </Modal>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;