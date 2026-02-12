function initCopyButtons() {
  // Copy buttons for pre blocks
  document.querySelectorAll('pre').forEach(function (pre) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', function () {
      var code = pre.querySelector('code');
      var text = code ? code.textContent : pre.textContent;
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
      });
    });
    pre.appendChild(btn);
  });

  // Click to copy for inline code
  document.querySelectorAll('code').forEach(function (code) {
    if (code.parentElement.tagName === 'PRE') return;
    code.addEventListener('click', function () {
      navigator.clipboard.writeText(code.textContent).then(function () {
        code.classList.add('copied');
        setTimeout(function () { code.classList.remove('copied'); }, 1500);
      });
    });
  });
}

function initMobileMenuClose() {
  var trigger = document.querySelector('.menu .trigger');
  var checkbox = document.getElementById('menu-trigger');
  if (!trigger || !checkbox) return;

  trigger.addEventListener('click', function (e) {
    // Don't close if clicking on a link, button, or the mode toggle
    if (e.target.closest('a') || e.target.closest('button') || e.target.closest('#mode')) {
      return;
    }
    checkbox.checked = false;
    // Dispatch change event so theme.js removes the blur from .wrapper
    checkbox.dispatchEvent(new Event('change'));
  });
}

var EasterEggs = {
  // Note: Robot antenna blink is CSS-only (see .antenna-light keyframes in custom.css)

  artisFlicker: {
    span: null,
    bgColor: null,

    init: function () {
      var el = document.querySelector('.author-name');
      if (!el) return;
      el.innerHTML = el.innerHTML.replace('Artis', '<span class="artis-hide">Artis</span>');
      this.span = el.querySelector('.artis-hide');
      this.bgColor = getComputedStyle(document.body).backgroundColor;

      var self = this;
      setTimeout(function loop() {
        self.flicker();
        setTimeout(loop, 66666);
      }, 66666);
    },

    flicker: function () {
      var self = this;
      var off = this.bgColor;
      var on = '';
      // rapid flickers then hold off, then flicker back on
      var steps = [
        [off, 68], [on, 51],   // quick flicker
        [off, 85], [on, 42],   // another flicker
        [off, 102], [on, 34],  // shorter flash
        [off, 680],            // hold dark
        [on, 0]                // snap back on
      ];

      var i = 0;
      function next() {
        if (i >= steps.length) return;
        self.span.style.color = steps[i][0];
        var delay = steps[i][1];
        i++;
        setTimeout(next, delay);
      }
      next();
    }
  },

  matrixRain: {
    canvas: null,
    ctx: null,
    streams: [],
    numColumns: 0,
    fontSize: 20,
    colWidth: 20,
    animId: null,
    idleTimer: null,
    running: false,
    chars: '',

    init: function () {
      var self = this;

      this.canvas = document.createElement('canvas');
      this.canvas.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none;opacity:0;transition:opacity 0.5s';
      document.body.appendChild(this.canvas);

      this.ctx = this.canvas.getContext('2d');

      // Half-width katakana U+FF66–U+FF9D + digits + Latin capitals + symbols
      for (var i = 0xFF66; i <= 0xFF9D; i++) this.chars += String.fromCharCode(i);
      this.chars += '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*+=-<>|:;"{}[]!@#$%^&';

      // Dismiss on click with fade-out
      this.canvas.addEventListener('click', function () {
        self.canvas.style.opacity = '0';
      });

      this.canvas.addEventListener('transitionend', function (e) {
        if (e.propertyName === 'opacity' && self.canvas.style.opacity === '0') {
          self.stop();
          self.resetIdleTimer();
        }
      });

      // Reset idle timer on any click
      document.addEventListener('click', function () {
        if (!self.running) self.resetIdleTimer();
      });

      window.addEventListener('resize', function () {
        if (self.running) self.resize();
      });

      // Start the initial idle timer
      this.resetIdleTimer();
    },

    randomChar: function () {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    },

    createStream: function (stagger) {
      var maxRow = Math.floor(this.canvas.height / this.fontSize);
      var length = 15 + Math.floor(Math.random() * 16); // 15–30
      var startY = stagger ? -(Math.random() * maxRow) : 0;
      // cells maps row number -> character stamped at that row
      var cells = {};
      // Pre-fill cells for rows the stream has already passed through
      var headRow = Math.floor(startY);
      for (var r = Math.max(0, headRow - length + 1); r <= headRow; r++) {
        cells[r] = this.randomChar();
      }
      return {
        y: startY,
        prevHeadRow: headRow,
        speed: 0.1 + Math.random() * 0.2,       // 0.1–0.3 rows/frame
        length: length,
        cells: cells,
        delay: stagger ? 0 : Math.floor(Math.random() * 61) // 0–60 frames
      };
    },

    resetStream: function (s) {
      s.length = 15 + Math.floor(Math.random() * 16);
      s.cells = {};
      s.y = 0;
      s.prevHeadRow = -1;
      s.speed = 0.1 + Math.random() * 0.2;
      s.delay = Math.floor(Math.random() * 61);
    },

    resize: function () {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      var newCols = Math.floor(this.canvas.width / this.colWidth);
      if (newCols > this.numColumns) {
        for (var i = this.numColumns; i < newCols; i++) {
          this.streams.push(this.createStream(true));
        }
      } else if (newCols < this.numColumns) {
        this.streams.length = newCols;
      }
      this.numColumns = newCols;
    },

    draw: function () {
      var ctx = this.ctx;
      var canvas = this.canvas;
      var streams = this.streams;
      var fontSize = this.fontSize;
      var colWidth = this.colWidth;

      // Full redraw each frame — no ghost pixels
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + 'px monospace';
      ctx.textBaseline = 'top';

      var screenRows = Math.ceil(canvas.height / fontSize);

      for (var i = 0; i < this.numColumns; i++) {
        var s = streams[i];

        // Handle delay
        if (s.delay > 0) {
          s.delay--;
          continue;
        }

        var headRow = Math.floor(s.y);

        // Stamp new characters as the head advances to new rows
        for (var r = s.prevHeadRow + 1; r <= headRow; r++) {
          if (r >= 0) s.cells[r] = this.randomChar();
        }
        s.prevHeadRow = headRow;

        // Draw each character in the visible trail
        var tailRow = headRow - s.length + 1;
        for (var row = Math.max(0, tailRow); row <= Math.min(headRow, screenRows); row++) {
          if (!s.cells[row]) continue;

          // Distance from head: 0 = head, increases toward tail
          var dist = headRow - row;

          // Mutate: head char always changes, trail chars ~3%/frame
          if (dist === 0) {
            s.cells[row] = this.randomChar();
          } else if (Math.random() < 0.03) {
            s.cells[row] = this.randomChar();
          }

          var brightness = 1.0 - (dist / s.length);
          var x = i * colWidth;
          var py = row * fontSize;

          // Set glow and color based on distance from head
          if (dist <= 1) {
            // Head: white with strong white glow
            ctx.shadowBlur = 14;
            ctx.shadowColor = '#fff';
            ctx.fillStyle = '#fff';
          } else if (dist <= 3) {
            // Near head: bright green with green glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#0f0';
            ctx.fillStyle = '#0f0';
          } else if (brightness > 0.4) {
            // Mid trail: medium green with subtle glow
            ctx.shadowBlur = 6;
            ctx.shadowColor = 'rgba(0,255,0,0.5)';
            ctx.fillStyle = 'rgba(0,255,0,' + brightness + ')';
          } else {
            // Dim trail: no glow for performance
            ctx.shadowBlur = 0;
            ctx.shadowColor = 'transparent';
            ctx.fillStyle = 'rgba(0,255,0,' + brightness + ')';
          }

          ctx.fillText(s.cells[row], x, py);
        }

        // Turn off shadow after drawing this stream
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';

        // Clean up cells that have scrolled past the trail
        for (var old = tailRow - 1; old >= tailRow - 5; old--) {
          delete s.cells[old];
        }

        // Advance head
        s.y += s.speed;

        // Reset when the tail has scrolled off the bottom of the screen
        if (tailRow > screenRows) {
          this.resetStream(s);
        }
      }
    },

    loop: function () {
      if (!this.running) return;
      this.draw();
      var self = this;
      this.animId = requestAnimationFrame(function () { self.loop(); });
    },

    start: function () {
      // Re-init streams on each start for a fresh look
      this.streams = [];
      this.numColumns = 0;
      this.resize();
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.running = true;
      this.canvas.style.pointerEvents = 'all';
      this.canvas.style.opacity = '1';
      this.loop();
    },

    stop: function () {
      this.running = false;
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
      this.canvas.style.pointerEvents = 'none';
    },

    resetIdleTimer: function () {
      var self = this;
      clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(function () { self.start(); }, 666666);
    }
  },

  init: function () {
    this.artisFlicker.init();
    this.matrixRain.init();
  }
};

function initTagFilter() {
  var filterInput = document.getElementById('tag-filter');
  if (!filterInput) return;

  var tagsCloud = document.getElementById('tags-cloud');
  var noResults = document.getElementById('tags-no-results');
  var tagItems = tagsCloud.querySelectorAll('.tag-item');

  filterInput.addEventListener('input', function () {
    var query = this.value.toLowerCase().trim();
    var visible = 0;

    tagItems.forEach(function (item) {
      var tagName = item.getAttribute('data-tag');
      if (!query || tagName.indexOf(query) !== -1) {
        item.classList.remove('hidden');
        visible++;
      } else {
        item.classList.add('hidden');
      }
    });

    noResults.style.display = visible === 0 ? 'block' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initCopyButtons();
  initMobileMenuClose();
  initTagFilter();
  EasterEggs.init();
});
