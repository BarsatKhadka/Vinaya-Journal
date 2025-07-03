<h2>
  <img src="https://raw.githubusercontent.com/BarsatKhadka/Vinaya-Journal/main/desktop/src/assets/vinayaLogoWhite.png" alt="Vinaya Logo" width="70" />
  <span>Vinaya Journal</span>
</h2>


Vinaya Journal is a **cross-platform** journaling desktop app that integrates local AI via [Ollama](https://ollama.com/) and a retrieval-augmented generation (RAG) pipeline using ChromaDB. 
It is designed for **offline-first, privacy-conscious AI journaling** so that your thoughts stay on your device.

![Front Page of Vinaya Journal](https://github.com/BarsatKhadka/Vinaya-Journal/blob/5f949193089048c592ed4985b814e24d9a9de7d0/desktop/src/assets/READMEImgs/FrontPageVinaya.png?raw=true)


## Why Use Vinaya ?

- **Privacy-First**  
   Unlike other "AI" Journaling apps , Vinaya keeps everything on your own machine. No cloud, no servers, no data leaks. It's up to you to keep your journal safe because everything's on your device.
- **Simple & Clean UI**  
  I’ve built the interface to be as simple and intuitive as possible—something I’d personally enjoy using every day. If you're contributing, I ask you to honor this design philosophy: less clutter, more clarity.

- **Built by a Journaler, Not a SaaS Product**  
 This isn’t some SaaS product chasing data or engagement graphs. That said, if you see me promoting Vinaya on Reddit or LinkedIn, know that I, too, hope it finds its way into real hands other than me. But its roots are honest: Vinaya was born out of a personal need—for a local, intelligent, and private journaling space to support my daily meditation and practice of restraint.

# Core Features

- **Semantic Search of Your Entries**  
  Powerful retrieval-augmented generation (RAG) pipeline using ChromaDB enables deep semantic search, allowing you to find entries based on meaning, not just keywords.

  ![Semantic Search RAG](https://github.com/BarsatKhadka/Vinaya-Journal/blob/5f949193089048c592ed4985b814e24d9a9de7d0/desktop/src/assets/READMEImgs/RAGReadMe.png?raw=true)

- **Mood Insight and Visualization**  
  Tools to track and visualize your mood over time to help you reflect on emotional patterns.

  ![Mood Insights](https://github.com/BarsatKhadka/Vinaya-Journal/blob/5f949193089048c592ed4985b814e24d9a9de7d0/desktop/src/assets/READMEImgs/Mood_InsightsREADME.png?raw=true)

- **Personalized Chat with Vinaya’s Contextual Ollama AI**  
  Engage with your journal in conversation with an AI that understands your entries, helping deepen reflection and insight.

  ![Vinaya Ollama AI Chat](https://github.com/BarsatKhadka/Vinaya-Journal/blob/5f949193089048c592ed4985b814e24d9a9de7d0/desktop/src/assets/READMEImgs/VinayaOllamaAIREADME.png?raw=true)


## Project Structure

This project follow a clear separation between core development and release packaging:

- **`main`**  
  Contains the core codebase for all active development across:
```
 vinaya-journal/
├── desktop/         → Electron + React app
├── backend/         → Spring Boot API
├── ai/              → FastAPI embeddings + RAG service
├── website/         → Static marketing site
├── .gitignore
├── README.md
```
- **`release-packaging-vX` branches**  
  These branches are versioned (e.g., `release-packaging-v1`) and include:
  - All code up to that specific release
  - Additional packaging, deployment scripts, and configuration files
  - Content not relevant to core development, intentionally excluded from `main`

> ⚠️ Note: `release-packaging-vX` branches are not merged into `main` to keep the main codebase clean and focused.

## Running Vinaya Locally
You can run the full Vinaya Journal stack on your own machine (frontend + backend + AI service).
See the full guide here 👉 docs/LOCALSETUP.md

# License 

![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)

Copyright (c) 2025 Barsat

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.




