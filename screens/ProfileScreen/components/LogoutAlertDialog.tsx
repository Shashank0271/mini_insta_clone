import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  NativeSyntheticEvent,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';
import {BlurView} from '@react-native-community/blur';
import {fontFamily} from '../../../constants/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {supabase} from '../../../config/supabase_config';

interface LogoutAlertDialogProps {
  visible: boolean;
  onRequestClose: (event: NativeSyntheticEvent<any>) => void;
}

const LogoutAlertDialog: FC<LogoutAlertDialogProps> = ({
  visible,
  onRequestClose,
}) => {
    
  const logOut = async (): Promise<void> => {
    supabase.auth.signOut();
  };

  return (
    <Modal onRequestClose={onRequestClose} visible={visible} transparent>
      <BlurView blurAmount={1} style={{flex: 1}}>
        <Pressable style={styles.parentModal}>
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
