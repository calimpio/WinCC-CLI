/* Version 1.4.2, copyright (C) 2018, Siemens AG. All Rights Reserved. */
var WebCC = WebCC || function () { var a = "pending", b = -1, c = window.parent, d = null, e = null, f = {}, g = [], h = {}, i = function () { window.clearTimeout(b), window.removeEventListener ? window.removeEventListener("message", d) : window.detachEvent("onmessage", d) }, j = function (a, b, c) { var d = document.createElement("script"); d.setAttribute("type", "text/javascript"), d.setAttribute("src", a), (b || c) && (d.addEventListener ? (b && d.addEventListener("load", b), c && d.addEventListener("error", function () { c("Failed to load " + a + " library") })) : b && (d.onreadystatechange = function () { "loaded" === this.readyState || "complete" === this.readyState ? b() : c && c() })), document.getElementsByTagName("head") ? document.getElementsByTagName("head")[0].appendChild(d) : document.getElementsByTagName("body")[0].appendChild(d) }, k = function (a) { return JSON.stringify({ t: "boot", c: a }) }, l = function (b, c, d) { var l, m, n, o, p, q, r = {}, s = null, t = null, u = null; if (("waiting" === a || "ok" === a) && "string" == typeof b.data && b.data.length > 0) { try { if (r = JSON.parse(b.data), !(r && r.t && r.c)) throw new Error("Incompatible message received"); if ("boot" !== r.t) throw new Error("Unknown message received: " + r.t) } catch (v) { return } if (m = function (b) { a = "failed", i(), d({ message: b }), swacPostMessage(k({ message: "failed" }), "*") }, "boot" === r.t && "pong" === r.c.message) { if (n = function () { SWAC.isContainer = !1, a = "ok", e = r.c, e.containerVersion = e.containerVersion || "1.0.0", swacPostMessage(k({ message: "ok" }), "*") }, p = function () { var a, b = g.length, c = null; if ("undefined" != typeof SWAC.Hub.prototype.Extensions) c = SWAC.Hub.prototype.Extensions; else { if ("undefined" == typeof WebCC) return n(), void 0; c = WebCC.Extensions } if (null !== t) { if (Object.keys(c).length !== t + 1 && "undefined" == typeof SWACBoot) return m("Invalid Extension"), void 0; for (var d in c) c.hasOwnProperty(d) && "undefined" != typeof h[d] && (c[h[d]] = c[d], delete c[d], delete h[d]) } 0 === b || "undefined" == typeof WebCC && SWAC._internal.Utils.checkVersion(u, "1.4.1") < 0 ? n() : (a = g.pop(), "undefined" == typeof defineExtension ? j(a, p, m) : "undefined" == typeof SWACBoot && "undefined" == typeof WebCC.Extensions ? (s = /^\s+|\s+$/g, void 0 === a || null === a || "" === a.replace(s, "") ? m("Failed to load SWAC.Config.Control.URLs library") : (l = function () { "undefined" != typeof WebCC.Extensions ? p() : m("Failed to load SWAC.Config.Control.URLs library") }, j(a, l, m)), s = null) : "$$unknownExtension$$" === a ? "undefined" != typeof SWACBoot ? p() : m("Unknown Extension") : (t = Object.keys(c).length, j(a, p, "undefined" != typeof SWACBoot ? p : m))) }, r.c.extensions) for (q in r.c.extensions) r.c.extensions.hasOwnProperty(q) && g.unshift(r.c.extensions[q]); u = r.c.containerVersion || "1.0.0", "undefined" != typeof SWAC ? p() : (s = /^\s+|\s+$/g, void 0 === r.c.url || null === r.c.url || "" === r.c.url.replace(s, "") ? m("Failed to load SWAC.Config.Container.URLs library") : (l = function () { "undefined" != typeof SWAC || "undefined" != typeof r.c.namespace && "undefined" != typeof window[r.c.namespace] ? p() : m("Failed to load SWAC.Config.Container.URLs library") }, a = "upgrading", j(r.c.url, l, m)), s = null) } else if ("boot" === r.t && "ok2" === r.c.message) { a = "done", i(); for (o in e) e.hasOwnProperty(o) && (f[o] = e[o]); e.message = "SWAC successfully loaded", e.auth = e.authentication, delete e.authentication, delete e.url, delete e.extensions, delete e.namespace, r.c.details || (f.details = { path: ["<root>"] }); for (o in r.c) "message" !== o && r.c.hasOwnProperty(o) && (f.hasOwnProperty(o) || (f[o] = r.c[o])); delete e._internal, SWAC.Hub.prototype.containerVersion = e.containerVersion, c(e) } else "boot" === r.t && "peng" === r.c.message && (i(), d({ message: r.c.reason })) } }, m = function () { if (c === self) { if ("object" == typeof swacNative && "function" == typeof swacNative.postMessage) return swacNative.postMessage; if (window.external && "function" == typeof window.external.postMessage) return window.external.postMessage } return null }, n = function (e, g, j, n, o) { j = j || "*", o = o || 1e3, g = g || function () { }, n = n || "no"; var p, q, r, s = []; if ("done" === a) return window.setTimeout(function () { g({ message: "Boot phase already done" }) }, 0), void 0; if (p = m(), c === self && "function" != typeof p && "function" != typeof window.swacPostMessage) a = "failed", f.details = { path: ["<root>"] }, window.setTimeout(function () { g({ message: "Component is not embedded into an iframe" }) }, 0); else { if ("function" != typeof window.swacPostMessage && (window.swacPostMessage = "function" == typeof p ? p : function (a, b) { return c.postMessage(a, b) }), d = function (a) { l(a, e, g) }, a = "waiting", window.addEventListener ? window.addEventListener("message", d, !1) : window.attachEvent("onmessage", d), b = window.setTimeout(function () { "done" !== a && (a = "timedout", f.details = { path: ["<root>"] }, i(), g({ message: "Bootload sequence timed out" })) }, o), null !== arguments[6] && "undefined" != typeof arguments[6]) for (r = 0; r < arguments[6].length; r++)"object" == typeof arguments[6][r] ? (s.push(arguments[6][r].extension), h[arguments[6][r].extension] = arguments[6][r].as) : s.push(arguments[6][r]); q = k({ message: "ping", version: j, authentication: n, attributes: arguments[5], extensions: s, swacVersion: WebCC.version }), swacPostMessage(q, "*") } }, o = function (a, b, c, d) { n(function () { "undefined" != typeof WebCC.beginInitialize ? WebCC.beginInitialize(b).then(function () { a(!0) }, function () { a(!1) }) : a(!1) }, function () { a(!1) }, WebCC.version, "no", d ? d : 1e4, { control: !0 }, c ? c : []) }; return { start: o, _internal: { containerInfo: f } } }(); WebCC.version = "1.4.2";