$(function () {
  var currentPage = 1;
  var pageSize = 5;

  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      dataType: 'json',
      success(info) {
        console.log(info);
        var htmlStr = template('firstTpl',info);
        $('tbody').html(htmlStr);
        $('#catePage').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil( info.total / info.size ),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }


    })
  }

  $('#btn-add').click(function () {
    // console.log(11);
    $('#addcategory').modal('show');
  })

  $('#cateForm').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '分类名不能为空',
          }
        }
      }
    }
  })

  $('#cateForm').on('success.form.bv',function (e) {
    e.preventDefault();

  })
  $('#addCate').click(function () {
    // console.log(111);
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('#cateForm').serialize(),
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        if(info.success) {
          render();
          $('#addcategory').modal('hide');
          $('#cateForm').data('bootstrapValidator').resetForm(true);
        }
      }
    })
  })








})