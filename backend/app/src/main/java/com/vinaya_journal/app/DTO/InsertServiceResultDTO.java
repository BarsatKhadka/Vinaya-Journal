package com.vinaya_journal.app.DTO;

public class InsertServiceResultDTO {
    private boolean success;
    private String modified_at;

    public InsertServiceResultDTO(boolean success, String modified_at){
        this.success = success;
        this.modified_at = modified_at;
    }

    public boolean isSuccess(){
        return this.success;
    }

    public String getModified_at(){
        return this.modified_at;
    }




}
