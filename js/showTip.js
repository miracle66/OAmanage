/*
by lily
*/

﻿//tip是提示信息，type:'success'是成功信息，'danger'是失败信息,'info'是普通信息
function ShowTip(tip, type) {
    var $tip = $('#tip');
    if ($tip.length == 0) {
        $tip = $('<div id="tip" style="font-weight:bold;position:fixed;top:0;width:100%;z-index:9999;text-align:center;padding:10px 0;border-radius:0;"></div>');
        $('body').append($tip);
    }
    $tip.stop(true).attr('class', 'alert alert-' + type).text(tip).fadeIn(500).delay(2000).fadeOut(500);
}

//显示消息
function ShowMsg(msg) {
    ShowTip(msg, 'info');
}

//成功
function ShowSuccess(msg) {
    ShowTip(msg, 'success');
}

//失败
function ShowFailure(msg) {
    ShowTip(msg, 'danger');
}

//警告
function ShowWarn(msg, $focus, clear) {
    ShowTip(msg, 'warning');
    if ($focus) $focus.focus();
    if (clear) $focus.val('');
    return false;
}
