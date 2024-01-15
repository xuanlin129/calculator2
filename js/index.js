const text = document.getElementById('text')
const btns = document.querySelectorAll('.tdc:not(#text)')
const list = document.querySelector('#list')
const clearBtn = document.querySelector('#clearBtn')

for (const btn of btns) {
  btn.addEventListener('click', () => {
    const btnText = btn.innerText
    const operators = ['+', '-', '*', '/', '.']
    const lastText = text.innerText[text.innerText.length - 1]
    // 如果按的鍵是 '='
    if (btnText === '=') {
      if (!operators.includes(btnText)) {
        for (let i = 0; i < operators.length - 1; i++) {
          if (text.innerText !== '0' && text.innerText.includes(operators[i])) {
            list.insertAdjacentHTML('afterbegin',
            `<li>${text.innerText} = ${eval(text.innerText)}</li>`
            )
          }
        }
        text.innerText = eval(text.innerText)
      }
    }
    // 如果按 C，歸 0
    else if (btnText === 'C') {
      text.innerText = '0'
    }
    // 如果現在是 0，按的是數字，把文字取代
    else if (text.innerText === '0' && !isNaN(parseInt(btnText))) {
      text.innerText = btnText
    }
    // 如果最後一個字是運算子
    else if (operators.includes(lastText)) {
      // 現在按的不是運算子，才加上去
      if (!operators.includes(btnText)) {
        text.innerText += btnText
      }
    }
    // 如果最後一個字不是運算子，加上去
    else {
      text.innerText += btnText
    }
  })
}

document.addEventListener('keydown', event => {
  const btnText = event.key
  const operators = ['+', '-', '*', '/', '.']
  const lastText = text.innerText[text.innerText.length - 1]
  // 如果按的鍵是 =
  if (btnText === '=' || btnText === 'Enter') {
    // 如果最後一個字不是運算子，才計算
    if (!operators.includes(lastText)) {
      for (let i = 0; i < operators.length - 1; i++) {
        if (text.innerText !== '0' && text.innerText.includes(operators[i])) {
          list.insertAdjacentHTML('afterbegin',
          `<li>${text.innerText} = ${eval(text.innerText)}</li>`
          )
        }
      }
      text.innerText = eval(text.innerText)
    }
  }
  // 如果按 C，歸 0
  else if (btnText === 'c') {
    text.innerText = '0'
  }
  // 如果現在是 0，按的是數字，把文字取代
  else if (text.innerText === '0' && !isNaN(parseInt(btnText))) {
    text.innerText = btnText
  }
  // 如果最後一個字是運算子
  else if (operators.includes(lastText)) {
    // 現在按的不是運算子，且是數字才加上去
    if (!operators.includes(btnText) && !isNaN(parseInt(btnText))) {
      text.innerText += btnText
    }
  }
  // 如果最後一個字不是運算子，且按的是數字或運算子，加上去
  else if (!isNaN(parseInt(btnText)) || operators.includes(btnText)) {
    text.innerText += btnText
  }
})

clearBtn.addEventListener('click', () => {
  list.innerHTML = ''
})
