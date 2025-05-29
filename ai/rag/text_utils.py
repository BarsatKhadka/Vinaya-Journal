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
    
def sentence_chunks(text, date , stride=2 , chunk_size=3):
    sentencizer(text, date)
    sentences = chunks_info[date]["sentences"]
    chunked_sentences = []
    for i in range(0,len(sentences)- chunk_size + 1 ,stride):
        chunk = "".join(sentences[i:i+chunk_size])
        chunked_sentences.append(chunk)
    if len(sentences) > 0 and len(sentences) < chunk_size:
        chunked_sentences.append(" ".join(sentences))
    chunks_info[date]["chunked_sentences"] = chunked_sentences
    chunks_info[date]["chunk_count"] = len(chunked_sentences)
    return chunked_sentences


def give_chunks_info():
    for date, text in raw_entries:
        if text.strip():
            sentence_chunks(text, date)
    return chunks_info


