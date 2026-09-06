
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.activeNodes = [];
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
  }

  playTap() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      console.warn('Audio tap error:', e);
    }
  }

  playSuccess() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; 
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);

        const startTime = this.ctx.currentTime + idx * 0.1;
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.2);
      });
    } catch (e) {
      console.warn('Audio success error:', e);
    }
  }

  playFluteTone(frequency = 440, duration = 0.8) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = 5; 
      lfoGain.gain.value = 4;
      lfo.connect(osc.frequency);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      lfo.start();
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
      lfo.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio flute error:', e);
    }
  }

  stopSoundscape() {
    this.activeNodes.forEach(node => {
      try { node.stop(); } catch (e) {}
      try { node.disconnect(); } catch (e) {}
    });
    this.activeNodes = [];
  }

  playSoundscape(kind) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    this.stopSoundscape();
    const now = this.ctx.currentTime;

    if (kind === 'flute') {
      const notes = [440, 523.25, 587.33, 659.25, 587.33, 523.25];
      notes.forEach((frequency, index) => {
        const oscillator = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + index * 1.35;
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, start);
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.16, start + 0.18);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 1.2);
        oscillator.connect(gain).connect(this.ctx.destination);
        oscillator.start(start);
        oscillator.stop(start + 1.25);
        this.activeNodes.push(oscillator);
      });
      return;
    }

    if (kind === 'bowl') {
      [196, 293.66, 392].forEach((frequency, index) => {
        const oscillator = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.22 / (index + 1), now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 7);
        oscillator.connect(gain).connect(this.ctx.destination);
        oscillator.start(now);
        oscillator.stop(now + 7.1);
        this.activeNodes.push(oscillator);
      });
      return;
    }

    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 3, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i += 1) {
      const noise = Math.random() * 2 - 1;
      last = last * 0.96 + noise * 0.04;
      data[i] = last;
    }
    const source = this.ctx.createBufferSource();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    source.buffer = buffer;
    source.loop = true;
    filter.type = kind === 'rain' ? 'highpass' : 'lowpass';
    filter.frequency.value = kind === 'rain' ? 900 : 700;
    gain.gain.value = kind === 'rain' ? 0.16 : 0.2;
    source.connect(filter).connect(gain).connect(this.ctx.destination);
    source.start();
    this.activeNodes.push(source);
  }

  playWaterChime() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {
      console.warn('Audio water error:', e);
    }
  }

  playReminderChime() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [440, 554.37, 659.25]; 
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        const startTime = this.ctx.currentTime + idx * 0.15;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.5);
      });
    } catch (e) {
      console.warn('Audio reminder error:', e);
    }
  }
}

export const soundEngine = new SoundEngine();
