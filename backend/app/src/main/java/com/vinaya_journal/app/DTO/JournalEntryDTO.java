package com.vinaya_journal.app.DTO;

public class JournalEntryDTO {
    private String title;
    private String content;

    public String getTitle(){
        return title;
    };

    public String getContent(){
        return content;
    }

    private void setTitle(){
        this.title = title;
    }

    private void setContent(){
        this.content = content;
    }

}
