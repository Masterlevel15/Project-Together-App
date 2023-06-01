import{o as t,e as n,b as o,u as s,a as g,c as u,w as r,F as d,f as l,Z as h,g as a,t as f,s as i}from"./app-99faaeeb.js";import m from"./App-4d5e292a.js";import{_ as p}from"./DropdownLink-ef9fb0d8.js";import"./activitiesStore-b8d99cc3.js";import"./_plugin-vue_export-helper-c27b6911.js";const y={class:"relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-slate-500 selection:bg-red-500 selection:text-white h-auto",style:{"min-height":"250vh",background:"#7BBFBF"}},k={key:0,class:"sm:fixed sm:top-0 sm:right-0 p-6 text-right"},_=g("div",{class:"border-t border-gray-200"},null,-1),V={__name:"Welcome",props:{canLogin:Boolean,canRegister:Boolean,laravelVersion:String,phpVersion:String,activities:Array,tests:Array,categories:Array},setup(c){return(e,v)=>(t(),n(d,null,[o(s(h),{title:"Welcome"}),g("div",y,[c.canLogin?(t(),n("div",k,[e.$page.props.auth.user?(t(),u(s(i),{key:0,href:"/",class:"font-semibold text-gray-600 hover:text-gray-900 dark:text-slate-200 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"},{default:r(()=>[e.$page.props.jetstream.hasApiFeatures?(t(),u(p,{key:0,href:e.route("api-tokens.index")},{default:r(()=>[a(" API Tokens ")]),_:1},8,["href"])):l("",!0),_,o(s(i),{href:"/user/profile",method:"get",as:"button",style:{"margin-right":"4vh"}},{default:r(()=>[a(f(e.$page.props.auth.user.name),1)]),_:1}),o(s(i),{href:"/logout",method:"post",as:"button"},{default:r(()=>[a("Logout")]),_:1})]),_:1})):(t(),n(d,{key:1},[o(s(i),{href:e.route("login"),class:"font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"},{default:r(()=>[a("Log in")]),_:1},8,["href"]),c.canRegister?(t(),u(s(i),{key:0,href:e.route("register"),class:"ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"},{default:r(()=>[a("Register")]),_:1},8,["href"])):l("",!0)],64))])):l("",!0),o(m,{activities:this.activities,tests:this.tests,categories:this.categories},null,8,["activities","tests","categories"])])],64))}};export{V as default};
