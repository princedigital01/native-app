import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider'
import { Redirect } from 'expo-router';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { useEffect, useState } from 'react';
import { getAllPosts, getLatestPosts } from '../../lib/functionality';
import useApp from '../../lib/useApp';
import VideoCard from '../../components/VideoCard';

const Home = () => {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  
  const {data: posts, refetch} = useApp(getAllPosts);
  const {data: latestPost}=useApp(getLatestPosts)
  
  


  const onRefresh = async ()=>{
    setRefreshing(true)
    await refetch();
    setRefreshing(false)
  }

  if (user.username == null) return <Redirect href={'/'} />
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        //data={[]}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm  text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl  font-semibold text-white">
                  Eddie
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  resizeMode='contain'
                  className={'w-9 h-10'}
                />
              </View>
            </View>

            <SearchInput placeholder={"search for a video topic"} />
            <View className="w-full pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending posts={latestPost ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (

          <EmptyState
            title={"No Videos Found"}
            subTitle={"No Videos Created Yet"}
          />
        )}


        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}


      />

    </SafeAreaView>
  )
}

export default Home