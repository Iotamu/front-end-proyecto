import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface UserListProps {
  users: any[];
  onSelectUser: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onSelectUser }) => {
  return (
    <View>
      <Text>Users</Text>
      {users.map(user => (
        <TouchableOpacity key={user.id} onPress={() => onSelectUser(user.id)}>
          <Text>{user.name} ({user.email})</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default UserList;
