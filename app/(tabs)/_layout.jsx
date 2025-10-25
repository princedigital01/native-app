import { View, Text,Image } from 'react-native'
import { Tabs,Redirect } from 'expo-router'
import {icons} from '../../constants';

const TabLayout = () => {

    const TabIcon = ({icon, color, name, focused})=>{
        return (
            <View 
              className='items-center w-[60px] justify-center gap-2 mt-5'
            >
                <Image
                    source={icon}
                    resizeMode='contain'
                    tintColor={color}
                    className='w-6 h-6 '

                />
                <Text
                 style={{color:color}}
                 className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
                 >
                    {name}
                </Text>
            </View>
        )
    }
  return (
    <>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor:'#FFA001',
            tabBarInactiveTintColor: '#CDCDE0',
            tabBarStyle:{
                backgroundColor: '#161622',
                borderTopWidth:0,
                borderTopColor: '#232533',
                height: 84,
                padding:0,

            }
          }}
        >
            <Tabs.Screen
              name="home"
              options={{
                title:"Homie",
                headerShown: false,
                tabBarIcon:({color,focused})=>(
                    <TabIcon 
                        color={color}
                        icon={icons.home}
                        name="home"
                        focused={focused}
                    />
                )
              
              }}
            />
            <Tabs.Screen
              name="bookmark"
              options={{
                title:"bookmark",
                headerShown: false,
                tabBarIcon:({color,focused})=>(
                    <TabIcon 
                        color={color}
                        icon={icons.bookmark}
                        name="Bookmark"
                        focused={focused}
                    />
                )
              
              }}
            />
            <Tabs.Screen
              name="create"
              options={{
                title:"create",
                headerShown: false,
                tabBarIcon:({color,focused})=>(
                    <TabIcon 
                        color={color}
                        icon={icons.plus}
                        name="Create"
                        focused={focused}
                    />
                )
              
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title:"profile",
                headerShown: false,
                tabBarIcon:({color,focused})=>(
                    <TabIcon 
                        color={color}
                        icon={icons.profile}
                        name="Profile"
                        focused={focused}
                    />
                )
              
              }}
            />

        </Tabs>
    </>
  )
}

export default TabLayout