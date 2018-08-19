$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  //渲染分页
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        var htmlStr = template('secondTpl',info);
        $('tbody').html( htmlStr );
        $('#catePage').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil( info.total / info.size ),
          onPageClicked: function (a,b,c,page) {
            currentPage = page;
            render();
          }
        })
      }

    })
  }

  $('#btn-add').click(function () {
    $('#secondCate').modal('show');
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100,
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('firstCateTpl',info);
        $('#firstCateList').html(htmlStr);
      }
    })
  })

  $('#firstCateList').on('click','li',function () {
    // console.log(1);
    // console.log($(this).text());
    $('#firstcateListBtn').text($(this).text())
  })

  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e,data) {
      console.log(data.result.picAddr);
      $('#imgOne').attr('src',data.result.picAddr);
    }
  })
})