//all declarations

const selectLan = document.querySelectorAll("select")
const translateBtn = document.querySelector(".translate")
const fromText = document.querySelector(".from-text")
const toText = document.querySelector(".to-text")
const exchangeBtn = document.querySelector(".exchange")


//Setting up the languages and

selectLan.forEach((tag,id)=>{
    for (const country_code in countries) {
        let selected;
        if(id==0 && country_code == "en-GB"){
            selected = "selected"
        }else if (id==1 && country_code == "hi-IN") {
            selected = "selected"
        }
        let option = `<option value="${country_code}"${selected}>${countries[country_code]}</option>`
        tag.insertAdjacentHTML("beforeend",option)
    }
})

//exchanging the text 

exchangeBtn.addEventListener("click",()=>{
    let tempText = fromText.value
    let tempLang = selectLan[0].value
    selectLan[0].value = selectLan[1].value
    selectLan[1].value = tempLang
    fromText.value = toText.value
    toText.value = tempText

})

//getting the data from api and translating it

    translateBtn.addEventListener("click",()=>{
        let text = fromText.value
        translateFrom = selectLan[0].value
        translateTo  = selectLan[1].value
        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
        fetch(apiUrl).then(res => res.json()).then(data=>{
            console.log(data)
            toText.value = data.responseData.translatedText
        })
    })

fromText.addEventListener("keypress",function(e){
    if(e.key==="Enter"){
        e.preventDefault()
    }
})
