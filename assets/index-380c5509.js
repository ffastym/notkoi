import{r as I,u as ye,v as Ce,D as Be,i as Q,e as we,j as t,a as h,F as E,b as D,B as R,g as S,U as K,c as X,d as Ie,C as Y,f as G,h as J,k as Te,l as ke,m as Pe,n as Le,s as ee,o as Se,p as Fe,q as p,t as Ue,w as De,x as Ee,L as Re,H as Ve,y as _e,R as qe,z as Ne,A as Oe}from"./index-3398d457.js";function $e(i,e){var o=I.useRef(!1),a=ye(e==null?void 0:e.client);Ce(i,Be.Subscription);var f=I.useState({loading:!(e!=null&&e.skip),error:void 0,data:void 0,variables:e==null?void 0:e.variables}),b=f[0],m=f[1];o.current||(o.current=!0,e!=null&&e.onSubscriptionData&&globalThis.__DEV__!==!1&&Q.warn(e.onData?52:53),e!=null&&e.onSubscriptionComplete&&globalThis.__DEV__!==!1&&Q.warn(e.onComplete?54:55));var B=I.useState(function(){return e!=null&&e.skip?null:a.subscribe({query:i,variables:e==null?void 0:e.variables,fetchPolicy:e==null?void 0:e.fetchPolicy,context:e==null?void 0:e.context})}),x=B[0],y=B[1],g=I.useRef(!1);I.useEffect(function(){return function(){g.current=!0}},[]);var n=I.useRef({client:a,subscription:i,options:e});return I.useEffect(function(){var d,C,l,r,u=e==null?void 0:e.shouldResubscribe;typeof u=="function"&&(u=!!u(e)),e!=null&&e.skip?(!(e!=null&&e.skip)!=!(!((d=n.current.options)===null||d===void 0)&&d.skip)||g.current)&&(m({loading:!1,data:void 0,error:void 0,variables:e==null?void 0:e.variables}),y(null),g.current=!1):(u!==!1&&(a!==n.current.client||i!==n.current.subscription||(e==null?void 0:e.fetchPolicy)!==((C=n.current.options)===null||C===void 0?void 0:C.fetchPolicy)||!(e!=null&&e.skip)!=!(!((l=n.current.options)===null||l===void 0)&&l.skip)||!we(e==null?void 0:e.variables,(r=n.current.options)===null||r===void 0?void 0:r.variables))||g.current)&&(m({loading:!0,data:void 0,error:void 0,variables:e==null?void 0:e.variables}),y(a.subscribe({query:i,variables:e==null?void 0:e.variables,fetchPolicy:e==null?void 0:e.fetchPolicy,context:e==null?void 0:e.context})),g.current=!1),Object.assign(n.current,{client:a,subscription:i,options:e})},[a,i,e,g.current]),I.useEffect(function(){if(x){var d=!1,C=x.subscribe({next:function(l){var r,u;if(!d){var k={loading:!1,data:l.data,error:void 0,variables:e==null?void 0:e.variables};m(k),!((r=n.current.options)===null||r===void 0)&&r.onData?n.current.options.onData({client:a,data:k}):!((u=n.current.options)===null||u===void 0)&&u.onSubscriptionData&&n.current.options.onSubscriptionData({client:a,subscriptionData:k})}},error:function(l){var r,u;d||(m({loading:!1,data:void 0,error:l,variables:e==null?void 0:e.variables}),(u=(r=n.current.options)===null||r===void 0?void 0:r.onError)===null||u===void 0||u.call(r,l))},complete:function(){var l,r;d||(!((l=n.current.options)===null||l===void 0)&&l.onComplete?n.current.options.onComplete():!((r=n.current.options)===null||r===void 0)&&r.onSubscriptionComplete&&n.current.options.onSubscriptionComplete())}});return function(){d=!0,setTimeout(function(){C.unsubscribe()})}}},[x]),b}function Ae({percent:i}){return t("div",{className:"progress",children:t("div",{className:"progress-bar",role:"progressbar",style:{height:`${i}%`}})})}function V({children:i,title:e,accept:o,reject:a,visible:f,onClose:b}){return f?t("div",{style:{zIndex:999,position:"fixed",background:"rgba(0,0,0,0.8)",left:0,top:0,right:0,bottom:0},children:h(E,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",maxHeight:"500px",width:"80%",background:"var(--tg-theme-secondary-bg-color)",borderRadius:"25px"},children:[t("div",{style:{padding:"16px"},children:h("span",{style:{fontSize:"20px",fontWeight:"bold",color:"var(--tg-theme-text-color)",textAlign:"center",display:"block"},children:[e,b&&t("button",{className:"close",onClick:b})]})}),t("div",{style:{flex:1,padding:"0 16px"},children:i}),o||a?h(D,{style:{padding:"16px"},children:[o&&t(R,{onClick:o.action,children:o.text}),a&&t(R,{onClick:a.action,children:a.text})]}):t("div",{style:{height:16}})]})}):null}function te({children:i}){return h("div",{style:{display:"flex",alignItems:"center",flexDirection:"column"},children:[t("img",{style:{height:100,width:100},src:"/img/coming-soon.png",alt:""}),t("span",{style:{marginTop:16,fontWeight:500,textAlign:"center"},children:i})]})}const ie={},He=S`
  subscription Biting {
    biting {
      id
      power
    }
  }
`;function Me(i){const e={...ie,...i};return $e(He,e)}const We=S`
  query User {
    user {
      ...UserProfile
    }
  }
  ${K}
`;function ne(i){const e={...ie,...i};return X(We,e)}function ze({isVisible:i,hide:e}){const{data:o}=ne({fetchPolicy:"cache-and-network"});return o?t(V,{visible:i,title:"Profile",onClose:e,accept:{text:"OK",action:e},children:t(te,{children:"Your profile information, stats and achievements"})}):null}function je({isVisible:i,hide:e}){return t(V,{visible:i,title:"Leaderboard",accept:{text:"OK",action:e},children:t(te,{children:"Your score in the fisherman rating"})})}const oe={},H=S`
  fragment MainBox on Box {
    id
    baitsLevel
    baitsLevelUpdateTonCost
    baitsLevelUpdateCoinsCost
    baitsLevelUpdateForCoinsPossible
    equipmentLevel
    equipmentLevelUpdateForCoinsPossible
    equipmentLevelUpdateTonCost
    equipmentLevelUpdateCoinsCost
  }
`,Qe=S`
  query TackleBox($boxId: String!) {
    tackleBox(boxId: $boxId) {
      ...MainBox
    }
  }
  ${H}
`;function Ye(i){const e={...oe,...i};return X(Qe,e)}const Ge=S`
  mutation UpgradeBox($boxId: ID!, $boxItemType: BoxItemType!) {
    upgradeBox(boxId: $boxId, boxItemType: $boxItemType) {
      ...MainBox
    }
  }
  ${H}
`;function Ze(i){const e={...oe,...i};return Ie(Ge,e)}const Z=({locked:i,tonCost:e,coinsCost:o,level:a,picture:f,name:b,boxId:m,boxItemType:B})=>{const[x]=Ze({fetchPolicy:"no-cache"}),y=n=>{J.cache.updateFragment({fragment:H,id:`Box:${n.id}`},()=>n)};return h(E,{children:[h(D,{children:[t("img",{style:{height:40,width:40,marginRight:8},src:f,alt:""}),h(E,{children:[t("span",{style:{fontWeight:"bold"},children:b}),h("span",{style:{color:"var(--tg-theme-hint-color)"},children:["Level ",a]})]})]}),h(D,{children:[t(R,{disabled:i,onClick:async()=>{var d;if(i)return;const n=await x({variables:{boxId:m,boxItemType:B}});n.data&&(window.Telegram.WebApp.HapticFeedback.notificationOccurred("success"),y((d=n.data)==null?void 0:d.upgradeBox))},style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:h(D,{style:{opacity:i?"0.6":1},children:[i&&t("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:t("g",{id:"Iconly/Bold/Lock",children:t("g",{id:"Lock",children:t("path",{id:"Lock_2",fillRule:"evenodd",clipRule:"evenodd",d:"M17.5227 7.39601V8.92935C19.2451 9.46696 20.5 11.0261 20.5 12.8884V17.8253C20.5 20.1308 18.5886 22 16.2322 22H7.7688C5.41136 22 3.5 20.1308 3.5 17.8253V12.8884C3.5 11.0261 4.75595 9.46696 6.47729 8.92935V7.39601C6.48745 4.41479 8.95667 2 11.9848 2C15.0535 2 17.5227 4.41479 17.5227 7.39601ZM12.0051 3.73904C14.0678 3.73904 15.7445 5.37871 15.7445 7.39601V8.7137H8.25553V7.37613C8.26569 5.36878 9.94232 3.73904 12.0051 3.73904ZM12.8891 16.4549C12.8891 16.9419 12.4928 17.3294 11.9949 17.3294C11.5072 17.3294 11.1109 16.9419 11.1109 16.4549V14.2488C11.1109 13.7718 11.5072 13.3843 11.9949 13.3843C12.4928 13.3843 12.8891 13.7718 12.8891 14.2488V16.4549Z",fill:"#200E32"})})})}),t(Y,{coins:o,type:G.COIN})]})}),t(R,{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:t(Y,{coins:e,type:G.TON})})]})]})};var A=(i=>(i.Baits="BAITS",i.Equipment="EQUIPMENT",i))(A||{});function Ke({isVisible:i,hide:e,tackleBoxId:o}){const{data:a,loading:f}=Ye({fetchPolicy:"cache-and-network",variables:{boxId:o}});return t(V,{visible:i,title:"Tackle box",onClose:e,children:(()=>{if(!a)return f?t("span",{children:"Loading..."}):null;const{equipmentLevel:m,equipmentLevelUpdateTonCost:B,baitsLevel:x,baitsLevelUpdateCoinsCost:y,baitsLevelUpdateForCoinsPossible:g,baitsLevelUpdateTonCost:n,equipmentLevelUpdateForCoinsPossible:d,equipmentLevelUpdateCoinsCost:C,id:l}=a.tackleBox;return h(E,{children:[t(Z,{name:"Fishing equipment",coinsCost:C,tonCost:B,level:m,locked:!d,picture:"/img/equipment.png",boxId:l,boxItemType:A.Equipment}),t("div",{style:{width:"100%",height:1,opacity:.1,background:"var(--tg-theme-text-color)",margin:"8px 0"}}),t(Z,{name:"Fishing baits",coinsCost:y,tonCost:n,level:x,locked:!g,picture:"/img/worm.png",boxId:l,boxItemType:A.Baits})]})})()})}function Xe({isVisible:i,biting:e,sell:o,release:a}){return t(V,{visible:i,title:"You catch the fish!",accept:{text:h(Te,{children:[t("span",{style:{color:"#fff"},children:"Sell"}),t("img",{style:{margin:"0 5px 0 10px",height:16,width:16},src:"/img/coin.png",alt:""}),t("span",{style:{color:"#fff"},children:e.fish.price})]}),action:()=>o(e.id)},reject:{text:"Release",action:()=>a(e.id)},children:h("div",{style:{display:"flex",alignItems:"center",flexDirection:"column"},children:[t("img",{style:{maxWidth:"100%",maxHeight:"100%"},src:`/img/fish/${e.fish.picture}`,alt:""}),t("span",{style:{fontSize:18,fontWeight:500},children:e.fish.name})]})})}function Je({buttons:i}){return t(ke,{children:i.map(({action:e,picture:o})=>t(Pe,{children:t(Le,{onClick:e,src:o,alt:o})},o))})}function et({onPull:i,onPush:e}){return t("button",{onTouchStart:i,onTouchEnd:e,style:{display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",zIndex:1,position:"absolute",right:16,bottom:100,background:"rgba(255,255,255,.3)",border:"2px solid #fff",height:100,width:100},children:t("img",{style:{height:50,width:50},src:"/img/reels-2-white.png",alt:""})})}const tt=ee.div`
  min-height: 100vh;
`,it=ee.div`
  max-width: 900px;
  margin: 0 auto;
`;let L=null,T=null;const nt=.5,U=[50,35];function at({user:i,balance:e}){const{tg:o}=Se(),a=Fe(),[f,b]=p.useState(U[1]),[m,B]=p.useState(U[0]),[x,y]=p.useState(null),[g,n]=p.useState(!1),[d,C]=p.useState(!1),[l,r]=p.useState(!1),[u,k]=p.useState(!1),[P,M]=p.useState(0),{data:_}=ne({fetchPolicy:"cache-and-network"}),q=(_==null?void 0:_.user)||i,{data:v}=Me({shouldResubscribe:!0,fetchPolicy:"no-cache"}),[W,{data:z}]=Ue({fetchPolicy:"no-cache"}),[ae]=De({fetchPolicy:"no-cache"}),[re]=Ee({fetchPolicy:"no-cache"}),F=()=>{clearInterval(L),L=null,clearInterval(T),T=0,b(U[1]),B(U[0]),y(null),M(0)},w=s=>{s.preventDefault()},le=s=>{w(s),P&&(clearInterval(L),T||(T=setInterval(N,50)),L=setInterval(()=>{window.Telegram.WebApp.HapticFeedback.impactOccurred("light"),y(c=>c===null?1:c>=100?(j(),F(),100):(f>0&&b($=>$-nt),c+P))},50))},se=s=>{w(s),P&&(clearInterval(L),T||(T=setInterval(N,50)),L=setInterval(()=>{y(c=>c===null?1:c<=0?(j(),F(),0):(f!==40&&b($=>$+.05),c-P))},50))},N=()=>{B(s=>{if(s===0||s===100)return s;const c=Math.random();return s+(c>.5?.2:-.2)})},ce=()=>{n(!0)},O=()=>{n(!1),F()},de=()=>{C(!0)},ue=()=>{C(!1)},fe=()=>{a(Ne(Oe.FRIENDS))},he=()=>{r(!0)},ve=()=>{r(!1)},j=()=>{try{o.HapticFeedback.notificationOccurred("error"),o.showAlert("Oops... Your fish is gone 😢. Try to pull the fish more carefully")}catch(s){console.error(s)}},be=()=>{k(!0)},ge=()=>{k(!1)};p.useEffect(()=>{f<=0&&(v!=null&&v.biting)&&W({variables:{bitingId:v.biting.id}}).then(()=>{window.Telegram.WebApp.HapticFeedback.impactOccurred("rigid"),ce(),F()})},[f,v==null?void 0:v.biting,W]),p.useEffect(()=>{v!=null&&v.biting&&(M(v.biting.power),window.Telegram.WebApp.HapticFeedback.notificationOccurred("success"),T||(T=setInterval(N,50)))},[v]);const pe=s=>{J.cache.updateFragment({fragment:K,id:`User:${q.id}`},c=>({...c,coins:+c.coins+s}))},me=async s=>{const{data:c}=await ae({variables:{bitingId:s}});c&&(pe(c.sellFish),window.Telegram.WebApp.HapticFeedback.notificationOccurred("success")),O()},xe=async s=>{const{data:c}=await re({variables:{bitingId:s}});c&&window.Telegram.WebApp.HapticFeedback.notificationOccurred("success"),O()};return p.useEffect(()=>{o.expand()},[o]),t(tt,{children:h(it,{children:[t(Re,{onTouchStart:w,onTouchEnd:w}),t(Ve,{coins:+q.coins,style:{color:"#fff"},balance:e}),x!==null&&t(Ae,{percent:100-x}),t(_e,{onTouchStart:w,onTouchEnd:w,style:{bottom:`${f}%`,left:`${m}%`}}),t(qe,{onTouchStart:w,onTouchEnd:w}),P>0&&t("h1",{style:{color:"white",position:"absolute",top:100,left:"50%",transform:"translateX(-50%"},children:"BITING!!!"}),t(Je,{buttons:[{picture:"/img/toolbox.png",action:de},{picture:"/img/leaderboard.png",action:he},{picture:"/img/support.png",action:fe},{picture:"/img/fisher.png",action:be}]}),P>0&&t(et,{onPull:le,onPush:se}),z&&t(Xe,{hide:O,isVisible:g,sell:me,release:xe,biting:z.catchFish}),d&&t(Ke,{isVisible:d,hide:ue,tackleBoxId:q.tackleBoxId}),l&&t(je,{isVisible:l,hide:ve}),u&&t(ze,{hide:ge,isVisible:u})]})})}export{at as default};
