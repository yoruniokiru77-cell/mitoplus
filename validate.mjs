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
console.log('Validated entrypoint, local assets, section anchors, and metadata.');
