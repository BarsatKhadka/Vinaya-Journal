package com.vinaya_journal.app.DTO;

public class JournalEntryDTO {

    private String content;
    private String date;

    public String getContent(){
        return content;
    }

    public void setContent(String content){
        this.content = content;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
