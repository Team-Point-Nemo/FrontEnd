import { ThemeContext } from '@react-navigation/native';
import { View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

export default function FavoriteDialog({ visible, onConfirm, onCancel }) {

  return (
    <View>
        <Portal>

          <Dialog visible={visible} onDismiss={onCancel}>

            <Dialog.Title style={{color: 'rgb(0, 64, 101)'}}>Are you sure?</Dialog.Title>

            <Dialog.Content>
              <Text variant="bodyMedium" style={{color: 'rgb(0, 64, 101)'}}>Do you want to remove this city from your favorites?</Text>
            </Dialog.Content>

            <Dialog.Actions>
              <Button onPress={onConfirm}>Yes</Button>
              <Button onPress={onCancel}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>

        </Portal>
      </View>
  )
}


