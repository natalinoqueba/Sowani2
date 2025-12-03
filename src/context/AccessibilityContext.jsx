import React, { createContext, useContext, useEffect, useState } from "react";

const AccessibilityContext = createContext(null);

export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const raw = localStorage.getItem("accessibilitySettings");
      return raw
        ? JSON.parse(raw)
        : {
            screenReader: false,
            audioPortuguese: false,
            audioEmakhuwa: false,
            highContrast: false,
            largeText: false,
          };
    } catch (e) {
      return {
        screenReader: false,
        audioPortuguese: false,
        audioEmakhuwa: false,
        highContrast: false,
        largeText: false,
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("accessibilitySettings", JSON.stringify(settings));
    } catch (e) {
      // ignore
    }
  }, [settings]);

  // Screen reader: announce focused elements and basic events using SpeechSynthesis
  useEffect(() => {
    if (typeof window === "undefined") return;

    let announcer = document.getElementById("accessibility-announcer");
    if (!announcer) {
      announcer = document.createElement("div");
      announcer.id = "accessibility-announcer";
      announcer.setAttribute("aria-live", "polite");
      announcer.setAttribute("aria-atomic", "true");
      announcer.style.position = "absolute";
      announcer.style.width = "1px";
      announcer.style.height = "1px";
      announcer.style.margin = "-1px";
      announcer.style.border = "0";
      announcer.style.padding = "0";
      announcer.style.overflow = "hidden";
      announcer.style.clip = "rect(0 0 0 0)";
      announcer.style.clipPath = "inset(50%)";
      announcer.style.whiteSpace = "nowrap";
      document.body.appendChild(announcer);
    }

    const synth = window.speechSynthesis;
    let lastUtterance = null;
    const lastSpoken = { el: null, time: 0 };

    const speak = (text) => {
      try {
        if (!text) return;
        // update live region for screen readers
        announcer.textContent = text;

        if (!synth) return;
        // cancel previous utterance
        synth.cancel();
        const u = new SpeechSynthesisUtterance(text);
        // try Portuguese voice when available
        u.lang = "pt-PT";
        lastUtterance = u;
        synth.speak(u);
      } catch (e) {
        // ignore speech errors
      }
    };

    const getAccessibleName = (el) => {
      if (!el) return "";
      if (el.getAttribute && el.getAttribute("aria-label")) return el.getAttribute("aria-label");
      if (el.getAttribute && el.getAttribute("alt")) return el.getAttribute("alt");
      // aria-labelledby
      const labelled = el.getAttribute && el.getAttribute("aria-labelledby");
      if (labelled) {
        const ref = document.getElementById(labelled);
        if (ref) return ref.innerText.trim();
      }
      // prefer value (for inputs) then innerText
      if (el.value) return String(el.value).trim();
      const txt = el.innerText || el.textContent || "";
      return txt.trim();
    };

    const onFocusIn = (ev) => {
      if (!settings.screenReader) return;
      const target = ev.target;
      const name = getAccessibleName(target) || (target.getAttribute && target.getAttribute("role")) || target.tagName;
      const toSpeak = name ? name : `Elemento ${target.tagName}`;
      // prevent duplicate if we spoke the same element very recently
      const now = Date.now();
      if (lastSpoken.el === target && now - lastSpoken.time < 700) return;
      lastSpoken.el = target;
      lastSpoken.time = now;
      speak(toSpeak);
    };

    const onClick = (ev) => {
      if (!settings.screenReader) return;
      const target = ev.target;
      const name = getAccessibleName(target) || (target.getAttribute && target.getAttribute("role")) || target.tagName;
      const toSpeak = name ? name : `Elemento ${target.tagName}`;
      const now = Date.now();
      if (lastSpoken.el === target && now - lastSpoken.time < 700) return;
      lastSpoken.el = target;
      lastSpoken.time = now;
      speak(toSpeak);
    };

    const onActivate = () => {
      if (settings.screenReader) speak("Leitor de tela ativado");
      else speak("Leitor de tela desativado");
    };

    document.addEventListener("focusin", onFocusIn, true);
    document.addEventListener("click", onClick, true);
    // announce when toggled
    onActivate();

    return () => {
      document.removeEventListener("focusin", onFocusIn, true);
      document.removeEventListener("click", onClick, true);
      try {
        if (synth) synth.cancel();
      } catch (e) {}
    };
  }, [settings.screenReader]);

  // apply global classes when relevant
  useEffect(() => {
    const html = document.documentElement;

    if (settings.largeText) html.classList.add("accessibility-large-text");
    else html.classList.remove("accessibility-large-text");

    if (settings.highContrast) html.classList.add("accessibility-high-contrast");
    else html.classList.remove("accessibility-high-contrast");
  }, [settings.largeText, settings.highContrast]);

  const toggle = (key) => {
    setSettings((s) => ({ ...s, [key]: !s[key] }));
  };

  const setOption = (key, value) => {
    setSettings((s) => ({ ...s, [key]: value }));
  };

  return (
    <AccessibilityContext.Provider value={{ settings, toggle, setOption }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
};

export default AccessibilityContext;
