(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2dd89cfc"],{"0614":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",[t.headerHide?t._e():i("v-app-bar",{attrs:{flat:"",dense:"",color:"transparent"}},[i("v-toolbar-title",{staticClass:"headline"},[t._v(" "+t._s(t.title)+" ")]),i("v-spacer"),t._t("widget-header-action",[i("v-btn",{attrs:{icon:""}},[i("v-icon",[t._v(t._s(t.icon))])],1)])],2),t.headerHide?t._e():i("v-divider"),t.paddingHide?t._t("widget-content"):i("v-card-text",[t._t("widget-content")],2)],2)},a=[],l={name:"AppWidget",props:{title:{type:String,default:""},icon:{type:String,default:"mdi-dots-vertical"},headerHide:Boolean,paddingHide:Boolean},data:function(){return{}}},r=l,n=i("2877"),o=i("6544"),c=i.n(o),h=i("40dc"),u=i("8336"),d=i("b0af"),p=i("99d9"),v=i("ce7e"),m=i("132d"),b=i("2fa4"),g=i("2a7f"),f=Object(n["a"])(r,s,a,!1,null,null,null);e["a"]=f.exports;c()(f,{VAppBar:h["a"],VBtn:u["a"],VCard:d["a"],VCardText:p["b"],VDivider:v["a"],VIcon:m["a"],VSpacer:b["a"],VToolbarTitle:g["b"]})},2091:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{staticClass:"container--fluid"},[i("v-row",[i("v-col",{attrs:{lg:"12"}},[i("app-widget",{attrs:{title:"Basic Usage"}},[i("div",{attrs:{slot:"widget-content"},slot:"widget-content"},[i("v-row",{staticClass:"ma-0",attrs:{justify:"space-around",align:"center"}},[i("v-avatar",{staticClass:"indigo"},[i("v-icon",{attrs:{dark:""}},[t._v(" mdi-account ")])],1),i("v-avatar",[i("img",{attrs:{src:"static/avatar/me.jpeg",alt:"John"}})]),i("v-badge",{attrs:{overlap:""}},[i("span",{attrs:{slot:"badge"},slot:"badge"},[t._v("3")]),i("v-avatar",{staticClass:"purple red--after"},[i("v-icon",{attrs:{dark:""}},[t._v(" mdi-bell ")])],1)],1),i("v-avatar",{staticClass:"teal"},[i("span",{staticClass:"white--text headline"},[t._v("C")])]),i("v-avatar",{staticClass:"red"},[i("span",{staticClass:"white--text headline"},[t._v("J")])])],1)],1)])],1),i("v-col",{attrs:{lg:"12"}},[i("app-widget",{attrs:{title:"Advance usage"}},[i("div",{attrs:{slot:"widget-content"},slot:"widget-content"},[i("v-row",{staticClass:"ma-0",attrs:{justify:"center"}},[i("v-subheader",[t._v("Today")]),i("v-expansion-panel",{attrs:{popout:""}},t._l(t.messages,(function(e,s){return i("v-expansion-panel-content",{key:s,attrs:{"hide-actions":""}},[i("v-row",{staticClass:"spacer",attrs:{slot:"header",align:"center"},slot:"header"},[i("v-col",{attrs:{cols:"4",sm:"2",md:"1"}},[i("v-avatar",{attrs:{slot:"activator",size:"36px"},slot:"activator"},[e.avatar?i("img",{attrs:{src:"static/avatar/me.jpeg",alt:""}}):i("v-icon",{attrs:{color:e.color}},[t._v(" "+t._s(e.icon)+" ")])],1)],1),i("v-col",{staticClass:"hidden-xs-only",attrs:{sm:"5",md:"3"}},[i("strong",[t._v(t._s(e.name))]),e.total?i("span",{staticClass:"grey--text"},[t._v("("+t._s(e.total)+")")]):t._e()]),i("v-col",{staticClass:"text-no-wrap",attrs:{cols:"5",sm:"3"}},[e.new?i("v-chip",{staticClass:"ml-0",attrs:{label:"",small:"",color:e.color+" lighten-4"}},[t._v(" "+t._s(e.new)+" new ")]):t._e(),i("strong",[t._v(t._s(e.title))])],1),e.excerpt?i("v-col",{staticClass:"grey--text text-truncate hidden-sm-and-down"},[t._v(" — "+t._s(e.excerpt)+" ")]):t._e()],1),i("v-card",[i("v-divider"),i("v-card-text",{domProps:{textContent:t._s(t.lorem)}})],1)],1)})),1)],1)],1)])],1),i("v-col",{attrs:{lg:"12"}},[i("app-widget",{attrs:{title:"Resizable"}},[i("div",{attrs:{slot:"widget-content"},slot:"widget-content"},[i("v-container",[i("v-row",[i("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[i("v-slider",{attrs:{min:16,max:256,label:"Size","thumb-label":""},model:{value:t.slider,callback:function(e){t.slider=e},expression:"slider"}}),i("v-switch",{attrs:{label:"Tile"},model:{value:t.tile,callback:function(e){t.tile=e},expression:"tile"}})],1),i("v-col",{staticClass:"text-center layout align justify",attrs:{cols:"12",sm:"6",md:"8"}},[i("v-avatar",{staticClass:"grey lighten-4",attrs:{tile:t.tile,size:t.avatarSize}},[i("img",{attrs:{src:"static/avatar/me.jpeg",alt:"avatar"}})])],1)],1)],1)],1)])],1)],1)],1)},a=[],l=i("0614"),r={name:"Avatar",components:{AppWidget:l["a"]},data:function(){return{messages:[{avatar:"https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",name:"John Leider",title:"Welcome to Vuetify.js!",excerpt:"Thank you for joining our community..."},{color:"red",icon:"people",name:"Social",new:1,total:3,title:"Twitter"},{color:"teal",icon:"local_offer",name:"Promos",new:2,total:4,title:"Shop your way",exceprt:"New deals available, Join Today"}],slider:56,tile:!1,lorem:"Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum."}},computed:{avatarSize:function(){return"".concat(this.slider,"px")}}},n=r,o=i("2877"),c=i("6544"),h=i.n(c),u=i("8212"),d=i("4ca6"),p=i("b0af"),v=i("99d9"),m=i("cc20"),b=i("62ad"),g=i("a523"),f=i("ce7e"),C=i("cd55"),y=i("49e2"),k=i("132d"),_=i("0fd9"),$=i("ba0d"),w=i("e0c7"),x=i("b73d"),S=Object(o["a"])(n,s,a,!1,null,null,null);e["default"]=S.exports;h()(S,{VAvatar:u["a"],VBadge:d["a"],VCard:p["a"],VCardText:v["b"],VChip:m["a"],VCol:b["a"],VContainer:g["a"],VDivider:f["a"],VExpansionPanel:C["a"],VExpansionPanelContent:y["a"],VIcon:k["a"],VRow:_["a"],VSlider:$["a"],VSubheader:w["a"],VSwitch:x["a"]})},"4ca6":function(t,e,i){"use strict";i("ff44");var s=i("132d"),a=i("a9ad"),l=i("7560"),r=i("f2e7"),n=i("f40d"),o=i("fe6c"),c=i("58df"),h=i("80d2");e["a"]=Object(c["a"])(a["a"],Object(o["b"])(["left","bottom"]),l["a"],r["a"],n["a"]).extend({name:"v-badge",props:{avatar:Boolean,bordered:Boolean,color:{type:String,default:"primary"},content:{required:!1},dot:Boolean,label:{type:String,default:"$vuetify.badge"},icon:String,inline:Boolean,offsetX:[Number,String],offsetY:[Number,String],overlap:Boolean,tile:Boolean,transition:{type:String,default:"scale-rotate-transition"},value:{default:!0}},computed:{classes(){return{"v-badge--avatar":this.avatar,"v-badge--bordered":this.bordered,"v-badge--bottom":this.bottom,"v-badge--dot":this.dot,"v-badge--icon":null!=this.icon,"v-badge--inline":this.inline,"v-badge--left":this.left,"v-badge--overlap":this.overlap,"v-badge--tile":this.tile,...this.themeClasses}},computedBottom(){return this.bottom?"auto":this.computedYOffset},computedLeft(){return this.isRtl?this.left?this.computedXOffset:"auto":this.left?"auto":this.computedXOffset},computedRight(){return this.isRtl?this.left?"auto":this.computedXOffset:this.left?this.computedXOffset:"auto"},computedTop(){return this.bottom?this.computedYOffset:"auto"},computedXOffset(){return this.calcPosition(this.offsetX)},computedYOffset(){return this.calcPosition(this.offsetY)},isRtl(){return this.$vuetify.rtl},offset(){return this.overlap?this.dot?8:12:this.dot?2:4},styles(){return this.inline?{}:{bottom:this.computedBottom,left:this.computedLeft,right:this.computedRight,top:this.computedTop}}},methods:{calcPosition(t){return`calc(100% - ${Object(h["g"])(t||this.offset)})`},genBadge(){const t=this.$vuetify.lang,e=this.$attrs["aria-label"]||t.t(this.label),i=this.setBackgroundColor(this.color,{staticClass:"v-badge__badge",style:this.styles,attrs:{"aria-atomic":this.$attrs["aria-atomic"]||"true","aria-label":e,"aria-live":this.$attrs["aria-live"]||"polite",title:this.$attrs.title,role:this.$attrs.role||"status"},directives:[{name:"show",value:this.isActive}]}),s=this.$createElement("span",i,[this.genBadgeContent()]);return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[s]):s},genBadgeContent(){if(this.dot)return;const t=Object(h["q"])(this,"badge");return t||(this.content?String(this.content):this.icon?this.$createElement(s["a"],this.icon):void 0)},genBadgeWrapper(){return this.$createElement("span",{staticClass:"v-badge__wrapper"},[this.genBadge()])}},render(t){const e=[this.genBadgeWrapper()],i=[Object(h["q"])(this)],{"aria-atomic":s,"aria-label":a,"aria-live":l,role:r,title:n,...o}=this.$attrs;return this.inline&&this.left?i.unshift(e):i.push(e),t("span",{staticClass:"v-badge",attrs:o,class:this.classes},i)}})},"8adc":function(t,e,i){},"9e29":function(t,e,i){},ba0d:function(t,e,i){"use strict";i("9e29");var s=i("c37a"),a=i("0789"),l=i("58df"),r=i("297c"),n=i("a293"),o=i("80d2"),c=i("d9bd");e["a"]=Object(l["a"])(s["a"],r["a"]).extend({name:"v-slider",directives:{ClickOutside:n["a"]},mixins:[r["a"]],props:{disabled:Boolean,inverseLabel:Boolean,max:{type:[Number,String],default:100},min:{type:[Number,String],default:0},step:{type:[Number,String],default:1},thumbColor:String,thumbLabel:{type:[Boolean,String],default:void 0,validator:t=>"boolean"===typeof t||"always"===t},thumbSize:{type:[Number,String],default:32},tickLabels:{type:Array,default:()=>[]},ticks:{type:[Boolean,String],default:!1,validator:t=>"boolean"===typeof t||"always"===t},tickSize:{type:[Number,String],default:2},trackColor:String,trackFillColor:String,value:[Number,String],vertical:Boolean},data:()=>({app:null,oldValue:null,keyPressed:0,isFocused:!1,isActive:!1,noClick:!1}),computed:{classes(){return{...s["a"].options.computed.classes.call(this),"v-input__slider":!0,"v-input__slider--vertical":this.vertical,"v-input__slider--inverse-label":this.inverseLabel}},internalValue:{get(){return this.lazyValue},set(t){t=isNaN(t)?this.minValue:t;const e=this.roundValue(Math.min(Math.max(t,this.minValue),this.maxValue));e!==this.lazyValue&&(this.lazyValue=e,this.$emit("input",e))}},trackTransition(){return this.keyPressed>=2?"none":""},minValue(){return parseFloat(this.min)},maxValue(){return parseFloat(this.max)},stepNumeric(){return this.step>0?parseFloat(this.step):0},inputWidth(){const t=(this.roundValue(this.internalValue)-this.minValue)/(this.maxValue-this.minValue)*100;return t},trackFillStyles(){const t=this.vertical?"bottom":"left",e=this.vertical?"top":"right",i=this.vertical?"height":"width",s=this.$vuetify.rtl?"auto":"0",a=this.$vuetify.rtl?"0":"auto",l=this.disabled?`calc(${this.inputWidth}% - 10px)`:`${this.inputWidth}%`;return{transition:this.trackTransition,[t]:s,[e]:a,[i]:l}},trackStyles(){const t=this.vertical?this.$vuetify.rtl?"bottom":"top":this.$vuetify.rtl?"left":"right",e=this.vertical?"height":"width",i="0px",s=this.disabled?`calc(${100-this.inputWidth}% - 10px)`:`calc(${100-this.inputWidth}%)`;return{transition:this.trackTransition,[t]:i,[e]:s}},showTicks(){return this.tickLabels.length>0||!(this.disabled||!this.stepNumeric||!this.ticks)},numTicks(){return Math.ceil((this.maxValue-this.minValue)/this.stepNumeric)},showThumbLabel(){return!this.disabled&&!(!this.thumbLabel&&!this.$scopedSlots["thumb-label"])},computedTrackColor(){if(!this.disabled)return this.trackColor?this.trackColor:this.isDark?this.validationState:this.validationState||"primary lighten-3"},computedTrackFillColor(){if(!this.disabled)return this.trackFillColor?this.trackFillColor:this.validationState||this.computedColor},computedThumbColor(){return this.thumbColor?this.thumbColor:this.validationState||this.computedColor}},watch:{min(t){const e=parseFloat(t);e>this.internalValue&&this.$emit("input",e)},max(t){const e=parseFloat(t);e<this.internalValue&&this.$emit("input",e)},value:{handler(t){this.internalValue=t}}},beforeMount(){this.internalValue=this.value},mounted(){this.app=document.querySelector("[data-app]")||Object(c["c"])("Missing v-app or a non-body wrapping element with the [data-app] attribute",this)},methods:{genDefaultSlot(){const t=[this.genLabel()],e=this.genSlider();return this.inverseLabel?t.unshift(e):t.push(e),t.push(this.genProgress()),t},genSlider(){return this.$createElement("div",{class:{"v-slider":!0,"v-slider--horizontal":!this.vertical,"v-slider--vertical":this.vertical,"v-slider--focused":this.isFocused,"v-slider--active":this.isActive,"v-slider--disabled":this.disabled,"v-slider--readonly":this.readonly,...this.themeClasses},directives:[{name:"click-outside",value:this.onBlur}],on:{click:this.onSliderClick}},this.genChildren())},genChildren(){return[this.genInput(),this.genTrackContainer(),this.genSteps(),this.genThumbContainer(this.internalValue,this.inputWidth,this.isActive,this.isFocused,this.onThumbMouseDown,this.onFocus,this.onBlur)]},genInput(){return this.$createElement("input",{attrs:{value:this.internalValue,id:this.computedId,disabled:this.disabled,readonly:!0,tabindex:-1,...this.$attrs}})},genTrackContainer(){const t=[this.$createElement("div",this.setBackgroundColor(this.computedTrackColor,{staticClass:"v-slider__track-background",style:this.trackStyles})),this.$createElement("div",this.setBackgroundColor(this.computedTrackFillColor,{staticClass:"v-slider__track-fill",style:this.trackFillStyles}))];return this.$createElement("div",{staticClass:"v-slider__track-container",ref:"track"},t)},genSteps(){if(!this.step||!this.showTicks)return null;const t=parseFloat(this.tickSize),e=Object(o["h"])(this.numTicks+1),i=this.vertical?"bottom":"left",s=this.vertical?"right":"top";this.vertical&&e.reverse();const a=e.map(e=>{const a=this.$vuetify.rtl?this.maxValue-e:e,l=[];this.tickLabels[a]&&l.push(this.$createElement("div",{staticClass:"v-slider__tick-label"},this.tickLabels[a]));const r=e*(100/this.numTicks),n=this.$vuetify.rtl?100-this.inputWidth<r:r<this.inputWidth;return this.$createElement("span",{key:e,staticClass:"v-slider__tick",class:{"v-slider__tick--filled":n},style:{width:`${t}px`,height:`${t}px`,[i]:`calc(${r}% - ${t/2}px)`,[s]:`calc(50% - ${t/2}px)`}},l)});return this.$createElement("div",{staticClass:"v-slider__ticks-container",class:{"v-slider__ticks-container--always-show":"always"===this.ticks||this.tickLabels.length>0}},a)},genThumbContainer(t,e,i,s,a,l,r,n="thumb"){const o=[this.genThumb()],c=this.genThumbLabelContent(t);return this.showThumbLabel&&o.push(this.genThumbLabel(c)),this.$createElement("div",this.setTextColor(this.computedThumbColor,{ref:n,staticClass:"v-slider__thumb-container",class:{"v-slider__thumb-container--active":i,"v-slider__thumb-container--focused":s,"v-slider__thumb-container--show-label":this.showThumbLabel},style:this.getThumbContainerStyles(e),attrs:{role:"slider",tabindex:this.disabled||this.readonly?-1:this.$attrs.tabindex?this.$attrs.tabindex:0,"aria-label":this.label,"aria-valuemin":this.min,"aria-valuemax":this.max,"aria-valuenow":this.internalValue,"aria-readonly":String(this.readonly),"aria-orientation":this.vertical?"vertical":"horizontal",...this.$attrs},on:{focus:l,blur:r,keydown:this.onKeyDown,keyup:this.onKeyUp,touchstart:a,mousedown:a}}),o)},genThumbLabelContent(t){return this.$scopedSlots["thumb-label"]?this.$scopedSlots["thumb-label"]({value:t}):[this.$createElement("span",[String(t)])]},genThumbLabel(t){const e=Object(o["g"])(this.thumbSize),i=this.vertical?`translateY(20%) translateY(${Number(this.thumbSize)/3-1}px) translateX(55%) rotate(135deg)`:"translateY(-20%) translateY(-12px) translateX(-50%) rotate(45deg)";return this.$createElement(a["e"],{props:{origin:"bottom center"}},[this.$createElement("div",{staticClass:"v-slider__thumb-label-container",directives:[{name:"show",value:this.isFocused||this.isActive||"always"===this.thumbLabel}]},[this.$createElement("div",this.setBackgroundColor(this.computedThumbColor,{staticClass:"v-slider__thumb-label",style:{height:e,width:e,transform:i}}),[this.$createElement("div",t)])])])},genThumb(){return this.$createElement("div",this.setBackgroundColor(this.computedThumbColor,{staticClass:"v-slider__thumb"}))},getThumbContainerStyles(t){const e=this.vertical?"top":"left";let i=this.$vuetify.rtl?100-t:t;return i=this.vertical?100-i:i,{transition:this.trackTransition,[e]:`${i}%`}},onThumbMouseDown(t){this.oldValue=this.internalValue,this.keyPressed=2,this.isActive=!0;const e=!o["z"]||{passive:!0,capture:!0},i=!!o["z"]&&{passive:!0};"touches"in t?(this.app.addEventListener("touchmove",this.onMouseMove,i),Object(o["a"])(this.app,"touchend",this.onSliderMouseUp,e)):(this.app.addEventListener("mousemove",this.onMouseMove,i),Object(o["a"])(this.app,"mouseup",this.onSliderMouseUp,e)),this.$emit("start",this.internalValue)},onSliderMouseUp(t){t.stopPropagation(),this.keyPressed=0;const e=!!o["z"]&&{passive:!0};this.app.removeEventListener("touchmove",this.onMouseMove,e),this.app.removeEventListener("mousemove",this.onMouseMove,e),this.$emit("end",this.internalValue),Object(o["j"])(this.oldValue,this.internalValue)||(this.$emit("change",this.internalValue),this.noClick=!0),this.isActive=!1},onMouseMove(t){const{value:e}=this.parseMouseMove(t);this.internalValue=e},onKeyDown(t){if(this.disabled||this.readonly)return;const e=this.parseKeyDown(t,this.internalValue);null!=e&&(this.internalValue=e,this.$emit("change",e))},onKeyUp(){this.keyPressed=0},onSliderClick(t){if(this.noClick)return void(this.noClick=!1);const e=this.$refs.thumb;e.focus(),this.onMouseMove(t),this.$emit("change",this.internalValue)},onBlur(t){this.isFocused=!1,this.$emit("blur",t)},onFocus(t){this.isFocused=!0,this.$emit("focus",t)},parseMouseMove(t){const e=this.vertical?"top":"left",i=this.vertical?"height":"width",s=this.vertical?"clientY":"clientX",{[e]:a,[i]:l}=this.$refs.track.getBoundingClientRect(),r="touches"in t?t.touches[0][s]:t[s];let n=Math.min(Math.max((r-a)/l,0),1)||0;this.vertical&&(n=1-n),this.$vuetify.rtl&&(n=1-n);const o=r>=a&&r<=a+l,c=parseFloat(this.min)+n*(this.maxValue-this.minValue);return{value:c,isInsideTrack:o}},parseKeyDown(t,e){if(this.disabled)return;const{pageup:i,pagedown:s,end:a,home:l,left:r,right:n,down:c,up:h}=o["v"];if(![i,s,a,l,r,n,c,h].includes(t.keyCode))return;t.preventDefault();const u=this.stepNumeric||1,d=(this.maxValue-this.minValue)/u;if([r,n,c,h].includes(t.keyCode)){this.keyPressed+=1;const i=this.$vuetify.rtl?[r,h]:[n,h],s=i.includes(t.keyCode)?1:-1,a=t.shiftKey?3:t.ctrlKey?2:1;e+=s*u*a}else if(t.keyCode===l)e=this.minValue;else if(t.keyCode===a)e=this.maxValue;else{const i=t.keyCode===s?1:-1;e-=i*u*(d>100?d/10:10)}return e},roundValue(t){if(!this.stepNumeric)return t;const e=this.step.toString().trim(),i=e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0,s=this.minValue%this.stepNumeric,a=Math.round((t-s)/this.stepNumeric)*this.stepNumeric+s;return parseFloat(Math.min(a,this.maxValue).toFixed(i))}}})},cc20:function(t,e,i){"use strict";i("8adc");var s=i("58df"),a=i("0789"),l=i("9d26"),r=i("a9ad"),n=i("4e82"),o=i("7560"),c=i("f2e7"),h=i("1c87"),u=i("af2b"),d=i("d9bd");e["a"]=Object(s["a"])(r["a"],u["a"],h["a"],o["a"],Object(n["a"])("chipGroup"),Object(c["b"])("inputValue")).extend({name:"v-chip",props:{active:{type:Boolean,default:!0},activeClass:{type:String,default(){return this.chipGroup?this.chipGroup.activeClass:""}},close:Boolean,closeIcon:{type:String,default:"$delete"},disabled:Boolean,draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:Boolean,outlined:Boolean,pill:Boolean,tag:{type:String,default:"span"},textColor:String,value:null},data:()=>({proxyClass:"v-chip--active"}),computed:{classes(){return{"v-chip":!0,...h["a"].options.computed.classes.call(this),"v-chip--clickable":this.isClickable,"v-chip--disabled":this.disabled,"v-chip--draggable":this.draggable,"v-chip--label":this.label,"v-chip--link":this.isLink,"v-chip--no-color":!this.color,"v-chip--outlined":this.outlined,"v-chip--pill":this.pill,"v-chip--removable":this.hasClose,...this.themeClasses,...this.sizeableClasses,...this.groupClasses}},hasClose(){return Boolean(this.close)},isClickable(){return Boolean(h["a"].options.computed.isClickable.call(this)||this.chipGroup)}},created(){const t=[["outline","outlined"],["selected","input-value"],["value","active"],["@input","@active.sync"]];t.forEach(([t,e])=>{this.$attrs.hasOwnProperty(t)&&Object(d["a"])(t,e,this)})},methods:{click(t){this.$emit("click",t),this.chipGroup&&this.toggle()},genFilter(){const t=[];return this.isActive&&t.push(this.$createElement(l["a"],{staticClass:"v-chip__filter",props:{left:!0}},this.filterIcon)),this.$createElement(a["b"],t)},genClose(){return this.$createElement(l["a"],{staticClass:"v-chip__close",props:{right:!0},on:{click:t=>{t.stopPropagation(),this.$emit("click:close"),this.$emit("update:active",!1)}}},this.closeIcon)},genContent(){return this.$createElement("span",{staticClass:"v-chip__content"},[this.filter&&this.genFilter(),this.$slots.default,this.hasClose&&this.genClose()])}},render(t){const e=[this.genContent()];let{tag:i,data:s}=this.generateRouteLink();s.attrs={...s.attrs,draggable:this.draggable?"true":void 0,tabindex:this.chipGroup&&!this.disabled?0:s.attrs.tabindex},s.directives.push({name:"show",value:this.active}),s=this.setBackgroundColor(this.color,s);const a=this.textColor||this.outlined&&this.color;return t(i,this.setTextColor(a,s),e)}})},f40d:function(t,e,i){"use strict";var s=i("2b0e");e["a"]=s["a"].extend({name:"transitionable",props:{mode:String,origin:String,transition:String}})},ff44:function(t,e,i){}}]);
//# sourceMappingURL=chunk-2dd89cfc.f5d591d7.js.map