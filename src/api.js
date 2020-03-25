import factory from "./lib/io"
import uri from 'urijs'

const apiHost = process.env.NODE_ENV === 'production' ? new uri().port('9900') : new uri('http://xmmwc.myqnapcloud.com').port('9900')
const io = factory(apiHost)

export const getMovieList = () => {
  return io.jsonp(apiHost.path('/list').toString())
}