(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"7Oz7":function(t,a,e){"use strict";e.d(a,"a",(function(){return p}));var r=e("AytR"),i=e("fXoL"),s=e("tk/3"),n=e("McNs");let p=(()=>{class t extends class{}{constructor(t,a){super(),this.http=t,this.authService=a,this.apiUrl=r.a.apiUrl}createStorage(t){return this.http.post(this.apiUrl+"/api/storage",t)}deleteStorage(t,a="_id"){return this.http.delete(this.apiUrl+"/api/storage/one/"+`${a}/${t}`)}getStorage(t,a="_id"){return this.http.get(this.apiUrl+"/api/storage/one/"+`${a}/${t}`)}getStorages(t,a){return this.http.get(this.apiUrl+"/api/storage/many/"+`${a}/${t}`)}updateStorage(t,a,e="_id"){return this.http.patch(this.apiUrl+"/api/storage/one/"+`${e}/${a}`,t)}getCompaniesStorage(t,a="all"){return this.http.get(this.apiUrl+"/api/company/storages/"+`${t}/${a}`)}}return t.\u0275fac=function(a){return new(a||t)(i.bc(s.b),i.bc(n.g))},t.\u0275prov=i.Nb({token:t,factory:t.\u0275fac}),t})()},Lx1j:function(t,a,e){"use strict";e.d(a,"a",(function(){return n}));var r=e("AytR"),i=e("fXoL"),s=e("tk/3");let n=(()=>{class t extends class{}{constructor(t){super(),this.http=t,this.apiUrl=r.a.apiUrl}createTrash(t,a){return this.http.post(this.apiUrl+"/api/trash",{trash:t,storageID:a})}deleteTrash(t,a,e="_id"){return this.http.delete(this.apiUrl+"/api/trash/one/"+`${e}/${a}/${t}`)}getTrash(t,a="_id"){return this.http.get(this.apiUrl+"/api/trash/one/"+`${a}/${t}`)}getTrashes(t,a){return this.http.get(this.apiUrl+"/api/trash/many/"+`${a}/${t}`)}updateTrash(t,a,e,r="_id",i,s,n){return console.log(e),console.log(r),this.http.patch(this.apiUrl+"/api/trash/one/"+`${r}/${e}`,{trash:t,storageID:a,documentNo:s,companyName:i,inc:n})}}return t.\u0275fac=function(a){return new(a||t)(i.bc(s.b))},t.\u0275prov=i.Nb({token:t,factory:t.\u0275fac}),t})()},ibGe:function(t,a,e){"use strict";e.d(a,"a",(function(){return p}));var r=e("LRne"),i=e("AytR"),s=e("fXoL"),n=e("tk/3");let p=(()=>{class t extends class{}{constructor(t){super(),this.http=t,this.apiUrl=i.a.apiUrl}createCatalog(t){}deleteCatalog(t,a){}getCatalog(t,a="_id"){return this.http.get(this.apiUrl+"/api/catalog/one/"+`${a}/${t}`)}getCatalogs(t="all",a="_id"){return this.http.get(this.apiUrl+"/api/catalog/many/"+`${a}/${t}`)}updateCatalog(t,a,e="_id"){return this.http.patch(this.apiUrl+"/api/catalog/one/"+`${e}/${a}`,t)}getSafeTrash(){return this.http.get(this.apiUrl+"/api/catalog/safe")}getUnsafeTrash(){return this.http.get(this.apiUrl+"/api/catalog/unsafe")}filter(t,a){const e=t.toLowerCase();if(void 0!==a)return Object(r.a)(a.filter(t=>t.indexNumber.toLowerCase().includes(e)))}}return t.\u0275fac=function(a){return new(a||t)(s.bc(n.b))},t.\u0275prov=s.Nb({token:t,factory:t.\u0275fac}),t})()},"wH5/":function(t,a,e){"use strict";e.d(a,"a",(function(){return p}));var r=e("AytR"),i=e("fXoL"),s=e("tk/3"),n=e("McNs");let p=(()=>{class t extends class{}{constructor(t,a){super(),this.http=t,this.authService=a,this.apiUrl=r.a.apiUrl}createCompany(t){return this.http.post(this.apiUrl+"/api/company",t)}deleteCompany(t,a="_id"){return this.http.delete(this.apiUrl+"/api/company/one/"+`${a}/${t}`)}getCompany(t,a="_id"){return this.http.get(this.apiUrl+"/api/company/one/"+`${a}/${t}`)}getCompanys(t="all",a){return this.http.get(this.apiUrl+"/api/company/many/"+`${a}/${t}`)}updateCompany(t,a,e="_id"){return this.http.patch(this.apiUrl+"/api/company/one/"+`${e}/${a}`,t)}}return t.\u0275fac=function(a){return new(a||t)(i.bc(s.b),i.bc(n.g))},t.\u0275prov=i.Nb({token:t,factory:t.\u0275fac}),t})()}}]);