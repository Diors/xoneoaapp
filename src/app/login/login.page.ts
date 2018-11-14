import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../service/auth.service';


@IonicPage();
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit {

  loading: Loading;
  registerCredentials = { email: '', password: '' };

 constructor(private nav: NavController, private auth: AuthService,
  private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }


  ngOnInit() {
  }

}
