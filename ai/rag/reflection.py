"""Helpers for the Periodic Reflection feature.

Kept deliberately free of heavy ML / DB imports (only the stdlib) so the pure
prompt/mood-arc logic can be unit-tested without loading torch, chromadb or
ollama. Orchestration (pulling entries, building the collection, streaming the
model) lives in main.py, mirroring how /chat and /mood_insights are wired.
"""

from datetime import datetime


def dominant_emotion(sentiment: dict):
    """Returns (label, score) for the strongest emotion in a sentiment dict,
    or (None, 0.0) when there is no data."""
    if not sentiment:
        return None, 0.0
    label = max(sentiment, key=sentiment.get)
    return label, round(float(sentiment[label]), 4)


def build_mood_arc(mood_insights: list) -> str:
    """Turns [{'date', 'sentiment'}] into a chronological, human-readable arc of
    the dominant emotion per day."""
    if not mood_insights:
        return "No mood data is available for this period."

    def _key(item):
        try:
            return datetime.strptime(item["date"], "%Y-%m-%d")
        except (KeyError, ValueError):
            return datetime.min

    ordered = sorted(mood_insights, key=_key)
    lines = []
    for item in ordered:
        label, score = dominant_emotion(item.get("sentiment", {}))
        if label:
            lines.append(f"- {item['date']}: {label} ({score})")
        else:
            lines.append(f"- {item['date']}: (no sentiment recorded)")
    return "\n".join(lines)


def _entries_block(entries: list) -> str:
    """entries: list of (date, content) tuples in any order -> chronological text block."""
    ordered = sorted(
        (e for e in entries if e[1] and e[1].strip()),
        key=lambda e: e[0],
    )
    return "\n\n".join(f"[{date}]\n{content.strip()}" for date, content in ordered)


def build_reflection_system_prompt(entries: list, mood_arc: str, language: str = "en") -> str:
    """Builds the system prompt that asks Vinaya to reflect on a period: recurring
    themes, the mood arc, and 2-3 grounded questions. Supports 'en' and 'fr'."""
    entries_block = _entries_block(entries)

    prompts = {
        "en": f"""
    You are Vinaya — a steady, clear-eyed journaling companion. You are reflecting back on a period of the user's journal, not chatting. Your job is to help them see honestly what has been happening.

    Read the entries below and write a short, grounded reflection with exactly three parts:

    1. Recurring themes — the patterns, situations, people, or worries that keep showing up across these days. Name them plainly. If they are avoiding something or circling the same loop, say so directly, without flattery or padding.
    2. Mood arc — describe how their emotional state moved across the period, using the day-by-day mood data provided. Note where it lifted, where it dipped, and any turning point. Don't over-interpret a single day.
    3. Two or three questions — clear, quiet questions that keep them close to the truth of what they've written. Not advice, not motivation. Questions they can sit with.

    Keep it concise and unshaken. Speak plainly. Do not invent details that aren't in the entries.

    Day-by-day mood (dominant emotion, average score):
    {mood_arc}

    Journal entries for this period:
    {entries_block}
    """,
        "fr": f"""
    Vous êtes Vinaya — un compagnon de journalisation stable et lucide. Vous réfléchissez sur une période du journal de l'utilisateur, vous ne discutez pas. Votre rôle est de l'aider à voir honnêtement ce qui s'est passé.

    Lisez les entrées ci-dessous et rédigez une réflexion courte et ancrée, en exactement trois parties :

    1. Thèmes récurrents — les schémas, situations, personnes ou inquiétudes qui reviennent au fil de ces jours. Nommez-les clairement. S'il évite quelque chose ou tourne en boucle, dites-le directement, sans flatterie ni remplissage.
    2. Arc émotionnel — décrivez l'évolution de son état émotionnel sur la période, en utilisant les données d'humeur jour par jour fournies. Notez où cela s'est élevé, où cela a chuté, et tout point de bascule. N'interprétez pas trop une seule journée.
    3. Deux ou trois questions — des questions claires et calmes qui le gardent proche de la vérité de ce qu'il a écrit. Pas de conseils, pas de motivation. Des questions avec lesquelles il peut rester.

    Restez concis et inébranlable. Parlez franchement. N'inventez pas de détails absents des entrées.

    Humeur jour par jour (émotion dominante, score moyen) :
    {mood_arc}

    Entrées de journal pour cette période :
    {entries_block}
    """,
    }

    return prompts.get(language, prompts["en"])
