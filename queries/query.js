
function select(tableName, columnArray)
{
    var queryString = 'SELECT ';

    if (columnArray == null || columnArray.length == 0)
        queryString += " * ";
    else
    {
        for (var i = 0; i < columnArray.length; i++)
            queryString += columnArray[i] + ", ";

        queryString = queryString.substring(0, queryString.length - 2);
    }

    queryString += " FROM " + tableName;

    return queryString;
}

function update(tableName, columnArray)
{
    var queryString = 'UPDATE ' + tableName + " SET ";

    for (var i = 0; i < columnArray.length; i++)
        queryString += columnArray[i] + " = ?, ";

    queryString = queryString.substring(0, queryString.length - 2);

    return queryString;
}

function insert(tableName, columnArray)
{
    var queryString = 'INSERT INTO ' + tableName + ' (';

    for (var i = 0; i < columnArray.length; i++)
        queryString += columnArray[i] + ", ";
    
    queryString = queryString.substring(0, queryString.length - 2);
    queryString += ') VALUES (';

    for (var i = 0; i < columnArray.length; i++)
        queryString += "?, ";
    
    queryString = queryString.substring(0, queryString.length - 2);
    queryString += ')';

    return queryString;
}

function _delete(tableName)
{
    return 'DELETE FROM ' + tableName;
}

function whereEqual(columnName)
{
    return ' WHERE ' + columnName + " = ?";
}

module.exports.select = select;
module.exports.update = update;
module.exports.insert = insert;
module.exports.whereEqual = whereEqual;
module.exports.delete = _delete;