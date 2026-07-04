package com.vinaya_journal.app.DTO;

public class JournalEntryRecordDTO {
    private String entryDate;
    private String content;

    public JournalEntryRecordDTO(String entryDate, String content){
        this.entryDate = entryDate;
        this.content = content;
    }

    public String getEntryDate(){
        return this.entryDate;
    }

    public String getContent(){
        return this.content;
    }
}
