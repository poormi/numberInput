/**
 * Created by daijing on 14-9-24.
 */
(function($) {
    $.fn.numberInput = function() {
    // Your plugin logic. 
    var $input = $(this),
    _template="<div class=\"ni-wrap\"> <span class=\"ni-num-ctrl s fl\">-</span><input type=\"text\" style=\"IME-MODE: disabled;\" class=\"ni-input-num fl\" ondragenter=\"return false\" oncontextmenu=\"return false;\" min=\"0\" value=\"0\" /><span class=\"ni-num-ctrl fl p\">+</span></div>",
    
    init = function () {
        $("body").append(_template);
        $input.hide();
        $self = $(".ni-wrap"), control = new _control();
        control.$number = $self.find("input"),
        control.$plus= $self.find(".ni-num-ctrl.p"),
        control.$minus= $self.find(".ni-num-ctrl.s");

        // Bind events.
        control.$plus.bind("click",function () {
            control.plus.call(control);
        });
        control.$minus.bind("click",function () {
            control.minus.call(control);
        });
        control.$number.bind("keydown",function () {
            control.limited.call(control);
        }).bind("change",control.change);
        return control;                 
    }    
    //数量控件
    _control = function(){
        this.$number= $("body").find("input.ni-input-num"),
        this.$plus= $("body").find(".ni-num-ctrl.p"),
        this.$minus= $("body").find(".ni-num-ctrl.s")
    }
    _control.prototype = {
        nan : function(num) {
            if(isNaN(num)){
               return 0;
            }else{
                return num;
            }
         },
        change : function () {
            this.value = this.value.replace(/\D/g,'');
        },
        limited : function () {
            key = event.keyCode || event.which;
            if ( !this.isNumber(key) ) {
                event.cancelBubble= true,
                event.returnValue = false;
                return false;
            }                
        },
        // 仅能输入数字
        isNumber : function(keyCode) {
            // 数字
            if (keyCode >= 48 && keyCode <= 57 ) return true
            // 小数字键盘
            if (keyCode >= 96 && keyCode <= 105) return true
            // Backspace键
            if (keyCode == 8) return true
            return false
        },
        plus : function(){
            var num = 0;
            try{
                num = parseInt(this.$number.val());
            }catch(e){
                num = 0;
            }
            num = this.nan(num);
             this.$number.val(num+1);
        },
        minus : function(){
            var num = 0;
            try{
                num = parseInt(this.$number.val());
            }catch(e){
                num = 0;
            }
            num = this.nan(num);
            num = num<1?0:num-1
            this.$number.val(num);
        },
        compute : function(that,num){
        }
    }
    return init();
}
})(jQuery);