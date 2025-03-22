import './select/style.scss'

let lists = ["UP","left","Right","down","dEnd"]
const wrapper = document.querySelector('.search__input')
const inputBox = wrapper.querySelector('input')
const suggBox = wrapper.querySelector('.autocam__box')
const icon = wrapper.querySelector('.icon')

const debounceInputBox = debounce(onClickSearch,1000)

inputBox.onkeyup =(e)=>{
   
    let userData = e.target.value
    let emptyArray 
      if (userData.length >=3) {

        debounceInputBox(userData) 
    
     
    }else{
        wrapper.classList.remove("activ")
    }
}

function renderSuggBox (lists) {
    emptyArray = lists
    emptyArray = emptyArray.map((data)=>{
      return `<li>${data}</li>`
    })
    wrapper.classList.add("activ")
    showLists(emptyArray)
    

   let allList = suggBox.querySelectorAll('li')
    for(i = 0; i < allList.length; i++ ){
        let text = allList[i].textContent
        allList[i].onclick =  () => inputBox.value = text    
    }
}

 function debounce(func, ms) {
    let timeout
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), ms);
    };
}

async function onClickSearch (userData) {
    lists = []
    let query = userData
    console.log(query)  
    let response = await fetch(`https://api.github.com/search/repositories?q=${query}`)  
    let data = await response.json()
   
    console.log(data)
    let arrayData = []

    for(i = 0; i < 5; i++ ){
        arrayData.push(data.items[i])
        lists.push(arrayData[i].full_name)
       }

       console.log(lists)
       return renderSuggBox (lists)


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