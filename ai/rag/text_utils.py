from rag.sqlite_utils import get_all_entries
from spacy.lang.en import English

nlp = English()
nlp.add_pipe("sentencizer")

chunks_info = dict()
raw_entries = get_all_entries()

def sentencizer(text, date):
    text = text.replace("\n", " ")
    doc = nlp(text)
    sentences = list(doc.sents)
    chunks_info[date] = {
        "sentences": [sent.text for sent in sentences],
        "sentence_count": len(sentences),
    }
    

for date, text in raw_entries:
    if text.strip():
        sentencizer(text, date)

def give_chunks_info():
    return chunks_info