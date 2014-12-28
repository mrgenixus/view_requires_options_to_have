View.requires(options).to_have
=============================

Dependency injection checker designed for an ApplicationView mixin, or Backbone.View monkey-patch.

**Note:** *This is naïve (at best) and is more ruminatory than exemplary*

Examples:
```javascript
  var StrongOptions = require('StringOptions');

  var ApplicationView = Backbone.View.extend({})
  StringOptions.mix_into(ApplicationViews);

  return ApplicationView;
```

```javascript
  var MyView = ApplicationView.extend({
    initialize: function(options) {
      this.requires(options).to_have('app', 'router', 'collection').merge_onto(this);
    }
  })
    
  var MyOtherView = ApplicationView.extend({
    initialize: function(options) {
      _.extend(this, this.requires(options).to_have('app').as_values({key: 'key2'}));
    }
  });
  
  var MyOtherOtherView = ApplicationView.extend({
    initialize: function(options) {
      _.extend(this, this.requires(options).to_have('app', 'router', 'collection').values);
    }
  });
  
  var MyOtherOtherOtherView = ApplicationView.extend({
    initialize: function(options) {
      this.requires(options).to_have('app', 'router', 'collection')
        .and.permits().it.to_have('purple', 'pink')
        .and.merge_onto(this);
  });
```

```javascript
  var MyView = ApplicationView.extend({
    required_options: ['app', 'router', 'collection'],
    
    initialize: function(options) {
      this.requires(options).to_have.keys(this.required_options).and.merge_onto(this);
    }
  });
```
