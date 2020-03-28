<template>
  <div class="movie-item">
    <div class="movie-item-wrapper">
      <div class="movie-item-slide">
        <div class="movie-cover swiper-lazy" :data-background="value.tm_db_info.image" :style="coverStyle"></div>
        <div class="movie-blur">
          <div class="movie-blur-bg swiper-lazy" :data-background="value.tm_db_info.image"></div>
        </div>
        <div class="movie-info">
          <div class="movie-head">
            <div class="movie-title">
              <div class="movie-main-title">{{value.tm_db_info.title}}</div>
              <div class="movie-sub-title">{{value.tm_db_info.original_title}}</div>
            </div>
            <div class="movie-rate">
              <strong class="movie-star">{{value.tm_db_info.rating_average}}</strong>
            </div>
            <!-- <div class="movie-btn">
              <a class="movie-download btn" :href="getShortcutsLink(topRatedMovie)">下载</a>
            </div> -->
          </div>
          <div class="movie-desc">{{value.tm_db_info.overview}}</div>
          <div class="movie-origin-info" v-for="(movie, index) in value.movie_info" :key="index">
            <div class="movie-origin-head">
              <div class="movie-file-title">{{movie.origin_title}}</div>
              <div class="movie-file-tags">
                <span class="movie-file-tag" v-for="(tag, index) in getMovieTags(movie)" :key="index">{{tag}}</span>
              </div>
            </div>
            <div class="movie-origin-btn">
              <a class="movie-download btn" :href="getShortcutsLink(movie)">下载</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import Swiper from 'swiper'

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      $swiper: null,
      coverProgress: 0
    }
  },
  created() {
    this.$db = _.throttle(this.changeProgress, 150)
  },
  mounted() {
    this.$swiper = new Swiper(this.$el, {
      wrapperClass: 'movie-item-wrapper',
      slideClass: 'movie-item-slide',
      direction: 'vertical',
      slidesPerView: 'auto',
      nested: true,
      freeMode: true,
      freeModeMomentumBounce: false,
      on: {
        progress: (progress) => {
          this.$db(progress)
        }
      }
    })
  },
  computed: {
    coverStyle() {
      const style = {}
      const y = 100 * (1 - this.coverProgress)
      const scale = 1 - (0.15 * (1 - this.coverProgress))
      const opacity = 0.8 * (1 - this.coverProgress)
      style.transform = `translateY(${y}px) scale(${scale})`
      style.boxShadow = `0 0 120px rgba(0, 0, 0, ${opacity})`
      return style
    },
    topRatedMovie() {
      return this.value.movie_info[0]
    }
  },
  methods: {
    changeProgress(progress) {
      this.$nextTick(() => {
        this.coverProgress = progress
      })
    },
    getMovieTags(movie) {
      const tagsList = _.pick(movie, ['year', 'res', 'quality', 'codec', 'sound', 'author'])
      const tags = _.values(tagsList).reduce((total, current) => {
        if (current) {
          if (_.isArray(current)) {
            return [...total, ...current]
          } else {
            return [...total, current]
          }
        }
        return total
      }, [])
      return tags.map(tag => tag.toUpperCase())
    },
    getShortcutsLink(movie) {
      const name = encodeURIComponent('下载')
      const magnets = encodeURIComponent(movie.link)
      return `shortcuts://run-shortcut?name=${name}&input=${magnets}`
    }
  }
}
</script>
<style lang="scss">
.movie-item {
  position: relative;
  width: 100%;
  flex-shrink: 0;
  flex-grow: 0;

  .movie-item-wrapper {
    position: relative;

    .movie-item-slide {
      .movie-cover {
        position: absolute;
        top: 0;
        width: 100%;
        height: 1070px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        transform: translateY(100px) scale(0.85);
        box-shadow: 0 0 120px rgba($color: #000000, $alpha: 0.8);
        background-color: #000;
        z-index: 1;
        transition: all 0.2s;
      }

      .movie-blur {
        position: relative;
        width: 100%;
        height: 1070px;
        overflow: hidden;
        background-color: #000;

        .movie-blur-bg {
          width: 100%;
          height: 100%;
          // filter: blur(10px);
          opacity: 0.4;
          transform: scale(1.2);
          transform-origin: 50% 50%;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }

      .movie-info {
        position: relative;
        width: 100%;
        padding: 55px 45px 120px;
        box-sizing: border-box;
        background-color: #fff;

        .movie-head {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          .movie-title {
            flex-grow: 1;

            .movie-main-title {
              height: 1.5em;
              line-height: 1.5em;
              font-size: 45px;
              max-width: 500px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }

            .movie-sub-title {
              font-size: 35px;
              color: #666;
            }
          }

          .movie-star {
            font-size: 85px;
            color: #e09015;
            padding: 0 0 0 15px;
            flex-shrink: 0;
          }

          .movie-btn {
            padding: 0 15px;
            flex-shrink: 0;
          }
        }

        .movie-origin-info {
          padding-top: 25px;
          margin-bottom: 20px;
          word-break: break-all;
          border-top: 1px solid #e1e1e1;
          display: flex;
          flex-direction: row;
          align-items: center;

          .movie-origin-head {
            .movie-file-title {
              font-size: 28px;
              color: #999;
            }

            .movie-file-tags {
              margin-top: 15px;

              .movie-file-tag {
                display: inline-block;
                background-color: #67c23a;
                color: #fff;
                margin-right: 15px;
                margin-bottom: 15px;
                font-size: 28px;
                padding: 5px 10px;
                border-radius: 6px;
              }
            }
          }

          .movie-origin-btn {
            padding: 0 15px;
            flex-shrink: 0;
          }
        }

        .movie-desc {
          font-size: 32px;
          margin-top: 35px;
          margin-bottom: 45px;
        }
      }
    }
  }

  a.btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 2px solid #dcdfe6;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 24px 40px;
    font-size: 28px;
    border-radius: 8px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }

  a,
  a:link,
  a:visited {
    color: #fff;
    text-decoration: none;
  }
}
</style>