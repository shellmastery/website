/**
 * ShellMastery Analytics - Lightweight page tracking
 *
 * Tracks: pageview, pageleave (with time on page and scroll depth)
 *
 * User ID: Persistent across sessions (localStorage)
 * Session ID: New if >30min since last activity (sessionStorage + timestamp check)
 */
(function() {
  const API_URL = 'https://api.shitchell.com/v1/track';
  const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

  // Generate random ID
  function generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Get or create user ID (persistent)
  function getUserId() {
    let userId = localStorage.getItem('_sm_uid');
    if (!userId) {
      userId = generateId();
      localStorage.setItem('_sm_uid', userId);
    }
    return userId;
  }

  // Get or create session ID (expires after 30min inactivity)
  function getSessionId() {
    const now = Date.now();
    const lastActivity = parseInt(sessionStorage.getItem('_sm_last') || '0', 10);
    let sessionId = sessionStorage.getItem('_sm_sid');

    // New session if: no session ID, or last activity was >30min ago
    if (!sessionId || (now - lastActivity) > SESSION_TIMEOUT_MS) {
      sessionId = generateId();
      sessionStorage.setItem('_sm_sid', sessionId);
    }

    // Update last activity
    sessionStorage.setItem('_sm_last', now.toString());

    return sessionId;
  }

  // Track maximum scroll depth
  let maxScrollDepth = 0;
  function updateScrollDepth() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight > 0) {
      const depth = Math.round((scrollTop / scrollHeight) * 100);
      maxScrollDepth = Math.max(maxScrollDepth, depth);
    }
  }

  // Send tracking data
  function track(eventType, extraData = {}) {
    const data = {
      event_type: eventType,
      host: window.location.hostname,
      path: window.location.pathname,
      user_id: getUserId(),
      session_id: getSessionId(),
      referrer: document.referrer || null,
      ...extraData
    };

    // Use sendBeacon for pageleave (works even when page is closing)
    if (eventType === 'pageleave' && navigator.sendBeacon) {
      navigator.sendBeacon(API_URL, JSON.stringify(data));
    } else {
      // Regular fetch for pageview
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true  // Allows request to outlive the page
      }).catch(() => {}); // Silently fail - analytics shouldn't break the site
    }
  }

  // Page load time
  const pageLoadTime = Date.now();

  // Track pageview
  track('pageview');

  // Track scroll depth
  window.addEventListener('scroll', updateScrollDepth, { passive: true });

  // Track pageleave with time on page and scroll depth
  function trackPageLeave() {
    const timeOnPage = (Date.now() - pageLoadTime) / 1000; // seconds
    track('pageleave', {
      time_on_page: Math.round(timeOnPage * 10) / 10, // 1 decimal place
      scroll_depth: maxScrollDepth
    });
  }

  // Use visibilitychange (more reliable than beforeunload)
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
      trackPageLeave();
    }
  });

  // Fallback for browsers that don't fire visibilitychange reliably
  window.addEventListener('pagehide', trackPageLeave);
})();
