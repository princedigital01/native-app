import { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import * as AnimatableDemo from 'react-native-animatable'

//import AnimatableDemo from './AnimatableDemo'
import { icons, images, Videos } from '../constants'
import { Video, ResizeMode  } from 'expo-av'

const TrendingItem = ({item, activeItem}) => {
    const [play, setPlay] = useState(false)

    const ZoomIn = {
        0:{
            scale:0.9
        },
        1:{
            scale:1.1 
        }
    }

    const ZoomOut = {
        0:{
            scale:1.1
        },
        1:{
            scale:0.9
        }
    }


    return (
        //animatable.view

        <AnimatableDemo.View
            className="mr-5"
            duration={500}
            //animation={activeItem == item.title ? ZoomIn:ZoomOut}

        >
            {play ? (
                <TouchableOpacity 
                className="relative justify-center items-center w-52 h-72 rounded-[35px] my-5 overflow-hidden border-white border-2"
                activeOpacity={0.7}
                
                >
                <Video 
                    source={Videos.Video1}
                    //className="w-full h-full rounded-[35px] my-5 overflow-hidden"
                    resizeMode={ResizeMode.COVER}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status)=>{
                        if(status.didJustFinish){
                            setPlay(false);
                        }
                    }}
                />
                </TouchableOpacity>
            ):
            (
                <TouchableOpacity 
                className="relative justify-center items-center "
                activeOpacity={0.7}
                onPress={()=>setPlay(true)}
                >
                    <ImageBackground
                    source={images.thumbnail}
                    className="border w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
                    resizeMode='cover'
                    />
                    <Image
                    source={icons.play}
                    className="w-12 h-12 absolute"
                    resizeMode='contain'
                    />
                </TouchableOpacity>
            )}

        </AnimatableDemo.View>
    )
}

const Trending = ({ posts }) => {
    const [activeItem, setActiveItem] = useState(posts[0]);
    const viewableItemsChanged= ({viewableItems})=>{
        
        if(viewableItems.length >0){
            setActiveItem(viewableItems[0].item.title) 
            console.log(viewableItems[0].item.title)
        }
    }
    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item} />
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold:80,
                
                 
                
                
            }}
            //contentOffset={{x:170}}
            horizontal
            showsHorizontalScrollIndicator={false}
            

        />
    )
}

export default Trending