function countLength (str) {
	return str.replace(/[^\x00-\xff]/g, 'xx').length; // /[^\x00-\xff]/g 非单字符表单式
}
function re_n (str, m) {
	var tep = 0;
	for (var index = 0; index < str.length; index++) {
		if (str.charAt(index) == m) {
			tep++
		}
	}
	return tep;
}
window.onload = function () {
	var inputs = document.getElementsByTagName('input');
	var msgs = document.getElementsByClassName('msg');
	var aName = inputs[0];
	var name_msg = msgs[0];
	var pwd = inputs[1];
	var pwd_msg = msgs[1];
	var pwd2 = inputs[2];
	var pwd_msg2 = msgs[2];
	var count = document.getElementById('count');
	var pwd_notice = document.getElementById('pwd');
	var pwd2_notice = document.getElementById('pwd2');
	aName.onfocus = function () {
		name_msg.innerHTML = '注意：用户名为6-25个字符的数字、字母、下划线，推荐使用中文';
	}
	aName.onkeyup = function () {
		count.style.visibility = 'visible'
		count.innerHTML = countLength(this.value) + '个字符';
		if (countLength(this.value) == 0) {
			count.style.visibility = 'hidden';
		}
	}
	aName.onblur = function () {
		var name_reg = /[^\w\u4e00-\u9fa5]/g;
		if (name_reg.test(this.value)) {
			name_msg.innerHTML = '错误：用户名格式错误';
		} else if (!this.value.length) {
			name_msg.innerHTML = '错误：用户名不能为空';
		} else if (this.value.length < 6) {
			name_msg.innerHTML = '错误：用户名字符长度少于6位';
		} else if (this.value.length > 25){
			name_msg.innerHTML = '错误：用户名字符长度大于25位';
		} else {
			name_msg.innerHTML = 'OK';
		}
	}

	pwd.onfocus = function () {
		pwd_msg.innerHTML = '6-16个字符请使用字母加数字或符号的密码组合，不能单独使用字母、数字、符号'
	}
	pwd.onkeyup = function () {
		if (this.value.length >= 6 && this.value.length < 10) {
			pwd_notice.innerHTML = '中'
			pwd2.removeAttribute('disabled')
		} else if (this.value.length >= 10){
			pwd_notice.innerHTML = '强'
			pwd2.removeAttribute('disabled')
		} else {
			pwd_notice.innerHTML = '弱'
			pwd2.setAttribute('disabled', true)
		}
	}
	pwd.onblur = function () {
		// 不能为空
		var n = re_n(this.value, this.value[0])
		if (!this.value) {
			pwd_msg.innerHTML = '密码不能为空'
		}
		// 不能相同字符
		else if (n == this.value.length) {
			pwd_msg.innerHTML = '不能相同字符'
		}
		// 不能全为数字
		else if (!/[^\d]/.test(this.value)) {
			pwd_msg.innerHTML = '不能全为数字'
		}
		// 不能全为字母
		else if (!/[^a-zA-z]/.test(this.value)) {
			pwd_msg.innerHTML = '不能全为字母'
		}
		else {
			pwd_msg.innerHTML = 'OK'
		}
	}

	pwd2.onblur = function () {
		if (this.value != pwd.value) {
			pwd_msg2.innerHTML = '两次密码不一致'
		}
	}
}