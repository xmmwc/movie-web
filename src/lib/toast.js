class Toast {
  static DEFAULT_PROPS = {
    timeout: 2
  }

  timer
  msg = ''

  toast (msg, props = {}) {
    const realProps = Object.assign({}, Toast.DEFAULT_PROPS, props)
    this.clearToast()
    this.msg = msg
    this.timer = setTimeout(() => {
      this.clearToast()
    }, realProps.timeout * 1000);
  }

  clearToast () {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    this.msg = ''
  }
}

const toast = new Toast()

export default toast