// @ts-check

function speakArticle() {
  const postContent = document.getElementById("blog_post");
  const readableText = postContent.innerText;
  speak(readableText);
}

function updateIcon(playing) {
  const speakArticleButton = document.getElementById("speakArticleButton");
  const state = playing ? "pause" : "play";
  speakArticleButton.innerHTML = `<i class="fas fa-regular fa-${state}"></i>`;
}

function speak(message) {
  if (window.speechSynthesis.speaking && window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
    return;
  } else if (window.speechSynthesis.speaking) {
    window.speechSynthesis.pause();
    return;
  }

  const utterance = new SpeechSynthesisUtterance();
  const voices = window.speechSynthesis.getVoices();
  utterance.voice = voices.find(voice => voice.voiceURI === "com.apple.speech.synthesis.voice.samantha");
  utterance.volume = 1;
  utterance.rate = 1;
  utterance.pitch = 0.8;
  utterance.lang = "en-US";
  window.utterance = utterance;

  const maxLength = 32_767;

  if (message.length >= maxLength) {
    utterance.text = message.substring(0, maxLength);
    utterance.onend = function (_) {
        speak(message.substring(maxLength, message.length));
    };
  } else {
    utterance.text = message;
    utterance.onend = function (_) {
      window.utterance = undefined;
    };
  }

  utterance.onpause = () => updateIcon(false);
  utterance.onresume = () => updateIcon(true);
  utterance.onstart = () => updateIcon(true);

  speechSynthesis.speak(utterance);
}
