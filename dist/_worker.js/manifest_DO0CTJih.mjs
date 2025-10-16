globalThis.process ??= {}; globalThis.process.env ??= {};
import { h as decodeKey } from './chunks/astro/server_Cq1oVH5G.mjs';
import './chunks/astro-designed-error-pages_DUpLwmfE.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_BN7ruxxn.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Volumes/MacOS/cassia/Project/Code/wanvisa/","cacheDir":"file:///Volumes/MacOS/cassia/Project/Code/wanvisa/node_modules/.astro/","outDir":"file:///Volumes/MacOS/cassia/Project/Code/wanvisa/dist/","srcDir":"file:///Volumes/MacOS/cassia/Project/Code/wanvisa/src/","publicDir":"file:///Volumes/MacOS/cassia/Project/Code/wanvisa/public/","buildClientDir":"file:///Volumes/MacOS/cassia/Project/Code/wanvisa/dist/","buildServerDir":"file:///Volumes/MacOS/cassia/Project/Code/wanvisa/dist/_worker.js/","adapterName":"@astrojs/cloudflare","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Volumes/MacOS/cassia/Project/Code/wanvisa/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DO0CTJih.mjs","/Volumes/MacOS/cassia/Project/Code/wanvisa/node_modules/astro/node_modules/unstorage/drivers/cloudflare-kv-binding.mjs":"chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/Volumes/MacOS/cassia/Project/Code/wanvisa/src/components/AnimatedCursor":"_astro/AnimatedCursor.Bgs_3-oY.js","/Volumes/MacOS/cassia/Project/Code/wanvisa/src/components/ParticleBackground":"_astro/ParticleBackground.Coat4pwM.js","/Volumes/MacOS/cassia/Project/Code/wanvisa/src/components/BackgroundOrbs":"_astro/BackgroundOrbs.Bfssl-a7.js","/Volumes/MacOS/cassia/Project/Code/wanvisa/src/components/Typewriter":"_astro/Typewriter.FgUCEugd.js","/Volumes/MacOS/cassia/Project/Code/wanvisa/src/components/AnimatedCard":"_astro/AnimatedCard.mJ12E2tG.js","/Volumes/MacOS/cassia/Project/Code/wanvisa/src/components/Navbar.astro?astro&type=script&index=0&lang.ts":"_astro/Navbar.astro_astro_type_script_index_0_lang.DesWd_k5.js","@astrojs/react/client.js":"_astro/client.MPOeFQxP.js","@iconify/react":"_astro/react.B-MfvGBA.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Volumes/MacOS/cassia/Project/Code/wanvisa/src/components/Navbar.astro?astro&type=script&index=0&lang.ts","const r=document.getElementById(\"mobile-menu-button\"),t=document.getElementById(\"mobile-menu\");r?.addEventListener(\"click\",()=>{t?.classList.toggle(\"hidden\")});const s=t?.querySelectorAll(\"a\");s?.forEach(e=>{e.addEventListener(\"click\",()=>{t?.classList.add(\"hidden\")})});document.querySelectorAll('a[href^=\"#\"]').forEach(e=>{e.addEventListener(\"click\",function(n){n.preventDefault();const o=n.currentTarget.getAttribute(\"href\"),c=o?document.querySelector(o):null;c&&c.scrollIntoView({behavior:\"smooth\",block:\"start\"})})});const l=document.querySelector(\"nav\");window.addEventListener(\"scroll\",()=>{window.pageYOffset>100?l?.classList.add(\"scrolled\"):l?.classList.remove(\"scrolled\")});"]],"assets":["/_astro/index.Cj8D98ea.css","/favicon.svg","/_worker.js/_@astrojs-ssr-adapter.mjs","/_worker.js/_astro-internal_middleware.mjs","/_worker.js/_noop-actions.mjs","/_worker.js/index.js","/_worker.js/renderers.mjs","/_astro/AnimatedCard.mJ12E2tG.js","/_astro/AnimatedCursor.Bgs_3-oY.js","/_astro/BackgroundOrbs.Bfssl-a7.js","/_astro/ParticleBackground.Coat4pwM.js","/_astro/Typewriter.FgUCEugd.js","/_astro/client.MPOeFQxP.js","/_astro/index.DK-fsZOb.js","/_astro/jsx-runtime.ClP7wGfN.js","/_astro/proxy.KBkxYU9n.js","/_astro/react.B-MfvGBA.js","/_worker.js/_astro/index.Cj8D98ea.css","/_worker.js/pages/index.astro.mjs","/_worker.js/chunks/_@astro-renderers_CODtWvYy.mjs","/_worker.js/chunks/_@astrojs-ssr-adapter_BHzS-Ky-.mjs","/_worker.js/chunks/astro-designed-error-pages_DUpLwmfE.mjs","/_worker.js/chunks/astro_BjWlaChD.mjs","/_worker.js/chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/_worker.js/chunks/index_1C1MwtYv.mjs","/_worker.js/chunks/noop-middleware_BN7ruxxn.mjs","/_worker.js/chunks/astro/server_Cq1oVH5G.mjs","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"2r09XJHks9W8rhR/dFs+kuxB18QSHIZ9dGeGax6ZiI4=","sessionConfig":{"driver":"cloudflare-kv-binding","options":{"binding":"SESSION"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/cloudflare-kv-binding_DMly_2Gl.mjs');

export { manifest };
