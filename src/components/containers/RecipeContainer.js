import { Box, Button, ButtonText, Center, Text } from '@gluestack-ui/themed'

const RecipeContainer = ({ navigation, route }) => {
  const { label, url } = route.params

  return (
    <Box width='100%'>
      <Center py={10}>
        <Text my={10}>{label}</Text>
      </Center>
      <Button onPress={() => navigation.navigate('Web', { label, url })} variant='link'>
        <ButtonText>Proceed to Web View</ButtonText>
      </Button>
    </Box>
  )
}

export default RecipeContainer
