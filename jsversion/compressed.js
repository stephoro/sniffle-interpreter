var sniffle=function(){function n(t){if(null==t)return"NULL";switch(t.type){case LIST_EXP:return"("+t.data.map(n).join(" ")+")";case STR_EXP:return'"'+t.data+'"';case VAR_EXP:return t.data;case CONST_EXP:return t.data+"";case CFUNC_EXP:return"CFUNC_EXP";case FUNC_EXP:return"lambda"}}function t(t){console.log(n(t))}function a(n,t){this.type=n,this.data=t}function r(n,t,r,e,u,l){var o,i,C;return n||(o=e-u,i=u,C=new a(l,r.substr(i,o)),t.data.push(C)),!0}function e(n,t){for(var a,r=t;r<n.length&&(a=n[r++])&&'"'!=a;)"\\"==a&&r+1<n.length&&++r;return r-t}function u(n,t,r){var e,u=r;for(++u;u<t.length&&(e=t[u++])&&e>="0"&&e<="9";);var l=u-r-1;return n.data.push(new a(CONST_EXP,parseInt(t.substr(r,l)))),l-1}function l(n){for(var t,l=new a(LIST_EXP,[]),o=VAR_EXP,i=[],C=0,d=!0,f=0;f<n.length;++f)"("==n[f]?(d=r(d,l,n,f,C,o),i.push(l),t=new a(LIST_EXP,[]),l.data.push(t),l=t):")"==n[f]?(d=r(d,l,n,f,C,o),l=i.pop()):" "==n[f]||"\n"==n[f]||"\t"==n[f]?d=r(d,l,n,f,C,o):d&&(d=!1,C=f,'"'==n[f]?(o=STR_EXP,++C,d=r(d,l,n,f=++f+e(n,f)-1,C,o)):n[f]>="0"&&n[f]<="9"||"-"==n[f]&&f+1<n.length&&n[f+1]>="0"&&n[f+1]<="9"?(o=CONST_EXP,f+=u(l,n,f),d=!0):o=VAR_EXP);return i.length>0?null:l}function o(n){return null==n?null:new a(n.type,n.data)}function i(n,t,a){for(var n=n.slice(),r=0;r<n.length;++r)n[r]=C(n[r],t,a);return n}function C(n,t,r){var e,u,l,i;if(null==n)return null;switch(n.type){case VAR_EXP:return null!=r&&(i=r[n.data])?o(i):null!=t&&(i=t[n.data])?o(i):null;case LIST_EXP:if(null==(e=n.data[0]))break;if(null!=(e=C(e,t,r)))return l=n.data.slice(1),u=new a(LIST_EXP,l),e.type==CFUNC_EXP?e.data(u,t,r):e.type==FUNC_EXP?e.data.exec(u,t):null;break;default:return o(n)}return null}function d(n,t,r){for(var e,u=i(n.data,t,r),l=0,o=0;o<u.length;++o)null!=(e=u[o])&&e.type==CONST_EXP&&(l+=e.data);return new a(CONST_EXP,l)}function f(n,t,r){if(2!=n.data.length)return null;var e=i(n.data,t,r);return e[0]&&e[1]?new a(CONST_EXP,e[0].type==CONST_EXP&&e[1].type==CONST_EXP&&e[0].data>=e[1].data?1:0):null}function E(n,t,r){if(2!=n.data.length)return null;var e=i(n.data,t,r);return e[0]&&e[1]?new a(CONST_EXP,e[0].type==CONST_EXP&&e[1].type==CONST_EXP&&e[0].data>e[1].data?1:0):null}function P(n,t,r){if(2!=n.data.length)return null;var e=i(n.data,t,r);return e[0]&&e[1]?new a(CONST_EXP,e[0].type==CONST_EXP&&e[1].type==CONST_EXP&&e[0].data<e[1].data?1:0):null}function X(n,t,r){if(2!=n.data.length)return null;var e=i(n.data,t,r);return e[0]&&e[1]?new a(CONST_EXP,e[0].type==e[1].type&&e[0].data==e[1].data?1:0):new a(CONST_EXP,e[0]==e[1]?1:0)}function _(n,t,r){if(2!=n.data.length)return null;var e=i(n.data,t,r);return new a(CONST_EXP,e[0].type==CONST_EXP&&e[1].type==CONST_EXP&&e[0].data<=e[1].data?1:0)}function c(n,t,a){var r=i(n.data,t,a);return r[r.length-1]}function N(n,r,e){var u=i(n.data,r,e);return t(new a(LIST_EXP,u)),null}function s(n){return null==n?0:n.type==CONST_EXP?n.data?1:0:1}function h(n,t,a){var r=n.data;return 3!=r.length?null:s(C(r[0],t,a))?C(r[1],t,a):C(r[2],t,a)}function p(n,t){this.prog=t,this.vars=n.data.map(function(n){return n.data}),this.args={}}function w(n,t,r){var e=n.data;if(2!=e.length)return null;var u=e[0].data;if(u.constructor!=[].constructor)return null;for(var l=0;l<u.length;++l)if(u[l].data.constructor!="".constructor)return null;return new a(FUNC_EXP,new p(o(e[0]),o(e[1])))}function v(n,t,a){var r=n.data;if(2!=r.length)return null;var e=r[0].data;return e.constructor!="".constructor?null:(t[e]=C(r[1],t,a),null)}function g(n,t,a){console.log("hi?",n);var r=n.data;if(2!=r.length)return null;var e=r[0].data;return e.constructor!="".constructor?null:(a[e]=C(r[1],t,a),null)}function S(n,t,r){for(var e=n.data,u=0,l=0;u<e.length&&0==(l=s(C(e[u],t,r)));)++u;return new a(CONST_EXP,l)}function T(n,t,r){for(var e=n.data,u=0,l=1;u<e.length&&1==(l=s(C(e[u],t,r)));)++u;return new a(CONST_EXP,l)}function O(n,t,a){var r=n.data,e=null,u=r[0];for(r=r.slice(1);1==s(C(u,t,a));)e=(e=i(n.data,t,a))[e.length-1];return e}function U(n,t,r){for(var e,u=i(n.data,t,r),l=0,o=n.data.length>1,C=0;C<u.length;++C)null!=(e=u[C])&&e.type==CONST_EXP&&(o?(l+=e.data,o=!1):l-=e.data);return new a(CONST_EXP,l)}function F(n,t,r){for(var e,u=i(n.data,t,r),l=1,o=0;o<u.length;++o)null!=(e=u[o])&&e.type==CONST_EXP&&(l*=e.data);return new a(CONST_EXP,l)}function y(n,t,r){for(var e,u=i(n.data,t,r),l=0,o=n.data.length>1,C=0;C<u.length;++C){if(null!=(e=u[C])&&e.type==CONST_EXP)if(o)l=e.data,o=!1;else{if(0==e.data)return null;l/=e.data}l|=0}return new a(CONST_EXP,l)}function m(n){for(var r=l(n),e={or:new a(CFUNC_EXP,S),and:new a(CFUNC_EXP,T),if:new a(CFUNC_EXP,h),local:new a(CFUNC_EXP,g),set:new a(CFUNC_EXP,v),lambda:new a(CFUNC_EXP,w),pprint:new a(CFUNC_EXP,N),begin:new a(CFUNC_EXP,c),while:new a(CFUNC_EXP,O),"+":new a(CFUNC_EXP,d),"-":new a(CFUNC_EXP,U),"*":new a(CFUNC_EXP,F),"/":new a(CFUNC_EXP,y),">":new a(CFUNC_EXP,E),"=":new a(CFUNC_EXP,X),"<":new a(CFUNC_EXP,P),">=":new a(CFUNC_EXP,f),"<=":new a(CFUNC_EXP,_)},u=0;u<r.data.length;++u)temp=r.data[u],t(temp),temp=C(temp,e,null),t(temp)}var b=0;return global=window,"LIST_EXP, STR_EXP, VAR_EXP, CONST_EXP, CFUNC_EXP, FUNC_EXP".split(",").map(function(n){n=n.trim(),global[n]=b++}),p.prototype.exec=function(n,t){var a=this.args;vals=i(n.data,t,a);for(var r=Math.min(vals.length,this.vars.length),e=0;e<r;++e)a[this.vars[e]]=vals[e];return C(this.prog,t,a)},{run:m,parse:l}}();run("(+ 1 (+ 2 3) )");