# 🎴 Flip7 Probability Engine

Simulador estratégico de **Flip7** construido con React + Vite.

Incluye cálculo de probabilidades en tiempo real, simulación Monte Carlo configurable y una guía visual para aprender el flujo del juego.

## ☕ Contexto

Ultimamente habiamos estado jugando mucho Flip7 entre amigos, y salió la idea de armar una app simple para:

- correr simulaciones
- ver predicciones de riesgo
- practicar partidas por cuenta propia

La meta fue mantenerlo casual y util: abrir, jugar, comparar decisiones y entender mejor cuando conviene arriesgar.

## 🚀 Demo

Aplicación desplegada en Vercel:

- https://flip7-sim.vercel.app/

## ✨ Features

- 🎮 Simulador de ronda (tab **Simulador**) con:
  - score dinámico
  - riesgo de bust en tiempo real
  - recomendación de estrategia (HIT/STAY) basada en EV
- 🧠 Modo **Partida Real** para registrar cartas vistas del mazo real y ajustar probabilidades exactas.
- 📚 Tab **Cómo jugar** con explicación visual animada de cartas y reglas.
- 📊 Tab **Probabilidades** con anatomía del mazo y breakdown de cartas especiales.
- 🎲 Tab **Monte Carlo** con:
  - ajustes de rondas (presets + input)
  - pantalla de carga animada con cartas
  - métricas agregadas: score promedio, tasa bust, tasa Flip7
  - distribución de scores
  - panel explicativo de cómo funciona Monte Carlo y para qué sirve
- 🧩 UI modular con componentes reutilizables y cartas estilizadas.

## ⚙️ Como se decide HIT/STAY

La recomendacion no es random. El motor usa el mazo restante para estimar valor esperado en cada turno:

1. Calcula probabilidad de bust con los numeros actuales (si sale repetido, bust).
2. Calcula score actual y score esperado si haces HIT.
3. Estima el valor esperado de HIT con la forma:
  - $EV(HIT) \approx (1 - p_{bust}) \times (score\ actual + ganancia\ esperada)$
4. Compara ese EV contra quedarse (STAY) y aplica umbrales de riesgo para no sobre-extender.

Resultado: cuando el riesgo sube mucho, tiende a recomendar STAY; cuando el EV de seguir robando supera claramente el valor de plantarte, recomienda HIT.

## 🛠️ Stack

- React 18
- Vite 5
- JavaScript (ES Modules)

## 🗂️ Estructura del proyecto

```text
.
├─ flip7-simulator.jsx
├─ index.html
├─ package.json
├─ vercel.json
└─ src
   ├─ App.jsx
   ├─ main.jsx
   ├─ data
   │  ├─ flip7Data.js
   │  └─ index.js
   ├─ logic
   │  ├─ flip7Logic.js
   │  └─ index.js
   ├─ hooks
   │  ├─ usePlayGame.js
   │  ├─ useRealGame.js
   │  ├─ useSimEngine.js
   │  └─ index.js
   └─ components
      ├─ common
      │  ├─ Flip7Common.jsx
      │  ├─ cardBadge.css
      │  └─ index.js
      └─ tabs
         ├─ PlayTab.jsx
         ├─ RealTab.jsx
         ├─ GuideTab.jsx
         ├─ StatsTab.jsx
         ├─ SimTab.jsx
         ├─ index.js
         └─ styles
            ├─ mainStyles.js
            ├─ playTabStyles.js
            ├─ realTabStyles.js
            ├─ guideTabStyles.js
            ├─ guideTabAnimations.css
            ├─ statsTabStyles.js
            ├─ simTabStyles.js
            └─ simLoading.css
```

## ⚡ Scripts

```bash
npm run dev
npm run build
npm run preview
```

## 💻 Desarrollo local

1. Instala dependencias:

```bash
npm install
```

2. Ejecuta en modo desarrollo:

```bash
npm run dev
```

3. Abre la URL local que muestra Vite (normalmente http://localhost:5173).

## ▲ Deploy en Vercel

El proyecto ya incluye configuración en `vercel.json` para Vite + SPA:

- comando de build: `npm run build`
- output: `dist`
- rewrite global a `index.html`

## 📝 Notas

- Este proyecto es una herramienta de apoyo estratégico y aprendizaje.
- Las decisiones óptimas dependen del estado real del mazo y del contexto de partida.
