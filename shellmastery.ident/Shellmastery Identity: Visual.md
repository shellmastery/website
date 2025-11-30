**Shellmastery Identity – Visual**

This document defines the aesthetic and theming model for Shellmastery, including logo, color palettes, typography, and the component theming architecture.

---

## Logo

#### Main logo

An `SM` in ascii-fied form (my name is "Shaun Mitchell", and it makes me unreasonably giddy that this is a happy accidental option lol)

#### Themes, imagery, and feelings

Ascii-art, terminal colors / schemes, nerdiness, whimsy on occasion

---

## Color Themes

```yaml
colorThemes:
  - name: SolarizedDark
    primary: "#002b36"
    secondary: "#586e75"
    accent: "#b58900"
    background: "#002b36"
    text: "#fdf6e3"

  - name: CyberpunkNeon
    primary: "#0f0c29"
    secondary: "#302b63"
    accent: "#ff00ff"
    background: "#000000"
    text: "#39ff14"

  - name: Nord
    primary: "#2E3440"
    secondary: "#4C566A"
    accent: "#88C0D0"
    background: "#2E3440"
    text: "#ECEFF4"

  - name: SMLight
    primary: "#ffffff"
    secondary: "#e0e0e0"
    accent: "#268bd2"
    background: "#ffffff"
    text: "#002b36"

  - name: RetroTerminal
    primary: "#000000"
    secondary: "#00FF00"
    accent: "#00FF00"
    background: "#000000"
    text: "#00FF00"
```

---

## Fonts & Font Themes

```yaml
fonts:
  primary: "Josefin Sans"
  accent: "Montserrat"
  mono: "Fantasque Sans Mono"

fontThemes:
  - name: default
    header: primary
    body: accent
    mono: mono

  - name: mono
    header: mono
    body: mono
    mono: mono
```

---

## Visual Components by Category

```yaml
categories:
  - name: default
    colorTheme: RetroTerminal
    fontTheme: mono

  - name: AI
    colorTheme: CyberpunkNeon
    fontTheme: default

  - name: Teaching / Docs
    colorTheme: SolarizedDark
    fontTheme: default

  - name: Marketing
    colorTheme: CyberpunkNeon
    fontTheme: default

  - name: Code
    colorTheme: Nord
    fontTheme: mono

components:
  - name: Webpage
    description: Core website elements and layouts for shellmastery.com and related landing pages
    category: default

  - name: IDE code block
    description: IDE-style, line numbered code display OR code output
    category: Code

  - name: Shell Interface
    description: Terminal/CLI interface, prompts, and output
    category: Code

  - name: Generic Ad
    description: Ad content that doesn't embed specialized components like CLI or IDE blocks
    category: Marketing

  - name: Diagrams / Cheat Sheets / Reference Docs
    description: Informational or educational resources using diagrammatic layout or tabular reference
    category: Teaching / Docs
```

---

This visual system enables dynamic, consistent application of Shellmastery’s aesthetic across platforms, components, and content types.
