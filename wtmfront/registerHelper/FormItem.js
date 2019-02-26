/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-11 04:42:21
 * @modify date 2018-09-11 04:42:21
 * @desc [description]
*/
// const typeAnalysis = require("./analysisHelper/typeAnalysis")
// const lodash = require("lodash");
module.exports = (Handlebars) => {
    // FormItem
    Handlebars.registerHelper('FormItem', function (person) {
        return person.filter(x => x.attribute.available).map(x => {
            return `
                <FormItem {...props} fieId="${x.key}" />`
        }).join('');
    });
    Handlebars.registerHelper('Models', function (person) {
        return person.filter(x => x.attribute.available).map(x => {
            return `
                ${x.key}: {
                    label: "${x.description}",
                    rules: [
                        ${x.rules.join(",")}
                    ],
                    formItem: <Input placeholder="请输入 ${x.description}" />
                }
                `
        }).join(',');
    });
}

