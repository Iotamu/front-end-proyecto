import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getAllUsers } from '../services/admin.services';
import UserList from './userlist'; 
import UserSchedule from './userschedules';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View>
      <Text>Admin Dashboard</Text>
      <UserList users={users} onSelectUser={setSelectedUser} />
      {selectedUser && <UserSchedule userId={selectedUser} />}
    </View>
  );
};

export default AdminDashboard;
