(function(){var e={99639:function(e,t,a){"use strict";var n=a(85471),r=a(45602),o=a(36407),i=function(){var e=this,t=e._self._c;return t(r.A,{attrs:{id:"inspire"}},[t("Topbar"),t(o.A,[t("router-view")],1),t("Footer")],1)},s=[],c=a(3698),d=a(52938),l=a(91950),m=function(){var e=this,t=e._self._c;return t(l.A,{attrs:{padless:""}},[t(c.A,{staticClass:"flex",attrs:{flat:"",tile:"",color:"#f5f5f5"}},[t(d.OQ,{staticClass:"text-center"},[e._v(" "+e._s((new Date).getFullYear())+" — "),t("strong",[t("a",{attrs:{href:"https://www.cefriel.com"}},[e._v("Cefriel")])]),e._v(" - "),t("strong",[t("a",{attrs:{href:"https://www.cefriel.com/privacy-policy/"}},[e._v("Privacy")])])])],1)],1)},u=[],p={name:"Footer"},f=p,h=a(81656),g=(0,h.A)(f,m,u,!1,null,null,null),_=g.exports,y=a(40070),b=a(21163),v=a(92367),w=function(){var e=this,t=e._self._c;return t(y.A,{attrs:{app:"",flat:"","clipped-left":""}},[t("router-link",{attrs:{to:"/"}},[t(b.A,{staticClass:"mx-2",attrs:{src:e.app_logo,"max-height":"40","max-width":"40",contain:""}})],1),t(v.sw,[e._v(e._s(e.app_name))])],1)},A=[],x={name:"App",data(){return{app_name:"Cefriel RDF Metadata Generator",app_logo:a(99467),path_items:[]}}},k=x,C=(0,h.A)(k,w,A,!1,null,null,null),S=C.exports,j={name:"App",components:{Footer:_,Topbar:S},data(){return{app_name:"Cefriel RDF Metadata Generator",app_logo:a(33153),path_items:[],username:window.localStorage.getItem("auth-user")}},methods:{}},F=j,D=(0,h.A)(F,i,s,!1,null,null,null),P=D.exports,O=a(25417);n.Ay.use(O.A);var T=new O.A({theme:{themes:{light:{primary:"#757575"}}}}),R=a(40173),M=a(88787),E=a(54414),N=a(3449),z=a(70174),L=a(60872),K=a(2756),U=a(81925),G=function(){var e=this,t=e._self._c;return t("div",[t("PageTitle",{attrs:{title:e.asset_type,show_breadcrumbs:!0}}),t(K.A,{staticClass:"px-10 my-2"},[t(E.A,{staticClass:"py-2",attrs:{cols:"8"}},[t("p",[e._v("Fill the form with all the metadata and download the corresponding RDF. Test and experiment to learn how different information should be described in RDF according to the considered specification."),t("br"),t("br"),e._v(" The page is client-side only so all the information inserted are not collected/stored but can not be retrieved if the page is reloaded. The output RDF can be converted to different serializations."),t("br"),t("br"),e._v(" This page is powered by "),t("b",[e._v("KCONG (Knowledge Catalogue and Governance)")]),e._v(" a complete (meta)data catalogue solution developed by "),t("a",{attrs:{href:"https://www.cefriel.com/"}},[e._v("Cefriel")]),e._v(". If you want to know more visit "),t("a",{attrs:{href:"https://kcong.cefriel.com/"}},[e._v("https://kcong.cefriel.com/")]),e._v(".")])]),t(E.A,{staticClass:"text-center py-2",attrs:{cols:"4"}},[t("img",{staticStyle:{"max-height":"100px"},attrs:{src:a(33153),alt:"Company Logo"}})])],1),e._l(e.alert_messages,(function(e,a){return t("Alert",{key:a,attrs:{message:e.message,alert_type:e.alert_type}})})),t(N.A,[t(K.A,[t(E.A,{attrs:{cols:"6"}},[t(z.A,{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t("JsonForm",{key:e.formKey,attrs:{value:e.asset,schema:e.asset_schema,options:e.options},on:{"update:model":e.set_asset_value}})],1),t("p",[t("br")]),t(M.A,{staticStyle:{"margin-top":"10px"},on:{click:e.create_object}},[e._v("Generate")])],1),t(E.A,{attrs:{cols:"6"}},[e.saved_asset_rdf?t("div",{staticClass:"rdf-container"},[t(U.A,{staticClass:"mb-3",attrs:{items:e.formats,label:"Select RDF Format"},model:{value:e.selectedFormat,callback:function(t){e.selectedFormat=t},expression:"selectedFormat"}}),t("rdf-editor",{staticClass:"h-full overflow-hidden",attrs:{format:e.selectedFormat,readonly:!0,prefixes:e.editorPrefixes,"auto-parse":"","parse-delay":"1000"},domProps:{value:e.saved_asset_rdf},on:{"parsing-failed":e.onParsingFailed,"prefixes-parsed":e.onPrefixesParsed,serialized:e.onSerialized}}),t(M.A,{staticClass:"mb-2",attrs:{color:"primary"},on:{click:e.downloadRDF}},[e._v("Download RDF")])],1):t("div",{staticClass:"text-center",staticStyle:{height:"85vh"}},[e.selectedPdf?t("div",{staticStyle:{height:"100%"}},[t("iframe",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.pdfUrl,frameborder:"0"}}),t(M.A,{staticClass:"mt-2",attrs:{color:"success"},on:{click:e.sendPdfName}},[t(L.A,{attrs:{left:""}},[e._v("mdi-api")]),e._v(" Send PDF ")],1)],1):t("div",[t("img",{staticStyle:{"max-width":"60%",height:"auto","margin-top":"200px"},attrs:{src:a(88988),alt:"No Data Available"}}),t("p",[e._v("Choose a PDF to display the preview in this area!")]),t(M.A,{staticClass:"mt-2",attrs:{color:"primary"},on:{click:e.selectFile}},[t(L.A,{attrs:{left:""}},[e._v("mdi-upload")]),e._v(" Select PDF ")],1),t("input",{ref:"pdfInput",staticStyle:{display:"none"},attrs:{type:"file",accept:"application/pdf"},on:{change:e.onFileSelected}})],1)])])],1)],1)],2)},I=[],B=(a(44114),a(14603),a(47566),a(98721),function(){var e=this,t=e._self._c;return t(N.A,[t(z.A,{model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t("v-jsf",{attrs:{schema:e.schema,options:e.options},on:{input:function(t){return e.$emit("update:model",t)}},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1)],1)}),q=[],$=a(30766),J=(a(96213),{name:"JsonForm",components:{VJsf:$.A},props:{schema:Object,options:Object,value:Object},emits:["update:model"],data(){return{valid:!1,model:this.value||{}}},watch:{value:{handler(e){this.model=e||{}},deep:!0,immediate:!0}},methods:{}}),H=J,Y=(0,h.A)(H,B,q,!1,null,null,null),V=Y.exports,X=a(69964),W=function(){var e=this,t=e._self._c;return t(N.A,[t(X.A,{staticClass:"text-center",attrs:{value:!!e.message,type:e.alert_type,dismissible:""}},[e._v(" "+e._s(e.message)+" ")])],1)},Q=[],Z={name:"Alert",props:{message:String,alert_type:String}},ee=Z,te=(0,h.A)(ee,W,Q,!1,null,null,null),ae=te.exports,ne=function(){var e=this,t=e._self._c;return t(N.A,{staticClass:"page-top py-4 mb-8",attrs:{fluid:""}},[t(K.A,[t(E.A,{attrs:{cols:"9"}},[t(K.A,{staticClass:"ml-4"},[t(E.A,[t("h1",{staticClass:"text-capitalize"},[e._v(e._s(e.title||e.remove_underscore))])])],1),null!=e.subtitle?t(K.A,{staticClass:"ml-4"},[t(E.A,[t("h2",{staticClass:"text-capitalize"},[e._v(e._s(e.subtitle||e.remove_underscore))])])],1):e._e(),null!=e.third_line?t(K.A,{staticClass:"ml-4"},[t(E.A,[t("h3",[e._v(" "+e._s(e.third_line||e.remove_underscore)+" ")])])],1):e._e()],1),t(E.A,{attrs:{cols:"3"}},[null!=e.image?t(K.A,[t(b.A,{attrs:{"max-height":"160px",position:"bottom center",src:e.image,contain:""}})],1):e._e()],1)],1)],1)},re=[],oe={name:"PageTitle",components:{},props:{title:{type:String,required:!0},subtitle:{type:String,required:!1},third_line:{type:String,required:!1},freetext:{type:String,required:!1},image:{type:String,required:!1},show_breadcrumbs:{type:Boolean,required:!0}}},ie=oe,se=(0,h.A)(ie,ne,re,!1,null,"46f3abe2",null),ce=se.exports,de=a(28019),le=a.n(de),me='{%- set prefix="https://knowledge.c-innovationhub.com/cefriel/data/" -%}\r\n{%- set dcat_content = obj.header -%}\r\n{%- set json_content = obj.content -%}\r\n{%- set asset_name = slugify(dcat_content.name) -%}\r\n{%- set asset_type = dcat_content.type -%}\r\n{%- set asset_id = \'<\' + prefix + asset_type + \'#\' + asset_name + \'>\' -%}\r\n{%- set catalogue_id= \'<\' + prefix + \'CefrielDataCatalogue#\' + asset_type + \'>\' -%}\r\n{%- set catalogue_record_id = \'<\' + prefix + \'CefrielDataCatalogueRecord/\' + asset_type + \'#\' + asset_name + \'>\' -%}\r\n{%- set asset_type_url = data_platform_url + \'/assets/\' + asset_name -%}\r\n\r\n@prefix dcterms: <http://purl.org/dc/terms/> .\r\n@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\r\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\r\n@prefix dcat: <https://www.w3.org/ns/dcat#> .\r\n@prefix vcard: <http://www.w3.org/2006/vcard/> .\r\n@prefix foaf: <http://xmlns.com/foaf/0.1/> .\r\n@prefix owl: <http://www.w3.org/2002/07/owl#> .\r\n\r\n{{catalogue_id | safe}} rdf:type dcat:Catalog;\r\n\tdcterms:title "Cefriel RDF Form-based Generator";\r\n\tdcterms:description "Cefriel RDF Form-based Generator powered by KCONG"@en;\r\n\tdcterms:publisher [\r\n\t    rdf:type foaf:Agent;\r\n\t    foaf:name "Data Publisher";\r\n\t    foaf:mbox "no-reply@cefriel.com";\r\n\t];\r\n\tdcterms:dataset {{asset_id | safe}};\r\n\tdcat:record {{catalogue_record_id | safe}};\r\n\tfoaf:homepage <https://kcong.cefriel.com/>.\r\n\r\n\r\n{{catalogue_record_id | safe}} rdf:type dcat:CatalogRecord ;\r\n\tdcterms:modified "{{dcat_content.last_updated}}"^^xsd:dateTime ;\r\n\tdcterms:created "{{dcat_content.creation_time}}"^^xsd:dateTime ;\r\n\tfoaf:primaryTopic {{asset_id  | safe}} .\r\n\r\n\r\n{{asset_id | safe}} rdf:type dcat:Dataset;\r\n    dcterms:identifier """{{dcat_content.identifier}}""";\r\n    dcterms:title "{{dcat_content.name}}";\r\n    {%if dcat_content.publisher_name or dcat_content.publisher_email %}\r\n    dcterms:publisher [\r\n\t    rdf:type foaf:Agent;\r\n      {%if dcat_content.publisher_name %}\r\n\t    foaf:name "{{dcat_content.publisher_name}}";\r\n      {%endif%}\r\n      {%if dcat_content.publisher_email %}\r\n\t    foaf:mbox "{{dcat_content.publisher_email}}";\r\n      {%endif%}\r\n    ];\r\n    {%endif%}\r\n\r\n    {%-if json_content.source_asset.id-%}\r\n    dcterms:source <{{json_content.source_asset.id}}>;\r\n    {%-endif-%}\r\n\r\n    dcterms:description """{{dcat_content.description}}""" .\r\n\r\n\r\n  {%if json_content.distributions %}\r\n  {%- for distribution in json_content.distributions -%}\r\n  {%- set distribution_id = \'<\' + prefix + asset_type + \'/Distribution#\' + asset_name + \'-\' + loop.index + \'>\' -%}\r\n  {{asset_id | safe}} dcat:distribution {{distribution_id | safe}} .\r\n\r\n  {{distribution_id | safe}} rdf:type dcat:Distribution;\r\n    dcterms:format "{{distribution.format}}";\r\n\t  {%-if json_content.data_sample -%}\r\n    {%- for sample in json_content.data_sample -%}\r\n    adms:sample [\r\n      rdf:type dcat:Distribution;\r\n      dcat:downloadURL <{{sample.url}}>;\r\n      {%-if sample.sample_description -%}\r\n      dcterms:description """{{sample.sample_description}}"""\r\n      {%- endif -%}\r\n    ];\r\n    {%- endfor -%}\r\n\t  {%- endif -%}\r\n\tdcat:accessURL <{{distribution.access_url}}> .\r\n  {%- endfor -%}\r\n  {%- endif -%}\r\n',ue=(a(35574),a(90876)),pe=a(44526);const fe=new(le());var he={name:"AssetCreate",components:{JsonForm:V,PageTitle:ce,Alert:ae},props:["asset_type"],data(){return{template_engine:null,template:null,valid:null,asset_schema:{},initial_asset:{},asset:{},saved_asset:{},saved_asset_rdf:null,serialized_rdf:null,alert_messages:[],selectedPdf:null,pdfUrl:null,formKey:0,parseError:null,formats:[...ue.T.keys()],selectedFormat:"text/turtle",editorPrefixes:null,options:{ajv:fe,context:{languages:a(87932)}}}},mounted(){this.asset_schema=a(41123),this.template_engine=a(61326),this.template=this.template_engine.compile(me)},methods:{onParsingFailed(e){console.error("Parsing failed:",e.detail.error),this.parseError=e.detail.error},onPrefixesParsed(e){this.editorPrefixes||(this.editorPrefixes=Object.keys(e.detail.prefixes).join(","))},onSerialized(e){this.serialized_rdf=e.detail.value},downloadRDF(){if(!this.serialized_rdf)return void this.alert_messages.push({message:"No RDF content to download.",alert_type:"error"});const e={"text/turtle":"ttl","application/ld+json":"jsonld","application/rdf+xml":"rdf","application/trig":"trig","application/n-triples":"nt","application/n-quads":"nq","text/n3":"n3"},t=e[this.selectedFormat]||"ttl",a=new Blob([this.serialized_rdf],{type:this.selectedFormat}),n=window.URL.createObjectURL(a),r=document.createElement("a");r.href=n,r.setAttribute("download",`rdf-data.${t}`),document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(n)},set_asset_value(e){this.asset=e},create_object(){function e(e){return String(e).normalize("NFKD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase().replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")}this.$refs.form.validate(),this.valid?this.alert_messages=[]:this.alert_messages.push({message:"Validation error",alert_type:"error"}),this.asset.header||(this.asset.header={}),this.asset.header.creation_time=(new Date).toISOString(),this.asset.header.last_updated=(new Date).toISOString(),this.asset.header.type=this.asset_type,this.asset.header.id=(0,pe.A)();try{this.saved_asset_rdf=this.template.render({obj:this.asset,data_platform_url:"https://kcong.cefriel.com/",slugify:e})}catch(t){console.log(t)}this.saved_asset_rdf=this.saved_asset_rdf.replace(/^\s*\n/gm,"")},selectFile(){this.$refs.pdfInput.click()},onFileSelected(e){const t=e.target.files[0];t&&"application/pdf"===t.type?(this.selectedPdf=t,this.pdfUrl=URL.createObjectURL(t)):this.alert_messages.push({message:"Please select a valid PDF file.",alert_type:"error"})},sendPdfName(){if(this.selectedPdf){const e={content:{distributions:[]},header:{publisher_email:"no-reply@cefriel.com",publisher_name:"EXTRACTED FROM PDF",description:"EXTRACTED FROM PDF",name:"EXTRACTED FROM PDF",identifier:"EXTRACTED FROM PDF"}};fetch("https://echo.zuplo.io/post",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((e=>e.json())).then((e=>{const t=e.body;if("object"!==typeof e)throw new Error("The response is not a valid JSON object");const a=fe.compile(this.asset_schema);console.log(t);const n=a(t);if(!n){const e=a.errors.map((e=>`${e.instancePath} ${e.message}`)).join(", ");throw new Error(`Schema validation failed: ${e}`)}this.asset={...t},this.formKey=Date.now(),this.alert_messages.push({message:"Data received and filled successfully",alert_type:"success"})})).catch((e=>{console.error("Error:",e),this.alert_messages.push({message:`Error: ${e.message}`,alert_type:"error"})}))}}}},ge=he,_e=(0,h.A)(ge,G,I,!1,null,null,null),ye=_e.exports;n.Ay.use(R.Ay);const be=new R.Ay({mode:"history",routes:[{path:"/rapid-triples/",name:"asset_create",component:ye,props:{asset_type:"MyRDFClass"},meta:{title:"Cefriel RDF Metadata Generator"}}]});var ve=be,we=a(75993),Ae=a(76017);n.Ay.config.productionTip=!1,n.Ay.config.ignoredElements=["rdf-editor"],n.Ay.use(we.Ay),ve.beforeEach(((e,t,a)=>{const{title:n}=e.meta;document.title="function"===typeof n?n(e):n,a()})),n.Ay.filter("formatDate",(function(e){if(e)return(0,Ae.A)(String(e)).format("MM/DD/YYYY hh:mm")})),n.Ay.filter("remove_underscore",(function(e){return e?(e=e.toString(),e.replaceAll("_"," ")):""})),new n.Ay({vuetify:T,router:ve,render:e=>e(P)}).$mount("#app")},99467:function(e,t,a){"use strict";e.exports=a.p+"img/cefriel_clogo.e1c6dc50.png"},33153:function(e,t,a){"use strict";e.exports=a.p+"img/logo.e1c6dc50.png"},88988:function(e,t,a){"use strict";e.exports=a.p+"img/upload_pdf.41532755.png"},78982:function(){},47790:function(){},73776:function(){},21638:function(){},92668:function(){},77965:function(){},66089:function(){},79368:function(){},64688:function(){},51069:function(){},15340:function(){},79838:function(){},15182:function(){},41123:function(e){"use strict";e.exports=JSON.parse('{"type":"object","properties":{"header":{"$schema":"http://json-schema.org/draft-07/schema#","type":"object","properties":{"identifier":{"type":"string","title":"Identifier","description":"Identifier of the data source.","default":"MY_DATASOURCE"},"name":{"type":"string","title":"Name","description":"Name of the data source","default":"My Data Source"},"description":{"type":"string","title":"Description","description":"Description of the data contained in the data source","default":"My Data Source contains data about things."},"publisher_name":{"type":"string","title":"Publisher name","description":"Name of the entity providing the data source","default":"Cefriel Data Publisher"},"publisher_email":{"title":"Publisher email","type":"string","description":"Email of the entity providing the data source","default":"no-reply@cefriel.com"},"access_url":{"type":"string","title":"Access URL","x-display":"hidden"},"creation_time":{"type":"string","title":"Creation date","x-display":"hidden"},"last_updated":{"type":"string","title":"Modification time","x-display":"hidden"},"type":{"type":"string","title":"Type","x-display":"hidden"},"id":{"type":"string","title":"Identifier","x-display":"hidden"}}},"content":{"$schema":"http://json-schema.org/draft-07/schema#","type":"object","properties":{"distributions":{"title":"Distributions","description":"A specific representation of a Dataset.","type":"array","items":{"type":"object","properties":{"format":{"type":"string","description":"The format used to encode the data in the distribution. The vocabulary http://publications.europa.eu/resource/dataset/file-type is recommended to serialise the admissible values ","title":"Resource format","default":"http://publications.europa.eu/resource/authority/file-type/CSV"},"access_url":{"type":"string","title":"Access URL.","description":"URL redirecting to a webpage or an endpoint to access the data.","default":"http://www.cefriel.com/data/my_data_source"}}}}}}}}')},87932:function(e){"use strict";e.exports=JSON.parse('[{"code":"ab","name":"Abkhaz"},{"code":"aa","name":"Afar"},{"code":"af","name":"Afrikaans"},{"code":"ak","name":"Akan"},{"code":"sq","name":"Albanian"},{"code":"am","name":"Amharic"},{"code":"ar","name":"Arabic"},{"code":"an","name":"Aragonese"},{"code":"hy","name":"Armenian"},{"code":"as","name":"Assamese"},{"code":"av","name":"Avaric"},{"code":"ae","name":"Avestan"},{"code":"ay","name":"Aymara"},{"code":"az","name":"Azerbaijani"},{"code":"bm","name":"Bambara"},{"code":"ba","name":"Bashkir"},{"code":"eu","name":"Basque"},{"code":"be","name":"Belarusian"},{"code":"bn","name":"Bengali; Bangla"},{"code":"bh","name":"Bihari"},{"code":"bi","name":"Bislama"},{"code":"bs","name":"Bosnian"},{"code":"br","name":"Breton"},{"code":"bg","name":"Bulgarian"},{"code":"my","name":"Burmese"},{"code":"ca","name":"Catalan; Valencian"},{"code":"ch","name":"Chamorro"},{"code":"ce","name":"Chechen"},{"code":"ny","name":"Chichewa; Chewa; Nyanja"},{"code":"zh","name":"Chinese"},{"code":"cv","name":"Chuvash"},{"code":"kw","name":"Cornish"},{"code":"co","name":"Corsican"},{"code":"cr","name":"Cree"},{"code":"hr","name":"Croatian"},{"code":"cs","name":"Czech"},{"code":"da","name":"Danish"},{"code":"dv","name":"Divehi; Dhivehi; Maldivian;"},{"code":"nl","name":"Dutch"},{"code":"dz","name":"Dzongkha"},{"code":"en","name":"English"},{"code":"eo","name":"Esperanto"},{"code":"et","name":"Estonian"},{"code":"ee","name":"Ewe"},{"code":"fo","name":"Faroese"},{"code":"fj","name":"Fijian"},{"code":"fi","name":"Finnish"},{"code":"fr","name":"French"},{"code":"ff","name":"Fula; Fulah; Pulaar; Pular"},{"code":"gl","name":"Galician"},{"code":"ka","name":"Georgian"},{"code":"de","name":"German"},{"code":"el","name":"Greek, Modern"},{"code":"gn","name":"GuaranÃ­"},{"code":"gu","name":"Gujarati"},{"code":"ht","name":"Haitian; Haitian Creole"},{"code":"ha","name":"Hausa"},{"code":"he","name":"Hebrew (modern)"},{"code":"hz","name":"Herero"},{"code":"hi","name":"Hindi"},{"code":"ho","name":"Hiri Motu"},{"code":"hu","name":"Hungarian"},{"code":"ia","name":"Interlingua"},{"code":"id","name":"Indonesian"},{"code":"ie","name":"Interlingue"},{"code":"ga","name":"Irish"},{"code":"ig","name":"Igbo"},{"code":"ik","name":"Inupiaq"},{"code":"io","name":"Ido"},{"code":"is","name":"Icelandic"},{"code":"it","name":"Italian"},{"code":"iu","name":"Inuktitut"},{"code":"ja","name":"Japanese"},{"code":"jv","name":"Javanese"},{"code":"kl","name":"Kalaallisut, Greenlandic"},{"code":"kn","name":"Kannada"},{"code":"kr","name":"Kanuri"},{"code":"ks","name":"Kashmiri"},{"code":"kk","name":"Kazakh"},{"code":"km","name":"Khmer"},{"code":"ki","name":"Kikuyu, Gikuyu"},{"code":"rw","name":"Kinyarwanda"},{"code":"ky","name":"Kyrgyz"},{"code":"kv","name":"Komi"},{"code":"kg","name":"Kongo"},{"code":"ko","name":"Korean"},{"code":"ku","name":"Kurdish"},{"code":"kj","name":"Kwanyama, Kuanyama"},{"code":"la","name":"Latin"},{"code":"lb","name":"Luxembourgish, Letzeburgesch"},{"code":"lg","name":"Ganda"},{"code":"li","name":"Limburgish, Limburgan, Limburger"},{"code":"ln","name":"Lingala"},{"code":"lo","name":"Lao"},{"code":"lt","name":"Lithuanian"},{"code":"lu","name":"Luba-Katanga"},{"code":"lv","name":"Latvian"},{"code":"gv","name":"Manx"},{"code":"mk","name":"Macedonian"},{"code":"mg","name":"Malagasy"},{"code":"ms","name":"Malay"},{"code":"ml","name":"Malayalam"},{"code":"mt","name":"Maltese"},{"code":"mi","name":"MÄori"},{"code":"mr","name":"Marathi (MarÄá¹­hÄ«)"},{"code":"mh","name":"Marshallese"},{"code":"mn","name":"Mongolian"},{"code":"na","name":"Nauru"},{"code":"nv","name":"Navajo, Navaho"},{"code":"nb","name":"Norwegian BokmÃ¥l"},{"code":"nd","name":"North Ndebele"},{"code":"ne","name":"Nepali"},{"code":"ng","name":"Ndonga"},{"code":"nn","name":"Norwegian Nynorsk"},{"code":"no","name":"Norwegian"},{"code":"ii","name":"Nuosu"},{"code":"nr","name":"South Ndebele"},{"code":"oc","name":"Occitan"},{"code":"oj","name":"Ojibwe, Ojibwa"},{"code":"cu","name":"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic"},{"code":"om","name":"Oromo"},{"code":"or","name":"Oriya"},{"code":"os","name":"Ossetian, Ossetic"},{"code":"pa","name":"Panjabi, Punjabi"},{"code":"pi","name":"PÄli"},{"code":"fa","name":"Persian (Farsi)"},{"code":"pl","name":"Polish"},{"code":"ps","name":"Pashto, Pushto"},{"code":"pt","name":"Portuguese"},{"code":"qu","name":"Quechua"},{"code":"rm","name":"Romansh"},{"code":"rn","name":"Kirundi"},{"code":"ro","name":"Romanian, [])"},{"code":"ru","name":"Russian"},{"code":"sa","name":"Sanskrit (Saá¹ská¹›ta)"},{"code":"sc","name":"Sardinian"},{"code":"sd","name":"Sindhi"},{"code":"se","name":"Northern Sami"},{"code":"sm","name":"Samoan"},{"code":"sg","name":"Sango"},{"code":"sr","name":"Serbian"},{"code":"gd","name":"Scottish Gaelic; Gaelic"},{"code":"sn","name":"Shona"},{"code":"si","name":"Sinhala, Sinhalese"},{"code":"sk","name":"Slovak"},{"code":"sl","name":"Slovene"},{"code":"so","name":"Somali"},{"code":"st","name":"Southern Sotho"},{"code":"es","name":"Spanish; Castilian"},{"code":"su","name":"Sundanese"},{"code":"sw","name":"Swahili"},{"code":"ss","name":"Swati"},{"code":"sv","name":"Swedish"},{"code":"ta","name":"Tamil"},{"code":"te","name":"Telugu"},{"code":"tg","name":"Tajik"},{"code":"th","name":"Thai"},{"code":"ti","name":"Tigrinya"},{"code":"bo","name":"Tibetan Standard, Tibetan, Central"},{"code":"tk","name":"Turkmen"},{"code":"tl","name":"Tagalog"},{"code":"tn","name":"Tswana"},{"code":"to","name":"Tonga (Tonga Islands)"},{"code":"tr","name":"Turkish"},{"code":"ts","name":"Tsonga"},{"code":"tt","name":"Tatar"},{"code":"tw","name":"Twi"},{"code":"ty","name":"Tahitian"},{"code":"ug","name":"Uyghur, Uighur"},{"code":"uk","name":"Ukrainian"},{"code":"ur","name":"Urdu"},{"code":"uz","name":"Uzbek"},{"code":"ve","name":"Venda"},{"code":"vi","name":"Vietnamese"},{"code":"vo","name":"VolapÃ¼k"},{"code":"wa","name":"Walloon"},{"code":"cy","name":"Welsh"},{"code":"wo","name":"Wolof"},{"code":"fy","name":"Western Frisian"},{"code":"xh","name":"Xhosa"},{"code":"yi","name":"Yiddish"},{"code":"yo","name":"Yoruba"},{"code":"za","name":"Zhuang, Chuang"},{"code":"zu","name":"Zulu"}]')}},t={};function a(n){var r=t[n];if(void 0!==r)return r.exports;var o=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(o.exports,o,o.exports,a),o.loaded=!0,o.exports}a.m=e,function(){var e=[];a.O=function(t,n,r,o){if(!n){var i=1/0;for(l=0;l<e.length;l++){n=e[l][0],r=e[l][1],o=e[l][2];for(var s=!0,c=0;c<n.length;c++)(!1&o||i>=o)&&Object.keys(a.O).every((function(e){return a.O[e](n[c])}))?n.splice(c--,1):(s=!1,o<i&&(i=o));if(s){e.splice(l--,1);var d=r();void 0!==d&&(t=d)}}return t}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[n,r,o]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};a.t=function(n,r){if(1&r&&(n=this(n)),8&r)return n;if("object"===typeof n&&n){if(4&r&&n.__esModule)return n;if(16&r&&"function"===typeof n.then)return n}var o=Object.create(null);a.r(o);var i={};e=e||[null,t({}),t([]),t(t)];for(var s=2&r&&n;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((function(e){i[e]=function(){return n[e]}}));return i["default"]=function(){return n},a.d(o,i),o}}(),function(){a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,n){return a.f[n](e,t),t}),[]))}}(),function(){a.u=function(e){return"js/"+e+"."+{13:"fb0be7c4",43:"b7a6d6c1",49:"6bdef757",55:"a22c6327",109:"62aa7cff",148:"fae14901",159:"0575a0bf",200:"31c6e90f",208:"c8ce7126",236:"c684d205",420:"0de9e036",590:"3508394c",595:"bdd6741a",611:"f079aeac",699:"d8ee622d",731:"f6fe1e74",733:"42d5cc08",818:"9991cc84",954:"f7238231",978:"4b9bb12d"}[e]+".js"}}(),function(){a.miniCssF=function(e){}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.hmd=function(e){return e=Object.create(e),e.children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e}}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="mobilitydcatap-ui:";a.l=function(n,r,o,i){if(e[n])e[n].push(r);else{var s,c;if(void 0!==o)for(var d=document.getElementsByTagName("script"),l=0;l<d.length;l++){var m=d[l];if(m.getAttribute("src")==n||m.getAttribute("data-webpack")==t+o){s=m;break}}s||(c=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,a.nc&&s.setAttribute("nonce",a.nc),s.setAttribute("data-webpack",t+o),s.src=n),e[n]=[r];var u=function(t,a){s.onerror=s.onload=null,clearTimeout(p);var r=e[n];if(delete e[n],s.parentNode&&s.parentNode.removeChild(s),r&&r.forEach((function(e){return e(a)})),t)return t(a)},p=setTimeout(u.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=u.bind(null,s.onerror),s.onload=u.bind(null,s.onload),c&&document.head.appendChild(s)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){a.p="/rapid-triples/"}(),function(){var e={524:0};a.f.j=function(t,n){var r=a.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var o=new Promise((function(a,n){r=e[t]=[a,n]}));n.push(r[2]=o);var i=a.p+a.u(t),s=new Error,c=function(n){if(a.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var o=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;s.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",s.name="ChunkLoadError",s.type=o,s.request=i,r[1](s)}};a.l(i,c,"chunk-"+t,t)}},a.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,o,i=n[0],s=n[1],c=n[2],d=0;if(i.some((function(t){return 0!==e[t]}))){for(r in s)a.o(s,r)&&(a.m[r]=s[r]);if(c)var l=c(a)}for(t&&t(n);d<i.length;d++)o=i[d],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(l)},n=self["webpackChunkmobilitydcatap_ui"]=self["webpackChunkmobilitydcatap_ui"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=a.O(void 0,[504],(function(){return a(99639)}));n=a.O(n)})();
//# sourceMappingURL=app.63fa48d8.js.map