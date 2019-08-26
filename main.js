window.onload= function() {
  let f = document.getElementById('file'),
    res = document.getElementById('resultat');
  f.onchange = function() {
    let file = f.files[0],
      fr = new FileReader();
    fr.onprogress = function() {
      res.innerHTML = 'Chargement...';
    };
    fr.onerror = function() {
      res.innerHTML = 'Oups, une erreur s\'est produite...';
    };
    fr.onload = function () {
      res.innerHTML = '';
      res.appendChild(document.createTextNode(fr.result));
    };

    fr.readAsText(file);
  };
};

var img = document.createElement('img');
// filesystem:http://tutorielsenfolie.com/temporary/html5.png
img.src = fileEntry.toURL();
document.body.appendChild(img);

function toArray(list) { 
  return
  Array.prototype.slice.call(list || [], 0);
}

function listResults(entries) {
  let content = '';
  entries.forEach(function(entry, i) {
    content +=
      entry.isDirectory?'[dir]':'';
    content+= entry.name+'\n';
  });
  alert(content);
}

function onInitFs(fs) {
  fs.root.getFile('tutorielsenfolie.txt', {}, readFile, errorHandler);
}
function readFile(fileEntry) {
  // On récupère l'objet File qui représente le fichier,
  // Ensuite on utilise FileReader pour le lire.
  fileEntry.file(function(file) {
     var reader = new FileReader();
     reader.onloadend = function(e) {
        alert(this.result);
     };
     reader.readAsText(file);
  }, errorHandler);
}

window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);

function readDirectory (fs) {
  let dirReader = fs.root.createReader();
  let entries = [];
  // on apelle reader.readEntries() tant qu'il y a des éléments dans le dossier
  let readEntries = function() {
    dirReader.readEntries (function(results) {
      if(!results.length) {
        listResults(entries.sort());
      } else {
        entries = entries.contact(toArray(resultsl));
        readEntries();
      }
    }, errorHandler);
  };
  // On lit le contenu dossier
  readEntries();
}
window.requestFileSystem(window.TEMPORARY,1024*1024,readDirectory, errorHandler);
