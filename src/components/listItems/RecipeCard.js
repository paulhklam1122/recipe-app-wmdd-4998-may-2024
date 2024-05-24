import { Box, Button, ButtonText, Image, VStack } from '@gluestack-ui/themed'
import { Card, Heading, Text } from '@gluestack-ui/themed'
import { StyleSheet } from 'react-native'

const RecipeCard = props => {
  const { label, image, source, url, navigation } = props

  return (
    <Card p='$5' borderRadius='$lg' maxWidth={360} m='$3'>
      <Image
        mb='$6'
        h={240}
        width='$full'
        borderRadius='$md'
        source={{
          uri: image
        }}
      />
      <Text
        fontSize='$sm'
        fontStyle='normal'
        fontFamily='$heading'
        fontWeight='$normal'
        lineHeight='$sm'
        mb='$2'
        sx={{
          color: '$textLight700',
          _dark: {
            color: '$textDark200'
          }
        }}
      >
        {source}
      </Text>
      <VStack mb='$6'>
        <Heading size='md' fontFamily='$heading' mb='$4'>
          {label}
        </Heading>
        <Text size='sm' fontFamily='$heading'>
          Floral embroidered notch neck thread work cotton kurta in white and black.
        </Text>
      </VStack>
      <Box
        flexDirection='column'
        sx={{
          '@sm': {
            flexDirection: 'row'
          }
        }}
      >
        <Button
          px='$4'
          py='$2'
          variant='link'
          fontFamily='$heading'
          borderColor='$borderLight300'
          $dark-borderColor='$backgroundDark600'
          sx={{
            '@sm': {
              flex: 1
            }
          }}
          onPress={() => navigation.navigate('Show', { label, url })}
        >
          <ButtonText size='sm' color='$textLight600' $dark-color='$textDark400'>
            Show
          </ButtonText>
        </Button>
      </Box>
    </Card>
  )
}

export default RecipeCard
