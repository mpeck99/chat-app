(function(e){function t(t){for(var n,i,o=t[0],c=t[1],l=t[2],p=0,d=[];p<o.length;p++)i=o[p],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&d.push(a[i][0]),a[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);u&&u(t);while(d.length)d.shift()();return r.push.apply(r,l||[]),s()}function s(){for(var e,t=0;t<r.length;t++){for(var s=r[t],n=!0,o=1;o<s.length;o++){var c=s[o];0!==a[c]&&(n=!1)}n&&(r.splice(t--,1),e=i(i.s=s[0]))}return e}var n={},a={app:0},r=[];function i(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=n,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(s,n,function(t){return e[t]}.bind(null,n));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=c;r.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"0c82":function(e,t,s){"use strict";s("35fe")},1340:function(e,t,s){"use strict";s("595d")},"35fe":function(e,t,s){},"56d7":function(e,t,s){"use strict";s.r(t);s("e260"),s("e6cf"),s("cca6"),s("a79d");var n=s("2b0e"),a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("router-view")},r=[],i={name:"App",components:{}},o=i,c=(s("5c0b"),s("2877")),l=Object(c["a"])(o,a,r,!1,null,null,null),u=l.exports,p=s("8c4f"),d=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"wrapper wrapper-chat"},[s("div",{staticClass:"chat-body"},e._l(e.messages,(function(t,n){return s("div",{key:n,staticClass:"chat-bubble",class:t.class},[t.message.name?s("span",{staticClass:"name"},[e._v(e._s(t.message.name))]):e._e(),t.message.message?s("p",[e._v(e._s(t.message.message))]):s("p",[e._v(e._s(t.message))])])})),0),s("form",{staticClass:"form-wrapper"},[s("div",{staticClass:"typing",class:e.typing?"active":""},[s("span"),s("span"),s("span")]),s("div",{staticClass:"form-group"},[s("label",{staticClass:"sr-only",attrs:{for:"message"}},[e._v("Message:")]),s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.message,expression:"message"}],staticClass:"form-control",attrs:{name:"message",id:"message",cols:"30",rows:"10"},domProps:{value:e.message},on:{keyup:e.isTyping,keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:(t.preventDefault(),e.sendMessage(t))},input:function(t){t.target.composing||(e.message=t.target.value)}}}),s("button",{staticClass:"btn",attrs:{type:"submit",value:"Send"},on:{click:e.sendMessage,keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.sendMessage(t)}}},[e._v(" Send ")])])])])},m=[],g=(s("b0c0"),s("8e27")),h=s.n(g),f=h()(),y={props:["name","userType","id"],data:function(){return{username:"",type:"",message:"",messages:[],bubbleClass:"",typing:!1,typingContent:"",connectedUsers:[]}},methods:{sendMessage:function(e){var t=document.getElementById("message").value;e.preventDefault(),t&&(f.emit("send",{socket:f.id,message:this.message,class:"chat-bubble--client",name:this.username,type:this.type}),this.message="");var s=document.querySelector(".inner");s.lastChild.scrollIntoView(),window.scrollTo(0,document.querySelector(".chat-body").scrollHeight)},notTyping:function(){this.typing=!1},isTyping:function(e){e.preventDefault(),f.emit("clientTyping",{typing:!0,agent:f.id})},userJoined:function(){f.emit("join",{name:this.username,msg:" has joined the chat."})}},created:function(){var e=this,t={};try{t=JSON.parse(localStorage["data"]),this.username=t.name,this.type=t.type}catch(s){}f.on("message",(function(t){"Agent"==t.type?e.bubbleClass="chat-bubble--agent":e.bubbleClass="chat-bubble--client",e.messages.push({message:t,user:e.type,class:e.bubbleClass})})),f.on("agentTyping",(function(t){var s;e.typing=t.typing,clearTimeout(s),s=setTimeout(e.notTyping,2e3)})),f.on("connect",(function(t){f.on("join",(function(t){e.connectedUsers.push(t);var s={message:e.username+" is in the queue",class:"disclaimer",user:e.type};e.messages.push(s);var n={id:f.id,name:e.username};f.emit("usersConnected",n)})),f.on("agentJoin",(function(t){var s={message:"Agent has joined the chat.",class:"disclaimer",user:e.type};e.messages.push(s),console.log(t)})),f.emit("join",t)})),f.on("disconnected",(function(){e.messages.push({message:"Agent disconnected",class:"disclaimer"})})),f.emit("users",{name:this.username,type:this.type})},watch:{messages:function(){var e=document.querySelector(".chat-body");setTimeout((function(){e.scrollTop=e.scrollHeight}),10)}}},v=y,b=(s("0c82"),Object(c["a"])(v,d,m,!1,null,"3a977dfa",null)),k=b.exports,C=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"wrapper"},[s("div",{staticClass:"inner"},[s("h1",[e._v("Chat")]),s("p",[e._v(" Welcome to my chat app. Please enter your name and select a user type and click chat to continue. ")]),e._m(0),s("div",{staticClass:"fieldset fieldset--radio"},[s("legend",[e._v("Who are you?")]),s("div",{staticClass:"form-group form-group--radio checked"},[s("label",{attrs:{for:"client"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"radio",id:"client",name:"type",value:"client"},domProps:{checked:e._q(e.checked,"client")},on:{click:e.addChecked,change:function(t){e.checked="client"}}}),e._v(" Client ")])]),s("div",{staticClass:"form-group form-group--radio",attrs:{id:"type"}},[s("label",{attrs:{for:"agent"}},[s("input",{attrs:{type:"radio",id:"agent",name:"type",value:"agent"},on:{click:e.addChecked}}),e._v(" Agent ")])])]),e.errorMsgs[0]?s("div",{staticClass:"error-wrapper"},[s("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[s("circle",{attrs:{cx:"12",cy:"12",r:"10"}}),s("line",{attrs:{x1:"12",y1:"8",x2:"12",y2:"12"}}),s("line",{attrs:{x1:"12",y1:"16",x2:"12.01",y2:"16"}})]),s("ul",{staticClass:"errors"},e._l(e.errorMsgs,(function(t,n){return s("li",{key:n},[e._v(e._s(t))])})),0)]):e._e(),s("input",{staticClass:"btn",attrs:{type:"submit",value:"Chat"},on:{click:e.storeData,keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.storeData(t)}}})])])},_=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"name"}},[e._v("Name")]),s("input",{attrs:{type:"text",name:"name",id:"name"}})])}],w=(s("159b"),{data:function(){return{name:"",userType:"",errorMsgs:[],checked:"client"}},methods:{storeData:function(e){e.preventDefault();var t=document.querySelector("#name").value;this.errorMsgs=[],null===t||void 0===t||""===t||" "===t?this.errorMsgs.push("Please enter a name"):this.name=t,0==this.errorMsgs.length&&(localStorage["data"]=JSON.stringify({name:this.name,type:this.userType}),"agent"===this.userType?(this.windowRef=window.open("/agent","","width=900,height=600"),this.$router.resolve({path:"/agent"})):(this.windowRef=window.open("/chat","","width=400,height=600"),this.$router.resolve({path:"/chat"})))},addChecked:function(e){var t=e.target,s=t.parentElement.parentElement,n=document.querySelectorAll('input[type="radio"]');t.checked&&(s.classList.contains("checked")||(s.classList.add("checked"),this.userType=t.value,n.forEach((function(e){e!=t&&e.parentElement.parentElement.classList.remove("checked")}))))}}}),T=w,x=(s("8270"),Object(c["a"])(T,C,_,!1,null,"a4df7690",null)),j=x.exports,O=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"wrapper wrapper-agent"},[s("div",{staticClass:"sidebar",on:{click:e.grow}},[s("h1",[e._v("Clients in chat: "),s("span",[e._v(e._s(e.users.length))])]),s("ul",{staticClass:"client-list"},e._l(e.users,(function(t){return s("li",{key:t.id},[s("button",{staticClass:"btn-user",attrs:{type:"button",id:"client"+t.id},on:{click:function(s){return e.joinChat(t.id)}}},[e._v(" "+e._s(t.name)+" ")])])})),0)]),s("div",{staticClass:"chat-wrapper"},[s("div",{staticClass:"chat-body"},e._l(e.messages,(function(t,n){return s("div",{key:n,staticClass:"chat-bubble",class:t.message.class?t.message.class:t.class},[t.message.name?s("span",{staticClass:"name"},[e._v(e._s(t.message.name))]):e._e(),t.message.message?s("p",[e._v(e._s(t.message.message))]):s("p",[e._v(e._s(t.message))])])})),0),s("form",{staticClass:"form-wrapper"},[s("div",{staticClass:"typing",class:e.typing?"active":""},[s("span"),s("span"),s("span")]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"message"}},[e._v("Message:")]),s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.message,expression:"message"}],staticClass:"form-control",attrs:{name:"message",id:"message",cols:"30",rows:"10"},domProps:{value:e.message},on:{keyup:e.isTyping,keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:(t.preventDefault(),e.sendMessage(t))},input:function(t){t.target.composing||(e.message=t.target.value)}}})]),s("button",{staticClass:"btn",attrs:{type:"submit",value:"Send"},on:{click:e.sendMessage,keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.sendMessage(t)}}},[e._v(" Send ")])])])])},S=[],M={data:function(){return{users:[],socket:h()(),username:"",type:"",message:"",messages:[],bubbleClass:"",typing:!1,typingContent:"",connectedUser:"",user:""}},methods:{joinChat:function(e){this.messages=[];var t=document.querySelectorAll(".btn-user"),s=document.querySelector("#client"+e);s.classList.contains("active")?t.forEach((function(e){e.classList.remove("active")})):s.classList.add("active");var n={message:"Chat started. Type message to begin.",class:"disclaimer"};this.messages.push(n),this.connectedUser="";var a={user:e,agentId:this.socket.id};this.socket.emit("agent",a),this.connectedUser=e},sendMessage:function(e){var t=document.getElementById("message").value;e.preventDefault(),t&&(this.socket.emit("send",{user:this.connectedUser,agent:this.socket.id,message:this.message,class:"chat-bubble--agent",type:"Agent",name:"Agent"}),this.message="")},notTyping:function(){this.typing=!1},isTyping:function(e){e.preventDefault(),this.socket.emit("agentTyping",{typing:!0,user:this.connectedUser})},grow:function(){var e=document.querySelector(".sidebar");window.innerWidth<767&&(e.classList.contains("active")?(e.classList.add("close"),setTimeout((function(){e.classList.remove("active"),e.classList.remove("close")}),1e3)):e.classList.add("active"))}},created:function(){var e=this;this.socket.on("connected",(function(t){for(var s=0;s<t.length;s++)e.users.push(t[s])})),this.socket.on("join",(function(t){for(var s=0;s<t.length;s++)e.users.push(t[s])})),this.socket.on("message",(function(t){e.bubbleClass="chat-bubble--client",e.messages.push({message:t,user:t.type,class:e.bubbleClass})})),this.socket.on("clientTyping",(function(t){var s;e.typing=t.typing,clearTimeout(s),s=setTimeout(e.notTyping,2e3)})),this.socket.on("disconnected",(function(t){e.messages.push({message:"Client disconnected",class:"disclaimer"}),e.users.pop(t)}))},watch:{messages:function(){var e=document.querySelector(".chat-body");setTimeout((function(){e.scrollTop=e.scrollHeight}),10)},users:function(){var e=this;this.socket.on("usersReload",(function(t){e.users.push(t)}))}}},E=M,P=(s("1340"),Object(c["a"])(E,O,S,!1,null,"727b31fa",null)),q=P.exports;n["a"].use(p["a"]),n["a"].config.productionTip=!1;var L=new p["a"]({mode:"history",routes:[{path:"/chat",name:"Chat",component:k,props:!0},{path:"/agent",name:"Agent",component:q,props:!0},{path:"/",name:"Home",component:j}]});new n["a"]({router:L,render:function(e){return e(u)}}).$mount("#app")},"595d":function(e,t,s){},"5c0b":function(e,t,s){"use strict";s("9c0c")},8270:function(e,t,s){"use strict";s("d553")},"9c0c":function(e,t,s){},d553:function(e,t,s){}});
//# sourceMappingURL=app.73a592f4.js.map