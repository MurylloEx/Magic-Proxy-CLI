import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MagicHeaderComponent } from './components/magic-header/magic-header.component';
import { MagicFooterComponent } from './components/magic-footer/magic-footer.component';
import { MagicWidgetComponent } from './components/magic-widget/magic-widget.component';
import { MagicSectionComponent } from './components/magic-section/magic-section.component';
import { MagicLoginComponent } from './components/magic-login/magic-login.component';
import { MagicAuthComponent } from './pages/magic-auth/magic-auth.component';
import { MagicPanelComponent } from './pages/magic-panel/magic-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MagicHeaderComponent,
    MagicFooterComponent,
    MagicWidgetComponent,
    MagicSectionComponent,
    MagicLoginComponent,
    MagicAuthComponent,
    MagicPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    RippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
