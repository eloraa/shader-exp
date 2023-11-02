// Credits - Three.js (https://github.com/mrdoob/three.js)
function La(a) {
    this.manager = void 0 !== a ? a : Aa
  }
  
  let Sa = {}
  
  function we(a, b, c) {
          var d = this,
              e = !1,
              f = 0,
              g = 0,
              h = void 0;
          this.onStart = void 0;
          this.onLoad = a;
          this.onProgress = b;
          this.onError = c;
          this.itemStart = function (a) {
              g++;
              if (!1 === e && void 0 !== d.onStart) d.onStart(a, f, g);
              
              e = !0
          };
          this.itemEnd = function (a) {
              f++;
              if (void 0 !== d.onProgress) d.onProgress(a, f, g);
              if (f === g && (e = !1, void 0 !== d.onLoad)) d.onLoad()
          };
          this.itemError = function (a) {
              if (void 0 !== d.onError) d.onError(a)
          };
          this.resolveURL = function (a) {
              return h ? h(a) : a
          };
          this.setURLModifier = function (a) {
              h = a;
              return this
          }
      }
  
  var Sb = {
    enabled: !1,
    files: {},
    add: function (a, b) {
        !1 !== this.enabled && (this.files[a] = b)
    },
    get: function (a) {
        if (!1 !== this.enabled) return this.files[a]
    },
    remove: function (a) {
        delete this.files[a]
    },
    clear: function () {
        this.files = {}
    }
  },
  Aa = new we
  Object.assign(La.prototype, {
    load: function (a, b, c, d) {
        void 0 === a && (a = "");
        void 0 !== this.path && (a = this.path + a);
        a = this.manager.resolveURL(a);
        var e = this,
            f = Sb.get(a);
        if (void 0 !== f) return e.manager.itemStart(a), setTimeout(function () {
                b && b(f);
                e.manager.itemEnd(a)
            },
            0), f;
        if (void 0 !== Sa[a]) Sa[a].push({
            onLoad: b,
            onProgress: c,
            onError: d
        });
        else {
            var g = a.match(/^data:(.*?)(;base64)?,(.*)$/);
            if (g) {
                c = g[1];
                var h = !!g[2];
                g = g[3];
                g = decodeURIComponent(g);
                h && (g = atob(g));
                try {
                    var k = (this.responseType || "").toLowerCase();
                    switch (k) {
                        case "arraybuffer":
                        case "blob":
                            var m = new Uint8Array(g.length);
                            for (h = 0; h < g.length; h++) m[h] = g.charCodeAt(h);
                            var l = "blob" === k ? new Blob([m.buffer], {
                                type: c
                            }) : m.buffer;
                            break;
                        case "document":
                            l = (new DOMParser).parseFromString(g, c);
                            break;
                        case "json":
                            l = JSON.parse(g);
                            break;
                        default:
                            l = g
                    }
                    setTimeout(function () {
                        b && b(l);
                        e.manager.itemEnd(a)
                    }, 0)
                } catch (u) {
                    setTimeout(function () {
                        d && d(u);
                        e.manager.itemError(a);
                        e.manager.itemEnd(a)
                    }, 0)
                }
            } else {
                Sa[a] = [];
                Sa[a].push({
                    onLoad: b,
                    onProgress: c,
                    onError: d
                });
                var n = new XMLHttpRequest;
                n.open("GET", a, !0);
                n.addEventListener("load", function (b) {
                    var c = this.response;
                    Sb.add(a, c);
                    var d = Sa[a];
                    delete Sa[a];
                    if (200 === this.status || 0 === this.status) {
                        0 === this.status && console.warn("THREE.FileLoader: HTTP Status 0 received.");
                        for (var f = 0, g = d.length; f < g; f++) {
                            var h =
                                d[f];
                            if (h.onLoad) h.onLoad(c)
                        }
                    } else {
                        f = 0;
                        for (g = d.length; f < g; f++)
                            if (h = d[f], h.onError) h.onError(b);
                        e.manager.itemError(a)
                    }
                    e.manager.itemEnd(a)
                }, !1);
                n.addEventListener("progress", function (b) {
                    for (var c = Sa[a], d = 0, e = c.length; d < e; d++) {
                        var f = c[d];
                        if (f.onProgress) f.onProgress(b)
                    }
                }, !1);
                n.addEventListener("error", function (b) {
                    var c = Sa[a];
                    delete Sa[a];
                    for (var d = 0, f = c.length; d < f; d++) {
                        var g = c[d];
                        if (g.onError) g.onError(b)
                    }
                    e.manager.itemError(a);
                    e.manager.itemEnd(a)
                }, !1);
                n.addEventListener("abort", function (b) {
                    var c =
                        Sa[a];
                    delete Sa[a];
                    for (var d = 0, f = c.length; d < f; d++) {
                        var g = c[d];
                        if (g.onError) g.onError(b)
                    }
                    e.manager.itemError(a);
                    e.manager.itemEnd(a)
                }, !1);
                void 0 !== this.responseType && (n.responseType = this.responseType);
                void 0 !== this.withCredentials && (n.withCredentials = this.withCredentials);
                n.overrideMimeType && n.overrideMimeType(void 0 !== this.mimeType ? this.mimeType : "text/plain");
                for (h in this.requestHeader) n.setRequestHeader(h, this.requestHeader[h]);
                n.send(null)
            }
            e.manager.itemStart(a);
            return n
        }
    },
    setPath: function (a) {
        this.path =
            a;
        return this
    },
    setResponseType: function (a) {
        this.responseType = a;
        return this
    },
    setWithCredentials: function (a) {
        this.withCredentials = a;
        return this
    },
    setMimeType: function (a) {
        this.mimeType = a;
        return this
    },
    setRequestHeader: function (a) {
        this.requestHeader = a;
        return this
    }
  });
  
  export default { manager: we, loader: La }
