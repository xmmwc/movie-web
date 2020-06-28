<template>
  <movie-list> 
    <toast />
  </movie-list>
</template>

<script>
import Toast from './Toast'
import MovieList from './components/MovieList'
export default {
  components: {
    Toast,
    MovieList
  }
}
</script>