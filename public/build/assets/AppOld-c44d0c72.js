import{u as I}from"./activitiesStore-b2399956.js";import{m as S,q as B,c as m,w as a,k as s,o as l,a as t,t as o,e as p,h,F as g,b as i,g as _,p as F,j as V}from"./app-e38e0622.js";import{_ as z}from"./_plugin-vue_export-helper-c27b6911.js";I();const L={setup(){S(),B(()=>{})},props:{activities:Array,tests:Array},components:{},data:()=>({location:null,position:null,coords:null,latitude:null,longitude:null,jsonData:null,activityDate:null,month:["January","February","March","April","May","June","July","August","September","October","November","December"]}),methods:{async getPosition(){return new Promise((n,u)=>{navigator.geolocation.getCurrentPosition(n,u)})},async getCity(n,u){const c=`https://api.openweathermap.org/data/2.5/onecall?lat=${n}&lon=${u}&exclude=minutely&units=metric&appid=b68afb69c2607c15cb4f6bf022f17e25`;return fetch(c).then(r=>r.json()).then(r=>r.results[0].components.city).catch(r=>{console.log(r)})},convertFormatDate(n){let c=n.split(" ",1).map(r=>r.split("-",3));return c[0][2]+" "+this.month[c[0][1].slice(1)]+" "+c[0][0]}},computed(){},created(){},mounted(){},beforeCreate(){}},d=n=>(F("data-v-b1bd3245"),n=n(),V(),n),M=d(()=>t("h1",null,"Together",-1)),P=d(()=>t("div",{style:{display:"flex"},class:"mb-16"},[t("div",{style:{width:"10vh",height:"10vh","border-radius":"9999px",background:"red",position:"relative","background-image":"url('https://cdn.vuetifyjs.com/images/cards/docks.jpg')","background-size":"cover"},class:"text-after mr-6"}),t("div",{style:{width:"10vh",height:"10vh","border-radius":"9999px",background:"red",position:"relative","background-image":"url('https://cdn.vuetifyjs.com/images/cards/docks.jpg')","background-size":"cover"},class:"text-after mr-6"}),t("div",{style:{width:"10vh",height:"10vh","border-radius":"9999px",background:"red",position:"relative","background-image":"url('https://cdn.vuetifyjs.com/images/cards/docks.jpg')","background-size":"cover"},class:"text-after"})],-1)),$=d(()=>t("h1",{style:{},class:"text-xl mb-4"},"Activités à proximité",-1)),J={class:"circle",style:{position:"absolute",top:"2.25vh",right:"2vh",background:"#f1f5f9",color:"#155e75"}},O={xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-7 h-7",style:{"margin-left":"0.85vh","margin-top":"0.75vh"}},T=d(()=>t("path",{"stroke-linecap":"round",class:"icon","stroke-linejoin":"round",d:"M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"},null,-1)),q=[T],E=d(()=>t("div",null," ratings ",-1)),U=d(()=>t("span",null," Infos ",-1));function G(n,u,c,r,H,K){const f=s("v-text-field"),v=s("v-chip"),b=s("v-img"),y=s("v-card-title"),x=s("v-card-subtitle"),w=s("v-card-text"),k=s("v-btn"),D=s("v-card-actions"),j=s("v-card"),C=s("v-col"),N=s("v-row"),A=s("v-container");return l(),m(A,{class:""},{default:a(()=>[M,t("p",null,"Latitude : "+o(n.latitude),1),t("p",null,"Longitude : "+o(n.longitude),1),(l(!0),p(g,null,h(c.tests,e=>(l(),p("div",{key:e.activityID},o(e.activityCityID)+" "+o(e.cityName)+" "+o(e.activityCountryID)+" "+o(e.activityCountryName),1))),128)),i(f,{density:"compact",variant:"solo",label:"Search templates","append-inner-icon":"mdi-magnify","single-line":"","hide-details":"",class:"my-8",style:{width:"40vh"}}),P,t("div",null,[$,i(N,{class:"overflow-x-auto","max-width":"300",style:{display:"flex","flex-direction":"row","flex-wrap":"nowrap"},"align-content":"center"},{default:a(()=>[(l(!0),p(g,null,h(c.activities,e=>(l(),m(C,{style:{"min-width":"45vh"},key:e.id},{default:a(()=>[i(j,{class:"mx-auto rounded-lg","max-width":"270"},{default:a(()=>[i(b,{class:"align-end text-white",height:"200",src:"https://cdn.vuetifyjs.com/images/cards/docks.jpg",cover:""},{default:a(()=>[t("div",null,[i(v,{variant:"elevated",style:{position:"absolute",top:"2.25vh",left:"2vh",background:"#f1f5f9",color:"#155e75"}},{default:a(()=>[_(o(e.activityCategoryName),1)]),_:2},1024),t("div",J,[(l(),p("svg",O,q))]),i(v,{variant:"elevated",style:{position:"absolute",bottom:"2.25vh",right:"2vh",background:"#f1f5f9",color:"#155e75"}},{default:a(()=>[_(" Date "+o(this.convertFormatDate(e.date)),1)]),_:2},1024)])]),_:2},1024),i(y,null,{default:a(()=>[_(o(e.title),1)]),_:2},1024),i(x,{class:"pt-4"},{default:a(()=>[_(" City "+o(e.cityName),1)]),_:2},1024),i(w,{"prepend-icon":"mdi-home"},{default:a(()=>[t("div",null,"User "+o(e.promoter_id)+o(e.userName),1),E,t("div",null,o(e.participants_number)+" Participant(s)",1)]),_:2},1024),i(D,null,{default:a(()=>[i(k,{color:"white bg-green rounded-pill px-4 mx-auto",style:{width:"18vh",height:"5.5vh"}},{default:a(()=>[U]),_:1})]),_:1})]),_:2},1024)]),_:2},1024))),128))]),_:1})])]),_:1})}const X=z(L,[["render",G],["__scopeId","data-v-b1bd3245"]]);export{X as default};
