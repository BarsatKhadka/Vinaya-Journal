package com.vinaya_journal.app.Controller;

import com.vinaya_journal.app.Service.LastSavedAtService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;


@RestController
public class LastSavedAtController {
    @GetMapping("/lastSavedAt")
    public String lastSavedAt(@RequestParam(required = false) String date){
        if (date == null || date.isEmpty()) {
            date = LocalDate.now().toString();
        }
        return LastSavedAtService.getLastSavedAt(date);
    }

}
