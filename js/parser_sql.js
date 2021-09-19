import {titleCase} from "./util.js"

var typeMaps = {
    "int":     "int32",
    "bigint":  "int64",
    "float":   "float64",
    "double":  "float64",
    "decimal": "float64",
    "varchar": "string",
    "char":    "string",
    "text":    "string",

}

function parserCreateSql(sql) {
    sql = sql.trim()
    var sqlLines = sql.split("\n")
    if (sqlLines.length <= 0) {
        throw("Sql is empty")
    }
    var obj = {
        "fields": [],
    }

    var tableName = sqlLines[0].match(/^.*\`([a-zA-Z0-9_]+)\`.*$/)
    if (tableName == null) {
        return null
    }
    obj["tableName"] = tableName[1]
    for (var i=1;i<sqlLines.length;i++) {
        var line = sqlLines[i].trim().replace(/,$/, '').toLowerCase()
        //if (line.length == 0 || line[0] == ")" || indexOf(line, ["unique", "key", "index", "primary"]) == 0) {
            //break
        //}
        var fields = line.replace(/\s+/, " ").split(" ")
        if (fields.length < 2) {
            return null
        }
        var fieldType = fields[1].replace(/\(.*\)/, "")
        if (typeMaps[fieldType] == undefined) {
            continue
        }
        obj["fields"].push({
            "type": fieldType,
            "fieldName": fields[0].replace(/`/g, ""),
            "attrs": fields.slice(2),
        })
    }

    return obj
}

function parserSql2Struct(sql) {
    var sqlObj = parserCreateSql(sql)
    if (sqlObj == null) {
        return ""
    }
    var tableName = sqlObj["tableName"]
    var fieldStrs = []
    for (var i = 0;i < sqlObj["fields"].length; i++) {
        var tags = []
        const field = sqlObj["fields"][i]
        var structMemberName = field["fieldName"]
        if (structMemberName == "id") {
            structMemberName = "ID"
        } else {
            structMemberName = titleCase(structMemberName)
        }
        var fieldType = typeMaps[field["type"]]
        if (field["attrs"].includes("unsigned")) {
            fieldType = "u" + fieldType
        }
        tags.push("gorm:\"column:" + field["fieldName"] + "\"")
        tags.push("json:\"" + field["fieldName"] + "\"")
        fieldStrs.push("\t" + structMemberName + " " + fieldType + " `" + tags.join(" ") + "`")
    }
    return "var (\n\ttableName = \"" + tableName + "\"\n)\n\n" +
    "type " + titleCase(tableName) + " struct {\n" +
        fieldStrs.join("\n") + "\n}" + "\n\n" +
    "func (" + tableName[0].toLowerCase() + " *" + titleCase(sqlObj["tableName"]) + ") TableName() string {\n" +
        "\t return tableName\n}"

}

export {parserSql2Struct}
