$(function () {
  /**
   *
   * 规则校验
   *
   */
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            max: 6,
            min: 2,
            message: '用户名长度必须在2-6位之间',
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            max: 12,
            min: 6,
            message: '密码长度必须是6-12位'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  })

  /**
   *
   * 阻止默认事件
   *
   * */
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    console.log('阻止了默认行为');
    $.ajax({
      type: 'post',
      data: $('#form').serialize(),
      url: '/employee/employeeLogin',
      dataType: 'json',
      success: function (info) {
        console.log(info);

        if (info.success) {
          location.href = "index.html";
        }
        if (info.error === 1000) {
          $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');

        }
        if (info.error === 1001) {
          $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
        }
      }

    })
  })
  /**
   * 修复resetbug
   * */
  $('[type="reset"]').click(function () {
    console.log(111);
    $('#form').data('bootstrapValidator').resetForm();
  })

})