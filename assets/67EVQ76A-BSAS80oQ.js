var bs=Object.defineProperty;var ps=(e,t,n)=>t in e?bs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var _e=(e,t,n)=>ps(e,typeof t!="symbol"?t+"":t,n);import{h as xe,i as z,o as Ft,j as U,d as D,e as m,P as qo,S as B,t as _,k,l as V,n as F,p as ws,r as rr,u as $e,s as j,v as Vn,w as Gn,x as ut,y as A,z as xs,A as an,B as Ne,C as $s,D as _t,E as zt,F as Cs,G as Ss,H as xn,I as ks,J as Kr,K as Kt,$ as Ro,L as Es,M as Ds,N as W,O as Br,Q as Ms,R as As,T as or,U as Fs,V as Ts,W as Rn,X as Is,Y as Ps,Z as oe,_ as Ls,a0 as Os}from"./index-CqsA9Vvo.js";var _s=e=>e!=null,qs=e=>e.filter(_s);function Rs(e){return(...t)=>{for(const n of e)n&&n(...t)}}var E=e=>typeof e=="function"&&!e.length?e():e,Hn=e=>Array.isArray(e)?e:e?[e]:[];function zs(e,...t){return typeof e=="function"?e(...t):e}var Ks=j;function Bs(e,t,n,r){const o=e.length,s=t.length;let l=0;if(!s){for(;l<o;l++)n(e[l]);return}if(!o){for(;l<s;l++)r(t[l]);return}for(;l<s&&t[l]===e[l];l++);let a,i;t=t.slice(l),e=e.slice(l);for(a of t)e.includes(a)||r(a);for(i of e)t.includes(i)||n(i)}function Ns(e){const[t,n]=z(),r=e!=null&&e.throw?(u,d)=>{throw n(u instanceof Error?u:new Error(d)),u}:(u,d)=>{n(u instanceof Error?u:new Error(d))},o=e!=null&&e.api?Array.isArray(e.api)?e.api:[e.api]:[globalThis.localStorage].filter(Boolean),s=e!=null&&e.prefix?`${e.prefix}.`:"",l=new Map,a=new Proxy({},{get(u,d){let h=l.get(d);h||(h=z(void 0,{equals:!1}),l.set(d,h)),h[0]();const y=o.reduce((v,b)=>{if(v!==null||!b)return v;try{return b.getItem(`${s}${d}`)}catch(p){return r(p,`Error reading ${s}${d} from ${b.name}`),null}},null);return y!==null&&(e!=null&&e.deserializer)?e.deserializer(y,d,e.options):y}}),i=(u,d,h)=>{const y=e!=null&&e.serializer?e.serializer(d,u,h??e.options):d,v=`${s}${u}`;o.forEach(p=>{try{p.getItem(v)!==y&&p.setItem(v,y)}catch(w){r(w,`Error setting ${s}${u} to ${y} in ${p.name}`)}});const b=l.get(u);b&&b[1]()},c=u=>o.forEach(d=>{try{d.removeItem(`${s}${u}`)}catch(h){r(h,`Error removing ${s}${u} from ${d.name}`)}}),f=()=>o.forEach(u=>{try{u.clear()}catch(d){r(d,`Error clearing ${u.name}`)}}),g=()=>{const u={},d=(h,y)=>{if(!u.hasOwnProperty(h)){const v=y&&(e!=null&&e.deserializer)?e.deserializer(y,h,e.options):y;v&&(u[h]=v)}};return o.forEach(h=>{if(typeof h.getAll=="function"){let y;try{y=h.getAll()}catch(v){r(v,`Error getting all values from in ${h.name}`)}for(const v of y)d(v,y[v])}else{let y=0,v;try{for(;v=h.key(y++);)u.hasOwnProperty(v)||d(v,h.getItem(v))}catch(b){r(b,`Error getting all values from ${h.name}`)}}}),u};return(e==null?void 0:e.sync)!==!1&&Ft(()=>{const u=d=>{var y;let h=!1;o.forEach(v=>{try{v!==d.storageArea&&d.key&&d.newValue!==v.getItem(d.key)&&(d.newValue?v.setItem(d.key,d.newValue):v.removeItem(d.key),h=!0)}catch(b){r(b,`Error synching api ${v.name} from storage event (${d.key}=${d.newValue})`)}}),h&&d.key&&((y=l.get(d.key))==null||y[1]())};"addEventListener"in globalThis?(globalThis.addEventListener("storage",u),j(()=>globalThis.removeEventListener("storage",u))):(o.forEach(d=>{var h;return(h=d.addEventListener)==null?void 0:h.call(d,"storage",u)}),j(()=>o.forEach(d=>{var h;return(h=d.removeEventListener)==null?void 0:h.call(d,"storage",u)})))}),[a,i,{clear:f,error:t,remove:c,toJSON:g}]}var n0=Ns,Us=e=>(typeof e.clear=="function"||(e.clear=()=>{let t;for(;t=e.key(0);)e.removeItem(t)}),e),Nr=e=>{if(!e)return"";let t="";for(const n in e){if(!e.hasOwnProperty(n))continue;const r=e[n];t+=r instanceof Date?`; ${n}=${r.toUTCString()}`:typeof r=="boolean"?`; ${n}`:`; ${n}=${r}`}return t},qe=Us({_cookies:[globalThis.document,"cookie"],getItem:e=>{var t;return((t=qe._cookies[0][qe._cookies[1]].match("(^|;)\\s*"+e+"\\s*=\\s*([^;]+)"))==null?void 0:t.pop())??null},setItem:(e,t,n)=>{const r=qe.getItem(e);qe._cookies[0][qe._cookies[1]]=`${e}=${t}${Nr(n)}`;const o=Object.assign(new Event("storage"),{key:e,oldValue:r,newValue:t,url:globalThis.document.URL,storageArea:qe});window.dispatchEvent(o)},removeItem:e=>{qe._cookies[0][qe._cookies[1]]=`${e}=deleted${Nr({expires:new Date(0)})}`},key:e=>{let t=null,n=0;return qe._cookies[0][qe._cookies[1]].replace(/(?:^|;)\s*(.+?)\s*=\s*[^;]+/g,(r,o)=>(!t&&o&&n++===e&&(t=o),"")),t},get length(){let e=0;return qe._cookies[0][qe._cookies[1]].replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g,t=>(e+=t?1:0,"")),e}}),Vs=1024,Dt=796,ir=700,Gs="bottom-right",jn="bottom",r0="system",Hs=!1,zo=500,js=500,Ko=500,Ws=Object.keys(Vn)[0],Ur=1,Qs=Object.keys(Gn)[0],Ys=xe({client:void 0,onlineManager:void 0,queryFlavor:"",version:"",shadowDOMTarget:void 0});function K(){return $e(Ys)}var Bo=xe(void 0),o0=e=>{const[t,n]=z(null),r=()=>{const l=t();l!=null&&(l.close(),n(null))},o=(l,a)=>{if(t()!=null)return;const i=window.open("","TSQD-Devtools-Panel",`width=${l},height=${a},popup`);if(!i)throw new Error("Failed to open popup. Please allow popups for this site to view the devtools in picture-in-picture mode.");i.document.head.innerHTML="",i.document.body.innerHTML="",ws(i.document),i.document.title="TanStack Query Devtools",i.document.body.style.margin="0",i.addEventListener("pagehide",()=>{e.setLocalStore("pip_open","false"),n(null)}),[...(K().shadowDOMTarget||document).styleSheets].forEach(c=>{try{const f=[...c.cssRules].map(h=>h.cssText).join(""),g=document.createElement("style"),u=c.ownerNode;let d="";u&&"id"in u&&(d=u.id),d&&g.setAttribute("id",d),g.textContent=f,i.document.head.appendChild(g)}catch{const g=document.createElement("link");if(c.href==null)return;g.rel="stylesheet",g.type=c.type,g.media=c.media.toString(),g.href=c.href,i.document.head.appendChild(g)}}),rr(["focusin","focusout","pointermove","keydown","pointerdown","pointerup","click","mousedown","input"],i.document),e.setLocalStore("pip_open","true"),n(i)};U(()=>{(e.localStore.pip_open??"false")==="true"&&!e.disabled&&o(Number(window.innerWidth),Number(e.localStore.height||js))}),U(()=>{const l=(K().shadowDOMTarget||document).querySelector("#_goober"),a=t();if(l&&a){const i=new MutationObserver(()=>{const c=(K().shadowDOMTarget||a.document).querySelector("#_goober");c&&(c.textContent=l.textContent)});i.observe(l,{childList:!0,subtree:!0,characterDataOldValue:!0}),j(()=>{i.disconnect()})}});const s=D(()=>({pipWindow:t(),requestPipWindow:o,closePipWindow:r,disabled:e.disabled??!1}));return m(Bo.Provider,{value:s,get children(){return e.children}})},sr=()=>D(()=>{const t=$e(Bo);if(!t)throw new Error("usePiPWindow must be used within a PiPProvider");return t()}),Xs=xe(()=>"dark");function pe(){return $e(Xs)}var No={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",Ấ:"A",Ắ:"A",Ẳ:"A",Ẵ:"A",Ặ:"A",Æ:"AE",Ầ:"A",Ằ:"A",Ȃ:"A",Ç:"C",Ḉ:"C",È:"E",É:"E",Ê:"E",Ë:"E",Ế:"E",Ḗ:"E",Ề:"E",Ḕ:"E",Ḝ:"E",Ȇ:"E",Ì:"I",Í:"I",Î:"I",Ï:"I",Ḯ:"I",Ȋ:"I",Ð:"D",Ñ:"N",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",Ố:"O",Ṍ:"O",Ṓ:"O",Ȏ:"O",Ù:"U",Ú:"U",Û:"U",Ü:"U",Ý:"Y",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",ấ:"a",ắ:"a",ẳ:"a",ẵ:"a",ặ:"a",æ:"ae",ầ:"a",ằ:"a",ȃ:"a",ç:"c",ḉ:"c",è:"e",é:"e",ê:"e",ë:"e",ế:"e",ḗ:"e",ề:"e",ḕ:"e",ḝ:"e",ȇ:"e",ì:"i",í:"i",î:"i",ï:"i",ḯ:"i",ȋ:"i",ð:"d",ñ:"n",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",ố:"o",ṍ:"o",ṓ:"o",ȏ:"o",ù:"u",ú:"u",û:"u",ü:"u",ý:"y",ÿ:"y",Ā:"A",ā:"a",Ă:"A",ă:"a",Ą:"A",ą:"a",Ć:"C",ć:"c",Ĉ:"C",ĉ:"c",Ċ:"C",ċ:"c",Č:"C",č:"c",C̆:"C",c̆:"c",Ď:"D",ď:"d",Đ:"D",đ:"d",Ē:"E",ē:"e",Ĕ:"E",ĕ:"e",Ė:"E",ė:"e",Ę:"E",ę:"e",Ě:"E",ě:"e",Ĝ:"G",Ǵ:"G",ĝ:"g",ǵ:"g",Ğ:"G",ğ:"g",Ġ:"G",ġ:"g",Ģ:"G",ģ:"g",Ĥ:"H",ĥ:"h",Ħ:"H",ħ:"h",Ḫ:"H",ḫ:"h",Ĩ:"I",ĩ:"i",Ī:"I",ī:"i",Ĭ:"I",ĭ:"i",Į:"I",į:"i",İ:"I",ı:"i",Ĳ:"IJ",ĳ:"ij",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",Ḱ:"K",ḱ:"k",K̆:"K",k̆:"k",Ĺ:"L",ĺ:"l",Ļ:"L",ļ:"l",Ľ:"L",ľ:"l",Ŀ:"L",ŀ:"l",Ł:"l",ł:"l",Ḿ:"M",ḿ:"m",M̆:"M",m̆:"m",Ń:"N",ń:"n",Ņ:"N",ņ:"n",Ň:"N",ň:"n",ŉ:"n",N̆:"N",n̆:"n",Ō:"O",ō:"o",Ŏ:"O",ŏ:"o",Ő:"O",ő:"o",Œ:"OE",œ:"oe",P̆:"P",p̆:"p",Ŕ:"R",ŕ:"r",Ŗ:"R",ŗ:"r",Ř:"R",ř:"r",R̆:"R",r̆:"r",Ȓ:"R",ȓ:"r",Ś:"S",ś:"s",Ŝ:"S",ŝ:"s",Ş:"S",Ș:"S",ș:"s",ş:"s",Š:"S",š:"s",Ţ:"T",ţ:"t",ț:"t",Ț:"T",Ť:"T",ť:"t",Ŧ:"T",ŧ:"t",T̆:"T",t̆:"t",Ũ:"U",ũ:"u",Ū:"U",ū:"u",Ŭ:"U",ŭ:"u",Ů:"U",ů:"u",Ű:"U",ű:"u",Ų:"U",ų:"u",Ȗ:"U",ȗ:"u",V̆:"V",v̆:"v",Ŵ:"W",ŵ:"w",Ẃ:"W",ẃ:"w",X̆:"X",x̆:"x",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Y̆:"Y",y̆:"y",Ź:"Z",ź:"z",Ż:"Z",ż:"z",Ž:"Z",ž:"z",ſ:"s",ƒ:"f",Ơ:"O",ơ:"o",Ư:"U",ư:"u",Ǎ:"A",ǎ:"a",Ǐ:"I",ǐ:"i",Ǒ:"O",ǒ:"o",Ǔ:"U",ǔ:"u",Ǖ:"U",ǖ:"u",Ǘ:"U",ǘ:"u",Ǚ:"U",ǚ:"u",Ǜ:"U",ǜ:"u",Ứ:"U",ứ:"u",Ṹ:"U",ṹ:"u",Ǻ:"A",ǻ:"a",Ǽ:"AE",ǽ:"ae",Ǿ:"O",ǿ:"o",Þ:"TH",þ:"th",Ṕ:"P",ṕ:"p",Ṥ:"S",ṥ:"s",X́:"X",x́:"x",Ѓ:"Г",ѓ:"г",Ќ:"К",ќ:"к",A̋:"A",a̋:"a",E̋:"E",e̋:"e",I̋:"I",i̋:"i",Ǹ:"N",ǹ:"n",Ồ:"O",ồ:"o",Ṑ:"O",ṑ:"o",Ừ:"U",ừ:"u",Ẁ:"W",ẁ:"w",Ỳ:"Y",ỳ:"y",Ȁ:"A",ȁ:"a",Ȅ:"E",ȅ:"e",Ȉ:"I",ȉ:"i",Ȍ:"O",ȍ:"o",Ȑ:"R",ȑ:"r",Ȕ:"U",ȕ:"u",B̌:"B",b̌:"b",Č̣:"C",č̣:"c",Ê̌:"E",ê̌:"e",F̌:"F",f̌:"f",Ǧ:"G",ǧ:"g",Ȟ:"H",ȟ:"h",J̌:"J",ǰ:"j",Ǩ:"K",ǩ:"k",M̌:"M",m̌:"m",P̌:"P",p̌:"p",Q̌:"Q",q̌:"q",Ř̩:"R",ř̩:"r",Ṧ:"S",ṧ:"s",V̌:"V",v̌:"v",W̌:"W",w̌:"w",X̌:"X",x̌:"x",Y̌:"Y",y̌:"y",A̧:"A",a̧:"a",B̧:"B",b̧:"b",Ḑ:"D",ḑ:"d",Ȩ:"E",ȩ:"e",Ɛ̧:"E",ɛ̧:"e",Ḩ:"H",ḩ:"h",I̧:"I",i̧:"i",Ɨ̧:"I",ɨ̧:"i",M̧:"M",m̧:"m",O̧:"O",o̧:"o",Q̧:"Q",q̧:"q",U̧:"U",u̧:"u",X̧:"X",x̧:"x",Z̧:"Z",z̧:"z"},Zs=Object.keys(No).join("|"),Js=new RegExp(Zs,"g");function el(e){return e.replace(Js,t=>No[t])}var Fe={CASE_SENSITIVE_EQUAL:7,EQUAL:6,STARTS_WITH:5,WORD_STARTS_WITH:4,CONTAINS:3,ACRONYM:2,MATCHES:1,NO_MATCH:0};function Vr(e,t,n){var r;if(n=n||{},n.threshold=(r=n.threshold)!=null?r:Fe.MATCHES,!n.accessors){const l=Gr(e,t,n);return{rankedValue:e,rank:l,accessorIndex:-1,accessorThreshold:n.threshold,passed:l>=n.threshold}}const o=ol(e,n.accessors),s={rankedValue:e,rank:Fe.NO_MATCH,accessorIndex:-1,accessorThreshold:n.threshold,passed:!1};for(let l=0;l<o.length;l++){const a=o[l];let i=Gr(a.itemValue,t,n);const{minRanking:c,maxRanking:f,threshold:g=n.threshold}=a.attributes;i<c&&i>=Fe.MATCHES?i=c:i>f&&(i=f),i=Math.min(i,f),i>=g&&i>s.rank&&(s.rank=i,s.passed=!0,s.accessorIndex=l,s.accessorThreshold=g,s.rankedValue=a.itemValue)}return s}function Gr(e,t,n){return e=Hr(e,n),t=Hr(t,n),t.length>e.length?Fe.NO_MATCH:e===t?Fe.CASE_SENSITIVE_EQUAL:(e=e.toLowerCase(),t=t.toLowerCase(),e===t?Fe.EQUAL:e.startsWith(t)?Fe.STARTS_WITH:e.includes(` ${t}`)?Fe.WORD_STARTS_WITH:e.includes(t)?Fe.CONTAINS:t.length===1?Fe.NO_MATCH:tl(e).includes(t)?Fe.ACRONYM:nl(e,t))}function tl(e){let t="";return e.split(" ").forEach(r=>{r.split("-").forEach(s=>{t+=s.substr(0,1)})}),t}function nl(e,t){let n=0,r=0;function o(i,c,f){for(let g=f,u=c.length;g<u;g++)if(c[g]===i)return n+=1,g+1;return-1}function s(i){const c=1/i,f=n/t.length;return Fe.MATCHES+f*c}const l=o(t[0],e,0);if(l<0)return Fe.NO_MATCH;r=l;for(let i=1,c=t.length;i<c;i++){const f=t[i];if(r=o(f,e,r),!(r>-1))return Fe.NO_MATCH}const a=r-l;return s(a)}function Hr(e,t){let{keepDiacritics:n}=t;return e=`${e}`,n||(e=el(e)),e}function rl(e,t){let n=t;typeof t=="object"&&(n=t.accessor);const r=n(e);return r==null?[]:Array.isArray(r)?r:[String(r)]}function ol(e,t){const n=[];for(let r=0,o=t.length;r<o;r++){const s=t[r],l=il(s),a=rl(e,s);for(let i=0,c=a.length;i<c;i++)n.push({itemValue:a[i],attributes:l})}return n}var jr={maxRanking:1/0,minRanking:-1/0};function il(e){return typeof e=="function"?jr:{...jr,...e}}var sl={data:""},ll=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||sl,al=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,cl=/\/\*[^]*?\*\/|  +/g,Wr=/\n+/g,Et=(e,t)=>{let n="",r="",o="";for(let s in e){let l=e[s];s[0]=="@"?s[1]=="i"?n=s+" "+l+";":r+=s[1]=="f"?Et(l,s):s+"{"+Et(l,s[1]=="k"?"":t)+"}":typeof l=="object"?r+=Et(l,t?t.replace(/([^,])+/g,a=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,i=>/&/.test(i)?i.replace(/&/g,a):a?a+" "+i:i)):s):l!=null&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=Et.p?Et.p(s,l):s+":"+l+";")}return n+(t&&o?t+"{"+o+"}":o)+r},lt={},Uo=e=>{if(typeof e=="object"){let t="";for(let n in e)t+=n+Uo(e[n]);return t}return e},ul=(e,t,n,r,o)=>{let s=Uo(e),l=lt[s]||(lt[s]=(i=>{let c=0,f=11;for(;c<i.length;)f=101*f+i.charCodeAt(c++)>>>0;return"go"+f})(s));if(!lt[l]){let i=s!==e?e:(c=>{let f,g,u=[{}];for(;f=al.exec(c.replace(cl,""));)f[4]?u.shift():f[3]?(g=f[3].replace(Wr," ").trim(),u.unshift(u[0][g]=u[0][g]||{})):u[0][f[1]]=f[2].replace(Wr," ").trim();return u[0]})(e);lt[l]=Et(o?{["@keyframes "+l]:i}:i,n?"":"."+l)}let a=n&&lt.g?lt.g:null;return n&&(lt.g=lt[l]),((i,c,f,g)=>{g?c.data=c.data.replace(g,i):c.data.indexOf(i)===-1&&(c.data=f?i+c.data:c.data+i)})(lt[l],t,r,a),l},dl=(e,t,n)=>e.reduce((r,o,s)=>{let l=t[s];if(l&&l.call){let a=l(n),i=a&&a.props&&a.props.className||/^go/.test(a)&&a;l=i?"."+i:a&&typeof a=="object"?a.props?"":Et(a,""):a===!1?"":a}return r+o+(l??"")},"");function Y(e){let t=this||{},n=e.call?e(t.p):e;return ul(n.unshift?n.raw?dl(n,[].slice.call(arguments,1),t.p):n.reduce((r,o)=>Object.assign(r,o&&o.call?o(t.p):o),{}):n,ll(t.target),t.g,t.o,t.k)}Y.bind({g:1});Y.bind({k:1});function Vo(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(n=Vo(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function L(){for(var e,t,n=0,r="",o=arguments.length;n<o;n++)(e=arguments[n])&&(t=Vo(e))&&(r&&(r+=" "),r+=t);return r}function fl(e,t){const n=Kt(e),{onChange:r}=t;let o=new Set(t.appear?void 0:n);const s=new WeakSet,[l,a]=z([],{equals:!1}),[i]=Es(),c=g=>{a(u=>(u.push.apply(u,g),u));for(const u of g)s.delete(u)},f=(g,u,d)=>g.splice(d,0,u);return D(g=>{const u=l(),d=e();if(d[Ro],Kt(i))return i(),g;if(u.length){const h=g.filter(y=>!u.includes(y));return u.length=0,r({list:h,added:[],removed:[],unchanged:h,finishRemoved:c}),h}return Kt(()=>{const h=new Set(d),y=d.slice(),v=[],b=[],p=[];for(const x of d)(o.has(x)?p:v).push(x);let w=!v.length;for(let x=0;x<g.length;x++){const $=g[x];h.has($)||(s.has($)||(b.push($),s.add($)),f(y,$,x)),w&&$!==y[x]&&(w=!1)}return!b.length&&w?g:(r({list:y,added:v,removed:b,unchanged:p,finishRemoved:c}),o=h,y)})},t.appear?[]:n.slice())}function Me(...e){return Rs(e)}var Qr=e=>e instanceof Element;function Wn(e,t){if(t(e))return e;if(typeof e=="function"&&!e.length)return Wn(e(),t);if(Array.isArray(e)){const n=[];for(const r of e){const o=Wn(r,t);o&&(Array.isArray(o)?n.push.apply(n,o):n.push(o))}return n.length?n:null}return null}function gl(e,t=Qr,n=Qr){const r=D(e),o=D(()=>Wn(r(),t));return o.toArray=()=>{const s=o();return Array.isArray(s)?s:s?[s]:[]},o}function hl(e){return D(()=>{const t=e.name||"s";return{enterActive:(e.enterActiveClass||t+"-enter-active").split(" "),enter:(e.enterClass||t+"-enter").split(" "),enterTo:(e.enterToClass||t+"-enter-to").split(" "),exitActive:(e.exitActiveClass||t+"-exit-active").split(" "),exit:(e.exitClass||t+"-exit").split(" "),exitTo:(e.exitToClass||t+"-exit-to").split(" "),move:(e.moveClass||t+"-move").split(" ")}})}function Go(e){requestAnimationFrame(()=>requestAnimationFrame(e))}function yl(e,t,n,r){const{onBeforeEnter:o,onEnter:s,onAfterEnter:l}=t;o==null||o(n),n.classList.add(...e.enter),n.classList.add(...e.enterActive),queueMicrotask(()=>{if(!n.parentNode)return r==null?void 0:r();s==null||s(n,()=>a())}),Go(()=>{n.classList.remove(...e.enter),n.classList.add(...e.enterTo),(!s||s.length<2)&&(n.addEventListener("transitionend",a),n.addEventListener("animationend",a))});function a(i){(!i||i.target===n)&&(n.removeEventListener("transitionend",a),n.removeEventListener("animationend",a),n.classList.remove(...e.enterActive),n.classList.remove(...e.enterTo),l==null||l(n))}}function vl(e,t,n,r){const{onBeforeExit:o,onExit:s,onAfterExit:l}=t;if(!n.parentNode)return r==null?void 0:r();o==null||o(n),n.classList.add(...e.exit),n.classList.add(...e.exitActive),s==null||s(n,()=>a()),Go(()=>{n.classList.remove(...e.exit),n.classList.add(...e.exitTo),(!s||s.length<2)&&(n.addEventListener("transitionend",a),n.addEventListener("animationend",a))});function a(i){(!i||i.target===n)&&(r==null||r(),n.removeEventListener("transitionend",a),n.removeEventListener("animationend",a),n.classList.remove(...e.exitActive),n.classList.remove(...e.exitTo),l==null||l(n))}}var Yr=e=>{const t=hl(e);return fl(gl(()=>e.children).toArray,{appear:e.appear,onChange({added:n,removed:r,finishRemoved:o,list:s}){const l=t();for(const i of n)yl(l,e,i);const a=[];for(const i of s)i.isConnected&&(i instanceof HTMLElement||i instanceof SVGElement)&&a.push({el:i,rect:i.getBoundingClientRect()});queueMicrotask(()=>{const i=[];for(const{el:c,rect:f}of a)if(c.isConnected){const g=c.getBoundingClientRect(),u=f.left-g.left,d=f.top-g.top;(u||d)&&(c.style.transform=`translate(${u}px, ${d}px)`,c.style.transitionDuration="0s",i.push(c))}document.body.offsetHeight;for(const c of i){let f=function(g){(g.target===c||/transform$/.test(g.propertyName))&&(c.removeEventListener("transitionend",f),c.classList.remove(...l.move))};c.classList.add(...l.move),c.style.transform=c.style.transitionDuration="",c.addEventListener("transitionend",f)}});for(const i of r)vl(l,e,i,()=>o([i]))}})},zn=Symbol("fallback");function Xr(e){for(const t of e)t.dispose()}function ml(e,t,n,r={}){const o=new Map;return j(()=>Xr(o.values())),()=>{const l=e()||[];return l[Ro],Kt(()=>{var f,g;if(!l.length)return Xr(o.values()),o.clear(),r.fallback?[Br(d=>(o.set(zn,{dispose:d}),r.fallback()))]:[];const a=new Array(l.length),i=o.get(zn);if(!o.size||i){i==null||i.dispose(),o.delete(zn);for(let u=0;u<l.length;u++){const d=l[u],h=t(d,u);s(a,d,u,h)}return a}const c=new Set(o.keys());for(let u=0;u<l.length;u++){const d=l[u],h=t(d,u);c.delete(h);const y=o.get(h);y?(a[u]=y.mapped,(f=y.setIndex)==null||f.call(y,u),y.setItem(()=>d)):s(a,d,u,h)}for(const u of c)(g=o.get(u))==null||g.dispose(),o.delete(u);return a})};function s(l,a,i,c){Br(f=>{const[g,u]=z(a),d={setItem:u,dispose:f};if(n.length>1){const[h,y]=z(i);d.setIndex=y,d.mapped=n(g,h)}else d.mapped=n(g);o.set(c,d),l[i]=d.mapped})}}function $n(e){const{by:t}=e;return D(ml(()=>e.each,typeof t=="function"?t:n=>n[t],e.children,"fallback"in e?{fallback:()=>e.fallback}:void 0))}function bl(e,t,n,r){return e.addEventListener(t,n,r),Ks(e.removeEventListener.bind(e,t,n,r))}function pl(e,t,n,r){const o=()=>{Hn(E(e)).forEach(s=>{s&&Hn(E(t)).forEach(l=>bl(s,l,n,r))})};typeof e=="function"?U(o):V(o)}function wl(e,t){const n=new ResizeObserver(e);return j(n.disconnect.bind(n)),{observe:r=>n.observe(r,t),unobserve:n.unobserve.bind(n)}}function Ho(e,t,n){const r=new WeakMap,{observe:o,unobserve:s}=wl(l=>{for(const a of l){const{contentRect:i,target:c}=a,f=Math.round(i.width),g=Math.round(i.height),u=r.get(c);(!u||u.width!==f||u.height!==g)&&(t(i,c,a),r.set(c,{width:f,height:g}))}},n);U(l=>{const a=qs(Hn(E(e)));return Bs(a,l,o,s),a},[])}var xl=/((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;function Zr(e){const t={};let n;for(;n=xl.exec(e);)t[n[1]]=n[2];return t}function An(e,t){if(typeof e=="string"){if(typeof t=="string")return`${e};${t}`;e=Zr(e)}else typeof t=="string"&&(t=Zr(t));return{...e,...t}}function $l(e,t,n=-1){return n in e?[...e.slice(0,n),t,...e.slice(n)]:[...e,t]}function Qn(e,t){const n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function Cl(e){return typeof e=="number"}function qt(e){return Object.prototype.toString.call(e)==="[object String]"}function Sl(e){return typeof e=="function"}function cn(e){return t=>`${e()}-${t}`}function Ke(e,t){return e?e===t||e.contains(t):!1}function en(e,t=!1){const{activeElement:n}=Ze(e);if(!(n!=null&&n.nodeName))return null;if(jo(n)&&n.contentDocument)return en(n.contentDocument.body,t);if(t){const r=n.getAttribute("aria-activedescendant");if(r){const o=Ze(n).getElementById(r);if(o)return o}}return n}function kl(e){return Ze(e).defaultView||window}function Ze(e){return e?e.ownerDocument||e:document}function jo(e){return e.tagName==="IFRAME"}var lr=(e=>(e.Escape="Escape",e.Enter="Enter",e.Tab="Tab",e.Space=" ",e.ArrowDown="ArrowDown",e.ArrowLeft="ArrowLeft",e.ArrowRight="ArrowRight",e.ArrowUp="ArrowUp",e.End="End",e.Home="Home",e.PageDown="PageDown",e.PageUp="PageUp",e))(lr||{});function ar(e){var t;return typeof window<"u"&&window.navigator!=null?e.test(((t=window.navigator.userAgentData)==null?void 0:t.platform)||window.navigator.platform):!1}function Fn(){return ar(/^Mac/i)}function El(){return ar(/^iPhone/i)}function Dl(){return ar(/^iPad/i)||Fn()&&navigator.maxTouchPoints>1}function Ml(){return El()||Dl()}function Al(){return Fn()||Ml()}function ue(e,t){return t&&(Sl(t)?t(e):t[0](t[1],e)),e==null?void 0:e.defaultPrevented}function be(e){return t=>{for(const n of e)ue(t,n)}}function Fl(e){return Fn()?e.metaKey&&!e.ctrlKey:e.ctrlKey&&!e.metaKey}function Ee(e){if(e)if(Tl())e.focus({preventScroll:!0});else{const t=Il(e);e.focus(),Pl(t)}}var bn=null;function Tl(){if(bn==null){bn=!1;try{document.createElement("div").focus({get preventScroll(){return bn=!0,!0}})}catch{}}return bn}function Il(e){let t=e.parentNode;const n=[],r=document.scrollingElement||document.documentElement;for(;t instanceof HTMLElement&&t!==r;)(t.offsetHeight<t.scrollHeight||t.offsetWidth<t.scrollWidth)&&n.push({element:t,scrollTop:t.scrollTop,scrollLeft:t.scrollLeft}),t=t.parentNode;return r instanceof HTMLElement&&n.push({element:r,scrollTop:r.scrollTop,scrollLeft:r.scrollLeft}),n}function Pl(e){for(const{element:t,scrollTop:n,scrollLeft:r}of e)t.scrollTop=n,t.scrollLeft=r}var Wo=["input:not([type='hidden']):not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","a[href]","area[href]","[tabindex]","iframe","object","embed","audio[controls]","video[controls]","[contenteditable]:not([contenteditable='false'])"],Ll=[...Wo,'[tabindex]:not([tabindex="-1"]):not([disabled])'],cr=Wo.join(":not([hidden]),")+",[tabindex]:not([disabled]):not([hidden])",Ol=Ll.join(':not([hidden]):not([tabindex="-1"]),');function Qo(e,t){const r=Array.from(e.querySelectorAll(cr)).filter(Jr);return t&&Jr(e)&&r.unshift(e),r.forEach((o,s)=>{if(jo(o)&&o.contentDocument){const l=o.contentDocument.body,a=Qo(l,!1);r.splice(s,1,...a)}}),r}function Jr(e){return Yo(e)&&!_l(e)}function Yo(e){return e.matches(cr)&&ur(e)}function _l(e){return parseInt(e.getAttribute("tabindex")||"0",10)<0}function ur(e,t){return e.nodeName!=="#comment"&&ql(e)&&Rl(e,t)&&(!e.parentElement||ur(e.parentElement,e))}function ql(e){if(!(e instanceof HTMLElement)&&!(e instanceof SVGElement))return!1;const{display:t,visibility:n}=e.style;let r=t!=="none"&&n!=="hidden"&&n!=="collapse";if(r){if(!e.ownerDocument.defaultView)return r;const{getComputedStyle:o}=e.ownerDocument.defaultView,{display:s,visibility:l}=o(e);r=s!=="none"&&l!=="hidden"&&l!=="collapse"}return r}function Rl(e,t){return!e.hasAttribute("hidden")&&(e.nodeName==="DETAILS"&&t&&t.nodeName!=="SUMMARY"?e.hasAttribute("open"):!0)}function zl(e,t,n){const r=t!=null&&t.tabbable?Ol:cr,o=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(s){var l;return(l=t==null?void 0:t.from)!=null&&l.contains(s)?NodeFilter.FILTER_REJECT:s.matches(r)&&ur(s)&&(!(t!=null&&t.accept)||t.accept(s))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});return t!=null&&t.from&&(o.currentNode=t.from),o}function eo(e){for(;e&&!Kl(e);)e=e.parentElement;return e||document.scrollingElement||document.documentElement}function Kl(e){const t=window.getComputedStyle(e);return/(auto|scroll)/.test(t.overflow+t.overflowX+t.overflowY)}function Bl(){}function Nl(e,t){const[n,r]=e;let o=!1;const s=t.length;for(let l=s,a=0,i=l-1;a<l;i=a++){const[c,f]=t[a],[g,u]=t[i],[,d]=t[i===0?l-1:i-1]||[0,0],h=(f-u)*(n-c)-(c-g)*(r-f);if(u<f){if(r>=u&&r<f){if(h===0)return!0;h>0&&(r===u?r>d&&(o=!o):o=!o)}}else if(f<u){if(r>f&&r<=u){if(h===0)return!0;h<0&&(r===u?r<d&&(o=!o):o=!o)}}else if(r==f&&(n>=g&&n<=c||n>=c&&n<=g))return!0}return o}function X(e,t){return W(e,t)}var Xt=new Map,to=new Set;function no(){if(typeof window>"u")return;const e=n=>{if(!n.target)return;let r=Xt.get(n.target);r||(r=new Set,Xt.set(n.target,r),n.target.addEventListener("transitioncancel",t)),r.add(n.propertyName)},t=n=>{if(!n.target)return;const r=Xt.get(n.target);if(r&&(r.delete(n.propertyName),r.size===0&&(n.target.removeEventListener("transitioncancel",t),Xt.delete(n.target)),Xt.size===0)){for(const o of to)o();to.clear()}};document.body.addEventListener("transitionrun",e),document.body.addEventListener("transitionend",t)}typeof document<"u"&&(document.readyState!=="loading"?no():document.addEventListener("DOMContentLoaded",no));function Yn(e,t){const n=ro(e,t,"left"),r=ro(e,t,"top"),o=t.offsetWidth,s=t.offsetHeight;let l=e.scrollLeft,a=e.scrollTop;const i=l+e.offsetWidth,c=a+e.offsetHeight;n<=l?l=n:n+o>i&&(l+=n+o-i),r<=a?a=r:r+s>c&&(a+=r+s-c),e.scrollLeft=l,e.scrollTop=a}function ro(e,t,n){const r=n==="left"?"offsetLeft":"offsetTop";let o=0;for(;t.offsetParent&&(o+=t[r],t.offsetParent!==e);){if(t.offsetParent.contains(e)){o-=e[r];break}t=t.offsetParent}return o}function Ul(e,t){var n,r;if(document.contains(e)){const o=document.scrollingElement||document.documentElement;if(window.getComputedStyle(o).overflow==="hidden"){let l=eo(e);for(;e&&l&&e!==o&&l!==o;)Yn(l,e),e=l,l=eo(e)}else{const{left:l,top:a}=e.getBoundingClientRect();(n=e==null?void 0:e.scrollIntoView)==null||n.call(e,{block:"nearest"});const{left:i,top:c}=e.getBoundingClientRect();(Math.abs(l-i)>1||Math.abs(a-c)>1)&&((r=e.scrollIntoView)==null||r.call(e,{block:"nearest"}))}}}var Xo={border:"0",clip:"rect(0 0 0 0)","clip-path":"inset(50%)",height:"1px",margin:"0 -1px -1px 0",overflow:"hidden",padding:"0",position:"absolute",width:"1px","white-space":"nowrap"};function Be(e){return t=>(e(t),()=>e(void 0))}function Tn(e,t){const[n,r]=z(oo(t==null?void 0:t()));return U(()=>{var o;r(((o=e())==null?void 0:o.tagName.toLowerCase())||oo(t==null?void 0:t()))}),n}function oo(e){return qt(e)?e:void 0}function de(e){const[t,n]=oe(e,["as"]);if(!t.as)throw new Error("[kobalte]: Polymorphic is missing the required `as` prop.");return m(Ls,W(n,{get component(){return t.as}}))}var Vl=["id","name","validationState","required","disabled","readOnly"];function Gl(e){const t=`form-control-${Ne()}`,n=X({id:t},e),[r,o]=z(),[s,l]=z(),[a,i]=z(),[c,f]=z(),g=(y,v,b)=>{const p=b!=null||r()!=null;return[b,r(),p&&v!=null?y:void 0].filter(Boolean).join(" ")||void 0},u=y=>[a(),c(),y].filter(Boolean).join(" ")||void 0,d=D(()=>({"data-valid":E(n.validationState)==="valid"?"":void 0,"data-invalid":E(n.validationState)==="invalid"?"":void 0,"data-required":E(n.required)?"":void 0,"data-disabled":E(n.disabled)?"":void 0,"data-readonly":E(n.readOnly)?"":void 0}));return{formControlContext:{name:()=>E(n.name)??E(n.id),dataset:d,validationState:()=>E(n.validationState),isRequired:()=>E(n.required),isDisabled:()=>E(n.disabled),isReadOnly:()=>E(n.readOnly),labelId:r,fieldId:s,descriptionId:a,errorMessageId:c,getAriaLabelledBy:g,getAriaDescribedBy:u,generateId:cn(()=>E(n.id)),registerLabel:Be(o),registerField:Be(l),registerDescription:Be(i),registerErrorMessage:Be(f)}}}var Zo=xe();function un(){const e=$e(Zo);if(e===void 0)throw new Error("[kobalte]: `useFormControlContext` must be used within a `FormControlContext.Provider` component");return e}function Jo(e){const t=un(),n=X({id:t.generateId("description")},e);return U(()=>j(t.registerDescription(n.id))),m(de,W({as:"div"},()=>t.dataset(),n))}function ei(e){const t=un(),n=X({id:t.generateId("error-message")},e),[r,o]=oe(n,["forceMount"]),s=()=>t.validationState()==="invalid";return U(()=>{s()&&j(t.registerErrorMessage(o.id))}),m(B,{get when(){return r.forceMount||s()},get children(){return m(de,W({as:"div"},()=>t.dataset(),o))}})}function Hl(e){let t;const n=un(),r=X({id:n.generateId("label")},e),[o,s]=oe(r,["ref"]),l=Tn(()=>t,()=>"label");return U(()=>j(n.registerLabel(s.id))),m(de,W({as:"label",ref(a){const i=Me(c=>t=c,o.ref);typeof i=="function"&&i(a)},get for(){return D(()=>l()==="label")()?n.fieldId():void 0}},()=>n.dataset(),s))}function jl(e,t){U(ut(e,n=>{if(n==null)return;const r=Wl(n);r!=null&&(r.addEventListener("reset",t,{passive:!0}),j(()=>{r.removeEventListener("reset",t)}))}))}function Wl(e){return Ql(e)?e.form:e.closest("form")}function Ql(e){return e.matches("textarea, input, select, button")}function dn(e){var l;const[t,n]=z((l=e.defaultValue)==null?void 0:l.call(e)),r=D(()=>{var a;return((a=e.value)==null?void 0:a.call(e))!==void 0}),o=D(()=>{var a;return r()?(a=e.value)==null?void 0:a.call(e):t()});return[o,a=>{Kt(()=>{var c;const i=zs(a,o());return Object.is(i,o())||(r()||n(i),(c=e.onChange)==null||c.call(e,i)),i})}]}function ti(e){const[t,n]=dn(e);return[()=>t()??!1,n]}function Yl(e){const[t,n]=dn(e);return[()=>t()??[],n]}function Xl(e={}){const[t,n]=ti({value:()=>E(e.isSelected),defaultValue:()=>!!E(e.defaultIsSelected),onChange:s=>{var l;return(l=e.onSelectedChange)==null?void 0:l.call(e,s)}});return{isSelected:t,setIsSelected:s=>{!E(e.isReadOnly)&&!E(e.isDisabled)&&n(s)},toggle:()=>{!E(e.isReadOnly)&&!E(e.isDisabled)&&n(!t())}}}var Zl=Object.defineProperty,In=(e,t)=>{for(var n in t)Zl(e,n,{get:t[n],enumerable:!0})},ni=xe();function ri(){return $e(ni)}function Jl(){const e=ri();if(e===void 0)throw new Error("[kobalte]: `useDomCollectionContext` must be used within a `DomCollectionProvider` component");return e}function oi(e,t){return!!(t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_PRECEDING)}function ea(e,t){var o;const n=t.ref();if(!n)return-1;let r=e.length;if(!r)return-1;for(;r--;){const s=(o=e[r])==null?void 0:o.ref();if(s&&oi(s,n))return r+1}return 0}function ta(e){const t=e.map((r,o)=>[o,r]);let n=!1;return t.sort(([r,o],[s,l])=>{const a=o.ref(),i=l.ref();return a===i||!a||!i?0:oi(a,i)?(r>s&&(n=!0),-1):(r<s&&(n=!0),1)}),n?t.map(([r,o])=>o):e}function ii(e,t){const n=ta(e);e!==n&&t(n)}function na(e){var o,s;const t=e[0],n=(o=e[e.length-1])==null?void 0:o.ref();let r=(s=t==null?void 0:t.ref())==null?void 0:s.parentElement;for(;r;){if(n&&r.contains(n))return r;r=r.parentElement}return Ze(r).body}function ra(e,t){U(()=>{const n=setTimeout(()=>{ii(e(),t)});j(()=>clearTimeout(n))})}function oa(e,t){if(typeof IntersectionObserver!="function"){ra(e,t);return}let n=[];U(()=>{const r=()=>{const l=!!n.length;n=e(),l&&ii(e(),t)},o=na(e()),s=new IntersectionObserver(r,{root:o});for(const l of e()){const a=l.ref();a&&s.observe(a)}j(()=>s.disconnect())})}function ia(e={}){const[t,n]=Yl({value:()=>E(e.items),onChange:s=>{var l;return(l=e.onItemsChange)==null?void 0:l.call(e,s)}});oa(t,n);const r=s=>(n(l=>{const a=ea(l,s);return $l(l,s,a)}),()=>{n(l=>{const a=l.filter(i=>i.ref()!==s.ref());return l.length===a.length?l:a})});return{DomCollectionProvider:s=>m(ni.Provider,{value:{registerItem:r},get children(){return s.children}})}}function sa(e){const t=Jl(),n=X({shouldRegisterItem:!0},e);U(()=>{if(!n.shouldRegisterItem)return;const r=t.registerItem(n.getItem());j(r)})}function si(e){let t=e.startIndex??0;const n=e.startLevel??0,r=[],o=i=>{if(i==null)return"";const c=e.getKey??"key",f=qt(c)?i[c]:c(i);return f!=null?String(f):""},s=i=>{if(i==null)return"";const c=e.getTextValue??"textValue",f=qt(c)?i[c]:c(i);return f!=null?String(f):""},l=i=>{if(i==null)return!1;const c=e.getDisabled??"disabled";return(qt(c)?i[c]:c(i))??!1},a=i=>{var c;if(i!=null)return qt(e.getSectionChildren)?i[e.getSectionChildren]:(c=e.getSectionChildren)==null?void 0:c.call(e,i)};for(const i of e.dataSource){if(qt(i)||Cl(i)){r.push({type:"item",rawValue:i,key:String(i),textValue:String(i),disabled:l(i),level:n,index:t}),t++;continue}if(a(i)!=null){r.push({type:"section",rawValue:i,key:"",textValue:"",disabled:!1,level:n,index:t}),t++;const c=a(i)??[];if(c.length>0){const f=si({dataSource:c,getKey:e.getKey,getTextValue:e.getTextValue,getDisabled:e.getDisabled,getSectionChildren:e.getSectionChildren,startIndex:t,startLevel:n+1});r.push(...f),t+=f.length}}else r.push({type:"item",rawValue:i,key:o(i),textValue:s(i),disabled:l(i),level:n,index:t}),t++}return r}function la(e,t=[]){return D(()=>{const n=si({dataSource:E(e.dataSource),getKey:E(e.getKey),getTextValue:E(e.getTextValue),getDisabled:E(e.getDisabled),getSectionChildren:E(e.getSectionChildren)});for(let r=0;r<t.length;r++)t[r]();return e.factory(n)})}var aa=new Set(["Avst","Arab","Armi","Syrc","Samr","Mand","Thaa","Mend","Nkoo","Adlm","Rohg","Hebr"]),ca=new Set(["ae","ar","arc","bcc","bqi","ckb","dv","fa","glk","he","ku","mzn","nqo","pnb","ps","sd","ug","ur","yi"]);function ua(e){if(Intl.Locale){const n=new Intl.Locale(e).maximize().script??"";return aa.has(n)}const t=e.split("-")[0];return ca.has(t)}function da(e){return ua(e)?"rtl":"ltr"}function li(){let e=typeof navigator<"u"&&(navigator.language||navigator.userLanguage)||"en-US";return{locale:e,direction:da(e)}}var Xn=li(),tn=new Set;function io(){Xn=li();for(const e of tn)e(Xn)}function fa(){const[e,t]=z(Xn),n=D(()=>e());return Ft(()=>{tn.size===0&&window.addEventListener("languagechange",io),tn.add(t),j(()=>{tn.delete(t),tn.size===0&&window.removeEventListener("languagechange",io)})}),{locale:()=>n().locale,direction:()=>n().direction}}var ga=xe();function $t(){const e=fa();return $e(ga)||e}var Kn=new Map;function ha(e){const{locale:t}=$t(),n=D(()=>t()+(e?Object.entries(e).sort((r,o)=>r[0]<o[0]?-1:1).join():""));return D(()=>{const r=n();let o;return Kn.has(r)&&(o=Kn.get(r)),o||(o=new Intl.Collator(t(),e),Kn.set(r,o)),o})}var at=class ai extends Set{constructor(n,r,o){super(n);_e(this,"anchorKey");_e(this,"currentKey");n instanceof ai?(this.anchorKey=r||n.anchorKey,this.currentKey=o||n.currentKey):(this.anchorKey=r,this.currentKey=o)}};function ya(e){const[t,n]=dn(e);return[()=>t()??new at,n]}function ci(e){return Al()?e.altKey:e.ctrlKey}function Rt(e){return Fn()?e.metaKey:e.ctrlKey}function so(e){return new at(e)}function va(e,t){if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0}function ma(e){const t=X({selectionMode:"none",selectionBehavior:"toggle"},e),[n,r]=z(!1),[o,s]=z(),l=D(()=>{const y=E(t.selectedKeys);return y!=null?so(y):y}),a=D(()=>{const y=E(t.defaultSelectedKeys);return y!=null?so(y):new at}),[i,c]=ya({value:l,defaultValue:a,onChange:y=>{var v;return(v=t.onSelectionChange)==null?void 0:v.call(t,y)}}),[f,g]=z(E(t.selectionBehavior)),u=()=>E(t.selectionMode),d=()=>E(t.disallowEmptySelection)??!1,h=y=>{(E(t.allowDuplicateSelectionEvents)||!va(y,i()))&&c(y)};return U(()=>{const y=i();E(t.selectionBehavior)==="replace"&&f()==="toggle"&&typeof y=="object"&&y.size===0&&g("replace")}),U(()=>{g(E(t.selectionBehavior)??"toggle")}),{selectionMode:u,disallowEmptySelection:d,selectionBehavior:f,setSelectionBehavior:g,isFocused:n,setFocused:r,focusedKey:o,setFocusedKey:s,selectedKeys:i,setSelectedKeys:h}}function ba(e){const[t,n]=z(""),[r,o]=z(-1);return{typeSelectHandlers:{onKeyDown:l=>{var u;if(E(e.isDisabled))return;const a=E(e.keyboardDelegate),i=E(e.selectionManager);if(!a.getKeyForSearch)return;const c=pa(l.key);if(!c||l.ctrlKey||l.metaKey)return;c===" "&&t().trim().length>0&&(l.preventDefault(),l.stopPropagation());let f=n(d=>d+c),g=a.getKeyForSearch(f,i.focusedKey())??a.getKeyForSearch(f);g==null&&wa(f)&&(f=f[0],g=a.getKeyForSearch(f,i.focusedKey())??a.getKeyForSearch(f)),g!=null&&(i.setFocusedKey(g),(u=e.onTypeSelect)==null||u.call(e,g)),clearTimeout(r()),o(window.setTimeout(()=>n(""),500))}}}}function pa(e){return e.length===1||!/^[A-Z]/i.test(e)?e:""}function wa(e){return e.split("").every(t=>t===e[0])}function xa(e,t,n){const o=W({selectOnFocus:()=>E(e.selectionManager).selectionBehavior()==="replace"},e),s=()=>t(),{direction:l}=$t();let a={top:0,left:0};pl(()=>E(o.isVirtualized)?void 0:s(),"scroll",()=>{const v=s();v&&(a={top:v.scrollTop,left:v.scrollLeft})});const{typeSelectHandlers:i}=ba({isDisabled:()=>E(o.disallowTypeAhead),keyboardDelegate:()=>E(o.keyboardDelegate),selectionManager:()=>E(o.selectionManager)}),c=()=>E(o.orientation)??"vertical",f=v=>{var q,C,I,N,G,te,Z,ie;ue(v,i.onKeyDown),v.altKey&&v.key==="Tab"&&v.preventDefault();const b=t();if(!(b!=null&&b.contains(v.target)))return;const p=E(o.selectionManager),w=E(o.selectOnFocus),x=R=>{R!=null&&(p.setFocusedKey(R),v.shiftKey&&p.selectionMode()==="multiple"?p.extendSelection(R):w&&!ci(v)&&p.replaceSelection(R))},$=E(o.keyboardDelegate),O=E(o.shouldFocusWrap),T=p.focusedKey();switch(v.key){case(c()==="vertical"?"ArrowDown":"ArrowRight"):{if($.getKeyBelow){v.preventDefault();let R;T!=null?R=$.getKeyBelow(T):R=(q=$.getFirstKey)==null?void 0:q.call($),R==null&&O&&(R=(C=$.getFirstKey)==null?void 0:C.call($,T)),x(R)}break}case(c()==="vertical"?"ArrowUp":"ArrowLeft"):{if($.getKeyAbove){v.preventDefault();let R;T!=null?R=$.getKeyAbove(T):R=(I=$.getLastKey)==null?void 0:I.call($),R==null&&O&&(R=(N=$.getLastKey)==null?void 0:N.call($,T)),x(R)}break}case(c()==="vertical"?"ArrowLeft":"ArrowUp"):{if($.getKeyLeftOf){v.preventDefault();const R=l()==="rtl";let Q;T!=null?Q=$.getKeyLeftOf(T):Q=R?(G=$.getFirstKey)==null?void 0:G.call($):(te=$.getLastKey)==null?void 0:te.call($),x(Q)}break}case(c()==="vertical"?"ArrowRight":"ArrowDown"):{if($.getKeyRightOf){v.preventDefault();const R=l()==="rtl";let Q;T!=null?Q=$.getKeyRightOf(T):Q=R?(Z=$.getLastKey)==null?void 0:Z.call($):(ie=$.getFirstKey)==null?void 0:ie.call($),x(Q)}break}case"Home":if($.getFirstKey){v.preventDefault();const R=$.getFirstKey(T,Rt(v));R!=null&&(p.setFocusedKey(R),Rt(v)&&v.shiftKey&&p.selectionMode()==="multiple"?p.extendSelection(R):w&&p.replaceSelection(R))}break;case"End":if($.getLastKey){v.preventDefault();const R=$.getLastKey(T,Rt(v));R!=null&&(p.setFocusedKey(R),Rt(v)&&v.shiftKey&&p.selectionMode()==="multiple"?p.extendSelection(R):w&&p.replaceSelection(R))}break;case"PageDown":if($.getKeyPageBelow&&T!=null){v.preventDefault();const R=$.getKeyPageBelow(T);x(R)}break;case"PageUp":if($.getKeyPageAbove&&T!=null){v.preventDefault();const R=$.getKeyPageAbove(T);x(R)}break;case"a":Rt(v)&&p.selectionMode()==="multiple"&&E(o.disallowSelectAll)!==!0&&(v.preventDefault(),p.selectAll());break;case"Escape":v.defaultPrevented||(v.preventDefault(),E(o.disallowEmptySelection)||p.clearSelection());break;case"Tab":if(!E(o.allowsTabNavigation)){if(v.shiftKey)b.focus();else{const R=zl(b,{tabbable:!0});let Q,J;do J=R.lastChild(),J&&(Q=J);while(J);Q&&!Q.contains(document.activeElement)&&Ee(Q)}break}}},g=v=>{var x,$;const b=E(o.selectionManager),p=E(o.keyboardDelegate),w=E(o.selectOnFocus);if(b.isFocused()){v.currentTarget.contains(v.target)||b.setFocused(!1);return}if(v.currentTarget.contains(v.target)){if(b.setFocused(!0),b.focusedKey()==null){const O=q=>{q!=null&&(b.setFocusedKey(q),w&&b.replaceSelection(q))},T=v.relatedTarget;T&&v.currentTarget.compareDocumentPosition(T)&Node.DOCUMENT_POSITION_FOLLOWING?O(b.lastSelectedKey()??((x=p.getLastKey)==null?void 0:x.call(p))):O(b.firstSelectedKey()??(($=p.getFirstKey)==null?void 0:$.call(p)))}else if(!E(o.isVirtualized)){const O=s();if(O){O.scrollTop=a.top,O.scrollLeft=a.left;const T=O.querySelector(`[data-key="${b.focusedKey()}"]`);T&&(Ee(T),Yn(O,T))}}}},u=v=>{const b=E(o.selectionManager);v.currentTarget.contains(v.relatedTarget)||b.setFocused(!1)},d=v=>{s()===v.target&&v.preventDefault()},h=()=>{var O,T;const v=E(o.autoFocus);if(!v)return;const b=E(o.selectionManager),p=E(o.keyboardDelegate);let w;v==="first"&&(w=(O=p.getFirstKey)==null?void 0:O.call(p)),v==="last"&&(w=(T=p.getLastKey)==null?void 0:T.call(p));const x=b.selectedKeys();x.size&&(w=x.values().next().value),b.setFocused(!0),b.setFocusedKey(w);const $=t();$&&w==null&&!E(o.shouldUseVirtualFocus)&&Ee($)};return Ft(()=>{o.deferAutoFocus?setTimeout(h,0):h()}),U(ut([s,()=>E(o.isVirtualized),()=>E(o.selectionManager).focusedKey()],v=>{var x;const[b,p,w]=v;if(p)w&&((x=o.scrollToKey)==null||x.call(o,w));else if(w&&b){const $=b.querySelector(`[data-key="${w}"]`);$&&Yn(b,$)}})),{tabIndex:D(()=>{if(!E(o.shouldUseVirtualFocus))return E(o.selectionManager).focusedKey()==null?0:-1}),onKeyDown:f,onMouseDown:d,onFocusIn:g,onFocusOut:u}}function ui(e,t){const n=()=>E(e.selectionManager),r=()=>E(e.key),o=()=>E(e.shouldUseVirtualFocus),s=p=>{n().selectionMode()!=="none"&&(n().selectionMode()==="single"?n().isSelected(r())&&!n().disallowEmptySelection()?n().toggleSelection(r()):n().replaceSelection(r()):p!=null&&p.shiftKey?n().extendSelection(r()):n().selectionBehavior()==="toggle"||Rt(p)||"pointerType"in p&&p.pointerType==="touch"?n().toggleSelection(r()):n().replaceSelection(r()))},l=()=>n().isSelected(r()),a=()=>E(e.disabled)||n().isDisabled(r()),i=()=>!a()&&n().canSelectItem(r());let c=null;const f=p=>{i()&&(c=p.pointerType,p.pointerType==="mouse"&&p.button===0&&!E(e.shouldSelectOnPressUp)&&s(p))},g=p=>{i()&&p.pointerType==="mouse"&&p.button===0&&E(e.shouldSelectOnPressUp)&&E(e.allowsDifferentPressOrigin)&&s(p)},u=p=>{i()&&(E(e.shouldSelectOnPressUp)&&!E(e.allowsDifferentPressOrigin)||c!=="mouse")&&s(p)},d=p=>{!i()||!["Enter"," "].includes(p.key)||(ci(p)?n().toggleSelection(r()):s(p))},h=p=>{a()&&p.preventDefault()},y=p=>{const w=t();o()||a()||!w||p.target===w&&n().setFocusedKey(r())},v=D(()=>{if(!(o()||a()))return r()===n().focusedKey()?0:-1}),b=D(()=>E(e.virtualized)?void 0:r());return U(ut([t,r,o,()=>n().focusedKey(),()=>n().isFocused()],([p,w,x,$,O])=>{p&&w===$&&O&&!x&&document.activeElement!==p&&(e.focus?e.focus():Ee(p))})),{isSelected:l,isDisabled:a,allowsSelection:i,tabIndex:v,dataKey:b,onPointerDown:f,onPointerUp:g,onClick:u,onKeyDown:d,onMouseDown:h,onFocus:y}}var $a=class{constructor(e,t){_e(this,"collection");_e(this,"state");this.collection=e,this.state=t}selectionMode(){return this.state.selectionMode()}disallowEmptySelection(){return this.state.disallowEmptySelection()}selectionBehavior(){return this.state.selectionBehavior()}setSelectionBehavior(e){this.state.setSelectionBehavior(e)}isFocused(){return this.state.isFocused()}setFocused(e){this.state.setFocused(e)}focusedKey(){return this.state.focusedKey()}setFocusedKey(e){(e==null||this.collection().getItem(e))&&this.state.setFocusedKey(e)}selectedKeys(){return this.state.selectedKeys()}isSelected(e){if(this.state.selectionMode()==="none")return!1;const t=this.getKey(e);return t==null?!1:this.state.selectedKeys().has(t)}isEmpty(){return this.state.selectedKeys().size===0}isSelectAll(){if(this.isEmpty())return!1;const e=this.state.selectedKeys();return this.getAllSelectableKeys().every(t=>e.has(t))}firstSelectedKey(){let e;for(const t of this.state.selectedKeys()){const n=this.collection().getItem(t),r=(n==null?void 0:n.index)!=null&&(e==null?void 0:e.index)!=null&&n.index<e.index;(!e||r)&&(e=n)}return e==null?void 0:e.key}lastSelectedKey(){let e;for(const t of this.state.selectedKeys()){const n=this.collection().getItem(t),r=(n==null?void 0:n.index)!=null&&(e==null?void 0:e.index)!=null&&n.index>e.index;(!e||r)&&(e=n)}return e==null?void 0:e.key}extendSelection(e){if(this.selectionMode()==="none")return;if(this.selectionMode()==="single"){this.replaceSelection(e);return}const t=this.getKey(e);if(t==null)return;const n=this.state.selectedKeys(),r=n.anchorKey||t,o=new at(n,r,t);for(const s of this.getKeyRange(r,n.currentKey||t))o.delete(s);for(const s of this.getKeyRange(t,r))this.canSelectItem(s)&&o.add(s);this.state.setSelectedKeys(o)}getKeyRange(e,t){const n=this.collection().getItem(e),r=this.collection().getItem(t);return n&&r?n.index!=null&&r.index!=null&&n.index<=r.index?this.getKeyRangeInternal(e,t):this.getKeyRangeInternal(t,e):[]}getKeyRangeInternal(e,t){const n=[];let r=e;for(;r!=null;){const o=this.collection().getItem(r);if(o&&o.type==="item"&&n.push(r),r===t)return n;r=this.collection().getKeyAfter(r)}return[]}getKey(e){const t=this.collection().getItem(e);return t?!t||t.type!=="item"?null:t.key:e}toggleSelection(e){if(this.selectionMode()==="none")return;if(this.selectionMode()==="single"&&!this.isSelected(e)){this.replaceSelection(e);return}const t=this.getKey(e);if(t==null)return;const n=new at(this.state.selectedKeys());n.has(t)?n.delete(t):this.canSelectItem(t)&&(n.add(t),n.anchorKey=t,n.currentKey=t),!(this.disallowEmptySelection()&&n.size===0)&&this.state.setSelectedKeys(n)}replaceSelection(e){if(this.selectionMode()==="none")return;const t=this.getKey(e);if(t==null)return;const n=this.canSelectItem(t)?new at([t],t,t):new at;this.state.setSelectedKeys(n)}setSelectedKeys(e){if(this.selectionMode()==="none")return;const t=new at;for(const n of e){const r=this.getKey(n);if(r!=null&&(t.add(r),this.selectionMode()==="single"))break}this.state.setSelectedKeys(t)}selectAll(){this.selectionMode()==="multiple"&&this.state.setSelectedKeys(new Set(this.getAllSelectableKeys()))}clearSelection(){const e=this.state.selectedKeys();!this.disallowEmptySelection()&&e.size>0&&this.state.setSelectedKeys(new at)}toggleSelectAll(){this.isSelectAll()?this.clearSelection():this.selectAll()}select(e,t){this.selectionMode()!=="none"&&(this.selectionMode()==="single"?this.isSelected(e)&&!this.disallowEmptySelection()?this.toggleSelection(e):this.replaceSelection(e):this.selectionBehavior()==="toggle"||t&&t.pointerType==="touch"?this.toggleSelection(e):this.replaceSelection(e))}isSelectionEqual(e){if(e===this.state.selectedKeys())return!0;const t=this.selectedKeys();if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;for(const n of t)if(!e.has(n))return!1;return!0}canSelectItem(e){if(this.state.selectionMode()==="none")return!1;const t=this.collection().getItem(e);return t!=null&&!t.disabled}isDisabled(e){const t=this.collection().getItem(e);return!t||t.disabled}getAllSelectableKeys(){const e=[];return(n=>{for(;n!=null;){if(this.canSelectItem(n)){const r=this.collection().getItem(n);if(!r)continue;r.type==="item"&&e.push(n)}n=this.collection().getKeyAfter(n)}})(this.collection().getFirstKey()),e}},lo=class{constructor(e){_e(this,"keyMap",new Map);_e(this,"iterable");_e(this,"firstKey");_e(this,"lastKey");this.iterable=e;for(const r of e)this.keyMap.set(r.key,r);if(this.keyMap.size===0)return;let t,n=0;for(const[r,o]of this.keyMap)t?(t.nextKey=r,o.prevKey=t.key):(this.firstKey=r,o.prevKey=void 0),o.type==="item"&&(o.index=n++),t=o,t.nextKey=void 0;this.lastKey=t.key}*[Symbol.iterator](){yield*this.iterable}getSize(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(e){var t;return(t=this.keyMap.get(e))==null?void 0:t.prevKey}getKeyAfter(e){var t;return(t=this.keyMap.get(e))==null?void 0:t.nextKey}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(e){return this.keyMap.get(e)}at(e){const t=[...this.getKeys()];return this.getItem(t[e])}};function Ca(e){const t=ma(e),r=la({dataSource:()=>E(e.dataSource),getKey:()=>E(e.getKey),getTextValue:()=>E(e.getTextValue),getDisabled:()=>E(e.getDisabled),getSectionChildren:()=>E(e.getSectionChildren),factory:s=>e.filter?new lo(e.filter(s)):new lo(s)},[()=>e.filter]),o=new $a(r,t);return Os(()=>{const s=t.focusedKey();s!=null&&!r().getItem(s)&&t.setFocusedKey(void 0)}),{collection:r,selectionManager:()=>o}}var ke=e=>typeof e=="function"?e():e,Sa=e=>{const t=D(()=>{const l=ke(e.element);if(l)return getComputedStyle(l)}),n=()=>{var l;return((l=t())==null?void 0:l.animationName)??"none"},[r,o]=z(ke(e.show)?"present":"hidden");let s="none";return U(l=>{const a=ke(e.show);return Kt(()=>{var f;if(l===a)return a;const i=s,c=n();a?o("present"):c==="none"||((f=t())==null?void 0:f.display)==="none"?o("hidden"):o(l===!0&&i!==c?"hiding":"hidden")}),a}),U(()=>{const l=ke(e.element);if(!l)return;const a=c=>{c.target===l&&(s=n())},i=c=>{const g=n().includes(c.animationName);c.target===l&&g&&r()==="hiding"&&o("hidden")};l.addEventListener("animationstart",a),l.addEventListener("animationcancel",i),l.addEventListener("animationend",i),j(()=>{l.removeEventListener("animationstart",a),l.removeEventListener("animationcancel",i),l.removeEventListener("animationend",i)})}),{present:()=>r()==="present"||r()==="hiding",state:r}},ka=Sa,di=ka,Cn="data-kb-top-layer",fi,Zn=!1,dt=[];function rn(e){return dt.findIndex(t=>t.node===e)}function Ea(e){return dt[rn(e)]}function Da(e){return dt[dt.length-1].node===e}function gi(){return dt.filter(e=>e.isPointerBlocking)}function Ma(){return[...gi()].slice(-1)[0]}function dr(){return gi().length>0}function hi(e){var n;const t=rn((n=Ma())==null?void 0:n.node);return rn(e)<t}function Aa(e){dt.push(e)}function Fa(e){const t=rn(e);t<0||dt.splice(t,1)}function Ta(){for(const{node:e}of dt)e.style.pointerEvents=hi(e)?"none":"auto"}function Ia(e){if(dr()&&!Zn){const t=Ze(e);fi=document.body.style.pointerEvents,t.body.style.pointerEvents="none",Zn=!0}}function Pa(e){if(dr())return;const t=Ze(e);t.body.style.pointerEvents=fi,t.body.style.length===0&&t.body.removeAttribute("style"),Zn=!1}var Te={layers:dt,isTopMostLayer:Da,hasPointerBlockingLayer:dr,isBelowPointerBlockingLayer:hi,addLayer:Aa,removeLayer:Fa,indexOf:rn,find:Ea,assignPointerEventToLayers:Ta,disableBodyPointerEvents:Ia,restoreBodyPointerEvents:Pa},La={};In(La,{Button:()=>qa,Root:()=>fr});var Oa=["button","color","file","image","reset","submit"];function _a(e){const t=e.tagName.toLowerCase();return t==="button"?!0:t==="input"&&e.type?Oa.indexOf(e.type)!==-1:!1}function fr(e){let t;const n=X({type:"button"},e),[r,o]=oe(n,["ref","type","disabled"]),s=Tn(()=>t,()=>"button"),l=D(()=>{const c=s();return c==null?!1:_a({tagName:c,type:r.type})}),a=D(()=>s()==="input"),i=D(()=>s()==="a"&&(t==null?void 0:t.getAttribute("href"))!=null);return m(de,W({as:"button",ref(c){const f=Me(g=>t=g,r.ref);typeof f=="function"&&f(c)},get type(){return l()||a()?r.type:void 0},get role(){return!l()&&!i()?"button":void 0},get tabIndex(){return!l()&&!i()&&!r.disabled?0:void 0},get disabled(){return l()||a()?r.disabled:void 0},get"aria-disabled"(){return!l()&&!a()&&r.disabled?!0:void 0},get"data-disabled"(){return r.disabled?"":void 0}},o))}var qa=fr,Ra=["top","right","bottom","left"],Xe=Math.min,Pe=Math.max,Sn=Math.round,pn=Math.floor,pt=e=>({x:e,y:e}),za={left:"right",right:"left",bottom:"top",top:"bottom"},Ka={start:"end",end:"start"};function Jn(e,t,n){return Pe(e,Xe(t,n))}function Tt(e,t){return typeof e=="function"?e(t):e}function wt(e){return e.split("-")[0]}function Ut(e){return e.split("-")[1]}function yi(e){return e==="x"?"y":"x"}function gr(e){return e==="y"?"height":"width"}function Mt(e){return["top","bottom"].includes(wt(e))?"y":"x"}function hr(e){return yi(Mt(e))}function Ba(e,t,n){n===void 0&&(n=!1);const r=Ut(e),o=hr(e),s=gr(o);let l=o==="x"?r===(n?"end":"start")?"right":"left":r==="start"?"bottom":"top";return t.reference[s]>t.floating[s]&&(l=kn(l)),[l,kn(l)]}function Na(e){const t=kn(e);return[er(e),t,er(t)]}function er(e){return e.replace(/start|end/g,t=>Ka[t])}function Ua(e,t,n){const r=["left","right"],o=["right","left"],s=["top","bottom"],l=["bottom","top"];switch(e){case"top":case"bottom":return n?t?o:r:t?r:o;case"left":case"right":return t?s:l;default:return[]}}function Va(e,t,n,r){const o=Ut(e);let s=Ua(wt(e),n==="start",r);return o&&(s=s.map(l=>l+"-"+o),t&&(s=s.concat(s.map(er)))),s}function kn(e){return e.replace(/left|right|bottom|top/g,t=>za[t])}function Ga(e){return{top:0,right:0,bottom:0,left:0,...e}}function vi(e){return typeof e!="number"?Ga(e):{top:e,right:e,bottom:e,left:e}}function En(e){const{x:t,y:n,width:r,height:o}=e;return{width:r,height:o,top:n,left:t,right:t+r,bottom:n+o,x:t,y:n}}function ao(e,t,n){let{reference:r,floating:o}=e;const s=Mt(t),l=hr(t),a=gr(l),i=wt(t),c=s==="y",f=r.x+r.width/2-o.width/2,g=r.y+r.height/2-o.height/2,u=r[a]/2-o[a]/2;let d;switch(i){case"top":d={x:f,y:r.y-o.height};break;case"bottom":d={x:f,y:r.y+r.height};break;case"right":d={x:r.x+r.width,y:g};break;case"left":d={x:r.x-o.width,y:g};break;default:d={x:r.x,y:r.y}}switch(Ut(t)){case"start":d[l]-=u*(n&&c?-1:1);break;case"end":d[l]+=u*(n&&c?-1:1);break}return d}var Ha=async(e,t,n)=>{const{placement:r="bottom",strategy:o="absolute",middleware:s=[],platform:l}=n,a=s.filter(Boolean),i=await(l.isRTL==null?void 0:l.isRTL(t));let c=await l.getElementRects({reference:e,floating:t,strategy:o}),{x:f,y:g}=ao(c,r,i),u=r,d={},h=0;for(let y=0;y<a.length;y++){const{name:v,fn:b}=a[y],{x:p,y:w,data:x,reset:$}=await b({x:f,y:g,initialPlacement:r,placement:u,strategy:o,middlewareData:d,rects:c,platform:l,elements:{reference:e,floating:t}});f=p??f,g=w??g,d={...d,[v]:{...d[v],...x}},$&&h<=50&&(h++,typeof $=="object"&&($.placement&&(u=$.placement),$.rects&&(c=$.rects===!0?await l.getElementRects({reference:e,floating:t,strategy:o}):$.rects),{x:f,y:g}=ao(c,u,i)),y=-1)}return{x:f,y:g,placement:u,strategy:o,middlewareData:d}};async function on(e,t){var n;t===void 0&&(t={});const{x:r,y:o,platform:s,rects:l,elements:a,strategy:i}=e,{boundary:c="clippingAncestors",rootBoundary:f="viewport",elementContext:g="floating",altBoundary:u=!1,padding:d=0}=Tt(t,e),h=vi(d),v=a[u?g==="floating"?"reference":"floating":g],b=En(await s.getClippingRect({element:(n=await(s.isElement==null?void 0:s.isElement(v)))==null||n?v:v.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(a.floating)),boundary:c,rootBoundary:f,strategy:i})),p=g==="floating"?{x:r,y:o,width:l.floating.width,height:l.floating.height}:l.reference,w=await(s.getOffsetParent==null?void 0:s.getOffsetParent(a.floating)),x=await(s.isElement==null?void 0:s.isElement(w))?await(s.getScale==null?void 0:s.getScale(w))||{x:1,y:1}:{x:1,y:1},$=En(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:p,offsetParent:w,strategy:i}):p);return{top:(b.top-$.top+h.top)/x.y,bottom:($.bottom-b.bottom+h.bottom)/x.y,left:(b.left-$.left+h.left)/x.x,right:($.right-b.right+h.right)/x.x}}var ja=e=>({name:"arrow",options:e,async fn(t){const{x:n,y:r,placement:o,rects:s,platform:l,elements:a,middlewareData:i}=t,{element:c,padding:f=0}=Tt(e,t)||{};if(c==null)return{};const g=vi(f),u={x:n,y:r},d=hr(o),h=gr(d),y=await l.getDimensions(c),v=d==="y",b=v?"top":"left",p=v?"bottom":"right",w=v?"clientHeight":"clientWidth",x=s.reference[h]+s.reference[d]-u[d]-s.floating[h],$=u[d]-s.reference[d],O=await(l.getOffsetParent==null?void 0:l.getOffsetParent(c));let T=O?O[w]:0;(!T||!await(l.isElement==null?void 0:l.isElement(O)))&&(T=a.floating[w]||s.floating[h]);const q=x/2-$/2,C=T/2-y[h]/2-1,I=Xe(g[b],C),N=Xe(g[p],C),G=I,te=T-y[h]-N,Z=T/2-y[h]/2+q,ie=Jn(G,Z,te),R=!i.arrow&&Ut(o)!=null&&Z!==ie&&s.reference[h]/2-(Z<G?I:N)-y[h]/2<0,Q=R?Z<G?Z-G:Z-te:0;return{[d]:u[d]+Q,data:{[d]:ie,centerOffset:Z-ie-Q,...R&&{alignmentOffset:Q}},reset:R}}}),Wa=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var n,r;const{placement:o,middlewareData:s,rects:l,initialPlacement:a,platform:i,elements:c}=t,{mainAxis:f=!0,crossAxis:g=!0,fallbackPlacements:u,fallbackStrategy:d="bestFit",fallbackAxisSideDirection:h="none",flipAlignment:y=!0,...v}=Tt(e,t);if((n=s.arrow)!=null&&n.alignmentOffset)return{};const b=wt(o),p=Mt(a),w=wt(a)===a,x=await(i.isRTL==null?void 0:i.isRTL(c.floating)),$=u||(w||!y?[kn(a)]:Na(a)),O=h!=="none";!u&&O&&$.push(...Va(a,y,h,x));const T=[a,...$],q=await on(t,v),C=[];let I=((r=s.flip)==null?void 0:r.overflows)||[];if(f&&C.push(q[b]),g){const Z=Ba(o,l,x);C.push(q[Z[0]],q[Z[1]])}if(I=[...I,{placement:o,overflows:C}],!C.every(Z=>Z<=0)){var N,G;const Z=(((N=s.flip)==null?void 0:N.index)||0)+1,ie=T[Z];if(ie)return{data:{index:Z,overflows:I},reset:{placement:ie}};let R=(G=I.filter(Q=>Q.overflows[0]<=0).sort((Q,J)=>Q.overflows[1]-J.overflows[1])[0])==null?void 0:G.placement;if(!R)switch(d){case"bestFit":{var te;const Q=(te=I.filter(J=>{if(O){const ae=Mt(J.placement);return ae===p||ae==="y"}return!0}).map(J=>[J.placement,J.overflows.filter(ae=>ae>0).reduce((ae,ye)=>ae+ye,0)]).sort((J,ae)=>J[1]-ae[1])[0])==null?void 0:te[0];Q&&(R=Q);break}case"initialPlacement":R=a;break}if(o!==R)return{reset:{placement:R}}}return{}}}};function co(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function uo(e){return Ra.some(t=>e[t]>=0)}var Qa=function(e){return e===void 0&&(e={}),{name:"hide",options:e,async fn(t){const{rects:n}=t,{strategy:r="referenceHidden",...o}=Tt(e,t);switch(r){case"referenceHidden":{const s=await on(t,{...o,elementContext:"reference"}),l=co(s,n.reference);return{data:{referenceHiddenOffsets:l,referenceHidden:uo(l)}}}case"escaped":{const s=await on(t,{...o,altBoundary:!0}),l=co(s,n.floating);return{data:{escapedOffsets:l,escaped:uo(l)}}}default:return{}}}}};async function Ya(e,t){const{placement:n,platform:r,elements:o}=e,s=await(r.isRTL==null?void 0:r.isRTL(o.floating)),l=wt(n),a=Ut(n),i=Mt(n)==="y",c=["left","top"].includes(l)?-1:1,f=s&&i?-1:1,g=Tt(t,e);let{mainAxis:u,crossAxis:d,alignmentAxis:h}=typeof g=="number"?{mainAxis:g,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...g};return a&&typeof h=="number"&&(d=a==="end"?h*-1:h),i?{x:d*f,y:u*c}:{x:u*c,y:d*f}}var Xa=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var n,r;const{x:o,y:s,placement:l,middlewareData:a}=t,i=await Ya(t,e);return l===((n=a.offset)==null?void 0:n.placement)&&(r=a.arrow)!=null&&r.alignmentOffset?{}:{x:o+i.x,y:s+i.y,data:{...i,placement:l}}}}},Za=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:n,y:r,placement:o}=t,{mainAxis:s=!0,crossAxis:l=!1,limiter:a={fn:v=>{let{x:b,y:p}=v;return{x:b,y:p}}},...i}=Tt(e,t),c={x:n,y:r},f=await on(t,i),g=Mt(wt(o)),u=yi(g);let d=c[u],h=c[g];if(s){const v=u==="y"?"top":"left",b=u==="y"?"bottom":"right",p=d+f[v],w=d-f[b];d=Jn(p,d,w)}if(l){const v=g==="y"?"top":"left",b=g==="y"?"bottom":"right",p=h+f[v],w=h-f[b];h=Jn(p,h,w)}const y=a.fn({...t,[u]:d,[g]:h});return{...y,data:{x:y.x-n,y:y.y-r}}}}},Ja=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){const{placement:n,rects:r,platform:o,elements:s}=t,{apply:l=()=>{},...a}=Tt(e,t),i=await on(t,a),c=wt(n),f=Ut(n),g=Mt(n)==="y",{width:u,height:d}=r.floating;let h,y;c==="top"||c==="bottom"?(h=c,y=f===(await(o.isRTL==null?void 0:o.isRTL(s.floating))?"start":"end")?"left":"right"):(y=c,h=f==="end"?"top":"bottom");const v=d-i.top-i.bottom,b=u-i.left-i.right,p=Xe(d-i[h],v),w=Xe(u-i[y],b),x=!t.middlewareData.shift;let $=p,O=w;if(g?O=f||x?Xe(w,b):b:$=f||x?Xe(p,v):v,x&&!f){const q=Pe(i.left,0),C=Pe(i.right,0),I=Pe(i.top,0),N=Pe(i.bottom,0);g?O=u-2*(q!==0||C!==0?q+C:Pe(i.left,i.right)):$=d-2*(I!==0||N!==0?I+N:Pe(i.top,i.bottom))}await l({...t,availableWidth:O,availableHeight:$});const T=await o.getDimensions(s.floating);return u!==T.width||d!==T.height?{reset:{rects:!0}}:{}}}};function Vt(e){return mi(e)?(e.nodeName||"").toLowerCase():"#document"}function Le(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function ft(e){var t;return(t=(mi(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function mi(e){return e instanceof Node||e instanceof Le(e).Node}function We(e){return e instanceof Element||e instanceof Le(e).Element}function Je(e){return e instanceof HTMLElement||e instanceof Le(e).HTMLElement}function fo(e){return typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof Le(e).ShadowRoot}function fn(e){const{overflow:t,overflowX:n,overflowY:r,display:o}=Qe(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&!["inline","contents"].includes(o)}function ec(e){return["table","td","th"].includes(Vt(e))}function Pn(e){return[":popover-open",":modal"].some(t=>{try{return e.matches(t)}catch{return!1}})}function yr(e){const t=vr(),n=We(e)?Qe(e):e;return n.transform!=="none"||n.perspective!=="none"||(n.containerType?n.containerType!=="normal":!1)||!t&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!t&&(n.filter?n.filter!=="none":!1)||["transform","perspective","filter"].some(r=>(n.willChange||"").includes(r))||["paint","layout","strict","content"].some(r=>(n.contain||"").includes(r))}function tc(e){let t=xt(e);for(;Je(t)&&!Nt(t);){if(yr(t))return t;if(Pn(t))return null;t=xt(t)}return null}function vr(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Nt(e){return["html","body","#document"].includes(Vt(e))}function Qe(e){return Le(e).getComputedStyle(e)}function Ln(e){return We(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function xt(e){if(Vt(e)==="html")return e;const t=e.assignedSlot||e.parentNode||fo(e)&&e.host||ft(e);return fo(t)?t.host:t}function bi(e){const t=xt(e);return Nt(t)?e.ownerDocument?e.ownerDocument.body:e.body:Je(t)&&fn(t)?t:bi(t)}function sn(e,t,n){var r;t===void 0&&(t=[]),n===void 0&&(n=!0);const o=bi(e),s=o===((r=e.ownerDocument)==null?void 0:r.body),l=Le(o);return s?t.concat(l,l.visualViewport||[],fn(o)?o:[],l.frameElement&&n?sn(l.frameElement):[]):t.concat(o,sn(o,[],n))}function pi(e){const t=Qe(e);let n=parseFloat(t.width)||0,r=parseFloat(t.height)||0;const o=Je(e),s=o?e.offsetWidth:n,l=o?e.offsetHeight:r,a=Sn(n)!==s||Sn(r)!==l;return a&&(n=s,r=l),{width:n,height:r,$:a}}function mr(e){return We(e)?e:e.contextElement}function Bt(e){const t=mr(e);if(!Je(t))return pt(1);const n=t.getBoundingClientRect(),{width:r,height:o,$:s}=pi(t);let l=(s?Sn(n.width):n.width)/r,a=(s?Sn(n.height):n.height)/o;return(!l||!Number.isFinite(l))&&(l=1),(!a||!Number.isFinite(a))&&(a=1),{x:l,y:a}}var nc=pt(0);function wi(e){const t=Le(e);return!vr()||!t.visualViewport?nc:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function rc(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==Le(e)?!1:t}function At(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);const o=e.getBoundingClientRect(),s=mr(e);let l=pt(1);t&&(r?We(r)&&(l=Bt(r)):l=Bt(e));const a=rc(s,n,r)?wi(s):pt(0);let i=(o.left+a.x)/l.x,c=(o.top+a.y)/l.y,f=o.width/l.x,g=o.height/l.y;if(s){const u=Le(s),d=r&&We(r)?Le(r):r;let h=u,y=h.frameElement;for(;y&&r&&d!==h;){const v=Bt(y),b=y.getBoundingClientRect(),p=Qe(y),w=b.left+(y.clientLeft+parseFloat(p.paddingLeft))*v.x,x=b.top+(y.clientTop+parseFloat(p.paddingTop))*v.y;i*=v.x,c*=v.y,f*=v.x,g*=v.y,i+=w,c+=x,h=Le(y),y=h.frameElement}}return En({width:f,height:g,x:i,y:c})}function oc(e){let{elements:t,rect:n,offsetParent:r,strategy:o}=e;const s=o==="fixed",l=ft(r),a=t?Pn(t.floating):!1;if(r===l||a&&s)return n;let i={scrollLeft:0,scrollTop:0},c=pt(1);const f=pt(0),g=Je(r);if((g||!g&&!s)&&((Vt(r)!=="body"||fn(l))&&(i=Ln(r)),Je(r))){const u=At(r);c=Bt(r),f.x=u.x+r.clientLeft,f.y=u.y+r.clientTop}return{width:n.width*c.x,height:n.height*c.y,x:n.x*c.x-i.scrollLeft*c.x+f.x,y:n.y*c.y-i.scrollTop*c.y+f.y}}function ic(e){return Array.from(e.getClientRects())}function xi(e){return At(ft(e)).left+Ln(e).scrollLeft}function sc(e){const t=ft(e),n=Ln(e),r=e.ownerDocument.body,o=Pe(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),s=Pe(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight);let l=-n.scrollLeft+xi(e);const a=-n.scrollTop;return Qe(r).direction==="rtl"&&(l+=Pe(t.clientWidth,r.clientWidth)-o),{width:o,height:s,x:l,y:a}}function lc(e,t){const n=Le(e),r=ft(e),o=n.visualViewport;let s=r.clientWidth,l=r.clientHeight,a=0,i=0;if(o){s=o.width,l=o.height;const c=vr();(!c||c&&t==="fixed")&&(a=o.offsetLeft,i=o.offsetTop)}return{width:s,height:l,x:a,y:i}}function ac(e,t){const n=At(e,!0,t==="fixed"),r=n.top+e.clientTop,o=n.left+e.clientLeft,s=Je(e)?Bt(e):pt(1),l=e.clientWidth*s.x,a=e.clientHeight*s.y,i=o*s.x,c=r*s.y;return{width:l,height:a,x:i,y:c}}function go(e,t,n){let r;if(t==="viewport")r=lc(e,n);else if(t==="document")r=sc(ft(e));else if(We(t))r=ac(t,n);else{const o=wi(e);r={...t,x:t.x-o.x,y:t.y-o.y}}return En(r)}function $i(e,t){const n=xt(e);return n===t||!We(n)||Nt(n)?!1:Qe(n).position==="fixed"||$i(n,t)}function cc(e,t){const n=t.get(e);if(n)return n;let r=sn(e,[],!1).filter(a=>We(a)&&Vt(a)!=="body"),o=null;const s=Qe(e).position==="fixed";let l=s?xt(e):e;for(;We(l)&&!Nt(l);){const a=Qe(l),i=yr(l);!i&&a.position==="fixed"&&(o=null),(s?!i&&!o:!i&&a.position==="static"&&!!o&&["absolute","fixed"].includes(o.position)||fn(l)&&!i&&$i(e,l))?r=r.filter(f=>f!==l):o=a,l=xt(l)}return t.set(e,r),r}function uc(e){let{element:t,boundary:n,rootBoundary:r,strategy:o}=e;const l=[...n==="clippingAncestors"?Pn(t)?[]:cc(t,this._c):[].concat(n),r],a=l[0],i=l.reduce((c,f)=>{const g=go(t,f,o);return c.top=Pe(g.top,c.top),c.right=Xe(g.right,c.right),c.bottom=Xe(g.bottom,c.bottom),c.left=Pe(g.left,c.left),c},go(t,a,o));return{width:i.right-i.left,height:i.bottom-i.top,x:i.left,y:i.top}}function dc(e){const{width:t,height:n}=pi(e);return{width:t,height:n}}function fc(e,t,n){const r=Je(t),o=ft(t),s=n==="fixed",l=At(e,!0,s,t);let a={scrollLeft:0,scrollTop:0};const i=pt(0);if(r||!r&&!s)if((Vt(t)!=="body"||fn(o))&&(a=Ln(t)),r){const g=At(t,!0,s,t);i.x=g.x+t.clientLeft,i.y=g.y+t.clientTop}else o&&(i.x=xi(o));const c=l.left+a.scrollLeft-i.x,f=l.top+a.scrollTop-i.y;return{x:c,y:f,width:l.width,height:l.height}}function Bn(e){return Qe(e).position==="static"}function ho(e,t){return!Je(e)||Qe(e).position==="fixed"?null:t?t(e):e.offsetParent}function Ci(e,t){const n=Le(e);if(Pn(e))return n;if(!Je(e)){let o=xt(e);for(;o&&!Nt(o);){if(We(o)&&!Bn(o))return o;o=xt(o)}return n}let r=ho(e,t);for(;r&&ec(r)&&Bn(r);)r=ho(r,t);return r&&Nt(r)&&Bn(r)&&!yr(r)?n:r||tc(e)||n}var gc=async function(e){const t=this.getOffsetParent||Ci,n=this.getDimensions,r=await n(e.floating);return{reference:fc(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function hc(e){return Qe(e).direction==="rtl"}var Si={convertOffsetParentRelativeRectToViewportRelativeRect:oc,getDocumentElement:ft,getClippingRect:uc,getOffsetParent:Ci,getElementRects:gc,getClientRects:ic,getDimensions:dc,getScale:Bt,isElement:We,isRTL:hc};function yc(e,t){let n=null,r;const o=ft(e);function s(){var a;clearTimeout(r),(a=n)==null||a.disconnect(),n=null}function l(a,i){a===void 0&&(a=!1),i===void 0&&(i=1),s();const{left:c,top:f,width:g,height:u}=e.getBoundingClientRect();if(a||t(),!g||!u)return;const d=pn(f),h=pn(o.clientWidth-(c+g)),y=pn(o.clientHeight-(f+u)),v=pn(c),p={rootMargin:-d+"px "+-h+"px "+-y+"px "+-v+"px",threshold:Pe(0,Xe(1,i))||1};let w=!0;function x($){const O=$[0].intersectionRatio;if(O!==i){if(!w)return l();O?l(!1,O):r=setTimeout(()=>{l(!1,1e-7)},1e3)}w=!1}try{n=new IntersectionObserver(x,{...p,root:o.ownerDocument})}catch{n=new IntersectionObserver(x,p)}n.observe(e)}return l(!0),s}function vc(e,t,n,r){r===void 0&&(r={});const{ancestorScroll:o=!0,ancestorResize:s=!0,elementResize:l=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:i=!1}=r,c=mr(e),f=o||s?[...c?sn(c):[],...sn(t)]:[];f.forEach(b=>{o&&b.addEventListener("scroll",n,{passive:!0}),s&&b.addEventListener("resize",n)});const g=c&&a?yc(c,n):null;let u=-1,d=null;l&&(d=new ResizeObserver(b=>{let[p]=b;p&&p.target===c&&d&&(d.unobserve(t),cancelAnimationFrame(u),u=requestAnimationFrame(()=>{var w;(w=d)==null||w.observe(t)})),n()}),c&&!i&&d.observe(c),d.observe(t));let h,y=i?At(e):null;i&&v();function v(){const b=At(e);y&&(b.x!==y.x||b.y!==y.y||b.width!==y.width||b.height!==y.height)&&n(),y=b,h=requestAnimationFrame(v)}return n(),()=>{var b;f.forEach(p=>{o&&p.removeEventListener("scroll",n),s&&p.removeEventListener("resize",n)}),g==null||g(),(b=d)==null||b.disconnect(),d=null,i&&cancelAnimationFrame(h)}}var mc=Xa,bc=Za,pc=Wa,wc=Ja,xc=Qa,$c=ja,Cc=(e,t,n)=>{const r=new Map,o={platform:Si,...n},s={...o.platform,_c:r};return Ha(e,t,{...o,platform:s})},br=xe();function pr(){const e=$e(br);if(e===void 0)throw new Error("[kobalte]: `usePopperContext` must be used within a `Popper` component");return e}var Sc=_('<svg display="block" viewBox="0 0 30 30" style="transform:scale(1.02)"><g><path fill="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path><path stroke="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z">'),tr=30,yo=tr/2,kc={top:180,right:-90,bottom:0,left:90};function wr(e){const t=pr(),n=X({size:tr},e),[r,o]=oe(n,["ref","style","size"]),s=()=>t.currentPlacement().split("-")[0],l=Ec(t.contentRef),a=()=>{var u;return((u=l())==null?void 0:u.getPropertyValue("background-color"))||"none"},i=()=>{var u;return((u=l())==null?void 0:u.getPropertyValue(`border-${s()}-color`))||"none"},c=()=>{var u;return((u=l())==null?void 0:u.getPropertyValue(`border-${s()}-width`))||"0px"},f=()=>Number.parseInt(c())*2*(tr/r.size),g=()=>`rotate(${kc[s()]} ${yo} ${yo}) translate(0 2)`;return m(de,W({as:"div",ref(u){const d=Me(t.setArrowRef,r.ref);typeof d=="function"&&d(u)},"aria-hidden":"true",get style(){return An({position:"absolute","font-size":`${r.size}px`,width:"1em",height:"1em","pointer-events":"none",fill:a(),stroke:i(),"stroke-width":f()},r.style)}},o,{get children(){const u=Sc(),d=u.firstChild;return V(()=>A(d,"transform",g())),u}}))}function Ec(e){const[t,n]=z();return U(()=>{const r=e();r&&n(kl(r).getComputedStyle(r))}),t}function Dc(e){const t=pr(),[n,r]=oe(e,["ref","style"]);return m(de,W({as:"div",ref(o){const s=Me(t.setPositionerRef,n.ref);typeof s=="function"&&s(o)},"data-popper-positioner":"",get style(){return An({position:"absolute",top:0,left:0,"min-width":"max-content"},n.style)}},r))}function vo(e){const{x:t=0,y:n=0,width:r=0,height:o=0}=e??{};if(typeof DOMRect=="function")return new DOMRect(t,n,r,o);const s={x:t,y:n,width:r,height:o,top:n,right:t+r,bottom:n+o,left:t};return{...s,toJSON:()=>s}}function Mc(e,t){return{contextElement:e,getBoundingClientRect:()=>{const r=t(e);return r?vo(r):e?e.getBoundingClientRect():vo()}}}function Ac(e){return/^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e)}var Fc={top:"bottom",right:"left",bottom:"top",left:"right"};function Tc(e,t){const[n,r]=e.split("-"),o=Fc[n];return r?n==="left"||n==="right"?`${o} ${r==="start"?"top":"bottom"}`:r==="start"?`${o} ${t==="rtl"?"right":"left"}`:`${o} ${t==="rtl"?"left":"right"}`:`${o} center`}function Ic(e){const t=X({getAnchorRect:u=>u==null?void 0:u.getBoundingClientRect(),placement:"bottom",gutter:0,shift:0,flip:!0,slide:!0,overlap:!1,sameWidth:!1,fitViewport:!1,hideWhenDetached:!1,detachedPadding:0,arrowPadding:4,overflowPadding:8},e),[n,r]=z(),[o,s]=z(),[l,a]=z(t.placement),i=()=>{var u;return Mc((u=t.anchorRef)==null?void 0:u.call(t),t.getAnchorRect)},{direction:c}=$t();async function f(){var O,T;const u=i(),d=n(),h=o();if(!u||!d)return;const y=((h==null?void 0:h.clientHeight)||0)/2,v=typeof t.gutter=="number"?t.gutter+y:t.gutter??y;d.style.setProperty("--kb-popper-content-overflow-padding",`${t.overflowPadding}px`),u.getBoundingClientRect();const b=[mc(({placement:q})=>{const C=!!q.split("-")[1];return{mainAxis:v,crossAxis:C?void 0:t.shift,alignmentAxis:t.shift}})];if(t.flip!==!1){const q=typeof t.flip=="string"?t.flip.split(" "):void 0;if(q!==void 0&&!q.every(Ac))throw new Error("`flip` expects a spaced-delimited list of placements");b.push(pc({padding:t.overflowPadding,fallbackPlacements:q}))}(t.slide||t.overlap)&&b.push(bc({mainAxis:t.slide,crossAxis:t.overlap,padding:t.overflowPadding})),b.push(wc({padding:t.overflowPadding,apply({availableWidth:q,availableHeight:C,rects:I}){const N=Math.round(I.reference.width);q=Math.floor(q),C=Math.floor(C),d.style.setProperty("--kb-popper-anchor-width",`${N}px`),d.style.setProperty("--kb-popper-content-available-width",`${q}px`),d.style.setProperty("--kb-popper-content-available-height",`${C}px`),t.sameWidth&&(d.style.width=`${N}px`),t.fitViewport&&(d.style.maxWidth=`${q}px`,d.style.maxHeight=`${C}px`)}})),t.hideWhenDetached&&b.push(xc({padding:t.detachedPadding})),h&&b.push($c({element:h,padding:t.arrowPadding}));const p=await Cc(u,d,{placement:t.placement,strategy:"absolute",middleware:b,platform:{...Si,isRTL:()=>c()==="rtl"}});if(a(p.placement),(O=t.onCurrentPlacementChange)==null||O.call(t,p.placement),!d)return;d.style.setProperty("--kb-popper-content-transform-origin",Tc(p.placement,c()));const w=Math.round(p.x),x=Math.round(p.y);let $;if(t.hideWhenDetached&&($=(T=p.middlewareData.hide)!=null&&T.referenceHidden?"hidden":"visible"),Object.assign(d.style,{top:"0",left:"0",transform:`translate3d(${w}px, ${x}px, 0)`,visibility:$}),h&&p.middlewareData.arrow){const{x:q,y:C}=p.middlewareData.arrow,I=p.placement.split("-")[0];Object.assign(h.style,{left:q!=null?`${q}px`:"",top:C!=null?`${C}px`:"",[I]:"100%"})}}U(()=>{const u=i(),d=n();if(!u||!d)return;const h=vc(u,d,f,{elementResize:typeof ResizeObserver=="function"});j(h)}),U(()=>{var h;const u=n(),d=(h=t.contentRef)==null?void 0:h.call(t);!u||!d||queueMicrotask(()=>{u.style.zIndex=getComputedStyle(d).zIndex})});const g={currentPlacement:l,contentRef:()=>{var u;return(u=t.contentRef)==null?void 0:u.call(t)},setPositionerRef:r,setArrowRef:s};return m(br.Provider,{value:g,get children(){return t.children}})}var ki=Object.assign(Ic,{Arrow:wr,Context:br,usePopperContext:pr,Positioner:Dc});function Pc(e){const t=n=>{var r;n.key===lr.Escape&&((r=e.onEscapeKeyDown)==null||r.call(e,n))};U(()=>{var r;if(E(e.isDisabled))return;const n=((r=e.ownerDocument)==null?void 0:r.call(e))??Ze();n.addEventListener("keydown",t),j(()=>{n.removeEventListener("keydown",t)})})}var mo="interactOutside.pointerDownOutside",bo="interactOutside.focusOutside";function Lc(e,t){let n,r=Bl;const o=()=>Ze(t()),s=g=>{var u;return(u=e.onPointerDownOutside)==null?void 0:u.call(e,g)},l=g=>{var u;return(u=e.onFocusOutside)==null?void 0:u.call(e,g)},a=g=>{var u;return(u=e.onInteractOutside)==null?void 0:u.call(e,g)},i=g=>{var d;const u=g.target;return!(u instanceof HTMLElement)||u.closest(`[${Cn}]`)||!Ke(o(),u)||Ke(t(),u)?!1:!((d=e.shouldExcludeElement)!=null&&d.call(e,u))},c=g=>{function u(){const d=t(),h=g.target;if(!d||!h||!i(g))return;const y=be([s,a]);h.addEventListener(mo,y,{once:!0});const v=new CustomEvent(mo,{bubbles:!1,cancelable:!0,detail:{originalEvent:g,isContextMenu:g.button===2||Fl(g)&&g.button===0}});h.dispatchEvent(v)}g.pointerType==="touch"?(o().removeEventListener("click",u),r=u,o().addEventListener("click",u,{once:!0})):u()},f=g=>{const u=t(),d=g.target;if(!u||!d||!i(g))return;const h=be([l,a]);d.addEventListener(bo,h,{once:!0});const y=new CustomEvent(bo,{bubbles:!1,cancelable:!0,detail:{originalEvent:g,isContextMenu:!1}});d.dispatchEvent(y)};U(()=>{E(e.isDisabled)||(n=window.setTimeout(()=>{o().addEventListener("pointerdown",c,!0)},0),o().addEventListener("focusin",f,!0),j(()=>{window.clearTimeout(n),o().removeEventListener("click",r),o().removeEventListener("pointerdown",c,!0),o().removeEventListener("focusin",f,!0)}))})}var Ei=xe();function Oc(){return $e(Ei)}function _c(e){let t;const n=Oc(),[r,o]=oe(e,["ref","disableOutsidePointerEvents","excludedElements","onEscapeKeyDown","onPointerDownOutside","onFocusOutside","onInteractOutside","onDismiss","bypassTopMostLayerCheck"]),s=new Set([]),l=g=>{s.add(g);const u=n==null?void 0:n.registerNestedLayer(g);return()=>{s.delete(g),u==null||u()}};Lc({shouldExcludeElement:g=>{var u;return t?((u=r.excludedElements)==null?void 0:u.some(d=>Ke(d(),g)))||[...s].some(d=>Ke(d,g)):!1},onPointerDownOutside:g=>{var u,d,h;!t||Te.isBelowPointerBlockingLayer(t)||!r.bypassTopMostLayerCheck&&!Te.isTopMostLayer(t)||((u=r.onPointerDownOutside)==null||u.call(r,g),(d=r.onInteractOutside)==null||d.call(r,g),g.defaultPrevented||(h=r.onDismiss)==null||h.call(r))},onFocusOutside:g=>{var u,d,h;(u=r.onFocusOutside)==null||u.call(r,g),(d=r.onInteractOutside)==null||d.call(r,g),g.defaultPrevented||(h=r.onDismiss)==null||h.call(r)}},()=>t),Pc({ownerDocument:()=>Ze(t),onEscapeKeyDown:g=>{var u;!t||!Te.isTopMostLayer(t)||((u=r.onEscapeKeyDown)==null||u.call(r,g),!g.defaultPrevented&&r.onDismiss&&(g.preventDefault(),r.onDismiss()))}}),Ft(()=>{if(!t)return;Te.addLayer({node:t,isPointerBlocking:r.disableOutsidePointerEvents,dismiss:r.onDismiss});const g=n==null?void 0:n.registerNestedLayer(t);Te.assignPointerEventToLayers(),Te.disableBodyPointerEvents(t),j(()=>{t&&(Te.removeLayer(t),g==null||g(),Te.assignPointerEventToLayers(),Te.restoreBodyPointerEvents(t))})}),U(ut([()=>t,()=>r.disableOutsidePointerEvents],([g,u])=>{if(!g)return;const d=Te.find(g);d&&d.isPointerBlocking!==u&&(d.isPointerBlocking=u,Te.assignPointerEventToLayers()),u&&Te.disableBodyPointerEvents(g),j(()=>{Te.restoreBodyPointerEvents(g)})},{defer:!0}));const f={registerNestedLayer:l};return m(Ei.Provider,{value:f,get children(){return m(de,W({as:"div",ref(g){const u=Me(d=>t=d,r.ref);typeof u=="function"&&u(g)}},o))}})}function Di(e={}){const[t,n]=ti({value:()=>E(e.open),defaultValue:()=>!!E(e.defaultOpen),onChange:l=>{var a;return(a=e.onOpenChange)==null?void 0:a.call(e,l)}}),r=()=>{n(!0)},o=()=>{n(!1)};return{isOpen:t,setIsOpen:n,open:r,close:o,toggle:()=>{t()?o():r()}}}var ze={};In(ze,{Description:()=>Jo,ErrorMessage:()=>ei,Item:()=>Ti,ItemControl:()=>Ii,ItemDescription:()=>Pi,ItemIndicator:()=>Li,ItemInput:()=>Oi,ItemLabel:()=>_i,Label:()=>qi,RadioGroup:()=>qc,Root:()=>Ri});var Mi=xe();function Ai(){const e=$e(Mi);if(e===void 0)throw new Error("[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component");return e}var Fi=xe();function gn(){const e=$e(Fi);if(e===void 0)throw new Error("[kobalte]: `useRadioGroupItemContext` must be used within a `RadioGroup.Item` component");return e}function Ti(e){const t=un(),n=Ai(),r=`${t.generateId("item")}-${Ne()}`,o=X({id:r},e),[s,l]=oe(o,["value","disabled","onPointerDown"]),[a,i]=z(),[c,f]=z(),[g,u]=z(),[d,h]=z(),[y,v]=z(!1),b=D(()=>n.isSelectedValue(s.value)),p=D(()=>s.disabled||t.isDisabled()||!1),w=O=>{ue(O,s.onPointerDown),y()&&O.preventDefault()},x=D(()=>({...t.dataset(),"data-disabled":p()?"":void 0,"data-checked":b()?"":void 0})),$={value:()=>s.value,dataset:x,isSelected:b,isDisabled:p,inputId:a,labelId:c,descriptionId:g,inputRef:d,select:()=>n.setSelectedValue(s.value),generateId:cn(()=>l.id),registerInput:Be(i),registerLabel:Be(f),registerDescription:Be(u),setIsFocused:v,setInputRef:h};return m(Fi.Provider,{value:$,get children(){return m(de,W({as:"div",role:"group",onPointerDown:w},x,l))}})}function Ii(e){const t=gn(),n=X({id:t.generateId("control")},e),[r,o]=oe(n,["onClick","onKeyDown"]);return m(de,W({as:"div",onClick:a=>{var i;ue(a,r.onClick),t.select(),(i=t.inputRef())==null||i.focus()},onKeyDown:a=>{var i;ue(a,r.onKeyDown),a.key===lr.Space&&(t.select(),(i=t.inputRef())==null||i.focus())}},()=>t.dataset(),o))}function Pi(e){const t=gn(),n=X({id:t.generateId("description")},e);return U(()=>j(t.registerDescription(n.id))),m(de,W({as:"div"},()=>t.dataset(),n))}function Li(e){const t=gn(),n=X({id:t.generateId("indicator")},e),[r,o]=oe(n,["ref","forceMount"]),[s,l]=z(),{present:a}=di({show:()=>r.forceMount||t.isSelected(),element:()=>s()??null});return m(B,{get when(){return a()},get children(){return m(de,W({as:"div",ref(i){const c=Me(l,r.ref);typeof c=="function"&&c(i)}},()=>t.dataset(),o))}})}function Oi(e){const t=un(),n=Ai(),r=gn(),o=X({id:r.generateId("input")},e),[s,l]=oe(o,["ref","style","aria-labelledby","aria-describedby","onChange","onFocus","onBlur"]),a=()=>[s["aria-labelledby"],r.labelId(),s["aria-labelledby"]!=null&&l["aria-label"]!=null?l.id:void 0].filter(Boolean).join(" ")||void 0,i=()=>[s["aria-describedby"],r.descriptionId(),n.ariaDescribedBy()].filter(Boolean).join(" ")||void 0,[c,f]=z(!1),g=h=>{if(ue(h,s.onChange),h.stopPropagation(),!c()){n.setSelectedValue(r.value());const y=h.target;y.checked=r.isSelected()}f(!1)},u=h=>{ue(h,s.onFocus),r.setIsFocused(!0)},d=h=>{ue(h,s.onBlur),r.setIsFocused(!1)};return U(ut([()=>r.isSelected(),()=>r.value()],h=>{if(!h[0]&&h[1]===r.value())return;f(!0);const y=r.inputRef();y==null||y.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0})),y==null||y.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0}))},{defer:!0})),U(()=>j(r.registerInput(l.id))),m(de,W({as:"input",ref(h){const y=Me(r.setInputRef,s.ref);typeof y=="function"&&y(h)},type:"radio",get name(){return t.name()},get value(){return r.value()},get checked(){return r.isSelected()},get required(){return t.isRequired()},get disabled(){return r.isDisabled()},get readonly(){return t.isReadOnly()},get style(){return An({...Xo},s.style)},get"aria-labelledby"(){return a()},get"aria-describedby"(){return i()},onChange:g,onFocus:u,onBlur:d},()=>r.dataset(),l))}function _i(e){const t=gn(),n=X({id:t.generateId("label")},e);return U(()=>j(t.registerLabel(n.id))),m(de,W({as:"label",get for(){return t.inputId()}},()=>t.dataset(),n))}function qi(e){return m(Hl,W({as:"span"},e))}function Ri(e){let t;const n=`radiogroup-${Ne()}`,r=X({id:n,orientation:"vertical"},e),[o,s,l]=oe(r,["ref","value","defaultValue","onChange","orientation","aria-labelledby","aria-describedby"],Vl),[a,i]=dn({value:()=>o.value,defaultValue:()=>o.defaultValue,onChange:h=>{var y;return(y=o.onChange)==null?void 0:y.call(o,h)}}),{formControlContext:c}=Gl(s);jl(()=>t,()=>i(o.defaultValue??""));const f=()=>c.getAriaLabelledBy(E(s.id),l["aria-label"],o["aria-labelledby"]),g=()=>c.getAriaDescribedBy(o["aria-describedby"]),u=h=>h===a(),d={ariaDescribedBy:g,isSelectedValue:u,setSelectedValue:h=>{if(!(c.isReadOnly()||c.isDisabled())&&(i(h),t))for(const y of t.querySelectorAll("[type='radio']")){const v=y;v.checked=u(v.value)}}};return m(Zo.Provider,{value:c,get children(){return m(Mi.Provider,{value:d,get children(){return m(de,W({as:"div",ref(h){const y=Me(v=>t=v,o.ref);typeof y=="function"&&y(h)},role:"radiogroup",get id(){return E(s.id)},get"aria-invalid"(){return c.validationState()==="invalid"||void 0},get"aria-required"(){return c.isRequired()||void 0},get"aria-disabled"(){return c.isDisabled()||void 0},get"aria-readonly"(){return c.isReadOnly()||void 0},get"aria-orientation"(){return o.orientation},get"aria-labelledby"(){return f()},get"aria-describedby"(){return g()}},()=>c.dataset(),l))}})}})}var qc=Object.assign(Ri,{Description:Jo,ErrorMessage:ei,Item:Ti,ItemControl:Ii,ItemDescription:Pi,ItemIndicator:Li,ItemInput:Oi,ItemLabel:_i,Label:qi}),Rc=class{constructor(e,t,n){_e(this,"collection");_e(this,"ref");_e(this,"collator");this.collection=e,this.ref=t,this.collator=n}getKeyBelow(e){let t=this.collection().getKeyAfter(e);for(;t!=null;){const n=this.collection().getItem(t);if(n&&n.type==="item"&&!n.disabled)return t;t=this.collection().getKeyAfter(t)}}getKeyAbove(e){let t=this.collection().getKeyBefore(e);for(;t!=null;){const n=this.collection().getItem(t);if(n&&n.type==="item"&&!n.disabled)return t;t=this.collection().getKeyBefore(t)}}getFirstKey(){let e=this.collection().getFirstKey();for(;e!=null;){const t=this.collection().getItem(e);if(t&&t.type==="item"&&!t.disabled)return e;e=this.collection().getKeyAfter(e)}}getLastKey(){let e=this.collection().getLastKey();for(;e!=null;){const t=this.collection().getItem(e);if(t&&t.type==="item"&&!t.disabled)return e;e=this.collection().getKeyBefore(e)}}getItem(e){var t,n;return((n=(t=this.ref)==null?void 0:t.call(this))==null?void 0:n.querySelector(`[data-key="${e}"]`))??null}getKeyPageAbove(e){var s;const t=(s=this.ref)==null?void 0:s.call(this);let n=this.getItem(e);if(!t||!n)return;const r=Math.max(0,n.offsetTop+n.offsetHeight-t.offsetHeight);let o=e;for(;o&&n&&n.offsetTop>r;)o=this.getKeyAbove(o),n=o!=null?this.getItem(o):null;return o}getKeyPageBelow(e){var s;const t=(s=this.ref)==null?void 0:s.call(this);let n=this.getItem(e);if(!t||!n)return;const r=Math.min(t.scrollHeight,n.offsetTop-n.offsetHeight+t.offsetHeight);let o=e;for(;o&&n&&n.offsetTop<r;)o=this.getKeyBelow(o),n=o!=null?this.getItem(o):null;return o}getKeyForSearch(e,t){var o;const n=(o=this.collator)==null?void 0:o.call(this);if(!n)return;let r=t!=null?this.getKeyBelow(t):this.getFirstKey();for(;r!=null;){const s=this.collection().getItem(r);if(s){const l=s.textValue.slice(0,e.length);if(s.textValue&&n.compare(l,e)===0)return r}r=this.getKeyBelow(r)}}};function zc(e,t,n){const r=ha({usage:"search",sensitivity:"base"}),o=D(()=>{const s=E(e.keyboardDelegate);return s||new Rc(e.collection,t,r)});return xa({selectionManager:()=>E(e.selectionManager),keyboardDelegate:o,autoFocus:()=>E(e.autoFocus),deferAutoFocus:()=>E(e.deferAutoFocus),shouldFocusWrap:()=>E(e.shouldFocusWrap),disallowEmptySelection:()=>E(e.disallowEmptySelection),selectOnFocus:()=>E(e.selectOnFocus),disallowTypeAhead:()=>E(e.disallowTypeAhead),shouldUseVirtualFocus:()=>E(e.shouldUseVirtualFocus),allowsTabNavigation:()=>E(e.allowsTabNavigation),isVirtualized:()=>E(e.isVirtualized),scrollToKey:s=>{var l;return(l=E(e.scrollToKey))==null?void 0:l(s)},orientation:()=>E(e.orientation)},t)}var Nn="focusScope.autoFocusOnMount",Un="focusScope.autoFocusOnUnmount",po={bubbles:!1,cancelable:!0},wo={stack:[],active(){return this.stack[0]},add(e){var t;e!==this.active()&&((t=this.active())==null||t.pause()),this.stack=Qn(this.stack,e),this.stack.unshift(e)},remove(e){var t;this.stack=Qn(this.stack,e),(t=this.active())==null||t.resume()}};function Kc(e,t){const[n,r]=z(!1),o={pause(){r(!0)},resume(){r(!1)}};let s=null;const l=h=>{var y;return(y=e.onMountAutoFocus)==null?void 0:y.call(e,h)},a=h=>{var y;return(y=e.onUnmountAutoFocus)==null?void 0:y.call(e,h)},i=()=>Ze(t()),c=()=>{const h=i().createElement("span");return h.setAttribute("data-focus-trap",""),h.tabIndex=0,Object.assign(h.style,Xo),h},f=()=>{const h=t();return h?Qo(h,!0).filter(y=>!y.hasAttribute("data-focus-trap")):[]},g=()=>{const h=f();return h.length>0?h[0]:null},u=()=>{const h=f();return h.length>0?h[h.length-1]:null},d=()=>{const h=t();if(!h)return!1;const y=en(h);return!y||Ke(h,y)?!1:Yo(y)};U(()=>{const h=t();if(!h)return;wo.add(o);const y=en(h);if(!Ke(h,y)){const b=new CustomEvent(Nn,po);h.addEventListener(Nn,l),h.dispatchEvent(b),b.defaultPrevented||setTimeout(()=>{Ee(g()),en(h)===y&&Ee(h)},0)}j(()=>{h.removeEventListener(Nn,l),setTimeout(()=>{const b=new CustomEvent(Un,po);d()&&b.preventDefault(),h.addEventListener(Un,a),h.dispatchEvent(b),b.defaultPrevented||Ee(y??i().body),h.removeEventListener(Un,a),wo.remove(o)},0)})}),U(()=>{const h=t();if(!h||!E(e.trapFocus)||n())return;const y=b=>{const p=b.target;p!=null&&p.closest(`[${Cn}]`)||(Ke(h,p)?s=p:Ee(s))},v=b=>{const w=b.relatedTarget??en(h);w!=null&&w.closest(`[${Cn}]`)||Ke(h,w)||Ee(s)};i().addEventListener("focusin",y),i().addEventListener("focusout",v),j(()=>{i().removeEventListener("focusin",y),i().removeEventListener("focusout",v)})}),U(()=>{const h=t();if(!h||!E(e.trapFocus)||n())return;const y=c();h.insertAdjacentElement("afterbegin",y);const v=c();h.insertAdjacentElement("beforeend",v);function b(w){const x=g(),$=u();w.relatedTarget===x?Ee($):Ee(x)}y.addEventListener("focusin",b),v.addEventListener("focusin",b);const p=new MutationObserver(w=>{for(const x of w)x.previousSibling===v&&(v.remove(),h.insertAdjacentElement("beforeend",v)),x.nextSibling===y&&(y.remove(),h.insertAdjacentElement("afterbegin",y))});p.observe(h,{childList:!0,subtree:!1}),j(()=>{y.removeEventListener("focusin",b),v.removeEventListener("focusin",b),y.remove(),v.remove(),p.disconnect()})})}var Bc="data-live-announcer";function Nc(e){U(()=>{E(e.isDisabled)||j(Uc(E(e.targets),E(e.root)))})}var Zt=new WeakMap,Re=[];function Uc(e,t=document.body){const n=new Set(e),r=new Set,o=i=>{for(const u of i.querySelectorAll(`[${Bc}], [${Cn}]`))n.add(u);const c=u=>{if(n.has(u)||u.parentElement&&r.has(u.parentElement)&&u.parentElement.getAttribute("role")!=="row")return NodeFilter.FILTER_REJECT;for(const d of n)if(u.contains(d))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_ACCEPT},f=document.createTreeWalker(i,NodeFilter.SHOW_ELEMENT,{acceptNode:c}),g=c(i);if(g===NodeFilter.FILTER_ACCEPT&&s(i),g!==NodeFilter.FILTER_REJECT){let u=f.nextNode();for(;u!=null;)s(u),u=f.nextNode()}},s=i=>{const c=Zt.get(i)??0;i.getAttribute("aria-hidden")==="true"&&c===0||(c===0&&i.setAttribute("aria-hidden","true"),r.add(i),Zt.set(i,c+1))};Re.length&&Re[Re.length-1].disconnect(),o(t);const l=new MutationObserver(i=>{for(const c of i)if(!(c.type!=="childList"||c.addedNodes.length===0)&&![...n,...r].some(f=>f.contains(c.target))){for(const f of c.removedNodes)f instanceof Element&&(n.delete(f),r.delete(f));for(const f of c.addedNodes)(f instanceof HTMLElement||f instanceof SVGElement)&&(f.dataset.liveAnnouncer==="true"||f.dataset.reactAriaTopLayer==="true")?n.add(f):f instanceof Element&&o(f)}});l.observe(t,{childList:!0,subtree:!0});const a={observe(){l.observe(t,{childList:!0,subtree:!0})},disconnect(){l.disconnect()}};return Re.push(a),()=>{l.disconnect();for(const i of r){const c=Zt.get(i);if(c==null)return;c===1?(i.removeAttribute("aria-hidden"),Zt.delete(i)):Zt.set(i,c-1)}a===Re[Re.length-1]?(Re.pop(),Re.length&&Re[Re.length-1].observe()):Re.splice(Re.indexOf(a),1)}}var wn=new Map,Vc=e=>{U(()=>{const t=ke(e.style)??{},n=ke(e.properties)??[],r={};for(const s in t)r[s]=e.element.style[s];const o=wn.get(e.key);o?o.activeCount++:wn.set(e.key,{activeCount:1,originalStyles:r,properties:n.map(s=>s.key)}),Object.assign(e.element.style,e.style);for(const s of n)e.element.style.setProperty(s.key,s.value);j(()=>{var l;const s=wn.get(e.key);if(s){if(s.activeCount!==1){s.activeCount--;return}wn.delete(e.key);for(const[a,i]of Object.entries(s.originalStyles))e.element.style[a]=i;for(const a of s.properties)e.element.style.removeProperty(a);e.element.style.length===0&&e.element.removeAttribute("style"),(l=e.cleanup)==null||l.call(e)}})})},xo=Vc,Gc=(e,t)=>{switch(t){case"x":return[e.clientWidth,e.scrollLeft,e.scrollWidth];case"y":return[e.clientHeight,e.scrollTop,e.scrollHeight]}},Hc=(e,t)=>{const n=getComputedStyle(e),r=t==="x"?n.overflowX:n.overflowY;return r==="auto"||r==="scroll"||e.tagName==="HTML"&&r==="visible"},jc=(e,t,n)=>{const r=t==="x"&&window.getComputedStyle(e).direction==="rtl"?-1:1;let o=e,s=0,l=0,a=!1;do{const[i,c,f]=Gc(o,t),g=f-i-r*c;(c!==0||g!==0)&&Hc(o,t)&&(s+=g,l+=c),o===(n??document.documentElement)?a=!0:o=o._$host??o.parentElement}while(o&&!a);return[s,l]},[$o,Co]=z([]),Wc=e=>$o().indexOf(e)===$o().length-1,Qc=e=>{const t=W({element:null,enabled:!0,hideScrollbar:!0,preventScrollbarShift:!0,preventScrollbarShiftMode:"padding",restoreScrollPosition:!0,allowPinchZoom:!1},e),n=Ne();let r=[0,0],o=null,s=null;U(()=>{ke(t.enabled)&&(Co(c=>[...c,n]),j(()=>{Co(c=>c.filter(f=>f!==n))}))}),U(()=>{if(!ke(t.enabled)||!ke(t.hideScrollbar))return;const{body:c}=document,f=window.innerWidth-c.offsetWidth;if(ke(t.preventScrollbarShift)){const g={overflow:"hidden"},u=[];f>0&&(ke(t.preventScrollbarShiftMode)==="padding"?g.paddingRight=`calc(${window.getComputedStyle(c).paddingRight} + ${f}px)`:g.marginRight=`calc(${window.getComputedStyle(c).marginRight} + ${f}px)`,u.push({key:"--scrollbar-width",value:`${f}px`}));const d=window.scrollY,h=window.scrollX;xo({key:"prevent-scroll",element:c,style:g,properties:u,cleanup:()=>{ke(t.restoreScrollPosition)&&f>0&&window.scrollTo(h,d)}})}else xo({key:"prevent-scroll",element:c,style:{overflow:"hidden"}})}),U(()=>{!Wc(n)||!ke(t.enabled)||(document.addEventListener("wheel",a,{passive:!1}),document.addEventListener("touchstart",l,{passive:!1}),document.addEventListener("touchmove",i,{passive:!1}),j(()=>{document.removeEventListener("wheel",a),document.removeEventListener("touchstart",l),document.removeEventListener("touchmove",i)}))});const l=c=>{r=So(c),o=null,s=null},a=c=>{const f=c.target,g=ke(t.element),u=Yc(c),d=Math.abs(u[0])>Math.abs(u[1])?"x":"y",h=d==="x"?u[0]:u[1],y=ko(f,d,h,g);let v;g&&nr(g,f)?v=!y:v=!0,v&&c.cancelable&&c.preventDefault()},i=c=>{const f=ke(t.element),g=c.target;let u;if(c.touches.length===2)u=!ke(t.allowPinchZoom);else{if(o==null||s===null){const d=So(c).map((y,v)=>r[v]-y),h=Math.abs(d[0])>Math.abs(d[1])?"x":"y";o=h,s=h==="x"?d[0]:d[1]}if(g.type==="range")u=!1;else{const d=ko(g,o,s,f);f&&nr(f,g)?u=!d:u=!0}}u&&c.cancelable&&c.preventDefault()}},Yc=e=>[e.deltaX,e.deltaY],So=e=>e.changedTouches[0]?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0],ko=(e,t,n,r)=>{const o=r!==null&&nr(r,e),[s,l]=jc(e,t,o?r:void 0);return!(n>0&&Math.abs(s)<=1||n<0&&Math.abs(l)<1)},nr=(e,t)=>{if(e.contains(t))return!0;let n=t;for(;n;){if(n===e)return!0;n=n._$host??n.parentElement}return!1},Xc=Qc,Zc=Xc,zi=xe();function Ki(){return $e(zi)}function gt(){const e=Ki();if(e===void 0)throw new Error("[kobalte]: `useMenuContext` must be used within a `Menu` component");return e}var Bi=xe();function xr(){const e=$e(Bi);if(e===void 0)throw new Error("[kobalte]: `useMenuItemContext` must be used within a `Menu.Item` component");return e}var Ni=xe();function et(){const e=$e(Ni);if(e===void 0)throw new Error("[kobalte]: `useMenuRootContext` must be used within a `MenuRoot` component");return e}function $r(e){let t;const n=et(),r=gt(),o=X({id:n.generateId(`item-${Ne()}`)},e),[s,l]=oe(o,["ref","textValue","disabled","closeOnSelect","checked","indeterminate","onSelect","onPointerMove","onPointerLeave","onPointerDown","onPointerUp","onClick","onKeyDown","onMouseDown","onFocus"]),[a,i]=z(),[c,f]=z(),[g,u]=z(),d=()=>r.listState().selectionManager(),h=()=>l.id,y=()=>d().focusedKey()===h(),v=()=>{var C;(C=s.onSelect)==null||C.call(s),s.closeOnSelect&&setTimeout(()=>{r.close(!0)})};sa({getItem:()=>{var C;return{ref:()=>t,type:"item",key:h(),textValue:s.textValue??((C=g())==null?void 0:C.textContent)??(t==null?void 0:t.textContent)??"",disabled:s.disabled??!1}}});const b=ui({key:h,selectionManager:d,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>s.disabled},()=>t),p=C=>{ue(C,s.onPointerMove),C.pointerType==="mouse"&&(s.disabled?r.onItemLeave(C):(r.onItemEnter(C),C.defaultPrevented||(Ee(C.currentTarget),r.listState().selectionManager().setFocused(!0),r.listState().selectionManager().setFocusedKey(h()))))},w=C=>{ue(C,s.onPointerLeave),C.pointerType==="mouse"&&r.onItemLeave(C)},x=C=>{ue(C,s.onPointerUp),!s.disabled&&C.button===0&&v()},$=C=>{if(ue(C,s.onKeyDown),!C.repeat&&!s.disabled)switch(C.key){case"Enter":case" ":v();break}},O=D(()=>{if(s.indeterminate)return"mixed";if(s.checked!=null)return s.checked}),T=D(()=>({"data-indeterminate":s.indeterminate?"":void 0,"data-checked":s.checked&&!s.indeterminate?"":void 0,"data-disabled":s.disabled?"":void 0,"data-highlighted":y()?"":void 0})),q={isChecked:()=>s.checked,dataset:T,setLabelRef:u,generateId:cn(()=>l.id),registerLabel:Be(i),registerDescription:Be(f)};return m(Bi.Provider,{value:q,get children(){return m(de,W({as:"div",ref(C){const I=Me(N=>t=N,s.ref);typeof I=="function"&&I(C)},get tabIndex(){return b.tabIndex()},get"aria-checked"(){return O()},get"aria-disabled"(){return s.disabled},get"aria-labelledby"(){return a()},get"aria-describedby"(){return c()},get"data-key"(){return b.dataKey()},get onPointerDown(){return be([s.onPointerDown,b.onPointerDown])},get onPointerUp(){return be([x,b.onPointerUp])},get onClick(){return be([s.onClick,b.onClick])},get onKeyDown(){return be([$,b.onKeyDown])},get onMouseDown(){return be([s.onMouseDown,b.onMouseDown])},get onFocus(){return be([s.onFocus,b.onFocus])},onPointerMove:p,onPointerLeave:w},T,l))}})}function Ui(e){const t=X({closeOnSelect:!1},e),[n,r]=oe(t,["checked","defaultChecked","onChange","onSelect"]),o=Xl({isSelected:()=>n.checked,defaultIsSelected:()=>n.defaultChecked,onSelectedChange:l=>{var a;return(a=n.onChange)==null?void 0:a.call(n,l)},isDisabled:()=>r.disabled});return m($r,W({role:"menuitemcheckbox",get checked(){return o.isSelected()},onSelect:()=>{var l;(l=n.onSelect)==null||l.call(n),o.toggle()}},r))}var Jc=xe();function On(){return $e(Jc)}var ln={next:(e,t)=>e==="ltr"?t==="horizontal"?"ArrowRight":"ArrowDown":t==="horizontal"?"ArrowLeft":"ArrowUp",previous:(e,t)=>ln.next(e==="ltr"?"rtl":"ltr",t)},Eo={first:e=>e==="horizontal"?"ArrowDown":"ArrowRight",last:e=>e==="horizontal"?"ArrowUp":"ArrowLeft"};function Vi(e){const t=et(),n=gt(),r=On(),{direction:o}=$t(),s=X({id:t.generateId("trigger")},e),[l,a]=oe(s,["ref","id","disabled","onPointerDown","onClick","onKeyDown","onMouseOver","onFocus"]);let i=()=>t.value();r!==void 0&&(i=()=>t.value()??l.id,r.lastValue()===void 0&&r.setLastValue(i));const c=Tn(()=>n.triggerRef(),()=>"button"),f=D(()=>{var b;return c()==="a"&&((b=n.triggerRef())==null?void 0:b.getAttribute("href"))!=null});U(ut(()=>r==null?void 0:r.value(),b=>{var p;f()&&b===i()&&((p=n.triggerRef())==null||p.focus())}));const g=()=>{r!==void 0?n.isOpen()?r.value()===i()&&r.closeMenu():(r.autoFocusMenu()||r.setAutoFocusMenu(!0),n.open(!1)):n.toggle(!0)},u=b=>{ue(b,l.onPointerDown),b.currentTarget.dataset.pointerType=b.pointerType,!l.disabled&&b.pointerType!=="touch"&&b.button===0&&g()},d=b=>{ue(b,l.onClick),l.disabled||b.currentTarget.dataset.pointerType==="touch"&&g()},h=b=>{if(ue(b,l.onKeyDown),!l.disabled){if(f())switch(b.key){case"Enter":case" ":return}switch(b.key){case"Enter":case" ":case Eo.first(t.orientation()):b.stopPropagation(),b.preventDefault(),Ul(b.currentTarget),n.open("first"),r==null||r.setAutoFocusMenu(!0),r==null||r.setValue(i);break;case Eo.last(t.orientation()):b.stopPropagation(),b.preventDefault(),n.open("last");break;case ln.next(o(),t.orientation()):if(r===void 0)break;b.stopPropagation(),b.preventDefault(),r.nextMenu();break;case ln.previous(o(),t.orientation()):if(r===void 0)break;b.stopPropagation(),b.preventDefault(),r.previousMenu();break}}},y=b=>{var p;ue(b,l.onMouseOver),((p=n.triggerRef())==null?void 0:p.dataset.pointerType)!=="touch"&&!l.disabled&&r!==void 0&&r.value()!==void 0&&r.setValue(i)},v=b=>{ue(b,l.onFocus),r!==void 0&&b.currentTarget.dataset.pointerType!=="touch"&&r.setValue(i)};return U(()=>j(n.registerTriggerId(l.id))),m(fr,W({ref(b){const p=Me(n.setTriggerRef,l.ref);typeof p=="function"&&p(b)},get"data-kb-menu-value-trigger"(){return t.value()},get id(){return l.id},get disabled(){return l.disabled},"aria-haspopup":"true",get"aria-expanded"(){return n.isOpen()},get"aria-controls"(){return D(()=>!!n.isOpen())()?n.contentId():void 0},get"data-highlighted"(){return i()!==void 0&&(r==null?void 0:r.value())===i()?!0:void 0},get tabIndex(){return r!==void 0?r.value()===i()||r.lastValue()===i()?0:-1:void 0},onPointerDown:u,onMouseOver:y,onClick:d,onKeyDown:h,onFocus:v,role:r!==void 0?"menuitem":void 0},()=>n.dataset(),a))}var eu=xe();function Gi(){return $e(eu)}function Hi(e){let t;const n=et(),r=gt(),o=On(),s=Gi(),{direction:l}=$t(),a=X({id:n.generateId(`content-${Ne()}`)},e),[i,c]=oe(a,["ref","id","style","onOpenAutoFocus","onCloseAutoFocus","onEscapeKeyDown","onFocusOutside","onPointerEnter","onPointerMove","onKeyDown","onMouseDown","onFocusIn","onFocusOut"]);let f=0;const g=()=>r.parentMenuContext()==null&&o===void 0&&n.isModal(),u=zc({selectionManager:r.listState().selectionManager,collection:r.listState().collection,autoFocus:r.autoFocus,deferAutoFocus:!0,shouldFocusWrap:!0,disallowTypeAhead:()=>!r.listState().selectionManager().isFocused(),orientation:()=>n.orientation()==="horizontal"?"vertical":"horizontal"},()=>t);Kc({trapFocus:()=>g()&&r.isOpen(),onMountAutoFocus:w=>{var x;o===void 0&&((x=i.onOpenAutoFocus)==null||x.call(i,w))},onUnmountAutoFocus:i.onCloseAutoFocus},()=>t);const d=w=>{if(Ke(w.currentTarget,w.target)&&(w.key==="Tab"&&r.isOpen()&&w.preventDefault(),o!==void 0&&w.currentTarget.getAttribute("aria-haspopup")!=="true"))switch(w.key){case ln.next(l(),n.orientation()):w.stopPropagation(),w.preventDefault(),r.close(!0),o.setAutoFocusMenu(!0),o.nextMenu();break;case ln.previous(l(),n.orientation()):if(w.currentTarget.hasAttribute("data-closed"))break;w.stopPropagation(),w.preventDefault(),r.close(!0),o.setAutoFocusMenu(!0),o.previousMenu();break}},h=w=>{var x;(x=i.onEscapeKeyDown)==null||x.call(i,w),o==null||o.setAutoFocusMenu(!1),r.close(!0)},y=w=>{var x;(x=i.onFocusOutside)==null||x.call(i,w),n.isModal()&&w.preventDefault()},v=w=>{var x,$;ue(w,i.onPointerEnter),r.isOpen()&&((x=r.parentMenuContext())==null||x.listState().selectionManager().setFocused(!1),($=r.parentMenuContext())==null||$.listState().selectionManager().setFocusedKey(void 0))},b=w=>{if(ue(w,i.onPointerMove),w.pointerType!=="mouse")return;const x=w.target,$=f!==w.clientX;Ke(w.currentTarget,x)&&$&&(r.setPointerDir(w.clientX>f?"right":"left"),f=w.clientX)};U(()=>j(r.registerContentId(i.id)));const p={ref:Me(w=>{r.setContentRef(w),t=w},i.ref),role:"menu",get id(){return i.id},get tabIndex(){return u.tabIndex()},get"aria-labelledby"(){return r.triggerId()},onKeyDown:be([i.onKeyDown,u.onKeyDown,d]),onMouseDown:be([i.onMouseDown,u.onMouseDown]),onFocusIn:be([i.onFocusIn,u.onFocusIn]),onFocusOut:be([i.onFocusOut,u.onFocusOut]),onPointerEnter:v,onPointerMove:b,get"data-orientation"(){return n.orientation()}};return m(B,{get when(){return r.contentPresent()},get children(){return m(B,{get when(){return s===void 0||r.parentMenuContext()!=null},get fallback(){return m(de,W({as:"div"},()=>r.dataset(),p,c))},get children(){return m(ki.Positioner,{get children(){return m(_c,W({get disableOutsidePointerEvents(){return D(()=>!!g())()&&r.isOpen()},get excludedElements(){return[r.triggerRef]},bypassTopMostLayerCheck:!0,get style(){return An({"--kb-menu-content-transform-origin":"var(--kb-popper-content-transform-origin)",position:"relative"},i.style)},onEscapeKeyDown:h,onFocusOutside:y,get onDismiss(){return r.close}},()=>r.dataset(),p,c))}})}})}})}function tu(e){let t;const n=et(),r=gt(),[o,s]=oe(e,["ref"]);return Zc({element:()=>t??null,enabled:()=>r.contentPresent()&&n.preventScroll()}),m(Hi,W({ref(l){const a=Me(i=>{t=i},o.ref);typeof a=="function"&&a(l)}},s))}var ji=xe();function nu(){const e=$e(ji);if(e===void 0)throw new Error("[kobalte]: `useMenuGroupContext` must be used within a `Menu.Group` component");return e}function Cr(e){const t=et(),n=X({id:t.generateId(`group-${Ne()}`)},e),[r,o]=z(),s={generateId:cn(()=>n.id),registerLabelId:Be(o)};return m(ji.Provider,{value:s,get children(){return m(de,W({as:"div",role:"group",get"aria-labelledby"(){return r()}},n))}})}function Wi(e){const t=nu(),n=X({id:t.generateId("label")},e),[r,o]=oe(n,["id"]);return U(()=>j(t.registerLabelId(r.id))),m(de,W({as:"span",get id(){return r.id},"aria-hidden":"true"},o))}function Qi(e){const t=gt(),n=X({children:"▼"},e);return m(de,W({as:"span","aria-hidden":"true"},()=>t.dataset(),n))}function Yi(e){return m($r,W({role:"menuitem",closeOnSelect:!0},e))}function Xi(e){const t=xr(),n=X({id:t.generateId("description")},e),[r,o]=oe(n,["id"]);return U(()=>j(t.registerDescription(r.id))),m(de,W({as:"div",get id(){return r.id}},()=>t.dataset(),o))}function Zi(e){const t=xr(),n=X({id:t.generateId("indicator")},e),[r,o]=oe(n,["forceMount"]);return m(B,{get when(){return r.forceMount||t.isChecked()},get children(){return m(de,W({as:"div"},()=>t.dataset(),o))}})}function Ji(e){const t=xr(),n=X({id:t.generateId("label")},e),[r,o]=oe(n,["ref","id"]);return U(()=>j(t.registerLabel(r.id))),m(de,W({as:"div",ref(s){const l=Me(t.setLabelRef,r.ref);typeof l=="function"&&l(s)},get id(){return r.id}},()=>t.dataset(),o))}function es(e){const t=gt();return m(B,{get when(){return t.contentPresent()},get children(){return m(qo,e)}})}var ts=xe();function ru(){const e=$e(ts);if(e===void 0)throw new Error("[kobalte]: `useMenuRadioGroupContext` must be used within a `Menu.RadioGroup` component");return e}function ns(e){const n=et().generateId(`radiogroup-${Ne()}`),r=X({id:n},e),[o,s]=oe(r,["value","defaultValue","onChange","disabled"]),[l,a]=dn({value:()=>o.value,defaultValue:()=>o.defaultValue,onChange:c=>{var f;return(f=o.onChange)==null?void 0:f.call(o,c)}}),i={isDisabled:()=>o.disabled,isSelectedValue:c=>c===l(),setSelectedValue:a};return m(ts.Provider,{value:i,get children(){return m(Cr,s)}})}function rs(e){const t=ru(),n=X({closeOnSelect:!1},e),[r,o]=oe(n,["value","onSelect"]);return m($r,W({role:"menuitemradio",get checked(){return t.isSelectedValue(r.value)},onSelect:()=>{var l;(l=r.onSelect)==null||l.call(r),t.setSelectedValue(r.value)}},o))}function ou(e,t,n){const r=e.split("-")[0],o=n.getBoundingClientRect(),s=[],l=t.clientX,a=t.clientY;switch(r){case"top":s.push([l,a+5]),s.push([o.left,o.bottom]),s.push([o.left,o.top]),s.push([o.right,o.top]),s.push([o.right,o.bottom]);break;case"right":s.push([l-5,a]),s.push([o.left,o.top]),s.push([o.right,o.top]),s.push([o.right,o.bottom]),s.push([o.left,o.bottom]);break;case"bottom":s.push([l,a-5]),s.push([o.right,o.top]),s.push([o.right,o.bottom]),s.push([o.left,o.bottom]),s.push([o.left,o.top]);break;case"left":s.push([l+5,a]),s.push([o.right,o.bottom]),s.push([o.left,o.bottom]),s.push([o.left,o.top]),s.push([o.right,o.top]);break}return s}function iu(e,t){return t?Nl([e.clientX,e.clientY],t):!1}function os(e){const t=et(),n=ri(),r=Ki(),o=On(),s=Gi(),l=X({placement:t.orientation()==="horizontal"?"bottom-start":"right-start"},e),[a,i]=oe(l,["open","defaultOpen","onOpenChange"]);let c=0,f=null,g="right";const[u,d]=z(),[h,y]=z(),[v,b]=z(),[p,w]=z(),[x,$]=z(!0),[O,T]=z(i.placement),[q,C]=z([]),[I,N]=z([]),{DomCollectionProvider:G}=ia({items:I,onItemsChange:N}),te=Di({open:()=>a.open,defaultOpen:()=>a.defaultOpen,onOpenChange:H=>{var Ce;return(Ce=a.onOpenChange)==null?void 0:Ce.call(a,H)}}),{present:Z}=di({show:()=>t.forceMount()||te.isOpen(),element:()=>p()??null}),ie=Ca({selectionMode:"none",dataSource:I}),R=H=>{$(H),te.open()},Q=(H=!1)=>{te.close(),H&&r&&r.close(!0)},J=H=>{$(H),te.toggle()},ae=()=>{const H=p();H&&(Ee(H),ie.selectionManager().setFocused(!0),ie.selectionManager().setFocusedKey(void 0))},ye=()=>{s!=null?setTimeout(()=>ae()):ae()},Ae=H=>{C(Se=>[...Se,H]);const Ce=r==null?void 0:r.registerNestedMenu(H);return()=>{C(Se=>Qn(Se,H)),Ce==null||Ce()}},ge=H=>g===(f==null?void 0:f.side)&&iu(H,f==null?void 0:f.area),De=H=>{ge(H)&&H.preventDefault()},M=H=>{ge(H)||ye()},fe=H=>{ge(H)&&H.preventDefault()};Nc({isDisabled:()=>!(r==null&&te.isOpen()&&t.isModal()),targets:()=>[p(),...q()].filter(Boolean)}),U(()=>{const H=p();if(!H||!r)return;const Ce=r.registerNestedMenu(H);j(()=>{Ce()})}),U(()=>{r===void 0&&(o==null||o.registerMenu(t.value(),[p(),...q()]))}),U(()=>{var H;r!==void 0||o===void 0||(o.value()===t.value()?((H=v())==null||H.focus(),o.autoFocusMenu()&&R(!0)):Q())}),U(()=>{r!==void 0||o===void 0||te.isOpen()&&o.setValue(t.value())}),j(()=>{r===void 0&&(o==null||o.unregisterMenu(t.value()))});const ht={dataset:D(()=>({"data-expanded":te.isOpen()?"":void 0,"data-closed":te.isOpen()?void 0:""})),isOpen:te.isOpen,contentPresent:Z,nestedMenus:q,currentPlacement:O,pointerGraceTimeoutId:()=>c,autoFocus:x,listState:()=>ie,parentMenuContext:()=>r,triggerRef:v,contentRef:p,triggerId:u,contentId:h,setTriggerRef:b,setContentRef:w,open:R,close:Q,toggle:J,focusContent:ye,onItemEnter:De,onItemLeave:M,onTriggerLeave:fe,setPointerDir:H=>g=H,setPointerGraceTimeoutId:H=>c=H,setPointerGraceIntent:H=>f=H,registerNestedMenu:Ae,registerItemToParentDomCollection:n==null?void 0:n.registerItem,registerTriggerId:Be(d),registerContentId:Be(y)};return m(G,{get children(){return m(zi.Provider,{value:ht,get children(){return m(B,{when:s===void 0,get fallback(){return i.children},get children(){return m(ki,W({anchorRef:v,contentRef:p,onCurrentPlacementChange:T},i))}})}})}})}function is(e){const{direction:t}=$t();return m(os,W({get placement(){return t()==="rtl"?"left-start":"right-start"},flip:!0},e))}var su={close:(e,t)=>e==="ltr"?[t==="horizontal"?"ArrowLeft":"ArrowUp"]:[t==="horizontal"?"ArrowRight":"ArrowDown"]};function ss(e){const t=gt(),n=et(),[r,o]=oe(e,["onFocusOutside","onKeyDown"]),{direction:s}=$t();return m(Hi,W({onOpenAutoFocus:f=>{f.preventDefault()},onCloseAutoFocus:f=>{f.preventDefault()},onFocusOutside:f=>{var u;(u=r.onFocusOutside)==null||u.call(r,f);const g=f.target;Ke(t.triggerRef(),g)||t.close()},onKeyDown:f=>{ue(f,r.onKeyDown);const g=Ke(f.currentTarget,f.target),u=su.close(s(),n.orientation()).includes(f.key),d=t.parentMenuContext()!=null;g&&u&&d&&(t.close(),Ee(t.triggerRef()))}},o))}var Do=["Enter"," "],lu={open:(e,t)=>e==="ltr"?[...Do,t==="horizontal"?"ArrowRight":"ArrowDown"]:[...Do,t==="horizontal"?"ArrowLeft":"ArrowUp"]};function ls(e){let t;const n=et(),r=gt(),o=X({id:n.generateId(`sub-trigger-${Ne()}`)},e),[s,l]=oe(o,["ref","id","textValue","disabled","onPointerMove","onPointerLeave","onPointerDown","onPointerUp","onClick","onKeyDown","onMouseDown","onFocus"]);let a=null;const i=()=>{a&&window.clearTimeout(a),a=null},{direction:c}=$t(),f=()=>s.id,g=()=>{const w=r.parentMenuContext();if(w==null)throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");return w.listState().selectionManager()},u=()=>r.listState().collection(),d=()=>g().focusedKey()===f(),h=ui({key:f,selectionManager:g,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>s.disabled},()=>t),y=w=>{ue(w,s.onClick),!r.isOpen()&&!s.disabled&&r.open(!0)},v=w=>{var $;if(ue(w,s.onPointerMove),w.pointerType!=="mouse")return;const x=r.parentMenuContext();if(x==null||x.onItemEnter(w),!w.defaultPrevented){if(s.disabled){x==null||x.onItemLeave(w);return}!r.isOpen()&&!a&&(($=r.parentMenuContext())==null||$.setPointerGraceIntent(null),a=window.setTimeout(()=>{r.open(!1),i()},100)),x==null||x.onItemEnter(w),w.defaultPrevented||(r.listState().selectionManager().isFocused()&&(r.listState().selectionManager().setFocused(!1),r.listState().selectionManager().setFocusedKey(void 0)),Ee(w.currentTarget),x==null||x.listState().selectionManager().setFocused(!0),x==null||x.listState().selectionManager().setFocusedKey(f()))}},b=w=>{if(ue(w,s.onPointerLeave),w.pointerType!=="mouse")return;i();const x=r.parentMenuContext(),$=r.contentRef();if($){x==null||x.setPointerGraceIntent({area:ou(r.currentPlacement(),w,$),side:r.currentPlacement().split("-")[0]}),window.clearTimeout(x==null?void 0:x.pointerGraceTimeoutId());const O=window.setTimeout(()=>{x==null||x.setPointerGraceIntent(null)},300);x==null||x.setPointerGraceTimeoutId(O)}else{if(x==null||x.onTriggerLeave(w),w.defaultPrevented)return;x==null||x.setPointerGraceIntent(null)}x==null||x.onItemLeave(w)},p=w=>{ue(w,s.onKeyDown),!w.repeat&&(s.disabled||lu.open(c(),n.orientation()).includes(w.key)&&(w.stopPropagation(),w.preventDefault(),g().setFocused(!1),g().setFocusedKey(void 0),r.isOpen()||r.open("first"),r.focusContent(),r.listState().selectionManager().setFocused(!0),r.listState().selectionManager().setFocusedKey(u().getFirstKey())))};return U(()=>{if(r.registerItemToParentDomCollection==null)throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");const w=r.registerItemToParentDomCollection({ref:()=>t,type:"item",key:f(),textValue:s.textValue??(t==null?void 0:t.textContent)??"",disabled:s.disabled??!1});j(w)}),U(ut(()=>{var w;return(w=r.parentMenuContext())==null?void 0:w.pointerGraceTimeoutId()},w=>{j(()=>{var x;window.clearTimeout(w),(x=r.parentMenuContext())==null||x.setPointerGraceIntent(null)})})),U(()=>j(r.registerTriggerId(s.id))),j(()=>{i()}),m(de,W({as:"div",ref(w){const x=Me($=>{r.setTriggerRef($),t=$},s.ref);typeof x=="function"&&x(w)},get id(){return s.id},role:"menuitem",get tabIndex(){return h.tabIndex()},"aria-haspopup":"true",get"aria-expanded"(){return r.isOpen()},get"aria-controls"(){return D(()=>!!r.isOpen())()?r.contentId():void 0},get"aria-disabled"(){return s.disabled},get"data-key"(){return h.dataKey()},get"data-highlighted"(){return d()?"":void 0},get"data-disabled"(){return s.disabled?"":void 0},get onPointerDown(){return be([s.onPointerDown,h.onPointerDown])},get onPointerUp(){return be([s.onPointerUp,h.onPointerUp])},get onClick(){return be([y,h.onClick])},get onKeyDown(){return be([p,h.onKeyDown])},get onMouseDown(){return be([s.onMouseDown,h.onMouseDown])},get onFocus(){return be([s.onFocus,h.onFocus])},onPointerMove:v,onPointerLeave:b},()=>r.dataset(),l))}function au(e){const t=On(),n=`menu-${Ne()}`,r=X({id:n,modal:!0},e),[o,s]=oe(r,["id","modal","preventScroll","forceMount","open","defaultOpen","onOpenChange","value","orientation"]),l=Di({open:()=>o.open,defaultOpen:()=>o.defaultOpen,onOpenChange:i=>{var c;return(c=o.onOpenChange)==null?void 0:c.call(o,i)}}),a={isModal:()=>o.modal??!0,preventScroll:()=>o.preventScroll??a.isModal(),forceMount:()=>o.forceMount??!1,generateId:cn(()=>o.id),value:()=>o.value,orientation:()=>o.orientation??(t==null?void 0:t.orientation())??"horizontal"};return m(Ni.Provider,{value:a,get children(){return m(os,W({get open(){return l.isOpen()},get onOpenChange(){return l.setIsOpen}},s))}})}var cu={};In(cu,{Root:()=>_n,Separator:()=>uu});function _n(e){let t;const n=X({orientation:"horizontal"},e),[r,o]=oe(n,["ref","orientation"]),s=Tn(()=>t,()=>"hr");return m(de,W({as:"hr",ref(l){const a=Me(i=>t=i,r.ref);typeof a=="function"&&a(l)},get role(){return s()!=="hr"?"separator":void 0},get"aria-orientation"(){return r.orientation==="vertical"?"vertical":void 0},get"data-orientation"(){return r.orientation}},o))}var uu=_n,he={};In(he,{Arrow:()=>wr,CheckboxItem:()=>Ui,Content:()=>as,DropdownMenu:()=>du,Group:()=>Cr,GroupLabel:()=>Wi,Icon:()=>Qi,Item:()=>Yi,ItemDescription:()=>Xi,ItemIndicator:()=>Zi,ItemLabel:()=>Ji,Portal:()=>es,RadioGroup:()=>ns,RadioItem:()=>rs,Root:()=>cs,Separator:()=>_n,Sub:()=>is,SubContent:()=>ss,SubTrigger:()=>ls,Trigger:()=>Vi});function as(e){const t=et(),n=gt(),[r,o]=oe(e,["onCloseAutoFocus","onInteractOutside"]);let s=!1;return m(tu,W({onCloseAutoFocus:i=>{var c;(c=r.onCloseAutoFocus)==null||c.call(r,i),s||Ee(n.triggerRef()),s=!1,i.preventDefault()},onInteractOutside:i=>{var c;(c=r.onInteractOutside)==null||c.call(r,i),(!t.isModal()||i.detail.isContextMenu)&&(s=!0)}},o))}function cs(e){const t=`dropdownmenu-${Ne()}`,n=X({id:t},e);return m(au,n)}var du=Object.assign(cs,{Arrow:wr,CheckboxItem:Ui,Content:as,Group:Cr,GroupLabel:Wi,Icon:Qi,Item:Yi,ItemDescription:Xi,ItemIndicator:Zi,ItemLabel:Ji,Portal:es,RadioGroup:ns,RadioItem:rs,Separator:_n,Sub:is,SubContent:ss,SubTrigger:ls,Trigger:Vi}),S={colors:{inherit:"inherit",current:"currentColor",transparent:"transparent",black:"#000000",white:"#ffffff",neutral:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},darkGray:{50:"#525c7a",100:"#49536e",200:"#414962",300:"#394056",400:"#313749",500:"#292e3d",600:"#212530",700:"#191c24",800:"#111318",900:"#0b0d10"},gray:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},blue:{25:"#F5FAFF",50:"#EFF8FF",100:"#D1E9FF",200:"#B2DDFF",300:"#84CAFF",400:"#53B1FD",500:"#2E90FA",600:"#1570EF",700:"#175CD3",800:"#1849A9",900:"#194185"},green:{25:"#F6FEF9",50:"#ECFDF3",100:"#D1FADF",200:"#A6F4C5",300:"#6CE9A6",400:"#32D583",500:"#12B76A",600:"#039855",700:"#027A48",800:"#05603A",900:"#054F31"},red:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a"},yellow:{25:"#FFFCF5",50:"#FFFAEB",100:"#FEF0C7",200:"#FEDF89",300:"#FEC84B",400:"#FDB022",500:"#F79009",600:"#DC6803",700:"#B54708",800:"#93370D",900:"#7A2E0E"},purple:{25:"#FAFAFF",50:"#F4F3FF",100:"#EBE9FE",200:"#D9D6FE",300:"#BDB4FE",400:"#9B8AFB",500:"#7A5AF8",600:"#6938EF",700:"#5925DC",800:"#4A1FB8",900:"#3E1C96"},teal:{25:"#F6FEFC",50:"#F0FDF9",100:"#CCFBEF",200:"#99F6E0",300:"#5FE9D0",400:"#2ED3B7",500:"#15B79E",600:"#0E9384",700:"#107569",800:"#125D56",900:"#134E48"},pink:{25:"#fdf2f8",50:"#fce7f3",100:"#fbcfe8",200:"#f9a8d4",300:"#f472b6",400:"#ec4899",500:"#db2777",600:"#be185d",700:"#9d174d",800:"#831843",900:"#500724"},cyan:{25:"#ecfeff",50:"#cffafe",100:"#a5f3fc",200:"#67e8f9",300:"#22d3ee",400:"#06b6d4",500:"#0891b2",600:"#0e7490",700:"#155e75",800:"#164e63",900:"#083344"}},alpha:{90:"e5",80:"cc"},font:{size:{xs:"calc(var(--tsqd-font-size) * 0.75)",sm:"calc(var(--tsqd-font-size) * 0.875)",md:"var(--tsqd-font-size)"},lineHeight:{xs:"calc(var(--tsqd-font-size) * 1)",sm:"calc(var(--tsqd-font-size) * 1.25)",md:"calc(var(--tsqd-font-size) * 1.5)"},weight:{medium:"500",semibold:"600",bold:"700"}},border:{radius:{xs:"calc(var(--tsqd-font-size) * 0.125)",sm:"calc(var(--tsqd-font-size) * 0.25)",full:"9999px"}},size:{.25:"calc(var(--tsqd-font-size) * 0.0625)",.5:"calc(var(--tsqd-font-size) * 0.125)",1:"calc(var(--tsqd-font-size) * 0.25)",1.5:"calc(var(--tsqd-font-size) * 0.375)",2:"calc(var(--tsqd-font-size) * 0.5)",2.5:"calc(var(--tsqd-font-size) * 0.625)",3:"calc(var(--tsqd-font-size) * 0.75)",3.5:"calc(var(--tsqd-font-size) * 0.875)",4:"calc(var(--tsqd-font-size) * 1)",4.5:"calc(var(--tsqd-font-size) * 1.125)",5:"calc(var(--tsqd-font-size) * 1.25)",6:"calc(var(--tsqd-font-size) * 1.5)",6.5:"calc(var(--tsqd-font-size) * 1.625)",14:"calc(var(--tsqd-font-size) * 3.5)"},shadow:{xs:(e="rgb(0 0 0 / 0.1)")=>"0 1px 2px 0 rgb(0 0 0 / 0.05)",sm:(e="rgb(0 0 0 / 0.1)")=>`0 1px 3px 0 ${e}, 0 1px 2px -1px ${e}`,md:(e="rgb(0 0 0 / 0.1)")=>`0 4px 6px -1px ${e}, 0 2px 4px -2px ${e}`,lg:(e="rgb(0 0 0 / 0.1)")=>`0 10px 15px -3px ${e}, 0 4px 6px -4px ${e}`,xl:(e="rgb(0 0 0 / 0.1)")=>`0 20px 25px -5px ${e}, 0 8px 10px -6px ${e}`,"2xl":(e="rgb(0 0 0 / 0.25)")=>`0 25px 50px -12px ${e}`,inner:(e="rgb(0 0 0 / 0.05)")=>`inset 0 2px 4px 0 ${e}`,none:()=>"none"}},fu=_('<svg width=14 height=14 viewBox="0 0 14 14"fill=none xmlns=http://www.w3.org/2000/svg><path d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),gu=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),hu=_('<svg width=10 height=6 viewBox="0 0 10 6"fill=none xmlns=http://www.w3.org/2000/svg><path d="M1 1L5 5L9 1"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),yu=_('<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 13.3333V2.66667M8 2.66667L4 6.66667M8 2.66667L12 6.66667"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),Sr=_('<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),vu=_('<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),mu=_('<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M22 15.844a10.424 10.424 0 0 1-4.306.925c-5.779 0-10.463-4.684-10.463-10.462 0-1.536.33-2.994.925-4.307A10.464 10.464 0 0 0 2 11.538C2 17.316 6.684 22 12.462 22c4.243 0 7.896-2.526 9.538-6.156Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),bu=_('<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 21h8m-4-4v4m-5.2-4h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 14.72 22 13.88 22 12.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 3 18.88 3 17.2 3H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 5.28 2 6.12 2 7.8v4.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 17 5.12 17 6.8 17Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),pu=_('<svg stroke=currentColor fill=currentColor stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M0 0h24v24H0z"></path><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z">'),wu=_('<svg stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z"></path><path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4a9.793 9.793 0 00-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24A9.684 9.684 0 005 13v.01L6.99 15a7.042 7.042 0 014.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3a4.237 4.237 0 00-6 0z">'),xu=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.3951 19.3711L9.97955 20.6856C10.1533 21.0768 10.4368 21.4093 10.7958 21.6426C11.1547 21.8759 11.5737 22.0001 12.0018 22C12.4299 22.0001 12.8488 21.8759 13.2078 21.6426C13.5667 21.4093 13.8503 21.0768 14.024 20.6856L14.6084 19.3711C14.8165 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5678 17.8941 17.0784 17.9478L18.5084 18.1C18.9341 18.145 19.3637 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8715 16.635 20.9735 16.2103 20.9511 15.7829C20.9286 15.3555 20.7825 14.9438 20.5307 14.5978L19.684 13.4344C19.3825 13.0171 19.2214 12.5148 19.224 12C19.2239 11.4866 19.3865 10.9864 19.6884 10.5711L20.5351 9.40778C20.787 9.06175 20.933 8.65007 20.9555 8.22267C20.978 7.79528 20.8759 7.37054 20.6618 7C20.4479 6.62923 20.131 6.32849 19.7496 6.13423C19.3681 5.93997 18.9386 5.86053 18.5129 5.90556L17.0829 6.05778C16.5722 6.11141 16.0577 6.00212 15.6129 5.74556C15.17 5.48825 14.82 5.09736 14.6129 4.62889L14.024 3.31444C13.8503 2.92317 13.5667 2.59072 13.2078 2.3574C12.8488 2.12408 12.4299 1.99993 12.0018 2C11.5737 1.99993 11.1547 2.12408 10.7958 2.3574C10.4368 2.59072 10.1533 2.92317 9.97955 3.31444L9.3951 4.62889C9.18803 5.09736 8.83798 5.48825 8.3951 5.74556C7.95032 6.00212 7.43577 6.11141 6.9251 6.05778L5.49066 5.90556C5.06499 5.86053 4.6354 5.93997 4.25397 6.13423C3.87255 6.32849 3.55567 6.62923 3.34177 7C3.12759 7.37054 3.02555 7.79528 3.04804 8.22267C3.07052 8.65007 3.21656 9.06175 3.46844 9.40778L4.3151 10.5711C4.61704 10.9864 4.77964 11.4866 4.77955 12C4.77964 12.5134 4.61704 13.0137 4.3151 13.4289L3.46844 14.5922C3.21656 14.9382 3.07052 15.3499 3.04804 15.7773C3.02555 16.2047 3.12759 16.6295 3.34177 17C3.55589 17.3706 3.8728 17.6712 4.25417 17.8654C4.63554 18.0596 5.06502 18.1392 5.49066 18.0944L6.92066 17.9422C7.43133 17.8886 7.94587 17.9979 8.39066 18.2544C8.83519 18.511 9.18687 18.902 9.3951 19.3711Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><path d="M12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9C10.3431 9 8.99998 10.3431 8.99998 12C8.99998 13.6569 10.3431 15 12 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),$u=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M11.5 12.5L17 7M17 7H12M17 7V12M6.2 21H8.8C9.9201 21 10.4802 21 10.908 20.782C11.2843 20.5903 11.5903 20.2843 11.782 19.908C12 19.4802 12 18.9201 12 17.8V15.2C12 14.0799 12 13.5198 11.782 13.092C11.5903 12.7157 11.2843 12.4097 10.908 12.218C10.4802 12 9.92011 12 8.8 12H6.2C5.0799 12 4.51984 12 4.09202 12.218C3.71569 12.4097 3.40973 12.7157 3.21799 13.092C3 13.5198 3 14.0799 3 15.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Cu=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path class=copier d="M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round stroke=currentColor>'),Su=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.5 21.4998L8.04927 19.3655C8.40421 19.229 8.58168 19.1607 8.74772 19.0716C8.8952 18.9924 9.0358 18.901 9.16804 18.7984C9.31692 18.6829 9.45137 18.5484 9.72028 18.2795L21 6.99982C22.1046 5.89525 22.1046 4.10438 21 2.99981C19.8955 1.89525 18.1046 1.89524 17 2.99981L5.72028 14.2795C5.45138 14.5484 5.31692 14.6829 5.20139 14.8318C5.09877 14.964 5.0074 15.1046 4.92823 15.2521C4.83911 15.4181 4.77085 15.5956 4.63433 15.9506L2.5 21.4998ZM2.5 21.4998L4.55812 16.1488C4.7054 15.7659 4.77903 15.5744 4.90534 15.4867C5.01572 15.4101 5.1523 15.3811 5.2843 15.4063C5.43533 15.4351 5.58038 15.5802 5.87048 15.8703L8.12957 18.1294C8.41967 18.4195 8.56472 18.5645 8.59356 18.7155C8.61877 18.8475 8.58979 18.9841 8.51314 19.0945C8.42545 19.2208 8.23399 19.2944 7.85107 19.4417L2.5 21.4998Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),us=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),ku=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke=#F04438 stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Eu=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 xmlns=http://www.w3.org/2000/svg><rect class=list width=20 height=20 y=2 x=2 rx=2></rect><line class=list-item y1=7 y2=7 x1=6 x2=18></line><line class=list-item y2=12 y1=12 x1=6 x2=18></line><line class=list-item y1=17 y2=17 x1=6 x2=18>'),Du=_('<svg viewBox="0 0 24 24"height=20 width=20 fill=none xmlns=http://www.w3.org/2000/svg><path d="M3 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C5.28 3 6.12 3 7.8 3h8.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C21 5.28 21 6.12 21 7.8v8.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V7.8Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Mu=_('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Au=_('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><animateTransform attributeName=transform attributeType=XML type=rotate from=0 to=360 dur=2s repeatCount=indefinite>'),Fu=_('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Tu=_('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Iu=_('<svg version=1.0 viewBox="0 0 633 633"><linearGradient x1=-666.45 x2=-666.45 y1=163.28 y2=163.99 gradientTransform="matrix(633 0 0 633 422177 -103358)"gradientUnits=userSpaceOnUse><stop stop-color=#6BDAFF offset=0></stop><stop stop-color=#F9FFB5 offset=.32></stop><stop stop-color=#FFA770 offset=.71></stop><stop stop-color=#FF7373 offset=1></stop></linearGradient><circle cx=316.5 cy=316.5 r=316.5></circle><defs><filter x=-137.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=316.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=316.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=316.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=272.2 y=308 width=176.9 height=129.3 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=272.2 y=308 width=176.9 height=129.3 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><line x1=436 x2=431 y1=403.2 y2=431.8 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=291 x2=280 y1=341.5 y2=403.5 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=332.9 x2=328.6 y1=384.1 y2=411.2 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><linearGradient x1=-670.75 x2=-671.59 y1=164.4 y2=164.49 gradientTransform="matrix(-184.16 -32.472 -11.461 64.997 -121359 -32126)"gradientUnits=userSpaceOnUse><stop stop-color=#EE2700 offset=0></stop><stop stop-color=#FF008E offset=1></stop></linearGradient><path d="m344.1 363 97.7 17.2c5.8 2.1 8.2 6.1 7.1 12.1s-4.7 9.2-11 9.9l-106-18.7-57.5-59.2c-3.2-4.8-2.9-9.1 0.8-12.8s8.3-4.4 13.7-2.1l55.2 53.6z"clip-rule=evenodd fill-rule=evenodd></path><line x1=428.2 x2=429.1 y1=384.5 y2=378 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=395.2 x2=396.1 y1=379.5 y2=373 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=362.2 x2=363.1 y1=373.5 y2=367.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=324.2 x2=328.4 y1=351.3 y2=347.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=303.2 x2=307.4 y1=331.3 y2=327.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line></g><defs><filter x=73.2 y=113.8 width=280.6 height=317.4 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=73.2 y=113.8 width=280.6 height=317.4 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-672.16 x2=-672.16 y1=165.03 y2=166.03 gradientTransform="matrix(-100.18 48.861 97.976 200.88 -83342 -93.059)"gradientUnits=userSpaceOnUse><stop stop-color=#A17500 offset=0></stop><stop stop-color=#5D2100 offset=1></stop></linearGradient><path d="m192.3 203c8.1 37.3 14 73.6 17.8 109.1 3.8 35.4 2.8 75.1-3 119.2l61.2-16.7c-15.6-59-25.2-97.9-28.6-116.6s-10.8-51.9-22.1-99.6l-25.3 4.6"clip-rule=evenodd fill-rule=evenodd></path><g stroke=#2F8A00><linearGradient x1=-660.23 x2=-660.23 y1=166.72 y2=167.72 gradientTransform="matrix(92.683 4.8573 -2.0259 38.657 61680 -3088.6)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9s-12.6-22.1-36.5-29.9c-15.9-5.2-34.4-1.5-55.5 11.1 15.9 14.3 29.5 22.6 40.7 24.9 16.8 3.6 51.3-6.1 51.3-6.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-661.36 x2=-661.36 y1=164.18 y2=165.18 gradientTransform="matrix(110 5.7648 -6.3599 121.35 73933 -15933)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5s-47.5-8.5-83.2 15.7c-23.8 16.2-34.3 49.3-31.6 99.4 30.3-27.8 52.1-48.5 65.2-61.9 19.8-20.2 49.6-53.2 49.6-53.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.79 x2=-656.79 y1=165.15 y2=166.15 gradientTransform="matrix(62.954 3.2993 -3.5023 66.828 42156 -8754.1)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9c-0.8-21.9 6-38 20.6-48.2s29.8-15.4 45.5-15.3c-6.1 21.4-14.5 35.8-25.2 43.4s-24.4 14.2-40.9 20.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-663.07 x2=-663.07 y1=165.44 y2=166.44 gradientTransform="matrix(152.47 7.9907 -3.0936 59.029 101884 -4318.7)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c31.9-30 64.1-39.7 96.7-29s50.8 30.4 54.6 59.1c-35.2-5.5-60.4-9.6-75.8-12.1-15.3-2.6-40.5-8.6-75.5-18z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-662.57 x2=-662.57 y1=164.44 y2=165.44 gradientTransform="matrix(136.46 7.1517 -5.2163 99.533 91536 -11442)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c35.8-7.6 65.6-0.2 89.2 22s37.7 49 42.3 80.3c-39.8-9.7-68.3-23.8-85.5-42.4s-32.5-38.5-46-59.9z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.43 x2=-656.43 y1=163.86 y2=164.86 gradientTransform="matrix(60.866 3.1899 -8.7773 167.48 41560 -25168)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c-33.6 13.8-53.6 35.7-60.1 65.6s-3.6 63.1 8.7 99.6c27.4-40.3 43.2-69.6 47.4-88s5.6-44.1 4-77.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><path d="m196.5 182.3c-14.8 21.6-25.1 41.4-30.8 59.4s-9.5 33-11.1 45.1"fill=none stroke-linecap=round stroke-width=8></path><path d="m194.9 185.7c-24.4 1.7-43.8 9-58.1 21.8s-24.7 25.4-31.3 37.8"fill=none stroke-linecap=round stroke-width=8></path><path d="m204.5 176.4c29.7-6.7 52-8.4 67-5.1s26.9 8.6 35.8 15.9"fill=none stroke-linecap=round stroke-width=8></path><path d="m196.5 181.4c20.3 9.9 38.2 20.5 53.9 31.9s27.4 22.1 35.1 32"fill=none stroke-linecap=round stroke-width=8></path></g></g><defs><filter x=50.5 y=399 width=532 height=633 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=50.5 y=399 width=532 height=633 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-666.06 x2=-666.23 y1=163.36 y2=163.75 gradientTransform="matrix(532 0 0 633 354760 -102959)"gradientUnits=userSpaceOnUse><stop stop-color=#FFF400 offset=0></stop><stop stop-color=#3C8700 offset=1></stop></linearGradient><ellipse cx=316.5 cy=715.5 rx=266 ry=316.5></ellipse></g><defs><filter x=391 y=-24 width=288 height=283 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=391 y=-24 width=288 height=283 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-664.56 x2=-664.56 y1=163.79 y2=164.79 gradientTransform="matrix(227 0 0 227 151421 -37204)"gradientUnits=userSpaceOnUse><stop stop-color=#FFDF00 offset=0></stop><stop stop-color=#FF9D00 offset=1></stop></linearGradient><circle cx=565.5 cy=89.5 r=113.5></circle><linearGradient x1=-644.5 x2=-645.77 y1=342 y2=342 gradientTransform="matrix(30 0 0 1 19770 -253)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=427 x2=397 y1=89 y2=89 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-641.56 x2=-642.83 y1=196.02 y2=196.07 gradientTransform="matrix(26.5 0 0 5.5 17439 -1025.5)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=430.5 x2=404 y1=55.5 y2=50 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-643.73 x2=-645 y1=185.83 y2=185.9 gradientTransform="matrix(29 0 0 8 19107 -1361)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=431 x2=402 y1=122 y2=130 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-638.94 x2=-640.22 y1=177.09 y2=177.39 gradientTransform="matrix(24 0 0 13 15783 -2145)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=442 x2=418 y1=153 y2=166 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-633.42 x2=-634.7 y1=172.41 y2=173.31 gradientTransform="matrix(20 0 0 19 13137 -3096)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=464 x2=444 y1=180 y2=199 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-619.05 x2=-619.52 y1=170.82 y2=171.82 gradientTransform="matrix(13.83 0 0 22.85 9050 -3703.4)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=491.4 x2=477.5 y1=203 y2=225.9 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-578.5 x2=-578.63 y1=170.31 y2=171.31 gradientTransform="matrix(7.5 0 0 24.5 4860 -3953)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=524.5 x2=517 y1=219.5 y2=244 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=666.5 x2=666.5 y1=170.31 y2=171.31 gradientTransform="matrix(.5 0 0 24.5 231.5 -3944)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=564.5 x2=565 y1=228.5 y2=253 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12>');function Pu(){return fu()}function ds(){return gu()}function nn(){return hu()}function Mo(){return yu()}function Ao(){return Sr()}function Lu(){return(()=>{var e=Sr();return e.style.setProperty("transform","rotate(90deg)"),e})()}function Ou(){return(()=>{var e=Sr();return e.style.setProperty("transform","rotate(-90deg)"),e})()}function _u(){return vu()}function qu(){return mu()}function Ru(){return bu()}function zu(){return pu()}function Ku(){return wu()}function Bu(){return xu()}function Nu(){return $u()}function Uu(){return Cu()}function Vu(){return Su()}function Gu(e){return(()=>{var t=us(),n=t.firstChild;return V(()=>A(n,"stroke",e.theme==="dark"?"#12B76A":"#027A48")),t})()}function Hu(){return ku()}function ju(){return Eu()}function Wu(e){return[m(B,{get when(){return e.checked},get children(){var t=us(),n=t.firstChild;return V(()=>A(n,"stroke",e.theme==="dark"?"#9B8AFB":"#6938EF")),t}}),m(B,{get when(){return!e.checked},get children(){var t=Du(),n=t.firstChild;return V(()=>A(n,"stroke",e.theme==="dark"?"#9B8AFB":"#6938EF")),t}})]}function Qu(){return Mu()}function Yu(){return Au()}function Xu(){return Fu()}function Zu(){return Tu()}function Fo(){const e=Ne();return(()=>{var t=Iu(),n=t.firstChild,r=n.nextSibling,o=r.nextSibling,s=o.firstChild,l=o.nextSibling,a=l.firstChild,i=l.nextSibling,c=i.nextSibling,f=c.firstChild,g=c.nextSibling,u=g.firstChild,d=g.nextSibling,h=d.nextSibling,y=h.firstChild,v=h.nextSibling,b=v.firstChild,p=v.nextSibling,w=p.nextSibling,x=w.firstChild,$=w.nextSibling,O=$.firstChild,T=$.nextSibling,q=T.nextSibling,C=q.firstChild,I=q.nextSibling,N=I.firstChild,G=I.nextSibling,te=G.nextSibling,Z=te.firstChild,ie=te.nextSibling,R=ie.firstChild,Q=ie.nextSibling,J=Q.nextSibling,ae=J.firstChild,ye=J.nextSibling,Ae=ye.firstChild,ge=ye.nextSibling,De=ge.firstChild,M=De.nextSibling,fe=M.nextSibling,ee=fe.nextSibling,ht=ee.nextSibling,H=ge.nextSibling,Ce=H.firstChild,Se=H.nextSibling,It=Se.firstChild,Oe=Se.nextSibling,yt=Oe.firstChild,Ct=yt.nextSibling,tt=Ct.nextSibling,Ye=tt.firstChild,nt=Ye.nextSibling,P=nt.nextSibling,ne=P.nextSibling,ve=ne.nextSibling,le=ve.nextSibling,se=le.nextSibling,ce=se.nextSibling,me=ce.nextSibling,re=me.nextSibling,rt=re.nextSibling,ot=rt.nextSibling,Ge=Oe.nextSibling,St=Ge.firstChild,it=Ge.nextSibling,kt=it.firstChild,st=it.nextSibling,vt=st.firstChild,yn=vt.nextSibling,jt=st.nextSibling,vn=jt.firstChild,Pt=jt.nextSibling,mn=Pt.firstChild,Wt=Pt.nextSibling,Qt=Wt.firstChild,Yt=Qt.nextSibling,Lt=Yt.nextSibling,Er=Lt.nextSibling,Dr=Er.nextSibling,Mr=Dr.nextSibling,Ar=Mr.nextSibling,Fr=Ar.nextSibling,Tr=Fr.nextSibling,Ir=Tr.nextSibling,Pr=Ir.nextSibling,Lr=Pr.nextSibling,Or=Lr.nextSibling,_r=Or.nextSibling,qr=_r.nextSibling,Rr=qr.nextSibling,zr=Rr.nextSibling,ms=zr.nextSibling;return A(n,"id",`a-${e}`),A(r,"fill",`url(#a-${e})`),A(s,"id",`am-${e}`),A(l,"id",`b-${e}`),A(a,"filter",`url(#am-${e})`),A(i,"mask",`url(#b-${e})`),A(f,"id",`ah-${e}`),A(g,"id",`k-${e}`),A(u,"filter",`url(#ah-${e})`),A(d,"mask",`url(#k-${e})`),A(y,"id",`ae-${e}`),A(v,"id",`j-${e}`),A(b,"filter",`url(#ae-${e})`),A(p,"mask",`url(#j-${e})`),A(x,"id",`ai-${e}`),A($,"id",`i-${e}`),A(O,"filter",`url(#ai-${e})`),A(T,"mask",`url(#i-${e})`),A(C,"id",`aj-${e}`),A(I,"id",`h-${e}`),A(N,"filter",`url(#aj-${e})`),A(G,"mask",`url(#h-${e})`),A(Z,"id",`ag-${e}`),A(ie,"id",`g-${e}`),A(R,"filter",`url(#ag-${e})`),A(Q,"mask",`url(#g-${e})`),A(ae,"id",`af-${e}`),A(ye,"id",`f-${e}`),A(Ae,"filter",`url(#af-${e})`),A(ge,"mask",`url(#f-${e})`),A(ee,"id",`m-${e}`),A(ht,"fill",`url(#m-${e})`),A(Ce,"id",`ak-${e}`),A(Se,"id",`e-${e}`),A(It,"filter",`url(#ak-${e})`),A(Oe,"mask",`url(#e-${e})`),A(yt,"id",`n-${e}`),A(Ct,"fill",`url(#n-${e})`),A(Ye,"id",`r-${e}`),A(nt,"fill",`url(#r-${e})`),A(P,"id",`s-${e}`),A(ne,"fill",`url(#s-${e})`),A(ve,"id",`q-${e}`),A(le,"fill",`url(#q-${e})`),A(se,"id",`p-${e}`),A(ce,"fill",`url(#p-${e})`),A(me,"id",`o-${e}`),A(re,"fill",`url(#o-${e})`),A(rt,"id",`l-${e}`),A(ot,"fill",`url(#l-${e})`),A(St,"id",`al-${e}`),A(it,"id",`d-${e}`),A(kt,"filter",`url(#al-${e})`),A(st,"mask",`url(#d-${e})`),A(vt,"id",`u-${e}`),A(yn,"fill",`url(#u-${e})`),A(vn,"id",`ad-${e}`),A(Pt,"id",`c-${e}`),A(mn,"filter",`url(#ad-${e})`),A(Wt,"mask",`url(#c-${e})`),A(Qt,"id",`t-${e}`),A(Yt,"fill",`url(#t-${e})`),A(Lt,"id",`v-${e}`),A(Er,"stroke",`url(#v-${e})`),A(Dr,"id",`aa-${e}`),A(Mr,"stroke",`url(#aa-${e})`),A(Ar,"id",`w-${e}`),A(Fr,"stroke",`url(#w-${e})`),A(Tr,"id",`ac-${e}`),A(Ir,"stroke",`url(#ac-${e})`),A(Pr,"id",`ab-${e}`),A(Lr,"stroke",`url(#ab-${e})`),A(Or,"id",`y-${e}`),A(_r,"stroke",`url(#y-${e})`),A(qr,"id",`x-${e}`),A(Rr,"stroke",`url(#x-${e})`),A(zr,"id",`z-${e}`),A(ms,"stroke",`url(#z-${e})`),t})()}var Ju=_('<span><svg width=16 height=16 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6 12L10 8L6 4"stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),ed=_('<button title="Copy object to clipboard">'),td=_('<button title="Remove all items"aria-label="Remove all items">'),nd=_('<button title="Delete item"aria-label="Delete item">'),rd=_('<button title="Toggle value"aria-label="Toggle value">'),od=_('<button title="Bulk Edit Data"aria-label="Bulk Edit Data">'),Jt=_("<div>"),id=_("<div><button> <span></span> <span> "),sd=_("<input>"),To=_("<span>"),ld=_("<div><span>:"),ad=_("<div><div><button> [<!>...<!>]");function cd(e,t){let n=0;const r=[];for(;n<e.length;)r.push(e.slice(n,n+t)),n=n+t;return r}var Io=e=>{const t=pe(),n=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,r=D(()=>t()==="dark"?Ht(n):Gt(n));return(()=>{var o=Ju();return V(()=>F(o,L(r().expander,n`
          transform: rotate(${e.expanded?90:0}deg);
        `,e.expanded&&n`
            & svg {
              top: -1px;
            }
          `))),o})()},ud=e=>{const t=pe(),n=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,r=D(()=>t()==="dark"?Ht(n):Gt(n)),[o,s]=z("NoCopy");return(()=>{var l=ed();return Fs(l,"click",o()==="NoCopy"?()=>{navigator.clipboard.writeText(Ts(e.value)).then(()=>{s("SuccessCopy"),setTimeout(()=>{s("NoCopy")},1500)},a=>{s("ErrorCopy"),setTimeout(()=>{s("NoCopy")},1500)})}:void 0,!0),k(l,m(Is,{get children(){return[m(Rn,{get when(){return o()==="NoCopy"},get children(){return m(Uu,{})}}),m(Rn,{get when(){return o()==="SuccessCopy"},get children(){return m(Gu,{get theme(){return t()}})}}),m(Rn,{get when(){return o()==="ErrorCopy"},get children(){return m(Hu,{})}})]}})),V(a=>{var i=r().actionButton,c=`${o()==="NoCopy"?"Copy object to clipboard":o()==="SuccessCopy"?"Object copied to clipboard":"Error copying object to clipboard"}`;return i!==a.e&&F(l,a.e=i),c!==a.t&&A(l,"aria-label",a.t=c),a},{e:void 0,t:void 0}),l})()},dd=e=>{const t=pe(),n=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,r=D(()=>t()==="dark"?Ht(n):Gt(n)),o=K().client;return(()=>{var s=td();return s.$$click=()=>{const l=e.activeQuery.state.data,a=or(l,e.dataPath,[]);o.setQueryData(e.activeQuery.queryKey,a)},k(s,m(ju,{})),V(()=>F(s,r().actionButton)),s})()},Po=e=>{const t=pe(),n=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,r=D(()=>t()==="dark"?Ht(n):Gt(n)),o=K().client;return(()=>{var s=nd();return s.$$click=()=>{const l=e.activeQuery.state.data,a=Ps(l,e.dataPath);o.setQueryData(e.activeQuery.queryKey,a)},k(s,m(ds,{})),V(()=>F(s,L(r().actionButton))),s})()},fd=e=>{const t=pe(),n=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,r=D(()=>t()==="dark"?Ht(n):Gt(n)),o=K().client;return(()=>{var s=rd();return s.$$click=()=>{const l=e.activeQuery.state.data,a=or(l,e.dataPath,!e.value);o.setQueryData(e.activeQuery.queryKey,a)},k(s,m(Wu,{get theme(){return t()},get checked(){return e.value}})),V(()=>F(s,L(r().actionButton,n`
          width: ${S.size[3.5]};
          height: ${S.size[3.5]};
        `))),s})()};function Lo(e){return Symbol.iterator in e}function mt(e){const t=pe(),n=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,r=D(()=>t()==="dark"?Ht(n):Gt(n)),o=K().client,[s,l]=z((e.defaultExpanded||[]).includes(e.label)),a=()=>l(h=>!h),[i,c]=z([]),f=D(()=>Array.isArray(e.value)?e.value.map((h,y)=>({label:y.toString(),value:h})):e.value!==null&&typeof e.value=="object"&&Lo(e.value)&&typeof e.value[Symbol.iterator]=="function"?e.value instanceof Map?Array.from(e.value,([h,y])=>({label:h,value:y})):Array.from(e.value,(h,y)=>({label:y.toString(),value:h})):typeof e.value=="object"&&e.value!==null?Object.entries(e.value).map(([h,y])=>({label:h,value:y})):[]),g=D(()=>Array.isArray(e.value)?"array":e.value!==null&&typeof e.value=="object"&&Lo(e.value)&&typeof e.value[Symbol.iterator]=="function"?"Iterable":typeof e.value=="object"&&e.value!==null?"object":typeof e.value),u=D(()=>cd(f(),100)),d=e.dataPath??[];return(()=>{var h=Jt();return k(h,m(B,{get when(){return u().length},get children(){return[(()=>{var y=id(),v=y.firstChild,b=v.firstChild,p=b.nextSibling,w=p.nextSibling,x=w.nextSibling,$=x.firstChild;return v.$$click=()=>a(),k(v,m(Io,{get expanded(){return s()}}),b),k(p,()=>e.label),k(x,()=>String(g()).toLowerCase()==="iterable"?"(Iterable) ":"",$),k(x,()=>f().length,$),k(x,()=>f().length>1?"items":"item",null),k(y,m(B,{get when(){return e.editable},get children(){var O=Jt();return k(O,m(ud,{get value(){return e.value}}),null),k(O,m(B,{get when(){return e.itemsDeletable&&e.activeQuery!==void 0},get children(){return m(Po,{get activeQuery(){return e.activeQuery},dataPath:d})}}),null),k(O,m(B,{get when(){return g()==="array"&&e.activeQuery!==void 0},get children(){return m(dd,{get activeQuery(){return e.activeQuery},dataPath:d})}}),null),k(O,m(B,{get when(){return D(()=>!!e.onEdit)()&&!Ms(e.value).meta},get children(){var T=od();return T.$$click=()=>{var q;(q=e.onEdit)==null||q.call(e)},k(T,m(Vu,{})),V(()=>F(T,r().actionButton)),T}}),null),V(()=>F(O,r().actions)),O}}),null),V(O=>{var T=r().expanderButtonContainer,q=r().expanderButton,C=r().info;return T!==O.e&&F(y,O.e=T),q!==O.t&&F(v,O.t=q),C!==O.a&&F(x,O.a=C),O},{e:void 0,t:void 0,a:void 0}),y})(),m(B,{get when(){return s()},get children(){return[m(B,{get when(){return u().length===1},get children(){var y=Jt();return k(y,m($n,{get each(){return f()},by:v=>v.label,children:v=>m(mt,{get defaultExpanded(){return e.defaultExpanded},get label(){return v().label},get value(){return v().value},get editable(){return e.editable},get dataPath(){return[...d,v().label]},get activeQuery(){return e.activeQuery},get itemsDeletable(){return g()==="array"||g()==="Iterable"||g()==="object"}})})),V(()=>F(y,r().subEntry)),y}}),m(B,{get when(){return u().length>1},get children(){var y=Jt();return k(y,m(As,{get each(){return u()},children:(v,b)=>(()=>{var p=ad(),w=p.firstChild,x=w.firstChild,$=x.firstChild,O=$.nextSibling,T=O.nextSibling,q=T.nextSibling;return q.nextSibling,x.$$click=()=>c(C=>C.includes(b)?C.filter(I=>I!==b):[...C,b]),k(x,m(Io,{get expanded(){return i().includes(b)}}),$),k(x,b*100,O),k(x,b*100+100-1,q),k(w,m(B,{get when(){return i().includes(b)},get children(){var C=Jt();return k(C,m($n,{get each(){return v()},by:I=>I.label,children:I=>m(mt,{get defaultExpanded(){return e.defaultExpanded},get label(){return I().label},get value(){return I().value},get editable(){return e.editable},get dataPath(){return[...d,I().label]},get activeQuery(){return e.activeQuery}})})),V(()=>F(C,r().subEntry)),C}}),null),V(C=>{var I=r().entry,N=r().expanderButton;return I!==C.e&&F(w,C.e=I),N!==C.t&&F(x,C.t=N),C},{e:void 0,t:void 0}),p})()})),V(()=>F(y,r().subEntry)),y}})]}})]}}),null),k(h,m(B,{get when(){return u().length===0},get children(){var y=ld(),v=y.firstChild,b=v.firstChild;return k(v,()=>e.label,b),k(y,m(B,{get when(){return D(()=>!!(e.editable&&e.activeQuery!==void 0))()&&(g()==="string"||g()==="number"||g()==="boolean")},get fallback(){return(()=>{var p=To();return k(p,()=>xn(e.value)),V(()=>F(p,r().value)),p})()},get children(){return[m(B,{get when(){return D(()=>!!(e.editable&&e.activeQuery!==void 0))()&&(g()==="string"||g()==="number")},get children(){var p=sd();return p.addEventListener("change",w=>{const x=e.activeQuery.state.data,$=or(x,d,g()==="number"?w.target.valueAsNumber:w.target.value);o.setQueryData(e.activeQuery.queryKey,$)}),V(w=>{var x=g()==="number"?"number":"text",$=L(r().value,r().editableInput);return x!==w.e&&A(p,"type",w.e=x),$!==w.t&&F(p,w.t=$),w},{e:void 0,t:void 0}),V(()=>p.value=e.value),p}}),m(B,{get when(){return g()==="boolean"},get children(){var p=To();return k(p,m(fd,{get activeQuery(){return e.activeQuery},dataPath:d,get value(){return e.value}}),null),k(p,()=>xn(e.value),null),V(()=>F(p,L(r().value,r().actions,r().editableInput))),p}})]}}),null),k(y,m(B,{get when(){return e.editable&&e.itemsDeletable&&e.activeQuery!==void 0},get children(){return m(Po,{get activeQuery(){return e.activeQuery},dataPath:d})}}),null),V(p=>{var w=r().row,x=r().label;return w!==p.e&&F(y,p.e=w),x!==p.t&&F(v,p.t=x),p},{e:void 0,t:void 0}),y}}),null),V(()=>F(h,r().entry)),h})()}var fs=(e,t)=>{const{colors:n,font:r,size:o,border:s}=S,l=(a,i)=>e==="light"?a:i;return{entry:t`
      & * {
        font-size: ${r.size.xs};
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
      }
      position: relative;
      outline: none;
      word-break: break-word;
    `,subEntry:t`
      margin: 0 0 0 0.5em;
      padding-left: 0.75em;
      border-left: 2px solid ${l(n.gray[300],n.darkGray[400])};
      /* outline: 1px solid ${n.teal[400]}; */
    `,expander:t`
      & path {
        stroke: ${n.gray[400]};
      }
      & svg {
        width: ${o[3]};
        height: ${o[3]};
      }
      display: inline-flex;
      align-items: center;
      transition: all 0.1s ease;
      /* outline: 1px solid ${n.blue[400]}; */
    `,expanderButtonContainer:t`
      display: flex;
      align-items: center;
      line-height: ${o[4]};
      min-height: ${o[4]};
      gap: ${o[2]};
    `,expanderButton:t`
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      height: ${o[5]};
      background: transparent;
      border: none;
      padding: 0;
      display: inline-flex;
      align-items: center;
      gap: ${o[1]};
      position: relative;
      /* outline: 1px solid ${n.green[400]}; */

      &:focus-visible {
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }

      & svg {
        position: relative;
        left: 1px;
      }
    `,info:t`
      color: ${l(n.gray[500],n.gray[500])};
      font-size: ${r.size.xs};
      margin-left: ${o[1]};
      /* outline: 1px solid ${n.yellow[400]}; */
    `,label:t`
      color: ${l(n.gray[700],n.gray[300])};
      white-space: nowrap;
    `,value:t`
      color: ${l(n.purple[600],n.purple[400])};
      flex-grow: 1;
    `,actions:t`
      display: inline-flex;
      gap: ${o[2]};
      align-items: center;
    `,row:t`
      display: inline-flex;
      gap: ${o[2]};
      width: 100%;
      margin: ${o[.25]} 0px;
      line-height: ${o[4.5]};
      align-items: center;
    `,editableInput:t`
      border: none;
      padding: ${o[.5]} ${o[1]} ${o[.5]} ${o[1.5]};
      flex-grow: 1;
      border-radius: ${s.radius.xs};
      background-color: ${l(n.gray[200],n.darkGray[500])};

      &:hover {
        background-color: ${l(n.gray[300],n.darkGray[600])};
      }
    `,actionButton:t`
      background-color: transparent;
      color: ${l(n.gray[500],n.gray[500])};
      border: none;
      display: inline-flex;
      padding: 0px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: ${o[3]};
      height: ${o[3]};
      position: relative;
      z-index: 1;

      &:hover svg {
        color: ${l(n.gray[600],n.gray[400])};
      }

      &:focus-visible {
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
        outline-offset: 2px;
      }
    `}},Gt=e=>fs("light",e),Ht=e=>fs("dark",e);rr(["click"]);var gd=_('<div><div aria-hidden=true></div><button type=button aria-label="Open Tanstack query devtools"class=tsqd-open-btn>'),hn=_("<div>"),hd=_('<aside aria-label="Tanstack query devtools"><div></div><button aria-label="Close tanstack query devtools">'),yd=_("<select name=tsqd-queries-filter-sort>"),vd=_("<select name=tsqd-mutations-filter-sort>"),md=_("<span>Asc"),bd=_("<span>Desc"),pd=_('<button aria-label="Open in picture-in-picture mode"title="Open in picture-in-picture mode">'),wd=_("<div>Settings"),xd=_("<span>Position"),$d=_("<span>Top"),Cd=_("<span>Bottom"),Sd=_("<span>Left"),kd=_("<span>Right"),Ed=_("<span>Theme"),Dd=_("<span>Light"),Md=_("<span>Dark"),Ad=_("<span>System"),Fd=_("<div><div class=tsqd-queries-container>"),Td=_("<div><div class=tsqd-mutations-container>"),Id=_('<div><div><div><button aria-label="Close Tanstack query devtools"><span>TANSTACK</span><span> v</span></button></div></div><div><div><div><input aria-label="Filter queries by query key"type=text placeholder=Filter name=tsqd-query-filter-input></div><div></div><button class=tsqd-query-filter-sort-order-btn></button></div><div><button aria-label="Clear query cache"></button><button>'),Oo=_("<option>Sort by "),Pd=_("<div class=tsqd-query-disabled-indicator>disabled"),gs=_("<button><div></div><code class=tsqd-query-hash>"),Ld=_("<div role=tooltip id=tsqd-status-tooltip>"),Od=_("<span>"),_d=_("<button><span></span><span>"),qd=_("<button><span></span> Error"),Rd=_('<div><span></span>Trigger Error<select><option value=""disabled selected>'),zd=_('<div class="tsqd-query-details-explorer-container tsqd-query-details-data-explorer">'),Kd=_("<form><textarea name=data></textarea><div><span></span><div><button type=button>Cancel</button><button>Save"),Bd=_('<div><div>Query Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span></span></div><div class=tsqd-query-details-observers-count><span>Observers:</span><span></span></div><div class=tsqd-query-details-last-updated><span>Last Updated:</span><span></span></div></div><div>Actions</div><div><button><span></span>Refetch</button><button><span></span>Invalidate</button><button><span></span>Reset</button><button><span></span>Remove</button><button><span></span> Loading</button></div><div>Data </div><div>Query Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">'),Nd=_("<option>"),Ud=_('<div><div>Mutation Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span></span></div><div class=tsqd-query-details-last-updated><span>Submitted At:</span><span></span></div></div><div>Variables Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Context Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Data Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Mutations Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">'),[Ie,qn]=z(null),[bt,hs]=z(null),[je,kr]=z(0),[Ot,_o]=z(!1),i0=e=>{const t=pe(),n=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,r=D(()=>t()==="dark"?Ve(n):Ue(n)),o=sr(),s=D(()=>K().buttonPosition||Gs),l=D(()=>e.localStore.open==="true"?!0:e.localStore.open==="false"?!1:K().initialIsOpen||Hs),a=D(()=>e.localStore.position||K().position||jn);let i;U(()=>{const f=i.parentElement,g=e.localStore.height||zo,u=e.localStore.width||Ko,d=a();f.style.setProperty("--tsqd-panel-height",`${d==="top"?"-":""}${g}px`),f.style.setProperty("--tsqd-panel-width",`${d==="left"?"-":""}${u}px`)}),Ft(()=>{const f=()=>{const g=i.parentElement,u=getComputedStyle(g).fontSize;g.style.setProperty("--tsqd-font-size",u)};f(),window.addEventListener("focus",f),j(()=>{window.removeEventListener("focus",f)})});const c=D(()=>e.localStore.pip_open??"false");return[m(B,{get when(){return D(()=>!!o().pipWindow)()&&c()=="true"},get children(){return m(qo,{get mount(){var f;return(f=o().pipWindow)==null?void 0:f.document.body},get children(){return m(Vd,{get children(){return m(ys,e)}})}})}}),(()=>{var f=hn(),g=i;return typeof g=="function"?an(g,f):i=f,k(f,m(Yr,{name:"tsqd-panel-transition",get children(){return m(B,{get when(){return D(()=>!!(l()&&!o().pipWindow))()&&c()=="false"},get children(){return m(Gd,{get localStore(){return e.localStore},get setLocalStore(){return e.setLocalStore}})}})}}),null),k(f,m(Yr,{name:"tsqd-button-transition",get children(){return m(B,{get when(){return!l()},get children(){var u=gd(),d=u.firstChild,h=d.nextSibling;return k(d,m(Fo,{})),h.$$click=()=>e.setLocalStore("open","true"),k(h,m(Fo,{})),V(()=>F(u,L(r().devtoolsBtn,r()[`devtoolsBtn-position-${s()}`],"tsqd-open-btn-container"))),u}})}}),null),V(()=>F(f,L(n`
            & .tsqd-panel-transition-exit-active,
            & .tsqd-panel-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
            }

            & .tsqd-panel-transition-exit-to,
            & .tsqd-panel-transition-enter {
              ${a()==="top"||a()==="bottom"?"transform: translateY(var(--tsqd-panel-height));":"transform: translateX(var(--tsqd-panel-width));"}
            }

            & .tsqd-button-transition-exit-active,
            & .tsqd-button-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
              opacity: 1;
            }

            & .tsqd-button-transition-exit-to,
            & .tsqd-button-transition-enter {
              transform: ${s()==="relative"?"none;":s()==="top-left"?"translateX(-72px);":s()==="top-right"?"translateX(72px);":"translateY(72px);"};
              opacity: 0;
            }
          `,"tsqd-transitions-container"))),f})()]},Vd=e=>{const t=sr(),n=pe(),r=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,o=D(()=>n()==="dark"?Ve(r):Ue(r)),s=()=>{const{colors:l}=S,a=(i,c)=>n()==="dark"?c:i;return je()<Dt?r`
        flex-direction: column;
        background-color: ${a(l.gray[300],l.gray[600])};
      `:r`
      flex-direction: row;
      background-color: ${a(l.gray[200],l.darkGray[900])};
    `};return U(()=>{const l=t().pipWindow,a=()=>{l&&kr(l.innerWidth)};l&&(l.addEventListener("resize",a),a()),j(()=>{l&&l.removeEventListener("resize",a)})}),(()=>{var l=hn();return l.style.setProperty("--tsqd-font-size","16px"),l.style.setProperty("max-height","100vh"),l.style.setProperty("height","100vh"),l.style.setProperty("width","100vw"),k(l,()=>e.children),V(()=>F(l,L(o().panel,s(),{[r`
            min-width: min-content;
          `]:je()<ir},"tsqd-main-panel"))),l})()},s0=e=>{const t=pe(),n=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,r=D(()=>t()==="dark"?Ve(n):Ue(n));let o;Ft(()=>{Ho(o,({width:l},a)=>{a===o&&kr(l)})});const s=()=>{const{colors:l}=S,a=(i,c)=>t()==="dark"?c:i;return je()<Dt?n`
        flex-direction: column;
        background-color: ${a(l.gray[300],l.gray[600])};
      `:n`
      flex-direction: row;
      background-color: ${a(l.gray[200],l.darkGray[900])};
    `};return(()=>{var l=hn(),a=o;return typeof a=="function"?an(a,l):o=l,l.style.setProperty("--tsqd-font-size","16px"),k(l,()=>e.children),V(()=>F(l,L(r().parentPanel,s(),{[n`
            min-width: min-content;
          `]:je()<ir},"tsqd-main-panel"))),l})()},Gd=e=>{const t=pe(),n=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,r=D(()=>t()==="dark"?Ve(n):Ue(n)),[o,s]=z(!1),l=D(()=>e.localStore.position||K().position||jn),a=f=>{const g=f.currentTarget.parentElement;if(!g)return;s(!0);const{height:u,width:d}=g.getBoundingClientRect(),h=f.clientX,y=f.clientY;let v=0;const b=Kr(3.5),p=Kr(12),w=$=>{if($.preventDefault(),l()==="left"||l()==="right"){const O=l()==="right"?h-$.clientX:$.clientX-h;v=Math.round(d+O),v<p&&(v=p),e.setLocalStore("width",String(Math.round(v)));const T=g.getBoundingClientRect().width;Number(e.localStore.width)<T&&e.setLocalStore("width",String(T))}else{const O=l()==="bottom"?y-$.clientY:$.clientY-y;v=Math.round(u+O),v<b&&(v=b,qn(null)),e.setLocalStore("height",String(Math.round(v)))}},x=()=>{o()&&s(!1),document.removeEventListener("mousemove",w,!1),document.removeEventListener("mouseUp",x,!1)};document.addEventListener("mousemove",w,!1),document.addEventListener("mouseup",x,!1)};let i;Ft(()=>{Ho(i,({width:f},g)=>{g===i&&kr(f)})}),U(()=>{var y,v;const f=(v=(y=i.parentElement)==null?void 0:y.parentElement)==null?void 0:v.parentElement;if(!f)return;const g=e.localStore.position||jn,u=xs("padding",g),d=e.localStore.position==="left"||e.localStore.position==="right",h=(({padding:b,paddingTop:p,paddingBottom:w,paddingLeft:x,paddingRight:$})=>({padding:b,paddingTop:p,paddingBottom:w,paddingLeft:x,paddingRight:$}))(f.style);f.style[u]=`${d?e.localStore.width:e.localStore.height}px`,j(()=>{Object.entries(h).forEach(([b,p])=>{f.style[b]=p})})});const c=()=>{const{colors:f}=S,g=(u,d)=>t()==="dark"?d:u;return je()<Dt?n`
        flex-direction: column;
        background-color: ${g(f.gray[300],f.gray[600])};
      `:n`
      flex-direction: row;
      background-color: ${g(f.gray[200],f.darkGray[900])};
    `};return(()=>{var f=hd(),g=f.firstChild,u=g.nextSibling,d=i;return typeof d=="function"?an(d,f):i=f,g.$$mousedown=a,u.$$click=()=>e.setLocalStore("open","false"),k(u,m(nn,{})),k(f,m(ys,e),null),V(h=>{var y=L(r().panel,r()[`panel-position-${l()}`],c(),{[n`
            min-width: min-content;
          `]:je()<ir&&(l()==="right"||l()==="left")},"tsqd-main-panel"),v=l()==="bottom"||l()==="top"?`${e.localStore.height||zo}px`:"auto",b=l()==="right"||l()==="left"?`${e.localStore.width||Ko}px`:"auto",p=L(r().dragHandle,r()[`dragHandle-position-${l()}`],"tsqd-drag-handle"),w=L(r().closeBtn,r()[`closeBtn-position-${l()}`],"tsqd-minimize-btn");return y!==h.e&&F(f,h.e=y),v!==h.t&&((h.t=v)!=null?f.style.setProperty("height",v):f.style.removeProperty("height")),b!==h.a&&((h.a=b)!=null?f.style.setProperty("width",b):f.style.removeProperty("width")),p!==h.o&&F(g,h.o=p),w!==h.i&&F(u,h.i=w),h},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),f})()},ys=e=>{Zd(),Jd();let t;const n=pe(),r=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,o=D(()=>n()==="dark"?Ve(r):Ue(r)),s=sr(),[l,a]=z("queries"),i=D(()=>e.localStore.sort||Ws),c=D(()=>Number(e.localStore.sortOrder)||Ur),f=D(()=>e.localStore.mutationSort||Qs),g=D(()=>Number(e.localStore.mutationSortOrder)||Ur),u=D(()=>Vn[i()]),d=D(()=>Gn[f()]),h=D(()=>K().onlineManager),y=D(()=>K().client.getQueryCache()),v=D(()=>K().client.getMutationCache()),b=we(T=>T().getAll().length,!1),p=D(ut(()=>[b(),e.localStore.filter,i(),c()],()=>{const T=y().getAll(),q=e.localStore.filter?T.filter(I=>Vr(I.queryHash,e.localStore.filter||"").passed):[...T];return u()?q.sort((I,N)=>u()(I,N)*c()):q})),w=He(T=>T().getAll().length,!1),x=D(ut(()=>[w(),e.localStore.mutationFilter,f(),g()],()=>{const T=v().getAll(),q=e.localStore.mutationFilter?T.filter(I=>{const N=`${I.options.mutationKey?JSON.stringify(I.options.mutationKey)+" - ":""}${new Date(I.state.submittedAt).toLocaleString()}`;return Vr(N,e.localStore.mutationFilter||"").passed}):[...T];return d()?q.sort((I,N)=>d()(I,N)*g()):q})),$=T=>{e.setLocalStore("position",T)},O=T=>{const C=getComputedStyle(t).getPropertyValue("--tsqd-font-size");T.style.setProperty("--tsqd-font-size",C)};return[(()=>{var T=Id(),q=T.firstChild,C=q.firstChild,I=C.firstChild,N=I.firstChild,G=N.nextSibling,te=G.firstChild,Z=q.nextSibling,ie=Z.firstChild,R=ie.firstChild,Q=R.firstChild,J=R.nextSibling,ae=J.nextSibling,ye=ie.nextSibling,Ae=ye.firstChild,ge=Ae.nextSibling,De=t;return typeof De=="function"?an(De,T):t=T,I.$$click=()=>{if(!s().pipWindow&&!e.showPanelViewOnly){e.setLocalStore("open","false");return}e.onClose&&e.onClose()},k(G,()=>K().queryFlavor,te),k(G,()=>K().version,null),k(C,m(ze.Root,{get class(){return L(o().viewToggle)},get value(){return l()},onChange:M=>{a(M),qn(null),hs(null)},get children(){return[m(ze.Item,{value:"queries",class:"tsqd-radio-toggle",get children(){return[m(ze.ItemInput,{}),m(ze.ItemControl,{get children(){return m(ze.ItemIndicator,{})}}),m(ze.ItemLabel,{title:"Toggle Queries View",children:"Queries"})]}}),m(ze.Item,{value:"mutations",class:"tsqd-radio-toggle",get children(){return[m(ze.ItemInput,{}),m(ze.ItemControl,{get children(){return m(ze.ItemIndicator,{})}}),m(ze.ItemLabel,{title:"Toggle Mutations View",children:"Mutations"})]}})]}}),null),k(q,m(B,{get when(){return l()==="queries"},get children(){return m(Wd,{})}}),null),k(q,m(B,{get when(){return l()==="mutations"},get children(){return m(Qd,{})}}),null),k(R,m(Pu,{}),Q),Q.$$input=M=>{l()==="queries"?e.setLocalStore("filter",M.currentTarget.value):e.setLocalStore("mutationFilter",M.currentTarget.value)},k(J,m(B,{get when(){return l()==="queries"},get children(){var M=yd();return M.addEventListener("change",fe=>{e.setLocalStore("sort",fe.currentTarget.value)}),k(M,()=>Object.keys(Vn).map(fe=>(()=>{var ee=Oo();return ee.firstChild,ee.value=fe,k(ee,fe,null),ee})())),V(()=>M.value=i()),M}}),null),k(J,m(B,{get when(){return l()==="mutations"},get children(){var M=vd();return M.addEventListener("change",fe=>{e.setLocalStore("mutationSort",fe.currentTarget.value)}),k(M,()=>Object.keys(Gn).map(fe=>(()=>{var ee=Oo();return ee.firstChild,ee.value=fe,k(ee,fe,null),ee})())),V(()=>M.value=f()),M}}),null),k(J,m(nn,{}),null),ae.$$click=()=>{l()==="queries"?e.setLocalStore("sortOrder",String(c()*-1)):e.setLocalStore("mutationSortOrder",String(g()*-1))},k(ae,m(B,{get when(){return(l()==="queries"?c():g())===1},get children(){return[md(),m(Mo,{})]}}),null),k(ae,m(B,{get when(){return(l()==="queries"?c():g())===-1},get children(){return[bd(),m(Ao,{})]}}),null),Ae.$$click=()=>{l()==="queries"?y().clear():v().clear()},k(Ae,m(ds,{})),ge.$$click=()=>{Ot()?(h().setOnline(!0),_o(!1)):(h().setOnline(!1),_o(!0))},k(ge,(()=>{var M=D(()=>!!Ot());return()=>M()?m(Ku,{}):m(zu,{})})()),k(ye,m(B,{get when(){return D(()=>!s().pipWindow)()&&!s().disabled},get children(){var M=pd();return M.$$click=()=>{s().requestPipWindow(Number(window.innerWidth),Number(e.localStore.height??500))},k(M,m(Nu,{})),V(()=>F(M,L(o().actionsBtn,"tsqd-actions-btn","tsqd-action-open-pip"))),M}}),null),k(ye,m(he.Root,{gutter:4,get children(){return[m(he.Trigger,{get class(){return L(o().actionsBtn,"tsqd-actions-btn","tsqd-action-settings")},get children(){return m(Bu,{})}}),m(he.Portal,{ref:M=>O(M),get mount(){return D(()=>!!s().pipWindow)()?s().pipWindow.document.body:document.body},get children(){return m(he.Content,{get class(){return L(o().settingsMenu,"tsqd-settings-menu")},get children(){return[(()=>{var M=wd();return V(()=>F(M,L(o().settingsMenuHeader,"tsqd-settings-menu-header"))),M})(),m(B,{get when(){return!e.showPanelViewOnly},get children(){return m(he.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[m(he.SubTrigger,{get class(){return L(o().settingsSubTrigger,"tsqd-settings-menu-sub-trigger","tsqd-settings-menu-sub-trigger-position")},get children(){return[xd(),m(nn,{})]}}),m(he.Portal,{ref:M=>O(M),get mount(){return D(()=>!!s().pipWindow)()?s().pipWindow.document.body:document.body},get children(){return m(he.SubContent,{get class(){return L(o().settingsMenu,"tsqd-settings-submenu")},get children(){return[m(he.Item,{onSelect:()=>{$("top")},as:"button",get class(){return L(o().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-top")},get children(){return[$d(),m(Mo,{})]}}),m(he.Item,{onSelect:()=>{$("bottom")},as:"button",get class(){return L(o().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-bottom")},get children(){return[Cd(),m(Ao,{})]}}),m(he.Item,{onSelect:()=>{$("left")},as:"button",get class(){return L(o().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-left")},get children(){return[Sd(),m(Lu,{})]}}),m(he.Item,{onSelect:()=>{$("right")},as:"button",get class(){return L(o().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-right")},get children(){return[kd(),m(Ou,{})]}})]}})}})]}})}}),m(he.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[m(he.SubTrigger,{get class(){return L(o().settingsSubTrigger,"tsqd-settings-menu-sub-trigger","tsqd-settings-menu-sub-trigger-position")},get children(){return[Ed(),m(nn,{})]}}),m(he.Portal,{ref:M=>O(M),get mount(){return D(()=>!!s().pipWindow)()?s().pipWindow.document.body:document.body},get children(){return m(he.SubContent,{get class(){return L(o().settingsMenu,"tsqd-settings-submenu")},get children(){return[m(he.Item,{onSelect:()=>{e.setLocalStore("theme_preference","light")},as:"button",get class(){return L(o().settingsSubButton,e.localStore.theme_preference==="light"&&o().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-top")},get children(){return[Dd(),m(_u,{})]}}),m(he.Item,{onSelect:()=>{e.setLocalStore("theme_preference","dark")},as:"button",get class(){return L(o().settingsSubButton,e.localStore.theme_preference==="dark"&&o().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-bottom")},get children(){return[Md(),m(qu,{})]}}),m(he.Item,{onSelect:()=>{e.setLocalStore("theme_preference","system")},as:"button",get class(){return L(o().settingsSubButton,e.localStore.theme_preference==="system"&&o().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-left")},get children(){return[Ad(),m(Ru,{})]}})]}})}})]}})]}})}})]}}),null),k(T,m(B,{get when(){return l()==="queries"},get children(){var M=Fd(),fe=M.firstChild;return k(fe,m($n,{by:ee=>ee.queryHash,get each(){return p()},children:ee=>m(Hd,{get query(){return ee()}})})),V(()=>F(M,L(o().overflowQueryContainer,"tsqd-queries-overflow-container"))),M}}),null),k(T,m(B,{get when(){return l()==="mutations"},get children(){var M=Td(),fe=M.firstChild;return k(fe,m($n,{by:ee=>ee.mutationId,get each(){return x()},children:ee=>m(jd,{get mutation(){return ee()}})})),V(()=>F(M,L(o().overflowQueryContainer,"tsqd-mutations-overflow-container"))),M}}),null),V(M=>{var fe=L(o().queriesContainer,je()<Dt&&(Ie()||bt())&&r`
              height: 50%;
              max-height: 50%;
            `,je()<Dt&&!(Ie()||bt())&&r`
              height: 100%;
              max-height: 100%;
            `,"tsqd-queries-container"),ee=L(o().row,"tsqd-header"),ht=o().logoAndToggleContainer,H=L(o().logo,"tsqd-text-logo-container"),Ce=L(o().tanstackLogo,"tsqd-text-logo-tanstack"),Se=L(o().queryFlavorLogo,"tsqd-text-logo-query-flavor"),It=L(o().row,"tsqd-filters-actions-container"),Oe=L(o().filtersContainer,"tsqd-filters-container"),yt=L(o().filterInput,"tsqd-query-filter-textfield-container"),Ct=L("tsqd-query-filter-textfield"),tt=L(o().filterSelect,"tsqd-query-filter-sort-container"),Ye=`Sort order ${(l()==="queries"?c():g())===-1?"descending":"ascending"}`,nt=(l()==="queries"?c():g())===-1,P=L(o().actionsContainer,"tsqd-actions-container"),ne=L(o().actionsBtn,"tsqd-actions-btn","tsqd-action-clear-cache"),ve=`Clear ${l()} cache`,le=L(o().actionsBtn,Ot()&&o().actionsBtnOffline,"tsqd-actions-btn","tsqd-action-mock-offline-behavior"),se=`${Ot()?"Unset offline mocking behavior":"Mock offline behavior"}`,ce=Ot(),me=`${Ot()?"Unset offline mocking behavior":"Mock offline behavior"}`;return fe!==M.e&&F(T,M.e=fe),ee!==M.t&&F(q,M.t=ee),ht!==M.a&&F(C,M.a=ht),H!==M.o&&F(I,M.o=H),Ce!==M.i&&F(N,M.i=Ce),Se!==M.n&&F(G,M.n=Se),It!==M.s&&F(Z,M.s=It),Oe!==M.h&&F(ie,M.h=Oe),yt!==M.r&&F(R,M.r=yt),Ct!==M.d&&F(Q,M.d=Ct),tt!==M.l&&F(J,M.l=tt),Ye!==M.u&&A(ae,"aria-label",M.u=Ye),nt!==M.c&&A(ae,"aria-pressed",M.c=nt),P!==M.w&&F(ye,M.w=P),ne!==M.m&&F(Ae,M.m=ne),ve!==M.f&&A(Ae,"title",M.f=ve),le!==M.y&&F(ge,M.y=le),se!==M.g&&A(ge,"aria-label",M.g=se),ce!==M.p&&A(ge,"aria-pressed",M.p=ce),me!==M.b&&A(ge,"title",M.b=me),M},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0}),V(()=>Q.value=l()==="queries"?e.localStore.filter||"":e.localStore.mutationFilter||""),T})(),m(B,{get when(){return D(()=>l()==="queries")()&&Ie()},get children(){return m(Yd,{})}}),m(B,{get when(){return D(()=>l()==="mutations")()&&bt()},get children(){return m(Xd,{})}})]},Hd=e=>{const t=pe(),n=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,r=D(()=>t()==="dark"?Ve(n):Ue(n)),{colors:o,alpha:s}=S,l=(d,h)=>t()==="dark"?h:d,a=we(d=>{var h;return(h=d().find({queryKey:e.query.queryKey}))==null?void 0:h.state},!0,d=>d.query.queryHash===e.query.queryHash),i=we(d=>{var h;return((h=d().find({queryKey:e.query.queryKey}))==null?void 0:h.isDisabled())??!1},!0,d=>d.query.queryHash===e.query.queryHash),c=we(d=>{var h;return((h=d().find({queryKey:e.query.queryKey}))==null?void 0:h.isStale())??!1},!0,d=>d.query.queryHash===e.query.queryHash),f=we(d=>{var h;return((h=d().find({queryKey:e.query.queryKey}))==null?void 0:h.getObserversCount())??0},!0,d=>d.query.queryHash===e.query.queryHash),g=D(()=>Cs({queryState:a(),observerCount:f(),isStale:c()})),u=()=>g()==="gray"?n`
        background-color: ${l(o[g()][200],o[g()][700])};
        color: ${l(o[g()][700],o[g()][300])};
      `:n`
      background-color: ${l(o[g()][200]+s[80],o[g()][900])};
      color: ${l(o[g()][800],o[g()][300])};
    `;return m(B,{get when(){return a()},get children(){var d=gs(),h=d.firstChild,y=h.nextSibling;return d.$$click=()=>qn(e.query.queryHash===Ie()?null:e.query.queryHash),k(h,f),k(y,()=>e.query.queryHash),k(d,m(B,{get when(){return i()},get children(){return Pd()}}),null),V(v=>{var b=L(r().queryRow,Ie()===e.query.queryHash&&r().selectedQueryRow,"tsqd-query-row"),p=`Query key ${e.query.queryHash}`,w=L(u(),"tsqd-query-observer-count");return b!==v.e&&F(d,v.e=b),p!==v.t&&A(d,"aria-label",v.t=p),w!==v.a&&F(h,v.a=w),v},{e:void 0,t:void 0,a:void 0}),d}})},jd=e=>{const t=pe(),n=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,r=D(()=>t()==="dark"?Ve(n):Ue(n)),{colors:o,alpha:s}=S,l=(u,d)=>t()==="dark"?d:u,a=He(u=>{const h=u().getAll().find(y=>y.mutationId===e.mutation.mutationId);return h==null?void 0:h.state}),i=He(u=>{const h=u().getAll().find(y=>y.mutationId===e.mutation.mutationId);return h?h.state.isPaused:!1}),c=He(u=>{const h=u().getAll().find(y=>y.mutationId===e.mutation.mutationId);return h?h.state.status:"idle"}),f=D(()=>zt({isPaused:i(),status:c()})),g=()=>f()==="gray"?n`
        background-color: ${l(o[f()][200],o[f()][700])};
        color: ${l(o[f()][700],o[f()][300])};
      `:n`
      background-color: ${l(o[f()][200]+s[80],o[f()][900])};
      color: ${l(o[f()][800],o[f()][300])};
    `;return m(B,{get when(){return a()},get children(){var u=gs(),d=u.firstChild,h=d.nextSibling;return u.$$click=()=>{hs(e.mutation.mutationId===bt()?null:e.mutation.mutationId)},k(d,m(B,{get when(){return f()==="purple"},get children(){return m(Zu,{})}}),null),k(d,m(B,{get when(){return f()==="green"},get children(){return m(Qu,{})}}),null),k(d,m(B,{get when(){return f()==="red"},get children(){return m(Xu,{})}}),null),k(d,m(B,{get when(){return f()==="yellow"},get children(){return m(Yu,{})}}),null),k(h,m(B,{get when(){return e.mutation.options.mutationKey},get children(){return[D(()=>JSON.stringify(e.mutation.options.mutationKey))," -"," "]}}),null),k(h,()=>new Date(e.mutation.state.submittedAt).toLocaleString(),null),V(y=>{var v=L(r().queryRow,bt()===e.mutation.mutationId&&r().selectedQueryRow,"tsqd-query-row"),b=`Mutation submitted at ${new Date(e.mutation.state.submittedAt).toLocaleString()}`,p=L(g(),"tsqd-query-observer-count");return v!==y.e&&F(u,y.e=v),b!==y.t&&A(u,"aria-label",y.t=b),p!==y.a&&F(d,y.a=p),y},{e:void 0,t:void 0,a:void 0}),u}})},Wd=()=>{const e=we(i=>i().getAll().filter(c=>_t(c)==="stale").length),t=we(i=>i().getAll().filter(c=>_t(c)==="fresh").length),n=we(i=>i().getAll().filter(c=>_t(c)==="fetching").length),r=we(i=>i().getAll().filter(c=>_t(c)==="paused").length),o=we(i=>i().getAll().filter(c=>_t(c)==="inactive").length),s=pe(),l=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,a=D(()=>s()==="dark"?Ve(l):Ue(l));return(()=>{var i=hn();return k(i,m(ct,{label:"Fresh",color:"green",get count(){return t()}}),null),k(i,m(ct,{label:"Fetching",color:"blue",get count(){return n()}}),null),k(i,m(ct,{label:"Paused",color:"purple",get count(){return r()}}),null),k(i,m(ct,{label:"Stale",color:"yellow",get count(){return e()}}),null),k(i,m(ct,{label:"Inactive",color:"gray",get count(){return o()}}),null),V(()=>F(i,L(a().queryStatusContainer,"tsqd-query-status-container"))),i})()},Qd=()=>{const e=He(a=>a().getAll().filter(i=>zt({isPaused:i.state.isPaused,status:i.state.status})==="green").length),t=He(a=>a().getAll().filter(i=>zt({isPaused:i.state.isPaused,status:i.state.status})==="yellow").length),n=He(a=>a().getAll().filter(i=>zt({isPaused:i.state.isPaused,status:i.state.status})==="purple").length),r=He(a=>a().getAll().filter(i=>zt({isPaused:i.state.isPaused,status:i.state.status})==="red").length),o=pe(),s=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,l=D(()=>o()==="dark"?Ve(s):Ue(s));return(()=>{var a=hn();return k(a,m(ct,{label:"Paused",color:"purple",get count(){return n()}}),null),k(a,m(ct,{label:"Pending",color:"yellow",get count(){return t()}}),null),k(a,m(ct,{label:"Success",color:"green",get count(){return e()}}),null),k(a,m(ct,{label:"Error",color:"red",get count(){return r()}}),null),V(()=>F(a,L(l().queryStatusContainer,"tsqd-query-status-container"))),a})()},ct=e=>{const t=pe(),n=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,r=D(()=>t()==="dark"?Ve(n):Ue(n)),{colors:o,alpha:s}=S,l=(d,h)=>t()==="dark"?h:d;let a;const[i,c]=z(!1),[f,g]=z(!1),u=D(()=>!(Ie()&&je()<Vs&&je()>Dt||je()<Dt));return(()=>{var d=_d(),h=d.firstChild,y=h.nextSibling,v=a;return typeof v=="function"?an(v,d):a=d,d.addEventListener("mouseleave",()=>{c(!1),g(!1)}),d.addEventListener("mouseenter",()=>c(!0)),d.addEventListener("blur",()=>g(!1)),d.addEventListener("focus",()=>g(!0)),Ds(d,W({get disabled(){return u()},get class(){return L(r().queryStatusTag,!u()&&n`
            cursor: pointer;
            &:hover {
              background: ${l(o.gray[200],o.darkGray[400])}${s[80]};
            }
          `,"tsqd-query-status-tag",`tsqd-query-status-tag-${e.label.toLowerCase()}`)}},()=>i()||f()?{"aria-describedby":"tsqd-status-tooltip"}:{}),!1,!0),k(d,m(B,{get when(){return D(()=>!u())()&&(i()||f())},get children(){var b=Ld();return k(b,()=>e.label),V(()=>F(b,L(r().statusTooltip,"tsqd-query-status-tooltip"))),b}}),h),k(d,m(B,{get when(){return u()},get children(){var b=Od();return k(b,()=>e.label),V(()=>F(b,L(r().queryStatusTagLabel,"tsqd-query-status-tag-label"))),b}}),y),k(y,()=>e.count),V(b=>{var p=L(n`
            width: ${S.size[1.5]};
            height: ${S.size[1.5]};
            border-radius: ${S.border.radius.full};
            background-color: ${S.colors[e.color][500]};
          `,"tsqd-query-status-tag-dot"),w=L(r().queryStatusCount,e.count>0&&e.color!=="gray"&&n`
              background-color: ${l(o[e.color][100],o[e.color][900])};
              color: ${l(o[e.color][700],o[e.color][300])};
            `,"tsqd-query-status-tag-count");return p!==b.e&&F(h,b.e=p),w!==b.t&&F(y,b.t=w),b},{e:void 0,t:void 0}),d})()},Yd=()=>{const e=pe(),t=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,n=D(()=>e()==="dark"?Ve(t):Ue(t)),{colors:r}=S,o=(C,I)=>e()==="dark"?I:C,s=K().client,[l,a]=z(!1),[i,c]=z("view"),[f,g]=z(!1),u=D(()=>K().errorTypes||[]),d=we(C=>C().getAll().find(I=>I.queryHash===Ie()),!1),h=we(C=>C().getAll().find(I=>I.queryHash===Ie()),!1),y=we(C=>{var I;return(I=C().getAll().find(N=>N.queryHash===Ie()))==null?void 0:I.state},!1),v=we(C=>{var I;return(I=C().getAll().find(N=>N.queryHash===Ie()))==null?void 0:I.state.data},!1),b=we(C=>{const I=C().getAll().find(N=>N.queryHash===Ie());return I?_t(I):"inactive"}),p=we(C=>{const I=C().getAll().find(N=>N.queryHash===Ie());return I?I.state.status:"pending"}),w=we(C=>{var I;return((I=C().getAll().find(N=>N.queryHash===Ie()))==null?void 0:I.getObserversCount())??0}),x=D(()=>Ss(b())),$=()=>{var I;const C=(I=d())==null?void 0:I.fetch();C==null||C.catch(()=>{})},O=C=>{const I=(C==null?void 0:C.initializer(d()))??new Error("Unknown error from devtools"),N=d().options;d().setState({status:"error",error:I,fetchMeta:{...d().state.fetchMeta,__previousQueryOptions:N}})},T=()=>{const C=d(),I=C.state,N=C.state.fetchMeta?C.state.fetchMeta.__previousQueryOptions:null;C.cancel({silent:!0}),C.setState({...I,fetchStatus:"idle",fetchMeta:null}),N&&C.fetch(N)};U(()=>{b()!=="fetching"&&a(!1)});const q=()=>x()==="gray"?t`
        background-color: ${o(r[x()][200],r[x()][700])};
        color: ${o(r[x()][700],r[x()][300])};
        border-color: ${o(r[x()][400],r[x()][600])};
      `:t`
      background-color: ${o(r[x()][100],r[x()][900])};
      color: ${o(r[x()][700],r[x()][300])};
      border-color: ${o(r[x()][400],r[x()][600])};
    `;return m(B,{get when(){return D(()=>!!d())()&&y()},get children(){var C=Bd(),I=C.firstChild,N=I.nextSibling,G=N.firstChild,te=G.firstChild,Z=te.firstChild,ie=te.nextSibling,R=G.nextSibling,Q=R.firstChild,J=Q.nextSibling,ae=R.nextSibling,ye=ae.firstChild,Ae=ye.nextSibling,ge=N.nextSibling,De=ge.nextSibling,M=De.firstChild,fe=M.firstChild,ee=M.nextSibling,ht=ee.firstChild,H=ee.nextSibling,Ce=H.firstChild,Se=H.nextSibling,It=Se.firstChild,Oe=Se.nextSibling,yt=Oe.firstChild,Ct=yt.nextSibling,tt=De.nextSibling;tt.firstChild;var Ye=tt.nextSibling,nt=Ye.nextSibling;return k(Z,()=>xn(d().queryKey,!0)),k(ie,b),k(J,w),k(Ae,()=>new Date(y().dataUpdatedAt).toLocaleTimeString()),M.$$click=$,ee.$$click=()=>s.invalidateQueries(d()),H.$$click=()=>s.resetQueries(d()),Se.$$click=()=>{s.removeQueries(d()),qn(null)},Oe.$$click=()=>{var P;if(((P=d())==null?void 0:P.state.data)===void 0)a(!0),T();else{const ne=d();if(!ne)return;const ve=ne.options;ne.fetch({...ve,queryFn:()=>new Promise(()=>{}),gcTime:-1}),ne.setState({data:void 0,status:"pending",fetchMeta:{...ne.state.fetchMeta,__previousQueryOptions:ve}})}},k(Oe,()=>p()==="pending"?"Restore":"Trigger",Ct),k(De,m(B,{get when(){return u().length===0||p()==="error"},get children(){var P=qd(),ne=P.firstChild,ve=ne.nextSibling;return P.$$click=()=>{d().state.error?s.resetQueries(d()):O()},k(P,()=>p()==="error"?"Restore":"Trigger",ve),V(le=>{var se=L(t`
                  color: ${o(r.red[500],r.red[400])};
                `,"tsqd-query-details-actions-btn","tsqd-query-details-action-error"),ce=p()==="pending",me=t`
                  background-color: ${o(r.red[500],r.red[400])};
                `;return se!==le.e&&F(P,le.e=se),ce!==le.t&&(P.disabled=le.t=ce),me!==le.a&&F(ne,le.a=me),le},{e:void 0,t:void 0,a:void 0}),P}}),null),k(De,m(B,{get when(){return!(u().length===0||p()==="error")},get children(){var P=Rd(),ne=P.firstChild,ve=ne.nextSibling,le=ve.nextSibling;return le.firstChild,le.addEventListener("change",se=>{const ce=u().find(me=>me.name===se.currentTarget.value);O(ce)}),k(le,m(ks,{get each(){return u()},children:se=>(()=>{var ce=Nd();return k(ce,()=>se.name),V(()=>ce.value=se.name),ce})()}),null),k(P,m(nn,{}),null),V(se=>{var ce=L(n().actionsSelect,"tsqd-query-details-actions-btn","tsqd-query-details-action-error-multiple"),me=t`
                  background-color: ${S.colors.red[400]};
                `,re=p()==="pending";return ce!==se.e&&F(P,se.e=ce),me!==se.t&&F(ne,se.t=me),re!==se.a&&(le.disabled=se.a=re),se},{e:void 0,t:void 0,a:void 0}),P}}),null),k(tt,()=>i()==="view"?"Explorer":"Editor",null),k(C,m(B,{get when(){return i()==="view"},get children(){var P=zd();return k(P,m(mt,{label:"Data",defaultExpanded:["Data"],get value(){return v()},editable:!0,onEdit:()=>c("edit"),get activeQuery(){return d()}})),V(ne=>(ne=S.size[2])!=null?P.style.setProperty("padding",ne):P.style.removeProperty("padding")),P}}),Ye),k(C,m(B,{get when(){return i()==="edit"},get children(){var P=Kd(),ne=P.firstChild,ve=ne.nextSibling,le=ve.firstChild,se=le.nextSibling,ce=se.firstChild,me=ce.nextSibling;return P.addEventListener("submit",re=>{re.preventDefault();const ot=new FormData(re.currentTarget).get("data");try{const Ge=JSON.parse(ot);d().setState({...d().state,data:Ge}),c("view")}catch{g(!0)}}),ne.addEventListener("focus",()=>g(!1)),k(le,()=>f()?"Invalid Value":""),ce.$$click=()=>c("view"),V(re=>{var rt=L(n().devtoolsEditForm,"tsqd-query-details-data-editor"),ot=n().devtoolsEditTextarea,Ge=f(),St=n().devtoolsEditFormActions,it=n().devtoolsEditFormError,kt=n().devtoolsEditFormActionContainer,st=L(n().devtoolsEditFormAction,t`
                      color: ${o(r.gray[600],r.gray[300])};
                    `),vt=L(n().devtoolsEditFormAction,t`
                      color: ${o(r.blue[600],r.blue[400])};
                    `);return rt!==re.e&&F(P,re.e=rt),ot!==re.t&&F(ne,re.t=ot),Ge!==re.a&&A(ne,"data-error",re.a=Ge),St!==re.o&&F(ve,re.o=St),it!==re.i&&F(le,re.i=it),kt!==re.n&&F(se,re.n=kt),st!==re.s&&F(ce,re.s=st),vt!==re.h&&F(me,re.h=vt),re},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),V(()=>ne.value=JSON.stringify(v(),null,2)),P}}),Ye),k(nt,m(mt,{label:"Query",defaultExpanded:["Query","queryKey"],get value(){return h()}})),V(P=>{var ne=L(n().detailsContainer,"tsqd-query-details-container"),ve=L(n().detailsHeader,"tsqd-query-details-header"),le=L(n().detailsBody,"tsqd-query-details-summary-container"),se=L(n().queryDetailsStatus,q()),ce=L(n().detailsHeader,"tsqd-query-details-header"),me=L(n().actionsBody,"tsqd-query-details-actions-container"),re=L(t`
                color: ${o(r.blue[600],r.blue[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-refetch"),rt=b()==="fetching",ot=t`
                background-color: ${o(r.blue[600],r.blue[400])};
              `,Ge=L(t`
                color: ${o(r.yellow[600],r.yellow[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-invalidate"),St=p()==="pending",it=t`
                background-color: ${o(r.yellow[600],r.yellow[400])};
              `,kt=L(t`
                color: ${o(r.gray[600],r.gray[300])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-reset"),st=p()==="pending",vt=t`
                background-color: ${o(r.gray[600],r.gray[400])};
              `,yn=L(t`
                color: ${o(r.pink[500],r.pink[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-remove"),jt=b()==="fetching",vn=t`
                background-color: ${o(r.pink[500],r.pink[400])};
              `,Pt=L(t`
                color: ${o(r.cyan[500],r.cyan[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-loading"),mn=l(),Wt=t`
                background-color: ${o(r.cyan[500],r.cyan[400])};
              `,Qt=L(n().detailsHeader,"tsqd-query-details-header"),Yt=L(n().detailsHeader,"tsqd-query-details-header"),Lt=S.size[2];return ne!==P.e&&F(C,P.e=ne),ve!==P.t&&F(I,P.t=ve),le!==P.a&&F(N,P.a=le),se!==P.o&&F(ie,P.o=se),ce!==P.i&&F(ge,P.i=ce),me!==P.n&&F(De,P.n=me),re!==P.s&&F(M,P.s=re),rt!==P.h&&(M.disabled=P.h=rt),ot!==P.r&&F(fe,P.r=ot),Ge!==P.d&&F(ee,P.d=Ge),St!==P.l&&(ee.disabled=P.l=St),it!==P.u&&F(ht,P.u=it),kt!==P.c&&F(H,P.c=kt),st!==P.w&&(H.disabled=P.w=st),vt!==P.m&&F(Ce,P.m=vt),yn!==P.f&&F(Se,P.f=yn),jt!==P.y&&(Se.disabled=P.y=jt),vn!==P.g&&F(It,P.g=vn),Pt!==P.p&&F(Oe,P.p=Pt),mn!==P.b&&(Oe.disabled=P.b=mn),Wt!==P.T&&F(yt,P.T=Wt),Qt!==P.A&&F(tt,P.A=Qt),Yt!==P.O&&F(Ye,P.O=Yt),Lt!==P.I&&((P.I=Lt)!=null?nt.style.setProperty("padding",Lt):nt.style.removeProperty("padding")),P},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0,T:void 0,A:void 0,O:void 0,I:void 0}),C}})},Xd=()=>{const e=pe(),t=K().shadowDOMTarget?Y.bind({target:K().shadowDOMTarget}):Y,n=D(()=>e()==="dark"?Ve(t):Ue(t)),{colors:r}=S,o=(f,g)=>e()==="dark"?g:f,s=He(f=>{const u=f().getAll().find(d=>d.mutationId===bt());return u?u.state.isPaused:!1}),l=He(f=>{const u=f().getAll().find(d=>d.mutationId===bt());return u?u.state.status:"idle"}),a=D(()=>zt({isPaused:s(),status:l()})),i=He(f=>f().getAll().find(g=>g.mutationId===bt()),!1),c=()=>a()==="gray"?t`
        background-color: ${o(r[a()][200],r[a()][700])};
        color: ${o(r[a()][700],r[a()][300])};
        border-color: ${o(r[a()][400],r[a()][600])};
      `:t`
      background-color: ${o(r[a()][100],r[a()][900])};
      color: ${o(r[a()][700],r[a()][300])};
      border-color: ${o(r[a()][400],r[a()][600])};
    `;return m(B,{get when(){return i()},get children(){var f=Ud(),g=f.firstChild,u=g.nextSibling,d=u.firstChild,h=d.firstChild,y=h.firstChild,v=h.nextSibling,b=d.nextSibling,p=b.firstChild,w=p.nextSibling,x=u.nextSibling,$=x.nextSibling,O=$.nextSibling,T=O.nextSibling,q=T.nextSibling,C=q.nextSibling,I=C.nextSibling,N=I.nextSibling;return k(y,m(B,{get when(){return i().options.mutationKey},fallback:"No mutationKey found",get children(){return xn(i().options.mutationKey,!0)}})),k(v,m(B,{get when(){return a()==="purple"},children:"pending"}),null),k(v,m(B,{get when(){return a()!=="purple"},get children(){return l()}}),null),k(w,()=>new Date(i().state.submittedAt).toLocaleTimeString()),k($,m(mt,{label:"Variables",defaultExpanded:["Variables"],get value(){return i().state.variables}})),k(T,m(mt,{label:"Context",defaultExpanded:["Context"],get value(){return i().state.context}})),k(C,m(mt,{label:"Data",defaultExpanded:["Data"],get value(){return i().state.data}})),k(N,m(mt,{label:"Mutation",defaultExpanded:["Mutation"],get value(){return i()}})),V(G=>{var te=L(n().detailsContainer,"tsqd-query-details-container"),Z=L(n().detailsHeader,"tsqd-query-details-header"),ie=L(n().detailsBody,"tsqd-query-details-summary-container"),R=L(n().queryDetailsStatus,c()),Q=L(n().detailsHeader,"tsqd-query-details-header"),J=S.size[2],ae=L(n().detailsHeader,"tsqd-query-details-header"),ye=S.size[2],Ae=L(n().detailsHeader,"tsqd-query-details-header"),ge=S.size[2],De=L(n().detailsHeader,"tsqd-query-details-header"),M=S.size[2];return te!==G.e&&F(f,G.e=te),Z!==G.t&&F(g,G.t=Z),ie!==G.a&&F(u,G.a=ie),R!==G.o&&F(v,G.o=R),Q!==G.i&&F(x,G.i=Q),J!==G.n&&((G.n=J)!=null?$.style.setProperty("padding",J):$.style.removeProperty("padding")),ae!==G.s&&F(O,G.s=ae),ye!==G.h&&((G.h=ye)!=null?T.style.setProperty("padding",ye):T.style.removeProperty("padding")),Ae!==G.r&&F(q,G.r=Ae),ge!==G.d&&((G.d=ge)!=null?C.style.setProperty("padding",ge):C.style.removeProperty("padding")),De!==G.l&&F(I,G.l=De),M!==G.u&&((G.u=M)!=null?N.style.setProperty("padding",M):N.style.removeProperty("padding")),G},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0}),f}})},Dn=new Map,Zd=()=>{const e=D(()=>K().client.getQueryCache()),t=e().subscribe(n=>{$s(()=>{for(const[r,o]of Dn.entries())o.shouldUpdate(n)&&o.setter(r(e))})});return j(()=>{Dn.clear(),t()}),t},we=(e,t=!0,n=()=>!0)=>{const r=D(()=>K().client.getQueryCache()),[o,s]=z(e(r),t?void 0:{equals:!1});return U(()=>{s(e(r))}),Dn.set(e,{setter:s,shouldUpdate:n}),j(()=>{Dn.delete(e)}),o},Mn=new Map,Jd=()=>{const e=D(()=>K().client.getMutationCache()),t=e().subscribe(()=>{for(const[n,r]of Mn.entries())queueMicrotask(()=>{r(n(e))})});return j(()=>{Mn.clear(),t()}),t},He=(e,t=!0)=>{const n=D(()=>K().client.getMutationCache()),[r,o]=z(e(n),t?void 0:{equals:!1});return U(()=>{o(e(n))}),Mn.set(e,o),j(()=>{Mn.delete(e)}),r},vs=(e,t)=>{const{colors:n,font:r,size:o,alpha:s,shadow:l,border:a}=S,i=(c,f)=>e==="light"?c:f;return{devtoolsBtn:t`
      z-index: 100000;
      position: fixed;
      padding: 4px;
      text-align: left;

      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      box-shadow: ${l.md()};
      overflow: hidden;

      & div {
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border-radius: 9999px;

        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        filter: blur(6px) saturate(1.2) contrast(1.1);
      }

      &:focus-within {
        outline-offset: 2px;
        outline: 3px solid ${n.green[600]};
      }

      & button {
        position: relative;
        z-index: 1;
        padding: 0;
        border-radius: 9999px;
        background-color: transparent;
        border: none;
        height: 40px;
        display: flex;
        width: 40px;
        overflow: hidden;
        cursor: pointer;
        outline: none;
        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
    `,panel:t`
      position: fixed;
      z-index: 9999;
      display: flex;
      gap: ${S.size[.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${i(n.gray[300],n.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${i(n.gray[400],n.darkGray[300])};
      }
    `,parentPanel:t`
      z-index: 9999;
      display: flex;
      height: 100%;
      gap: ${S.size[.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${i(n.gray[300],n.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${i(n.gray[400],n.darkGray[300])};
      }
    `,"devtoolsBtn-position-bottom-right":t`
      bottom: 12px;
      right: 12px;
    `,"devtoolsBtn-position-bottom-left":t`
      bottom: 12px;
      left: 12px;
    `,"devtoolsBtn-position-top-left":t`
      top: 12px;
      left: 12px;
    `,"devtoolsBtn-position-top-right":t`
      top: 12px;
      right: 12px;
    `,"devtoolsBtn-position-relative":t`
      position: relative;
    `,"panel-position-top":t`
      top: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${o[14]};
      border-bottom: ${i(n.gray[400],n.darkGray[300])} 1px solid;
    `,"panel-position-bottom":t`
      bottom: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${o[14]};
      border-top: ${i(n.gray[400],n.darkGray[300])} 1px solid;
    `,"panel-position-right":t`
      bottom: 0;
      right: 0;
      top: 0;
      border-left: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      max-width: 90%;
    `,"panel-position-left":t`
      bottom: 0;
      left: 0;
      top: 0;
      border-right: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      max-width: 90%;
    `,closeBtn:t`
      position: absolute;
      cursor: pointer;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      background-color: ${i(n.gray[50],n.darkGray[700])};
      &:hover {
        background-color: ${i(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline: 2px solid ${n.blue[600]};
      }
      & svg {
        color: ${i(n.gray[600],n.gray[400])};
        width: ${o[2]};
        height: ${o[2]};
      }
    `,"closeBtn-position-top":t`
      bottom: 0;
      right: ${o[2]};
      transform: translate(0, 100%);
      border-right: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-left: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: none;
      border-bottom: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: 0px 0px ${a.radius.sm} ${a.radius.sm};
      padding: ${o[.5]} ${o[1.5]} ${o[1]} ${o[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        bottom: 100%;
        left: -${o[2.5]};
        height: ${o[1.5]};
        width: calc(100% + ${o[5]});
      }

      & svg {
        transform: rotate(180deg);
      }
    `,"closeBtn-position-bottom":t`
      top: 0;
      right: ${o[2]};
      transform: translate(0, -100%);
      border-right: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-left: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: none;
      border-radius: ${a.radius.sm} ${a.radius.sm} 0px 0px;
      padding: ${o[1]} ${o[1.5]} ${o[.5]} ${o[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        top: 100%;
        left: -${o[2.5]};
        height: ${o[1.5]};
        width: calc(100% + ${o[5]});
      }
    `,"closeBtn-position-right":t`
      bottom: ${o[2]};
      left: 0;
      transform: translate(-100%, 0);
      border-right: none;
      border-left: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: ${a.radius.sm} 0px 0px ${a.radius.sm};
      padding: ${o[1.5]} ${o[.5]} ${o[1.5]} ${o[1]};

      &::after {
        content: ' ';
        position: absolute;
        left: 100%;
        height: calc(100% + ${o[5]});
        width: ${o[1.5]};
      }

      & svg {
        transform: rotate(-90deg);
      }
    `,"closeBtn-position-left":t`
      bottom: ${o[2]};
      right: 0;
      transform: translate(100%, 0);
      border-left: none;
      border-right: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: ${i(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: 0px ${a.radius.sm} ${a.radius.sm} 0px;
      padding: ${o[1.5]} ${o[1]} ${o[1.5]} ${o[.5]};

      &::after {
        content: ' ';
        position: absolute;
        right: 100%;
        height: calc(100% + ${o[5]});
        width: ${o[1.5]};
      }

      & svg {
        transform: rotate(90deg);
      }
    `,queriesContainer:t`
      flex: 1 1 700px;
      background-color: ${i(n.gray[50],n.darkGray[700])};
      display: flex;
      flex-direction: column;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
    `,dragHandle:t`
      position: absolute;
      transition: background-color 0.125s ease;
      &:hover {
        background-color: ${n.purple[400]}${i("",s[90])};
      }
      z-index: 4;
    `,"dragHandle-position-top":t`
      bottom: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,"dragHandle-position-bottom":t`
      top: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,"dragHandle-position-right":t`
      left: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,"dragHandle-position-left":t`
      right: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,row:t`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${S.size[2]} ${S.size[2.5]};
      gap: ${S.size[2.5]};
      border-bottom: ${i(n.gray[300],n.darkGray[500])} 1px solid;
      align-items: center;
      & > button {
        padding: 0;
        background: transparent;
        border: none;
        display: flex;
        gap: ${o[.5]};
        flex-direction: column;
      }
    `,logoAndToggleContainer:t`
      display: flex;
      gap: ${S.size[3]};
      align-items: center;
    `,logo:t`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      gap: ${S.size[.5]};
      padding: 0px;
      &:hover {
        opacity: 0.7;
      }
      &:focus-visible {
        outline-offset: 4px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,tanstackLogo:t`
      font-size: ${r.size.md};
      font-weight: ${r.weight.bold};
      line-height: ${r.lineHeight.xs};
      white-space: nowrap;
      color: ${i(n.gray[600],n.gray[300])};
    `,queryFlavorLogo:t`
      font-weight: ${r.weight.semibold};
      font-size: ${r.size.xs};
      background: linear-gradient(
        to right,
        ${i("#ea4037, #ff9b11","#dd524b, #e9a03b")}
      );
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,queryStatusContainer:t`
      display: flex;
      gap: ${S.size[2]};
      height: min-content;
    `,queryStatusTag:t`
      display: flex;
      gap: ${S.size[1.5]};
      box-sizing: border-box;
      height: ${S.size[6.5]};
      background: ${i(n.gray[50],n.darkGray[500])};
      color: ${i(n.gray[700],n.gray[300])};
      border-radius: ${S.border.radius.sm};
      font-size: ${r.size.sm};
      padding: ${S.size[1]};
      padding-left: ${S.size[1.5]};
      align-items: center;
      font-weight: ${r.weight.medium};
      border: ${i("1px solid "+n.gray[300],"1px solid transparent")};
      user-select: none;
      position: relative;
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
    `,queryStatusTagLabel:t`
      font-size: ${r.size.xs};
    `,queryStatusCount:t`
      font-size: ${r.size.xs};
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${i(n.gray[500],n.gray[400])};
      background-color: ${i(n.gray[200],n.darkGray[300])};
      border-radius: 2px;
      font-variant-numeric: tabular-nums;
      height: ${S.size[4.5]};
    `,statusTooltip:t`
      position: absolute;
      z-index: 1;
      background-color: ${i(n.gray[50],n.darkGray[500])};
      top: 100%;
      left: 50%;
      transform: translate(-50%, calc(${S.size[2]}));
      padding: ${S.size[.5]} ${S.size[2]};
      border-radius: ${S.border.radius.sm};
      font-size: ${r.size.xs};
      border: 1px solid ${i(n.gray[400],n.gray[600])};
      color: ${i(n.gray[600],n.gray[300])};

      &::before {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, -100%);
        position: absolute;
        border-color: transparent transparent
          ${i(n.gray[400],n.gray[600])} transparent;
        border-style: solid;
        border-width: 7px;
        /* transform: rotate(180deg); */
      }

      &::after {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, calc(-100% + 2px));
        position: absolute;
        border-color: transparent transparent
          ${i(n.gray[100],n.darkGray[500])} transparent;
        border-style: solid;
        border-width: 7px;
      }
    `,filtersContainer:t`
      display: flex;
      gap: ${S.size[2]};
      & > button {
        cursor: pointer;
        padding: ${S.size[.5]} ${S.size[1.5]} ${S.size[.5]}
          ${S.size[2]};
        border-radius: ${S.border.radius.sm};
        background-color: ${i(n.gray[100],n.darkGray[400])};
        border: 1px solid ${i(n.gray[300],n.darkGray[200])};
        color: ${i(n.gray[700],n.gray[300])};
        font-size: ${r.size.xs};
        display: flex;
        align-items: center;
        line-height: ${r.lineHeight.sm};
        gap: ${S.size[1.5]};
        max-width: 160px;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${a.radius.xs};
          outline: 2px solid ${n.blue[800]};
        }
        & svg {
          width: ${S.size[3]};
          height: ${S.size[3]};
          color: ${i(n.gray[500],n.gray[400])};
        }
      }
    `,filterInput:t`
      padding: ${o[.5]} ${o[2]};
      border-radius: ${S.border.radius.sm};
      background-color: ${i(n.gray[100],n.darkGray[400])};
      display: flex;
      box-sizing: content-box;
      align-items: center;
      gap: ${S.size[1.5]};
      max-width: 160px;
      min-width: 100px;
      border: 1px solid ${i(n.gray[300],n.darkGray[200])};
      height: min-content;
      color: ${i(n.gray[600],n.gray[400])};
      & > svg {
        width: ${o[3]};
        height: ${o[3]};
      }
      & input {
        font-size: ${r.size.xs};
        width: 100%;
        background-color: ${i(n.gray[100],n.darkGray[400])};
        border: none;
        padding: 0;
        line-height: ${r.lineHeight.sm};
        color: ${i(n.gray[700],n.gray[300])};
        &::placeholder {
          color: ${i(n.gray[700],n.gray[300])};
        }
        &:focus {
          outline: none;
        }
      }

      &:focus-within {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,filterSelect:t`
      padding: ${S.size[.5]} ${S.size[2]};
      border-radius: ${S.border.radius.sm};
      background-color: ${i(n.gray[100],n.darkGray[400])};
      display: flex;
      align-items: center;
      gap: ${S.size[1.5]};
      box-sizing: content-box;
      max-width: 160px;
      border: 1px solid ${i(n.gray[300],n.darkGray[200])};
      height: min-content;
      & > svg {
        color: ${i(n.gray[600],n.gray[400])};
        width: ${S.size[2]};
        height: ${S.size[2]};
      }
      & > select {
        appearance: none;
        color: ${i(n.gray[700],n.gray[300])};
        min-width: 100px;
        line-height: ${r.lineHeight.sm};
        font-size: ${r.size.xs};
        background-color: ${i(n.gray[100],n.darkGray[400])};
        border: none;
        &:focus {
          outline: none;
        }
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,actionsContainer:t`
      display: flex;
      gap: ${S.size[2]};
    `,actionsBtn:t`
      border-radius: ${S.border.radius.sm};
      background-color: ${i(n.gray[100],n.darkGray[400])};
      border: 1px solid ${i(n.gray[300],n.darkGray[200])};
      width: ${S.size[6.5]};
      height: ${S.size[6.5]};
      justify-content: center;
      display: flex;
      align-items: center;
      gap: ${S.size[1.5]};
      max-width: 160px;
      cursor: pointer;
      padding: 0;
      &:hover {
        background-color: ${i(n.gray[200],n.darkGray[500])};
      }
      & svg {
        color: ${i(n.gray[700],n.gray[300])};
        width: ${S.size[3]};
        height: ${S.size[3]};
      }
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,actionsBtnOffline:t`
      & svg {
        stroke: ${i(n.yellow[700],n.yellow[500])};
        fill: ${i(n.yellow[700],n.yellow[500])};
      }
    `,overflowQueryContainer:t`
      flex: 1;
      overflow-y: auto;
      & > div {
        display: flex;
        flex-direction: column;
      }
    `,queryRow:t`
      display: flex;
      align-items: center;
      padding: 0;
      border: none;
      cursor: pointer;
      color: ${i(n.gray[700],n.gray[300])};
      background-color: ${i(n.gray[50],n.darkGray[700])};
      line-height: 1;
      &:focus {
        outline: none;
      }
      &:focus-visible {
        outline-offset: -2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      &:hover .tsqd-query-hash {
        background-color: ${i(n.gray[200],n.darkGray[600])};
      }

      & .tsqd-query-observer-count {
        padding: 0 ${S.size[1]};
        user-select: none;
        min-width: ${S.size[6.5]};
        align-self: stretch;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${r.size.xs};
        font-weight: ${r.weight.medium};
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom: 1px solid ${i(n.gray[300],n.darkGray[700])};
      }
      & .tsqd-query-hash {
        user-select: text;
        font-size: ${r.size.xs};
        display: flex;
        align-items: center;
        min-height: ${S.size[6]};
        flex: 1;
        padding: ${S.size[1]} ${S.size[2]};
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        border-bottom: 1px solid ${i(n.gray[300],n.darkGray[400])};
        text-align: left;
        text-overflow: clip;
        word-break: break-word;
      }

      & .tsqd-query-disabled-indicator {
        align-self: stretch;
        display: flex;
        align-items: center;
        padding: 0 ${S.size[2]};
        color: ${i(n.gray[800],n.gray[300])};
        background-color: ${i(n.gray[300],n.darkGray[600])};
        border-bottom: 1px solid ${i(n.gray[300],n.darkGray[400])};
        font-size: ${r.size.xs};
      }
    `,selectedQueryRow:t`
      background-color: ${i(n.gray[200],n.darkGray[500])};
    `,detailsContainer:t`
      flex: 1 1 700px;
      background-color: ${i(n.gray[50],n.darkGray[700])};
      color: ${i(n.gray[700],n.gray[300])};
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      display: flex;
      text-align: left;
    `,detailsHeader:t`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: ${i(n.gray[200],n.darkGray[600])};
      padding: ${S.size[1.5]} ${S.size[2]};
      font-weight: ${r.weight.medium};
      font-size: ${r.size.xs};
      line-height: ${r.lineHeight.xs};
      text-align: left;
    `,detailsBody:t`
      margin: ${S.size[1.5]} 0px ${S.size[2]} 0px;
      & > div {
        display: flex;
        align-items: stretch;
        padding: 0 ${S.size[2]};
        line-height: ${r.lineHeight.sm};
        justify-content: space-between;
        & > span {
          font-size: ${r.size.xs};
        }
        & > span:nth-child(2) {
          font-variant-numeric: tabular-nums;
        }
      }

      & > div:first-child {
        margin-bottom: ${S.size[1.5]};
      }

      & code {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        margin: 0;
        font-size: ${r.size.xs};
        line-height: ${r.lineHeight.xs};
      }

      & pre {
        margin: 0;
        display: flex;
        align-items: center;
      }
    `,queryDetailsStatus:t`
      border: 1px solid ${n.darkGray[200]};
      border-radius: ${S.border.radius.sm};
      font-weight: ${r.weight.medium};
      padding: ${S.size[1]} ${S.size[2.5]};
    `,actionsBody:t`
      flex-wrap: wrap;
      margin: ${S.size[2]} 0px ${S.size[2]} 0px;
      display: flex;
      gap: ${S.size[2]};
      padding: 0px ${S.size[2]};
      & > button {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
        font-size: ${r.size.xs};
        padding: ${S.size[1]} ${S.size[2]};
        display: flex;
        border-radius: ${S.border.radius.sm};
        background-color: ${i(n.gray[100],n.darkGray[600])};
        border: 1px solid ${i(n.gray[300],n.darkGray[400])};
        align-items: center;
        gap: ${S.size[2]};
        font-weight: ${r.weight.medium};
        line-height: ${r.lineHeight.xs};
        cursor: pointer;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${a.radius.xs};
          outline: 2px solid ${n.blue[800]};
        }
        &:hover {
          background-color: ${i(n.gray[200],n.darkGray[500])};
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        & > span {
          width: ${o[1.5]};
          height: ${o[1.5]};
          border-radius: ${S.border.radius.full};
        }
      }
    `,actionsSelect:t`
      font-size: ${r.size.xs};
      padding: ${S.size[.5]} ${S.size[2]};
      display: flex;
      border-radius: ${S.border.radius.sm};
      overflow: hidden;
      background-color: ${i(n.gray[100],n.darkGray[600])};
      border: 1px solid ${i(n.gray[300],n.darkGray[400])};
      align-items: center;
      gap: ${S.size[2]};
      font-weight: ${r.weight.medium};
      line-height: ${r.lineHeight.sm};
      color: ${i(n.red[500],n.red[400])};
      cursor: pointer;
      position: relative;
      &:hover {
        background-color: ${i(n.gray[200],n.darkGray[500])};
      }
      & > span {
        width: ${o[1.5]};
        height: ${o[1.5]};
        border-radius: ${S.border.radius.full};
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      & select {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        appearance: none;
        background-color: transparent;
        border: none;
        color: transparent;
        outline: none;
      }

      & svg path {
        stroke: ${S.colors.red[400]};
      }
      & svg {
        width: ${S.size[2]};
        height: ${S.size[2]};
      }
    `,settingsMenu:t`
      display: flex;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
      flex-direction: column;
      gap: ${o[.5]};
      border-radius: ${S.border.radius.sm};
      border: 1px solid ${i(n.gray[300],n.gray[700])};
      background-color: ${i(n.gray[50],n.darkGray[600])};
      font-size: ${r.size.xs};
      color: ${i(n.gray[700],n.gray[300])};
      z-index: 99999;
      min-width: 120px;
      padding: ${o[.5]};
    `,settingsSubTrigger:t`
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: ${S.border.radius.xs};
      padding: ${S.size[1]} ${S.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      color: ${i(n.gray[700],n.gray[300])};
      & svg {
        color: ${i(n.gray[600],n.gray[400])};
        transform: rotate(-90deg);
        width: ${S.size[2]};
        height: ${S.size[2]};
      }
      &:hover {
        background-color: ${i(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
      &.data-disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `,settingsMenuHeader:t`
      padding: ${S.size[1]} ${S.size[1]};
      font-weight: ${r.weight.medium};
      border-bottom: 1px solid ${i(n.gray[300],n.darkGray[400])};
      color: ${i(n.gray[500],n.gray[400])};
      font-size: ${r.size.xs};
    `,settingsSubButton:t`
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${i(n.gray[700],n.gray[300])};
      font-size: ${r.size.xs};
      border-radius: ${S.border.radius.xs};
      padding: ${S.size[1]} ${S.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      & svg {
        color: ${i(n.gray[600],n.gray[400])};
      }
      &:hover {
        background-color: ${i(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
    `,themeSelectedButton:t`
      background-color: ${i(n.purple[100],n.purple[900])};
      color: ${i(n.purple[700],n.purple[300])};
      & svg {
        color: ${i(n.purple[700],n.purple[300])};
      }
      &:hover {
        background-color: ${i(n.purple[100],n.purple[900])};
      }
    `,viewToggle:t`
      border-radius: ${S.border.radius.sm};
      background-color: ${i(n.gray[200],n.darkGray[600])};
      border: 1px solid ${i(n.gray[300],n.darkGray[200])};
      display: flex;
      padding: 0;
      font-size: ${r.size.xs};
      color: ${i(n.gray[700],n.gray[300])};
      overflow: hidden;

      &:has(:focus-visible) {
        outline: 2px solid ${n.blue[800]};
      }

      & .tsqd-radio-toggle {
        opacity: 0.5;
        display: flex;
        & label {
          display: flex;
          align-items: center;
          cursor: pointer;
          line-height: ${r.lineHeight.md};
        }

        & label:hover {
          background-color: ${i(n.gray[100],n.darkGray[500])};
        }
      }

      & > [data-checked] {
        opacity: 1;
        background-color: ${i(n.gray[100],n.darkGray[400])};
        & label:hover {
          background-color: ${i(n.gray[100],n.darkGray[400])};
        }
      }

      & .tsqd-radio-toggle:first-child {
        & label {
          padding: 0 ${S.size[1.5]} 0 ${S.size[2]};
        }
        border-right: 1px solid ${i(n.gray[300],n.darkGray[200])};
      }

      & .tsqd-radio-toggle:nth-child(2) {
        & label {
          padding: 0 ${S.size[2]} 0 ${S.size[1.5]};
        }
      }
    `,devtoolsEditForm:t`
      padding: ${o[2]};
      & > [data-error='true'] {
        outline: 2px solid ${i(n.red[200],n.red[800])};
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
      }
    `,devtoolsEditTextarea:t`
      width: 100%;
      max-height: 500px;
      font-family: 'Fira Code', monospace;
      font-size: ${r.size.xs};
      border-radius: ${a.radius.sm};
      field-sizing: content;
      padding: ${o[2]};
      background-color: ${i(n.gray[100],n.darkGray[800])};
      color: ${i(n.gray[900],n.gray[100])};
      border: 1px solid ${i(n.gray[200],n.gray[700])};
      resize: none;
      &:focus {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${i(n.blue[200],n.blue[800])};
      }
    `,devtoolsEditFormActions:t`
      display: flex;
      justify-content: space-between;
      gap: ${o[2]};
      align-items: center;
      padding-top: ${o[1]};
      font-size: ${r.size.xs};
    `,devtoolsEditFormError:t`
      color: ${i(n.red[700],n.red[500])};
    `,devtoolsEditFormActionContainer:t`
      display: flex;
      gap: ${o[2]};
    `,devtoolsEditFormAction:t`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      font-size: ${r.size.xs};
      padding: ${o[1]} ${S.size[2]};
      display: flex;
      border-radius: ${a.radius.sm};
      background-color: ${i(n.gray[100],n.darkGray[600])};
      border: 1px solid ${i(n.gray[300],n.darkGray[400])};
      align-items: center;
      gap: ${o[2]};
      font-weight: ${r.weight.medium};
      line-height: ${r.lineHeight.xs};
      cursor: pointer;
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      &:hover {
        background-color: ${i(n.gray[200],n.darkGray[500])};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `}},Ue=e=>vs("light",e),Ve=e=>vs("dark",e);rr(["click","mousedown","input"]);export{ys as C,i0 as D,o0 as P,Ys as Q,r0 as T,Xs as a,s0 as b,n0 as c};
