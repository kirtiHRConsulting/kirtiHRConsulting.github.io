import {readFileSync, existsSync, readdirSync, statSync} from 'node:fs';
import {join} from 'node:path';
import {Script} from 'node:vm';
import assert from 'node:assert/strict';

const base='/';
const html=readFileSync('dist/index.html','utf8');
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]));
assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length,1,'Exactly one main heading');
for(const id of ['home','services','special-projects','how-we-work','results','about','industries','partnerships','contact']) assert(ids.has(id),`Missing section: ${id}`);
for(const [,href] of html.matchAll(/\bhref="(#[^"]*)"/g)) assert(ids.has(href.slice(1)),`Broken anchor: ${href}`);
let assets=0;
for(const [,url] of html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)){
  if(/^(https?:|mailto:|tel:|data:)/.test(url)) continue;
  assert(url.startsWith(base),`Asset is missing base path: ${url}`);
  assert(existsSync(join('dist',url.slice(base.length))),`Missing asset: ${url}`);
  assets++;
}
for(const [,attributes,body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){
  if(attributes.includes('application/ld+json')) JSON.parse(body);
  else if(body.trim()) new Script(body);
}
assert(!/lorem ipsum|TattvikaSetu|kirti-hr-consulting\//i.test(html),'Unexpected placeholder, partnership, private location or old subpath');
assert(html.includes('mailto:kirti.hr.consulting@gmail.com'),'Business email missing');
assert(html.includes('tel:+919220814016'),'Business phone missing');
assert(html.includes('Nothing is sent until you send the email'),'Email draft explanation missing');
const canonical='https://kirtihrconsulting.github.io/';
assert(html.includes(`rel="canonical" href="${canonical}"`),'Canonical URL mismatch');
assert(html.includes(`property="og:url" content="${canonical}"`),'Open Graph URL mismatch');
assert(readFileSync('dist/sitemap.xml','utf8').includes(`<loc>${canonical}</loc>`),'Sitemap URL mismatch');
const sizes=[];
function walk(dir){for(const name of readdirSync(dir)){const file=join(dir,name);if(statSync(file).isDirectory())walk(file);else sizes.push([file,statSync(file).size]);}}
walk('dist');
console.log(JSON.stringify({base,assets,files:sizes,totalBytes:sizes.reduce((sum,[,bytes])=>sum+bytes,0),checks:'passed'},null,2));
