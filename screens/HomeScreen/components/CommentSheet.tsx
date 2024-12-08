import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useRef} from 'react';
import ActionSheet, {SheetProps} from 'react-native-actions-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../redux/store';
import {fetchAllCommentsForPost} from '../../../redux/apiCalls/comment';
import LoadingScreen from '../../Loading/LoadingScreen';
import {FlatList} from 'react-native-gesture-handler';
import {fontFamily} from '../../../constants/fonts';
import Icon from 'react-native-vector-icons/AntDesign';
import {setLoadingMoreComments} from '../../../redux/reducers/comment';

const CommentSheet = (props: SheetProps<'comment-sheet'>) => {
  const postId = props.payload!.postId;
  const dispatch = useDispatch<AppDispatch>();
  const pageOffset = useRef<number>(0);

  useEffect(() => {
    dispatch(fetchAllCommentsForPost({postId: postId, pageOffset: pageOffset}));
    pageOffset.current += 1;
  }, []);

  const {
    comments,
    isLoadingComment,
    fetchedAllComments,
    isLoadingMoreComments,
  } = useSelector((state: AppState) => state.comment);

  return (
    <ActionSheet
      id={props.sheetId}
      headerAlwaysVisible
      gestureEnabled
      isModal
      animated
      useBottomSafeAreaPadding
      containerStyle={{
        height: '60%',
        backgroundColor: '#252c33',
        paddingBottom: 16,
      }}>
      {isLoadingComment ? (
        <LoadingScreen />
      ) : (
        <>
          <Text style={styles.commentSectionTitle}>Comments</Text>
          <FlatList
            data={comments}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{height: 50}}></View>}
            removeClippedSubviews
            onEndReached={() => {
              if (fetchedAllComments) return;
              dispatch(setLoadingMoreComments(true));
              dispatch(fetchAllCommentsForPost({postId: postId, pageOffset}));
              pageOffset.current += 1;
            }}
            renderItem={({item}) => (
              <View style={styles.commentContainer}>
                <Image
                  source={{uri: item.user.profilePicUrl}}
                  resizeMode="contain"
                  style={styles.commentUserProfilePic}
                />
                <View style={{flex: 1, paddingTop: 16}}>
                  <Text style={styles.commentUserName}>{item.user.uname}</Text>
                  <View style={styles.commentRight}>
                    <Text style={styles.commentBody}>{item.comment}</Text>
                    <View style={{marginLeft: 'auto', alignItems: 'center'}}>
                      <Icon name="hearto" color={'#878eb0'} size={16} />
                      <Text style={styles.likeText}>{item.likes}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            ListFooterComponent={() =>
              isLoadingMoreComments ? (
                <ActivityIndicator
                  style={{marginVertical: 8}}
                  size={'small'}
                  color={'#FFF'}
                />
              ) : null
            }
          />
        </>
      )}
    </ActionSheet>
  );
};

export default CommentSheet;

const styles = StyleSheet.create({
  commentSectionTitle: {
    alignSelf: 'center',
    fontFamily: fontFamily.bold,
    color: '#FFF',
    marginTop: 10,
    marginBottom: 16,
  },
  commentUserName: {
    fontFamily: fontFamily.semiBold,
    color: '#FFF',
    fontSize: 11,
  },
  commentBody: {
    fontFamily: fontFamily.regular,
    color: '#FFF',
    fontSize: 12,
    width: '80%',
  },
  commentUserProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 500,
    marginRight: 4,
  },
  commentContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '20%',
    paddingHorizontal: 10,
  },
  likeText: {
    fontFamily: fontFamily.semiBold,
    color: '#878eb0',
  },
  commentRight: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
});
