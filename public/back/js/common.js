
$(function () {

  /**
   *
   * nprogress
   * */

  $(document).ajaxStart(function () {
    NProgress.start();
  })

  $(document).ajaxStop(function () {
    NProgress.done();
  })

  //  解决login一直刷新的问题
  if(location.href.indexOf('login.html') === -1){
    $.ajax({
      type: 'get',
      url: '/employee/checkRootLogin',
      success: function ( info ) {
        if(info.success) {
          console.log('登陆了');
        }
        if( info.error === 400) {
          location.href = 'login.html';
        }
      }
    })
  }

  $('#cate').click(function () {
    $('#child').stop().slideToggle();
    // console.log(111);
  })

  $('.icon_menu').click(function () {
    $('.lt_aside').toggleClass('out');
    $('.lt_main').toggleClass('out');
    $('.lt_topbar').toggleClass('out');
  })

  $('.icon_logout').click(function () {
    $('.modal').modal("show");
  })

  $('.btn-logout').click(function () {
    $.ajax({
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function ( info ) {
        console.log(info);
        if(info.success) {
          location.href = 'login.html';
        }
      }
    })
  })

})