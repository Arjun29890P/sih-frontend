
class VoiceAssistant {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.recognition = null;
    this.isListening = false;
    this.setupRecognition();
  }

  setupRecognition() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
      } catch (e) {
        console.warn('SpeechRecognition initialization error:', e);
      }
    }
  }

  speak(text, lang = 'en') {
    if (!this.synth) return;

    try {

      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.05;

      const langTags = {
        as: 'as-IN',
        bn: 'bn-IN',
        hi: 'hi-IN',
        mni: 'mni-IN',
        brx: 'brx-IN',
        en: 'en-IN'
      };
      utterance.lang = langTags[lang] || 'en-IN';

      const voices = this.synth.getVoices();
      const matchedVoice = voices.find(v => v.lang.startsWith(lang) || v.lang.startsWith(utterance.lang));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      this.synth.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  listen(onResult, onError, lang = 'en') {
    if (!this.recognition) {
      if (onError) onError('Speech recognition not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const langTags = {
      as: 'bn-IN',
      bn: 'bn-IN',
      hi: 'hi-IN',
      mni: 'bn-IN',
      brx: 'hi-IN',
      en: 'en-IN'
    };

    try {
      this.recognition.lang = langTags[lang] || 'en-IN';
      this.isListening = true;

      this.recognition.onresult = (event) => {
        this.isListening = false;
        const transcript = event.results[0][0].transcript;
        if (onResult) onResult(transcript);
      };

      this.recognition.onerror = (err) => {
        this.isListening = false;
        if (onError) onError(err.error || 'Could not catch voice');
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.start();
    } catch (err) {
      this.isListening = false;
      if (onError) onError(err.message);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  getAICompanionResponse(query, lang = 'en', patientName = 'Bapu') {
    const q = (query || '').toLowerCase();

    if (q.includes('time') || q.includes('সময়') || q.includes('बजा') || q.includes('मतम')) {
      const now = new Date();
      const hours = now.getHours();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      let part = 'morning';
      if (hours >= 12 && hours < 16) part = 'afternoon';
      else if (hours >= 16 && hours < 20) part = 'evening';
      else if (hours >= 20 || hours < 6) part = 'night';

      return {
        text: `It is currently ${timeStr} in the ${part}. You have plenty of time to rest and enjoy the quiet valley breezes.`,
        action: 'orientation'
      };
    }

    if (q.includes('where') || q.includes('who') || q.includes('कहाँ') || q.includes('ক’ত') || q.includes('কোন')) {
      return {
        text: `You are safe at your home in Guwahati, ${patientName}. Your loving daughter Ananya is right nearby. You are in your favorite cozy room.`,
        action: 'reassurance'
      };
    }

    if (q.includes('story') || q.includes('সাধু') || q.includes('कहानी') || q.includes('গল্প') || q.includes('পুৱারী')) {
      return {
        text: `Long ago along the mighty Brahmaputra, a kind gardener nurtured a rare Blue Vanda orchid. Every morning, birds from the hills would sing gentle melodies to it. The orchid taught everyone that memory lives not just in the mind, but in the heart and in every warm smile.`,
        action: 'story'
      };
    }

    if (q.includes('what should i do') || q.includes('কি কৰিম') || q.includes('क्या करूँ')) {
      return {
        text: `How about we play the Tea Leaf Harvest game together? Or enjoy a fresh glass of cool water? You are doing wonderfully today!`,
        action: 'activity'
      };
    }

    return {
      text: `I hear you, dear ${patientName}. I am right here by your side. Everything is peaceful and well. Would you like to hear some soothing bamboo flute music?`,
      action: 'comfort'
    };
  }
}

export const voiceAssistant = new VoiceAssistant();
