import { defineComponent as Y, computed as h, createElementBlock as m, openBlock as f, Fragment as $, renderList as H, createElementVNode as _, toDisplayString as M, normalizeStyle as z, createVNode as R } from "vue";
function N(a, t, l) {
  l = l + 1;
  const n = parseInt(a, 16), o = parseInt(t, 16), i = [], e = (n - o) / l;
  i.push(a);
  for (let r = 1; r <= l; r++) {
    const s = Math.floor(n - e * r).toString(16);
    i.push(s.length === 1 ? "0" + s : s);
  }
  return i;
}
function X(a, t, l = 3) {
  const n = a.slice(0, 2), o = a.slice(2, 4), i = a.slice(4, 6), u = t.slice(0, 2), e = t.slice(2, 4), r = t.slice(4, 6), s = N(n, u, l), d = N(o, e, l), g = N(i, r, l), y = [];
  return s.forEach((P, b) => {
    y.push("" + s[b] + d[b] + g[b]);
  }), y;
}
function k(a, t, l) {
  return a = a.replace("#", ""), t = t.replace("#", ""), X(a, t, l).map((o) => "#" + o);
}
function j(a, { minX: t, minY: l, maxX: n, maxY: o, minBarHeight: i }, u, { max: e, min: r }, s) {
  const d = a.map((c) => typeof c == "number" ? c : c.value), g = Math.min(...d, r === 1 / 0 ? d.length ? Math.min(...d) : 0 : r), y = Math.max(...d, e === -1 / 0 ? d.length ? Math.max(...d) : 0 : e), P = Math.abs(y), b = Math.abs(g), I = d.length > 1 ? (n - t - u) / (d.length - 1) : n - t, w = s.labelData.length > 0 ? s.labelHeight : 0;
  let p = 0;
  g < 0 && y <= 0 ? p = b : g < 0 && y > 0 ? p = b + P : p = y;
  const S = o - l - w, x = p !== 0 && S > 0 ? S / p : 1, V = g >= 0 && g * x < i ? 0 : g < 0 && b * x < i ? i - b * x : 0, D = g < 0 ? o - w - b * x : o - w;
  return d.map((c, v) => {
    const B = typeof a[v] == "number" ? String(a[v]) : a[v].title ?? String(c), C = Math.abs(c) * x, W = Math.max(C - (c >= 0 ? 0 : V), i);
    return {
      x: d.length > 1 ? v * I + t : t + (n - t - u) / 2,
      // If value is negative, y starts at zeroLine, otherwise it's zeroLine - barHeight
      y: c >= 0 ? D - W : D,
      height: W,
      title: B,
      zeroLineY: D
      // Add zeroLineY to point data
    };
  });
}
function q(a, t) {
  const { maxX: l, gradient: n, growDuration: o } = t, i = t.barWidth ?? (a.length > 1 ? l / (a.length - 1) - (t.padding ?? 5) : l - t.minX - (t.padding ?? 5) * 2), u = t.rounding ?? 2;
  let e = [];
  return n && n.length > 1 && a.length > 1 ? e = k(n[0], n[1], a.length - 1) : n && n.length > 0 ? e = a.map(() => n[0]) : e = a.map(() => "#000"), a.map((r, s) => ({
    id: `bar-id-${s}`,
    fill: e[s] || n[0] || "#000",
    x: r.x,
    // Adjust x for single point
    y: r.y,
    width: i,
    height: r.height,
    rx: u,
    ry: u,
    title: r.title,
    growDuration: o
  }));
}
function A(a, t) {
  const { labelData: l, labelRotate: n, labelColor: o, labelSize: i } = t;
  if (!l || l.length === 0 || !a.length) return [];
  const u = t.maxY - t.labelHeight + 10;
  return a.map((e, r) => {
    if (r >= l.length) return null;
    const s = l[r], d = e.x + (t.barWidth || 0) - i / 2;
    return {
      x: d,
      y: u,
      transformText: `rotate(${n}, ${d}, ${u})`,
      style: `text-anchor: end; fill:${o}; font-size:${i}px; user-select: none;`,
      text: s,
      title: e.title
    };
  }).filter((e) => e !== null);
}
const E = {
  class: "container",
  transform: "translate(0, 0)"
}, G = ["id", "fill", "x", "y", "width", "height", "rx", "ry"], L = ["to", "dur"], O = ["from", "to", "dur"], T = ["x", "y", "transform"], F = /* @__PURE__ */ Y({
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
      const i = typeof t.min == "number" ? t.min : -1 / 0, u = typeof t.max == "number" ? t.max : 1 / 0;
      return j(
        t.data,
        t.boundary,
        t.barWidth,
        { max: u, min: i },
        t.labelProps
      );
    }), n = h(() => l.value.length ? q(l.value, {
      // Pass combined props needed by genBarsData
      gradient: t.gradient,
      barWidth: t.barWidth,
      padding: t.padding,
      rounding: t.rounding,
      growDuration: t.growDuration,
      ...t.boundary
      // Spread boundary props
    }) : []), o = h(() => {
      var i;
      return !l.value.length || !((i = t.labelProps.labelData) != null && i.length) ? [] : A(l.value, {
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
    return (i, u) => (f(), m("g", E, [
      (f(!0), m($, null, H(n.value, (e) => (f(), m("rect", {
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
        _("animate", {
          attributeName: "height",
          from: "0",
          to: e.height,
          dur: `${e.growDuration}s`,
          fill: "freeze"
        }, null, 8, L),
        _("animate", {
          attributeName: "y",
          from: a.boundary.maxY - (t.labelProps.labelData.length > 0 ? 20 : 0),
          to: e.y,
          dur: `${e.growDuration}s`,
          fill: "freeze"
        }, null, 8, O),
        _("title", null, M(e.title), 1)
      ], 8, G))), 128)),
      (f(!0), m($, null, H(o.value, (e, r) => (f(), m("text", {
        key: `label-${r}`,
        class: "v-bars--label-text",
        style: z(e.style),
        x: e.x,
        y: e.y,
        transform: e.transformText
      }, M(e.text), 13, T))), 128))
    ]));
  }
}), J = ["width", "height", "viewBox"], K = { key: 1 }, U = /* @__PURE__ */ Y({
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
    const t = a, l = h(() => t.data && t.data.length >= 1), n = h(() => t.width ? `${t.width}` : "100%"), o = h(() => t.height ? `${t.height}` : "100%"), i = h(() => t.viewWidth), u = h(() => t.viewHeight), e = h(() => `0 0 ${i.value} ${u.value}`), r = h(() => ({
      minX: t.padding,
      minY: t.padding,
      maxX: i.value - t.padding,
      maxY: u.value - t.padding,
      minBarHeight: t.minBarHeight
    })), s = h(() => ({
      labelData: t.labelData,
      labelRotate: t.labelRotate,
      labelColor: t.labelColor,
      labelSize: t.labelSize,
      labelHeight: t.labelHeight,
      // Pass boundary coordinates needed for label calculation
      minX: r.value.minX,
      minY: r.value.minY,
      maxX: r.value.maxX,
      maxY: r.value.maxY
    }));
    return (d, g) => l.value ? (f(), m("svg", {
      key: 0,
      width: n.value,
      height: o.value,
      viewBox: e.value,
      style: z(a.svgStyle),
      class: "vue-bars"
    }, [
      R(F, {
        data: t.data,
        boundary: r.value,
        barWidth: t.barWidth,
        rounding: t.rounding,
        gradient: t.gradient,
        growDuration: t.growDuration,
        max: t.max,
        min: t.min,
        labelProps: s.value,
        padding: t.padding
      }, null, 8, ["data", "boundary", "barWidth", "rounding", "gradient", "growDuration", "max", "min", "labelProps", "padding"])
    ], 12, J)) : (f(), m("div", K));
  }
});
export {
  U as VueBars
};
//# sourceMappingURL=vue3-bars.js.map
