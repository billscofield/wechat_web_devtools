"use strict";function init(){function e(e){var o=e.apphash,r=t.getProjectByHash(o),n=r.isTourist,i=r.urlCheck,a=!0;return n?a=!1:i||(a=!1),a}function o(o,r){var n=o.args,a=t.getCurrentProjectConfig();return u>=a.Setting.MaxUploadConcurrent?void r({errMsg:"uploadFile:fail exceed max upload connection count "+a.Setting.MaxUploadConcurrent}):(u++,n.tlsVersionCheck=e(o),n.callback=function(e,o,t){r(e?e&&"EPROTO"===e.code?{errMsg:"uploadFile:fail 小程序要求的 TLS 版本必须大于等于 1.2"}:{errMsg:"uploadFile:fail "+e}:{errMsg:"uploadFile:ok",data:t,statusCode:o.statusCode}),u--},void i.uploadFileToServer(n))}function r(o,r){var u=o.args,f=t.getCurrentProject(),g=t.getCurrentProjectConfig(),p=1024*d.DownloadFileSizeLimit*1024;if(c>=g.Setting.MaxDownloadConcurrent)return void r({errMsg:"downloadFile:fail exceed max download connection count "+g.Setting.MaxDownloadConcurrent});c++;var x=0,C=200,v=i.createNewLocalId(f)+n.extname(u.url.split("?")[0]),h=i.getRealPath(v),F=function(e){"function"==typeof r&&(r(e),c--,r=void 0)},w={method:"get",url:u.url,encoding:null,headers:u.header||{},followRedirect:function(e){var o=!1;(f.urlCheck||f.isTourist)&&(o=!0);var r=e.statusCode;if(r>=300&&r<400&&(302==r||301==r))for(var t=e.caseless.get("location"),n=g.Network.DownloadDomain,i=0;i<n.length;i++)if(t&&0===t.indexOf(n[i])){o=!0;break}return o}};e(o)&&(w.agentOptions={secureProtocol:"TLSv1_2_method"});var M=s.getProxyForURL(w.url);"DIRECT"!==M&&(w.proxy="http://"+M.replace("PROXY ",""));var m=l(w);m.on("response",function(e){if(C=e.statusCode,200!=C&&206!=C)F({errMsg:"downloadFile:ok",statusCode:C});else{var o=parseInt(e.headers["content-length"]);o>p&&(m.abort(),F({errMsg:"downloadFile:fail exceed max file size"}))}}).on("error",function(e){F(e&&"EPROTO"===e.code?{errMsg:"downloadFile:fail 小程序要求的 TLS 版本必须大于等于 1.2"}:{errMsg:"downloadFile:fail "+e})}).on("data",function(e){x+=e.length,x>p&&(m.abort(),F({errMsg:"downloadFile:fail exceed max file size"}))}).on("end",function(e){F({errMsg:"downloadFile:ok",tempFilePath:v,statusCode:C})}).pipe(a.createWriteStream(h))}var t=require("../../stores/projectStores.js"),n=require("path"),i=require("../../utils/file"),a=require("fs"),l=require("request"),s=require("../../utils/tools.js"),d=require("../../config/appserviceConfig.js"),u=0,c=0;_exports={downloadFile:r,uploadFile:o}}var _exports;init(),module.exports=_exports;
