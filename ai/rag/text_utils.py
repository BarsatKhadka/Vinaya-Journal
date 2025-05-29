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
        "sentences": [str(sent.text) for sent in sentences],
        "sentence_count": len(sentences),
    }
    
def sentence_chunks(text, date):
    sentencizer(text, date)
    sentences = chunks_info[date]["sentences"]
    chunked_sentences = []
    for sentence in range(0,len(sentences),3):
        chunk = "".join(sentences[sentence:sentence+3])
        chunked_sentences.append(chunk)
    chunks_info[date]["chunked_sentences"] = chunked_sentences
    chunks_info[date]["chunk_count"] = len(chunked_sentences)
    return chunked_sentences


def give_chunks_info():
    for date, text in raw_entries:
        if text.strip():
            sentence_chunks(text, date)
    return chunks_info


