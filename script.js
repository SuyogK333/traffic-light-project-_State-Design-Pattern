
// Base State Class
class State {
    handle(context) {
        throw new Error("Method 'handle()' must be implemented.");
    }
}

// Green Light State
class GreenState extends State {
    handle(context) {
        console.log("Green: Cars can move.");
        setActiveLight("green");
        isStopped = false; 
        carSpeed = 25; 
        setTimeout(() => context.setState(new YellowState()), 5000); // Switch to Yellow after 5 seconds
    }
}

// Yellow Light State
class YellowState extends State {
    handle(context) {
        console.log("Yellow: Prepare to stop.");
        setActiveLight("yellow");
        isStopped = false; 
        carSpeed = 10;
        setTimeout(() => context.setState(new RedState()), 2000); // Switch to Red after 2 seconds
    }
}

// Red Light State
class RedState extends State {
    handle(context) {
        console.log("Red: Cars must stop.");
        setActiveLight("red");
        isStopped = true;
        carSpeed = 0;
        setTimeout(() => context.setState(new GreenState()), 5000); // Switch to Green after 5 seconds
    }
}

// Traffic Light Controller
class TrafficLight {
    constructor() {
        this.currentState = new GreenState(); // Initial state is Green
    }

    setState(state) {
        this.currentState = state; // Update the current state
        this.currentState.handle(this); // Execute the state's logic
    }

    start() {
        this.currentState.handle(this); // Begin the traffic light system
    }
}

// Update the visual traffic light
function setActiveLight(color) {
    // Reset all lights to default
    document.querySelectorAll(".light").forEach(light => {
        light.classList.remove("active");
    });

    // Highlight the active light
    const activeLight = document.querySelector(`.${color}`);
    if (activeLight) {
        activeLight.classList.add("active");
    }
}

// Car movement logic
let carPosition; // Car's current position
let isStopped = false; // Whether the car is stopped
let carSpeed = 10; // Default speed (10px per frame)

function moveCar() {
    if (!isStopped) {
        carPosition -= carSpeed; // Move the car leftward by the current speed
        const car = document.querySelector(".car");
        car.style.left = `${carPosition}px`;

        // Reset car position if it moves off-screen
        if (carPosition < -60) {
            carPosition = window.innerWidth; // Reset to the right edge
        }
    }
}

// Start the car movement loop
function startCarMovement() {
    const car = document.querySelector(".car");
    carPosition = window.innerWidth; // Set initial position to the right edge
    setInterval(moveCar, 100);
}

// Start the traffic light system
const trafficLight = new TrafficLight();
trafficLight.start();

// Initialize car movement
startCarMovement();

