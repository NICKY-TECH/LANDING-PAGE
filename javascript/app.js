let menu = document.querySelector('#menu');
let store = document.querySelector('.yam');
let container = document.querySelectorAll('section');
let logo = document.querySelector('.logo');
// fragment is a document fragment
let fragment = new DocumentFragment();
for (let i = 0; i < 4; i++) {
    let link = document.createElement('a');
    let li = document.createElement('li');
    let sectionClassName = container[i].getAttribute('class');
    link.setAttribute('href', `${sectionClassName}`);
    link.innerHTML = `${sectionClassName}`;
    link.style.textDecoration = "none";
    link.style.marginRight = "8px";
    link.style.color = "white";
    link.style.fontSize = "20px";
    link.style.fontWeight = "bold";
    li.append(link);
    li.style.listStyleType = "none";
    fragment.append(li);

}
menu.append(fragment);
let allLinks=document.querySelectorAll('a');
// adds an event listener to the parent Element
menu.addEventListener('click', activate);

function activate(event) {
    // prevents the default link event from occurring
    event.preventDefault();
    event.stopPropagation();
    let targetedEvent = event.target;
    let targetedEventLink = targetedEvent.getAttribute('href');
    // i used the javascript MutationObserver feature to monitor changes in the class name of the element
    let observer = new MutationObserver(changeInState);
    const obj = {
        childList: true,
        attribute: true,
        attributeOldValue: true,
        attributFilter: ['class']
    }
    let orange;
    observer.observe(store, obj);
    store.setAttribute('class', `${targetedEventLink}`);

    function changeInState(record) {
        for (let mute of record) {
            if (mute.type === "attributes") {
                orange = mute.oldValue;
                console.log(orange);
                console.log(record);
                break;

            }

        }
        // the for loop monitors the container array containing the section elements
        for (let i = 0; i < container.length; i++) {
            let classOfSection = container[i].getAttribute('class');
            if (orange == classOfSection) {
                container[i].style.backgroundColor = "black";
            }
        }


    }
    // changes the background-color of the selected link and places the section in view
    for (let j = 0; j < container.length; j++) {
        let colorSection = container[j].getAttribute('class');
        if (targetedEventLink === colorSection) {
            container[j].style.backgroundColor = "#333333";
            let options={
                behavior:"smooth",
                block:"end",
                inline:"nearest"
            }
            container[j].scrollIntoView(options);

        }
    }

}
let currentX;
let currentY;
let linkContainer=document.querySelectorAll('a');
window.addEventListener('scroll',checkIfInView);
function checkIfInView(){
   let windowHeight=window.innerHeight;  
   let windowWidth=window.innerWidth;
   for(let a=0;a<container.length;a++){
      for(let b=0;b<allLinks.length;b++){
        let theClassOfTheActiveSection=container[a].getAttribute('class');
        let theHrefofLink=allLinks[b].getAttribute('href');
          if(theClassOfTheActiveSection===theHrefofLink){
        let currentValues=container[a].getBoundingClientRect();
        let newTopValue=currentValues.top;
        let newBottomValue=currentValues.bottom;
        let newRightValue=currentValues.right;
        let newLeftValue=currentValues.left;
        if((newTopValue>=0)&&(newLeftValue>=0)&&(newBottomValue<=windowHeight)&&(newRightValue<=windowWidth)){
            container[a].classList.add('green');
            allLinks[b].classList.add('green');
        }
        else{
            container[a].classList.remove('green');
            allLinks[b].classList.remove('green'); 
        }
        
        
      
    }
    }

} 
}