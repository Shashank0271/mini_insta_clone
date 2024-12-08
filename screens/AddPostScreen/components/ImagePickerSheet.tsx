import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import CustomButton from '../../../components/CustomButton';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {fontFamily} from '../../../constants/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const ImagePickerSheet = (props: SheetProps<'image-picker-sheet'>) => {
  const {handleCamera, handleGallery} = props.payload!;
  return (
    <ActionSheet
      id={props.sheetId}
      headerAlwaysVisible
      gestureEnabled
      isModal
      animated
      useBottomSafeAreaPadding
      containerStyle={styles.sheetContainer}>
      <View style={{height: '100%'}}>
        <CustomButton
          wrapperProps={{paddingVertical: 14}}
          labelStyle={{fontFamily: fontFamily.bold}}
          icon={<Icon name="camera" size={24} color={'white'} />}
          label="CAMERA"
          onPress={handleCamera}
        />
        <CustomButton
          wrapperProps={{paddingVertical: 14}}
          labelStyle={{fontFamily: fontFamily.bold}}
          icon={<FoundationIcon name="photo" size={26} color={'white'} />}
          label="GALLERY"
          onPress={handleGallery}
        />
        <CustomButton
          wrapperProps={{paddingVertical: 14}}
          labelStyle={{fontFamily: fontFamily.bold}}
          icon={<MaterialIcon name="cancel" size={26} color={'white'} />}
          label="CANCEL"
          onPress={() => {
            SheetManager.hide('image-picker-sheet');
          }}
        />
      </View>
    </ActionSheet>
  );
};

export default ImagePickerSheet;

const styles = StyleSheet.create({
  sheetContainer: {
    height: heightPercentageToDP(30),
    width: 500,
    backgroundColor: '#252c33',
    paddingBottom: 16,
    paddingHorizontal: 60,
  },
});
