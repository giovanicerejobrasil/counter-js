const headerH1 = document.querySelector("header h1");
const result = document.querySelector("#result");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const contadoresSalvos = document.querySelector("#contadores-salvos");
const nameItem = document.querySelector("#name-item");
const saveItem = document.querySelector("#save-item");

class Counter {
  constructor() {
    this.localItems = this.getLocalItems();
    this.actualID = null;

    this.createListCounters();
  }

  getLocalItems() {
    return JSON.parse(localStorage.getItem("items")) ?? [];
  }

  setLocalItems(name) {
    this.localItems.push({
      id: (this.localItems.length ?? 0) + 1,
      name: name,
      result: 0,
    });

    this.saveItems();
  }

  saveItems() {
    localStorage.setItem("items", JSON.stringify(this.localItems));

    this.createListCounters();
  }

  createListCounters() {
    this.cleanListCounters();

    if (this.localItems === null) return;

    this.localItems.forEach((item, key) => {
      const div = document.createElement("div");

      div.classList.add("contadores-salvos");

      div.addEventListener("click", () => {
        this.actualID = item.id;
        headerH1.textContent = item.name;
        result.textContent = item.result;
      });

      const span = document.createElement("span");
      span.textContent = `#${key + 1} - ${item.name} | ${item.result}`;

      div.appendChild(span);
      contadoresSalvos.appendChild(div);
    });
  }

  setCounter(minus = false) {
    this.localItems.forEach((item, key) => {
      if (item.id === this.actualID) {
        if (minus) {
          this.localItems[key].result--;
        } else {
          this.localItems[key].result++;
        }
      }
    });
  }

  getCounter() {
    let result = 0;
    this.localItems.forEach((item) => {
      if (item.id === this.actualID) result = item.result;
    });

    return result;
  }

  cleanListCounters() {
    contadoresSalvos.querySelectorAll("*").forEach((child) => child.remove());
  }
}

const counter = new Counter();

plus.addEventListener("click", () => {
  console.log(counter.actualID);
  if (counter.actualID === null) {
    result.textContent = parseInt(result.textContent) + 1;
  } else {
    counter.setCounter();
    result.textContent = counter.getCounter();

    counter.saveItems();
  }
});

minus.addEventListener("click", () => {
  if (parseInt(result.textContent) == 0) return;

  if (counter.actualID === null) {
    result.textContent = parseInt(result.textContent) - 1;
  } else {
    counter.setCounter(true);
    result.textContent = counter.getCounter();

    counter.saveItems();
  }
});

saveItem.addEventListener("click", () => {
  if (nameItem.value === "") return;
  counter.setLocalItems(nameItem.value);
});
