

let listsInputs = []

const wrapper = document.querySelector('.search__input')
const inputBox = wrapper.querySelector('input')
const suggBox = wrapper.querySelector('.autocam__box')
const wrapperBox = document.querySelector('.wrapper__box')

const debounceInputBox = debounce(onClickSearch,300)


renderBox(listsInputs)
 

inputBox.onkeyup =(e)=>{
  
    let userData = e.target.value
      if (userData.length > 0) {
              debounceInputBox(userData) 
      }else{
        wrapper.classList.remove("activ")
        debounceInputBox(userData,true)

    }
}


function renderBox (listsInput) {
    let inputArray = listsInput
    inputArray = inputArray.map (({Repository,Name,Stars}) => {
      return `<div class="box__input">
            <div class="input__repository">Repository : ${Repository}</div>
            <div class="input__name">Name :  ${Name}</div>
            <div class="input__stars">Stars :  ${Stars}</div>
            <div  class="input__delete" ><i class =" fa fa-trash-o"></i></div>
            </div>`
    })
    wrapperBox.innerHTML = inputArray.join('') 
    let allListsInput = wrapperBox.querySelectorAll('.input__delete')
    for(i = 0; i < allListsInput.length; i++ ){
        let n = i
        allListsInput[i].onclick =  function() { 
            
                delete  listsInput[n]
               listsInputs = listsInput.filter(function (el) {
            return  el != ''
        })
         renderBox(listsInputs)  
    }
    }
}  

function renderSuggBox (emptyArray,err,arrayData) {
    emptyArray = emptyArray.map((data)=>{
      return `<li>${data}</li>`
    })
    wrapper.classList.add("activ")
    showLists(emptyArray)
    if (!err){
    let allList = suggBox.querySelectorAll('li')
    for(i = 0; i < allList.length; i++ ){

        let text ={}
        text = {Repository:arrayData[i].full_name,
            Name:arrayData[i].name,
            Stars:arrayData[i].stargazers_count,
            }
            
            arrayData[i]
        allList[i].onclick =  function () {
            listsInputs.push(text)
            inputBox.value = ""
            wrapper.classList.remove("activ")
            return renderBox(listsInputs)
        }    
    }
   }
}

 function debounce(func, ms) {
    let timeout
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), ms);
    };
}

 async  function onClickSearch (userData,stop = false) {
    if (stop) return
    lists = []
    let arrayData =  []
    let err, data
    //console.log(userData)
    try{
       let response = await fetch(`https://api.github.com/search/repositories?q=${userData}`)
         data = await response.json()
            if (data !== undefined) {
              for (i = 0;  i <= 4; i++ ){
            arrayData.push(data.items[i])
            lists.push(arrayData[i].full_name)
                }
                 err = false
                 return renderSuggBox (lists,err,arrayData)
                }
        }catch(e){
            let f = "Page no found"
           lists = ["ERROR : ",f]
          err = true
        return renderSuggBox (lists,err,arrayData)
      }
      }

function showLists(list){
    let listData;
    if (!list.length){
        listData = `<li>${inputBox.value}</li>`    
    }else{
        listData = list.join('') 
    }
      suggBox.innerHTML = listData
}