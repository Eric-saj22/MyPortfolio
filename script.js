function toggleMenu(){
    const menuToggle = document.querySelector(".menu");
    const navigation = document.querySelector(".hamburger-icon");
    menuToggle.classList.toggle("open");
    navigation.classList.toggle("open");
}