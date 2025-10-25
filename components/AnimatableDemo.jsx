import { View, Text, StyleSheet } from 'react-native'


const _view = ({children,animation,duration,className, ...props}) => {

    const classname=` transition-all duration-${duration|| "300"} ${className}`
  return (
    <View  className={classname} {...props}>
      {children}
    </View>
  )
}

const AnimatableDemo = {
    
    View:_view
}

export default AnimatableDemo