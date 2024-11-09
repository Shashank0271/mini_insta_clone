import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import LogoutAlertDialog from './components/LogoutAlertDialog';

const Profile: FC = () => {
  const [showLogoutAlertDialog, setShowLogoutAlertDialog] =
    useState<boolean>(false);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 8,
      }}>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          padding: 10,
          width: '100%',
        }}
        onPress={() => setShowLogoutAlertDialog(true)}>
        <Text style={{color: 'red'}}>Logout</Text>
      </TouchableOpacity>
      <LogoutAlertDialog
        visible={showLogoutAlertDialog}
        onRequestClose={() => setShowLogoutAlertDialog(false)}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
