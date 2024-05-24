import { Center } from '@gluestack-ui/themed'
import Form from '../forms/Form'
import { useState } from 'react'
import { getRecipes } from '../../services/api'
import Loading from '../layout/Loading'
import RecipesList from '../lists/RecipesList'

const recipesResponse = [
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/219/219b9268b0f84eecf0cab133498b7ef3.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLWVhc3QtMSJHMEUCICJsUZOiE%2Bb6paax%2B7mt8SA5YIdrtrJcdyOWt7b0V%2BFoAiEAxHJT6y808444huuKxjF1UVEgdCu05882Sd3qiTiG7pEqwgUIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDG5tSDCzJG2s4QmQOyqWBQ406xni3KFqWcGqYCAZVLsFdeqGyCvA0BOqM%2FMbdW8%2F64gTY5BVXnMHEcbZO%2BAJAQJpFQUZYcv41d46KQ94HTajTINt0s7%2BEPNa2HJt%2FeUsGu1JlLjs8G17tbe78yL0QK%2BARCtWWeid81HUPPwh7NgLsyP7MSpVD5u1dIuKr2GcC%2FB%2BigP8UZ6WuLeqKBs5oQV7N32oyAkCnta9lSzTRvvxv1Ul9mdxCM7rKNdAeyrJGfXo3fWqshmiylbrSxQ6QXy905SSCS%2BHwiaRx1jDlSPYNBpBpAPJxQ1UclzUx0ywhqBqh4ehWblUnZHgQwPRqHktp5T5CZxD4ml39KHOYXv2yLyfskeSWLSpOqeTKwSYVuC6PB5xLgo0GfJWHoCez9d6%2FaxvrjD7oZCEurQjAMVfNndMktA7q7IpIkV5I%2BR71SJj5feQuDwWGx2Sthyv8VTGPz4QwKcj0H0DQNr5SuSYFIgpt5tgxUhrYjd4B%2B51M%2Bz5KepDW97HpyiL6%2FEpcbOXPM1H1hJhedNqNRB2scxF5FXNQAf8WrM5T4OI47i3IgzZ%2BrZPoSmuM9hT6oUR%2FVYeXzcE2p0H%2BWfkHuLwwBpJSVWZkoQ4K%2FMxTWpmBxteVSFxdFZYKyAjrmOnyb2HNyGXMi0rLBg8cOsH%2FA8GTL1Fd4NngR5Yp%2Fp4NdEB189IvW50opAHF0%2F6T0G5yI6e0GSg2cjs%2FxkqXQAwBYYjTdE0yaIcb%2BufF7s7bhMfgB%2F5xCG9Z0dI8mc%2FAs6bt0oHOHGPBSx4Ov2eJZLKnVSWnhNkZ7%2BL%2Fp8Vs5gaR0MEEtzn9AqHDcmypJ8pQKIKZwRg5gS1EBkyKRzE9mQror8qshlnq3E8ERqJOlhr8XS6Wc%2Ffnu4O1MP%2FMInUv7IGOrEBsZ7h%2BJCeAwJxRljqDNySEIQ9mGMVy6E64BBiQzhv18HMGW3kd1f3YoDMQqS11TNkD3ptLjLhRx%2FqgQef4iZ6P0Met8yDAaOE9dKtyIcyvfYapK6boM7ZTU5jxdiqgZx%2BVH9em%2BWemJZ5ASXB98ehiVtP9ytIJRH3DtJpuGThEH%2Fd7kk4jQcfsdegeYgVeKeGpboMDIEOmF2%2FcgH6nY6r8cb612X1HkgF8KL%2FiVqtPEKp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240524T013647Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFKICDXG5E%2F20240524%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f8b22e8bea9378dc4e4b19b37183393a3cbb67f1b5c9302940dfd05da5239a9d',
    label: 'Beef Tacos',
    source: 'No Recipes',
    url: 'http://norecipes.com/blog/2009/05/28/beef-tacos-recipe/'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/d96/d964289a83afcc99c8022addf088444d.jpeg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLWVhc3QtMSJHMEUCICJsUZOiE%2Bb6paax%2B7mt8SA5YIdrtrJcdyOWt7b0V%2BFoAiEAxHJT6y808444huuKxjF1UVEgdCu05882Sd3qiTiG7pEqwgUIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDG5tSDCzJG2s4QmQOyqWBQ406xni3KFqWcGqYCAZVLsFdeqGyCvA0BOqM%2FMbdW8%2F64gTY5BVXnMHEcbZO%2BAJAQJpFQUZYcv41d46KQ94HTajTINt0s7%2BEPNa2HJt%2FeUsGu1JlLjs8G17tbe78yL0QK%2BARCtWWeid81HUPPwh7NgLsyP7MSpVD5u1dIuKr2GcC%2FB%2BigP8UZ6WuLeqKBs5oQV7N32oyAkCnta9lSzTRvvxv1Ul9mdxCM7rKNdAeyrJGfXo3fWqshmiylbrSxQ6QXy905SSCS%2BHwiaRx1jDlSPYNBpBpAPJxQ1UclzUx0ywhqBqh4ehWblUnZHgQwPRqHktp5T5CZxD4ml39KHOYXv2yLyfskeSWLSpOqeTKwSYVuC6PB5xLgo0GfJWHoCez9d6%2FaxvrjD7oZCEurQjAMVfNndMktA7q7IpIkV5I%2BR71SJj5feQuDwWGx2Sthyv8VTGPz4QwKcj0H0DQNr5SuSYFIgpt5tgxUhrYjd4B%2B51M%2Bz5KepDW97HpyiL6%2FEpcbOXPM1H1hJhedNqNRB2scxF5FXNQAf8WrM5T4OI47i3IgzZ%2BrZPoSmuM9hT6oUR%2FVYeXzcE2p0H%2BWfkHuLwwBpJSVWZkoQ4K%2FMxTWpmBxteVSFxdFZYKyAjrmOnyb2HNyGXMi0rLBg8cOsH%2FA8GTL1Fd4NngR5Yp%2Fp4NdEB189IvW50opAHF0%2F6T0G5yI6e0GSg2cjs%2FxkqXQAwBYYjTdE0yaIcb%2BufF7s7bhMfgB%2F5xCG9Z0dI8mc%2FAs6bt0oHOHGPBSx4Ov2eJZLKnVSWnhNkZ7%2BL%2Fp8Vs5gaR0MEEtzn9AqHDcmypJ8pQKIKZwRg5gS1EBkyKRzE9mQror8qshlnq3E8ERqJOlhr8XS6Wc%2Ffnu4O1MP%2FMInUv7IGOrEBsZ7h%2BJCeAwJxRljqDNySEIQ9mGMVy6E64BBiQzhv18HMGW3kd1f3YoDMQqS11TNkD3ptLjLhRx%2FqgQef4iZ6P0Met8yDAaOE9dKtyIcyvfYapK6boM7ZTU5jxdiqgZx%2BVH9em%2BWemJZ5ASXB98ehiVtP9ytIJRH3DtJpuGThEH%2Fd7kk4jQcfsdegeYgVeKeGpboMDIEOmF2%2FcgH6nY6r8cb612X1HkgF8KL%2FiVqtPEKp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240524T013647Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFKICDXG5E%2F20240524%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=6fe48c5e5093a81a8e812ef753bdf5f3093574ac816dfc5210946a2e15db30f8',
    label: 'Smoked Wagyu Beef Shank',
    source: 'Food52',
    url: 'https://food52.com/recipes/86509-smoked-wagyu-beef-shank'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/207/2074a28ff50eba58d79304c9296438a1.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLWVhc3QtMSJHMEUCICJsUZOiE%2Bb6paax%2B7mt8SA5YIdrtrJcdyOWt7b0V%2BFoAiEAxHJT6y808444huuKxjF1UVEgdCu05882Sd3qiTiG7pEqwgUIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDG5tSDCzJG2s4QmQOyqWBQ406xni3KFqWcGqYCAZVLsFdeqGyCvA0BOqM%2FMbdW8%2F64gTY5BVXnMHEcbZO%2BAJAQJpFQUZYcv41d46KQ94HTajTINt0s7%2BEPNa2HJt%2FeUsGu1JlLjs8G17tbe78yL0QK%2BARCtWWeid81HUPPwh7NgLsyP7MSpVD5u1dIuKr2GcC%2FB%2BigP8UZ6WuLeqKBs5oQV7N32oyAkCnta9lSzTRvvxv1Ul9mdxCM7rKNdAeyrJGfXo3fWqshmiylbrSxQ6QXy905SSCS%2BHwiaRx1jDlSPYNBpBpAPJxQ1UclzUx0ywhqBqh4ehWblUnZHgQwPRqHktp5T5CZxD4ml39KHOYXv2yLyfskeSWLSpOqeTKwSYVuC6PB5xLgo0GfJWHoCez9d6%2FaxvrjD7oZCEurQjAMVfNndMktA7q7IpIkV5I%2BR71SJj5feQuDwWGx2Sthyv8VTGPz4QwKcj0H0DQNr5SuSYFIgpt5tgxUhrYjd4B%2B51M%2Bz5KepDW97HpyiL6%2FEpcbOXPM1H1hJhedNqNRB2scxF5FXNQAf8WrM5T4OI47i3IgzZ%2BrZPoSmuM9hT6oUR%2FVYeXzcE2p0H%2BWfkHuLwwBpJSVWZkoQ4K%2FMxTWpmBxteVSFxdFZYKyAjrmOnyb2HNyGXMi0rLBg8cOsH%2FA8GTL1Fd4NngR5Yp%2Fp4NdEB189IvW50opAHF0%2F6T0G5yI6e0GSg2cjs%2FxkqXQAwBYYjTdE0yaIcb%2BufF7s7bhMfgB%2F5xCG9Z0dI8mc%2FAs6bt0oHOHGPBSx4Ov2eJZLKnVSWnhNkZ7%2BL%2Fp8Vs5gaR0MEEtzn9AqHDcmypJ8pQKIKZwRg5gS1EBkyKRzE9mQror8qshlnq3E8ERqJOlhr8XS6Wc%2Ffnu4O1MP%2FMInUv7IGOrEBsZ7h%2BJCeAwJxRljqDNySEIQ9mGMVy6E64BBiQzhv18HMGW3kd1f3YoDMQqS11TNkD3ptLjLhRx%2FqgQef4iZ6P0Met8yDAaOE9dKtyIcyvfYapK6boM7ZTU5jxdiqgZx%2BVH9em%2BWemJZ5ASXB98ehiVtP9ytIJRH3DtJpuGThEH%2Fd7kk4jQcfsdegeYgVeKeGpboMDIEOmF2%2FcgH6nY6r8cb612X1HkgF8KL%2FiVqtPEKp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240524T013647Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFKICDXG5E%2F20240524%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=3423b04d911db57df81b197d8b2af1e4db08f880ade0f8612eb2f477dee9537f',
    label: 'Roast sirloin of beef',
    source: 'BBC Good Food',
    url: 'http://www.bbcgoodfood.com/recipes/2558/roast-sirloin-of-beef'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/ac6/ac62c888656327623f1bf247638ca34b.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLWVhc3QtMSJHMEUCICJsUZOiE%2Bb6paax%2B7mt8SA5YIdrtrJcdyOWt7b0V%2BFoAiEAxHJT6y808444huuKxjF1UVEgdCu05882Sd3qiTiG7pEqwgUIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDG5tSDCzJG2s4QmQOyqWBQ406xni3KFqWcGqYCAZVLsFdeqGyCvA0BOqM%2FMbdW8%2F64gTY5BVXnMHEcbZO%2BAJAQJpFQUZYcv41d46KQ94HTajTINt0s7%2BEPNa2HJt%2FeUsGu1JlLjs8G17tbe78yL0QK%2BARCtWWeid81HUPPwh7NgLsyP7MSpVD5u1dIuKr2GcC%2FB%2BigP8UZ6WuLeqKBs5oQV7N32oyAkCnta9lSzTRvvxv1Ul9mdxCM7rKNdAeyrJGfXo3fWqshmiylbrSxQ6QXy905SSCS%2BHwiaRx1jDlSPYNBpBpAPJxQ1UclzUx0ywhqBqh4ehWblUnZHgQwPRqHktp5T5CZxD4ml39KHOYXv2yLyfskeSWLSpOqeTKwSYVuC6PB5xLgo0GfJWHoCez9d6%2FaxvrjD7oZCEurQjAMVfNndMktA7q7IpIkV5I%2BR71SJj5feQuDwWGx2Sthyv8VTGPz4QwKcj0H0DQNr5SuSYFIgpt5tgxUhrYjd4B%2B51M%2Bz5KepDW97HpyiL6%2FEpcbOXPM1H1hJhedNqNRB2scxF5FXNQAf8WrM5T4OI47i3IgzZ%2BrZPoSmuM9hT6oUR%2FVYeXzcE2p0H%2BWfkHuLwwBpJSVWZkoQ4K%2FMxTWpmBxteVSFxdFZYKyAjrmOnyb2HNyGXMi0rLBg8cOsH%2FA8GTL1Fd4NngR5Yp%2Fp4NdEB189IvW50opAHF0%2F6T0G5yI6e0GSg2cjs%2FxkqXQAwBYYjTdE0yaIcb%2BufF7s7bhMfgB%2F5xCG9Z0dI8mc%2FAs6bt0oHOHGPBSx4Ov2eJZLKnVSWnhNkZ7%2BL%2Fp8Vs5gaR0MEEtzn9AqHDcmypJ8pQKIKZwRg5gS1EBkyKRzE9mQror8qshlnq3E8ERqJOlhr8XS6Wc%2Ffnu4O1MP%2FMInUv7IGOrEBsZ7h%2BJCeAwJxRljqDNySEIQ9mGMVy6E64BBiQzhv18HMGW3kd1f3YoDMQqS11TNkD3ptLjLhRx%2FqgQef4iZ6P0Met8yDAaOE9dKtyIcyvfYapK6boM7ZTU5jxdiqgZx%2BVH9em%2BWemJZ5ASXB98ehiVtP9ytIJRH3DtJpuGThEH%2Fd7kk4jQcfsdegeYgVeKeGpboMDIEOmF2%2FcgH6nY6r8cb612X1HkgF8KL%2FiVqtPEKp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240524T013647Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFKICDXG5E%2F20240524%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e10d70f396837f879f1603f228dbf930cf9f23723c3e4735469ba2adf2eb8cfb',
    label: 'Roast Beef',
    source: 'Saveur',
    url: 'https://www.saveur.com/recipes/roast-beef-recipe'
  }
]

const RecipesContainer = props => {
  const [ingredient, setIngredient] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [recipes, setRecipes] = useState([])

  const { navigation } = props

  const fetchRecipes = () => {
    setIsLoading(true)

    // console.log('fetching recipes')

    // getRecipes(ingredient).then(
    //   recipes => {
    //     setRecipes(recipes)
    //     setIsLoading(false)
    //   },
    //   error => {
    //     alert('Error', `Something went wrong ${error}`)
    //   }
    // )

    setRecipes(recipesResponse)
    setIsLoading(false)
  }

  const handleInputChange = ingredient => {
    setIngredient(ingredient)
  }

  console.log('ingredient', ingredient)

  return (
    <Center px={4}>
      <Form onInputChange={handleInputChange} onSubmit={fetchRecipes} />
      {isLoading ? <Loading /> : <RecipesList navigation={navigation} recipes={recipes} />}
    </Center>
  )
}

export default RecipesContainer
