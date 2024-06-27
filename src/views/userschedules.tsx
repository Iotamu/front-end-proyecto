import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { getUserSchedule, updateUserSchedule } from '../services/admin.services';

interface UserScheduleProps {
  userId: string;
}

const UserSchedule: React.FC<UserScheduleProps> = ({ userId }) => {
  const [schedule, setSchedule] = useState<any>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newSchedule, setNewSchedule] = useState<any>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const schedule = await getUserSchedule(userId);
        setSchedule(schedule);
        setNewSchedule(schedule);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, [userId]);

  const handleSave = async () => {
    try {
      await updateUserSchedule(userId, newSchedule);
      setSchedule(newSchedule);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating schedule:', error);
    }
  };

  if (!schedule) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>User Schedule</Text>
      {editMode ? (
        <View>
          <TextInput
            value={newSchedule}
            onChangeText={(value) => setNewSchedule(value)}
          />
          <Button title="Save" onPress={handleSave} />
        </View>
      ) : (
        <View>
          <Text>{schedule}</Text>
          <Button title="Edit" onPress={() => setEditMode(true)} />
        </View>
      )}
    </View>
  );
};

export default UserSchedule;
