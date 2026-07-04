const typing = document.getElementById("typing");

const titles = JSON.parse(typing.dataset.titles);

let title = 0;

let character = 0;

let deleting = false;


const cards = document.querySelectorAll(".service-card");
const content = document.getElementById("service-content");

// Hide content by default
content.style.display = "none";

cards.forEach(card => {
    card.addEventListener("click", async () => {

        const isActive = card.classList.contains("active");

        // Close currently open card
        if (isActive) {
            card.classList.remove("active");
            content.innerHTML = "";
            content.style.display = "none";
            return;
        }

        // Close all other cards
        cards.forEach(c => c.classList.remove("active"));

        // Open selected card
        card.classList.add("active");

        const file = card.dataset.file;

        try {
            const response = await fetch(file);

            if (!response.ok) {
                throw new Error("Failed to load file.");
            }

            const html = await response.text();

            content.innerHTML = html;
            content.style.display = "block";

            content.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        } catch (error) {
            console.error(error);

            content.innerHTML = "<p>Unable to load this section.</p>";
            content.style.display = "block";
        }

    });
});


function type(){

    let current = titles[title];

    if(!deleting){

        typing.textContent=current.substring(0,character++);

        if(character>current.length){

            deleting=true;

            setTimeout(type,1800);

            return;

        }

    }

    else{

        typing.textContent=current.substring(0,character--);

        if(character===0){

            deleting=false;

            title=(title+1)%titles.length;

        }

    }

    setTimeout(type,deleting?35:90);

}

type();