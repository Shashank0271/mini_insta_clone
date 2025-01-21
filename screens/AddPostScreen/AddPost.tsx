import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../../components/Input';
import KeyboardAvoidingContainer from '../../components/KeyboardAvoidingContainer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {AppState} from '../../redux/store';
import CustomButton from '../../components/CustomButton';
import {SheetManager} from 'react-native-actions-sheet';
import {POST_IMAGES_BUCKET, supabase} from '../../config/supabase_config';
import {useSelector} from 'react-redux';
import {ToastAndroid} from 'react-native';
import axios from 'axios';
import {API_BASEURL} from '../../constants/constants';
import LoadingScreen from '../Loading/LoadingScreen';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../type';

const AddPost: React.FC = () => {
  const [asset, setAsset] = useState<Asset | undefined>();
  const [caption, setCaption] = useState<string>('');
  const [isUploadingPost, setIsUploadingPost] = useState<boolean>(false);
  const {userId} = useSelector((state: AppState) => state.user.appUser);
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleLaunchGallery = async () => {
    const result: ImagePickerResponse = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 2,
      includeBase64: true,
    });
    updateImage(result);
  };

  const handleLaunchCamera = async () => {
    const result: ImagePickerResponse = await launchCamera({
      cameraType: 'front',
      mediaType: 'photo',
    });
    updateImage(result);
  };

  const updateImage = (response: ImagePickerResponse) => {
    const pickedImage: boolean = !response.didCancel && !response.errorCode;
    SheetManager.hide('image-picker-sheet');
    if (pickedImage) {
      setAsset(response.assets![0]);
    }
  };

  const handleUpload = async () => {
    if (!asset) {
      ToastAndroid.show('please add an image !', ToastAndroid.SHORT);
      return;
    }
    setIsUploadingPost(true);

    const fileName = `public/${userId}/${Date.now()}.jpg`;
    const response = await fetch(asset?.uri!);
    const blob = await response.blob();
    const arrayBuffer = await new Response(blob).arrayBuffer();

    const {data, error} = await supabase.storage
      .from(POST_IMAGES_BUCKET)
      .upload(fileName, arrayBuffer, {contentType: 'image/jpeg'});

    if (error) {
      ToastAndroid.show(
        'some error occurred , please try again !',
        ToastAndroid.SHORT,
      );
      setIsUploadingPost(false);
      return;
    }

    const {
      data: {publicUrl},
    } = supabase.storage.from(POST_IMAGES_BUCKET).getPublicUrl(data!.path);

    await axios.post(`${API_BASEURL}posts`, {
      imageUrls: [publicUrl],
      caption,
      userId,
    });

    setIsUploadingPost(false);

    navigation.navigate('ProfileScreen');
  };

  return isUploadingPost ? (
    <LoadingScreen />
  ) : (
    <KeyboardAvoidingContainer backgroundColor="#000">
      <View style={styles.screen}>
        <View style={styles.imageContainer}>
          <View
            style={{
              height: '90%',
              borderTopEndRadius: 20,
              borderTopStartRadius: 20,
            }}>
            {asset && (
              <Image
                source={{uri: asset.uri}}
                style={{
                  flex: 1,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                }}
              />
            )}
          </View>
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
          onChangeText={text => setCaption(text)}
          label="caption"
          leftIcon={<Icon name="pencil" size={24} color={'#777'} />}
        />
        <CustomButton
          label="Add Post"
          onPress={handleUpload}
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
