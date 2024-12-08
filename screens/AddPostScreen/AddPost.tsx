import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../../components/Input';
import KeyboardAvoidingContainer from '../../components/KeyboardAvoidingContainer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import CustomButton from '../../components/CustomButton';
import {SheetManager} from 'react-native-actions-sheet';

const AddPost: React.FC = () => {
  
  const handleLaunchGallery = async () => {
    const result: ImagePickerResponse = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 2,
    });
  };

  const handleLaunchCamera = async () => {
    const result: ImagePickerResponse = await launchCamera({
      cameraType: 'front',
      mediaType: 'photo',
    });
  };

  return (
    <KeyboardAvoidingContainer backgroundColor="#000">
      <View style={styles.screen}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => {
              SheetManager.show('image-picker-sheet', {
                payload: {
                  handleCamera: handleLaunchCamera,
                  handleGallery: handleLaunchGallery,
                },
              });
            }}
            activeOpacity={0.8}
            style={styles.imageSelectButton}>
            <MaterialCommunityIcons
              name="image-plus"
              size={50}
              color={'#637796'}
            />
          </TouchableOpacity>
        </View>
        <Input
          underlineColorAndroid="grey"
          onChangeText={() => {}}
          label="caption"
          leftIcon={<Icon name="pencil" size={24} />}
        />
        <CustomButton
          label="Add Post"
          onPress={handleLaunchCamera}
          iconPosition="right"
          wrapperProps={{marginTop: 32}}
          icon={<EntypoIcon name="arrow-bold-right" size={22} color={'#FFF'} />}
        />
      </View>
    </KeyboardAvoidingContainer>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 10,
  },
  imageContainer: {
    height: hp(45),
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 2,
    position: 'relative',
    marginBottom: 85,
  },
  imageSelectButton: {
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 16,
    position: 'absolute',
    bottom: -50,
  },
});
