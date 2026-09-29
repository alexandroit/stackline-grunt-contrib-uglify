const assert=require('node:assert');
const path=require('node:path');
module.exports=function(grunt){
 grunt.registerTask('nodeunit','Run unchanged upstream assertions with Node assert',function(){
  const done=this.async();
  const files=grunt.file.expand('test/*_test.js');
  let count=0, assertions=0;
  async function suite(value,prefix){
   for(const [name,fn] of Object.entries(value)){
    if(typeof fn!=='function'){await suite(fn,prefix+name+'/');continue;}
    await new Promise((resolve,reject)=>{
     let expected=null,actual=0,finished=false;
     const timeout=setTimeout(()=>reject(new Error(prefix+name+' did not call done()')),15000);
     const t={expect:n=>{expected=n;},done:()=>{try{assert(!finished,'done called twice');finished=true;clearTimeout(timeout);if(expected!==null)assert.equal(actual,expected,'assertion count: '+prefix+name);resolve();}catch(e){reject(e);}}};
     for(const method of ['equal','notEqual','deepEqual','strictEqual','notStrictEqual','deepStrictEqual','ok','throws','doesNotThrow','ifError'])t[method]=(...args)=>{actual++;assertions++;return assert[method](...args);};
     try{fn(t);}catch(e){clearTimeout(timeout);reject(e);}
    });count++;
   }
  }
  (async()=>{for(const file of files)await suite(require(path.resolve(file)),file+':');assert(count>0);assert(assertions>0);grunt.log.ok(count+' original tests / '+assertions+' assertions passed');})().then(()=>done(),e=>{grunt.log.error(e.stack);done(false);});
 });
};
