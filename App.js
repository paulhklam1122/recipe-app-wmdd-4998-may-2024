import { GluestackUIProvider } from '@gluestack-ui/themed'
import { StatusBar } from '@gluestack-ui/themed'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { config } from '@gluestack-ui/config'
import Header from './src/components/layout/Header'
import RecipesContainer from './src/components/containers/RecipesContainer'
import AppStack from './src/components/stacks/AppStack'

const App = () => {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        {/* <Header /> */}
        {/* <RecipesContainer /> */}
        <AppStack />
        <StatusBar bg='#2c3e50' />
      </GluestackUIProvider>
    </SafeAreaProvider>
  )
}

export default App
