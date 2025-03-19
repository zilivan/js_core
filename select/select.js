const getTemplate = (data = [], placeholder,selectId) => {
    let text = placeholder ?? 'ok'
    const items = data.map(item =>{
        let clas = ''
        if (item.id === selectId ){
            text = item.value
            clas = 'selected'
        }
    return`<li class="select__item  ${clas}"  data-type = "item" data-id = ${item.id}>${item.value}</li>`
    })
      return  `
<div class="select__backdrop" data-type="backdrop"></div>      
<div class="select__input" data-type="input">
<span  data-type = "value">${text}</span>
<i class="fa fa-angle-down" data-type="arroy"></i>
</div>
<div class="select__dropdone">
 <ul class="select__list">
      ${items.join('')}
  
 </ul>

</div>
`
}

export class Select {
    constructor (selector,options) {
           this.$el = document.querySelector(selector)
           this.options = options
           this.#render()
           this.#setup()
           this.selectId = options.selectId
    }

#render() {
    const {placeholder, data,selectId} = this.options
    this.$el.classList.add('select')
    this.$el.innerHTML = getTemplate(data,placeholder,selectId)
} 
#setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener('click', this.clickHandler)
    this.$arroy = this.$el.querySelector('[data-type="arroy"]')
    this.$value = this.$el.querySelector('[data-type="value"]')
}  

clickHandler(event){
 const {type,id}= event.target.dataset
    if(type === 'input'){
        this.toggle()
    }else if (type === 'item') {
    
    this.select(id)
    }else if (type === 'backdrop'){
    this.close()
    }
}
 get isOpen(){
    return this.$el.classList.contains('open')
}

get curent () {
     return this.options.data.find( item => item.id === this.selectId)
}
select(id){
    this.selectId = id
    this.$value.textContent = this.curent.value
    this.close()
    this.$el.querySelectorAll(`[data-type = "item"]`).forEach(el => {
       el.classList.remove('selected')
    });
    this.$el.querySelector(`[data-id = "${id}"]`).classList.add('selected') 
    this.options.onSelect ? this.options.onSelect(this.curent) : null
}


 toggle(){
   this.isOpen ? this.close() : this.open()
 }
 open() {
    this.$el.classList.add('open') 
    this.$arroy.classList.remove('fa-angle-down')
    this.$arroy.classList.add('fa-angle-up') 
    }


 close() {
    this.$el.classList.remove('open')
    this.$arroy.classList.remove('fa-angle-up')
    this.$arroy.classList.add('fa-angle-down') 

}  

destroy() {
    this.$el.removeEventListener('click',this.clickHandler)  
    this.$el.innerHTML = ''

}
}