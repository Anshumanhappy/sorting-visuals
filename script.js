let isSorting = false; 
const arrayContainer = document.getElementById('array-container');
function generateArray() {
    const array = [];
    for (let i = 0; i < 50; i++) {
        array.push(Math.floor(Math.random() * 200) + 50); 
    }
    return array;
}


function renderArray(array) {
  arrayContainer.innerHTML = '';
  array.forEach(value => {
      const bar = document.createElement('div');
      bar.classList.add('bar');
      bar.style.height = `${value}px`;

      const barNumber = document.createElement('span');
      barNumber.classList.add('bar-number');
      barNumber.textContent = value;

      bar.appendChild(barNumber);
      arrayContainer.appendChild(bar);
  });
}
function generateNewArray() {
    if (isSorting) {
        return; 
    }

    const newArray = generateArray();
    renderArray(newArray);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function bubbleSort(array) {
    const bars = document.querySelectorAll('.bar');
    isSorting = true;
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = '#e74c3c'; 
            bars[j + 1].style.backgroundColor = '#e74c3c'; 
            await delay(50);

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
                bars[j].querySelector('.bar-number').textContent = array[j];
                bars[j + 1].querySelector('.bar-number').textContent = array[j + 1];
            }

            bars[j].style.backgroundColor = '#3498db'; 
            bars[j + 1].style.backgroundColor = '#3498db'; 
        }
    }
    isSorting = false; 
    bars.forEach(bar => (bar.style.backgroundColor = '#2ecc71'));

}

async function selectionSort(array) {
    const bars = document.querySelectorAll('.bar');
    isSorting = true; 
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = '#e74c3c'; 
            await delay(50);

            if (array[j] < array[minIndex]) {
                minIndex = j;
            }

            bars[j].style.backgroundColor = '#3498db'; 
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]]; 
            bars[i].style.height = `${array[i]}px`;
            bars[minIndex].style.height = `${array[minIndex]}px`;
            bars[i].querySelector('.bar-number').textContent = array[i];
            bars[minIndex].querySelector('.bar-number').textContent = array[minIndex];
        }
    }
    isSorting = false; 
    bars.forEach(bar => (bar.style.backgroundColor = '#2ecc71'));

}
async function insertionSort(array) {
  const bars = document.querySelectorAll('.bar');
  if (!bars.length) return; 
  isSorting = true; 

  for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;

      bars[i].style.backgroundColor = '#e74c3c';
      await delay(50);

      while (j >= 0 && array[j] > key) {
          array[j + 1] = array[j];
          if (bars[j]) {
              bars[j + 1].style.height = `${array[j]}px`;
              bars[j + 1].querySelector('.bar-number').textContent = array[j];
          }
          j--;
      }

      array[j + 1] = key;
      if (bars[j + 1]) {
          bars[j + 1].style.height = `${key}px`;
          bars[j + 1].querySelector('.bar-number').textContent = key;
      }

      bars[i].style.backgroundColor = '#3498db'; 
  }

  isSorting = false; 

  bars.forEach(bar => (bar.style.backgroundColor = '#2ecc71'));
}


async function merge(array, left, right) {
  const bars = document.querySelectorAll('.bar');
  const mid = Math.floor((left + right) / 2);
  let i = left;
  let j = mid + 1;
  let tempArray = [];

  while (i <= mid && j <= right) {
      bars[i].style.backgroundColor = '#e74c3c'; 
      bars[j].style.backgroundColor = '#e74c3c'; 
      await delay(50); 

      if (array[i] <= array[j]) {
          tempArray.push(array[i]);
          bars[i].style.backgroundColor = '#3498db'; 
          i++;
      } else {
          tempArray.push(array[j]);
          bars[j].style.backgroundColor = '#3498db'; 
          j++;
      }
  }

  while (i <= mid) {
      tempArray.push(array[i]);
      bars[i].style.backgroundColor = '#3498db'; 
      i++;
  }

  while (j <= right) {
      tempArray.push(array[j]);
      bars[j].style.backgroundColor = '#3498db'; 
      j++;
  }

  for (let k = 0; k < tempArray.length; k++) {
      array[left + k] = tempArray[k];
      bars[left + k].style.height = `${array[left + k]}px`;
      bars[left + k].querySelector('.bar-number').textContent = array[left + k];
      bars[left + k].style.backgroundColor = '#3498db'; 
      await delay(50); 
  }
}

async function mergeSort(array, left = 0, right = array.length - 1) {
  const bars = document.querySelectorAll('.bar');
  if (left < right) {
      const mid = Math.floor((left + right) / 2);

      await mergeSort(array, left, mid);
      await mergeSort(array, mid + 1, right);

      await merge(array, left, right);
  }

  if (left === 0 && right === array.length - 1) {
      bars.forEach(bar => (bar.style.backgroundColor = '#2ecc71')); 
      isSorting = false;
  }
}


async function quickSort(array, low = 0, high = array.length - 1) {
  const bars = document.querySelectorAll('.bar');
  if (low < high) {
      let pivotIndex = await partition(array, low, high);
      await quickSort(array, low, pivotIndex - 1);
      await quickSort(array, pivotIndex + 1, high);
  }

  if (low === 0 && high === array.length - 1) {
      bars.forEach(bar => (bar.style.backgroundColor = '#2ecc71'));
      isSorting = false;
  }
}

async function partition(array, low, high) {
  const bars = document.querySelectorAll('.bar');
  let pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
      bars[j].style.backgroundColor = '#e74c3c'; 
      await delay(50);

      if (array[j] < pivot) {
          i++;
          [array[i], array[j]] = [array[j], array[i]];

          bars[i].style.height = `${array[i]}px`;
          bars[j].style.height = `${array[j]}px`;
          bars[i].querySelector('.bar-number').textContent = array[i];
          bars[j].querySelector('.bar-number').textContent = array[j];
      }
      bars[j].style.backgroundColor = '#3498db'; 
  }

  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  bars[i + 1].style.height = `${array[i + 1]}px`;
  bars[high].style.height = `${array[high]}px`;
  bars[i + 1].querySelector('.bar-number').textContent = array[i + 1];
  bars[high].querySelector('.bar-number').textContent = array[high];
  return i + 1;
}
const descriptions = {
  bubble: "BUBBLE SORT:repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. This algorithm has a time complexity of O(n²).",
  selection: "SELECTION SORT:divides the input list into two parts: the sublist of items already sorted and the remaining sublist of items to be sorted. It repeatedly selects the smallest element from the unsorted sublist and moves it to the sorted sublist. Time complexity: O(n²).",
  insertion: "INSERTION SORT:builds the sorted list one element at a time by repeatedly taking one element from the input data and finding its correct position in the sorted list. Time complexity: O(n²).",
  merge: "MERGE SORT:is a divide-and-conquer algorithm that divides the list into two halves, recursively sorts them, and then merges the sorted halves back together. Time complexity: O(n log n).",
  quick: "QUICK SORT:is a divide-and-conquer algorithm that selects a pivot element and partitions the array around the pivot, placing smaller elements before the pivot and larger elements after. It then recursively sorts the partitions. Time complexity: O(n log n).",
  default: "Select a sorting algorithm to see its description here."
};

function updateDescription(algorithm){
  const descriptionElement = document.getElementById('algorithm-description');
  descriptionElement.textContent = descriptions[algorithm] || descriptions.default;
}

async function startSorting(algorithm) {
    if (isSorting) {
        return; 
    }
    updateDescription(algorithm);

    const array = generateArray();
    renderArray(array);

    switch (algorithm) {
        case 'bubble':
            await bubbleSort(array);
            break;
        case 'selection':
            await selectionSort(array);
            break;
        case 'insertion':
            await insertionSort(array);
            break;
        case 'merge':
            await mergeSort(array);
            break;
        case 'quick':
            await quickSort(array);
            break;
        default:
            break;
    }
}

window.onload = () => {
    generateNewArray(); 
};