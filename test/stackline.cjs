const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),grunt=require('grunt');
const root=process.env.STACKLINE_TEST_PACKAGE || path.resolve(__dirname,'..');
const temp=path.resolve('tmp/stackline.folder.with.dots');fs.mkdirSync(temp,{recursive:true});
const source='var left=20;\nvar right=22;\nfunction add(a,b){return a+b;}\nvar answer=add(left,right);\n';
const input=path.join(temp,'input.js'),output=path.join(temp,'output.js');fs.writeFileSync(input,source);
require(path.join(root,'tasks/uglify.js'))(grunt);
grunt.initConfig({uglify:{contract:{options:{compress:false,mangle:false,sourceMap:true},files:{[output]:[input]}}}});
let complete=false;
grunt.tasks(['uglify:contract'],{gruntfile:false},function(){
 const js=fs.readFileSync(output,'utf8'),context={};vm.runInNewContext(js,context);assert.equal(context.answer,42);assert.equal(context.add(3,4),7);
 const map=JSON.parse(fs.readFileSync(output+'.map','utf8'));const SourceMapConsumer=require('source-map').SourceMapConsumer;const consumer=new SourceMapConsumer(map);
 const offset=js.indexOf('answer'),before=js.slice(0,offset).split('\n');const original=consumer.originalPositionFor({line:before.length,column:before[before.length-1].length});assert.equal(original.line,4);assert.equal(original.name,'answer');assert.match(original.source,/input\.js$/);
 complete=true;console.log('Packed uglify execution, source-map locations and dotted-directory contract passed');
});process.on('exit',()=>assert(complete));
