package com.vinaya_journal.app.Controller;

import com.vinaya_journal.app.Service.JournalRetrieveService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
public class RetrievePastEntryController {

    @GetMapping("/retrieve")
    public String retrievePastEntry(@RequestParam String date)  {
        return JournalRetrieveService.retrieveJournal(date);
    }
}
