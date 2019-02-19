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
    function renderDataEntry(x) {
        let str = "";
        // if (x.format) {
        //     str += ` format="${x.format}" `
        // }
        // if (x.attribute && x.attribute.common) {
        //     str += ` common={${JSON.stringify(x.attribute.common)}} `
        // }
        // if (x.example) {
        //     str += ` example={${JSON.stringify(x.example)}} `
        // }
        if (x.description) {
            str += ` placeholder='${x.description}' `
        }
        return `<Input ${str} />`
    };
    function renderOptions(Attribute, info = false) {
        let initialValue = `initialValue('${Attribute.key}','${Attribute.format || ''}'${info ? ',true' : ''})`;
        return {
            rules: Attribute.rules,
            initialValue: initialValue,
        }
    }
    Handlebars.registerHelper('DataEntry', function (person) {
        const { search, insert, update } = person;
        const items = [];
        search.map(x => {
            items.push(x)
        });
        insert.map(x => {
            if (items.some(y => y.key == x.key)) {
                return;
            }
            items.push(x)
        })
        return items.map(x => {
            return `/** ${x.description} ${x.type} */  \n    ${x.key}:${renderDataEntry(x)}`
        }).join(",\n    ");
    });
     // 编辑
     Handlebars.registerHelper('InsertFormItem', function (person) {
        return person.filter(x => x.attribute.available).map(x => {
            // const dec = typeAnalysis(x);
            const options = renderOptions(x);
            return `
                <Form.Item label="${x.description || 'NULL'}" {...formItemLayout}>
                    {getFieldDecorator('${x.key}', {
                        rules: ${JSON.stringify(options.rules)},
                    })(Models.${x.key})}
                </Form.Item>`
        }).join('');
    });
    // 编辑
    Handlebars.registerHelper('EditFormItem', function (person) {
        return person.filter(x => x.attribute.available).map(x => {
            // const dec = typeAnalysis(x);
            const options = renderOptions(x);
            return `
                <Form.Item label="${x.description || 'NULL'}" {...formItemLayout}>
                    {getFieldDecorator('${x.key}', {
                        rules: ${JSON.stringify(options.rules)},
                        initialValue: details['${x.key}'],
                    })(Models.${x.key})}
                </Form.Item>`
        }).join('');
    });
    // 详情信息
    Handlebars.registerHelper('InfoFormItem', function (person) {
        return person.map(x => {
            // const dec = typeAnalysis(x);
            // delete x.format;
            const options = renderOptions(x, true);
            return `
                <Form.Item label="${x.description || 'NULL'}" {...formItemLayout}>
                    <span>{lodash.get(details,"${x.key}", "")}</span>
                </Form.Item>`
        }).join('');
    });
    Handlebars.registerHelper('HeaderFormItem', function (person) {
        return person.filter(x => x.attribute.available).map(x => {
            // const dec = typeAnalysis(x);
            const options = renderOptions(x);
            return `
                    <Form.Item label="${x.description || 'NULL'}" {...formItemLayout}>
                        {getFieldDecorator('${x.key}', {
                            initialValue:lodash.get(Store.searchParams,"${x.key}"),
                        })(Models.${x.key})}
                    </Form.Item>`
        }).join('');
    });
}

