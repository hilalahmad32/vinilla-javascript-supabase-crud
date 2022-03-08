const key = "";

const url = "";

const database = supabase.createClient(url, key);

let save = document.querySelector("#save");
save.addEventListener("click", async (e) => {
    e.preventDefault();
    let name = document.querySelector("#name").value;
    let age = document.querySelector("#age").value;
    let country = document.querySelector("#country").value;
    save.innerText = "Saveing....";
    save.setAttribute("disabled", true);
    let res = await database.from("students").insert({
        name: name,
        age: age,
        country: country
    })
    if (res) {
        alert("Student Add Successfully")
        save.innerText = "Save"
        save.setAttribute("disabled", false);
        name = "";
        age = "";
        country = "";
        getStudent();
        getTotalCount();


    } else {
        alert("Student Not Add Successfully")
        save.innerText = "Save"
        save.setAttribute("disabled", false);
    }
})

const getStudent = async () => {
    let tbody = document.getElementById("tbody");
    let loading = document.getElementById("loading");
    let tr = "";
    loading.innerText = "Loadding...."
    const res = await database.from("students").select("*");
    if (res) {
        for (var i in res.data) {
            tr += `<tr>
         <td>${parseInt(i) + 1}</td>
         <td>${res.data[i].name}</td>
         <td>${res.data[i].age}</td>
         <td>${res.data[i].country}</td>
         <td><button class="btn btn-primary" data-bs-toggle="modal"
         onclick='editStudent(${res.data[i].id})' data-bs-target="#editModel">Edit</button></td>
         <td><button onclick='deleteStudent(${res.data[i].id})' class="btn btn-danger">Delete</button></td>
         </tr>`;
        }
        tbody.innerHTML = tr;
        loading.innerText = ""

    }

}

getStudent();

const getTotalCount = async () => {
    let total = document.querySelector("#total");
    const res = await database.from("students").select("*", { count: "exact" });
    total.innerText = res.data.length;
}

getTotalCount();

const editStudent = async (id) => {


    const res = await database.from("students").select("*").eq("id", id);
    if (res) {
        document.getElementById("id").value = res.data[0].id;
        document.getElementById("edit-name").value = res.data[0].name;
        document.getElementById("edit-age").value = res.data[0].age;
        document.getElementById("edit-country").value = res.data[0].country;
    }
}

const update = document.getElementById("update");

update.addEventListener("click", async () => {
    let id = document.getElementById("id").value;
    let name = document.getElementById("edit-name").value
    let age = document.getElementById("edit-age").value;
    let country = document.getElementById("edit-country").value;
    update.innerText = "Updateing...."
    update.setAttribute("disabled", true);
    const res = await database.from("students").update({
        name, age, country
    }).eq("id", id)

    if (res) {
        alert("Student Update Successfully")
        update.innerText = "Update"
        update.setAttribute("disabled", false);
        name = "";
        age = "";
        country = "";
        getStudent();
        getTotalCount();

    } else {
        alert("Student Not Update Successfully")
        update.innerText = "Update"
        update.setAttribute("disabled", false);
    }
})


const deleteStudent = async (id) => {
    const res = await database.from("students").delete().eq("id", id)

    if (res) {
        alert("Delete successfully")
        getStudent();
        getTotalCount();

    } else {
        alert("Delete successfully")
    }
}