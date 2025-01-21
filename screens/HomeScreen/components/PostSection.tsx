import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {Post} from '../../../types/Post';
import {fontFamily} from '../../../constants/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {SheetManager} from 'react-native-actions-sheet';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

interface PostSectionProps {
  item: Post;
}

const PostSection: FC<PostSectionProps> = ({item}) => {
  const [liked, setLiked] = useState(false);
  const scale = useSharedValue(0); // initially icon is in invisible state
  const animatedProps = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(setLiked)(true);
      scale.value = withSpring(1, {duration: 500}, () => {
        scale.value = withTiming(0, {duration: 300});
      });
    });

  return (
    <GestureDetector gesture={doubleTap}>
      <View style={{marginVertical: 10}}>
        <ImageBackground
          source={{uri: item.imageUrls[0]}}
          resizeMode="cover"
          style={{
            height: hp(40),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AnimatedIcon
          
            name="heart"
            size={64}
            color={'#FFF'}
            style={animatedProps}
          />
        </ImageBackground>

        {/* post metadata row : likes,comments section */}
        <View style={styles.postMetadataRow}>
          <View style={styles.postMetadataBlock}>
            <Icon
              onPress={() => setLiked(!liked)}
              name={liked ? 'heart' : 'heart-o'}
              size={24}
              color={liked ? 'red' : 'white'}
            />
            <Text style={styles.imageDataText}>{item.likes}</Text>
          </View>  

          <View style={styles.postMetadataBlock}>
            <Icon
              name={'comment-o'}
              size={24}
              color={'white'}
              style={{transform: [{rotateY: '180deg'}]}}
              onPress={() =>
                SheetManager.show('comment-sheet', {
                  payload: {postId: item.id},
                })
              }
            />
            <Text style={styles.imageDataText}>{item.comments}</Text>
          </View>
        </View>

        {/* caption */}
        <View style={styles.captionRow}>
          <Text style={styles.postCaptionUserName}>{item.user.uname}</Text>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>
      </View>
    </GestureDetector>
  );
};

export default PostSection;

const styles = StyleSheet.create({
  caption: {
    fontFamily: fontFamily.medium,
    color: '#FFF',
  },
  postCaptionUserName: {
    fontFamily: fontFamily.semiBold,
    color: '#FFF',
  },
  imageDataText: {
    fontFamily: fontFamily.semiBold,
    color: '#FFF',
    fontSize: 18,
  },
  postMetadataRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 10,
  },
  postMetadataBlock: {
    flexDirection: 'row',
    gap: 5,
  },
  captionRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
});
