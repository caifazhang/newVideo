import { Toast } from 'vant';
import Vue from 'vue';
Vue.use(Toast);

class ValidForm {
    constructor() {}
    valid(o) {
        // 表单数据,object
        (o);
        ('验证表单了');

        for(let key in o) {
            if(!o[key].reg.test(o[key].value)) {

                (o[key].errorMsg);

                // 提示错误信息
                Toast(o[key].errorMsg);

                // 表单验证不通过
                return false;
            }
        }

        // 表单验证通过
        return true;
    }
}

export const validForm = new ValidForm();
// 有名导出时，引入要加{}
// 若默认default不需要加{}