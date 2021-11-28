//creating container
let container = document.createElement("div")
container.classList.add("container")
document.body.append(container)
container.style.cssText = "width: 60%; margin:100px auto"

//creating form consisits of two inputs
let mainForm = document.createElement("form")
container.append(mainForm)
mainForm.style.cssText = "width:80%; margin:20px auto; display:flex; justify-content:center; align-items:center; gap:20px"

//creating input to use it in adding classes
let addInput = document.createElement("input")
addInput.setAttribute("placeholder","Add Classes")
mainForm.append(addInput)
addInput.style.cssText = "width:48%; padding:15px; font-size:22px"

//creating input to use it in removig classes
let removeInput = document.createElement("input")
removeInput.setAttribute("placeholder","Remove Classes")
mainForm.append(removeInput)
removeInput.style.cssText = "width:48%; padding:15px; font-size:22px"

//creating mid div element to attatch classes to it
let currElement = document.createElement("div")
let currElementText = document.createTextNode("Current Element")
currElement.append(currElementText)
container.append(currElement)
currElement.style.cssText = "width:80%; background-color:#ddd; text-align:center; padding: 15px 0; margin:auto; font-size:22px; font-weight:bold"

//creating div which will contain header and another div for span
let currElementClassLists = document.createElement("div")
let currElementClassListsHeading = document.createElement("h2")
let currElementClassListsText = document.createTextNode("Current Element Class Lists")
currElementClassListsHeading.append(currElementClassListsText)
currElementClassLists.append(currElementClassListsHeading)
currElementClassListsHeading.style.cssText = "margin: 10px; font-size:18px"
container.append(currElementClassLists)
currElementClassLists.style.cssText = "width:80%; min-height:80px; background-color:#ddd; text-align:left; padding: 15px 0; margin: 15px auto; font-size:20px; font-weight:bold"

//creating div which will recieve all classes as spans
let classesresult = document.createElement("div")
classesresult.classList.add("result")
currElementClassLists.append(classesresult)
classesresult.style.cssText = "text-align:center"

//checkin the empty of spans first to show up the message
if(document.querySelectorAll("span").length === 0){
  var noElement = document.createElement("h5")
  var noElementText = document.createTextNode(`There is No Classes Here`)
  noElement.id = "remove-me"
  noElement.append(noElementText)
  classesresult.append(noElement)
}    
// declaring two arrays ine for recieving from input and other for sorting and creating span
    var inputClasses = []
    var resultClasses = []

// adding event to input used to add classes    
addInput.addEventListener("blur", function(){

  if(addInput.value !== ""){ //checking if input empty or not

    document.getElementById("remove-me").style.display = "none" //making the message disappear
    
    inputClasses = addInput.value.toLowerCase().split(" ") //creating array of words

    for(let i = 0; i< inputClasses.length; i++){ //pushing elements from last array to another array to sort it
      resultClasses.push(inputClasses[i])}

    resultClasses = resultClasses.sort() //sorting

    //making sure there is no element from last try .. to avoid repeating of created elements each time
    document.querySelectorAll("span").forEach((a)=>a.remove())

    resultClasses.forEach(function(a){ //creating spans according array elements

      currElement.classList.add(a) //updating classlist with added classes

      //creating spans
      let squareClass = document.createElement("span")
      let squareClassText = document.createTextNode(`${a}`)
      squareClass.append(squareClassText)
      classesresult.append(squareClass)
      squareClass.style.cssText = "background-color: #FC6C00; padding: 5px; margin:10px 3px; border-radius: 5px"
      })
      addInput.value = "" //making input empty
  }else{
    alert("Please Don't leave the input empty") // message to pprevent leaving the input empty
  }
})

// Deleting classes process
removeInput.addEventListener("blur", function(){

  //declaring array of classes to remove
  var removeClasses = removeInput.value.toLowerCase().split(" ")
  
  //using higher order func to handle each class wanted to be removed
  removeClasses.forEach(function(ele){

    currElement.classList.remove(ele) // removing classes from classlist

    // IMPORTANT removing each class wanted to be removed from the array used to print them to avoid re printing them again 
    resultClasses = resultClasses.filter((a)=> a!==ele) 

    let spans = document.querySelectorAll("span")     // declaring variable for all spans

    //removing spans which have textcontent equal to classes wanted to be removed
    spans.forEach(function(a){
      a.textContent === `${ele}`?a.remove():""
    })
  })

  // making the input value clear each time
  removeInput.value = ""
  
  //checking if there is no spans after removing some classes to appear the message or not
  if(document.getElementById("remove-me").nextElementSibling === null){
    document.getElementById("remove-me").setAttribute("style","display:block")  
  }  
})
