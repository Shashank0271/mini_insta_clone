import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  NativeSyntheticEvent,
  TouchableOpacity,
} from 'react-native';
import React, {FC, useState} from 'react';
import {BlurView} from '@react-native-community/blur';
import {fontFamily} from '../../../constants/fonts';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {supabase} from '../../../config/supabase_config';
import LoaderKit from 'react-native-loader-kit';

interface LogoutAlertDialogProps {
  visible: boolean;
  onRequestClose: (event: NativeSyntheticEvent<any>) => void;
}

const LogoutAlertDialog: FC<LogoutAlertDialogProps> = ({
  visible,
  onRequestClose,
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logOut = async (): Promise<void> => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    setIsLoggingOut(false);
  };

  return (
    <Modal onRequestClose={onRequestClose} visible={visible} transparent>
      <BlurView blurAmount={1} style={{flex: 1}}>
        <Pressable style={styles.parentModal} onPress={onRequestClose}>
          {isLoggingOut ? (
            <View style={[styles.logoutContainer, {height: 200}]}>
              <Text style={styles.modalButtonText}>Logging out ...</Text>
              <LoaderKit
                style={{width: 30, height: 30, marginTop: 20}}
                name={'BallPulseSync'}
                color={'white'}
              />
            </View>
          ) : (
            <View style={styles.logoutContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Log out of</Text>
                <Text style={styles.modalHeaderText}>your account?</Text>
              </View>
              <HorizontalDivider />
              <TouchableOpacity onPress={logOut} style={styles.button}>
                <Text style={[styles.modalButtonText, {color: 'red'}]}>
                  Logout
                </Text>
              </TouchableOpacity>
              <HorizontalDivider />
              <TouchableOpacity onPress={onRequestClose} style={styles.button}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </Pressable>
      </BlurView>
    </Modal>
  );
};

const HorizontalDivider: FC = () => (
  <View style={{width: wp(70), height: 0.3, backgroundColor: 'grey'}}></View>
);

export default LogoutAlertDialog;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    width: wp(70),
    alignItems: 'center',
  },
  modalHeader: {
    paddingVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parentModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutContainer: {
    backgroundColor: '#2c2d33',
    borderRadius: 10,
    paddingHorizontal: 56,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(70),
  },
  modalHeaderText: {
    fontFamily: fontFamily.bold,
    color: '#FFF',
    fontSize: 18,
  },
  modalButtonText: {color: '#FFF', fontFamily: fontFamily.semiBold},
});
