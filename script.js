// Get references to HTML elements
const container = document.querySelector(".gif");
const button = document.querySelector("button");
const croupier = document.querySelector("#croupier");
const bg = document.querySelectorAll(".bg");

// Load audio files
const sounds = [new Audio("./sound/meow.mp3"), new Audio("./sound/purr.mp3"), new Audio("./sound/win2.wav"), new Audio("./sound/win1.wav")];

// Class definition for handling the card game
class Cards {
  constructor(cont, btn, croupier, bg, audio) {
    // Initialize class properties with provided elements and audio
    this.container = cont;
    this.button = btn;
    this.croupier = croupier;
    this.background = bg;
    this.audio = audio;

    // Array of card images
    this.images = [
      "./img/1.jpg",
      "./img/2.png",
      "./img/3.jpg",
      "./img/4.jpg",
      "./img/5.jpeg"
    ];

    // Index to track the current image
    this.index = 0;

    // Timeout duration for animations
    this.timeout = 1000;

    // Initialize the class
    this.init();
  }

  // Getter for obtaining a random card
  get getCard() {
    const generatedNumber = this.generateRandomNums().next().value;
    return { image: this.images[generatedNumber], number: generatedNumber };
  }

  // Generator function for generating random numbers
  *generateRandomNums() {
    yield Math.floor(Math.random() * this.images.length);
  }

  // Method to load card images into the container
  loadCardImage() {
    // Reset the container
    this.reset();

    // Create and append card elements to the container
    for (let i = 0; i < 3; i++) {
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("div-container");

      const card = document.createElement("img");
      card.src = "./img/funy_cat.gif";

      cardContainer.appendChild(card);
      this.container.appendChild(cardContainer);
    }

    // Reveal the loaded cards
    this.revealCards();
  }

  // Method to reveal the loaded cards with animations
  revealCards() {
    const cards = this.container.querySelectorAll("img");

    cards.forEach((card, index) => {
      setTimeout(() => {
        // Get a random card and update the card element
        const { image, number } = this.getCard;
        card.setAttribute("data-number", number);
        card.src = image;

        // Check cards when the last one is revealed
        index === 2 && this.checkCards(cards);

        // Play a sound
        this.audio[0].play();
      }, this.timeout * (index + 1));
    });
  }

  // Method to check if all revealed cards are the same
  checkCards(cards) {
    if (
      cards[0].dataset.number == cards[1].dataset.number &&
      cards[0].dataset.number == cards[2].dataset.number
    ) {
      // Set croupier image and play sounds
      setTimeout(() => {
        this.background.forEach((e) => {
          e.style.display = "block";
        });
        this.croupier.src = "img/saul.png";
        this.audio[2].play();
        this.audio[3].play();
      }, this.timeout);
    }
  }

  // Method to reset the game state
  reset() {
    this.index = 0;
    this.container.textContent = "";
  }

  // Method to initialize the event listener for the button
  init() {
    this.button.addEventListener("click", () => {
      this.audio[1].play();
      this.loadCardImage();
    });
  }
}

// Create an instance of the Cards class
const cards = new Cards(container, button, croupier, bg, sounds);
