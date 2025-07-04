let input = document.querySelector("div input");
let list = document.querySelector("ul");
const add_task = () => {
  if (input.value != "") {
    let li = document.createElement("li");
    li.innerHTML = `
        <div class="flex justify-center items-center">
        <input type="checkbox" class="cursor-pointer w-5 h-5 accent-orange-500">
        </div>
        <p>${input.value}</p>
                        <span class="cursor-pointer hover:text-white transition-all duration-300 text-red-500 text-3xl">&times;</span>
    `;
    li.className =
      "bg-indigo-900 w-2xs min-h-14 rounded-2xl flex items-center px-2 justify-between";
    list.append(li);
    input.value = "";
    addevents(li);
  }
  savedata();
};
let addTask_btn = input.nextElementSibling;
addTask_btn.addEventListener("click", add_task);
input.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") {
    addTask_btn.click();
  }
});
const addevents = (li) => {
  let checkbox = li.querySelector("div input");
  let checkedTask = li.querySelector("p");
  let del = li.querySelector("span");
  if (!checkbox || !checkedTask || !del) return;
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      checkedTask.className = "line-through text-gray-400";
      checkbox.setAttribute("checked", "true");
    } else {
      checkedTask.classList.remove("line-through", "text-gray-400");
      checkbox.removeAttribute("checked");
    }
    savedata();
  });
  del.addEventListener("click", () => {
    del.parentElement.remove();
    savedata();
  });
};

const savedata = () => {
  localStorage.setItem("data", list.innerHTML);
};
const getdata = () => {
  let data = localStorage.getItem("data");
  list.innerHTML = data;
  let ALLli = list.querySelectorAll("li");
  for (const li of ALLli) {
    addevents(li);
  }
};
window.onload = getdata;
