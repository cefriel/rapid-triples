(self["webpackChunkmobilitydcatap_ui"]=self["webpackChunkmobilitydcatap_ui"]||[]).push([[420],{46420:function(t,e,s){const r=s(69162),a=s(19488);class n extends a{constructor(t){super(r,t)}}t.exports=n},86505:function(t){class e{constructor(t){this.stream=t,this.array=[]}push(t){this.array.push(t)}end(){this.stream.push(this.array),this.stream.push(null)}}t.exports=e},69162:function(t,e,s){const r=s(28399),a=s(86505),n=s(85863);class i extends r{constructor(t,{encoding:e="object"}={}){if(super({objectMode:!0,read:()=>{}}),"object"===e&&(this.encoder=new a(this)),"string"===e&&(this.encoder=new n(this)),!this.encoder)throw new Error(`unknown encoding: ${e}`);t.on("data",(t=>{const e={};let s=e;"DefaultGraph"!==t.graph.termType&&(e["@id"]=t.graph.value,e["@graph"]={},s=e["@graph"]),s["@id"]=i.subjectValue(t.subject),"http://www.w3.org/1999/02/22-rdf-syntax-ns#type"===t.predicate.value?s["@type"]=i.subjectValue(t.object):s[t.predicate.value]=i.objectValue(t.object),this.encoder.push(e)})),t.on("end",(()=>this.encoder.end())),t.on("error",(t=>this.emit("error",t)))}static subjectValue(t){return"BlankNode"===t.termType?"_:"+t.value:t.value}static objectValue(t){return"NamedNode"===t.termType?{"@id":t.value}:"BlankNode"===t.termType?{"@id":"_:"+t.value}:t.language?{"@language":t.language,"@value":t.value}:t.datatype&&"http://www.w3.org/2001/XMLSchema#string"!==t.datatype.value?{"@type":t.datatype.value,"@value":t.value}:t.value}}t.exports=i},85863:function(t){class e{constructor(t){this.stream=t,this.first=!0,this.stream.push("[")}push(t){this.first?this.first=!1:this.stream.push(","),this.stream.push(JSON.stringify(t))}end(){this.stream.push("]"),this.stream.push(null)}}t.exports=e},19488:function(t){class e{constructor(t,e){this.Impl=t,this.options=e}import(t,e){const s=new this.Impl(t,Object.assign({},this.options,e));return t.on("end",(()=>{s.readable||s.emit("end")})),t.on("error",(t=>{s.emit("error",t)})),s}}t.exports=e}}]);
//# sourceMappingURL=420.0de9e036.js.map