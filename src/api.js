import io from "./lib/io"


export const getMovieList = () => {
  return io.jsonp('http://xmmwc.myqnapcloud.com:9900/list')
}