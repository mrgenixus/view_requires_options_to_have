// file:///./string_options.js
(function(require, module, exports) {
  function throw_if_null(value) {
    if (value === null) {
      throw new Error(key + ' must be provided as a member of options');
    }
    return value
  }

  function from(obj) {
    function object_at (key) { return obj[key]; }

    object_at.throw_if_null = function(key) {
      return throw_if_null(object_at(key));
    }

    return object_at.throw_if_null;
  }

  function to_object(callback) {
    return function(memo, value, key) {
      memo[value] = callback(value, key); return memo;
    }
  }

  function pick(object, keys) {
    return_.reduce(keys, to_object(callback), {});
  }

  function _permit(options, keys) {
    return _.reduce(keys, to_object(from(options)), {});
  }

  function _require(options, keys) {
    return _.reduce(keys, to_object(from(options).throw_if_null), {});
  }

  var StrongOptions = function(options) {
    this.options = options || {};

    this.and = this;
    this.it = this;

    this.to_have.keys = function() {
      this.to_have.keys.apply(this, arguments);
    }
  }

  function _to_have(keys) {
    if(this.permitted) {
      this.values = _.extend({}, this.values, _permit(this.options, keys));
    } else {
      this.values = _.extend({}, this.values, _require(this.options, keys));
    }

    return this;
  }

  StrongOptions.prototype.merge_onto = function(obj) {
    if(_.isObject(obj) {
      _.extend(obj, this.values);
    }

    return this.values;
  }

  StrongOptions.prototype.requires = function() {
    this.required = true;
    this.permitted = false;
    return this;
  }

  StrongOptions.prototype.permits = function() {
    this.required = false;
    this.permitted = true;
    return this;
  }

  StrongOptions.prototype.to_have = function() {
    var keys = _.toArray(arguments);
    return _to_have.call(this, keys);
  }

  StrongOptions.to_have = function(instance, keys) {
    return _to_have.call(instance, keys);
  }

  StrongOptions.prototype.to_have_keys = function(keys){
    _to_have.call(this, keys);
  }

  // actually, needing this badly enough to call it is a smell.
  // this kind of mapping should be done by the caller not the callee
  StrongOptions.prototype.as_values = function (mapping) {
    return _.reduce(_.keys(this.values), function(memo, key) {
      if(key in mapping && (mapping[key] !== key) {
        if (mapping[key]) memo[mapping[key]] = memo[key];

        if ( _.includes(mapping, key)) {
          delete memo[key];
        }
      }
      return memo;
    }, this.values);
  }

  StrongOptions.Mixin = {
    requires: function(options) {
      var strongOptions = new StrongOptions(options, this).requires();
      return strongOptions;

    },

    permits: function(options) {
      var strongOptions = new StrongOptions(options).permits();
      return {
        strongOptions: strongOptions,s
        _this: this,
        to_have: this._to_have;
      }
    }
  };

  StrongOptions.mix_into = function(OtherObject) {
    return _.extend(OtherObject.prototype, StrongOptions.Mixin);
  }

  return StrongOptions;

})(require, module, exports)
