const categoryMap = {
  '国内': 'gn',
  '国际': 'gj',
  '财经': 'cj',
  '娱乐': 'yl',
  '军事': 'js',
  '体育': 'ty',
  '其他': 'other'
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: Object.keys(categoryMap),
    currentCategory: '国内',
    newsList: [],
    hotNews: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('Getting the news list of defualt category')
    this.getNewslist()
  },

  onPullDownRefresh() {
    this.getNewslist(() => {
      wx.stopPullDownRefresh()
    })
  },

  // When the news category item is tapped:
  onTapTabItem: function(event){
    // console.log(event)
    let tabSelected = event.currentTarget.dataset.category
    console.log('Category selected: ' + tabSelected)
    console.log(categoryMap[tabSelected])
    this.setData({
      currentCategory: tabSelected
    })
    this.getNewslist()
  },

  onTapNewsItem: function(event){
    let selectedNewsid = event.currentTarget.dataset.newsid
    console.log('ID of selected News: ' + selectedNewsid)
    wx.navigateTo({
      url: '/pages/article/article?newsid=' + selectedNewsid
    })
  },

  //Get the news list of the selected category
  getNewslist(callback) {
    console.log('Getting the news list of the selected category: ' + this.data.currentCategory)
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: categoryMap[this.data.currentCategory]
      },
      success: res => {
        let newsList = res.data.result
        console.log(newsList)
        var i
        for (i=0; i<newsList.length; i++){
          let newsdate = newsList[i].date
          newsList[i].date = newsdate.slice(0, 10) + ' ' + newsdate.slice(11,16)
        }
        this.setData({
          newsList: newsList.slice(1),
          hotNews: newsList[0]
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})