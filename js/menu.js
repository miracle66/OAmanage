/**
 * Created by lily on 2016/12/2.
 */


// 后台管理所有页面基本操作 start

// 树形列表动态图标切换 收缩js
$(function () {
  $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
  $('.tree li.parent_li > span.js-fcolor > i,.tree li.parent_li > span.js-index > i').on('click', function (e) {
    var children = $(this).parents('span').parent('li.parent_li').find(' > ul > li');
    var iconName = $(this).attr('class');
    if (children.is(":visible")) {
      children.hide('fast');
      if(iconName == 'icon-folder-open'){
        $(this).parents('span').attr('title', 'Expand this branch').find(' > i').addClass('icon-folder-close').removeClass('icon-folder-open')
      }
      if(iconName == 'icon-minus-sign'){
        $(this).parents('span').attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
      }
    } else {
      children.show('fast');
      if(iconName == 'icon-folder-close'){
        $(this).parents('span').attr('title', 'Expand this branch').find(' > i').addClass('icon-folder-open').removeClass('icon-folder-close')
      }
      if(iconName == 'icon-plus-sign'){
        $(this).parents('span').attr('title', 'Expand this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
      }
    }
    e.stopPropagation();
  });

  var $fontColor =  $('.tree-list ul li').find('span.js-fcolor');
  $fontColor.on('click',function (e) {
    if($('.tree-list ul li').find('span.js-fcolor').hasClass('active')){
      $('.tree-list ul li').find('span.js-fcolor').removeClass('active');
    }
    $(this).addClass('active');
  })

});
// 树形列表动态图标切换 收缩js




 //下拉列表选择js
 $('.js-btn-select').on('click',function(){
  $(this).siblings('.list-select').toggleClass('list-block');
})
// 下拉列表选择后收缩

$('.list-select ul li span').on('click',function(){
  var $spanTxt = $(this).text();
  $(this).parents('.list-select').siblings('button').find('span').text($spanTxt);
  $('.list-select').removeClass('list-block');
})



// 树形菜单操作 2016.12.05
// 删除菜单操作
function deleteMenu() {
  var $liCount  = $('.tree-list ul li').find('ul');
  for (i = 0; i < $liCount.length; i++) {
    console.log($($liCount[i]).find('li').length);
    if($($liCount[i]).find('li').length == 1){
      console.log('子菜单只有一个');
      ShowFailure('该菜单下包含子菜单，不可删除');
    }
  }
}


//  角色管理页 数据权限 显示特定部门
$('.state-radio .radio').on('click',function () {
  $('.js-departTree').hide();
})
$('.js-depart').on('click',function () {
  $('.js-departTree').show();
})


//  选择人员 操作 可以共用
$('.modal-body .tree-list ul li span.js-fcolor').on('click',function () {
  var leftTxt = $(this).text();
  var rightPane = $('.right-selected .selected-bg');
  var rightTxt = $('.right-selected .selected-bg p').text();
  if($(this).find('.radio i').hasClass('icon-ok-sign')){
    $(this).find('.radio i').removeClass('icon-ok-sign').addClass('icon-circle-blank');
    console.log(leftTxt);
    console.log(rightTxt);
  }else{
    $(this).find('.radio i').removeClass('icon-circle-blank').addClass('icon-ok-sign');
    rightPane.append('<p>'+ leftTxt +' <i class="icon-remove-sign js-remove fr"></i></p>');

    // 点击移除右边项
    $('.right-selected .selected-bg p .js-remove').on('click',function () {
      $(this).parents('p').remove();
    })

  }
})

// 员工管理 添加角色  多级模态框层弹出  员工管理和职位管理 添加角色和添加指标处使用
$('.js-addRole').on('click',function () {
  $('#setRole').modal('hide');
  $('#addPositionRespons').modal('hide');
  $('#addRole').modal('show');
})

$('.js-close').on('click',function () {
  $('#addRole').modal('hide');
  $('#setRole').modal('show');
  $('#addPositionRespons').modal('show');
})



//KPI 指标管理 指标详情弹框中对四种计分方法 操作
$('.scale').show(); //初始化显示  根据数据绑定
$(".js-score select").change(function(event) {
  var obj = $(this).find("option:selected").val();
  console.log(obj)
  if(obj == '比例法'){
    $('.scale').show();
    $('.scale').siblings('.score').hide();
  }
  if(obj == '区间法'){
    $('.interval').show();
    $('.interval').siblings('.score').hide();
  }
  if(obj == '定性法'){
    $('.quality').show();
    $('.quality').siblings('.score').hide();
  }
  if(obj == '加减分法'){
    $('.addsubtr').show();
    $('.addsubtr').siblings('.score').hide();
  }
});

// 区间法 添加和移除操作
$('.interval .js-change .js-append').on('click',function () {
  $('.js-interval').append('<p>若实际值 <select> <option> >= </option> <option> > </option> <option> = </option> <option> <= </option> <option> < </option> </select> <input type="number"> *目标值，指标得分=<input type="number">*权重 </p>');
})
$('.js-change .js-remove').on('click',function () {
  $(this).parents('.js-change').siblings('.js-interval').find('p').last().remove();
})

// 定性法 添加和移除操作
$('.quality .js-change .js-append').on('click',function () {
  $('.js-quality').append('<p>若实际值为<input class="ipt-txt" type="text">，指标得分=<input class="ipt-number" type="number">*权重 </p>');
})
$('.js-change .js-remove').on('click',function () {
  $(this).parents('.js-change').siblings('.js-quality').find('p').last().remove();
})

//KPI 指标管理 指标详情弹框中对四种计分方法 操作



//新增菜单 保存
function save_menu(){
  var $ul = $('.tree-list').find('ul.all-list');
  // var $parent_menus = $ul.find('span.jsparent').text();

  var $parent_menu = $("#parent_menu").val();
  console.log($parent_menu)

  var $op = $("select[name='mparent_menu'] option:selected").text();

  var $menu_name = $("input[name='menu_name']").val();
  console.log($menu_name)
  // alert($op);
  if($op == 'OA'){
    console.log('这里添加一级菜单');
    if($menu_name == '' || $menu_name == null || $menu_name == undefined){
      ShowFailure('菜单名称不能为空');
    }else{
     $('.all-list').append('<li><span class="jsparent permanage"><i class="icon-folder-close"></i>'+ $menu_name +'</span></li>');
     $('#myModal').modal('hide'); //模态框关闭
   }

 }
 if($op == '系统管理'){
  if($menu_name == '' || $menu_name == null){
    ShowFailure('菜单名称不能为空');
  }else{
    localStorage.a = '<li><span><i class="icon-file"></i>'+ $menu_name +'<span class="menu-icon"><i class="icon-arrow-up"></i><i class="icon-arrow-down"></i><i class="icon-close">×</i></span></span></li>';
    // localStorage.setItem('a',JSON.stringify(htmlString));
    $('.sysmanage').siblings('ul').append(localStorage.a); //新增系统管理二级菜单
    localStorage.a = $('.sysmanage').siblings('ul').html();
    $('#myModal').modal('hide'); //模态框关闭
  }
}
if($op == '人事管理'){
  if($menu_name == '' || $menu_name == null){
    ShowFailure('菜单名称不能为空');
  }else{
     $('.permanage').siblings('ul').append('<li><span><i class="icon-file"></i>'+ $menu_name +'<span class="menu-icon"><i class="icon-arrow-up"></i><i class="icon-arrow-down"></i><i class="icon-close">×</i></span></span></li>'); //新增系统管理二级菜单
    $('#myModal').modal('hide'); //模态框关闭
  }
}
if($op == '个人管理'){
  if($menu_name == '' || $menu_name == null){
    ShowFailure('菜单名称不能为空');
  }else{
     $('.usermanage').siblings('ul').append('<li><span><i class="icon-file"></i>'+ $menu_name +'<span class="menu-icon"><i class="icon-arrow-up"></i><i class="icon-arrow-down"></i><i class="icon-close">×</i></span></span></li>'); //新增系统管理二级菜单
    $('#myModal').modal('hide'); //模态框关闭
  }
}
  // console.log($ul)
}


// 用户管理  修改密码  设置密码可见
$('.js-checkbox input[type="checkbox"]').change(function () {
  console.log($(this).siblings('input').prop('type'));
  if($(this).siblings('input').attr('type') == 'password'){
    $(this).siblings('input').attr('type','text');
      //  return;
    }else{
      $(this).siblings('input').attr('type','password');
    }
  })





/*// ----------------------------------2016.12.22 Add-----------------------------*/

//绩效考核 start

/*// 等级设置-新增等级-类型切换*/
$('.js-grade').on('change',function () {
  var selTxt  = $(this).find('option:selected').text();
  console.log(selTxt)
  if(selTxt == 'KPI'){
    $('.js-perfor-kpi').show();
  }
  if(selTxt == '价值观'){
    $('.js-perfor-kpi').hide();
  }

})

/*//新增绩效等级 评定规则页面操作 - 添加评定规则*/
$('.rule-container .js-change  .js-append').on('click',function () {
  $(this).parents('.js-change').siblings('.js-rule').append('<div class="perfor-rule"> <select class="form-control sel-value"> <option value="0">KPI总得分</option> <option value="1">价值观总得分</option> <option value="2">尊重得分</option> <option value="3">责任得分</option> <option value="4">品质得分</option> <option value="5">创新得分</option> </select> <select class="form-control input-sm"> <option value=">="> >= </option> <option value=">"> > </option> <option value="=">=</option> <option value="<"> < </option> <option value="<="> <= </option> </select> <input type="number" class="form-control"> <select class="form-control sel-add"> <option value="且"> 且 </option> <option value="或"> 或 </option> </select></div>');
  var addNum = $(this).parents('.js-change').siblings('.js-rule').find('.perfor-rule').size();
  var $rule = $(this).parents('.js-change').siblings('.js-rule').find('.perfor-rule');
  if(addNum >= 2){
    $rule.find('.sel-add').show();
    $rule.last().find('.sel-add').hide();
  }
})

//绩效考核 - 考核名单 - 管理名单分组
var trLength = $('.js-manageList table tbody').find('tr').size();
if(trLength == 1){

  $('.js-iconDelete').hide();
  $('.js-iconTop').hide();
}
// 添加名单分组行
$('.js-manageList').on('click','.js-iconAdd',function () {
  $(this).parents('tbody').append('<tr> <td>1</td> <td><input type="text"></td> <td> <select> <option>是</option> <option>否</option> </select> </td> <td><textarea cols="30" rows="3" onclick="openModal();"></textarea></td> <td><textarea cols="30" rows="3" onclick="openModal();"></textarea></td> <td><i class="icon-arrow-up js-iconTop"></i>&nbsp;&nbsp;<i class="icon-trash js-iconDelete"></i>&nbsp;&nbsp;<i class="icon-plus js-iconAdd"></i></td> </tr>');
  $('.js-iconDelete').show();
  $(this).hide();
})
// 移除名单分组行
$('.js-manageList').on('click','.js-iconDelete',function () {
  $(this).parents('tr').remove();
  $('.js-manageList table tbody').find('tr').last().find('.js-iconAdd').show();
  $(this).parents('tr').siblings('tr').find('.js-iconAdd').show();
  var trLength = $('.js-manageList table tbody').find('tr').size();
  if(trLength == 1){
    $('.js-iconDelete').hide();
    $('.js-iconTop').hide();
  }
})
//点击相关部门 相关职位 弹出选择部门组件
function openModal() {
  $('#listDepart').modal('show');
  $('#manageMemberList').modal('hide');
}
//关闭弹框组件 modal
$('.js-close').on('click',function () {
  // 绩效考核 考核名单 管理名单分组弹窗
  $('#listDepart').modal('hide');
  $('#manageMemberList').modal('show');
})

//  点击单条考核名单发布 弹出单条发布考核名单窗口
$('table').on('click','.js-publish',function(){
  $('#putMemberList').modal('show');
  $('.js-count-sum').hide();
})
//待优化 --
$('.js-closeList').on('click',function () {
  $('#putMemberList').modal('hide');
  $('.js-count-sum').show();
})



// 绩效考核 - 我的绩效 - 查看公司绩效和查看我的绩效切换
$('.js-view').on('click',function () {
  var $btnTxt = $('.js-view').text();
  console.log($btnTxt);
  if($btnTxt == '查看公司绩效'){
    $('.companyPerformance').show();
    $('.myPerformance').hide();
    $('.js-view').text('查看我的绩效');
  }
  if($btnTxt == '查看我的绩效'){
    $('.myPerformance').show();
    $('.companyPerformance').hide();
    $('.js-view').text('查看公司绩效');
  }
})

//新增绩效等级 评定规则页面操作 - 移除评定规则
$('.rule-container .js-change  .js-remove').on('click',function () {
  $(this).parents('.js-change').siblings('.js-rule').find('.perfor-rule').last().remove();
  var addNum = $(this).parents('.js-change').siblings('.js-rule').find('.perfor-rule').size();
  var $rule = $(this).parents('.js-change').siblings('.js-rule').find('.perfor-rule');
  if(addNum == 1){
    $rule.find('.sel-add').hide();
  }
  if(addNum >= 2){
    $rule.find('.sel-add').show();
    $rule.last().find('.sel-add').hide();
  }
})


/*绩效考核 - 我的绩效 - 新增绩效合约页面 - 新增/编辑任务 添加参与人*/
$('.js-addRole').on('click',function () {
  $('#addRole').modal('show');
  $('#taskUpdate').modal('hide');

  // 流程设置弹框
  $('#processAdd').modal('hide');
})
$('.js-close').on('click',function () {
  $('#addRole').modal('hide');
  $('#taskUpdate').modal('show');

  // 流程设置弹框
  $('#processAdd').modal('show');
})

//绩效考核 end

//考核名单 start

// 考核名单页 版块收缩
$('.list-container').on('click','header',function () {
  var flag = $(this).siblings('.accordion-body').hasClass('fadeIn animated infinite');
  if (flag) {
    $(this).siblings('.accordion-body').slideUp("fast");
    $(this).siblings('.accordion-body').removeClass('fadeIn animated infinite');

  } else {
    $(this).siblings('.accordion-body').slideDown("fast");
    $(this).siblings('.accordion-body').addClass('fadeIn animated infinite');

    console.log($(this).parents('.list-container').siblings('.list-container').find('.accordion-body'));
    $(this).parents('.list-container').siblings('.list-container').find('.accordion-body').slideUp("fast");
    $(this).parents('.list-container').siblings('.list-container').find('.accordion-body').removeClass('fadeIn animated infinite');
  }
})


$('.list-container').on('click','.js-toggle',function () {
  var flag = $(this).parents('.accordion-toggle').siblings('.accordion-body').hasClass('fadeIn animated infinite');
  if (flag) {
    $(this).parents('.accordion-toggle').siblings('.accordion-body').slideUp("fast");
    $(this).parents('.accordion-toggle').siblings('.accordion-body').removeClass('fadeIn animated infinite');

  } else {
    $(this).parents('.accordion-toggle').siblings('.accordion-body').slideDown("fast");
    $(this).parents('.accordion-toggle').siblings('.accordion-body').addClass('fadeIn animated infinite');

    console.log($(this).parents('.accordion-toggle').parents('.list-container').siblings('.list-container').find('.accordion-body'));
    $(this).parents('.accordion-toggle').parents('.list-container').siblings('.list-container').find('.accordion-body').slideUp("fast");
    $(this).parents('.accordion-toggle').parents('.list-container').siblings('.list-container').find('.accordion-body').removeClass('fadeIn animated infinite');
  }
})
//考核名单 end


// 日期控件
$(".date").datetimepicker({
  minView: "month", //选择日期后，不会再跳转去选择时分秒
  language:  'zh-CN',
  format: 'yyyy-mm-dd',
  todayBtn:  1,
  autoclose: 1
});

// 后台管理所有页面基本操作 end
