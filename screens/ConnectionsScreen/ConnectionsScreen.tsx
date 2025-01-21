import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {RootStackNavigatorParamList} from '../../type';
import {FlatList} from 'react-native-gesture-handler';
import {fontFamily} from '../../constants/fonts';

const ConnectionsScreen = () => {
  const {
    params: {connectionProfiles, heading},
  } = useRoute<RouteProp<RootStackNavigatorParamList, 'ConnectionsScreen'>>();

  return (
    <View style={{flex: 1, backgroundColor: '#000', paddingTop: 20}}>
      <FlatList
        contentContainerStyle={{paddingHorizontal: 16}}
        data={connectionProfiles}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item.profilePicUrl}}
              style={{width: 70, height: 70, borderRadius: 100}}
            />
            <View
              style={{
                height: '100%',
                justifyContent: 'flex-start',
                marginLeft: 10,
              }}>
              <Text style={styles.uname}>{item.uname}</Text>
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ConnectionsScreen;

const styles = StyleSheet.create({
  uname: {
    fontFamily: fontFamily.semiBold,
    color: 'white',
  },
  name: {
    fontFamily: fontFamily.regular,
  },
});
