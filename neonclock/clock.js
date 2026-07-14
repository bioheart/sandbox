// --- HOLOGRAPHIC CLOCK SYSTEM CORE ---

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const msEl = document.getElementById('ms-val');
  const periodEl = document.getElementById('period');
  const timezoneEl = document.getElementById('timezone-val');
  const refDigitsEl = document.getElementById('ref-digits');
  const dateEl = document.getElementById('date-val');
  
  // HUD Mock Indicators
  const sysTempEl = document.getElementById('sys-temp');
  const cpuLoadEl = document.getElementById('cpu-load');
  const pingEl = document.getElementById('net-ping');
  const dbStatusEl = document.getElementById('db-status');
  
  // Canvas Elements
  const rainCanvas = document.getElementById('rain-canvas');
  const steamCanvas = document.getElementById('steam-canvas');
  const rainCtx = rainCanvas.getContext('2d');
  const steamCtx = steamCanvas.getContext('2d');
  
  // Control Panel Elements
  const powerBtn = document.getElementById('btn-power');
  const modeBtn = document.getElementById('btn-mode');
  const flickerBtn = document.getElementById('btn-flicker');
  const rainToggle = document.getElementById('btn-rain');
  const steamToggle = document.getElementById('btn-steam');
  const rainSlider = document.getElementById('slider-rain');
  const steamSlider = document.getElementById('slider-steam');
  
  const themeBtns = document.querySelectorAll('.theme-select');
  const tzSelects = document.querySelectorAll('.tz-select');
  
  // Alarm Elements
  const alarmTimeInput = document.getElementById('alarm-time');
  const alarmToggleBtn = document.getElementById('btn-alarm-toggle');
  const alarmLight = document.getElementById('alarm-light-node');
  const alarmSnoozeBtn = document.getElementById('btn-alarm-snooze');
  const alarmBanner = document.getElementById('alarm-banner');
  const alarmOverlay = document.getElementById('alarm-overlay');
  
  // Audio Controls
  const audioToggle = document.getElementById('btn-audio-toggle');
  const audioIndicator = document.getElementById('audio-visualizer-hud');
  const masterVolSlider = document.getElementById('slider-master-volume');
  
  // SVG Filter Elements (Ripples)
  const feTurbulence = document.querySelector('#ripple-filter feTurbulence');

  // Application State
  const state = {
    powerOn: true,
    is24Hour: true,
    flickerActive: true,
    rainActive: true,
    steamActive: true,
    rainDensity: 50, // default percentage
    steamDensity: 40,
    activeTheme: 'cyber-classic',
    activeTimezone: 'local', // 'local', 'tokyo', 'berlin', 'york'
    alarmTime: '',
    alarmEnabled: false,
    alarmTriggered: false,
    audioInitialized: false,
    audioMuted: true,
    masterVolume: 0.3
  };

  // Timezones configuration
  const timezones = {
    local: { label: 'LOCAL_NODE', offset: null },
    tokyo: { label: 'N-TOKYO (UTC+9)', offset: 9, iana: 'Asia/Tokyo' },
    berlin: { label: 'N-BERLIN (UTC+2)', offset: 2, iana: 'Europe/Berlin' },
    york: { label: 'N-YORK (UTC-4)', offset: -4, iana: 'America/New_York' }
  };

  // --- AUDIO SYNTHESIS SYSTEM (Web Audio API) ---
  let audioCtx = null;
  let masterGain = null;
  let lowHumNode = null;
  let rainNoiseNode = null;
  let neonBuzzNode = null;
  let alarmSirenNode = null;
  let synthNodes = [];

  function initAudio() {
    if (state.audioInitialized) return;
    
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
      
      // Master Gain Node
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(state.audioMuted ? 0 : state.masterVolume, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
      
      // 1. Low Alleyway Hum Synth (Drone)
      lowHumNode = startAlleyHum();
      
      // 2. Rain Static sound (Noise generator)
      rainNoiseNode = startRainStatic();
      
      // 3. Neon Tube Buzz (60Hz hum + crackling)
      neonBuzzNode = startNeonBuzz();
      
      state.audioInitialized = true;
      console.log('Web Audio System Initialized.');
    } catch(e) {
      console.error('Failed to initialize AudioContext:', e);
    }
  }

  function startAlleyHum() {
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const lowpass = audioCtx.createBiquadFilter();
    const gainNode = audioCtx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 hum
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(55.3, audioCtx.currentTime); // detuned

    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(75, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.55, audioCtx.currentTime); // background hum volume

    osc1.connect(lowpass);
    osc2.connect(lowpass);
    lowpass.connect(gainNode);
    gainNode.connect(masterGain);

    osc1.start();
    osc2.start();

    synthNodes.push(osc1, osc2);
    return { gain: gainNode, lowpass };
  }

  function startRainStatic() {
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Fill buffer with white noise
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoiseSource = audioCtx.createBufferSource();
    whiteNoiseSource.buffer = noiseBuffer;
    whiteNoiseSource.loop = true;

    // Filter to shape white noise into atmospheric rain
    const bandpass = audioCtx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1000, audioCtx.currentTime);
    bandpass.Q.setValueAtTime(0.4, audioCtx.currentTime);

    const gainNode = audioCtx.createGain();
    // Default gain maps to rain slider density
    const targetGain = state.rainActive ? (state.rainDensity / 100) * 0.15 : 0;
    gainNode.gain.setValueAtTime(targetGain, audioCtx.currentTime);

    whiteNoiseSource.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(masterGain);

    whiteNoiseSource.start();

    synthNodes.push(whiteNoiseSource);
    return { source: whiteNoiseSource, gain: gainNode, filter: bandpass };
  }

  function startNeonBuzz() {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, audioCtx.currentTime); // 60Hz grid buzz

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(180, audioCtx.currentTime); // buzz resonance harmonic
    filter.Q.setValueAtTime(1.5, audioCtx.currentTime);

    // Subtle volume modulation for neon instability
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.setValueAtTime(8, audioCtx.currentTime); // 8 Hz flickering hum modulation
    lfoGain.gain.setValueAtTime(0.02, audioCtx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(gainNode.gain);

    gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime); // base volume

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(masterGain);

    osc.start();
    lfo.start();

    synthNodes.push(osc, lfo);
    return { osc, gain: gainNode, filter };
  }

  function playAlarmSiren() {
    if (!audioCtx || state.audioMuted) return;

    if (alarmSirenNode) {
      stopAlarmSiren();
    }

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc1.type = 'sawtooth';
    osc2.type = 'sine';
    
    // Siren swept pitch modulation
    const sweepLFO = audioCtx.createOscillator();
    const sweepLFOGain = audioCtx.createGain();
    
    sweepLFO.frequency.setValueAtTime(2.5, audioCtx.currentTime); // 2.5 cycles per second
    sweepLFOGain.gain.setValueAtTime(150, audioCtx.currentTime); // sweep range
    
    osc1.frequency.setValueAtTime(750, audioCtx.currentTime); // base freq
    osc2.frequency.setValueAtTime(755, audioCtx.currentTime);
    
    sweepLFO.connect(sweepLFOGain);
    sweepLFOGain.connect(osc1.frequency);
    sweepLFOGain.connect(osc2.frequency);
    
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(masterGain);
    
    osc1.start();
    osc2.start();
    sweepLFO.start();
    
    alarmSirenNode = { osc1, osc2, lfo: sweepLFO, gain: gainNode };
  }

  function stopAlarmSiren() {
    if (alarmSirenNode) {
      try {
        alarmSirenNode.osc1.stop();
        alarmSirenNode.osc2.stop();
        alarmSirenNode.lfo.stop();
      } catch (err) {}
      alarmSirenNode = null;
    }
  }

  function updateAudioParameters() {
    if (!audioCtx) return;
    
    const time = audioCtx.currentTime;
    
    // Set master volume
    if (state.audioMuted) {
      masterGain.gain.linearRampToValueAtTime(0, time + 0.1);
      audioIndicator.classList.remove('visualizer-active');
    } else {
      masterGain.gain.linearRampToValueAtTime(state.masterVolume, time + 0.1);
      audioIndicator.classList.add('visualizer-active');
    }

    // Set rain noise based on toggled state and density
    if (rainNoiseNode) {
      const rainVol = state.rainActive ? (state.rainDensity / 100) * 0.12 : 0;
      rainNoiseNode.gain.gain.linearRampToValueAtTime(rainVol, time + 0.2);
    }
    
    // Set hum levels based on power state
    if (lowHumNode && neonBuzzNode) {
      const humVol = state.powerOn ? 0.55 : 0.05;
      const buzzVol = (state.powerOn && state.flickerActive) ? 0.06 : (state.powerOn ? 0.03 : 0);
      
      lowHumNode.gain.gain.linearRampToValueAtTime(humVol, time + 0.3);
      neonBuzzNode.gain.gain.linearRampToValueAtTime(buzzVol, time + 0.3);
    }
  }

  // --- TIME AND CLOCK LOGIC ---

  function formatNumber(num) {
    return num.toString().padStart(2, '0');
  }

  function updateClock() {
    if (!state.powerOn) return;

    const now = new Date();
    let currentTzTime = now;

    // Apply offset timezone
    const currentTz = timezones[state.activeTimezone];
    if (state.activeTimezone !== 'local' && currentTz.iana) {
      try {
        const tzString = now.toLocaleString('en-US-u-ca-gregory', { timeZone: currentTz.iana });
        const cleanTzString = tzString.replace(/\s+/g, ' ');
        const parsedDate = new Date(cleanTzString);
        if (!isNaN(parsedDate.getTime())) {
          currentTzTime = parsedDate;
        } else {
          throw new Error("Invalid parsed date");
        }
      } catch (err) {
        console.warn("Timezone calculation failed, reverting to local.", err);
        currentTzTime = now;
      }
    }

    let hours = currentTzTime.getHours();
    const minutes = currentTzTime.getMinutes();
    const seconds = currentTzTime.getSeconds();
    const ms = now.getMilliseconds();
    
    // Check Alarm
    checkAlarmTrigger(hours, minutes, seconds);

    // Format Hours based on clock mode
    if (!state.is24Hour) {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12
      periodEl.style.display = 'inline';
      periodEl.innerText = ampm;
    } else {
      periodEl.style.display = 'none';
    }

    const hStr = formatNumber(hours);
    const mStr = formatNumber(minutes);
    const sStr = formatNumber(seconds);
    const msStr = ms.toString().padStart(3, '0').slice(0, 2);

    // Set Main Display Elements
    hoursEl.innerText = hStr;
    minutesEl.innerText = mStr;
    secondsEl.innerText = sStr;
    msEl.innerText = msStr;
    
    // Update Floor Reflections
    refDigitsEl.innerHTML = `${hStr}<span class="time-colon">:</span>${mStr}<span class="time-colon">:</span><span class="time-seconds">${sStr}</span>`;

    // Date Update
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const day = dayNames[currentTzTime.getDay()];
    const dateNum = formatNumber(currentTzTime.getDate());
    const month = monthNames[currentTzTime.getMonth()];
    const year = currentTzTime.getFullYear().toString().slice(-2);
    
    dateEl.innerText = `${day} ${dateNum} ${month} 20${year}`;
    
    // System stats mock fluctuations
    updateHUDStats();
  }

  function updateHUDStats() {
    if (Math.random() < 0.15) {
      // CPU Load fluctuate 10-60%
      const cpu = Math.floor(10 + Math.random() * 50);
      cpuLoadEl.innerText = `${cpu}%`;
      if (cpu > 45) {
        cpuLoadEl.className = "hud-val glowing magenta";
      } else {
        cpuLoadEl.className = "hud-val glowing";
      }
    }
    if (Math.random() < 0.08) {
      // Ping fluctuate 8ms to 32ms
      pingEl.innerText = `${Math.floor(8 + Math.random() * 24)}MS`;
    }
    if (Math.random() < 0.05) {
      // System Temp fluctuate 42 to 51
      sysTempEl.innerText = `${Math.floor(42 + Math.random() * 10)}°C`;
    }
  }

  // --- ALARM LOGIC ---

  function checkAlarmTrigger(h, m, s) {
    if (!state.alarmEnabled || state.alarmTriggered || !state.alarmTime) return;

    const [targetH, targetM] = state.alarmTime.split(':').map(Number);
    
    if (h === targetH && m === targetM) {
      triggerAlarm();
    }
  }

  function triggerAlarm() {
    state.alarmTriggered = true;
    alarmBanner.style.display = 'block';
    alarmOverlay.style.display = 'block';
    
    // Play audio siren
    playAlarmSiren();
    
    // Flash whole clock screen
    const clockCasing = document.querySelector('.clock-casing');
    clockCasing.style.borderColor = '#ff0055';
    clockCasing.style.boxShadow = '0 0 100px rgba(255, 0, 85, 0.4)';
  }

  function dismissAlarm() {
    state.alarmTriggered = false;
    alarmBanner.style.display = 'none';
    alarmOverlay.style.display = 'none';
    
    stopAlarmSiren();

    // Reset casing borders to theme styles
    const clockCasing = document.querySelector('.clock-casing');
    clockCasing.style.borderColor = '';
    clockCasing.style.boxShadow = '';
    
    // Keep alarm enabled if we want it to trigger next day, 
    // or toggle off. Let's auto disable it to avoid infinite alarms.
    state.alarmEnabled = false;
    alarmToggleBtn.classList.remove('active');
    alarmToggleBtn.innerHTML = '<i class="fas fa-bell"></i> ENABLE';
    alarmLight.classList.remove('active');
  }

  // Set Alarm Button Handler
  alarmToggleBtn.addEventListener('click', () => {
    initAudio();
    if (state.alarmTriggered) {
      dismissAlarm();
      return;
    }

    if (!alarmTimeInput.value) {
      alert("PLEASE ENTER VALID ALARM TIME.");
      return;
    }

    state.alarmTime = alarmTimeInput.value;
    state.alarmEnabled = !state.alarmEnabled;

    if (state.alarmEnabled) {
      alarmToggleBtn.classList.add('active');
      alarmToggleBtn.innerHTML = '<i class="fas fa-bell-slash"></i> OFF';
      alarmLight.classList.add('active');
    } else {
      alarmToggleBtn.classList.remove('active');
      alarmToggleBtn.innerHTML = '<i class="fas fa-bell"></i> ENABLE';
      alarmLight.classList.remove('active');
    }
  });

  alarmSnoozeBtn.addEventListener('click', dismissAlarm);

  // --- CANVASE LAYER GENERATORS (RAIN & STEAM) ---

  // 1. Rain Simulation
  let rainDrops = [];
  let splashParticles = [];

  function resizeCanvas() {
    rainCanvas.width = window.innerWidth;
    rainCanvas.height = window.innerHeight;
    steamCanvas.width = window.innerWidth;
    steamCanvas.height = window.innerHeight;
    
    // Reinitialize particles to fit screen dimensions
    initRain();
  }

  class RainDrop {
    constructor() {
      this.reset();
      this.y = Math.random() * rainCanvas.height; // spread out initially
    }

    reset() {
      this.x = Math.random() * rainCanvas.width;
      this.y = -20;
      this.vy = 15 + Math.random() * 10; // fall speed
      this.vx = -3 - Math.random() * 3; // slight wind slant to the left
      this.len = 15 + Math.random() * 15;
      this.opacity = 0.15 + Math.random() * 0.25;
      this.width = 1 + Math.random() * 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bottom threshold is ground level. In our design, let's treat the bottom 15% as ground
      const groundLevel = rainCanvas.height * 0.88;
      if (this.y >= groundLevel) {
        if (Math.random() < 0.6) {
          createSplash(this.x, groundLevel);
        }
        this.reset();
      }

      // wrap edges
      if (this.x < -20) {
        this.x = rainCanvas.width + 20;
      }
    }

    draw() {
      rainCtx.beginPath();
      rainCtx.strokeStyle = `rgba(0, 242, 254, ${this.opacity})`;
      rainCtx.lineWidth = this.width;
      rainCtx.moveTo(this.x, this.y);
      rainCtx.lineTo(this.x + this.vx * 0.5, this.y + this.len);
      rainCtx.stroke();
    }
  }

  class Splash {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 4;
      this.vy = -Math.random() * 3 - 1;
      this.alpha = 1;
      this.life = 0;
      this.maxLife = 10 + Math.random() * 10;
      this.size = 1 + Math.random() * 1.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.2; // gravity
      this.life++;
      this.alpha = 1 - (this.life / this.maxLife);
    }

    draw() {
      rainCtx.beginPath();
      rainCtx.fillStyle = `rgba(0, 242, 254, ${this.alpha * 0.4})`;
      rainCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      rainCtx.fill();
    }
  }

  function initRain() {
    rainDrops = [];
    const count = Math.floor(window.innerWidth * (state.rainDensity / 400));
    for (let i = 0; i < count; i++) {
      rainDrops.push(new RainDrop());
    }
  }

  function createSplash(x, y) {
    for (let i = 0; i < 3; i++) {
      splashParticles.push(new Splash(x, y));
    }
  }

  function animateRain() {
    rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    
    if (state.rainActive) {
      // Draw & Update Rain
      rainDrops.forEach(drop => {
        drop.update();
        drop.draw();
      });

      // Update & Draw Splashes
      splashParticles.forEach((splash, idx) => {
        splash.update();
        splash.draw();
        if (splash.life >= splash.maxLife) {
          splashParticles.splice(idx, 1);
        }
      });
    }
    
    requestAnimationFrame(animateRain);
  }

  // 2. Steam Smoke Simulation
  let steamParticles = [];

  class SteamParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      // Drift upwards and slightly horizontally
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = -0.8 - Math.random() * 1.2;
      this.alpha = 0.01;
      this.life = 0;
      this.maxLife = 120 + Math.random() * 100;
      this.size = 20 + Math.random() * 30;
      this.maxSize = this.size * 3.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      
      // Expand size as it rises
      this.size += (this.maxSize - this.size) * 0.008;

      // Smooth fade in then fade out
      const halfLife = this.maxLife / 2;
      if (this.life < halfLife) {
        this.alpha = (this.life / halfLife) * 0.08;
      } else {
        this.alpha = (1 - (this.life - halfLife) / halfLife) * 0.08;
      }
    }

    draw() {
      const grad = steamCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      // Soft grey-white steam gradient matching current neon theme color slightly (cyan/magenta mix)
      const primaryColor = state.activeTheme === 'cyber-classic' ? '0, 242, 254' : 
                          state.activeTheme === 'toxic-hazard' ? '57, 255, 20' :
                          state.activeTheme === 'matrix' ? '0, 255, 102' : '176, 38, 255';
      
      grad.addColorStop(0, `rgba(${primaryColor}, ${this.alpha * 0.8})`);
      grad.addColorStop(0.3, `rgba(200, 210, 220, ${this.alpha * 0.4})`);
      grad.addColorStop(1, 'rgba(10, 10, 15, 0)');
      
      steamCtx.beginPath();
      steamCtx.fillStyle = grad;
      steamCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      steamCtx.fill();
    }
  }

  function animateSteam() {
    steamCtx.clearRect(0, 0, steamCanvas.width, steamCanvas.height);

    if (state.steamActive) {
      // Vent generator sources
      // Emit from 2 spots: Left Vent (bottom-left) and Right Vent (bottom-right)
      const leftVentX = steamCanvas.width * 0.15;
      const rightVentX = steamCanvas.width * 0.85;
      const ventY = steamCanvas.height * 0.92;
      
      const spawnChance = (state.steamDensity / 100) * 0.08;

      if (Math.random() < spawnChance) {
        steamParticles.push(new SteamParticle(leftVentX + (Math.random() - 0.5) * 20, ventY));
      }
      if (Math.random() < spawnChance) {
        steamParticles.push(new SteamParticle(rightVentX + (Math.random() - 0.5) * 20, ventY));
      }

      steamParticles.forEach((p, idx) => {
        p.update();
        p.draw();
        if (p.life >= p.maxLife || p.x < 0 || p.x > steamCanvas.width || p.y < 0) {
          steamParticles.splice(idx, 1);
        }
      });
    }

    requestAnimationFrame(animateSteam);
  }

  // --- WET SURFACE FLOOR RIPPLE ANIMATION ---
  let rippleSeed = 0;
  function animateFloorRipples() {
    if (state.rainActive && feTurbulence) {
      rippleSeed += 0.12;
      feTurbulence.setAttribute('seed', Math.floor(rippleSeed));
    }
    requestAnimationFrame(animateFloorRipples);
  }

  // --- BUTTON INTERACTIONS AND COMMAND CONTROLS ---

  // Power Switch Toggle
  powerBtn.addEventListener('click', () => {
    initAudio();
    state.powerOn = !state.powerOn;
    
    const displayScreen = document.querySelector('.clock-display-screen');
    const clockCasing = document.querySelector('.clock-casing');
    const reflectedClock = document.querySelector('.reflected-clock');

    if (state.powerOn) {
      powerBtn.classList.add('active');
      powerBtn.innerHTML = '<i class="fas fa-power-off"></i> ONLINE';
      clockCasing.classList.remove('power-collapse');
      displayScreen.classList.remove('power-collapsed-screen');
      reflectedClock.classList.remove('power-collapsed-digits');
      
      // Flickering turn-on flare effect
      document.querySelector('.time-display').classList.add('flicker-active');
      setTimeout(() => {
        if (!state.flickerActive) {
          document.querySelector('.time-display').classList.remove('flicker-active');
        }
      }, 1500);

      dbStatusEl.innerText = "SYS_ONLINE";
      dbStatusEl.className = "hud-val glowing";
    } else {
      powerBtn.classList.remove('active');
      powerBtn.innerHTML = '<i class="fas fa-power-off"></i> OFFLINE';
      clockCasing.classList.add('power-collapse');
      displayScreen.classList.add('power-collapsed-screen');
      reflectedClock.classList.add('power-collapsed-digits');

      // Clear times
      hoursEl.innerText = "--";
      minutesEl.innerText = "--";
      secondsEl.innerText = "--";
      msEl.innerText = "--";
      
      refDigitsEl.innerHTML = `--<span class="time-colon">:</span>--<span class="time-colon">:</span><span class="time-seconds">--</span>`;
      dateEl.innerText = "DISCONNECTED";

      dbStatusEl.innerText = "STANDBY";
      dbStatusEl.className = "hud-val";
      
      // Turn off sirens
      dismissAlarm();
    }
    updateAudioParameters();
  });

  // Time format (12h/24h)
  modeBtn.addEventListener('click', () => {
    initAudio();
    state.is24Hour = !state.is24Hour;
    modeBtn.classList.toggle('active', !state.is24Hour);
    modeBtn.innerHTML = state.is24Hour ? '<i class="fas fa-clock"></i> 24H' : '<i class="fas fa-clock"></i> 12H';
    updateClock();
  });

  // Neon Flickering toggle
  flickerBtn.addEventListener('click', () => {
    initAudio();
    state.flickerActive = !state.flickerActive;
    flickerBtn.classList.toggle('active', state.flickerActive);
    
    const timeDisplay = document.querySelector('.time-display');
    if (state.flickerActive) {
      timeDisplay.classList.add('flicker-active');
    } else {
      timeDisplay.classList.remove('flicker-active');
    }
    updateAudioParameters();
  });

  // Rain Canvas toggle
  rainToggle.addEventListener('click', () => {
    initAudio();
    state.rainActive = !state.rainActive;
    rainToggle.classList.toggle('active', state.rainActive);
    rainToggle.innerHTML = state.rainActive ? '<i class="fas fa-cloud-showers-heavy"></i> RAIN ON' : '<i class="fas fa-tint-slash"></i> RAIN OFF';
    updateAudioParameters();
  });

  // Steam Canvas toggle
  steamToggle.addEventListener('click', () => {
    initAudio();
    state.steamActive = !state.steamActive;
    steamToggle.classList.toggle('active', state.steamActive);
    steamToggle.innerHTML = state.steamActive ? '<i class="fas fa-wind"></i> STEAM ON' : '<i class="fas fa-wind"></i> STEAM OFF';
  });

  // Sliders Change
  rainSlider.addEventListener('input', (e) => {
    state.rainDensity = parseInt(e.target.value);
    initRain();
    updateAudioParameters();
  });

  steamSlider.addEventListener('input', (e) => {
    state.steamDensity = parseInt(e.target.value);
  });

  // Audio Toggle
  audioToggle.addEventListener('click', () => {
    initAudio();
    state.audioMuted = !state.audioMuted;
    audioToggle.classList.toggle('active', !state.audioMuted);
    audioToggle.innerHTML = state.audioMuted ? '<i class="fas fa-volume-mute"></i> MUTED' : '<i class="fas fa-volume-up"></i> SOUND ON';
    updateAudioParameters();
  });

  masterVolSlider.addEventListener('input', (e) => {
    state.masterVolume = parseFloat(e.target.value);
    updateAudioParameters();
  });

  // Theme selection buttons
  themeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      initAudio();
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const themeName = btn.getAttribute('data-theme-name');
      document.body.setAttribute('data-theme', themeName);
      state.activeTheme = themeName;
    });
  });

  // Timezone selection tabs
  tzSelects.forEach(btn => {
    btn.addEventListener('click', () => {
      initAudio();
      tzSelects.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const tzKey = btn.getAttribute('data-tz');
      state.activeTimezone = tzKey;
      timezoneEl.innerText = timezones[tzKey].label;
      updateClock();
    });
  });

  // Window resize callback
  window.addEventListener('resize', resizeCanvas);

  // Initialize App Execution
  document.body.setAttribute('data-theme', state.activeTheme);
  timezoneEl.innerText = timezones[state.activeTimezone].label;
  
  // Create & Start loops
  resizeCanvas();
  animateRain();
  animateSteam();
  animateFloorRipples();
  
  setInterval(updateClock, 10); // Check every 10ms for smooth millisecond updates and alarm triggers
  updateClock(); // Initial run

  // Web Audio contextual unlock for browsers
  const unlockEvents = ['click', 'touchstart', 'keydown'];
  function unlockAudio() {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    unlockEvents.forEach(e => document.removeEventListener(e, unlockAudio));
  }
  unlockEvents.forEach(e => document.addEventListener(e, unlockAudio));
});
