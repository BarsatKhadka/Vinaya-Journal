package com.vinaya_journal.app.Controller;

import com.vinaya_journal.app.Service.LastSavedAtService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class LastSavedAtController {
    @GetMapping("/lastSavedAt")
    public String lastSavedAt(){
        return LastSavedAtService.getLastSavedAt();
    }

}
