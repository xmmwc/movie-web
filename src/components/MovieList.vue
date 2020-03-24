<template>
  <div class="movie-box">
    <div class="movie-list">
      <div class="movie-wrapper">
        <div class="movie-item" v-for="(item, index) in movies" :key="index">
          <div class="movie-item-wrapper">
            <div class="movie-item-slide">
              <div class="movie-blur-bg" :style="{backgroundImage:`url(${item.tm_db_info.image})`}"></div>
              <div class="movie-cover" :style="{backgroundImage:`url(${item.tm_db_info.image})`}"></div>
              <div class="movie-info">
                <div class="movie-title">
                  <div class="movie-main-title">{{item.tm_db_info.title}}</div>
                  <div class="movie-sub-title">{{item.tm_db_info.original_title}}</div>
                </div>
                <div class="movie-desc">{{item.tm_db_info.overview}}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import { getMovieList } from '../api'

export default {
  async created() {
    const data = await getMovieList()
    this.movies = data.data
  },
  mounted() {
    const list = this.$el.querySelector('.movie-list')
    this.$swiper = new Swiper(list, {
      wrapperClass: 'movie-wrapper',
      slideClass: 'movie-item',
      on: {
        slideChange: () => {
          const index = this.$swiper.activeIndex
          this.initChildSlide(index)
        }
      }
    })
  },
  data() {
    return {
      movies: []
    }
  },
  watch: {
    movies() {
      this.$nextTick(() => {
        this.$swiper.updateSlides()
        this.initChildSlide(0)
      })
    }
  },
  methods: {
    initChildSlide(index) {
      const currentElement = this.$el.querySelectorAll('.movie-item')[index]
      if (this.$childSwiper) {
        this.$childSwiper.destroy(false)
      }
      if (currentElement) {
        this.$childSwiper = new Swiper(currentElement, {
          wrapperClass: 'movie-item-wrapper',
          slideClass: 'movie-item-slide',
          direction: 'vertical',
          nested: true,
          slidesPerView: 'auto',
          freeMode: true
        })
      }
    }
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

      .movie-item {
        position: relative;
        width: 100%;
        flex-shrink: 0;
        background-color: #000;

        .movie-item-slide {
          position: relative;
        }

        .movie-cover {
          position: absolute;
          top: 0;
          width: 750px;
          height: 1070px;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          transform: translateY(150px) scale(0.85);
          box-shadow: 0 0 120px rgba($color: #000000, $alpha: 0.8);
          z-index: 3;
        }

        .movie-blur-bg {
          position: relative;
          width: 750px;
          height: 1070px;
          filter: blur(20px);
          opacity: 0.4;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          z-index: 1;
        }

        .movie-info {
          position: relative;
          width: 100%;
          padding: 95px 30px 30px;
          box-sizing: border-box;
          background-color: #fff;
          z-index: 2;

          .movie-title {
            padding: 0 15px;
            .movie-main-title {
              font-size: 45px;
            }

            .movie-sub-title {
              font-size: 35px;
              color: #666;
            }
          }

          .movie-desc {
            font-size: 32px;
            margin-top: 35px;
          }
        }
      }
    }
  }
}
</style>