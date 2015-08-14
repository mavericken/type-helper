/// <reference path="/intellisenseOnly.js" />


var define = define || (function (x) { module.exports = x(require, module.exports, module) || module.exports });
define(function (require, exports, module) {
    var Promise = require('any-promise');
    
    var intellisenseOnly = require("./intellisenseOnly.js")
    
    Promise.prototype.assume = function (assumedResult, assumedError) {
        var obj = this;
        if (intellisenseOnly) obj.res = assumedResult;
        obj.then(function (result) {
            obj.res = result;
        });
        if (intellisenseOnly) obj.err = assumedError;
        obj.error(function (error) {
            obj.err = error;
            
        })
        return obj;
    };
    
    Promise.prototype.assumeType = function (assumedResult, assumedError) {
        var obj = this;
        if (intellisenseOnly) obj.res = new assumedResult();
        obj.then(function (result) {
            obj.res = result;
        });
        if (intellisenseOnly) obj.err = new assumedError();
        obj.error(function (error) {
            obj.err = error;
            
        })
        return obj;
    };
    
    
    {
        var old = Promise.all;
        
        Promise.all = function (allPromises) {
            
            allPromises.forEach(function (item) {
                if (!(item.res || item.err)) {
                    item.assume();
                }
            });
            
            return old.call(this, allPromises);
        };
    }
    
    var typeInfo = {};
    
    typeInfo.requireNew = function (typedObject, moduleName) {
        if (intellisenseOnly) {
            return new (require(moduleName))();
        }
        return typedObject;
    }
    
    typeInfo.new = function (typedObject, type) {
        if (intellisenseOnly) {
            return new type();
        }
        return typedObject;
    }
    
    typeInfo.assume = function (typedObject, type) {
        if (intellisenseOnly) {
            return type;
        }
        return typedObject;
    }
    
    
    return typeInfo;

    
});
