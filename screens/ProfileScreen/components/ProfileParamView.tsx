import {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fontFamily} from '../../../constants/fonts';

interface ProfileParamViewProps {
  value: number;
  label: string;
}

const ProfileParamView: FC<ProfileParamViewProps> = ({label, value}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.textNumeric}>{value}</Text>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

export default ProfileParamView;

const styles = StyleSheet.create({
  textNumeric: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    color: '#FFF',
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: '#FFF',
  },
});
