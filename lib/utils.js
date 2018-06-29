const IS = require("is");
let utile = {
    /**
     * 
     * @param {参数} params 
     * @param {校验值} valids 
     * @param {是否全部匹配} check 
     */
    formatData(params, valids, check = true) {
        let res = true;
        if (check) {
            for (let i = 0; i < valids.length; i++) {
                if (!params.hasOwnProperty(valids[i])) {
                    res = false;
                    break;
                }
            }
        }
        else {
            var arrs = Object.keys(params)
            for (let i = 0; i < arrs.length; i++) {
                if (valids.indexOf(arrs[i]) == -1) {
                    res = false;
                    break;
                }
            }
        }
        return res;
    },
    filter(params, filterArr) {
        if (IS.object(params) && IS.array(filterArr)) {
            let data = {};
            filterArr.forEach(e => {
                let val = params[e];
                if (!IS.undefined(val) && !IS.null(val) && !IS.empty(val) || IS.array.empty(val)) {
                    data[e] = val;
                }
            });
            return data;
        } else {
            return params;
        }
    },

}
module.exports = utile