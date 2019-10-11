window.addEventListener('DOMContentLoaded', (event) => {
  function addClass(el, name) {
    arr = el.className.split(' ');
    if (arr.indexOf(name) == -1) {
      el.className += ' ' + name;
    }
  }
  // Input upload file types
  const fileTypes = ['image/jpeg', 'image/pjpeg', 'image/png'];

  // Validation for input files
  function validFileType(file) {
    for (var i = 0; i < fileTypes.length; i++) {
      if (file.type === fileTypes[i]) {
        return true;
      }
    }
    return false;
  }

  // update and get image
  function updateImageDisplay() {
    const curFiles = input.files;
    if (validFileType(curFiles[0])) {
      const removeall = document.getElementsByClassName('remove');

      [...removeall].forEach((element) => {
        main.removeChild(element);
      });
      main.style.background = 'none';
      const currentImage = document.getElementById('img_container');
      if (currentImage !== null) {
        main.removeChild(currentImage);
      }

      const image = document.createElement('img');
      image.setAttribute('id', 'image_bg');
      image.src = window.URL.createObjectURL(curFiles[0]);
      
      const imageContainer = document.createElement('div');
      imageContainer.setAttribute('id', 'img_container');
      imageContainer.appendChild(image);
      main.appendChild(imageContainer);


      
    }
  }

  const main = document.getElementById('main');
  const pen = document.getElementById('pen');



  const input = document.getElementById('file');
  input.addEventListener('change', updateImageDisplay);

  let pen_background = '';


  let isDown = false;

  function getPosition(ev) {
    return {
      x: ev.clientX,
      y: ev.clientY
    };
  }
  const carre = document.createElement('div');
  main.append(carre);
  carre.classList.add('floating', 'kais');

  main.addEventListener('mousemove', (event) => {
    event.preventDefault();

    const pos = getPosition(event);

    carre.style.left = pos.x - 25 + 'px';
    carre.style.top = pos.y - 25 + 'px';

    if (isDown) {
      addClass(carre, 'no_border');
      const overlay = document.createElement('div');
      main.append(overlay);
      overlay.classList.add('floating', 'kais_200', 'remove');
      if (pen_background !== '') {
        overlay.style.background = 'url(' + pen_background + ')';
      }
      overlay.style.left = pos.x - 100 + 'px';
      overlay.style.top = pos.y - 277 / 2 + 'px';
    } else {
      carre.className = carre.className.replace(/\bno_border\b/g, '');
    }
  });

  document.addEventListener('mousedown', (event) => {
    event.preventDefault();
    isDown = true;

    

    
});

  document.addEventListener('mouseup', () => {
    event.preventDefault();
    isDown = false;
  });

  const choose = document.getElementsByClassName('choose')[0];

  choose.addEventListener('mousedown', (event) => {
    pen_background = event.target.src;
  });
  

});
