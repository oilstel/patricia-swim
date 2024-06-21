document.addEventListener('DOMContentLoaded', () => {
    const model = document.getElementById('model');
    const scene = document.getElementById('scene');

    // Function to build the image path based on the selected options
    function getImagePath(size, part, option) {
        return `images/${size}/${part}/${option}.svg`;
    }

    // Function to update the model image for a particular part
    function updateModelImage(part, option) {
        const size = document.querySelector('#size .selected').id.split('-')[1]; // get the selected size
        const imgElement = model.querySelector(`#${part}`);
        imgElement.src = getImagePath(size, part, option);
        imgElement.alt = option;
    }

    // Function to update the background image
    function updateBackgroundImage(bgNumber) {
        scene.style.backgroundImage = `url('images/backgrounds/bg-${bgNumber}.jpg')`;
    }

    // Function to remove and add selected class
    function updateSelectedClass(selectedButton, group) {
        // Remove 'selected' class from all buttons within the same group
        const buttons = document.querySelectorAll(`#${group} button`);
        buttons.forEach(button => button.classList.remove('selected'));
        // Add 'selected' class to the clicked button
        selectedButton.classList.add('selected');
    }

    // Attach event listeners to option buttons
    document.querySelectorAll('#model-options .option button').forEach(button => {
        button.addEventListener('click', (event) => {
            const selectedButton = event.target;
            const [type, option] = selectedButton.id.split('-');
            updateModelImage(type, option);
            updateSelectedClass(selectedButton, type);
        });
    });

    // Attach event listeners to size buttons
    document.querySelectorAll('#size button').forEach(button => {
        button.addEventListener('click', (event) => {
            const selectedButton = event.target;
            updateSelectedClass(selectedButton, 'size');
            // Update all model images based on the new size
            ['hair', 'top', 'bottom', 'skin'].forEach(part => {
                const currentOption = model.querySelector(`#${part}`).alt;
                updateModelImage(part, currentOption);
            });
        });
    });

    // Event listeners for background options
    document.querySelectorAll('#background-options button').forEach((button, index) => {
        button.addEventListener('click', () => {
            updateBackgroundImage(index + 1);
            updateSelectedClass(button, 'background-options');
        });
    });

    // Arrays to hold the options for tops and bottoms
    const topOptions = ['blue', 'maroon', 'orange'];
    const bottomOptions = ['blue', 'maroon', 'orange'];

    // Variables to store the current index of tops and bottoms
    let topIndex = 0;
    let bottomIndex = 0;

    // Update clothing item based on navigation clicks
    function updateClothingItem(itemType, options, direction) {
        if (itemType === 'top') {
            topIndex = (topIndex + direction + options.length) % options.length;
            updateModelImage('top', options[topIndex]);
        } else if (itemType === 'bottom') {
            bottomIndex = (bottomIndex + direction + options.length) % options.length;
            updateModelImage('bottom', options[bottomIndex]);
        }
    }

    // Function to get a random element from an array
    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Event listeners for clothing navigation
    document.getElementById('tops-next').addEventListener('click', () => updateClothingItem('top', topOptions, 1));
    document.getElementById('tops-prev').addEventListener('click', () => updateClothingItem('top', topOptions, -1));
    document.getElementById('bottoms-next').addEventListener('click', () => updateClothingItem('bottom', bottomOptions, 1));
    document.getElementById('bottoms-prev').addEventListener('click', () => updateClothingItem('bottom', bottomOptions, -1));

    // Set default selections on page load
    const initialSize = getRandomElement(['size-small', 'size-medium', 'size-large']);
    const initialSkin = getRandomElement(['skin-pale', 'skin-beige', 'skin-tan']);
    const initialHair = getRandomElement(['hair-blonde', 'hair-ginger', 'hair-black']);
    const initialTop = getRandomElement(topOptions);
    const initialBottom = getRandomElement(bottomOptions);

    document.getElementById(initialSize).click();
    document.getElementById(initialSkin).click();
    document.getElementById(initialHair).click();

    // Set the initial top and bottom
    updateModelImage('top', initialTop);
    updateModelImage('bottom', initialBottom);

    // Update the topIndex and bottomIndex to match the initial selection
    topIndex = topOptions.indexOf(initialTop);
    bottomIndex = bottomOptions.indexOf(initialBottom);

    // Set the initial background
    updateBackgroundImage(1); // default background

    // Toggle visibility of options and navigation on top-bar click
    document.getElementById('top-bar').addEventListener('click', () => {
        document.getElementById('model-options').classList.toggle('hidden');
        document.getElementById('background-options').classList.toggle('hidden');
        document.querySelectorAll('.tb-nav-button').forEach(button => button.classList.toggle('hidden'));
    });

    // Add selected options to the shop link URL as query string
    document.getElementById('right-link').addEventListener('click', (event) => {
        const top = model.querySelector('#top').alt;
        const bottom = model.querySelector('#bottom').alt;
        event.target.href = "https://patriciaswim.myshopify.com";
    });
});
