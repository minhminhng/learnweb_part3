(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{39:function(t,n,e){"use strict";e.r(n);var c=e(15),r=e.n(c),o=e(6),a=e(4),i=e(2),u=e(0),s=function(t){var n=t.note,e=t.toggleImportance,c=n.important?"make not important":"make important";return Object(u.jsxs)("li",{children:[n.content,Object(u.jsx)("button",{onClick:e,children:c})]})},f=e(3),j=e.n(f),l="/api/notes",d=function(){return j.a.get(l).then((function(t){return t.data}))},b=function(t){return j.a.post(l,t).then((function(t){return t.data}))},h=function(t,n){return j.a.put("".concat(l,"/").concat(t),n).then((function(t){return t.data}))},p=function(){var t=Object(i.useState)([]),n=Object(a.a)(t,2),e=n[0],c=n[1],r=Object(i.useState)(),f=Object(a.a)(r,2),j=f[0],l=f[1],p=Object(i.useState)(!0),O=Object(a.a)(p,2),m=O[0],g=O[1];Object(i.useEffect)((function(){console.log("effect"),d().then((function(t){c(t)}))}),[]),console.log("render",e.length,"notes");var v=m?e:e.filter((function(t){return!0===t.important}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Notes"}),Object(u.jsx)("div",{children:Object(u.jsxs)("button",{onClick:function(){return g(!m)},children:["show ",m?"important":"all"]})}),Object(u.jsx)("ul",{children:v.map((function(t){return Object(u.jsx)(s,{note:t,toggleImportance:function(){return function(t){var n=e.find((function(n){return n.id===t})),r=Object(o.a)(Object(o.a)({},n),{},{important:!n.important});h(t,r).then((function(n){c(e.map((function(e){return e.id!==t?e:n})))})).catch((function(r){alert("the note '".concat(n.content,"' was already deleted from server")),c(e.filter((function(n){return n.id!==t})))}))}(t.id)}},t.id)}))}),Object(u.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={content:j,date:(new Date).toISOString(),important:Math.random()<.5,id:e.length+1};b(n).then((function(t){c(e.concat(t)),l("")}))},children:[Object(u.jsx)("input",{value:j,onChange:function(t){l(t.target.value)}}),Object(u.jsx)("button",{type:"submit",children:"save"})]})]})};r.a.render(Object(u.jsx)(p,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.15a4e718.chunk.js.map