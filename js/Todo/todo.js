document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("inputbox");
    const button = document.getElementById("add");
    const historyList = document.getElementById("historyList");
    let index = 0;

    button.addEventListener("click", function (e) {
      e.preventDefault(); // ⬅️ 꼭 필요함!
  
      const content = input.value.trim();
      if (content === "") return;
    
      const checkbox = document.createElement("input");
      checkbox.type="checkbox";
      const listItem = document.createElement("li");
      const text = document.createTextNode(`${index + 1}. 할 일: ${content}`);
      
      const delList = document.createElement('button');
      delList.textContent = "삭제";
      delList.style.marginLeft = "8px";
      delList.style.padding = "4px 8px";
      delList.style.fontSize = "14px";
      delList.style.cursor = "pointer";

    delList.addEventListener("click", () =>{
        historyList.removeChild(listItem);
    })
    checkbox.addEventListener("change", () => {
        checkbox.checked ? (listItem.style.textDecoration = "line-through") : (listItem.style.textDecoration = "none");
    })

          // 📦 4. li에 체크박스 + 텍스트 추가
    listItem.appendChild(checkbox);
    listItem.appendChild(text);
    listItem.appendChild(delList);
    //   listItem.textContent = `할 일: ${content}`;
      historyList.appendChild(listItem);
      input.value = "";
    });
  });
  