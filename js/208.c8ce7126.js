(self["webpackChunkmobilitydcatap_ui"]=self["webpackChunkmobilitydcatap_ui"]||[]).push([[208],{92208:function(e,t,r){const i=r(77761),s=r(19488);class n extends s{constructor(e){super(i,e)}}e.exports=n},77761:function(e,t,r){const i=r(44564),s=r(59080),{finished:n}=r(28399),o=r(75984);class a extends o{constructor(e,{baseIRI:t="",factory:r=s}={}){const o=new i.StreamParser({baseIRI:t,factory:r});super(o,{objectMode:!0}),o.on("prefix",((e,t)=>{this.emit("prefix",e,t)})),o.on("error",(e=>{this.destroy(e)})),n(this,(()=>{o.end()})),e.pipe(o)}}e.exports=a},59080:function(e,t,r){const i=r(90690);e.exports=i},86534:function(e){class t{constructor(e){this.value=e||"b"+ ++t.nextId}equals(e){return!!e&&e.termType===this.termType&&e.value===this.value}}t.prototype.termType="BlankNode",t.nextId=0,e.exports=t},90690:function(e,t,r){const i=r(86534),s=r(597),n=r(94648),o=r(89999),a=r(83753),u=r(2781),c=r(27722);function h(e){return new a(e)}function d(e){return new i(e)}function l(e,t){return"string"===typeof t?-1===t.indexOf(":")?new o(e,t):new o(e,null,j.namedNode(t)):new o(e,null,t)}function f(e){return new c(e)}function p(){return j.defaultGraphInstance}function _(e,t,r){return j.quad(e,t,r)}function m(e,t,r,i){return new u(e,t,r,i||j.defaultGraphInstance)}function b(e){return n.call(j,e)}function y(e){return n.call(j,e)}const j={namedNode:h,blankNode:d,literal:l,variable:f,defaultGraph:p,triple:_,quad:m,fromTerm:b,fromQuad:y,defaultGraphInstance:new s};e.exports=j},597:function(e){class t{equals(e){return!!e&&e.termType===this.termType}}t.prototype.termType="DefaultGraph",t.prototype.value="",e.exports=t},89999:function(e,t,r){const i=r(83753);class s{constructor(e,t,r){this.value=e,this.datatype=s.stringDatatype,this.language="",t?(this.language=t,this.datatype=s.langStringDatatype):r&&(this.datatype=r)}equals(e){return!!e&&e.termType===this.termType&&e.value===this.value&&e.language===this.language&&e.datatype.equals(this.datatype)}}s.prototype.termType="Literal",s.langStringDatatype=new i("http://www.w3.org/1999/02/22-rdf-syntax-ns#langString"),s.stringDatatype=new i("http://www.w3.org/2001/XMLSchema#string"),e.exports=s},83753:function(e){class t{constructor(e){this.value=e}equals(e){return!!e&&e.termType===this.termType&&e.value===this.value}}t.prototype.termType="NamedNode",e.exports=t},2781:function(e,t,r){const i=r(597);class s{constructor(e,t,r,s){this.subject=e,this.predicate=t,this.object=r,this.graph=s||new i}equals(e){return!!e&&("Quad"===e.termType||!e.termType)&&e.subject.equals(this.subject)&&e.predicate.equals(this.predicate)&&e.object.equals(this.object)&&e.graph.equals(this.graph)}}s.prototype.termType="Quad",s.prototype.value="",e.exports=s},27722:function(e){class t{constructor(e){this.value=e}equals(e){return!!e&&e.termType===this.termType&&e.value===this.value}}t.prototype.termType="Variable",e.exports=t},94648:function(e){function t(e){if(!e)return null;if("BlankNode"===e.termType)return this.blankNode(e.value);if("DefaultGraph"===e.termType)return this.defaultGraph();if("Literal"===e.termType)return this.literal(e.value,e.language||this.namedNode(e.datatype.value));if("NamedNode"===e.termType)return this.namedNode(e.value);if("Quad"===e.termType){const t=this.fromTerm(e.subject),r=this.fromTerm(e.predicate),i=this.fromTerm(e.object),s=this.fromTerm(e.graph);return this.quad(t,r,i,s)}if("Variable"===e.termType)return this.variable(e.value);throw new Error(`unknown termType ${e.termType}`)}e.exports=t},19488:function(e){class t{constructor(e,t){this.Impl=e,this.options=t}import(e,t){const r=new this.Impl(e,Object.assign({},this.options,t));return e.on("end",(()=>{r.readable||r.emit("end")})),e.on("error",(e=>{r.emit("error",e)})),r}}e.exports=t},44564:function(e,t,r){"use strict";r.r(t),r.d(t,{BlankNode:function(){return a.PB},DataFactory:function(){return a.Ay},DefaultGraph:function(){return a.yV},EntityIndex:function(){return O},Lexer:function(){return s.A},Literal:function(){return a.uS},NamedNode:function(){return a.Yo},Parser:function(){return n.A},Quad:function(){return a.kO},Reasoner:function(){return G},Store:function(){return k},StoreFactory:function(){return P},StreamParser:function(){return z.A},StreamWriter:function(){return E},Term:function(){return a.x1},Triple:function(){return a.n7},Util:function(){return i},Variable:function(){return a.rT},Writer:function(){return x},default:function(){return L},getRulesFromDataset:function(){return B},termFromId:function(){return a.iN},termToId:function(){return a.FL}});var i={};r.r(i),r.d(i,{inDefaultGraph:function(){return f},isBlankNode:function(){return c},isDefaultGraph:function(){return l},isLiteral:function(){return h},isNamedNode:function(){return u},isVariable:function(){return d},prefix:function(){return p},prefixes:function(){return _}});var s=r(3524),n=r(33291),o=r(65852),a=r(28612);function u(e){return!!e&&"NamedNode"===e.termType}function c(e){return!!e&&"BlankNode"===e.termType}function h(e){return!!e&&"Literal"===e.termType}function d(e){return!!e&&"Variable"===e.termType}function l(e){return!!e&&"DefaultGraph"===e.termType}function f(e){return l(e.graph)}function p(e,t){return _({"":e.value||e},t)("")}function _(e,t){const r=Object.create(null);for(const s in e)i(s,e[s]);function i(e,i){if("string"===typeof i){const s=Object.create(null);r[e]=e=>s[e]||(s[e]=t.namedNode(i+e))}else if(!(e in r))throw new Error(`Unknown prefix: ${e}`);return r[e]}return t=t||a.Ay,i}const m=a.Ay.defaultGraph(),{rdf:b,xsd:y}=o.A,j=/["\\\t\n\r\b\f\u0000-\u0019\ud800-\udbff]/,I=/["\\\t\n\r\b\f\u0000-\u0019]|[\ud800-\udbff][\udc00-\udfff]/g,g={"\\":"\\\\",'"':'\\"',"\t":"\\t","\n":"\\n","\r":"\\r","\b":"\\b","\f":"\\f"};class v extends a.x1{equals(e){return e===this}}class x{constructor(e,t){if(this._prefixRegex=/$0^/,e&&"function"!==typeof e.write&&(t=e,e=null),t=t||{},this._lists=t.lists,e)this._outputStream=e,this._endStream=void 0===t.end||!!t.end;else{let e="";this._outputStream={write(t,r,i){e+=t,i&&i()},end:t=>{t&&t(null,e)}},this._endStream=!0}this._subject=null,/triple|quad/i.test(t.format)?(this._lineMode=!0,this._writeQuad=this._writeQuadLine):(this._lineMode=!1,this._graph=m,this._prefixIRIs=Object.create(null),t.prefixes&&this.addPrefixes(t.prefixes),t.baseIRI&&(this._baseMatcher=new RegExp(`^${T(t.baseIRI)}${t.baseIRI.endsWith("/")?"":"[#?]"}`),this._baseLength=t.baseIRI.length))}get _inDefaultGraph(){return m.equals(this._graph)}_write(e,t){this._outputStream.write(e,"utf8",t)}_writeQuad(e,t,r,i,s){try{i.equals(this._graph)||(this._write((null===this._subject?"":this._inDefaultGraph?".\n":"\n}\n")+(m.equals(i)?"":`${this._encodeIriOrBlank(i)} {\n`)),this._graph=i,this._subject=null),e.equals(this._subject)?t.equals(this._predicate)?this._write(`, ${this._encodeObject(r)}`,s):this._write(`;\n    ${this._encodePredicate(this._predicate=t)} ${this._encodeObject(r)}`,s):this._write(`${(null===this._subject?"":".\n")+this._encodeSubject(this._subject=e)} ${this._encodePredicate(this._predicate=t)} ${this._encodeObject(r)}`,s)}catch(n){s&&s(n)}}_writeQuadLine(e,t,r,i,s){delete this._prefixMatch,this._write(this.quadToString(e,t,r,i),s)}quadToString(e,t,r,i){return`${this._encodeSubject(e)} ${this._encodeIriOrBlank(t)} ${this._encodeObject(r)}${i&&i.value?` ${this._encodeIriOrBlank(i)} .\n`:" .\n"}`}quadsToString(e){let t="";for(const r of e)t+=this.quadToString(r.subject,r.predicate,r.object,r.graph);return t}_encodeSubject(e){return"Quad"===e.termType?this._encodeQuad(e):this._encodeIriOrBlank(e)}_encodeIriOrBlank(e){if("NamedNode"!==e.termType)return this._lists&&e.value in this._lists&&(e=this.list(this._lists[e.value])),"id"in e?e.id:`_:${e.value}`;let t=e.value;this._baseMatcher&&this._baseMatcher.test(t)&&(t=t.substr(this._baseLength)),j.test(t)&&(t=t.replace(I,w));const r=this._prefixRegex.exec(t);return r?r[1]?this._prefixIRIs[r[1]]+r[2]:t:`<${t}>`}_encodeLiteral(e){let t=e.value;if(j.test(t)&&(t=t.replace(I,w)),e.language)return`"${t}"@${e.language}`;if(this._lineMode){if(e.datatype.value===y.string)return`"${t}"`}else switch(e.datatype.value){case y.string:return`"${t}"`;case y.boolean:if("true"===t||"false"===t)return t;break;case y.integer:if(/^[+-]?\d+$/.test(t))return t;break;case y.decimal:if(/^[+-]?\d*\.\d+$/.test(t))return t;break;case y.double:if(/^[+-]?(?:\d+\.\d*|\.?\d+)[eE][+-]?\d+$/.test(t))return t;break}return`"${t}"^^${this._encodeIriOrBlank(e.datatype)}`}_encodePredicate(e){return e.value===b.type?"a":this._encodeIriOrBlank(e)}_encodeObject(e){switch(e.termType){case"Quad":return this._encodeQuad(e);case"Literal":return this._encodeLiteral(e);default:return this._encodeIriOrBlank(e)}}_encodeQuad({subject:e,predicate:t,object:r,graph:i}){return`<<${this._encodeSubject(e)} ${this._encodePredicate(t)} ${this._encodeObject(r)}${l(i)?"":` ${this._encodeIriOrBlank(i)}`}>>`}_blockedWrite(){throw new Error("Cannot write because the writer has been closed.")}addQuad(e,t,r,i,s){void 0===r?this._writeQuad(e.subject,e.predicate,e.object,e.graph,t):"function"===typeof i?this._writeQuad(e,t,r,m,i):this._writeQuad(e,t,r,i||m,s)}addQuads(e){for(let t=0;t<e.length;t++)this.addQuad(e[t])}addPrefix(e,t,r){const i={};i[e]=t,this.addPrefixes(i,r)}addPrefixes(e,t){if(!this._prefixIRIs)return t&&t();let r=!1;for(let i in e){let t=e[i];"string"!==typeof t&&(t=t.value),r=!0,null!==this._subject&&(this._write(this._inDefaultGraph?".\n":"\n}\n"),this._subject=null,this._graph=""),this._prefixIRIs[t]=i+=":",this._write(`@prefix ${i} <${t}>.\n`)}if(r){let e="",t="";for(const r in this._prefixIRIs)e+=e?`|${r}`:r,t+=(t?"|":"")+this._prefixIRIs[r];e=T(e,/[\]\/\(\)\*\+\?\.\\\$]/g,"\\$&"),this._prefixRegex=new RegExp(`^(?:${t})[^/]*$|^(${e})([_a-zA-Z][\\-_a-zA-Z0-9]*)$`)}this._write(r?"\n":"",t)}blank(e,t){let r,i,s=e;switch(void 0===e?s=[]:e.termType?s=[{predicate:e,object:t}]:"length"in e||(s=[e]),i=s.length){case 0:return new v("[]");case 1:if(r=s[0],!(r.object instanceof v))return new v(`[ ${this._encodePredicate(r.predicate)} ${this._encodeObject(r.object)} ]`);default:let t="[";for(let n=0;n<i;n++)r=s[n],r.predicate.equals(e)?t+=`, ${this._encodeObject(r.object)}`:(t+=`${(n?";\n  ":"\n  ")+this._encodePredicate(r.predicate)} ${this._encodeObject(r.object)}`,e=r.predicate);return new v(`${t}\n]`)}}list(e){const t=e&&e.length||0,r=new Array(t);for(let i=0;i<t;i++)r[i]=this._encodeObject(e[i]);return new v(`(${r.join(" ")})`)}end(e){null!==this._subject&&(this._write(this._inDefaultGraph?".\n":"\n}\n"),this._subject=null),this._write=this._blockedWrite;let t=e&&((r,i)=>{t=null,e(r,i)});if(this._endStream)try{return this._outputStream.end(t)}catch(r){}t&&t()}}function w(e){let t=g[e];return void 0===t&&(1===e.length?(t=e.charCodeAt(0).toString(16),t="\\u0000".substr(0,6-t.length)+t):(t=(1024*(e.charCodeAt(0)-55296)+e.charCodeAt(1)+9216).toString(16),t="\\U00000000".substr(0,10-t.length)+t)),t}function T(e){return e.replace(/[\]\/\(\)\*\+\?\.\\\$]/g,"\\$&")}var N=r(85721);const $=Symbol("iter");function S(e,t,r=4){if(0===r)return Object.assign(e,t);for(const i in t)e[i]=S(e[i]||Object.create(null),t[i],r-1);return e}function Q(e,t,r=4){let i=!1;for(const s in e)if(s in t){const n=0===r?null:Q(e[s],t[s],r-1);if(!1!==n)i=i||Object.create(null),i[s]=n;else if(3===r)return!1}return i}class O{constructor(e={}){this._id=1,this._ids=Object.create(null),this._ids[""]=1,this._entities=Object.create(null),this._entities[1]="",this._blankNodeIndex=0,this._factory=e.factory||a.Ay}_termFromId(e){if("."===e[0]){const t=this._entities,r=e.split("."),i=this._factory.quad(this._termFromId(t[r[1]]),this._termFromId(t[r[2]]),this._termFromId(t[r[3]]),r[4]&&this._termFromId(t[r[4]]));return i}return(0,a.iN)(e,this._factory)}_termToNumericId(e){if("Quad"===e.termType){const t=this._termToNumericId(e.subject),r=this._termToNumericId(e.predicate),i=this._termToNumericId(e.object);let s;return t&&r&&i&&(l(e.graph)||(s=this._termToNumericId(e.graph)))&&this._ids[s?`.${t}.${r}.${i}.${s}`:`.${t}.${r}.${i}`]}return this._ids[(0,a.FL)(e)]}_termToNewNumericId(e){const t=e&&"Quad"===e.termType?`.${this._termToNewNumericId(e.subject)}.${this._termToNewNumericId(e.predicate)}.${this._termToNewNumericId(e.object)}${l(e.graph)?"":`.${this._termToNewNumericId(e.graph)}`}`:(0,a.FL)(e);return this._ids[t]||(this._ids[this._entities[++this._id]=t]=this._id)}createBlankNode(e){let t,r;if(e){t=e=`_:${e}`,r=1;while(this._ids[t])t=e+r++}else do{t="_:b"+this._blankNodeIndex++}while(this._ids[t]);return this._ids[t]=++this._id,this._entities[this._id]=t,this._factory.blankNode(t.substr(2))}}class k{constructor(e,t){this._size=0,this._graphs=Object.create(null),t||!e||e[0]||(t=e,e=null),t=t||{},this._factory=t.factory||a.Ay,this._entityIndex=t.entityIndex||new O({factory:this._factory}),this._entities=this._entityIndex._entities,this._termFromId=this._entityIndex._termFromId.bind(this._entityIndex),this._termToNumericId=this._entityIndex._termToNumericId.bind(this._entityIndex),this._termToNewNumericId=this._entityIndex._termToNewNumericId.bind(this._entityIndex),e&&this.addQuads(e)}get size(){let e=this._size;if(null!==e)return e;e=0;const t=this._graphs;let r,i;for(const s in t)for(const n in r=t[s].subjects)for(const t in i=r[n])e+=Object.keys(i[t]).length;return this._size=e}_addToIndex(e,t,r,i){const s=e[t]||(e[t]={}),n=s[r]||(s[r]={}),o=i in n;return o||(n[i]=null),!o}_removeFromIndex(e,t,r,i){const s=e[t],n=s[r];delete n[i];for(const o in n)return;delete s[r];for(const o in s)return;delete e[t]}*_findInIndex(e,t,r,i,s,n,o,a){let u,c,h;const d=this._entities,l=this._termFromId(d[a]),f={subject:null,predicate:null,object:null};t&&((u=e,e={})[t]=u[t]);for(const p in e)if(c=e[p]){f[s]=this._termFromId(d[p]),r&&((u=c,c={})[r]=u[r]);for(const e in c)if(h=c[e]){f[n]=this._termFromId(d[e]);const t=i?i in h?[i]:[]:Object.keys(h);for(let e=0;e<t.length;e++)f[o]=this._termFromId(d[t[e]]),yield this._factory.quad(f.subject,f.predicate,f.object,l)}}}_loop(e,t){for(const r in e)t(r)}_loopByKey0(e,t,r){let i,s;if(i=e[t])for(s in i)r(s)}_loopByKey1(e,t,r){let i,s;for(i in e)s=e[i],s[t]&&r(i)}_loopBy2Keys(e,t,r,i){let s,n,o;if((s=e[t])&&(n=s[r]))for(o in n)i(o)}_countInIndex(e,t,r,i){let s,n,o,a=0;t&&((s=e,e={})[t]=s[t]);for(const u in e)if(n=e[u]){r&&((s=n,n={})[r]=s[r]);for(const e in n)(o=n[e])&&(i?i in o&&a++:a+=Object.keys(o).length)}return a}_getGraphs(e){return e=""===e?1:e&&(this._termToNumericId(e)||-1),"number"!==typeof e?this._graphs:{[e]:this._graphs[e]}}_uniqueEntities(e){const t=Object.create(null);return r=>{r in t||(t[r]=!0,e(this._termFromId(this._entities[r],this._factory)))}}add(e){return this.addQuad(e),this}addQuad(e,t,r,i){t||(i=e.graph,r=e.object,t=e.predicate,e=e.subject),i=i?this._termToNewNumericId(i):1;let s=this._graphs[i];return s||(s=this._graphs[i]={subjects:{},predicates:{},objects:{}},Object.freeze(s)),e=this._termToNewNumericId(e),t=this._termToNewNumericId(t),r=this._termToNewNumericId(r),!!this._addToIndex(s.subjects,e,t,r)&&(this._addToIndex(s.predicates,t,r,e),this._addToIndex(s.objects,r,e,t),this._size=null,!0)}addQuads(e){for(let t=0;t<e.length;t++)this.addQuad(e[t])}delete(e){return this.removeQuad(e),this}has(e,t,r,i){return e&&e.subject&&({subject:e,predicate:t,object:r,graph:i}=e),!this.readQuads(e,t,r,i).next().done}import(e){return e.on("data",(e=>{this.addQuad(e)})),e}removeQuad(e,t,r,i){t||({subject:e,predicate:t,object:r,graph:i}=e),i=i?this._termToNumericId(i):1;const s=this._graphs;let n,o,a;if(!(e=e&&this._termToNumericId(e))||!(t=t&&this._termToNumericId(t))||!(r=r&&this._termToNumericId(r))||!(n=s[i])||!(o=n.subjects[e])||!(a=o[t])||!(r in a))return!1;for(e in this._removeFromIndex(n.subjects,e,t,r),this._removeFromIndex(n.predicates,t,r,e),this._removeFromIndex(n.objects,r,e,t),null!==this._size&&this._size--,n.subjects)return!0;return delete s[i],!0}removeQuads(e){for(let t=0;t<e.length;t++)this.removeQuad(e[t])}remove(e){return e.on("data",(e=>{this.removeQuad(e)})),e}removeMatches(e,t,r,i){const s=new N.Readable({objectMode:!0}),n=this.readQuads(e,t,r,i);return s._read=e=>{while(--e>=0){const{done:e,value:t}=n.next();if(e)return void s.push(null);s.push(t)}},this.remove(s)}deleteGraph(e){return this.removeMatches(null,null,null,e)}getQuads(e,t,r,i){return[...this.readQuads(e,t,r,i)]}*readQuads(e,t,r,i){const s=this._getGraphs(i);let n,o,a,u;if(!(e&&!(o=this._termToNumericId(e))||t&&!(a=this._termToNumericId(t))||r&&!(u=this._termToNumericId(r))))for(const c in s)(n=s[c])&&(o?u?yield*this._findInIndex(n.objects,u,o,a,"object","subject","predicate",c):yield*this._findInIndex(n.subjects,o,a,null,"subject","predicate","object",c):a?yield*this._findInIndex(n.predicates,a,u,null,"predicate","object","subject",c):u?yield*this._findInIndex(n.objects,u,null,null,"object","subject","predicate",c):yield*this._findInIndex(n.subjects,null,null,null,"subject","predicate","object",c))}match(e,t,r,i){return new A(this,e,t,r,i,{entityIndex:this._entityIndex})}countQuads(e,t,r,i){const s=this._getGraphs(i);let n,o,a,u,c=0;if(e&&!(o=this._termToNumericId(e))||t&&!(a=this._termToNumericId(t))||r&&!(u=this._termToNumericId(r)))return 0;for(const h in s)(n=s[h])&&(c+=e?r?this._countInIndex(n.objects,u,o,a):this._countInIndex(n.subjects,o,a,u):t?this._countInIndex(n.predicates,a,u,o):this._countInIndex(n.objects,u,o,a));return c}forEach(e,t,r,i,s){this.some((t=>(e(t,this),!1)),t,r,i,s)}every(e,t,r,i,s){return!this.some((t=>!e(t,this)),t,r,i,s)}some(e,t,r,i,s){for(const n of this.readQuads(t,r,i,s))if(e(n))return!0;return!1}getSubjects(e,t,r){const i=[];return this.forSubjects((e=>{i.push(e)}),e,t,r),i}forSubjects(e,t,r,i){const s=this._getGraphs(i);let n,o,a;if(e=this._uniqueEntities(e),!(t&&!(o=this._termToNumericId(t))||r&&!(a=this._termToNumericId(r))))for(i in s)(n=s[i])&&(o?a?this._loopBy2Keys(n.predicates,o,a,e):this._loopByKey1(n.subjects,o,e):a?this._loopByKey0(n.objects,a,e):this._loop(n.subjects,e))}getPredicates(e,t,r){const i=[];return this.forPredicates((e=>{i.push(e)}),e,t,r),i}forPredicates(e,t,r,i){const s=this._getGraphs(i);let n,o,a;if(e=this._uniqueEntities(e),!(t&&!(o=this._termToNumericId(t))||r&&!(a=this._termToNumericId(r))))for(i in s)(n=s[i])&&(o?a?this._loopBy2Keys(n.objects,a,o,e):this._loopByKey0(n.subjects,o,e):a?this._loopByKey1(n.predicates,a,e):this._loop(n.predicates,e))}getObjects(e,t,r){const i=[];return this.forObjects((e=>{i.push(e)}),e,t,r),i}forObjects(e,t,r,i){const s=this._getGraphs(i);let n,o,a;if(e=this._uniqueEntities(e),!(t&&!(o=this._termToNumericId(t))||r&&!(a=this._termToNumericId(r))))for(i in s)(n=s[i])&&(o?a?this._loopBy2Keys(n.subjects,o,a,e):this._loopByKey1(n.objects,o,e):a?this._loopByKey0(n.predicates,a,e):this._loop(n.objects,e))}getGraphs(e,t,r){const i=[];return this.forGraphs((e=>{i.push(e)}),e,t,r),i}forGraphs(e,t,r,i){for(const s in this._graphs)this.some((t=>(e(t.graph),!0)),t,r,i,this._termFromId(this._entities[s]))}createBlankNode(e){return this._entityIndex.createBlankNode(e)}extractLists({remove:e=!1,ignoreErrors:t=!1}={}){const r={},i=t?()=>!0:(e,t)=>{throw new Error(`${e.value} ${t}`)},s=this.getQuads(null,o.A.rdf.rest,o.A.rdf.nil,null),n=e?[...s]:[];return s.forEach((t=>{const s=[];let a,u,c=!1;const h=t.graph;let d=t.subject;while(d&&!c){const e=this.getQuads(null,null,d,null),t=this.getQuads(d,null,null,null);let r,l=null,f=null,p=null;for(let s=0;s<t.length&&!c;s++)r=t[s],r.graph.equals(h)?a?c=i(d,"has non-list arcs out"):r.predicate.value===o.A.rdf.first?l?c=i(d,"has multiple rdf:first arcs"):n.push(l=r):r.predicate.value===o.A.rdf.rest?f?c=i(d,"has multiple rdf:rest arcs"):n.push(f=r):e.length?c=i(d,"can't be subject and object"):(a=r,u="subject"):c=i(d,"not confined to single graph");for(let s=0;s<e.length&&!c;++s)r=e[s],a?c=i(d,"can't have coreferences"):r.predicate.value===o.A.rdf.rest?p?c=i(d,"has incoming rdf:rest arcs"):p=r:(a=r,u="object");l?s.unshift(l.object):c=i(d,"has no list head"),d=p&&p.subject}c?e=!1:a&&(r[a[u].value]=s)})),e&&this.removeQuads(n),r}addAll(e){if(Array.isArray(e))this.addQuads(e);else if(e instanceof k&&e._entityIndex===this._entityIndex)0!==e._size&&(this._graphs=S(this._graphs,e._graphs),this._size=null);else for(const t of e)this.add(t);return this}contains(e){if(e===this)return!0;if(!(e instanceof k)||this._entityIndex!==e._entityIndex)return e.every((e=>this.has(e)));const t=this._graphs,r=e._graphs;let i,s,n,o,a;for(const u in r){if(!(i=t[u]))return!1;i=i.subjects;for(const e in s=r[u].subjects){if(!(n=i[e]))return!1;for(const t in o=s[e]){if(!(a=n[t]))return!1;for(const e in o[t])if(!(e in a))return!1}}}return!0}deleteMatches(e,t,r,i){for(const s of this.match(e,t,r,i))this.removeQuad(s);return this}difference(e){return e===this?new k({entityIndex:this._entityIndex}):this.filter((t=>!e.has(t)))}equals(e){return e===this||this.size===e.size&&this.contains(e)}filter(e){const t=new k({entityIndex:this._entityIndex});for(const r of this)e(r,this)&&t.add(r);return t}intersection(e){if(e===this){const e=new k({entityIndex:this._entityIndex});return e._graphs=S(Object.create(null),this._graphs),e._size=this._size,e}if(e instanceof k&&this._entityIndex===e._entityIndex){const t=new k({entityIndex:this._entityIndex}),r=Q(e._graphs,this._graphs);return r&&(t._graphs=r,t._size=null),t}return this.filter((t=>e.has(t)))}map(e){const t=new k({entityIndex:this._entityIndex});for(const r of this)t.add(e(r,this));return t}reduce(e,t){const r=this.readQuads();let i=void 0===t?r.next().value:t;for(const s of r)i=e(i,s,this);return i}toArray(){return this.getQuads()}toCanonical(){throw new Error("not implemented")}toStream(){return this.match()}toString(){return(new x).quadsToString(this)}union(e){const t=new k({entityIndex:this._entityIndex});return t._graphs=S(Object.create(null),this._graphs),t._size=this._size,t.addAll(e),t}*[Symbol.iterator](){yield*this.readQuads()}}function q(e,t,r=0){const i=t[r];if(i&&!(i in e))return!1;let s=!1;for(const n in i?{[i]:e[i]}:e){const i=2===r?null:q(e[n],t,r+1);!1!==i&&(s=s||Object.create(null),s[n]=i)}return s}class A extends N.Readable{constructor(e,t,r,i,s,n){super({objectMode:!0}),Object.assign(this,{n3Store:e,subject:t,predicate:r,object:i,graph:s,options:n})}get filtered(){if(!this._filtered){const{n3Store:e,graph:t,object:r,predicate:i,subject:s}=this,n=this._filtered=new k({factory:e._factory,entityIndex:this.options.entityIndex}),o=e._getGraphs(t);let a,u,c;if(s&&!(a=n._termToNumericId(s))||i&&!(u=n._termToNumericId(i))||r&&!(c=n._termToNumericId(r)))return n;for(const h in o){const e=q(o[h].subjects,[a,u,c]);e&&(n._graphs[h]={subjects:e,predicates:q(o[h].predicates,[u,c,a]),objects:q(o[h].objects,[c,a,u])})}n._size=null}return this._filtered}get size(){return this.filtered.size}_read(e){e>0&&!this[$]&&(this[$]=this[Symbol.iterator]());const t=this[$];while(--e>=0){const{done:e,value:r}=t.next();if(e)return void this.push(null);this.push(r)}}addAll(e){return this.filtered.addAll(e)}contains(e){return this.filtered.contains(e)}deleteMatches(e,t,r,i){return this.filtered.deleteMatches(e,t,r,i)}difference(e){return this.filtered.difference(e)}equals(e){return this.filtered.equals(e)}every(e,t,r,i,s){return this.filtered.every(e,t,r,i,s)}filter(e){return this.filtered.filter(e)}forEach(e,t,r,i,s){return this.filtered.forEach(e,t,r,i,s)}import(e){return this.filtered.import(e)}intersection(e){return this.filtered.intersection(e)}map(e){return this.filtered.map(e)}some(e,t,r,i,s){return this.filtered.some(e,t,r,i,s)}toCanonical(){return this.filtered.toCanonical()}toStream(){return this._filtered?this._filtered.toStream():this.n3Store.match(this.subject,this.predicate,this.object,this.graph)}union(e){return this._filtered?this._filtered.union(e):this.n3Store.match(this.subject,this.predicate,this.object,this.graph).addAll(e)}toArray(){return this._filtered?this._filtered.toArray():this.n3Store.getQuads(this.subject,this.predicate,this.object,this.graph)}reduce(e,t){return this.filtered.reduce(e,t)}toString(){return(new x).quadsToString(this)}add(e){return this.filtered.add(e)}delete(e){return this.filtered.delete(e)}has(e){return this.filtered.has(e)}match(e,t,r,i){return new A(this.filtered,e,t,r,i,this.options)}*[Symbol.iterator](){yield*this._filtered||this.n3Store.readQuads(this.subject,this.predicate,this.object,this.graph)}}class P{dataset(e){return new k(e)}}function B(e){const t=[];for(const{subject:r,object:i}of e.match(null,a.Ay.namedNode("http://www.w3.org/2000/10/swap/log#implies"),null,a.Ay.defaultGraph())){const s=[...e.match(null,null,null,r)],n=[...e.match(null,null,null,i)];t.push({premise:s,conclusion:n})}return t}class G{constructor(e){this._store=e}_add(e,t,r,i,s){this._store._addToIndex(i.subjects,e,t,r)&&(this._store._addToIndex(i.predicates,t,r,e),this._store._addToIndex(i.objects,r,e,t),s())}_evaluatePremise(e,t,r,i=0){let s,n,o,a,u;const[c,h,d]=e.premise[i].value,l=t[e.premise[i].content],f=!(o=c.value);for(o in f?l:{[o]:l[o]})if(a=l[o]){for(o in f&&(c.value=Number(o)),s=!(o=h.value),s?a:{[o]:a[o]})if(u=a[o]){for(o in s&&(h.value=Number(o)),n=!(o=d.value),n?u:{[o]:u[o]})n&&(d.value=Number(o)),i===e.premise.length-1?e.conclusion.forEach((e=>{this._add(e.subject.value,e.predicate.value,e.object.value,t,(()=>{r(e)}))})):this._evaluatePremise(e,t,r,i+1);n&&(d.value=null)}s&&(h.value=null)}f&&(c.value=null)}_evaluateRules(e,t,r){for(let i=0;i<e.length;i++)this._evaluatePremise(e[i],t,r)}_reasonGraphNaive(e,t){const r=[];function i(e){e.next&&e.next.forEach((t=>{r.push([e.subject.value,e.predicate.value,e.object.value,t])}))}const s=e=>{e.forEach((e=>{this._add(e.subject.value,e.predicate.value,e.object.value,t,(()=>{i(e)}))}))};let n;this._evaluateRules(e,t,i);while(void 0!==(n=r.pop())){const[e,r,o,a]=n,u=a.basePremise.subject.value;u||(a.basePremise.subject.value=e);const c=a.basePremise.predicate.value;c||(a.basePremise.predicate.value=r);const h=a.basePremise.object.value;h||(a.basePremise.object.value=o),0===a.premise.length?s(a.conclusion):this._evaluatePremise(a,t,i),u||(a.basePremise.subject.value=null),c||(a.basePremise.predicate.value=null),h||(a.basePremise.object.value=null)}}_createRule({premise:e,conclusion:t}){const r={},i=e=>"Variable"===e.termType?r[e.value]=r[e.value]||{}:{value:this._store._termToNewNumericId(e)},s=e=>({subject:i(e.subject),predicate:i(e.predicate),object:i(e.object)});return{premise:e.map((e=>s(e))),conclusion:t.map((e=>s(e))),variables:Object.values(r)}}reason(e){Array.isArray(e)||(e=B(e)),e=e.map((e=>this._createRule(e)));for(const r of e)for(const t of e)for(let e=0;e<t.premise.length;e++){const i=t.premise[e];for(const s of r.conclusion){if(R(i.subject,s.subject)&&R(i.predicate,s.predicate)&&R(i.object,s.object)){const r=new Set,n=[];i.subject.value=i.subject.value||1,i.object.value=i.object.value||1,i.predicate.value=i.predicate.value||1;for(let i=0;i<t.premise.length;i++)i!==e&&n.push(F(t.premise[i],r));(s.next=s.next||[]).push({premise:n,conclusion:t.conclusion,basePremise:i})}t.variables.forEach((e=>{e.value=null}))}}for(const r of e){const e=new Set;r.premise=r.premise.map((t=>F(t,e)))}const t=this._store._getGraphs();for(const r in t)this._reasonGraphNaive(e,t[r]);this._store._size=null}}function F({subject:e,predicate:t,object:r},i){const s=e.value||i.has(e)||(i.add(e),!1),n=t.value||i.has(t)||(i.add(t),!1),o=r.value||i.has(r)||(i.add(r),!1);return!s&&n?{content:"predicates",value:[t,r,e]}:o?{content:"objects",value:[r,e,t]}:{content:"subjects",value:[e,t,r]}}function R(e,t){return null===e.value&&(e.value=t.value),e.value===t.value}var z=r(66731);class E extends N.Transform{constructor(e){super({encoding:"utf8",writableObjectMode:!0});const t=this._writer=new x({write:(e,t,r)=>{this.push(e),r&&r()},end:e=>{this.push(null),e&&e()}},e);this._transform=(e,r,i)=>{t.addQuad(e,i)},this._flush=e=>{t.end(e)}}import(e){return e.on("data",(e=>{this.write(e)})),e.on("end",(()=>{this.end()})),e.on("error",(e=>{this.emit("error",e)})),e.on("prefix",((e,t)=>{this._writer.addPrefix(e,t)})),this}}var L={Lexer:s.A,Parser:n.A,Writer:x,Store:k,StoreFactory:P,EntityIndex:O,StreamParser:z.A,StreamWriter:E,Util:i,Reasoner:G,DataFactory:a.Ay,Term:a.x1,NamedNode:a.Yo,Literal:a.uS,BlankNode:a.PB,Variable:a.rT,DefaultGraph:a.yV,Quad:a.kO,Triple:a.n7,termFromId:a.iN,termToId:a.FL}},75984:function(e,t,r){const{finished:i,Readable:s}=r(28399);function n(){return new Promise((e=>setTimeout(e,0)))}class o extends s{constructor(e,{end:t=!0,map:r,...i}={}){super({read:o.readFrom(e,{end:t,map:r}),...i})}static readFrom(e,{end:t=!0,map:r=e=>e}={}){let s=!1;i(e,(()=>{s=!0}));const o=async function(){while(1){const i=e.read();if(i){if(!this.push(r(i)))return!1}else{if(s&&t&&this.push(null),s)return!0;await n()}}};return o}}e.exports=o}}]);
//# sourceMappingURL=208.c8ce7126.js.map