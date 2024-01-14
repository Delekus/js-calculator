//Переменная для записи вводимого 
let value = [];
//массив с мат. операторами для сравнения
let arrOperator = ['-', '+', '*', '/'];
//Флаг для избежания повторной записи мат. оператора
let flag = false;
//Переменная для значения на экране калькулятора
const inputScreen = document.querySelector('#counter');
//Функция очистки 
function clearScreen() {
	value = [];
	inputScreen.value = '0';
}

//Функция добавления на экран нажатых кнопок
function addNumbersToScreen(num) {
	//Если в поле ввода только 0 и вводимы символ не точка, заменять ноль на вводимое значение
	if (inputScreen.value === '0' && !(num === '.')) {
		inputScreen.value = num;
		return;
	}
	//Если вводимое значение точка, а точка уже имеется, то выходить из функции
	else if (num === '.' && inputScreen.value.includes('.')) {
		return;
	}
	//Если последнее вводимое значение математический оператор, а вводиое значение точка
	else if (flag && num ==='.') {
		flag = false;
		value.push(inputScreen.value);
		inputScreen.value = '0' + num;
	}
	//Если последнее вводимое значение математический оператор, то выполнить
	else if (flag) {
		flag = false;
		value.push(inputScreen.value);
		inputScreen.value = num;
	}
	//Добавлять вводимое значение к имеющемся
	else {
		inputScreen.value += num;
	}
}

function addOperatorsToScreen(operator) {
	if (flag) {
		return;
	}
	else {
		value.push(inputScreen.value);
		inputScreen.value = operator;
		flag = true;
	}
}
//  [2, +, 2]
function calculate() {
	//Проверяет последнее введенное значение, если число - добавить в массив значений
	if (isFinite(inputScreen.value)) {
		value.push(inputScreen.value);
	}

	let result = 0;
	//Первое значение массива преобразуем в число - начальное значение result
  result = parseFloat(value[0]);
	//Перебор массива, нечетные - операторы, четные - числа
  for (let i = 1; i < value.length; i += 2) {
    const operator = value[i];
    const operand = parseFloat(value[i + 1]);
    if (operator === '+') {
      result += operand;
    } else if (operator === '-') {
      result -= operand;
    } else if (operator === '*') {
      result *= operand;
    } else if (operator === '/') {
      result /= operand;
    }
  }
	//Обнуялем массив с введенными значениями 
	value.length = 0;
	//Выводим резульат на экран
	inputScreen.value = result;
  return result;
}

