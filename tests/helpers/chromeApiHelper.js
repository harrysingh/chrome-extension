chrome = {
  extension: {
    getBackgroundPage: function() {

    }
  },

  browserAction: {
    onClicked: {
      addListener: function(listener) {}
    }
  },

  /**
   * Mock Implementation of Chrome Storage API
   * @Reference https://developer.chrome.com/extensions/storage
   */
  storage: {
    onChanged: {
      _listeners: [],

      addListener: function(listener) {
        this._listeners.push(listener);
      }
    },

    sync: {
      _records: {},

      get: function(key, callback) {
        var result;

        if (!key) {
         result = this._records;
        } else {
          result = this._records[key];
        }

        typeof callback === 'function' && callback.call(null, result);
      },

      set: function(object, callback) {
        this._records = extend(this._records, object);

        typeof callback === 'function' && callback.call(null, object);
      },

      remove: function(record, callback) {
        var attrName;

        for (attrName in record) {
          delete this._records[attrName];
        }

        typeof callback === 'function' && callback.call(null);
      },

      clear: function() {
        this._records = {};
      }
    }
  },

  webRequest: {
    onBeforeRequest: {
      addListener: function() {}
    },
    onBeforeSendHeaders: {
      addListener: function() {}
    },
    onHeadersReceived: {
      addListener: function() {}
    }
  }
};