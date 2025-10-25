import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField';
import { images } from '../../constants';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {

  const {useLogin} = useGlobalContext();
  const [form, setForm] = useState(
    {
      email: '',
      password: ''
    }
  )

  const [isSumiting, setIsSumiting] = useState(false);
  const [errMessage, setErrMessage] = useState("")

  const  submit = async () => {

    if (!form.email || !form.password) {
      setErrMessage("plese fill in all fields ")
    }else{
       try{
              const res= useLogin(form)._j;
              setErrMessage(res.message);
              if(res.ok){
                router.push("/home")
                
              }
              
      
            }catch(err){
              setErrMessage(err.message)
              console.log(err);
              
          }
    }

  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView >
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image
            source={images.logo}
            className='w-[115px] h-[35px]'
            resizeMode='contain'
          />

          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
            login into to Auro
          </Text>
          <Text className='text-xl text-red-600 text-semibold mt-10 font-psemibold'>
           {errMessage}
          </Text>

          <FormField
            title='email'
            value={form.email}
            handleChangeText={
              (e) => setForm(
                { ...form, email: e }
              )
            }
            otherStyles='mt-7'
            keyboardType='email-addresss'

          />
          <FormField
            title='password'
            value={form.password}
            handleChangeText={
              (e) => setForm(
                { ...form, password: e }
              )
            }
            otherStyles='mt-7'

          />

          <CustomButton
            title='Sign In'
            handlePress={submit}
            containerStyles={'mt-7'}
          />

          <View className='justify-center gap-2 pt-5 flex-row'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Dont have an account
            </Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity activeOpacity={0.4}>
                <Text className="text-lg font-psemibold text-secondary">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn