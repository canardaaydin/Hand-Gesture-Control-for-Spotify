// let changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', function(data) {
// 	changeColor.style.backgroundColor = data.color;
// 	changeColor.setAttribute('value', data.color);
// });

// changeColor.onclick = function(element) {
//     let color = element.target.value;
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       chrome.tabs.executeScript(
//           tabs[0].id,
//           {code: 'document.body.style.backgroundColor = "' + color + '";'});
//     });
//   };


console.clear();


var body = document.body;
var modal = createModal(document.getElementById("modal-1"));

modal.open();

function createModal(container) {
  console.log(container);
  var content = container.querySelector(".modal-content");
  var dialog = container.querySelector(".modal-dialog");
  var polygon = container.querySelector(".modal-polygon");
  var svg = container.querySelector(".modal-svg");
  
  var point1 = createPoint(45, 45);
  var point2 = createPoint(55, 45);
  var point3 = createPoint(55, 55);
  var point4 = createPoint(45, 55);
      
  var animation = new TimelineMax({    
      onReverseComplete: onReverseComplete,
      onStart: onStart,
      paused: true
    })     
    .to(point1, 0.3, {
      x: 15,
      y: 30,
      ease: Power4.easeIn
    }, 0)
    .to(point4, 0.3, {
      x: 5,
      y: 80,
      ease: Power2.easeIn
    }, "-=0.1")
    .to(point1, 0.3, {
      x: 0,
      y: 0,
      ease: Power3.easeIn
    })
    .to(point2, 0.3, {
      x: 100,
      y: 0,
      ease: Power2.easeIn
    }, "-=0.2")
    .to(point3, 0.3, {
      x: 100,
      y: 100,
      ease: Power2.easeIn
    })
    .to(point4, 0.3, {
      x: 0,
      y: 100,
      ease: Power2.easeIn
    }, "-=0.1")  
    .to(container, 1, {
      autoAlpha: 1
    }, 0)  
    .to(content, 1, {
      autoAlpha: 1
    })
  
  var modal = {
    animation: animation,
    container: container,
    content: content,
    dialog: dialog,    
    isOpen: false,
    open: open,
    close: close   
  };
  
  body.removeChild(container);
    
  function onClick() {
    
    if (modal.isOpen) {
      close();
    }
  }
  
  function onStart() {
    body.appendChild(container);
    container.addEventListener("click", onClick);
  }
  
  function onReverseComplete() {
    container.removeEventListener("click", onClick);
    body.removeChild(container);
  }
  
  function open() {
    modal.isOpen = true;
    animation.play().timeScale(2);
  }
  
  function close() {
    modal.isOpen = false;
    animation.reverse().timeScale(2.5);
  }
    
  function createPoint(x, y) {
    var point = polygon.points.appendItem(svg.createSVGPoint());
    point.x = x || 0;
    point.y = y || 0;
    return point;
  }
  
  return modal;
}