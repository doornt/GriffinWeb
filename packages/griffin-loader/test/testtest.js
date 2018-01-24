let styleJson =
    [
        {
            "selector": ".test",
            "attrs":
                { "background-color": "white" }
        },
        {
            "selector": ".test2",
            "attrs": { "color": "\"#ffffff\"" }
        }
    ];
let AstFuncStr = function template({ attrs, test }) {
    var n = "", attrs = [], idMap = {};
    n = { "name": "div", "id": "d4fe0f05-4bc5-4c3f-bca4-51cffbae1247", "attributes": [] };
    attrs = [];
    attrs.push({ name: "class", val: 'test' });
    attrs.push({ name: "@click", val: "clcik" });
    n.attributes = attrs;
    idMap["d4fe0f05-4bc5-4c3f-bca4-51cffbae1247"] = n;
    if (false && idMap["null"]) {
        ;
        idMap["null"].children = idMap["null"].children || [];
        idMap["null"].children.push(n);
        n.parentId = "null";
    };
    n = { "name": "ul", "id": "29a916f4-0bf6-4ff2-955c-966281a3f269", "attributes": [] };
    attrs = [];
    attrs.push({ name: "id", val: 1 + test });
    n.attributes = attrs;
    idMap["29a916f4-0bf6-4ff2-955c-966281a3f269"] = n;
    if (true && idMap["d4fe0f05-4bc5-4c3f-bca4-51cffbae1247"]) {
        ;
        idMap["d4fe0f05-4bc5-4c3f-bca4-51cffbae1247"].children = idMap["d4fe0f05-4bc5-4c3f-bca4-51cffbae1247"].children || [];
        idMap["d4fe0f05-4bc5-4c3f-bca4-51cffbae1247"].children.push(n);
        n.parentId = "d4fe0f05-4bc5-4c3f-bca4-51cffbae1247";
    };
    let res = Object.keys(idMap).map(key => idMap[key]).filter(obj => !obj.parentId);
    return res;
    ;
};
let res = { style: styleJson, AstFunc: AstFuncStr };
module.exports = res;