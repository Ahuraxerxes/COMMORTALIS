const dice = document.querySelectorAll('.die');
const rollButton = document.getElementById('roll-button');
const modifierSelect = document.getElementById('modifier-select');
const strengthButton = document.getElementById('strength-button');
const weaknessButton = document.getElementById('weakness-button');
const total = document.getElementById('total');

let modifier = '';
let strengthUsed = false;
let weaknessUsed = false;

modifierSelect.addEventListener('change', () => {
    modifier = modifierSelect.value;
    updateTotal();
});

rollButton.addEventListener('click', () => {
    const symbols = ['+', '-', ''];
    dice.forEach(die => {
        const result = Math.floor(Math.random() * 3);
        die.textContent = symbols[result];
    });

    strengthButton.disabled = !hasMinus();
    weaknessButton.disabled = !hasPlus();
    strengthUsed = false;
    weaknessUsed = false;

    updateTotal();
});

strengthButton.addEventListener('click', () => {
    if (!strengthUsed) {
        const minusDice = Array.from(dice).filter(die => die.textContent === '-');
        if (minusDice.length > 0) {
            const index = Math.floor(Math.random() * minusDice.length);
            const result = Math.floor(Math.random() * 3);
            minusDice[index].textContent = ['+', '-', ''][result];
            strengthUsed = true;
            strengthButton.disabled = true;
            updateTotal();
        }
    }
});

weaknessButton.addEventListener('click', () => {
    if (!weaknessUsed) {
        const plusDice = Array.from(dice).filter(die => die.textContent === '+');
        if (plusDice.length > 0) {
            const index = Math.floor(Math.random() * plusDice.length);
            const result = Math.floor(Math.random() * 3);
            plusDice[index].textContent = ['+', '-', ''][result];
            weaknessUsed = true;
            weaknessButton.disabled = true;
            updateTotal();
        }
    }
});

function hasPlus() {
    return Array.from(dice).some(die => die.textContent === '+');
}

function hasMinus() {
    return Array.from(dice).some(die => die.textContent === '-');
}

function updateTotal() {
  let sum = 0;
  const count = { '+': 0, '-': 0 };
  dice.forEach(die => {
    const symbol = die.textContent;
    if (symbol === '+') {
      sum += 1;
      count['+'] += 1;
    } else if (symbol === '-') {
      sum -= 1;
      count['-'] += 1;
    }
  });
  if (modifier === '+') {
    sum += 1;
  } else if (modifier === '-') {
    sum -= 1;
  }

  total.textContent = `Total: ${sum}`;

  let text;
  switch (sum) {
    case 4:
      text = "This moment should be legendary. Discuss.";
      break;
    case 3:
      text = "The task is completed stylishly, but with a major benefit.";
      break;
    case 2:
      text = "The task is completed stylishly, but with a bonus.";
      break;
    case 1:
      text = "The task is completed stylishly.";
      break;
    case 0:
      text = "The task is completed.";
      break;
    case -1:
      text = "The task is completed sloppily.";
      break;
    case -2:
      text = "The task is completed sloppily, but with a setback.";
      break;
    case -3:
      text = "The task is completed sloppily, but with a major complication.";
      break;
    case -4:
      text = "This moment should live in infamy. Discuss.";
      break;
    default:
      text = "";
      break;
  }

  result.textContent = text;
}
