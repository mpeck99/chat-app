(function(e){function t(t){for(var n,i,o=t[0],c=t[1],l=t[2],p=0,d=[];p<o.length;p++)i=o[p],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&d.push(r[i][0]),r[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);u&&u(t);while(d.length)d.shift()();return a.push.apply(a,l||[]),s()}function s(){for(var e,t=0;t<a.length;t++){for(var s=a[t],n=!0,o=1;o<s.length;o++){var c=s[o];0!==r[c]&&(n=!1)}n&&(a.splice(t--,1),e=i(i.s=s[0]))}return e}var n={},r={app:0},a=[];function i(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=n,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(s,n,function(t){return e[t]}.bind(null,n));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=c;a.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},4251:function(e,t,s){},"44b9":function(e,t,s){"use strict";s("cb20")},"56d7":function(e,t,s){"use strict";s.r(t);s("e260"),s("e6cf"),s("cca6"),s("a79d");var n=s("2b0e"),r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("router-view")},a=[],i={name:"App",components:{}},o=i,c=(s("5c0b"),s("2877")),l=Object(c["a"])(o,r,a,!1,null,null,null),u=l.exports,p=s("8c4f"),d=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"wrapper wrapper-chat"},[s("div",{staticClass:"inner"},[s("div",{staticClass:"chat-body"},e._l(e.messages,(function(t,n){return s("div",{key:n,staticClass:"chat-bubble",class:t.message.class},[s("span",{staticClass:"name"},[e._v(e._s(t.message.name))]),s("p",[e._v(e._s(t.message.message))])])})),0),e.connectedUsers?s("ul",{staticClass:"users"},e._l(e.connectedUsers,(function(t,n){return s("li",{key:n},[e._v(" "+e._s(t)+" ")])})),0):e._e()]),s("form",{staticClass:"form-wrapper"},[s("div",{staticClass:"typing",class:e.typing?"active":""},[s("span"),s("span"),s("span")]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"message"}},[e._v("Message:")]),s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.message,expression:"message"}],staticClass:"form-control",attrs:{name:"message",id:"message",cols:"30",rows:"10"},domProps:{value:e.message},on:{keyup:e.isTyping,keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:(t.preventDefault(),e.sendMessage(t))},input:function(t){t.target.composing||(e.message=t.target.value)}}})]),s("button",{staticClass:"btn",attrs:{type:"submit",value:"Send"},on:{click:e.sendMessage}},[e._v(" Send ")])])])},m=[],f=(s("b0c0"),s("8e27")),h=s.n(f),v=h()(),g={props:["name","userType","id"],data:function(){return{username:"",type:"",message:"",messages:[],bubbleClass:"",typing:!1,typingContent:"",connectedUsers:[]}},methods:{sendMessage:function(e){var t=document.getElementById("message").value;e.preventDefault(),t&&(v.emit("send",{user:this.type,message:this.message,class:this.bubbleClass,name:this.username}),this.message="");var s=document.querySelector(".inner");s.lastChild.scrollIntoView(),window.scrollTo(0,document.querySelector(".chat-body").scrollHeight)},notTyping:function(){this.typing=!1},isTyping:function(e){e.preventDefault(),v.emit("typing",{typing:!0})},userJoined:function(){v.emit("join",{name:this.username,msg:" has joined the chat."})}},created:function(){var e={};try{e=JSON.parse(localStorage["data"]),this.username=e.name,this.type=e.type}catch(t){}"Agent"==this.type?this.bubbleClass="chat-bubble--agent":this.bubbleClass="chat-bubble--client",v.emit("connected",{name:this.username,type:this.type}),v.emit("waiting",{name:this.username,msg:"You have been placed in the queue."})}},y=g,b=(s("44b9"),Object(c["a"])(y,d,m,!1,null,null,null)),_=b.exports,w=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"wrapper"},[s("h1",[e._v("Chat")]),s("p",[e._v(" Welcome to my chat app. Please enter your name and select a user type and click chat to continue. ")]),s("div",{staticClass:"form-wrapper"},[e._m(0),s("div",{staticClass:"form-group custom-select"},[s("label",{attrs:{for:"user",id:"user"}},[e._v("User type")]),s("button",{staticClass:"select-toggle",attrs:{type:"button","aria-haspopup":"true",id:"type"},on:{click:e.customSelect}},[e._v("Select user type")]),e._m(1)]),e.errorMsgs[0]?s("div",{staticClass:"error-wrapper"},[s("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[s("circle",{attrs:{cx:"12",cy:"12",r:"10"}}),s("line",{attrs:{x1:"12",y1:"8",x2:"12",y2:"12"}}),s("line",{attrs:{x1:"12",y1:"16",x2:"12.01",y2:"16"}})]),s("ul",{staticClass:"errors"},e._l(e.errorMsgs,(function(t,n){return s("li",{key:n},[e._v(e._s(t))])})),0)]):e._e()]),s("input",{staticClass:"btn",attrs:{type:"submit",value:"Chat"},on:{click:e.storeData}})])},C=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"name"}},[e._v("Name")]),s("input",{attrs:{type:"text",name:"name",id:"name"}})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ul",{staticClass:"select",attrs:{role:"listbox","aria-expanded":"false","aria-labelledby":"user"}},[s("li",{attrs:{role:"option",value:"agent",tabindex:"0","aria-selected":"false"}},[e._v("Agent")]),s("li",{attrs:{role:"option",value:"client",tabindex:"0","aria-selected":"false"}},[e._v("Client")])])}],x=s("2909"),k=(s("159b"),{data:function(){return{name:"",userType:"",errorMsgs:[]}},methods:{storeData:function(e){e.preventDefault();var t=document.querySelector("#name").value,s=document.querySelector("#type").textContent;this.errorMsgs=[],null===t||void 0===t||""===t||" "===t?this.errorMsgs.push("Please enter a name"):this.name=t,"Select user type"!=s?this.userType=s:this.errorMsgs.push("Please select a user type."),0==this.errorMsgs.length&&(localStorage["data"]=JSON.stringify({name:this.name,type:this.userType}),"Agent"===this.userType?(this.windowRef=window.open("/agent","",""),this.$router.resolve({path:"/agent"})):(this.windowRef=window.open("/chat","","width=400,height=600,left=200,top=200"),this.$router.resolve({path:"/chat"})))},customSelect:function(){var e=document.querySelector(".select-toggle"),t=document.querySelector(".select"),s=t.children;Object(x["a"])(s).forEach((function(s){s.setAttribute("aria-selected",!1),s.addEventListener("click",(function(){var n=s.textContent;e.textContent=n,this.value=n,"true"!==s.getAttribute("aria-selected")&&s.setAttribute("aria-selected",!0),t.setAttribute("aria-expanded",!1),e.classList.remove("active")}))})),"true"!==t.getAttribute("aria-expanded")?(t.setAttribute("aria-expanded","true"),e.classList.add("active")):(t.setAttribute("aria-expanded",!1),e.classList.remove("active"))}}}),S=k,O=(s("dbc2"),Object(c["a"])(S,w,C,!1,null,null,null)),j=O.exports,M=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"wrapper"},[s("h1",[e._v("Clients in chat")]),s("ul",e._l(e.users,(function(t){return s("li",{key:t.id},[e._v(e._s(t))])})),0)])},A=[],T=h()(),E={data:function(){return{users:[]}},methods:{},created:function(){T.on("users",(function(e){e.forEach((function(t){e.push(t)}))}))}},P=E,$=Object(c["a"])(P,M,A,!1,null,null,null),q=$.exports;n["a"].use(p["a"]),n["a"].config.productionTip=!1;var D=new p["a"]({mode:"history",routes:[{path:"/chat",name:"Chat",component:_,props:!0},{path:"/agent",name:"Agent",component:q,props:!0},{path:"/",name:"Home",component:j}]});new n["a"]({router:D,render:function(e){return e(u)}}).$mount("#app")},"5c0b":function(e,t,s){"use strict";s("9c0c")},"9c0c":function(e,t,s){},cb20:function(e,t,s){},dbc2:function(e,t,s){"use strict";s("4251")}});
//# sourceMappingURL=app.fa865515.js.map