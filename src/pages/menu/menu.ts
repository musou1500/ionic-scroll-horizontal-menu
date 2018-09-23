import {
  Component,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList
} from "@angular/core";
import { IonicPage, NavController, NavParams, Slides } from "ionic-angular";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-menu",
  templateUrl: "menu.html"
})
export class MenuPage {
  public itemSelected: number = 0;
  @ViewChild(Slides)
  slides: Slides;

  @ViewChildren("menuButton", { read: ElementRef })
  menuButtons: QueryList<ElementRef>;

  public menu = [
    {
      icon: "home",
      name: "Home"
    },
    {
      icon: "at",
      name: "Notification",
      badge: 3
    },
    {
      icon: "flame",
      name: "Trend"
    },
    {
      icon: "search",
      name: "Search"
    },
    {
      icon: "mail",
      name: "Direct Messages",
      badge: 5
    },
    {
      icon: "cog",
      name: "Settings"
    }
  ];

  @ViewChild("scrollMenu")
  scrollMenu: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MenuPage");
  }

  slideChanged() {
    const itemSelected = this.slides.getActiveIndex();
    if (itemSelected >= this.menuButtons.length) {
      return;
    }

    this.itemSelected = itemSelected;
    this.adjustMenu();
  }

  adjustMenu() {
    const buttonElems = this.menuButtons.toArray();
    const { offsetLeft: buttonX, clientWidth: buttonWidth } = buttonElems[
      this.itemSelected
    ].nativeElement;
    const menuWidth = this.scrollMenu.nativeElement.clientWidth;
    this.scrollMenu.nativeElement.scrollTo(
      buttonX - menuWidth / 2 + buttonWidth / 2,
      0
    );
  }

  select(n: number) {
    this.slides.slideTo(n);
  }
}
