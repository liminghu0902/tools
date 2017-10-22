var lf = lf || {};

lf.plugin = (function($) {

	if(typeof $ === 'undefine') return false;

	var _plugins = {
		validate: function(formName, options) {
			if(formName === undefined) return false;
			var opts = {
				rules: $.extend({
					username: {
						required: true,
						minlength: 2
					},
					password: {
						required: true,
						minlength: 6
					},
					confirm_password: {
						required: true,
						minlength: 6,
						equalTo: '#password'
					},
					email: {
						required: true,
						email: true
					},
					date: {
						date: true
					}
				}, options ? (options.rules || {}) : {}),
				messages: $.extend({
					username: {
						required: '请输入用户名',
						minlength: '用户名至少有两个字母组成'
					},
					password: {
						required: '请输入密码',
						minlength: '密码长度不能小于6位'
					},
					confirm_password: {
						required: '请再一次输入密码',
						minlength: '密码长度不能小于6位',
						equalTo: '两次密码输入不一致'
					},
					email: '请输入正确的邮箱',
					date: '请选择有效的日期'
				}, options ? (options.messages || {}) : {}),
				errorClass: 'error',
				errorElement: 'span',
				submitHandler: options ? options.submitHandler : null
			};

			formName.validate(opts);
		}
	}

	return {
		validate: _plugins.validate
	}

})(jQuery)

export{
	lf
};