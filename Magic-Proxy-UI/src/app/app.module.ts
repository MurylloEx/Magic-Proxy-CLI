import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MagicHeaderComponent } from './components/magic-header/magic-header.component';
import { MagicFooterComponent } from './components/magic-footer/magic-footer.component';
import { MagicWidgetComponent } from './components/magic-widget/magic-widget.component';
import { MagicSectionComponent } from './components/magic-section/magic-section.component';
import { MagicLoginComponent } from './components/magic-login/magic-login.component';

@NgModule({
  declarations: [
    AppComponent,
    MagicHeaderComponent,
    MagicFooterComponent,
    MagicWidgetComponent,
    MagicSectionComponent,
    MagicLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
