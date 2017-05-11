/**
 * Created by lily on 2016/12/2.
 */

/**
 * 表格全选操作
 * input-noremember 是未选中
 */
$(function () {

    //全选
    $('body').on('click', 'span.js-selectAll', function () {
        var $this = $(this);
        var $abox = $this.find('#selectAll');
        var $atable = $this.parents('#table');
        var $achecked = $atable.find('input'); //所有复选框
        if($abox.parent('span').hasClass('input-noremember')){
            $atable.find('span').removeClass('input-noremember');
        }else{
            $atable.find('span').addClass('input-noremember');
        }

		$("[name=items]:checkbox").each(function(){ //遍历每一个复选框
		//$(this).attr("checked",!$(this).attr("checked")); //jQuery方法取复选框的反向值
		this.checked=!this.checked; //js方法
		});

		var str="你选中的是：\r\n";
		$("[name=items]:checkbox:checked").each(function(){
			str+=$(this).val()+"\r\n";
		});
		// alert(str);
    });

    // 单选
    $('body').on('click', 'table tr td span.js-select', function () {
        if($(this).has('input:checkbox')){
            var $this = $(this);
            if($this.hasClass('input-noremember')){
                $this.removeClass('input-noremember');
                $this.children('input').attr('checked',true);
                var str="你选中的是：\r\n";
				$("[name=items]:checkbox:checked").each(function(){
					str+=$(this).val()+"\r\n";
				});
				alert(str);
            }else{
                $this.addClass('input-noremember');
            }
        }
    });

});

