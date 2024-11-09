import {StyleSheet, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import ProfileCircle from './components/ProfileCircle';
import {useDispatch, useSelector} from 'react-redux';
import {UserState} from '../../redux/reducers/user';
import {AppDispatch, AppState} from '../../redux/store';


const HomeScreen: FC = () => {
  const {isLoadingUser, session} = useSelector(
    (state: AppState): UserState => state.user,
  );

  return (
    <View style={styles.screen}>
      <ProfileCircle />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#000'},
});
