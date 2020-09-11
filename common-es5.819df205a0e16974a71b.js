function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function _createClass(t,e,i){return e&&_defineProperties(t.prototype,e),i&&_defineProperties(t,i),t}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&_setPrototypeOf(t,e)}function _setPrototypeOf(t,e){return(_setPrototypeOf=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function _createSuper(t){var e=_isNativeReflectConstruct();return function(){var i,a=_getPrototypeOf(t);if(e){var n=_getPrototypeOf(this).constructor;i=Reflect.construct(a,arguments,n)}else i=a.apply(this,arguments);return _possibleConstructorReturn(this,i)}}function _possibleConstructorReturn(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?_assertThisInitialized(t):e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function _getPrototypeOf(t){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{O8xV:function(t,e,i){"use strict";i.d(e,"a",(function(){return l}));var a,n=i("LRne"),r=i("AytR"),s=i("fXoL"),o=i("tk/3"),l=((a=function(t){_inherits(i,t);var e=_createSuper(i);function i(t){var a;return _classCallCheck(this,i),(a=e.call(this)).http=t,a.apiUrl=r.a.apiUrl,a}return _createClass(i,[{key:"getKatalog",value:function(){return this.http.get(this.apiUrl+"/api/katalog")}},{key:"getNeopasanKatalog",value:function(){return this.http.get(this.apiUrl+"/api/katalog/neopasniOtpad")}},{key:"getOpasanKatalog",value:function(){return this.http.get(this.apiUrl+"/api/katalog/opasaniOtpad")}},{key:"filter",value:function(t,e){var i=t.toLowerCase();if(void 0!==e)return Object(n.a)(e.filter((function(t){return t.indeksniBroj.toLowerCase().includes(i)})))}}]),i}(function(){return function t(){_classCallCheck(this,t)}}())).\u0275fac=function(t){return new(t||a)(s.bc(o.b))},a.\u0275prov=s.Nb({token:a,factory:a.\u0275fac}),a)},"g6/h":function(t,e,i){"use strict";i.d(e,"a",(function(){return l}));var a,n=i("AytR"),r=i("fXoL"),s=i("tk/3"),o=i("McNs"),l=((a=function(t){_inherits(i,t);var e=_createSuper(i);function i(t,a){var r;return _classCallCheck(this,i),(r=e.call(this)).http=t,r.authService=a,r.apiUrl=n.a.apiUrl,r}return _createClass(i,[{key:"getFirma",value:function(){return this.http.get(this.apiUrl+"/api/firma")}},{key:"findFirma",value:function(t,e){return this.http.get(this.apiUrl+"/api/firma/admin/"+e+"/"+t)}},{key:"createFirma",value:function(t){return this.http.post(this.apiUrl+"/api/firma",t)}},{key:"updateFirma",value:function(t){return this.http.patch(this.apiUrl+"/api/firma/"+t._id,t)}},{key:"deleteFirma",value:function(t){return this.http.delete(this.apiUrl+"/api/firma/"+t._id)}},{key:"getCurrentFirma",value:function(){var t="";return this.authService.onTokenChange().subscribe((function(e){null!==e&&(t=e.getPayload().data.firma._id)})),this.http.get(this.apiUrl+"/api/firma/"+t)}}]),i}(function(){return function t(){_classCallCheck(this,t)}}())).\u0275fac=function(t){return new(t||a)(r.bc(s.b),r.bc(o.g))},a.\u0275prov=r.Nb({token:a,factory:a.\u0275fac}),a)},pVkk:function(t,e,i){"use strict";i.d(e,"a",(function(){return l}));var a,n=i("AytR"),r=i("fXoL"),s=i("tk/3"),o=i("McNs"),l=((a=function(t){_inherits(i,t);var e=_createSuper(i);function i(t,a){var r;return _classCallCheck(this,i),(r=e.call(this)).http=t,r.authService=a,r.apiUrl=n.a.apiUrl,r}return _createClass(i,[{key:"getSkladiste",value:function(){return this.http.get(this.apiUrl+"/api/skladiste")}},{key:"getOneSkladiste",value:function(t){return this.http.get(this.apiUrl+"/api/skladiste/"+t)}},{key:"findSkladiste",value:function(t,e){return this.http.get(this.apiUrl+"/api/skladiste/"+t+"/"+e)}},{key:"createSkladiste",value:function(t){return this.http.post(this.apiUrl+"/api/skladiste/"+t._id,t)}},{key:"updateSkladiste",value:function(t){return this.http.patch(this.apiUrl+"/api/skladiste/"+t._id,t)}},{key:"deleteSkladiste",value:function(t){return this.http.delete(this.apiUrl+"/api/skladiste/"+t._id)}},{key:"getAllSkladistaFirme",value:function(){var t="";return this.authService.getToken().subscribe((function(e){t=e.getPayload().data.firma._id})),this.http.get(this.apiUrl+"/api/skladiste/firma/skladisteAll/"+t)}},{key:"getSkladisteFirme",value:function(){var t="";return this.authService.getToken().subscribe((function(e){t=e.getPayload().data.firma._id})),this.http.get(this.apiUrl+"/api/skladiste/firma/"+t)}},{key:"getSkladisteSkladistenjeFirme",value:function(){var t="";return this.authService.getToken().subscribe((function(e){t=e.getPayload().data.firma._id})),this.http.get(this.apiUrl+"/api/skladisteSkladistenje/firma/"+t)}},{key:"getSkladisteTretmanFirme",value:function(){var t="";return this.authService.getToken().subscribe((function(e){t=e.getPayload().data.firma._id})),this.http.get(this.apiUrl+"/api/skladistetretman/firma/"+t)}},{key:"getSkladisteDeponijaFirme",value:function(){var t="";return this.authService.getToken().subscribe((function(e){t=e.getPayload().data.firma._id})),this.http.get(this.apiUrl+"/api/skladistedeponija/firma/"+t)}}]),i}(function(){return function t(){_classCallCheck(this,t)}}())).\u0275fac=function(t){return new(t||a)(r.bc(s.b),r.bc(o.g))},a.\u0275prov=r.Nb({token:a,factory:a.\u0275fac}),a)},ud2R:function(t,e,i){"use strict";i.d(e,"a",(function(){return u}));var a,n=i("LRne"),r=i("SxV6"),s=[{title:"Po\u010detni panel",icon:{icon:"home",pack:"font-awesome"},link:"/pages/dashboard",home:!0},{title:"RADNI PANEL",group:!0},{title:"Skladi\u0161te",link:"/pages/skladiste",icon:{icon:"box-open",pack:"font-awesome"}},{title:"Neopasni otpad",icon:{icon:"trash",pack:"font-awesome"},children:[{title:"Proizvodnja",link:"/pages/notpad/dodaj-proizvodnja"},{title:"Tretman",link:"/pages/notpad/dodaj-tretman"},{title:"Odlaganje",link:"/pages/notpad/dodaj-deponija"},{title:"Skladi\u0161tenje",link:"/pages/notpad/dodaj-skladistenje"}]},{title:"Opasni otpad",icon:{icon:"radiation-alt",pack:"font-awesome"},children:[{title:"Proizvodnja",link:"/pages/ootpad/dodaj-proizvodnja"},{title:"Tretman",link:"/pages/ootpad/dodaj-tretman"},{title:"Odlaganje",link:"/pages/ootpad/dodaj-deponija"},{title:"Skladi\u0161tenje",link:"/pages/ootpad/dodaj-skladistenje"}]}],o=i("fXoL"),l=i("McNs"),u=((a=function(){function t(e){var i=this;_classCallCheck(this,t),this.authService=e,this.operations={proizvodnja:!1,transport:!1,tretman:!1,skladistenje:!1,odlaganje:!1},this.neopasni={exists:!1,proizvodnja:!1,transport:!1,tretman:!1,skladistenje:!1,odlaganje:!1},this.opasni={exists:!1,proizvodnja:!1,transport:!1,tretman:!1,skladistenje:!1,odlaganje:!1},this.authService.onTokenChange().pipe(Object(r.a)()).subscribe((function(t){i.radFirme=t.getPayload().data.firma.radFirme}))}return _createClass(t,[{key:"findOperations",value:function(){var t=this;return this.radFirme.forEach((function(e){e.startsWith("Proizvodnja")&&(t.operations.proizvodnja=!0),e.startsWith("Transport")&&(t.operations.transport=!0),e.startsWith("Tretman")&&(t.operations.tretman=!0),e.startsWith("Odlaganje")&&(t.operations.odlaganje=!0),e.startsWith("Skladi\u0161tenje")&&(t.operations.skladistenje=!0)})),Object(n.a)(this.operations)}},{key:"findOperationsMenu",value:function(){for(var t,e=s.slice(0,3),i=0;i<this.radFirme.length;i++)switch((t=this.radFirme[i].split(" "))[1]){case"Neopasnog":this.neopasni.exists=!0,this.fillType(this.neopasni,t[0]);break;case"Opasnog":this.opasni.exists=!0,this.fillType(this.opasni,t[0])}return e.concat(this.fillResult(e)),Object(n.a)(e)}},{key:"fillResult",value:function(t){var e,i;return this.neopasni.exists&&(e=(i=s.filter((function(t){return"Neopasni otpad"===t.title}))[0]).children,i.children=new Array,this.neopasni.proizvodnja&&i.children.push(e.filter((function(t){return"Proizvodnja"===t.title}))[0]),this.neopasni.tretman&&i.children.push(e.filter((function(t){return"Tretman"===t.title}))[0]),this.neopasni.skladistenje&&i.children.push(e.filter((function(t){return"Skladi\u0161tenje"===t.title}))[0]),this.neopasni.odlaganje&&i.children.push(e.filter((function(t){return"Odlaganje"===t.title}))[0]),t.push(i)),this.opasni.exists&&(e=(i=s.filter((function(t){return"Opasni otpad"===t.title}))[0]).children,i.children=new Array,this.opasni.proizvodnja&&i.children.push(e.filter((function(t){return"Proizvodnja"===t.title}))[0]),this.opasni.tretman&&i.children.push(e.filter((function(t){return"Tretman"===t.title}))[0]),this.opasni.skladistenje&&i.children.push(e.filter((function(t){return"Skladi\u0161tenje"===t.title}))[0]),this.opasni.odlaganje&&i.children.push(e.filter((function(t){return"Odlaganje"===t.title}))[0]),t.push(i)),t}},{key:"fillType",value:function(t,e){switch(e){case"Proizvodnja":t.proizvodnja=!0;break;case"Transport":t.transport=!0;break;case"Tretman":t.tretman=!0;break;case"Skladi\u0161tenje":t.skladistenje=!0;break;case"Odlaganje":t.odlaganje=!0}}}]),t}()).\u0275fac=function(t){return new(t||a)(o.bc(l.g))},a.\u0275prov=o.Nb({token:a,factory:a.\u0275fac}),a)}}]);