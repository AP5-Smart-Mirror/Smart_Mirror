import { HostListener, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { Configuration } from "./models/configuration";
import { Profile } from "./models/profile";
import { Widget } from "./models/widget";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  profiles: Array<Profile>;
  currentProfile: Profile;
  widgets: Array<Widget>;

  htmlAnimated: HTMLElement;

  constructor() {}

  ngOnInit(): void {
    this.profiles = new Array<Profile>();
    this.init();
    this.currentProfile = this.profiles[0];
    this.playAnimation();
  }

  init(): void {
    this.profiles.push(
      new Profile(
        null,
        "default",
        new Array<Widget>(
          new Widget(
            1,
            "weather-forecast",
            new Configuration(null, 1, 3, 4, 6)
          ),
          new Widget(2, "date", new Configuration(null, 3, 8, 1, 2)),
          new Widget(3, "analog-clock", new Configuration(null, 8, 9, 1, 2)),
          new Widget(4, "news", new Configuration(null, 2, 10, 6, 7))
        )
      )
    );
    this.profiles.push(
      new Profile(
        1,
        "Claire",
        new Array<Widget>(
          new Widget(
            1,
            "weather-forecast",
            new Configuration(null, 1, 3, 1, 3)
          ),
          new Widget(2, "date", new Configuration(null, 3, 8, 1, 2)),
          new Widget(3, "analog-clock", new Configuration(null, 8, 9, 1, 2)),
          new Widget(4, "agenda", new Configuration(null, 9, 11, 1, 4)),
          new Widget(5, "news", new Configuration(null, 3, 9, 6, 7)),
          new Widget(6, "weather-weekend", new Configuration(null, 1, 3, 3, 5)),
          new Widget(7, "note", new Configuration(null, 1, 3, 5, 7)),
          new Widget(8, "mails", new Configuration(null, 9, 11, 5, 7))
        )
      )
    );
    this.profiles.push(
      new Profile(
        2,
        "Stephan",
        new Array<Widget>(
          new Widget(1, "weather", new Configuration(null, 1, 3, 1, 2)),
          new Widget(2, "date", new Configuration(null, 4, 7, 1, 2)),
          new Widget(4, "digital-clock", new Configuration(null, 10, 11, 1, 2)),
          new Widget(5, "news", new Configuration(null, 3, 9, 6, 7))
        )
      )
    );
  }

  searchWidget(widget: Array<Widget>, name: string): boolean {
    return widget.findIndex((n) => n.name === name) !== -1 ? true : false;
  }

  setPositionWidget(name: string): object {
    const conf = this.currentProfile.widgets.find((n) => n.name === name)
      .config;
    return {
      "grid-column-start": conf.posXStart,
      "grid-column-end": conf.posXEnd,
      "grid-row-start": conf.posYStart,
      "grid-row-end": conf.posYEnd,
    };
  }

  @HostListener("document:keyup", ["$event"])
  /*When ArrowUp key is pressed, we browse the next profile.
  If we reach the end of the list, we display default profile again
  Loop*/
  public onKeyUp(eventData: KeyboardEvent): void {
    if (eventData.key === "ArrowUp") {
      const idxCurrentProfile = this.profiles.indexOf(this.currentProfile);
      // If we don't reach the end of the list
      if (idxCurrentProfile + 1 < this.profiles.length) {
        this.currentProfile = this.profiles[idxCurrentProfile + 1];
        // Go back to default profile
      } else {
        this.currentProfile = this.profiles[0];
      }
      this.playAnimation();
    }
  }

  playAnimation(): void {
    document.getElementById("animated").animate(
      [
        {
          // from
          opacity: 0,
          fontSize: "x-large",
        },
        {
          // to
          opacity: 1,
          fontSize: "xx-large",
        },
      ],
      1500
    );
  }
}
