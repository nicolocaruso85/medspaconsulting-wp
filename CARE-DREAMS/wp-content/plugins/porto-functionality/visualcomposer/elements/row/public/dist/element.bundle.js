(window.vcvWebpackJsonp4x=window.vcvWebpackJsonp4x||[]).push([[0],{"./node_modules/raw-loader/index.js!./row/cssMixins/columnGap.pcss":function(e,n){e.exports=".vce-row--col-gap-$gap {\n\n  @if $gap != false {\n    > .vce-row-content {\n      > .vce-col {\n        margin-right: $(gap)px;\n      }\n\n      > .vce-column-resizer .vce-column-resizer-handler {\n        width: $(gap)px;\n      }\n    }\n  }\n}\n\n.rtl .vce-row--col-gap-$gap,\n.rtl.vce-row--col-gap-$gap {\n  @if $gap != false {\n    > .vce-row-content {\n      > .vce-col {\n        margin-left: $(gap)px;\n        margin-right: 0;\n      }\n    }\n  }\n}"},"./node_modules/raw-loader/index.js!./row/styles.css":function(e,n){e.exports='/* ----------------------------------------------\n * Row\n * ---------------------------------------------- */\n.vce {\n  margin-bottom: 30px;\n}\n.vce-row-container {\n  width: 100%;\n}\n.vce-row {\n  position: relative;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  margin-left: 0;\n  margin-right: 0;\n  transition: box-shadow .2s;\n}\n.vce-row-content > .vce-col:last-child {\n  margin-right: 0;\n}\n.vce-row-full-height {\n  min-height: 100vh;\n}\n.vce-row-content {\n  -ms-flex: 1 1 auto;\n      flex: 1 1 auto;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n      flex-direction: row;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n  -ms-flex-line-pack: start;\n      align-content: flex-start;\n  -ms-flex-align: start;\n      align-items: flex-start;\n  min-height: 1em;\n  position: relative;\n}\n.vce-row-wrap--reverse > .vce-row-content {\n  -ms-flex-wrap: wrap-reverse;\n      flex-wrap: wrap-reverse;\n  -ms-flex-line-pack: end;\n      align-content: flex-end;\n  -ms-flex-align: end;\n      align-items: flex-end;\n}\n.vce-row-columns--top > .vce-row-content {\n  -ms-flex-line-pack: start;\n      align-content: flex-start;\n}\n.vce-row-columns--top.vce-row-wrap--reverse > .vce-row-content {\n  -ms-flex-line-pack: end;\n      align-content: flex-end;\n}\n.vce-row-columns--middle > .vce-row-content {\n  -ms-flex-line-pack: center;\n      align-content: center;\n}\n.vce-row-columns--bottom > .vce-row-content {\n  -ms-flex-line-pack: end;\n      align-content: flex-end;\n}\n.vce-row-columns--bottom.vce-row-wrap--reverse > .vce-row-content {\n  -ms-flex-line-pack: start;\n      align-content: flex-start;\n}\n.vce-row-columns--top > .vce-row-content:after,\n.vce-row-columns--middle > .vce-row-content:after,\n.vce-row-columns--bottom > .vce-row-content:after {\n  content: "";\n  width: 100%;\n  height: 0;\n  overflow: hidden;\n  visibility: hidden;\n  display: block;\n}\n.vce-row-content--middle > .vce-row-content > .vce-col > .vce-col-inner {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-direction: column;\n      flex-direction: column;\n}\n.vce-row-content--bottom > .vce-row-content > .vce-col > .vce-col-inner {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: end;\n      justify-content: flex-end;\n  -ms-flex-direction: column;\n      flex-direction: column;\n}\n.vce-row-equal-height > .vce-row-content {\n  -ms-flex-align: stretch;\n      align-items: stretch;\n}\n.vce-row-columns--stretch > .vce-row-content {\n  -ms-flex-line-pack: stretch;\n      align-content: stretch;\n  -ms-flex-align: stretch;\n      align-items: stretch;\n}\n.vce-row[data-vce-full-width="true"] {\n  position: relative;\n  box-sizing: border-box;\n}\n.vce-row[data-vce-stretch-content="true"].vce-row-no-paddings {\n  padding-left: 0;\n  padding-right: 0;\n}\n.vce-row.vce-element--has-background {\n  padding-left: 30px;\n  padding-right: 30px;\n  padding-top: 30px;\n}\n.vce-row.vce-element--has-background[data-vce-full-width="true"]:not([data-vce-stretch-content="true"]) {\n  padding-left: 0;\n  padding-right: 0;\n}\n.vce-row.vce-element--has-background.vce-row--has-col-background {\n  padding-bottom: 30px;\n}\n.vce-row > .vce-row-content > .vce-col.vce-col--all-last {\n  margin-right: 0;\n}\n.rtl .vce-row > .vce-row-content > .vce-col.vce-col--all-last,\n.rtl.vce-row > .vce-row-content > .vce-col.vce-col--all-last {\n  margin-left: 0;\n}\n@media (min-width: 0) and (max-width: 543px) {\n  .vce-row.vce-element--xs--has-background {\n    padding-left: 30px;\n    padding-right: 30px;\n    padding-top: 30px;\n  }\n  .vce-row.vce-element--xs--has-background[data-vce-full-width="true"]:not([data-vce-stretch-content="true"]) {\n    padding-left: 0;\n    padding-right: 0;\n  }\n  .vce-row.vce-element--xs--has-background.vce-row--xs--has-col-background {\n    padding-bottom: 30px;\n  }\n  .vce-row.vce-element--xs--has-background.vce-row--has-col-background {\n    padding-bottom: 30px;\n  }\n  .vce-row.vce-element--has-background.vce-row--xs--has-col-background {\n    padding-bottom: 30px;\n  }\n  .vce-row > .vce-row-content > .vce-col.vce-col--xs-last {\n    margin-right: 0;\n  }\n  .rtl .vce-row > .vce-row-content > .vce-col.vce-col--xs-last,\n  .rtl.vce-row > .vce-row-content > .vce-col.vce-col--xs-last {\n    margin-left: 0;\n  }\n}\n/* styles for mobile-landscape */\n@media (min-width: 544px) and (max-width: 767px) {\n  .vce-row.vce-element--sm--has-background {\n    padding-left: 30px;\n    padding-right: 30px;\n    padding-top: 30px;\n  }\n  .vce-row.vce-element--sm--has-background[data-vce-full-width="true"]:not([data-vce-stretch-content="true"]) {\n    padding-left: 0;\n    padding-right: 0;\n  }\n  .vce-row.vce-element--sm--has-background.vce-row--sm--has-col-background {\n    padding-bottom: 30px;\n  }\n  .vce-row.vce-element--sm--has-background.vce-row--has-col-background {\n    padding-bottom: 30px;\n  }\n  .vce-row.vce-element--has-background.vce-row--sm--has-col-background {\n    padding-bottom: 30px;\n  }\n  .vce-row > .vce-row-content > .vce-col.vce-col--sm-last {\n    margin-right: 0;\n  }\n  .rtl .vce-row > .vce-row-content > .vce-col.vce-col--sm-last,\n  .rtl.vce-row > .vce-row-content > .vce-col.vce-col--sm-last {\n    margin-left: 0;\n  }\n}\n/* styles for mobile-landscape */\n@media (min-width: 768px) and (max-width: 991px) {\n  .vce-row.vce-element--md--has-background {\n    padding-left: 30px;\n    padding-right: 30px;\n    padding-top: 30px;\n  }\n  .vce-row.vce-element--md--has-background[data-vce-full-width="true"]:not([data-vce-stretch-content="true"]) {\n    padding-left: 0;\n    padding-right: 0;\n  }\n  .vce-row.vce-element--md--has-background.vce-row--md--has-col-background {\n    padding-bottom: 30px;\n  }\n  .vce-row.vce-element--md--has-background.vce-row--has-col-background {\n    padding-bottom: 30px;\n  }\n  .vce-row.vce-element--has-background.vce-row--md--has-col-background {\n    padding-bottom: 30px;\n  }\n  .vce-row > .vce-row-content > .vce-col.vce-col--md-last {\n    margin-right: 0;\n  }\n  .rtl .vce-row > .vce-row-content > .vce-col.vce-col--md-last,\n  .rtl.vce-row > .vce-row-content > .vce-col.vce-col--md-last {\n    margin-left: 0;\n  }\n}\n/* styles for mobile-landscape */\n@media (min-width: 992px) and (max-width: 1199px) {\n  .vce-row.vce-element--lg--has-background {\n    padding-left: 30px;\n    padding-right: 30px;\n    padding-top: 30px;\n  }\n  .vce-row.vce-element--lg--has-background[data-vce-full-width="true"]:not([data-vce-stretch-content="true"]) {\n    padding-left: 0;\n    padding-right: 0;\n  }\n  .vce-row.vce-element--lg--has-background.vce-row--lg--has-col-background {\n    padding-bottom: 30px;\n  }\n  .vce-row.vce-element--lg--has-background.vce-row--has-col-background {\n    padding-bottom: 30px;\n  }\n  .vce-row.vce-element--has-background.vce-row--lg--has-col-background {\n    padding-bottom: 30px;\n  }\n  .vce-row > .vce-row-content > .vce-col.vce-col--lg-last {\n    margin-right: 0;\n  }\n  .rtl .vce-row > .vce-row-content > .vce-col.vce-col--lg-last,\n  .rtl.vce-row > .vce-row-content > .vce-col.vce-col--lg-last {\n    margin-left: 0;\n  }\n}\n/* styles for mobile-landscape */\n@media (min-width: 1200px) {\n  .vce-row.vce-element--xl--has-background {\n    padding-left: 30px;\n    padding-right: 30px;\n    padding-top: 30px;\n  }\n  .vce-row.vce-element--xl--has-background[data-vce-full-width="true"]:not([data-vce-stretch-content="true"]) {\n    padding-left: 0;\n    padding-right: 0;\n  }\n  .vce-row.vce-element--xl--has-background.vce-row--xl--has-col-background {\n    padding-bottom: 30px;\n  }\n  .vce-row.vce-element--xl--has-background.vce-row--has-col-background {\n    padding-bottom: 30px;\n  }\n  .vce-row.vce-element--has-background.vce-row--xl--has-col-background {\n    padding-bottom: 30px;\n  }\n  .vce-row > .vce-row-content > .vce-col.vce-col--xl-last {\n    margin-right: 0;\n  }\n  .rtl .vce-row > .vce-row-content > .vce-col.vce-col--xl-last,\n  .rtl.vce-row > .vce-row-content > .vce-col.vce-col--xl-last {\n    margin-left: 0;\n  }\n}\n'},"./row/index.js":function(e,n,t){"use strict";t.r(n);var o=t("./node_modules/vc-cake/index.js"),a=t("./node_modules/@babel/runtime/helpers/extends.js"),l=t.n(a),c=t("./node_modules/@babel/runtime/helpers/defineProperty.js"),r=t.n(c),i=t("./node_modules/@babel/runtime/helpers/classCallCheck.js"),s=t.n(i),d=t("./node_modules/@babel/runtime/helpers/assertThisInitialized.js"),u=t.n(d),p=t("./node_modules/@babel/runtime/helpers/createClass.js"),v=t.n(p),g=t("./node_modules/@babel/runtime/helpers/inherits.js"),h=t.n(g),m=t("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"),w=t.n(m),f=t("./node_modules/@babel/runtime/helpers/getPrototypeOf.js"),b=t.n(f),x=t("./node_modules/react/index.js"),y=t.n(x),k=t("./node_modules/lodash/lodash.js"),O=t.n(k),C=t("./node_modules/classnames/index.js"),S=t.n(C);function j(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function R(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?j(Object(t),!0).forEach((function(n){r()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):j(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function E(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,o=b()(e);if(n){var a=b()(this).constructor;t=Reflect.construct(o,arguments,a)}else t=o.apply(this,arguments);return w()(this,t)}}var z=Object(o.getService)("api"),P=Object(o.getService)("document"),D=Object(o.getStorage)("assets"),I=Object(o.getStorage)("elementsSettings"),_=Object(o.getStorage)("fieldOptions"),A=I.state("extendedOptions"),T=["all","defaultSize","xs","sm","md","lg","xl"],L=function(e){h()(t,e);var n=E(t);function t(e){var o;return s()(this,t),(o=n.call(this,e)).state={layout:{}},o.rowRef=y.a.createRef(),o.handleStorageChange=o.handleStorageChange.bind(u()(o)),o}return v()(t,null,[{key:"getRowData",value:function(e){for(var n=[],t=0,o=0,a=[],l=!0,c=e.slice();c.lastIndexOf("hide")===c.length-1&&c.length;)l=!1,c.splice(c.lastIndexOf("hide"),1);c.forEach((function(e,r){var i=0;if("hide"===e)l=!1;else if("auto"===e||""===e)i=.01,a.push("auto"),o++;else{if(e.indexOf("%")>-1)i=parseFloat(e.replace("%","").replace(",","."))/100;else{var s=e.split("/");i=s[0]/s[1]}a.push(i)}var d=Math.floor(1e3*(t+i))/1e3;(d>1||1===d&&"hide"===e)&&(l=!1,n.push(r-1),t=0),void 0===c[r+1]&&n.push(r),t+=i}));var r=0,i=(1-(t-.01*o))/o;return a.forEach((function(e,n){"auto"===e?(a[n]=i,r+=i):r+=e})),a.forEach((function(e){a[0]!==e&&1!==e&&(l=!1)})),{lastColumnIndex:n,isColumnsEqual:l,rowValue:r}}},{key:"resetRowLayout",value:function(e){var n=P.get(e);n.layout.layoutData=null,P.update(e,n)}},{key:"getDefaultLayout",value:function(e,n){var t=[];n&&Object.prototype.hasOwnProperty.call(n,"all")?t=n.all.slice():P.children(e).forEach((function(e){Object.prototype.hasOwnProperty.call(e.size,"defaultSize")&&t.push(e.size.defaultSize)}));return t}},{key:"setColumns",value:function(e,n,o){var a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],l=P.children(e),c=[],r=[],i={tag:"column",parent:e,designOptionsAdvanced:{},customClass:"",customHeaderTitle:"",metaCustomId:"",dividers:{},sticky:{},lastInRow:{},firstInRow:{},size:{}},s=null;Object.keys(n).forEach((function(e){var d=n[e],u=o&&o[e];if(u&&u.length)if(d.length>u.length){var p=t.getRowData(u);if(Math.round(100*p.rowValue)/100<1){var v=1-p.rowValue;(d=u).push("".concat(100*v,"%"))}else if(p.isColumnsEqual){var g=d.length,h="".concat(Math.floor(100/g*100)/100,"%");d=[];for(var m=0;m<g;m++)d.push(h)}}else if(d.length<u.length){var w=t.getRowData(u);if(Math.round(100*w.rowValue)/100==1&&w.isColumnsEqual){var f=d.length,b="".concat(Math.floor(100/f*100)/100,"%");d=[];for(var x=0;x<f;x++)d.push(b)}}var y=t.getRowData(d).lastColumnIndex,k=0;d.forEach((function(n,t){var o=y.indexOf(t)>-1,d=0===t||y.indexOf(t-1)>-1;if(void 0!==l[t]){(s=l[t]).size[e]=n,"defaultSize"!==e&&(s.lastInRow[e]=o,s.firstInRow[e]=d),s.disableStacking=a;var u=!1;c.forEach((function(e,n){s.id===e.id&&(c[n]=s,u=!0)})),u||c.push(s)}else{if(r[k]){var p=r[k];p.size[e]=n,"defaultSize"!==e&&(p.lastInRow[e]=o,p.firstInRow[e]=d),p.disableStacking=a}else{var v=O.a.defaultsDeep({},i);v.size[e]=n,"defaultSize"!==e&&(v.lastInRow[e]=o,v.firstInRow[e]=d),v.disableStacking=a,r.push(v)}k+=1}}))})),c.forEach((function(e){Object.prototype.hasOwnProperty.call(n,"all")?(delete e.size.xs,delete e.size.sm,delete e.size.md,delete e.size.lg,delete e.size.xl):delete e.size.all,P.update(e.id,e)})),r.forEach((function(e){P.create(e)}));var d=n.all||n.xs;if(d&&l.length>d.length){var u=l.slice(d.length);u.forEach((function(e){P.children(e.id).forEach((function(e){e.parent=s.id,P.update(e.id,e)})),P.delete(e.id)}))}}},{key:"getLayout",value:function(e){var n={},t=P.children(e),o=!1;return t.forEach((function(e){Object.prototype.hasOwnProperty.call(e.size,"xs")&&(o=!0)})),t.forEach((function(e){!o&&e.size.all&&(Object.prototype.hasOwnProperty.call(n,"all")||(n.all=[]),n.all.push(e.size.all)),e.size.defaultSize&&(Object.prototype.hasOwnProperty.call(n,"defaultSize")||(n.defaultSize=[]),n.defaultSize.push(e.size.defaultSize))})),Object.prototype.hasOwnProperty.call(n,"all")||T.forEach((function(e){"defaultSize"!==e&&"all"!==e&&t.forEach((function(t){t.size[e]&&(Object.prototype.hasOwnProperty.call(n,e)||(n[e]=[]),n[e].push(t.size[e])),o&&Object.prototype.hasOwnProperty.call(t.size,"all")&&(Object.prototype.hasOwnProperty.call(n,e)||(n[e]=[]),"xs"===e||"sm"===e?n[e].push("100%"):n[e].push(t.size.all))}))})),n}},{key:"getDerivedStateFromProps",value:function(e,n){if(!Object(o.env)("VCV_JS_FT_ROW_COLUMN_LOGIC_REFACTOR"))return null;var a=e.atts,l=e.id,c=a.layout&&a.layout.layoutData?a.layout.layoutData:t.getLayout(l),r=a.layout&&a.layout.layoutData;if(JSON.stringify(c)!==JSON.stringify(n.layout)){if(r)return t.setColumns(l,r,null,a.layout.disableStacking),t.resetRowLayout(l),setTimeout((function(){D.trigger("updateElement",l)}),10),{layout:r};var i=t.getLayout(l);return t.setColumns(l,i,n.layout,a.layout.disableStacking),setTimeout((function(){D.trigger("updateElement",l)}),10),{layout:i}}return null}}]),v()(t,[{key:"componentDidMount",value:function(){var e=A.get();if(!e||e&&!e.elements.includes(this.props.id)){A.onChange(this.handleStorageChange);var n={fieldKey:!1,fieldType:!1,id:this.props.id};_.trigger("fieldOptionsChange",n)}}},{key:"componentDidUpdate",value:function(){this.handleStorageChange(!1)}},{key:"handleStorageChange",value:function(e){var n=this,t=A.get();if(e&&(t=e,A.ignoreChange(this.handleStorageChange)),t){var o=t.elements.find((function(e){return e.id===n.props.id}));if(o){var a=this.rowRef.current;I.state("elementOptions").set(R(R({},o),{},{ref:a}))}}}},{key:"render",value:function(){var e=this.props,n=e.id,t=e.atts,o=e.editor,a=e.isBackend,c=t.customClass,r=t.rowWidth,i=t.removeSpaces,s=t.columnGap,d=t.fullHeight,u=t.metaCustomId,p=t.equalHeight,v=t.columnPosition,g=t.contentPosition,h=t.designOptionsAdvanced,m=t.layout,w=t.columnBackground,f=t.hidden,b=t.sticky,x=t.boxShadow,k=this.props.children,O=window.VCV_EDITOR_TYPE?window.VCV_EDITOR_TYPE():"default",C=S()({"vce-row-container":!0,"vce-wpbackend-element-hidden":f&&a}),j=["vce-row"];if(w)if(w.all)j.push("vce-row--has-col-background");else for(var R in w)w[R]&&j.push("vce-row--".concat(R,"--has-col-background"));j.push(this.getBackgroundClass(h)),j.push("vce-row--col-gap-".concat(s?parseInt(s):0)),m&&m.reverseColumn&&!m.disableStacking&&j.push("vce-row-wrap--reverse");var E={style:{}},z={style:{}},P={};"string"==typeof c&&c&&j.push(c),"stretchedRow"===r||"stretchedRowAndColumn"===r?z["data-vce-full-width"]=!0:(z.style.width="",z.style.left="",z.style.right="",E.style.paddingLeft="",E.style.paddingRight=""),"stretchedRowAndColumn"!==r&&"sidebar"!==O||(z["data-vce-stretch-content"]=!0);var D={};b&&b.device&&(D=this.getStickyAttributes(b)),"sidebar"!==O&&"stretchedRowAndColumn"!==r&&"boxed"!==r||!i||j.push("vce-row-no-paddings"),d?j.push("vce-row-full-height"):z.style.minHeight="",p&&"stretch"!==v&&j.push("vce-row-equal-height"),v&&j.push("vce-row-columns--".concat(v)),g&&j.push("vce-row-content--".concat(g));var I={};x&&x.device&&(I=this.getBoxShadowAttributes(x,n));var _="vce-row-content";"innerContainer"===r?(j.push("porto-inner-container"),_+=" container"):"boxed"===r&&i||j.push("no-inner-container");var A=S()(j);u&&(P.id=u),P["data-vce-delete-attr"]="style",z["data-vce-delete-attr"]="style",E["data-vce-element-content"]=!0;var T=this.applyDO("all");return y.a.createElement("div",l()({className:C},P),y.a.createElement("div",l()({className:A},z,D,I,o,{id:"el-"+n},T,{ref:this.rowRef}),this.getBackgroundTypeContent(),this.getContainerDivider(),y.a.createElement("div",l()({className:_},E),k)))}}]),t}(z.elementComponent);(0,Object(o.getService)("cook").add)(t("./row/settings.json"),(function(e){e.add(L)}),{css:t("./node_modules/raw-loader/index.js!./row/styles.css"),editorCss:!1,mixins:{columnGap:{mixin:t("./node_modules/raw-loader/index.js!./row/cssMixins/columnGap.pcss")}}},(function(e){var n=e.rowLayout,t=e.designOptionsAdvanced;if(n&&!Array.isArray(n)||(e.rowLayout={all:n}),t&&t.device){var o={},a={};if(Object.keys(t.device).forEach((function(e){var n=t.device[e],l=Object.assign({},n);if(n.parallax){var c={parallaxEnable:!0,parallax:n.parallax};Object.prototype.hasOwnProperty.call(n,"parallaxReverse")&&(c.parallaxReverse=n.parallaxReverse),Object.prototype.hasOwnProperty.call(n,"parallaxSpeed")&&(c.parallaxSpeed=n.parallaxSpeed),o[e]=c,delete l.parallax,delete l.parallaxReverse,delete l.parallaxSpeed,a[e]=l}})),!O.a.isEmpty(o)){e.parallax={device:o};var l=Object.assign({},t);l.device=a,e.designOptionsAdvanced=l}}return e}))},"./row/settings.json":function(e){e.exports=JSON.parse('{"customClass":{"type":"string","access":"public","value":"","options":{"label":"Extra class name","description":"Add an extra class name to the element and refer to it from Custom CSS option."}},"layout":{"type":"rowLayout","access":"public","value":{},"options":{"label":"Row Layout"}},"dividers":{"type":"divider","access":"public","value":{},"options":{"label":"Dividers"}},"sticky":{"type":"sticky","access":"public","value":{},"options":{"label":"Sticky"}},"boxShadow":{"type":"boxShadow","access":"public","value":{},"options":{"label":"Box Shadow"}},"parallax":{"type":"parallax","access":"public","value":{},"options":{"label":"Parallax"}},"designOptionsAdvanced":{"type":"designOptionsAdvanced","access":"public","value":{},"options":{"label":"Design Options"}},"editFormTab1":{"type":"group","access":"protected","value":["rowWidth","removeSpaces","columnGap","fullHeight","columnPosition","equalHeight","contentPosition","metaCustomId","customClass"],"options":{"label":"General"}},"metaEditFormTabs":{"type":"group","access":"protected","value":["editFormTab1","layout","designOptionsAdvanced","parallax","boxShadow","dividers","sticky"]},"relatedTo":{"type":"group","access":"protected","value":["General","RootElements","Row"]},"containerFor":{"type":"group","access":"protected","value":["Column"]},"parentWrapper":{"type":"string","access":"protected","value":""},"metaOrder":{"type":"number","access":"protected","value":2},"rowWidth":{"type":"buttonGroup","access":"public","value":"boxed","options":{"label":"Row width","values":[{"label":"Boxed","value":"boxed","icon":"vcv-ui-icon-attribute-row-width-boxed"},{"label":"Stretched Row","value":"stretchedRow","icon":"vcv-ui-icon-attribute-row-width-stretched"},{"label":"Stretched Row and Column","value":"stretchedRowAndColumn","icon":"vcv-ui-icon-attribute-row-width-stretched-content"},{"label":"Inner Container","value":"innerContainer","icon":"fas fa-arrows-alt-h"}],"containerDependency":{"sidebar":"hide"}}},"removeSpaces":{"type":"toggle","access":"public","value":false,"options":{"label":"Remove spaces","description":"Remove row spaces from left and right.","onChange":{"rules":{"rowWidth":{"rule":"valueIn","options":{"values":["stretchedRowAndColumn","boxed"]}}},"actions":[{"action":"toggleVisibility"}]},"containerDependency":{"sidebar":"removeDependencies"}}},"columnGap":{"type":"number","access":"public","value":"20","options":{"label":"Column gap","description":"Enter gap between columns in pixels (Example: 5).","min":"0","cssMixin":{"mixin":"columnGap","property":"gap","namePattern":"[\\\\da-f]+"}}},"fullHeight":{"type":"toggle","access":"public","value":false,"options":{"label":"Full height","description":"Set row to be full screen height."}},"metaCustomId":{"type":"customId","access":"public","value":"","options":{"label":"Element ID","description":"Apply unique ID to element to link directly to it by using #your_id (for element ID use lowercase input only)."}},"equalHeight":{"type":"toggle","access":"public","value":false,"options":{"label":"Column equal height"}},"columnPosition":{"type":"buttonGroup","access":"public","value":"top","options":{"label":"Column position","values":[{"label":"Top","value":"top","icon":"vcv-ui-icon-attribute-vertical-alignment-top"},{"label":"Middle","value":"middle","icon":"vcv-ui-icon-attribute-vertical-alignment-middle"},{"label":"Bottom","value":"bottom","icon":"vcv-ui-icon-attribute-vertical-alignment-bottom"},{"label":"Full Height","value":"stretch","icon":"vcv-ui-icon-attribute-vertical-alignment-full-height"}],"onChange":{"rules":{"fullHeight":{"rule":"toggle"}},"actions":[{"action":"toggleVisibility"}]}}},"contentPosition":{"type":"buttonGroup","access":"public","value":"top","options":{"label":"Content position","values":[{"label":"Top","value":"top","icon":"vcv-ui-icon-attribute-vertical-alignment-top"},{"label":"Middle","value":"middle","icon":"vcv-ui-icon-attribute-vertical-alignment-middle"},{"label":"Bottom","value":"bottom","icon":"vcv-ui-icon-attribute-vertical-alignment-bottom"}]}},"size":{"type":"string","access":"public","value":"auto"},"hidden":{"type":"string","access":"public","value":false},"columnBackground":{"type":"string","access":"public","value":""},"tag":{"access":"protected","type":"string","value":"row"},"sharedAssetsLibrary":{"access":"protected","type":"string","value":{"libraries":[{"rules":{"rowWidth":{"rule":"!value","options":{"value":"boxed"}}},"libsNames":["fullWidth"]},{"rules":{"fullHeight":{"rule":"toggle"}},"libsNames":["fullHeight"]}]}},"initChildren":{"access":"protected","type":"object","value":[{"tag":"column"}]}}')}},[["./row/index.js"]]]);