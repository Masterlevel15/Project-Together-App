import{o,e as n,a as e,d as j,x,K as T,A as N,n as p,f as c,t as _,q as k,m as P,B as D,r as w,C,u as f,k as B,D as L,b as l,w as r,E,c as b,s as M,Z as O,g as u,F as $,h as z,O as A}from"./app-b7dbfaff.js";import{_ as V}from"./_plugin-vue_export-helper-c27b6911.js";import{_ as y}from"./DropdownLink-9d341c0e.js";const I={},R={viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg"},q=e("path",{d:"M11.395 44.428C4.557 40.198 0 32.632 0 24 0 10.745 10.745 0 24 0a23.891 23.891 0 0113.997 4.502c-.2 17.907-11.097 33.245-26.602 39.926z",fill:"#6875F5"},null,-1),H=e("path",{d:"M14.134 45.885A23.914 23.914 0 0024 48c13.255 0 24-10.745 24-24 0-3.516-.756-6.856-2.115-9.866-4.659 15.143-16.608 27.092-31.75 31.751z",fill:"#6875F5"},null,-1),K=[q,H];function U(h,a){return o(),n("svg",R,K)}const Z=V(I,[["render",U]]),G={class:"max-w-screen-xl mx-auto py-2 px-3 sm:px-6 lg:px-8"},J={class:"flex items-center justify-between flex-wrap"},Q={class:"w-0 flex-1 flex items-center min-w-0"},W={key:0,class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},X=e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),Y=[X],ee={key:1,class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},te=e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"},null,-1),se=[te],oe={class:"ml-3 font-medium text-sm text-white truncate"},re={class:"shrink-0 sm:ml-3"},ne=e("svg",{class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6 18L18 6M6 6l12 12"})],-1),ae=[ne],ie={__name:"Banner",setup(h){const a=j(!0),s=x(()=>{var t;return((t=T().props.jetstream.flash)==null?void 0:t.bannerStyle)||"success"}),d=x(()=>{var t;return((t=T().props.jetstream.flash)==null?void 0:t.banner)||""});return N(d,async()=>{a.value=!0}),(t,g)=>(o(),n("div",null,[a.value&&d.value?(o(),n("div",{key:0,class:p({"bg-indigo-500":s.value=="success","bg-red-700":s.value=="danger"})},[e("div",G,[e("div",J,[e("div",Q,[e("span",{class:p(["flex p-2 rounded-lg",{"bg-indigo-600":s.value=="success","bg-red-600":s.value=="danger"}])},[s.value=="success"?(o(),n("svg",W,Y)):c("",!0),s.value=="danger"?(o(),n("svg",ee,se)):c("",!0)],2),e("p",oe,_(d.value),1)]),e("div",re,[e("button",{type:"button",class:p(["-mr-1 flex p-2 rounded-md focus:outline-none sm:-mr-2 transition",{"hover:bg-indigo-600 focus:bg-indigo-600":s.value=="success","hover:bg-red-600 focus:bg-red-600":s.value=="danger"}]),"aria-label":"Dismiss",onClick:g[0]||(g[0]=k(i=>a.value=!1,["prevent"]))},ae,2)])])])],2)):c("",!0)]))}},le={class:"relative"},F={__name:"Dropdown",props:{align:{type:String,default:"right"},width:{type:String,default:"48"},contentClasses:{type:Array,default:()=>["py-1","bg-white"]}},setup(h){const a=h;let s=j(!1);const d=i=>{s.value&&i.key==="Escape"&&(s.value=!1)};P(()=>document.addEventListener("keydown",d)),D(()=>document.removeEventListener("keydown",d));const t=x(()=>({48:"w-48"})[a.width.toString()]),g=x(()=>a.align==="left"?"origin-top-left left-0":a.align==="right"?"origin-top-right right-0":"origin-top");return(i,m)=>(o(),n("div",le,[e("div",{onClick:m[0]||(m[0]=S=>C(s)?s.value=!f(s):s=!f(s))},[w(i.$slots,"trigger")]),B(e("div",{class:"fixed inset-0 z-40",onClick:m[1]||(m[1]=S=>C(s)?s.value=!1:s=!1)},null,512),[[L,f(s)]]),l(E,{"enter-active-class":"transition ease-out duration-200","enter-from-class":"transform opacity-0 scale-95","enter-to-class":"transform opacity-100 scale-100","leave-active-class":"transition ease-in duration-75","leave-from-class":"transform opacity-100 scale-100","leave-to-class":"transform opacity-0 scale-95"},{default:r(()=>[B(e("div",{class:p(["absolute z-50 mt-2 rounded-md shadow-lg",[t.value,g.value]]),style:{display:"none"},onClick:m[2]||(m[2]=S=>C(s)?s.value=!1:s=!1)},[e("div",{class:p(["rounded-md ring-1 ring-black ring-opacity-5",h.contentClasses])},[w(i.$slots,"content")],2)],2),[[L,f(s)]])]),_:3})]))}},de={__name:"NavLink",props:{href:String,active:Boolean},setup(h){const a=h,s=x(()=>a.active?"inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out":"inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out");return(d,t)=>(o(),b(f(M),{href:h.href,class:p(s.value)},{default:r(()=>[w(d.$slots,"default")]),_:3},8,["href","class"]))}},v={__name:"ResponsiveNavLink",props:{active:Boolean,href:String,as:String},setup(h){const a=h,s=x(()=>a.active?"block w-full pl-3 pr-4 py-2 border-l-4 border-indigo-400 text-left text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out":"block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out");return(d,t)=>(o(),n("div",null,[h.as=="button"?(o(),n("button",{key:0,class:p([s.value,"w-full text-left"])},[w(d.$slots,"default")],2)):(o(),b(f(M),{key:1,href:h.href,class:p(s.value)},{default:r(()=>[w(d.$slots,"default")]),_:3},8,["href","class"]))]))}},ue={class:"min-h-screen bg-gray-100"},ce={class:"bg-white border-b border-gray-100"},he={class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"},pe={class:"flex justify-between h-16"},me={class:"flex"},fe={class:"shrink-0 flex items-center"},ge={class:"hidden space-x-8 sm:-my-px sm:ml-10 sm:flex"},ve={class:"hidden sm:flex sm:items-center sm:ml-6"},_e={class:"ml-3 relative"},be={class:"inline-flex rounded-md"},we={type:"button",class:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"},ye=e("svg",{class:"ml-2 -mr-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"})],-1),xe={class:"w-60"},ke=e("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Manage Team ",-1),$e=e("div",{class:"border-t border-gray-200"},null,-1),Ce=e("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Switch Teams ",-1),je=["onSubmit"],Me={class:"flex items-center"},Se={key:0,class:"mr-2 h-5 w-5 text-green-400",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},Te=e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),Be=[Te],Le={class:"ml-3 relative"},ze={key:0,class:"flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition"},Ae=["src","alt"],Fe={key:1,class:"inline-flex rounded-md"},Ne={type:"button",class:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"},Pe=e("svg",{class:"ml-2 -mr-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M19.5 8.25l-7.5 7.5-7.5-7.5"})],-1),De=e("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Manage Account ",-1),Ee=e("div",{class:"border-t border-gray-200"},null,-1),Oe=["onSubmit"],Ve={class:"-mr-2 flex items-center sm:hidden"},Ie={class:"h-6 w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24"},Re={class:"pt-2 pb-3 space-y-1"},qe={class:"pt-4 pb-1 border-t border-gray-200"},He={class:"flex items-center px-4"},Ke={key:0,class:"shrink-0 mr-3"},Ue=["src","alt"],Ze={class:"font-medium text-base text-gray-800"},Ge={class:"font-medium text-sm text-gray-500"},Je={class:"mt-3 space-y-1"},Qe=["onSubmit"],We=e("div",{class:"border-t border-gray-200"},null,-1),Xe=e("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Manage Team ",-1),Ye=e("div",{class:"border-t border-gray-200"},null,-1),et=e("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Switch Teams ",-1),tt=["onSubmit"],st={class:"flex items-center"},ot={key:0,class:"mr-2 h-5 w-5 text-green-400",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},rt=e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),nt=[rt],at={key:0,class:"bg-white shadow"},it={class:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"},ct={__name:"AppLayout",props:{title:String},setup(h){const a=j(!1),s=t=>{A.put(route("current-team.update"),{team_id:t.id},{preserveState:!1})},d=()=>{A.post(route("logout"))};return(t,g)=>(o(),n("div",null,[l(f(O),{title:h.title},null,8,["title"]),l(ie),e("div",ue,[e("nav",ce,[e("div",he,[e("div",pe,[e("div",me,[e("div",fe,[l(f(M),{href:t.route("dashboard")},{default:r(()=>[l(Z,{class:"block h-9 w-auto"})]),_:1},8,["href"])]),e("div",ge,[l(de,{href:t.route("dashboard"),active:t.route().current("dashboard")},{default:r(()=>[u(" Dashboard ")]),_:1},8,["href","active"])])]),e("div",ve,[e("div",_e,[t.$page.props.jetstream.hasTeamFeatures?(o(),b(F,{key:0,align:"right",width:"60"},{trigger:r(()=>[e("span",be,[e("button",we,[u(_(t.$page.props.auth.user.current_team.name)+" ",1),ye])])]),content:r(()=>[e("div",xe,[t.$page.props.jetstream.hasTeamFeatures?(o(),n($,{key:0},[ke,l(y,{href:t.route("teams.show",t.$page.props.auth.user.current_team)},{default:r(()=>[u(" Team Settings ")]),_:1},8,["href"]),t.$page.props.jetstream.canCreateTeams?(o(),b(y,{key:0,href:t.route("teams.create")},{default:r(()=>[u(" Create New Team ")]),_:1},8,["href"])):c("",!0),$e,Ce,(o(!0),n($,null,z(t.$page.props.auth.user.all_teams,i=>(o(),n("form",{key:i.id,onSubmit:k(m=>s(i),["prevent"])},[l(y,{as:"button"},{default:r(()=>[e("div",Me,[i.id==t.$page.props.auth.user.current_team_id?(o(),n("svg",Se,Be)):c("",!0),e("div",null,_(i.name),1)])]),_:2},1024)],40,je))),128))],64)):c("",!0)])]),_:1})):c("",!0)]),e("div",Le,[l(F,{align:"right",width:"48"},{trigger:r(()=>[t.$page.props.jetstream.managesProfilePhotos?(o(),n("button",ze,[e("img",{class:"h-8 w-8 rounded-full object-cover",src:t.$page.props.auth.user.profile_photo_url,alt:t.$page.props.auth.user.name},null,8,Ae)])):(o(),n("span",Fe,[e("button",Ne,[u(_(t.$page.props.auth.user.name)+" ",1),Pe])]))]),content:r(()=>[De,l(y,{href:t.route("profile.show")},{default:r(()=>[u(" Profile ")]),_:1},8,["href"]),t.$page.props.jetstream.hasApiFeatures?(o(),b(y,{key:0,href:t.route("api-tokens.index")},{default:r(()=>[u(" API Tokens ")]),_:1},8,["href"])):c("",!0),Ee,e("form",{onSubmit:k(d,["prevent"])},[l(y,{as:"button"},{default:r(()=>[u(" Log Out ")]),_:1})],40,Oe)]),_:1})])]),e("div",Ve,[e("button",{class:"inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out",onClick:g[0]||(g[0]=i=>a.value=!a.value)},[(o(),n("svg",Ie,[e("path",{class:p({hidden:a.value,"inline-flex":!a.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 6h16M4 12h16M4 18h16"},null,2),e("path",{class:p({hidden:!a.value,"inline-flex":a.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"},null,2)]))])])])]),e("div",{class:p([{block:a.value,hidden:!a.value},"sm:hidden"])},[e("div",Re,[l(v,{href:t.route("dashboard"),active:t.route().current("dashboard")},{default:r(()=>[u(" Dashboard ")]),_:1},8,["href","active"])]),e("div",qe,[e("div",He,[t.$page.props.jetstream.managesProfilePhotos?(o(),n("div",Ke,[e("img",{class:"h-10 w-10 rounded-full object-cover",src:t.$page.props.auth.user.profile_photo_url,alt:t.$page.props.auth.user.name},null,8,Ue)])):c("",!0),e("div",null,[e("div",Ze,_(t.$page.props.auth.user.name),1),e("div",Ge,_(t.$page.props.auth.user.email),1)])]),e("div",Je,[l(v,{href:t.route("profile.show"),active:t.route().current("profile.show")},{default:r(()=>[u(" Profile ")]),_:1},8,["href","active"]),t.$page.props.jetstream.hasApiFeatures?(o(),b(v,{key:0,href:t.route("api-tokens.index"),active:t.route().current("api-tokens.index")},{default:r(()=>[u(" API Tokens ")]),_:1},8,["href","active"])):c("",!0),e("form",{method:"POST",onSubmit:k(d,["prevent"])},[l(v,{as:"button"},{default:r(()=>[u(" Log Out ")]),_:1})],40,Qe),t.$page.props.jetstream.hasTeamFeatures?(o(),n($,{key:1},[We,Xe,l(v,{href:t.route("teams.show",t.$page.props.auth.user.current_team),active:t.route().current("teams.show")},{default:r(()=>[u(" Team Settings ")]),_:1},8,["href","active"]),t.$page.props.jetstream.canCreateTeams?(o(),b(v,{key:0,href:t.route("teams.create"),active:t.route().current("teams.create")},{default:r(()=>[u(" Create New Team ")]),_:1},8,["href","active"])):c("",!0),Ye,et,(o(!0),n($,null,z(t.$page.props.auth.user.all_teams,i=>(o(),n("form",{key:i.id,onSubmit:k(m=>s(i),["prevent"])},[l(v,{as:"button"},{default:r(()=>[e("div",st,[i.id==t.$page.props.auth.user.current_team_id?(o(),n("svg",ot,nt)):c("",!0),e("div",null,_(i.name),1)])]),_:2},1024)],40,tt))),128))],64)):c("",!0)])])],2)]),t.$slots.header?(o(),n("header",at,[e("div",it,[w(t.$slots,"header")])])):c("",!0),e("main",null,[w(t.$slots,"default")])])]))}};export{ct as _};