<template>
  <div class="movie-box">
    <div class="movie-list">
      <div class="movie-wrapper">
        <movie v-for="(item, index) in movies" :key="index" :value="item" />
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import Swiper from 'swiper'
import Movie from './Movie'
import toast from '../lib/toast'
import { getMovieList } from '../api'

export default {
  async created () {
    const data = await getMovieList().catch(err => {
      toast.toast(err.message)
    })
    this.movies = data.data
  },
  mounted () {
    const list = this.$el.querySelector('.movie-list')
    this.$swiper = new Swiper(list, {
      wrapperClass: 'movie-wrapper',
      slideClass: 'movie-item',
      lazy: {
        loadPrevNext: true
      }
    })
  },
  data () {
    return {
      $swiper: null,
      movies: []
    }
  },
  watch: {
    movies () {
      this.$nextTick(() => {
        this.$swiper.updateSlides()
        this.$swiper.lazy.load()
      })
    }
  },
  components: {
    Movie
  }
}
</script>
<style lang="scss">
.movie-box {
  width: 100%;
  height: 100%;

  .movie-list {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .movie-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 1;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      box-sizing: content-box;
    }
  }
}
</style>