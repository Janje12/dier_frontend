(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"7wOV":function(t,e,i){"use strict";i.d(e,"a",function(){return c});var r=i("fXoL"),a=i("aceb");let c=(()=>{class t{constructor(t){this.toastrService=t}showToast(t,e,i,r=3e3){this.toastrService.show(e,t,{status:i,duration:r})}}return t.\u0275fac=function(e){return new(e||t)(r.ac(a.Mb))},t.\u0275prov=r.Mb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},H5EB:function(t,e,i){"use strict";i.d(e,"a",function(){return s});var r=i("AytR"),a=i("fXoL"),c=i("tk/3");let s=(()=>{class t extends class{}{constructor(t){super(),this.http=t,this.apiUrl=r.a.apiUrl}createVehicle(t,e){return this.http.post(this.apiUrl+"/api/vehicle",{vehicle:t,companyID:e})}deleteVehicle(t,e){}getVehicle(t,e){return this.http.get(this.apiUrl+"/api/vehicle/one/"+`${e}/${t}`)}getVehicles(t="all",e){return this.http.get(this.apiUrl+"/api/vehicle/many/"+`${e}/${t}`)}updateVehicle(t,e,i="_id"){return this.http.patch(this.apiUrl+"/api/vehicle/many/"+`${i}/${e}`,t)}getCompaniesVehicles(t){return this.http.get(this.apiUrl+"/api/company/vehicles/"+t)}}return t.\u0275fac=function(e){return new(e||t)(a.ac(c.b))},t.\u0275prov=a.Mb({token:t,factory:t.\u0275fac}),t})()}}]);