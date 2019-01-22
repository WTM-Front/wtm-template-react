/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-11 04:42:24
 * @modify date 2018-09-11 04:42:24
 * @desc [description]
*/
module.exports = (Handlebars) => {
    Handlebars.registerHelper('JSONStringify', function (person) {
        return JSON.stringify(person, null, 4)
    });
    Handlebars.registerHelper('JSONUrls', function (person) {
        return Object.keys(person).map(key => {
            const url = person[key];
            return `
        ${key}:{
            src: '${url.src}',
            method: '${url.method}'
        }`
        }).join(",")
    });
    Handlebars.registerHelper('JSONColumns', function (person) {
        return person.filter(x => x.attribute.available).map(x => {
            return `
        {
            title: '${x.description}',
            dataIndex: '${x.key}',
            render: columnsRender,
        }`
        }).join(",")
    });
}

