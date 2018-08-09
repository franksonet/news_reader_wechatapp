// pages/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsid: '1523074607642',
    newsArticle: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      newsid: options.newsid
    })
    console.log('On news detail page for news with ID: ' + this.data.newsid)
    this.getNewsArticle()
  },

  //The function to get the detailed news article from server
  getNewsArticle(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.newsid
      },
      success: res => {
        let result = res.data.result
        console.log(result)
        result.date = result.date.slice(0, 10) + ' ' + result.date.slice(11, 16)
        console.log(result.date)
        this.setData({
          newsArticle: result
        })

      },
      complete: () => {
        callback && callback()
      }
    })
  },

  //navigate back to index page
  naviBack(){
    wx.navigateBack({
      delta: 1
    })
  }
})