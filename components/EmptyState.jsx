import { View, Text, Image } from 'react-native'
import CustomButton from "./CustomButton"
import { images } from '../constants'

const EmptyState = ({ title, subTitle }) => {
    return (
        <View className="justify-center items-center px-4">
            <Image
                source={images.empty}
                className="w-[270px] h-[215px]"
                resizeMode='contain'
            />
            <Text className="font-pmedium text-sm  text-gray-100">
               {subTitle}
            </Text>
            <Text className="text-xl  font-semibold text-white">
                {title}
            </Text>

            <CustomButton
            title={"Create Video"}
            handlePress={()=>router.push('/create')}
            containerStyles={"w-full my-5"}
            />
        </View>
    )
}

export default EmptyState