// typing animation

const text="DevOps • Cloud • Development • Automation";
let i=0;

function typing(){

if(i<text.length){
document.getElementById("typing").innerHTML+=text.charAt(i);
i++;
setTimeout(typing,70);
}

}

typing();


// animated counters

const counters=document.querySelectorAll('.counter');

counters.forEach(counter=>{

let target=+counter.innerText;
let count=0;
let increment=target/100;

let update=setInterval(()=>{

count+=increment;

if(count>=target){
counter.innerText=target;
clearInterval(update);
}
else{
counter.innerText=Math.floor(count);
}

},20)

});


// particles background

particlesJS("particles-js",{
particles:{
number:{value:70},
color:{value:"#6366f1"},
line_linked:{enable:true},
size:{value:3}
}
});
