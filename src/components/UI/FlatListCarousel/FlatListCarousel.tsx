import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import React, {FC, useRef, useState} from 'react';
import {FlatList, Image, ImageResizeMode, ImageStyle, Pressable, View} from 'react-native';
import { colors } from '../../../constants/Colors';
import BlurImage from '../BlurImage/BlurImage';
import PlayButton from '../PlayButton/PlayButton';
import {styles} from "./styles";

type ICarouselProps = {
    data: any,
    backgroundVideo?:any,
    screenWidth?:boolean,
    openMedia:()=>void
  };

const FlatListCarouser:FC<ICarouselProps> = ({
                                           data,
                                           backgroundVideo,
                                           screenWidth,
                                           openMedia,
                                           ...props
}) => {

  let flatListRef = useRef<FlatList<any> | null>()
  const viewConfigRef = {viewAreaCoveragePercentThreshold: 95}
  const [currentIndex, setCurrentIndex] = useState(0)


  const onViewRef = useRef(({changed} : {changed: any} ) =>{
      if(changed[0].isViewable) {
          setCurrentIndex(changed[0].index)
      }
  })

  const scrollToIndex = (index:number) => {
      flatListRef.current?.scrollToIndex({animated: true, index: index})
  }

  const _renderItems = (item:any) => {
      return (
          <Pressable onPress = {() => openMedia()}>
              <View style={[styles.containerPreviewImg, backgroundVideo]}>
                      <BlurImage
                          resizeMode={"cover"}
                          resizeMethod={"resize"}
                          media={item.item}
                          blur={ (item.is_checked === 0) }
                          style={[styles.eventImg,{width: screenWidth? SCREEN_WIDTH-20 :  SCREEN_WIDTH-27}]}
                      />
                  {item.media_type !== undefined && item.media_type === "video" &&
                      <PlayButton/>
                  }
              </View>
          </Pressable>
      )
  }

  return (
    <View style={{ overflow: 'hidden', borderRadius: 8, position: 'relative'}}>
      <FlatList 
          data={data} 
          renderItem={_renderItems}
          keyExtractor={(item,index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={(ref)=>{
              flatListRef.current = ref
          }}
          viewabilityConfig={viewConfigRef}
          onViewableItemsChanged={onViewRef.current}
      />
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center', marginTop:10}}>
          {data.map(({}, index:number)=>{
              return (
                  <Pressable 
                      key={index.toString()} 
                      style={{
                          width: index == currentIndex? 10 : 7, 
                          height: index == currentIndex? 10 : 7, 
                          backgroundColor: index == currentIndex?colors.greenPH : colors.greenLight, 
                          borderRadius: 50,
                          marginHorizontal:5,
                          
                      }}
                      onPress={()=> scrollToIndex(index)}
                  />
              )
          })}
      </View>
  </View>
  );
};
export default FlatListCarouser;
