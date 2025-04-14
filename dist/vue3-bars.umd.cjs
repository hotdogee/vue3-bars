(function(b,t){typeof exports=="object"&&typeof module<"u"?t(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],t):(b=typeof globalThis<"u"?globalThis:b||self,t(b.VueBars={},b.Vue))})(this,function(b,t){"use strict";function w(l,e,n){n=n+1;const i=parseInt(l,16),d=parseInt(e,16),r=[],a=(i-d)/n;r.push(l);for(let o=1;o<=n;o++){const u=Math.floor(i-a*o).toString(16);r.push(u.length===1?"0"+u:u)}return r}function S(l,e,n=3){const i=l.slice(0,2),d=l.slice(2,4),r=l.slice(4,6),s=e.slice(0,2),a=e.slice(2,4),o=e.slice(4,6),u=w(i,s,n),c=w(d,a,n),h=w(r,o,n),p=[];return u.forEach((_,g)=>{p.push(""+u[g]+c[g]+h[g])}),p}function P(l,e,n){return l=l.replace("#",""),e=e.replace("#",""),S(l,e,n).map(d=>"#"+d)}function W(l,{minX:e,minY:n,maxX:i,maxY:d,minBarHeight:r},s,{max:a,min:o},u){const c=l.map(m=>typeof m=="number"?m:m.value),h=Math.min(...c,o===1/0?c.length?Math.min(...c):0:o),p=Math.max(...c,a===-1/0?c.length?Math.max(...c):0:a),_=Math.abs(p),g=Math.abs(h),j=c.length>1?(i-e-s)/(c.length-1):i-e,N=u.labelData.length>0?u.labelHeight:0;let y=0;h<0&&p<=0?y=g:h<0&&p>0?y=g+_:y=p;const B=d-n-N,f=y!==0&&B>0?B/y:1,T=h>=0&&h*f<r?0:h<0&&g*f<r?r-g*f:0,D=h<0?d-N-g*f:d-N;return c.map((m,x)=>{const q=typeof l[x]=="number"?String(l[x]):l[x].title??String(m),v=Math.abs(m)*f,k=Math.max(v-(m>=0?0:T),r);return{x:c.length>1?x*j+e:e+(i-e-s)/2,y:m>=0?D-k:D,height:k,title:q,zeroLineY:D}})}function $(l,e){const{maxX:n,gradient:i,growDuration:d}=e,r=e.barWidth??(l.length>1?n/(l.length-1)-(e.padding??5):n-e.minX-(e.padding??5)*2),s=e.rounding??2;let a=[];return i&&i.length>1&&l.length>1?a=P(i[0],i[1],l.length-1):i&&i.length>0?a=l.map(()=>i[0]):a=l.map(()=>"#000"),l.map((o,u)=>({id:`bar-id-${u}`,fill:a[u]||i[0]||"#000",x:o.x,y:o.y,width:r,height:o.height,rx:s,ry:s,title:o.title,growDuration:d}))}function H(l,e){const{labelData:n,labelRotate:i,labelColor:d,labelSize:r}=e;if(!n||n.length===0||!l.length)return[];const s=e.maxY-e.labelHeight+10;return l.map((a,o)=>{if(o>=n.length)return null;const u=n[o],c=a.x+(e.barWidth||0)-r/2;return{x:c,y:s,transformText:`rotate(${i}, ${c}, ${s})`,style:`text-anchor: end; fill:${d}; font-size:${r}px; user-select: none;`,text:u,title:a.title}}).filter(a=>a!==null)}const V={class:"container",transform:"translate(0, 0)"},M=["id","fill","x","y","width","height","rx","ry"],z=["to","dur"],Y=["from","to","dur"],E=["x","y","transform"],C=t.defineComponent({__name:"PathGroup",props:{data:{type:Array,required:!0},boundary:{type:Object,required:!0},barWidth:{type:Number,default:8},rounding:{type:Number,default:2},gradient:{type:Array,default:()=>["#000"]},growDuration:{type:Number,default:.5},max:{type:Number,default:-1/0},min:{type:Number,default:1/0},labelProps:{type:Object,required:!0},padding:{type:Number,default:8}},setup(l){const e=l,n=t.computed(()=>{if(!e.data||e.data.length===0)return[];const r=typeof e.min=="number"?e.min:-1/0,s=typeof e.max=="number"?e.max:1/0;return W(e.data,e.boundary,e.barWidth,{max:s,min:r},e.labelProps)}),i=t.computed(()=>n.value.length?$(n.value,{gradient:e.gradient,barWidth:e.barWidth,padding:e.padding,rounding:e.rounding,growDuration:e.growDuration,...e.boundary}):[]),d=t.computed(()=>{var r;return!n.value.length||!((r=e.labelProps.labelData)!=null&&r.length)?[]:H(n.value,{labelData:e.labelProps.labelData,labelRotate:e.labelProps.labelRotate,labelColor:e.labelProps.labelColor,labelSize:e.labelProps.labelSize,labelHeight:e.labelProps.labelHeight,barWidth:e.barWidth,padding:e.padding,minX:e.labelProps.minX,minY:e.labelProps.minY,maxX:e.labelProps.maxX,maxY:e.labelProps.maxY})});return(r,s)=>(t.openBlock(),t.createElementBlock("g",V,[(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(i.value,a=>(t.openBlock(),t.createElementBlock("rect",{key:a.id,id:a.id,fill:a.fill,x:a.x,y:a.y,width:a.width,height:a.height,rx:a.rx,ry:a.ry},[t.createElementVNode("animate",{attributeName:"height",from:"0",to:a.height,dur:`${a.growDuration}s`,fill:"freeze"},null,8,z),t.createElementVNode("animate",{attributeName:"y",from:l.boundary.maxY-(e.labelProps.labelData.length>0?20:0),to:a.y,dur:`${a.growDuration}s`,fill:"freeze"},null,8,Y),t.createElementVNode("title",null,t.toDisplayString(a.title),1)],8,M))),128)),(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(d.value,(a,o)=>(t.openBlock(),t.createElementBlock("text",{key:`label-${o}`,class:"v-bars--label-text",style:t.normalizeStyle(a.style),x:a.x,y:a.y,transform:a.transformText},t.toDisplayString(a.text),13,E))),128))]))}}),I=["width","height","viewBox"],R={key:1},X=t.defineComponent({__name:"VueBars",props:{data:{type:Array,required:!0},barWidth:{type:Number,default:8},rounding:{type:Number,default:2},growDuration:{type:Number,default:.5},gradient:{type:Array,default:()=>["#000"]},max:{type:Number,default:-1/0},min:{type:Number,default:1/0},minBarHeight:{type:Number,default:3},labelData:{type:Array,default:()=>[]},labelRotate:{type:Number,default:-45},labelColor:{type:String,default:"#999"},labelSize:{type:Number,default:10},labelHeight:{type:Number,default:20},height:{type:Number},width:{type:Number},viewHeight:{type:Number,default:75},viewWidth:{type:Number,default:300},padding:{type:Number,default:8},svgStyle:{type:Object,default:()=>({display:"block",overflow:"visible"})}},setup(l){const e=l,n=t.computed(()=>e.data&&e.data.length>=1),i=t.computed(()=>e.width?`${e.width}px`:"100%"),d=t.computed(()=>e.height?`${e.height}px`:"100%"),r=t.computed(()=>e.viewWidth),s=t.computed(()=>e.viewHeight),a=t.computed(()=>`0 0 ${r.value} ${s.value}`),o=t.computed(()=>({minX:e.padding,minY:e.padding,maxX:r.value-e.padding,maxY:s.value-e.padding,minBarHeight:e.minBarHeight})),u=t.computed(()=>({labelData:e.labelData,labelRotate:e.labelRotate,labelColor:e.labelColor,labelSize:e.labelSize,labelHeight:e.labelHeight,minX:o.value.minX,minY:o.value.minY,maxX:o.value.maxX,maxY:o.value.maxY}));return(c,h)=>n.value?(t.openBlock(),t.createElementBlock("svg",{key:0,width:i.value,height:d.value,viewBox:a.value,style:t.normalizeStyle(l.svgStyle),class:"vue-bars"},[t.createVNode(C,{data:e.data,boundary:o.value,barWidth:e.barWidth,rounding:e.rounding,gradient:e.gradient,growDuration:e.growDuration,max:e.max,min:e.min,labelProps:u.value,padding:e.padding},null,8,["data","boundary","barWidth","rounding","gradient","growDuration","max","min","labelProps","padding"])],12,I)):(t.openBlock(),t.createElementBlock("div",R))}});b.VueBars=X,Object.defineProperty(b,Symbol.toStringTag,{value:"Module"})});
