import "./styles/index.css"

function createClothingsLi(id) {
  const li = document.createElement("li")
  li.id = `clothing-${id}`
  return li
}

function createClothingsImage(clothings) {
  const image = document.createElement("img")
  image.src = clothings.image 
  image.alt = clothings.title
  return image
}

function createClothingsTitle(name) {
  const title = document.createElement("p")
  title.textContent = name
  return title
}

function createClothingsPrice(number) {
  const price = document.createElement("p")
  price.textContent = `R$${number}`
  return price
}

function createClothingsBtnEdit(clothings) {
  const edit = document.createElement("button")
  edit.classList.add("edit")
  edit.textContent = "Editar"
  edit.addEventListener("click", () => {
    document.querySelector("#id").value = clothings.id
    document.querySelector("#title").value = clothings.title
    document.querySelector("#price").value = clothings.price
    document.querySelector("#image").value = clothings.image
  })
  return edit
}

function createClothingsBtnDelete(id) {
  const del = document.createElement("button")
  del.classList.add("delete")
  del.textContent = "Deletar"
  del.addEventListener("click", async () => {
    await fetch(`http://localhost:3000/clothings/${id}`, { method: "DELETE" })
    document.querySelector(`#clothing-${id}`).remove()
  })
  return del
}

async function fetchClothings() {
  return await fetch("http://localhost:3000/clothings").then(result => result.json())
}

async function renderClothings(clothing) {
  const li = createClothingsLi(clothing.id)
  const img = createClothingsImage(clothing)
  const title = createClothingsTitle(clothing.title)
  const price = createClothingsPrice(clothing.price)
  const btnEdit = createClothingsBtnEdit(clothing)
  const btnDelete = createClothingsBtnDelete(clothing.id)

  li.append(img, title, price, btnEdit, btnDelete)
  document.querySelector("#clothings").append(li)
}


async function setup() {
  const clothings = await fetchClothings()
  clothings.forEach(renderClothings)
}

async function saveClothings(ev) {
  ev.preventDefault()

  const id = document.querySelector("#id").value
  const title = document.querySelector("#title").value
  const price = document.querySelector("#price").value
  const image = document.querySelector("#image").value

  console.log(id)

  if(id) {
    // edita uma roupa existente
    const response = await fetch(`http://localhost:3000/clothings/${id}`, {
      method: "PUT",
      body: JSON.stringify({title, price, image}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const savedClothing = await response.json()
    document.querySelector(`#clothing-${id}`).remove()
    renderClothings(savedClothing)
  } else {
    // cria uma nova roupa 
    const response = await fetch("http://localhost:3000/clothings", {
      method: "POST",
      body: JSON.stringify({title, price, image}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const savedClothing = await response.json()
    renderClothings(savedClothing)
  }

  ev.target.reset()
}


document.addEventListener("DOMContentLoaded", setup)
document.querySelector("form").addEventListener("submit", saveClothings)
