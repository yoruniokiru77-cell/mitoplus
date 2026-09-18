import {readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
const html=readFileSync('dist/index.html','utf8');
for(const [,ref] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
 if(ref.startsWith('https:'))continue;
 if(ref.startsWith('#')){if(ref.length>1)assert(html.includes(`id="${ref.slice(1)}"`),`Missing anchor ${ref}`);continue;}
 assert(existsSync('dist/'+ref),`Missing asset ${ref}`);
}
assert(html.includes('茨城・水戸のチャットレディ求人'));
assert(html.includes('name="viewport"'));
assert(html.includes('rel="canonical"'));
assert(html.includes('https://lin.ee/53nShN8'));
assert(existsSync('dist/robots.txt'));
assert(existsSync('dist/sitemap.xml'));
for (const route of ['zaitaku-chatlady', 'chatlady-fukugyo']) {
 const page = readFileSync(`dist/${route}/index.html`, 'utf8');
 assert(page.includes(`href="https://mito-plus.com/${route}/"`), `Missing canonical for ${route}`);
 assert(page.includes('https://lin.ee/53nShN8'), `Missing LINE contact for ${route}`);
 assert(html.includes(`href="/${route}/"`), `Missing homepage link to ${route}`);
 assert(readFileSync('dist/sitemap.xml', 'utf8').includes(`https://mito-plus.com/${route}/`), `Missing sitemap entry for ${route}`);
 for (const [, ref] of page.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (ref.startsWith('https:') || ref.startsWith('#')) continue;
  if (ref.startsWith('/#')) { assert(html.includes(`id="${ref.slice(2)}"`), `Missing homepage anchor ${ref}`); continue; }
  if (ref.startsWith('/')) { assert(existsSync(`dist${ref}`), `Missing local route or asset ${ref}`); continue; }
  assert(existsSync(`dist/${route}/${ref}`), `Missing local asset ${ref}`);
 }
 for (const [, json] of page.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(json);
}
const structuredData = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
assert(structuredData.length >= 2, 'Missing structured data');
for (const [, json] of structuredData) JSON.parse(json);
console.log('Validated entrypoint, local assets, section anchors, and metadata.');
