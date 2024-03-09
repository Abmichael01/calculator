const numbers = document.querySelectorAll(".number")
const screen1 = document.querySelector(".screen1")
const screen2 = document.querySelector(".screen2")
const backspace = document.querySelector(".backspace")
const operators = document.querySelectorAll(".operator")
const ce = document.querySelector(".ce")
const c = document.querySelector(".c")
const fac = document.querySelector(".fac")
const oneOverX = document.querySelector(".oneOverX")
const xRaiseTwo = document.querySelector(".xRaiseTwo")
const percent = document.querySelector(".percent")

const operators_list = ["-", "+", "/", "*"]
var screen2_value_changed = false



ce.addEventListener("click", ()=>{
    last_screen1_char = screen1.textContent.trim()[screen1.textContent.length - 1]
    if(last_screen1_char == "=" && screen2.textContent.length > 0){
        screen1.textContent = ""
        screen2.textContent = "0"
    }else{
        screen2.textContent = "0"
    }
})

c.addEventListener("click", ()=>{
        screen1.textContent = ""
        screen2.textContent = "0"
})

percent.addEventListener("click", ()=>{
    if(operators_list.includes(last_screen1_char) || screen2_value_changed == false){
        expression = screen1.textContent + screen2.textContent + "/100"
        answer = eval(expression)
        screen1.textContent = expression  + "="
        screen2.textContent = formatResult(answer)

    
    }else{
        expression =  screen2.textContent + "/100"
        answer = eval(expression)
        screen1.textContent = expression  + "="
        screen2.textContent = formatResult(answer)
    }
})

xRaiseTwo.addEventListener("click", ()=>{
    if(operators_list.includes(last_screen1_char) || screen2_value_changed == false){
        expression = screen1.textContent + screen2.textContent + "**2"
        answer = eval(expression)
        screen1.textContent = expression  + "="
        screen2.textContent = formatResult(answer)

    
    }else{
        expression =  screen2.textContent + "**2"
        answer = eval(expression)
        screen1.textContent = expression  + "="
        screen2.textContent = formatResult(answer)
    }
})

oneOverX.addEventListener("click", ()=>{
    if(operators_list.includes(last_screen1_char) || screen2_value_changed == false){
        expression = screen1.textContent + "1/" + screen2.textContent
        answer = eval(expression)
        screen1.textContent = expression + "="
        screen2.textContent = formatResult(answer)

    
    }else{
        expression = "1/" + screen2.textContent
        answer = eval(expression)
        screen1.textContent = expression  + "="
        screen2.textContent = formatResult(answer)
    }
})

fac.addEventListener("click", ()=>{

    function factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        }
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    last_screen1_char = screen1.textContent.trim()[screen1.textContent.length - 1]

    if(operators_list.includes(last_screen1_char)){
        init_exp = screen1.textContent
        answer = factorial(Number(screen2.textContent))
        expression = init_exp + answer
        answer = eval(expression)
        screen1.textContent = init_exp + screen2.textContent + "!"
        screen2.textContent = formatResult(answer)
        

    }else{
        answer = factorial(Number(screen2.textContent))
        screen1.textContent = screen2.textContent + "!"
        screen2.textContent = formatResult(answer)
    }
    
   
})


numbers.forEach(number=>{
    number.addEventListener("click", (e)=>{
        last_screen1_char = screen1.textContent.trim()[screen1.textContent.length - 1]
        clicked = e.target
        
        if(last_screen1_char == "=" || last_screen1_char == "!"){
            screen1.textContent = ""
            
            if(clicked.textContent == "."){
                screen2.textContent = "0"
            }else{
                screen2.textContent = ""
            }
            screen2.textContent = screen2.textContent + clicked.textContent

        }else if(screen2.textContent === "0" || (operators_list.includes(last_screen1_char) && screen2_value_changed == false)){
            if(clicked.textContent == "."){
                screen2.textContent = screen2.textContent + clicked.textContent
            }else{
                screen2.textContent = clicked.textContent
            }
            
            screen2_value_changed = true
        }else{
            
            if(screen2.textContent.length <= 10){
                screen2.textContent = screen2.textContent + clicked.textContent
            }
            screen2_value_changed = true
        }
        
        
    })
})



backspace.addEventListener("click", ()=>{
    last_screen1_char = screen1.textContent.trim()[screen1.textContent.length - 1]

    if(last_screen1_char == "="){
        screen1.textContent = ""
    }else if(operators_list.includes(last_screen1_char)){
        screen2.textContent = screen2.textContent
    }
    else if(screen2.textContent.length === 1){
        screen2.textContent = "0"
    }else{
        screen2.textContent = screen2.textContent.slice(0, -1)
    } 
})

function formatResult(result) {
   
    let formattedResult = result.toString();

    if (formattedResult.length > 10) {
        formattedResult = result.toExponential(6)
    }
    return formattedResult;
}

operators.forEach(operator=>{
    operator.addEventListener("click", (e)=>{
        clicked = e.target
        last_screen1_char = screen1.textContent.trim()[screen1.textContent.length - 1]
        if(screen2_value_changed &&  screen1.textContent.length != 0){
            if(last_screen1_char == "!"){
                screen1.textContent = ""
            }
            expression = screen1.textContent + screen2.textContent
            answer = eval(expression)
            
            if(clicked.textContent == "="){
                screen1.textContent = expression + clicked.textContent
                screen2.textContent = formatResult(answer)
            }else{
                screen1.textContent = formatResult(answer) + clicked.textContent
                screen2.textContent = formatResult(answer)
            }
            screen2_value_changed = false
        }else{
            if(last_screen1_char == "=" || last_screen1_char == "!"){
                screen1.textContent = screen1.textContent.slice(0, -1)
            }
            
            if(screen1.textContent = screen2.textContent){
                expression = screen1.textContent
                answer = eval(expression)
            }else{
                expression = screen1.textContent + screen2.textContent
                answer = eval(expression)
            }
            
            if(clicked.textContent == "="){
                screen1.textContent = expression + clicked.textContent
                screen2.textContent = formatResult(answer)
            }else{
                screen1.textContent = screen2.textContent + operator.textContent
            }
            screen2_value_changed = false
        }
        
    })
})
