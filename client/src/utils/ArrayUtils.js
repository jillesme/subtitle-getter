import sortBy from 'sort-by';

module.exports = {
  sortObject: function (obj, key) {
      let result = {};
      Object.keys(obj).forEach(key => {
        result[key] = obj[key].sort(sortBy('matchRate'));
      });
      return result;
  }
};
