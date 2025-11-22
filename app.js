// Mosche AI frontend logic
const demoToggle = document.getElementById('demoToggle');
let demoMode = true;
demoToggle.addEventListener('click', ()=> {
  demoMode = !demoMode;
  demoToggle.textContent = demoMode ? 'Demo' : 'Live';
  demoToggle.classList.toggle('active');
});

const generateImageBtn = document.getElementById('generateImage');
const promptImage = document.getElementById('promptImage');
const imageResult = document.getElementById('imageResult');

const generateTextBtn = document.getElementById('generateText');
const promptText = document.getElementById('promptText');
const textResult = document.getElementById('textResult');

const demoImageURL = 'assets/demo-image.png';
const demoText = "Dies ist ein Demo-Text von Mosche AI. Upgrade auf Pro für längere, angepasste Ergebnisse.";

generateImageBtn.addEventListener('click', async () => {
  const prompt = promptImage.value.trim();
  imageResult.innerHTML = '<div class="loading">Generiere…</div>';
  try {
    if(demoMode){
      imageResult.innerHTML = `<img src="${demoImageURL}" alt="demo">`;
    } else {
      const res = await fetch('/api/text2image', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if(data.image_url){
        imageResult.innerHTML = `<img src="${data.image_url}" alt="generated">`;
      } else if(data.b64){
        imageResult.innerHTML = `<img src="data:image/png;base64,${data.b64}" alt="generated">`;
      } else {
        imageResult.innerHTML = `<div class="err">Keine Bilddaten erhalten</div>`;
      }
    }
  } catch(err){
    imageResult.innerHTML = `<div class="err">Fehler: ${err.message}</div>`;
  }
});

generateTextBtn.addEventListener('click', async () => {
  const prompt = promptText.value.trim();
  textResult.textContent = 'Generiere…';
  try{
    if(demoMode){
      textResult.textContent = demoText;
    } else {
      const res = await fetch('/api/text2text', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      textResult.textContent = data.text || 'Keine Antwort';
    }
  } catch(err){
    textResult.textContent = `Fehler: ${err.message}`;
  }
});