let expense_per_category = [0, 0, 0, 0, 0];
var count = 4;

update_sum();

function update_sum() {
    var sumElements = document.querySelectorAll(".sum");
    for (var i = 0; i < sumElements.length; i++) {
        sumElements[i].innerHTML = `${expense_per_category[i]} Rs. spent`;
    }
}

function add_expense() {
    var amount = document.getElementsByName("amount")[0].value;
    var date = document.getElementsByName("date")[0].value;
    var note = document.getElementsByName("note")[0].value;
    var category = document.getElementsByName("category")[0].selectedIndex;

    if (amount && date && note && category >= 0) {
        alert("Successfully added expense!");

        var table = document.getElementsByTagName("table")[0];
        var new_row = document.createElement("tr");
        new_row.innerHTML = `
            <td>${amount}</td>
            <td>${document.getElementsByName("category")[0].options[category].text}</td>
            <td>${date}</td>
            <td>${note}</td>
        `;
        table.appendChild(new_row);

        expense_per_category[category] += parseInt(amount);
        update_sum();
        console.log(count);

        document.getElementsByClassName("add-new-expense")[0].style.display = "none";
    } else {
        alert("Please enter all details!");
    }
}

function add_category() {
    var new_category_value = document.getElementsByName("new-category")[0].value;

    if (new_category_value) {
        var dropdown = document.getElementsByName("category")[0];
        var available_categories = document.getElementsByClassName("available-categories")[0];

        var new_category_option = document.createElement("option");
        new_category_option.innerHTML = `${new_category_value}`;
        dropdown.appendChild(new_category_option);

        count++;
        expense_per_category[count] = 0;

        var new_category_span = document.createElement("span");
        new_category_span.innerHTML = `${new_category_value} <span class="sum"> - ${expense_per_category[count]} Rs. spent</span>`;
        available_categories.appendChild(new_category_span);

        document.getElementsByClassName("add-category")[0].style.display = "none";
    }
}

function add_category_page() {
    var addCategoryForm = document.getElementsByClassName("add-category")[0];
    addCategoryForm.style.display = (addCategoryForm.style.display == "block") ? "none" : "block";
}

function add_expense_page() {
    var addExpenseForm = document.getElementsByClassName("add-new-expense")[0];
    addExpenseForm.style.display = (addExpenseForm.style.display == "block") ? "none" : "block";
}
