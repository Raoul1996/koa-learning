(function () {
  let btn = document.querySelector('#J_UploadPictureBtn')
  let progressElem = document.querySelector('#J_UploadProgress')
  let previewElem = document.querySelector('#J_PicturePreview')
  btn.addEventListener('click', function () {
    uploadAction({
      success: function (result) {
        console.log(result)
        if (result && result.success && result.data && result.data.pictureUrl) {
          previewElem.innerHTML = `<img src="${result.data.pictureUrl}" style="max-width: 100%">`
        }
      },
      progress: function (data) {
        if (data && data * 1 > 0) {
          progressElem.innerHTML = data
        }
      }
    })
  })

  /**
   * 类型判断
   * @type {{isPrototype: isPrototype, isJSON: isJSON, isFunction: isFunction}}
   */
  let UtilType = {
    isPrototype: function (data) {
      return Object.prototype.toString.call(data).toLowerCase()
    },
    isJSON: function (data) {
      return this.isPrototype(data) === '[object object]'
    },
    isFunction: function (data) {
      return this.isPrototype(data) === '[object function]'
    }
  }

  /**
   * form 表单上传事件
   * @param options
   */
  function requestEvent(options) {
    try {
      let formData = options.formData
      let xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          options.success(JSON.parse(xhr.responseText))
        }
      }
      xhr.upload.onprogress = function (event) {
        let loaded = event.loaded
        let total = event.total
        let percent = Math.floor(100 * loaded / total)
        options.progress(percent)
      }
      xhr.open('post', '/api/picture/upload.json')
      xhr.send(formData)
    } catch (e) {
      options.fail(e)
    }
  }

  /**
   * upload event
   * @param options
   */
  function uploadEvent(options) {
    let file
    let formData = new FormData()
    let input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('name', 'files')
    input.click()
    input.onchange = function () {
      file = input.files[0]
      formData.append('files', file)
      requestEvent({
        formData,
        success: options.success,
        fail: options.fail,
        progress: options.progress
      })
    }
  }

  /**
   * upload action
   * @param options
   */
  function uploadAction(options) {
    if (!UtilType.isJSON(options)) {
      console.log('upload options is null')
      return
    }
    let _options = {}
    _options.success = UtilType.isFunction(options.success) ? options.success : function () {
    }
    _options.fail = UtilType.isFunction(options.fail) ? options.fail : function () {
    }
    _options.progress = UtilType.isFunction(options.progress) ? options.progress : function () {
    }
    uploadEvent(_options)
  }
})()