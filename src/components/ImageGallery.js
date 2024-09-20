import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../theme/theme';

const {width: screenWidth} = Dimensions.get('window');

const ImageGallery = ({
  images,
  initialIndex = 0,
  showThumbnails = true,
  imageHeight = 300,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const mainListRef = useRef(null);
  const thumbnailListRef = useRef(null);

  const renderImage = ({item, index}) => (
    <Image
      source={item}
      style={[styles.mainImage, {height: imageHeight}]}
      resizeMode="cover"
    />
  );

  const renderThumbnail = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        setActiveIndex(index);
        mainListRef.current?.scrollToIndex({index, animated: true});
      }}>
      <Image
        source={item}
        style={[
          styles.thumbnail,
          activeIndex === index && styles.activeThumbnail,
        ]}
      />
    </TouchableOpacity>
  );

  const onMainScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
      thumbnailListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={mainListRef}
        data={images}
        renderItem={renderImage}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onMainScroll}
        scrollEventThrottle={16}
        initialScrollIndex={initialIndex}
        getItemLayout={(data, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
      />

      {showThumbnails && (
        <FlatList
          ref={thumbnailListRef}
          data={images}
          renderItem={renderThumbnail}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailList}
          contentContainerStyle={styles.thumbnailContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  mainImage: {
    width: screenWidth,
  },
  thumbnailList: {
    backgroundColor: COLORS.white,
    padding: 8,
  },
  thumbnailContainer: {
    gap: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: COLORS.primaryDark,
  },
});

export default ImageGallery;