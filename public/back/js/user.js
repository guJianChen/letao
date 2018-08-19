$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var currentId;
  var isDelete;
  render();
  function render() {
    $.ajax({
      url: '/user/queryUser',
      type: 'get',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function ( info ) {
        console.log(info);
        var htmlStr = template('tpl',info);
        $('tbody').html(htmlStr);
        //分页初始化
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages:Math.ceil(info.total / info.size),//总页数
          onPageClicked:function(a, b, c,page){
            currentPage = page;
            render();
            //为按钮绑定点击事件 page:当前点击的按钮值
          }
        });

      }
    })
  }

  $('tbody').on('click','.btn',function () {
    // console.log(111);
    $('#modal-user').modal('show');
    currentId = $(this).parent().data('id');
    // console.log(currentId);
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    // console.log(isDelete);

  })

  $('#user-suer').click(function () {
    $.ajax({
      url: '/user/updateUser',
      type: 'post',
      dataType: 'json',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      success: function (info) {
        console.log(info);
        if( info.success ){
          $('#modal-user').modal('hide');
          render()
        }
      }
    })
  })

})