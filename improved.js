Array.prototype.compare = function(arr) {
  if (this.length != arr.length) {
    return false;
  }
  var success = true, l = this.length, i = 0;
  for(i; i<l; i++) {
    if(arr.indexOf(this[i]) == -1) {
      success = false;
      break;
    }
  }
  return success;
};
Array.prototype.keyify = function(converted) {
  converted = typeof converted == 'boolean' ? converted : false;
  var r = [], i = 0, l = this.length;
  for(i; i<l; i++) {
    if (converted) {
      r.push(this[i].toString());
    } else {
      r.push($.keys.reverse(this[i]).toString());
    }
  }
  return r.sort().join('_');
};
a.keyify(true);
c.keyify(false);
a.compare(b);