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
 window.addEventListener('scroll',checkIfInView);
 function checkIfInView(){
     for(let y=0;y<container.length;y++){
         let topScreen=container[y].getBoundingClientRect().top;
         let currentScrollBe=window.pageYOffset;
         console.log(`${container[y]} current container section`)
         let totalTopScreen=topScreen+window.pageYOffset;
         let bottomScreen=container[y].getBoundingClientRect().bottom;
         let totalBottomScreen=bottomScreen+window.pageYOffset;
         let cost=container[y].getAttribute('class');
         if((currentScrollBe<totalBottomScreen)&&(currentScrollBe>=totalTopScreen)){
             console.log(` current scroll${currentScrollBe}`);
             console.log(`the top ${totalBottomScreen} for ${cost}`);
             console.log(` the bottom ${totalBottomScreen} for ${cost}`);
             container[y].classList.add('green');
             console.log(container);
         }
         else{
             container[y].classList.remove('green');
             console.log(container);
         }
     }
 }