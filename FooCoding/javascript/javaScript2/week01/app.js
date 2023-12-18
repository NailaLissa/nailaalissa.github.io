'use strict';

{
  // 1.1 declaring an array that contains 10 strings.
  const bookTitles = [
    'the_alchemist',
    'the_strong_woman',
    'chaos_of_the_senses',
    'the_great_gatsby',
    'memory_in_the_flesh',
    'night_or_a_lifetime',
    'the_prophet',
    'the_hobbit',
    'the_catcher_in_the_rye',
    'the_da_vinci_code',
  ];

  //  1.2 output this array to console.
  // console.log(bookTitles);
  // 1.3 function that generate a ul with li elements for each book ID
  function generateBookList() {
    const bookListContainer = document.getElementById('bookList');
    const ulElement = document.createElement('ul');
    for (let i = 0; i < bookTitles.length; i++) {
      const bookId = bookTitles[i];
      const liElement = document.createElement('li');
      // Create a link element
      const linkElement = document.createElement('a');
      linkElement.classList.add('book-link');
      // Set the href attribute to the target place on the page (e.g., an anchor ID)
      linkElement.href = `#${bookId}`;

      // Create an icon (greater-than symbol)
      const iconElement = document.createElement('span');
      iconElement.textContent = '> ';
      const textNode = document.createTextNode(`${bookId.replace(/_/g, ' ')}`);
      linkElement.appendChild(iconElement);
      linkElement.appendChild(textNode);
      liElement.appendChild(linkElement);
      ulElement.appendChild(liElement); // Append the list item to ul
    }
    // Append (containing all list items) to the container
    bookListContainer.appendChild(ulElement);
  }
  // Call the function to generate the book list
  generateBookList();

  // 1.4 create the object by nested object
  const bookInfo = {
    the_alchemist: { title: 'The Alchemist', language: 'Arabic', author: 'Paulo Coelho' },
    the_strong_woman: {
      title: 'The strong woman in me',
      language: 'German',
      author: 'Elena Lautenschlager',
    },
    chaos_of_the_senses: {
      title: 'Chaos of the Senses',
      language: 'Arabic',
      author: 'Ahlam Mosteghanemi',
    },
    the_great_gatsby: {
      title: 'The Great Gatsby',
      language: 'English',
      author: 'F. Scott Fitzgerald',
    },
    memory_in_the_flesh: {
      title: 'Memory in the Flesh',
      language: 'Arabic',
      author: 'Ahlam Mosteghanemi',
    },
    night_or_a_lifetime: {
      title: 'Night or a Lifetime',
      language: 'German',
      author: 'Ursula März',
    },
    the_prophet: { title: 'The prophet', language: 'Arabic', author: ' Khalil Gibran' },
    the_hobbit: { title: 'The Hobbit', language: 'English', author: 'J.R.R. Tolkien' },
    the_catcher_in_the_rye: {
      title: 'The Catcher in the Rye',
      language: 'English',
      author: 'J.D. Salinger',
    },
    the_da_vinci_code: { title: 'The Da Vinci Code', language: 'English', author: 'Dan Brown' },
  };

  // console.log(bookInfo);
  // 1.5 create function
  function generateBookList2() {
    const bookListContainer = document.getElementById('bookList1');
    const ullistItem = document.createElement('ul');
    ullistItem.classList.add('container');
    for (let i = 0; i < bookTitles.length; i++) {
      const bookId = bookTitles[i];
      const book = bookInfo[bookId];
      const listItem = document.createElement('li');
      listItem.classList.add('selectedbook');
      listItem.id = bookId; // Give each list item a unique ID
      const textbox = document.createElement('div');
      textbox.classList.add('textbox');
      const titleHeading = document.createElement('h2');
      titleHeading.textContent = book.title;
      const languageParagraph = document.createElement('p');
      languageParagraph.textContent = `Language: ${book.language}`;
      const authorParagraph = document.createElement('p');
      authorParagraph.textContent = `Author: ${book.author}`;
      textbox.appendChild(languageParagraph);
      textbox.appendChild(authorParagraph);
      listItem.appendChild(titleHeading);
      listItem.appendChild(textbox);
      ullistItem.appendChild(listItem);
    }
    bookListContainer.appendChild(ullistItem);
  }
  // Call the function to generate the book list
  generateBookList2();

  // 1.7 object with book IDs and corresponding image paths
  const bookCovers = {
    the_alchemist: './img/the_alchemist.jpg',
    the_strong_woman: './img/the_strong_woman.jpg',
    chaos_of_the_senses: './img/chaos_of_the_senses.jpg',
    the_great_gatsby: './img/the_great_gatsby.jpg',
    memory_in_the_flesh: './img/memory_in_the_flesh.jpg',
    night_or_a_lifetime: './img/night_or_a_lifetime.jpg',
    the_prophet: './img/the_prophet.jpg',
    the_hobbit: './img/the_hobbit.jpg',
    the_catcher_in_the_rye: './img/the_catcher_in_the_rye.jpg',
    the_da_vinci_code: './img/the_da_vinci_code.jpg',
  };

  // Function to add book covers to corresponding li elements
  function addBookCoversToLi() {
    for (const bookId of Object.keys(bookCovers)) {
      const coverImage = document.createElement('img');
      coverImage.src = bookCovers[bookId];
      coverImage.alt = `${bookInfo[bookId].title} Cover`;
      const liElement = document.getElementById(bookId);
      const imgbox = liElement.querySelector('div');
      imgbox.classList.add('imgbox');
      imgbox.appendChild(coverImage);
    }
  }

  // // Call the function to add book covers to corresponding li elements
  addBookCoversToLi();

  // create a function to heilight selected book

  document.addEventListener('DOMContentLoaded', function () {
    const bookLinks = document.querySelectorAll('.book-link');

    function highlightBookBox() {
      // Remove 'selected' class and background color from previously selected item
      const selectedBook = document.querySelector('.selectedbook.selected');
      if (selectedBook) {
        selectedBook.classList.remove('selected');
      }

      // Toggle 'selected' class and set background color on the clicked book box
      const index = Array.from(bookLinks).indexOf(this);
      const bookBoxes = document.querySelectorAll('.selectedbook');
      const bookBox = bookBoxes[index];

      if (bookBox) {
        bookBox.classList.add('selected');
      }
    }

    // Attach click event listeners to each book link
    bookLinks.forEach(function (link) {
      link.addEventListener('click', highlightBookBox);
    });
  });

  // create a function to slide book boxes according to the slide button
  const initSlider = () => {
    const imgeList = document.querySelector('#bookList1 .container');
    const slideButtons = document.querySelectorAll('#bookList1 .slid-button');

    slideButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const direction = button.id === 'left' ? -1 : 1;
        const scrollAmount = imgeList.clientWidth * direction;
        imgeList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    });
  };
  window.addEventListener('load', initSlider);
}
