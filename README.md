
<img src="https://github.com/BarsatKhadka/Vinaya-Journal/blob/main/desktop/src/assets/vinayaWithout.png" alt="Vinaya Logo" width="40" /> 
## Vinaya Journal

Vinaya Journal is a **cross-platform** journaling desktop app that integrates local AI via [Ollama](https://ollama.com/) and a retrieval-augmented generation (RAG) pipeline using ChromaDB. 
It is designed for **offline-first, privacy-conscious AI journaling** so that your thoughts stay on your device.

## Why Use Vinaya ?

- **Privacy-First**  
   Unlike other "AI" Journaling apps , Vinaya keeps everything on your own machine. No cloud, no servers, no data leaks. It's up to you to keep your journal safe because everything's on your device.
- **Simple & Clean UI**  
  I’ve built the interface to be as simple and intuitive as possible—something I’d personally enjoy using every day. If you're contributing, I ask you to honor this design philosophy: less clutter, more clarity.

- **Built by a Journaler, Not a SaaS Product**  
 This isn’t some SaaS product chasing data or engagement graphs. That said, if you see me promoting Vinaya on Reddit or LinkedIn, know that I, too, hope it finds its way into real hands other than me. But its roots are honest: Vinaya was born out of a personal need—for a local, intelligent, and private journaling space to support my daily meditation and practice of restraint.


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




