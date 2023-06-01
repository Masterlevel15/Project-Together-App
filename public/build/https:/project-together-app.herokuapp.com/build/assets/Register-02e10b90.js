import{T as g,o as f,e as c,b as e,u as o,w as n,F as _,Z as w,a as t,g as u,f as v,s as y,n as h,q as V}from"./app-99faaeeb.js";import{A as b}from"./AuthenticationCard-9153b8fe.js";import{_ as k}from"./AuthenticationCardLogo-f73993d4.js";import{_ as x}from"./Checkbox-904b8a55.js";import{_ as i,a as l}from"./TextInput-d208ba83.js";import{_ as m}from"./InputLabel-f25ebf8a.js";import{_ as q}from"./PrimaryButton-de897cca.js";import"./_plugin-vue_export-helper-c27b6911.js";const P=["onSubmit"],$={class:"mt-4"},U={class:"mt-4"},C={class:"mt-4"},N={key:0,class:"mt-4"},A={class:"flex items-center"},F={class:"ml-2"},T=["href"],B=["href"],R={class:"flex items-center justify-end mt-4"},H={__name:"Register",setup(S){const s=g({name:"",email:"",password:"",password_confirmation:"",pseudo:"",terms:!1}),p=()=>{s.post(route("register"),{onFinish:()=>s.reset("password","password_confirmation")})};return(d,a)=>(f(),c(_,null,[e(o(w),{title:"Register"}),e(b,null,{logo:n(()=>[e(k)]),default:n(()=>[t("form",{onSubmit:V(p,["prevent"])},[t("div",null,[e(m,{for:"name",value:"Name"}),e(i,{id:"name",modelValue:o(s).name,"onUpdate:modelValue":a[0]||(a[0]=r=>o(s).name=r),type:"text",class:"mt-1 block w-full",required:"",autofocus:"",autocomplete:"name"},null,8,["modelValue"]),e(l,{class:"mt-2",message:o(s).errors.name},null,8,["message"])]),t("div",null,[e(m,{for:"pseudo",value:"Pseudo"}),e(i,{id:"pseudo",modelValue:o(s).pseudo,"onUpdate:modelValue":a[1]||(a[1]=r=>o(s).pseudo=r),type:"text",class:"mt-1 block w-full",required:"",autofocus:""},null,8,["modelValue"]),e(l,{class:"mt-2",message:o(s).errors.name},null,8,["message"])]),t("div",$,[e(m,{for:"email",value:"Email"}),e(i,{id:"email",modelValue:o(s).email,"onUpdate:modelValue":a[2]||(a[2]=r=>o(s).email=r),type:"email",class:"mt-1 block w-full",required:"",autocomplete:"username"},null,8,["modelValue"]),e(l,{class:"mt-2",message:o(s).errors.email},null,8,["message"])]),t("div",U,[e(m,{for:"password",value:"Password"}),e(i,{id:"password",modelValue:o(s).password,"onUpdate:modelValue":a[3]||(a[3]=r=>o(s).password=r),type:"password",class:"mt-1 block w-full",required:"",autocomplete:"new-password"},null,8,["modelValue"]),e(l,{class:"mt-2",message:o(s).errors.password},null,8,["message"])]),t("div",C,[e(m,{for:"password_confirmation",value:"Confirm Password"}),e(i,{id:"password_confirmation",modelValue:o(s).password_confirmation,"onUpdate:modelValue":a[4]||(a[4]=r=>o(s).password_confirmation=r),type:"password",class:"mt-1 block w-full",required:"",autocomplete:"new-password"},null,8,["modelValue"]),e(l,{class:"mt-2",message:o(s).errors.password_confirmation},null,8,["message"])]),d.$page.props.jetstream.hasTermsAndPrivacyPolicyFeature?(f(),c("div",N,[e(m,{for:"terms"},{default:n(()=>[t("div",A,[e(x,{id:"terms",checked:o(s).terms,"onUpdate:checked":a[5]||(a[5]=r=>o(s).terms=r),name:"terms",required:""},null,8,["checked"]),t("div",F,[u(" I agree to the "),t("a",{target:"_blank",href:d.route("terms.show"),class:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},"Terms of Service",8,T),u(" and "),t("a",{target:"_blank",href:d.route("policy.show"),class:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},"Privacy Policy",8,B)])]),e(l,{class:"mt-2",message:o(s).errors.terms},null,8,["message"])]),_:1})])):v("",!0),t("div",R,[e(o(y),{href:d.route("login"),class:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},{default:n(()=>[u(" Already registered? ")]),_:1},8,["href"]),e(q,{class:h(["ml-4",{"opacity-25":o(s).processing}]),disabled:o(s).processing},{default:n(()=>[u(" Register ")]),_:1},8,["class","disabled"])])],40,P)]),_:1})],64))}};export{H as default};
