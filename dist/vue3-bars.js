import { defineComponent as V, computed as h, createElementBlock as y, openBlock as f, Fragment as $, renderList as H, createElementVNode as N, toDisplayString as M, normalizeStyle as Y, createCommentVNode as X, createVNode as k } from "vue";
function _(a, t, l) {
  l = l + 1;
  const n = parseInt(a, 16), o = parseInt(t, 16), r = [], e = (n - o) / l;
  r.push(a);
  for (let i = 1; i <= l; i++) {
    const s = Math.floor(n - e * i).toString(16);
    r.push(s.length === 1 ? "0" + s : s);
  }
  return r;
}
function j(a, t, l = 3) {
  const n = a.slice(0, 2), o = a.slice(2, 4), r = a.slice(4, 6), u = t.slice(0, 2), e = t.slice(2, 4), i = t.slice(4, 6), s = _(n, u, l), d = _(o, e, l), g = _(r, i, l), m = [];
  return s.forEach((P, b) => {
    m.push("" + s[b] + d[b] + g[b]);
  }), m;
}
function q(a, t, l) {
  return a = a.replace("#", ""), t = t.replace("#", ""), j(a, t, l).map((o) => "#" + o);
}
function A(a, { minX: t, minY: l, maxX: n, maxY: o, minBarHeight: r }, u, { max: e, min: i }, s) {
  const d = a.map((c) => typeof c == "number" ? c : c.value), g = Math.min(...d, i === 1 / 0 ? d.length ? Math.min(...d) : 0 : i), m = Math.max(...d, e === -1 / 0 ? d.length ? Math.max(...d) : 0 : e), P = Math.abs(m), b = Math.abs(g), B = d.length > 1 ? (n - t - u) / (d.length - 1) : n - t, w = s.labelData.length > 0 ? s.labelHeight : 0;
  let p = 0;
  g < 0 && m <= 0 ? p = b : g < 0 && m > 0 ? p = b + P : p = m;
  const S = o - l - w, x = p !== 0 && S > 0 ? S / p : 1, C = g >= 0 && g * x < r ? 0 : g < 0 && b * x < r ? r - b * x : 0, D = g < 0 ? o - w - b * x : o - w;
  return d.map((c, v) => {
    const I = typeof a[v] == "number" ? String(a[v]) : a[v].title ?? String(c), R = Math.abs(c) * x, W = Math.max(R - (c >= 0 ? 0 : C), r);
    return {
      x: d.length > 1 ? v * B + t : t + (n - t - u) / 2,
      // If value is negative, y starts at zeroLine, otherwise it's zeroLine - barHeight
      y: c >= 0 ? D - W : D,
      height: W,
      title: I,
      zeroLineY: D
      // Add zeroLineY to point data
    };
  });
}
function E(a, t) {
  const { maxX: l, gradient: n, growDuration: o } = t, r = t.barWidth ?? (a.length > 1 ? l / (a.length - 1) - (t.padding ?? 5) : l - t.minX - (t.padding ?? 5) * 2), u = t.rounding ?? 2;
  let e = [];
  return n && n.length > 1 && a.length > 1 ? e = q(n[0], n[1], a.length - 1) : n && n.length > 0 ? e = a.map(() => n[0]) : e = a.map(() => "#000"), a.map((i, s) => ({
    id: `bar-id-${s}`,
    fill: e[s] || n[0] || "#000",
    x: i.x,
    // Adjust x for single point
    y: i.y,
    width: r,
    height: i.height,
    rx: u,
    ry: u,
    title: i.title,
    growDuration: o
  }));
}
function G(a, t) {
  const { labelData: l, labelRotate: n, labelColor: o, labelSize: r } = t;
  if (!l || l.length === 0 || !a.length) return [];
  const u = t.maxY - t.labelHeight + 10;
  return a.map((e, i) => {
    if (i >= l.length) return null;
    const s = l[i], d = e.x + (t.barWidth || 0) - r / 2;
    return {
      x: d,
      y: u,
      transformText: `rotate(${n}, ${d}, ${u})`,
      style: `text-anchor: end; fill:${o}; font-size:${r}px; user-select: none;`,
      text: s,
      title: e.title
    };
  }).filter((e) => e !== null);
}
const L = {
  class: "container",
  transform: "translate(0, 0)"
}, O = ["id", "fill", "x", "y", "width", "height", "rx", "ry"], T = ["to", "dur"], F = ["from", "to", "dur"], J = ["x", "y", "transform"], K = /* @__PURE__ */ V({
  __name: "PathGroup",
  props: {
    data: {
      type: Array,
      required: !0
    },
    boundary: {
      type: Object,
      required: !0
    },
    barWidth: {
      type: Number,
      default: 8
      // Allow helper to calculate default
    },
    rounding: {
      type: Number,
      default: 2
    },
    gradient: {
      type: Array,
      default: () => ["#000"]
    },
    growDuration: {
      type: Number,
      default: 0.5
    },
    max: {
      type: Number,
      default: -1 / 0
    },
    min: {
      type: Number,
      default: 1 / 0
    },
    labelProps: {
      // Combine label-related props
      type: Object,
      required: !0
    },
    padding: {
      // Pass padding for barWidth calculation in helpers
      type: Number,
      default: 8
    }
  },
  setup(a) {
    const t = a, l = h(() => {
      if (!t.data || t.data.length === 0) return [];
      const r = typeof t.min == "number" ? t.min : -1 / 0, u = typeof t.max == "number" ? t.max : 1 / 0;
      return A(
        t.data,
        t.boundary,
        t.barWidth,
        { max: u, min: r },
        t.labelProps
      );
    }), n = h(() => l.value.length ? E(l.value, {
      // Pass combined props needed by genBarsData
      gradient: t.gradient,
      barWidth: t.barWidth,
      padding: t.padding,
      rounding: t.rounding,
      growDuration: t.growDuration,
      ...t.boundary
      // Spread boundary props
    }) : []), o = h(() => {
      var r;
      return !l.value.length || !((r = t.labelProps.labelData) != null && r.length) ? [] : G(l.value, {
        // Pass combined props needed by genLabelsData
        labelData: t.labelProps.labelData,
        labelRotate: t.labelProps.labelRotate,
        labelColor: t.labelProps.labelColor,
        labelSize: t.labelProps.labelSize,
        labelHeight: t.labelProps.labelHeight,
        barWidth: t.barWidth,
        // Pass barWidth for calculation
        padding: t.padding,
        // Pass padding for calculation
        minX: t.labelProps.minX,
        minY: t.labelProps.minY,
        maxX: t.labelProps.maxX,
        maxY: t.labelProps.maxY
      });
    });
    return (r, u) => (f(), y("g", L, [
      (f(!0), y($, null, H(n.value, (e) => (f(), y("rect", {
        key: e.id,
        id: e.id,
        fill: e.fill,
        x: e.x,
        y: e.y,
        width: e.width,
        height: e.height,
        rx: e.rx,
        ry: e.ry
      }, [
        N("animate", {
          attributeName: "height",
          from: "0",
          to: e.height,
          dur: `${e.growDuration}s`,
          fill: "freeze"
        }, null, 8, T),
        N("animate", {
          attributeName: "y",
          from: a.boundary.maxY - (t.labelProps.labelData.length > 0 ? 20 : 0),
          to: e.y,
          dur: `${e.growDuration}s`,
          fill: "freeze"
        }, null, 8, F),
        N("title", null, M(e.title), 1)
      ], 8, O))), 128)),
      (f(!0), y($, null, H(o.value, (e, i) => (f(), y("text", {
        key: `label-${i}`,
        class: "v-bars--label-text",
        style: Y(e.style),
        x: e.x,
        y: e.y,
        transform: e.transformText
      }, M(e.text), 13, J))), 128))
    ]));
  }
}), Q = ["width", "height", "viewBox"], z = /* @__PURE__ */ V({
  __name: "VueBars",
  props: {
    data: {
      type: Array,
      required: !0
    },
    // autoDraw: Boolean, // This prop seems unused, omitting for now unless needed
    barWidth: {
      type: Number,
      default: 8
      // Default can be managed here or within Path.vue/helpers
    },
    rounding: {
      type: Number,
      default: 2
    },
    growDuration: {
      type: Number,
      default: 0.5
    },
    gradient: {
      type: Array,
      default: () => ["#000"]
    },
    max: {
      type: Number,
      default: -1 / 0
    },
    min: {
      type: Number,
      default: 1 / 0
    },
    minBarHeight: {
      type: Number,
      default: 3
    },
    labelData: {
      type: Array,
      default: () => []
    },
    labelRotate: {
      type: Number,
      default: -45
    },
    labelColor: {
      type: String,
      default: "#999"
    },
    labelSize: {
      type: Number,
      default: 10
    },
    labelHeight: {
      type: Number,
      default: 20
    },
    height: {
      type: String
    },
    width: {
      type: String
    },
    viewHeight: {
      type: Number,
      default: 75
      // Default height if not provided
    },
    viewWidth: {
      type: Number,
      default: 300
      // Default width if not provided
    },
    padding: {
      type: Number,
      default: 8
    },
    svgStyle: {
      type: Object,
      default: () => ({
        display: "block",
        overflow: "visible"
        /* Allow labels/elements outside viewBox if needed */
      })
    }
  },
  setup(a) {
    const t = a, l = h(() => t.data && t.data.length >= 1), n = h(() => t.width ? `${t.width}` : "100%"), o = h(() => t.height ? `${t.height}` : "100%"), r = h(() => t.viewWidth), u = h(() => t.viewHeight), e = h(() => `0 0 ${r.value} ${u.value}`), i = h(() => ({
      minX: t.padding,
      minY: t.padding,
      maxX: r.value - t.padding,
      maxY: u.value - t.padding,
      minBarHeight: t.minBarHeight
    })), s = h(() => ({
      labelData: t.labelData,
      labelRotate: t.labelRotate,
      labelColor: t.labelColor,
      labelSize: t.labelSize,
      labelHeight: t.labelHeight,
      // Pass boundary coordinates needed for label calculation
      minX: i.value.minX,
      minY: i.value.minY,
      maxX: i.value.maxX,
      maxY: i.value.maxY
    }));
    return (d, g) => l.value ? (f(), y("svg", {
      key: 0,
      width: n.value,
      height: o.value,
      viewBox: e.value,
      style: Y(a.svgStyle),
      class: "vue-bars"
    }, [
      k(K, {
        data: t.data,
        boundary: i.value,
        barWidth: t.barWidth,
        rounding: t.rounding,
        gradient: t.gradient,
        growDuration: t.growDuration,
        max: t.max,
        min: t.min,
        labelProps: s.value,
        padding: t.padding
      }, null, 8, ["data", "boundary", "barWidth", "rounding", "gradient", "growDuration", "max", "min", "labelProps", "padding"])
    ], 12, Q)) : X("", !0);
  }
}), U = (a) => {
  a.component("VueBars", z);
}, Z = z;
Z.install = U;
export {
  Z as default
};
//# sourceMappingURL=vue3-bars.js.map
