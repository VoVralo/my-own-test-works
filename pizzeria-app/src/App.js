const openAbUs = document.getElementById("openModalAboutUs")
const closeAbUs = document.getElementById("closeModalAboutUs")
const modalAboutUs = document.getElementById("modalAboutUs")

openAbUs.addEventListener("click", () => {
   modalAboutUs.classList.add("open");
})

closeAbUs.addEventListener("click", () => {
   modalAboutUs.classList.remove("open");
})