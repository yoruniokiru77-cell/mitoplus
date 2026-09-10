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
const structuredData = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
assert(structuredData.length >= 2, 'Missing structured data');
for (const [, json] of structuredData) JSON.parse(json);
console.log('Validated entrypoint, local assets, section anchors, and metadata.');
