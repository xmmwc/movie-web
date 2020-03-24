import URI from 'urijs'
import axios from 'axios'
import jsonpOrigin from 'jsonp'

export const qs = (params) => {
  const uri = new URI('/')
  uri.search(params)
  return uri.query()
}

export const ioFactory = (baseURL) => {
  const config = {
    baseURL
  }
  const io = axios.create(config)

  io.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data
  }, function (error) {
    // Do something with response error
    return Promise.reject(error)
  })

  const get = (url, data) => io.get(
    url,
    {
      params: data,
      paramsSerializer: function (params) {
        return qs(params)
      }
    }
  )

  const restPost = (url, data) => io.post(url, data)
  const restPut = (url, data) => io.put(url, data)
  const post = (url, data) => io.post(url, qs(data), {
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
  const deleteMethod = (url) => io.delete(url)
  const jsonp = (url, data, opts) => {
    return new Promise(function (resolve, reject) {
      const uri = new URI(url)
      if (data) {
        uri.search(data)
      }
      jsonpOrigin(uri.toString(), {
        ...opts,
        timeout: 10000
      }, function (err, data) {
        if (err) {
          return reject(err)
        } else {
          return resolve(data)
        }
      })
    })
  }
  return {
    get,
    post,
    delete: deleteMethod,
    restPost,
    restPut,
    jsonp,
    io
  }
}

export default ioFactory