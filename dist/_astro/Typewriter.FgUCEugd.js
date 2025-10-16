import{j as u}from"./jsx-runtime.ClP7wGfN.js";import{r as s}from"./index.DK-fsZOb.js";function w({text:f,typingSpeed:o=75,deletingSpeed:m=50,pauseDuration:x=1500,loop:y=!0,loopOnce:n=!1,showCursor:k=!0,cursorCharacter:b="_",cursorBlinkDuration:C=.5,className:E="",cursorClassName:R=""}){const[e,d]=s.useState(""),[i,p]=s.useState(0),[h,T]=s.useState(!1),[g,j]=s.useState(!1),[a,A]=s.useState(!1),t=s.useRef(),r=Array.isArray(f)?f:[f];return s.useEffect(()=>{const I=r[i],c=()=>{if(!(n&&a&&i===0&&e===r[0])){if(g){t.current=setTimeout(()=>{j(!1);const l=i===r.length-1;n&&l&&A(!0),T(!0)},x);return}if(!h)e.length<I.length?(d(I.slice(0,e.length+1)),t.current=setTimeout(c,o)):r.length>1&&(y||n&&!a)&&(j(!0),t.current=setTimeout(c,x));else if(e.length>0)d(e.slice(0,-1)),t.current=setTimeout(c,m);else{T(!1);const l=(i+1)%r.length;if(p(l),n&&l===0&&a)return}}};return t.current=setTimeout(c,h?m:o),()=>{t.current&&clearTimeout(t.current)}},[e,i,h,g,a,r,o,m,x,y,n]),u.jsxs(u.Fragment,{children:[u.jsxs("span",{className:E,children:[e,k&&u.jsx("span",{className:`inline-block ${R}`,style:{animation:`blink ${C}s infinite`},children:b})]}),u.jsx("style",{children:`
        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
      `})]})}export{w as default};
