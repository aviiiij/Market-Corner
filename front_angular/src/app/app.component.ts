import { Component, ViewChild } from "@angular/core";
import { AuthServiceService } from "./auth-service.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(public authservice: AuthServiceService){}
}
