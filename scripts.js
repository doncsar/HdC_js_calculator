const previousOperationText = document.querySelector('#previous-operation')
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#buttons-container button')

class Calculator {
   constructor(previousOperationText, currentOperationText) {
      this.previousOperationText = previousOperationText
      this.currentOperationText = currentOperationText
      this.currentOperation = ''
   }

   addDigit(digit) {
      if (digit === '.' && this.currentOperation.includes('.')) {
         return
      }

      this.currentOperation += digit
      this.updateScreen()
   }

   processOperation(operation) {
      if (this.currentOperationText.innerText === '' && operation !== 'C') {
         if (this.previousOperationText.innerText !== '') {
            this.changeOperation(operation)
         }
         return
      }

      let operationValue
      let previous = +this.previousOperationText.innerText.split(' ')[0]
      let current = +this.currentOperationText.innerText

      switch (operation) {
         case '+':
            operationValue = previous + current
            this.updateScreen(operationValue, operation, current, previous)
            break
         case '-':
            operationValue = previous - current
            this.updateScreen(operationValue, operation, current, previous)
            break
         case '*':
            operationValue = previous * current
            this.updateScreen(operationValue, operation, current, previous)
            break
         case '/':
            if (current === 0) {
               console.error('Cannot divide by zero!')
               return
            }
            operationValue = previous / current
            this.updateScreen(operationValue, operation, current, previous)
            break
         case 'DEL':
            this.processDelOperator()
            break
         case 'CE':
            this.processClearCurrentOperator()
            break
         case 'C':
            this.processClearOperator()
            break
         case '=':
            this.processEqualOperator()
            break
         default:
            return
      }
   }

   updateScreen(
      operationValue = null,
      operation = null,
      current = null,
      previous = null
   ) {
      if (operationValue === null) {
         this.currentOperationText.innerText += this.currentOperation
      } else {
         operationValue = previous === 0 ? current : operationValue
         this.previousOperationText.innerText = `${
            Number.isInteger(operationValue)
               ? operationValue
               : operationValue.toFixed(2)
         } ${operation}`
         this.currentOperationText.innerText = ''
      }
   }

   changeOperation(operation) {
      const mathOperations = ['*', '-', '+', '/']

      if (!mathOperations.includes(operation)) {
         return
      }

      this.previousOperationText.innerText =
         this.previousOperationText.innerText.slice(0, -1) + operation
   }

   processDelOperator() {
      this.currentOperationText.innerText =
         this.currentOperationText.innerText.slice(0, -1)
   }

   processClearCurrentOperator() {
      this.currentOperationText.innerText = ''
   }

   processClearOperator() {
      this.currentOperationText.innerText = ''
      this.previousOperationText.innerText = ''
   }

   processEqualOperator() {
      let operation = this.previousOperationText.innerText.split(' ')[1]

      this.processOperation(operation)
   }
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
   btn.addEventListener('click', (e) => {
      const value = e.target.innerText

      if (+value >= 0 || value === '.') {
         calc.addDigit(value)
      } else {
         calc.processOperation(value)
      }
   })
})
